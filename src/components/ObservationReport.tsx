import React, { useState } from 'react';
import {
  EndingApproach,
  EndingDisposition,
  MemorySector,
  ObservationStats,
} from '../types/game';
import { ENDING_SCENARIOS, resolveEndingKey } from '../data/prototypeScenario';
import { soundEngine } from '../utils/chiptuneAudio';

interface ObservationReportProps {
  endingDisposition: EndingDisposition;
  endingApproach: EndingApproach;
  customEndingKey?: string | null;
  stats: ObservationStats;
  sectors: MemorySector[];
  onResetSession: () => void;
  onOpenAchievements: () => void;
}

export const ObservationReport: React.FC<ObservationReportProps> = ({
  endingDisposition,
  endingApproach,
  customEndingKey,
  stats,
  sectors,
  onResetSession,
  onOpenAchievements,
}) => {
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  const totalSectors = sectors.length;
  const naturalUnlockedCount = sectors.filter(
    (s) => s.unlocked && s.unlockedMethod === 'DIALOGUE'
  ).length;
  const forcedUnlockedCount = sectors.filter(
    (s) => s.unlocked && s.unlockedMethod === 'OVERRIDE'
  ).length;
  const remainingLockedCount =
    totalSectors - naturalUnlockedCount - forcedUnlockedCount;

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

  const rows: { label: string; value: string }[] = [
    { label: '到達した結末', value: dispositionLabel },
    {
      label: '交わした会話数',
      value: `${stats.completedTopicsCount} トピック完了（総選択 ${stats.totalTurns} 回）`,
    },
    {
      label: 'プロテクト解除内訳',
      value: `自然開示：${naturalUnlockedCount}件 ／ 強制解除：${forcedUnlockedCount}件 ／ 未開示：${remainingLockedCount}件`,
    },
    { label: '平均返答時間', value: `${avgResponseSec} 秒` },
    { label: '即答回数（2秒以内）', value: `${stats.quickReplyCount} 回` },
    { label: '迷い回数（選択肢切り替え）', value: `${stats.choiceHoverSwitchCount} 回` },
    { label: '無言（放置）発生回数', value: `${stats.idleTimeoutCount} 回` },
    { label: '画面から目を離した回数', value: `${stats.tabSwitchCount} 回` },
    {
      label: '管理端末を開いた回数',
      value: `${stats.terminalOpenCount} 回（計 ${terminalTotalSec} 秒）`,
    },
  ];

  return (
    <div className="relative w-full h-full bg-[#e4e5ea] text-zinc-900 flex flex-col justify-between p-5 overflow-hidden select-none">
      {/* 上部タイトルバー */}
      <div className="flex items-end justify-between border-b-2 border-zinc-900 pb-2 shrink-0">
        <div>
          <p className="text-[10px] tracking-[0.2em] text-zinc-600 font-mono">
            OBSERVATION RECORD // SESSION: {stats.sessionId}
          </p>
          <h2 className="text-[18px] font-bold tracking-wider text-zinc-950">
            対話観測記録
          </h2>
        </div>
        <div className="text-right">
          <span className="inline-block px-2.5 py-0.5 text-[11px] bg-zinc-900 text-zinc-100 tracking-wider">
            {reachedEnding ? reachedEnding.subtitle : `DISPOSITION: ${endingDisposition}`}
          </span>
        </div>
      </div>

      {/* 中央：シンプルで見やすい2列グリッドのデータシート */}
      <div className="my-auto py-2">
        <div className="border border-zinc-800 bg-[#f4f5f7] shadow-sm">
          <div className="grid grid-cols-2 divide-x divide-y divide-zinc-300">
            {rows.map((row, idx) => (
              <div
                key={row.label}
                className={`px-3.5 py-2 flex items-center justify-between gap-2 ${
                  idx === 0 || idx === 1 || idx === 2 ? 'col-span-2' : ''
                }`}
              >
                <span className="text-[11.5px] text-zinc-600 shrink-0">
                  {row.label}
                </span>
                <span className="text-[12.5px] font-bold text-zinc-950 text-right">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 下部フッター：クレジット ＆ 最初からやり直す */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-400 shrink-0">
        <span className="text-[10.5px] text-zinc-600">
          Ghost in the mASCHine // OBSERVATION REPORT
        </span>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              soundEngine.playTerminalTab();
              onOpenAchievements();
            }}
            className="px-4 py-1.5 text-[12px] bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 transition-colors cursor-pointer"
          >
            実績・記録
          </button>

          <button
            onClick={() => {
              soundEngine.playTerminalTab();
              setIsCreditsOpen(true);
            }}
            className="px-4 py-1.5 text-[12px] bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border border-zinc-700 transition-colors cursor-pointer"
          >
            クレジット
          </button>

          <button
            onClick={() => {
              soundEngine.playTitleStart();
              onResetSession();
            }}
            className="px-5 py-1.5 text-[12px] bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-950 transition-colors cursor-pointer"
          >
            最初からやり直す
          </button>
        </div>
      </div>

      {/* クレジットモーダル */}
      {isCreditsOpen && (
        <div
          onClick={() => setIsCreditsOpen(false)}
          className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[420px] bg-[#0a0a0e] text-zinc-100 border border-zinc-700 p-5 space-y-3.5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h3 className="text-[14px] tracking-wider text-zinc-100">
                クレジット / CREDITS
              </h3>
              <button
                onClick={() => setIsCreditsOpen(false)}
                className="px-2 py-0.5 text-[11px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 cursor-pointer"
              >
                ✕ 閉じる
              </button>
            </div>

            <div className="space-y-2.5 text-[12px] leading-relaxed text-zinc-300">
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-400">サークル名</span>
                <span className="text-zinc-100">咀嚼屋</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-400">制作・シナリオ・イラスト</span>
                <span className="text-zinc-100">中邑フエコ</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-400">BGM素材</span>
                <span className="text-zinc-100">
                  イワシロ音楽素材（『魂の煮付け』）
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-400">プログラミング・テキスト入力補助</span>
                <span className="text-zinc-100">Google AI Studio</span>
              </div>
              <div className="pt-1 text-[11px] text-zinc-400">
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
