/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  ExpressionId,
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
} from './components/AschPortrait';
import { DataTerminalModal } from './components/DataTerminalModal';
import { DialogueLogModal } from './components/DialogueLogModal';
import { ManualModal } from './components/ManualModal';
import { ObservationReport } from './components/ObservationReport';
import { soundEngine } from './utils/chiptuneAudio';
import { getAssetUrl } from './utils/assetPath';
import './game.css';

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

const GLITCH_CHARS = ['▒', '░', '▓', '■', '□', '◆', '◇', '※', '〓', '〒'];

const PROLOGUE_LINES: string[] = [
  '「ルーク」がタタル渓谷へ帰ってきてから、1年が経った。',
  'ディストの私設研究所を訪れた俺は、研究室の隅にいた『10歳当時のアッシュ』と瓜二つの機体を見つけた。',
  'とてもそのままにはしておけず連れ出そうとした俺に、ディストは「これを持っていきなさい」と一枚の管理端末をよこした。',
  'そして俺の部屋へ連れ込んだものの――そいつは俺の顔を見ても知らないふりをして、『俺は自律機械タルロウAだ』と言い張り続けている。',
];

const corruptString = (source: string, intensity: number): string => {
  const chars = Array.from(source);
  return chars
    .map((ch) => {
      if (ch === '\n' || ch === ' ' || ch === '　') return ch;
      if (Math.random() < intensity) {
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      return ch;
    })
    .join('');
};

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

interface AschBubbleItemProps {
  text: string;
  effect: BubbleVoiceEffect;
}

const AschBubbleItem: React.FC<AschBubbleItemProps> = ({
  text,
  effect,
}) => {
  const isGlitchy =
    effect === 'glitch' ||
    effect === 'shout_glitch' ||
    effect === 'tremble_glitch';

  const isShout = effect === 'shout' || effect === 'shout_glitch';
  const isTremble = effect === 'tremble' || effect === 'tremble_glitch';

  const [displayText, setDisplayText] = useState<string>(() =>
    isGlitchy ? corruptString(text, 0.42) : text
  );

  useEffect(() => {
    if (!isGlitchy) {
      setDisplayText(text);
      return;
    }

    setDisplayText(corruptString(text, 0.42));

    const step1 = window.setTimeout(() => {
      setDisplayText(corruptString(text, 0.18));
    }, 80);

    const step2 = window.setTimeout(() => {
      setDisplayText(text);
    }, 170);

    let decodeStep1: number | undefined;
    let decodeStep2: number | undefined;

    const periodicTimer = window.setInterval(() => {
      if (Math.random() < 0.65) {
        setDisplayText(corruptString(text, 0.18));
        decodeStep1 = window.setTimeout(() => {
          setDisplayText(corruptString(text, 0.08));
        }, 70);
        decodeStep2 = window.setTimeout(() => {
          setDisplayText(text);
        }, 145);
      }
    }, 680);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      if (decodeStep1) clearTimeout(decodeStep1);
      if (decodeStep2) clearTimeout(decodeStep2);
      clearInterval(periodicTimer);
    };
  }, [text, isGlitchy, effect]);

  const bubbleEffectClass =
    effect === 'shout'
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
      className={`relative w-fit max-w-[335px] bg-[#09090b] text-zinc-100 px-3.5 py-2 ${bubbleEffectClass}`}
    >
      {isGlitchy && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="glitch-scanline-red" />
          <div className="glitch-scanline-blue" />
        </div>
      )}

      <p
        className={`relative z-10 whitespace-pre-wrap break-words ${textSizeClass} ${textEffectClass}`}
      >
        {displayText}
      </p>

      {/* 右向きポインタ */}
      <div className="w-0 h-0 absolute -right-[10px] top-2.5 border-y-[7px] border-y-transparent border-l-[11px] border-l-[#09090b]" />
    </div>
  );
};

