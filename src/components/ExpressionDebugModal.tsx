import React, { useState } from 'react';
import {
  BrowPartId,
  EmotionEffectId,
  ExpressionId,
  EyePartId,
  FaceParts,
  MouthPartId,
} from '../types/game';
import {
  BROW_OPTIONS,
  DEFAULT_EXPRESSION_PARTS,
  DEFAULT_MOTION_TUNING,
  EFFECT_OPTIONS,
  EYE_OPTIONS,
  MOUTH_OPTIONS,
  PortraitMotionTuning,
} from './AschPortrait';
import { soundEngine } from '../utils/chiptuneAudio';
import { useLanguage, Language } from '../utils/i18n';

interface ExpressionDebugModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeExpression: ExpressionId;
  activeFaceParts: FaceParts;
  isPreviewOverrideActive: boolean;
  onApplyPreview: (expr: ExpressionId, parts: FaceParts) => void;
  onClearPreviewOverride: () => void;
  motionTuning: PortraitMotionTuning;
  onChangeMotionTuning: (next: PortraitMotionTuning) => void;
  onReplayMotion: () => void;
  seenFaceParts: string[];
  isBonusMode?: boolean;
}

const PART_LABELS: Record<string, { en: string; ko: string }> = {
  // Presets & general
  '通常': { en: 'Normal', ko: '통상' },
  'そらし': { en: 'Away', ko: '돌림' },
  '睨み': { en: 'Glare', ko: '노려봄' },
  '驚き': { en: 'Shock', ko: '놀람' },
  '苦悶': { en: 'Agony', ko: '고통' },
  '虚ろ': { en: 'Empty', ko: '공허' },
  // Brows
  '怒り': { en: 'Angry', ko: '분노' },
  '困り': { en: 'Troubled', ko: '곤란' },
  '笑い': { en: 'Laugh', ko: '웃음' },
  '訝しみ': { en: 'Doubt', ko: '의아' },
  // Eyes
  '閉じ': { en: 'Closed', ko: '감음' },
  '微笑み': { en: 'Gentle', ko: '미소' },
  '見開き': { en: 'Wide', ko: '치켜뜸' },
  '苦痛': { en: 'Pain', ko: '고통' },
  '伏し目': { en: 'Downcast', ko: '내리뜬 눈' },
  // Mouth
  '開け': { en: 'Open', ko: '벌림' },
  '怒鳴る': { en: 'Shout', ko: '외침' },
  '笑う': { en: 'Smile', ko: '웃음' },
  '食いしばり': { en: 'Grit', ko: '악묾' },
  'への字': { en: 'Pout', ko: '시무룩' },
  '息呑み': { en: 'Gasp', ko: '숨 삼킴' },
  // Effects
  '汗': { en: 'Sweat', ko: '식은땀' },
  '青褪め': { en: 'Pale', ko: '창백' },
  '頬染め': { en: 'Blush', ko: '홍조' },
  '目元影': { en: 'Shadow', ko: '눈가 그림자' },
  '涙': { en: 'Tears', ko: '눈물' },
};

const getPartLabel = (label: string, lang: Language) => {
  if (lang === 'ja') return label;
  return PART_LABELS[label]?.[lang] || label;
};

const EXPRESSION_PRESETS: { id: ExpressionId; label: string }[] = [
  { id: 'normal', label: '通常' },
  { id: 'look_away', label: 'そらし' },
  { id: 'glare', label: '睨み' },
  { id: 'shock', label: '驚き' },
  { id: 'pain', label: '苦悶' },
  { id: 'empty', label: '虚ろ' },
];

