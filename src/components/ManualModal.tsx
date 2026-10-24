import React from 'react';
import { useLanguage } from '../utils/i18n';
import { LanguageSelector } from './LanguageSelector';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose }) => {
  const [lang] = useLanguage();
  if (!isOpen) return null;

  return (
    <div
      className="absolute -inset-x-0 -top-[44px] -bottom-[44px] z-50 flex items-center justify-center bg-black/80 px-5 py-6 font-zen select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[680px] max-h-full bg-zinc-950 border border-zinc-600 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-700 flex items-center justify-between shrink-0">
          <span className="text-[12px] tracking-widest text-zinc-200">
            {lang === 'en'
              ? 'MANUAL / Operation & Dialogue Guide'
              : lang === 'ko'
                ? 'MANUAL / 조작 및 대화 가이드'
                : 'MANUAL / 操作・対話の手引き'}
          </span>
          <div className="flex items-center gap-2.5">
            <LanguageSelector variant="modal" />
            <button
              onClick={onClose}
              className="px-2.5 py-0.5 text-[11.5px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-600 cursor-pointer"
            >
              {lang === 'en' ? '× Close' : lang === 'ko' ? '× 닫기' : '× 閉じる'}
            </button>
          </div>
        </div>

        {/* 本文 */}
        <div className="px-5 py-3.5 space-y-2.5 text-[11.5px] text-zinc-300 leading-snug">
          {/* 導入 */}
          <p className="text-zinc-200 leading-relaxed whitespace-nowrap">
            {lang === 'en' ? (
              <>
                A fonic craft in the form of "the former Asch", discovered in Dist's laboratory.
                <br />
                Converse with him, inspect the terminal data, and decide what he truly is.
              </>
            ) : lang === 'ko' ? (
              <>
                디스트의 연구소에서 발견된 「과거의 애쉬」 형상을 한 포업(譜業).
                <br />
                말을 건네고 단말기 정보를 확인하며, 그를 「무엇」으로 규정할지 결정하는 게임입니다.
              </>
            ) : (
              <>
                ディストの研究所で見つけた「かつてのアッシュ」の姿をした譜業。
                <br />
                言葉をかわしたり、端末の情報を見て、彼を「何」とするか決めるゲームです。
              </>
            )}
          </p>

          {/* 左右2カラム分割：左＝会話の進め方 ／ 右＝端末の見方 */}
          <div className="grid grid-cols-2 gap-5 border-t border-zinc-800 pt-2.5">
            {/* 左カラム：会話の進め方 */}
            <div className="space-y-1.5 pr-1">
              <div className="text-zinc-100 font-semibold tracking-wider border-b border-zinc-800/80 pb-1">
                {lang === 'en' ? '■ Dialogue Navigation' : lang === 'ko' ? '■ 대화 진행 방법' : '■ 会話の進め方'}
              </div>

              <div className="space-y-1.5 text-[11px] text-zinc-400 leading-snug">
                <div>
                  <span className="text-zinc-200 font-semibold">
                    {lang === 'en' ? '• Speaking' : lang === 'ko' ? '・말 걸기' : '・話しかける'}
                  </span>
                  <p className="mt-0.5 pl-3 whitespace-nowrap">
                    {lang === 'en' ? (
                      <>
                        Choose an option from the bottom-left.
                        <br />
                        Switch candidates with <span className="text-zinc-300">[ ▶ Other topics ]</span>.
                      </>
                    ) : lang === 'ko' ? (
                      <>
                        왼쪽 아래 선택지에서 말을 고릅니다.
                        <br />
                        <span className="text-zinc-300">[ ▶ 다른 화제 ]</span> 로 다른 후보를 전환할 수 있습니다.
                      </>
                    ) : (
                      <>
                        左下の選択肢から言葉を選びます。
                        <br />
                        <span className="text-zinc-300">[ ▶ 他の話題 ]</span> で別の候補に切り替えられます。
                      </>
                    )}
                  </p>
                </div>

                <div>
                  <span className="text-zinc-200 font-semibold">
                    {lang === 'en' ? '• Unlocking Topics' : lang === 'ko' ? '・화제 추가' : '・話題の追加'}
                  </span>
                  <p className="mt-0.5 pl-3 whitespace-nowrap">
                    {lang === 'en' ? (
                      <>
                        New topics surface from conversation
                        <br />
                        and records uncovered in the terminal.
                      </>
                    ) : lang === 'ko' ? (
                      <>
                        대화 내용이나 단말기에서 확인한 기록을 통해
                        <br />
                        새로운 화제가 떠오릅니다.
                      </>
                    ) : (
                      <>
                        話した内容や、端末で目にした記録から
                        <br />
                        新しい話題が浮かびます。
                      </>
                    )}
                  </p>
                </div>

                <div>
                  <span className="text-zinc-200 font-semibold">
                    {lang === 'en' ? '• Thinking' : lang === 'ko' ? '・생각하기' : '・考える'}
                  </span>
                  <p className="mt-0.5 pl-3 whitespace-nowrap">
                    {lang === 'en' ? (
                      <>
                        Connect related clues via [Thinking] on the top right
                        <br />
                        to discover new topics.
                      </>
                    ) : lang === 'ko' ? (
                      <>
                        오른쪽 위의 [사고]에서 관련 단서를 조합하면
                        <br />
                        새로운 화제를 떠올릴 수 있습니다.
                      </>
                    ) : (
                      <>
                        右上の［考える］で、関連する手がかりを結びつけると、
                        <br />
                        新たな話題をひらめきます。
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* 右カラム：管理端末の見方 */}
            <div className="space-y-1.5 border-l border-zinc-800 pl-5">
              <div className="text-zinc-100 font-semibold tracking-wider border-b border-zinc-800/80 pb-1">
                {lang === 'en' ? '■ Terminal Guide' : lang === 'ko' ? '■ 관리 단말기 보는 법' : '■ 管理端末の見方'}
              </div>

              <div className="space-y-1.5 text-[11px] text-zinc-400 leading-snug">
                <div>
                  <span className="text-zinc-200 font-semibold">
                    {lang === 'en' ? '• Opening Terminal' : lang === 'ko' ? '・단말기 열기' : '・管理端末を開く'}
                  </span>
                  <p className="mt-0.5 pl-3 whitespace-nowrap">
                    {lang === 'en' ? (
                      <>
                        Toggle via <span className="text-zinc-300">[ Terminal ]</span> on bottom-right.
                        <br />
                        A red indicator appears when new intel is logged.
                      </>
                    ) : lang === 'ko' ? (
                      <>
                        오른쪽 아래 <span className="text-zinc-300">[ 관리 단말기 ]</span> 로 열고 닫습니다.
                        <br />
                        기록이 늘어나면 빨간 점이 표시됩니다.
                      </>
                    ) : (
                      <>
                        右下の <span className="text-zinc-300">[ 管理端末 ]</span> で開閉します。
                        <br />
                        記録が増えると赤い点がつきます。
                      </>
                    )}
                  </p>
                </div>

                <div>
                  <span className="text-zinc-200 font-semibold">・1/2 : MONITOR</span>
                  <p className="mt-0.5 pl-3 whitespace-nowrap">
                    {lang === 'en'
                      ? 'Inspect emotional fluctuations and operational logs.'
                      : lang === 'ko'
                        ? '감정 변화와 기체의 가동 로그를 확인할 수 있습니다.'
                        : '感情の揺れと、機体の稼働ログを確認できます。'}
                  </p>
                </div>

                <div>
                  <span className="text-zinc-200 font-semibold">・2/2 : INFO</span>
                  <p className="mt-0.5 pl-3 whitespace-nowrap">
                    {lang === 'en' ? (
                      <>
                        Hardware intel and memory records.
                        <br />
                        Masked <span className="text-zinc-300">[PROTECTED]</span> sectors open via dialogue,
                        <br />
                        or can be <span className="text-zinc-300">overridden by holding down</span>.
                      </>
                    ) : lang === 'ko' ? (
                      <>
                        기체 정보와 기억 기록입니다.
                        <br />
                        가려진 <span className="text-zinc-300">[PROTECTED]</span> 구역은 대화로 해제하거나,
                        <br />
                        <span className="text-zinc-300">길게 눌러 강제 해제</span>할 수도 있습니다.
                      </>
                    ) : (
                      <>
                        機体情報や記憶の記録です。
                        <br />
                        伏字の <span className="text-zinc-300">[PROTECTED]</span> は対話で開くほか、
                        <br />
                        <span className="text-zinc-300">長押しでロックをこじ開ける</span>こともできます。
                      </>
                    )}
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
