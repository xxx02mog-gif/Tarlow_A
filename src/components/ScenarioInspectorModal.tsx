import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AschQuestionReplyOption,
  BubbleVoiceEffect,
  ConversationTopic,
  EndingTransitionConfig,
  ExpressionId,
  ExtraDialogueExchange,
  FaceParts,
  MemorySector,
  SilentFaceStep,
  TopicExchangeStage,
} from '../types/game';
import {
  OPENING_ASCH_TEXT,
  PHASE1_TOPIC_SLIP_CONFIGS,
  Phase1SlipVariant,
} from '../data/scenarioTopicsPart1';
import { CONVERSATION_TOPICS } from '../data/prototypeScenario';
import {
  ENDING_SCENARIOS,
  FINAL_ASCH_QUESTION_LINE,
  FINAL_DECISION_STAGES,
  PHASE3_WHO_AM_I_OPTIONS,
} from '../data/scenarioEndingsAndSpecial';
import {
  ANGRY_COOLDOWN_REACTIONS,
  ANGRY_GLANCE_CAUGHT_LINES,
  AWAY_RETURN_REACTIONS,
  IDLE_REACTIONS,
  INITIAL_MEMORY_SECTORS,
  TURN_MILESTONE_QUESTIONS,
} from '../data/scenarioSectors';
import {
  DEFAULT_EXPRESSION_PARTS,
  EFFECT_OPTIONS,
  PortraitMotionTuning,
} from './AschPortrait';
import { soundEngine } from '../utils/chiptuneAudio';

export interface ScriptLinePreview {
  speaker: 'GUY' | 'ASCH';
  text: string;
  voiceEffect?: BubbleVoiceEffect;
  expression?: ExpressionId;
  faceParts?: Partial<FaceParts>;
  secondExpression?: ExpressionId;
  secondFaceParts?: Partial<FaceParts>;
  note?: string;
  moodDelta?: number;
  trustDelta?: number;
  waitMs?: number;
  specialEffect?: 'destroy' | 'collapse' | 'shout_shock' | 'none';
}

export type ScenarioInspectorCategory =
  | 'ALL'
  | 'P1_TOPIC'
  | 'P1_SLIP'
  | 'P2_TOPIC'
  | 'P2_QUESTION'
  | 'CLIMAX_ED'
  | 'SECTOR'
  | 'REACTION';

export interface ScenarioInspectorItem {
  id: string;
  category: ScenarioInspectorCategory;
  categoryLabel: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  lines: ScriptLinePreview[];
  extraOptions?: {
    id: string;
    thoughtText: string;
    spokenText: string;
    waitMs?: number;
    aschText: string;
    aschWaitMs?: number;
    expression?: ExpressionId;
    faceParts?: Partial<FaceParts>;
    secondExpression?: ExpressionId;
    secondFaceParts?: Partial<FaceParts>;
    voiceEffects?: BubbleVoiceEffect[];
    moodDelta?: number;
    trustDelta?: number;
    extraRallies?: {
      speaker: 'GUY' | 'ASCH';
      text: string;
      expression?: ExpressionId;
      faceParts?: Partial<FaceParts>;
      secondExpression?: ExpressionId;
      secondFaceParts?: Partial<FaceParts>;
      voiceEffect?: BubbleVoiceEffect;
      waitMs?: number;
      specialEffect?: 'destroy' | 'collapse' | 'shout_shock' | 'none';
      silentFaceSequence?: SilentFaceStep[];
    }[];
    specialEffect?: 'destroy' | 'collapse' | 'shout_shock' | 'none';
    endingTransition?: EndingTransitionConfig;
  }[];
  endingTransition?: EndingTransitionConfig;
  sectorData?: MemorySector;
  rawTopic?: ConversationTopic;
  slipVariant?: Phase1SlipVariant;
}

export type InspectorViewMode = 'dock' | 'minimized' | 'full';

interface ScenarioInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPreviewLine: (
    speaker: 'GUY' | 'ASCH',
    text: string,
    voiceEffect?: BubbleVoiceEffect,
    expression?: ExpressionId,
    faceParts?: Partial<FaceParts>
  ) => void;
  onPreviewSequence: (
    lines: ScriptLinePreview[],
    onComplete?: () => void,
    endingTransition?: EndingTransitionConfig
  ) => void;
  onStopPlayback?: () => void;
  onSkipAdvance?: () => void;
  onApplyFaceOnly: (
    expression: ExpressionId,
    faceParts?: Partial<FaceParts>
  ) => void;
  onClearPreview: () => void;
  activeExpression: ExpressionId;
  activeFaceParts: FaceParts;
  availableRootFiles: string[] | Set<string>;
  availablePartFiles: string[] | Set<string>;
  customTestPngSrc: string | null;
  customPartMap: Record<string, string>;
  motionTuning: PortraitMotionTuning;
  viewMode: InspectorViewMode;
  onChangeViewMode: (mode: InspectorViewMode) => void;
}

const CATEGORY_TABS: { id: ScenarioInspectorCategory; label: string }[] = [
  { id: 'ALL', label: 'すべて' },
  { id: 'P1_TOPIC', label: 'P1・序盤会話' },
  { id: 'P1_SLIP', label: 'P1・ボロ言い直し' },
  { id: 'P2_TOPIC', label: 'P2・本格会話' },
  { id: 'P2_QUESTION', label: '逆質問ラリー' },
  { id: 'CLIMAX_ED', label: '決断・全ED' },
  { id: 'SECTOR', label: '端末SEC' },
  { id: 'REACTION', label: '特殊反応' },
];

