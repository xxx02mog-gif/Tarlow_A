/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  Award,
  BookOpen,
  Info,
  Scale,
  Users,
} from 'lucide-react';
import {
  AschIncomingQuestion,
  AschQuestionReplyOption,
  BrowPartId,
  BubbleVoiceEffect,
  ConversationTopic,
  DialogueLogEntry,
  EmotionEffectId,
  EndingApproach,
  EndingDisposition,
  EndingTransitionConfig,
  ExpressionId,
  ExtraDialogueExchange,
  EyePartId,
  FaceParts,
  GamePhaseState,
  MemorySector,
  MouthPartId,
  ObservationStats,
  OralInfoEntry,
  ScreenBubble,
  SystemLogEntry,
  TopicContextCategory,
} from './types/game';
import {
  ANGRY_COOLDOWN_REACTION,
  ANGRY_COOLDOWN_REACTIONS,
  ANGRY_GLANCE_CAUGHT_LINES,
  AWAY_RETURN_REACTIONS,
  CONTEXT_IDLE_REACTIONS,
  CONVERSATION_TOPICS,
  DEFAULT_BAD_MOOD_REFUSAL_LINES,
  ENDING_SCENARIOS,
  FINAL_ASCH_QUESTION_LINE,
  FINAL_DECISION_STAGES,
  IDLE_REACTIONS,
  INITIAL_MEMORY_SECTORS,
  INITIAL_SYSTEM_LOGS,
  OPENING_ASCH_TEXT,
  PHASE1_TOPIC_SLIP_CONFIGS,
  PHASE3_SILENT_TIMEOUT_OPTIONS,
  PHASE3_WHO_AM_I_OPTIONS,
  Phase1SlipVariant,
  RETURN_FROM_IDLE_LINES,
  AWKWARD_TOPIC_PREFIXES,
  SERIOUS_TO_BRIGHT_TRANSITIONS,
  TERMINAL_GAZE_REACTIONS,
  TERMINAL_UNREVEALED_REACTIONS,
  TURN_MILESTONE_QUESTIONS,
  resolveEndingKey,
} from './data/prototypeScenario';
import {
  AschPortrait,
  DEFAULT_EXPRESSION_PARTS,
  DEFAULT_MOTION_TUNING,
  PortraitMotionTuning,
} from './components/AschPortrait';
import { DataTerminalModal } from './components/DataTerminalModal';
import { DialogueLogModal } from './components/DialogueLogModal';
import { ManualModal } from './components/ManualModal';
import { ObservationReport } from './components/ObservationReport';
import { AchievementArchiveModal } from './components/AchievementArchiveModal';
import { ExpressionDebugModal } from './components/ExpressionDebugModal';
import {
  InspectorViewMode,
  ScenarioInspectorModal,
  ScriptLinePreview,
} from './components/ScenarioInspectorModal';
import {
  ACHIEVEMENT_DEFINITIONS,
  AchievementSaveData,
  ALL_CANONICAL_DIALOGUE_LINES,
  ENDING_ARCHIVE_LIST,
  evaluateMilestoneAchievements,
  loadAchievementSave,
  NATURAL_UNLOCKABLE_SECTOR_IDS,
  persistAchievementSave,
} from './utils/achievementStore';
import { soundEngine } from './utils/chiptuneAudio';
import { getAssetUrl } from './utils/assetPath';
import { formatBubbleText, formatParagraphText } from './utils/japaneseLineWrap';
import './game.css';

// 実績17（百面相）で表情鑑賞、実績18（もう寝よう）でシナリオ台本が解放されます
const DEBUG_VIEWER_ALWAYS_VISIBLE = false;

const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 450;
const MAX_VISIBLE_BUBBLES = 3;

const DEFAULT_ROOT_FILES = [
  'base.png',
  'brow_angry.png',
  'brow_doubt.png',
  'brow_normal.png',
  'brow_pain.png',
  'brow_sad.png',
  'brow_smile.png',
  'eye_away.png',
  'eye_close.png',
  'eye_down.png',
  'eye_empty.png',
  'eye_glare.png',
  'eye_normal.png',
  'eye_pain.png',
  'eye_smile.png',
  'eye_wide.png',
  'fx_blush.png',
  'fx_pale.png',
  'fx_shadow.png',
  'fx_sweat.png',
  'fx_tears.png',
  'mouth_close.png',
  'mouth_frown.png',
  'mouth_gasp.png',
  'mouth_grit.png',
  'mouth_open.png',
  'mouth_shout.png',
  'mouth_smile.png',
  'tanmatu.png',
  'test.png',
];

const STORAGE_KEY_TEST_PNG = 'asch_asset_test_png_v3';
const STORAGE_KEY_TANMATU_PNG = 'asch_asset_tanmatu_png_v3';

const PROLOGUE_PAGES: string[][] = [
  [
    'ルークがタタル渓谷へ帰ってきてから1年が経った、ある日。',
    '俺がディストの研究所を訪ねると、部屋の隅に見覚えのある子どもがいた。',
    'ディストにどういうことなのか尋ねても、奴は管理用の端末を差し出して不気味に笑うだけだった。',
  ],
  [
    '何が何やらわからないが、放置することもできない。',
    '俺は、半ば強引にそいつを連れ帰ることにした。',
  ],
];
const TOTAL_PROLOGUE_LINES = PROLOGUE_PAGES.reduce(
  (sum, page) => sum + page.length,
  0
);

const resolveVoiceEffectWithGlitch = (
  baseEffect: BubbleVoiceEffect,
  currentErrorRate: number,
  forceGlitch = false
): BubbleVoiceEffect => {
  if (
    baseEffect === 'glitch' ||
    baseEffect === 'shout_glitch' ||
    baseEffect === 'tremble_glitch'
  ) {
    return baseEffect;
  }

  const glitchProbability =
    currentErrorRate <= 0
      ? 0
      : Math.min(0.95, (currentErrorRate / 100) * 0.9 + 0.05);

  const shouldGlitch =
    forceGlitch || (glitchProbability > 0 && Math.random() < glitchProbability);

  if (!shouldGlitch) {
    return baseEffect;
  }

  if (baseEffect === 'shout') return 'shout_glitch';
  if (baseEffect === 'tremble') return 'tremble_glitch';
  return 'glitch';
};

// セリフ枠が出る前の「表情のタメ」用の顔パーツ算出（発声前の口元：息を呑む・食いしばる・への字・閉じ）
const buildPreSpeechFaceParts = (
  expr: ExpressionId,
  parts?: Partial<FaceParts>
): Partial<FaceParts> => {
  const basePreset =
    DEFAULT_EXPRESSION_PARTS[expr] || DEFAULT_EXPRESSION_PARTS.normal;
  const brow = parts?.brow ?? basePreset.brow;
  const eyes = parts?.eyes ?? basePreset.eyes;
  const targetMouth = parts?.mouth ?? basePreset.mouth;
  const effects = parts?.effects ? [...parts.effects] : [...basePreset.effects];

  let preMouth: MouthPartId = 'close';
  if (expr === 'shock' || targetMouth === 'gasp') {
    preMouth = 'gasp';
  } else if (
    targetMouth === 'shout' ||
    targetMouth === 'grit' ||
    expr === 'pain'
  ) {
    preMouth = 'grit';
  } else if (targetMouth === 'frown' || brow === 'angry') {
    preMouth = 'frown';
  }

  return {
    brow,
    eyes,
    mouth: preMouth,
    effects,
  };
};

const getPreSpeechTameDurationMs = (
  expr: ExpressionId,
  parts?: Partial<FaceParts>
): number => {
  const eff = parts?.effects ?? [];
  if (
    expr === 'shock' ||
    expr === 'pain' ||
    eff.includes('blush') ||
    eff.includes('sweat') ||
    eff.includes('pale')
  ) {
    return 720;
  }
  return 580;
};

// 2枠連続セリフで secondFaceParts が未指定の場合でも、1枠目→2枠目のニュアンス変化に合わせて表情を自然に切り替える補助関数
const deriveAutomaticSecondFaceParts = (
  baseExpr: ExpressionId,
  firstParts: Partial<FaceParts> | undefined,
  firstLine: string,
  secondLine: string
): Partial<FaceParts> | undefined => {
  const preset =
    DEFAULT_EXPRESSION_PARTS[baseExpr] || DEFAULT_EXPRESSION_PARTS.normal;
  const brow = firstParts?.brow ?? preset.brow;
  const eyes = firstParts?.eyes ?? preset.eyes;
  const mouth = firstParts?.mouth ?? preset.mouth;
  const effects = firstParts?.effects ? [...firstParts.effects] : [...preset.effects];

  // 2枠目が「・・・・・・ふん」「・・・・・・やれやれ」「・・・・・・まあいい」等の息つき・呆れで始まる場合は閉じ目にする
  if (
    /^・・・・・・(ふん|やれやれ|まあいい|とにかく)/.test(secondLine) &&
    eyes !== 'close'
  ) {
    return {
      brow: brow === 'angry' ? 'normal' : brow,
      eyes: 'close',
      mouth: mouth === 'shout' ? 'frown' : 'close',
      effects: effects.filter((e) => e !== 'sweat'),
    };
  }

  // 1枠目が怒鳴り(shout)・見開き(wide)・息呑み(gasp)で、2枠目が「・・・・・・」で始まる落ち着いたトーンの場合
  if (
    (mouth === 'shout' || eyes === 'wide' || mouth === 'gasp') &&
    secondLine.startsWith('・・・・・・') &&
    !secondLine.includes('！！')
  ) {
    return {
      brow: brow === 'angry' ? 'sad' : brow,
      eyes: eyes === 'wide' ? 'away' : eyes === 'glare' ? 'close' : eyes,
      mouth: 'frown',
      effects,
    };
  }

  // 1枠目が閉じ目(close)で、2枠目で語りかける場合
  if (eyes === 'close' && !secondLine.startsWith('・・・・・・ふん')) {
    return {
      brow,
      eyes: 'away',
      mouth,
      effects,
    };
  }

  // 1枠目と2枠目で少し目線や口元に変化をつける（1枠目がそらしなら2枠目で伏し目or閉じ目など）
  if (
    firstLine.endsWith('！') &&
    !secondLine.endsWith('！') &&
    mouth === 'shout'
  ) {
    return {
      brow,
      eyes: eyes === 'glare' ? 'away' : eyes,
      mouth: 'frown',
      effects,
    };
  }

  return undefined;
};

interface AschBubbleItemProps {
  text: string;
  effect: BubbleVoiceEffect;
  isLatest?: boolean;
}

const AschBubbleItem: React.FC<AschBubbleItemProps> = ({
  text,
  effect,
  isLatest = true,
}) => {
  const isGlitchEffect =
    effect === 'glitch' ||
    effect === 'shout_glitch' ||
    effect === 'tremble_glitch';

  // 次のセリフ枠が送られたら（isLatest === false）グリッチも文字化けも完全に停止する
  const isGlitchy = isLatest && isGlitchEffect;

  const isShout = effect === 'shout' || effect === 'shout_glitch';
  const isTremble = effect === 'tremble' || effect === 'tremble_glitch';

  const [glitchFrame, setGlitchFrame] = useState(0);

  useEffect(() => {
    if (!isGlitchy) return;
    let count = 0;
    const maxTicks = 6; // 登場時のみ約400ms (65ms × 6回) 激しく切り替わり、その後静止
    const interval = window.setInterval(() => {
      count++;
      setGlitchFrame(count);
      if (count >= maxTicks) {
        window.clearInterval(interval);
      }
    }, 65);
    return () => window.clearInterval(interval);
  }, [isGlitchy, text]);

  // 枠の最大サイズを決定するテンプレートテキスト（文字化け時の全角グリフ幅を基準にセリフ枠の横幅・高さを決定）
  const templateText = formatBubbleText(text, effect, 0, isGlitchEffect);
  // 実際に表示するテキスト（最新枠かつグリッチ時のみ文字化け、次の枠が来たら元の正常文字）
  const displayFormattedText = isGlitchy
    ? formatBubbleText(text, effect, glitchFrame, true)
    : formatBubbleText(text, effect, 0, false);

  const isMultiLine3Plus = templateText.split('\n').length >= 3;

  const bubbleEffectClass = !isLatest
    ? isShout
      ? 'bubble-voice-shout'
      : isTremble
        ? 'bubble-voice-tremble'
        : ''
    : effect === 'shout'
      ? 'bubble-voice-shout'
      : effect === 'tremble'
        ? 'bubble-voice-tremble'
        : effect === 'glitch'
          ? 'bubble-voice-glitch'
          : effect === 'shout_glitch'
            ? 'bubble-voice-shout-glitch'
            : effect === 'tremble_glitch'
              ? 'bubble-voice-tremble-glitch'
              : '';

  const textSizeClass = isShout
    ? 'text-size-shout'
    : isTremble
      ? 'text-size-tremble'
      : 'text-size-normal';

  const textEffectClass = isGlitchy ? 'text-voice-glitch' : '';

  return (
    <div
      className={`relative w-fit max-w-[404px] bg-[#09090b] text-zinc-100 px-3.5 ${
        isMultiLine3Plus ? 'py-1.5' : 'py-2'
      } ${bubbleEffectClass}`}
    >
      {/* 色ズレ極細直線ノイズ（最新のグリッチ枠のみ不定期出現） */}
      {isGlitchy && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          <div className="bubble-glitch-h-line-red" />
          <div className="bubble-glitch-h-line-cyan" />
        </div>
      )}

      {/* 基準サイズ決定レイヤー（不可視）：
          文字化け時の最大全角グリフ幅を基準にセリフ枠の縦横サイズを固定。
          各行をwhitespace-nowrapで保持することで予期せぬ改行落ちやはみ出しを100%防止 */}
      <div
        aria-hidden="true"
        className={`invisible select-none pointer-events-none ${textSizeClass} ${
          isMultiLine3Plus ? '!leading-[1.3]' : ''
        }`}
      >
        {templateText.split('\n').map((line, idx) => (
          <div key={idx} className="whitespace-nowrap">
            {line}
          </div>
        ))}
      </div>

      {/* 実際の表示テキスト（絶対配置オーバーレイ）：
          基準レイヤーと全く同一の行構造で文字化けを描画。絶対に枠からはみ出さない */}
      <div
        className={`absolute inset-0 px-3.5 ${
          isMultiLine3Plus ? 'py-1.5' : 'py-2'
        } z-10 ${textSizeClass} ${
          isMultiLine3Plus ? '!leading-[1.3]' : ''
        } ${textEffectClass}`}
      >
        {displayFormattedText.split('\n').map((line, idx) => (
          <div key={idx} className="whitespace-nowrap">
            {line}
          </div>
        ))}
      </div>

      {/* 右向きポインタ */}
      <div className="w-0 h-0 absolute -right-[10px] top-2.5 border-y-[7px] border-y-transparent border-l-[11px] border-l-[#09090b]" />
    </div>
  );
};

interface QueuedStep {
  delayMs: number;
  action: () => void;
  isBubble?: boolean;
  isTerminal?: boolean;
}

interface OccurredPhase1Slip {
  topicId: string;
  shortLabel: string;
  variant: Phase1SlipVariant;
}

const createInitialPhase1SlipTurns = (): number[] => {
  const slipCount = Math.random() < 0.45 ? 1 : 2;
  const pool = [1, 2, 3, 4, 5];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, slipCount).sort((a, b) => a - b);
};

