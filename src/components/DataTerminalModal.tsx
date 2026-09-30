import React, { useEffect, useState, useRef } from 'react';
import { getAssetUrl } from '../utils/assetPath';
import {
  MemorySector,
  OralInfoEntry,
  SystemLogEntry,
  InfoCategoryLabel,
} from '../types/game';
import { soundEngine } from '../utils/chiptuneAudio';

interface DataTerminalModalProps {
  isOpen: boolean;
  mood: number;
  sectors: MemorySector[];
  oralInfos: OralInfoEntry[];
  logs: SystemLogEntry[];
  customTanmatuSrc: string | null;
  onSelectTanmatuFile: (file: File) => void;
  onOverrideSector: (sectorId: string) => void;
  onReadSector?: (sectorId: string) => void;
}

const PAGES = [
  { id: 'MONITOR', label: 'MONITOR' },
  { id: 'INFO', label: 'INFO' },
] as const;

const INFO_FILTERS: { id: 'ALL' | '機体ログ' | '情動反応' | '深層記憶'; label: string }[] = [
  { id: 'ALL', label: 'すべて' },
  { id: '機体ログ', label: 'MC:機体ログ' },
  { id: '情動反応', label: 'EM:情動反応' },
  { id: '深層記憶', label: 'DP:深層記憶' },
];