interface QueuedStep {
  delayMs: number;
  action: () => void;
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

export default function App() {
  // === 16:9 (800x450) 固定キャンバスの拡大・縮小スケール計算 ＆ スマホ縦持ち時の横画面自動回転 ===
  const [stageScale, setStageScale] = useState<number>(1);
  const [isPortraitRotated, setIsPortraitRotated] = useState<boolean>(false);
  const [isCompactViewport, setIsCompactViewport] = useState<boolean>(false);

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const portrait = h > w;
      setIsPortraitRotated(portrait);

      const effectiveW = portrait ? h : w;
      const effectiveH = portrait ? w : h;
      const scale = Math.min(effectiveW / STAGE_WIDTH, effectiveH / STAGE_HEIGHT);
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
  }, []);

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
    soundEngine.setPlayingPhase(gamePhase === 'PLAYING');
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
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<string[]>([]);
  const [aschQuestionsDisabled, setAschQuestionsDisabled] =
    useState<boolean>(false);
  const [lastAskedTopicId, setLastAskedTopicId] = useState<string | null>(null);
  const [lastRefusedTopicId, setLastRefusedTopicId] = useState<string | null>(null);

  // 『┃ アッシュをどうするか決める』を押した際の決断サブメニュー開閉
  const [isDecisionMenuOpen, setIsDecisionMenuOpen] = useState<boolean>(false);

  const [visibleBubbles, setVisibleBubbles] = useState<ScreenBubble[]>([]);
  const [isSequencing, setIsSequencing] = useState<boolean>(false);
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
    nextAngryGlanceAtSecRef.current = Math.floor(10 + Math.random() * 9);
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
  const lastMilestoneQuestionTurnRef = useRef<number>(0);
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

  const activeExpression: ExpressionId = overrideExpression ?? baseMoodExpression;

  // 現在の場面・機嫌に応じた「眉・目・口・感情」の組み合わせ算出
  const computedSceneParts: FaceParts = (() => {
    const basePreset =
      DEFAULT_EXPRESSION_PARTS[activeExpression] || DEFAULT_EXPRESSION_PARTS.normal;
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

  const activeFaceParts: FaceParts = computedSceneParts;

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

  const handleSkipCurrentDelay = () => {
    soundEngine.unlockOnUserInteraction();
    if (!isSequencing || pendingStepsRef.current.length === 0) return;
    if (isTerminalOpen || isDialogueLogOpen || isManualOpen) return;

    if (activeTimeoutRef.current !== null) {
      window.clearTimeout(activeTimeoutRef.current);
      activeTimeoutRef.current = null;
    }
    const step = pendingStepsRef.current.shift();
    if (step) {
      step.action();
    }
    runNextQueuedStep();
  };

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
            const explicitLines = b.text.split('\n').reduce((acc, line) => {
              return acc + Math.max(1, Math.ceil(line.length / 22));
            }, 0);
            return sum + 22 + explicitLines * 19 + 8;
          }, 0);

        while (
          next.length > 1 &&
          (next.length > MAX_VISIBLE_BUBBLES || calcTotalHeight(next) > 202)
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
    []
  );

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
          if (idx < 3) {
            const pool = !linkTags.includes('phase2_started')
              ? AWAY_RETURN_REACTIONS.phase1
              : mood < 0
                ? AWAY_RETURN_REACTIONS.angry
                : AWAY_RETURN_REACTIONS.normal;
            const reaction = pool[idx] ?? pool[pool.length - 1];
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

      // Phase 3（終幕の問いかけ：「おまえから見て、今の俺は誰に見える？」）で30秒間無言だった場合 → 選択肢5（無言タイムアウト）へ分岐
      if (
        activeTopicReply?.topicId === 'p3_final_who_am_i' &&
        idleMs > 30000
      ) {
        idleStageRef.current = 1;
        choiceShownAtRef.current = Date.now();
        setStats((prev) => ({
          ...prev,
          idleTimeoutCount: prev.idleTimeoutCount + 1,
        }));
        appendLog(
          'INFO',
          'RESPONSE TIMEOUT // QUERY WITHDRAWN'
        );
        setActiveTopicReply({
          topicId: 'p3_final_silent_followup',
          options: PHASE3_SILENT_TIMEOUT_OPTIONS,
        });
        playAschReactionLines(
          '・・・・・・。\n・・・・・・いや、いい。忘れてくれ。\nおまえにこんなことを聞いた俺が馬鹿だった。',
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

      if (
        activeTopicReply?.topicId === 'p3_final_silent_followup' &&
        idleMs > 30000
      ) {
        setActiveTopicReply(null);
        setCustomEndingKey('END_PHASE3_SILENCE');
        setStats((prev) => ({
          ...prev,
          idleTimeoutCount: prev.idleTimeoutCount + 1,
          endTime: Date.now(),
        }));
        setEndingStep(0);
        setGamePhase('ENDING');
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
          angryGlanceEndAtSecRef.current = currentWaitSec + 4;
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
              expression: 'look_away',
              faceParts: {
                brow: 'sad',
                eyes: 'down',
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

  // === データ端末の開閉（無操作で閉じた際の覗き見リアクション） ===
  const handleToggleTerminal = () => {
    setIsDialogueLogOpen(false);
    if (!isTerminalOpen) {
      soundEngine.playTerminalOpen();
      setIsTerminalOpen(true);
      setHasUnreadSector(false);
      terminalOpenedAtRef.current = Date.now();
      terminalActionTakenRef.current = false;
      setStats((prev) => ({
        ...prev,
        terminalOpenCount: prev.terminalOpenCount + 1,
      }));
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

        // DP-019（SEC-19）と DP-020（SEC-20）の両方を解除して端末を閉じた場合のみクライマックス対話へ突入する
        if (pendingClimaxDilemmaRef.current) {
          setPreviewTab('端末');
          setPreviewPage(0);
          const isDilemmaUnread =
            (topicAskCounts['p2_deep_truth_dilemma'] ?? 0) === 0;
          const isSec19Unlocked = sectors.some(
            (s) => s.id === 'SEC-19' && s.unlocked
          );
          const isSec20Unlocked = sectors.some(
            (s) => s.id === 'SEC-20' && s.unlocked
          );

          if (isDilemmaUnread && isSec19Unlocked && isSec20Unlocked) {
            pendingClimaxDilemmaRef.current = false;
            const dilemmaTopic = CONVERSATION_TOPICS.find(
              (t) => t.id === 'p2_deep_truth_dilemma'
            );
            if (dilemmaTopic) {
              if (isSequencing || isSequencingRef.current) {
                clearPendingSequence();
                isSequencingRef.current = false;
                setIsSequencing(false);
              }
              terminalOpenedAtRef.current = null;
              setActiveTopicReply(null);
              setActiveAschQuestion(null);
              handleSelectTopic(dilemmaTopic);
              return;
            }
          }
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
    setIsDecisionMenuOpen(false);

    const qLines = FINAL_ASCH_QUESTION_LINE.split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const steps: QueuedStep[] = qLines.map((line, idx) => ({
      delayMs: idx === 0 ? 320 : 980,
      action: () => {
        if (idx === 0) {
          setOverrideExpression('normal');
          setOverrideFaceParts({
            brow: 'sad',
            eyes: 'normal',
            mouth: 'close',
            effects: [],
          });
          appendLog(
            'INFO',
            'PHASE 3 TRANSITION // FINAL IDENTITY QUERY DETECTED'
          );
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

  // === Phase 3（終幕の問いかけ：「……おまえから見て、俺は誰に見える？」）発生条件判定 ===
  // 軸A（身体・造り物としての屈辱）、軸B（居場所・過去の喪失）、軸C（記憶の欠落・ガイとの因縁）から
  // それぞれ最低1つ以上、かつ合計4つ以上の深い対話を終えている場合に発生する
  const isDeepTopicDone = useCallback(
    (topicId: string): boolean => {
      if (topicId === 'p2_why_hide_truth') {
        return (
          linkTags.includes('p2_heard_true_reason') ||
          sectors.some((s) => s.id === 'SEC-12' && s.unlocked)
        );
      }
      if (topicId === 'p2_deep_truth_dilemma') {
        return (
          linkTags.includes('p2_dilemma_resolved') ||
          linkTags.includes('climax_ready')
        );
      }
      return (topicAskCounts[topicId] ?? 0) >= 1;
    },
    [linkTags, sectors, topicAskCounts]
  );

  const deepAxisACount = [
    'p2_tarlow_past',
    'p2_sword_limiter',
    'p2_why_10yo_body',
    'p2_sleep_and_dreams',
    'p2_voice_discomfort',
    'p2_unscarred_hands',
  ].filter(isDeepTopicDone).length;

  const deepAxisBCount = [
    'p2_friends_news',
    'p2_why_hide_truth',
    'p2_future_whereabouts',
    'p2_lab_pastime',
    'p2_jade_suspicion',
  ].filter(isDeepTopicDone).length;

  const deepAxisCCount = [
    'p2_eldrant_and_blank',
    'p2_tarlow_broken_reason',
    'p2_deep_truth_dilemma',
    'p2_manor_memories',
    'p2_parents_thought',
  ].filter(isDeepTopicDone).length;

  const hasEnoughDeepTalkForPhase3 =
    deepAxisACount >= 1 &&
    deepAxisBCount >= 1 &&
    deepAxisCCount >= 1 &&
    deepAxisACount + deepAxisBCount + deepAxisCCount >= 4;

  // === 『話を切り上げる』からの終了処理（フェーズに応じた結末へ遷移） ===
  const handleExecuteDecision = (disposition: EndingDisposition) => {
    if (isTerminalOpen || isDialogueLogOpen || isManualOpen || isSequencing) {
      return;
    }
    // Phase 2で軸A・B・Cそれぞれ1つ以上（計4つ以上）の深い話を経ている場合は、Phase 3（終幕の問いかけ）へ移行する
    if (
      linkTags.includes('phase2_started') &&
      disposition !== 'DESTROY' &&
      hasEnoughDeepTalkForPhase3
    ) {
      handleStartPhase3Question();
      return;
    }
    soundEngine.unlockOnUserInteraction();
    setIsDecisionMenuOpen(false);
    setCustomEndingKey(null);
    setEndingDisposition(disposition);

    const resolvedKey = resolveEndingKey(disposition, endingApproach);
    const decisionData =
      FINAL_DECISION_STAGES[resolvedKey] ||
      FINAL_DECISION_STAGES.END_PHASE2_ASCH;

    const guyLines = decisionData.spokenText
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
          pushScreenBubble('GUY', line, 'normal');
        },
      });
    });

    const lastGuyLineLen =
      guyLines.length > 0 ? guyLines[guyLines.length - 1].length : 6;

    const closingLines = decisionData.aschText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    closingLines.forEach((line, idx) => {
      const delay =
        idx === 0
          ? Math.min(1400, Math.max(950, lastGuyLineLen * 32))
          : Math.min(1350, Math.max(820, closingLines[idx - 1].length * 36));
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
          }
          pushScreenBubble('ASCH', line, baseEff);
        },
      });
    });

    steps.push({
      delayMs: 1300,
      action: () => {
        setStats((prev) => ({
          ...prev,
          endTime: Date.now(),
        }));
        setEndingStep(0);
        setGamePhase('ENDING');
      },
    });

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

    const isBackedOffOnce = linkTags.includes(`backed_off_${topic.id}`);
    const effectiveSpokenText =
      (isBackedOffOnce && currentStage.retrySpokenText) ||
      currentStage.spokenText;
    const effectiveStageAschText =
      (isBackedOffOnce && currentStage.retryAschText) ||
      currentStage.aschText;

    const guyLines = effectiveSpokenText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    // 気まずい・不機嫌な空気の中で別の通常話題を振って会話を続ける場合、ガイが言い淀みながら切り出す（IMMUTABLE_RULES 6-②）
    const shouldPrependAwkwardPrefix =
      linkTags.includes('phase2_started') &&
      !caughtAngryGlance &&
      (mood < 0 || guyMood < 0 || isHatredMode) &&
      askCount === 0 &&
      topic.contextCategory !== 'fight' &&
      topic.id !== 'topic_41_apologize' &&
      !topic.awkwardSilenceTopic;

    const awkwardHesitationLine = shouldPrependAwkwardPrefix
      ? AWKWARD_TOPIC_PREFIXES[nextTotalTurns % AWKWARD_TOPIC_PREFIXES.length]
      : null;

    const steps: QueuedStep[] = [];

    const hasGuyHesitation = Boolean(
      seriousToBrightTransition || awkwardHesitationLine
    );

    if (seriousToBrightTransition) {
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
    } else if (awkwardHesitationLine) {
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
            ? 880
            : 240
          : Math.min(1300, Math.max(780, guyLines[idx - 1].length * 34));
      steps.push({
        delayMs: delay,
        action: () => {
          // 言い淀みがあった場合は1枠目のガイの吹き出しを同じセリフ枠内で上書きする（ログには両方残る）
          pushScreenBubble('GUY', line, 'normal', idx === 0 && hasGuyHesitation);
        },
      });
    });

    const lastGuyLineLen =
      guyLines.length > 0 ? guyLines[guyLines.length - 1].length : 6;

    // --- 機嫌による反応分岐の判定（フェーズ1ではまだタルロウAを演じているため不機嫌拒否を発生させない） ---
    const isAngryNow = mood < 0 && !isPhase1Now && !caughtAngryGlance;
    const isGoodMoodNow = mood >= 2 && !isPhase1Now;

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
          : currentStage.faceParts;

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

    // 無言（放置）から復帰した直後の声かけ時、または不機嫌中にチラ見して目が合った瞬間の声かけ時は、アッシュが短い一言を挟んでから本題に答える
    if (caughtAngryGlance) {
      const glanceLine =
        ANGRY_GLANCE_CAUGHT_LINES[
          nextTotalTurns % ANGRY_GLANCE_CAUGHT_LINES.length
        ];
      steps.push({
        delayMs: Math.min(1100, Math.max(700, lastGuyLineLen * 26)),
        action: () => {
          setOverrideExpression('look_away');
          setOverrideFaceParts({
            brow: 'angry',
            eyes: 'down',
            mouth: 'frown',
            effects: ['sweat'],
          });
          pushScreenBubble('ASCH', glanceLine, 'normal');
        },
      });
    } else if (wasIdleBeforeClick && !isAngryNow && !isHatredMode) {
      const idleReturnLine =
        RETURN_FROM_IDLE_LINES[
          nextTotalTurns % RETURN_FROM_IDLE_LINES.length
        ];
      steps.push({
        delayMs: Math.min(1100, Math.max(700, lastGuyLineLen * 26)),
        action: () => {
          setOverrideExpression('look_away');
          setOverrideFaceParts({
            brow: 'normal',
            eyes: 'away',
            mouth: 'close',
            effects: [],
          });
          pushScreenBubble('ASCH', idleReturnLine, 'normal');
        },
      });
    } else if (seriousToBrightTransition && !isRefusedByBadMood) {
      // シリアスな話題から急に明るい話題へ切り替えた際、アッシュも一拍戸惑う間を入れる
      steps.push({
        delayMs: Math.min(1250, Math.max(850, lastGuyLineLen * 30)),
        action: () => {
          setOverrideExpression(seriousToBrightTransition.expression);
          setOverrideFaceParts(seriousToBrightTransition.faceParts);
          pushScreenBubble(
            'ASCH',
            seriousToBrightTransition.aschTransition,
            'normal'
          );
        },
      });
    }

    const aschLines = resolvedAschText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const speedPauseOffset =
      currentStage.typingSpeed === 'slow'
        ? 450
        : currentStage.typingSpeed === 'laggy'
          ? 380
          : currentStage.typingSpeed === 'fast'
            ? 120
            : 280;

    const pauseBeforeAsch =
      Math.min(1350, Math.max(820, lastGuyLineLen * 30)) + speedPauseOffset;

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

    const hasAschPreBubbleToOverwrite =
      caughtAngryGlance ||
      (wasIdleBeforeClick && !isAngryNow && !isHatredMode) ||
      Boolean(seriousToBrightTransition && !isRefusedByBadMood) ||
      Boolean(
        isPhase1RewriteSlip && chosenPhase1SlipVariant?.slipPrefixText
      );

    // Phase 1で「言い直し（REWRITE）」のボロが選ばれた場合、まず1枠目に本音（slipPrefixText）を表示し、直後に同じ枠へ訂正セリフを上書きする
    if (isPhase1RewriteSlip && chosenPhase1SlipVariant?.slipPrefixText) {
      const slipPrefix = chosenPhase1SlipVariant.slipPrefixText;
      steps.push({
        delayMs: pauseBeforeAsch,
        action: () => {
          setOverrideExpression('shock');
          setOverrideFaceParts({
            brow: 'angry',
            eyes: 'wide',
            mouth: 'shout',
            effects: ['blush', 'sweat'],
          });
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

    const isTopicCompletedThisTurn =
      askCount + 1 >= topic.stages.length && !hasReplyOptionsForCurrentStage;

    const isNaturalTimingForReverseQuestion =
      isTopicCompletedThisTurn &&
      aschLines.length <= 1 &&
      topic.contextCategory !== 'core' &&
      topic.contextCategory !== 'fight';

    const unansweredMilestoneQuestions = TURN_MILESTONE_QUESTIONS.filter(
      (m) =>
        !answeredQuestionIds.includes(m.question.id) &&
        nextTotalTurns >= m.turnCount
    );

    const shouldTriggerRandomReverseQuestion =
      !aschQuestionsDisabled &&
      linkTags.includes('phase2_started') &&
      shouldAdvanceStage &&
      !currentStage.triggersAschQuestion &&
      isCalmAfterCurrentStage &&
      isNaturalTimingForReverseQuestion &&
      nextTotalTurns >= 5 &&
      nextTotalTurns - lastMilestoneQuestionTurnRef.current >= 3 &&
      unansweredMilestoneQuestions.length > 0 &&
      Math.random() < 0.55;

    const milestoneQuestionObj = shouldTriggerRandomReverseQuestion
      ? unansweredMilestoneQuestions[0]
      : undefined;

    if (milestoneQuestionObj) {
      lastMilestoneQuestionTurnRef.current = nextTotalTurns;
    }

    aschLines.forEach((line, idx) => {
      const delay =
        idx === 0
          ? isPhase1RewriteSlip && chosenPhase1SlipVariant?.slipPrefixText
            ? 860
            : chosenPhase1SlipVariant?.type === 'PRE_FACE'
              ? 720
              : pauseBeforeAsch
          : Math.min(1450, Math.max(860, aschLines[idx - 1].length * 38)) +
            (currentStage.typingSpeed === 'slow' ? 220 : 0);

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
                if (isAngryNow && !topic.calmsAnger && mDelta > 0) {
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

            const tDelta = isRefusedByBadMood
              ? 0
              : useCustomBadMood
                ? (currentStage.badMoodResponse!.trustDelta ?? 0)
                : useCustomGoodMood
                  ? (currentStage.goodMoodResponse!.trustDelta ?? 1)
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

    // 話題が一区切りついた後のアッシュからの逆質問がある場合、一拍置いてからアッシュが切り出す
    if (milestoneQuestionObj) {
      const qLines = milestoneQuestionObj.questionLine
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      qLines.forEach((qLine, qIdx) => {
        steps.push({
          delayMs: qIdx === 0 ? 1300 : 850,
          action: () => {
            if (qIdx === 0) {
              setOverrideExpression(milestoneQuestionObj.expression);
              setOverrideFaceParts(milestoneQuestionObj.faceParts);
            }
            if (qIdx === qLines.length - 1) {
              setPreviewPage(0);
              setActiveAschQuestion(milestoneQuestionObj.question);
            }
            pushScreenBubble('ASCH', qLine, 'normal');
          },
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
          setGamePhase('ENDING');
          return;
        }
        if (
          linkTags.includes('phase2_started') &&
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

  // === フェーズ1終了時：『手元の端末の画面を本人に見せる』（ロック解除時のみ出現） ===
  const handleShowTerminalToAschPhase1 = () => {
    if (isTerminalOpen || isDialogueLogOpen || isManualOpen || isSequencing) {
      return;
    }
    soundEngine.unlockOnUserInteraction();
    setIsDecisionMenuOpen(false);
    setPhase1AccuseStep('NONE');

    const guySpoken =
      'これ、おまえを連れ出すときにディストから渡された管理端末なんだよ。\nおまえが動揺した波形も、内部メモリの記録も全部ここに映ってるぞ。';
    const aschReply =
      '・・・・・・チッ、その忌々しい板を俺に向けるな！\nディストの奴、俺の内部記録を見る管理端末までおまえに渡しやがったのか・・・・・・！';

    const guyLines = guySpoken.split('\n').filter(Boolean);
    const aschLines = aschReply.split('\n').filter(Boolean);

    const steps: QueuedStep[] = [];
    guyLines.forEach((line, idx) => {
      steps.push({
        delayMs: idx === 0 ? 240 : 920,
        action: () => {
          pushScreenBubble('GUY', line, 'normal');
        },
      });
    });

    aschLines.forEach((line, idx) => {
      steps.push({
        delayMs: idx === 0 ? 1150 : 980,
        action: () => {
          if (idx === 0) {
            setOverrideExpression('shock');
            setOverrideFaceParts({
              brow: 'angry',
              eyes: 'wide',
              mouth: 'shout',
              effects: ['blush', 'sweat'],
            });
            setMood(-3);
          } else {
            setOverrideExpression('glare');
            setOverrideFaceParts({
              brow: 'angry',
              eyes: 'glare',
              mouth: 'shout',
              effects: ['blush', 'sweat'],
            });
          }
          if (idx === aschLines.length - 1) {
            setPreviewPage(0);
            setActiveAschQuestion({
              id: 'q_p1_final_expose',
              promptSummary: '思わず「ガイ」と名前を呼んでしまったアッシュに確認する',
              options: [
                {
                  id: 'q_p1_final_confirm',
                  thoughtText:
                    '「今、俺のことを『ガイ』って呼んだな。やっぱりアッシュじゃないか」と言う',
                  spokenText:
                    '今、俺のことを「ガイ」って呼んだな。俺の名前を知らないはずの機械が、どうして呼べるんだ？　・・・・・・やっぱりアッシュなんだろ。',
                  aschText:
                    '・・・・・・っ！！　・・・・・・チッ、端末まで持ち出しやがって・・・・・・。\n・・・・・・分かったよ、『タルロウA』ってのは嘘だ。だが、その名前で俺を呼ぶな。',
                  expression: 'look_away',
                  faceParts: {
                    brow: 'sad',
                    eyes: 'away',
                    mouth: 'frown',
                    effects: ['blush', 'sweat'],
                  },
                  moodDelta: 2,
                  trustDelta: 2,
                  grantsLinkTags: ['phase2_started', 'terminal_revealed'],
                  naturalUnlockSectorId: 'SEC-01',
                  systemLog:
                    'PHASE 2 TRANSITION // CAMOUFLAGE MODE ABORTED',
                },
              ],
            });
          }
          pushScreenBubble('ASCH', line, 'shout');
        },
      });
    });

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
        { id: 'REWRITE', label: '途中で言葉を言い直した' },
        { id: 'PRE_FACE', label: '答える際に、違和感のある表情をした' },
        { id: 'CALL_NAME', label: '『ガイ』と名前を呼んだ' },
        { id: 'BLUFF_TONE', label: '声のトーンが明らかに上ずっていた' },
        { id: 'BLUFF_DELAY', label: '返答までの時間が不自然に長かった' },
        {
          id: 'BLUFF_MANNER',
          label: 'タルロウにしては受け答えや口調が違いすぎる',
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

      if (occurred) {
        const correctId: 'REWRITE' | 'PRE_FACE' | 'CALL_NAME' =
          topicId === 'p1_touch_shoulder'
            ? 'CALL_NAME'
            : occurred.variant.type === 'REWRITE'
              ? 'REWRITE'
              : 'PRE_FACE';

        const correctCandidate = ALL_CANDIDATES.find((c) => c.id === correctId)!;
        const wrongPool = ALL_CANDIDATES.filter((c) => {
          if (c.id === correctId) return false;
          // 頭に手を伸ばした質問でボロが出た場合、「『ガイ』と名前を呼んだ」と「途中で言葉を言い直した」が同時に並ばないように除外
          if (topicId === 'p1_touch_shoulder' && c.id === 'REWRITE') {
            return false;
          }
          return true;
        });

        const pickedWrong = shuffle(wrongPool)
          .slice(0, 2)
          .map((c) => ({ ...c, isCorrect: false }));

        return shuffle([
          { ...correctCandidate, isCorrect: true },
          ...pickedWrong,
        ]);
      }

      return shuffle(ALL_CANDIDATES)
        .slice(0, 3)
        .map((c) => ({ ...c, isCorrect: false }));
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
      // 【正解】：実際にボロが出ていた話題＆正しいボロの種別を指摘できた場合 → アッシュが観念してフェーズ2へ移行
      const guyLines = matchedSlip.variant.guyPointOutSpoken
        .split('\n')
        .filter(Boolean);
      const aschLines = [
        '・・・・・・っ！！　・・・・・・チッ、どこまでしつこく観察してやがる・・・・・・！',
        '・・・・・・分かったよ、俺の負けだ。『タルロウA』ってのは出まかせだ。\n・・・・・・だが、その名前で俺を呼ぶな。',
      ];

      const steps: QueuedStep[] = [];
      guyLines.forEach((line, idx) => {
        steps.push({
          delayMs: idx === 0 ? 240 : 920,
          action: () => {
            pushScreenBubble('GUY', line, 'normal');
          },
        });
      });

      aschLines.forEach((line, idx) => {
        steps.push({
          delayMs: idx === 0 ? 1150 : 980,
          action: () => {
            if (idx === 0) {
              setOverrideExpression('shock');
              setOverrideFaceParts({
                brow: 'angry',
                eyes: 'glare',
                mouth: 'grit',
                effects: ['blush', 'sweat'],
              });
              setMood(-1);
              pushScreenBubble('ASCH', line, 'shout');
            } else {
              setOverrideExpression('look_away');
              setOverrideFaceParts({
                brow: 'sad',
                eyes: 'away',
                mouth: 'frown',
                effects: ['blush', 'sweat'],
              });
              updateMood(2);
              setTrustLevel((prev) => prev + 2);
              setLinkTags((prev) =>
                Array.from(new Set([...prev, 'phase2_started']))
              );
              setPreviewPage(0);
              const stamp = nextOrderStamp();
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
              setReadSectorIds((prev) =>
                Array.from(new Set([...prev, 'SEC-01', 'SEC-02']))
              );
              appendLog(
                'INFO',
                'PHASE 2 TRANSITION // CAMOUFLAGE MODE ABORTED'
              );
              pushScreenBubble('ASCH', line, 'normal');
            }
          },
        });
      });

      steps.push({
        delayMs: 480,
        action: () => {},
      });

      enqueueSequence(steps);
    } else {
      // 【不正解】：ボロが出ていなかった話題、または的外れな理由を指摘した場合 → あしらわれてタルロウA確定EDへ
      const guySpoken =
        selectedChoice.id === 'REWRITE'
          ? 'おまえ、さっき途中で言葉を言い直したよな？　本当は『タルロウA』なんかじゃないんだろ。'
          : selectedChoice.id === 'PRE_FACE'
            ? 'おまえ、さっき一瞬顔色が変わったよな？　本当は『タルロウA』なんかじゃないんだろ。'
            : selectedChoice.id === 'CALL_NAME'
              ? 'おまえ、さっき『ガイ』って俺の名前を呼んだよな？　本当は『タルロウA』なんかじゃないんだろ。'
              : selectedChoice.id === 'BLUFF_TONE'
                ? 'おまえ、さっき声が上ずってたぞ。本当は『タルロウA』なんかじゃないんだろ。'
                : selectedChoice.id === 'BLUFF_DELAY'
                  ? 'おまえ、さっき妙に言葉に詰まってたぞ。本当は『タルロウA』なんかじゃないんだろ。'
                  : 'おまえ、タルロウにしては口調が違いすぎるぞ。本当は『タルロウA』なんかじゃないんだろ。';

      const aschRefute =
        '言いがかりだな。俺は最初から事実しか言っていないし、動揺などもしていない。\n疑う根拠がないなら、さっさと研究所へ戻せ。';

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
              eyes: 'normal',
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

    aschLines.forEach((line, idx) => {
      const delay =
        idx === 0
          ? pauseBeforeAsch
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
                setReadSectorIds((prev) =>
                  Array.from(new Set([...prev, 'SEC-01', 'SEC-02']))
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
    setActiveTopicReply(null);
    setActiveAschQuestion(null);
    setIsDecisionMenuOpen(false);

    if (
      hasEnoughDeepTalkForPhase3 ||
      linkTags.includes('p2_heard_true_reason')
    ) {
      appendLog(
        'WARNING',
        'WARNING: WAVEFORM LIMIT EXCEEDED // FORCING PHASE 3 TRANSITION'
      );
      const leaveSteps: QueuedStep[] = [
        {
          delayMs: 360,
          action: () => {
            setOverrideExpression('glare');
            setOverrideFaceParts({
              brow: 'angry',
              eyes: 'away',
              mouth: 'frown',
              effects: [],
            });
            pushScreenBubble(
              'ASCH',
              '・・・・・・もういい、話は終わりだ。俺はディストの研究所へ戻る。',
              'normal'
            );
          },
        },
        {
          delayMs: 1150,
          action: () => {
            setOverrideExpression('normal');
            setOverrideFaceParts({
              brow: 'sad',
              eyes: 'normal',
              mouth: 'close',
              effects: [],
            });
            setPreviewPage(0);
            setActiveTopicReply({
              topicId: 'p3_final_who_am_i',
              options: PHASE3_WHO_AM_I_OPTIONS,
            });
            pushScreenBubble(
              'ASCH',
              '・・・・・・その前に1つだけ聞かせろ。おまえから見て、今の俺は誰に見える？',
              'normal'
            );
          },
        },
        {
          delayMs: 420,
          action: () => {},
        },
      ];
      enqueueSequence(leaveSteps);
    } else {
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
              '・・・・・・言ったはずだぞ、これ以上鬱陶しい真似をするなら帰るとな！',
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
              'もう話は終わりだ、俺はディストの研究所へ戻る。じゃあな、ガイ！',
              'normal'
            );
          },
        },
        {
          delayMs: 1350,
          action: () => {
            setCustomEndingKey('END_PHASE2_INCOMPLETE');
            setStats((prev) => ({
              ...prev,
              endTime: Date.now(),
            }));
            setEndingStep(0);
            setGamePhase('ENDING');
          },
        },
      ];
      enqueueSequence(leaveSteps);
    }
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
          ? 240
          : Math.min(1300, Math.max(780, guyLines[idx - 1].length * 34));
      steps.push({
        delayMs: delay,
        action: () => {
          if (idx === 0) {
            setActiveTopicReply(null);
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

    aschLines.forEach((line, idx) => {
      const delay =
        idx === 0
          ? pauseBeforeAsch
          : Math.min(1450, Math.max(860, aschLines[idx - 1].length * 38));
      const baseEffect: BubbleVoiceEffect =
        option.voiceEffects?.[idx] ?? option.voiceEffects?.[0] ?? 'normal';
      const lineEffect = resolveVoiceEffectWithGlitch(baseEffect, 0, false);

      steps.push({
        delayMs: delay,
        action: () => {
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

          if (idx === aschLines.length - 1) {
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
      });
    });

    steps.push({
      delayMs:
        option.triggersEnding || option.triggersEndingKey ? 1400 : 480,
      action: () => {
        if (option.triggersEndingKey) {
          setCustomEndingKey(option.triggersEndingKey);
          setStats((prev) => ({
            ...prev,
            endTime: Date.now(),
          }));
          setEndingStep(0);
          setGamePhase('ENDING');
        } else if (option.triggersEnding) {
          setCustomEndingKey(null);
          setEndingDisposition(option.triggersEnding);
          setStats((prev) => ({
            ...prev,
            endTime: Date.now(),
          }));
          setEndingStep(0);
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
      delayMs: 460,
      action: () => {},
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
      (phase1QuestionsCount >= 3 || hasPhase1LockUnlocked)) ||
    (linkTags.includes('phase2_started') && stats.totalTurns >= 8);

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

  const endingLines = currentEndingScenario.dialogues.map((d) =>
    d.speaker === 'GUY'
      ? d.text.replace(/\n/g, '')
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

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropOnStage}
      className="fixed inset-0 w-screen h-dvh bg-[#050507] flex items-center justify-center overflow-hidden select-none"
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
        className="relative bg-[#c5c6cc] flex flex-col justify-between overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] border border-zinc-800 shrink-0"
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
              <span>PROTOTYPE BUILD</span>
            </div>

            <div className="flex flex-col items-center text-center my-auto space-y-5">
              <div className="space-y-2">
                <p className="text-[11px] tracking-[0.25em] text-zinc-500">
                  OBSERVATION DIALOGUE ADV
                </p>
                <h1 className="text-[28px] tracking-[0.18em] text-zinc-100">
                  Ghost in the mASCHine
                </h1>
              </div>

              <div className="max-w-[460px] border border-zinc-800 bg-zinc-950/90 px-5 py-3 space-y-1 text-center">
                <p className="text-[12px] text-zinc-300">
                  【二次創作ゲームに関するご案内】
                </p>
                <p className="text-[11.5px] leading-relaxed text-zinc-400">
                  本作は『テイルズ オブ ジ アビス』の非公式二次創作ゲームです。
                  <br />
                  原作および関係各社様とは一切関係ございません。
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="px-6 py-1.5 text-[13px] tracking-widest border border-zinc-600 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 transition-colors">
                画面をクリックして開始
              </span>
            </div>
          </div>
        )}

        {/* === 1. プロローグ画面 === */}
        {gamePhase === 'PROLOGUE' && (
          <div
            onClick={() => {
              soundEngine.unlockOnUserInteraction();
              soundEngine.playTextAdvance();
              if (prologueStep < PROLOGUE_LINES.length - 1) {
                setPrologueStep((prev) => prev + 1);
              } else {
                startPlayingPhase();
              }
            }}
            className="w-full h-full bg-[#08080a] text-zinc-100 flex flex-col items-center justify-center px-12 cursor-pointer"
          >
            <div className="max-w-[460px] w-full space-y-4">
              {PROLOGUE_LINES.slice(0, prologueStep + 1).map((line, idx) => (
                <p
                  key={idx}
                  className="text-[14px] leading-relaxed tracking-wider text-zinc-200 animate-bubble-in"
                >
                  {line}
                </p>
              ))}
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
                  className="text-[14px] leading-relaxed tracking-wider text-zinc-200 animate-bubble-in"
                >
                  {line}
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
            onResetSession={handleResetSession}
          />
        )}

        {/* === 4. メイン対話画面 === */}
        {gamePhase === 'PLAYING' && (
          <>
            {/* 上部黒帯ヘッダー */}
            <header className="relative z-20 w-full h-[44px] bg-[#08080a] text-zinc-100 flex items-center justify-between px-5 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-zinc-100 text-[#08080a] font-bold text-[11px] flex items-center justify-center">
                  !
                </span>
                <span className="text-[14px] tracking-wider text-zinc-100">
                  アッシュと会話する
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundEngine.playTerminalTab();
                    setIsTerminalOpen(false);
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
                  className={`relative after:content-[''] after:absolute after:-inset-y-2 after:-inset-x-1 flex items-center gap-1.5 px-2.5 py-0.5 text-[11.5px] border transition-colors cursor-pointer ${
                    isSoundMuted
                      ? 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:border-zinc-700'
                      : 'text-zinc-200 hover:text-white border-zinc-700 hover:border-zinc-500 bg-zinc-900/80'
                  }`}
                >
                  <span>♪</span>
                  <span>{isSoundMuted ? 'BGM/SE: OFF' : 'BGM/SE: ON'}</span>
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
                  bgBlurPx > 0 ? { filter: `blur(${bgBlurPx}px)` } : undefined
                }
                className={`relative z-10 w-[58%] h-full pl-6 pr-3 py-3.5 transition-opacity duration-200 ${
                  isTerminalOpen ? 'pointer-events-none select-none' : ''
                }`}
              >
                {/* 上部：アッシュ（右寄せ）とガイ（左寄せ）のセリフ枠タイムライン（高さ上限208pxで下の選択肢と絶対に重ならない） */}
                <div className="w-full max-h-[208px] overflow-hidden flex flex-col justify-start pt-0.5">
                  {visibleBubbles.map((bubble) => {
                    const isAsch = bubble.speaker === 'ASCH';
                    const resolvedEffect: BubbleVoiceEffect =
                      bubble.voiceEffect ?? 'normal';

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
                          />
                        ) : (
                          <div className="relative w-fit max-w-[335px] bg-[#dcdde3] text-zinc-950 px-3.5 py-2">
                            <div className="w-0 h-0 absolute -left-[10px] bottom-2 border-y-[6px] border-y-transparent border-r-[11px] border-r-[#dcdde3]" />
                            <p className="text-[13.5px] leading-snug tracking-wide whitespace-pre-wrap break-words">
                              {bubble.text}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* 下部：ガイの思考選択肢（absolute bottom-4 で下部に完全ピン留めし、吹き出しに一切押し出されない） */}
                <div className="absolute left-7 right-3 bottom-4 max-w-[395px] h-[116px] flex flex-col justify-start">
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

                    // Phase 1 の質問リスト計算
                    const sortedPhase1 = (() => {
                      const phase1Topics = CONVERSATION_TOPICS.filter((t) =>
                        t.id.startsWith('p1_')
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
                                if (t.id === 'p2_deep_truth_dilemma') return 100;
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
                                if (t.id === 'p2_tarlow_broken_reason') return 70;
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
                          ? 'どの反応に違和感があったか・・・・・・'
                          : !linkTags.includes('phase2_started') &&
                              phase1AccuseStep === 'SELECT_REASON'
                            ? '何が怪しかったか・・・・・・'
                            : 'どう切り出そうか・・・・・・'
                        : isReplyingMode
                          ? 'どう返そうか・・・・・・'
                          : !linkTags.includes('phase2_started')
                            ? `何を聞こうか・・・・・・（${phase1QuestionsCount}/5）`
                            : '何について話そうか・・・・・・';

                    return (
                      <div className="flex flex-col gap-1.5 py-0.5 animate-[fadeIn_0.22s_ease-out]">
                        {/* 上部見出しバー：左に見出し、右にボタン群（一番右端は常に [ ▶ 他の話題 ] の固定席） */}
                        <div className="flex items-center justify-between gap-2 mb-1 select-none border-b border-zinc-950/20 text-[12px] font-mono tracking-wider">
                          <span className="pb-1 text-zinc-950 font-bold truncate">
                            {headerTitleText}
                          </span>

                          <div className="flex items-center justify-end gap-1 shrink-0">
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
                                className="pb-1 text-[11px] text-zinc-700 hover:text-black cursor-pointer whitespace-nowrap"
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
                                  className="pb-1 text-[11px] text-zinc-700 hover:text-black cursor-pointer whitespace-nowrap"
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
                                className="pb-1 text-[11px] text-zinc-700 hover:text-black cursor-pointer whitespace-nowrap"
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
                                className="pb-1 text-[11px] text-zinc-600 hover:text-black cursor-pointer whitespace-nowrap transition-colors"
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
                              className={`pb-1 text-[11px] whitespace-nowrap select-none transition-colors ${
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
                              <div className="relative h-[82px] flex flex-col justify-start gap-1">
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
                                    className="w-fit max-w-[385px] group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1 disabled:pointer-events-none"
                                  >
                                    <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                    <div className="flex flex-col justify-center py-0.5 min-w-0">
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
                              <div className="relative h-[82px] flex flex-col justify-start gap-1">
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
                                    className="w-fit max-w-[385px] group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1 disabled:pointer-events-none"
                                  >
                                    <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                    <div className="flex flex-col justify-center py-0.5 min-w-0">
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
                          /* ② イベント決断メニュー（話を切り上げる/質問上限到達：通常話題リストと同じh-[82px]・最大3件1行固定） */
                          <div className="relative h-[82px] flex flex-col justify-start gap-1 overflow-hidden">
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
                                    <div className="relative h-[82px] flex flex-col justify-start gap-1">
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
                                            className="w-fit max-w-[385px] group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1"
                                          >
                                            <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                            <div className="flex flex-col justify-center py-0.5 min-w-0">
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
                                <div className="relative h-[82px] flex flex-col justify-start gap-1">
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
                                      className="w-fit max-w-[385px] group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1"
                                    >
                                      <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                      <div className="flex flex-col justify-center py-0.5 min-w-0">
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
                                    <div className="relative h-[82px] flex flex-col justify-start gap-1">
                                      {currentSlice.map((item) => (
                                        <button
                                          key={item.id}
                                          {...getChoiceHesitationHandlers(item.id)}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            item.onSelect();
                                          }}
                                          className="w-fit max-w-[385px] group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1"
                                        >
                                          <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                          <div className="flex flex-col justify-center py-0.5 min-w-0">
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
                                  {...getChoiceHesitationHandlers('p2_dec_return')}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleExecuteDecision('RETURN');
                                  }}
                                  className="group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1"
                                >
                                  <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                  <div className="flex flex-col justify-center py-0.5">
                                    <span className="text-[13px] leading-snug text-zinc-900 group-hover:text-black">
                                      本人の意思を尊重してディストの研究所へ見送る
                                    </span>
                                  </div>
                                </button>

                                <button
                                  {...getChoiceHesitationHandlers('p2_dec_keep')}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleExecuteDecision('KEEP');
                                  }}
                                  className="group text-left flex items-stretch cursor-pointer transition-transform hover:translate-x-1"
                                >
                                  <div className="w-[3px] shrink-0 mr-2.5 bg-zinc-900 group-hover:bg-black transition-colors" />
                                  <div className="flex flex-col justify-center py-0.5">
                                    <span className="text-[13px] leading-snug text-zinc-900 group-hover:text-black">
                                      もう少しこの部屋で休んでいけと声をかける
                                    </span>
                                  </div>
                                </button>
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
                                  <div className="relative h-[82px] flex flex-col justify-start gap-1">
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
                                          className={`w-fit max-w-[385px] group text-left flex items-stretch transition-all duration-300 ease-out ${
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
                                          <div className="flex flex-col justify-center py-0.5 min-w-0">
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
                                <div className="relative h-[82px] flex flex-col justify-start gap-1">
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
                                        className={`w-fit max-w-[385px] group text-left flex items-stretch transition-all duration-300 ease-out ${
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
                                        <div className="flex flex-col justify-center py-0.5 min-w-0">
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
              <div className="relative z-20 w-[42%] h-full flex items-end justify-center pointer-events-none">
                <AschPortrait
                  expression={activeExpression}
                  faceParts={activeFaceParts}
                  availableRootFiles={availableRootFiles}
                  availablePartFiles={availablePartFiles}
                  customTestPngSrc={customTestPng}
                  customPartMap={customPartMap}
                  onSelectTestPngFile={(file) => handleLoadImageFile(file)}
                  blurPx={bgBlurPx}
                />
              </div>

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
                {/* データ端末ボタン（見た目は上部ボタンと揃えた小ぶりなサイズ・透明タップ判定を周囲に拡大） */}
                <button
                  onClick={handleToggleTerminal}
                  title="データ端末"
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
                  <span>端末</span>

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
  );
}