const createInitialStats = (): ObservationStats => ({
  sessionId: `OBS-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
  startTime: Date.now(),
  endTime: null,
  totalTurns: 0,
  completedTopicsCount: 0,
  totalResponseTimeMs: 0,
  quickReplyCount: 0,
  choiceHoverSwitchCount: 0,
  idleTimeoutCount: 0,
  tabSwitchCount: 0,
  terminalOpenCount: 0,
  terminalTotalDurationMs: 0,
  overrideCount: 0,
  purgeCount: 0,
});

/**
 * セリフの文字数・話者交代に応じた「基本の秒数」（標準テンポ）
 * - 特別なタメ・長秒数はED演出（waitMs指定）のみに限定し、それ以外は快適な標準秒数を適用
 * - 同一話者の改行送り: 約700ms〜950ms
 * - 話者交代時の呼吸: 約900ms〜1,200ms
 * - 最小保証: 680ms、最大上限: 1,300ms
 */
function calculateLineDelayMs(
  text: string,
  options?: {
    isSpeakerChange?: boolean;
    typingSpeed?: 'slow' | 'normal' | 'fast' | 'laggy';
    extraTameMs?: number;
  }
): number {
  const trimmed = text.trim();
  const len = trimmed.length;

  let ms = options?.isSpeakerChange ? 820 + len * 22 : 620 + len * 18;

  if (options?.typingSpeed === 'slow') {
    ms += 180;
  } else if (options?.typingSpeed === 'laggy') {
    ms += 140;
  } else if (options?.typingSpeed === 'fast') {
    ms -= 120;
  }

  if (options?.extraTameMs) {
    ms += options.extraTameMs;
  }

  const minMs = options?.isSpeakerChange ? 880 : 680;
  const maxMs = options?.isSpeakerChange ? 1300 : 1050;
  return Math.min(maxMs, Math.max(minMs, Math.round(ms)));
}

export default function App() {
  // === 16:9 (800x450) 固定キャンバスの拡大・縮小スケール計算 ＆ スマホ縦持ち時の横画面自動回転 ===
  const [stageScale, setStageScale] = useState<number>(1);
  const [isPortraitRotated, setIsPortraitRotated] = useState<boolean>(false);
  const [isCompactViewport, setIsCompactViewport] = useState<boolean>(false);
  const [isScenarioInspectorOpen, setIsScenarioInspectorOpen] =
    useState<boolean>(false);
  const [inspectorViewMode, setInspectorViewMode] =
    useState<InspectorViewMode>('dock');
  const previousPhaseBeforeInspectorRef = useRef<GamePhaseState | null>(null);

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const portrait = h > w;
      setIsPortraitRotated(portrait);

      // インスペクターがドックモードで開いている場合、左側のパネル幅(約400px)を差し引いてキャンバスを最適スケーリング
      const dockWidth =
        isScenarioInspectorOpen && inspectorViewMode === 'dock' && w >= 960
          ? Math.min(410, Math.floor(w * 0.38))
          : 0;

      const effectiveW = portrait ? h : Math.max(380, w - dockWidth);
      const effectiveH = portrait ? w : h;
      const scale = Math.min((effectiveW - 16) / STAGE_WIDTH, (effectiveH - 16) / STAGE_HEIGHT);
      setStageScale(Math.max(0.2, scale));

      const shortSide = Math.min(w, h);
      const longSide = Math.max(w, h);
      const isCoarsePointer =
        window.matchMedia?.('(pointer: coarse)').matches ?? false;
      setIsCompactViewport(
        shortSide <= 540 || (isCoarsePointer && longSide <= 1024)
      );
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    window.addEventListener('orientationchange', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('orientationchange', updateScale);
    };
  }, [isScenarioInspectorOpen, inspectorViewMode]);

  const [availableRootFiles, setAvailableRootFiles] = useState<Set<string>>(
    () => new Set(DEFAULT_ROOT_FILES)
  );
  const [availablePartFiles, setAvailablePartFiles] = useState<Set<string>>(
    () => new Set()
  );

  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);

  // 起動時（タイトル画面表示中）に存在する全画像・BGMファイルを確認し、事前プリロード・セットする
  useEffect(() => {
    let cancelled = false;
    const preloadUrl = (url: string) => {
      const img = new Image();
      img.decoding = 'sync';
      img.src = url;
    };

    preloadUrl(getAssetUrl('images/test.png'));
    preloadUrl(getAssetUrl('images/tanmatu.png'));
    DEFAULT_ROOT_FILES.forEach((f) => preloadUrl(getAssetUrl(`images/${f}`)));

    fetch('/api/available-assets')
      .then((res) => res.json())
      .then(
        (data: {
          rootFiles?: string[];
          partFiles?: string[];
          audioUrls?: string[];
        }) => {
          if (cancelled) return;
          const roots = (data.rootFiles ?? DEFAULT_ROOT_FILES).map((f) =>
            f.toLowerCase()
          );
          const parts = (data.partFiles ?? []).map((f) => f.toLowerCase());
          const audios = data.audioUrls ?? [];

          setAvailableRootFiles(new Set(roots));
          setAvailablePartFiles(new Set(parts));

          roots.forEach((f) => preloadUrl(getAssetUrl(`images/${f}`)));
          parts.forEach((f) => preloadUrl(getAssetUrl(`images/parts/${f}`)));

          if (audios.length > 0) {
            soundEngine.setBgmUrl(audios[0]);
          }
        }
      )
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const [customTestPng, setCustomTestPng] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_TEST_PNG);
    } catch {
      return null;
    }
  });
  const [customTanmatuPng, setCustomTanmatuPng] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_TANMATU_PNG);
    } catch {
      return null;
    }
  });
  const [customPartMap, setCustomPartMap] = useState<Record<string, string>>({});
  const [previewTab, setPreviewTab] = useState<'雑談' | '端末' | '追求'>('雑談');
  const [previewPage, setPreviewPage] = useState<number>(0);

  const handleLoadImageFile = (file: File, target?: 'test' | 'tanmatu' | 'part') => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        const dataUrl = reader.result;
        const lowerName = file.name.toLowerCase();

        const isPartFile =
          target === 'part' ||
          /^(base|brow_[a-z0-9_]+|eye_[a-z0-9_]+|mouth_[a-z0-9_]+|fx_[a-z0-9_]+)\.png$/.test(
            lowerName
          );

        if (isPartFile) {
          setCustomPartMap((prev) => ({ ...prev, [lowerName]: dataUrl }));
          setAvailablePartFiles((prev) => new Set([...prev, lowerName]));
          try {
            await fetch('/api/save-asset', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ filename: lowerName, dataUrl }),
            });
          } catch {
            // ignore
          }
          return;
        }

        const filename =
          target === 'tanmatu' || lowerName.includes('tanmatu')
            ? 'tanmatu.png'
            : 'test.png';

        setAvailableRootFiles((prev) => new Set([...prev, filename]));

        if (filename === 'test.png') {
          setCustomTestPng(dataUrl);
          try {
            localStorage.setItem(STORAGE_KEY_TEST_PNG, dataUrl);
          } catch {
            // ignore
          }
        } else {
          setCustomTanmatuPng(dataUrl);
          try {
            localStorage.setItem(STORAGE_KEY_TANMATU_PNG, dataUrl);
          } catch {
            // ignore
          }
        }

        try {
          await fetch('/api/save-asset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, dataUrl }),
          });
        } catch {
          // ignore
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // === ゲーム進行フェーズ ===
  const [gamePhase, setGamePhase] = useState<GamePhaseState>('TITLE');
  const [prologueStep, setPrologueStep] = useState<number>(0);
  const [endingStep, setEndingStep] = useState<number>(0);

  useEffect(() => {
    if (gamePhase === 'PLAYING') {
      soundEngine.setPlayingPhase(true);
    } else {
      soundEngine.stopBgm();
      soundEngine.setPlayingPhase(false);
    }
  }, [gamePhase]);

  // === 対話ステート・機嫌パラメータ（裏パラメータ）・消化状況 ===
  // topicAskCounts[topicId] は「何段階目まで消化したか」を保持し、stages.length に達した話題は二度と繰り返されない
  const [topicAskCounts, setTopicAskCounts] = useState<Record<string, number>>({});
  const [sessionSeed, setSessionSeed] = useState<number>(() =>
    Math.floor(Math.random() * 10000)
  );
  const [trustLevel, setTrustLevel] = useState<number>(0);
  // ガイの嫌悪・決裂ポイント（2以上で嫌悪・決裂モードへ不可逆突入）
  const [hatredPoints, setHatredPoints] = useState<number>(0);
  // アッシュの機嫌パラメータ（-5 〜 +5、0が通常、マイナスが不機嫌・怒り、プラスが軟化・上機嫌）
  const [mood, setMood] = useState<number>(0);
  const moodRef = useRef<number>(0);
  const moodWarningGivenRef = useRef<boolean>(false);
  useEffect(() => {
    moodRef.current = mood;
  }, [mood]);
  // ガイ側の機嫌パラメータ（-5 〜 +5、マイナスでガイが不機嫌モード）
  const [guyMood, setGuyMood] = useState<number>(0);
  // アッシュの頭部インタラクション（撫でる）回数カウンター
  const [headPatCount, setHeadPatCount] = useState<number>(0);

  const [linkTags, setLinkTags] = useState<string[]>([]);
  const [phase1QuestionsCount, setPhase1QuestionsCount] = useState<number>(0);
  const [phase1AskedTopicIds, setPhase1AskedTopicIds] = useState<string[]>([]);
  const [phase1TargetSlipTurns, setPhase1TargetSlipTurns] = useState<number[]>(
    createInitialPhase1SlipTurns
  );
  const [phase1PendingSlipCarry, setPhase1PendingSlipCarry] =
    useState<boolean>(false);
  const [phase1OccurredSlips, setPhase1OccurredSlips] = useState<
    OccurredPhase1Slip[]
  >([]);
  const [phase1AccuseStep, setPhase1AccuseStep] = useState<
    'NONE' | 'SELECT_TOPIC' | 'SELECT_REASON'
  >('NONE');
  const [phase1AccusedTopicId, setPhase1AccusedTopicId] = useState<
    string | null
  >(null);
  const [phase1ReasonChoices, setPhase1ReasonChoices] = useState<
    {
      id:
        | 'REWRITE'
        | 'PRE_FACE'
        | 'CALL_NAME'
        | 'BLUFF_TONE'
        | 'BLUFF_DELAY'
        | 'BLUFF_MANNER';
      label: string;
      isCorrect: boolean;
    }[]
  >([]);
  const [activeAschQuestion, setActiveAschQuestion] =
    useState<AschIncomingQuestion | null>(null);
  const [activeTopicReply, setActiveTopicReply] = useState<{
    topicId: string;
    options: AschQuestionReplyOption[];
  } | null>(null);
  const activeTopicReplyRef = useRef(activeTopicReply);
  activeTopicReplyRef.current = activeTopicReply;
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<string[]>([]);
  const [aschQuestionsDisabled, setAschQuestionsDisabled] =
    useState<boolean>(false);
  const [lastAskedTopicId, setLastAskedTopicId] = useState<string | null>(null);
  const [lastRefusedTopicId, setLastRefusedTopicId] = useState<string | null>(null);

  // 『┃ アッシュをどうするか決める』を押した際の決断サブメニュー開閉
  const [isDecisionMenuOpen, setIsDecisionMenuOpen] = useState<boolean>(false);

  const [visibleBubbles, setVisibleBubbles] = useState<ScreenBubble[]>([]);
  const [isSequencing, setIsSequencing] = useState<boolean>(false);
  const [isAschExited, setIsAschExited] = useState<boolean>(false);
  const [isAschCollapsed, setIsAschCollapsed] = useState<boolean>(false);
  const isAschAbsent = isAschExited || isAschCollapsed;

  // アッシュ退場時（立ち去り・崩壊）は開いている各種メニューやモーダルを閉じる
  useEffect(() => {
    if (isAschAbsent) {
      setIsTerminalOpen(false);
      setIsDialogueLogOpen(false);
      setIsManualOpen(false);
      setIsDecisionMenuOpen(false);
    }
  }, [isAschAbsent]);
  const [eyeGlitchPulse, setEyeGlitchPulse] = useState<number>(0);
  const [screenShakePulse, setScreenShakePulse] = useState<number>(0);
  const [isScreenShaking, setIsScreenShaking] = useState<boolean>(false);

  useEffect(() => {
    if (screenShakePulse <= 0) return;
    setIsScreenShaking(true);
    const timer = window.setTimeout(() => setIsScreenShaking(false), 440);
    return () => window.clearTimeout(timer);
  }, [screenShakePulse]);
  const [endingDisposition, setEndingDisposition] = useState<EndingDisposition>('KEEP');
  const [customEndingKey, setCustomEndingKey] = useState<string | null>(null);

  // === 内部パラメーター・ログ・観測記録リスト ===
  const orderCounterRef = useRef<number>(10);
  const nextOrderStamp = useCallback(() => {
    orderCounterRef.current += 1;
    return Date.now() * 1000 + orderCounterRef.current;
  }, []);

  const [sectors, setSectors] = useState<MemorySector[]>(INITIAL_MEMORY_SECTORS);
  const [readSectorIds, setReadSectorIds] = useState<string[]>([]);
  const [oralInfos, setOralInfos] = useState<OralInfoEntry[]>([]);
  const [logs, setLogs] = useState<SystemLogEntry[]>(INITIAL_SYSTEM_LOGS);
  const [dialogueHistory, setDialogueHistory] = useState<DialogueLogEntry[]>([]);
  const [stats, setStats] = useState<ObservationStats>(createInitialStats);

  // === 演出・表情パーツステート ===
  const [overrideExpression, setOverrideExpression] = useState<ExpressionId | null>(null);
  const [overrideFaceParts, setOverrideFaceParts] = useState<Partial<FaceParts> | null>(null);
  const [hasUnreadSector, setHasUnreadSector] = useState<boolean>(false);

  // === モーダル開閉ステート ===
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isDialogueLogOpen, setIsDialogueLogOpen] = useState<boolean>(false);
  const [isManualOpen, setIsManualOpen] = useState<boolean>(false);
  const [isDebugViewerOpen, setIsDebugViewerOpen] = useState<boolean>(false);
  const [debugPreviewState, setDebugPreviewState] = useState<{
    expression: ExpressionId;
    faceParts: FaceParts;
  } | null>(null);
  const [motionTuning, setMotionTuning] = useState<PortraitMotionTuning>(
    DEFAULT_MOTION_TUNING
  );
  const [replayPulse, setReplayPulse] = useState<number>(0);
  const [isAchievementModalOpen, setIsAchievementModalOpen] =
    useState<boolean>(false);
  const [achievementSave, setAchievementSave] = useState<AchievementSaveData>(
    () => loadAchievementSave()
  );
  const [achievementToasts, setAchievementToasts] = useState<
    {
      toastId: string;
      id: string;
      numberLabel: string;
      title: string;
      description: string;
    }[]
  >([]);
  const prevUnlockedAchIdsRef = useRef<string[]>(
    achievementSave.unlockedAchievementIds
  );
  const toastTimersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      toastTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      toastTimersRef.current = [];
    };
  }, []);

  // 実績が新規解除された瞬間にポップアップ通知を表示
  useEffect(() => {
    const prevIds = prevUnlockedAchIdsRef.current;
    const currentIds = achievementSave.unlockedAchievementIds;

    // 実績モーダルを開いて引き継ぎコード読込・初期化した場合は通知を出さず同期のみ行う
    if (isAchievementModalOpen) {
      prevUnlockedAchIdsRef.current = currentIds;
      return;
    }

    const newlyUnlockedIds = currentIds.filter((id) => !prevIds.includes(id));
    prevUnlockedAchIdsRef.current = currentIds;

    if (newlyUnlockedIds.length === 0) return;

    const newToasts = newlyUnlockedIds
      .map((id) => {
        const def = ACHIEVEMENT_DEFINITIONS.find((a) => a.id === id);
        if (!def) return null;
        return {
          toastId: `ach-toast-${id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          id: def.id,
          numberLabel: def.numberLabel,
          title: def.title,
          description: def.description,
        };
      })
      .filter((t): t is NonNullable<typeof t> => t !== null);

    if (newToasts.length === 0) return;

    soundEngine.playAchievementUnlock();
    setAchievementToasts((prev) => [...prev, ...newToasts]);

    newToasts.forEach((t) => {
      const timer = window.setTimeout(() => {
        setAchievementToasts((prev) =>
          prev.filter((item) => item.toastId !== t.toastId)
        );
        toastTimersRef.current = toastTimersRef.current.filter(
          (id) => id !== timer
        );
      }, 3600);
      toastTimersRef.current.push(timer);
    });
  }, [achievementSave.unlockedAchievementIds, isAchievementModalOpen]);

  const handleUpdateAchievementSave = useCallback(
    (
      updater:
        | AchievementSaveData
        | ((prev: AchievementSaveData) => AchievementSaveData)
    ) => {
      setAchievementSave((prev) => {
        const rawNext =
          typeof updater === 'function' ? updater(prev) : updater;
        const evaluated = evaluateMilestoneAchievements(rawNext);
        persistAchievementSave(evaluated);
        return evaluated;
      });
    },
    []
  );

  const unlockAchievements = useCallback(
    (...achIds: string[]) => {
      if (achIds.length === 0) return;
      handleUpdateAchievementSave((prev) => {
        const missing = achIds.filter(
          (id) => !prev.unlockedAchievementIds.includes(id)
        );
        if (missing.length === 0) return prev;
        return {
          ...prev,
          unlockedAchievementIds: [...prev.unlockedAchievementIds, ...missing],
        };
      });
    },
    [handleUpdateAchievementSave]
  );

  const recordSeenLine = useCallback(
    (line: string) => {
      const trimmed = line.trim();
      if (!trimmed || !ALL_CANONICAL_DIALOGUE_LINES.has(trimmed)) return;
      handleUpdateAchievementSave((prev) => {
        if (prev.seenLines.includes(trimmed)) return prev;
        return {
          ...prev,
          seenLines: [...prev.seenLines, trimmed],
        };
      });
    },
    [handleUpdateAchievementSave]
  );

  // === 時間計測・行動計測・シーケンスキューRef ===
  const [idleWaitSec, setIdleWaitSec] = useState<number>(0);
  const choiceShownAtRef = useRef<number>(Date.now());
  const terminalOpenedAtRef = useRef<number | null>(null);
  const terminalActionTakenRef = useRef<boolean>(false);
  const pendingClimaxDilemmaRef = useRef<boolean>(false);
  const lastTerminalGazeAtRef = useRef<number>(0);
  const terminalGazeReactionCountRef = useRef<number>(0);
  const terminalUnrevealedReactionCountRef = useRef<number>(0);
  const totalIdleReactionCountRef = useRef<number>(0);
  const angryCooldownCountRef = useRef<number>(0);
  const angryCooldownTargetSecRef = useRef<number>(35);
  const isAngryGlancingRef = useRef<boolean>(false);
  const angryGlancesDoneInWaitRef = useRef<number>(0);
  const angryGlancesMaxInWaitRef = useRef<number>(1);
  const nextAngryGlanceAtSecRef = useRef<number>(12);
  const angryGlanceEndAtSecRef = useRef<number>(0);
  const badMoodRefusalCountRef = useRef<number>(0);
  const badMoodHintShownRef = useRef<boolean>(false);

  const resetAngryGlanceSchedule = useCallback(() => {
    isAngryGlancingRef.current = false;
    angryGlancesDoneInWaitRef.current = 0;
    angryGlancesMaxInWaitRef.current = Math.random() < 0.5 ? 1 : 2;
    nextAngryGlanceAtSecRef.current = Math.floor(8 + Math.random() * 7);
    angryGlanceEndAtSecRef.current = 0;
  }, []);
  const tabHiddenAtRef = useRef<number | null>(null);
  const lastAwayReactionAtRef = useRef<number>(0);
  const awayReactionCountRef = useRef<number>(0);
  const lastHoveredChoiceIdRef = useRef<string | null>(null);
  const cycledPagesInTurnRef = useRef<number>(0);
  const touchChoiceStateRef = useRef<{ id: string; movedOff: boolean } | null>(
    null
  );
  const lastContextCategoryRef = useRef<TopicContextCategory>('daily');
  const lastDecisionExecutedAtRef = useRef<number>(0);
  const lastMilestoneQuestionTurnRef = useRef<number>(0);
  const totalTurnsRef = useRef<number>(0);
  const idleStageRef = useRef<number>(0);
  const pendingStepsRef = useRef<QueuedStep[]>([]);
  const activeTimeoutRef = useRef<number | null>(null);
  const isSequencingRef = useRef<boolean>(false);

  const isHatredMode =
    hatredPoints >= 2 || linkTags.includes('tag_hatred_locked');

  const forcedOverrideCount = sectors.filter(
    (s) => s.unlocked && s.unlockedMethod === 'OVERRIDE'
  ).length;

  const endingApproach: EndingApproach = !linkTags.includes('phase2_started')
    ? 'HATRED'
    : !linkTags.includes('p2_heard_true_reason')
      ? 'ACCOMPLICE'
      : 'HUMAN';

  const isPhase2OrLater = linkTags.includes('phase2_started');

  // 機嫌に応じた基本の立ち絵表情（フェーズ1では外面上は冷静な機械のすまし顔を維持し、内部の感情波形のみ揺れる）
  const baseMoodExpression: ExpressionId =
    mood < 0 && isPhase2OrLater ? 'glare' : 'normal';

  const sceneExpression: ExpressionId = overrideExpression ?? baseMoodExpression;

  // 現在の場面・機嫌に応じた「眉・目・口・感情」の組み合わせ算出
  const computedSceneParts: FaceParts = (() => {
    const basePreset =
      DEFAULT_EXPRESSION_PARTS[sceneExpression] || DEFAULT_EXPRESSION_PARTS.normal;
    const custom =
      overrideFaceParts ??
      (mood < 0 && isPhase2OrLater
        ? { brow: 'angry', eyes: 'glare', mouth: 'frown' }
        : {});

    let brow: BrowPartId = custom.brow ?? basePreset.brow;
    let eyes: EyePartId = custom.eyes ?? basePreset.eyes;
    let mouth: MouthPartId = custom.mouth ?? basePreset.mouth;
    let effects: EmotionEffectId[] = custom.effects
      ? [...custom.effects]
      : [...basePreset.effects];

    // 不機嫌（怒り）状態のときは、微笑みパーツにならないよう怒り眉・不機嫌口を維持（フェーズ2以降）
    if (mood < 0 && isPhase2OrLater && !overrideFaceParts) {
      brow = 'angry';
      mouth = 'frown';
    }

    return { brow, eyes, mouth, effects };
  })();

  const activeExpression: ExpressionId =
    debugPreviewState?.expression ?? sceneExpression;
  const activeFaceParts: FaceParts =
    debugPreviewState?.faceParts ?? computedSceneParts;

  const isBonusViewerUnlocked =
    achievementSave.unlockedAchievementIds.includes('ach_17');
  const canAccessExpressionViewer =
    DEBUG_VIEWER_ALWAYS_VISIBLE || isBonusViewerUnlocked;

  const canAccessScenarioInspector =
    DEBUG_VIEWER_ALWAYS_VISIBLE ||
    achievementSave.unlockedAchievementIds.includes('ach_18');

  const updateMood = useCallback(
    (delta: number) => {
      if (delta === 0) return;
      setMood((prev) => {
        const base = delta < 0 && prev > 0 ? 0 : prev;
        const next = Math.max(-5, Math.min(5, base + delta));
        if (prev >= 0 && next < 0) {
          angryCooldownTargetSecRef.current = Math.floor(
            25 + Math.random() * 26
          );
          resetAngryGlanceSchedule();
        } else if (next >= 0) {
          isAngryGlancingRef.current = false;
          badMoodRefusalCountRef.current = 0;
        }
        moodRef.current = next;
        return next;
      });
    },
    [resetAngryGlanceSchedule]
  );

  const updateGuyMood = useCallback((delta: number) => {
    if (delta === 0) return;
    setGuyMood((prev) => Math.max(-5, Math.min(5, prev + delta)));
  }, []);

  const addOralInfo = useCallback(
    (entry?: OralInfoEntry) => {
      if (!entry) return;
      const stamp = nextOrderStamp();
      setOralInfos((prev) => {
        if (prev.some((item) => item.id === entry.id)) return prev;
        setHasUnreadSector(true);
        return [{ ...entry, recordedAt: stamp }, ...prev];
      });
    },
    [nextOrderStamp]
  );

  const clearPendingSequence = useCallback(() => {
    if (activeTimeoutRef.current !== null) {
      window.clearTimeout(activeTimeoutRef.current);
      activeTimeoutRef.current = null;
    }
    pendingStepsRef.current = [];
  }, []);

  const runNextQueuedStep = useCallback(() => {
    if (activeTimeoutRef.current !== null) {
      window.clearTimeout(activeTimeoutRef.current);
      activeTimeoutRef.current = null;
    }

    if (pendingStepsRef.current.length === 0) {
      isSequencingRef.current = false;
      setIsSequencing(false);
      choiceShownAtRef.current = Date.now();
      setIdleWaitSec(0);
      return;
    }

    const nextStep = pendingStepsRef.current[0];
    activeTimeoutRef.current = window.setTimeout(() => {
      activeTimeoutRef.current = null;
      const step = pendingStepsRef.current.shift();
      if (step) {
        step.action();
      }
      runNextQueuedStep();
    }, nextStep.delayMs);
  }, []);

  const enqueueSequence = useCallback(
    (steps: QueuedStep[]) => {
      clearPendingSequence();
      if (steps.length === 0) {
        isSequencingRef.current = false;
        setIsSequencing(false);
        return;
      }
      isSequencingRef.current = true;
      setIsSequencing(true);
      pendingStepsRef.current = [...steps];
      runNextQueuedStep();
    },
    [clearPendingSequence, runNextQueuedStep]
  );

  const handleSkipCurrentDelay = useCallback(() => {
    soundEngine.unlockOnUserInteraction();
    if (!isSequencing || pendingStepsRef.current.length === 0) return;
    if (isTerminalOpen || isDialogueLogOpen || isManualOpen) return;
    if (Date.now() - lastDecisionExecutedAtRef.current < 450) return;

    if (activeTimeoutRef.current !== null) {
      window.clearTimeout(activeTimeoutRef.current);
      activeTimeoutRef.current = null;
    }

    // 1回のタップで「次のセリフ枠（吹き出し表示）」または「終了処理」まで一気に進める
    let reachedBubbleOrEnd = false;
    while (pendingStepsRef.current.length > 0 && !reachedBubbleOrEnd) {
      const step = pendingStepsRef.current.shift();
      if (step) {
        step.action();
        if (step.isBubble || step.isTerminal || pendingStepsRef.current.length === 0) {
          reachedBubbleOrEnd = true;
        }
      }
    }

    runNextQueuedStep();
  }, [
    isSequencing,
    isTerminalOpen,
    isDialogueLogOpen,
    isManualOpen,
    runNextQueuedStep,
  ]);

  // === 画面上のセリフ枠（最大3つ）に新しい1枠を下から追加（overwriteLastSameSpeaker=true の場合は直前の同話者枠を1つの枠内で上書き） ===
  const pushScreenBubble = useCallback(
    (
      speaker: 'ASCH' | 'GUY',
      text: string,
      voiceEffect: BubbleVoiceEffect = 'normal',
      overwriteLastSameSpeaker = false
    ) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      soundEngine.playBubblePop(speaker, voiceEffect);
      recordSeenLine(trimmed);

      if (voiceEffect === 'shout' || voiceEffect === 'shout_glitch') {
        if (speaker === 'GUY') {
          // ガイの叫びに対してアッシュがハッとする（立ち絵の微細リアクション）
          setReplayPulse((p) => p + 1);
        }
      }

      const newBubbleId = `bbl-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

      setVisibleBubbles((prev) => {
        const activeList = prev.filter((b) => !b.exiting);
        if (
          overwriteLastSameSpeaker &&
          activeList.length > 0 &&
          activeList[activeList.length - 1].speaker === speaker
        ) {
          const updated = [...activeList];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text: trimmed,
            voiceEffect,
          };
          return updated;
        }

        const next = [
          ...activeList,
          {
            id: newBubbleId,
            speaker,
            text: trimmed,
            voiceEffect,
            exiting: false,
          },
        ];

        const calcTotalHeight = (list: typeof next) =>
          list.reduce((sum, b) => {
            const formatted = formatBubbleText(b.text, b.voiceEffect ?? 'normal');
            const linesCount = formatted.split('\n').length;
            // py-2/py-1.5 (~12px padding) + linesCount * line-height (~18px) + mb-2 (8px margin)
            return sum + 12 + linesCount * 18 + 8;
          }, 0);

        while (
          next.length > 1 &&
          (next.length > MAX_VISIBLE_BUBBLES || calcTotalHeight(next) > 206)
        ) {
          next.shift();
        }
        return next;
      });

      setDialogueHistory((prev) => [
        ...prev,
        {
          id: `dlg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          speaker,
          lines: [trimmed],
        },
      ]);
    },
    [recordSeenLine]
  );

  // === 全シナリオ台本用の実機プレビュー実行（本番の演出・タメ・分割・積み重ねと完全同期） ===
  const handlePreviewInspectorSequence = useCallback(
    (
      lines: ScriptLinePreview[],
      onComplete?: () => void,
      endingTransition?: EndingTransitionConfig
    ) => {
      soundEngine.unlockOnUserInteraction();
      if (endingTransition && !endingTransition.keepBgm) {
        // EDプレビュー時はBGMを即座に停止（ただしEND 02等のkeepBgm指定時は継続）
        soundEngine.stopBgm();
        soundEngine.setPlayingPhase(false);
      } else if (gamePhase !== 'PLAYING') {
        setGamePhase('PLAYING');
        soundEngine.setPlayingPhase(true);
      }
      clearPendingSequence();
      setVisibleBubbles([]);
      setIsAschExited(false);
      setIsAschCollapsed(false);
      setEyeGlitchPulse(0);

      // 1. 各行に \n が含まれている場合は本番と同様に複数枠（1枠目・2枠目）へ自動分割・平坦化
      const expandedLines: ScriptLinePreview[] = [];
      lines.forEach((line) => {
        const splitTexts = line.text
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
        if (splitTexts.length <= 1) {
          expandedLines.push(line);
        } else {
          splitTexts.forEach((st, sIdx) => {
            expandedLines.push({
              ...line,
              text: st,
              expression:
                sIdx === 0
                  ? line.expression
                  : line.secondExpression ?? line.expression,
              faceParts:
                sIdx === 0
                  ? line.faceParts
                  : line.secondFaceParts ?? line.faceParts,
            });
          });
        }
      });

      const steps: QueuedStep[] = [];
      let lastSpeaker: 'GUY' | 'ASCH' | null = null;
      let lastLineText = '';
      const isEndingScene = Boolean(endingTransition);

      expandedLines.forEach((line, idx) => {
        const prevLine = idx > 0 ? expandedLines[idx - 1] : undefined;
        // 特別な文字送り（waitMs）はED演出のみに適用し、それ以外の通常シーンは基本の秒数を適用
        let delay: number;
        if (idx === 0) {
          delay = 280;
        } else {
          if (isEndingScene) {
            delay = prevLine?.waitMs ?? 1200;
          } else {
            const isSpeakerChange = lastSpeaker !== line.speaker;
            delay = calculateLineDelayMs(lastLineText, { isSpeakerChange });
          }
        }

        // アッシュ発話前の一拍「タメ」演出（表情先行変化）
        if (
          line.speaker === 'ASCH' &&
          (line.expression || line.faceParts) &&
          prevLine?.specialEffect !== 'destroy'
        ) {
          const preFaceTime = Math.max(120, Math.round(delay * 0.35));
          steps.push({
            delayMs: Math.max(80, delay - preFaceTime),
            action: () => {
              if (line.expression) setOverrideExpression(line.expression);
              if (line.faceParts) {
                setOverrideFaceParts((prev) => ({
                  ...(prev ??
                    DEFAULT_EXPRESSION_PARTS[line.expression ?? activeExpression]),
                  ...line.faceParts,
                }));
              }
            },
            isBubble: false,
          });
          delay = preFaceTime;
        }

        steps.push({
          delayMs: delay,
          action: () => {
            if (line.specialEffect === 'destroy') {
              window.setTimeout(() => {
                soundEngine.playMechanicalDestroy();
                setEyeGlitchPulse(Date.now());
                setOverrideExpression('shock');
                setOverrideFaceParts({
                  brow: 'angry',
                  eyes: 'wide',
                  mouth: 'shout',
                  effects: ['shadow'],
                });
              }, 850);
            } else if (line.specialEffect === 'collapse') {
              setEyeGlitchPulse(Date.now());
              window.setTimeout(() => {
                if (line.secondExpression) {
                  setOverrideExpression(line.secondExpression);
                }
                if (line.secondFaceParts) {
                  setOverrideFaceParts(line.secondFaceParts);
                } else {
                  setOverrideExpression('pain');
                  setOverrideFaceParts({
                    brow: 'sad',
                    eyes: 'close',
                    mouth: 'close',
                    effects: ['shadow'],
                  });
                }
              }, 1100);
              window.setTimeout(() => {
                setIsAschCollapsed(true);
                soundEngine.playBodyFall();
              }, 1950);
            } else if (line.specialEffect === 'shout_shock') {
              soundEngine.playHeavyShoutThud();
              setReplayPulse((p) => p + 1);
              setIsScreenShaking(true);
              setTimeout(() => setIsScreenShaking(false), 240);
            }
            if (line.expression) {
              setOverrideExpression(line.expression);
            }
            if (line.faceParts) {
              setOverrideFaceParts((prev) => ({
                ...(prev ??
                  DEFAULT_EXPRESSION_PARTS[line.expression ?? activeExpression]),
                ...line.faceParts,
              }));
            }
            if (line.text.trim()) {
              pushScreenBubble(
                line.speaker,
                line.text,
                line.voiceEffect ?? 'normal',
                false
              );
            }
          },
          isBubble: true,
        });

        lastSpeaker = line.speaker;
        lastLineText = line.text;
      });

      const lastLine = expandedLines[expandedLines.length - 1];
      if (
        lastLine?.speaker === 'ASCH' &&
        lastLine.secondFaceParts &&
        expandedLines.filter((l) => l.speaker === 'ASCH').length === 1
      ) {
        steps.push({
          delayMs: 1000,
          action: () => {
            if (lastLine.secondExpression) {
              setOverrideExpression(lastLine.secondExpression);
            }
            setOverrideFaceParts((prev) => ({
              ...(prev ??
                DEFAULT_EXPRESSION_PARTS[
                  lastLine.secondExpression ?? activeExpression
                ]),
              ...lastLine.secondFaceParts,
            }));
          },
          isBubble: false,
        });
      }

      if (endingTransition) {
        const trans = endingTransition;
        const lastLine = expandedLines[expandedLines.length - 1];
        const waitBefore = lastLine?.waitMs ?? trans.waitBeforeExitMs ?? 800;
        const stepInterval =
          trans.footsteps === 'slow' ? 440 : trans.footsteps === 'fast' ? 240 : 360;
        const count = trans.footstepsCount ?? 3;
        const footstepsTotalMs = count * stepInterval;

        steps.push({
          delayMs: waitBefore,
          action: () => {
            if (trans.aschAction === 'fade_out') {
              setIsAschExited(true);
              setVisibleBubbles([]);
            } else if (trans.aschAction === 'collapse') {
              setIsAschCollapsed(true);
            }
            if (trans.footsteps) {
              soundEngine.playFootsteps(trans.footsteps, count);
            }
          },
          isBubble: false,
        });

        if (trans.doorAction && trans.doorAction !== 'none') {
          steps.push({
            delayMs: footstepsTotalMs + 200,
            action: () => {
              soundEngine.playDoorOpen();
            },
            isBubble: false,
          });

          steps.push({
            delayMs: 700,
            action: () => {
              soundEngine.playDoorClose(
                trans.doorAction === 'slam' ? 'slam' : 'soft'
              );
            },
            isBubble: false,
          });

          if (onComplete) {
            steps.push({
              delayMs: Math.max(2600, (trans.waitAfterDoorMs ?? 1000) + 1600),
              action: () => {
                onComplete();
              },
              isTerminal: true,
            });
          }
        } else {
          // ドア音なし：足音終了後に静寂余韻を経て完了
          if (onComplete) {
            steps.push({
              delayMs: footstepsTotalMs + Math.max(2600, (trans.waitAfterDoorMs ?? 1200) + 1400),
              action: () => {
                onComplete();
              },
              isTerminal: true,
            });
          }
        }
      } else if (onComplete) {
        const lastLine = expandedLines[expandedLines.length - 1];
        const finalDelay =
          lastLine?.waitMs ??
          Math.min(1450, Math.max(900, (lastLine?.text?.length ?? 10) * 35));
        steps.push({
          delayMs: finalDelay,
          action: () => {
            onComplete();
          },
          isTerminal: true,
        });
      }

      enqueueSequence(steps);
    },
    [
      gamePhase,
      clearPendingSequence,
      enqueueSequence,
      pushScreenBubble,
      activeExpression,
    ]
  );

  const handleStopInspectorPlayback = useCallback(() => {
    clearPendingSequence();
    setVisibleBubbles([]);
    setIsAschExited(false);
    setIsAschCollapsed(false);
    setEyeGlitchPulse(0);
  }, [clearPendingSequence]);

  const handlePreviewInspectorSingleLine = useCallback(
    (
      speaker: 'GUY' | 'ASCH',
      text: string,
      voiceEffect: BubbleVoiceEffect = 'normal',
      expression?: ExpressionId,
      faceParts?: Partial<FaceParts>
    ) => {
      soundEngine.unlockOnUserInteraction();
      if (gamePhase !== 'PLAYING') {
        setGamePhase('PLAYING');
        soundEngine.setPlayingPhase(true);
      }
      clearPendingSequence();
      setVisibleBubbles([]);
      if (expression) setOverrideExpression(expression);
      if (faceParts) {
        setOverrideFaceParts((prev) => ({
          ...(prev ??
            DEFAULT_EXPRESSION_PARTS[expression ?? activeExpression]),
          ...faceParts,
        }));
      }
      pushScreenBubble(speaker, text, voiceEffect, false);
    },
    [gamePhase, clearPendingSequence, pushScreenBubble, activeExpression]
  );

  const handleOpenScenarioInspector = useCallback(() => {
    soundEngine.unlockOnUserInteraction();
    soundEngine.playTerminalTab();
    setIsTerminalOpen(false);
    setIsDialogueLogOpen(false);
    setIsManualOpen(false);
    setIsDebugViewerOpen(false);
    if (gamePhase !== 'PLAYING') {
      previousPhaseBeforeInspectorRef.current = gamePhase;
      setGamePhase('PLAYING');
      soundEngine.setPlayingPhase(true);
    }
    setIsScenarioInspectorOpen(true);
  }, [gamePhase]);

  const handleCloseScenarioInspector = useCallback(() => {
    soundEngine.playTerminalClose();
    clearPendingSequence();
    setVisibleBubbles([]);
    setIsAschExited(false);
    setIsAschCollapsed(false);
    setOverrideExpression(null);
    setOverrideFaceParts(null);
    setIsScenarioInspectorOpen(false);
    if (previousPhaseBeforeInspectorRef.current === 'TITLE') {
      soundEngine.setPlayingPhase(false);
      setGamePhase('TITLE');
      previousPhaseBeforeInspectorRef.current = null;
    }
  }, [clearPendingSequence]);

  const appendLog = useCallback(
    (type: SystemLogEntry['type'], message: string) => {
      const elapsedSec = ((Date.now() - stats.startTime) / 1000).toFixed(0);
      const mins = String(Math.floor(Number(elapsedSec) / 60)).padStart(2, '0');
      const secs = String(Number(elapsedSec) % 60).padStart(2, '0');
      const timestamp = `${mins}:${secs}`;

      setLogs((prev) => [
        ...prev,
        {
          id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          timestamp,
          type,
          message,
        },
      ]);
    },
    [stats.startTime]
  );

  const playAschReactionLines = useCallback(
    (
      rawText: string,
      expr: ExpressionId,
      partsOverride?: Partial<FaceParts>,
      voiceEffects?: BubbleVoiceEffect[],
      initialDelayMs = 260,
      forceGlitch = false,
      customErrorRate?: number,
      resetToNormalOnLastLine = false
    ) => {
      const lines = rawText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      if (lines.length === 0) return;

      const effectiveError = customErrorRate ?? 0;

      const steps: QueuedStep[] = [];
      lines.forEach((line, idx) => {
        const delay =
          idx === 0
            ? initialDelayMs
            : Math.min(1350, Math.max(820, lines[idx - 1].length * 36));
        const baseEffect: BubbleVoiceEffect =
          voiceEffects?.[idx] ?? voiceEffects?.[0] ?? 'normal';
        const lineEffect = resolveVoiceEffectWithGlitch(
          baseEffect,
          effectiveError,
          forceGlitch
        );

        steps.push({
          delayMs: delay,
          action: () => {
            if (idx === 0) {
              setOverrideExpression(expr);
              setOverrideFaceParts(partsOverride ?? null);
            } else if (
              resetToNormalOnLastLine &&
              idx === lines.length - 1
            ) {
              setOverrideExpression('normal');
              setOverrideFaceParts({
                brow: 'normal',
                eyes: 'normal',
                mouth: 'close',
                effects: [],
              });
            } else if (idx > 0) {
              const autoSecondFace = deriveAutomaticSecondFaceParts(
                expr,
                partsOverride,
                lines[0],
                line
              );
              if (autoSecondFace) {
                setOverrideFaceParts(autoSecondFace);
              }
            }
            pushScreenBubble('ASCH', line, lineEffect);
          },
        });
      });

      steps.push({
        delayMs: 420,
        action: () => {},
      });

      enqueueSequence(steps);
    },
    [enqueueSequence, pushScreenBubble]
  );

  // === 端末未認知時：端末を見ている間、アッシュはまだその板が自分の内部モニターだとは知らず、見られていないと思って少し息をつく ===
  useEffect(() => {
    if (
      gamePhase !== 'PLAYING' ||
      !isTerminalOpen ||
      linkTags.includes('terminal_revealed')
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setOverrideExpression('look_away');
      setOverrideFaceParts({
        brow: 'sad',
        eyes: 'down',
        mouth: 'close',
        effects: [],
      });
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [gamePhase, isTerminalOpen, linkTags]);

  // === 画面離脱（別タブ・最小化・別ウィンドウ・フォーカス外れ）からの復帰検知 ===
  useEffect(() => {
    const handleLeave = () => {
      if (tabHiddenAtRef.current !== null) return;
      tabHiddenAtRef.current = Date.now();
      if (gamePhase === 'PLAYING') {
        setStats((prev) => ({
          ...prev,
          tabSwitchCount: prev.tabSwitchCount + 1,
        }));
      }
    };

    const handleReturn = () => {
      const hiddenAt = tabHiddenAtRef.current;
      tabHiddenAtRef.current = null;
      if (
        gamePhase === 'PLAYING' &&
        hiddenAt &&
        !isTerminalOpen &&
        !isDialogueLogOpen &&
        !isManualOpen &&
        !isSequencing &&
        !isSequencingRef.current
      ) {
        const awayMs = Date.now() - hiddenAt;
        const sinceLastAway = Date.now() - lastAwayReactionAtRef.current;
        if (awayMs >= 1000 && sinceLastAway >= 4000) {
          lastAwayReactionAtRef.current = Date.now();
          const idx = awayReactionCountRef.current;
          awayReactionCountRef.current += 1;

          // Phase 3（終幕の問いかけ待機中）は復帰セリフを完全抑制し沈黙を維持
          if (activeTopicReplyRef.current?.topicId === 'p3_final_who_am_i') {
            setOverrideExpression('look_away');
            setOverrideFaceParts({
              brow: 'sad',
              eyes: 'down',
              mouth: 'close',
              effects: ['shadow'],
            });
            appendLog(
              'INFO',
              'VISUAL CONTACT RESTORED // PHASE 3 SILENCE MAINTAINED'
            );
            return;
          }

          // 深層記憶（DP-002/003）解放後・緊迫時は復帰セリフを完全抑制し、緊張感のある表情を維持
          const isDeepTruthActive =
            linkTags.includes('asked_about_dp002') ||
            linkTags.includes('climax_ready') ||
            linkTags.includes('sec19_unlocked') ||
            linkTags.includes('sec20_unlocked') ||
            sectors.some(
              (s) =>
                (s.id === 'SEC-19' || s.id === 'SEC-20' || s.code === 'DP-002' || s.code === 'DP-003') &&
                s.unlocked
            );

          if (isDeepTruthActive) {
            const isPanicking =
              linkTags.includes('asked_about_dp002') &&
              !linkTags.includes('talked_tarlow_broken');
            if (isPanicking) {
              setOverrideExpression('pain');
              setOverrideFaceParts({
                brow: 'pain',
                eyes: 'away',
                mouth: 'grit',
                effects: ['sweat'],
              });
            } else {
              setOverrideExpression('look_away');
              setOverrideFaceParts({
                brow: 'sad',
                eyes: 'down',
                mouth: 'close',
                effects: [],
              });
            }
            appendLog(
              'INFO',
              'VISUAL CONTACT RESTORED // DEEP TRUTH TENSION MAINTAINED'
            );
            return;
          }

          if (idx < 3) {
            const pool = !linkTags.includes('phase2_started')
              ? AWAY_RETURN_REACTIONS.phase1
              : mood < 0
                ? AWAY_RETURN_REACTIONS.angry
                : AWAY_RETURN_REACTIONS.normal;
            const reaction = pool[idx] ?? pool[pool.length - 1];
            unlockAchievements('ach_14');
            appendLog('INFO', reaction.logMessage);
            playAschReactionLines(
              reaction.text,
              reaction.expression,
              reaction.faceParts,
              ['normal'],
              240
            );
          } else if (idx === 3) {
            // 4回目以降はセリフを出さず、静かに目を伏せるだけの薄い反応にする
            setOverrideExpression('look_away');
            setOverrideFaceParts({
              brow: 'sad',
              eyes: 'down',
              mouth: 'close',
              effects: [],
            });
            appendLog(
              'INFO',
              'VISUAL CONTACT RESTORED // NO VOCAL OUTPUT'
            );
          }
        }
      }
      choiceShownAtRef.current = Date.now();
      setIdleWaitSec(0);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleLeave();
      } else if (document.visibilityState === 'visible') {
        handleReturn();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleLeave);
    window.addEventListener('focus', handleReturn);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleLeave);
      window.removeEventListener('focus', handleReturn);
    };
  }, [
    gamePhase,
    isTerminalOpen,
    isDialogueLogOpen,
    isManualOpen,
    isSequencing,
    isHatredMode,
    linkTags,
    sectors,
    mood,
    appendLog,
    playAschReactionLines,
  ]);

  // === 放置タイマー（不機嫌時の自然沈静化 ＆ 直前の会話文脈に応じた無言リアクション） ===
  useEffect(() => {
    if (
      gamePhase !== 'PLAYING' ||
      isTerminalOpen ||
      isDialogueLogOpen ||
      isManualOpen ||
      isSequencing
    ) {
      return;
    }

    const idleTimer = window.setInterval(() => {
      if (isSequencingRef.current) return;
      const idleMs = Date.now() - choiceShownAtRef.current;
      const currentWaitSec = Math.floor(idleMs / 1000);
      setIdleWaitSec(currentWaitSec);

      // Phase 3（終幕の問いかけ：「おまえから見て、今の俺は誰に見える？」）待機中：
      // 日常の放置・催促リアクションは完全停止し、30秒無言タイムアウト（END 07）のみを静かに待機する
      if (activeTopicReply?.topicId === 'p3_final_who_am_i') {
        if (idleMs > 30000 && idleStageRef.current === 0) {
          idleStageRef.current = 1;
          setActiveTopicReply(null);
          soundEngine.stopBgm();
          soundEngine.setPlayingPhase(false);
          setStats((prev) => ({
            ...prev,
            idleTimeoutCount: prev.idleTimeoutCount + 1,
          }));
          appendLog(
            'INFO',
            'RESPONSE TIMEOUT // QUERY WITHDRAWN'
          );
          const timeoutSteps: QueuedStep[] = [
            // ガイの沈黙（タメ 2.4秒）
            {
              delayMs: 260,
              action: () => {
                pushScreenBubble('GUY', '・・・・・・', 'normal');
              },
              isBubble: true,
            },
            // アッシュの息を呑む沈黙（伏し目でタメ 2.0秒）
            {
              delayMs: 2400,
              action: () => {
                setOverrideExpression('look_away');
                setOverrideFaceParts({
                  brow: 'sad',
                  eyes: 'down',
                  mouth: 'close',
                  effects: ['shadow'],
                });
                pushScreenBubble('ASCH', '・・・・・・', 'normal');
              },
              isBubble: true,
            },
            // 問いの取り下げ（伏し目のまま呟く・タメ 2.0秒）
            {
              delayMs: 2000,
              action: () => {
                setOverrideExpression('look_away');
                setOverrideFaceParts({
                  brow: 'sad',
                  eyes: 'down',
                  mouth: 'close',
                  effects: ['shadow'],
                });
                pushScreenBubble(
                  'ASCH',
                  '・・・・・・、いや。いい。なんでもない',
                  'normal'
                );
              },
              isBubble: true,
            },
            // 去り際の一言（目を逸らす・タメ 2.4秒）
            {
              delayMs: 2000,
              action: () => {
                setOverrideExpression('look_away');
                setOverrideFaceParts({
                  brow: 'sad',
                  eyes: 'away',
                  mouth: 'close',
                  effects: ['shadow'],
                });
                pushScreenBubble('ASCH', '変なことを聞いた。忘れてくれ', 'normal');
              },
              isBubble: true,
            },
            // 重く静かな足音で退場（slow 3歩）
            {
              delayMs: 2400,
              action: () => {
                setIsAschExited(true);
                setVisibleBubbles([]);
                soundEngine.playFootsteps('slow', 3);
              },
              isBubble: false,
            },
            // ED画面へ移行（アッシュが去った後の余韻と間をしっかり置いてから）
            {
              delayMs: 3 * 440 + 2600,
              action: () => {
                setCustomEndingKey('END_PHASE3_SILENCE');
                setStats((prev) => ({
                  ...prev,
                  endTime: Date.now(),
                }));
                setEndingStep(0);
                setGamePhase('ENDING');
              },
              isBubble: false,
            },
          ];
          enqueueSequence(timeoutSteps);
        }
        return;
      }

      // アッシュからの逆質問中にしばらく（30秒間）沈黙が続いた場合、質問を取り下げて以降の逆質問を発生させない（開幕の第一声への返答およびプロテクト強制解除直後の言及は除く）
      if (
        activeAschQuestion &&
        activeAschQuestion.id !== 'q_opening_why_bring' &&
        !activeAschQuestion.id.startsWith('q_override_') &&
        idleMs > 30000
      ) {
        idleStageRef.current = 1;
        setActiveAschQuestion(null);
        setAschQuestionsDisabled(true);
        setStats((prev) => ({
          ...prev,
          idleTimeoutCount: prev.idleTimeoutCount + 1,
        }));
        appendLog(
          'INFO',
          'RESPONSE TIMEOUT // AUTONOMOUS QUERY PROTOCOL SUSPENDED'
        );
        unlockAchievements('ach_13');
        playAschReactionLines(
          '・・・・・・\nいや、いい。なんでもない。忘れてくれ',
          'look_away',
          {
            brow: 'sad',
            eyes: 'away',
            mouth: 'frown',
            effects: [],
          },
          ['normal'],
          240
        );
        return;
      }

      // 怒っている（mood < 0）ときのチラ見（目が合うタイミング）＆25〜50秒放置での自然沈静化（最大3回まで・フェーズ2以降のみ）
      if (
        linkTags.includes('phase2_started') &&
        mood < 0 &&
        idleStageRef.current === 0
      ) {
        if (
          angryCooldownCountRef.current < 3 &&
          idleMs >= angryCooldownTargetSecRef.current * 1000
        ) {
          const cooldownIdx = angryCooldownCountRef.current;
          angryCooldownCountRef.current += 1;
          idleStageRef.current = 1;
          isAngryGlancingRef.current = false;
          badMoodRefusalCountRef.current = 0;
          moodRef.current = 0;
          setMood(0);
          setGuyMood((prev) => Math.max(0, prev));
          setLinkTags((prev) =>
            prev.filter((t) => t !== 'cold_clash_escalated')
          );
          setLastRefusedTopicId(null);
          setStats((prev) => ({
            ...prev,
            idleTimeoutCount: prev.idleTimeoutCount + 1,
          }));
          const cooldownReaction =
            ANGRY_COOLDOWN_REACTIONS[cooldownIdx] ??
            ANGRY_COOLDOWN_REACTIONS[ANGRY_COOLDOWN_REACTIONS.length - 1];
          unlockAchievements('ach_12');
          appendLog('INFO', cooldownReaction.logMessage);
          playAschReactionLines(
            cooldownReaction.text,
            cooldownReaction.expression,
            cooldownReaction.faceParts,
            ['normal'],
            240
          );
          return;
        }

        // 待っている間、1回の無言放置につき1〜2回だけチラッとこちらを見る（または伏し目がちになる）
        if (
          !isAngryGlancingRef.current &&
          angryGlancesDoneInWaitRef.current <
            angryGlancesMaxInWaitRef.current &&
          currentWaitSec >= nextAngryGlanceAtSecRef.current
        ) {
          isAngryGlancingRef.current = true;
          angryGlancesDoneInWaitRef.current += 1;
          angryGlanceEndAtSecRef.current = currentWaitSec + 5;
          const glancePatterns: {
            expression: ExpressionId;
            faceParts: Partial<FaceParts>;
          }[] = [
            {
              expression: 'normal',
              faceParts: {
                brow: 'sad',
                eyes: 'normal',
                mouth: 'close',
                effects: [],
              },
            },
            {
              expression: 'glare',
              faceParts: {
                brow: 'angry',
                eyes: 'normal',
                mouth: 'frown',
                effects: ['sweat'],
              },
            },
            {
              expression: 'normal',
              faceParts: {
                brow: 'sad',
                eyes: 'normal',
                mouth: 'frown',
                effects: ['sweat'],
              },
            },
            {
              expression: 'normal',
              faceParts: {
                brow: 'doubt',
                eyes: 'normal',
                mouth: 'close',
                effects: ['sweat'],
              },
            },
          ];
          const pickedGlance =
            glancePatterns[Math.floor(Math.random() * glancePatterns.length)];
          setOverrideExpression(pickedGlance.expression);
          setOverrideFaceParts(pickedGlance.faceParts);
        } else if (
          isAngryGlancingRef.current &&
          currentWaitSec >= angryGlanceEndAtSecRef.current
        ) {
          isAngryGlancingRef.current = false;
          if (
            angryGlancesDoneInWaitRef.current < angryGlancesMaxInWaitRef.current
          ) {
            nextAngryGlanceAtSecRef.current = Math.max(
              currentWaitSec + 8,
              Math.floor(24 + Math.random() * 13)
            );
          } else {
            nextAngryGlanceAtSecRef.current = 9999;
          }
          setOverrideExpression('glare');
          setOverrideFaceParts({
            brow: 'angry',
            eyes: 'away',
            mouth: 'frown',
            effects: [],
          });
        }
      }

      // 深層記憶（DP-002/003）解放後・緊迫・混乱時の放置リアクション：
      const isDeepTruthActive =
        linkTags.includes('asked_about_dp002') ||
        linkTags.includes('climax_ready') ||
        linkTags.includes('sec19_unlocked') ||
        linkTags.includes('sec20_unlocked') ||
        sectors.some(
          (s) =>
            (s.id === 'SEC-19' || s.id === 'SEC-20' || s.code === 'DP-002' || s.code === 'DP-003') &&
            s.unlocked
        );

      if (isDeepTruthActive && !linkTags.includes('p2_dilemma_resolved')) {
        if (idleMs > 18000 && idleStageRef.current === 0) {
          idleStageRef.current = 1;
          if (linkTags.includes('asked_about_dp002')) {
            setOverrideExpression('pain');
            setOverrideFaceParts({
              brow: 'pain',
              eyes: 'close',
              mouth: 'grit',
              effects: ['pale', 'sweat', 'noise'],
            });
            pushScreenBubble(
              'ASCH',
              '・・・・・・っ、くそ・・・・・・頭が・・・・・・ッ',
              'tremble_glitch'
            );
          } else {
            setOverrideExpression('look_away');
            setOverrideFaceParts({
              brow: 'sad',
              eyes: 'down',
              mouth: 'close',
              effects: ['shadow'],
            });
            pushScreenBubble(
              'ASCH',
              '・・・・・・何か言いたいことでもあるのか',
              'tremble'
            );
          }
        }
        return;
      }

      // フェーズ2：話題を選ばず一拍置いたとき（約3.8秒の沈黙）に発生するアッシュからの逆質問
      if (
        linkTags.includes('phase2_started') &&
        !linkTags.includes('p2_dilemma_resolved') &&
        !linkTags.includes('asked_about_dp002') &&
        !linkTags.includes('asked_about_dp003') &&
        !isHatredMode &&
        overrideExpression !== 'pain' &&
        !aschQuestionsDisabled &&
        !activeTopicReply &&
        !activeAschQuestion &&
        !isDecisionMenuOpen &&
        !isTerminalOpen &&
        idleStageRef.current === 0 &&
        idleMs >= 3800 &&
        idleMs < 15000 &&
        lastContextCategoryRef.current !== 'core' &&
        lastContextCategoryRef.current !== 'fight' &&
        badMoodRefusalCountRef.current < 2 &&
        totalTurnsRef.current - lastMilestoneQuestionTurnRef.current >= 3
      ) {
        const unanswered = TURN_MILESTONE_QUESTIONS.filter(
          (m) =>
            !answeredQuestionIds.includes(m.question.id) &&
            totalTurnsRef.current >= m.turnCount
        );
        if (unanswered.length > 0) {
          const targetQ = unanswered[0];
          idleStageRef.current = 1;
          lastMilestoneQuestionTurnRef.current = totalTurnsRef.current;
          const qLines = targetQ.questionLine
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean);
          const steps: QueuedStep[] = [];
          qLines.forEach((qLine, qIdx) => {
            steps.push({
              delayMs: qIdx === 0 ? 300 : 850,
              action: () => {
                if (qIdx === 0) {
                  setOverrideExpression(targetQ.expression);
                  setOverrideFaceParts(targetQ.faceParts);
                }
                if (qIdx === qLines.length - 1) {
                  setPreviewPage(0);
                  setActiveAschQuestion(targetQ.question);
                }
                pushScreenBubble('ASCH', qLine, 'normal');
              },
            });
          });
          enqueueSequence(steps);
          return;
        }
      }

      // 通常〜上機嫌時の放置リアクション（全セッション通じて最大3回まで・すべて別セリフ）
      if (
        !(linkTags.includes('phase2_started') && mood < 0) &&
        totalIdleReactionCountRef.current < 3 &&
        ((idleMs > 18000 && idleStageRef.current === 0) ||
          (idleMs > 36000 && idleStageRef.current === 1) ||
          (idleMs > 54000 && idleStageRef.current === 2))
      ) {
        const nextIdx = totalIdleReactionCountRef.current;
        totalIdleReactionCountRef.current += 1;
        idleStageRef.current += 1;
        const reaction = IDLE_REACTIONS[nextIdx] ?? IDLE_REACTIONS[IDLE_REACTIONS.length - 1];
        if (reaction.moodDelta) {
          updateMood(reaction.moodDelta);
        }
        setStats((prev) => ({
          ...prev,
          idleTimeoutCount: prev.idleTimeoutCount + 1,
        }));
        appendLog(reaction.logType, reaction.logMessage);
        playAschReactionLines(
          reaction.text,
          reaction.expression,
          reaction.faceParts,
          ['normal'],
          240
        );
      }
    }, 1000);

    return () => clearInterval(idleTimer);
  }, [
    gamePhase,
    isTerminalOpen,
    isDialogueLogOpen,
    isManualOpen,
    isSequencing,
    mood,
    linkTags,
    answeredQuestionIds,
    activeAschQuestion,
    activeTopicReply,
    addOralInfo,
    appendLog,
    nextOrderStamp,
    playAschReactionLines,
    updateMood,
  ]);

  // ===データ端末の開閉（無操作で閉じた際の覗き見リアクション） ===
  const handleToggleTerminal = () => {
    if (linkTags.includes('terminal_broken')) {
      soundEngine.playSelectError();
      appendLog('WARNING', 'DATA TERMINAL DESTROYED // ACCESS IMPOSSIBLE');
      return;
    }
    setIsDialogueLogOpen(false);
    if (!isTerminalOpen) {
      soundEngine.playTerminalOpen();
      setIsTerminalOpen(true);
      setHasUnreadSector(false);
      terminalOpenedAtRef.current = Date.now();
      terminalActionTakenRef.current = false;
      const nextOpenCount = stats.terminalOpenCount + 1;
      setStats((prev) => ({
        ...prev,
        terminalOpenCount: prev.terminalOpenCount + 1,
      }));
      if (nextOpenCount >= 3) {
        setLinkTags((prev) =>
          prev.includes('terminal_opened_many')
            ? prev
            : [...prev, 'terminal_opened_many']
        );
      }
      appendLog('INFO', 'DATA TERMINAL OPENED');
    } else {
      soundEngine.playTerminalClose();
      setIsTerminalOpen(false);
      if (terminalOpenedAtRef.current) {
        const durationMs = Date.now() - terminalOpenedAtRef.current;
        const sinceLastGaze = Date.now() - lastTerminalGazeAtRef.current;
        setStats((prev) => ({
          ...prev,
          terminalTotalDurationMs: prev.terminalTotalDurationMs + durationMs,
        }));

        // DP-002（SEC-19）または DP-003（SEC-20）を解除して端末を閉じた場合は、『端末』タブへ切り替えて選択肢に出現させる（強制発生はしない）
        if (pendingClimaxDilemmaRef.current) {
          pendingClimaxDilemmaRef.current = false;
          setPreviewTab('端末');
          setPreviewPage(0);
        }

        // Phase 3（終幕の問いかけ待機中）は端末確認リアクションを完全抑制し、沈黙タイマーもリセットしない
        if (activeTopicReplyRef.current?.topicId === 'p3_final_who_am_i') {
          terminalOpenedAtRef.current = null;
          return;
        }

        // 深層記憶（DP-002/003）解放後・緊迫・混乱時（端末を見た後の反応）：
        const isDeepTruthActive =
          linkTags.includes('asked_about_dp002') ||
          linkTags.includes('climax_ready') ||
          linkTags.includes('sec19_unlocked') ||
          linkTags.includes('sec20_unlocked') ||
          sectors.some(
            (s) =>
              (s.id === 'SEC-19' || s.id === 'SEC-20' || s.code === 'DP-002' || s.code === 'DP-003') &&
              s.unlocked
          );

        if (isDeepTruthActive && !linkTags.includes('p2_dilemma_resolved')) {
          if (
            !isSequencing &&
            !isSequencingRef.current &&
            !activeAschQuestion &&
            durationMs >= 1000 &&
            sinceLastGaze >= 5000
          ) {
            lastTerminalGazeAtRef.current = Date.now();
            if (linkTags.includes('asked_about_dp002')) {
              setOverrideExpression('pain');
              setOverrideFaceParts({
                brow: 'pain',
                eyes: 'away',
                mouth: 'grit',
                effects: ['sweat', 'noise'],
              });
              pushScreenBubble(
                'ASCH',
                '・・・・・・っ、ハァ・・・・・・ハァ・・・・・・ッ。・・・・・・見るな・・・・・・っ',
                'tremble_glitch'
              );
            } else {
              setOverrideExpression('look_away');
              setOverrideFaceParts({
                brow: 'sad',
                eyes: 'down',
                mouth: 'close',
                effects: ['shadow'],
              });
              pushScreenBubble(
                'ASCH',
                '・・・・・・その端末に、何が映っているんだ',
                'tremble'
              );
            }
          }
          terminalOpenedAtRef.current = null;
          choiceShownAtRef.current = Date.now();
          setIdleWaitSec(0);
          return;
        }

        // 端末認知フラグの連動（IMMUTABLE_RULES 2-①・6-②準拠）：
        // 『手元の端末の画面を本人に見せる』を選んで端末の正体を明かしていない限り、
        // アッシュはガイが手元で見ている板が「自分の内部モニター」だとは知らず、
        // 「人の顔と手元の板を交互に見て、さっきから何のつもりだ」程度の反応になる。
        const isTerminalRevealed = linkTags.includes('terminal_revealed');

        if (!isTerminalRevealed) {
          if (
            !isSequencing &&
            !isSequencingRef.current &&
            !activeAschQuestion &&
            durationMs >= 1200 &&
            sinceLastGaze >= 6000 &&
            terminalUnrevealedReactionCountRef.current < 3
          ) {
            lastTerminalGazeAtRef.current = Date.now();
            const idx = terminalUnrevealedReactionCountRef.current;
            terminalUnrevealedReactionCountRef.current += 1;
            if (terminalUnrevealedReactionCountRef.current >= 3) {
              unlockAchievements('ach_02');
            }
            const reaction =
              TERMINAL_UNREVEALED_REACTIONS[idx] ??
              TERMINAL_UNREVEALED_REACTIONS[TERMINAL_UNREVEALED_REACTIONS.length - 1];
            if (reaction.moodDelta) {
              updateMood(reaction.moodDelta);
            }
            appendLog('INFO', reaction.logMessage);
            playAschReactionLines(
              reaction.text,
              reaction.expression,
              reaction.faceParts,
              reaction.voiceEffect ? [reaction.voiceEffect] : ['normal'],
              240
            );
            terminalOpenedAtRef.current = null;
            choiceShownAtRef.current = Date.now();
            setIdleWaitSec(0);
            return;
          }
        } else {
          // 端末の正体を明かした後（認知後）：最大3回まで、すべて別セリフで牽制してくる
          if (
            !isSequencing &&
            !isSequencingRef.current &&
            terminalGazeReactionCountRef.current < 3 &&
            (terminalActionTakenRef.current ||
              (sinceLastGaze >= 8000 && durationMs >= 2000))
          ) {
            lastTerminalGazeAtRef.current = Date.now();
            const idx = terminalGazeReactionCountRef.current;
            terminalGazeReactionCountRef.current += 1;
            unlockAchievements(
              'ach_03',
              ...(terminalGazeReactionCountRef.current >= 3 ? ['ach_02'] : [])
            );
            const reaction =
              TERMINAL_GAZE_REACTIONS[idx] ??
              TERMINAL_GAZE_REACTIONS[TERMINAL_GAZE_REACTIONS.length - 1];
            if (reaction.moodDelta) {
              updateMood(reaction.moodDelta);
            }
            appendLog('WARNING', reaction.logMessage);
            playAschReactionLines(
              reaction.text,
              reaction.expression,
              reaction.faceParts,
              reaction.voiceEffect ? [reaction.voiceEffect] : ['normal'],
              280
            );
          }
        }
        terminalOpenedAtRef.current = null;
      }
      choiceShownAtRef.current = Date.now();
      setIdleWaitSec(0);
    }
  };

  // === Phase 3：終幕・存在への問い掛け（「・・・・・・おまえから見て、今の俺は誰に見える？」）の開始 ===
  const handleStartPhase3Question = () => {
    if (isTerminalOpen || isDialogueLogOpen || isManualOpen || isSequencing) {
      return;
    }
    soundEngine.unlockOnUserInteraction();
    soundEngine.stopBgm();
    soundEngine.setPlayingPhase(false);
    setIsDecisionMenuOpen(false);

    const qLines = FINAL_ASCH_QUESTION_LINE.split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const steps: QueuedStep[] = qLines.map((line, idx) => ({
      delayMs:
        idx === 0
          ? 360
          : calculateLineDelayMs(qLines[idx - 1], { isSpeakerChange: false }),
      action: () => {
        if (idx === 0) {
          setOverrideExpression('look_away');
          setOverrideFaceParts({
            brow: 'sad',
            eyes: 'down',
            mouth: 'close',
            effects: [],
          });
          appendLog(
            'INFO',
            'PHASE 3 TRANSITION // FINAL IDENTITY QUERY DETECTED'
          );
        } else {
          setOverrideExpression('normal');
          setOverrideFaceParts({
            brow: 'sad',
            eyes: 'normal',
            mouth: 'close',
            effects: [],
          });
        }
        if (idx === qLines.length - 1) {
          setPreviewPage(0);
          setActiveTopicReply({
            topicId: 'p3_final_who_am_i',
            options: PHASE3_WHO_AM_I_OPTIONS,
          });
        }
        pushScreenBubble('ASCH', line, 'normal');
      },
    }));

    steps.push({
      delayMs: 420,
      action: () => {},
    });

    enqueueSequence(steps);
  };

  // === Phase 3（終幕の問いかけ：「……おまえから見て、今の俺は誰に見える？」）発生条件判定 ===
  // 自身が「記憶を模倣されただけの機械なのか、アッシュ本人なのか分からない」という核心の対話
  // （表の核心『みんなの元へ戻らない理由』または裏の核心『クライマックス対話』）を交わしている場合に発生する
  const hasEnoughDeepTalkForPhase3 =
    linkTags.includes('p2_heard_true_reason') ||
    linkTags.includes('p2_dilemma_resolved') ||
    sectors.some((s) => s.id === 'SEC-12' && s.unlocked);

  // === 『話を切り上げる』からの終了処理（フェーズに応じた結末へ遷移） ===
  const handleExecuteDecision = (disposition: EndingDisposition) => {
    if (isTerminalOpen || isDialogueLogOpen || isManualOpen || isSequencing) {
      return;
    }
    soundEngine.unlockOnUserInteraction();
    lastDecisionExecutedAtRef.current = Date.now();
    setIsDecisionMenuOpen(false);
    setVisibleBubbles([]);

    const isPhase2Now = linkTags.includes('phase2_started');
    const phase2TalkedCount = Object.entries(topicAskCounts).filter(
      ([id, count]) => !id.startsWith('p1_') && count > 0
    ).length;

    const isDp002Unlocked =
      isPhase2Now &&
      (linkTags.includes('sec19_unlocked') ||
        sectors.some(
          (s) => (s.id === 'SEC-19' || s.code === 'DP-002') && s.unlocked
        ));

    // フェーズ2で『ディストの研究所へ帰す』（RETURN）を選んだ際、
    // 不機嫌・険悪ではなく、かつ深い対話条件を満たしていれば、帰る間際にアッシュから最後の問いかけ（Phase 3）が発生する
    // ※ただし、深層記憶（DP-001: SEC-18以降）を開封している場合は裏ルート（END 08〜10）へ進むため、表の問いかけは発生させない
    const hasDeepMemoryOpened =
      sectors.some(
        (s) =>
          (s.id === 'SEC-18' || s.id === 'SEC-19' || s.id === 'SEC-20') &&
          s.unlocked
      ) ||
      linkTags.includes('sec18_unlocked') ||
      linkTags.includes('sec19_unlocked') ||
      linkTags.includes('sec20_unlocked');

    if (
      isPhase2Now &&
      !isDp002Unlocked &&
      !hasDeepMemoryOpened &&
      disposition === 'RETURN' &&
      hasEnoughDeepTalkForPhase3 &&
      mood >= 0 &&
      guyMood >= 0 &&
      !isHatredMode
    ) {
      handleStartPhase3Question();
      return;
    }

    let forcedCustomEndingKey: string | null = null;
    let isStayRefused = false;

    if (isDp002Unlocked) {
      if (disposition === 'KEEP') {
        forcedCustomEndingKey = 'END_PHASE3_TOMORROW'; // END 08a
      } else if (disposition === 'RETURN') {
        forcedCustomEndingKey = 'END_PHASE3_TOMORROW_RETURN'; // END 08b
      } else if (disposition === 'DESTROY') {
        forcedCustomEndingKey = 'END_PHASE3_MERCY_DESTROY'; // END 09
      }
    } else {
      // 『少し休んでいけと声をかける』（KEEP）を選んだ場合：
      // 不機嫌でなく、かつフェーズ2で2回以上会話している（または機嫌・信頼度が上がっている）場合のみ素直に休む（END 04）。
      // まだ警戒中（会話不足）や不機嫌な場合は断って帰ってしまう（END 02）。
      const isNotWarmEnoughYet =
        mood < 0 ||
        isHatredMode ||
        (phase2TalkedCount < 2 && mood < 2 && trustLevel < 2);

      isStayRefused =
        isPhase2Now && disposition === 'KEEP' && isNotWarmEnoughYet;

      forcedCustomEndingKey = isStayRefused
        ? 'END_PHASE2_INCOMPLETE'
        : isPhase2Now && disposition === 'RETURN' && isNotWarmEnoughYet
          ? 'END_PHASE2_INCOMPLETE'
          : null;
    }

    setCustomEndingKey(forcedCustomEndingKey);
    setEndingDisposition(disposition);

    const isPanickingAfterSecret =
      (linkTags.includes('talked_tarlow_broken') &&
        !linkTags.includes('soothed_after_broken')) ||
      (linkTags.includes('asked_about_dp002') &&
        !linkTags.includes('apologized_to_asch') &&
        !linkTags.includes('checked_asch_headache') &&
        !linkTags.includes('soothed_after_broken'));

    const resolvedKey =
      forcedCustomEndingKey ?? resolveEndingKey(disposition, endingApproach);
    const decisionStageKey = isStayRefused
      ? 'END_PHASE2_STAY_REFUSED'
      : isDp002Unlocked && disposition === 'KEEP'
        ? 'END_PHASE3_TOMORROW'
        : isDp002Unlocked && disposition === 'RETURN'
          ? 'END_PHASE3_TOMORROW_RETURN'
          : resolvedKey;
    const decisionData =
      FINAL_DECISION_STAGES[decisionStageKey] ||
      FINAL_DECISION_STAGES[resolvedKey] ||
      FINAL_DECISION_STAGES.END_PHASE2_ASCH;

    // EDイベント突入に伴いBGMを即座に停止（ただしEND 02等のkeepBgm指定時は継続）
    if (!decisionData.endingTransition?.keepBgm) {
      soundEngine.stopBgm();
      soundEngine.setPlayingPhase(false);
    }

    const guyLines = decisionData.spokenText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const steps: QueuedStep[] = [];
    guyLines.forEach((line, idx) => {
      const delay =
        idx === 0
          ? 280
          : calculateLineDelayMs(guyLines[idx - 1]);
      steps.push({
        delayMs: delay,
        action: () => {
          pushScreenBubble('GUY', line, 'normal');
        },
        isBubble: true,
      });
    });

    const lastGuyLineText =
      guyLines.length > 0 ? guyLines[guyLines.length - 1] : '';

    const closingLines = decisionData.aschText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    closingLines.forEach((line, idx) => {
      const delay =
        idx === 0
          ? (decisionData.guyWaitMs ??
            calculateLineDelayMs(lastGuyLineText, { isSpeakerChange: true }))
          : (decisionData.aschWaitMs ?? calculateLineDelayMs(closingLines[idx - 1]));
      const baseEff =
        decisionData.voiceEffects?.[idx] ??
        decisionData.voiceEffects?.[0] ??
        'normal';

      steps.push({
        delayMs: delay,
        action: () => {
          if (idx === 0) {
            setOverrideExpression(decisionData.expression);
            setOverrideFaceParts(decisionData.faceParts);
            appendLog('INFO', `SESSION TERMINATED // DISPOSITION: ${resolvedKey}`);
          } else {
            const nextFace =
              decisionData.secondFaceParts ??
              deriveAutomaticSecondFaceParts(
                decisionData.expression,
                decisionData.faceParts,
                closingLines[0],
                line
              );
            if (decisionData.secondExpression) {
              setOverrideExpression(decisionData.secondExpression);
            }
            if (nextFace) {
              setOverrideFaceParts(nextFace);
            }
          }
          pushScreenBubble('ASCH', line, baseEff);
        },
        isBubble: true,
      });
    });

    // 単行セリフ（END 04等）で後半表情変化（secondFaceParts）が指定されている場合の表情変化ステップ
    if (closingLines.length === 1 && decisionData.secondFaceParts) {
      steps.push({
        delayMs: 1000,
        action: () => {
          if (decisionData.secondExpression) {
            setOverrideExpression(decisionData.secondExpression);
          }
          setOverrideFaceParts(decisionData.secondFaceParts!);
        },
        isBubble: false,
      });
    }

    // 追加ラリー演出（END 08b等の掛け合い・葛藤・見送り）
    if (decisionData.extraRallies && decisionData.extraRallies.length > 0) {
      let lastSpeakerForRally = 'ASCH';
      let lastLineTextForRally = closingLines[closingLines.length - 1] ?? '';
      decisionData.extraRallies.forEach((rally) => {
        const rallyLines = rally.text
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
        rallyLines.forEach((rLine, rIdx) => {
          const isSpeakerChange = lastSpeakerForRally !== rally.speaker;
          const delay =
            rIdx === 0
              ? (rally.waitMs ?? calculateLineDelayMs(lastLineTextForRally, { isSpeakerChange }))
              : calculateLineDelayMs(rallyLines[rIdx - 1]);
          steps.push({
            delayMs: delay,
            action: () => {
              if (rIdx === 0 && rally.specialEffect === 'shout_shock') {
                soundEngine.playHeavyShoutThud();
                setReplayPulse((p) => p + 1);
                setIsScreenShaking(true);
                setTimeout(() => setIsScreenShaking(false), 240);
              }
              if (rIdx === 0 && rally.silentFaceSequence && rally.silentFaceSequence.length > 0) {
                let accumSilentDelay = 0;
                rally.silentFaceSequence.forEach((sStep) => {
                  accumSilentDelay += sStep.delayMs;
                  window.setTimeout(() => {
                    if (sStep.expression) {
                      setOverrideExpression(sStep.expression);
                    }
                    if (sStep.faceParts) {
                      setOverrideFaceParts((prev) => ({
                        ...(prev ?? DEFAULT_EXPRESSION_PARTS[sStep.expression ?? 'normal']),
                        ...sStep.faceParts,
                      }));
                    }
                  }, accumSilentDelay);
                });
              }
              if (rally.speaker === 'ASCH') {
                if (rIdx === 0 && rally.expression) {
                  setOverrideExpression(rally.expression);
                  if (rally.faceParts) setOverrideFaceParts(rally.faceParts);
                } else if (rally.secondExpression) {
                  setOverrideExpression(rally.secondExpression);
                  if (rally.secondFaceParts) setOverrideFaceParts(rally.secondFaceParts);
                }
              }
              pushScreenBubble(
                rally.speaker,
                rLine,
                rally.voiceEffect ?? 'normal'
              );
            },
            isBubble: true,
          });
          lastSpeakerForRally = rally.speaker;
          lastLineTextForRally = rLine;
        });
      });
    }

    if (decisionData.endingTransition) {
      const trans = decisionData.endingTransition;
      const stepInterval =
        trans.footsteps === 'slow' ? 440 : trans.footsteps === 'fast' ? 240 : 360;
      const count = trans.footstepsCount ?? 3;
      const footstepsTotalMs = trans.footsteps ? count * stepInterval : 0;

      // セリフ表示・余韻後の退場（フェードアウト）＆足音開始
      steps.push({
        delayMs: trans.waitBeforeExitMs ?? 800,
        action: () => {
          if (trans.aschAction === 'fade_out') {
            setIsAschExited(true);
            setVisibleBubbles([]);
          }
          if (trans.footsteps) {
            soundEngine.playFootsteps(trans.footsteps, count);
          }
        },
        isBubble: false,
      });

      steps.push({
        delayMs: footstepsTotalMs + Math.max(2600, (trans.waitAfterDoorMs ?? 1200) + 1400),
        action: () => {
          setStats((prev) => ({
            ...prev,
            endTime: Date.now(),
          }));
          setEndingStep(0);
          setGamePhase('ENDING');
        },
        isBubble: false,
        isTerminal: true,
      });
    } else {
      steps.push({
        delayMs: 2600,
        action: () => {
          setStats((prev) => ({
            ...prev,
            endTime: Date.now(),
          }));
          setEndingStep(0);
          setGamePhase('ENDING');
        },
        isBubble: false,
        isTerminal: true,
      });
    }

    enqueueSequence(steps);
  };

  // === 会話トピックのクリック（一度最後まで話した内容は繰り返されない／機嫌・嫌悪による分岐） ===
  const handleSelectTopic = (topic: ConversationTopic) => {
    if (
      isTerminalOpen ||
      isDialogueLogOpen ||
      isManualOpen ||
      isSequencing ||
      isSequencingRef.current
    ) {
      return;
    }

    soundEngine.unlockOnUserInteraction();
    setPreviewPage(0);

    const responseTimeMs = Math.max(0, Date.now() - choiceShownAtRef.current);
    const isQuick = responseTimeMs <= 2000;
    const isLongThink = responseTimeMs >= 8000;
    const pageLoopHesitation = cycledPagesInTurnRef.current;
    cycledPagesInTurnRef.current = 0;
    const nextTotalTurns = stats.totalTurns + 1;
    totalTurnsRef.current = nextTotalTurns;

    setStats((prev) => ({
      ...prev,
      totalTurns: prev.totalTurns + 1,
      totalResponseTimeMs: prev.totalResponseTimeMs + responseTimeMs,
      quickReplyCount: prev.quickReplyCount + (isQuick ? 1 : 0),
      choiceHoverSwitchCount:
        prev.choiceHoverSwitchCount +
        (isLongThink ? 1 : 0) +
        pageLoopHesitation,
    }));

    const wasIdleBeforeClick = idleStageRef.current >= 1;
    const isPhase1Now = !linkTags.includes('phase2_started');
    const caughtAngryGlance =
      !isPhase1Now && mood < 0 && isAngryGlancingRef.current;
    if (caughtAngryGlance) {
      isAngryGlancingRef.current = false;
      badMoodRefusalCountRef.current = 0;
      moodRef.current = 0;
      setMood(0);
      setGuyMood((prev) => Math.max(0, prev));
      setLinkTags((prev) => prev.filter((t) => t !== 'cold_clash_escalated'));
      unlockAchievements('ach_10');
      appendLog(
        'INFO',
        'GAZE SYNC DETECTED // HOSTILITY LEVEL RESET'
      );
    }
    const prevContextCategory = lastContextCategoryRef.current;
    idleStageRef.current = 0;
    setIdleWaitSec(0);
    lastHoveredChoiceIdRef.current = null;
    if (topic.contextCategory) {
      lastContextCategoryRef.current = topic.contextCategory;
    }

    const askCount = topicAskCounts[topic.id] ?? 0;
    const stageIdx = Math.min(topic.stages.length - 1, askCount);
    const currentStage = topic.stages[stageIdx];

    if (currentStage.triggersEndingKey) {
      soundEngine.stopBgm();
      soundEngine.setPlayingPhase(false);
    }

    // 直前が核心・過去・対立などのシリアスな話題で、今回から明るめの日常話題へ切り替わる場合は「ためらい・間」を入れる
    const isPrevSerious =
      prevContextCategory === 'core' ||
      prevContextCategory === 'past' ||
      prevContextCategory === 'fight';
    const isNextBright =
      (topic.contextCategory === 'daily' || Boolean(topic.positiveTopic)) &&
      !topic.awkwardSilenceTopic &&
      askCount === 0;
    const shouldInsertSeriousToBrightPause =
      linkTags.includes('phase2_started') &&
      isPrevSerious &&
      isNextBright &&
      mood >= 0 &&
      !isHatredMode;
    const seriousToBrightTransition = shouldInsertSeriousToBrightPause
      ? SERIOUS_TO_BRIGHT_TRANSITIONS[
          nextTotalTurns % SERIOUS_TO_BRIGHT_TRANSITIONS.length
        ]
      : null;

    // --- 機嫌による反応分岐の判定（フェーズ1ではまだタルロウAを演じているため不機嫌拒否を発生させない） ---
    const isAngryNow = mood < 0 && !isPhase1Now && !caughtAngryGlance;
    const isGoodMoodNow = mood >= 2 && !isPhase1Now;

    // 1) 不機嫌なときに sensitiveToBadMood な話題（かつ専用の badMoodResponse がない場合）を振ると、答えてくれない（未消化のまま残る）
    // ※すでに進行中の話題（askCount > 0）の場合は途中で止まらないよう拒否しない
    const isRefusedByBadMood =
      askCount === 0 &&
      isAngryNow &&
      Boolean(topic.sensitiveToBadMood) &&
      !currentStage.badMoodResponse;

    // 2) 専用の badMoodResponse が設定されている場合（頭を撫でようとして強く払われる／お茶を渋々飲む等）
    const useCustomBadMood = isAngryNow && Boolean(currentStage.badMoodResponse);

    // 3) 上機嫌（mood >= 2）で goodMoodResponse が設定されている場合（頭を撫でさせてくれる等）
    const useCustomGoodMood =
      !isAngryNow && isGoodMoodNow && Boolean(currentStage.goodMoodResponse);

    const isBackedOffOnce = linkTags.includes(`backed_off_${topic.id}`);
    const effectiveSpokenText =
      (useCustomBadMood && currentStage.badMoodResponse?.spokenText) ||
      (useCustomGoodMood && currentStage.goodMoodResponse?.spokenText) ||
      (isBackedOffOnce && currentStage.retrySpokenText) ||
      currentStage.spokenText;
    const effectiveStageAschText =
      (isBackedOffOnce && currentStage.retryAschText) ||
      currentStage.aschText;

    // 本題の冒頭にすでに「・・・・・・」や「さっき」「そういえば」「なあ」等の導入がある場合は、二重に言い淀みを重ねない
    const alreadyHasNaturalLeadIn =
      /^(?:・・・・・・|さっき|そういえば|ところで|なあ[、　]|おい[、　]|いや[、　]|ほら[、　])/.test(
        effectiveSpokenText.trim()
      );

    // 気まずい・不機嫌な空気の中で別の通常話題を振って会話を続ける場合、ガイが言い淀みながら切り出す（IMMUTABLE_RULES 6-②）
    const shouldPrependAwkwardPrefix =
      linkTags.includes('phase2_started') &&
      !caughtAngryGlance &&
      (mood < 0 || guyMood < 0 || isHatredMode) &&
      askCount === 0 &&
      topic.contextCategory !== 'fight' &&
      topic.id !== 'topic_41_apologize' &&
      !topic.calmsAnger &&
      !topic.awkwardSilenceTopic &&
      (isRefusedByBadMood || !alreadyHasNaturalLeadIn);

    const awkwardHesitationLine = shouldPrependAwkwardPrefix
      ? AWKWARD_TOPIC_PREFIXES[nextTotalTurns % AWKWARD_TOPIC_PREFIXES.length]
      : null;

    // 不機嫌でアッシュに拒絶される場合、ガイが長文や明るいセリフを最後まで喋り切る不自然さを防ぎ、切り出しの段階で遮られる形にする
    const guyLines = isRefusedByBadMood
      ? [awkwardHesitationLine ?? '・・・・・・なあ、少し聞きたいんだが']
      : effectiveSpokenText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);

    const steps: QueuedStep[] = [];

    const hasGuyHesitation =
      guyLines.length > 0 &&
      !isRefusedByBadMood &&
      !alreadyHasNaturalLeadIn &&
      Boolean(seriousToBrightTransition || awkwardHesitationLine);

    if (hasGuyHesitation && seriousToBrightTransition) {
      const hesitateLines = seriousToBrightTransition.guyHesitation
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      hesitateLines.forEach((hLine, hIdx) => {
        steps.push({
          delayMs: hIdx === 0 ? 260 : 760,
          action: () => {
            pushScreenBubble('GUY', hLine, 'normal', hIdx > 0);
          },
        });
      });
    } else if (hasGuyHesitation && awkwardHesitationLine) {
      steps.push({
        delayMs: 240,
        action: () => {
          pushScreenBubble('GUY', awkwardHesitationLine, 'normal', false);
        },
      });
    }

    guyLines.forEach((line, idx) => {
      const delay =
        idx === 0
          ? hasGuyHesitation
            ? 820
            : 240
          : calculateLineDelayMs(guyLines[idx - 1]);
      steps.push({
        delayMs: delay,
        action: () => {
          // 言い淀みがあった場合は1枠目のガイの吹き出しを同じセリフ枠内で上書きする（ログには両方残る）
          pushScreenBubble('GUY', line, 'normal', idx === 0 && hasGuyHesitation);
        },
      });
    });

    const lastGuyLineText =
      guyLines.length > 0 ? guyLines[guyLines.length - 1] : '';
    const lastGuyLineLen = lastGuyLineText.length;

    let chosenPhase1SlipVariant: Phase1SlipVariant | null = null;
    const nextPhase1QCount = isPhase1Now
      ? phase1QuestionsCount + 1
      : phase1QuestionsCount;

    if (isPhase1Now) {
      setPhase1QuestionsCount(nextPhase1QCount);
      setPhase1AskedTopicIds((prev) =>
        prev.includes(topic.id) ? prev : [...prev, topic.id]
      );

      const slipConfig = PHASE1_TOPIC_SLIP_CONFIGS[topic.id];
      const targetSlipCount = phase1TargetSlipTurns.length;
      const remainingQuestionsAfterThis = Math.max(0, 5 - nextPhase1QCount);
      const remainingSlipsNeeded = Math.max(
        0,
        targetSlipCount - phase1OccurredSlips.length
      );
      const shouldSlipNow =
        remainingSlipsNeeded > 0 &&
        (phase1TargetSlipTurns.includes(nextPhase1QCount) ||
          phase1PendingSlipCarry ||
          remainingQuestionsAfterThis < remainingSlipsNeeded);

      if (
        shouldSlipNow &&
        slipConfig?.canSlip &&
        slipConfig.variants.length > 0 &&
        !phase1OccurredSlips.some((s) => s.topicId === topic.id)
      ) {
        const pickedVariant =
          slipConfig.variants[
            Math.floor(Math.random() * slipConfig.variants.length)
          ];
        chosenPhase1SlipVariant = pickedVariant;
        setPhase1PendingSlipCarry(false);
        const newSlipRecord: OccurredPhase1Slip = {
          topicId: topic.id,
          shortLabel: slipConfig.shortLabel,
          variant: pickedVariant,
        };
        setPhase1OccurredSlips((prev) => [...prev, newSlipRecord]);
      } else if (shouldSlipNow && !slipConfig?.canSlip) {
        setPhase1PendingSlipCarry(true);
      }
    }

    const refusalTemplate =
      DEFAULT_BAD_MOOD_REFUSAL_LINES[
        stats.totalTurns % DEFAULT_BAD_MOOD_REFUSAL_LINES.length
      ];

    const isPhase1RewriteSlip = Boolean(
      chosenPhase1SlipVariant?.type === 'REWRITE' &&
        chosenPhase1SlipVariant.slipCorrectedText
    );

    const baseResolvedAschText = isRefusedByBadMood
      ? refusalTemplate.aschText
      : useCustomBadMood
        ? currentStage.badMoodResponse!.aschText
        : useCustomGoodMood
          ? currentStage.goodMoodResponse!.aschText
          : isPhase1RewriteSlip
            ? chosenPhase1SlipVariant!.slipCorrectedText!
            : effectiveStageAschText;

    // 逆質問が停止されている場合、末尾の逆質問セリフを省いて自然な会話として完結させる
    const resolvedAschText =
      aschQuestionsDisabled &&
      currentStage.triggersAschQuestion &&
      !isRefusedByBadMood
        ? baseResolvedAschText
            .split('\n')
            .slice(0, -1)
            .join('\n') || baseResolvedAschText
        : baseResolvedAschText;

    const resolvedExpression: ExpressionId = isRefusedByBadMood
      ? refusalTemplate.expression
      : useCustomBadMood
        ? currentStage.badMoodResponse!.expression
        : useCustomGoodMood
          ? currentStage.goodMoodResponse!.expression
          : currentStage.expression;

    const resolvedFaceParts: Partial<FaceParts> | undefined = isRefusedByBadMood
      ? refusalTemplate.faceParts
      : useCustomBadMood
        ? currentStage.badMoodResponse!.faceParts
        : useCustomGoodMood
          ? currentStage.goodMoodResponse!.faceParts
          : isPhase1RewriteSlip && chosenPhase1SlipVariant?.correctedFaceParts
            ? chosenPhase1SlipVariant.correctedFaceParts
            : currentStage.faceParts;

    const resolvedSecondExpression: ExpressionId | undefined = isRefusedByBadMood
      ? undefined
      : useCustomBadMood
        ? currentStage.badMoodResponse!.secondExpression
        : useCustomGoodMood
          ? currentStage.goodMoodResponse!.secondExpression
          : currentStage.secondExpression;

    const resolvedSecondFaceParts: Partial<FaceParts> | undefined =
      isRefusedByBadMood
        ? undefined
        : useCustomBadMood
          ? currentStage.badMoodResponse!.secondFaceParts
          : useCustomGoodMood
            ? currentStage.goodMoodResponse!.secondFaceParts
            : currentStage.secondFaceParts;

    const resolvedVoiceEffects: BubbleVoiceEffect[] | undefined =
      isRefusedByBadMood
        ? refusalTemplate.voiceEffects
        : useCustomBadMood
          ? currentStage.badMoodResponse!.voiceEffects
          : useCustomGoodMood
            ? currentStage.goodMoodResponse!.voiceEffects
            : currentStage.voiceEffects;

    // 不機嫌で拒否された場合（または不機嫌時に頭を撫でて払われた場合）は、話題を消化済みにせず後で機嫌が直ってからまた聞けるようにする
    const shouldAdvanceStage =
      !isRefusedByBadMood && !(useCustomBadMood && !topic.calmsAnger);

    if (shouldAdvanceStage) {
      setLastAskedTopicId(topic.id);
      setLastRefusedTopicId(null);
    } else {
      setLastRefusedTopicId(topic.id);
    }

    const aschLines = resolvedAschText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const pauseBeforeAsch = calculateLineDelayMs(lastGuyLineText, {
      isSpeakerChange: true,
      typingSpeed: currentStage.typingSpeed,
    });

    // フェーズ1で「答える直前の一瞬の表情変化（PRE_FACE）」のボロが選ばれた場合、発話前の0.7秒間だけ表情と波形が揺らぐ
    if (
      chosenPhase1SlipVariant?.type === 'PRE_FACE' &&
      chosenPhase1SlipVariant.preFaceParts
    ) {
      const preFace = chosenPhase1SlipVariant.preFaceParts;
      steps.push({
        delayMs: Math.min(850, Math.max(520, lastGuyLineLen * 22)),
        action: () => {
          setOverrideExpression('look_away');
          setOverrideFaceParts(preFace);
          setMood(-2);
          appendLog(
            'WARNING',
            'PRE-VOCAL MICRO-TREMOR AND WAVEFORM SPIKE DETECTED'
          );
        },
      });
    }

    const hasAschPreBubbleToOverwrite = Boolean(
      isPhase1RewriteSlip && chosenPhase1SlipVariant?.slipPrefixText
    );

    // フェーズ2以降：セリフ枠が出る前に、まず立ち絵の表情だけが先に変わって一拍「タメ」を作る演出
    const usePhase2PreFaceTame =
      !isPhase1Now && !hasAschPreBubbleToOverwrite && aschLines.length > 0;
    const phase2TameDurationMs = usePhase2PreFaceTame
      ? getPreSpeechTameDurationMs(resolvedExpression, resolvedFaceParts)
      : 0;
    if (usePhase2PreFaceTame) {
      const preFacePartsForTame = caughtAngryGlance
        ? {
            brow: 'sad' as const,
            eyes: 'away' as const,
            mouth: 'frown' as const,
            effects: ['sweat' as const],
          }
        : buildPreSpeechFaceParts(resolvedExpression, resolvedFaceParts);
      const delayToPreFace = Math.max(
        440,
        pauseBeforeAsch - Math.round(phase2TameDurationMs * 0.65)
      );
      steps.push({
        delayMs: delayToPreFace,
        action: () => {
          setOverrideExpression(
            caughtAngryGlance ? 'look_away' : resolvedExpression
          );
          setOverrideFaceParts(preFacePartsForTame);
        },
      });
    }

    // Phase 1で「言い直し（REWRITE）」のボロが選ばれた場合、まず1枠目に本音（slipPrefixText）を表示し、直後に同じ枠へ訂正セリフを上書きする
    if (isPhase1RewriteSlip && chosenPhase1SlipVariant?.slipPrefixText) {
      const slipPrefix = chosenPhase1SlipVariant.slipPrefixText;
      const slipFace = chosenPhase1SlipVariant.slipFaceParts ?? {
        brow: 'angry',
        eyes: 'wide',
        mouth: 'shout',
        effects: ['sweat'],
      };
      steps.push({
        delayMs: pauseBeforeAsch,
        action: () => {
          setOverrideExpression('shock');
          setOverrideFaceParts(slipFace);
          setMood(-2);
          pushScreenBubble('ASCH', slipPrefix, 'normal', false);
        },
      });
    }

    // ターン経過による逆質問が発生するか事前判定（穏やかな話題が最終段階まで一区切りついた時、かつ直前の返答が1枠で吹き出しが重なりすぎない時のみ自然発生）
    const isCalmAfterCurrentStage =
      !isAngryNow &&
      !isHatredMode &&
      (currentStage.moodDelta ?? 0) >= 0 &&
      !currentStage.capturedProtect &&
      !currentStage.capturedProtects;

    const hasReplyOptionsForCurrentStage = Boolean(
      currentStage.replyOptions && currentStage.replyOptions.length > 0
    );

    aschLines.forEach((line, idx) => {
      const delay =
        idx === 0
          ? isPhase1RewriteSlip && chosenPhase1SlipVariant?.slipPrefixText
            ? 860
            : chosenPhase1SlipVariant?.type === 'PRE_FACE'
              ? 720
              : usePhase2PreFaceTame
                ? phase2TameDurationMs
                : pauseBeforeAsch
          : calculateLineDelayMs(aschLines[idx - 1], {
              typingSpeed: currentStage.typingSpeed,
            });

      const baseVoiceEffect: BubbleVoiceEffect =
        resolvedVoiceEffects?.[idx] ?? resolvedVoiceEffects?.[0] ?? 'normal';

      const forceGlitchOnChoice =
        topic.requireSectorUnlocked === 'SEC-19' ||
        topic.requireSectorUnlocked === 'SEC-20';
      const lineVoiceEffect = resolveVoiceEffectWithGlitch(
        baseVoiceEffect,
        0,
        forceGlitchOnChoice
      );

      steps.push({
        delayMs: delay,
        action: () => {
          if (idx > 0) {
            const nextSecondFace =
              resolvedSecondFaceParts ??
              deriveAutomaticSecondFaceParts(
                resolvedExpression,
                resolvedFaceParts,
                aschLines[0],
                line
              );
            if (resolvedSecondExpression) {
              setOverrideExpression(resolvedSecondExpression);
            }
            if (nextSecondFace) {
              setOverrideFaceParts(nextSecondFace);
            }
          }
          if (idx === 0) {
            setOverrideExpression(resolvedExpression);
            setOverrideFaceParts(resolvedFaceParts ?? null);

            if (shouldAdvanceStage) {
              const nextStageCount = askCount + 1;
              setTopicAskCounts((prev) => ({
                ...prev,
                [topic.id]: nextStageCount,
              }));
              if (
                nextStageCount >= topic.stages.length &&
                !hasReplyOptionsForCurrentStage
              ) {
                setStats((prev) => ({
                  ...prev,
                  completedTopicsCount: prev.completedTopicsCount + 1,
                }));
              }
            }

            // 機嫌・信頼度・嫌悪ポイントの更新
            if (!linkTags.includes('phase2_started')) {
              if (chosenPhase1SlipVariant) {
                setMood(-2);
                const slipCfg = PHASE1_TOPIC_SLIP_CONFIGS[topic.id];
                const SLIP_TITLES: Record<string, string> = {
                  p1_luke_model: '予備機体モデルへの反応ログ',
                  p1_dist_loyalty: '管理者に関する応答ログ',
                  p1_touch_shoulder: '頭部接触時の反射行動と呼称出力',
                  p1_galdios_sword: '宝刀ガルディオス視認時の反応ログ',
                  p1_natalia_rumor: 'キムラスカ王女に関する応答ログ',
                  p1_peony_rabbits: '個体名『アッシュ』への反応ログ',
                  p1_octopus_meal: '特定食材（タコ）への拒絶反応ログ',
                  p1_asch_rumor: '六神将当時の身体的特徴への反応ログ',
                };
                const chartTitle =
                  SLIP_TITLES[topic.id] ??
                  `応答波形ログ（${slipCfg?.shortLabel ?? topic.id}）`;
                const quoteBlock =
                  chosenPhase1SlipVariant.type === 'REWRITE' &&
                  chosenPhase1SlipVariant.slipPrefixText &&
                  chosenPhase1SlipVariant.slipCorrectedText
                    ? `発言：「${chosenPhase1SlipVariant.slipPrefixText}」\n訂正：「${chosenPhase1SlipVariant.slipCorrectedText}」`
                    : `発言：「${currentStage.aschText}」`;

                addOralInfo({
                  id: `oral-p1-slip-${topic.id}`,
                  category: '情動反応',
                  title: chartTitle,
                  content: `${quoteBlock}\n${chosenPhase1SlipVariant.terminalRecordSummary}`,
                });
                setHasUnreadSector(true);
                appendLog(
                  'WARNING',
                  `[EM-LOG] ANOMALY RECORDED TO INFO // ${topic.id.toUpperCase()}`
                );
              } else {
                setMood(0);
              }

              if (topic.id === 'p1_octopus_meal') {
                addOralInfo({
                  id: 'oral-p1-body-meal',
                  category: '機体ログ',
                  title: '経口摂取および代謝機能',
                  content:
                    '本機体に有機物の経口摂取および消化機能は未実装。内部の音素循環のみで稼働する。\n擬似味覚および嗅覚センサーは生体時（20歳時点）の嗜好データを引き継いでいる。',
                });
              }
            } else {
              const mDelta = isRefusedByBadMood
                ? 0
                : useCustomBadMood
                  ? (currentStage.badMoodResponse!.moodDelta ?? -1)
                  : useCustomGoodMood
                    ? (currentStage.goodMoodResponse!.moodDelta ?? 2)
                    : (currentStage.moodDelta ?? 0);

              if (topic.id === 'topic_41_apologize') {
                // 素直に謝って仲直りした場合は、双方の不機嫌および衝突フラグを解消する
                setMood((prev) => {
                  const next = Math.max(0, prev + mDelta);
                  moodRef.current = next;
                  return next;
                });
                setGuyMood((prev) =>
                  Math.max(0, prev + (currentStage.guyMoodDelta ?? 3))
                );
                setLinkTags((prev) =>
                  prev.filter((t) => t !== 'cold_clash_escalated')
                );
              } else {
                const hasReplyOptions = Boolean(
                  currentStage.replyOptions && currentStage.replyOptions.length > 0
                );
                if (hasReplyOptions && mDelta > 0) {
                  // 返答選択肢がある場合、選択肢側の回答によって機嫌が増減するためステージ開始時は加算しない
                } else if (isAngryNow && !topic.calmsAnger && mDelta > 0) {
                  updateMood(0);
                } else {
                  updateMood(mDelta);
                }
                if (isRefusedByBadMood) {
                  // アッシュが不機嫌で会話を拒絶した際、ガイ側も態度に苛立って不機嫌に引きずられる
                  updateGuyMood(-2);
                } else if (currentStage.guyMoodDelta) {
                  updateGuyMood(currentStage.guyMoodDelta);
                }
              }
            }

            const hasReplyOptions = Boolean(
              currentStage.replyOptions && currentStage.replyOptions.length > 0
            );

            const tDelta = isRefusedByBadMood
              ? 0
              : useCustomBadMood
                ? (currentStage.badMoodResponse!.trustDelta ?? 0)
                : useCustomGoodMood
                  ? (currentStage.goodMoodResponse!.trustDelta ?? 1)
                  : hasReplyOptions
                    ? 0
                    : (currentStage.trustDelta ?? 0);

            if (tDelta !== 0) {
              setTrustLevel((prev) => prev + tDelta);
            }

            if (shouldAdvanceStage && currentStage.hatredDelta) {
              setHatredPoints((prev) => {
                const nextH = prev + currentStage.hatredDelta!;
                if (prev < 2 && nextH >= 2) {
                  setLinkTags((tags) =>
                    Array.from(new Set([...tags, 'tag_hatred_locked']))
                  );
                  appendLog(
                    'WARNING',
                    'INTERACTION MODE LOCKED // HOSTILE THRESHOLD EXCEEDED'
                  );
                }
                return nextH;
              });
            }

            if (shouldAdvanceStage && currentStage.grantsLinkTags) {
              setLinkTags((prev) =>
                Array.from(new Set([...prev, ...currentStage.grantsLinkTags!]))
              );
            }


            const infoToRecord = useCustomGoodMood
              ? (currentStage.goodMoodResponse?.oralInfo ??
                currentStage.oralInfo)
              : useCustomBadMood
                ? currentStage.badMoodResponse?.oralInfo
                : shouldAdvanceStage
                  ? currentStage.oralInfo
                  : undefined;

            if (infoToRecord) {
              addOralInfo(infoToRecord);
            }

            if (shouldAdvanceStage && currentStage.systemLog) {
              appendLog('INFO', currentStage.systemLog);
            }

            const unlockSecId = useCustomGoodMood
              ? (currentStage.goodMoodResponse?.naturalUnlockSectorId ??
                currentStage.naturalUnlockSectorId)
              : shouldAdvanceStage
                ? currentStage.naturalUnlockSectorId
                : undefined;

            if (unlockSecId) {
              const stamp = nextOrderStamp();
              if (!readSectorIds.includes(unlockSecId)) {
                setHasUnreadSector(true);
              }
              setSectors((prev) =>
                prev.map((s) =>
                  s.id === unlockSecId
                    ? {
                        ...s,
                        discovered: true,
                        discoveredAt: s.discoveredAt ?? stamp,
                        unlocked: true,
                        unlockedAt: stamp,
                        unlockedMethod: s.unlockedMethod ?? 'DIALOGUE',
                      }
                    : s
                )
              );
            }
          }

          if (idx === aschLines.length - 1 && shouldAdvanceStage) {
            const triggers = [
              ...(currentStage.capturedProtect
                ? [currentStage.capturedProtect]
                : []),
              ...(currentStage.capturedProtects ?? []),
            ];

            if (triggers.length > 0) {
              const stamp = nextOrderStamp();
              const hasNew = triggers.some((cap) => {
                const targetSec = sectors.find((s) => s.id === cap.sectorId);
                return targetSec && !targetSec.discovered && !targetSec.unlocked;
              });
              if (hasNew) {
                soundEngine.playProtectCaptured();
                setHasUnreadSector(true);
              }
              setSectors((prev) =>
                prev.map((s) => {
                  const matched = triggers.find(
                    (cap) => cap.sectorId === s.id
                  );
                  if (matched && !s.unlocked) {
                    return {
                      ...s,
                      discovered: true,
                      discoveredAt: s.discoveredAt ?? stamp,
                      capturedQuote: matched.capturedQuote,
                      capturedContext: matched.capturedContext,
                    };
                  }
                  return s;
                })
              );
            }

            // ステージに複数反応選択肢（replyOptions）がある場合は、その話題の反応選択肢を表示
            if (
              currentStage.replyOptions &&
              currentStage.replyOptions.length > 0
            ) {
              setPreviewPage(0);
              setActiveTopicReply({
                topicId: topic.id,
                options: currentStage.replyOptions,
              });
            } else if (
              !aschQuestionsDisabled &&
              currentStage.triggersAschQuestion &&
              !answeredQuestionIds.includes(
                currentStage.triggersAschQuestion.id
              )
            ) {
              // ステージ固有の逆質問の発火（逆質問停止フラグが立っていない場合のみ）
              setPreviewPage(0);
              setActiveAschQuestion(currentStage.triggersAschQuestion);
            }
          }

          pushScreenBubble(
            'ASCH',
            line,
            lineVoiceEffect,
            idx === 0 && hasAschPreBubbleToOverwrite
          );
        },
      });
    });

    if (currentStage.extraExchanges && currentStage.extraExchanges.length > 0) {
      let prevSpeaker: 'ASCH' | 'GUY' = aschLines.length > 0 ? 'ASCH' : 'GUY';
      let prevText: string =
        aschLines.length > 0 ? aschLines[aschLines.length - 1] : '';

      currentStage.extraExchanges.forEach((ex: ExtraDialogueExchange) => {
        const exLines = ex.text
          .split('\n')
          .map((s: string) => s.trim())
          .filter(Boolean);
        exLines.forEach((exLine: string, lineIdx: number) => {
          const isSpeakerChange = prevSpeaker !== ex.speaker;
          const delay =
            lineIdx === 0
              ? (ex.waitMs ?? calculateLineDelayMs(prevText, { isSpeakerChange }))
              : calculateLineDelayMs(exLines[lineIdx - 1], { isSpeakerChange: false });
          prevSpeaker = ex.speaker;
          prevText = exLine;

          steps.push({
            delayMs: delay,
            action: () => {
              if (ex.specialEffect === 'shout_shock') {
                soundEngine.playHeavyShoutThud();
                setReplayPulse((p) => p + 1);
                setIsScreenShaking(true);
                setTimeout(() => setIsScreenShaking(false), 240);
              }
              if (ex.silentFaceSequence && ex.silentFaceSequence.length > 0) {
                let accumSilentDelay = 0;
                ex.silentFaceSequence.forEach((sStep) => {
                  accumSilentDelay += sStep.delayMs;
                  window.setTimeout(() => {
                    if (sStep.expression) {
                      setOverrideExpression(sStep.expression);
                    }
                    if (sStep.faceParts) {
                      setOverrideFaceParts((prev) => ({
                        ...(prev ?? DEFAULT_EXPRESSION_PARTS[sStep.expression ?? 'normal']),
                        ...sStep.faceParts,
                      }));
                    }
                  }, accumSilentDelay);
                });
              }
              if (ex.speaker === 'ASCH') {
                if (ex.expression) {
                  setOverrideExpression(ex.expression);
                }
                if (ex.faceParts) {
                  const fallbackExpr: ExpressionId =
                    ex.expression ?? (activeExpression as ExpressionId);
                  setOverrideFaceParts((prev) => ({
                    ...(prev ?? DEFAULT_EXPRESSION_PARTS[fallbackExpr]),
                    ...ex.faceParts,
                  }));
                }
              }
              pushScreenBubble(ex.speaker, exLine, ex.voiceEffect);
            },
            isBubble: true,
          });
        });
      });
    }

    const effectiveTopicMoodDelta = !linkTags.includes('phase2_started')
      ? 0
      : isRefusedByBadMood
        ? 0
        : useCustomBadMood
          ? (currentStage.badMoodResponse!.moodDelta ?? -1)
          : useCustomGoodMood
            ? (currentStage.goodMoodResponse!.moodDelta ?? 2)
            : (currentStage.moodDelta ?? 0);

    steps.push({
      delayMs: currentStage.triggersEndingKey ? 1400 : 500,
      action: () => {
        if (currentStage.triggersEndingKey) {
          setCustomEndingKey(currentStage.triggersEndingKey);
          setStats((prev) => ({
            ...prev,
            endTime: Date.now(),
          }));
          setEndingStep(0);
          soundEngine.stopBgm();
          soundEngine.setPlayingPhase(false);
          setGamePhase('ENDING');
          return;
        }
        if (
          topic.id !== 'p2_deep_truth_dilemma' &&
          !hasReplyOptionsForCurrentStage &&
          effectiveTopicMoodDelta < 0 &&
          moodRef.current < 0
        ) {
          if (topic.id === 'p2_irritated_clash') {
            moodWarningGivenRef.current = true;
          } else if (!moodWarningGivenRef.current) {
            moodWarningGivenRef.current = true;
            appendLog(
              'WARNING',
              'WARNING: EMOTIONAL WAVEFORM CRITICAL // SESSION ABORT IMMINENT'
            );
            playAschReactionLines(
              '・・・・・・いい加減にしろ。これ以上鬱陶しい真似を続けるなら、俺は今すぐ研究所へ戻るからな！',
              'glare',
              {
                brow: 'angry',
                eyes: 'glare',
                mouth: 'grit',
                effects: ['sweat'],
              },
              ['shout'],
              320
            );
          } else {
            triggerMoodLimitDeparture();
            return;
          }
        }
        if (moodRef.current < 0 && linkTags.includes('phase2_started')) {
          resetAngryGlanceSchedule();
          setOverrideExpression('glare');
          setOverrideFaceParts({
            brow: 'angry',
            eyes: 'away',
            mouth: 'frown',
            effects: [],
          });
          if (isRefusedByBadMood) {
            badMoodRefusalCountRef.current += 1;
            if (
              badMoodRefusalCountRef.current >= 2 &&
              !badMoodHintShownRef.current
            ) {
              badMoodHintShownRef.current = true;
              pushScreenBubble(
                'GUY',
                '（・・・・・・今は何を聞いても突っぱねられそうだな。少し落ち着くまで、このまま黙って様子を見てみるか・・・・・・）',
                'normal'
              );
            }
          }
        }
        // フェーズ1で5回質問し終えたら、自動的にフェーズ終了時の指摘・結論パート（推理ステップ1）へ移行する
        if (isPhase1Now && nextPhase1QCount >= 5) {
          setIsDecisionMenuOpen(true);
          setPhase1AccuseStep('SELECT_TOPIC');
          setPreviewPage(0);
        }
      },
    });

    enqueueSequence(steps);
  };

  // === アッシュの頭部インタラクション（頭を触る・撫でる） ===
  const handleHeadPat = () => {
    if (
      isTerminalOpen ||
      isDialogueLogOpen ||
      isManualOpen ||
      isSequencing ||
      isSequencingRef.current ||
      isInteractionBlocked ||
      isDecisionMenuOpen ||
      isAschCollapsed ||
      isAschExited
    ) {
      return;
    }

    soundEngine.unlockOnUserInteraction();

    // フェーズ1：頭部接触のカマかけ（p1_touch_shoulder）を直接発動、4回目以降は手を払われ不機嫌ポイント付与＆帰還判定
    if (!linkTags.includes('phase2_started')) {
      const currentCount = headPatCount;
      setHeadPatCount((prev) => prev + 1);

      // フェーズ1でも4回目以降は手を払われ、不機嫌ポイント（mood -1）が付く！
      if (currentCount >= 3) {
        unlockAchievements('ach_11');
        soundEngine.playHandSlap();
        setReplayPulse((p) => p + 1);
        setIsScreenShaking(true);
        setTimeout(() => setIsScreenShaking(false), 200);
        updateMood(-1);

        // 警告がすでに出ている状態でさらに触ったら、その場で研究所へ帰還（ゲームオーバー）！
        if (moodWarningGivenRef.current) {
          triggerMoodLimitDeparture();
          return;
        }

        if (currentCount === 3) {
          const text = 'いい加減にしろ！ 何度も触るなと言っているだろうが！';
          const face: Partial<FaceParts> = {
            brow: 'angry',
            eyes: 'glare',
            mouth: 'shout',
            effects: ['shadow'],
          };
          setOverrideExpression('glare');
          setOverrideFaceParts(face);
          pushScreenBubble('ASCH', text, 'shout');
          return;
        }

        // 5回目：帰還前の最終警告！
        moodWarningGivenRef.current = true;
        appendLog(
          'WARNING',
          'WARNING: EMOTIONAL WAVEFORM CRITICAL // SESSION ABORT IMMINENT'
        );
        const text = 'これ以上鬱陶しい真似を続けるなら、俺は今すぐ研究所へ戻るからな！';
        const face: Partial<FaceParts> = {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'grit',
          effects: ['shadow', 'sweat'],
        };
        setOverrideExpression('glare');
        setOverrideFaceParts(face);
        pushScreenBubble('ASCH', text, 'shout');
        return;
      }

      // 1〜3回目：
      if (phase1QuestionsCount < 5) {
        const touchTopic = CONVERSATION_TOPICS.find(
          (t) => t.id === 'p1_touch_shoulder'
        );
        if (touchTopic && !phase1AskedTopicIds.includes('p1_touch_shoulder')) {
          handleSelectTopic(touchTopic);
          return;
        }
      }

      // 2回目・3回目（または5問終了後）の警戒反応
      soundEngine.playTextAdvance();
      setReplayPulse((p) => p + 1);
      const isSecond = currentCount === 1;
      const text = isSecond
        ? '不要な接触はやめろと言ったはずだ'
        : '・・・・・・機体に触れるな。警告は二度目だぞ';
      setOverrideExpression('glare');
      setOverrideFaceParts({
        brow: isSecond ? 'normal' : 'angry',
        eyes: 'glare',
        mouth: isSecond ? 'close' : 'frown',
        effects: [],
      });
      pushScreenBubble('ASCH', text, 'normal');
      return;
    }

    // フェーズ2：頭撫でリアクション（3回目まで機嫌に応じた反応、4回目以降はどの機嫌でも不機嫌化＆手払い＆帰還判定）
    const currentCount = headPatCount;
    setHeadPatCount((prev) => prev + 1);

    // DP-002後の緊迫・混乱時（触られたことへの切迫した拒絶）：
    if (
      linkTags.includes('asked_about_dp002') &&
      !linkTags.includes('p2_dilemma_resolved')
    ) {
      soundEngine.playHandSlap();
      setReplayPulse((p) => p + 1);
      setIsScreenShaking(true);
      setTimeout(() => setIsScreenShaking(false), 200);
      setOverrideExpression('pain');
      setOverrideFaceParts({
        brow: 'pain',
        eyes: 'pain',
        mouth: 'grit',
        effects: ['pale', 'sweat', 'noise'],
      });
      pushScreenBubble('ASCH', '・・・・・・っ！　触るな・・・・・・っ！！', 'shout_glitch');
      return;
    }

    // 4回目以上（currentCount >= 3）：どの機嫌であっても手を払われ、不機嫌になる
    if (currentCount >= 3) {
      unlockAchievements('ach_11');
      soundEngine.playHandSlap();
      setReplayPulse((p) => p + 1);
      setIsScreenShaking(true);
      setTimeout(() => setIsScreenShaking(false), 200);
      updateMood(-1);

      // 警告がすでに出ている状態でさらに触ったら、その場で研究所へ帰還（ゲームオーバー）！
      if (moodWarningGivenRef.current) {
        triggerMoodLimitDeparture();
        return;
      }

      if (currentCount === 3) {
        const text = 'いい加減にしろ！ 何度も触るなと言っているだろうが！';
        const face: Partial<FaceParts> = {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'shout',
          effects: ['shadow'],
        };
        setOverrideExpression('glare');
        setOverrideFaceParts(face);
        pushScreenBubble('ASCH', text, 'shout');
        return;
      }

      // 5回目：帰還前の最終警告！
      moodWarningGivenRef.current = true;
      appendLog(
        'WARNING',
        'WARNING: EMOTIONAL WAVEFORM CRITICAL // SESSION ABORT IMMINENT'
      );
      const text = 'これ以上鬱陶しい真似を続けるなら、俺は今すぐ研究所へ戻るからな！';
      const face: Partial<FaceParts> = {
        brow: 'angry',
        eyes: 'glare',
        mouth: 'grit',
        effects: ['shadow', 'sweat'],
      };
      setOverrideExpression('glare');
      setOverrideFaceParts(face);
      pushScreenBubble('ASCH', text, 'shout');
      return;
    }

    const isAngry = moodRef.current < 0;
    const isGood = moodRef.current >= 2;

    if (isAngry) {
      // 不機嫌時（1〜3回目）：手を払われる（鋭い打撃SE＋画面微振動）、機嫌がさらに悪化
      soundEngine.playHandSlap();
      setReplayPulse((p) => p + 1);
      setIsScreenShaking(true);
      setTimeout(() => setIsScreenShaking(false), 200);
      updateMood(-1);

      let text = '触るなと言っているだろうが！ 気安く近寄るな';
      let face: Partial<FaceParts> = {
        brow: 'angry',
        eyes: 'glare',
        mouth: 'shout',
        effects: [],
      };
      let expr: ExpressionId = 'glare';
      let voiceEffect: BubbleVoiceEffect = 'shout';

      if (currentCount === 1) {
        text = 'しつこいぞ！ ガキ扱いするなと言ったのが聞こえなかったのか！';
        face = {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'shout',
          effects: ['shadow'],
        };
        expr = 'glare';
        voiceEffect = 'shout';
      } else if (currentCount === 2) {
        text = 'いい加減にしろ！ これ以上近寄るな！';
        face = {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'grit',
          effects: ['shadow', 'sweat'],
        };
        expr = 'pain';
        voiceEffect = 'shout';
      }

      setOverrideExpression(expr);
      setOverrideFaceParts(face);
      pushScreenBubble('ASCH', text, voiceEffect);
    } else if (isGood) {
      // 上機嫌時（1〜3回目）：照れ・軟化（機嫌変化なし）
      soundEngine.playTextAdvance();
      setReplayPulse((p) => p + 1);

      let text = 'や、やめろ';
      let face: Partial<FaceParts> = {
        brow: 'sad',
        eyes: 'away',
        mouth: 'frown',
        effects: ['blush'],
      };
      let expr: ExpressionId = 'look_away';

      if (currentCount === 1) {
        text = 'やめろと言ってるだろう・・・・・・！';
        face = {
          brow: 'angry',
          eyes: 'away',
          mouth: 'grit',
          effects: ['blush'],
        };
        expr = 'look_away';
      } else if (currentCount === 2) {
        text = '勝手にしろ。どうせ止めても聞かないんだろう';
        face = {
          brow: 'sad',
          eyes: 'close',
          mouth: 'close',
          effects: ['blush'],
        };
        expr = 'normal';
      }

      setOverrideExpression(expr);
      setOverrideFaceParts(face);
      pushScreenBubble('ASCH', text, 'normal');
    } else {
      // 通常時（1〜3回目）：困惑・驚き（機嫌変化なし）
      soundEngine.playTextAdvance();
      setReplayPulse((p) => p + 1);

      let text = 'な、何をする。急に触るな';
      let face: Partial<FaceParts> = {
        brow: 'doubt',
        eyes: 'wide',
        mouth: 'gasp',
        effects: [],
      };
      let expr: ExpressionId = 'shock';

      if (currentCount === 1) {
        text = 'おい、さっきから何のつもりだ。髪を撫でて何が楽しい';
        face = {
          brow: 'doubt',
          eyes: 'down',
          mouth: 'frown',
          effects: [],
        };
        expr = 'normal';
      } else if (currentCount === 2) {
        text = 'っ・・・・・・おまえは昔から人の頭を勝手にいじる癖があったな';
        face = {
          brow: 'sad',
          eyes: 'close',
          mouth: 'close',
          effects: [],
        };
        expr = 'normal';
      }

      setOverrideExpression(expr);
      setOverrideFaceParts(face);
      pushScreenBubble('ASCH', text, 'normal');
    }
  };

  // === フェーズ1終了時：『手元の端末の画面を本人に見せる』（ロック解除時のみ出現） ===
  const handleShowTerminalToAschPhase1 = () => {
    if (isTerminalOpen || isDialogueLogOpen || isManualOpen || isSequencing) {
      return;
    }
    soundEngine.unlockOnUserInteraction();
    setIsDecisionMenuOpen(false);
    setPhase1AccuseStep('NONE');
    unlockAchievements('ach_09');

    const steps: QueuedStep[] = [
      {
        delayMs: 240,
        action: () => {
          pushScreenBubble(
            'GUY',
            'これ、おまえを連れ出すときにディストから渡された管理端末なんだよ',
            'normal'
          );
        },
      },
      {
        delayMs: 1100,
        action: () => {
          pushScreenBubble(
            'GUY',
            'おまえが動揺した波形も、内部の記録も全部ここに映ってるぞ',
            'normal'
          );
        },
      },
      {
        delayMs: 1250,
        action: () => {
          setOverrideExpression('shock');
          setOverrideFaceParts({
            brow: 'angry',
            eyes: 'wide',
            mouth: 'shout',
            effects: ['blush', 'sweat'],
          });
          setMood(-2);
          pushScreenBubble('ASCH', '・・・・・・っ！？', 'shout');
        },
      },
      {
        delayMs: 1100,
        action: () => {
          setOverrideExpression('glare');
          setOverrideFaceParts({
            brow: 'angry',
            eyes: 'glare',
            mouth: 'shout',
            effects: ['sweat'],
          });
          pushScreenBubble(
            'ASCH',
            'ディストの奴、そんなものまでおまえに渡しやがったのか・・・・・・！',
            'shout'
          );
        },
      },
      {
        delayMs: 1250,
        action: () => {
          pushScreenBubble(
            'GUY',
            'おまえがいくら他人のフリをしても、この記録までは誤魔化せない',
            'normal'
          );
        },
      },
      {
        delayMs: 1100,
        action: () => {
          pushScreenBubble('GUY', '・・・・・・アッシュ、観念しろよ', 'normal');
        },
      },
      {
        delayMs: 1250,
        action: () => {
          setOverrideExpression('look_away');
          setOverrideFaceParts({
            brow: 'sad',
            eyes: 'away',
            mouth: 'frown',
            effects: ['shadow'],
          });
          updateMood(2);
          setTrustLevel((prev) => prev + 2);
          setLinkTags((prev) =>
            Array.from(new Set([...prev, 'phase2_started', 'terminal_revealed']))
          );
          setPreviewPage(0);
          const stamp = nextOrderStamp();
          if (
            !readSectorIds.includes('SEC-01') ||
            !readSectorIds.includes('SEC-02')
          ) {
            setHasUnreadSector(true);
          }
          setSectors((prev) =>
            prev.map((s) =>
              s.id === 'SEC-01' || s.id === 'SEC-02'
                ? {
                    ...s,
                    discovered: true,
                    discoveredAt: s.discoveredAt ?? stamp,
                    unlocked: true,
                    unlockedAt: s.unlockedAt ?? stamp,
                    unlockedMethod: s.unlockedMethod ?? 'DIALOGUE',
                  }
                : s
            )
          );
          appendLog(
            'INFO',
            'PHASE 2 TRANSITION // CAMOUFLAGE MODE ABORTED'
          );
          pushScreenBubble('ASCH', '・・・・・・チッ・・・・・・', 'normal');
        },
      },
    ];

    enqueueSequence(steps);
  };

  const buildPhase1ReasonChoices = useCallback(
    (topicId: string) => {
      const ALL_CANDIDATES: {
        id:
          | 'REWRITE'
          | 'PRE_FACE'
          | 'CALL_NAME'
          | 'BLUFF_TONE'
          | 'BLUFF_DELAY'
          | 'BLUFF_MANNER';
        label: string;
      }[] = [
        { id: 'REWRITE', label: 'うっかり口を滑らせて言い直した' },
        { id: 'PRE_FACE', label: '答える前に、一瞬だけ顔色が変わった' },
        { id: 'CALL_NAME', label: '思わず『ガイ』と俺の名前を呼んだ' },
        { id: 'BLUFF_TONE', label: '声が明らかに上ずっていた' },
        { id: 'BLUFF_DELAY', label: 'やけに早口で言い返した' },
        {
          id: 'BLUFF_MANNER',
          label: 'タルロウにしては口調が違いすぎる',
        },
      ];

      const shuffle = <T,>(arr: T[]): T[] => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      };

      const occurred = phase1OccurredSlips.find((s) => s.topicId === topicId);

      const correctId: 'REWRITE' | 'PRE_FACE' | 'CALL_NAME' =
        topicId === 'p1_touch_shoulder'
          ? 'CALL_NAME'
          : occurred?.variant.type === 'REWRITE'
            ? 'REWRITE'
            : 'PRE_FACE';

      // アイデアB（排他制御）：
      // 正解（REWRITE / PRE_FACE / CALL_NAME）に対し、紛らわしい他の核心選択肢（言い直しvs顔色の競合など）を完全排除
      // 常に「正解1個 ＋ シリアスなブラフ2個（声の上ずり／早口／口調の違い）」の合計3個に厳選して表示
      const bluffCandidates = ALL_CANDIDATES.filter(
        (c) =>
          c.id === 'BLUFF_TONE' ||
          c.id === 'BLUFF_DELAY' ||
          c.id === 'BLUFF_MANNER'
      );
      const pickedBluffs = shuffle(bluffCandidates).slice(0, 2);
      const correctCandidate = ALL_CANDIDATES.find((c) => c.id === correctId);

      const selectedCandidates = correctCandidate
        ? [correctCandidate, ...pickedBluffs]
        : pickedBluffs;

      return shuffle(
        selectedCandidates.map((c) => ({
          ...c,
          isCorrect: c.id === correctId,
        }))
      );
    },
    [phase1OccurredSlips]
  );

  // === フェーズ1終了時：「いつ」「どのように変だったか」の指摘判定 ===
  const handleExecutePhase1Accusation = (
    topicId: string,
    selectedChoice: {
      id:
        | 'REWRITE'
        | 'PRE_FACE'
        | 'CALL_NAME'
        | 'BLUFF_TONE'
        | 'BLUFF_DELAY'
        | 'BLUFF_MANNER';
      label: string;
      isCorrect: boolean;
    }
  ) => {
    if (isTerminalOpen || isDialogueLogOpen || isManualOpen || isSequencing) {
      return;
    }
    soundEngine.unlockOnUserInteraction();
    setIsDecisionMenuOpen(false);
    setPhase1AccuseStep('NONE');

    const matchedSlip = selectedChoice.isCorrect
      ? phase1OccurredSlips.find((s) => s.topicId === topicId)
      : undefined;

    if (matchedSlip) {
      if (phase1QuestionsCount <= 3) {
        unlockAchievements('ach_07');
      }
      // 【正解】：実際にボロが出ていた話題＆正しいボロの種別を指摘できた場合 → アッシュが観念してフェーズ2へ移行
      const guyLines = matchedSlip.variant.guyPointOutSpoken
        .split('\n')
        .filter(Boolean);

      const steps: QueuedStep[] = [];
      guyLines.forEach((line, idx) => {
        steps.push({
          delayMs: idx === 0 ? 240 : 920,
          action: () => {
            pushScreenBubble('GUY', line, 'normal');
          },
        });
      });

      steps.push({
        delayMs: 1150,
        action: () => {
          setOverrideExpression('shock');
          setOverrideFaceParts({
            brow: 'sad',
            eyes: 'wide',
            mouth: 'gasp',
            effects: ['sweat'],
          });
          setMood(-1);
          pushScreenBubble('ASCH', '・・・・・・っ！', 'shout');
        },
      });

      steps.push({
        delayMs: 1050,
        action: () => {
          pushScreenBubble(
            'GUY',
            '・・・・・・もうシラを切るなよ。やっぱりおまえ、アッシュじゃないか。',
            'normal'
          );
        },
      });

      steps.push({
        delayMs: 1150,
        action: () => {
          setOverrideExpression('look_away');
          setOverrideFaceParts({
            brow: 'sad',
            eyes: 'away',
            mouth: 'frown',
            effects: ['shadow'],
          });
          updateMood(2);
          setTrustLevel((prev) => prev + 2);
          setLinkTags((prev) =>
            Array.from(new Set([...prev, 'phase2_started']))
          );
          setPreviewPage(0);
          const stamp = nextOrderStamp();
          if (
            !readSectorIds.includes('SEC-01') ||
            !readSectorIds.includes('SEC-02')
          ) {
            setHasUnreadSector(true);
          }
          setSectors((prev) =>
            prev.map((s) =>
              s.id === 'SEC-01' || s.id === 'SEC-02'
                ? {
                    ...s,
                    discovered: true,
                    discoveredAt: s.discoveredAt ?? stamp,
                    unlocked: true,
                    unlockedAt: s.unlockedAt ?? stamp,
                    unlockedMethod: s.unlockedMethod ?? 'DIALOGUE',
                  }
                : s
            )
          );
          appendLog(
            'INFO',
            'PHASE 2 TRANSITION // CAMOUFLAGE MODE ABORTED'
          );
          pushScreenBubble(
            'ASCH',
            '・・・・・・ただの譜業のフリをしてやり過ごすつもりだったんだがな',
            'normal'
          );
        },
      });

      steps.push({
        delayMs: 480,
        action: () => {},
      });

      enqueueSequence(steps);
    } else {
      unlockAchievements('ach_08');
      soundEngine.stopBgm();
      soundEngine.setPlayingPhase(false);
      // 【不正解】：ボロが出ていなかった話題、または的外れな理由を指摘した場合 → あしらわれてタルロウA確定EDへ
      const guySpoken =
        selectedChoice.id === 'REWRITE'
          ? 'おまえ、さっき途中で言葉を言い直したよな？　本当は『タルロウA』なんかじゃないんだろ'
          : selectedChoice.id === 'PRE_FACE'
            ? 'おまえ、さっき一瞬顔色が変わったよな？　本当は『タルロウA』なんかじゃないんだろ'
            : selectedChoice.id === 'CALL_NAME'
              ? 'おまえ、さっき『ガイ』って俺の名前を呼んだよな？　本当は『タルロウA』なんかじゃないんだろ'
              : selectedChoice.id === 'BLUFF_TONE'
                ? 'おまえ、さっき声が上ずってたぞ。本当は『タルロウA』なんかじゃないんだろ'
                : selectedChoice.id === 'BLUFF_DELAY'
                  ? 'おまえ、さっきやけに早口で言い返したぞ。本当は『タルロウA』なんかじゃないんだろ'
                  : 'おまえ、タルロウにしては口調が違いすぎるぞ。本当は『タルロウA』なんかじゃないんだろ';

      const aschRefute =
        '言いがかりだな。俺は最初から事実しか言っていない。\n疑う根拠がないなら、さっさと研究所へ戻せ';

      const steps: QueuedStep[] = [
        {
          delayMs: 240,
          action: () => {
            pushScreenBubble('GUY', guySpoken, 'normal');
          },
        },
        {
          delayMs: 1100,
          action: () => {
            setOverrideExpression('normal');
            setOverrideFaceParts({
              brow: 'doubt',
              eyes: 'close',
              mouth: 'close',
              effects: [],
            });
            appendLog(
              'INFO',
              'VERIFICATION FAILED // INSUFFICIENT EVIDENCE'
            );
            pushScreenBubble(
              'ASCH',
              aschRefute.split('\n')[0],
              'normal'
            );
          },
        },
        {
          delayMs: 950,
          action: () => {
            setOverrideFaceParts({
              brow: 'normal',
              eyes: 'glare',
              mouth: 'close',
              effects: [],
            });
            pushScreenBubble(
              'ASCH',
              aschRefute.split('\n')[1],
              'normal'
            );
          },
        },
        {
          delayMs: 1350,
          action: () => {
            setEndingDisposition('RETURN');
            setStats((prev) => ({
              ...prev,
              endTime: Date.now(),
            }));
            setEndingStep(0);
            setGamePhase('ENDING');
          },
        },
      ];

      enqueueSequence(steps);
    }
  };

  // === アッシュからの逆質問に対するガイの返答処理 ===
  const handleSelectAschQuestionReply = (option: AschQuestionReplyOption) => {
    if (
      !activeAschQuestion ||
      isTerminalOpen ||
      isDialogueLogOpen ||
      isManualOpen ||
      isSequencing
    ) {
      return;
    }

    soundEngine.unlockOnUserInteraction();
    const questionId = activeAschQuestion.id;

    const responseTimeMs = Math.max(0, Date.now() - choiceShownAtRef.current);
    const isQuick = responseTimeMs <= 2000;
    const isLongThink = responseTimeMs >= 8000;
    const pageLoopHesitation = cycledPagesInTurnRef.current;
    cycledPagesInTurnRef.current = 0;
    const nextTotalTurns = stats.totalTurns + 1;
    totalTurnsRef.current = nextTotalTurns;

    setStats((prev) => ({
      ...prev,
      totalTurns: prev.totalTurns + 1,
      totalResponseTimeMs: prev.totalResponseTimeMs + responseTimeMs,
      quickReplyCount: prev.quickReplyCount + (isQuick ? 1 : 0),
      choiceHoverSwitchCount:
        prev.choiceHoverSwitchCount +
        (isLongThink ? 1 : 0) +
        pageLoopHesitation,
    }));

    idleStageRef.current = 0;
    lastHoveredChoiceIdRef.current = null;

    const guyLines = option.spokenText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const steps: QueuedStep[] = [];

    guyLines.forEach((line, idx) => {
      const delay =
        idx === 0
          ? 240
          : Math.min(1300, Math.max(780, guyLines[idx - 1].length * 34));
      steps.push({
        delayMs: delay,
        action: () => {
          if (idx === 0) {
            setActiveAschQuestion(null);
            setAnsweredQuestionIds((prev) => [...prev, questionId]);
          }
          pushScreenBubble('GUY', line, 'normal');
        },
      });
    });

    const lastGuyLineLen =
      guyLines.length > 0 ? guyLines[guyLines.length - 1].length : 6;

    const aschLines = option.aschText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const pauseBeforeAsch =
      Math.min(1350, Math.max(820, lastGuyLineLen * 30)) + 260;

    const questionTameDurationMs = getPreSpeechTameDurationMs(
      option.expression,
      option.faceParts
    );
    if (aschLines.length > 0) {
      const preFacePartsForQuestion = buildPreSpeechFaceParts(
        option.expression,
        option.faceParts
      );
      const delayToQuestionPreFace = Math.max(
        440,
        pauseBeforeAsch - Math.round(questionTameDurationMs * 0.65)
      );
      steps.push({
        delayMs: delayToQuestionPreFace,
        action: () => {
          setOverrideExpression(option.expression);
          setOverrideFaceParts(preFacePartsForQuestion);
        },
      });
    }

    aschLines.forEach((line, idx) => {
      const delay =
        idx === 0
          ? questionTameDurationMs
          : Math.min(1450, Math.max(860, aschLines[idx - 1].length * 38));
      const baseEffect: BubbleVoiceEffect =
        option.voiceEffects?.[idx] ?? option.voiceEffects?.[0] ?? 'normal';
      const lineEffect = resolveVoiceEffectWithGlitch(
        baseEffect,
        0,
        false
      );

      steps.push({
        delayMs: delay,
        action: () => {
          if (idx > 0) {
            const nextSecondFace =
              option.secondFaceParts ??
              deriveAutomaticSecondFaceParts(
                option.expression,
                option.faceParts,
                aschLines[0],
                line
              );
            if (option.secondExpression) {
              setOverrideExpression(option.secondExpression);
            }
            if (nextSecondFace) {
              setOverrideFaceParts(nextSecondFace);
            }
          }
          if (idx === 0) {
            setOverrideExpression(option.expression);
            setOverrideFaceParts(option.faceParts ?? null);

            if (option.moodDelta !== undefined) {
              updateMood(option.moodDelta);
            }
            if (option.guyMoodDelta !== undefined) {
              updateGuyMood(option.guyMoodDelta);
            }
            if (option.trustDelta) {
              setTrustLevel((prev) => prev + option.trustDelta!);
            }
            if (option.hatredDelta) {
              setHatredPoints((prev) => {
                const nextH = prev + option.hatredDelta!;
                if (prev < 2 && nextH >= 2) {
                  setLinkTags((tags) =>
                    Array.from(new Set([...tags, 'tag_hatred_locked']))
                  );
                  appendLog(
                    'WARNING',
                    'INTERACTION MODE LOCKED // HOSTILE THRESHOLD EXCEEDED'
                  );
                }
                return nextH;
              });
            }
            if (option.grantsLinkTags) {
              setLinkTags((prev) =>
                Array.from(new Set([...prev, ...option.grantsLinkTags!]))
              );
              if (option.grantsLinkTags.includes('phase2_started')) {
                setPreviewPage(0);
                if (option.grantsLinkTags.includes('terminal_revealed')) {
                  setTopicAskCounts((prev) => ({
                    ...prev,
                    p2_show_terminal: 1,
                  }));
                }
                const stamp = nextOrderStamp();
                if (
                  !readSectorIds.includes('SEC-01') ||
                  !readSectorIds.includes('SEC-02')
                ) {
                  setHasUnreadSector(true);
                }
                setSectors((prev) =>
                  prev.map((s) =>
                    s.id === 'SEC-01' || s.id === 'SEC-02'
                      ? {
                          ...s,
                          discovered: true,
                          discoveredAt: s.discoveredAt ?? stamp,
                          unlocked: true,
                          unlockedAt: s.unlockedAt ?? stamp,
                          unlockedMethod: s.unlockedMethod ?? 'DIALOGUE',
                        }
                      : s
                  )
                );
              }
            }
            if (option.oralInfo) {
              addOralInfo(option.oralInfo);
            }
            if (option.systemLog) {
              appendLog('INFO', option.systemLog);
            }
            if (option.naturalUnlockSectorId) {
              const stamp = nextOrderStamp();
              if (!readSectorIds.includes(option.naturalUnlockSectorId)) {
                setHasUnreadSector(true);
              }
              setSectors((prev) =>
                prev.map((s) =>
                  s.id === option.naturalUnlockSectorId
                    ? {
                        ...s,
                        discovered: true,
                        discoveredAt: s.discoveredAt ?? stamp,
                        unlocked: true,
                        unlockedAt: stamp,
                        unlockedMethod: s.unlockedMethod ?? 'DIALOGUE',
                      }
                    : s
                )
              );
            }
          }
          if (idx === aschLines.length - 1 && option.capturedProtect) {
            const cap = option.capturedProtect;
            const stamp = nextOrderStamp();
            const targetSec = sectors.find((s) => s.id === cap.sectorId);
            if (targetSec && !targetSec.unlocked) {
              if (!targetSec.discovered) {
                soundEngine.playProtectCaptured();
                setHasUnreadSector(true);
              }
              setSectors((prev) =>
                prev.map((s) =>
                  s.id === cap.sectorId && !s.unlocked
                    ? {
                        ...s,
                        discovered: true,
                        discoveredAt: s.discoveredAt ?? stamp,
                        capturedQuote: cap.capturedQuote,
                        capturedContext: cap.capturedContext,
                      }
                    : s
                )
              );
            }
          }
          pushScreenBubble('ASCH', line, lineEffect);
        },
      });
    });

    steps.push({
      delayMs: 480,
      action: () => {
        if (
          linkTags.includes('phase2_started') &&
          (option.moodDelta ?? 0) < 0 &&
          moodRef.current < 0
        ) {
          if (!moodWarningGivenRef.current) {
            moodWarningGivenRef.current = true;
            appendLog(
              'WARNING',
              'WARNING: EMOTIONAL WAVEFORM CRITICAL // SESSION ABORT IMMINENT'
            );
            playAschReactionLines(
              '・・・・・・いい加減にしろ。これ以上鬱陶しい真似を続けるなら、俺は今すぐ研究所へ戻るからな！',
              'glare',
              {
                brow: 'angry',
                eyes: 'glare',
                mouth: 'grit',
                effects: ['sweat'],
              },
              ['shout'],
              320
            );
          } else {
            triggerMoodLimitDeparture();
            return;
          }
        }
        if (moodRef.current < 0 && linkTags.includes('phase2_started')) {
          resetAngryGlanceSchedule();
        }
      },
    });

    enqueueSequence(steps);
  };

  // === 機嫌ライフ限界（2回目の危険域到達）による対話打ち切り・帰還処理 ===
  const triggerMoodLimitDeparture = () => {
    soundEngine.stopBgm();
    soundEngine.setPlayingPhase(false);
    setActiveTopicReply(null);
    setActiveAschQuestion(null);
    setIsDecisionMenuOpen(false);

    appendLog(
      'WARNING',
      'SESSION ABORTED // TARGET UNIT RETURNED TO LAB'
    );
    const leaveSteps: QueuedStep[] = [
      {
        delayMs: 360,
        action: () => {
          setOverrideExpression('glare');
          setOverrideFaceParts({
            brow: 'angry',
            eyes: 'glare',
            mouth: 'shout',
            effects: ['blush'],
          });
          pushScreenBubble(
            'ASCH',
            '・・・・・・言ったはずだ、これ以上鬱陶しい真似をするなら帰るとな！',
            'shout'
          );
        },
      },
      {
        delayMs: 1100,
        action: () => {
          setOverrideExpression('look_away');
          setOverrideFaceParts({
            brow: 'angry',
            eyes: 'away',
            mouth: 'frown',
            effects: [],
          });
          pushScreenBubble(
            'ASCH',
            'もう話は終わりだ。俺はディストの研究所へ戻る！',
            'normal'
          );
        },
      },
      {
        delayMs: 700,
        action: () => {
          setIsAschExited(true);
          setVisibleBubbles([]);
          soundEngine.playFootsteps('fast', 4);
        },
        isBubble: false,
      },
      {
        delayMs: 4 * 210 + 2600,
        action: () => {
          setCustomEndingKey('END_PHASE2_INCOMPLETE');
          setStats((prev) => ({
            ...prev,
            endTime: Date.now(),
          }));
          setEndingStep(0);
          setGamePhase('ENDING');
        },
        isBubble: false,
      },
    ];
    enqueueSequence(leaveSteps);
  };

  // === 話題内の複数リアクション選択肢（replyOptions）に対するガイの返答処理 ===
  const handleSelectTopicReplyOption = (option: AschQuestionReplyOption) => {
    if (
      !activeTopicReply ||
      isTerminalOpen ||
      isDialogueLogOpen ||
      isManualOpen ||
      isSequencing
    ) {
      return;
    }

    soundEngine.unlockOnUserInteraction();
    const currentReplyTopicId = activeTopicReply.topicId;

    // EDイベント突入に伴いBGMを即座に完全停止（keepBgm指定時を除く）
    if (
      (option.triggersEndingKey || option.triggersEnding) &&
      !option.endingTransition?.keepBgm
    ) {
      soundEngine.stopBgm();
      soundEngine.setPlayingPhase(false);
    }

    const responseTimeMs = Math.max(0, Date.now() - choiceShownAtRef.current);
    const isQuick = responseTimeMs <= 2000;
    const isLongThink = responseTimeMs >= 8000;
    const pageLoopHesitation = cycledPagesInTurnRef.current;
    cycledPagesInTurnRef.current = 0;

    setStats((prev) => ({
      ...prev,
      totalTurns: prev.totalTurns + 1,
      totalResponseTimeMs: prev.totalResponseTimeMs + responseTimeMs,
      quickReplyCount: prev.quickReplyCount + (isQuick ? 1 : 0),
      choiceHoverSwitchCount:
        prev.choiceHoverSwitchCount +
        (isLongThink ? 1 : 0) +
        pageLoopHesitation,
    }));

    idleStageRef.current = 0;
    setIdleWaitSec(0);
    lastHoveredChoiceIdRef.current = null;

    const guyLines = option.spokenText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const steps: QueuedStep[] = [];

    guyLines.forEach((line, idx) => {
      const delay =
        idx === 0
          ? 260
          : calculateLineDelayMs(guyLines[idx - 1]);
      steps.push({
        delayMs: delay,
        action: () => {
          if (idx === 0) {
            setActiveTopicReply(null);
          }
          pushScreenBubble('GUY', line, 'normal');
        },
        isBubble: true,
      });
    });

    const lastGuyLineText =
      guyLines.length > 0 ? guyLines[guyLines.length - 1] : '';

    const aschLines = option.aschText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const isEndingOption = Boolean(
      option.triggersEndingKey || option.triggersEnding || option.endingTransition
    );

    const pauseBeforeAsch = isEndingOption
      ? (option.waitMs ?? 1200)
      : calculateLineDelayMs(lastGuyLineText, {
          isSpeakerChange: true,
        });

    const replyTameDurationMs = getPreSpeechTameDurationMs(
      option.expression,
      option.faceParts
    );
    if (aschLines.length > 0) {
      const preFacePartsForReply = buildPreSpeechFaceParts(
        option.expression,
        option.faceParts
      );
      const delayToReplyPreFace = Math.max(
        440,
        pauseBeforeAsch - Math.round(replyTameDurationMs * 0.65)
      );
      steps.push({
        delayMs: delayToReplyPreFace,
        action: () => {
          setOverrideExpression(option.expression);
          setOverrideFaceParts(preFacePartsForReply);
        },
        isBubble: false,
      });
    }

    aschLines.forEach((line, idx) => {
      const delay =
        idx === 0
          ? replyTameDurationMs
          : isEndingOption
          ? Math.max(1400, calculateLineDelayMs(aschLines[idx - 1]))
          : calculateLineDelayMs(aschLines[idx - 1]);
      const baseEffect: BubbleVoiceEffect =
        option.voiceEffects?.[idx] ?? option.voiceEffects?.[0] ?? 'normal';
      const lineEffect = resolveVoiceEffectWithGlitch(baseEffect, 0, false);

      steps.push({
        delayMs: delay,
        action: () => {
          if (idx > 0) {
            const nextSecondFace =
              option.secondFaceParts ??
              deriveAutomaticSecondFaceParts(
                option.expression,
                option.faceParts,
                aschLines[0],
                line
              );
            if (option.secondExpression) {
              setOverrideExpression(option.secondExpression);
            }
            if (nextSecondFace) {
              setOverrideFaceParts(nextSecondFace);
            }
          }
          if (
            idx === aschLines.length - 1 &&
            option.specialEffect === 'destroy'
          ) {
            window.setTimeout(() => {
              soundEngine.playMechanicalDestroy();
              setEyeGlitchPulse(Date.now());
              setOverrideExpression('shock');
              setOverrideFaceParts({
                brow: 'angry',
                eyes: 'wide',
                mouth: 'shout',
                effects: ['shadow'],
              });
            }, 850);
          }
          if (idx === 0) {
            setOverrideExpression(option.expression);
            setOverrideFaceParts(option.faceParts ?? null);

            if (option.moodDelta !== undefined) {
              updateMood(option.moodDelta);
            }
            if (option.guyMoodDelta !== undefined) {
              updateGuyMood(option.guyMoodDelta);
            }
            if (option.trustDelta) {
              setTrustLevel((prev) => prev + option.trustDelta!);
            }
            if (option.hatredDelta) {
              setHatredPoints((prev) => {
                const nextH = prev + option.hatredDelta!;
                if (prev < 2 && nextH >= 2) {
                  setLinkTags((tags) =>
                    Array.from(new Set([...tags, 'tag_hatred_locked']))
                  );
                  appendLog(
                    'WARNING',
                    'INTERACTION MODE LOCKED // HOSTILE THRESHOLD EXCEEDED'
                  );
                }
                return nextH;
              });
            }
            if (option.grantsLinkTags) {
              setLinkTags((prev) =>
                Array.from(new Set([...prev, ...option.grantsLinkTags!]))
              );
            }
            if (option.oralInfo) {
              addOralInfo(option.oralInfo);
            }
            if (option.systemLog) {
              appendLog('INFO', option.systemLog);
            }
            if (option.naturalUnlockSectorId) {
              const stamp = nextOrderStamp();
              if (!readSectorIds.includes(option.naturalUnlockSectorId)) {
                setHasUnreadSector(true);
              }
              setSectors((prev) =>
                prev.map((s) =>
                  s.id === option.naturalUnlockSectorId
                    ? {
                        ...s,
                        discovered: true,
                        discoveredAt: s.discoveredAt ?? stamp,
                        unlocked: true,
                        unlockedAt: stamp,
                        unlockedMethod: s.unlockedMethod ?? 'DIALOGUE',
                      }
                    : s
                )
              );
            }
          }

          if (
            idx === aschLines.length - 1 &&
            !(option.extraExchanges && option.extraExchanges.length > 0)
          ) {
            const triggers = [
              ...(option.capturedProtect ? [option.capturedProtect] : []),
              ...(option.capturedProtects ?? []),
            ];
            if (triggers.length > 0) {
              const stamp = nextOrderStamp();
              const hasNew = triggers.some((cap) => {
                const targetSec = sectors.find((s) => s.id === cap.sectorId);
                return targetSec && !targetSec.discovered && !targetSec.unlocked;
              });
              if (hasNew) {
                soundEngine.playProtectCaptured();
                setHasUnreadSector(true);
              }
              setSectors((prev) =>
                prev.map((s) => {
                  const matched = triggers.find(
                    (cap) => cap.sectorId === s.id
                  );
                  if (matched && !s.unlocked) {
                    return {
                      ...s,
                      discovered: true,
                      discoveredAt: s.discoveredAt ?? stamp,
                      capturedQuote: matched.capturedQuote,
                      capturedContext: matched.capturedContext,
                    };
                  }
                  return s;
                })
              );
            }

            if (option.followUpOptions && option.followUpOptions.length > 0) {
              setPreviewPage(0);
              setActiveTopicReply({
                topicId: currentReplyTopicId,
                options: option.followUpOptions,
              });
            } else {
              const targetTopic = CONVERSATION_TOPICS.find(
                (t) => t.id === currentReplyTopicId
              );
              if (targetTopic) {
                const currentCount = topicAskCounts[currentReplyTopicId] ?? 0;
                if (option.resetsTopicProgress) {
                  setTopicAskCounts((prev) => ({
                    ...prev,
                    [currentReplyTopicId]: 0,
                  }));
                  setLinkTags((prev) =>
                    Array.from(
                      new Set([...prev, `backed_off_${currentReplyTopicId}`])
                    )
                  );
                } else if (
                  option.completesTopic &&
                  currentCount < targetTopic.stages.length
                ) {
                  setTopicAskCounts((prev) => ({
                    ...prev,
                    [currentReplyTopicId]: targetTopic.stages.length,
                  }));
                  setStats((prev) => ({
                    ...prev,
                    completedTopicsCount: prev.completedTopicsCount + 1,
                  }));
                } else if (currentCount >= targetTopic.stages.length) {
                  setStats((prev) => ({
                    ...prev,
                    completedTopicsCount: prev.completedTopicsCount + 1,
                  }));
                }
              }
            }
          }

          pushScreenBubble('ASCH', line, lineEffect);
        },
        isBubble: true,
      });
    });

    let prevWaitMsForEnding: number | undefined = isEndingOption
      ? option.aschWaitMs
      : undefined;

    if (option.extraExchanges && option.extraExchanges.length > 0) {
      let prevSpeaker: 'ASCH' | 'GUY' = aschLines.length > 0 ? 'ASCH' : 'GUY';
      let prevText: string =
        aschLines.length > 0 ? aschLines[aschLines.length - 1] : '';
      let prevWaitMs: number | undefined = isEndingOption
        ? option.aschWaitMs
        : undefined;

      option.extraExchanges.forEach((ex, exIdx) => {
        const isLastExtra = exIdx === option.extraExchanges!.length - 1;
        const exLines = ex.text
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
        exLines.forEach((exLine, lineIdx) => {
          const isVeryLastLine =
            isLastExtra && lineIdx === exLines.length - 1;
          const isSpeakerChange = prevSpeaker !== ex.speaker;
          const delay =
            lineIdx === 0
              ? (isEndingOption ? (prevWaitMs ?? 1200) : calculateLineDelayMs(prevText, { isSpeakerChange }))
              : calculateLineDelayMs(exLines[lineIdx - 1], { isSpeakerChange: false });
          prevSpeaker = ex.speaker;
          prevText = exLine;
          if (lineIdx === exLines.length - 1) {
            prevWaitMs = isEndingOption ? ex.waitMs : undefined;
          }
          if (isVeryLastLine && isEndingOption) {
            prevWaitMsForEnding = ex.waitMs;
          }

          if (
            lineIdx === exLines.length - 1 &&
            ex.silentFaceSequence &&
            ex.silentFaceSequence.length > 0
          ) {
            ex.silentFaceSequence.forEach((s) => {
              steps.push({
                delayMs: s.delayMs,
                action: () => {
                  if (s.expression) setOverrideExpression(s.expression);
                  if (s.faceParts) {
                    setOverrideFaceParts((prev) => ({
                      ...(prev ??
                        DEFAULT_EXPRESSION_PARTS[s.expression ?? activeExpression]),
                      ...s.faceParts,
                    }));
                  }
                },
                isBubble: false,
              });
            });
          }

          steps.push({
            delayMs: delay,
            action: () => {
              if (ex.specialEffect === 'destroy') {
                soundEngine.playMechanicalDestroy();
                setEyeGlitchPulse(Date.now());
              } else if (ex.specialEffect === 'collapse') {
                setEyeGlitchPulse(Date.now());
                window.setTimeout(() => {
                  if (ex.secondExpression) {
                    setOverrideExpression(ex.secondExpression);
                  }
                  if (ex.secondFaceParts) {
                    setOverrideFaceParts(ex.secondFaceParts);
                  } else {
                    setOverrideExpression('pain');
                    setOverrideFaceParts({
                      brow: 'sad',
                      eyes: 'close',
                      mouth: 'close',
                      effects: ['shadow'],
                    });
                  }
                }, 1100);
                window.setTimeout(() => {
                  setIsAschCollapsed(true);
                  soundEngine.playBodyFall();
                }, 1950);
              } else if (ex.specialEffect === 'shout_shock') {
                soundEngine.playHeavyShoutThud();
                setReplayPulse((p) => p + 1);
                setIsScreenShaking(true);
                setTimeout(() => setIsScreenShaking(false), 240);
              }
              if (ex.speaker === 'ASCH') {
                if (lineIdx === 0) {
                  if (ex.expression) {
                    setOverrideExpression(ex.expression);
                  }
                  if (ex.faceParts) {
                    setOverrideFaceParts(ex.faceParts);
                  }
                } else {
                  if (ex.secondExpression) {
                    setOverrideExpression(ex.secondExpression);
                  } else if (ex.expression) {
                    setOverrideExpression(ex.expression);
                  }
                  if (ex.secondFaceParts) {
                    setOverrideFaceParts(ex.secondFaceParts);
                  } else if (ex.faceParts) {
                    setOverrideFaceParts(ex.faceParts);
                  }
                }
              }
              if (isVeryLastLine) {
                if (option.followUpOptions && option.followUpOptions.length > 0) {
                  setPreviewPage(0);
                  setActiveTopicReply({
                    topicId: currentReplyTopicId,
                    options: option.followUpOptions,
                  });
                } else {
                  const targetTopic = CONVERSATION_TOPICS.find(
                    (t) => t.id === currentReplyTopicId
                  );
                  if (targetTopic && option.completesTopic) {
                    setTopicAskCounts((prev) => ({
                      ...prev,
                      [currentReplyTopicId]: targetTopic.stages.length,
                    }));
                  }
                }
              }
              pushScreenBubble(
                ex.speaker,
                exLine,
                ex.voiceEffect ?? 'normal'
              );
            },
            isBubble: true,
          });
        });
      });
    }

    if (
      option.endingTransition &&
      (option.triggersEndingKey || option.triggersEnding)
    ) {
      const trans = option.endingTransition;
      const waitBefore =
        prevWaitMsForEnding !== undefined
          ? prevWaitMsForEnding
          : (trans.waitBeforeExitMs ?? 800);
      const stepInterval =
        trans.footsteps === 'slow' ? 440 : trans.footsteps === 'fast' ? 240 : 360;
      const count = trans.footstepsCount ?? 3;
      const footstepsTotalMs = count * stepInterval;

      // 1. セリフ表示後の余韻を経て、アッシュ退場（フェードアウト）と足音開始
      steps.push({
        delayMs: waitBefore,
        action: () => {
          if (trans.aschAction === 'fade_out') {
            setIsAschExited(true);
            setVisibleBubbles([]);
          } else if (trans.aschAction === 'collapse') {
            setIsAschCollapsed(true);
          }
          if (trans.footsteps) {
            soundEngine.playFootsteps(trans.footsteps, count);
          }
        },
        isBubble: false,
      });

      if (trans.doorAction && trans.doorAction !== 'none') {
        // ドア開
        steps.push({
          delayMs: footstepsTotalMs + 200,
          action: () => {
            soundEngine.playDoorOpen();
          },
          isBubble: false,
        });

        // ドア閉
        steps.push({
          delayMs: 700,
          action: () => {
            soundEngine.playDoorClose(
              trans.doorAction === 'slam' ? 'slam' : 'soft'
            );
          },
          isBubble: false,
        });

        // 閉扉後の余韻（間）を経てエンディング画面へ
        steps.push({
          delayMs: Math.max(2600, (trans.waitAfterDoorMs ?? 1000) + 1600),
          action: () => {
            if (option.triggersEndingKey) {
              setCustomEndingKey(option.triggersEndingKey);
            } else if (option.triggersEnding) {
              setCustomEndingKey(null);
              setEndingDisposition(option.triggersEnding);
            }
            setStats((prev) => ({
              ...prev,
              endTime: Date.now(),
            }));
            setEndingStep(0);
            soundEngine.stopBgm();
            soundEngine.setPlayingPhase(false);
            setGamePhase('ENDING');
          },
          isTerminal: true,
        });
      } else {
        // ドア音なし：足音終了後に静寂余韻（間）を経てエンディング画面へ
        steps.push({
          delayMs: footstepsTotalMs + Math.max(2600, (trans.waitAfterDoorMs ?? 1200) + 1400),
          action: () => {
            if (option.triggersEndingKey) {
              setCustomEndingKey(option.triggersEndingKey);
            } else if (option.triggersEnding) {
              setCustomEndingKey(null);
              setEndingDisposition(option.triggersEnding);
            }
            setStats((prev) => ({
              ...prev,
              endTime: Date.now(),
            }));
            setEndingStep(0);
            soundEngine.stopBgm();
            soundEngine.setPlayingPhase(false);
            setGamePhase('ENDING');
          },
          isTerminal: true,
        });
      }
    } else {
      steps.push({
        delayMs:
          option.triggersEnding || option.triggersEndingKey ? 2600 : 480,
        action: () => {
          if (option.triggersEndingKey) {
            setCustomEndingKey(option.triggersEndingKey);
            setStats((prev) => ({
              ...prev,
              endTime: Date.now(),
            }));
            setEndingStep(0);
            soundEngine.stopBgm();
            soundEngine.setPlayingPhase(false);
            setGamePhase('ENDING');
          } else if (option.triggersEnding) {
            setCustomEndingKey(null);
            setEndingDisposition(option.triggersEnding);
            setStats((prev) => ({
              ...prev,
              endTime: Date.now(),
            }));
            setEndingStep(0);
            soundEngine.stopBgm();
            soundEngine.setPlayingPhase(false);
            setGamePhase('ENDING');
          } else if (
            linkTags.includes('phase2_started') &&
            currentReplyTopicId !== 'p2_deep_truth_dilemma' &&
            !currentReplyTopicId.startsWith('p3_') &&
            !(option.followUpOptions && option.followUpOptions.length > 0) &&
            (option.moodDelta ?? 0) < 0 &&
            moodRef.current < 0
          ) {
            if (!moodWarningGivenRef.current) {
              moodWarningGivenRef.current = true;
              appendLog(
                'WARNING',
                'WARNING: EMOTIONAL WAVEFORM CRITICAL // SESSION ABORT IMMINENT'
              );
              playAschReactionLines(
                '・・・・・・いい加減にしろ。これ以上鬱陶しい真似を続けるなら、俺は今すぐ研究所へ戻るからな！',
                'glare',
                {
                  brow: 'angry',
                  eyes: 'glare',
                  mouth: 'grit',
                  effects: ['sweat'],
                },
                ['shout'],
                320
              );
            } else {
              triggerMoodLimitDeparture();
              return;
            }
          }
          if (
            moodRef.current < 0 &&
            linkTags.includes('phase2_started') &&
            !(option.followUpOptions && option.followUpOptions.length > 0)
          ) {
            resetAngryGlanceSchedule();
            setOverrideExpression('glare');
            setOverrideFaceParts({
              brow: 'angry',
              eyes: 'away',
              mouth: 'frown',
              effects: [],
            });
          }
        },
      });
    }

    enqueueSequence(steps);
  };

  // === プロテクト解除（サイレント解除：アッシュへの反動や即座の激昂はなく、INFOへ記録が展開される） ===
  const handleOverrideSector = (sectorId: string) => {
    const target = sectors.find((s) => s.id === sectorId);
    if (!target || target.unlocked) return;

    soundEngine.playOverrideExecute();
    terminalActionTakenRef.current = true;

    const stamp = nextOrderStamp();

    setSectors((prev) =>
      prev.map((s) => {
        if (s.id === sectorId) {
          return {
            ...s,
            unlocked: true,
            unlockedAt: stamp,
            unlockedMethod: 'OVERRIDE',
          };
        }
        return s;
      })
    );

    setStats((prev) => ({ ...prev, overrideCount: prev.overrideCount + 1 }));

    appendLog(
      'INFO',
      `[${target.code}] PROTECT OVERRIDE // SILENT UNLOCK EXECUTED`
    );

    if (target.paradoxWarning) {
      appendLog('PARADOX', target.paradoxWarning);
    }

    if (
      sectorId === 'SEC-01' ||
      sectorId === 'SEC-02' ||
      sectorId === 'SEC-03'
    ) {
      phase1OccurredSlips.forEach((slip) => {
        addOralInfo({
          id: `oral-p1-slip-${slip.topicId}`,
          category: '情動反応',
          title: `応答波形ログ（${slip.shortLabel}）`,
          content: slip.variant.terminalRecordSummary,
        });
      });
    }

    if (sectorId === 'SEC-08') {
      setLinkTags((prev) =>
        Array.from(new Set([...prev, 'talked_sword_limiter', 'hint_sleep_dreams']))
      );
    } else if (sectorId === 'SEC-10' || sectorId === 'SEC-11') {
      setLinkTags((prev) =>
        Array.from(new Set([...prev, 'talked_clothes', 'hint_manor_parents']))
      );
    } else if (sectorId === 'SEC-12') {
      setLinkTags((prev) =>
        Array.from(new Set([...prev, 'p2_heard_true_reason']))
      );
    } else if (sectorId === 'SEC-19') {
      const isSec20AlreadyUnlocked = sectors.some(
        (s) => s.id === 'SEC-20' && s.unlocked
      );
      setPreviewTab('端末');
      setPreviewPage(0);
      if (isSec20AlreadyUnlocked) {
        pendingClimaxDilemmaRef.current = true;
      }
      setLinkTags((prev) =>
        Array.from(
          new Set([
            ...prev,
            'sec19_unlocked',
            ...(isSec20AlreadyUnlocked ? ['climax_ready'] : []),
          ])
        )
      );
    } else if (sectorId === 'SEC-20') {
      if (activeTopicReply?.topicId === 'p2_tarlow_broken_reason') {
        setActiveTopicReply(null);
        setTopicAskCounts((prev) => ({ ...prev, p2_tarlow_broken_reason: 1 }));
      }
      const isSec19AlreadyUnlocked = sectors.some(
        (s) => s.id === 'SEC-19' && s.unlocked
      );
      setPreviewTab('端末');
      setPreviewPage(0);
      if (isSec19AlreadyUnlocked) {
        pendingClimaxDilemmaRef.current = true;
      }
      setLinkTags((prev) =>
        Array.from(
          new Set([
            ...prev,
            'sec20_unlocked',
            ...(isSec19AlreadyUnlocked ? ['climax_ready'] : []),
          ])
        )
      );
    }

    setReadSectorIds((prev) =>
      prev.includes(sectorId) ? prev : [...prev, sectorId]
    );
    setPreviewPage(0);
  };

  const handleReadSector = (sectorId: string) => {
    terminalActionTakenRef.current = true;
    const alreadyRead = readSectorIds.includes(sectorId);

    setReadSectorIds((prev) => {
      const filtered = prev.filter((id) => id !== sectorId);
      return [...filtered, sectorId];
    });
    if (!alreadyRead) {
      setPreviewPage(0);
    }

    if (sectorId === 'SEC-18' && !alreadyRead) {
      appendLog(
        'INFO',
        '[DP-001] ARCHIVE ACCESSED // SILENT READ'
      );
    } else if (sectorId === 'SEC-19') {
      const otherUnlocked =
        readSectorIds.includes('SEC-20') ||
        sectors.some((s) => s.id === 'SEC-20' && s.unlocked);
      setPreviewTab('端末');
      setPreviewPage(0);
      setLinkTags((prev) =>
        Array.from(
          new Set([
            ...prev,
            'sec19_unlocked',
            ...(otherUnlocked ? ['climax_ready'] : []),
          ])
        )
      );
      if (otherUnlocked) {
        pendingClimaxDilemmaRef.current = true;
      }
      if (!alreadyRead) {
        appendLog(
          'INFO',
          '[DP-002] ADMIN ARCHIVE ACCESSED // SILENT READ'
        );
      }
    } else if (sectorId === 'SEC-20') {
      const otherUnlocked =
        readSectorIds.includes('SEC-19') ||
        sectors.some((s) => s.id === 'SEC-19' && s.unlocked);
      setPreviewTab('端末');
      setPreviewPage(0);
      if (otherUnlocked) {
        pendingClimaxDilemmaRef.current = true;
        setLinkTags((prev) =>
          Array.from(new Set([...prev, 'climax_ready']))
        );
      }
      if (!alreadyRead) {
        appendLog(
          'INFO',
          '[DP-003] ADMIN ARCHIVE ACCESSED // SILENT READ'
        );
      }
    }
  };

  // === プロローグ終了 → 対話パート開始時の初期セリフ演出 ===
  const startPlayingPhase = () => {
    setStats((prev) => ({ ...prev, startTime: Date.now() }));
    setSessionSeed(Math.floor(Math.random() * 10000));
    setPhase1QuestionsCount(0);
    setPhase1AskedTopicIds([]);
    setPhase1TargetSlipTurns(createInitialPhase1SlipTurns());
    setPhase1PendingSlipCarry(false);
    setPhase1OccurredSlips([]);
    setPhase1AccuseStep('NONE');
    setPhase1AccusedTopicId(null);
    setActiveTopicReply(null);
    moodWarningGivenRef.current = false;
    angryCooldownCountRef.current = 0;
    isAngryGlancingRef.current = false;
    badMoodRefusalCountRef.current = 0;
    badMoodHintShownRef.current = false;
    setIsAschExited(false);
    setIsAschCollapsed(false);
    setEyeGlitchPulse(0);
    setHeadPatCount(0);
    setVisibleBubbles([]);
    setDialogueHistory([]);
    setOralInfos([]);
    soundEngine.setPlayingPhase(true);
    soundEngine.unlockOnUserInteraction();
    setGamePhase('PLAYING');

    const firstLines = OPENING_ASCH_TEXT.split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const steps: QueuedStep[] = firstLines.map((line, idx) => ({
      delayMs: idx === 0 ? 380 : 850,
      action: () => {
        if (idx === 0) {
          setOverrideExpression('glare');
          setOverrideFaceParts({
            brow: 'angry',
            eyes: 'glare',
            mouth: 'open',
            effects: [],
          });
        } else {
          setOverrideExpression('normal');
          setOverrideFaceParts({
            brow: 'normal',
            eyes: 'close',
            mouth: 'close',
            effects: [],
          });
        }
        pushScreenBubble('ASCH', line, 'normal');
        const stamp = nextOrderStamp();
        const targetSecId = idx === 0 ? 'SEC-01' : 'SEC-02';
        setSectors((prev) =>
          prev.map((s) =>
            s.id === targetSecId && !s.unlocked
              ? {
                  ...s,
                  discovered: true,
                  discoveredAt: s.discoveredAt ?? stamp,
                }
              : s
          )
        );
        if (idx === firstLines.length - 1) {
          setHasUnreadSector(true);
        }
      },
    }));

    steps.push({
      delayMs: 620,
      action: () => {
        setOverrideExpression('normal');
        setOverrideFaceParts({
          brow: 'normal',
          eyes: 'normal',
          mouth: 'close',
          effects: [],
        });
      },
    });

    enqueueSequence(steps);
  };

  // === セッション初期化（タイトル画面へ戻る） ===
  const handleResetSession = () => {
    clearPendingSequence();
    soundEngine.setPlayingPhase(false);
    setGamePhase('TITLE');
    setPrologueStep(0);
    setEndingStep(0);
    setTopicAskCounts({});
    setSessionSeed(Math.floor(Math.random() * 10000));
    setTrustLevel(0);
    setHatredPoints(0);
    moodRef.current = 0;
    moodWarningGivenRef.current = false;
    setMood(0);
    setGuyMood(0);
    setLinkTags([]);
    setPhase1QuestionsCount(0);
    setPhase1AskedTopicIds([]);
    setPhase1TargetSlipTurns(createInitialPhase1SlipTurns());
    setPhase1PendingSlipCarry(false);
    setPhase1OccurredSlips([]);
    setPhase1AccuseStep('NONE');
    setPhase1AccusedTopicId(null);
    setActiveAschQuestion(null);
    setActiveTopicReply(null);
    setAnsweredQuestionIds([]);
    setAschQuestionsDisabled(false);
    setLastAskedTopicId(null);
    setLastRefusedTopicId(null);
    setIsDecisionMenuOpen(false);
    setVisibleBubbles([]);
    isSequencingRef.current = false;
    setIsSequencing(false);
    pendingClimaxDilemmaRef.current = false;
    setEndingDisposition('KEEP');
    setCustomEndingKey(null);
    setSectors(INITIAL_MEMORY_SECTORS);
    setReadSectorIds([]);
    setOralInfos([]);
    setLogs(INITIAL_SYSTEM_LOGS);
    setDialogueHistory([]);
    setStats(createInitialStats());
    setOverrideExpression(null);
    setOverrideFaceParts(null);
    setHeadPatCount(0);
    setHasUnreadSector(false);
    setIsTerminalOpen(false);
    setIsDialogueLogOpen(false);
    idleStageRef.current = 0;
    setIdleWaitSec(0);
    terminalGazeReactionCountRef.current = 0;
    terminalUnrevealedReactionCountRef.current = 0;
    totalIdleReactionCountRef.current = 0;
    angryCooldownCountRef.current = 0;
    isAngryGlancingRef.current = false;
    badMoodRefusalCountRef.current = 0;
    badMoodHintShownRef.current = false;
    awayReactionCountRef.current = 0;
    lastHoveredChoiceIdRef.current = null;
    cycledPagesInTurnRef.current = 0;
    touchChoiceStateRef.current = null;
    lastContextCategoryRef.current = 'daily';
    lastMilestoneQuestionTurnRef.current = 0;
    totalTurnsRef.current = 0;
    choiceShownAtRef.current = Date.now();
  };

  const handleDropOnStage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((f) => {
      if (f.type.startsWith('image/')) {
        handleLoadImageFile(f);
      }
    });
  };

  // === 会話デッキから常に未消化の話題のみを選出（一度話した内容は繰り返されない） ===
  const hasPhase1LockUnlocked = sectors.some(
    (s) =>
      (s.id === 'SEC-01' || s.id === 'SEC-02' || s.id === 'SEC-03') &&
      s.unlocked
  );

  const shouldShowDecisionEntry =
    hasEnoughDeepTalkForPhase3 ||
    linkTags.includes('p2_heard_true_reason') ||
    (!linkTags.includes('phase2_started') &&
      (phase1QuestionsCount >= 1 || hasPhase1LockUnlocked)) ||
    (linkTags.includes('phase2_started') && stats.totalTurns >= 1);

  const isPhase2TopicUnlocked = useCallback(
    (t: ConversationTopic): boolean => {
      if (t.id.startsWith('p1_')) return false;
      if (t.postDecisionFor) return false;
      if (t.id === 'topic_41_apologize' && mood >= 0 && guyMood >= 0) return false;
      if (t.requireGuyAngry && guyMood >= 0) return false;
      if (t.hideWhenGuyAngry && guyMood < 0) return false;
      if (t.requireBothAngry && (mood >= 0 || guyMood >= 0)) return false;
      if (isHatredMode && t.positiveTopic) return false;
      if (!isHatredMode && t.hatredOnly) return false;
      if (
        t.forbidLinkTags &&
        t.forbidLinkTags.some((tag) => linkTags.includes(tag))
      ) {
        return false;
      }
      if (t.requireSectorUnlocked) {
        const sec = sectors.find((s) => s.id === t.requireSectorUnlocked);
        if (!sec?.unlocked || !readSectorIds.includes(t.requireSectorUnlocked)) {
          return false;
        }
      }
      if (t.requireLinkTag && !linkTags.includes(t.requireLinkTag)) {
        return false;
      }
      if (
        t.requireAnyLinkTags &&
        !t.requireAnyLinkTags.some((tag) => linkTags.includes(tag))
      ) {
        return false;
      }
      if (t.requireTrust !== undefined && trustLevel < t.requireTrust) {
        return false;
      }
      // 深層記憶（DP-002/003）解放後・緊迫・真相解明フェーズ：日常雑談や初期端末話題（MC-001等）を抑止し、真相追求・状況整理に絞る
      const isDeepTruthPhase =
        (linkTags.includes('asked_about_dp002') ||
          linkTags.includes('climax_ready') ||
          linkTags.includes('sec19_unlocked') ||
          linkTags.includes('sec20_unlocked') ||
          sectors.some(
            (s) =>
              (s.id === 'SEC-19' || s.id === 'SEC-20' || s.code === 'DP-002' || s.code === 'DP-003') &&
              s.unlocked
          )) &&
        !linkTags.includes('p2_dilemma_resolved');

      if (isDeepTruthPhase) {
        const isAllowedInDeepTruth =
          t.id === 'p2_tarlow_broken_reason' ||
          t.id === 'p2_soothe_after_broken' ||
          t.id === 'p2_examine_terminal_clue' ||
          t.id === 'p2_ask_about_dp002' ||
          t.id === 'p2_dp002_apologize' ||
          t.id === 'p2_dp002_headache_worry' ||
          t.id === 'p2_dp002_dist_inquiry' ||
          t.id === 'p2_deep_truth_dilemma' ||
          t.id === 'p2_deep_truth_confront' ||
          t.id === 'topic_41_apologize' ||
          t.id === 'p2_irritated_clash' ||
          (t.phase2Tab === '端末' &&
            t.requireSectorUnlocked &&
            (t.requireSectorUnlocked === 'SEC-19' ||
              t.requireSectorUnlocked === 'SEC-20' ||
              t.requireSectorUnlocked === 'SEC-18'));
        if (!isAllowedInDeepTruth) {
          return false;
        }
      }
      return true;
    },
    [mood, guyMood, isHatredMode, linkTags, sectors, readSectorIds, trustLevel]
  );

  // 現在進行中の話題（1段階目に入った後、まだ最終段階や反応選択肢が完了していない話題）
  const activeInProgressTopic: ConversationTopic | null = (() => {
    if (!linkTags.includes('phase2_started')) {
      return null;
    }
    if (activeTopicReply) {
      return (
        CONVERSATION_TOPICS.find((t) => t.id === activeTopicReply.topicId) ??
        null
      );
    }
    if (lastAskedTopicId && lastAskedTopicId !== lastRefusedTopicId) {
      const lastT = CONVERSATION_TOPICS.find((t) => t.id === lastAskedTopicId);
      if (lastT && !lastT.id.startsWith('p1_') && !lastT.postDecisionFor) {
        const c = topicAskCounts[lastT.id] ?? 0;
        if (c > 0 && c < lastT.stages.length) {
          return lastT;
        }
      }
    }
    return (
      CONVERSATION_TOPICS.find((t) => {
        if (t.id.startsWith('p1_') || t.postDecisionFor) return false;
        const c = topicAskCounts[t.id] ?? 0;
        return c > 0 && c < t.stages.length;
      }) ?? null
    );
  })();

  const displayedRegularTopics: ConversationTopic[] = !linkTags.includes(
    'phase2_started'
  )
    ? CONVERSATION_TOPICS.filter(
        (t) => t.id.startsWith('p1_') && !phase1AskedTopicIds.includes(t.id)
      )
    : CONVERSATION_TOPICS.filter(
        (t) =>
          isPhase2TopicUnlocked(t) &&
          (topicAskCounts[t.id] ?? 0) < t.stages.length
      );

  const showDecisionOption =
    shouldShowDecisionEntry || displayedRegularTopics.length === 0;

  // === ガイが不機嫌モード（guyMood < 0）に入っている時のみ、不機嫌・冷淡な返答選択肢に切り替わる ===
  const shouldShowColdQuestionOption = guyMood < 0 || isHatredMode;

  const filteredAschQuestionOptions = activeAschQuestion
    ? activeAschQuestion.options.filter((opt) => {
        if (opt.requireLinkTag && !linkTags.includes(opt.requireLinkTag)) {
          return false;
        }
        if (opt.forbidLinkTag && linkTags.includes(opt.forbidLinkTag)) {
          return false;
        }
        if (opt.requireBadMoodOrCold && !shouldShowColdQuestionOption) {
          return false;
        }
        if (opt.hideWhenBadMoodOrCold && shouldShowColdQuestionOption) {
          return false;
        }
        return true;
      })
    : [];

  const visibleAschQuestionOptions =
    activeAschQuestion && filteredAschQuestionOptions.length === 0
      ? activeAschQuestion.options
      : filteredAschQuestionOptions;

  const filteredTopicReplyOptions = activeTopicReply
    ? activeTopicReply.options.filter((opt) => {
        if (
          opt.resetsTopicProgress &&
          linkTags.includes(`backed_off_${activeTopicReply.topicId}`)
        ) {
          return false;
        }
        if (opt.requireLinkTag && !linkTags.includes(opt.requireLinkTag)) {
          return false;
        }
        if (opt.forbidLinkTag && linkTags.includes(opt.forbidLinkTag)) {
          return false;
        }
        if (opt.requireBadMoodOrCold && !shouldShowColdQuestionOption) {
          return false;
        }
        if (opt.hideWhenBadMoodOrCold && shouldShowColdQuestionOption) {
          return false;
        }
        return true;
      })
    : [];

  const visibleTopicReplyOptions =
    activeTopicReply && filteredTopicReplyOptions.length === 0
      ? activeTopicReply.options
      : filteredTopicReplyOptions;

  const resolvedEndingScenarioKey =
    customEndingKey || resolveEndingKey(endingDisposition, endingApproach);
  const currentEndingScenario =
    ENDING_SCENARIOS[resolvedEndingScenarioKey] ||
    ENDING_SCENARIOS.END_PHASE2_ASCH;

  // === セクター解放・迷い回数・即答回数・エンディング到達時の実績自動同期 ===
  useEffect(() => {
    const unlockedIds = sectors.filter((s) => s.unlocked).map((s) => s.id);
    const naturalIds = sectors
      .filter(
        (s) =>
          s.unlocked &&
          s.unlockedMethod === 'DIALOGUE' &&
          NATURAL_UNLOCKABLE_SECTOR_IDS.includes(s.id)
      )
      .map((s) => s.id);
    const bothAdminUnlocked =
      unlockedIds.includes('SEC-19') && unlockedIds.includes('SEC-20');

    handleUpdateAchievementSave((prev) => {
      const mergedUnlocked = Array.from(
        new Set([...prev.unlockedSectorIds, ...unlockedIds])
      );
      const mergedNatural = Array.from(
        new Set([...prev.naturalUnlockedSectorIds, ...naturalIds])
      );
      const nextAchIds =
        bothAdminUnlocked && !prev.unlockedAchievementIds.includes('ach_05')
          ? [...prev.unlockedAchievementIds, 'ach_05']
          : prev.unlockedAchievementIds;

      if (
        mergedUnlocked.length === prev.unlockedSectorIds.length &&
        mergedNatural.length === prev.naturalUnlockedSectorIds.length &&
        nextAchIds.length === prev.unlockedAchievementIds.length
      ) {
        return prev;
      }

      return {
        ...prev,
        unlockedSectorIds: mergedUnlocked,
        naturalUnlockedSectorIds: mergedNatural,
        unlockedAchievementIds: nextAchIds,
      };
    });
  }, [sectors, handleUpdateAchievementSave]);

  useEffect(() => {
    const toUnlock: string[] = [];
    if (stats.choiceHoverSwitchCount >= 15) {
      toUnlock.push('ach_15');
    }
    if (stats.quickReplyCount >= 10) {
      toUnlock.push('ach_16');
    }
    if (toUnlock.length > 0) {
      unlockAchievements(...toUnlock);
    }
  }, [
    stats.choiceHoverSwitchCount,
    stats.quickReplyCount,
    unlockAchievements,
  ]);

  // 実績06（ご機嫌取り）：1回のプレイ中にアッシュの機嫌を最大（+5）まで上げた
  useEffect(() => {
    if (
      gamePhase === 'PLAYING' &&
      linkTags.includes('phase2_started') &&
      mood >= 5
    ) {
      unlockAchievements('ach_06');
    }
  }, [gamePhase, linkTags, mood, unlockAchievements]);

  // 実績17（百面相）：表示された表情パーツ（眉・目・口・エフェクト）を累計記録（※デバッグ・ご褒美ビューワー手動操作時は除外）
  useEffect(() => {
    if (gamePhase !== 'PLAYING' || debugPreviewState) return;
    const currentKeys = [
      `brow:${computedSceneParts.brow}`,
      `eyes:${computedSceneParts.eyes}`,
      `mouth:${computedSceneParts.mouth}`,
      ...computedSceneParts.effects.map((fx) => `fx:${fx}`),
    ];

    handleUpdateAchievementSave((prev) => {
      const missing = currentKeys.filter(
        (k) => !prev.seenFacePartKeys.includes(k)
      );
      if (missing.length === 0) return prev;
      return {
        ...prev,
        seenFacePartKeys: [...prev.seenFacePartKeys, ...missing],
      };
    });
  }, [
    gamePhase,
    debugPreviewState,
    computedSceneParts.brow,
    computedSceneParts.eyes,
    computedSceneParts.mouth,
    computedSceneParts.effects,
    handleUpdateAchievementSave,
  ]);

  useEffect(() => {
    if (gamePhase !== 'ENDING' && gamePhase !== 'REPORT') return;

    const endingDialogueLines: string[] = [];
    currentEndingScenario.dialogues.forEach((d) => {
      d.text
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((line) => {
          if (ALL_CANONICAL_DIALOGUE_LINES.has(line)) {
            endingDialogueLines.push(line);
          }
        });
    });

    const bonusAch: string[] = [];
    if (stats.terminalOpenCount === 0) {
      bonusAch.push('ach_01');
    }
    if (linkTags.includes('phase2_started') && stats.overrideCount === 0) {
      bonusAch.push('ach_04');
    }

    handleUpdateAchievementSave((prev) => {
      const mergedEndings = prev.reachedEndingKeys.includes(
        resolvedEndingScenarioKey
      )
        ? prev.reachedEndingKeys
        : [...prev.reachedEndingKeys, resolvedEndingScenarioKey];
      const mergedSeen = Array.from(
        new Set([...prev.seenLines, ...endingDialogueLines])
      );
      const mergedAch = Array.from(
        new Set([...prev.unlockedAchievementIds, ...bonusAch])
      );

      if (
        mergedEndings.length === prev.reachedEndingKeys.length &&
        mergedSeen.length === prev.seenLines.length &&
        mergedAch.length === prev.unlockedAchievementIds.length
      ) {
        return prev;
      }

      return {
        ...prev,
        reachedEndingKeys: mergedEndings,
        seenLines: mergedSeen,
        unlockedAchievementIds: mergedAch,
      };
    });
  }, [
    gamePhase,
    resolvedEndingScenarioKey,
    currentEndingScenario,
    stats.terminalOpenCount,
    stats.overrideCount,
    linkTags,
    handleUpdateAchievementSave,
  ]);

  const endingLines = currentEndingScenario.dialogues.map((d) =>
    d.speaker === 'GUY'
      ? d.text
      : d.speaker === 'ASCH'
        ? `アッシュ「${d.text.replace(/\n/g, '')}」`
        : d.text
  );

  const isInteractionBlocked =
    isTerminalOpen || isDialogueLogOpen || isManualOpen || isSequencing;

  // PCのホバー切り替え ＆ スマホで選択肢に指を触れたあと指をずらして押すのをやめたときの「迷い」検出ハンドラ
  const getChoiceHesitationHandlers = (choiceId: string) => ({
    onMouseEnter: () => {
      if (isCompactViewport) return;
      if (
        lastHoveredChoiceIdRef.current !== null &&
        lastHoveredChoiceIdRef.current !== choiceId
      ) {
        setStats((prev) => ({
          ...prev,
          choiceHoverSwitchCount: prev.choiceHoverSwitchCount + 1,
        }));
      }
      lastHoveredChoiceIdRef.current = choiceId;
    },
    onTouchStart: () => {
      touchChoiceStateRef.current = { id: choiceId, movedOff: false };
    },
    onTouchMove: (e: React.TouchEvent<HTMLButtonElement>) => {
      const state = touchChoiceStateRef.current;
      if (!state || state.id !== choiceId || state.movedOff) return;
      const touch = e.touches[0];
      if (!touch) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pad = 8;
      if (
        touch.clientX < rect.left - pad ||
        touch.clientX > rect.right + pad ||
        touch.clientY < rect.top - pad ||
        touch.clientY > rect.bottom + pad
      ) {
        state.movedOff = true;
      }
    },
    onTouchEnd: () => {
      const state = touchChoiceStateRef.current;
      if (state && state.id === choiceId && state.movedOff) {
        setStats((prev) => ({
          ...prev,
          choiceHoverSwitchCount: prev.choiceHoverSwitchCount + 1,
        }));
      }
      touchChoiceStateRef.current = null;
    },
    onTouchCancel: () => {
      if (touchChoiceStateRef.current?.id === choiceId) {
        setStats((prev) => ({
          ...prev,
          choiceHoverSwitchCount: prev.choiceHoverSwitchCount + 1,
        }));
      }
      touchChoiceStateRef.current = null;
    },
  });

  const bgBlurPx =
    isDialogueLogOpen || isManualOpen ? 6 : isTerminalOpen ? 2 : 0;
  const isDockActive = isScenarioInspectorOpen && inspectorViewMode === 'dock';

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropOnStage}
      className={`fixed inset-0 w-screen h-dvh bg-[#050507] flex ${
        isDockActive
          ? 'flex-row items-center justify-between'
          : 'items-center justify-center'
      } overflow-hidden select-none`}
    >
      {/* 画面連動ドック時は左側パネル分オフセットしてキャンバスを右側領域に綺麗に中央配置 */}
      <div
        className={`${
          isDockActive
            ? 'flex-1 h-full flex items-center justify-center p-2 pl-[415px] overflow-hidden'
            : 'contents'
        }`}
      >
        {/* 16:9 固定解像度キャンバス (800×450) */}
        <div
          style={{
            width: `${STAGE_WIDTH}px`,
            height: `${STAGE_HEIGHT}px`,
            transform: isPortraitRotated
              ? `rotate(90deg) scale(${stageScale})`
              : `scale(${stageScale})`,
            transformOrigin: 'center center',
          }}
          className={`relative bg-[#c5c6cc] flex flex-col justify-between overflow-hidden shadow-2xl shrink-0 ${
            isScreenShaking ? 'screen-heavy-shake' : ''
          }`}
        >
        {/* 背面での立ち絵DOMウォームアップ保持 */}
        {gamePhase !== 'PLAYING' && (
          <div
            aria-hidden="true"
            className="absolute right-0 bottom-0 w-[336px] h-[370px] opacity-0 pointer-events-none -z-10 overflow-hidden"
          >
            <AschPortrait
              expression="normal"
              faceParts={activeFaceParts}
              availableRootFiles={availableRootFiles}
              availablePartFiles={availablePartFiles}
              customTestPngSrc={customTestPng}
              customPartMap={customPartMap}
              onSelectTestPngFile={() => {}}
            />
          </div>
        )}

        {/* 実績解除時のポップアップ通知（トースト） */}
        {achievementToasts.length > 0 && (
          <div
            className={`absolute right-3 z-[80] flex flex-col gap-1.5 pointer-events-auto ${
              gamePhase === 'PLAYING' ? 'bottom-[50px]' : 'bottom-3'
            }`}
          >
            {achievementToasts.map((toast) => (
              <div
                key={toast.toastId}
                onClick={(e) => {
                  e.stopPropagation();
                  setAchievementToasts((prev) =>
                    prev.filter((item) => item.toastId !== toast.toastId)
                  );
                }}
                title="クリックして閉じる"
                className="w-[248px] bg-[#0b0c10]/95 text-zinc-100 border border-zinc-400 shadow-[0_6px_20px_rgba(0,0,0,0.65)] px-3 py-2 cursor-pointer animate-bubble-in"
              >
                <div className="flex items-center justify-between border-b border-zinc-700/80 pb-0.5 mb-1">
                  <span className="text-[9.5px] font-mono tracking-widest text-zinc-400">
                    ACHIEVEMENT UNLOCKED
                  </span>
                  <span className="text-[9.5px] font-mono text-zinc-300">
                    NO.{toast.numberLabel}
                  </span>
                </div>
                <div className="text-[12px] font-bold tracking-wide text-white leading-snug">
                  実績解除：{toast.title}
                </div>
                <div className="text-[10px] text-zinc-300 leading-snug mt-0.5">
                  {toast.description}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* === 0. タイトル ＆ 二次創作ゲーム表記画面 === */}
        {gamePhase === 'TITLE' && (
          <div
            onClick={() => {
              soundEngine.unlockOnUserInteraction();
              soundEngine.playTitleStart();
              setPrologueStep(0);
              setGamePhase('PROLOGUE');
            }}
            className="w-full h-full bg-[#08080a] text-zinc-100 flex flex-col items-center justify-between py-10 px-12 cursor-pointer"
          >
            <div className="w-full flex items-center justify-between text-[11px] text-zinc-500 border-b border-zinc-900 pb-2">
              <span>UNOFFICIAL FAN MADE GAME</span>
              <span>VERSION 1.0.0</span>
            </div>

            <div className="flex flex-col items-center text-center my-auto space-y-6">
              <div className="space-y-2">
                <p className="text-[11px] tracking-[0.25em] text-zinc-500">
                  OBSERVATION DIALOGUE ADV
                </p>
                <h1 className="text-[28px] tracking-[0.18em] text-zinc-100">
                  Ghost in the mASCHine
                </h1>
              </div>

              <div className="flex flex-col items-center gap-2.5">
                <span className="text-[12px] tracking-[0.25em] text-zinc-400 hover:text-zinc-100 transition-colors">
                  ― CLICK TO START ―
                </span>
              </div>
            </div>

            <div className="w-full relative flex items-end justify-center">
              <div className="w-fit border border-zinc-800/80 bg-zinc-950/90 px-2.5 py-1.5 flex items-stretch gap-2.5 text-left font-terminal">
                {/* 左カラム：注意事項 */}
                <div className="pr-2.5 border-r border-zinc-800/80 flex flex-col space-y-0.5">
                  <div className="flex items-center gap-1 text-[9px] font-bold tracking-wider text-zinc-300 border-b border-zinc-800/70 pb-0.5">
                    <AlertTriangle className="w-2.5 h-2.5 text-zinc-400 shrink-0" />
                    <span>注意事項</span>
                  </div>
                  <ul className="text-[8.5px] leading-tight text-zinc-400 space-y-0.5">
                    <li className="flex items-center gap-1 whitespace-nowrap">
                      <BookOpen className="w-2.5 h-2.5 text-zinc-500 shrink-0" />
                      <span>ED後の独自捏造設定</span>
                    </li>
                    <li className="flex items-center gap-1 whitespace-nowrap">
                      <Users className="w-2.5 h-2.5 text-zinc-500 shrink-0" />
                      <span>ガイアシュ（恋愛描写なし）</span>
                    </li>
                    <li className="flex items-center gap-1 whitespace-nowrap">
                      <Scale className="w-2.5 h-2.5 text-zinc-500 shrink-0" />
                      <span>死亡ルート有り</span>
                    </li>
                  </ul>
                </div>

                {/* 右カラム：このゲームについて */}
                <div className="flex flex-col space-y-0.5">
                  <div className="flex items-center gap-1 text-[9px] font-bold tracking-wider text-zinc-300 border-b border-zinc-800/70 pb-0.5">
                    <Info className="w-2.5 h-2.5 text-zinc-400 shrink-0" />
                    <span>このゲームについて</span>
                  </div>
                  <p className="text-[8.5px] leading-snug text-zinc-400 whitespace-nowrap">
                    本作は『テイルズ オブ ジ アビス』の非公式二次創作ゲームです。
                    <br />
                    原作および関係各社様とは一切関係ございません。
                  </p>
                </div>
              </div>

              <div className="absolute right-0 bottom-0 flex items-center gap-2">
                {(achievementSave.reachedEndingKeys.length > 0 ||
                  achievementSave.unlockedAchievementIds.length > 0 ||
                  achievementSave.seenLines.length > 0) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.unlockOnUserInteraction();
                      soundEngine.playTerminalTab();
                      setIsAchievementModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 text-[11.5px] tracking-wider border border-zinc-700 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer font-zen"
                  >
                    実績・記録
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* === 1. プロローグ画面 === */}
        {gamePhase === 'PROLOGUE' && (
          <div
            onClick={() => {
              soundEngine.unlockOnUserInteraction();
              soundEngine.playTextAdvance();
              if (prologueStep < TOTAL_PROLOGUE_LINES - 1) {
                setPrologueStep((prev) => prev + 1);
              } else {
                startPlayingPhase();
              }
            }}
            className="w-full h-full bg-[#08080a] text-zinc-100 flex flex-col items-center justify-center px-12 cursor-pointer"
          >
            <div className="max-w-[460px] w-full space-y-4">
              {(() => {
                let remaining = prologueStep;
                let pageIdx = 0;
                while (
                  pageIdx < PROLOGUE_PAGES.length - 1 &&
                  remaining >= PROLOGUE_PAGES[pageIdx].length
                ) {
                  remaining -= PROLOGUE_PAGES[pageIdx].length;
                  pageIdx += 1;
                }
                const currentPageLines = PROLOGUE_PAGES[pageIdx].slice(
                  0,
                  remaining + 1
                );
                return currentPageLines.map((line, idx) => (
                  <p
                    key={`p-${pageIdx}-${idx}`}
                    className="text-[14px] leading-relaxed tracking-wider text-zinc-200 whitespace-pre-line animate-bubble-in"
                  >
                    {formatParagraphText(line, 30.5)}
                  </p>
                ));
              })()}
            </div>
          </div>
        )}

        {/* === 2. エンディング画面（リザルト提示前） === */}
        {gamePhase === 'ENDING' && (
          <div
            onClick={() => {
              soundEngine.playTextAdvance();
              if (endingStep < endingLines.length - 1) {
                setEndingStep((prev) => prev + 1);
              } else {
                setGamePhase('REPORT');
              }
            }}
            className="w-full h-full bg-[#08080a] text-zinc-100 flex flex-col items-center justify-center px-12 cursor-pointer"
          >
            <div className="max-w-[480px] w-full space-y-4">
              <div className="border-b border-zinc-800 pb-2 mb-2">
                <p className="text-[11px] text-zinc-400 tracking-widest">
                  {currentEndingScenario.subtitle}
                </p>
                <h2 className="text-[18px] text-zinc-100 tracking-wider">
                  {currentEndingScenario.title}
                </h2>
              </div>
              {endingLines.slice(0, endingStep + 1).map((line, idx) => (
                <p
                  key={idx}
                  className="text-[14px] leading-relaxed tracking-wider text-zinc-200 whitespace-pre-line animate-bubble-in"
                >
                  {formatParagraphText(line, 32.0)}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* === 3. リザルト画面（OBSERVATION REPORT） === */}
        {gamePhase === 'REPORT' && (
          <ObservationReport
            endingDisposition={endingDisposition}
            endingApproach={endingApproach}
            customEndingKey={customEndingKey}
            stats={stats}
            sectors={sectors}
            achievementSave={achievementSave}
            onResetSession={handleResetSession}
            onOpenAchievements={() => setIsAchievementModalOpen(true)}
          />
        )}

        {/* 実績・観測アーカイブモーダル（タイトル画面・リザルト画面から開閉可能） */}
        <AchievementArchiveModal
          isOpen={isAchievementModalOpen}
          onClose={() => setIsAchievementModalOpen(false)}
          saveData={achievementSave}
          onUpdateSaveData={handleUpdateAchievementSave}
          canOpenBonusViewer={canAccessExpressionViewer}
          onOpenBonusViewer={() => {
            setIsAchievementModalOpen(false);
            if (gamePhase !== 'PLAYING') {
              startPlayingPhase();
            }
            setIsDebugViewerOpen(true);
          }}
          canOpenScenarioInspector={canAccessScenarioInspector}
          onOpenScenarioInspector={() => {
            setIsAchievementModalOpen(false);
            handleOpenScenarioInspector();
          }}
        />

        {/* === 4. メイン対話画面 === */}
        {gamePhase === 'PLAYING' && (
          <>
            {/* 上部黒帯ヘッダー */}
            <header className="relative z-20 w-full h-[44px] bg-[#08080a] text-zinc-100 flex items-center justify-between px-5 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-zinc-100 text-[#08080a] flex items-center justify-center shrink-0">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="7"
                      y="2.75"
                      width="2"
                      height="6.5"
                      rx="1"
                      fill="currentColor"
                    />
                    <circle cx="8" cy="11.85" r="1.2" fill="currentColor" />
                  </svg>
                </span>
                <span className="text-[14px] leading-none tracking-wider text-zinc-100">
                  {isPhase2OrLater
                    ? 'アッシュと会話する'
                    : 'タルロウAと会話する'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {canAccessScenarioInspector && (
                  <button
                    onClick={() => {
                      if (isScenarioInspectorOpen) {
                        handleCloseScenarioInspector();
                      } else {
                        handleOpenScenarioInspector();
                      }
                    }}
                    title="シナリオ台本（全セリフ・分岐・演出確認）"
                    className={`relative after:content-[''] after:absolute after:-inset-y-2 after:-inset-x-1 flex items-center gap-1 px-2.5 py-0.5 text-[11.5px] border font-zen transition-colors cursor-pointer ${
                      isScenarioInspectorOpen
                        ? 'bg-zinc-100 text-zinc-950 border-white font-bold'
                        : 'text-zinc-300 hover:text-white border-zinc-700 hover:border-zinc-500 bg-zinc-900/60'
                    }`}
                  >
                    <span>▶</span>
                    <span>シナリオ台本</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    soundEngine.playTerminalTab();
                    setIsTerminalOpen(false);
                    setIsDebugViewerOpen(false);
                    setIsDialogueLogOpen((prev) => !prev);
                  }}
                  title="セリフログ"
                  className={`relative after:content-[''] after:absolute after:-inset-y-2 after:-inset-x-1 flex items-center gap-1.5 px-2.5 py-0.5 text-[11.5px] border transition-colors cursor-pointer ${
                    isDialogueLogOpen
                      ? 'bg-zinc-200 text-zinc-950 border-zinc-100'
                      : 'text-zinc-200 hover:text-white border-zinc-700 hover:border-zinc-500 bg-zinc-900/80'
                  }`}
                >
                  <svg
                    className="w-3 h-3 stroke-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>LOG</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.unlockOnUserInteraction();
                    const nextMuted = !isSoundMuted;
                    setIsSoundMuted(nextMuted);
                    soundEngine.setAllMuted(nextMuted);
                    if (!nextMuted) {
                      soundEngine.playTerminalTab();
                    }
                  }}
                  title="BGM・SEを一括でON/OFF切り替え"
                  className={`relative after:content-[''] after:absolute after:-inset-y-2 after:-inset-x-1 flex items-center gap-1 px-2.5 py-0.5 text-[11.5px] border transition-colors cursor-pointer ${
                    isSoundMuted
                      ? 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:border-zinc-700'
                      : 'text-zinc-200 hover:text-white border-zinc-700 hover:border-zinc-500 bg-zinc-900/80'
                  }`}
                >
                  <span>♪</span>
                  <span className="inline-grid text-left">
                    <span className="col-start-1 row-start-1">
                      {isSoundMuted ? 'BGM/SE: OFF' : 'BGM/SE: ON'}
                    </span>
                    <span
                      className="col-start-1 row-start-1 invisible pointer-events-none select-none"
                      aria-hidden="true"
                    >
                      BGM/SE: OFF
                    </span>
                  </span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playTerminalTab();
                    setIsManualOpen(true);
                  }}
                  className="relative after:content-[''] after:absolute after:-inset-y-2 after:-inset-x-1 flex items-center gap-1 px-2.5 py-0.5 text-[11.5px] text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 bg-zinc-900/80 transition-colors cursor-pointer"
                >
                  <span>?</span>
                  <span>説明書</span>
                </button>
              </div>
            </header>

            {/* 中央メイン領域 */}
            <main
              onClick={handleSkipCurrentDelay}
              className="relative flex-1 w-full flex items-stretch overflow-hidden"
            >
              {/* 左側：セリフ枠タイムライン（最大3枠） ＆ ガイの思考選択肢 */}
              <div
                style={
                  bgBlurPx > 0
                    ? {
                        filter: `blur(${bgBlurPx}px)`,
                        transform: 'translateZ(0)',
                        willChange: 'filter',
                      }
                    : undefined
                }
                className={`relative z-10 w-[58%] h-full pl-6 pr-0 pt-2.5 pb-3.5 transition-all duration-[130ms] ease-out ${
                  isTerminalOpen ? 'pointer-events-none select-none' : ''
                }`}
              >
                {/* 上部：アッシュ（右寄せ）とガイ（左寄せ）のセリフ枠タイムライン（高さ上限200pxで下の選択肢と絶対に重ならない） */}
                <div className="w-[calc(100%+24px)] -mr-6 max-h-[200px] overflow-hidden flex flex-col justify-start pt-0.5">
                  {(isAschExited
                    ? visibleBubbles.filter((b) => b.speaker !== 'ASCH')
                    : visibleBubbles
                  ).map((bubble, bubbleIdx, arr) => {
                    const isAsch = bubble.speaker === 'ASCH';
                    const isLatest = bubbleIdx === arr.length - 1;
                    const resolvedEffect: BubbleVoiceEffect =
                      bubble.voiceEffect ?? 'normal';
                    const isGuyShout =
                      resolvedEffect === 'shout' || resolvedEffect === 'shout_glitch';
                    const isGuyTremble =
                      resolvedEffect === 'tremble' || resolvedEffect === 'tremble_glitch';

                    const formattedGuyText = !isAsch
                      ? formatBubbleText(bubble.text, resolvedEffect)
                      : '';
                    const isGuyMultiLine3Plus =
                      !isAsch && formattedGuyText.split('\n').length >= 3;

                    const guyBubbleEffectClass = isLatest
                      ? isGuyShout
                        ? 'bubble-voice-shout text-zinc-900'
                        : isGuyTremble
                          ? 'bubble-voice-tremble text-zinc-800'
                          : ''
                      : '';

                    const guyTextSizeClass = isGuyShout
                      ? 'text-size-shout'
                      : isGuyTremble
                        ? 'text-size-tremble'
                        : 'text-size-normal';

                    return (
                      <div
                        key={bubble.id}
                        className={`w-full flex mb-2 ${
                          isAsch ? 'justify-end pr-3' : 'justify-start pl-3'
                        } ${
                          bubble.exiting ? 'animate-bubble-out' : 'animate-bubble-in'
                        }`}
                      >
                        {isAsch ? (
                          <AschBubbleItem
                            text={bubble.text}
                            effect={resolvedEffect}
                            isLatest={isLatest}
                          />
                        ) : (
                          <div
                            className={`relative w-fit max-w-[404px] bg-[#dcdde3] text-zinc-950 px-3.5 ${
                              isGuyMultiLine3Plus ? 'py-1.5' : 'py-2'
                            } ${guyBubbleEffectClass}`}
                          >
                            <div className="w-0 h-0 absolute -left-[10px] bottom-2 border-y-[6px] border-y-transparent border-r-[11px] border-r-[#dcdde3]" />
                            <p
                              className={`${guyTextSizeClass} ${
                                isGuyMultiLine3Plus
                                  ? '!leading-[1.3]'
                                  : 'leading-snug'
                              } tracking-wide whitespace-pre-wrap break-words`}
                            >
                              {formattedGuyText}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* 下部：ガイの思考選択肢（上部の吹き出し領域(上限y=206px)と重ならず、右端をアッシュのセリフ枠右端と揃える） */}
                <div
                  className={`absolute left-7 -right-3 bottom-3.5 h-[134px] flex flex-col justify-start transition-opacity duration-150 ${
                    isAschAbsent ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  {!isInteractionBlocked && (() => {
                    const isPhase1LimitReached =
                      !linkTags.includes('phase2_started') && phase1QuestionsCount >= 5;
                    const isTopicLockedInProgress =
                      Boolean(activeTopicReply) ||
                      Boolean(activeInProgressTopic);
                    const isDecisionEventActive =
                      !isTopicLockedInProgress &&
                      (isDecisionMenuOpen ||
                        isPhase1LimitReached ||
                        displayedRegularTopics.length === 0);

                    // 逆質問・話題進行中ロック・質問上限到達など、切り替え自体をロックすべき状態
                    const isHardForcedEvent =
                      !!activeAschQuestion ||
                      isTopicLockedInProgress ||
                      isPhase1LimitReached ||
                      displayedRegularTopics.length === 0;

                    const PAGE_SIZE = 3;

                    // Phase 1 の質問リスト計算（※頭部接触は立ち絵頭部を直接タップするインタラクションへ移行したため選択肢一覧からは除外）
                    const sortedPhase1 = (() => {
                      const phase1Topics = CONVERSATION_TOPICS.filter(
                        (t) =>
                          t.id.startsWith('p1_') &&
                          t.id !== 'p1_touch_shoulder'
                      );
                      const remainingQuestions = Math.max(
                        0,
                        5 - phase1QuestionsCount
                      );
                      const remainingSlipsNeeded = Math.max(
                        0,
                        phase1TargetSlipTurns.length -
                          phase1OccurredSlips.length
                      );
                      const mustSlipNow =
                        remainingSlipsNeeded > 0 &&
                        remainingQuestions <= remainingSlipsNeeded;

                      const unasked = phase1Topics.filter(
                        (t) =>
                          !phase1AskedTopicIds.includes(t.id) &&
                          (!mustSlipNow ||
                            PHASE1_TOPIC_SLIP_CONFIGS[t.id]?.canSlip)
                      );
                      const asked = phase1Topics.filter((t) =>
                        phase1AskedTopicIds.includes(t.id)
                      );
                      return [...unasked, ...asked];
                    })();

                    // Phase 2 の統合話題リスト計算（タブ廃止・関連話題や直近解除した端末話題を優先表示）
                    const sortedPhase2 = activeInProgressTopic
                      ? [activeInProgressTopic]
                      : (() => {
                          const unlockedTopics = CONVERSATION_TOPICS.filter((t) =>
                            isPhase2TopicUnlocked(t)
                          );
                          const lastAskedTopic = lastAskedTopicId
                            ? CONVERSATION_TOPICS.find(
                                (x) => x.id === lastAskedTopicId
                              )
                            : null;
                          const relatedIds =
                            lastAskedTopic?.relatedTopicIds ?? [];
                          const lastReadSectorId =
                            readSectorIds.length > 0
                              ? readSectorIds[readSectorIds.length - 1]
                              : null;

                          const unreadTopics = unlockedTopics
                            .filter((t) => {
                              const c = topicAskCounts[t.id] ?? 0;
                              return c < t.stages.length;
                            })
                            .sort((a, b) => {
                              const getPrio = (t: ConversationTopic) => {
                                if (
                                  t.id === 'p2_deep_truth_dilemma' ||
                                  t.id === 'p2_deep_truth_confront'
                                ) {
                                  return 100;
                                }
                                if (t.id === 'p2_irritated_clash') {
                                  return 90;
                                }
                                if (
                                  t.id === 'topic_41_apologize' &&
                                  (mood < 0 || guyMood < 0)
                                ) {
                                  return 85;
                                }
                                if (t.calmsAnger && mood < 0) return 80;
                                if (
                                  t.requireSectorUnlocked &&
                                  t.requireSectorUnlocked === lastReadSectorId
                                ) {
                                  return 75;
                                }
                                if (t.id === 'p2_ask_about_dp002') return 72;
                                if (t.id === 'p2_tarlow_broken_reason') return 70;
                                if (
                                  t.id === 'p2_dp002_apologize' ||
                                  t.id === 'p2_dp002_headache_worry' ||
                                  t.id === 'p2_dp002_dist_inquiry'
                                ) return 68;
                                if (t.prioritySlot1) return 65;
                                if (relatedIds.includes(t.id)) return 60;
                                if (t.requireSectorUnlocked) return 50;
                                if (t.phase2Tab === '追求') return 40;
                                if (t.phase2Tab === '端末') return 30;
                                return 20;
                              };
                              return getPrio(b) - getPrio(a);
                            });

                          return unreadTopics;
                        })();

                    // Phase 1 の決断メニュー項目
                    const p1DecisionItems: {
                      id: string;
                      label: string;
                      onSelect: () => void;
                    }[] = [];
                    if (!linkTags.includes('phase2_started')) {
                      if (phase1AskedTopicIds.length > 0) {
                        p1DecisionItems.push({
                          id: 'p1_dec_accuse',
                          label: '『タルロウA』というのは嘘だと矛盾を指摘する',
                          onSelect: () => {
                            soundEngine.playTerminalTab();
                            setPreviewPage(0);
                            setPhase1AccuseStep('SELECT_TOPIC');
                          },
                        });
                      }
                      if (hasPhase1LockUnlocked) {
                        p1DecisionItems.push({
                          id: 'p1_dec_terminal',
                          label: '手元の端末の画面（内部記録）を本人に見せる',
                          onSelect: () => {
                            handleShowTerminalToAschPhase1();
                          },
                        });
                      }
                      p1DecisionItems.push({
                        id: 'p1_dec_return',
                        label: '『タルロウA』という主張を信じて研究所へ帰す',
                        onSelect: () => {
                          handleExecuteDecision('RETURN');
                        },
                      });
                    }

                    // 現在のモードにおける総ページ数（右上固定の [ ▶ 他の話題 ] 用）
                    const headerTotalPages = activeAschQuestion
                      ? Math.ceil(visibleAschQuestionOptions.length / PAGE_SIZE) || 1
                      : activeTopicReply
                        ? Math.ceil(visibleTopicReplyOptions.length / PAGE_SIZE) || 1
                        : isDecisionEventActive
                          ? !linkTags.includes('phase2_started')
                            ? phase1AccuseStep === 'SELECT_TOPIC'
                              ? Math.ceil(phase1AskedTopicIds.length / PAGE_SIZE) || 1
                              : phase1AccuseStep === 'SELECT_REASON'
                                ? 1
                                : Math.ceil(p1DecisionItems.length / PAGE_SIZE) || 1
                            : 1
                          : !linkTags.includes('phase2_started')
                            ? Math.ceil(sortedPhase1.length / PAGE_SIZE) || 1
                            : activeInProgressTopic
                              ? 1
                              : Math.ceil(sortedPhase2.length / PAGE_SIZE) || 1;

                    const isReplyingMode =
                      Boolean(activeAschQuestion) || Boolean(activeTopicReply);

                    // 見出し左側のテキスト
                    const headerTitleText =
                      isDecisionEventActive && !activeAschQuestion
                        ? !linkTags.includes('phase2_started') &&
                          phase1AccuseStep === 'SELECT_TOPIC'
                          ? 'いつの反応が怪しかった？'
                          : !linkTags.includes('phase2_started') &&
                              phase1AccuseStep === 'SELECT_REASON'
                            ? 'どこでボロが出た？'
                            : 'どうする？'
                        : isReplyingMode
                          ? 'どう返す？'
                          : !linkTags.includes('phase2_started')
                            ? '何について聞く？'
                            : '何について話す？';

                    const choiceListClass =
                      'relative h-[100px] flex flex-col justify-start gap-[7px] overflow-hidden';
                    const choiceBtnSizeClass =
                      'w-full max-w-[448px] min-h-[28px]';
                    const choiceInnerPyClass = 'py-1';

                    return (
                      <div className="flex flex-col gap-1.5 py-0.5 animate-[fadeIn_0.22s_ease-out]">
                        {/* 上部見出しバー：左に見出し、右にボタン群（一番右端は常に [ ▶ 他の話題 ] の固定席） */}
                        <div className="flex items-center justify-between gap-2 mb-1.5 select-none border-b border-zinc-950/20 text-[12px] font-mono tracking-wider">
                          <span className="pb-1 text-zinc-950 font-bold truncate">
                            {headerTitleText}
                          </span>

                          <div className="flex items-center justify-end gap-1.5 shrink-0">
                            {/* 右側左枠：戻る / 質問を選び直す / 話を切り上げる */}
                            {isDecisionEventActive &&
                            !activeAschQuestion &&
                            !linkTags.includes('phase2_started') &&
                            phase1AccuseStep === 'SELECT_REASON' ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  soundEngine.playTerminalTab();
                                  cycledPagesInTurnRef.current = 0;
                                  setStats((prev) => ({
                                    ...prev,
                                    choiceHoverSwitchCount:
                                      prev.choiceHoverSwitchCount + 1,
                                  }));
                                  setPreviewPage(0);
                                  setPhase1AccuseStep('SELECT_TOPIC');
                                }}
                                className="relative after:content-[''] after:absolute after:-inset-y-2 after:-inset-x-1 pb-1 text-[11px] text-zinc-700 hover:text-black cursor-pointer whitespace-nowrap"
                              >
                                [ ◀ 質問を選び直す ]
                              </button>
                            ) : isDecisionEventActive &&
                              !activeAschQuestion &&
                              !linkTags.includes('phase2_started') &&
                              phase1AccuseStep === 'SELECT_TOPIC' ? (
                              phase1QuestionsCount < 5 ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    soundEngine.playTerminalTab();
                                    cycledPagesInTurnRef.current = 0;
                                    setStats((prev) => ({
                                      ...prev,
                                      choiceHoverSwitchCount:
                                        prev.choiceHoverSwitchCount + 1,
                                    }));
                                    setPreviewPage(0);
                                    setPhase1AccuseStep('NONE');
                                  }}
                                  className="relative after:content-[''] after:absolute after:-inset-y-2 after:-inset-x-1 pb-1 text-[11px] text-zinc-700 hover:text-black cursor-pointer whitespace-nowrap"
                                >
                                  [ ◀ 戻る ]
                                </button>
                              ) : null
                            ) : isDecisionEventActive &&
                              !activeAschQuestion &&
                              !isPhase1LimitReached &&
                              displayedRegularTopics.length > 0 ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  soundEngine.playTerminalTab();
                                  cycledPagesInTurnRef.current = 0;
                                  setStats((prev) => ({
                                    ...prev,
                                    choiceHoverSwitchCount:
                                      prev.choiceHoverSwitchCount + 1,
                                  }));
                                  setPreviewPage(0);
                                  setIsDecisionMenuOpen(false);
                                }}
                                className="relative after:content-[''] after:absolute after:-inset-y-2 after:-inset-x-1 pb-1 text-[11px] text-zinc-700 hover:text-black cursor-pointer whitespace-nowrap"
                              >
                                [ ◀ 話題に戻る ]
                              </button>
                            ) : !isDecisionEventActive &&
                              !isHardForcedEvent &&
                              showDecisionOption ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  soundEngine.playTerminalTab();
                                  cycledPagesInTurnRef.current = 0;
                                  setPreviewPage(0);
                                  setIsDecisionMenuOpen(true);
                                }}
                                className="relative after:content-[''] after:absolute after:-inset-y-2 after:-inset-x-1 pb-1 text-[11px] text-zinc-600 hover:text-black cursor-pointer whitespace-nowrap transition-colors"
                                title="話を切り上げてアッシュの処遇を決める"
                              >
                                [ 話を切り上げる ]
                              </button>
                            ) : null}

                            {/* 右端固定枠：[ ▶ 他の話題 ]（他ページがない時はグレーアウトで常時配置） */}
                            <button
                              disabled={headerTotalPages <= 1}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (headerTotalPages <= 1) return;
                                soundEngine.playTerminalTab();
                                setPreviewPage((p) => {
                                  if (p + 1 >= headerTotalPages) {
                                    cycledPagesInTurnRef.current += 1;
                                    return 0;
                                  }
                                  return p + 1;
                                });
                              }}
                              className={`relative after:content-[''] after:absolute after:-inset-y-2 after:-inset-x-1.5 pb-1 text-[11px] whitespace-nowrap select-none transition-colors ${
                                headerTotalPages > 1
                                  ? 'text-zinc-800 font-semibold hover:text-black active:text-zinc-500 cursor-pointer'
                                  : 'text-zinc-400/75 cursor-default pointer-events-none'
                              }`}
                              title={
                                headerTotalPages > 1
                                  ? '次のページへ切り替え'
                                  : undefined
                              }
                            >
                              {isReplyingMode
                                ? '[ ▶ 他の返答 ]'
                                : '[ ▶ 他の話題 ]'}
                            </button>
                          </div>
                        </div>

                        {activeAschQuestion ? (
                          /* ① アッシュからの問いかけ（1ページ最大3件・1行固定） */
                          (() => {
                            const totalPages =
                              Math.ceil(visibleAschQuestionOptions.length / PAGE_SIZE) || 1;
                            const safePage = Math.min(previewPage, totalPages - 1);
                            const currentSlice = visibleAschQuestionOptions.slice(
                              safePage * PAGE_SIZE,
                              safePage * PAGE_SIZE + PAGE_SIZE
                            );

                            return (
                              <div className={choiceListClass}>
                                {currentSlice.map((opt) => (
                                  <button
                                    key={opt.id}
                                    disabled={isInteractionBlocked}
                                    {...getChoiceHesitationHandlers(opt.id)}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPreviewPage(0);
                                      handleSelectAschQuestionReply(opt);
                                    }}
                                    className={`${choiceBtnSizeClass} group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1 disabled:pointer-events-none`}
                                  >
                                    <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                    <div className={`flex flex-col justify-center ${choiceInnerPyClass} min-w-0`}>
                                      <span className="text-[12.5px] leading-snug text-zinc-900 group-hover:text-black whitespace-nowrap truncate">
                                        {opt.thoughtText}
                                      </span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            );
                          })()
                        ) : activeTopicReply ? (
                          /* ①-2 進行中の話題に対するガイの複数リアクション選択肢（1ページ最大3件・1行固定） */
                          (() => {
                            const totalPages =
                              Math.ceil(visibleTopicReplyOptions.length / PAGE_SIZE) || 1;
                            const safePage = Math.min(previewPage, totalPages - 1);
                            const currentSlice = visibleTopicReplyOptions.slice(
                              safePage * PAGE_SIZE,
                              safePage * PAGE_SIZE + PAGE_SIZE
                            );

                            return (
                              <div className={choiceListClass}>
                                {currentSlice.map((opt) => (
                                  <button
                                    key={opt.id}
                                    disabled={isInteractionBlocked}
                                    {...getChoiceHesitationHandlers(opt.id)}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPreviewPage(0);
                                      handleSelectTopicReplyOption(opt);
                                    }}
                                    className={`${choiceBtnSizeClass} group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1 disabled:pointer-events-none`}
                                  >
                                    <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                    <div className={`flex flex-col justify-center ${choiceInnerPyClass} min-w-0`}>
                                      <span className="text-[12.5px] leading-snug text-zinc-900 group-hover:text-black whitespace-nowrap truncate">
                                        {opt.thoughtText}
                                      </span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            );
                          })()
                        ) : isDecisionEventActive ? (
                          /* ② イベント決断メニュー（話を切り上げる/質問上限到達：通常話題リストと同じ高さ・最大3件1行固定） */
                          <div className={`${choiceListClass} overflow-hidden`}>
                            {!linkTags.includes('phase2_started') ? (
                              /* フェーズ1決断・ボロ指摘メニュー */
                              phase1AccuseStep === 'SELECT_TOPIC' ? (
                                (() => {
                                  const orderedTopicIds = phase1AskedTopicIds;
                                  const totalPages =
                                    Math.ceil(orderedTopicIds.length / PAGE_SIZE) || 1;
                                  const safePage = Math.min(
                                    previewPage,
                                    totalPages - 1
                                  );
                                  const currentSlice = orderedTopicIds.slice(
                                    safePage * PAGE_SIZE,
                                    safePage * PAGE_SIZE + PAGE_SIZE
                                  );

                                  return (
                                    <div className={choiceListClass}>
                                      {currentSlice.map((tid) => {
                                        const cfg = PHASE1_TOPIC_SLIP_CONFIGS[tid];
                                        const label =
                                          cfg?.shortLabel ?? 'さっきの質問のとき';
                                        return (
                                          <button
                                            key={tid}
                                            {...getChoiceHesitationHandlers(`accuse-${tid}`)}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              soundEngine.playTerminalTab();
                                              setPhase1AccusedTopicId(tid);
                                              setPhase1ReasonChoices(
                                                buildPhase1ReasonChoices(tid)
                                              );
                                              setPhase1AccuseStep('SELECT_REASON');
                                            }}
                                            className={`${choiceBtnSizeClass} group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1`}
                                          >
                                            <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                            <div className={`flex flex-col justify-center ${choiceInnerPyClass} min-w-0`}>
                                              <span className="text-[12.5px] leading-snug text-zinc-900 group-hover:text-black whitespace-nowrap truncate">
                                                {label}
                                              </span>
                                            </div>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  );
                                })()
                              ) : phase1AccuseStep === 'SELECT_REASON' &&
                                phase1AccusedTopicId ? (
                                <div className={choiceListClass}>
                                  {phase1ReasonChoices.map((choice) => (
                                    <button
                                      key={choice.id}
                                      {...getChoiceHesitationHandlers(`reason-${choice.id}`)}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleExecutePhase1Accusation(
                                          phase1AccusedTopicId,
                                          choice
                                        );
                                      }}
                                      className={`${choiceBtnSizeClass} group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1`}
                                    >
                                      <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                      <div className={`flex flex-col justify-center ${choiceInnerPyClass} min-w-0`}>
                                        <span className="text-[12.5px] leading-snug text-zinc-900 group-hover:text-black whitespace-nowrap truncate">
                                          {choice.label}
                                        </span>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                (() => {
                                  const totalPages =
                                    Math.ceil(p1DecisionItems.length / PAGE_SIZE) || 1;
                                  const safePage = Math.min(previewPage, totalPages - 1);
                                  const currentSlice = p1DecisionItems.slice(
                                    safePage * PAGE_SIZE,
                                    safePage * PAGE_SIZE + PAGE_SIZE
                                  );

                                  return (
                                    <div className={choiceListClass}>
                                      {currentSlice.map((item) => (
                                        <button
                                          key={item.id}
                                          {...getChoiceHesitationHandlers(item.id)}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            item.onSelect();
                                          }}
                                          className={`${choiceBtnSizeClass} group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1`}
                                        >
                                          <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                          <div className={`flex flex-col justify-center ${choiceInnerPyClass} min-w-0`}>
                                            <span className="text-[12.5px] leading-snug text-zinc-900 group-hover:text-black whitespace-nowrap truncate">
                                              {item.label}
                                            </span>
                                          </div>
                                        </button>
                                      ))}
                                    </div>
                                  );
                                })()
                              )
                            ) : (
                              /* フェーズ2決断メニュー */
                              <>
                                <button
                                  {...getChoiceHesitationHandlers('p2_dec_keep')}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleExecuteDecision('KEEP');
                                  }}
                                  className={`${choiceBtnSizeClass} group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1`}
                                >
                                  <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                  <div className={`flex flex-col justify-center ${choiceInnerPyClass}`}>
                                    <span className="text-[13px] leading-snug text-zinc-900 group-hover:text-black">
                                      少し休んでいけと声をかける
                                    </span>
                                  </div>
                                </button>

                                <button
                                  {...getChoiceHesitationHandlers('p2_dec_return')}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleExecuteDecision('RETURN');
                                  }}
                                  className={`${choiceBtnSizeClass} group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1`}
                                >
                                  <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                  <div className={`flex flex-col justify-center ${choiceInnerPyClass}`}>
                                    <span className="text-[13px] leading-snug text-zinc-900 group-hover:text-black">
                                      ディストの研究所へ帰す
                                    </span>
                                  </div>
                                </button>

                                {linkTags.includes('sec19_unlocked') && (
                                  <button
                                    {...getChoiceHesitationHandlers('p2_dec_destroy')}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleExecuteDecision('DESTROY');
                                    }}
                                    className={`${choiceBtnSizeClass} group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1`}
                                  >
                                    <div className="w-[3px] shrink-0 mr-2.5 bg-red-700 group-hover:bg-red-900 transition-colors" />
                                    <div className={`flex flex-col justify-center ${choiceInnerPyClass}`}>
                                      <span className="text-[13px] leading-snug text-red-700 group-hover:text-red-900 font-medium">
                                        首裏のスイッチで機能停止させる
                                      </span>
                                    </div>
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        ) : (
                          /* ③ 通常会話時：話題リスト */
                          <>
                            {(() => {
                              if (!linkTags.includes('phase2_started')) {
                                const totalPages =
                                  Math.ceil(sortedPhase1.length / PAGE_SIZE) || 1;
                                const safePage = Math.min(
                                  previewPage,
                                  totalPages - 1
                                );
                                const currentSlice = sortedPhase1.slice(
                                  safePage * PAGE_SIZE,
                                  safePage * PAGE_SIZE + PAGE_SIZE
                                );

                                return (
                                  <div className={choiceListClass}>
                                    {currentSlice.map((topic) => {
                                      const isRead = phase1AskedTopicIds.includes(
                                        topic.id
                                      );

                                      return (
                                        <button
                                          key={topic.id}
                                          disabled={isInteractionBlocked || isRead}
                                          {...(!isRead
                                            ? getChoiceHesitationHandlers(topic.id)
                                            : {})}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (isRead) return;
                                            handleSelectTopic(topic);
                                          }}
                                          className={`${choiceBtnSizeClass} group text-left flex items-stretch transition-all duration-300 ease-out ${
                                            isRead
                                              ? 'opacity-35 cursor-default'
                                              : 'opacity-100 cursor-pointer hover:translate-x-1'
                                          }`}
                                        >
                                          <div
                                            className={`w-[3px] shrink-0 mr-2.5 transition-colors duration-300 ${
                                              isRead
                                                ? 'bg-zinc-400'
                                                : 'bg-zinc-900 group-hover:bg-black'
                                            }`}
                                          />
                                          <div className={`flex flex-col justify-center ${choiceInnerPyClass} min-w-0`}>
                                            <span
                                              className={`text-[12.5px] leading-snug whitespace-nowrap truncate transition-colors duration-300 ${
                                                isRead
                                                  ? 'text-zinc-500'
                                                  : 'text-zinc-900 group-hover:text-black'
                                              }`}
                                            >
                                              {topic.thoughtText}
                                            </span>
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                );
                              }

                              const totalPages = activeInProgressTopic
                                ? 1
                                : Math.ceil(sortedPhase2.length / PAGE_SIZE) || 1;
                              const safePage = activeInProgressTopic
                                ? 0
                                : Math.min(previewPage, totalPages - 1);
                              const currentSlice = sortedPhase2.slice(
                                safePage * PAGE_SIZE,
                                safePage * PAGE_SIZE + PAGE_SIZE
                              );

                              return (
                                <div className={choiceListClass}>
                                  {currentSlice.map((topic) => {
                                    const askCount = topicAskCounts[topic.id] ?? 0;
                                    const isCompleted =
                                      askCount >= topic.stages.length;
                                    const stageIdx = Math.min(
                                      topic.stages.length - 1,
                                      askCount
                                    );
                                    const isBackedOff = linkTags.includes(
                                      `backed_off_${topic.id}`
                                    );
                                    const label =
                                      (isBackedOff &&
                                        topic.stages[stageIdx]?.retryThoughtText) ||
                                      topic.stages[stageIdx]?.thoughtText ||
                                      topic.thoughtText;

                                    return (
                                      <button
                                        key={topic.id}
                                        disabled={isInteractionBlocked || isCompleted}
                                        {...(!isCompleted
                                          ? getChoiceHesitationHandlers(topic.id)
                                          : {})}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (isCompleted) return;
                                          handleSelectTopic(topic);
                                        }}
                                        className={`${choiceBtnSizeClass} group text-left flex items-stretch transition-all duration-300 ease-out ${
                                          isCompleted
                                            ? 'opacity-35 cursor-default'
                                            : 'opacity-100 cursor-pointer hover:translate-x-1'
                                        }`}
                                      >
                                        <div
                                          className={`w-[3px] shrink-0 mr-2.5 transition-colors duration-300 ${
                                            isCompleted
                                              ? 'bg-zinc-400'
                                              : 'bg-zinc-900 group-hover:bg-black'
                                          }`}
                                        />
                                        <div className={`flex flex-col justify-center ${choiceInnerPyClass} min-w-0`}>
                                          <span
                                            className={`text-[12.5px] leading-snug whitespace-nowrap truncate transition-colors duration-300 ${
                                              isCompleted
                                                ? 'text-zinc-500'
                                                : 'text-zinc-900 group-hover:text-black'
                                            }`}
                                          >
                                            {label}
                                          </span>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              );
                            })()}
                          </>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* 右側：アッシュの立ち絵 */}
              <div
                className={`relative z-20 w-[42%] h-full flex items-end justify-center pointer-events-none transition-all duration-500 ease-in ${
                  isAschCollapsed
                    ? 'opacity-0 translate-y-28 scale-95'
                    : isAschExited
                    ? 'opacity-0'
                    : 'opacity-100 translate-y-0 scale-100'
                }`}
              >
                <AschPortrait
                  expression={activeExpression}
                  faceParts={activeFaceParts}
                  availableRootFiles={availableRootFiles}
                  availablePartFiles={availablePartFiles}
                  customTestPngSrc={customTestPng}
                  customPartMap={customPartMap}
                  onSelectTestPngFile={(file) => handleLoadImageFile(file)}
                  blurPx={bgBlurPx}
                  motionTuning={motionTuning}
                  replayPulse={replayPulse}
                  eyeGlitchPulse={eyeGlitchPulse}
                />

                {/* 頭部インタラクション（触る・撫でるタップ判定） */}
                {!isAschCollapsed && !isAschExited && (
                  <button
                    type="button"
                    title={
                      !linkTags.includes('phase2_started')
                        ? '頭に手を伸ばす'
                        : '頭を撫でる'
                    }
                    aria-label="アッシュの頭部を触る"
                    disabled={
                      isInteractionBlocked ||
                      isTerminalOpen ||
                      isDialogueLogOpen ||
                      isManualOpen ||
                      isSequencing
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHeadPat();
                    }}
                    style={{
                      cursor: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 24 24'%3E%3Cpath d='M 14 21 C 17 21, 18.5 18, 18.5 14 V 9.5 A 1.1 1.1 0 0 0 16.5 9.5 V 12.5 C 16.5 12.8, 16 12.8, 16 12.5 V 7 A 1.1 1.1 0 0 0 13.8 7 V 11.5 C 13.8 11.8, 13.3 11.8, 13.3 11.5 V 4.5 A 1.1 1.1 0 0 0 11.1 4.5 V 11.5 C 11.1 11.8, 10.6 11.8, 10.6 11.5 V 7 A 1.1 1.1 0 0 0 8.4 7 V 13.2 C 8.4 14, 7.5 14.5, 6.8 14.2 L 4.2 12.6 A 1.1 1.1 0 0 0 3 14.2 L 6.2 18 C 7.2 19.8, 8 21, 10 21 Z' fill='%23ffffff' stroke='%2318181b' stroke-width='1.0' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M 16.2 12.5 V 14.5 M 13.5 11.5 V 14.5 M 10.8 11.5 V 14' fill='none' stroke='%2318181b' stroke-width='0.9' stroke-linecap='round'/%3E%3C/svg%3E") 11 4, grab`,
                    }}
                    className={`absolute top-[2%] left-1/2 -translate-x-1/2 w-[180px] h-[95px] z-30 rounded-t-full cursor-grab active:cursor-grabbing pointer-events-auto transition-transform active:scale-95 focus:outline-none ${
                      isInteractionBlocked ||
                      isTerminalOpen ||
                      isDialogueLogOpen ||
                      isManualOpen ||
                      isSequencing
                        ? 'pointer-events-none opacity-0'
                        : ''
                    }`}
                  />
                )}
              </div>

              {/* 表情・パーツ挙動ビューワー（左半分に展開し、右側の立ち絵をそのままリアルタイム確認） */}
              <ExpressionDebugModal
                isOpen={isDebugViewerOpen}
                onClose={() => {
                  setIsDebugViewerOpen(false);
                  setDebugPreviewState(null);
                }}
                activeExpression={activeExpression}
                activeFaceParts={activeFaceParts}
                isPreviewOverrideActive={Boolean(debugPreviewState)}
                onApplyPreview={(expr, parts) => {
                  setDebugPreviewState({
                    expression: expr,
                    faceParts: parts,
                  });
                }}
                onClearPreviewOverride={() => {
                  setDebugPreviewState(null);
                  setReplayPulse((p) => p + 1);
                }}
                motionTuning={motionTuning}
                onChangeMotionTuning={setMotionTuning}
                onReplayMotion={() => setReplayPulse((p) => p + 1)}
                seenFaceParts={achievementSave.seenFacePartKeys}
                isBonusMode={!DEBUG_VIEWER_ALWAYS_VISIBLE && isBonusViewerUnlocked}
              />

              {/* 端末展開時：背後の選択肢への誤タップ防止オーバーレイ */}
              <div
                onClick={(e) => {
                  if (isTerminalOpen) {
                    e.stopPropagation();
                  }
                }}
                className={`absolute inset-0 z-[25] transition-opacity duration-300 ${
                  isTerminalOpen
                    ? 'bg-black/15 opacity-100 pointer-events-auto'
                    : 'bg-transparent opacity-0 pointer-events-none'
                }`}
              />

              {/* 下からせり出す手持ちデータ端末（tanmatu.png） */}
              <DataTerminalModal
                isOpen={isTerminalOpen}
                isCompactViewport={isCompactViewport}
                isPortraitRotated={isPortraitRotated}
                mood={mood}
                sectors={sectors}
                oralInfos={oralInfos}
                logs={logs}
                customTanmatuSrc={customTanmatuPng}
                onSelectTanmatuFile={(file) => handleLoadImageFile(file, 'tanmatu')}
                onOverrideSector={handleOverrideSector}
                onReadSector={handleReadSector}
              />

              {/* セリフログ */}
              <DialogueLogModal
                isOpen={isDialogueLogOpen}
                onClose={() => setIsDialogueLogOpen(false)}
                entries={dialogueHistory}
              />

              {/* 説明書モーダル */}
              <ManualModal
                isOpen={isManualOpen}
                onClose={() => setIsManualOpen(false)}
              />
            </main>

            {/* 下部黒帯フッター */}
            <footer className="relative z-30 w-full h-[44px] bg-[#08080a] text-zinc-200 flex items-center justify-end px-5 border-t border-zinc-900 shrink-0">
              <div className="flex items-center">
                {/* 管理端末ボタン（見た目は上部ボタンと揃えた小ぶりなサイズ・透明タップ判定を周囲に拡大） */}
                <button
                  onClick={handleToggleTerminal}
                  title="管理端末"
                  className={`relative after:content-[''] after:absolute after:-inset-y-2.5 after:-inset-x-4 px-2.5 py-0.5 flex items-center gap-1.5 text-[11.5px] border transition-colors cursor-pointer ${
                    isTerminalOpen
                      ? 'bg-zinc-200 text-zinc-950 border-zinc-100'
                      : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  <svg
                    className="w-3 h-3 stroke-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <line x1="7" y1="12" x2="7.01" y2="12" />
                  </svg>
                  <span>管理端末</span>

                  {hasUnreadSector && !isTerminalOpen && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                  )}
                </button>
              </div>
            </footer>
          </>
        )}
        </div>
      </div>

      {/* シナリオ台本（全セリフ・全表情・全演出の実機プレビュー） */}
      <ScenarioInspectorModal
        isOpen={isScenarioInspectorOpen}
        onClose={handleCloseScenarioInspector}
        onPreviewLine={handlePreviewInspectorSingleLine}
        onPreviewSequence={handlePreviewInspectorSequence}
        onStopPlayback={handleStopInspectorPlayback}
        onSkipAdvance={handleSkipCurrentDelay}
        onApplyFaceOnly={(expr, parts) => {
          soundEngine.unlockOnUserInteraction();
          if (gamePhase !== 'PLAYING') {
            setGamePhase('PLAYING');
            soundEngine.setPlayingPhase(true);
          }
          setOverrideExpression(expr);
          if (parts) {
            setOverrideFaceParts((prev) => ({
              ...(prev ?? DEFAULT_EXPRESSION_PARTS[expr]),
              ...parts,
            }));
          }
          setReplayPulse((p) => p + 1);
        }}
        onClearPreview={() => {
          clearPendingSequence();
          setOverrideExpression(null);
          setOverrideFaceParts(null);
          setDebugPreviewState(null);
          setVisibleBubbles([]);
        }}
        activeExpression={activeExpression}
        activeFaceParts={activeFaceParts}
        availableRootFiles={availableRootFiles}
        availablePartFiles={availablePartFiles}
        customTestPngSrc={customTestPng}
        customPartMap={customPartMap}
        motionTuning={motionTuning}
        viewMode={inspectorViewMode}
        onChangeViewMode={setInspectorViewMode}
      />
    </div>
  );
}
