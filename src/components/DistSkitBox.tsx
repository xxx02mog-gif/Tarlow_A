import React, { useEffect } from 'react';
import { DistCommentData } from '../data/distComments';
import { soundEngine } from '../utils/chiptuneAudio';

interface DistSkitBoxProps {
  data: DistCommentData;
  lineIndex?: number;
  className?: string;
}

export const DistSkitBox: React.FC<DistSkitBoxProps> = ({
  data,
  lineIndex = 0,
  className = '',
}) => {
  useEffect(() => {
    soundEngine.playProtectCaptured();
  }, []);

  const lines = data.lines && data.lines.length > 0 ? data.lines : [data.comment];
  const activeLine = lines[Math.min(lineIndex, lines.length - 1)] || data.comment;

  const brow =
    lineIndex >= 2 && data.thirdBrow
      ? data.thirdBrow
      : lineIndex >= 1 && data.secondBrow
        ? data.secondBrow
        : data.brow;
  const eye =
    lineIndex >= 2 && data.thirdEye
      ? data.thirdEye
      : lineIndex >= 1 && data.secondEye
        ? data.secondEye
        : data.eye;
  const mouth =
    lineIndex >= 2 && data.thirdMouth
      ? data.thirdMouth
      : lineIndex >= 1 && data.secondMouth
        ? data.secondMouth
        : data.mouth;

  return (
    <div
      className={`w-full max-w-[540px] mx-auto flex flex-col items-center justify-center space-y-4 animate-bubble-in ${className}`}
    >
      {/* スキット顔グラフィック（左右中央寄せ・正方形枠） */}
      <div className="relative w-[130px] h-[130px] rounded border border-zinc-700 bg-zinc-950 shadow-lg overflow-hidden shrink-0">
        <img
          src="/images/dist/dist_base.png"
          alt="ディスト"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        />
        {brow && brow !== 'none' && (
          <img
            src={`/images/dist/dist_brow_${brow}.png`}
            alt="眉"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          />
        )}
        {eye && eye !== 'none' && (
          <img
            src={`/images/dist/dist_eye_${eye}.png`}
            alt="目"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          />
        )}
        {mouth && mouth !== 'none' && (
          <img
            src={`/images/dist/dist_mouse_${mouth}.png`}
            alt="口"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          />
        )}
      </div>

      {/* その下に1行表示のセリフ（クリックで1行ずつ進行） */}
      <div className="w-full px-4 text-center min-h-[30px] flex items-center justify-center">
        <p
          key={lineIndex}
          className="text-[14px] leading-relaxed tracking-wider text-zinc-100 whitespace-pre-wrap select-none font-sans animate-bubble-in"
        >
          {activeLine}
        </p>
      </div>
    </div>
  );
};

