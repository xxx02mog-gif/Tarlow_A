import * as fs from 'fs';
import {
  SCENARIO_TOPICS_PART1,
  PHASE1_TOPIC_SLIP_CONFIGS,
} from '../src/data/scenarioTopicsPart1';
import { SCENARIO_TOPICS_PART2 } from '../src/data/scenarioTopicsPart2';
import {
  INITIAL_MEMORY_SECTORS,
  INITIAL_SYSTEM_LOGS,
  TERMINAL_UNREVEALED_REACTIONS,
  TERMINAL_GAZE_REACTIONS,
  IDLE_REACTIONS,
  CONTEXT_IDLE_REACTIONS,
  RETURN_FROM_IDLE_LINES,
  ANGRY_COOLDOWN_REACTION,
  AWAY_RETURN_REACTIONS,
  DEFAULT_BAD_MOOD_REFUSAL_LINES,
  AWKWARD_TOPIC_PREFIXES,
  SERIOUS_TO_BRIGHT_TRANSITIONS,
  TURN_MILESTONE_QUESTIONS,
} from '../src/data/scenarioSectors';
import {
  FINAL_ASCH_QUESTION_LINE,
  PHASE3_WHO_AM_I_OPTIONS,
  PHASE3_SILENT_TIMEOUT_OPTIONS,
  FINAL_DECISION_STAGES,
  ENDING_SCENARIOS,
} from '../src/data/scenarioEndingsAndSpecial';
import { AschQuestionReplyOption, FaceParts, TopicReplyOption } from '../src/types/game';

interface SheetRow {
  id: string;
  category: string;
  situation: string;
  speakerOrType: string;
  currentText: string;
  editedText: string;
  currentDirection: string;
  directionNote: string;
}

const rows: SheetRow[] = [];

function formatText(text: string): string {
  return text.replace(/\r?\n/g, ' ／ ').replace(/\t/g, ' ');
}

function formatFace(
  expression?: string,
  faceParts?: Partial<FaceParts>,
  voiceEffects?: string[]
): string {
  const parts: string[] = [];
  if (expression) {
    const expMap: Record<string, string> = {
      normal: '通常',
      glare: '睨み',
      look_away: '目逸らし',
      shock: '動揺/驚き',
      pain: '苦悶',
      empty: '虚ろ',
    };
    parts.push(`表情:${expMap[expression] || expression}`);
  }
  if (faceParts) {
    const browMap: Record<string, string> = {
      normal: '通常',
      angry: '怒り',
      sad: '困り/悲しみ',
      doubt: '訝しみ',
      pain: '苦悶',
      smile: '柔和',
    };
    const eyeMap: Record<string, string> = {
      normal: '通常',
      glare: '睨み',
      away: '逸らし',
      down: '伏せ',
      close: '閉じ',
      wide: '見開き',
      pain: '苦悶閉じ',
      empty: '虚ろ',
    };
    const mouthMap: Record<string, string> = {
      close: '閉じ',
      open: '開き',
      frown: 'への字',
      grit: '食いしばり',
      shout: '叫び',
      small: '小さめ',
    };
    const effectMap: Record<string, string> = {
      blush: '赤面',
      sweat: '汗',
      pale: '青ざめ',
      tears: '涙',
      noise: 'ノイズ',
    };
    const fp: string[] = [];
    if (faceParts.brow) fp.push(`眉:${browMap[faceParts.brow] || faceParts.brow}`);
    if (faceParts.eyes) fp.push(`目:${eyeMap[faceParts.eyes] || faceParts.eyes}`);
    if (faceParts.mouth) fp.push(`口:${mouthMap[faceParts.mouth] || faceParts.mouth}`);
    if (faceParts.effects && faceParts.effects.length > 0) {
      fp.push(`効果:${faceParts.effects.map((e) => effectMap[e] || e).join('+')}`);
    }
    if (fp.length > 0) parts.push(`(${fp.join(' / ')})`);
  }
  if (voiceEffects && voiceEffects.length > 0) {
    const vMap: Record<string, string> = {
      normal: '通常',
      shout: '大声揺れ',
      tremble: '震え小声',
      shout_glitch: '大声+ノイズ',
      tremble_glitch: '震え+ノイズ',
    };
    const vFiltered = voiceEffects.filter((v) => v !== 'normal');
    if (vFiltered.length > 0) {
      parts.push(`声:${vFiltered.map((v) => vMap[v] || v).join('→')}`);
    }
  }
  return parts.join(' ');
}

