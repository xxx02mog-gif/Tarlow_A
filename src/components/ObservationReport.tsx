import React, { useState } from 'react';
import {
  EndingApproach,
  EndingDisposition,
  MemorySector,
  ObservationStats,
} from '../types/game';
import {
  ENDING_SCENARIOS,
  resolveEndingKey,
  INITIAL_MEMORY_SECTORS,
} from '../data/prototypeScenario';
import { soundEngine } from '../utils/chiptuneAudio';
import {
  ACHIEVEMENT_DEFINITIONS,
  AchievementSaveData,
  ALL_CANONICAL_DIALOGUE_LINES,
  ENDING_ARCHIVE_LIST,
} from '../utils/achievementStore';

interface ObservationReportProps {
  endingDisposition: EndingDisposition;
  endingApproach: EndingApproach;
  customEndingKey?: string | null;
  stats: ObservationStats;
  sectors: MemorySector[];
  achievementSave?: AchievementSaveData;
  onResetSession: () => void;
  onOpenAchievements?: () => void;
}

export const ObservationReport: React.FC<ObservationReportProps> = ({
  endingDisposition,
  endingApproach,
  customEndingKey,
  stats,
  sectors,
  achievementSave,
  onResetSession,
}) => {
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ENDINGS' | 'ACHIEVEMENTS'>('ENDINGS');
  const [selectedEndingKey, setSelectedEndingKey] = useState<string | null>(null);
  const [selectedAchId, setSelectedAchId] = useState<string | null>(null);

  const totalSectors = sectors.length;
  const naturalUnlockedCount = sectors.filter(
    (s) => s.unlocked && s.unlockedMethod === 'DIALOGUE'
  ).length;
  const forcedUnlockedCount =
    stats?.overrideCount ??
    sectors.filter(
      (s) => s.id !== 'SEC-00' && s.unlocked && s.unlockedMethod === 'OVERRIDE'
    ).length;
  const remainingLockedCount = sectors.filter((s) => !s.unlocked).length;

  const avgResponseSec =
    stats.totalTurns > 0
      ? (stats.totalResponseTimeMs / stats.totalTurns / 1000).toFixed(1)
      : '0.0';

  const terminalTotalSec = (stats.terminalTotalDurationMs / 1000).toFixed(1);

  const resolvedEndingKey =
    customEndingKey || resolveEndingKey(endingDisposition, endingApproach);
  const reachedEnding = ENDING_SCENARIOS[resolvedEndingKey];
  const dispositionLabel = reachedEnding
    ? reachedEnding.title
    : endingDisposition === 'KEEP'
      ? 'このまま自分の部屋に置く'
      : endingDisposition === 'RETURN'
        ? 'ディストの研究所へ送り返す'
        : '機能停止（破壊）';

  // 累計データの集計
  const totalCanonicalLines = Math.max(1, ALL_CANONICAL_DIALOGUE_LINES.size);
  const seenLinesCount = achievementSave?.seenLines.length ?? 0;
  const seenLinesPct = Math.min(
    100,
    Math.round((seenLinesCount / totalCanonicalLines) * 100)
  );

  const totalSectorsCount = INITIAL_MEMORY_SECTORS.length;
  const unlockedSectorsCount = achievementSave?.unlockedSectorIds.length ?? 0;
  const unlockedSectorsPct = Math.min(
    100,
    Math.round((unlockedSectorsCount / totalSectorsCount) * 100)
  );

  const totalEndingsCount = ENDING_ARCHIVE_LIST.length;
  const reachedEndingsCount = achievementSave
    ? ENDING_ARCHIVE_LIST.filter((item) => {
        if (item.subKeys) {
          return item.subKeys.some((s) =>
            achievementSave.reachedEndingKeys.includes(s.key)
          );
        }
        return achievementSave.reachedEndingKeys.includes(item.key);
      }).length
    : 0;

  const totalAchievementsCount = ACHIEVEMENT_DEFINITIONS.length;
  const unlockedAchievementsCount =
    achievementSave?.unlockedAchievementIds.length ?? 0;

  return (
    <div
      onClick={() => {
        setSelectedEndingKey(null);
        setSelectedAchId(null);
      }}
      className="font-zen relative w-full h-full bg-[#e4e5ea] text-zinc-900 flex flex-col justify-between p-5 overflow-hidden select-none"
    >
      {/* 上部タイトルバー */}
      <div className="flex items-end justify-between border-b-2 border-zinc-900 pb-2 shrink-0">
        <div className="flex items-baseline gap-3">
          <h2 className="text-[17px] font-bold tracking-wider text-zinc-950 font-zen">
            対話観測記録
          </h2>
          <span className="text-[10px] tracking-[0.2em] text-zinc-500 font-mono">
            SESSION: {stats.sessionId}
          </span>
        </div>
        <div>
          <span className="inline-block px-2.5 py-0.5 text-[11px] bg-zinc-900 text-zinc-100 tracking-wider">
            {reachedEnding ? reachedEnding.subtitle : `DISPOSITION: ${endingDisposition}`}
          </span>
        </div>
      </div>

      {/* 中央メインエリア：左（案1：カテゴリ別3分割） ＆ 右（実績・記録アーカイブ） */}
      <div className="flex-1 w-full flex items-stretch gap-6 my-2 min-h-0 overflow-hidden">
        {/* 左側：セッション結果（右側のデザインに合わせた3カテゴリ分割） */}
        <div className="w-[43%] shrink-0 flex flex-col justify-between py-1">
          {/* 1. 対話の記録 */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-zinc-700 tracking-wider border-b border-zinc-400/90 pb-0.5">
              <span>▼ 対話の記録</span>
            </div>
            <div className="divide-y divide-zinc-300 text-[11.5px]">
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600 font-medium">到達エンディング</span>
                <span className="font-bold text-zinc-950 text-right truncate">
                  {dispositionLabel}
                </span>
              </div>
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">完了トピック</span>
                <span className="font-bold text-zinc-950 text-right">
                  {stats.completedTopicsCount}（選択 {stats.totalTurns}回）
                </span>
              </div>
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">端末データ開示</span>
                <span className="font-bold text-zinc-950 text-right">
                  自然 {naturalUnlockedCount} ／ 強制 {forcedUnlockedCount} ／ 未 {remainingLockedCount}
                </span>
              </div>
            </div>
          </div>

          {/* 2. 返答の様子 */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-zinc-700 tracking-wider border-b border-zinc-400/90 pb-0.5">
              <span>▼ 返答の様子（思考傾向）</span>
            </div>
            <div className="divide-y divide-zinc-300 text-[11.5px]">
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">平均思考時間</span>
                <span className="font-bold text-zinc-950 text-right">
                  {avgResponseSec}秒
                </span>
              </div>
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">即答（2秒以内）</span>
                <span className="font-bold text-zinc-950 text-right">
                  {stats.quickReplyCount}回
                </span>
              </div>
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">選択の迷い</span>
                <span className="font-bold text-zinc-950 text-right">
                  {stats.choiceHoverSwitchCount}回
                </span>
              </div>
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">沈黙・無言</span>
                <span className="font-bold text-zinc-950 text-right">
                  {stats.idleTimeoutCount}回
                </span>
              </div>
            </div>
          </div>

          {/* 3. 行動検知 */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-zinc-700 tracking-wider border-b border-zinc-400/90 pb-0.5">
              <span>▼ 行動検知</span>
            </div>
            <div className="divide-y divide-zinc-300 text-[11.5px]">
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">管理端末の閲覧</span>
                <span className="font-bold text-zinc-950 text-right">
                  {stats.terminalOpenCount}回（計 {terminalTotalSec}秒）
                </span>
              </div>
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">よそ見（別タブ移動）</span>
                <span className="font-bold text-zinc-950 text-right">
                  {stats.tabSwitchCount}回
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 右側：実績・記録（白黒統一・ヒントツールチップ方式） */}
        <div className="flex-1 flex flex-col justify-between border-l border-zinc-300 pl-6 min-h-0">
          {/* 上部：進捗バー（セリフ・管理端末） */}
          <div className="flex items-center gap-6 border-b border-zinc-400/80 pb-2 shrink-0">
            <div className="flex items-center gap-2 text-[11px] text-zinc-700">
              <span className="shrink-0">セリフ</span>
              <div className="w-24 h-1.5 bg-zinc-300 overflow-hidden">
                <div
                  className="h-full bg-zinc-900 transition-all duration-300"
                  style={{ width: `${seenLinesPct}%` }}
                />
              </div>
              <strong className="font-mono text-zinc-950 shrink-0">
                {seenLinesPct}%
              </strong>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-700">
              <span className="shrink-0">管理端末</span>
              <div className="w-24 h-1.5 bg-zinc-300 overflow-hidden">
                <div
                  className="h-full bg-zinc-900 transition-all duration-300"
                  style={{ width: `${unlockedSectorsPct}%` }}
                />
              </div>
              <strong className="font-mono text-zinc-950 shrink-0">
                {unlockedSectorsPct}%
              </strong>
            </div>
          </div>

          {/* タブ切り替え（下線スタイル） */}
          <div className="flex items-center justify-between border-b border-zinc-300/80 pt-2 pb-1 shrink-0">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playTerminalTab();
                  setActiveTab('ENDINGS');
                  setSelectedEndingKey(null);
                  setSelectedAchId(null);
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
                type="button"
                onClick={() => {
                  soundEngine.playTerminalTab();
                  setActiveTab('ACHIEVEMENTS');
                  setSelectedEndingKey(null);
                  setSelectedAchId(null);
                }}
                className={`text-[11.5px] pb-0.5 transition-colors cursor-pointer ${
                  activeTab === 'ACHIEVEMENTS'
                    ? 'text-zinc-950 font-bold border-b-2 border-zinc-950'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                実績 ({unlockedAchievementsCount}/{totalAchievementsCount})
              </button>
            </div>

            <span className="text-[10px] text-zinc-500">
              ※クリックでヒント表示
            </span>
          </div>

          {/* リスト領域（上部途切れ防止：overflow-visible + 上段ツールチップは下向き表示） */}
          <div className="flex-1 min-h-0 pt-3 pb-1 overflow-visible relative flex flex-col justify-center">
            {activeTab === 'ENDINGS' && (
              <div className="w-full grid grid-cols-2 grid-rows-5 gap-x-6 gap-y-2.5 items-center">
                {ENDING_ARCHIVE_LIST.map((item, idx) => {
                  const isSubItem = Boolean(item.subKeys && item.subKeys.length > 0);
                  const isReachedA = item.subKeys
                    ? achievementSave?.reachedEndingKeys.includes(item.subKeys[0].key) ?? false
                    : false;
                  const isReachedB = item.subKeys
                    ? achievementSave?.reachedEndingKeys.includes(item.subKeys[1].key) ?? false
                    : false;
                  const isReached = isSubItem
                    ? isReachedA || isReachedB
                    : (achievementSave?.reachedEndingKeys.includes(item.key) ?? false);
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
                      {/* ヒントツールチップ（1行目は下方向、2行目以降は上方向へ展開して途切れを防止） */}
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
                  const isUnlocked =
                    achievementSave?.unlockedAchievementIds.includes(ach.id) ??
                    false;
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
                      {/* ヒントツールチップ（1行目は下方向、2行目以降は上方向へ展開して途切れを防止） */}
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
          </div>
        </div>
      </div>

      {/* 下部フッター：クレジット ＆ 最初からやり直す */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-400 shrink-0">
        <span className="text-[10px] text-zinc-500 font-mono">
          Ghost in the mASCHine
        </span>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              soundEngine.playTerminalTab();
              setIsCreditsOpen(true);
            }}
            className="px-3.5 py-1 text-[11.5px] bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 transition-colors cursor-pointer"
          >
            クレジット
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playTitleStart();
              onResetSession();
            }}
            className="px-4 py-1 text-[11.5px] bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-950 transition-colors cursor-pointer font-bold"
          >
            最初からやり直す
          </button>
        </div>
      </div>

      {/* クレジットモーダル */}
      {isCreditsOpen && (
        <div
          onClick={() => setIsCreditsOpen(false)}
          className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center p-6 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[420px] bg-[#0a0a0e] text-zinc-100 border border-zinc-700 p-5 space-y-3.5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h3 className="text-[13px] font-bold tracking-wider text-zinc-100">
                クレジット
              </h3>
              <button
                type="button"
                onClick={() => setIsCreditsOpen(false)}
                className="px-2 py-0.5 text-[11px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 cursor-pointer"
              >
                ✕ 閉じる
              </button>
            </div>

            <div className="space-y-2 text-[11.5px] leading-relaxed text-zinc-300">
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">サークル名</span>
                <span className="text-zinc-100 font-bold">咀嚼屋</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">制作・シナリオ・イラスト</span>
                <span className="text-zinc-100 font-bold">中邑フエコ</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">BGM素材</span>
                <span className="text-zinc-100 font-bold">
                  イワシロ音楽素材（『魂の煮付け』）
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">プログラミング補助・テキスト入力補助</span>
                <span className="text-zinc-100 font-bold">Google AI Studio</span>
              </div>
              <div className="pt-1 text-[10px] text-zinc-500 leading-snug">
                原作：『テイルズ オブ ジ アビス』
                <br />
                ※本作は非公式の個人二次創作ゲームであり、原作および関係各社様とは一切関係ございません。
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
