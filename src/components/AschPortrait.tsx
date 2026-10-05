import React from 'react';
import { getAssetUrl } from '../utils/assetPath';
import {
  BrowPartId,
  EmotionEffectId,
  ExpressionId,
  EyePartId,
  FaceParts,
  MouthPartId,
} from '../types/game';

export const BROW_OPTIONS: { id: BrowPartId; label: string; file: string }[] = [
  { id: 'normal', label: '通常', file: 'brow_normal.png' },
  { id: 'angry', label: '怒り', file: 'brow_angry.png' },
  { id: 'sad', label: '困り', file: 'brow_sad.png' },
  { id: 'smile', label: '笑い', file: 'brow_smile.png' },
  { id: 'doubt', label: '訝しみ', file: 'brow_doubt.png' },
  { id: 'pain', label: '苦悶', file: 'brow_pain.png' },
];

export const EYE_OPTIONS: { id: EyePartId; label: string; file: string }[] = [
  { id: 'normal', label: '通常', file: 'eye_normal.png' },
  { id: 'away', label: 'そらし', file: 'eye_away.png' },
  { id: 'close', label: '閉じ', file: 'eye_close.png' },
  { id: 'smile', label: '微笑み', file: 'eye_smile.png' },
  { id: 'wide', label: '見開き', file: 'eye_wide.png' },
  { id: 'empty', label: '虚ろ', file: 'eye_empty.png' },
  { id: 'glare', label: '睨み', file: 'eye_glare.png' },
  { id: 'pain', label: '苦痛', file: 'eye_pain.png' },
  { id: 'down', label: '伏し目', file: 'eye_down.png' },
];

export const MOUTH_OPTIONS: { id: MouthPartId; label: string; file: string }[] = [
  { id: 'close', label: '閉じ', file: 'mouth_close.png' },
  { id: 'open', label: '開け', file: 'mouth_open.png' },
  { id: 'shout', label: '怒鳴る', file: 'mouth_shout.png' },
  { id: 'smile', label: '笑う', file: 'mouth_smile.png' },
  { id: 'grit', label: '食いしばり', file: 'mouth_grit.png' },
  { id: 'frown', label: 'への字', file: 'mouth_frown.png' },
  { id: 'gasp', label: '息呑み', file: 'mouth_gasp.png' },
];

export const EFFECT_OPTIONS: { id: EmotionEffectId; label: string; file: string }[] = [
  { id: 'sweat', label: '汗', file: 'fx_sweat.png' },
  { id: 'pale', label: '青褪め', file: 'fx_pale.png' },
  { id: 'blush', label: '頬染め', file: 'fx_blush.png' },
  { id: 'shadow', label: '目元影', file: 'fx_shadow.png' },
  { id: 'tears', label: '涙', file: 'fx_tears.png' },
];

export const DEFAULT_EXPRESSION_PARTS: Record<ExpressionId, FaceParts> = {
  normal: {
    brow: 'normal',
    eyes: 'normal',
    mouth: 'close',
    effects: [],
  },
  look_away: {
    brow: 'sad',
    eyes: 'away',
    mouth: 'frown',
    effects: [],
  },
  glare: {
    brow: 'angry',
    eyes: 'glare',
    mouth: 'frown',
    effects: ['shadow'],
  },
  shock: {
    brow: 'sad',
    eyes: 'wide',
    mouth: 'gasp',
    effects: ['sweat'],
  },
  pain: {
    brow: 'pain',
    eyes: 'pain',
    mouth: 'grit',
    effects: ['sweat', 'pale'],
  },
  empty: {
    brow: 'sad',
    eyes: 'empty',
    mouth: 'close',
    effects: ['pale'],
  },
};

const EXPRESSION_SINGLE_FILENAME: Record<ExpressionId, string> = {
  normal: 'test.png',
  look_away: 'test_look_away.png',
  glare: 'test_glare.png',
  shock: 'test_shock.png',
  pain: 'test_pain.png',
  empty: 'test_empty.png',
};

export interface PortraitMotionTuning {
  motionScale: number; // 0 = 動きなし, 1 = 標準(100%), 2 = 2倍(200%)
  breathingEnabled: boolean;
  bodyReactionOverride: 'auto' | 'none' | 'startle' | 'angry' | 'pain' | 'sigh';
  customOffsetsEnabled: boolean;
  browY: number;
  eyeX: number;
  eyeY: number;
  eyeScaleY: number;
  mouthY: number;
  mouthScaleY: number;
  forceTremor: boolean;
}