export const DataTerminalModal: React.FC<DataTerminalModalProps> = ({
  isOpen,
  mood,
  sectors,
  oralInfos,
  logs,
  customTanmatuSrc,
  onOverrideSector,
  onReadSector,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  const [expandedInfoIds, setExpandedInfoIds] = useState<Record<string, boolean>>({});
  const [readInfoIds, setReadInfoIds] = useState<Record<string, boolean>>({});
  const [selectedInfoFilter, setSelectedInfoFilter] = useState<'ALL' | '機体ログ' | '情動反応' | '深層記憶'>('ALL');

  // カテゴリ正規化（機体ログ・情動反応・深層記憶）
  const normalizeCategory = (cat: InfoCategoryLabel): '機体ログ' | '情動反応' | '深層記憶' => {
    if (cat === '機体仕様' || cat === '機体ログ') return '機体ログ';
    if (cat === '情動観測' || cat === '情動反応') return '情動反応';
    return '深層記憶';
  };

  // PROTECT項目の長押し解除管理
  const [holdingSectorId, setHoldingSectorId] = useState<string | null>(null);
  const [holdProgress, setHoldProgress] = useState(0);

  const infoListRef = useRef<HTMLDivElement>(null);
  const logListRef = useRef<HTMLDivElement>(null);

  // 長押し解除の中断ハンドラ
  const cancelHold = () => {
    soundEngine.stopProtectHoldTone();
    setHoldingSectorId(null);
    setHoldProgress(0);
  };

  // 端末を閉じた際やタブ切替時に長押しをキャンセル
  useEffect(() => {
    cancelHold();
  }, [isOpen, pageIndex]);

  // アンマウント時に長押し音を確実に停止
  useEffect(() => {
    return () => {
      soundEngine.stopProtectHoldTone();
    };
  }, []);

  // ページ切替時・フィルタ切替時にスクロール位置を整える
  useEffect(() => {
    if (pageIndex === 1 && infoListRef.current) {
      infoListRef.current.scrollTop = 0;
    }
  }, [pageIndex, isOpen, selectedInfoFilter]);

  // MONITORページのシステムログは新しいログが追加されたら末尾へスクロール
  useEffect(() => {
    if (isOpen && pageIndex === 0 && logListRef.current) {
      logListRef.current.scrollTop = logListRef.current.scrollHeight;
    }
  }, [isOpen, pageIndex, logs.length]);

  // 長押し進行タイマー（約0.6秒で100%チャージ）
  useEffect(() => {
    if (!holdingSectorId) return;
    const interval = window.setInterval(() => {
      setHoldProgress((prev) => {
        const next = prev + 5;
        return next >= 100 ? 100 : next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [holdingSectorId]);

  // ゲージが100%に到達したらロック解除を完了し、解除した項目をそのまま展開・既読化する
  useEffect(() => {
    if (holdProgress >= 100 && holdingSectorId) {
      const targetId = holdingSectorId;
      const itemKey = `sec-${targetId}`;
      cancelHold();
      soundEngine.playProtectScreenUnlock();
      onOverrideSector(targetId);
      setExpandedInfoIds((prev) => ({ ...prev, [itemKey]: true }));
      setReadInfoIds((prev) => ({ ...prev, [itemKey]: true }));
      onReadSector?.(targetId);
    }
  }, [holdProgress, holdingSectorId, onOverrideSector, onReadSector]);

  // オシロスコープ波形のアニメーション更新
  useEffect(() => {
    if (!isOpen) return;
    const interval = window.setInterval(() => {
      setPhase((p) => (p + 0.32) % (Math.PI * 20));
    }, 50);
    return () => clearInterval(interval);
  }, [isOpen]);

  const isAngry = mood < 0;
  const isHappy = mood > 0;

  // オシロスコープの波形パス生成（アッシュの機嫌・感情状態を表現）
  const generateWavePath = () => {
    const points: string[] = [];
    const width = 260;
    const midY = 20;

    for (let x = 0; x <= width; x += 4) {
      const freq1 = isAngry ? 0.2 : 0.1;
      const freq2 = isAngry ? 0.42 : 0.22;
      const amp1 = isAngry ? 9.5 : isHappy ? 6.5 : 5;
      const amp2 = isAngry ? 5 : 2.5;
      const jitter = isAngry ? Math.sin(x * 1.3 + phase * 2.8) * 2.4 : 0;
      const y =
        midY +
        Math.sin(x * freq1 + phase) * amp1 +
        Math.cos(x * freq2 - phase * 1.3) * amp2 +
        jitter;
      const clampedY = Math.max(2, Math.min(38, y));
      points.push(`${x === 0 ? 'M' : 'L'} ${x} ${clampedY.toFixed(1)}`);
    }
    return points.join(' ');
  };

  const toggleInfoExpand = (id: string, sectorId?: string) => {
    soundEngine.playTerminalTab();
    const willExpand = !expandedInfoIds[id];
    setExpandedInfoIds((prev) => ({
      ...prev,
      [id]: willExpand,
    }));
    if (willExpand) {
      setReadInfoIds((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
      if (sectorId) {
        onReadSector?.(sectorId);
      }
    }
  };

  // 2ページ目（INFO）：「解除済みセクタ」＋「口頭・自動観測ログ」＋「未解除プロテクト（黒塗り表示）」
  const unlockedSectors = sectors.filter((s) => s.unlocked);
  const discoveredLockedSectors = sectors.filter((s) => s.discovered && !s.unlocked);

  // セッションリセット時に既読・展開状態を初期化
  useEffect(() => {
    if (oralInfos.length === 0 && unlockedSectors.length <= 1 && discoveredLockedSectors.length <= 2) {
      setReadInfoIds({});
      setExpandedInfoIds({});
    }
  }, [oralInfos.length, unlockedSectors.length, discoveredLockedSectors.length]);

  const getSectorCode = (sec: MemorySector) => {
    return sec.code;
  };

  // 口頭・自動観測ログのカテゴリ別連番計算（古い順から各カテゴリのセクター数の続き番号を振る）
  const oralCodeMap = (() => {
    const baseCounts: Record<'MC' | 'EM' | 'DP', number> = {
      MC: 6,
      EM: 7,
      DP: 3,
    };
    const map: Record<string, string> = {};
    const chronologicalOral = [...oralInfos].reverse();
    chronologicalOral.forEach((info) => {
      const norm = normalizeCategory(info.category);
      const prefix: 'MC' | 'EM' | 'DP' =
        norm === '機体ログ' ? 'MC' : norm === '情動反応' ? 'EM' : 'DP';
      baseCounts[prefix] += 1;
      map[info.id] = `${prefix}-${String(baseCounts[prefix]).padStart(3, '0')}`;
    });
    return map;
  })();

  const combinedInfoItems: {
    id: string;
    code: string;
    sectorId?: string;
    category: InfoCategoryLabel;
    title: string;
    content: string;
    isProtected?: boolean;
    isDistoMajorLock?: boolean;
    subWarning?: string;
    timestamp: number;
  }[] = [
    // 解除済みセクター（解除後はディスト重大ロックも含め全て白一色になる）
    ...unlockedSectors.map((sec) => {
      const category: InfoCategoryLabel = sec.unlockedCategory ?? '深層解凍';

      return {
        id: `sec-${sec.id}`,
        code: getSectorCode(sec),
        sectorId: sec.id,
        category,
        title: sec.unlockedTitle,
        content: sec.unlockedContent,
        isProtected: false,
        isDistoMajorLock: false,
        subWarning: sec.unlockedMethod === 'OVERRIDE' ? sec.paradoxWarning : undefined,
        timestamp: sec.discoveredAt ?? 0,
      };
    }),
    // 口頭・自動観測ログ
    ...oralInfos.map((info) => {
      return {
        id: `oral-${info.id}`,
        code: oralCodeMap[info.id] ?? 'EM-008',
        category: info.category,
        title: info.title,
        content: info.content,
        isProtected: false,
        isDistoMajorLock: false,
        timestamp: info.recordedAt ?? 0,
      };
    }),
    // 発見済みだが未解除のプロテクト項目（ディスト重大ロックのみ赤、他は白）
    ...discoveredLockedSectors.map((sec) => {
      const category: InfoCategoryLabel = sec.unlockedCategory ?? '深層解凍';
      const isDistoMajor =
        !!sec.onlyOverride ||
        sec.id === 'SEC-19' ||
        sec.id === 'SEC-20';

      return {
        id: `locked-${sec.id}`,
        code: getSectorCode(sec),
        sectorId: sec.id,
        category,
        title: sec.unlockedTitle,
        content: '【PROTECTED】プロテクトが施されています。長押しで強制解除できます。',
        isProtected: true,
        isDistoMajorLock: isDistoMajor,
        timestamp: sec.discoveredAt ?? 0,
      };
    }),
  ];

  const filteredInfoItems =
    selectedInfoFilter === 'ALL'
      ? [...combinedInfoItems].sort(
          (a, b) => b.timestamp - a.timestamp || a.code.localeCompare(b.code)
        )
      : combinedInfoItems
          .filter((item) => normalizeCategory(item.category) === selectedInfoFilter)
          .sort((a, b) => a.code.localeCompare(b.code));

  const goPrev = () => {
    soundEngine.playTerminalTab();
    setPageIndex((prev) => (prev - 1 + PAGES.length) % PAGES.length);
  };
  const goNext = () => {
    soundEngine.playTerminalTab();
    setPageIndex((prev) => (prev + 1) % PAGES.length);
  };

  // 基本の項目は全て白一色に統一
  const getCategoryBadgeStyle = () => {
    return 'border-zinc-500 text-zinc-100 bg-zinc-900/60';
  };

  const tanmatuSrc = customTanmatuSrc || getAssetUrl('images/tanmatu.png');

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute left-0 -bottom-[98px] z-30 w-[640px] h-[360px] transition-transform duration-300 ease-out select-none pointer-events-auto font-terminal ${
        isOpen ? 'translate-y-0' : 'translate-y-[380px] pointer-events-none'
      }`}
    >
      {/* 1. 端末の液晶画面UI領域（新しいtanmatu.pngの黒ベゼル内側の透過窓にぴったり収まり、親指の右側を安全領域として表示） */}
      <div className="absolute left-[140px] top-[49px] w-[372px] h-[192px] z-20 bg-[#09090b] text-zinc-100 pl-[38px] pr-[6px] pt-[3px] pb-[3px] flex flex-col overflow-hidden">
        {/* 液晶上部：ページ切り替えバー */}
        <div className="px-2 py-0.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1">
            <button
              onClick={goPrev}
              className="px-1.5 py-0.5 text-[8px] bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 cursor-pointer leading-none"
              title="前のページ"
            >
              ◀
            </button>
            <button
              onClick={goNext}
              className="px-1.5 py-0.5 text-[8px] bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 cursor-pointer leading-none"
              title="次のページ"
            >
              ▶
            </button>
            <span className="text-[8px] tracking-widest text-zinc-200 ml-1">
              {pageIndex + 1}/{PAGES.length} : {PAGES[pageIndex].label}
            </span>
          </div>

          {/* ページインジケーター */}
          <div className="flex items-center gap-1.5">
            {PAGES.map((p, idx) => {
              const hasProtectedSector = combinedInfoItems.some((i) => i.isProtected);
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    soundEngine.playTerminalTab();
                    setPageIndex(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-colors ${
                    idx === pageIndex
                      ? 'bg-zinc-100 ring-1 ring-zinc-400'
                      : idx === 1 && hasProtectedSector
                        ? 'bg-red-500 animate-pulse'
                        : 'bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  title={p.label}
                />
              );
            })}
          </div>
        </div>

        {/* 液晶メイン領域 */}
        <div className="flex-1 min-h-0 p-1.5 flex flex-col justify-between overflow-hidden">
          {/* === 1/2 : MONITOR（感情のグラフ・稼働ログ） === */}
          {pageIndex === 0 && (
            <div className="flex-1 min-h-0 flex flex-col justify-between gap-1">
              {/* 上段：感情のグラフ（情動波形）ステータス */}
              <div className="flex items-center justify-between border-b border-zinc-800/90 pb-0.5 shrink-0">
                <span className="text-[7.5px] text-zinc-400 tracking-wider">
                  EMOTION_WAVE // 感情波形
                </span>
                <span
                  className={`text-[7px] px-1 py-[0.5px] border ${
                    isAngry
                      ? 'border-red-800 text-red-300 bg-red-950/40'
                      : isHappy
                        ? 'border-emerald-800 text-emerald-300 bg-emerald-950/40'
                        : 'border-zinc-700 text-zinc-400 bg-zinc-900'
                  }`}
                >
                  {isAngry
                    ? '情動昂進（警戒・怒り）'
                    : isHappy
                      ? '情動軟化（緩和）'
                      : '通常波形'}
                </span>
              </div>

              {/* 中段：オシロスコープ波形（感情のグラフ） */}
              <div className="h-[36px] w-full bg-black border border-zinc-800 relative overflow-hidden flex items-center shrink-0">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)',
                    backgroundSize: '14px 12px',
                  }}
                />
                <svg
                  viewBox="0 0 260 40"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d={generateWavePath()}
                    fill="none"
                    stroke={isAngry ? '#f87171' : '#e4e4e7'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* 下段：システムログ表示（SYSTEM LOG・常時スクロールバー表示） */}
              <div className="flex-1 min-h-0 flex flex-col pt-0.5">
                <div className="flex items-center justify-between mb-0.5 shrink-0">
                  <span className="text-[7px] text-zinc-400 tracking-wider">
                    SYSTEM_LOG // 稼働ログ
                  </span>
                  <span className="text-[6.5px] text-zinc-500">
                    {logs.length} RECORDS
                  </span>
                </div>
                <div
                  ref={logListRef}
                  className="flex-1 min-h-0 overflow-y-scroll [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:#52525b_#09090b] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-[#09090b] [&::-webkit-scrollbar-track]:border-l [&::-webkit-scrollbar-track]:border-zinc-800 [&::-webkit-scrollbar-thumb]:bg-zinc-600 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400 [&::-webkit-scrollbar-thumb]:rounded-none bg-black/90 border border-zinc-800/90 px-1.5 py-1 space-y-0.5"
                >
                  {logs.map((log) => {
                    const colorClass =
                      log.type === 'ERROR' || log.type === 'PARADOX'
                        ? 'text-red-400'
                        : log.type === 'WARNING'
                          ? 'text-amber-300'
                          : 'text-zinc-300';
                    return (
                      <div
                        key={log.id}
                        className="text-[7px] leading-snug flex items-baseline gap-1"
                      >
                        <span className="text-zinc-500 shrink-0">
                          [{log.timestamp}]
                        </span>
                        <span className={`${colorClass} break-all`}>
                          {log.message}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* === 2/2 : INFO（【カテゴリ】観測ログ ＆ フィルター ＆ PROTECT長押し解除・常時スクロールバー表示） === */}
          {pageIndex === 1 && (
            <div className="flex-1 min-h-0 flex flex-col gap-1">
              {/* カテゴリフィルターボタン */}
              <div className="flex items-center gap-1 pb-1 border-b border-zinc-800/90 shrink-0 overflow-x-auto">
                {INFO_FILTERS.map((f) => {
                  const active = selectedInfoFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        soundEngine.playTerminalTab();
                        setSelectedInfoFilter(f.id);
                      }}
                      className={`px-1.5 py-[1px] text-[7px] border transition-colors cursor-pointer shrink-0 ${
                        active
                          ? 'bg-zinc-200 text-zinc-950 border-zinc-100 font-semibold'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>

              {/* 観測ログリスト（常時スクロールバー表示） */}
              <div
                ref={infoListRef}
                className="flex-1 min-h-0 overflow-y-scroll [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:#52525b_#09090b] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-[#09090b] [&::-webkit-scrollbar-track]:border-l [&::-webkit-scrollbar-track]:border-zinc-800 [&::-webkit-scrollbar-thumb]:bg-zinc-600 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400 [&::-webkit-scrollbar-thumb]:rounded-none pr-1 space-y-1"
              >
                {filteredInfoItems.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center">
                    <span className="text-[8px] text-zinc-500">
                      該当する記録はまだありません
                    </span>
                  </div>
                ) : (
                  filteredInfoItems.map((item) => {
                    const isExpanded = !!expandedInfoIds[item.id];
                    const isRead = !!readInfoIds[item.id];
                    const isUnread = !item.isProtected && !isRead;
                    const isCurrentlyHolding =
                      item.isProtected &&
                      item.sectorId &&
                      holdingSectorId === item.sectorId;
                    const isMajor = item.isProtected && item.isDistoMajorLock;

                    return (
                      <div
                        key={item.id}
                        className={`border overflow-hidden transition-colors rounded-none ${
                          isMajor
                            ? 'border-[#632f2f] bg-[#1a0f0f]'
                            : isUnread
                              ? 'border-[#333842] border-l-2 border-l-[#e4e4e7] bg-[#0c0d10]'
                              : 'border-[#333842] bg-[#0c0d10]'
                        }`}
                      >
                        {item.isProtected ? (
                          /* PROTECT付き項目：長押しで解除（高さh-[24px]固定） */
                          <div
                            onPointerDown={() => {
                              if (item.sectorId) {
                                setHoldingSectorId(item.sectorId);
                                setHoldProgress(0);
                                soundEngine.startProtectHoldTone();
                              }
                            }}
                            onPointerUp={cancelHold}
                            onPointerLeave={cancelHold}
                            onPointerCancel={cancelHold}
                            onContextMenu={(e) => e.preventDefault()}
                            className="relative w-full h-[24px] px-1.5 flex items-center justify-between gap-1 text-left cursor-pointer select-none overflow-hidden"
                            title="長押ししてプロテクトを解除"
                          >
                            {/* 長押ししている時は項目全体を覆うバーが出る */}
                            {isCurrentlyHolding && (
                              <div
                                className={`absolute inset-0 transition-none pointer-events-none ${
                                  isMajor ? 'bg-[#7a3838]/50' : 'bg-[#828894]/40'
                                }`}
                                style={{ width: `${holdProgress}%` }}
                              />
                            )}

                            {/* 左側：コード枠 ＋ 塗りつぶしバー */}
                            <div className="relative z-10 h-full flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
                              <span
                                className={`text-[7px] font-mono px-1 py-[0.5px] border shrink-0 rounded-none leading-none flex items-center justify-center ${
                                  isMajor
                                    ? 'border-[#632f2f] text-[#c98383] bg-[#291414]'
                                    : 'border-[#4b5563] text-[#cbd5e1] bg-[#1a1c23]'
                                }`}
                              >
                                {item.code}
                              </span>
                              {/* 実際のタイトルの文字列そのものをソリッドな伏字マスクとしてレンダリング */}
                              {/* 一文字増減するごとに厳密に1文字分の幅が変わり、解除後のタイトル長と1pxも狂わず完全一致 */}
                              <span
                                className={`inline-block text-[8px] leading-tight select-none rounded-none shrink-0 truncate max-w-[calc(100%-4px)] ${
                                  isMajor
                                    ? 'bg-[#7a3838] text-[#7a3838]'
                                    : 'bg-[#828894] text-[#828894]'
                                }`}
                              >
                                {item.title}
                              </span>
                            </div>

                            {/* 右端：PROTECTED（上下完全中央寄せ・太字なし・重なり防止） */}
                            <div className="relative z-10 shrink-0 h-full flex items-center justify-end pl-1">
                              <span
                                className={`text-[7px] font-mono font-normal tracking-wider leading-none select-none flex items-center ${
                                  isMajor
                                    ? 'text-[#c98383]'
                                    : 'text-[#94a3b8]'
                                }`}
                              >
                                [PROTECTED]
                              </span>
                            </div>
                          </div>
                        ) : (
                          /* 解除済み通常項目：アコーディオン開閉（高さh-[24px]固定、落ち着いた灰色・白系） */
                          <>
                            <button
                              onClick={() => toggleInfoExpand(item.id, item.sectorId)}
                              className="w-full h-[24px] px-1.5 flex items-center justify-between gap-1 text-left hover:bg-zinc-900/60 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                <span
                                  className={`text-[7px] font-mono px-1 py-[0.5px] border shrink-0 bg-[#18181b] rounded-none leading-tight transition-colors ${
                                    isUnread
                                      ? 'border-[#6b7280] text-[#e4e4e7]'
                                      : 'border-[#3f3f46] text-[#71717a]'
                                  }`}
                                >
                                  {item.code}
                                </span>
                                <span
                                  className={`text-[8px] truncate transition-colors ${
                                    isUnread ? 'text-[#e4e4e7]' : 'text-[#8b8b95]'
                                  }`}
                                >
                                  {item.title}
                                </span>
                              </div>
                              <span
                                className={`text-[8px] font-bold shrink-0 transition-colors ${
                                  isUnread ? 'text-[#d4d4d8]' : 'text-[#71717a]'
                                }`}
                              >
                                {isExpanded ? '－' : '＋'}
                              </span>
                            </button>

                            {isExpanded && (
                              <div className="px-2 py-1.5 border-t border-zinc-800/90 bg-[#070709] space-y-1">
                                <p className="text-[7.5px] leading-relaxed text-zinc-300 whitespace-pre-wrap">
                                  {item.content}
                                </p>
                                {item.subWarning && (
                                  <p className="text-[7px] leading-snug text-red-400 border-t border-red-950/70 pt-1">
                                    [PARADOX] {item.subWarning}
                                  </p>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. 手持ち端末イラスト本体 (ドロップシャドウなし、1920x1080 = 16:9比率のtanmatu.pngを640x360で完全一致表示) */}
      <img
        src={tanmatuSrc}
        alt="データ端末"
        className="absolute inset-0 z-30 w-full h-full object-fill pointer-events-none select-none"
        draggable={false}
      />
    </div>
  );
};