function addRow(
  id: string,
  category: string,
  situation: string,
  speakerOrType: string,
  currentText: string,
  currentDirection = ''
) {
  rows.push({
    id,
    category,
    situation,
    speakerOrType,
    currentText: formatText(currentText),
    editedText: '',
    currentDirection,
    directionNote: '',
  });
}

// ==========================================
// 1. プロローグ ＆ オープニング
// ==========================================
const prologueLines = [
  '「ルーク」がタタル渓谷へ帰ってきてから、1年が経った。',
  'ディストの研究所の近くで偶然見つけ、逃げ出そうとしたところを捕まえて部屋へ連れ込んだのは――昔の、まだ攫われる前の10歳の姿をしたアッシュだった。',
  'だが、そいつは俺の顔を見ても知らないふりをして、『俺は自律機械タルロウAだ』と言い張り続けている。',
];
prologueLines.forEach((line, idx) => {
  addRow(
    `PROLOGUE_LINES[${idx}]`,
    '1. プロローグ・OP',
    `プロローグ導入（${idx + 1}段落目）`,
    '地の文（モノローグ）',
    line,
    '黒背景・白文字'
  );
});

addRow(
  'OPENING_ASCH_TEXT',
  '1. プロローグ・OP',
  'Phase 0 オープニング：部屋に連れ込んだ直後の第一声',
  'アッシュの返答',
  '離せ。俺は『アッシュ』なんかじゃない、ディストが造った自律機械『タルロウA』だ。 ／ おまえが誰かは知らんが、用がないならさっさと研究所へ戻せ。',
  '表情:通常'
);

// ==========================================
// 2. Phase 1 カマかけ質問 ＆ ボロ指摘パート
// ==========================================
SCENARIO_TOPICS_PART1.forEach((topic, tIdx) => {
  const num = tIdx + 1;
  const baseSit = `Phase1 質問${num}「${topic.thoughtText}」`;
  const st = topic.stages[0];

  addRow(
    `${topic.id}::thoughtText`,
    '2. Phase1 カマかけ質問',
    `${baseSit} ＞ 質問選択ボタン`,
    '選択肢ラベル',
    topic.thoughtText
  );
  addRow(
    `${topic.id}::spokenText`,
    '2. Phase1 カマかけ質問',
    `${baseSit} ＞ 質問した時のガイのセリフ`,
    'ガイのセリフ',
    st.spokenText
  );
  addRow(
    `${topic.id}::aschText`,
    '2. Phase1 カマかけ質問',
    `${baseSit} ＞ 通常時（ボロが出ない時）のアッシュの返答`,
    'アッシュの返答（通常）',
    st.aschText,
    formatFace(st.expression, st.faceParts, st.voiceEffects)
  );

  const tc = PHASE1_TOPIC_SLIP_CONFIGS[topic.id];
  if (tc) {
    addRow(
      `${topic.id}::shortLabel`,
      '2. Phase1 カマかけ質問',
      `${baseSit} ＞ ボロ指摘フェーズの一覧に表示される短い質問名`,
      '推理選択ラベル',
      tc.shortLabel
    );
    tc.variants.forEach((v) => {
      const vLabel =
        v.type === 'REWRITE'
          ? 'ボロ演出：2枠言い直し'
          : 'ボロ演出：返答前0.7秒の表情揺らぎ';
      if (v.type === 'REWRITE' && v.slipPrefixText && v.slipCorrectedText) {
        addRow(
          `${topic.id}::slip[${v.type}]::slipPrefixText`,
          '2. Phase1 カマかけ質問',
          `${baseSit} ＞ ${vLabel}（1枠目：思わず漏れた本音）`,
          'アッシュ（ボロ1枠目）',
          v.slipPrefixText
        );
        addRow(
          `${topic.id}::slip[${v.type}]::slipCorrectedText`,
          '2. Phase1 カマかけ質問',
          `${baseSit} ＞ ${vLabel}（2枠目：慌てて訂正した言葉）`,
          'アッシュ（ボロ2枠目）',
          v.slipCorrectedText
        );
      }
      addRow(
        `${topic.id}::slip[${v.type}]::guyPointOutSpoken`,
        '2. Phase1 カマかけ質問',
        `${baseSit} ＞ ボロ指摘フェーズで「${vLabel}」を当てた時のガイの追及セリフ`,
        'ガイ（ボロ追及セリフ）',
        v.guyPointOutSpoken,
        v.preFaceParts ? `0.7秒揺らぎ:${formatFace(undefined, v.preFaceParts)}` : ''
      );
      addRow(
        `${topic.id}::slip[${v.type}]::terminalRecordSummary`,
        '2. Phase1 カマかけ質問',
        `${baseSit} ＞ ${vLabel}発生時に端末INFO（情動反応）へ自動記録される分析カルテ本文`,
        '端末INFO本文（情動反応）',
        v.terminalRecordSummary
      );
    });
  }
});

