import React, { useState } from 'react';
import { X, GitBranch } from 'lucide-react';
import { AschQuestionReplyOption } from '../types/game';
import {
  CONVERSATION_TOPICS,
  INITIAL_MEMORY_SECTORS,
  FINAL_ASCH_QUESTION_LINE,
  FINAL_DECISION_STAGES,
  PHASE3_WHO_AM_I_OPTIONS,
  PHASE3_SILENT_TIMEOUT_OPTIONS,
  ENDING_SCENARIOS,
} from '../data/prototypeScenario';

interface ClimaxFlowchartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpeakerLineList: React.FC<{
  speaker: 'G' | 'A';
  text: string;
}> = ({ speaker, text }) => {
  const lines = text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  const isGuy = speaker === 'G';

  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-2.5 rounded-md px-3 py-2 text-[13.5px] leading-relaxed border font-medium tracking-normal ${
            isGuy
              ? 'bg-amber-950/45 border-amber-600/50 text-amber-50'
              : 'bg-rose-950/45 border-rose-600/50 text-rose-50'
          }`}
        >
          <span
            className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold tracking-normal ${
              isGuy
                ? 'bg-amber-400 text-stone-950'
                : 'bg-rose-400 text-stone-950'
            }`}
          >
            {speaker}
          </span>
          <span className="flex-1 break-words">{line}</span>
        </div>
      ))}
    </div>
  );
};

const EndingDetailCard: React.FC<{ endingKey: string }> = ({ endingKey }) => {
  const endingInfo = ENDING_SCENARIOS[endingKey];
  if (!endingInfo) return null;

  return (
    <div className="mt-2.5 rounded-lg border-2 border-rose-500/70 bg-rose-950/30 p-3 space-y-2 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-500/40 pb-1.5">
        <span className="px-2 py-0.5 rounded bg-rose-500 text-stone-950 text-xs font-extrabold">
          ➔ {endingInfo.title}
        </span>
        {endingInfo.subtitle && (
          <span className="text-[11px] font-mono text-rose-300">
            {endingInfo.subtitle}
          </span>
        )}
      </div>
      {endingInfo.dialogues.length > 0 ? (
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-rose-200">
            【エンディング独白】
          </div>
          {endingInfo.dialogues.map((d, i) => (
            <SpeakerLineList
              key={i}
              speaker={d.speaker === 'ASCH' ? 'A' : 'G'}
              text={d.text}
            />
          ))}
        </div>
      ) : (
        <div className="text-xs text-stone-400 italic py-1">
          【エンディング独白】（空欄）
        </div>
      )}
      <div className="rounded bg-stone-950/80 border border-stone-700 px-2.5 py-2 text-xs text-stone-300 leading-relaxed">
        <span className="font-bold text-stone-200">【エンディング要約】</span>
        {endingInfo.summaryText || '（空欄）'}
      </div>
    </div>
  );
};

