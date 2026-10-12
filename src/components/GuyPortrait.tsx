import React, { useState } from 'react';
import { getAssetUrl } from '../utils/assetPath';

export interface GuyFaceParts {
  base?: 'base' | 'base2'; // base: 通常立ち絵, base2: 口元に手を当てて思案するポーズ
  brow?: 'normal' | 'nomal' | 'angry' | 'angly' | 'stunned' | 'troubled' | 'serious';
  eyes?: 'normal' | 'open' | 'close' | 'away' | 'half' | 'smile' | 'smiile' | 'surprise';
  mouth?: 'normal' | 'nomal' | 'open' | 'close' | 'smile' | 'tight';
  ex?: 'EX1' | 'EX2' | 'shadow' | 'EX_shadow'; // EX1: 冷や汗, EX2: 怪訝, shadow: 青褪め・影
  effects?: string[];
}

export type GuyBodyReaction =
  | 'auto'
  | 'none'
  | 'startle'
  | 'angry'
  | 'pain'
  | 'sigh'
  | 'nod';

interface GuyPortraitProps {
  expression?: string;
  faceParts?: GuyFaceParts;
  bodyReaction?: GuyBodyReaction;
  replayPulse?: number;
  className?: string;
  scale?: number;
  offsetY?: number;
  offsetX?: number;
}