addRow(
  'PHASE1_ACCUSE_SUCCESS::aschText',
  '2. Phase1 カマかけ質問',
  'Phase1 ボロ指摘フェーズ ＞ 正解を突きつけられてアッシュが観念するセリフ（Phase2へ移行）',
  'アッシュの返答',
  '・・・・・・っ！！　・・・・・・チッ、どこまでしつこく観察してやがる・・・・・・！ ／ ・・・・・・分かったよ、俺の負けだ。その通りだ、俺は『タルロウA』なんかじゃない・・・・・・アッシュだ。',
  '1枠目:動揺/大声 → 2枠目:目逸らし'
);
addRow(
  'PHASE1_ACCUSE_FAIL::aschText',
  '2. Phase1 カマかけ質問',
  'Phase1 ボロ指摘フェーズ ＞ 不正解だった時にアッシュに論破されるセリフ（END01へ直行）',
  'アッシュの返答',
  '言いがかりだな。俺は最初から事実しか言っていないし、動揺などもしていない。 ／ 疑う根拠がないなら、さっさと研究所へ戻せ。',
  '表情:通常'
);
addRow(
  'PHASE1_SHOW_TERMINAL::guyText',
  '2. Phase1 カマかけ質問',
  'Phase1 別解ルート ＞ 端末のロックを解除して「手元の端末の画面を本人に見せる」を選んだ時のガイのセリフ',
  'ガイのセリフ',
  'おまえ、俺がただの板を見ていると思って油断してただろ。これ、ディストの研究所から回収したおまえの内部モニターなんだよ。 ／ おまえが『タルロウA』じゃなくて、俺を知っているアッシュ本人だって記録も全部ここに映ってるぞ。'
);
addRow(
  'PHASE1_SHOW_TERMINAL::aschText',
  '2. Phase1 カマかけ質問',
  'Phase1 別解ルート ＞ 端末の画面を突きつけられた時のアッシュの動揺セリフ',
  'アッシュの返答',
  'なっ・・・・・・！？　な、なんだその端末は、いつの間に・・・・・・！？ ／ ええい、うるさい！！　人の頭の中まで勝手に覗き見やがって、いい加減にしろ、ガイ！！',
  '表情:動揺/大声'
);
addRow(
  'PHASE1_SHOW_TERMINAL_CONFIRM::guyText',
  '2. Phase1 カマかけ質問',
  'Phase1 別解ルート ＞ アッシュが思わず「ガイ」と呼んだ直後の追及セリフ',
  'ガイのセリフ',
  '今、俺のことを「ガイ」って呼んだな。俺の名前を知らないはずの機械が、どうして呼べるんだ？　・・・・・・やっぱりアッシュなんだろ。'
);
addRow(
  'PHASE1_SHOW_TERMINAL_CONFIRM::aschText',
  '2. Phase1 カマかけ質問',
  'Phase1 別解ルート ＞ 名前を呼んだことを指摘されて観念するアッシュのセリフ',
  'アッシュの返答',
  '・・・・・・っ！！　・・・・・・チッ、端末まで持ち出しやがって・・・・・・。 ／ ・・・・・・分かったよ、俺の負けだ。その通りだ、俺はアッシュだ。'
);

