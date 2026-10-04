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
            表情鑑賞
          </h3>
          <span className="text-[9.5px] font-mono tracking-wider text-zinc-500">
            EXTRA // EXPRESSION
          </span>
          <span className="text-[10px] text-zinc-600 ml-1">
            (回収: <strong className="text-zinc-950">{validSeenCount}</strong>/27)
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
            ▶ 再生
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
              元に戻す
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
            ✕ 閉じる
          </button>
        </div>
      </div>

      {/* メインボディ */}
      <div className="flex-1 flex flex-col justify-around py-1 space-y-1 overflow-hidden text-[10.5px]">
        {/* ベースプリセット */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] text-zinc-600 font-mono font-bold">
              PRESET // 基本プリセット
            </span>
            <span className="text-[9px] text-zinc-500">
              ●＝本編で回収済みの差分
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
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 眉パーツ (6種) */}
        <div className="space-y-0.5">
          <span className="text-[9.5px] text-zinc-600 font-mono font-bold block">
            BROW // 眉パーツ (6種)
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
                  <span>{b.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 目パーツ (9種) */}
        <div className="space-y-0.5">
          <span className="text-[9.5px] text-zinc-600 font-mono font-bold block">
            EYES // 目パーツ (9種)
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
                  <span>{e.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 口パーツ (7種) */}
        <div className="space-y-0.5">
          <span className="text-[9.5px] text-zinc-600 font-mono font-bold block">
            MOUTH // 口パーツ (7種)
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
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* エフェクト (5種) */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] text-zinc-600 font-mono font-bold">
              EFFECTS // 感情エフェクト（5種・複数重ね可）
            </span>
            {activeFaceParts.effects.length > 0 && (
              <button
                type="button"
                onClick={handleClearEffects}
                className="text-[9px] text-zinc-600 hover:text-zinc-950 underline cursor-pointer"
              >
                すべて外す
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
                  <span>{eff.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* フッター */}
      <div className="shrink-0 border-t border-zinc-400/80 pt-1 flex items-center justify-between text-[9.5px] text-zinc-600">
        <span>※お好みのパーツを自由に組み合わせてアッシュの表情を鑑賞できます</span>
      </div>
    </div>
  );
};