const OptionTreeNode: React.FC<{
  option: AschQuestionReplyOption;
  depth?: number;
  branchLabel?: string;
}> = ({ option, depth = 0, branchLabel }) => {
  const endingKey =
    option.triggersEndingKey ||
    (option.triggersEnding === 'DESTROY'
      ? 'END_PHASE3_SWAMPMAN'
      : option.triggersEnding === 'KEEP'
        ? 'END_PHASE3_TOMORROW'
        : undefined);

  return (
    <div className="flex flex-col items-center w-full">
      {/* 上からの矢印 */}
      <div className="h-4 w-0.5 bg-stone-500" />
      <div className="text-stone-400 text-xs leading-none -mt-1 mb-1">▼</div>

      {/* ノード本体カード */}
      <div className="w-full rounded-lg border border-stone-600 bg-stone-900 shadow-lg overflow-hidden">
        {/* 選択肢ヘッダー */}
        <div className="px-3 py-2 bg-stone-800 border-b border-stone-600 flex items-center gap-2">
          {branchLabel && (
            <span className="px-2 py-0.5 rounded bg-amber-400/25 border border-amber-400/60 text-amber-200 text-xs font-bold shrink-0">
              {branchLabel}
            </span>
          )}
          <span className="text-[13px] font-bold text-amber-200 leading-snug">
            選択肢：{option.thoughtText}
          </span>
        </div>

        {/* GとAのセリフやり取り */}
        <div className="p-3 space-y-2">
          <SpeakerLineList speaker="G" text={option.spokenText} />
          <SpeakerLineList speaker="A" text={option.aschText} />

          {/* 追加ラリー（extraExchanges）がある場合 */}
          {option.extraExchanges &&
            option.extraExchanges.map((ex, idx) => (
              <SpeakerLineList
                key={idx}
                speaker={ex.speaker === 'GUY' ? 'G' : 'A'}
                text={ex.text}
              />
            ))}

          {/* 未出力音声バッファがある場合 */}
          {option.oralInfo && (
            <div className="rounded bg-cyan-950/60 border border-cyan-600/50 px-3 py-2 text-xs text-cyan-100">
              <div className="font-bold text-xs text-cyan-300 mb-0.5">
                [端末記録：{option.oralInfo.title}]
              </div>
              <div className="whitespace-pre-line leading-relaxed">
                {option.oralInfo.content}
              </div>
            </div>
          )}

          {/* 終了・接続バッジ＆エンディング詳細 */}
          {endingKey ? (
            <EndingDetailCard endingKey={endingKey} />
          ) : option.grantsLinkTags?.includes('terminal_broken') ? (
            <div className="mt-2 pt-2 border-t border-stone-700 flex items-center justify-between gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-amber-500/20 border border-amber-400/50 text-amber-200 text-xs font-bold">
                ➔ 端末が破壊され以降閲覧不能に ＆ 通常対話へ戻る（「話を切り上げる」で Phase 3 発生）
              </span>
            </div>
          ) : option.completesTopic ? (
            <div className="mt-2 pt-2 border-t border-stone-700 flex items-center justify-between gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-xs font-bold">
                ➔ 通常対話へ戻る（その後「話を切り上げる」を選ぶと Phase 3「今の俺は誰に見える？」へ移行）
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {/* 次の分岐（followUpOptions）がある場合 */}
      {option.followUpOptions && option.followUpOptions.length > 0 && (
        <div className="w-full flex flex-col items-center">
          {option.followUpOptions.length > 1 && (
            <>
              <div className="h-4 w-0.5 bg-stone-600" />
              <div className="w-4/5 border-t-2 border-stone-600" />
            </>
          )}
          <div
            className={`w-full grid gap-3 ${
              option.followUpOptions.length === 1
                ? 'grid-cols-1'
                : option.followUpOptions.length === 2
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-3'
            }`}
          >
            {option.followUpOptions.map((child, idx) => (
              <OptionTreeNode
                key={child.id}
                option={child}
                depth={depth + 1}
                branchLabel={
                  option.followUpOptions!.length > 1
                    ? `分岐${idx + 1}`
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ClimaxFlowchartModal: React.FC<ClimaxFlowchartModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'CLIMAX' | 'PHASE3' | 'EXPORT'>('CLIMAX');
  const [selectedPattern, setSelectedPattern] = useState<'ALL' | 'A' | 'C'>('ALL');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const climaxTopicA = CONVERSATION_TOPICS.find(
    (t) => t.id === 'p2_deep_truth_dilemma'
  );
  const climaxTopicC = CONVERSATION_TOPICS.find(
    (t) => t.id === 'p2_deep_truth_confront'
  );
  const distLockTopic = CONVERSATION_TOPICS.find(
    (t) => t.id === 'p2_after_dilemma_dist_lock'
  );
  const stageA = climaxTopicA?.stages[0];
  const stageC = climaxTopicC?.stages[0];
  const dp002 = INITIAL_MEMORY_SECTORS.find((s) => s.code === 'DP-002');
  const dp003 = INITIAL_MEMORY_SECTORS.find((s) => s.code === 'DP-003');

  const formatOptionTreeToText = (
    opt: AschQuestionReplyOption,
    indent = ''
  ): string => {
    const lines: string[] = [];
    lines.push(`${indent}▼ 選択肢：${opt.thoughtText}`);
    opt.spokenText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((l) => lines.push(`${indent}  ●G：${l}`));
    opt.aschText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((l) => lines.push(`${indent}  ●A：${l}`));
    opt.extraExchanges?.forEach((ex) => {
      const sp = ex.speaker === 'GUY' ? 'G' : 'A';
      ex.text
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((l) => lines.push(`${indent}  ●${sp}：${l}`));
    });
    if (opt.oralInfo) {
      lines.push(
        `${indent}  [端末記録：${opt.oralInfo.title}] ${opt.oralInfo.content.replace(/\n/g, ' / ')}`
      );
    }
    const endingKey =
      opt.triggersEndingKey ||
      (opt.triggersEnding === 'DESTROY'
        ? 'END_PHASE3_SWAMPMAN'
        : opt.triggersEnding === 'KEEP'
          ? 'END_PHASE3_TOMORROW'
          : undefined);
    const endingInfo = endingKey ? ENDING_SCENARIOS[endingKey] : undefined;
    if (endingInfo) {
      lines.push(`${indent}  ➔ 【${endingInfo.title}】（${endingInfo.subtitle}）`);
      endingInfo.dialogues.forEach((d) => {
        const sp = d.speaker === 'ASCH' ? 'A' : 'G';
        d.text
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((l) => lines.push(`${indent}      ●${sp}（ED独白）：${l}`));
      });
      lines.push(`${indent}      [要約] ${endingInfo.summaryText}`);
    } else if (opt.completesTopic) {
      lines.push(
        `${indent}  ➔ 通常対話へ戻る（その後「話を切り上げる」を選ぶとPhase 3発生）`
      );
    }
    if (opt.followUpOptions && opt.followUpOptions.length > 0) {
      opt.followUpOptions.forEach((child, idx) => {
        if (opt.followUpOptions!.length > 1) {
          lines.push(`${indent}  ┌── [分岐 ${idx + 1}] ──`);
        }
        lines.push(formatOptionTreeToText(child, `${indent}  │ `));
      });
    }
    return lines.join('\n');
  };

  const exportText = [
    '====================================',
    '【全10エンディング構成マップ（END 01〜10）】',
    '====================================',
    '■ ゲームオーバー扱い',
    '  ・END 01 // たぶんタルロウA ： 演技を見抜けずタルロウAのまま帰す',
    '  ・END 02 // 怒って帰っちゃった ： 怒らせて帰られる／ろくに話せないまま帰られる',
    '■ 雑談エンド（核心に触れずに終了）',
    '  ・END 03 // また気が向いたら ： 深く話さず研究所へ帰す',
    '  ・END 04 // たまにはゆっくり ： 深く話さず家に残す（ソファで休ませる）',
    '■ 最後の問いかけ「今の俺は誰に見える？」（DP-002/003なし・『みんなの元へ戻らない理由』到達後）',
    '  ・END 05 // 一旦そういうことで（True） ： 「アッシュだ」と答える',
    '  ・END 06 // そういうことにした ： 「譜業だ」と答える',
    '  ・END 07 // 何も言えなかった ： 何も答えない',
    '■ DP-002 / DP-003 を解放したルート',
    '  ・END 08 // これで全部うまくいく ： 秘密を問い詰めずに肯定する',
    '  ・END 09 // これでぜんぶ元通り ： 秘密を問い詰めずに殺す',
    '  ・END 10 // 魂の容れ物 ： 秘密を問い詰める（Ghost in the mASCHine）',
    '',
    '====================================',
    '【前提記録：DP-002 / DP-003】',
    '====================================',
    dp002
      ? `■ ${dp002.code}（${dp002.id}）${dp002.unlockedTitle}\n契機：${dp002.capturedQuote}\n内容：\n${dp002.unlockedContent}`
      : '',
    '',
    dp003
      ? `■ ${dp003.code}（${dp003.id}）${dp003.unlockedTitle}\n契機：${dp003.capturedQuote}\n内容：\n${dp003.unlockedContent}`
      : '',
    '',
    '====================================',
    '【パターンA（DP-003解除で『端末』タブに出現：秘密を問い詰めない ➔ END 08）】',
    '====================================',
    climaxTopicA && stageA
      ? [
          `話題選択肢：${climaxTopicA.thoughtText}`,
          ...stageA.spokenText
            .split('\n')
            .filter(Boolean)
            .map((l) => `  ●G：${l}`),
          ...stageA.aschText
            .split('\n')
            .filter(Boolean)
            .map((l) => `  ●A：${l}`),
          ...(stageA.replyOptions?.map((o) => formatOptionTreeToText(o, '  ')) ??
            []),
        ].join('\n')
      : '',
    '',
    '====================================',
    '【パターンC（DP-002・DP-003解除で出現：秘密を問い詰める ➔ END 10）】',
    '====================================',
    climaxTopicC && stageC
      ? [
          `話題選択肢：${climaxTopicC.thoughtText}`,
          ...stageC.spokenText
            .split('\n')
            .filter(Boolean)
            .map((l) => `  ●G：${l}`),
          ...stageC.aschText
            .split('\n')
            .filter(Boolean)
            .map((l) => `  ●A：${l}`),
          ...(stageC.replyOptions?.map(
            (o, idx) =>
              `  ┌── [パターンC 分岐 ${idx + 1}] ──\n` +
              formatOptionTreeToText(o, '  │ ')
          ) ?? []),
        ].join('\n')
      : '',
    '',
    '====================================',
    '【DP-003解除で『雑談』タブへ追加される通常話題】',
    '====================================',
    distLockTopic
      ? [
          `話題選択肢：${distLockTopic.thoughtText}`,
          ...distLockTopic.stages[0].spokenText
            .split('\n')
            .filter(Boolean)
            .map((l) => `  ●G：${l}`),
          ...distLockTopic.stages[0].aschText
            .split('\n')
            .filter(Boolean)
            .map((l) => `  ●A：${l}`),
        ].join('\n')
      : '',
    '',
    '====================================',
    '【『話を切り上げる』ボタン選択時の全体分岐フロー（END 01〜04 ＆ Phase 3移行）】',
    '====================================',
    '■ 1. フェーズ1（演技を見抜く前）に「話を切り上げる」→「研究所へ戻す」（➔ END 01）',
    `  ●G：${FINAL_DECISION_STAGES.END_PHASE1_TARLOW.spokenText.replace(/\n/g, ' / ')}`,
    `  ●A：${FINAL_DECISION_STAGES.END_PHASE1_TARLOW.aschText.replace(/\n/g, ' / ')}`,
    `  ➔ 【${ENDING_SCENARIOS.END_PHASE1_TARLOW.title}】`,
    ...ENDING_SCENARIOS.END_PHASE1_TARLOW.dialogues.map(
      (d) => `      ●G（ED独白）：${d.text.replace(/\n/g, ' / ')}`
    ),
    `      [要約] ${ENDING_SCENARIOS.END_PHASE1_TARLOW.summaryText}`,
    '',
    '■ 2. フェーズ2で機嫌がマイナス（怒り限界）、または会話不足（2回未満）で「話を切り上げる」（➔ END 02）',
    `  ●G：${FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.spokenText.replace(/\n/g, ' / ')}`,
    `  ●A：${FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.aschText.replace(/\n/g, ' / ')}`,
    `  ➔ 【${ENDING_SCENARIOS.END_PHASE2_INCOMPLETE.title}】`,
    ...ENDING_SCENARIOS.END_PHASE2_INCOMPLETE.dialogues.map(
      (d) => `      ●G（ED独白）：${d.text.replace(/\n/g, ' / ')}`
    ),
    `      [要約] ${ENDING_SCENARIOS.END_PHASE2_INCOMPLETE.summaryText}`,
    '',
    '■ 3. フェーズ2で打ち解けているが、深く話さず（『みんなの元へ戻らない理由』に触れず）「話を切り上げる」（➔ END 03 / END 04）',
    '  ├─ (3-A) 「研究所へ戻す」を選んだ場合（➔ END 03）：',
    `  │   ●G：${FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.spokenText.replace(/\n/g, ' / ')}`,
    `  │   ●A：${FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.aschText.replace(/\n/g, ' / ')}`,
    `  │   ➔ 【${ENDING_SCENARIOS.END_PHASE2_NORMAL_RETURN.title}】`,
    ...ENDING_SCENARIOS.END_PHASE2_NORMAL_RETURN.dialogues.map(
      (d) => `  │       ●G（ED独白）：${d.text.replace(/\n/g, ' / ')}`
    ),
    `  │       [要約] ${ENDING_SCENARIOS.END_PHASE2_NORMAL_RETURN.summaryText}`,
    '  └─ (3-B) 「少し休んでいけと声をかける」を選んだ場合（➔ END 04）：',
    `      ●G：${FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.spokenText.replace(/\n/g, ' / ')}`,
    `      ●A：${FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.aschText.replace(/\n/g, ' / ')}`,
    `      ➔ 【${ENDING_SCENARIOS.END_PHASE2_STAY_REST.title}】`,
    ...ENDING_SCENARIOS.END_PHASE2_STAY_REST.dialogues.map(
      (d) => `          ●G（ED独白）：${d.text.replace(/\n/g, ' / ')}`
    ),
    `          [要約] ${ENDING_SCENARIOS.END_PHASE2_STAY_REST.summaryText}`,
    '',
    '■ 4. フェーズ2で「自分は記憶を模倣されただけの譜業なのか、本人なのか分からない」という核心対話（『みんなの元へ戻らない理由』）を終えて「話を切り上げる」→「研究所へ戻す」',
    '  ➔ 帰還前にアッシュが立ち止まり【Phase 3：終幕の問いかけ（END 05 / 06 / 07）】が発生！',
    '',
    '====================================',
    '【Phase 3：終幕の問いかけ（「・・・・・・ガイ。一つ聞いてもいいか。／おまえには、俺が何に見える？」）全分岐（END 05 / 06 / 07）】',
    '====================================',
    ...FINAL_ASCH_QUESTION_LINE.split('\n')
      .filter(Boolean)
      .map((l) => `  ●A：${l}`),
    ...PHASE3_WHO_AM_I_OPTIONS.filter((o) => o.id !== 'p3_ans_silence').map(
      (o, idx) =>
        `\n  ┌── [Phase 3 回答選択肢 ${idx + 1}] ──\n` +
        formatOptionTreeToText(o, '  │ ')
    ),
    '\n  ┌── [Phase 3 時間切れ（無言タイムアウト）発生後の分岐（➔ END 07）] ──',
    ...PHASE3_SILENT_TIMEOUT_OPTIONS.map((o) =>
      formatOptionTreeToText(o, '  │ ')
    ),
  ].join('\n');

  const handleCopyExport = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="font-flowchart fixed inset-0 z-[120] bg-black/90 backdrop-blur-sm flex flex-col tracking-normal"
    >
      {/* ヘッダー */}
      <div className="shrink-0 px-4 py-3 bg-stone-900 border-b border-stone-700 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <GitBranch className="w-5 h-5 text-amber-400" />
          <h2 className="text-sm md:text-base font-bold text-stone-100 tracking-wide">
            クライマックス会話フローチャート（●G＝ガイ ／ ●A＝アッシュ）
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-stone-800 p-0.5 border border-stone-700">
            <button
              type="button"
              onClick={() => setActiveTab('CLIMAX')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'CLIMAX'
                  ? 'bg-amber-500 text-stone-950'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              ① 封印解除後の対話（パターンA/C）
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('PHASE3')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'PHASE3'
                  ? 'bg-amber-500 text-stone-950'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              ② 終幕の問いかけ
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('EXPORT')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'EXPORT'
                  ? 'bg-amber-500 text-stone-950'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              ③ 別チャット持ち出し用テキスト
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyExport}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
          >
            {copied ? 'コピーしました！' : '全文コピー'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 cursor-pointer"
            title="閉じる"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* サブフィルタ（CLIMAXタブ時） */}
      {activeTab === 'CLIMAX' && (
        <div className="shrink-0 px-4 py-2 bg-stone-900/70 border-b border-stone-800 flex items-center gap-2 text-xs">
          <span className="text-stone-400 mr-1">表示ルート：</span>
          {(
            [
              { id: 'ALL', label: '全パターン横並び（A・C）' },
              { id: 'A', label: 'パターンA（秘めて肯定）のみ拡大' },
              { id: 'C', label: 'パターンC（記録を突きつける）のみ拡大' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedPattern(item.id)}
              className={`px-2.5 py-1 rounded border text-xs font-bold cursor-pointer transition-colors ${
                selectedPattern === item.id
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                  : 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* メインスクロール領域 */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        {activeTab !== 'EXPORT' && (
          <div className="max-w-[1600px] mx-auto mb-5 rounded-xl border border-stone-700 bg-stone-900/90 p-3.5 shadow-lg">
            <div className="text-xs font-bold text-amber-300 mb-2">
              【全10エンディング構成マップ（END 01〜10）】
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2.5 text-xs">
              <div className="rounded border border-stone-700 bg-stone-950/80 p-2.5 space-y-1">
                <div className="font-bold text-stone-300 border-b border-stone-800 pb-1">
                  ① ゲームオーバー扱い（END 01〜02）
                </div>
                <div className="text-stone-200">
                  <span className="text-rose-400 font-bold">END 01：</span>
                  演技を見抜けずタルロウAのまま帰す
                </div>
                <div className="text-stone-200">
                  <span className="text-rose-400 font-bold">END 02：</span>
                  怒らせて帰られる／会話不足で帰られる
                </div>
              </div>

              <div className="rounded border border-stone-700 bg-stone-950/80 p-2.5 space-y-1">
                <div className="font-bold text-stone-300 border-b border-stone-800 pb-1">
                  ② 雑談エンド（END 03〜04）
                </div>
                <div className="text-stone-200">
                  <span className="text-amber-300 font-bold">END 03：</span>
                  深く話さず研究所へ帰す（また気が向いたら）
                </div>
                <div className="text-stone-200">
                  <span className="text-amber-300 font-bold">END 04：</span>
                  深く話さず家に残す（たまにはゆっくり）
                </div>
              </div>

              <div className="rounded border border-stone-700 bg-stone-950/80 p-2.5 space-y-1">
                <div className="font-bold text-stone-300 border-b border-stone-800 pb-1">
                  ③ 最後の問いかけ（DP-002/003なし：END 05〜07）
                </div>
                <div className="text-stone-200">
                  <span className="text-emerald-400 font-bold">END 05(True)：</span>
                  「アッシュだ」と答える（一旦そういうことで）
                </div>
                <div className="text-stone-200">
                  <span className="text-cyan-300 font-bold">END 06：</span>
                  「譜業だ」と答える（そういうことにした）
                </div>
                <div className="text-stone-200">
                  <span className="text-stone-400 font-bold">END 07：</span>
                  何も答えない（何も言えなかった）
                </div>
              </div>

              <div className="rounded border border-stone-700 bg-stone-950/80 p-2.5 space-y-1">
                <div className="font-bold text-stone-300 border-b border-stone-800 pb-1">
                  ④ DP-002/003解放ルート（END 08〜10）
                </div>
                <div className="text-stone-200">
                  <span className="text-amber-300 font-bold">END 08：</span>
                  秘密を問い詰めずに肯定する（これで全部うまくいく）
                </div>
                <div className="text-stone-200">
                  <span className="text-rose-500 font-bold">END 09：</span>
                  問い詰めずに殺す（これでぜんぶ元通り）
                </div>
                <div className="text-stone-200">
                  <span className="text-rose-300 font-bold">END 10：</span>
                  秘密を問い詰める（魂の容れ物）
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'CLIMAX' && stageA && stageC ? (
          <div className="max-w-[1600px] mx-auto flex flex-col items-center">
            {/* 前提：DP-002 / DP-003 の記録内容 */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                {
                  sec: dp003,
                  unlockNote:
                    '▼ 解除すると話題選択肢に【パターンA（秘めて肯定）】が出現',
                },
                {
                  sec: dp002,
                  unlockNote:
                    '▼ 解除すると話題選択肢に【パターンC（記録を突きつける）】が出現',
                },
              ].map(({ sec, unlockNote }) =>
                sec ? (
                  <div
                    key={sec.id}
                    className="rounded-lg border border-cyan-600/60 bg-cyan-950/35 p-3 shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-cyan-700/50 pb-1.5 mb-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/25 border border-cyan-400/60 text-cyan-200 text-xs font-bold">
                          {sec.code}（{sec.id}）
                        </span>
                        <span className="text-xs font-bold text-cyan-100 flex-1">
                          {sec.unlockedTitle}
                        </span>
                      </div>
                      <div className="text-[11.5px] text-cyan-300/90 mb-1.5 pb-1.5 border-b border-cyan-800/50">
                        契機セリフ：{sec.capturedQuote}
                      </div>
                      <div className="text-[13px] text-stone-100 whitespace-pre-line leading-relaxed">
                        {sec.unlockedContent}
                      </div>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-cyan-700/50 text-xs font-bold text-amber-300">
                      {unlockNote}（※触れずに会話を終えることも可能）
                    </div>
                  </div>
                ) : null
              )}
            </div>

            {/* パターンA / C カラム */}
            <div
              className={`w-full grid gap-5 items-start ${
                selectedPattern !== 'ALL'
                  ? 'max-w-3xl grid-cols-1'
                  : 'grid-cols-1 lg:grid-cols-2'
              }`}
            >
              {/* パターンA カラム */}
              {selectedPattern !== 'C' && climaxTopicA && (
                <div className="flex flex-col items-center w-full">
                  <div className="w-full rounded-lg border-2 border-amber-500/70 bg-stone-900 shadow-xl overflow-hidden">
                    <div className="px-3 py-2 bg-amber-950/60 border-b border-amber-500/40 flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-400/25 border border-amber-400/60 text-amber-200 text-xs font-bold">
                        パターンA（DP-003解除で『端末』タブに出現）
                      </span>
                      <span className="text-[13px] font-bold text-amber-100">
                        話題選択肢：{climaxTopicA.thoughtText}
                      </span>
                    </div>
                    <div className="p-3 space-y-2">
                      <SpeakerLineList speaker="G" text={stageA.spokenText} />
                      <SpeakerLineList speaker="A" text={stageA.aschText} />
                    </div>
                  </div>
                  {(stageA.replyOptions?.length ?? 0) > 1 ? (
                    <>
                      <div className="h-4 w-0.5 bg-stone-500" />
                      <div className="w-4/5 border-t-2 border-stone-500" />
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                        {stageA.replyOptions?.map((opt, idx) => (
                          <OptionTreeNode
                            key={opt.id}
                            option={opt}
                            branchLabel={
                              opt.triggersEndingKey === 'END_PHASE3_MERCY_DESTROY'
                                ? '分岐2（問い詰めずに殺す）'
                                : `分岐${idx + 1}`
                            }
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    stageA.replyOptions?.map((opt) => (
                      <OptionTreeNode key={opt.id} option={opt} />
                    ))
                  )}
                </div>
              )}

              {/* パターンC カラム */}
              {selectedPattern !== 'A' && climaxTopicC && (
                <div className="flex flex-col items-center w-full">
                  <div className="w-full rounded-lg border-2 border-rose-500/70 bg-stone-900 shadow-xl overflow-hidden">
                    <div className="px-3 py-2 bg-rose-950/60 border-b border-rose-500/40 flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-400/25 border border-rose-400/60 text-rose-200 text-xs font-bold">
                        パターンC（DP-002解除で『端末』タブに出現）
                      </span>
                      <span className="text-[13px] font-bold text-rose-100">
                        話題選択肢：{climaxTopicC.thoughtText}
                      </span>
                    </div>
                    <div className="p-3 space-y-2">
                      <SpeakerLineList speaker="G" text={stageC.spokenText} />
                      <SpeakerLineList speaker="A" text={stageC.aschText} />
                    </div>
                  </div>
                  <div className="h-4 w-0.5 bg-stone-500" />
                  <div className="w-4/5 border-t-2 border-stone-500" />
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                    {stageC.replyOptions?.map((opt, idx) => (
                      <OptionTreeNode
                        key={opt.id}
                        option={opt}
                        branchLabel={`分岐${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* パターンA完了後に出現する追加通常話題の表示 */}
            {distLockTopic && selectedPattern !== 'C' && (
              <div className="w-full max-w-2xl mt-8 pt-6 border-t border-stone-800">
                <div className="rounded-lg border border-emerald-600/50 bg-stone-900 overflow-hidden shadow-lg">
                  <div className="px-3 py-2 bg-emerald-950/50 border-b border-emerald-600/40 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-200">
                      【パターンA完了後に『雑談』タブへ追加される通常話題】
                    </span>
                    <span className="text-xs font-bold text-amber-200">
                      話題：{distLockTopic.thoughtText}
                    </span>
                  </div>
                  <div className="p-3 space-y-2">
                    <SpeakerLineList
                      speaker="G"
                      text={distLockTopic.stages[0].spokenText}
                    />
                    <SpeakerLineList
                      speaker="A"
                      text={distLockTopic.stages[0].aschText}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : activeTab === 'EXPORT' ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-stone-300">
                下のテキストエリアから直接コピーするか、右上の「全文コピー」ボタンで別チャットへ貼り付けられます。
              </span>
            </div>
            <textarea
              readOnly
              value={exportText}
              onClick={(e) => e.currentTarget.select()}
              className="w-full h-[72vh] rounded-lg bg-stone-950 border border-stone-700 p-4 text-sm text-stone-100 leading-relaxed font-mono focus:outline-none focus:border-amber-400"
            />
          </div>
        ) : (
          <div className="max-w-[1600px] mx-auto flex flex-col items-center">
            {/* 『話を切り上げる』を選んだ時の全体分岐フロー */}
            <div className="w-full max-w-6xl rounded-xl border-2 border-amber-500/60 bg-stone-900 p-4 mb-4 shadow-xl">
              <div className="text-sm font-bold text-amber-200 border-b border-stone-700 pb-2 mb-3">
                【前提フロー】画面右上の『話を切り上げる』を選んだ時の分岐（END 01〜04 ＆ Phase 3発生条件）
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-start">
                {/* 条件1：Phase 1 */}
                <div className="rounded-lg border border-stone-700 bg-stone-950/70 p-3 space-y-2">
                  <div className="text-xs font-bold text-amber-300">
                    ① フェーズ1（正体を暴く前）に「研究所へ戻す」
                  </div>
                  <SpeakerLineList
                    speaker="G"
                    text={FINAL_DECISION_STAGES.END_PHASE1_TARLOW.spokenText}
                  />
                  <SpeakerLineList
                    speaker="A"
                    text={FINAL_DECISION_STAGES.END_PHASE1_TARLOW.aschText}
                  />
                  <EndingDetailCard endingKey="END_PHASE1_TARLOW" />
                </div>

                {/* 条件2：Phase 2 不機嫌・会話不足 */}
                <div className="rounded-lg border border-stone-700 bg-stone-950/70 p-3 space-y-2">
                  <div className="text-xs font-bold text-amber-300">
                    ② フェーズ2で不機嫌（機嫌マイナス）または会話不足（2回未満）
                  </div>
                  <SpeakerLineList
                    speaker="G"
                    text={FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.spokenText}
                  />
                  <SpeakerLineList
                    speaker="A"
                    text={FINAL_DECISION_STAGES.END_PHASE2_INCOMPLETE.aschText}
                  />
                  <EndingDetailCard endingKey="END_PHASE2_INCOMPLETE" />
                </div>

                {/* 条件3：Phase 2 通常帰還（Phase 3未到達） */}
                <div className="rounded-lg border border-stone-700 bg-stone-950/70 p-3 space-y-2">
                  <div className="text-xs font-bold text-amber-300">
                    ③ フェーズ2で打ち解けているが、核心対話には触れずに「研究所へ戻す」
                  </div>
                  <SpeakerLineList
                    speaker="G"
                    text={FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.spokenText}
                  />
                  <SpeakerLineList
                    speaker="A"
                    text={FINAL_DECISION_STAGES.END_PHASE2_NORMAL_RETURN.aschText}
                  />
                  <EndingDetailCard endingKey="END_PHASE2_NORMAL_RETURN" />
                </div>

                {/* 条件4：Phase 2 休んでいけ（Phase 3未到達） */}
                <div className="rounded-lg border border-stone-700 bg-stone-950/70 p-3 space-y-2">
                  <div className="text-xs font-bold text-amber-300">
                    ④ フェーズ2で打ち解けている状態で「少し休んでいけ」
                  </div>
                  <SpeakerLineList
                    speaker="G"
                    text={FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.spokenText}
                  />
                  <SpeakerLineList
                    speaker="A"
                    text={FINAL_DECISION_STAGES.END_PHASE2_STAY_REST.aschText}
                  />
                  <EndingDetailCard endingKey="END_PHASE2_STAY_REST" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-500/40 text-center">
                <span className="inline-block px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400 text-amber-200 text-xs font-bold">
                  ▼ ⑤ フェーズ2で「自分は記憶を模倣された譜業か本人か分からない」という核心対話（『みんなの元へ戻らない理由』または『クライマックス対話』）を終えて『研究所へ戻す』を選ぶと、下の【Phase 3：終幕の問いかけ】が発生！ ▼
                </span>
              </div>
            </div>

            {/* Phase 3 導入ノード */}
            <div className="w-full max-w-xl rounded-lg border-2 border-rose-500/60 bg-stone-900 shadow-xl overflow-hidden">
              <div className="px-3 py-2 bg-rose-950/50 border-b border-rose-500/40 text-xs font-bold text-rose-200">
                【Phase 3 導入】帰還時・アッシュからの最後の問いかけ
              </div>
              <div className="p-3 space-y-2">
                <SpeakerLineList speaker="A" text={FINAL_ASCH_QUESTION_LINE} />
              </div>
            </div>

            <div className="h-5 w-0.5 bg-stone-500" />
            <div className="w-4/5 border-t-2 border-stone-500" />

            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
              {[
                {
                  ...PHASE3_WHO_AM_I_OPTIONS[0],
                  aschText:
                    '・・・・・・っ、こんな、譜業の体でもか。\n※それで、何もかも見えるんだろう？\n※そんなのは、人間とは呼べないはずだ',
                  extraExchanges: [
                    {
                      speaker: 'GUY' as const,
                      text: '※怒ってる、か？　わ、悪かったって！　興味本位で覗いちまって・・・・・・\n※そ、それよりだな\n※体が譜業でも何でも、※おまえはおまえだろ。違うか？',
                    },
                    ...(PHASE3_WHO_AM_I_OPTIONS[0].extraExchanges?.slice(1) ?? []),
                  ],
                },
                ...PHASE3_WHO_AM_I_OPTIONS.filter(
                  (o) =>
                    o.id !== 'p3_ans_asch' &&
                    o.id !== 'p3_ans_asch_terminal_many' &&
                    o.id !== 'p3_ans_silence'
                ),
                ...PHASE3_SILENT_TIMEOUT_OPTIONS,
              ].map((opt, idx) => (
                <OptionTreeNode
                  key={opt.id}
                  option={opt}
                  branchLabel={`回答${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
