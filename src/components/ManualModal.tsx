import React from 'react';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 px-5 py-6 font-zen select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[680px] max-h-full bg-zinc-950 border border-zinc-600 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-700 flex items-center justify-between shrink-0">
          <span className="text-[12px] tracking-widest text-zinc-200">
            MANUAL / 操作・対話の手引き
          </span>
          <button
            onClick={onClose}
            className="px-2.5 py-0.5 text-[11.5px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-600 cursor-pointer"
          >
            × 閉じる
          </button>
        </div>

        {/* 本文 */}
        <div className="px-5 py-3.5 space-y-2.5 text-[11.5px] text-zinc-300 leading-snug">
          {/* 導入 */}
          <p className="text-zinc-200 leading-relaxed whitespace-nowrap">
            ディストの研究所で見つけた「かつてのアッシュ」の姿をした譜業。
            <br />
            言葉をかわしたり、端末の情報を見て、彼を「何」とするか決めるゲームです。
          </p>

          {/* 左右2カラム分割：左＝会話の進め方 ／ 右＝端末の見方 */}
          <div className="grid grid-cols-2 gap-5 border-t border-zinc-800 pt-2.5">
            {/* 左カラム：会話の進め方 */}
            <div className="space-y-1.5 pr-1">
              <div className="text-zinc-100 font-semibold tracking-wider border-b border-zinc-800/80 pb-1">
                ■ 会話の進め方
              </div>

              <div className="space-y-1.5 text-[11px] text-zinc-400 leading-snug">
                <div>
                  <span className="text-zinc-200 font-semibold">・話しかける</span>
                  <p className="mt-0.5 pl-3 whitespace-nowrap">
                    左下の選択肢から言葉を選びます。
                    <br />
                    <span className="text-zinc-300">[ ▶ 他の話題 ]</span> で別の候補に切り替えられます。
                  </p>
                </div>

                <div>
                  <span className="text-zinc-200 font-semibold">・話題の追加</span>
                  <p className="mt-0.5 pl-3 whitespace-nowrap">
                    話した内容や、端末で目にした記録から
                    <br />
                    新しい話題が浮かびます。
                  </p>
                </div>

                <div>
                  <span className="text-zinc-200 font-semibold">・相手の機嫌</span>
                  <p className="mt-0.5 pl-3 whitespace-nowrap">
                    問い詰めすぎると口を閉ざしてしまいます。
                    <br />
                    話題を変えるか、少し黙って待つと落ち着きます。
                  </p>
                </div>
              </div>
            </div>

            {/* 右カラム：管理端末の見方 */}
            <div className="space-y-1.5 border-l border-zinc-800 pl-5">
              <div className="text-zinc-100 font-semibold tracking-wider border-b border-zinc-800/80 pb-1">
                ■ 管理端末の見方
              </div>

              <div className="space-y-1.5 text-[11px] text-zinc-400 leading-snug">
                <div>
                  <span className="text-zinc-200 font-semibold">・管理端末を開く</span>
                  <p className="mt-0.5 pl-3 whitespace-nowrap">
                    右下の <span className="text-zinc-300">[ 管理端末 ]</span> で開閉します。
                    <br />
                    記録が増えると赤い点がつきます。
                  </p>
                </div>

                <div>
                  <span className="text-zinc-200 font-semibold">・1/2 : MONITOR</span>
                  <p className="mt-0.5 pl-3 whitespace-nowrap">
                    感情の揺れと、機体の稼働ログを確認できます。
                  </p>
                </div>

                <div>
                  <span className="text-zinc-200 font-semibold">・2/2 : INFO</span>
                  <p className="mt-0.5 pl-3 whitespace-nowrap">
                    機体情報や記憶の記録です。
                    <br />
                    伏字の <span className="text-zinc-300">[PROTECTED]</span> は対話で開くほか、
                    <br />
                    <span className="text-zinc-300">長押しでロックをこじ開ける</span>こともできます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