export const GuyPortrait: React.FC<GuyPortraitProps> = ({
  expression = 'normal',
  faceParts,
  bodyReaction = 'auto',
  replayPulse = 0,
  className = '',
  scale = 1.0,
  offsetY = 0,
  offsetX = 0,
}) => {
  const [hasBaseImageError, setHasBaseImageError] = useState(false);
  const [isResettingAnim, setIsResettingAnim] = useState(false);

  // 正規化
  const baseVariant = faceParts?.base === 'base2' ? 'base2' : 'base';

  let normalizedBrow: 'normal' | 'angry' | 'stunned' | 'serious' = 'normal';
  if (faceParts?.brow === 'serious') {
    normalizedBrow = 'serious';
  } else if (faceParts?.brow === 'angry' || faceParts?.brow === 'angly') {
    normalizedBrow = 'angry';
  } else if (faceParts?.brow === 'stunned' || faceParts?.brow === 'troubled') {
    normalizedBrow = 'stunned';
  }

  let normalizedEyes:
    | 'normal'
    | 'open'
    | 'close'
    | 'half'
    | 'away'
    | 'smile'
    | 'surprise' = 'normal';
  if (faceParts?.eyes === 'surprise') {
    normalizedEyes = 'surprise';
  } else if (faceParts?.eyes === 'open') {
    normalizedEyes = 'open';
  } else if (faceParts?.eyes === 'smiile' || faceParts?.eyes === 'smile') {
    normalizedEyes = 'smile';
  } else if (faceParts?.eyes === 'close') {
    normalizedEyes = 'close';
  } else if (faceParts?.eyes === 'half') {
    normalizedEyes = 'half';
  } else if (faceParts?.eyes === 'away') {
    normalizedEyes = 'away';
  }

  let normalizedMouth: 'normal' | 'open' | 'close' | 'smile' = 'normal';
  if (faceParts?.mouth === 'smile') {
    normalizedMouth = 'smile';
  } else if (faceParts?.mouth === 'open') {
    normalizedMouth = 'open';
  } else if (faceParts?.mouth === 'close' || faceParts?.mouth === 'tight') {
    normalizedMouth = 'close';
  }

  let normalizedEx: 'EX1' | 'EX2' | 'EX_shadow' | null = null;
  if (faceParts?.ex === 'EX1') {
    normalizedEx = 'EX1';
  } else if (faceParts?.ex === 'EX2') {
    normalizedEx = 'EX2';
  } else if (faceParts?.ex === 'shadow' || faceParts?.ex === 'EX_shadow') {
    normalizedEx = 'EX_shadow';
  }

  // 身体リアクションの自動判定＆クラス選定
  let calculatedReaction: 'startle' | 'angry' | 'pain' | 'sigh' | null = null;
  if (bodyReaction !== 'auto') {
    if (bodyReaction !== 'none' && bodyReaction !== 'nod') {
      calculatedReaction = bodyReaction;
    }
  } else {
    if (
      normalizedBrow === 'stunned' ||
      normalizedEyes === 'open' ||
      normalizedEyes === 'surprise'
    ) {
      calculatedReaction = 'startle'; // 目を見張る・ハッとする
    } else if (normalizedBrow === 'angry') {
      calculatedReaction = 'angry'; // 身構える・険しい
    } else if (
      normalizedEx === 'EX1' ||
      normalizedEx === 'EX2' ||
      normalizedEx === 'EX_shadow' ||
      normalizedEyes === 'away' ||
      normalizedEyes === 'close'
    ) {
      calculatedReaction = 'sigh'; // やれやれ・苦笑・ため息
    }
  }

  // 表情やリアクション変更時にアニメーションを1回再生し直す
  const reactionSignature = `${baseVariant}-${normalizedBrow}-${normalizedEyes}-${normalizedMouth}-${normalizedEx ?? ''}-${calculatedReaction ?? ''}-${replayPulse}`;
  const prevSignatureRef = React.useRef(reactionSignature);

  React.useEffect(() => {
    if (prevSignatureRef.current !== reactionSignature) {
      prevSignatureRef.current = reactionSignature;
      setIsResettingAnim(true);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsResettingAnim(false);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [reactionSignature]);

  const reactionClass =
    !isResettingAnim && calculatedReaction
      ? `portrait-react-${calculatedReaction}`
      : '';

  // === パーツごとの微細な動的変化（眉・目・口の拡縮＆位置シフト＆微細な揺れ） ===
  // 眉の上下シフト
  let browTranslateY = 0;
  if (normalizedBrow === 'stunned') {
    browTranslateY = -2.0; // 呆れ・ハッとする・驚きで持ち上がる
  } else if (normalizedBrow === 'angry') {
    browTranslateY = 1.6; // 険しい表情・真剣さで引き締める
  } else if (normalizedBrow === 'serious') {
    browTranslateY = 0.8; // 知的な集中・引き締まり
  }

  // 目の拡縮＆視線オフセット
  let eyeTransform = 'translate(0px, 0px) scaleY(1)';
  if (normalizedEyes === 'surprise' || normalizedEyes === 'open') {
    eyeTransform = 'translate(0px, -1.0px) scaleY(1.05)'; // 見開き・ハッとする
  } else if (normalizedEyes === 'half') {
    eyeTransform = 'translate(0px, 0.4px) scaleY(0.97)'; // 半目・呆れ
  } else if (normalizedEyes === 'away') {
    eyeTransform = 'translate(0.8px, 0.3px) scaleY(1)'; // 視線逸らし
  } else if (normalizedEyes === 'close') {
    eyeTransform = 'translate(0px, 0.6px) scaleY(1)'; // 目を閉じる・溜息
  } else if (normalizedEyes === 'smile') {
    eyeTransform = 'translate(0px, -0.3px) scaleY(1)'; // 微笑み
  }

  // 口の上下シフト＆発声アニメーション
  let mouthTransform = 'translateY(0px) scaleY(1)';
  if (normalizedMouth === 'smile') {
    mouthTransform = 'translateY(-0.4px) scaleY(1)';
  } else if (normalizedMouth === 'close') {
    mouthTransform = 'translateY(0.4px) scaleY(0.98)';
  }

  const mouthAnimClass =
    !isResettingAnim && normalizedMouth === 'open' ? 'mouth-anim-speak' : '';

  // 瞳・表情の微細な揺れ
  const isEyeTrembling =
    !isResettingAnim &&
    (normalizedEx === 'EX2' || normalizedEx === 'EX_shadow') &&
    (normalizedBrow === 'stunned' || normalizedBrow === 'angry');
  const isBrowTrembling = isEyeTrembling;

  const tremorSignature = `${reactionSignature}`;

  // 表情パーツ定義（常駐描画用・チラつき根絶）
  const browList = ['normal', 'angry', 'stunned', 'serious'] as const;
  const eyeList = [
    'normal',
    'open',
    'close',
    'half',
    'away',
    'smile',
    'surprise',
  ] as const;
  const mouthList = ['normal', 'open', 'close', 'smile'] as const;
  const exList = ['EX1', 'EX2', 'EX_shadow'] as const;

  return (
    <div
      className={`relative w-full h-full select-none overflow-visible ${className}`}
    >
      {!hasBaseImageError ? (
        <div className={`relative w-full h-full pointer-events-none portrait-alive-breathing ${reactionClass}`}>
          {/* ガイ（成人184cm）の体格・頭頂位置：スライダー連動配置 */}
          <div
            style={{
              transform: `translate(calc(-50% + ${offsetX}px), ${offsetY}px) scale(${scale})`,
              transformOrigin: '50% 25%',
            }}
            className="absolute left-1/2 -top-[10px] w-[320px] h-[460px] flex items-start justify-center transition-transform duration-75"
          >
            {/* ベース素体（base: 通常, base2: 口元に手を当てる思考ポーズ。visibilityで常時GPU常駐・瞬時切り替え） */}
            {(['base', 'base2'] as const).map((b) => (
              <img
                key={`base-${b}`}
                src={getAssetUrl(`images/guy_chara/guy_${b}.png`)}
                alt="ガイ"
                loading="eager"
                decoding="sync"
                aria-hidden={baseVariant !== b}
                onError={() => setHasBaseImageError(true)}
                style={{ visibility: baseVariant === b ? 'visible' : 'hidden' }}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              />
            ))}

            {/* 眉差分（全パーツ常駐・即時切り替え＋動的オフセット＋微細な揺れ） */}
            <div
              style={{
                transform: `translateY(${browTranslateY}px)`,
              }}
              className="absolute inset-0 z-12 w-full h-full transition-transform duration-200 ease-out pointer-events-none"
            >
              <div
                key={`guy-brow-burst-${tremorSignature}`}
                className={`w-full h-full ${
                  isBrowTrembling ? 'part-micro-tremor-burst' : ''
                }`}
              >
                <div
                  className={`w-full h-full ${
                    isBrowTrembling ? 'part-micro-tremor-sustained' : ''
                  }`}
                >
                  {browList.map((b) => (
                    <img
                      key={`brow-${b}`}
                      src={getAssetUrl(`images/guy_chara/guy_brow_${b}.png`)}
                      alt=""
                      loading="eager"
                      decoding="sync"
                      aria-hidden={normalizedBrow !== b}
                      style={{
                        visibility: normalizedBrow === b ? 'visible' : 'hidden',
                      }}
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 目差分（全パーツ常駐・即時切り替え＋動的拡縮・視線オフセット＋瞳の微震動） */}
            <div
              style={{
                transform: eyeTransform,
                transformOrigin: '50% 28%',
              }}
              className="absolute inset-0 z-13 w-full h-full transition-transform duration-200 ease-out pointer-events-none"
            >
              <div
                key={`guy-eye-burst-${tremorSignature}`}
                className={`w-full h-full ${
                  isEyeTrembling ? 'part-micro-tremor-burst' : ''
                }`}
              >
                <div
                  className={`w-full h-full ${
                    isEyeTrembling ? 'part-micro-tremor-sustained' : ''
                  }`}
                >
                  {eyeList.map((e) => (
                    <img
                      key={`eye-${e}`}
                      src={getAssetUrl(`images/guy_chara/guy_eye_${e}.png`)}
                      alt=""
                      loading="eager"
                      decoding="sync"
                      aria-hidden={normalizedEyes !== e}
                      style={{
                        visibility: normalizedEyes === e ? 'visible' : 'hidden',
                      }}
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 口差分（全パーツ常駐・即時切り替え＋微細オフセット＋発声アニメーション） */}
            <div
              style={{
                transform: mouthTransform,
                transformOrigin: '50% 32%',
              }}
              className="absolute inset-0 z-14 w-full h-full transition-transform duration-150 ease-out pointer-events-none"
            >
              <div className={`w-full h-full ${mouthAnimClass}`}>
                {mouthList.map((m) => (
                  <img
                    key={`mouth-${m}`}
                    src={getAssetUrl(`images/guy_chara/guy_mouth_${m}.png`)}
                    alt=""
                    loading="eager"
                    decoding="sync"
                    aria-hidden={normalizedMouth !== m}
                    style={{
                      visibility: normalizedMouth === m ? 'visible' : 'hidden',
                    }}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  />
                ))}
              </div>
            </div>

            {/* EX差分（EX1: 冷や汗, EX2: 怪訝, EX_shadow: 青褪め・影） */}
            {exList.map((item) => (
              <img
                key={`ex-${item}`}
                src={getAssetUrl(`images/guy_chara/guy_${item}.png`)}
                alt=""
                loading="eager"
                decoding="sync"
                aria-hidden={normalizedEx !== item}
                style={{
                  visibility: normalizedEx === item ? 'visible' : 'hidden',
                }}
                className="absolute inset-0 z-15 w-full h-full object-contain pointer-events-none"
              />
            ))}
          </div>
        </div>
      ) : (
        /* フォールバック枠 */
        <div className="relative w-[280px] h-[360px] border border-zinc-800 bg-zinc-950/70 rounded flex flex-col items-center justify-center p-6 text-zinc-400">
          <div className="w-20 h-20 rounded-full border border-zinc-700 bg-zinc-900/80 flex items-center justify-center mb-4 text-zinc-300">
            <svg
              className="w-10 h-10 stroke-zinc-400"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="text-[13px] tracking-widest text-zinc-300 font-mono">
            GUY CECIL
          </div>
          <div className="text-[11px] text-zinc-500 mt-1 tracking-wider">
            [ THINKING // 思考中 ]
          </div>
        </div>
      )}
    </div>
  );
};