// ==========================================
// 3〜5. Phase 2 各タブの全会話（雑談・追求・端末）
// ==========================================
function processReplyOptions(
  options: TopicReplyOption[],
  categoryLabel: string,
  parentSituation: string,
  parentIdPrefix: string
) {
  options.forEach((opt, idx) => {
    const sit = `${parentSituation} ＞ 選択肢(${idx + 1}/${options.length})「${opt.thoughtText}」`;
    const optPrefix = `${parentIdPrefix}::reply[${opt.id}]`;

    addRow(
      `${optPrefix}::thoughtText`,
      categoryLabel,
      sit,
      '選択肢ラベル',
      opt.thoughtText
    );
    addRow(
      `${optPrefix}::spokenText`,
      categoryLabel,
      sit,
      'ガイのセリフ',
      opt.spokenText
    );
    addRow(
      `${optPrefix}::aschText`,
      categoryLabel,
      sit,
      'アッシュの返答',
      opt.aschText,
      formatFace(opt.expression, opt.faceParts, opt.voiceEffects)
    );
    if (opt.oralInfo) {
      addRow(
        `${optPrefix}::oralInfo.title`,
        categoryLabel,
        `${sit} ＞ 会話後に端末INFOへ追加される記録タイトル`,
        '端末INFOタイトル',
        opt.oralInfo.title
      );
      addRow(
        `${optPrefix}::oralInfo.content`,
        categoryLabel,
        `${sit} ＞ 会話後に端末INFOへ追加される記録本文`,
        '端末INFO本文',
        opt.oralInfo.content
      );
    }
    if (opt.followUpOptions && opt.followUpOptions.length > 0) {
      processReplyOptions(opt.followUpOptions, categoryLabel, sit, optPrefix);
    }
  });
}

SCENARIO_TOPICS_PART2.forEach((topic) => {
  const tabMap: Record<string, string> = {
    雑談: '3. Phase2 [雑談] タブ',
    追求: '4. Phase2 [追求] タブ',
    端末: '5. Phase2 [端末] タブ',
  };
  const categoryLabel = tabMap[topic.phase2Tab || '雑談'] || '3. Phase2 [雑談] タブ';
  const moodNote = topic.sensitiveToBadMood
    ? '（※不機嫌時は拒否される話題）'
    : topic.calmsAnger
    ? '（※不機嫌を鎮める話題）'
    : '';
  const baseSit = `話題「${topic.thoughtText}」${moodNote}`;
  const st = topic.stages[0];

  addRow(
    `${topic.id}::thoughtText`,
    categoryLabel,
    `${baseSit} ＞ 話題選択ボタン`,
    '選択肢ラベル',
    topic.thoughtText
  );
  addRow(
    `${topic.id}::spokenText`,
    categoryLabel,
    `${baseSit} ＞ 1往復目（切り出し）`,
    'ガイのセリフ',
    st.spokenText
  );
  addRow(
    `${topic.id}::aschText`,
    categoryLabel,
    `${baseSit} ＞ 1往復目（通常時の返答）`,
    'アッシュの返答（通常）',
    st.aschText,
    formatFace(st.expression, st.faceParts, st.voiceEffects)
  );

  if (st.badMoodResponse) {
    addRow(
      `${topic.id}::badMoodResponse.aschText`,
      categoryLabel,
      `${baseSit} ＞ ★アッシュが不機嫌な時の専用返答`,
      'アッシュの返答（不機嫌時）',
      st.badMoodResponse.aschText,
      formatFace(st.badMoodResponse.expression, st.badMoodResponse.faceParts)
    );
  }

  if (st.oralInfo) {
    addRow(
      `${topic.id}::oralInfo.title`,
      categoryLabel,
      `${baseSit} ＞ 会話後に端末INFOへ追加される記録タイトル`,
      '端末INFOタイトル',
      st.oralInfo.title
    );
    addRow(
      `${topic.id}::oralInfo.content`,
      categoryLabel,
      `${baseSit} ＞ 会話後に端末INFOへ追加される記録本文`,
      '端末INFO本文',
      st.oralInfo.content
    );
  }

  if (st.replyOptions && st.replyOptions.length > 0) {
    processReplyOptions(st.replyOptions, categoryLabel, baseSit, topic.id);
  }
});

