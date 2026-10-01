import React from 'react';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 p-4 font-mono select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-zinc-950 border border-zinc-600 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="px-4 py-2.5 bg-zinc-900 border-b border-zinc-700 flex items-center justify-between">
          <span className="text-xs tracking-widest text-zinc-200">
            MANUAL / 操作・対話の手引き
          </span>
          <button
            onClick={onClose}
            className="px-2 py-0.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-600 cursor-pointer"
          >
            × 閉じる
          </button>
        </div>

        {/* 本文 */}
        <div className="p-4 space-y-3 text-xs text-zinc-300 leading-relaxed">
          <p className="text-zinc-200">
            ディストの研究所で見つけた、攫われる前の少年の姿をしたアンドロイドのアッシュを自室に連れ帰り、彼を「何」として「どう」するか決めるゲームです。
          </p>

          <div className="space-y-2.5 border-t border-zinc-800 pt-2.5">
            <div>
              <span className="text-zinc-100 font-semibold">■ 会話の進め方</span>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                ・画面左下の話題リストから項目を選ぶことで、相手に話しかけられます（他にも話題がある場合は見出し右端の <span className="text-zinc-300">[ ▶ 他の話題 ]</span> でページを送れます）。<br />
                ・会話を進めたり、端末のデータを確認したりすることで新しい話題が追加され、関連する話題が優先表示されます。<br />
                ・相手が不機嫌になると一部の話題に答えなくなりますが、気遣う話題を選ぶかしばらく無言で放置すると落ち着きます。
              </p>
            </div>

            <div>
              <span className="text-zinc-100 font-semibold">■ データ端末（全2ページ）</span>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                ・<span className="text-zinc-300">開き方</span>：画面右下の <span className="text-zinc-300">[ 端末 ] アイコン（ボタン）</span> をクリックするとデータ端末を表示します（未読データ追加時は赤い点が付きます）。<br />
                ・<span className="text-zinc-300">1/2 : MONITOR</span>：現在の感情波形（EMOTION_WAVE）とシステム稼働ログ（SYSTEM_LOG）を確認できます。<br />
                ・<span className="text-zinc-300">2/2 : INFO</span>：会話や観測で記録されたデータ（MC:機体ログ / EM:情動反応 / DP:深層記憶）を閲覧できます。伏字の <span className="text-zinc-300">[PROTECTED] 項目は、長押しすることでロックを強制解除</span>して閲覧することも可能です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
