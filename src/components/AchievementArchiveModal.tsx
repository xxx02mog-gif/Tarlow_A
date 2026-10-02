import React, { useState } from 'react';
import {
  ENDING_SCENARIOS,
  INITIAL_MEMORY_SECTORS,
} from '../data/prototypeScenario';
import {
  ACHIEVEMENT_DEFINITIONS,
  AchievementSaveData,
  ALL_CANONICAL_DIALOGUE_LINES,
  createDefaultAchievementSave,
  decodeAchievementBackupCode,
  encodeAchievementBackupCode,
  ENDING_ARCHIVE_LIST,
} from '../utils/achievementStore';
import { soundEngine } from '../utils/chiptuneAudio';

interface AchievementArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  saveData: AchievementSaveData;
  onUpdateSaveData: (next: AchievementSaveData) => void;
  canOpenBonusViewer?: boolean;
  onOpenBonusViewer?: () => void;
}

export const AchievementArchiveModal: React.FC<
  AchievementArchiveModalProps
> = ({
  isOpen,
  onClose,
  saveData,
  onUpdateSaveData,
  canOpenBonusViewer = false,
  onOpenBonusViewer,
}) => {
  const [activeTab, setActiveTab] = useState<
    'ENDINGS' | 'ACHIEVEMENTS' | 'DATA'
  >('ENDINGS');
  // クリックしてタイトル⇔ヒントを切り替えているエンディングキー
  const [flippedEndingKeys, setFlippedEndingKeys] = useState<string[]>([]);
  // クリックして文字の上にヒントを出している実績ID
  const [selectedAchId, setSelectedAchId] = useState<string | null>(null);

  const [importInput, setImportInput] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [isConfirmingReset, setIsConfirmingReset] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalCanonicalLines = Math.max(1, ALL_CANONICAL_DIALOGUE_LINES.size);
  const seenLinesCount = saveData.seenLines.length;
  const seenLinesPct = Math.min(
    100,
    Math.round((seenLinesCount / totalCanonicalLines) * 100)
  );

  const totalSectorsCount = INITIAL_MEMORY_SECTORS.length;
  const unlockedSectorsCount = saveData.unlockedSectorIds.length;
  const unlockedSectorsPct = Math.min(
    100,
    Math.round((unlockedSectorsCount / totalSectorsCount) * 100)
  );

  const totalEndingsCount = ENDING_ARCHIVE_LIST.length;
  const reachedEndingsCount = saveData.reachedEndingKeys.length;
  const reachedEndingsPct = Math.min(
    100,
    Math.round((reachedEndingsCount / totalEndingsCount) * 100)
  );

  const totalAchievementsCount = ACHIEVEMENT_DEFINITIONS.length;
  const unlockedAchievementsCount = saveData.unlockedAchievementIds.length;

  const handleFlipSingleEnding = (key: string) => {
    soundEngine.playTerminalTab();
    setFlippedEndingKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleCopyExportCode = async () => {
    soundEngine.playTerminalTab();
    const code = encodeAchievementBackupCode(saveData);
    try {
      await navigator.clipboard.writeText(code);
      setStatusMessage({
        type: 'success',
        text: '引き継ぎコードをコピーしました。',
      });
    } catch {
      setStatusMessage({
        type: 'success',
        text: '下の欄から引き継ぎコードをコピーしてください。',
      });
    }
  };

  const handleImportCode = () => {
    soundEngine.playTerminalTab();
    if (!importInput.trim()) {
      setStatusMessage({
        type: 'error',
        text: '引き継ぎコードを入力してください。',
      });
      return;
    }
    const decoded = decodeAchievementBackupCode(importInput);
    if (!decoded) {
      setStatusMessage({
        type: 'error',
        text: '引き継ぎコードの形式が正しくありません。',
      });
      return;
    }
    onUpdateSaveData(decoded);
    setImportInput('');
    setStatusMessage({
      type: 'success',
      text: '実績・回収記録データを読み込みました！',
    });
  };

  const handleExecuteReset = () => {
    soundEngine.playOverrideExecute();
    const fresh = createDefaultAchievementSave();
    onUpdateSaveData(fresh);
    setIsConfirmingReset(false);
    setStatusMessage({
      type: 'success',
      text: '実績・回収記録データを初期化しました。',
    });
  };

  const exportCode = encodeAchievementBackupCode(saveData);

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center p-4 select-none"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSelectedAchId(null);
        }}
        className="w-full max-w-[650px] bg-[#e4e5ea] text-zinc-900 border border-zinc-900 flex flex-col px-5 py-3.5 shadow-2xl"
      >
        {/* 上部ヘッダー ＆ セリフ・端末の達成度バー */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
          <div className="flex items-center gap-6">
            <h2 className="text-[14px] font-bold tracking-wider text-zinc-950 shrink-0">
              実績・記録
            </h2>
            <div className="flex items-center gap-5 text-[11px] text-zinc-700">
              <div className="flex items-center gap-2">
                <span>セリフ</span>
                <div className="w-24 h-1.5 bg-zinc-300 overflow-hidden">
                  <div
                    className="h-full bg-zinc-900 transition-all duration-300"
                    style={{ width: `${seenLinesPct}%` }}
                  />
                </div>
                <strong className="font-mono text-zinc-950">{seenLinesPct}%</strong>
              </div>

              <div className="flex items-center gap-2">
                <span>管理端末</span>
                <div className="w-24 h-1.5 bg-zinc-300 overflow-hidden">
                  <div
                    className="h-full bg-zinc-900 transition-all duration-300"
                    style={{ width: `${unlockedSectorsPct}%` }}
                  />
                </div>
                <strong className="font-mono text-zinc-950">{unlockedSectorsPct}%</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playTerminalClose();
              onClose();
            }}
            className="text-[11px] text-zinc-600 hover:text-zinc-950 cursor-pointer shrink-0"
          >
            ✕ 閉じる
          </button>
        </div>

        {/* タブ切替（枠なし・下線スタイル） */}
        <div className="flex items-center justify-between border-b border-zinc-400/80 pt-2 pb-1.5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                soundEngine.playTerminalTab();
                setActiveTab('ENDINGS');
                setSelectedAchId(null);
                setStatusMessage(null);
              }}
              className={`text-[11.5px] pb-0.5 transition-colors cursor-pointer ${
                activeTab === 'ENDINGS'
                  ? 'text-zinc-950 font-bold border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              エンディング ({reachedEndingsCount}/{totalEndingsCount})
            </button>

            <button
              onClick={() => {
                soundEngine.playTerminalTab();
                setActiveTab('ACHIEVEMENTS');
                setSelectedAchId(null);
                setStatusMessage(null);
              }}
              className={`text-[11.5px] pb-0.5 transition-colors cursor-pointer ${
                activeTab === 'ACHIEVEMENTS'
                  ? 'text-zinc-950 font-bold border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              実績 ({unlockedAchievementsCount}/{totalAchievementsCount})
            </button>

            <button
              onClick={() => {
                soundEngine.playTerminalTab();
                setActiveTab('DATA');
                setSelectedAchId(null);
                setStatusMessage(null);
                setIsConfirmingReset(false);
              }}
              className={`text-[11.5px] pb-0.5 transition-colors cursor-pointer ${
                activeTab === 'DATA'
                  ? 'text-zinc-950 font-bold border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              引き継ぎ・初期化
            </button>

            {canOpenBonusViewer && onOpenBonusViewer && (
              <button
                onClick={() => {
                  soundEngine.playTerminalTab();
                  onOpenBonusViewer();
                }}
                className="px-2 py-0.5 text-[10.5px] bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-bold cursor-pointer"
              >
                ★ 表情ビューワー
              </button>
            )}
          </div>

          {activeTab !== 'DATA' && (
            <span className="text-[10px] text-zinc-500">
              ※項目クリックでヒント表示
            </span>
          )}
        </div>

        {/* メイン領域（□枠を外したコンパクトなテキスト一覧・高さ固定でスクロールなし） */}
        <div className="h-[210px] pt-2 flex flex-col justify-center">
          {activeTab === 'ENDINGS' && (
            <div className="w-full h-full grid grid-cols-2 grid-rows-5 gap-x-6 gap-y-1 items-center">
              {ENDING_ARCHIVE_LIST.map((item) => {
                const isReached = saveData.reachedEndingKeys.includes(item.key);
                const scenario = ENDING_SCENARIOS[item.key];
                const showHintNow = flippedEndingKeys.includes(item.key);

                const titleText =
                  isReached && scenario
                    ? scenario.title
                    : `${item.numberLabel} // ？？？？？？`;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleFlipSingleEnding(item.key)}
                    className="w-full text-left py-1 border-b border-zinc-300/80 hover:border-zinc-500 transition-colors cursor-pointer truncate"
                  >
                    {showHintNow ? (
                      <span className="text-[10.5px] text-zinc-700 whitespace-nowrap">
                        <span className="font-mono text-[10px] text-zinc-500 mr-1">
                          {item.numberLabel} //
                        </span>
                        {item.hint}
                      </span>
                    ) : (
                      <span
                        className={`text-[12px] ${
                          isReached
                            ? 'font-bold text-zinc-950'
                            : 'text-zinc-400'
                        }`}
                      >
                        {titleText}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'ACHIEVEMENTS' && (
            <div className="w-full h-full grid grid-cols-3 grid-rows-6 gap-x-4 gap-y-0.5 items-center">
              {ACHIEVEMENT_DEFINITIONS.map((ach, idx) => {
                const isUnlocked = saveData.unlockedAchievementIds.includes(
                  ach.id
                );
                const isSelected = selectedAchId === ach.id;
                const colIndex = idx % 3;
                const tooltipAlignClass =
                  colIndex === 0
                    ? 'left-0'
                    : colIndex === 1
                      ? 'left-1/2 -translate-x-1/2'
                      : 'right-0';

                return (
                  <button
                    key={ach.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playTerminalTab();
                      setSelectedAchId((prev) =>
                        prev === ach.id ? null : ach.id
                      );
                    }}
                    className="relative w-full text-left py-1 border-b border-zinc-300/70 hover:border-zinc-500 flex items-baseline gap-2 transition-colors cursor-pointer"
                  >
                    {/* 押したときに実績の文字の真上に出る1行ヒント（段落ち防止・列位置に応じて左右はみ出し防止） */}
                    {isSelected && (
                      <div
                        className={`absolute ${tooltipAlignClass} bottom-full mb-1 w-max whitespace-nowrap bg-zinc-900 text-zinc-100 px-2.5 py-1 text-[10.5px] leading-snug shadow-lg z-40 pointer-events-none`}
                      >
                        {ach.description}
                      </div>
                    )}

                    <span
                      className={`text-[10.5px] font-mono shrink-0 ${
                        isUnlocked
                          ? 'font-bold text-zinc-950'
                          : 'text-zinc-400'
                      }`}
                    >
                      {isUnlocked ? '●' : ach.numberLabel}
                    </span>

                    <span
                      className={`text-[12px] truncate ${
                        isUnlocked
                          ? 'font-bold text-zinc-950'
                          : 'text-zinc-500'
                      }`}
                    >
                      {ach.title}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'DATA' && (
            <div className="w-full h-full flex flex-col justify-between py-1">
              {statusMessage && (
                <div
                  className={`px-2.5 py-1 text-[11px] ${
                    statusMessage.type === 'success'
                      ? 'bg-zinc-900 text-zinc-100'
                      : 'bg-red-900 text-red-100'
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              {/* エクスポート */}
              <div className="border-b border-zinc-300 pb-2.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11.5px] font-bold text-zinc-900">
                    引き継ぎコードの書き出し（エクスポート）
                  </span>
                  <button
                    onClick={handleCopyExportCode}
                    className="px-2.5 py-0.5 text-[11px] bg-zinc-900 hover:bg-zinc-800 text-zinc-100 cursor-pointer"
                  >
                    コピー
                  </button>
                </div>
                <input
                  type="text"
                  readOnly
                  value={exportCode}
                  onFocus={(e) => e.currentTarget.select()}
                  className="w-full px-2 py-1 text-[10px] font-mono bg-zinc-300/70 text-zinc-800 select-all outline-none"
                />
              </div>

              {/* インポート */}
              <div className="border-b border-zinc-300 pb-2.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11.5px] font-bold text-zinc-900">
                    引き継ぎコードの読み込み（インポート）
                  </span>
                  <button
                    onClick={handleImportCode}
                    className="px-2.5 py-0.5 text-[11px] bg-zinc-900 hover:bg-zinc-800 text-zinc-100 cursor-pointer"
                  >
                    読み込む
                  </button>
                </div>
                <input
                  type="text"
                  value={importInput}
                  onChange={(e) => setImportInput(e.target.value)}
                  placeholder="GITM1:... のコードをここに貼り付け"
                  className="w-full px-2 py-1 text-[10.5px] font-mono bg-white/90 text-zinc-900 select-text outline-none"
                />
              </div>

              {/* リセット */}
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-[11.5px] text-zinc-700">
                  実績・回収記録の初期化
                </span>

                {!isConfirmingReset ? (
                  <button
                    onClick={() => {
                      soundEngine.playTerminalTab();
                      setIsConfirmingReset(true);
                    }}
                    className="px-2.5 py-0.5 text-[11px] text-zinc-700 hover:text-zinc-950 underline cursor-pointer"
                  >
                    データをリセット
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-red-800">
                      本当に消去しますか？
                    </span>
                    <button
                      onClick={handleExecuteReset}
                      className="px-2.5 py-0.5 text-[11px] bg-red-900 hover:bg-red-800 text-white cursor-pointer"
                    >
                      消去する
                    </button>
                    <button
                      onClick={() => setIsConfirmingReset(false)}
                      className="px-2 py-0.5 text-[11px] text-zinc-600 hover:text-zinc-900 cursor-pointer"
                    >
                      やめる
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
