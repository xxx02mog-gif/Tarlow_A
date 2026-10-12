import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  GENERIC_FAIL_MONOLOGUES,
  THINKING_KEYWORDS,
  THINKING_RECIPES,
  isRecipeMatchKeywords,
  ThinkingRecipe,
} from '../data/thinkingData';
import { GuyPortrait, GuyFaceParts, GuyBodyReaction } from './GuyPortrait';

interface ThinkingInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAllKeywordsUnlockedDebug?: boolean;
  onToggleAllKeywordsUnlocked?: () => void;
}

export const ThinkingInspectorModal: React.FC<ThinkingInspectorModalProps> = ({
  isOpen,
  onClose,
  isAllKeywordsUnlockedDebug = false,
  onToggleAllKeywordsUnlocked,
}) => {
  const [selectedKeywordId, setSelectedKeywordId] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'core' | 'chat' | 'joke'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  // === デバッグテスター用ステート ===
  const [activeTab, setActiveTab] = useState<'tester' | 'list'>('tester');
  const [testSlot1, setTestSlot1] = useState<string | null>(null);
  const [testSlot2, setTestSlot2] = useState<string | null>(null);
  const [singleKwPreview, setSingleKwPreview] = useState<string | null>(null);
  const [selectedFailIndex, setSelectedFailIndex] = useState<number>(0);
  const [testerReplayPulse, setTesterReplayPulse] = useState<number>(0);

  const kwMap = useMemo(() => {
    return new Map(THINKING_KEYWORDS.map((k) => [k.id, k]));
  }, []);

  const getKeywordLabel = (id: string) => kwMap.get(id)?.label || id;

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExpandAll = () => {
    const next: Record<string, boolean> = {};
    THINKING_RECIPES.forEach((r) => {
      next[r.id] = true;
    });
    setExpandedIds(next);
  };

  const handleCollapseAll = () => {
    setExpandedIds({});
  };

  // 組み合わせ判定
  const matchedRecipe = useMemo(() => {
    if (!testSlot1 || !testSlot2 || testSlot1 === testSlot2) return null;
    return (
      THINKING_RECIPES.find((r) =>
        isRecipeMatchKeywords(r, testSlot1, testSlot2, undefined, true)
      ) || null
    );
  }, [testSlot1, testSlot2]);

  // テスター実行時のガイ表情とセリフ
  const activePreviewData = useMemo(() => {
    // 1. 2つのキーワードがセットされた場合
    if (testSlot1 && testSlot2 && testSlot1 !== testSlot2) {
      if (matchedRecipe) {
        return {
          type: 'success' as const,
          recipe: matchedRecipe,
          thought: matchedRecipe.guyEpiphany,
          face: matchedRecipe.guyFace || {
            base: 'base2' as const,
            brow: 'normal' as const,
            eyes: 'normal' as const,
            mouth: 'close' as const,
          },
          reaction: matchedRecipe.guyReaction || ('none' as GuyBodyReaction),
        };
      }
      // 不成立時
      return {
        type: 'fail' as const,
        thought:
          GENERIC_FAIL_MONOLOGUES[
            selectedFailIndex % GENERIC_FAIL_MONOLOGUES.length
          ],
        face: {
          base: 'base2' as const,
          brow: 'troubled' as const,
          eyes: 'half' as const,
          mouth: 'close' as const,
        },
        reaction: 'sigh' as GuyBodyReaction,
      };
    }
    // 2. 単体キーワードがプレビューされている場合
    if (singleKwPreview) {
      const kw = kwMap.get(singleKwPreview);
      if (kw) {
        return {
          type: 'single' as const,
          keyword: kw,
          thought: kw.guyThought,
          face: kw.guyFace || {
            base: 'base2' as const,
            brow: 'normal' as const,
            eyes: 'normal' as const,
            mouth: 'close' as const,
          },
          reaction: kw.guyReaction || ('none' as GuyBodyReaction),
        };
      }
    }
    // 初期状態
    return {
      type: 'idle' as const,
      thought:
        '気になるキーワードを選んでスロットに入れるか、下のレシピボタンを押してテストしてくれ。',
      face: {
        base: 'base2' as const,
        brow: 'normal' as const,
        eyes: 'normal' as const,
        mouth: 'close' as const,
      },
      reaction: 'none' as GuyBodyReaction,
    };
  }, [
    testSlot1,
    testSlot2,
    matchedRecipe,
    singleKwPreview,
    selectedFailIndex,
    kwMap,
  ]);

  const handleKeywordSelect = (kwId: string) => {
    setSingleKwPreview(kwId);
    setTesterReplayPulse((p) => p + 1);
    if (!testSlot1) {
      setTestSlot1(kwId);
    } else if (!testSlot2) {
      if (testSlot1 !== kwId) {
        setTestSlot2(kwId);
      }
    } else {
      setTestSlot1(kwId);
      setTestSlot2(null);
    }
  };

  const handleClearSlots = () => {
    setTestSlot1(null);
    setTestSlot2(null);
    setSingleKwPreview(null);
    setTesterReplayPulse((p) => p + 1);
  };

  const handleLoadRecipeToTester = (recipe: ThinkingRecipe) => {
    setTestSlot1(recipe.keywordIds[0]);
    setTestSlot2(recipe.keywordIds[1]);
    setSingleKwPreview(null);
    setActiveTab('tester');
    setTesterReplayPulse((p) => p + 1);
  };

  // 各キーワードが使用されているレシピ件数のカウント
  const keywordUsageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    THINKING_KEYWORDS.forEach((kw) => {
      counts[kw.id] = 0;
    });
    THINKING_RECIPES.forEach((r) => {
      const allInRecipe = new Set<string>();
      r.keywordIds.forEach((id) => allInRecipe.add(id));
      if (r.alternativeKeywordIds) {
        r.alternativeKeywordIds[0].forEach((id) => allInRecipe.add(id));
        r.alternativeKeywordIds[1].forEach((id) => allInRecipe.add(id));
      }
      allInRecipe.forEach((id) => {
        if (counts[id] !== undefined) counts[id]++;
      });
    });
    return counts;
  }, []);

  // フィルタリング処理
  const filteredRecipes = useMemo(() => {
    return THINKING_RECIPES.filter((r) => {
      // 種別フィルター
      if (typeFilter !== 'all' && r.type !== typeFilter) return false;

      // キーワード絞り込み
      if (selectedKeywordId !== 'all') {
        const matchesMain = r.keywordIds.includes(selectedKeywordId as any);
        const matchesAlt =
          r.alternativeKeywordIds &&
          (r.alternativeKeywordIds[0].includes(selectedKeywordId) ||
            r.alternativeKeywordIds[1].includes(selectedKeywordId));
        if (!matchesMain && !matchesAlt) return false;
      }

      // 検索クエリ
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const kwLabels = [
          ...r.keywordIds.map(getKeywordLabel),
          ...(r.alternativeKeywordIds
            ? [
                ...r.alternativeKeywordIds[0].map(getKeywordLabel),
                ...r.alternativeKeywordIds[1].map(getKeywordLabel),
              ]
            : []),
        ].join(' ');
        const targetText = `${r.label} ${r.guyEpiphany} ${r.descriptionOrReaction} ${kwLabels} ${r.existingTopicId || ''}`.toLowerCase();
        if (!targetText.includes(q)) return false;
      }

      return true;
    });
  }, [typeFilter, selectedKeywordId, searchQuery, getKeywordLabel]);

  if (!isOpen) return null;

  const fontStyle: React.CSSProperties = {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Noto Sans JP", sans-serif',
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-6 text-zinc-100"
      onClick={onClose}
      style={fontStyle}
    >
      <div
        className="relative w-full max-w-6xl h-[88vh] max-h-[88vh] flex flex-col bg-[#0f1118] border border-zinc-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 最上部ヘッダー */}
        <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#161a26] border-b border-zinc-700 gap-2 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-mono text-[14px]">⚙</span>
            <h2 className="text-[14px] font-bold text-white tracking-wide">
              思考デバッグモード
            </h2>

            {/* モード切替タブ */}
            <div className="flex items-center rounded bg-black/40 border border-zinc-800 p-0.5 text-[11px]">
              <button
                onClick={() => setActiveTab('tester')}
                className={`px-3 py-1 rounded font-bold transition cursor-pointer flex items-center gap-1 ${
                  activeTab === 'tester'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>🎮</span>
                <span>動作テスター</span>
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`px-3 py-1 rounded font-bold transition cursor-pointer flex items-center gap-1 ${
                  activeTab === 'list'
                    ? 'bg-zinc-700 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>📋</span>
                <span>レシピ・セリフ一覧</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 本編の全キーワード解放トグル */}
            {onToggleAllKeywordsUnlocked && (
              <button
                onClick={onToggleAllKeywordsUnlocked}
                className={`px-2.5 py-1 rounded text-[11px] font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                  isAllKeywordsUnlockedDebug
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white'
                }`}
                title="ゲーム本編の思考画面でも全キーワードを解放してプレイ確認できます"
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                <span>本編全キーワード解放: {isAllKeywordsUnlockedDebug ? 'ON' : 'OFF'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer text-sm font-bold"
              title="閉じる"
            >
              ✕
            </button>
          </div>
        </div>

        {/* タブに応じたメインコンテンツ */}
        {activeTab === 'tester' ? (
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden bg-[#0a0c12]">
            {/* 左側：キーワード選択プール */}
            <div className="w-full md:w-[320px] shrink-0 border-r border-zinc-800 flex flex-col min-h-0 bg-[#0d1017]">
              <div className="p-2.5 border-b border-zinc-800 bg-[#121622] flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-300">
                  キーワード選択（全{THINKING_KEYWORDS.length}件）
                </span>
                <button
                  onClick={handleClearSlots}
                  className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition cursor-pointer"
                >
                  スロットクリア
                </button>
              </div>
              <div className="p-2 text-[10px] text-zinc-500 bg-zinc-950/60 border-b border-zinc-800/80">
                クリックするとスロットに入り、ガイの表情・独白がプレビューされます。
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {THINKING_KEYWORDS.map((kw) => {
                  const isSlot1 = testSlot1 === kw.id;
                  const isSlot2 = testSlot2 === kw.id;
                  const isSelected = isSlot1 || isSlot2;
                  return (
                    <button
                      key={kw.id}
                      onClick={() => handleKeywordSelect(kw.id)}
                      className={`w-full p-2 rounded text-left transition cursor-pointer border flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500/60 text-amber-200 shadow-sm'
                          : 'bg-zinc-900/60 hover:bg-zinc-800/80 border-zinc-800 text-zinc-300 hover:text-white'
                      }`}
                    >
                      <div className="flex flex-col min-w-0 pr-1">
                        <span className="text-[12px] font-bold truncate">{kw.label}</span>
                        <span className="text-[9.5px] text-zinc-500 font-mono">{kw.id}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {isSlot1 && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500 text-black font-black">
                            スロット1
                          </span>
                        )}
                        {isSlot2 && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-400 text-black font-black">
                            スロット2
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 右側：実機演出プレビュー＆セリフ表示エリア */}
            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto p-4 space-y-3 bg-[#0a0d14]">
              {/* スロット状態＆コントロールバー */}
              <div className="p-3 rounded-lg bg-[#121622] border border-zinc-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-zinc-400">スロット1:</span>
                    <span
                      className={`px-2.5 py-1 rounded text-[12px] font-bold border ${
                        testSlot1
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-zinc-900 text-zinc-600 border-zinc-800'
                      }`}
                    >
                      {testSlot1 ? kwMap.get(testSlot1)?.label : '未選択'}
                    </span>
                  </div>
                  <span className="text-zinc-600 font-mono text-sm">＋</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-zinc-400">スロット2:</span>
                    <span
                      className={`px-2.5 py-1 rounded text-[12px] font-bold border ${
                        testSlot2
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                          : 'bg-zinc-900 text-zinc-600 border-zinc-800'
                      }`}
                    >
                      {testSlot2 ? kwMap.get(testSlot2)?.label : '未選択'}
                    </span>
                  </div>
                </div>

                {/* 不成立時セリフ切り替え（不成立時の動作確認用） */}
                {testSlot1 && testSlot2 && !matchedRecipe && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-zinc-400">失敗独白切替:</span>
                    <select
                      value={selectedFailIndex}
                      onChange={(e) => {
                        setSelectedFailIndex(Number(e.target.value));
                        setTesterReplayPulse((p) => p + 1);
                      }}
                      className="text-[11px] bg-zinc-900 border border-zinc-700 text-zinc-200 rounded px-1.5 py-0.5 cursor-pointer"
                    >
                      {GENERIC_FAIL_MONOLOGUES.map((_, idx) => (
                        <option key={idx} value={idx}>
                          パターン {idx + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* ガイ立ち絵 ＆ 演出ウィンドウ */}
              <div className="flex-1 min-h-[320px] flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-gradient-to-b from-[#131726] to-[#0c0e17] border border-zinc-800 shadow-xl overflow-hidden">
                {/* ガイ立ち絵コンポーネント（実機パーツ表示） */}
                <div className="w-[180px] h-[300px] shrink-0 relative bg-zinc-950/60 rounded-lg border border-zinc-800/80 flex items-center justify-center overflow-hidden">
                  <GuyPortrait
                    faceParts={activePreviewData.face}
                    bodyReaction={activePreviewData.reaction}
                    replayPulse={testerReplayPulse}
                    scale={0.78}
                    offsetY={35}
                  />
                  <div className="absolute bottom-1 left-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-[9px] font-mono text-zinc-400 text-center truncate">
                    {activePreviewData.face.brow || 'normal'}-
                    {activePreviewData.face.eyes || 'normal'}-
                    {activePreviewData.face.mouth || 'normal'}
                    {'ex' in activePreviewData.face && activePreviewData.face.ex
                      ? ` [${activePreviewData.face.ex}]`
                      : ''}{' '}
                    ({activePreviewData.reaction})
                  </div>
                </div>

                {/* セリフ演出ボックス */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    {/* 判定バッジ */}
                    <div className="flex items-center gap-2">
                      {activePreviewData.type === 'success' && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            ✓ 組み合わせ成立：{activePreviewData.recipe.label}
                          </span>
                          {activePreviewData.recipe.requiredPhase1TopicId && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              ※本編ではPhase 1での話題質問（ID: {activePreviewData.recipe.requiredPhase1TopicId}）が必要
                            </span>
                          )}
                        </div>
                      )}
                      {activePreviewData.type === 'fail' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          ✕ 組み合わせ不成立
                        </span>
                      )}
                      {activePreviewData.type === 'single' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          単体キーワード独白：{activePreviewData.keyword.label}
                        </span>
                      )}
                      {activePreviewData.type === 'idle' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-zinc-800 text-zinc-400">
                          待機中
                        </span>
                      )}
                    </div>

                    {/* ガイの独白ウィンドウ */}
                    <div className="p-3.5 rounded-lg bg-black/50 border border-zinc-800/90 relative">
                      <span className="text-[10px] font-bold text-amber-400/90 block mb-1">
                        【ガイの独白】
                      </span>
                      <p className="text-[13px] text-zinc-100 leading-relaxed font-medium">
                        {activePreviewData.thought}
                      </p>
                    </div>

                    {/* 成立時：解放話題＆会話セリフ */}
                    {activePreviewData.type === 'success' &&
                      activePreviewData.recipe.descriptionOrReaction && (
                        <div className="p-3.5 rounded-lg bg-[#161a29]/80 border border-zinc-700/80 space-y-1.5">
                          <span className="text-[10px] font-bold text-cyan-400/90 block">
                            【解放される会話プレビュー】
                          </span>
                          <p className="text-[12px] text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans">
                            {activePreviewData.recipe.descriptionOrReaction}
                          </p>
                        </div>
                      )}
                  </div>

                  <div className="text-[10px] text-zinc-500 font-mono pt-2 border-t border-zinc-800/60">
                    {activePreviewData.type === 'success' &&
                      `レシピID: ${activePreviewData.recipe.id} | 話題ID: ${activePreviewData.recipe.unlockedTopicId}`}
                    {activePreviewData.type === 'single' &&
                      `入手条件: ${activePreviewData.keyword.sourceDescription}`}
                  </div>
                </div>
              </div>

              {/* 下部：クイック全レシピ投入ボタン群 */}
              <div className="p-3 rounded-lg bg-[#0e111a] border border-zinc-800/90 space-y-1.5 shrink-0">
                <span className="text-[10.5px] font-bold text-zinc-400 block">
                  ⚡ クイックレシピテスト（クリックで即座にスロット投入＆実機再生）
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {THINKING_RECIPES.map((rec) => (
                    <button
                      key={rec.id}
                      onClick={() => handleLoadRecipeToTester(rec)}
                      className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 text-[11px] text-zinc-300 hover:text-white transition cursor-pointer flex items-center gap-1"
                    >
                      <span className="text-[9px] text-amber-400">❖</span>
                      <span>{rec.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 2ペインメインエリア（従来のレシピ・セリフ一覧） */
          <div className="flex-1 flex min-h-0 overflow-hidden">
            {/* 左ペイン：キーワード絞り込み ＆ 種別フィルター */}
            <div className="w-[280px] shrink-0 bg-[#121520] border-r border-zinc-800 flex flex-col min-h-0">
            {/* 種別タブ */}
            <div className="p-2.5 border-b border-zinc-800 shrink-0 bg-[#141824]">
              <div className="text-[11px] font-bold text-zinc-400 mb-1.5 flex items-center justify-between">
                <span>種別フィルター</span>
                {typeFilter !== 'all' && (
                  <button
                    onClick={() => setTypeFilter('all')}
                    className="text-[10px] text-amber-400 hover:underline cursor-pointer"
                  >
                    解除
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                {(
                  [
                    { id: 'all', label: 'すべて' },
                    { id: 'core', label: '核心 (重要)' },
                    { id: 'chat', label: '雑談 (日常)' },
                    { id: 'joke', label: 'おふざけ' },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTypeFilter(t.id)}
                    className={`px-2 py-1 text-center font-medium border transition-colors cursor-pointer ${
                      typeFilter === t.id
                        ? 'bg-amber-500 text-black border-amber-400 font-bold'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-750 hover:border-zinc-500'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* キーワード一覧ヘッダー */}
            <div className="px-3 py-2 border-b border-zinc-800/80 bg-[#10131d] flex items-center justify-between shrink-0">
              <span className="text-[11.5px] font-bold text-zinc-300">
                キーワード絞り込み
              </span>
              {selectedKeywordId !== 'all' && (
                <button
                  onClick={() => setSelectedKeywordId('all')}
                  className="text-[10.5px] text-amber-400 hover:underline cursor-pointer font-medium"
                >
                  選択解除
                </button>
              )}
            </div>

            {/* キーワード縦スクロール一覧 */}
            <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
              <button
                onClick={() => setSelectedKeywordId('all')}
                className={`w-full text-left px-2.5 py-1.5 text-[11.5px] border flex items-center justify-between transition-colors cursor-pointer ${
                  selectedKeywordId === 'all'
                    ? 'bg-amber-500 text-black border-amber-400 font-bold'
                    : 'bg-zinc-900/60 text-zinc-300 border-zinc-800 hover:border-zinc-650'
                }`}
              >
                <span>全キーワードを表示</span>
                <span className="text-[10px] font-mono text-zinc-400">
                  {THINKING_RECIPES.length}
                </span>
              </button>

              {THINKING_KEYWORDS.map((kw) => {
                const isSelected = selectedKeywordId === kw.id;
                const count = keywordUsageCounts[kw.id] || 0;
                const source =
                  kw.unlockTriggers?.[0]?.detailLabel ||
                  kw.unlockTrigger?.detailLabel ||
                  '';

                return (
                  <button
                    key={kw.id}
                    onClick={() =>
                      setSelectedKeywordId(isSelected ? 'all' : kw.id)
                    }
                    className={`w-full text-left px-2.5 py-1.5 text-[11.5px] border transition-colors cursor-pointer flex flex-col gap-0.5 ${
                      isSelected
                        ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-sm'
                        : count > 0
                          ? 'bg-zinc-900 text-zinc-200 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-850'
                          : 'bg-zinc-950/60 text-zinc-500 border-zinc-850 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold">{kw.label}</span>
                      <span
                        className={`text-[9.5px] px-1.5 py-0.2 rounded font-mono ${
                          isSelected
                            ? 'bg-black/30 text-black'
                            : 'bg-zinc-800 text-zinc-300'
                        }`}
                      >
                        {count}件
                      </span>
                    </div>
                    {source && (
                      <span
                        className={`text-[9.5px] line-clamp-1 ${
                          isSelected ? 'text-zinc-800' : 'text-zinc-500'
                        }`}
                        title={source}
                      >
                        {source}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 不成立時独白（デバッグ確認用） */}
            <div className="p-2 border-t border-zinc-800 bg-[#10121b] shrink-0">
              <div className="text-[10px] font-bold text-zinc-400 mb-1 flex items-center gap-1">
                <span className="text-zinc-500 font-mono">✕</span>
                <span>不成立時のガイ独白 ({GENERIC_FAIL_MONOLOGUES.length}種)</span>
              </div>
              <div className="space-y-1 max-h-24 overflow-y-auto text-[9.5px] text-zinc-400 font-mono pr-1">
                {GENERIC_FAIL_MONOLOGUES.map((mono, idx) => (
                  <div key={idx} className="p-1 rounded bg-zinc-900/60 border border-zinc-800/80 leading-relaxed">
                    {mono}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右ペイン：話題リスト ＆ 検索バー */}
          <div className="flex-1 flex flex-col min-h-0 bg-[#0c0e14]">
            {/* 上部コントロールバー */}
            <div className="p-2.5 bg-[#121520] border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="話題名・セリフ・キーワードを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[280px] px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 text-[12px] focus:outline-none focus:border-amber-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[11px] text-zinc-400 hover:text-white cursor-pointer"
                  >
                    クリア
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleExpandAll}
                  className="px-2.5 py-1 text-[11px] bg-zinc-800 text-zinc-300 border border-zinc-700 hover:text-white cursor-pointer"
                >
                  すべて展開
                </button>
                <button
                  onClick={handleCollapseAll}
                  className="px-2.5 py-1 text-[11px] bg-zinc-800 text-zinc-300 border border-zinc-700 hover:text-white cursor-pointer"
                >
                  すべて折りたたむ
                </button>
              </div>
            </div>

            {/* レシピ一覧リスト */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {filteredRecipes.length === 0 ? (
                <div className="py-16 text-center text-zinc-500 text-[13px]">
                  条件に一致するひらめき話題が見つかりません
                </div>
              ) : (
                filteredRecipes.map((recipe) => {
                  const isExpanded = !!expandedIds[recipe.id];

                  const typeBadge = {
                    core: {
                      label: '核心',
                      cls: 'text-amber-200 bg-amber-950 border-amber-600 font-bold',
                    },
                    chat: {
                      label: '雑談',
                      cls: 'text-sky-200 bg-sky-950 border-sky-600 font-bold',
                    },
                    joke: {
                      label: 'おふざけ',
                      cls: 'text-rose-200 bg-rose-950 border-rose-600 font-bold',
                    },
                  }[recipe.type];

                  const slot1Ids = recipe.alternativeKeywordIds
                    ? recipe.alternativeKeywordIds[0]
                    : [recipe.keywordIds[0]];
                  const slot2Ids = recipe.alternativeKeywordIds
                    ? recipe.alternativeKeywordIds[1]
                    : [recipe.keywordIds[1]];

                  return (
                    <div
                      key={recipe.id}
                      className="bg-[#131622] border border-zinc-750 hover:border-zinc-600 transition-colors shadow-sm"
                    >
                      {/* カードヘッダー */}
                      <div className="p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`px-2 py-0.5 text-[11px] border ${typeBadge.cls}`}
                            >
                              {typeBadge.label}
                            </span>
                            <span
                              className={`px-1.5 py-0.5 text-[10.5px] border ${
                                recipe.targetType === 'existing'
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                                  : 'bg-indigo-950 text-indigo-300 border-indigo-700'
                              }`}
                            >
                              {recipe.targetType === 'existing'
                                ? '既存話題アンロック'
                                : '新規会話'}
                            </span>
                            <h3 className="text-[14px] font-bold text-white tracking-wide">
                              {recipe.label}
                            </h3>
                            {recipe.existingTopicId && (
                              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5 border border-zinc-800">
                                連動ID: {recipe.existingTopicId}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleLoadRecipeToTester(recipe)}
                              className="px-2.5 py-1 text-[11.5px] text-emerald-300 hover:text-white border border-emerald-600/70 hover:border-emerald-500 bg-emerald-950/40 hover:bg-emerald-900/60 cursor-pointer flex items-center gap-1 font-bold rounded transition"
                              title="このレシピをテスターにセットして実機演出を再生"
                            >
                              <span>🎮</span>
                              <span>テスターで試す</span>
                            </button>

                            <button
                              onClick={() => toggleExpand(recipe.id)}
                              className="px-2.5 py-1 text-[11.5px] text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 bg-zinc-850 cursor-pointer flex items-center gap-1 font-medium"
                            >
                              <span>
                                {isExpanded ? '対話内容を閉じる' : '対話内容を表示'}
                              </span>
                              <span className="text-[10px] font-mono">
                                {isExpanded ? '▲' : '▼'}
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* キーワード（代替含む） */}
                        <div className="p-2.5 bg-[#090b10] border border-zinc-800/90 flex flex-wrap items-center gap-2 text-[12px]">
                          <span className="text-zinc-400 font-bold shrink-0 text-[11.5px]">
                            必要キーワード：
                          </span>

                          {/* スロット1 */}
                          <div className="flex items-center gap-1 flex-wrap">
                            {slot1Ids.map((id, idx) => {
                              const kw = kwMap.get(id);
                              const source =
                                kw?.unlockTriggers?.[0]?.detailLabel ||
                                kw?.unlockTrigger?.detailLabel ||
                                '';
                              const isMain = id === recipe.keywordIds[0];
                              return (
                                <React.Fragment key={id}>
                                  {idx > 0 && (
                                    <span className="text-zinc-500 text-[10.5px]">
                                      または
                                    </span>
                                  )}
                                  <span
                                    className={`px-2 py-0.5 border font-semibold ${
                                      isMain
                                        ? 'bg-zinc-800 text-zinc-100 border-zinc-650'
                                        : 'bg-zinc-900 text-amber-300 border-amber-700/80'
                                    }`}
                                    title={source ? `入手元: ${source}` : undefined}
                                  >
                                    【{getKeywordLabel(id)}】
                                    {source && (
                                      <span className="ml-1 text-[10px] text-zinc-400 font-normal">
                                        ({source})
                                      </span>
                                    )}
                                  </span>
                                </React.Fragment>
                              );
                            })}
                          </div>

                          <span className="text-amber-400 font-bold px-1 text-[13px]">
                            ×
                          </span>

                          {/* スロット2 */}
                          <div className="flex items-center gap-1 flex-wrap">
                            {slot2Ids.map((id, idx) => {
                              const kw = kwMap.get(id);
                              const source =
                                kw?.unlockTriggers?.[0]?.detailLabel ||
                                kw?.unlockTrigger?.detailLabel ||
                                '';
                              const isMain = id === recipe.keywordIds[1];
                              return (
                                <React.Fragment key={id}>
                                  {idx > 0 && (
                                    <span className="text-zinc-500 text-[10.5px]">
                                      または
                                    </span>
                                  )}
                                  <span
                                    className={`px-2 py-0.5 border font-semibold ${
                                      isMain
                                        ? 'bg-zinc-800 text-zinc-100 border-zinc-650'
                                        : 'bg-zinc-900 text-amber-300 border-amber-700/80'
                                    }`}
                                    title={source ? `入手元: ${source}` : undefined}
                                  >
                                    【{getKeywordLabel(id)}】
                                    {source && (
                                      <span className="ml-1 text-[10px] text-zinc-400 font-normal">
                                        ({source})
                                      </span>
                                    )}
                                  </span>
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>

                        {/* ガイのひらめき思考（小さめ表示） */}
                        <div className="mt-2 text-[11.5px] text-zinc-300 bg-black/50 px-3 py-2 border-l-2 border-amber-400/80 flex items-start gap-2">
                          <span className="text-amber-400 font-bold shrink-0 text-[11px]">
                            ガイ思考:
                          </span>
                          <span className="leading-relaxed italic">
                            「{recipe.guyEpiphany}」
                          </span>
                        </div>
                      </div>

                      {/* 折りたたみ：対話時の内容 */}
                      {isExpanded && (
                        <div
                          className="px-3 pb-3 pt-1 border-t border-zinc-800 bg-[#0b0e16] text-[12px] leading-relaxed cursor-pointer"
                          onClick={() => toggleExpand(recipe.id)}
                        >
                          <div className="text-[11px] text-zinc-400 font-bold mb-1 flex items-center justify-between">
                            <span>対話時の内容（セリフ引用／会話主旨）：</span>
                            <span className="text-[10px] text-zinc-500 font-normal">
                              （クリックで折りたたむ）
                            </span>
                          </div>
                          <div className="p-3 bg-black/70 border border-zinc-800 text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans">
                            {recipe.descriptionOrReaction}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>,
    document.body
  );
};
