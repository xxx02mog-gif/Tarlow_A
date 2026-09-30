import React, { useEffect, useRef } from 'react';
import { DialogueLogEntry } from '../types/game';

interface DialogueLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: DialogueLogEntry[];
}

export const DialogueLogModal: React.FC<DialogueLogModalProps> = ({
  isOpen,
  onClose,
  entries,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [isOpen, entries.length]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-40 bg-black/85 flex flex-col justify-between px-10 py-6 select-none animate-[fadeIn_0.15s_ease-out]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full h-full flex flex-col justify-between"
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 shrink-0">
          <span className="text-[13px] tracking-widest text-zinc-200">
            DIALOGUE LOG // 対話履歴
          </span>
          <button
            onClick={onClose}
            className="px-2.5 py-0.5 text-[12px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 cursor-pointer"
          >
            閉じる
          </button>
        </div>

        {/* 会話ログ一覧：すべて左寄せ、「名前　セリフ」の形式でセリフごとに枠なしで表示 */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto py-3 space-y-2 px-1 text-left"
        >
          {entries.length === 0 ? (
            <p className="text-[12px] text-zinc-500">
              履歴はまだありません。
            </p>
          ) : (
            entries.map((item) => {
              const speakerName = item.speaker === 'ASCH' ? 'アッシュ' : 'ガイ';
              return item.lines.map((line, i) => (
                <div
                  key={`${item.id}-${i}`}
                  className="flex items-baseline text-left text-[13px] leading-relaxed"
                >
                  <span className="w-[5.2em] shrink-0 text-zinc-400">
                    {speakerName}
                  </span>
                  <span className="text-zinc-100 break-words">
                    {line}
                  </span>
                </div>
              ));
            })
          )}
        </div>
      </div>
    </div>
  );
};