export const ExpressionDebugModal: React.FC<ExpressionDebugModalProps> = ({
  isOpen,
  onClose,
  activeExpression,
  activeFaceParts,
  isPreviewOverrideActive,
  onApplyPreview,
  onClearPreviewOverride,
  motionTuning,
  onChangeMotionTuning,
  onReplayMotion,
  seenFaceParts,
  isBonusMode = false,
}) => {
  if (!isOpen) return null;

  const [lang] = useLanguage();
  const validSeenCount = seenFaceParts.filter((k) => k !== 'fx:noise').length;

  const handleSelectPreset = (expr: ExpressionId) => {
    soundEngine.playTerminalTab();
    const preset = DEFAULT_EXPRESSION_PARTS[expr];
    onApplyPreview(expr, {
      brow: preset.brow,
      eyes: preset.eyes,
      mouth: preset.mouth,
      effects: [...preset.effects],
    });
    onReplayMotion();
  };

  const handleSelectBrow = (brow: BrowPartId) => {
    soundEngine.playTerminalTab();
    onApplyPreview(activeExpression, {
      ...activeFaceParts,
      brow,
    });
    onReplayMotion();
  };

  const handleSelectEye = (eyes: EyePartId) => {
    soundEngine.playTerminalTab();
    onApplyPreview(activeExpression, {
      ...activeFaceParts,
      eyes,
    });
    onReplayMotion();
  };

  const handleSelectMouth = (mouth: MouthPartId) => {
    soundEngine.playTerminalTab();
    onApplyPreview(activeExpression, {
      ...activeFaceParts,
      mouth,
    });
    onReplayMotion();
  };

  const handleToggleEffect = (eff: EmotionEffectId) => {
    soundEngine.playTerminalTab();
    const exists = activeFaceParts.effects.includes(eff);
    const nextEffects = exists
      ? activeFaceParts.effects.filter((e) => e !== eff)
      : [...activeFaceParts.effects, eff];
    onApplyPreview(activeExpression, {
      ...activeFaceParts,
      effects: nextEffects,
    });
    onReplayMotion();
  };

  const handleClearEffects = () => {
    soundEngine.playTerminalTab();
    onApplyPreview(activeExpression, {
      ...activeFaceParts,
      effects: [],
    });
    onReplayMotion();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute left-2.5 top-[28px] bottom-[28px] w-[466px] z-40 bg-[#e4e5ea] text-zinc-900 border-2 border-zinc-950 shadow-2xl flex flex-col justify-between px-3 py-2 select-none pointer-events-auto font-zen overflow-hidden"
    >
      {/* ヘッダー */}
      <div className="shrink-0 border-b border-zinc-900 pb-1.5 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h3 className="text-[13.5px] font-bold tracking-wider text-zinc-950 font-zen flex items-center gap-1.5">
            <span className="text-zinc-800">★</span>
            {lang === 'en' ? 'Expressions' : lang === 'ko' ? '표정 감상' : '表情鑑賞'}
          </h3>
          <span className="text-[9.5px] font-mono tracking-wider text-zinc-500">
            EXTRA // EXPRESSION
          </span>
          <span className="text-[10px] text-zinc-600 ml-1">
            ({lang === 'en' ? 'Unlocked: ' : lang === 'ko' ? '회수: ' : '回収: '}<strong className="text-zinc-950">{validSeenCount}</strong>/27)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              soundEngine.playTerminalTab();
              onReplayMotion();
            }}
            className="px-2 py-0.5 text-[10px] bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-bold border border-zinc-950 cursor-pointer transition-colors"
          >
            {lang === 'en' ? '▶ Play' : lang === 'ko' ? '▶ 재생' : '▶ 再生'}
          </button>
          {isPreviewOverrideActive && (
            <button
              type="button"
              onClick={() => {
                soundEngine.playTerminalTab();
                onClearPreviewOverride();
              }}
              className="px-1.5 py-0.5 text-[10px] border border-zinc-500 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 cursor-pointer transition-colors"
            >
              {lang === 'en' ? 'Reset' : lang === 'ko' ? '원래대로' : '元に戻す'}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              soundEngine.playTerminalClose();
              onClose();
            }}
            className="px-2 py-0.5 text-[10px] bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 transition-colors cursor-pointer font-bold"
          >
            ✕ {lang === 'en' ? 'Close' : lang === 'ko' ? '닫기' : '閉じる'}
          </button>
        </div>
      </div>

      {/* メインボディ */}
      <div className="flex-1 min-h-0 flex flex-col py-1 space-y-2 overflow-y-auto pr-1 text-[10.5px]">
        {/* ベースプリセット */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] text-zinc-600 font-mono font-bold">
              {lang === 'en' ? 'PRESET // Basic Presets' : lang === 'ko' ? 'PRESET // 기본 프리셋' : 'PRESET // 基本プリセット'}
            </span>
            <span className="text-[9px] text-zinc-500">
              {lang === 'en' ? '● = Unlocked in story' : lang === 'ko' ? '● = 본편에서 회수한 차분' : '●＝本編で回収済みの差分'}
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1">
            {EXPRESSION_PRESETS.map((p) => {
              const isCurrent = activeExpression === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPreset(p.id)}
                  className={`py-0.5 text-[10.5px] border text-center cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-zinc-900 text-zinc-100 border-zinc-950 font-bold shadow-sm'
                      : 'bg-zinc-200/80 text-zinc-800 border-zinc-400 hover:border-zinc-600 hover:bg-zinc-300'
                  }`}
                >
                  {getPartLabel(p.label, lang)}
                </button>
              );
            })}
          </div>
        </div>

        {/* 眉パーツ (6種) */}
        <div className="space-y-0.5">
          <span className="text-[9.5px] text-zinc-600 font-mono font-bold block">
            {lang === 'en' ? 'BROW // Eyebrows (6 types)' : lang === 'ko' ? 'BROW // 눈썹 파츠 (6종)' : 'BROW // 眉パーツ (6種)'}
          </span>
          <div className="grid grid-cols-6 gap-1">
            {BROW_OPTIONS.map((b) => {
              const isCurrent = activeFaceParts.brow === b.id;
              const isSeen = seenFaceParts.includes(`brow:${b.id}`);
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleSelectBrow(b.id)}
                  className={`py-0.5 px-0.5 text-[10px] border flex items-center justify-center gap-0.5 cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-zinc-900 text-zinc-100 border-zinc-950 font-bold shadow-sm'
                      : 'bg-zinc-200/80 text-zinc-800 border-zinc-400 hover:border-zinc-600 hover:bg-zinc-300'
                  }`}
                >
                  {isSeen && (
                    <span
                      className={`text-[8px] ${
                        isCurrent ? 'text-zinc-300' : 'text-zinc-600'
                      }`}
                    >
                      ●
                    </span>
                  )}
                  <span>{getPartLabel(b.label, lang)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 目パーツ (9種) */}
        <div className="space-y-0.5">
          <span className="text-[9.5px] text-zinc-600 font-mono font-bold block">
            {lang === 'en' ? 'EYES // Eyes (9 types)' : lang === 'ko' ? 'EYES // 눈 파츠 (9종)' : 'EYES // 目パーツ (9種)'}
          </span>
          <div className="grid grid-cols-5 gap-1">
            {EYE_OPTIONS.map((e) => {
              const isCurrent = activeFaceParts.eyes === e.id;
              const isSeen = seenFaceParts.includes(`eyes:${e.id}`);
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => handleSelectEye(e.id)}
                  className={`py-0.5 px-0.5 text-[10px] border flex items-center justify-center gap-0.5 cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-zinc-900 text-zinc-100 border-zinc-950 font-bold shadow-sm'
                      : 'bg-zinc-200/80 text-zinc-800 border-zinc-400 hover:border-zinc-600 hover:bg-zinc-300'
                  }`}
                >
                  {isSeen && (
                    <span
                      className={`text-[8px] ${
                        isCurrent ? 'text-zinc-300' : 'text-zinc-600'
                      }`}
                    >
                      ●
                    </span>
                  )}
                  <span>{getPartLabel(e.label, lang)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 口パーツ (7種) */}
        <div className="space-y-0.5">
          <span className="text-[9.5px] text-zinc-600 font-mono font-bold block">
            {lang === 'en' ? 'MOUTH // Mouth (7 types)' : lang === 'ko' ? 'MOUTH // 입 파츠 (7종)' : 'MOUTH // 口パーツ (7種)'}
          </span>
          <div className="grid grid-cols-4 gap-1">
            {MOUTH_OPTIONS.map((m) => {
              const isCurrent = activeFaceParts.mouth === m.id;
              const isSeen = seenFaceParts.includes(`mouth:${m.id}`);
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleSelectMouth(m.id)}
                  className={`py-0.5 px-0.5 text-[10px] border flex items-center justify-center gap-0.5 cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-zinc-900 text-zinc-100 border-zinc-950 font-bold shadow-sm'
                      : 'bg-zinc-200/80 text-zinc-800 border-zinc-400 hover:border-zinc-600 hover:bg-zinc-300'
                  }`}
                >
                  {isSeen && (
                    <span
                      className={`text-[8px] ${
                        isCurrent ? 'text-zinc-300' : 'text-zinc-600'
                      }`}
                    >
                      ●
                    </span>
                  )}
                  <span>{getPartLabel(m.label, lang)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* エフェクト (5種) */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] text-zinc-600 font-mono font-bold">
              {lang === 'en' ? 'EFFECTS // Emotion Effects (Stackable)' : lang === 'ko' ? 'EFFECTS // 감정 이펙트 (중복 가능)' : 'EFFECTS // 感情エフェクト（5種・複数重ね可）'}
            </span>
            {activeFaceParts.effects.length > 0 && (
              <button
                type="button"
                onClick={handleClearEffects}
                className="text-[9px] text-zinc-600 hover:text-zinc-950 underline cursor-pointer"
              >
                {lang === 'en' ? 'Clear all' : lang === 'ko' ? '모두 해제' : 'すべて外す'}
              </button>
            )}
          </div>
          <div className="grid grid-cols-5 gap-1">
            {EFFECT_OPTIONS.map((eff) => {
              const isCurrent = activeFaceParts.effects.includes(eff.id);
              const isSeen = seenFaceParts.includes(`fx:${eff.id}`);
              return (
                <button
                  key={eff.id}
                  type="button"
                  onClick={() => handleToggleEffect(eff.id)}
                  className={`py-0.5 px-0.5 text-[10px] border flex items-center justify-center gap-0.5 cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-zinc-900 text-zinc-100 border-zinc-950 font-bold shadow-sm'
                      : 'bg-zinc-200/80 text-zinc-800 border-zinc-400 hover:border-zinc-600 hover:bg-zinc-300'
                  }`}
                >
                  {isSeen && (
                    <span
                      className={`text-[8px] ${
                        isCurrent ? 'text-zinc-300' : 'text-zinc-600'
                      }`}
                    >
                      ●
                    </span>
                  )}
                  <span>{getPartLabel(eff.label, lang)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* フッター */}
      <div className="shrink-0 border-t border-zinc-400/80 pt-1 flex items-center justify-between text-[9.5px] text-zinc-600">
        <span>{lang === 'en' ? "※ Mix and match parts freely to enjoy Asch's expressions." : lang === 'ko' ? '※ 원하는 파츠를 자유롭게 조합하여 애쉬의 표정을 감상할 수 있습니다.' : '※お好みのパーツを自由に組み合わせてアッシュの表情を鑑賞できます'}</span>
      </div>
    </div>
  );
};