// ==========================================
// 6. システム反応・逆質問・端末開閉・放置・不機嫌反応
// ==========================================
const sysCat = '6. 逆質問・放置・不機嫌・端末反応';

TURN_MILESTONE_QUESTIONS.forEach((mq, mIdx) => {
  const baseSit = `Phase2 アッシュからの逆質問${mIdx + 1}（目安ターン${mq.turnCount}）`;
  addRow(
    `${mq.question.id}::questionLine`,
    sysCat,
    `${baseSit} ＞ アッシュの質問切り出し`,
    'アッシュの逆質問',
    mq.questionLine,
    formatFace(mq.expression, mq.faceParts)
  );
  mq.question.options.forEach((opt, oIdx) => {
    const cond = opt.requireBadMoodOrCold ? '（※不機嫌・冷淡時のみ出現）' : '';
    const optSit = `${baseSit} ＞ 回答選択肢(${oIdx + 1}/${mq.question.options.length})「${opt.thoughtText}」${cond}`;
    addRow(
      `${mq.question.id}::opt[${opt.id}]::thoughtText`,
      sysCat,
      optSit,
      '選択肢ラベル',
      opt.thoughtText
    );
    addRow(
      `${mq.question.id}::opt[${opt.id}]::spokenText`,
      sysCat,
      optSit,
      'ガイのセリフ',
      opt.spokenText
    );
    addRow(
      `${mq.question.id}::opt[${opt.id}]::aschText`,
      sysCat,
      optSit,
      'アッシュの返答',
      opt.aschText,
      formatFace(opt.expression, opt.faceParts, opt.voiceEffects)
    );
  });
});

addRow(
  'QUESTION_TIMEOUT_WITHDRAW',
  sysCat,
  'Phase2 アッシュの逆質問 ＞ 30秒間無言（放置）してタイムアウトした時の質問取り下げセリフ',
  'アッシュの返答',
  '・・・・・・。 ／ ・・・・・・いや、いい。なんでもない。忘れてくれ。',
  '表情:目逸らし(悲しみ眉/伏せ目)'
);

DEFAULT_BAD_MOOD_REFUSAL_LINES.forEach((ref, idx) => {
  addRow(
    `DEFAULT_BAD_MOOD_REFUSAL_LINES[${idx}]`,
    sysCat,
    `アッシュが不機嫌な時 ＞ 会話を拒否する汎用セリフ（パターン${idx + 1}）`,
    'アッシュの拒否セリフ',
    ref.aschText,
    formatFace(ref.expression, ref.faceParts, ref.voiceEffects)
  );
});

addRow(
  'ANGRY_COOLDOWN_REACTION::text',
  sysCat,
  `アッシュが不機嫌な時 ＞ ${ANGRY_COOLDOWN_REACTION.thresholdSec}秒間そっとしておいた時の自己鎮静セリフ`,
  'アッシュの鎮静セリフ',
  ANGRY_COOLDOWN_REACTION.text,
  formatFace(ANGRY_COOLDOWN_REACTION.expression, ANGRY_COOLDOWN_REACTION.faceParts)
);

AWKWARD_TOPIC_PREFIXES.forEach((pref, idx) => {
  addRow(
    `AWKWARD_TOPIC_PREFIXES[${idx}]`,
    sysCat,
    `気まずい・不機嫌な空気の時 ＞ ガイが別の話題を切り出す前に挟む言い淀み（パターン${idx + 1}）`,
    'ガイの前置き一言',
    pref
  );
});