export const DEFAULT_MOTION_TUNING: PortraitMotionTuning = {
  motionScale: 1,
  breathingEnabled: true,
  bodyReactionOverride: 'auto',
  customOffsetsEnabled: false,
  browY: 0,
  eyeX: 0,
  eyeY: 0,
  eyeScaleY: 1,
  mouthY: 0,
  mouthScaleY: 1,
  forceTremor: false,
};

interface AschPortraitProps {
  expression: ExpressionId;
  faceParts: FaceParts;
  availableRootFiles: Set<string>;
  availablePartFiles: Set<string>;
  customTestPngSrc: string | null;
  customPartMap: Record<string, string>;
  onSelectTestPngFile: (file: File) => void;
  blurPx?: number;
  motionTuning?: PortraitMotionTuning;
  replayPulse?: number;
  eyeGlitchPulse?: number;
  isMaidMode?: boolean;
}

export const AschPortrait: React.FC<AschPortraitProps> = ({
  expression,
  faceParts,
  availableRootFiles,
  availablePartFiles,
  customTestPngSrc,
  customPartMap,
  onSelectTestPngFile,
  blurPx = 0,
  motionTuning = DEFAULT_MOTION_TUNING,
  replayPulse = 0,
  eyeGlitchPulse = 0,
  isMaidMode = false,
}) => {
  const [isResettingAnim, setIsResettingAnim] = React.useState(false);
  const [isEyeGlitching, setIsEyeGlitching] = React.useState(false);

  React.useEffect(() => {
    if (replayPulse <= 0) return;
    setIsResettingAnim(true);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsResettingAnim(false);
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [replayPulse]);

  React.useEffect(() => {
    if (eyeGlitchPulse <= 0) return;
    setIsEyeGlitching(true);
    const timer = window.setTimeout(() => {
      setIsEyeGlitching(false);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [eyeGlitchPulse]);

  const containerFilterStyle: React.CSSProperties = {
    transform: 'translateY(8px) scale(1.045)',
    transformOrigin: '50% 78%',
    filter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
    willChange: blurPx > 0 ? 'filter' : undefined,
  };
  // 実際に存在するパーツ画像のみを返す（未配置のURLへのリクエスト＆404によるチラつきを完全防止）
  const resolvePartSrc = (filename: string, fallbackFilename?: string): string | null => {
    const lower = filename.toLowerCase();
    if (customPartMap[lower]) return customPartMap[lower];
    if (availablePartFiles.has(lower)) return getAssetUrl(`images/parts/${lower}`);
    if (availableRootFiles.has(lower)) return getAssetUrl(`images/${lower}`);

    if (fallbackFilename && fallbackFilename !== filename) {
      const fbLower = fallbackFilename.toLowerCase();
      if (customPartMap[fbLower]) return customPartMap[fbLower];
      if (availablePartFiles.has(fbLower)) return getAssetUrl(`images/parts/${fbLower}`);
      if (availableRootFiles.has(fbLower)) return getAssetUrl(`images/${fbLower}`);
    }
    return null;
  };

  // 1. パーツ合成用ベース素体 (base2.png または base.png) の有無を確認
  const baseFileName = isMaidMode ? 'base2.png' : 'base.png';
  const basePartSrc = resolvePartSrc(baseFileName) || resolvePartSrc('base.png');

  // 2. 1枚絵フォールバック (test_*.png -> test.png)
  const expFile = EXPRESSION_SINGLE_FILENAME[expression] || 'test.png';
  const singleSheetSrc = availableRootFiles.has(expFile)
    ? getAssetUrl(`images/${expFile}`)
    : availableRootFiles.has('test.png')
    ? getAssetUrl('images/test.png')
    : null;

  const primaryBaseSrc = basePartSrc || singleSheetSrc || customTestPngSrc || null;

  // 3. 各パーツレイヤー（目・口・眉）の全バリエーションをDOM上に常駐
  // これにより、表情切り替えやグリッチパルス時の再マウント・点滅・一瞬の消失を100%防止
  const allMouthItems = React.useMemo(() => {
    return MOUTH_OPTIONS.map((opt) => ({
      id: opt.id,
      src: basePartSrc ? resolvePartSrc(opt.file, 'mouth_close.png') : resolvePartSrc(opt.file),
    })).filter((item): item is { id: MouthPartId; src: string } => Boolean(item.src));
  }, [basePartSrc, customPartMap, availablePartFiles, availableRootFiles]);

  const allEyeItems = React.useMemo(() => {
    return EYE_OPTIONS.map((opt) => ({
      id: opt.id,
      src: basePartSrc ? resolvePartSrc(opt.file, 'eye_normal.png') : resolvePartSrc(opt.file),
    })).filter((item): item is { id: EyePartId; src: string } => Boolean(item.src));
  }, [basePartSrc, customPartMap, availablePartFiles, availableRootFiles]);

  const allBrowItems = React.useMemo(() => {
    return BROW_OPTIONS.map((opt) => ({
      id: opt.id,
      src: basePartSrc ? resolvePartSrc(opt.file, 'brow_normal.png') : resolvePartSrc(opt.file),
    })).filter((item): item is { id: BrowPartId; src: string } => Boolean(item.src));
  }, [basePartSrc, customPartMap, availablePartFiles, availableRootFiles]);

  const activeEyeId = allEyeItems.some((i) => i.id === faceParts.eyes)
    ? faceParts.eyes
    : 'normal';
  const activeMouthId = allMouthItems.some((i) => i.id === faceParts.mouth)
    ? faceParts.mouth
    : 'close';
  const activeBrowId = allBrowItems.some((i) => i.id === faceParts.brow)
    ? faceParts.brow
    : 'normal';

  // 感情エフェクト：すべての登録エフェクト画像をDOM上に常駐させ、
  // activeフラグによる opacity (0 ⇄ 1) の CSS transition (0.36s) で制御。
  // これにより、会話進行やパーツ更新時の再マウント・点滅・チカつきが100%防止され、
  // 「ふわっと出現」および「ふわっと退場」が完全に安定して実現します。
  const allEffectItems = EFFECT_OPTIONS.map((opt) => ({
    id: opt.id,
    src: resolvePartSrc(opt.file),
    active: faceParts.effects.includes(opt.id),
  })).filter(
    (item): item is { id: EmotionEffectId; src: string; active: boolean } =>
      Boolean(item.src)
  );

  const scaleMul = motionTuning.motionScale;

  // === 1. 立ち絵全体の身体リアクション（驚き・怒鳴り・苦悶・溜息） ===
  let bodyReactionClass = '';
  if (!isResettingAnim && scaleMul > 0) {
    if (motionTuning.bodyReactionOverride !== 'auto') {
      if (motionTuning.bodyReactionOverride !== 'none') {
        bodyReactionClass = `portrait-react-${motionTuning.bodyReactionOverride}`;
      }
    } else if (
      expression === 'shock' ||
      faceParts.eyes === 'wide' ||
      faceParts.mouth === 'gasp'
    ) {
      bodyReactionClass = 'portrait-react-startle';
    } else if (
      faceParts.mouth === 'shout' ||
      (faceParts.brow === 'angry' && faceParts.eyes === 'glare')
    ) {
      bodyReactionClass = 'portrait-react-angry';
    } else if (
      expression === 'pain' ||
      faceParts.brow === 'pain' ||
      faceParts.eyes === 'pain'
    ) {
      bodyReactionClass = 'portrait-react-pain';
    } else if (
      (faceParts.eyes === 'close' || faceParts.eyes === 'down') &&
      (faceParts.brow === 'sad' || faceParts.mouth === 'frown')
    ) {
      bodyReactionClass = 'portrait-react-sigh';
    }
  }

  // === 2. 眉パーツの上下オフセット＆微震動 ===
  let browTranslateY = 0;
  if (motionTuning.customOffsetsEnabled) {
    browTranslateY = motionTuning.browY;
  } else {
    if (faceParts.eyes === 'wide' || expression === 'shock') {
      browTranslateY = -2.2 * scaleMul;
    } else if (faceParts.brow === 'angry' || faceParts.eyes === 'glare') {
      browTranslateY = 1.6 * scaleMul;
    } else if (faceParts.brow === 'pain') {
      browTranslateY = 1.4 * scaleMul;
    } else if (faceParts.brow === 'sad' || faceParts.eyes === 'down') {
      browTranslateY = 1.0 * scaleMul;
    } else if (faceParts.brow === 'smile') {
      browTranslateY = -0.8 * scaleMul;
    } else if (faceParts.brow === 'doubt') {
      browTranslateY = 0.7 * scaleMul;
    }
  }
  const isBrowTrembling =
    !isResettingAnim &&
    scaleMul > 0 &&
    (motionTuning.forceTremor ||
      faceParts.brow === 'pain' ||
      expression === 'pain');

  // === 3. 目パーツの視線・見開きオフセット＆瞳の揺れ ===
  let eyeTransform = 'translate(0px, 0px) scaleY(1)';
  if (motionTuning.customOffsetsEnabled) {
    eyeTransform = `translate(${motionTuning.eyeX}px, ${motionTuning.eyeY}px) scaleY(${motionTuning.eyeScaleY})`;
  } else {
    if (faceParts.eyes === 'wide') {
      eyeTransform = `translate(0px, ${-0.8 * scaleMul}px) scaleY(${1 + 0.03 * scaleMul})`;
    } else if (faceParts.eyes === 'down' || faceParts.eyes === 'close') {
      eyeTransform = `translate(0px, ${1.0 * scaleMul}px) scaleY(1)`;
    } else if (faceParts.eyes === 'away') {
      eyeTransform = `translate(${0.9 * scaleMul}px, ${0.4 * scaleMul}px) scaleY(1)`;
    } else if (faceParts.eyes === 'glare') {
      eyeTransform = `translate(0px, ${0.5 * scaleMul}px) scaleY(${1 - 0.02 * scaleMul})`;
    } else if (faceParts.eyes === 'smile') {
      eyeTransform = `translate(0px, ${-0.4 * scaleMul}px) scaleY(1)`;
    }
  }
  const isEyeTrembling =
    !isResettingAnim &&
    scaleMul > 0 &&
    (motionTuning.forceTremor ||
      faceParts.eyes === 'pain' ||
      (faceParts.eyes === 'wide' &&
        (faceParts.effects.includes('sweat') ||
          faceParts.effects.includes('pale') ||
          faceParts.brow === 'pain')) ||
      (faceParts.eyes === 'empty' && faceParts.effects.includes('tears')));

  // === 4. 口パーツの発声・噛み締めオフセット＆震え ===
  let mouthTransform = 'translateY(0px) scaleY(1)';
  if (motionTuning.customOffsetsEnabled) {
    mouthTransform = `translateY(${motionTuning.mouthY}px) scaleY(${motionTuning.mouthScaleY})`;
  } else {
    if (faceParts.mouth === 'frown') {
      mouthTransform = `translateY(${0.8 * scaleMul}px) scaleY(1)`;
    } else if (faceParts.mouth === 'smile') {
      mouthTransform = `translateY(${-0.5 * scaleMul}px) scaleY(1)`;
    } else if (faceParts.mouth === 'gasp') {
      mouthTransform = `translateY(${-0.5 * scaleMul}px) scaleY(${1 + 0.03 * scaleMul})`;
    }
  }
  const isMouthTrembling =
    !isResettingAnim &&
    scaleMul > 0 &&
    (motionTuning.forceTremor || faceParts.mouth === 'grit');

  const mouthAnimClass =
    isResettingAnim || scaleMul <= 0
      ? ''
      : faceParts.mouth === 'shout'
        ? 'mouth-anim-shout'
        : faceParts.mouth === 'open' || faceParts.mouth === 'gasp'
          ? 'mouth-anim-speak'
          : '';

  const tremorSignature = `${expression}-${faceParts.brow}-${faceParts.eyes}-${faceParts.mouth}-${(faceParts.effects ?? []).join(',')}-${replayPulse}`;

  return (
    <div className="relative w-full h-full flex items-end justify-center select-none overflow-hidden">
      <div
        className={`relative w-full h-full flex items-end justify-center ${
          motionTuning.breathingEnabled && scaleMul > 0
            ? 'portrait-alive-breathing'
            : ''
        }`}
      >
        {primaryBaseSrc ? (
          <div
            className={`relative h-full w-full flex items-end justify-center pointer-events-none ${bodyReactionClass}`}
          >
            {/* === 同寸透過PNGパーツ合成コンテナ ===
                存在するファイルのみを参照するため、表情切替時の404チラつきや表示遅延が発生しません
                ※上下に揺れた際も下端が途切れて見えないよう、全体を少し拡大して下方向へ余白を持たせて配置 */}
            <div
              style={containerFilterStyle}
              className="relative z-10 max-h-full h-full w-auto flex items-end justify-center"
            >
              {/* レイヤー1：素体（base.png または test.png） */}
              <img
                src={primaryBaseSrc}
                alt="アッシュ"
                decoding="sync"
                className="relative z-10 max-h-full w-auto object-contain block"
              />

              {/* レイヤー2：口パーツ（mouth_*.png） */}
              {allMouthItems.length > 0 && (
                <div
                  style={{
                    transform: mouthTransform,
                    transformOrigin: '50% 42%',
                  }}
                  className="absolute inset-0 z-11 w-full h-full transition-transform duration-150 ease-out pointer-events-none"
                >
                  <div
                    key={`mouth-burst-${tremorSignature}`}
                    className={`w-full h-full ${
                      isMouthTrembling ? 'part-micro-tremor-burst' : ''
                    }`}
                  >
                    <div
                      className={`w-full h-full ${
                        isMouthTrembling
                          ? 'part-micro-tremor-sustained'
                          : mouthAnimClass
                      }`}
                    >
                      {allMouthItems.map((item) => (
                        <img
                          key={item.id}
                          src={item.src}
                          alt=""
                          decoding="sync"
                          style={{
                            visibility: item.id === activeMouthId ? 'visible' : 'hidden',
                          }}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* レイヤー3：目パーツ（eye_*.png） */}
              {allEyeItems.length > 0 && (
                <div
                  style={{
                    transform: eyeTransform,
                    transformOrigin: '50% 34%',
                  }}
                  className="absolute inset-0 z-12 w-full h-full transition-transform duration-200 ease-out pointer-events-none"
                >
                  <div
                    key={`eye-burst-${tremorSignature}`}
                    className={`w-full h-full ${
                      isEyeTrembling ? 'part-micro-tremor-burst' : ''
                    }`}
                  >
                    <div
                      className={`w-full h-full ${
                        isEyeTrembling ? 'part-micro-tremor-sustained' : ''
                      }`}
                    >
                      <div
                        className={`w-full h-full ${
                          isEyeGlitching ? 'eye-glitch-split' : ''
                        }`}
                      >
                        {allEyeItems.map((item) => (
                          <img
                            key={item.id}
                            src={item.src}
                            alt=""
                            decoding="sync"
                            style={{
                              visibility: item.id === activeEyeId ? 'visible' : 'hidden',
                            }}
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* レイヤー4：眉パーツ（brow_*.png） */}
              {allBrowItems.length > 0 && (
                <div
                  style={{
                    transform: `translateY(${browTranslateY}px)`,
                  }}
                  className="absolute inset-0 z-13 w-full h-full transition-transform duration-200 ease-out pointer-events-none"
                >
                  <div
                    key={`brow-burst-${tremorSignature}`}
                    className={`w-full h-full ${
                      isBrowTrembling ? 'part-micro-tremor-burst' : ''
                    }`}
                  >
                    <div
                      className={`w-full h-full ${
                        isBrowTrembling ? 'part-micro-tremor-sustained' : ''
                      }`}
                    >
                      {allBrowItems.map((item) => (
                        <img
                          key={item.id}
                          src={item.src}
                          alt=""
                          decoding="sync"
                          style={{
                            visibility: item.id === activeBrowId ? 'visible' : 'hidden',
                          }}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* レイヤー5：感情エフェクト差分パーツ（常駐DOM＋CSS opacity transition）
                  再マウントによるリセットや点滅・チカつきを完全に防ぎつつ、
                  出現時はふわっとフェードイン、消失時はふわっとフェードアウト */}
              {allEffectItems.map((eff) => (
                <div
                  key={eff.id}
                  style={{
                    opacity: eff.active ? 1 : 0,
                    transition: 'opacity 0.36s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="absolute inset-0 z-14 w-full h-full pointer-events-none"
                >
                  <img
                    src={eff.src}
                    alt=""
                    decoding="sync"
                    className="w-full h-full object-contain pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="pointer-events-auto flex flex-col items-center justify-center w-[235px] h-[270px] mb-5 border border-dashed border-zinc-700 bg-black/80 p-4 text-center">
            <p className="text-[11px] text-zinc-200 font-mono mb-1.5 leading-relaxed font-bold">
              /public/images/test.png
            </p>
            <p className="text-[10px] text-zinc-400 mb-3 leading-normal">
              左のファイル一覧の <span className="text-zinc-200 font-mono">public/images/parts/</span> にパーツ画像を配置するか、下のボタンで選択するとゲーム内に直接組み込まれます。
            </p>
            <label className="px-3 py-1.5 text-[11px] font-mono bg-zinc-100 hover:bg-white text-zinc-950 font-bold cursor-pointer">
              画像を組み込む
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onSelectTestPngFile(f);
                }}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