export const ScenarioInspectorModal: React.FC<ScenarioInspectorModalProps> = ({
  isOpen,
  onClose,
  onPreviewLine,
  onPreviewSequence,
  onStopPlayback,
  onSkipAdvance,
  onApplyFaceOnly,
  onClearPreview,
  activeExpression,
  activeFaceParts,
  availableRootFiles,
  availablePartFiles,
  customTestPngSrc,
  customPartMap,
  motionTuning,
  viewMode,
  onChangeViewMode,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<ScenarioInspectorCategory>('ALL');
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  
  // 連続再生（自動送り）関連ステート
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [isPlayingCurrent, setIsPlayingCurrent] = useState<boolean>(false);
  const [autoIntervalSec, setAutoIntervalSec] = useState<number>(1.4); // シーン完了後の待機時間(秒)
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [dockSubTab, setDockSubTab] = useState<'detail' | 'list'>('detail');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const autoPlayTimerRef = useRef<number | null>(null);
  const isAutoPlayRef = useRef<boolean>(false);
  isAutoPlayRef.current = isAutoPlay;

  // すべてのシナリオ項目をインスペクター用配列に統一コンパイル
  const allScenarioItems = useMemo<ScenarioInspectorItem[]>(() => {
    const list: ScenarioInspectorItem[] = [];

    // --- 0. プロローグ & オープニング ---
    const openingLines = OPENING_ASCH_TEXT.split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    list.push({
      id: 'p0_opening',
      category: 'P1_TOPIC',
      categoryLabel: 'P1・開幕',
      title: '初期拒絶 // タルロウAを名乗るアッシュ',
      subtitle: 'ゲーム開始直後の突き放し台詞',
      tags: ['開幕', '初期状態'],
      lines: openingLines.map((line, lIdx) => ({
        speaker: 'ASCH',
        text: line,
        expression: 'glare',
        faceParts: {
          brow: 'angry',
          eyes: 'glare',
          mouth: lIdx === 0 ? 'frown' : 'close',
          effects: [],
        },
        voiceEffect: 'normal',
        note:
          lIdx === 0
            ? 'アッシュの突き放し（1枠目）'
            : '研究所へ戻せと促す（2枠目）',
      })),
    });

    // --- 1. Phase 1 話題 (p1_*) ---
    const phase1Topics = CONVERSATION_TOPICS.filter((t: ConversationTopic) =>
      t.id.startsWith('p1_')
    );
    phase1Topics.forEach((t: ConversationTopic) => {
      t.stages.forEach((stage: TopicExchangeStage, idx: number) => {
        const guyLines = stage.spokenText
          ? stage.spokenText.split('\n').map((s) => s.trim()).filter(Boolean)
          : [];
        const aschLines = stage.aschText
          ? stage.aschText.split('\n').map((s) => s.trim()).filter(Boolean)
          : [];

        const lines: ScriptLinePreview[] = [];

        guyLines.forEach((gLine, gIdx) => {
          lines.push({
            speaker: 'GUY',
            text: gLine,
            voiceEffect: 'normal',
            note:
              gIdx === 0
                ? 'ガイのカマかけ質問（1枠目）'
                : 'ガイの質問（2枠目）',
          });
        });

        aschLines.forEach((line: string, lineIdx: number) => {
          lines.push({
            speaker: 'ASCH',
            text: line,
            expression:
              lineIdx === 0
                ? stage.expression
                : stage.secondExpression ?? stage.expression,
            faceParts:
              lineIdx === 0
                ? stage.faceParts
                : stage.secondFaceParts ?? stage.faceParts,
            voiceEffect: stage.voiceEffects?.[lineIdx] ?? 'normal',
            note:
              lineIdx === 0
                ? 'アッシュの返答（1枠目）'
                : 'アッシュの返答（2枠目）',
          });
        });

        list.push({
          id: `${t.id}_stage_${idx + 1}`,
          category: 'P1_TOPIC',
          categoryLabel: 'P1・質問',
          title: `${t.thoughtText} (段階 ${idx + 1}/${t.stages.length})`,
          subtitle: stage.spokenText.slice(0, 38) + '...',
          tags: ['Phase1', t.id],
          lines,
          rawTopic: t,
        });
      });

      // ボロ（失言・言い直し）定義
      const slipConfig = PHASE1_TOPIC_SLIP_CONFIGS[t.id];
      if (slipConfig && slipConfig.canSlip) {
        slipConfig.variants.forEach((v, vIdx) => {
          if (v.type === 'REWRITE' && v.slipPrefixText && v.slipCorrectedText) {
            const guyPointOutLines = v.guyPointOutSpoken
              ? v.guyPointOutSpoken
                  .split('\n')
                  .map((s) => s.trim())
                  .filter(Boolean)
              : [];

            const slipLines: ScriptLinePreview[] = [
              {
                speaker: 'ASCH',
                text: v.slipPrefixText,
                expression: 'shock',
                faceParts: v.slipFaceParts ?? {
                  brow: 'angry',
                  eyes: 'wide',
                  mouth: 'shout',
                  effects: ['sweat'],
                },
                voiceEffect: 'normal',
                note: '思わず口から飛び出た本音（1枠目・激昂/動揺）',
              },
              {
                speaker: 'ASCH',
                text: v.slipCorrectedText,
                expression: 'look_away',
                faceParts: v.correctedFaceParts ?? {
                  brow: 'sad',
                  eyes: 'away',
                  mouth: 'grit',
                  effects: ['sweat'],
                },
                voiceEffect: 'normal',
                note: '慌てて取り繕った訂正セリフ（同枠上書き演出）',
              },
            ];

            guyPointOutLines.forEach((gpLine, gpIdx) => {
              slipLines.push({
                speaker: 'GUY',
                text: gpLine,
                voiceEffect: 'normal',
                note:
                  gpIdx === 0
                    ? 'ガイのツッコミ（1枠目）'
                    : 'ガイのツッコミ（2枠目）',
              });
            });

            list.push({
              id: `${t.id}_slip_${vIdx + 1}`,
              category: 'P1_SLIP',
              categoryLabel: 'P1・ボロ',
              title: `【ボロ言い直し】${t.thoughtText}`,
              subtitle: `本音『${v.slipPrefixText}』➔ 訂正『${v.slipCorrectedText}』`,
              tags: ['Phase1', 'ボロ', '言い直し'],
              slipVariant: v,
              lines: slipLines,
            });
          }
        });
      }
    });

    // --- 2. Phase 2 本格会話 (not p1_) ---
    const phase2Topics = CONVERSATION_TOPICS.filter(
      (t: ConversationTopic) => !t.id.startsWith('p1_')
    );
    phase2Topics.forEach((t: ConversationTopic) => {
      t.stages.forEach((stage: TopicExchangeStage, sIdx: number) => {
        const guyLines = stage.spokenText
          ? stage.spokenText.split('\n').map((s) => s.trim()).filter(Boolean)
          : [];
        const aschLines = stage.aschText
          ? stage.aschText.split('\n').map((s) => s.trim()).filter(Boolean)
          : [];

        const lines: ScriptLinePreview[] = [];

        guyLines.forEach((gLine, gIdx) => {
          lines.push({
            speaker: 'GUY',
            text: gLine,
            voiceEffect: 'normal',
            note:
              gIdx === 0
                ? 'ガイの話題提起（1枠目）'
                : 'ガイの話題提起（2枠目）',
          });
        });

        aschLines.forEach((line: string, lIdx: number) => {
          lines.push({
            speaker: 'ASCH',
            text: line,
            expression:
              lIdx === 0
                ? stage.expression
                : stage.secondExpression ?? stage.expression,
            faceParts:
              lIdx === 0
                ? stage.faceParts
                : stage.secondFaceParts ?? stage.faceParts,
            voiceEffect: stage.voiceEffects?.[lIdx] ?? 'normal',
            note:
              lIdx === 0
                ? `アッシュの反応（1/2） 機嫌変化: ${stage.moodDelta ?? 0}`
                : `アッシュの反応（2/2） 信頼変化: ${stage.trustDelta ?? 0}`,
          });
        });

        const aschQuestion = stage.triggersAschQuestion;
        const replies = stage.replyOptions ?? aschQuestion?.options;
        let extraOptions: ScenarioInspectorItem['extraOptions'];

        if (aschQuestion || replies) {
          if (aschQuestion) {
            lines.push({
              speaker: 'ASCH',
              text: `（${aschQuestion.promptSummary}）`,
              voiceEffect: 'normal',
              note: '【アッシュからの問いかけ・返答要求】',
            });
          }

          if (replies) {
            extraOptions = replies.map((r: AschQuestionReplyOption) => ({
              id: r.id,
              thoughtText: r.thoughtText,
              spokenText: r.spokenText,
              aschText: r.aschText,
              expression: r.expression,
              faceParts: r.faceParts,
              secondExpression: r.secondExpression,
              secondFaceParts: r.secondFaceParts,
              voiceEffects: r.voiceEffects,
              moodDelta: r.moodDelta,
              trustDelta: r.trustDelta,
              extraRallies: r.extraExchanges?.map((ex: ExtraDialogueExchange) => ({
                speaker: ex.speaker,
                text: ex.text,
                expression: ex.expression,
                faceParts: ex.faceParts,
                secondExpression: ex.secondExpression,
                secondFaceParts: ex.secondFaceParts,
                voiceEffect: ex.voiceEffect,
              })),
            }));
          }
        }

        list.push({
          id: `${t.id}_stage_${sIdx + 1}`,
          category: aschQuestion || replies ? 'P2_QUESTION' : 'P2_TOPIC',
          categoryLabel: aschQuestion || replies ? '逆質問' : 'P2・話題',
          title: `${t.thoughtText} (段階 ${sIdx + 1}/${t.stages.length})`,
          subtitle: stage.spokenText.slice(0, 38) + '...',
          tags: [
            'Phase2',
            t.id,
            aschQuestion || replies ? '逆質問あり' : '通常会話',
            ...(t.requireSectorUnlocked ? [t.requireSectorUnlocked] : []),
          ],
          lines,
          extraOptions,
          rawTopic: t,
        });
      });
    });

    // --- 2.5. フェーズ2 逆質問（TURN_MILESTONE_QUESTIONS） ---
    TURN_MILESTONE_QUESTIONS.forEach((mq) => {
      const q = mq.question;
      const qLines = mq.questionLine
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const scriptLines: ScriptLinePreview[] = qLines.map((line, idx) => ({
        speaker: 'ASCH',
        text: line,
        expression: mq.expression,
        faceParts: mq.faceParts,
        note: idx === 0 ? `規定ターン: ${mq.turnCount}T〜` : undefined,
      }));

      const extraOptions = q.options.map((opt) => ({
        id: opt.id,
        thoughtText: opt.thoughtText,
        spokenText: opt.spokenText,
        aschText: opt.aschText,
        expression: opt.expression,
        faceParts: opt.faceParts,
        moodDelta: opt.moodDelta,
        trustDelta: opt.trustDelta,
      }));

      list.push({
        id: `milestone_q_${q.id}`,
        category: 'P2_QUESTION',
        categoryLabel: '逆質問',
        title: `逆質問：${q.promptSummary} (${mq.turnCount}T〜)`,
        subtitle: mq.questionLine.slice(0, 42) + '...',
        tags: ['Phase2', '逆質問', `${mq.turnCount}ターン以降`, q.id],
        lines: scriptLines,
        extraOptions,
      });
    });

    // --- 3. 決断・クライマックス・全エンディング (ED-01 〜 ED-10) ---
    list.push({
      id: 'climax_final_question',
      category: 'CLIMAX_ED',
      categoryLabel: '決断・問い',
      title: 'クライマックス // アッシュ最後の問いかけ',
      subtitle: FINAL_ASCH_QUESTION_LINE,
      tags: ['クライマックス', '最終決断'],
      lines: [
        {
          speaker: 'ASCH',
          text: FINAL_ASCH_QUESTION_LINE,
          expression: 'pain',
          faceParts: {
            brow: 'sad',
            eyes: 'glare',
            mouth: 'gasp',
            effects: ['shadow'],
          },
          voiceEffect: 'tremble',
          note: '『おまえから見て、今の俺は誰に見える？』',
        },
      ],
      extraOptions: PHASE3_WHO_AM_I_OPTIONS.map((opt) => ({
        id: opt.id,
        thoughtText: opt.thoughtText,
        spokenText: opt.spokenText,
        waitMs: opt.waitMs,
        aschText: opt.aschText,
        aschWaitMs: opt.aschWaitMs,
        expression: opt.expression,
        faceParts: opt.faceParts,
        secondExpression: opt.secondExpression,
        secondFaceParts: opt.secondFaceParts,
        voiceEffects: opt.voiceEffects,
        endingTransition: opt.endingTransition,
        extraRallies: opt.extraExchanges?.map((ex) => ({
          speaker: ex.speaker,
          text: ex.text,
          expression: ex.expression,
          faceParts: ex.faceParts,
          secondExpression: ex.secondExpression,
          secondFaceParts: ex.secondFaceParts,
          voiceEffect: ex.voiceEffect,
          waitMs: ex.waitMs,
        })),
      })),
    });

    list.push({
      id: 'climax_casual_decision',
      category: 'CLIMAX_ED',
      categoryLabel: '決断・終了',
      title: '決断 // 話を切り上げる（通常エンド分岐）',
      subtitle: 'フェーズ2終了時：研究所へ帰す（END 03）／ソファで休ませる（END 04）',
      tags: ['決断', '通常ED', 'END 03', 'END 04'],
      lines: [
        {
          speaker: 'GUY',
          text: '（そろそろ、話を切り上げるか・・・・・・）',
          voiceEffect: 'normal',
          note: '【話を切り上げるメニューの選択】',
        },
      ],
      extraOptions: [
        {
          id: 'decision_opt_end01',
          thoughtText: '「タルロウAのまま研究所へ帰す」（➔ END 01）',
          spokenText: FINAL_DECISION_STAGES.END_PHASE1_TARLOW.spokenText,
          waitMs: FINAL_DECISION_STAGES.END_PHASE1_TARLOW.guyWaitMs,
          aschText: FINAL_DECISION_STAGES.END_PHASE1_TARLOW.aschText,
          aschWaitMs: FINAL_DECISION_STAGES.END_PHASE1_TARLOW.aschWaitMs,
          expression: FINAL_DECISION_STAGES.END_PHASE1_TARLOW.expression,
          faceParts: FINAL_DECISION_STAGES.END_PHASE1_TARLOW.faceParts,
          secondExpression: FINAL_DECISION_STAGES.END_PHASE1_TARLOW.secondExpression,
          secondFaceParts: FINAL_DECISION_STAGES.END_PHASE1_TARLOW.secondFaceParts,
          voiceEffects: FINAL_DECISION_STAGES.END_PHASE1_TARLOW.voiceEffects,
          endingTransition: FINAL_DECISION_STAGES.END_PHASE1_TARLOW.endingTransition,
        },
        {
          id: 'decision_opt_end02',
          thoughtText: '「怒らせて帰られる・話を切り上げる」（➔ END 02）',
          spokenText: FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.spokenText,
          waitMs: FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.guyWaitMs,
          aschText: FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.aschText,
          aschWaitMs: FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.aschWaitMs,
          expression: FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.expression,
          faceParts: FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.faceParts,
          secondExpression: FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.secondExpression,
          secondFaceParts: FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.secondFaceParts,
          voiceEffects: FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.voiceEffects,
          endingTransition: FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.endingTransition,
        },
        {
          id: 'decision_opt_end03',
          thoughtText: '「ディストの研究所へ帰す」（➔ END 03）',
          spokenText: FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.spokenText,
          waitMs: FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.guyWaitMs,
          aschText: FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.aschText,
          aschWaitMs: FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.aschWaitMs,
          expression: FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.expression,
          faceParts: FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.faceParts,
          secondExpression: FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.secondExpression,
          secondFaceParts: FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.secondFaceParts,
          voiceEffects: FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.voiceEffects,
          endingTransition: FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.endingTransition,
        },
        {
          id: 'decision_opt_end04',
          thoughtText: '「少し休んでいけと声をかける」（➔ END 04）',
          spokenText: FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.spokenText,
          waitMs: FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.guyWaitMs,
          aschText: FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.aschText,
          aschWaitMs: FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.aschWaitMs,
          expression: FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.expression,
          faceParts: FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.faceParts,
          secondExpression: FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.secondExpression,
          secondFaceParts: FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.secondFaceParts,
          voiceEffects: FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.voiceEffects,
          extraRallies: FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.extraRallies?.map((r) => ({
            speaker: r.speaker,
            text: r.text,
            expression: r.expression,
            faceParts: r.faceParts,
            secondExpression: r.secondExpression,
            secondFaceParts: r.secondFaceParts,
            voiceEffect: r.voiceEffect,
            waitMs: r.waitMs,
          })),
          endingTransition: FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.endingTransition,
        },
        {
          id: 'decision_opt_end08',
          thoughtText: '「秘密を問い詰めずに部屋で休ませる」（➔ END 08a）',
          spokenText: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW.spokenText,
          waitMs: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW.guyWaitMs,
          aschText: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW.aschText,
          aschWaitMs: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW.aschWaitMs,
          expression: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW.expression,
          faceParts: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW.faceParts,
          secondExpression: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW.secondExpression,
          secondFaceParts: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW.secondFaceParts,
          voiceEffects: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW.voiceEffects,
          extraRallies: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW.extraRallies?.map((r) => ({
            speaker: r.speaker,
            text: r.text,
            expression: r.expression,
            faceParts: r.faceParts,
            secondExpression: r.secondExpression,
            secondFaceParts: r.secondFaceParts,
            voiceEffect: r.voiceEffect,
            waitMs: r.waitMs,
          })),
          endingTransition: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW.endingTransition,
        },
        {
          id: 'decision_opt_end08b',
          thoughtText: '「秘密を問い詰めずに研究所へ帰す」（➔ END 08b）',
          spokenText: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW_RETURN.spokenText,
          waitMs: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW_RETURN.guyWaitMs,
          aschText: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW_RETURN.aschText,
          aschWaitMs: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW_RETURN.aschWaitMs,
          expression: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW_RETURN.expression,
          faceParts: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW_RETURN.faceParts,
          secondExpression: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW_RETURN.secondExpression,
          secondFaceParts: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW_RETURN.secondFaceParts,
          voiceEffects: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW_RETURN.voiceEffects,
          extraRallies: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW_RETURN.extraRallies?.map((r) => ({
            speaker: r.speaker,
            text: r.text,
            expression: r.expression,
            faceParts: r.faceParts,
            secondExpression: r.secondExpression,
            secondFaceParts: r.secondFaceParts,
            voiceEffect: r.voiceEffect,
            waitMs: r.waitMs,
          })),
          endingTransition: FINAL_DECISION_STAGES.END_PHASE3_TOMORROW_RETURN.endingTransition,
        },
        {
          id: 'decision_opt_end09',
          thoughtText: '「埃を取るふりをして首裏の制御核を壊す」（➔ END 09）',
          spokenText: '・・・・・・アッシュ。\n首の後ろ・・・・・・埃がついてるぞ。取ってやる。',
          waitMs: 1900,
          aschText:
            '？　・・・・・・何だ。改まって。\n・・・・・・っ、おい、気安く触るなと言って――',
          aschWaitMs: 2200,
          expression: 'normal',
          faceParts: {
            brow: 'doubt',
            eyes: 'away',
            mouth: 'close',
            effects: [],
          },
          secondExpression: 'glare',
          secondFaceParts: {
            brow: 'angry',
            eyes: 'glare',
            mouth: 'shout',
            effects: [],
          },
          specialEffect: 'destroy',
          extraRallies: [
            {
              speaker: 'ASCH',
              text: '・・・・・・っ、が・・・・・・イ・・・・・・？',
              expression: 'shock',
              faceParts: {
                brow: 'pain',
                eyes: 'wide',
                mouth: 'gasp',
                effects: ['sweat', 'pale'],
              },
              voiceEffect: 'tremble_glitch',
              waitMs: 1900,
            },
            {
              speaker: 'ASCH',
              text: 'な、にを・・・・・・し、て・・・・・・',
              expression: 'empty',
              faceParts: {
                brow: 'pain',
                eyes: 'empty',
                mouth: 'gasp',
                effects: ['shadow', 'tears'],
              },
              secondExpression: 'pain',
              secondFaceParts: {
                brow: 'sad',
                eyes: 'close',
                mouth: 'close',
                effects: ['shadow', 'tears'],
              },
              voiceEffect: 'tremble_glitch',
              waitMs: 2700,
              specialEffect: 'collapse',
            },
            {
              speaker: 'GUY',
              text: '・・・・・・これで、いいんだ。',
              waitMs: 2400,
            },
          ],
          endingTransition: {
            waitBeforeExitMs: 1800,
            aschAction: 'none',
            doorAction: 'none',
            waitAfterDoorMs: 1600,
          },
        },
        {
          id: 'decision_opt_end10',
          thoughtText: '「秘密を問い詰める（Ghost in the mASCHine）」（➔ END 10）',
          spokenText: FINAL_DECISION_STAGES.END_PHASE3_SWAMPMAN.spokenText,
          waitMs: FINAL_DECISION_STAGES.END_PHASE3_SWAMPMAN.guyWaitMs,
          aschText: FINAL_DECISION_STAGES.END_PHASE3_SWAMPMAN.aschText,
          aschWaitMs: FINAL_DECISION_STAGES.END_PHASE3_SWAMPMAN.aschWaitMs,
          expression: FINAL_DECISION_STAGES.END_PHASE3_SWAMPMAN.expression,
          faceParts: FINAL_DECISION_STAGES.END_PHASE3_SWAMPMAN.faceParts,
          secondExpression: FINAL_DECISION_STAGES.END_PHASE3_SWAMPMAN.secondExpression,
          secondFaceParts: FINAL_DECISION_STAGES.END_PHASE3_SWAMPMAN.secondFaceParts,
          voiceEffects: FINAL_DECISION_STAGES.END_PHASE3_SWAMPMAN.voiceEffects,
          extraRallies: FINAL_DECISION_STAGES.END_PHASE3_SWAMPMAN.extraRallies?.map((r) => ({
            speaker: r.speaker,
            text: r.text,
            expression: r.expression,
            faceParts: r.faceParts,
            secondExpression: r.secondExpression,
            secondFaceParts: r.secondFaceParts,
            voiceEffect: r.voiceEffect,
            waitMs: r.waitMs,
          })),
          endingTransition: FINAL_DECISION_STAGES.END_PHASE3_SWAMPMAN.endingTransition,
        },
      ],
    });

    Object.entries(ENDING_SCENARIOS).forEach(([key, ed]) => {
      const edLines: ScriptLinePreview[] = [];

      ed.dialogues.forEach((d) => {
        const splitText = d.text
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
        splitText.forEach((t) => {
          edLines.push({
            speaker: d.speaker === 'ASCH' ? 'ASCH' : 'GUY',
            text: t,
            voiceEffect: 'normal',
            expression: d.speaker === 'ASCH' ? 'normal' : undefined,
            waitMs: 1200,
            note: '【ED暗転画面・エピローグ独白】',
          });
        });
      });

      list.push({
        id: `ed_${key}`,
        category: 'CLIMAX_ED',
        categoryLabel: 'EDシナリオ',
        title: `${ed.title}`,
        subtitle: ed.subtitle,
        tags: ['ED', key],
        lines: edLines,
        extraOptions: undefined,
      });
    });

    // --- 4. データ端末 SEC-00 〜 SEC-20 ---
    INITIAL_MEMORY_SECTORS.forEach((sec) => {
      list.push({
        id: `sec_${sec.id}`,
        category: 'SECTOR',
        categoryLabel: '端末SEC',
        title: `${sec.id} // ${sec.unlockedTitle || sec.code}`,
        subtitle: sec.capturedQuote || sec.unlockedCategory,
        tags: ['端末', sec.id, ...(sec.unlockedCategory ? [sec.unlockedCategory] : [])],
        lines: [
          {
            speaker: 'ASCH',
            text: sec.capturedQuote || '（対話での観測トリガー）',
            voiceEffect: 'normal',
            expression: sec.reactionExpression ?? 'normal',
            note: '観測された発言・解除トリガー',
          },
          {
            speaker: 'GUY',
            text: sec.unlockedContent,
            voiceEffect: 'normal',
            note: 'データ端末内ログ本文',
          },
        ],
        sectorData: sec,
      });
    });

    // --- 5. 特殊リアクション ---
    ANGRY_COOLDOWN_REACTIONS.forEach((react, rIdx) => {
      list.push({
        id: `reaction_cooldown_${rIdx + 1}`,
        category: 'REACTION',
        categoryLabel: '怒り緩和',
        title: `怒りクールダウン (${rIdx + 1}/${ANGRY_COOLDOWN_REACTIONS.length})`,
        subtitle: react.text,
        tags: ['不機嫌', 'クールダウン'],
        lines: [
          {
            speaker: 'ASCH',
            text: react.text,
            expression: react.expression,
            faceParts: react.faceParts,
            voiceEffect: 'normal',
            note: react.logMessage,
          },
        ],
      });
    });

    ANGRY_GLANCE_CAUGHT_LINES.forEach((line, gIdx) => {
      list.push({
        id: `reaction_glance_${gIdx + 1}`,
        category: 'REACTION',
        categoryLabel: '視線検知',
        title: `見つめる・視線検知 (${gIdx + 1})`,
        subtitle: line,
        tags: ['見つめる', '視線'],
        lines: [
          {
            speaker: 'ASCH',
            text: line,
            expression: 'glare',
            faceParts: {
              brow: 'angry',
              eyes: 'glare',
              mouth: 'grit',
              effects: [],
            },
            voiceEffect: 'normal',
            note: 'アッシュを無言で見つめた時のリアクション',
          },
        ],
      });
    });

    IDLE_REACTIONS.forEach((r) => {
      list.push({
        id: `reaction_idle_${r.stage}`,
        category: 'REACTION',
        categoryLabel: '沈黙放置',
        title: `沈黙・放置リアクション (段階 ${r.stage})`,
        subtitle: r.text,
        tags: ['放置', `stage_${r.stage}`],
        lines: [
          {
            speaker: 'ASCH',
            text: r.text,
            expression: r.expression,
            faceParts: r.faceParts,
            voiceEffect: 'normal',
            note: `${r.thresholdSec}秒経過時`,
          },
        ],
      });
    });

    Object.entries(AWAY_RETURN_REACTIONS).forEach(([categoryKey, listArr]) => {
      listArr.forEach((r, rIdx) => {
        list.push({
          id: `reaction_away_${categoryKey}_${rIdx + 1}`,
          category: 'REACTION',
          categoryLabel: '部屋復帰',
          title: `部屋に戻った時 (${categoryKey} ${rIdx + 1})`,
          subtitle: r.text,
          tags: ['戻り', categoryKey],
          lines: [
            {
              speaker: 'ASCH',
              text: r.text,
              expression: r.expression,
              faceParts: r.faceParts,
              voiceEffect: 'normal',
              note: r.logMessage,
            },
          ],
        });
      });
    });

    return list;
  }, []);

  // フィルタリング（カテゴリ + 検索クエリ）
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allScenarioItems.filter((item) => {
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }
      if (q) {
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSubtitle = item.subtitle?.toLowerCase().includes(q);
        const matchesTags =
          item.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
        const matchesLines = item.lines.some(
          (l) =>
            l.text.toLowerCase().includes(q) ||
            (l.note && l.note.toLowerCase().includes(q))
        );
        if (!matchesTitle && !matchesSubtitle && !matchesTags && !matchesLines) {
          return false;
        }
      }
      return true;
    });
  }, [allScenarioItems, selectedCategory, searchQuery]);

  // 現在選択されている項目
  const activeItem = useMemo(() => {
    if (!filteredItems.length) return null;
    return (
      filteredItems.find((x) => x.id === selectedItemId) ?? filteredItems[0]
    );
  }, [filteredItems, selectedItemId]);

  const currentIndex = useMemo(() => {
    if (!activeItem) return -1;
    return filteredItems.findIndex((x) => x.id === activeItem.id);
  }, [filteredItems, activeItem]);

  // クリーンアップタイマー
  const clearAutoTimer = useCallback(() => {
    if (autoPlayTimerRef.current !== null) {
      window.clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearAutoTimer();
    };
  }, [clearAutoTimer]);

  // シーン再生コア
  const playSceneCore = useCallback(
    (item: ScenarioInspectorItem, continueAuto = false) => {
      clearAutoTimer();
      setIsPlayingCurrent(true);

      onPreviewSequence(
        item.lines,
        () => {
          setIsPlayingCurrent(false);
          if (continueAuto && isAutoPlayRef.current) {
            autoPlayTimerRef.current = window.setTimeout(() => {
              autoPlayTimerRef.current = null;
              if (!isAutoPlayRef.current) return;

              // 次のシーンへ進める
              const currentIdx = filteredItems.findIndex((x) => x.id === item.id);
              if (currentIdx >= 0 && currentIdx < filteredItems.length - 1) {
                const nextItem = filteredItems[currentIdx + 1];
                setSelectedItemId(nextItem.id);
                playSceneCore(nextItem, true);
              } else if (isLoop && filteredItems.length > 0) {
                const firstItem = filteredItems[0];
                setSelectedItemId(firstItem.id);
                playSceneCore(firstItem, true);
              } else {
                setIsAutoPlay(false);
              }
            }, autoIntervalSec * 1000);
          }
        },
        item.endingTransition
      );
    },
    [clearAutoTimer, onPreviewSequence, filteredItems, isLoop, autoIntervalSec]
  );

  // 全分岐を一括再生する関数
  const handlePlayAllBranches = useCallback(
    (item: ScenarioInspectorItem) => {
      if (!item.extraOptions || item.extraOptions.length === 0) {
        playSceneCore(item, isAutoPlay);
        return;
      }
      clearAutoTimer();
      setIsPlayingCurrent(true);

      const allLinesToPlay: ScriptLinePreview[] = [];

      // 基本セリフ（親シーンのセリフ）を追加
      if (item.lines && item.lines.length > 0) {
        allLinesToPlay.push(...item.lines);
      }

      // 各分岐（選択肢とリアクション）を順番に追加
      item.extraOptions.forEach((opt, oIdx) => {
        const guyLines = opt.spokenText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
        guyLines.forEach((g, gIdx) => {
          allLinesToPlay.push({
            speaker: 'GUY',
            text: g,
            voiceEffect: 'normal',
            note: `【分岐${oIdx + 1}】${opt.thoughtText}`,
            waitMs: gIdx === guyLines.length - 1 ? opt.waitMs : undefined,
          });
        });

        const aschLines = opt.aschText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
        aschLines.forEach((a, aIdx) => {
          allLinesToPlay.push({
            speaker: 'ASCH',
            text: a,
            expression:
              aIdx === 0
                ? opt.expression
                : opt.secondExpression ?? opt.expression,
            faceParts:
              aIdx === 0
                ? opt.faceParts
                : opt.secondFaceParts ?? opt.faceParts,
            secondExpression: opt.secondExpression,
            secondFaceParts: opt.secondFaceParts,
            voiceEffect: opt.voiceEffects?.[aIdx] ?? 'normal',
            waitMs: opt.aschWaitMs ?? 1800,
            specialEffect:
              aIdx === aschLines.length - 1 && opt.specialEffect === 'destroy'
                ? 'destroy'
                : undefined,
          });
        });

        if (opt.extraRallies) {
          opt.extraRallies.forEach((r) => {
            r.text
              .split('\n')
              .map((s) => s.trim())
              .filter(Boolean)
              .forEach((rt, rtIdx) => {
                allLinesToPlay.push({
                  speaker: r.speaker,
                  text: rt,
                  expression:
                    rtIdx === 0
                      ? r.expression
                      : r.secondExpression ?? r.expression,
                  faceParts:
                    rtIdx === 0
                      ? r.faceParts
                      : r.secondFaceParts ?? r.faceParts,
                  voiceEffect: r.voiceEffect ?? 'normal',
                  waitMs: r.waitMs,
                  specialEffect: r.specialEffect,
                });
              });
            if (r.silentFaceSequence) {
              r.silentFaceSequence.forEach((s) => {
                allLinesToPlay.push({
                  speaker: 'ASCH',
                  text: '・・・・・・',
                  expression: s.expression,
                  faceParts: s.faceParts,
                  waitMs: s.delayMs,
                });
              });
            }
          });
        }
      });

      onPreviewSequence(
        allLinesToPlay,
        () => {
          setIsPlayingCurrent(false);
        },
        item.endingTransition
      );
    },
    [clearAutoTimer, onPreviewSequence, playSceneCore, isAutoPlay]
  );

  // 現在のシーンを単発再生
  const handlePlayCurrentScene = () => {
    if (!activeItem) return;
    soundEngine.unlockOnUserInteraction();
    playSceneCore(activeItem, isAutoPlay);
  };

  // 停止
  const handleStopPlayback = () => {
    clearAutoTimer();
    setIsAutoPlay(false);
    setIsPlayingCurrent(false);
    if (onStopPlayback) {
      onStopPlayback();
    } else {
      onClearPreview();
    }
  };

  // 連続再生トグル
  const handleToggleAutoPlay = () => {
    soundEngine.unlockOnUserInteraction();
    soundEngine.playTerminalTab();
    if (isAutoPlay) {
      handleStopPlayback();
    } else {
      setIsAutoPlay(true);
      if (activeItem) {
        playSceneCore(activeItem, true);
      }
    }
  };

  // 次のシーンに進む
  const handleNextScene = useCallback(() => {
    clearAutoTimer();
    soundEngine.playTerminalTab();
    if (currentIndex < filteredItems.length - 1) {
      const nextItem = filteredItems[currentIndex + 1];
      setSelectedItemId(nextItem.id);
      if (isAutoPlay || isPlayingCurrent) {
        playSceneCore(nextItem, isAutoPlay);
      }
    } else if (isLoop && filteredItems.length > 0) {
      const firstItem = filteredItems[0];
      setSelectedItemId(firstItem.id);
      if (isAutoPlay || isPlayingCurrent) {
        playSceneCore(firstItem, isAutoPlay);
      }
    }
  }, [clearAutoTimer, currentIndex, filteredItems, isAutoPlay, isPlayingCurrent, isLoop, playSceneCore]);

  // 前のシーンに戻る
  const handlePrevScene = useCallback(() => {
    clearAutoTimer();
    soundEngine.playTerminalTab();
    if (currentIndex > 0) {
      const prevItem = filteredItems[currentIndex - 1];
      setSelectedItemId(prevItem.id);
      if (isAutoPlay || isPlayingCurrent) {
        playSceneCore(prevItem, isAutoPlay);
      }
    }
  }, [clearAutoTimer, currentIndex, filteredItems, isAutoPlay, isPlayingCurrent, playSceneCore]);

  // 単一セリフ再生
  const handlePlaySingleLine = (line: ScriptLinePreview) => {
    clearAutoTimer();
    setIsAutoPlay(false);
    setIsPlayingCurrent(false);
    soundEngine.unlockOnUserInteraction();
    onPreviewLine(
      line.speaker,
      line.text,
      line.voiceEffect ?? 'normal',
      line.expression,
      line.faceParts
    );
  };

  // キーボードショートカット
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // 検索窓にフォーカスがある時はショートカット無効
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        handleStopPlayback();
        onClose();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (isPlayingCurrent) {
          handleStopPlayback();
        } else {
          handlePlayCurrentScene();
        }
      } else if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        handleNextScene();
      } else if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        handlePrevScene();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlayingCurrent, handleNextScene, handlePrevScene, onClose]);

  if (!isOpen) return null;

  // =========================================================================
  // 1. 最小化（コンパクトHUDバー）表示モード
  // =========================================================================
  if (viewMode === 'minimized') {
    return (
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[94vw] max-w-[840px] bg-[#e4e5ea] border-2 border-zinc-950 shadow-2xl rounded px-3.5 py-2 flex items-center justify-between gap-3 text-zinc-900 font-zen select-none animate-bubble-in">
        {/* 再生制御 */}
        <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
          <button
            onClick={handlePrevScene}
            disabled={currentIndex <= 0}
            title="前のシーン [←]"
            className="px-2.5 py-1 text-[11px] bg-zinc-200 hover:bg-zinc-300 disabled:opacity-30 disabled:pointer-events-none text-zinc-900 border border-zinc-700 font-bold cursor-pointer transition-colors"
          >
            ◀ 前
          </button>

          <button
            onClick={() => {
              if (isPlayingCurrent) {
                handleStopPlayback();
              } else {
                handlePlayCurrentScene();
              }
            }}
            title={isPlayingCurrent ? '停止 [Space]' : '現在のシーンを再生 [Space]'}
            className={`px-3 py-1 text-[11.5px] font-bold cursor-pointer transition-colors border flex items-center gap-1.5 shadow-sm ${
              isPlayingCurrent
                ? 'bg-zinc-900 text-zinc-100 border-zinc-950 animate-pulse'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border-zinc-950'
            }`}
          >
            <span>{isPlayingCurrent ? '⏸ 停止' : '▶ 再生'}</span>
          </button>

          {activeItem?.extraOptions && activeItem.extraOptions.length > 0 && (
            <button
              onClick={() => handlePlayAllBranches(activeItem)}
              title="このシーンの全分岐を順番に一括再生"
              className="px-2.5 py-1 text-[11px] font-bold bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 cursor-pointer transition-colors flex items-center gap-1 shadow-sm"
            >
              <span>▶ 全分岐一括 ({activeItem.extraOptions.length})</span>
            </button>
          )}

          <button
            onClick={handleNextScene}
            disabled={currentIndex >= filteredItems.length - 1 && !isLoop}
            title="次のシーンへ進む [→]"
            className="px-2.5 py-1 text-[11px] font-bold bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 cursor-pointer transition-colors flex items-center gap-1"
          >
            <span>次へ ▶|</span>
          </button>

          {isPlayingCurrent && onSkipAdvance && (
            <button
              onClick={onSkipAdvance}
              title="現在のセリフのタメをスキップして次のセリフへ進めます"
              className="px-2 py-1 text-[10.5px] font-bold bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 cursor-pointer transition-colors flex items-center gap-1"
            >
              <span>⏭ スキップ</span>
            </button>
          )}

          <button
            onClick={handleToggleAutoPlay}
            title="シーン完了後に自動で次のシーンへ遷移して再生"
            className={`px-2 py-1 text-[10.5px] border cursor-pointer transition-colors flex items-center gap-1 font-bold ${
              isAutoPlay
                ? 'bg-zinc-900 text-zinc-100 border-zinc-950'
                : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300 border-zinc-600'
            }`}
          >
            <span>連続: {isAutoPlay ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* 現在のシーン情報 */}
        <div className="flex-1 min-w-0 px-2 flex items-center gap-2">
          <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-zinc-300 text-zinc-900 border border-zinc-500 shrink-0">
            {currentIndex >= 0 ? `${currentIndex + 1}/${filteredItems.length}` : '-'}
          </span>
          <span className="text-[12.5px] font-bold text-zinc-950 truncate font-zen">
            {activeItem?.title}
          </span>
          <span className="text-[11px] text-zinc-600 truncate hidden sm:inline">
            {activeItem?.subtitle}
          </span>
        </div>

        {/* 右側：展開・閉じる */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              soundEngine.playTerminalTab();
              onChangeViewMode('dock');
            }}
            title="台本詳細・シーン一覧パネルを展開"
            className="px-2.5 py-1 text-[11px] bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 cursor-pointer transition-colors flex items-center gap-1 font-bold"
          >
            <span>📖 台本を開く</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playTerminalClose();
              handleStopPlayback();
              onClose();
            }}
            title="インスペクターを終了してゲーム画面に戻る [Esc]"
            className="px-2.5 py-1 text-[11px] bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 cursor-pointer transition-colors font-bold"
          >
            ✕ 閉じる
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. ドックモード（左側壁際サイドパネル形式：画面中央〜右のアッシュ立ち絵や吹き出しを隠さず確認）
  // 3. フルスクリーンモード（台本全体をじっくり精査するモード）
  // =========================================================================
  const isFull = viewMode === 'full';

  return (
    <div
      className={
        isFull
          ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 select-none font-zen'
          : 'fixed top-0 left-0 bottom-0 z-40 w-full max-w-[380px] bg-[#e4e5ea] border-r-2 border-zinc-950 shadow-[0_0_40px_rgba(0,0,0,0.45)] flex flex-col overflow-hidden text-zinc-900 font-zen select-none'
      }
    >
      <div
        className={
          isFull
            ? 'relative w-full max-w-[1240px] h-[92vh] max-h-[840px] bg-[#e4e5ea] border-2 border-zinc-950 shadow-2xl flex flex-col overflow-hidden text-zinc-900 font-zen'
            : 'flex-1 flex flex-col h-full overflow-hidden bg-[#e4e5ea]'
        }
      >
        {/* ================= ヘッダー ================= */}
        <div className="h-11 px-3.5 border-b-2 border-zinc-900 bg-[#e4e5ea] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[13.5px] sm:text-[14.5px] tracking-wide text-zinc-950 font-bold flex items-center gap-1.5 shrink-0 font-zen">
              <span className="inline-block w-2 h-2 rounded-full bg-zinc-900 animate-pulse" />
              演出インスペクター
            </span>
            <span className="text-[10px] text-zinc-600 font-mono tracking-wider truncate hidden sm:inline">
              // 全{allScenarioItems.length}シーン
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* 画面モード切り替え */}
            <button
              onClick={() => {
                soundEngine.playTerminalTab();
                onChangeViewMode('minimized');
              }}
              title="画面下のコンパクトバーに最小化（ゲーム画面を最大化して確認）"
              className="px-2 py-0.8 text-[11px] font-bold bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 cursor-pointer transition-colors"
            >
              − 最小化
            </button>

            <button
              onClick={() => {
                soundEngine.playTerminalTab();
                onChangeViewMode(isFull ? 'dock' : 'full');
              }}
              title={isFull ? '画面左ドックに戻す' : '全画面に拡大'}
              className="px-2 py-0.8 text-[11px] font-bold bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 cursor-pointer transition-colors"
            >
              {isFull ? '◧ ドック' : '⛶ 拡大'}
            </button>

            <button
              onClick={() => {
                soundEngine.playTerminalClose();
                handleStopPlayback();
                onClose();
              }}
              title="インスペクターを終了してゲーム画面に戻る [Esc]"
              className="px-2.5 py-0.8 text-[11px] font-bold bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 cursor-pointer transition-colors"
            >
              ✕ 閉じる
            </button>
          </div>
        </div>

        {/* ================= 統一プレイバックコントロールバー ================= */}
        <div className="px-3.5 py-1.5 border-b border-zinc-400/80 bg-[#dcdde2] flex flex-wrap items-center justify-between gap-1.5 shrink-0 font-zen">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={handlePrevScene}
              disabled={currentIndex <= 0}
              title="前のシーン [←]"
              className="px-2 py-1 text-[11px] font-bold bg-zinc-200 hover:bg-zinc-300 disabled:opacity-30 disabled:pointer-events-none text-zinc-900 border border-zinc-700 cursor-pointer transition-colors"
            >
              ◀ 前
            </button>

            <button
              onClick={() => {
                if (isPlayingCurrent) {
                  handleStopPlayback();
                } else {
                  handlePlayCurrentScene();
                }
              }}
              title={isPlayingCurrent ? '停止 [Space]' : '現在のシーンを再生 [Space]'}
              className={`px-3 py-1 text-[11.5px] font-bold cursor-pointer transition-colors border flex items-center gap-1.5 shadow-sm ${
                isPlayingCurrent
                  ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-800 animate-pulse'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border-zinc-950'
              }`}
            >
              <span>{isPlayingCurrent ? '⏸ 停止' : '▶ 再生'}</span>
            </button>

            <button
              onClick={handleNextScene}
              disabled={currentIndex >= filteredItems.length - 1 && !isLoop}
              title="次のシーンへ進む [→]"
              className="px-2.5 py-1 text-[11px] font-bold bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 cursor-pointer transition-colors flex items-center gap-1"
            >
              <span>次へ ▶|</span>
            </button>

            <button
              onClick={handleToggleAutoPlay}
              title="全シーンを順番に自動再生"
              className={`px-2 py-1 text-[10.5px] border cursor-pointer transition-colors flex items-center gap-1 font-bold ${
                isAutoPlay
                  ? 'bg-zinc-900 text-zinc-100 border-zinc-950'
                  : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300 border-zinc-500'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isAutoPlay ? 'bg-emerald-400 animate-ping' : 'bg-zinc-500'}`} />
              <span>連続: {isAutoPlay ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[10.5px] text-zinc-700">
            {/* ループトグル */}
            <label className="flex items-center gap-1 cursor-pointer hover:text-zinc-950 font-bold">
              <input
                type="checkbox"
                checked={isLoop}
                onChange={(e) => setIsLoop(e.target.checked)}
                className="accent-zinc-900"
              />
              <span>ループ</span>
            </label>

            {/* 送り間隔セレクタ */}
            <select
              value={autoIntervalSec}
              onChange={(e) => setAutoIntervalSec(parseFloat(e.target.value))}
              className="bg-white border border-zinc-400 px-1 py-0.5 text-[10.5px] text-zinc-900 font-zen"
            >
              <option value={0.7}>高速 (0.7s)</option>
              <option value={1.4}>標準 (1.4s)</option>
              <option value={2.2}>長め (2.2s)</option>
            </select>
          </div>
        </div>

        {/* ================= 検索 & カテゴリタブ ================= */}
        <div className="px-3 py-1.5 border-b border-zinc-400/80 bg-[#e4e5ea] flex flex-col gap-1.5 shrink-0 font-zen">
          {/* カテゴリ一覧（横スクロール） */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full [scrollbar-width:none]">
            {CATEGORY_TABS.map((cat) => {
              const count =
                cat.id === 'ALL'
                  ? allScenarioItems.length
                  : allScenarioItems.filter((i) => i.category === cat.id).length;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundEngine.playTerminalTab();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-2 py-0.8 text-[10.5px] border cursor-pointer whitespace-nowrap transition-colors flex items-center gap-1 ${
                    isActive
                      ? 'bg-zinc-900 text-zinc-100 border-zinc-950 font-bold shadow-sm'
                      : 'bg-zinc-200/90 text-zinc-700 hover:text-zinc-950 border-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[9px] px-1 py-0.2 ${
                      isActive ? 'bg-zinc-700 text-zinc-100' : 'bg-zinc-300 text-zinc-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 検索入力 & ドック表示時のサブタブ切り替え */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="セリフ・タイトル・タグ検索..."
                className="w-full bg-white border border-zinc-400 px-2.5 py-1 text-[11px] text-zinc-900 placeholder-zinc-500 focus:outline-none focus:border-zinc-950 font-zen"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1 text-zinc-500 hover:text-zinc-900 text-[10px]"
                >
                  ✕
                </button>
              )}
            </div>

            {!isFull && (
              <div className="grid grid-cols-2 gap-1 w-full">
                <button
                  onClick={() => setDockSubTab('detail')}
                  className={`py-1 text-[11px] border cursor-pointer font-bold transition-colors text-center ${
                    dockSubTab === 'detail'
                      ? 'bg-zinc-900 text-zinc-100 border-zinc-950 shadow-sm'
                      : 'bg-zinc-200 text-zinc-700 border-zinc-400 hover:border-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  台本・演出詳細
                </button>
                <button
                  onClick={() => setDockSubTab('list')}
                  className={`py-1 text-[11px] border cursor-pointer font-bold transition-colors text-center ${
                    dockSubTab === 'list'
                      ? 'bg-zinc-900 text-zinc-100 border-zinc-950 shadow-sm'
                      : 'bg-zinc-200 text-zinc-700 border-zinc-400 hover:border-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  全一覧 ({filteredItems.length})
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= メイン表示領域 ================= */}
        <div className="flex-1 flex overflow-hidden font-zen">
          {/* 左カラム：項目リスト（フルスクリーン時、またはドック時のlistタブ） */}
          {(isFull || dockSubTab === 'list') && (
            <div
              className={`border-r border-zinc-400/80 bg-[#dcdde2]/60 flex flex-col shrink-0 ${
                isFull ? 'w-[320px]' : 'w-full'
              }`}
            >
              <div className="px-3 py-1 border-b border-zinc-300 bg-[#e4e5ea] flex items-center justify-between text-[10.5px] text-zinc-600 font-zen">
                <span>一覧 ({filteredItems.length}件)</span>
                <span>
                  {currentIndex >= 0
                    ? `選択中: ${currentIndex + 1} / ${filteredItems.length}`
                    : '-'}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-zinc-300/80 p-1">
                {filteredItems.map((item) => {
                  const isSelected = activeItem?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        soundEngine.playTerminalTab();
                        setSelectedItemId(item.id);
                        if (!isFull) {
                          setDockSubTab('detail');
                        }
                      }}
                      className={`p-2.5 cursor-pointer transition-colors text-left ${
                        isSelected
                          ? 'bg-white border-l-4 border-zinc-950 pl-2 shadow-sm text-zinc-950 font-bold'
                          : 'hover:bg-white/60 text-zinc-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="px-1.5 py-0.3 text-[9.5px] font-bold bg-zinc-200 text-zinc-800 border border-zinc-400">
                          {item.categoryLabel}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono truncate max-w-[120px]">
                          {item.id}
                        </span>
                      </div>

                      <p
                        className={`text-[12.5px] font-bold line-clamp-1 mb-0.5 leading-snug ${
                          isSelected ? 'text-zinc-950' : 'text-zinc-900'
                        }`}
                      >
                        {item.title}
                      </p>

                      {item.subtitle && (
                        <p className="text-[11px] text-zinc-600 line-clamp-1 leading-snug">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  );
                })}

                {filteredItems.length === 0 && (
                  <div className="p-8 text-center text-[12px] text-zinc-500">
                    該当するシナリオ項目がありません
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 右カラム：台本詳細・演出プレビュー（フルスクリーン時、またはドック時のdetailタブ） */}
          {(isFull || dockSubTab === 'detail') && (
            <div className="flex-1 bg-[#e4e5ea] flex flex-col overflow-hidden">
              {activeItem ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* 項目メタバー & 実機再生アクション */}
                  <div className="p-2.5 border-b border-zinc-300 bg-white/70 flex items-center justify-between gap-1.5 shrink-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="px-1.5 py-0.3 text-[9.5px] font-bold bg-zinc-900 text-zinc-100 border border-zinc-950 shrink-0">
                          {activeItem.categoryLabel}
                        </span>
                        <h2 className="text-[13px] font-bold text-zinc-950 truncate font-zen">
                          {activeItem.title}
                        </h2>
                      </div>
                      {activeItem.tags && (
                        <div className="flex items-center gap-1 flex-wrap">
                          {activeItem.tags.map((t) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.2 text-[9px] bg-zinc-200 text-zinc-600 border border-zinc-300"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {isPlayingCurrent && onSkipAdvance && (
                        <button
                          onClick={onSkipAdvance}
                          className="px-2 py-0.8 text-[10.5px] font-bold bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 cursor-pointer transition-colors flex items-center gap-1 shadow-sm"
                          title="現在のタメをスキップして次のセリフへ進めます"
                        >
                          <span>⏭</span>
                          <span>送り</span>
                        </button>
                      )}

                      <button
                        onClick={handlePlayCurrentScene}
                        disabled={isPlayingCurrent}
                        className="px-2.5 py-0.8 text-[11px] font-bold bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-zinc-100 border border-zinc-950 cursor-pointer transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <span>▶</span>
                        <span>再生</span>
                      </button>

                      <button
                        onClick={() => {
                          const firstLineWithFace = activeItem.lines.find(
                            (l) => l.expression || l.faceParts
                          );
                          if (firstLineWithFace?.expression) {
                            soundEngine.playTerminalTab();
                            onApplyFaceOnly(
                              firstLineWithFace.expression,
                              firstLineWithFace.faceParts
                            );
                          }
                        }}
                        className="px-2 py-0.8 text-[10.5px] font-bold bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 cursor-pointer transition-colors"
                      >
                        表情
                      </button>
                    </div>
                  </div>

                  {/* スクロール可能領域：セリフ・演出の詳細一覧 */}
                  <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5 bg-[#e4e5ea]">
                    <div className="space-y-2">
                      <div className="text-[10.5px] font-bold text-zinc-700 tracking-wider flex items-center justify-between border-b border-zinc-400/90 pb-0.5">
                        <span>台本・演出詳細 (全{activeItem.lines.length}枠)</span>
                        <span className="text-[9.5px] text-zinc-500 font-normal">
                          各行の「▶」で単発再生
                        </span>
                      </div>

                      {activeItem.lines.map((line, lIdx) => {
                        const isAsch = line.speaker === 'ASCH';
                        const facePartsDesc = line.faceParts;
                        const hasFace = Boolean(line.expression || line.faceParts);

                        return (
                          <div
                            key={lIdx}
                            className={`p-2.5 border text-left flex flex-col gap-1.5 shadow-sm ${
                              isAsch
                                ? 'bg-white/95 border-zinc-300'
                                : 'bg-[#f4f5f8] border-zinc-300'
                            }`}
                          >
                            {/* 発話者・ボイスエフェクト・再生ボタン */}
                            <div className="flex items-center justify-between gap-1.5">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span
                                  className={`px-2 py-0.5 text-[10.5px] font-bold ${
                                    isAsch
                                      ? 'bg-zinc-900 text-zinc-100 border border-zinc-950'
                                      : 'bg-zinc-200 text-zinc-900 border border-zinc-400'
                                  }`}
                                >
                                  {isAsch ? 'ASCH (アッシュ)' : 'GUY (ガイ)'}
                                </span>

                                {line.voiceEffect && line.voiceEffect !== 'normal' && (
                                  <span className="px-1.5 py-0.2 text-[9.5px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                    声: {line.voiceEffect}
                                  </span>
                                )}

                                {line.note && (
                                  <span className="text-[10px] text-zinc-500 font-zen">
                                    ({line.note})
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                {activeItem.lines.length > 1 && lIdx > 0 && (
                                  <button
                                    onClick={() => {
                                      clearAutoTimer();
                                      setIsAutoPlay(false);
                                      setIsPlayingCurrent(true);
                                      onPreviewSequence(
                                        activeItem.lines.slice(0, lIdx + 1),
                                        () => {
                                          setIsPlayingCurrent(false);
                                        }
                                      );
                                    }}
                                    title="このセリフ枠まで本番の流れ・重なりで順番に再生"
                                    className="px-1.5 py-0.5 text-[10px] bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 cursor-pointer transition-colors flex items-center gap-1 font-bold"
                                  >
                                    <span>▶</span>
                                    <span>ここまで</span>
                                  </button>
                                )}
                                <button
                                  onClick={() => handlePlaySingleLine(line)}
                                  title="この1枠だけ単発で表示・確認"
                                  className="px-1.5 py-0.5 text-[10px] bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 cursor-pointer transition-colors flex items-center gap-1 font-bold"
                                >
                                  <span>▶</span>
                                  <span>この行</span>
                                </button>
                              </div>
                            </div>

                            {/* セリフ本文 */}
                            <div className="p-2 bg-white border border-zinc-300 text-zinc-900 text-[13px] leading-relaxed whitespace-pre-wrap break-words font-zen">
                              {line.text}
                            </div>

                            {/* 表情タグ */}
                            {isAsch && hasFace && (
                              <div className="flex items-center gap-1.5 flex-wrap pt-0.5 text-[10px]">
                                <span className="text-zinc-600 font-bold">表情:</span>
                                {line.expression && (
                                  <span className="px-1.5 py-0.2 bg-zinc-100 text-zinc-800 border border-zinc-300">
                                    {line.expression}
                                  </span>
                                )}
                                {facePartsDesc?.eyes && (
                                  <span className="px-1.5 py-0.2 bg-zinc-100 text-zinc-700 border border-zinc-200">
                                    目:{facePartsDesc.eyes}
                                  </span>
                                )}
                                {facePartsDesc?.brow && (
                                  <span className="px-1.5 py-0.2 bg-zinc-100 text-zinc-700 border border-zinc-200">
                                    眉:{facePartsDesc.brow}
                                  </span>
                                )}
                                {facePartsDesc?.mouth && (
                                  <span className="px-1.5 py-0.2 bg-zinc-100 text-zinc-700 border border-zinc-200">
                                    口:{facePartsDesc.mouth}
                                  </span>
                                )}
                                {facePartsDesc?.effects && facePartsDesc.effects.length > 0 && (
                                  <span className="px-1.5 py-0.2 bg-rose-100 text-rose-900 border border-rose-300 font-bold">
                                    エフェクト:{' '}
                                    {facePartsDesc.effects
                                      .map(
                                        (e) =>
                                          EFFECT_OPTIONS.find((o) => o.id === e)
                                            ?.label ?? e
                                      )
                                      .join(' / ')}
                                  </span>
                                )}
                              </div>
                            )}

                            {isAsch && line.secondExpression && (
                              <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-zinc-700 pl-1.5 border-l-2 border-zinc-400">
                                <span className="font-bold">後半変化 ➔</span>
                                <span className="px-1.5 py-0.2 bg-zinc-100 text-zinc-800 border border-zinc-300">
                                  {line.secondExpression}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* 逆質問の選択肢分岐 */}
                    {activeItem.extraOptions && (
                      <div className="space-y-2 pt-1.5">
                        <div className="text-[10.5px] font-bold text-zinc-700 tracking-wider border-b border-zinc-400/90 pb-0.5 flex items-center justify-between">
                          <span>返答選択肢と反応分岐 ({activeItem.extraOptions.length}個)</span>
                        </div>

                        <div className="space-y-1.5">
                          {activeItem.extraOptions.map((opt, oIdx) => (
                            <div
                              key={opt.id}
                              className="p-2.5 border border-zinc-300 bg-white/90 space-y-1.5 text-left shadow-sm"
                            >
                              <div className="flex items-center justify-between gap-1.5">
                                <span className="text-[11.5px] font-bold text-zinc-900">
                                  選択肢 {oIdx + 1}: {opt.thoughtText}
                                </span>
                                <button
                                  onClick={() => {
                                    const linesToPlay: ScriptLinePreview[] = [];
                                    const guyLines = opt.spokenText
                                      .split('\n')
                                      .map((s) => s.trim())
                                      .filter(Boolean);
                                    guyLines.forEach((g, gIdx) => {
                                      linesToPlay.push({
                                        speaker: 'GUY',
                                        text: g,
                                        voiceEffect: 'normal',
                                        waitMs:
                                          gIdx === guyLines.length - 1
                                            ? opt.waitMs
                                            : undefined,
                                      });
                                    });
                                    const aschLines = opt.aschText
                                      .split('\n')
                                      .map((s) => s.trim())
                                      .filter(Boolean);
                                    aschLines.forEach((a, aIdx) => {
                                      linesToPlay.push({
                                        speaker: 'ASCH',
                                        text: a,
                                        expression:
                                          aIdx === 0
                                            ? opt.expression
                                            : opt.secondExpression ?? opt.expression,
                                        faceParts:
                                          aIdx === 0
                                            ? opt.faceParts
                                            : opt.secondFaceParts ?? opt.faceParts,
                                        secondExpression: opt.secondExpression,
                                        secondFaceParts: opt.secondFaceParts,
                                        voiceEffect: opt.voiceEffects?.[aIdx] ?? 'normal',
                                        waitMs: opt.aschWaitMs ?? 1800,
                                        specialEffect:
                                          aIdx === aschLines.length - 1 &&
                                          opt.specialEffect === 'destroy'
                                            ? 'destroy'
                                            : undefined,
                                      });
                                    });
                                    if (opt.extraRallies) {
                                      opt.extraRallies.forEach((r) => {
                                        r.text
                                          .split('\n')
                                          .map((s) => s.trim())
                                          .filter(Boolean)
                                          .forEach((rt, rtIdx) => {
                                            linesToPlay.push({
                                              speaker: r.speaker,
                                              text: rt,
                                              expression:
                                                rtIdx === 0
                                                  ? r.expression
                                                  : r.secondExpression ?? r.expression,
                                              faceParts:
                                                rtIdx === 0
                                                  ? r.faceParts
                                                  : r.secondFaceParts ?? r.faceParts,
                                              voiceEffect: r.voiceEffect ?? 'normal',
                                              waitMs: r.waitMs,
                                              specialEffect: r.specialEffect,
                                            });
                                          });
                                        if (r.silentFaceSequence) {
                                          r.silentFaceSequence.forEach((s) => {
                                            linesToPlay.push({
                                              speaker: 'ASCH',
                                              text: '',
                                              expression: s.expression,
                                              faceParts: s.faceParts,
                                              voiceEffect: 'normal',
                                              waitMs: s.delayMs,
                                            });
                                          });
                                        }
                                      });
                                    }
                                    clearAutoTimer();
                                    setIsAutoPlay(false);
                                    setIsPlayingCurrent(true);
                                    onPreviewSequence(
                                      linesToPlay,
                                      () => {
                                        setIsPlayingCurrent(false);
                                      },
                                      opt.endingTransition
                                    );
                                  }}
                                  className="px-2 py-0.5 text-[10.5px] font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-950 cursor-pointer transition-colors"
                                >
                                  ▶ 分岐再生
                                </button>
                              </div>

                              <div className="text-[11px] text-zinc-600">
                                ガイ発話: 『{opt.spokenText}』
                              </div>

                              <div className="p-2 bg-white border border-zinc-300 text-[12.5px] text-zinc-900 leading-relaxed font-zen">
                                <span className="font-bold text-zinc-950 mr-1.5">
                                  ASCH:
                                </span>
                                {opt.aschText}
                              </div>

                              {opt.extraRallies && opt.extraRallies.length > 0 && (
                                <div className="pl-2.5 border-l-2 border-zinc-400 space-y-1 text-[11.5px]">
                                  {opt.extraRallies.map((r, rIdx) => (
                                    <div key={rIdx} className="text-zinc-800">
                                      <span
                                        className={`font-bold mr-1.5 ${
                                          r.speaker === 'ASCH'
                                            ? 'text-zinc-950'
                                            : 'text-zinc-700'
                                        }`}
                                      >
                                        {r.speaker}:
                                      </span>
                                      {r.text}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 端末セクター情報 */}
                    {activeItem.sectorData && (
                      <div className="space-y-1.5 pt-1.5 text-left">
                        <div className="text-[10.5px] font-bold text-zinc-700 tracking-wider border-b border-zinc-400/90 pb-0.5">
                          <span>端末ログ本文 (SEC DATA)</span>
                        </div>
                        <div className="p-2.5 bg-white border border-zinc-300 text-[11.5px] leading-relaxed text-zinc-800 whitespace-pre-wrap font-zen">
                          {activeItem.sectorData.unlockedContent}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-zinc-500 text-[12px]">
                  左のリストからシナリオ項目を選択してください
                </div>
              )}

              {/* フッター：シーン進行ナビゲーション */}
              <div className="h-8 px-2.5 border-t border-zinc-300 bg-[#dcdde2] flex items-center justify-between shrink-0 text-[10.5px] text-zinc-600 font-zen">
                <span className="truncate max-w-[240px]">
                  {currentIndex >= 0
                    ? `[ ${currentIndex + 1} / ${filteredItems.length} ] ${activeItem?.title}`
                    : ''}
                </span>

                <span className="hidden sm:inline text-zinc-500">
                  [Space] 再生/停止 | [→] 次へ
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