SERIOUS_TO_BRIGHT_TRANSITIONS.forEach((tr, idx) => {
  addRow(
    `SERIOUS_TO_BRIGHT_TRANSITIONS[${idx}]::guyHesitation`,
    sysCat,
    `シリアスな話の直後に明るい雑談へ変えた時 ＞ ガイの言い淀み（パターン${idx + 1}）`,
    'ガイの前置き一言',
    tr.guyHesitation
  );
  addRow(
    `SERIOUS_TO_BRIGHT_TRANSITIONS[${idx}]::aschTransition`,
    sysCat,
    `シリアスな話の直後に明るい雑談へ変えた時 ＞ アッシュの反応（パターン${idx + 1}）`,
    'アッシュの前置き反応',
    tr.aschTransition,
    formatFace(tr.expression, tr.faceParts)
  );
});

TERMINAL_UNREVEALED_REACTIONS.forEach((tu, idx) => {
  addRow(
    `TERMINAL_UNREVEALED_REACTIONS[${idx}]::text`,
    sysCat,
    `端末の正体を明かしていない状態 ＞ 端末を閉じた時のアッシュの反応（段階${idx + 1}）`,
    'アッシュのセリフ',
    tu.text,
    formatFace(tu.expression, tu.faceParts)
  );
});

TERMINAL_GAZE_REACTIONS.forEach((tg, idx) => {
  addRow(
    `TERMINAL_GAZE_REACTIONS[${idx}]::text`,
    sysCat,
    `端末の正体を明かした状態 ＞ 端末を閉じた時のアッシュの警戒セリフ（段階${idx + 1}）`,
    'アッシュの警戒セリフ',
    tg.text,
    formatFace(tg.expression, tg.faceParts)
  );
});

IDLE_REACTIONS.forEach((ir) => {
  addRow(
    `IDLE_REACTIONS[stage${ir.stage}]::text`,
    sysCat,
    `無言放置（基本） ＞ ${ir.thresholdSec}秒間何も操作しなかった時の反応（段階${ir.stage}）`,
    'アッシュの放置反応',
    ir.text,
    formatFace(ir.expression, ir.faceParts)
  );
});

Object.entries(CONTEXT_IDLE_REACTIONS).forEach(([catKey, item]) => {
  const catNameMap: Record<string, string> = {
    body: '身体・素体の話の後',
    past: '過去の話の後',
    daily: '日常・お茶の話の後',
    friends: '仲間の近況の話の後',
    core: '核心・シリアスな話の後',
    fight: '言い争い・衝突の後',
  };
  addRow(
    `CONTEXT_IDLE_REACTIONS[${catKey}].stage1::text`,
    sysCat,
    `無言放置（文脈別：${catNameMap[catKey] || catKey}） ＞ 18秒経過時（1段階目）`,
    'アッシュの放置反応',
    item.stage1.text,
    formatFace(item.stage1.expression, item.stage1.faceParts)
  );
  addRow(
    `CONTEXT_IDLE_REACTIONS[${catKey}].stage2::text`,
    sysCat,
    `無言放置（文脈別：${catNameMap[catKey] || catKey}） ＞ 36秒経過時（2段階目）`,
    'アッシュの放置反応',
    item.stage2.text,
    formatFace(item.stage2.expression, item.stage2.faceParts)
  );
});

RETURN_FROM_IDLE_LINES.forEach((line, idx) => {
  addRow(
    `RETURN_FROM_IDLE_LINES[${idx}]`,
    sysCat,
    `無言放置した後にガイが再び話しかけた時 ＞ 本題の前にアッシュが挟む一言（パターン${idx + 1}）`,
    'アッシュの復帰一言',
    line
  );
});

AWAY_RETURN_REACTIONS.phase1.forEach((item, idx) => {
  addRow(
    `AWAY_RETURN_REACTIONS.phase1[${idx}]::text`,
    sysCat,
    `別タブ・別ウィンドウから画面に戻った時 ＞ Phase1（${idx + 1}回目）`,
    'アッシュの離席復帰反応',
    item.text,
    formatFace(item.expression, item.faceParts)
  );
});
AWAY_RETURN_REACTIONS.angry.forEach((item, idx) => {
  addRow(
    `AWAY_RETURN_REACTIONS.angry[${idx}]::text`,
    sysCat,
    `別タブ・別ウィンドウから画面に戻った時 ＞ Phase2 不機嫌状態（${idx + 1}回目）`,
    'アッシュの離席復帰反応',
    item.text,
    formatFace(item.expression, item.faceParts)
  );
});
AWAY_RETURN_REACTIONS.normal.forEach((item, idx) => {
  addRow(
    `AWAY_RETURN_REACTIONS.normal[${idx}]::text`,
    sysCat,
    `別タブ・別ウィンドウから画面に戻った時 ＞ Phase2 通常状態（${idx + 1}回目）`,
    'アッシュの離席復帰反応',
    item.text,
    formatFace(item.expression, item.faceParts)
  );
});

