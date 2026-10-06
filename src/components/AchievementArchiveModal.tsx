import React, { useState } from 'react';
import {
  ENDING_SCENARIOS,
} from '../data/prototypeScenario';
import {
  ACHIEVEMENT_DEFINITIONS,
  AchievementSaveData,
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
  canOpenScenarioInspector?: boolean;
  onOpenScenarioInspector?: () => void;
  isMaidMode?: boolean;
  onToggleMaidMode?: () => void;
}

export const AchievementArchiveModal: React.FC<AchievementArchiveModalProps> = ({
  isOpen,
  onClose,
  saveData,
  onUpdateSaveData,
  canOpenBonusViewer = false,
  onOpenBonusViewer,
  canOpenScenarioInspector = false,
  onOpenScenarioInspector,
  isMaidMode = false,
  onToggleMaidMode,
}) => {
  const [activeTab, setActiveTab] = useState<'ENDINGS' | 'ACHIEVEMENTS' | 'DATA'>('ENDINGS');
  const [selectedEndingKey, setSelectedEndingKey] = useState<string | null>(null);
  const [selectedAchId, setSelectedAchId] = useState<string | null>(null);

  const [importInput, setImportInput] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [isConfirmingReset, setIsConfirmingReset] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalEndingsCount = ENDING_ARCHIVE_LIST.length;
  const reachedEndingsCount = ENDING_ARCHIVE_LIST.filter((item) => {
    if (item.subKeys) {
      return item.subKeys.some((s) => saveData.reachedEndingKeys.includes(s.key));
    }
    return saveData.reachedEndingKeys.includes(item.key);
  }).length;
  const reachedEndingsPct = Math.min(
    100,
    Math.round((reachedEndingsCount / totalEndingsCount) * 100)
  );

  const totalAchievementsCount = ACHIEVEMENT_DEFINITIONS.length;
  const unlockedAchievementsCount = saveData.unlockedAchievementIds.length;
  const unlockedAchievementsPct = Math.min(
    100,
    Math.round((unlockedAchievementsCount / totalAchievementsCount) * 100)
  );

  const canAccessMaidMode = saveData.unlockedAchievementIds.includes('ach_11');

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
      className="absolute inset-0 z-50 bg-black/75 flex items-center justify-center p-4 select-none font-zen"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSelectedEndingKey(null);
          setSelectedAchId(null);
        }}
        className="w-full max-w-[700px] bg-[#e4e5ea] text-zinc-900 border border-zinc-950 p-5 shadow-2xl flex flex-col justify-between font-zen"
      >
        {/* 上部タイトルバー（リザルト画面に合わせたデザイン） */}
        <div className="flex items-end justify-between border-b-2 border-zinc-900 pb-2 shrink-0">
          <div className="flex items-baseline gap-3">
            <h2 className="text-[17px] font-bold tracking-wider text-zinc-950 font-zen">
              実績・記録
            </h2>
            <span className="text-[10px] tracking-[0.2em] text-zinc-500 font-mono">
              ARCHIVE DOSSIER
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                soundEngine.playTerminalClose();
                onClose();
              }}
              className="px-3 py-0.5 text-[11.5px] bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 transition-colors cursor-pointer"
            >
              ✕ 閉じる
            </button>
          </div>
        </div>

        {/* タブ切り替え（下線スタイル・タブ内に進捗バーを統合） */}
        <div className="flex items-center justify-between border-b border-zinc-300/80 pt-1 pb-1 shrink-0">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => {
                soundEngine.playTerminalTab();
                setActiveTab('ENDINGS');
                setSelectedEndingKey(null);
                setSelectedAchId(null);
                setStatusMessage(null);
              }}
              className={`flex items-center gap-2 text-[11.5px] pb-1 transition-colors cursor-pointer ${
                activeTab === 'ENDINGS'
                  ? 'text-zinc-950 font-bold border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <span>エンディング</span>
              <div className="w-14 h-1.5 bg-zinc-300 overflow-hidden">
                <div
                  className="h-full bg-zinc-900 transition-all duration-300"
                  style={{ width: `${reachedEndingsPct}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-zinc-600 font-normal">
                {reachedEndingsPct}%
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playTerminalTab();
                setActiveTab('ACHIEVEMENTS');
                setSelectedEndingKey(null);
                setSelectedAchId(null);
                setStatusMessage(null);
              }}
              className={`flex items-center gap-2 text-[11.5px] pb-1 transition-colors cursor-pointer ${
                activeTab === 'ACHIEVEMENTS'
                  ? 'text-zinc-950 font-bold border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <span>実績</span>
              <div className="w-14 h-1.5 bg-zinc-300 overflow-hidden">
                <div
                  className="h-full bg-zinc-900 transition-all duration-300"
                  style={{ width: `${unlockedAchievementsPct}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-zinc-600 font-normal">
                {unlockedAchievementsPct}%
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playTerminalTab();
                setActiveTab('DATA');
                setSelectedEndingKey(null);
                setSelectedAchId(null);
                setStatusMessage(null);
                setIsConfirmingReset(false);
              }}
              className={`text-[11.5px] pb-1 transition-colors cursor-pointer ${
                activeTab === 'DATA'
                  ? 'text-zinc-950 font-bold border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              引き継ぎ・初期化
            </button>
          </div>

          {activeTab !== 'DATA' && (
            <span className="text-[10px] text-zinc-500">
              ※クリックでヒント表示
            </span>
          )}
        </div>

        {/* リスト領域（リザルト画面と統一されたグリッド ＆ 上段下向きツールチップ） */}
        <div className="h-[240px] pt-3 pb-1 overflow-visible relative flex flex-col justify-center">
          {activeTab === 'ENDINGS' && (
            <div className="w-full grid grid-cols-2 grid-rows-5 gap-x-6 gap-y-2.5 items-center">
              {ENDING_ARCHIVE_LIST.map((item, idx) => {
                const isSubItem = Boolean(item.subKeys && item.subKeys.length > 0);
                const isReachedA = item.subKeys
                  ? saveData.reachedEndingKeys.includes(item.subKeys[0].key)
                  : false;
                const isReachedB = item.subKeys
                  ? saveData.reachedEndingKeys.includes(item.subKeys[1].key)
                  : false;
                const isReached = isSubItem
                  ? isReachedA || isReachedB
                  : saveData.reachedEndingKeys.includes(item.key);
                const isAllReached = isSubItem
                  ? isReachedA && isReachedB
                  : isReached;

                const scenario = ENDING_SCENARIOS[item.key];
                const isSelected = selectedEndingKey === item.key;
                const colIndex = idx % 2;
                const rowIndex = Math.floor(idx / 2);
                const isFirstRow = rowIndex === 0;
                const tooltipAlignClass = colIndex === 0 ? 'left-0' : 'right-0';

                const cleanTitle = isSubItem
                  ? isReached
                    ? 'これで全部うまくいく'
                    : '？？？？？？'
                  : isReached && scenario
                    ? scenario.title.replace(/^END\s*[0-9a-zA-Z]+\s*\/\/\s*/, '')
                    : '？？？？？？';

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playTerminalTab();
                      setSelectedEndingKey((prev) =>
                        prev === item.key ? null : item.key
                      );
                      setSelectedAchId(null);
                    }}
                    className="relative w-full text-left py-1.5 border-b border-zinc-300/80 hover:border-zinc-500 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    {/* ヒントツールチップ（1行目は下方向、2行目以降は上方向へ展開） */}
                    {isSelected && (
                      <div
                        className={`absolute ${tooltipAlignClass} ${
                          isFirstRow ? 'top-full mt-1.5' : 'bottom-full mb-1.5'
                        } w-max max-w-[280px] whitespace-normal bg-zinc-900 text-zinc-100 px-2.5 py-1 text-[10.5px] leading-snug shadow-xl z-50 pointer-events-none`}
                      >
                        {item.hint}
                      </div>
                    )}

                    <span
                      className={`text-[11px] font-mono shrink-0 flex items-center gap-1.5 ${
                        isReached ? 'font-bold text-zinc-950' : 'text-zinc-400'
                      }`}
                    >
                      <span className={isAllReached ? 'text-zinc-950' : isReached ? 'text-zinc-700' : 'text-zinc-400 text-[9px]'}>
                        {isReached ? '●' : '○'}
                      </span>
                      <span>{item.numberLabel}</span>
                    </span>
                    <span
                      className={`text-[11.5px] whitespace-nowrap overflow-visible flex items-center ${
                        isReached ? 'font-bold text-zinc-950' : 'text-zinc-400'
                      }`}
                    >
                      <span>{cleanTitle}</span>
                      {isSubItem && (
                        <span className="inline-flex items-center gap-1.5 ml-2 font-mono text-[11px]">
                          <span
                            className={
                              isReachedA
                                ? 'text-zinc-950 font-bold'
                                : 'text-zinc-400 font-normal'
                            }
                          >
                            a
                          </span>
                          <span
                            className={
                              isReachedB
                                ? 'text-zinc-950 font-bold'
                                : 'text-zinc-400 font-normal'
                            }
                          >
                            b
                          </span>
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'ACHIEVEMENTS' && (
            <div className="w-full grid grid-cols-3 grid-rows-6 gap-x-4 gap-y-2 items-center">
              {ACHIEVEMENT_DEFINITIONS.map((ach, idx) => {
                const isUnlocked = saveData.unlockedAchievementIds.includes(ach.id);
                const isSelected = selectedAchId === ach.id;
                const colIndex = idx % 3;
                const rowIndex = Math.floor(idx / 3);
                const isFirstRow = rowIndex === 0;
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
                      setSelectedEndingKey(null);
                    }}
                    className="relative w-full text-left py-1.5 border-b border-zinc-300/70 hover:border-zinc-500 flex items-baseline gap-1.5 transition-colors cursor-pointer"
                  >
                    {/* ヒントツールチップ（1行目は下方向、2行目以降は上方向へ展開） */}
                    {isSelected && (
                      <div
                        className={`absolute ${tooltipAlignClass} ${
                          isFirstRow ? 'top-full mt-1.5' : 'bottom-full mb-1.5'
                        } w-max whitespace-nowrap bg-zinc-900 text-zinc-100 px-2.5 py-1 text-[10.5px] leading-snug shadow-xl z-50 pointer-events-none`}
                      >
                        {ach.description}
                      </div>
                    )}

                    <span
                      className={`text-[10px] font-mono shrink-0 ${
                        isUnlocked ? 'font-bold text-zinc-950' : 'text-zinc-400'
                      }`}
                    >
                      {isUnlocked ? '●' : ach.numberLabel}
                    </span>
                    <span
                      className={`text-[11.5px] truncate ${
                        isUnlocked ? 'font-bold text-zinc-950' : 'text-zinc-400'
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
            <div className="w-full h-full flex flex-col justify-between py-1 text-[11.5px]">
              {statusMessage && (
                <div
                  className={`px-3 py-1 text-[11px] ${
                    statusMessage.type === 'success'
                      ? 'bg-zinc-900 text-zinc-100'
                      : 'bg-red-900 text-red-100'
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              {/* エクスポート */}
              <div className="border-b border-zinc-300 pb-2 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-950">
                    引き継ぎコードの書き出し（エクスポート）
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyExportCode}
                    className="px-3 py-0.5 text-[11px] bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 transition-colors cursor-pointer"
                  >
                    コピー
                  </button>
                </div>
                <input
                  type="text"
                  readOnly
                  value={exportCode}
                  onFocus={(e) => e.currentTarget.select()}
                  className="w-full px-2 py-1 text-[10.5px] font-mono bg-zinc-300/70 border border-zinc-400/80 text-zinc-900 select-all outline-none"
                />
              </div>

              {/* インポート */}
              <div className="border-b border-zinc-300 pb-2 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-950">
                    引き継ぎコードの読み込み（インポート）
                  </span>
                  <button
                    type="button"
                    onClick={handleImportCode}
                    className="px-3 py-0.5 text-[11px] bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-bold transition-colors cursor-pointer"
                  >
                    読み込む
                  </button>
                </div>
                <input
                  type="text"
                  value={importInput}
                  onChange={(e) => setImportInput(e.target.value)}
                  placeholder="GITM1:... のコードをここに貼り付け"
                  className="w-full px-2 py-1 text-[10.5px] font-mono bg-white border border-zinc-400 text-zinc-900 select-text outline-none"
                />
              </div>

              {/* 初期化 */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-zinc-600">
                  実績・回収記録の初期化
                </span>

                {!isConfirmingReset ? (
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playTerminalTab();
                      setIsConfirmingReset(true);
                    }}
                    className="text-zinc-600 hover:text-red-700 underline transition-colors cursor-pointer"
                  >
                    データをリセット
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-red-700">
                      本当に消去しますか？
                    </span>
                    <button
                      type="button"
                      onClick={handleExecuteReset}
                      className="px-3 py-0.5 text-[11px] bg-red-800 hover:bg-red-700 text-white font-bold transition-colors cursor-pointer"
                    >
                      消去する
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsConfirmingReset(false)}
                      className="px-2.5 py-0.5 text-[11px] bg-zinc-200 hover:bg-zinc-300 text-zinc-700 border border-zinc-500 transition-colors cursor-pointer"
                    >
                      やめる
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 下部フッター */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-400 shrink-0 min-h-[34px]">
          <span className="text-[10px] text-zinc-500 font-mono">
            Ghost in the mASCHine
          </span>

          {/* 右寄せ：表情鑑賞・シナリオ台本・メイドアンドロイドも～どボタン */}
          <div className="flex items-center gap-2">
            {canOpenBonusViewer && onOpenBonusViewer && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playTerminalTab();
                  onOpenBonusViewer();
                }}
                className="px-2.5 py-0.5 text-[10.5px] bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-bold border border-zinc-700 hover:border-zinc-500 transition-colors cursor-pointer"
                title="実績17解放ご褒美：アッシュの表情パーツを自由に組み合わせて鑑賞できます"
              >
                表情鑑賞
              </button>
            )}

            {canOpenScenarioInspector && onOpenScenarioInspector && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playTerminalTab();
                  onOpenScenarioInspector();
                }}
                className="px-2.5 py-0.5 text-[10.5px] bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-bold border border-zinc-700 hover:border-zinc-500 transition-colors cursor-pointer"
                title="実績18解放ご褒美：全シナリオ・分岐セリフ・演出の実機プレビューと台本"
              >
                シナリオ台本
              </button>
            )}

            {canAccessMaidMode && onToggleMaidMode && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playTerminalTab();
                  onToggleMaidMode();
                }}
                className={`w-[108px] py-0.5 text-[10.5px] font-bold border transition-colors cursor-pointer inline-flex items-center justify-center shrink-0 ${
                  isMaidMode
                    ? 'bg-zinc-900 text-zinc-100 border-zinc-950 shadow-sm'
                    : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-800 border-zinc-500'
                }`}
                title="実績11（なでなでマスター）解放ご褒美：立ち絵のベース素体をメイド姿（base2.png）に切り替えます"
              >
                <span>メイドも～ど:</span>
                <span className="inline-block w-6 text-center">{isMaidMode ? 'ON' : 'OFF'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
