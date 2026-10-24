import React, { useState } from 'react';
import {
  EndingApproach,
  EndingDisposition,
  MemorySector,
  ObservationStats,
  OralInfoEntry,
} from '../types/game';
import {
  ENDING_SCENARIOS,
  resolveEndingKey,
} from '../data/prototypeScenario';
import { soundEngine } from '../utils/chiptuneAudio';
import {
  ACHIEVEMENT_DEFINITIONS,
  AchievementSaveData,
  ENDING_ARCHIVE_LIST,
} from '../utils/achievementStore';
import { useLanguage } from '../utils/i18n';
import { REPORT_LABELS } from '../locales/reportLocale';
import { getLocalizedDialogue } from '../locales/dialogueLocale';
import {
  getLocalizedAchievement,
  getLocalizedEndingHint,
} from '../locales/achievementLocale';

// 観測ログ（INFO）の集計対象ID（通常時5件、メイドモード時6件）
export const TARGET_ORAL_INFO_IDS = [
  'oral-tea-sensory',
  'oral-sleep-mode-unimplemented',
  'oral-mansion-unspoken-text',
  'oral-hands-feeling-bloodless',
  'oral-two-years-protect-trace',
] as const;

export const MAID_ORAL_INFO_ID = 'oral-maid-tea-apron';