// ==========================================
// 7. Phase 3 終幕の問いかけ ＆ 全エンディング（END 01〜10）
// ==========================================
const p3Cat = '7. Phase3 終幕・全エンディング';

addRow(
  'FINAL_ASCH_QUESTION_LINE',
  p3Cat,
  'Phase3 終幕 ＞ アッシュからの最後の問いかけ（「おまえから見て、今の俺は誰に見える？」）',
  'アッシュの問いかけ',
  FINAL_ASCH_QUESTION_LINE
);

function processPhase3Options(
  opts: AschQuestionReplyOption[],
  parentSit: string,
  parentIdPrefix: string
) {
  opts.forEach((opt, idx) => {
    const sit = `${parentSit} ＞ 選択肢(${idx + 1}/${opts.length})「${opt.thoughtText}」`;
    const optPrefix = `${parentIdPrefix}[${opt.id}]`;

    addRow(
      `${optPrefix}::thoughtText`,
      p3Cat,
      sit,
      '選択肢ラベル',
      opt.thoughtText
    );
    addRow(
      `${optPrefix}::spokenText`,
      p3Cat,
      sit,
      'ガイのセリフ',
      opt.spokenText
    );
    addRow(
      `${optPrefix}::aschText`,
      p3Cat,
      sit,
      'アッシュの返答',
      opt.aschText,
      formatFace(opt.expression, opt.faceParts, opt.voiceEffects)
    );

    if (opt.followUpOptions && opt.followUpOptions.length > 0) {
      processPhase3Options(opt.followUpOptions, sit, optPrefix);
    }
  });
}

processPhase3Options(
  PHASE3_WHO_AM_I_OPTIONS,
  'Phase3「今の俺は誰に見える？」への回答',
  'PHASE3_WHO_AM_I_OPTIONS'
);

addRow(
  'PHASE3_SILENT_TIMEOUT::aschWithdraw',
  p3Cat,
  'Phase3「今の俺は誰に見える？」 ＞ 30秒間無言（タイムアウト）だった時のアッシュの取り下げセリフ',
  'アッシュの返答',
  '・・・・・・。 ／ ・・・・・・いや、いい。忘れてくれ。'
);

processPhase3Options(
  PHASE3_SILENT_TIMEOUT_OPTIONS,
  'Phase3 30秒無言タイムアウト直後の最終行動選択',
  'PHASE3_SILENT_TIMEOUT_OPTIONS'
);

Object.entries(FINAL_DECISION_STAGES).forEach(([key, stage]) => {
  addRow(
    `FINAL_DECISION_STAGES[${key}]::spokenText`,
    p3Cat,
    `[決断]タブから話を切り上げて退室する時（${key}） ＞ ガイの退室前セリフ`,
    'ガイのセリフ',
    stage.spokenText
  );
  addRow(
    `FINAL_DECISION_STAGES[${key}]::aschText`,
    p3Cat,
    `[決断]タブから話を切り上げて退室する時（${key}） ＞ アッシュの退室前セリフ`,
    'アッシュの返答',
    stage.aschText,
    formatFace(stage.expression, stage.faceParts, stage.voiceEffects)
  );
});

Object.values(ENDING_SCENARIOS).forEach((end) => {
  const endSit = `エンディング [${end.id}]（${end.title}）`;
  addRow(
    `ENDING_SCENARIOS[${end.id}]::title`,
    p3Cat,
    `${endSit} ＞ エンディングタイトル`,
    'エンディングタイトル',
    end.title
  );
  end.dialogues.forEach((dlg, dIdx) => {
    const spkMap: Record<string, string> = {
      GUY: 'ガイのセリフ',
      ASCH: 'アッシュのセリフ',
      NARRATION: '地の文（ナレーション）',
    };
    addRow(
      `ENDING_SCENARIOS[${end.id}]::dialogues[${dIdx}]`,
      p3Cat,
      `${endSit} ＞ 本編テキスト（${dIdx + 1}/${end.dialogues.length}枠目）`,
      spkMap[dlg.speaker] || dlg.speaker,
      dlg.text
    );
  });
  addRow(
    `ENDING_SCENARIOS[${end.id}]::summaryText`,
    p3Cat,
    `${endSit} ＞ 最終レポート画面の要約文`,
    '最終レポート要約文',
    end.summaryText
  );
});

