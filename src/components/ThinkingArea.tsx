import React, { useEffect, useRef, useState } from 'react';
import {
  GENERIC_FAIL_MONOLOGUES,
  isRecipeMatchKeywords,
  THINKING_KEYWORDS,
  THINKING_RECIPES,
  ThinkingKeyword,
  ThinkingRecipe,
} from '../data/thinkingData';
import { GuyBodyReaction, GuyFaceParts } from './GuyPortrait';
import { soundEngine } from '../utils/chiptuneAudio';
import { useLanguage } from '../utils/i18n';
import {
  getLocalizedKeywordLabel,
  getLocalizedKeywordThought,
  getLocalizedRecipeLabel,
  getLocalizedRecipeEpiphany,
  FAIL_MONOLOGUES_I18N,
  THINKING_UI_LABELS,
} from '../locales/thinkingLocale';

interface ThinkingAreaProps {
  unlockedKeywordIds: string[];
  discoveredRecipeIds: string[];
  supportEnabled: boolean;
  onRecipeDiscovered: (recipe: ThinkingRecipe) => void;
  onGuyFaceChange?: (face: GuyFaceParts, reaction?: GuyBodyReaction) => void;
  className?: string;
  phase1AskedTopicIds?: string[];
  isAllKeywordsUnlockedDebug?: boolean;
  isDeepTruthMode?: boolean;
  isDp002Unlocked?: boolean;
  isMaidMode?: boolean;
}

