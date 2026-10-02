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
  const [tab, setTab] = useState<'PARTS' | 'MOTION'>('PARTS');
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

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
  };

  const handleCopyTuningSummary = async () => {
    soundEngine.playTerminalTab();
    const summary = JSON.stringify(
      {
        expression: activeExpression,
        faceParts: activeFaceParts,
        motionTuning,
      },
      null,
      2
    );
    try {
      await navigator.clipboard.writeText(summary);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 1800);
    } catch {
      setCopiedText(false);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute left-3 top-[48px] bottom-[48px] w-[462px] z-40 bg-[#101116]/95 text-zinc-100 border border-zinc-600 shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex flex-col justify-between px-3.5 py-2.5 select-none pointer-events-auto"
    >
      {/* ヘッダー */}
      <div>
        <div className="flex items-center justify-between border-b border-zinc-700 pb-1.5">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 text-[9.5px] font-mono font-bold bg-zinc-200 text-zinc-950">
              {isBonusMode ? 'BONUS VIEWER' : 'DEBUG / VIEWER'}
            </span>
            <h3 className="text-[12.5px] font-bold tracking-wider text-white">
              表情・パーツ挙動ビューワー
            </h3>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEngine.playTerminalClose();
              onClose();
            }}
            className="text-[11px] text-zinc-400 hover:text-white px-1.5 py-0.5 cursor-pointer"
          >
            ✕ 閉じる
          </button>
        </div>

        {/* タブ切り替え ＆ 再再生ボタン */}
        <div className="flex items-center justify-between border-b border-zinc-800 pt-1.5 pb-1">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                soundEngine.playTerminalTab();
                setTab('PARTS');
              }}
              className={`text-[11px] pb-0.5 cursor-pointer transition-colors ${
                tab === 'PARTS'
                  ? 'text-white font-bold border-b-2 border-zinc-200'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              ① パーツ組み換え ({seenFaceParts.length}/28)
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playTerminalTab();
                setTab('MOTION');
              }}
              className={`text-[11px] pb-0.5 cursor-pointer transition-colors ${
                tab === 'MOTION'
                  ? 'text-white font-bold border-b-2 border-zinc-200'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              ② 動き・拡縮の調整
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                soundEngine.playTerminalTab();
                onReplayMotion();
              }}
              className="px-2 py-0.5 text-[10.5px] bg-zinc-200 hover:bg-white text-zinc-950 font-bold cursor-pointer"
            >
              ▶ モーション再再生
            </button>
            {isPreviewOverrideActive && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playTerminalTab();
                  onClearPreviewOverride();
                }}
                className="px-2 py-0.5 text-[10px] border border-zinc-600 text-zinc-300 hover:text-white hover:border-zinc-400 cursor-pointer"
              >
                元の表情に戻す
              </button>
            )}
          </div>
        </div>
      </div>

      {/* メインボディ */}
      <div className="flex-1 overflow-y-auto py-1.5 pr-1 space-y-2">
        {tab === 'PARTS' && (
          <>
            {/* ベースプリセット */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-400 font-mono">
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
                          ? 'bg-zinc-200 text-zinc-950 border-white font-bold'
                          : 'bg-zinc-900/90 text-zinc-300 border-zinc-700 hover:border-zinc-500'
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
              <span className="text-[10px] text-zinc-400 font-mono block">
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
                          ? 'bg-zinc-200 text-zinc-950 border-white font-bold'
                          : 'bg-zinc-900/90 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                      }`}
                    >
                      {isSeen && (
                        <span
                          className={`text-[8px] ${
                            isCurrent ? 'text-zinc-800' : 'text-zinc-400'
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
              <span className="text-[10px] text-zinc-400 font-mono block">
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
                          ? 'bg-zinc-200 text-zinc-950 border-white font-bold'
                          : 'bg-zinc-900/90 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                      }`}
                    >
                      {isSeen && (
                        <span
                          className={`text-[8px] ${
                            isCurrent ? 'text-zinc-800' : 'text-zinc-400'
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
              <span className="text-[10px] text-zinc-400 font-mono block">
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
                          ? 'bg-zinc-200 text-zinc-950 border-white font-bold'
                          : 'bg-zinc-900/90 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                      }`}
                    >
                      {isSeen && (
                        <span
                          className={`text-[8px] ${
                            isCurrent ? 'text-zinc-800' : 'text-zinc-400'
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

            {/* エフェクト (6種) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-400 font-mono">
                  EFFECTS // 感情エフェクト（複数重ね可）
                </span>
                {activeFaceParts.effects.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearEffects}
                    className="text-[9.5px] text-zinc-400 hover:text-white underline cursor-pointer"
                  >
                    すべて外す
                  </button>
                )}
              </div>
              <div className="grid grid-cols-6 gap-1">
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
                          ? 'bg-zinc-200 text-zinc-950 border-white font-bold'
                          : 'bg-zinc-900/90 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                      }`}
                    >
                      {isSeen && (
                        <span
                          className={`text-[8px] ${
                            isCurrent ? 'text-zinc-800' : 'text-zinc-400'
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

        {tab === 'MOTION' && (
          <div className="space-y-2.5 text-[11px]">
            {/* 1. 全体モーション強さ＆呼吸 */}
            <div className="p-2 bg-zinc-900/90 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-300 font-bold">
                  全体の動きの大きさ（倍率）
                </span>
                <div className="flex items-center gap-1">
                  {[
                    { val: 0, label: '0%(静止)' },
                    { val: 0.7, label: '70%' },
                    { val: 1, label: '100%(標準)' },
                    { val: 1.5, label: '150%' },
                    { val: 2, label: '200%' },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => {
                        soundEngine.playTerminalTab();
                        onChangeMotionTuning({
                          ...motionTuning,
                          motionScale: item.val,
                        });
                        onReplayMotion();
                      }}
                      className={`px-1.5 py-0.5 text-[10px] border cursor-pointer ${
                        Math.abs(motionTuning.motionScale - item.val) < 0.05
                          ? 'bg-zinc-200 text-zinc-950 border-white font-bold'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-700 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80">
                <span className="text-zinc-300">待機中の微細な呼吸（上下）</span>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playTerminalTab();
                    onChangeMotionTuning({
                      ...motionTuning,
                      breathingEnabled: !motionTuning.breathingEnabled,
                    });
                  }}
                  className={`px-2.5 py-0.5 text-[10.5px] border cursor-pointer ${
                    motionTuning.breathingEnabled
                      ? 'bg-zinc-200 text-zinc-950 border-white font-bold'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-700'
                  }`}
                >
                  {motionTuning.breathingEnabled ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* 2. 身体リアクション＆微震動テスト */}
            <div className="p-2 bg-zinc-900/90 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-zinc-300 font-bold">
                  身体リアクションのテスト再生
                </span>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playTerminalTab();
                    onChangeMotionTuning({
                      ...motionTuning,
                      forceTremor: !motionTuning.forceTremor,
                    });
                    onReplayMotion();
                  }}
                  className={`px-2 py-0.5 text-[10px] border cursor-pointer ${
                    motionTuning.forceTremor
                      ? 'bg-zinc-200 text-zinc-950 border-white font-bold'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-700'
                  }`}
                >
                  パーツ微震動(1回): {motionTuning.forceTremor ? '強制ON' : '自動'}
                </button>
              </div>

              <div className="grid grid-cols-6 gap-1">
                {(
                  [
                    { id: 'auto', label: '自動' },
                    { id: 'none', label: 'なし' },
                    { id: 'startle', label: 'ビクッ' },
                    { id: 'angry', label: '怒り揺れ' },
                    { id: 'pain', label: '苦悶震え' },
                    { id: 'sigh', label: '溜息沈み' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playTerminalTab();
                      onChangeMotionTuning({
                        ...motionTuning,
                        bodyReactionOverride: item.id,
                      });
                      onReplayMotion();
                    }}
                    className={`py-1 text-[10px] border text-center cursor-pointer ${
                      motionTuning.bodyReactionOverride === item.id
                        ? 'bg-zinc-200 text-zinc-950 border-white font-bold'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. 個別パーツ手動スライダー調整 */}
            <div className="p-2 bg-zinc-900/90 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-zinc-300 font-bold">
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
                      ? 'bg-zinc-200 text-zinc-950 border-white font-bold'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-700'
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
                  <span className="w-[105px] text-[10.5px] text-zinc-300">
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
                    className="flex-1 accent-zinc-200 cursor-pointer"
                  />
                  <span className="w-[46px] text-right font-mono text-[10px] text-zinc-200">
                    {motionTuning.browY > 0 ? `+${motionTuning.browY}` : motionTuning.browY}px
                  </span>
                </div>

                {/* 目の上下・縦拡縮 */}
                <div className="flex items-center justify-between gap-2">
                  <span className="w-[105px] text-[10.5px] text-zinc-300">
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
                    className="flex-1 accent-zinc-200 cursor-pointer"
                  />
                  <span className="w-[46px] text-right font-mono text-[10px] text-zinc-200">
                    {motionTuning.eyeY > 0 ? `+${motionTuning.eyeY}` : motionTuning.eyeY}px
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="w-[105px] text-[10.5px] text-zinc-300">
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
                    className="flex-1 accent-zinc-200 cursor-pointer"
                  />
                  <span className="w-[46px] text-right font-mono text-[10px] text-zinc-200">
                    {Math.round(motionTuning.eyeScaleY * 100)}%
                  </span>
                </div>

                {/* 口の上下・縦拡縮 */}
                <div className="flex items-center justify-between gap-2">
                  <span className="w-[105px] text-[10.5px] text-zinc-300">
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
                    className="flex-1 accent-zinc-200 cursor-pointer"
                  />
                  <span className="w-[46px] text-right font-mono text-[10px] text-zinc-200">
                    {Math.round(motionTuning.mouthScaleY * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* フッター */}
      <div className="flex items-center justify-between border-t border-zinc-800 pt-1.5 text-[10px] text-zinc-400">
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
            className="px-2 py-0.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white cursor-pointer"
          >
            動き設定初期化
          </button>
          <button
            type="button"
            onClick={handleCopyTuningSummary}
            className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 cursor-pointer"
          >
            {copiedText ? 'コピー完了!' : '設定値をコピー'}
          </button>
        </div>
      </div>
    </div>
  );
};