// ==========================================
// 8. 情報端末（DATA TERMINAL）全メモリーセクター（INFO / LOG）
// ==========================================
const termCat = '8. 情報端末（INFO・LOG記録）';

INITIAL_MEMORY_SECTORS.forEach((sec) => {
  const secSit = `端末セクター [${sec.code} / ${sec.id}]（${sec.unlockedCategory}）`;
  addRow(
    `INITIAL_MEMORY_SECTORS[${sec.id}]::unlockedTitle`,
    termCat,
    `${secSit} ＞ 解除後の項目タイトル`,
    '端末INFOタイトル',
    sec.unlockedTitle
  );
  addRow(
    `INITIAL_MEMORY_SECTORS[${sec.id}]::unlockedContent`,
    termCat,
    `${secSit} ＞ 端末で長押し解除（強制解除）した時の内部記録本文`,
    '端末INFO本文（長押し解除時）',
    sec.unlockedContent
  );
  if (sec.dialogueUnlockedContent) {
    addRow(
      `INITIAL_MEMORY_SECTORS[${sec.id}]::dialogueUnlockedContent`,
      termCat,
      `${secSit} ＞ 会話で自然解除した時のINFO本文`,
      '端末INFO本文（対話自然解除時）',
      sec.dialogueUnlockedContent
    );
  }
  if (sec.paradoxWarning) {
    addRow(
      `INITIAL_MEMORY_SECTORS[${sec.id}]::paradoxWarning`,
      termCat,
      `${secSit} ＞ 深層封印の警告文`,
      '端末警告テキスト',
      sec.paradoxWarning
    );
  }
});

INITIAL_SYSTEM_LOGS.forEach((log) => {
  addRow(
    `INITIAL_SYSTEM_LOGS[${log.id}]::message`,
    termCat,
    `端末 初期システム稼働ログ（${log.timestamp}）`,
    '端末LOGテキスト',
    log.message
  );
});

// Header
const headers = [
  '管理ID（触らないでください）',
  'フェーズ・分類',
  'どういう時のセリフか（場面・条件）',
  '話者・種類',
  '現在のセリフ（見本 ※「 ／ 」は吹き出しの区切り）',
  '★修正後のセリフ（直したい行だけここに入力）',
  '現在の表情・演出（参考）',
  '★演出メモ（表情などを変えたい時だけ入力）',
];

// Write TSV
const tsvLines = [
  headers.join('\t'),
  ...rows.map((r) =>
    [
      r.id,
      r.category,
      r.situation,
      r.speakerOrType,
      r.currentText,
      r.editedText,
      r.currentDirection,
      r.directionNote,
    ].join('\t')
  ),
];
fs.writeFileSync('ALL_TEXT_SHEET.tsv', tsvLines.join('\n'), 'utf8');

// Write CSV (with UTF-8 BOM for Excel compatibility)
function escapeCsv(val: string): string {
  if (val.includes('"') || val.includes(',') || val.includes('\n')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}
const csvLines = [
  headers.map(escapeCsv).join(','),
  ...rows.map((r) =>
    [
      r.id,
      r.category,
      r.situation,
      r.speakerOrType,
      r.currentText,
      r.editedText,
      r.currentDirection,
      r.directionNote,
    ]
      .map(escapeCsv)
      .join(',')
  ),
];
fs.writeFileSync('ALL_TEXT_SHEET.csv', '\uFEFF' + csvLines.join('\r\n'), 'utf8');

console.log(`Generated ${rows.length} rows in ALL_TEXT_SHEET.tsv and ALL_TEXT_SHEET.csv`);