interface ObservationReportProps {
  endingDisposition: EndingDisposition;
  endingApproach: EndingApproach;
  customEndingKey?: string | null;
  stats: ObservationStats;
  sectors: MemorySector[];
  oralInfos?: OralInfoEntry[];
  isMaidMode?: boolean;
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
  oralInfos,
  isMaidMode,
  achievementSave,
  onResetSession,
}) => {
  const [lang] = useLanguage();
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ENDINGS' | 'ACHIEVEMENTS'>('ENDINGS');
  const [selectedEndingKey, setSelectedEndingKey] = useState<string | null>(null);
  const [selectedAchId, setSelectedAchId] = useState<string | null>(null);

  // 観測ログ（INFO）の集計：通常時5件＋メイド時1件（計5〜6件）
  const targetOralInfoIds =
    isMaidMode || oralInfos?.some((info) => info.id === MAID_ORAL_INFO_ID)
      ? [...TARGET_ORAL_INFO_IDS, MAID_ORAL_INFO_ID]
      : TARGET_ORAL_INFO_IDS;

  const totalOralCount = targetOralInfoIds.length;
  const unlockedOralCount = oralInfos
    ? oralInfos.filter((info) =>
        (targetOralInfoIds as readonly string[]).includes(info.id)
      ).length
    : 0;
  const remainingOralCount = Math.max(0, totalOralCount - unlockedOralCount);

  // 重要セクター（SEC-01〜SEC-20の20件）
  const relevantSectors = sectors.filter((s) => s.id !== 'SEC-00');
  const naturalSectorCount = relevantSectors.filter(
    (s) => s.unlocked && s.unlockedMethod === 'DIALOGUE'
  ).length;
  const forcedSectorCount =
    stats?.overrideCount ??
    relevantSectors.filter(
      (s) => s.unlocked && s.unlockedMethod === 'OVERRIDE'
    ).length;
  const remainingSectorCount = relevantSectors.filter((s) => !s.unlocked).length;

  // 案B合算集計：端末データ開示（セクター20件 ＋ 観測ログ5〜6件 ＝ 計25〜26件）
  const naturalUnlockedCount = naturalSectorCount + unlockedOralCount;
  const forcedUnlockedCount = forcedSectorCount;
  const remainingLockedCount = remainingSectorCount + remainingOralCount;

  const avgResponseSec =
    stats.totalTurns > 0
      ? (stats.totalResponseTimeMs / stats.totalTurns / 1000).toFixed(1)
      : '0.0';

  const terminalTotalSec = (stats.terminalTotalDurationMs / 1000).toFixed(1);

  const resolvedEndingKey =
    customEndingKey || resolveEndingKey(endingDisposition, endingApproach);
  const reachedEnding = ENDING_SCENARIOS[resolvedEndingKey];
  const dispositionLabel = reachedEnding
    ? getLocalizedDialogue(reachedEnding.title, lang)
    : endingDisposition === 'KEEP'
      ? REPORT_LABELS.dispositionKeep[lang]
      : endingDisposition === 'RETURN'
        ? REPORT_LABELS.dispositionReturn[lang]
        : REPORT_LABELS.dispositionDestroy[lang];

  // 累計データの集計
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
            {REPORT_LABELS.headerTitle[lang]}
          </h2>
          <span className="text-[10px] tracking-[0.2em] text-zinc-500 font-mono">
            SESSION: {stats.sessionId}
          </span>
        </div>
        <div>
          <span className="inline-block px-2.5 py-0.5 text-[11px] bg-zinc-900 text-zinc-100 tracking-wider">
            {reachedEnding ? getLocalizedDialogue(reachedEnding.subtitle, lang) : `DISPOSITION: ${endingDisposition}`}
          </span>
        </div>
      </div>

      {/* 中央メインエリア：左（案1：カテゴリ別3分割） ＆ 右（実績・記録アーカイブ） */}
      <div className="flex-1 w-full flex items-stretch gap-4 my-2 min-h-0 overflow-hidden">
        {/* 左側：セッション結果（右側のデザインに合わせた3カテゴリ分割） */}
        <div className="w-[37%] shrink-0 flex flex-col justify-between py-1">
          {/* 1. 対話の記録 */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-zinc-700 tracking-wider border-b border-zinc-400/90 pb-0.5">
              <span>▼ {REPORT_LABELS.dialogueRecord[lang]}</span>
            </div>
            <div className="divide-y divide-zinc-300 text-[11.5px]">
              <div className="py-1 flex items-baseline justify-between gap-2">
                <span className="text-zinc-600 font-medium shrink-0">{REPORT_LABELS.reachedEnding[lang]}</span>
                <span className="font-bold text-zinc-950 text-right leading-tight">
                  {dispositionLabel}
                </span>
              </div>
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">{REPORT_LABELS.completedTopics[lang]}</span>
                <span className="font-bold text-zinc-950 text-right">
                  {stats.completedTopicsCount} {REPORT_LABELS.choicesCount(stats.totalTurns, lang)}
                </span>
              </div>
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">{REPORT_LABELS.terminalDisclosure[lang]}</span>
                <span className="font-bold text-zinc-950 text-right">
                  {REPORT_LABELS.terminalDisclosureCounts(naturalUnlockedCount, forcedUnlockedCount, remainingLockedCount, lang)}
                </span>
              </div>
            </div>
          </div>

          {/* 2. 返答の様子 */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-zinc-700 tracking-wider border-b border-zinc-400/90 pb-0.5">
              <span>▼ {REPORT_LABELS.responsePatterns[lang]}</span>
            </div>
            <div className="divide-y divide-zinc-300 text-[11.5px]">
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">{REPORT_LABELS.avgThinkingTime[lang]}</span>
                <span className="font-bold text-zinc-950 text-right">
                  {REPORT_LABELS.secondsUnit(avgResponseSec, lang)}
                </span>
              </div>
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">{REPORT_LABELS.quickReply[lang]}</span>
                <span className="font-bold text-zinc-950 text-right">
                  {REPORT_LABELS.timesUnit(stats.quickReplyCount, lang)}
                </span>
              </div>
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">{REPORT_LABELS.choiceHesitation[lang]}</span>
                <span className="font-bold text-zinc-950 text-right">
                  {REPORT_LABELS.timesUnit(stats.choiceHoverSwitchCount, lang)}
                </span>
              </div>
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">{REPORT_LABELS.silenceCount[lang]}</span>
                <span className="font-bold text-zinc-950 text-right">
                  {REPORT_LABELS.timesUnit(stats.idleTimeoutCount, lang)}
                </span>
              </div>
            </div>
          </div>

          {/* 3. 行動検知 */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-zinc-700 tracking-wider border-b border-zinc-400/90 pb-0.5">
              <span>▼ {REPORT_LABELS.behaviorDetection[lang]}</span>
            </div>
            <div className="divide-y divide-zinc-300 text-[11.5px]">
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">{REPORT_LABELS.terminalViews[lang]}</span>
                <span className="font-bold text-zinc-950 text-right">
                  {REPORT_LABELS.terminalViewsCount(stats.terminalOpenCount, terminalTotalSec, lang)}
                </span>
              </div>
              <div className="py-1 flex items-center justify-between gap-2">
                <span className="text-zinc-600">{REPORT_LABELS.tabSwitches[lang]}</span>
                <span className="font-bold text-zinc-950 text-right">
                  {REPORT_LABELS.timesUnit(stats.tabSwitchCount, lang)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 右側：実績・記録（白黒統一・ヒントツールチップ方式） */}
        <div className="flex-1 flex flex-col justify-between border-l border-zinc-300 pl-4 min-h-0">
          {/* タブ切り替え（下線スタイル） */}
          <div className="flex items-center justify-between border-b border-zinc-300/80 pt-1 pb-1 shrink-0">
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
                {REPORT_LABELS.tabEndings[lang]}
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
                {REPORT_LABELS.tabAchievements[lang]}
              </button>
            </div>

            <span className="text-[10px] text-zinc-500">
              {REPORT_LABELS.clickHint[lang]}
            </span>
          </div>

          {/* リスト領域（上部途切れ防止：overflow-visible + 上段ツールチップは下向き表示） */}
          <div className="flex-1 min-h-0 pt-3 pb-1 overflow-visible relative flex flex-col justify-center">
            {activeTab === 'ENDINGS' && (
              <div className="w-full grid grid-cols-2 grid-rows-5 gap-x-3 gap-y-2.5 items-center">
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

                  const localizedTitle = scenario ? getLocalizedDialogue(scenario.title, lang) : '';
                  const cleanTitle = isSubItem
                    ? isReached
                      ? (lang === 'en' ? 'Everything will be fine' : lang === 'ko' ? '이걸로 전부 잘 풀릴 거야' : 'これで全部うまくいく')
                      : (lang === 'en' ? '??????' : '？？？？？？')
                    : isReached && scenario
                      ? localizedTitle.replace(/^END\s*[0-9a-zA-Z]+\s*\/\/\s*/, '')
                      : (lang === 'en' ? '??????' : '？？？？？？');

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
                      className="relative w-full text-left py-1.5 border-b border-zinc-300/80 hover:border-zinc-500 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {/* ヒントツールチップ（1行目は下方向、2行目以降は上方向へ展開して途切れを防止） */}
                      {isSelected && (
                        <div
                          className={`absolute ${tooltipAlignClass} ${
                            isFirstRow ? 'top-full mt-1.5' : 'bottom-full mb-1.5'
                          } w-max max-w-[280px] whitespace-normal bg-zinc-900 text-zinc-100 px-2.5 py-1 text-[10.5px] leading-snug shadow-xl z-50 pointer-events-none`}
                        >
                          {getLocalizedEndingHint(item.key, lang) || item.hint}
                        </div>
                      )}

                      <span
                        className={`text-[10.5px] font-mono shrink-0 flex items-center gap-1 ${
                          isReached ? 'font-bold text-zinc-950' : 'text-zinc-400'
                        }`}
                      >
                        <span className={isAllReached ? 'text-zinc-950' : isReached ? 'text-zinc-700' : 'text-zinc-400 text-[8.5px]'}>
                          {isReached ? '●' : '○'}
                        </span>
                        <span>{item.numberLabel}</span>
                      </span>
                      <span
                        className={`text-[11px] whitespace-nowrap overflow-visible flex items-center ${
                          isReached ? 'font-bold text-zinc-950' : 'text-zinc-400'
                        }`}
                      >
                        <span>{cleanTitle}</span>
                        {isSubItem && (
                          <span className="inline-flex items-center gap-1 ml-1.5 font-mono text-[10.5px]">
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

                  const locAch = getLocalizedAchievement(ach.id, lang);
                  const achTitle = locAch ? locAch.title : ach.title;
                  const achDesc = locAch ? locAch.description : ach.description;

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
                          {achDesc}
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
                        className={`text-[11.5px] leading-tight break-words ${
                          isUnlocked ? 'font-bold text-zinc-950' : 'text-zinc-400'
                        }`}
                      >
                        {achTitle}
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
            {REPORT_LABELS.btnCredits[lang]}
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playTitleStart();
              onResetSession();
            }}
            className="px-4 py-1 text-[11.5px] bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-950 transition-colors cursor-pointer font-bold"
          >
            {REPORT_LABELS.btnRestart[lang]}
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
                {REPORT_LABELS.btnCredits[lang]}
              </h3>
              <button
                type="button"
                onClick={() => setIsCreditsOpen(false)}
                className="px-2 py-0.5 text-[11px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 cursor-pointer"
              >
                ✕ {REPORT_LABELS.btnClose[lang]}
              </button>
            </div>

            <div className="space-y-2 text-[11.5px] leading-relaxed text-zinc-300">
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">{REPORT_LABELS.creditCircleName[lang]}</span>
                <span className="text-zinc-100 font-bold">咀嚼屋</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">{REPORT_LABELS.creditAuthor[lang]}</span>
                <span className="text-zinc-100 font-bold">中邑フエコ</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">{REPORT_LABELS.creditBgm[lang]}</span>
                <span className="text-zinc-100 font-bold">
                  {REPORT_LABELS.creditBgmSource[lang]}
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">{REPORT_LABELS.creditAiAssistance[lang]}</span>
                <span className="text-zinc-100 font-bold">Google AI Studio</span>
              </div>
              <div className="pt-1 text-[10px] text-zinc-500 leading-snug">
                {REPORT_LABELS.creditOriginalWork[lang]}
                <br />
                {REPORT_LABELS.creditDisclaimer[lang]}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
