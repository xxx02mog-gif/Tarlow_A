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
  motionTuning?: PortraitMotionTuning;
  onChangeMotionTuning?: (next: PortraitMotionTuning) => void;
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
  onReplayMotion,
  seenFaceParts,
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
      className="absolute left-3 top-[48px] w-[420px] max-h-[calc(100vh-96px)] z-40 bg-[#e4e5ea] text-zinc-900 border-2 border-zinc-950 shadow-2xl flex flex-col justify-between px-3 py-2.5 select-none pointer-events-auto font-zen rounded"
    >
      {/* ヘッダー */}
      <div>
        <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-1.5">
          <div className="flex items-baseline gap-2">
            <h3 className="text-[12.5px] font-bold tracking-wider text-zinc-950 font-zen">
              おまけ：表情鑑賞ビューワー
            </h3>
            <span className="text-[9px] font-mono tracking-wider text-zinc-500">
              EXTRA // VIEWER
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                soundEngine.playTerminalClose();
                onClose();
              }}
              className="px-2 py-0.5 text-[10px] font-bold bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 transition-colors cursor-pointer"
            >
              ✕ 閉じる
            </button>
          </div>
        </div>

        {/* サブバー：回収数 ＆ 再生/元に戻すボタン */}
        <div className="flex items-center justify-between border-b border-zinc-300/80 pt-1.5 pb-1">
          <span className="text-[9.5px] text-zinc-700">
            全パーツ自由に鑑賞できます（回収: <strong className="text-zinc-950">{validSeenCount}</strong>/27）
          </span>

          <div className="flex items-center gap-1 shrink-0">
            {isPreviewOverrideActive && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playTerminalTab();
                  onClearPreviewOverride();
                }}
                className="px-1.5 py-0.5 text-[9.5px] border border-zinc-500 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 cursor-pointer transition-colors font-bold"
              >
                元に戻す
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                soundEngine.playTerminalTab();
                onReplayMotion();
              }}
              className="px-2 py-0.5 text-[9.5px] bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-bold border border-zinc-950 cursor-pointer transition-colors"
            >
              ▶ 再生
            </button>
          </div>
        </div>
      </div>

      {/* メインボディ */}
      <div className="py-1.5 space-y-1.5 overflow-y-auto">
            {/* ベースプリセット */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-600 font-mono font-bold">
                  PRESET // 基本プリセット
                </span>
                <span className="text-[9.5px] text-zinc-500">
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
                      className={`py-1 text-[11px] border text-center cursor-pointer transition-colors ${
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
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-600 font-mono font-bold block">
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
                      className={`py-1 px-1 text-[10.5px] border flex items-center justify-center gap-0.5 cursor-pointer transition-colors ${
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
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-600 font-mono font-bold block">
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
                      className={`py-1 px-1 text-[10.5px] border flex items-center justify-center gap-0.5 cursor-pointer transition-colors ${
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
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-600 font-mono font-bold block">
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
                      className={`py-1 px-1 text-[10.5px] border flex items-center justify-center gap-0.5 cursor-pointer transition-colors ${
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
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-600 font-mono font-bold">
                  EFFECTS // 感情エフェクト（5種・複数重ね可）
                </span>
                {activeFaceParts.effects.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearEffects}
                    className="text-[9.5px] text-zinc-600 hover:text-zinc-950 underline cursor-pointer"
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
                      className={`py-1 px-1 text-[10.5px] border flex items-center justify-center gap-0.5 cursor-pointer transition-colors ${
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
          </>
        )}



            {/* 3. 個別パーツ手動スライダー調整 */}
            <div className="p-2 bg-zinc-200/90 border border-zinc-400 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-zinc-900 font-bold">
                  パーツ位置・拡縮の手動スライダー調整
                </span>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playTerminalTab();
                    onChangeMotionTuning({
                      ...motionTuning,
                      customOffsetsEnabled: !motionTuning.customOffsetsEnabled,
                    });
                  }}
                  className={`px-2 py-0.5 text-[10px] border cursor-pointer ${
                    motionTuning.customOffsetsEnabled
                      ? 'bg-zinc-900 text-zinc-100 border-zinc-950 font-bold'
                      : 'bg-zinc-100 text-zinc-700 border-zinc-400'
                  }`}
                >
                  {motionTuning.customOffsetsEnabled
                    ? '手動スライダー有効中'
                    : '現在は感情別プリセット自動'}
                </button>
              </div>

              <div
                className={`space-y-1.5 pt-1 ${
                  motionTuning.customOffsetsEnabled ? 'opacity-100' : 'opacity-50'
                }`}
              >
                {/* 眉の上下 */}
                <div className="flex items-center justify-between gap-2">
                  <span className="w-[105px] text-[10.5px] text-zinc-800">
                    眉の上下 (Y)
                  </span>
                  <input
                    type="range"
                    min={-5}
                    max={5}
                    step={0.2}
                    value={motionTuning.browY}
                    onChange={(e) =>
                      onChangeMotionTuning({
                        ...motionTuning,
                        customOffsetsEnabled: true,
                        browY: parseFloat(e.target.value),
                      })
                    }
                    className="flex-1 accent-zinc-900 cursor-pointer"
                  />
                  <span className="w-[46px] text-right font-mono text-[10px] text-zinc-900 font-bold">
                    {motionTuning.browY > 0 ? `+${motionTuning.browY}` : motionTuning.browY}px
                  </span>
                </div>

                {/* 目の上下・縦拡縮 */}
                <div className="flex items-center justify-between gap-2">
                  <span className="w-[105px] text-[10.5px] text-zinc-800">
                    目の上下 (Y)
                  </span>
                  <input
                    type="range"
                    min={-4}
                    max={4}
                    step={0.2}
                    value={motionTuning.eyeY}
                    onChange={(e) =>
                      onChangeMotionTuning({
                        ...motionTuning,
                        customOffsetsEnabled: true,
                        eyeY: parseFloat(e.target.value),
                      })
                    }
                    className="flex-1 accent-zinc-900 cursor-pointer"
                  />
                  <span className="w-[46px] text-right font-mono text-[10px] text-zinc-900 font-bold">
                    {motionTuning.eyeY > 0 ? `+${motionTuning.eyeY}` : motionTuning.eyeY}px
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="w-[105px] text-[10.5px] text-zinc-800">
                    目の見開き (縦)
                  </span>
                  <input
                    type="range"
                    min={0.9}
                    max={1.12}
                    step={0.01}
                    value={motionTuning.eyeScaleY}
                    onChange={(e) =>
                      onChangeMotionTuning({
                        ...motionTuning,
                        customOffsetsEnabled: true,
                        eyeScaleY: parseFloat(e.target.value),
                      })
                    }
                    className="flex-1 accent-zinc-900 cursor-pointer"
                  />
                  <span className="w-[46px] text-right font-mono text-[10px] text-zinc-900 font-bold">
                    {Math.round(motionTuning.eyeScaleY * 100)}%
                  </span>
                </div>

                {/* 口の上下・縦拡縮 */}
                <div className="flex items-center justify-between gap-2">
                  <span className="w-[105px] text-[10.5px] text-zinc-800">
                    口の縦拡縮
                  </span>
                  <input
                    type="range"
                    min={0.9}
                    max={1.15}
                    step={0.01}
                    value={motionTuning.mouthScaleY}
                    onChange={(e) =>
                      onChangeMotionTuning({
                        ...motionTuning,
                        customOffsetsEnabled: true,
                        mouthScaleY: parseFloat(e.target.value),
                      })
                    }
                    className="flex-1 accent-zinc-900 cursor-pointer"
                  />
                  <span className="w-[46px] text-right font-mono text-[10px] text-zinc-900 font-bold">
                    {Math.round(motionTuning.mouthScaleY * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* フッター */}
      <div className="flex items-center justify-between border-t border-zinc-400 pt-2 text-[10px] text-zinc-600">
        {showAsBonus ? (
          <span className="text-zinc-600">
            ※お好みの眉・目・口・エフェクトを組み合わせてアッシュの表情を鑑賞できます
          </span>
        ) : (
          <>
            <span className="font-mono truncate">
              BROW:{activeFaceParts.brow} / EYE:{activeFaceParts.eyes} / MOUTH:
              {activeFaceParts.mouth}
              {activeFaceParts.effects.length > 0
                ? ` / FX:${activeFaceParts.effects.join(',')}`
                : ''}
            </span>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playTerminalTab();
                  onChangeMotionTuning(DEFAULT_MOTION_TUNING);
                  onReplayMotion();
                }}
                className="px-2 py-0.5 border border-zinc-400 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 cursor-pointer transition-colors"
              >
                初期化
              </button>
              <button
                type="button"
                onClick={handleCopyTuningSummary}
                className="px-2.5 py-0.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-950 font-bold cursor-pointer transition-colors"
              >
                {copiedText ? 'コピー完了!' : '設定値コピー'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