export const ThinkingArea: React.FC<ThinkingAreaProps> = ({
  unlockedKeywordIds,
  discoveredRecipeIds,
  supportEnabled,
  onRecipeDiscovered,
  onGuyFaceChange,
  className = '',
  phase1AskedTopicIds = [],
  isAllKeywordsUnlockedDebug = false,
  isDeepTruthMode = false,
  isDp002Unlocked = false,
  isMaidMode = false,
}) => {
  const [lang] = useLanguage();
  const [selectedKeywordId, setSelectedKeywordId] = useState<string | null>(
    null
  );
  const [slot1KeywordId, setSlot1KeywordId] = useState<string | null>(null);
  const [slot2KeywordId, setSlot2KeywordId] = useState<string | null>(null);

  // ガイの思考吹き出しテキスト（初期状態は「・・・・・・」）
  const [activeThoughtText, setActiveThoughtText] =
    useState<string>('・・・・・・');

  // 自動思考中のタメ（間）ステート
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);

  // 組み合わせ話題リスト（表形式）の折りたたみ表示ステート
  const [showRecordList, setShowRecordList] = useState<boolean>(false);

  // ひらめいた話題の案内テキスト（吹き出しと分離し独立枠で表示）
  const [discoveredTopicLabel, setDiscoveredTopicLabel] =
    useState<string | null>(null);

  // タップ補助用のアクティブスロット選択（1 or 2）
  const [activeTargetSlot, setActiveTargetSlot] = useState<1 | 2 | null>(null);

  // ドラッグ中の一時保存ID（Pointer / Mouse両対応）
  const draggingKeywordIdRef = useRef<string | null>(null);

  // 取得済みのキーワードオブジェクト一覧
  const unlockedKeywords = THINKING_KEYWORDS.filter((k) =>
    unlockedKeywordIds.includes(k.id)
  );

  const slot1Keyword = THINKING_KEYWORDS.find((k) => k.id === slot1KeywordId);
  const slot2Keyword = THINKING_KEYWORDS.find((k) => k.id === slot2KeywordId);

  const isConfrontDiscovered = discoveredRecipeIds.includes(
    'recipe_deep_truth_confront'
  );

  // メイドモード専用レシピ（recipe_joke_tarlow_apron）は、メイドモード中または発見済みの場合のみ一覧・母数に含める
  const visibleRecipes = THINKING_RECIPES.filter(
    (r) =>
      r.id !== 'recipe_joke_tarlow_apron' ||
      isMaidMode ||
      discoveredRecipeIds.includes('recipe_joke_tarlow_apron')
  );
  const discoveredVisibleCount = visibleRecipes.filter((r) =>
    discoveredRecipeIds.includes(r.id)
  ).length;

  // 深層真実フェーズ（DP-003閲覧後・自壊記録入手後）の単語制限：『自壊の記録』と『記憶分離』以外は選択不可
  const hasSelfDestruct = unlockedKeywordIds.includes('kw_self_destruct');
  const isRestrictedInDeepTruth = (kwId: string): boolean => {
    if (!isDeepTruthMode || !hasSelfDestruct) return false;
    return kwId !== 'kw_self_destruct' && kwId !== 'kw_memory_separation';
  };

  // サポート機能：このキーワードが「手持ちのキーワードとまだ未発見の組み合わせを作れるか」判定
  const canKeywordCombineWithCurrentHand = (kwId: string): boolean => {
    if (isRestrictedInDeepTruth(kwId)) return false;
    if (slot1KeywordId && !slot2KeywordId) {
      if (kwId === slot1KeywordId) return false;
      return THINKING_RECIPES.some((recipe) => {
        if (discoveredRecipeIds.includes(recipe.id)) return false;
        return isRecipeMatchKeywords(
          recipe,
          slot1KeywordId,
          kwId,
          phase1AskedTopicIds,
          isAllKeywordsUnlockedDebug
        );
      });
    }

    if (slot2KeywordId && !slot1KeywordId) {
      if (kwId === slot2KeywordId) return false;
      return THINKING_RECIPES.some((recipe) => {
        if (discoveredRecipeIds.includes(recipe.id)) return false;
        return isRecipeMatchKeywords(
          recipe,
          slot2KeywordId,
          kwId,
          phase1AskedTopicIds,
          isAllKeywordsUnlockedDebug
        );
      });
    }

    return THINKING_RECIPES.some((recipe) => {
      if (discoveredRecipeIds.includes(recipe.id)) return false;
      return unlockedKeywordIds.some(
        (otherId) =>
          otherId !== kwId &&
          !isRestrictedInDeepTruth(otherId) &&
          isRecipeMatchKeywords(
            recipe,
            kwId,
            otherId,
            phase1AskedTopicIds,
            isAllKeywordsUnlockedDebug
          )
      );
    });
  };

  // 単語をクリックした時の処理（スロット選択中のみ投入、それ以外は思考セリフ確認のみ）
  const handleKeywordClick = (kw: ThinkingKeyword) => {
    if (isRestrictedInDeepTruth(kw.id)) return;
    soundEngine.playTerminalTab();
    setSelectedKeywordId(kw.id);

    if (isSynthesizing) return;

    // スロットが明示的に選択されており、この投入で2枠が揃うか判定
    const willCompleteSlots =
      (activeTargetSlot === 1 && slot2KeywordId && slot2KeywordId !== kw.id) ||
      (activeTargetSlot === 2 && slot1KeywordId && slot1KeywordId !== kw.id);

    if (willCompleteSlots) {
      // 2枠揃う瞬間：個別セリフを一瞬出さずに、最初から「・・・・・・」（思考中）にしてチラつきを解消
      setActiveThoughtText('・・・・・・');
      if (isDeepTruthMode) {
        onGuyFaceChange?.(
          { base: 'base2', brow: 'serious', eyes: 'away', mouth: 'close', ex: 'shadow' },
          'sigh'
        );
      } else {
        onGuyFaceChange?.(
          { base: 'base2', brow: 'stunned', eyes: 'close', mouth: 'close' },
          'sigh'
        );
      }
    } else {
      // 通常時（単なるセリフ閲覧、または1枠目のみの投入時）はキーワード思考セリフを表示
      setActiveThoughtText(getLocalizedKeywordThought(kw.id, kw.guyThought, lang));
      if (kw.guyFace) {
        onGuyFaceChange?.(kw.guyFace, kw.guyReaction ?? 'auto');
      } else {
        onGuyFaceChange?.({ base: 'base2', brow: 'normal', eyes: 'away', mouth: 'normal' }, 'none');
      }
    }

    // スロットが明示的に選択されている場合のみ投入
    if (activeTargetSlot === 1) {
      setSlot1KeywordId(kw.id);
      setDiscoveredTopicLabel(null);
      setActiveTargetSlot(slot2KeywordId ? null : 2);
    } else if (activeTargetSlot === 2) {
      if (slot1KeywordId !== kw.id) {
        setSlot2KeywordId(kw.id);
        setActiveTargetSlot(null);
      }
    }
  };

  // マウス/HTML5ドラッグ開始
  const handleDragStart = (e: React.DragEvent, kwId: string) => {
    draggingKeywordIdRef.current = kwId;
    e.dataTransfer.setData('text/plain', kwId);
  };

  const handleDropSlot = (targetSlot: 1 | 2, kwId: string) => {
    if (
      !kwId ||
      !unlockedKeywordIds.includes(kwId) ||
      isSynthesizing ||
      isRestrictedInDeepTruth(kwId)
    )
      return;
    soundEngine.playTerminalTab();
    const kw = THINKING_KEYWORDS.find((k) => k.id === kwId);

    const willCompleteSlots =
      (targetSlot === 1 && slot2KeywordId && slot2KeywordId !== kwId) ||
      (targetSlot === 2 && slot1KeywordId && slot1KeywordId !== kwId);

    if (willCompleteSlots) {
      setActiveThoughtText('・・・・・・');
      if (isDeepTruthMode) {
        onGuyFaceChange?.(
          { base: 'base2', brow: 'serious', eyes: 'away', mouth: 'close', ex: 'shadow' },
          'sigh'
        );
      } else {
        onGuyFaceChange?.(
          { base: 'base2', brow: 'stunned', eyes: 'close', mouth: 'close' },
          'sigh'
        );
      }
    } else if (kw) {
      setActiveThoughtText(getLocalizedKeywordThought(kw.id, kw.guyThought, lang));
      if (kw.guyFace) {
        onGuyFaceChange?.(kw.guyFace, kw.guyReaction ?? 'auto');
      } else {
        onGuyFaceChange?.({ base: 'base2', brow: 'normal', eyes: 'away', mouth: 'normal' }, 'none');
      }
    }

    if (!slot1KeywordId || targetSlot === 1) {
      setSlot1KeywordId(kwId);
      setSlot2KeywordId(null);
      setDiscoveredTopicLabel(null);
    } else if (slot1KeywordId !== kwId) {
      setSlot2KeywordId(kwId);
    }
  };

  // 2つのスロットが埋まった時、自動で「思考中」のタメ（約850ms）を経て結果を出す
  useEffect(() => {
    if (!slot1KeywordId || !slot2KeywordId || slot1KeywordId === slot2KeywordId) {
      return;
    }

    setIsSynthesizing(true);
    // タメの間、吹き出しは思考中（・・・・・・）に静止＆考え込む表情
    setActiveThoughtText('・・・・・・');
    soundEngine.playHesitationHover();
    if (isDeepTruthMode) {
      onGuyFaceChange?.(
        { base: 'base2', brow: 'serious', eyes: 'away', mouth: 'close', ex: 'shadow' },
        'sigh'
      );
    } else {
      onGuyFaceChange?.({ base: 'base2', brow: 'stunned', eyes: 'close', mouth: 'close' }, 'sigh');
    }

    const timer = window.setTimeout(() => {
      // 順不同で一致するレシピを検索（未発見のものを優先）
      const matchedRecipe =
        THINKING_RECIPES.find(
          (recipe) =>
            !discoveredRecipeIds.includes(recipe.id) &&
            isRecipeMatchKeywords(
              recipe,
              slot1KeywordId,
              slot2KeywordId,
              phase1AskedTopicIds,
              isAllKeywordsUnlockedDebug
            )
        ) ||
        THINKING_RECIPES.find((recipe) =>
          isRecipeMatchKeywords(
            recipe,
            slot1KeywordId,
            slot2KeywordId,
            phase1AskedTopicIds,
            isAllKeywordsUnlockedDebug
          )
        );

      if (matchedRecipe) {
        soundEngine.playAchievementUnlock();
        const isAlreadyDiscovered = discoveredRecipeIds.includes(
          matchedRecipe.id
        );
        setActiveThoughtText(getLocalizedRecipeEpiphany(matchedRecipe.id, matchedRecipe.guyEpiphany, lang));
        setDiscoveredTopicLabel(getLocalizedRecipeLabel(matchedRecipe.id, matchedRecipe.label, lang));
        // ひらめき時の表情＆動き（レシピ指定があれば優先、なければ納得）
        if (matchedRecipe.guyFace) {
          onGuyFaceChange?.(matchedRecipe.guyFace, matchedRecipe.guyReaction ?? 'auto');
        } else {
          onGuyFaceChange?.({ base: 'base2', brow: 'normal', eyes: 'smile', mouth: 'smile' }, 'none');
        }
        if (!isAlreadyDiscovered) {
          onRecipeDiscovered(matchedRecipe);
        }
      } else {
        soundEngine.playTerminalClose();
        const randIdx = Math.floor(Math.random() * GENERIC_FAIL_MONOLOGUES.length);
        const failText = FAIL_MONOLOGUES_I18N[randIdx]?.[lang] || GENERIC_FAIL_MONOLOGUES[randIdx];
        setActiveThoughtText(failText);
        setDiscoveredTopicLabel(null);
        // 組み合わせ不一致：やれやれ・冷や汗の困り顔
        onGuyFaceChange?.({ base: 'base', brow: 'stunned', eyes: 'away', mouth: 'close', ex: 'EX1' }, 'sigh');
      }

      setIsSynthesizing(false);
      // 判定完了後、手がかり2のみ自動クリア（手がかり1を軸にした連続推理を可能にする）
      setSlot2KeywordId(null);
    }, 850);

    return () => window.clearTimeout(timer);
  }, [slot1KeywordId, slot2KeywordId]);

  // 初期マウント時の待機表情＆セリフ
  useEffect(() => {
    setActiveThoughtText('・・・・・・');
    if (isDeepTruthMode && hasSelfDestruct) {
      onGuyFaceChange?.(
        { base: 'base2', brow: 'serious', eyes: 'away', mouth: 'close', ex: 'shadow' },
        'sigh'
      );
    } else if (isDp002Unlocked) {
      onGuyFaceChange?.(
        { base: 'base2', brow: 'troubled', eyes: 'away', mouth: 'close', ex: 'EX2' },
        'sigh'
      );
    } else {
      onGuyFaceChange?.(
        { base: 'base2', brow: 'normal', eyes: 'normal', mouth: 'close' },
        'none'
      );
    }
  }, [isDeepTruthMode, hasSelfDestruct, isDp002Unlocked]);

  // スロットクリア
  const handleClearSlots = () => {
    soundEngine.playTerminalTab();
    setSlot1KeywordId(null);
    setSlot2KeywordId(null);
    setActiveTargetSlot(null);
    setDiscoveredTopicLabel(null);
    setActiveThoughtText('・・・・・・');
    if (isDeepTruthMode && hasSelfDestruct) {
      onGuyFaceChange?.(
        { base: 'base2', brow: 'serious', eyes: 'away', mouth: 'close', ex: 'shadow' },
        'none'
      );
    } else if (isDp002Unlocked) {
      onGuyFaceChange?.(
        { base: 'base2', brow: 'troubled', eyes: 'away', mouth: 'close', ex: 'EX2' },
        'none'
      );
    } else {
      onGuyFaceChange?.({ base: 'base2', brow: 'normal', eyes: 'normal', mouth: 'close' }, 'none');
    }
  };

  return (
    <div
      className={`flex flex-col h-full justify-between pt-2 pb-2 px-3 select-none text-zinc-100 ${className}`}
    >
      {/* 上部：ガイの思考吹き出し（4行分固定高さh-[92px]、セリフ枠を行数に応じて垂直中央寄せ、切り替えアニメーション付き） */}
      <div className="shrink-0 mb-1 pl-2 h-[92px] flex items-center">
        <div
          key={activeThoughtText}
          className="relative w-fit max-w-[404px] bg-[#dcdde3] text-zinc-950 px-3.5 py-2 shadow-md transition-all duration-300 ease-out animate-[bubble-pop_0.22s_ease-out]"
        >
          {/* 左側の突起：本編対話枠の三角(-left-[10px] bottom-2 border-r-[11px])と同位置に、●の半円を本体と1px重ねて隙間を完全解消 */}
          <div className="absolute -left-[7px] bottom-2 w-[8px] h-[12px] rounded-l-full bg-[#dcdde3]" />
          <p className="text-[13px] leading-snug tracking-wide break-words whitespace-pre-line text-zinc-950">
            {activeThoughtText.replace(/([。！？!?])\s*(?!\n|$)(?![。！？!?])/g, '$1\n')}
          </p>
        </div>
      </div>

      {/* 中央：キーワード一覧および組み合わせ話題リスト（下寄せ配置） */}
      <div className="flex-1 min-h-0 flex flex-col justify-end">
        <div className="text-[11px] text-zinc-400 tracking-wider mb-1.5 border-b border-zinc-800 pb-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>{THINKING_UI_LABELS.cluesCount(unlockedKeywords.length, lang)}</span>
            <button
              onClick={() => {
                soundEngine.playTerminalTab();
                setShowRecordList((prev) => !prev);
              }}
              className="text-[10px] text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-600 px-1.5 py-0.5 cursor-pointer transition-colors"
            >
              {THINKING_UI_LABELS.recordsCount(discoveredVisibleCount, visibleRecipes.length, showRecordList, lang)}
            </button>
          </div>
          <span className="text-[9.5px] text-zinc-500 font-mono">
            {showRecordList ? 'RECIPE ARCHIVE' : 'TAP OR DRAG TO SLOT'}
          </span>
        </div>

        {showRecordList ? (
          <div className="overflow-y-auto h-[156px] pr-1 py-1 border border-zinc-900 bg-zinc-950/60">
            <table className="w-full text-[11px] text-zinc-300 border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 text-left font-mono text-[10px]">
                  <th className="py-1 px-2 font-normal">{THINKING_UI_LABELS.thTopic[lang]}</th>
                  <th className="py-1 px-2 font-normal">{THINKING_UI_LABELS.thCombination[lang]}</th>
                </tr>
              </thead>
              <tbody>
                {visibleRecipes.map((r) => {
                  const isDiscovered = discoveredRecipeIds.includes(r.id);
                  const kw1 = THINKING_KEYWORDS.find((k) => k.id === r.keywordIds[0]);
                  const kw2 = THINKING_KEYWORDS.find((k) => k.id === r.keywordIds[1]);
                  const altPairs = r.alternativeKeywordIds
                    ? r.alternativeKeywordIds[0].flatMap((id1) =>
                        r.alternativeKeywordIds![1]
                          .filter(
                            (id2) =>
                              id1 !== id2 &&
                              !(
                                (r.keywordIds[0] === id1 && r.keywordIds[1] === id2) ||
                                (r.keywordIds[0] === id2 && r.keywordIds[1] === id1)
                              )
                          )
                          .map((id2) => {
                            const a1 = THINKING_KEYWORDS.find((k) => k.id === id1);
                            const a2 = THINKING_KEYWORDS.find((k) => k.id === id2);
                            const l1 = a1 ? getLocalizedKeywordLabel(a1.id, a1.label, lang) : id1;
                            const l2 = a2 ? getLocalizedKeywordLabel(a2.id, a2.label, lang) : id2;
                            return `【${l1}】 ＋ 【${l2}】`;
                          })
                      )
                    : [];
                  const hasAlternatives = altPairs.length > 0;
                  return (
                    <tr
                      key={r.id}
                      className={`border-b border-zinc-900/50 ${
                        isDiscovered ? 'text-zinc-200' : 'text-zinc-600'
                      }`}
                    >
                      <td className="py-1 px-2 font-medium">
                        {isDiscovered
                          ? getLocalizedRecipeLabel(r.id, r.label, lang)
                          : lang === 'en'
                            ? '??????'
                            : '？？？？？？'}
                      </td>
                      <td className="py-1 px-2 font-mono text-[10.5px]">
                        {isDiscovered ? (
                          <span>
                            {`【${kw1 ? getLocalizedKeywordLabel(kw1.id, kw1.label, lang) : ''}】 ＋ 【${kw2 ? getLocalizedKeywordLabel(kw2.id, kw2.label, lang) : ''}】`}
                            {hasAlternatives && (
                              <span
                                className="ml-1 text-[9.5px] text-zinc-500 font-sans cursor-help"
                                title={`${THINKING_UI_LABELS.otherCombinations[lang]}\n${altPairs.join('\n')}`}
                              >
                                {THINKING_UI_LABELS.hasOthers[lang]}
                              </span>
                            )}
                          </span>
                        ) : (
                          lang === 'en' ? '??? + ???' : '？？？ ＋ ？？？'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-wrap content-start items-start gap-1.5 overflow-y-auto h-[156px] pr-1 py-1">
            {unlockedKeywords.length === 0 ? (
              <div className="w-full text-[12px] text-zinc-500 py-3 italic text-center">
                {THINKING_UI_LABELS.noCluesYet[lang]}
              </div>
            ) : (
              unlockedKeywords.map((kw) => {
                const isSelected = selectedKeywordId === kw.id;
                const isSlot = slot1KeywordId === kw.id || slot2KeywordId === kw.id;
                const hasBothSlots = Boolean(slot1KeywordId && slot2KeywordId);
                const hasSlot1Only = Boolean(slot1KeywordId && !slot2KeywordId);
                const isCombinable = canKeywordCombineWithCurrentHand(kw.id);

                // 思考支援ON時、または深層真実モード時：
                const isLockedDeep = isRestrictedInDeepTruth(kw.id);
                const isTargetPartner =
                  !isLockedDeep && supportEnabled && hasSlot1Only && isCombinable;
                const isGreyedOut =
                  isLockedDeep ||
                  (supportEnabled &&
                    (hasBothSlots
                      ? true
                      : hasSlot1Only
                        ? !isTargetPartner
                        : !isCombinable));

                return (
                  <button
                    key={kw.id}
                    draggable={!isLockedDeep && !isGreyedOut && !isSynthesizing}
                    onDragStart={(e) => handleDragStart(e, kw.id)}
                    onClick={() => handleKeywordClick(kw)}
                    className={`inline-flex items-center justify-center px-2.5 py-1 text-[11.5px] border tracking-wider transition-all whitespace-nowrap select-none ${
                      isLockedDeep
                        ? 'border-zinc-900/60 bg-zinc-950/40 text-zinc-600 opacity-20 cursor-not-allowed line-through pointer-events-none'
                        : isTargetPartner
                          ? 'border-zinc-200 bg-zinc-800 text-white font-medium cursor-pointer'
                          : isGreyedOut
                            ? 'border-zinc-900 bg-zinc-950/20 text-zinc-600 opacity-20 cursor-default line-through'
                            : isSlot
                              ? 'border-zinc-800 bg-zinc-900/40 text-zinc-500 cursor-pointer'
                              : isSelected
                                ? 'border-zinc-500 bg-zinc-900 text-zinc-100 cursor-pointer'
                                : 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-600 hover:text-white cursor-pointer'
                    }`}
                    title={
                      isLockedDeep
                        ? THINKING_UI_LABELS.lockedDeepTip[lang]
                        : isGreyedOut
                          ? THINKING_UI_LABELS.greyedOutTip[lang]
                          : isTargetPartner
                            ? THINKING_UI_LABELS.targetPartnerTip[lang]
                            : isSlot
                              ? THINKING_UI_LABELS.inSlotTip[lang]
                              : THINKING_UI_LABELS.keywordActionTip(getLocalizedKeywordLabel(kw.id, kw.label, lang), lang)
                    }
                  >
                    {getLocalizedKeywordLabel(kw.id, kw.label, lang)}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* 下部：組み合わせスロット（ドラッグ＆ドロップ対応・ひらめき時は前面オーバーレイ表示） */}
      <div className="relative shrink-0 pt-1.5 border-t border-zinc-900">
        <div className="flex items-center gap-2">
          {/* スロット1 */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const kwId = e.dataTransfer.getData('text/plain');
              handleDropSlot(1, kwId);
            }}
            onClick={() => {
              soundEngine.playTerminalTab();
              if (slot1KeywordId) {
                setSlot1KeywordId(null);
                setDiscoveredTopicLabel(null);
                setActiveTargetSlot(1);
              } else {
                setActiveTargetSlot((prev) => (prev === 1 ? null : 1));
              }
            }}
            className={`flex-1 h-[34px] border flex items-center justify-center text-[12px] cursor-pointer transition-colors ${
              activeTargetSlot === 1
                ? 'border-zinc-200 bg-zinc-800 text-white font-medium'
                : slot1Keyword
                  ? 'border-zinc-400 bg-zinc-900 text-zinc-100'
                  : 'border-dashed border-zinc-700 bg-zinc-950/50 text-zinc-500 hover:border-zinc-500'
            }`}
            title={slot1Keyword ? THINKING_UI_LABELS.releaseSlotTip[lang] : THINKING_UI_LABELS.slotSelectTip[lang]}
          >
            {slot1Keyword
              ? getLocalizedKeywordLabel(slot1Keyword.id, slot1Keyword.label, lang)
              : activeTargetSlot === 1
                ? (lang === 'en' ? '[Selected]' : lang === 'ko' ? '[선택 중]' : '［選択中］')
                : (lang === 'en' ? 'Clue 1' : lang === 'ko' ? '단서 1' : '手がかり 1')}
          </div>

          <span className="text-zinc-500 font-mono text-xs">＋</span>

          {/* スロット2 */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const kwId = e.dataTransfer.getData('text/plain');
              handleDropSlot(2, kwId);
            }}
            onClick={() => {
              soundEngine.playTerminalTab();
              if (slot2KeywordId) {
                setSlot2KeywordId(null);
                setActiveTargetSlot(2);
              } else {
                setActiveTargetSlot((prev) => (prev === 2 ? null : 2));
              }
            }}
            className={`flex-1 h-[34px] border flex items-center justify-center text-[12px] cursor-pointer transition-colors ${
              activeTargetSlot === 2
                ? 'border-zinc-200 bg-zinc-800 text-white font-medium'
                : slot2Keyword
                  ? 'border-zinc-400 bg-zinc-900 text-zinc-100'
                  : 'border-dashed border-zinc-700 bg-zinc-950/50 text-zinc-500 hover:border-zinc-500'
            }`}
            title={slot2Keyword ? THINKING_UI_LABELS.releaseSlotTip[lang] : THINKING_UI_LABELS.slotSelectTip[lang]}
          >
            {slot2Keyword
              ? getLocalizedKeywordLabel(slot2Keyword.id, slot2Keyword.label, lang)
              : activeTargetSlot === 2
                ? (lang === 'en' ? '[Selected]' : lang === 'ko' ? '[선택 중]' : '［選択中］')
                : (lang === 'en' ? 'Clue 2' : lang === 'ko' ? '단서 2' : '手がかり 2')}
          </div>

          {/* 状態表示・クリアボタン（固定幅で確保し、手がかり1・2の枠幅変化を完全防止） */}
          <div className="w-[58px] shrink-0 flex items-center justify-end">
            {isSynthesizing ? (
              <span className="w-full h-[34px] flex items-center justify-center text-[11px] text-zinc-400 tracking-wider">
                {lang === 'en' ? 'Thinking...' : lang === 'ko' ? '사고 중...' : '思考中…'}
              </span>
            ) : (
              (slot1KeywordId || slot2KeywordId) ? (
                <button
                  onClick={handleClearSlots}
                  className="px-2.5 h-[34px] text-[11px] text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 transition-colors"
                  title={lang === 'en' ? 'Clear slots' : lang === 'ko' ? '슬롯 초기화' : 'スロットをクリア'}
                >
                  ✕
                </button>
              ) : null
            )}
          </div>
        </div>

        {/* ひらめき達成時：スロットの上に被せる通知オーバーレイ */}
        {discoveredTopicLabel && (
          <div
            onClick={handleClearSlots}
            className="absolute inset-0 top-1.5 z-10 flex items-center justify-between px-3 bg-zinc-900/95 border border-zinc-400 shadow-md animate-[overlay-appear_0.2s_ease-out] cursor-pointer"
            title={lang === 'en' ? 'Click to reset slots' : lang === 'ko' ? '클릭하여 슬롯 리셋' : 'クリックでスロットをリセット'}
          >
            <div className="flex items-center gap-2">
              <span className="text-[12px] tracking-wide font-medium text-zinc-100">
                {lang === 'en'
                  ? `Topic Unlocked: [${discoveredTopicLabel}]`
                  : lang === 'ko'
                    ? `화제 【${discoveredTopicLabel}】 획득`
                    : `話題【${discoveredTopicLabel}】を入手`}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClearSlots();
              }}
              className="px-2 py-0.5 text-[11px] text-zinc-400 hover:text-zinc-100 border border-zinc-700 hover:border-zinc-500 bg-zinc-950 transition-colors"
              title={lang === 'en' ? 'Clear slots' : lang === 'ko' ? '슬롯 초기화' : 'スロットをクリア'}
            >
              {lang === 'en' ? 'Close' : lang === 'ko' ? '닫기' : '閉じる'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
