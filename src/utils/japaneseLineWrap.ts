import { BubbleVoiceEffect } from '../types/game';

/**
 * 1文字あたりの視覚幅（全角＝1.0em、半角英数・スペース等＝0.56em）を算出
 */
export function calcVisualEm(str: string): number {
  let w = 0;
  for (const ch of str) {
    if (ch === '\n') continue;
    if (/[A-Za-z0-9!?%/:;,.()[\]\- ]/.test(ch)) {
      w += 0.56;
    } else {
      w += 1.0;
    }
  }
  return w;
}

const segmenter =
  typeof Intl !== 'undefined' && 'Segmenter' in Intl
    ? new Intl.Segmenter('ja', { granularity: 'word' })
    : null;

// 作中で分割してはいけない複合固有名詞・専門用語（先にプレースホルダ保護または結合）
const ATOMIC_COMPOUND_WORDS = [
  'タタル渓谷',
  'ファブレ公爵家',
  'ファブレ公爵',
  'ファブレ邸',
  'ピオニー陛下',
  'ユリアシティ',
  'グランコクマ',
  'エルドラント',
  'ガルディオス',
  'ローレライ',
  'キムラスカ',
  'タルロウA',
  'タルロウX',
  '自律譜業',
  '小型譜業',
  '予備機体',
  '出力制限',
  '管理者権限',
  '第七音素',
  '音素乖離',
  '音機関',
  '死霊使い',
  '六神将',
  '神託の盾',
  '休止モード',
  '感情波形',
  '生体記憶',
  '管理端末',
  '設定端末',
];

// 前の語に必ず結合する助詞・助動詞・終助詞・句読点・記号
const ATTACH_TO_PREV_REGEX =
  /^(?:[、。！？!?…」』）)・　 ]+|[っッー]+|は|が|を|に|へ|と|で|から|まで|より|も|だけ|など|くらい|ぐらい|ばかり|すら|さえ|こそ|でも|とか|やら|なり|だの|って|なんて|なんか|なんぞ|か|な|ぞ|ぜ|よ|ね|さ|わ|かな|かしら|っけ|のに|ので|けれど|けれども|けど|だけど|なんだけど|し|たり|だり|つつ|ながら|ても|ば|たら|なら|だ|です|ます|た|ない|ぬ|ん|よう|そう|らしい|みたい|べき|まい|たい|たがる|れる|られる|せる|させる|ちゃう|ちまう|じゃう|じまう|てる|でる|とく|どく|て|で|ろ|い|う|なよ|だな|だよ|だろ|だろう|だろうが|だった|なかった|のか|のかよ|んだ|んだよ|んだろ|んだな|じゃない|じゃないか|やがる|やがって|やがった|ている|ていろ|ておけ|ておく|てくれ|てやる|てやがる|ものか|ものを|はずだ|わけだ|からな|よな|ことか|ことだ|ものだ|ところだ|つもりだ|もんか|もんでも|くらいは|くらいなら|だけでは|だけでも|としても|にしては|について|にとって|に対して)$/;

// 数字の直後に結合する助数詞・単位
const COUNTER_UNIT_REGEX =
  /^(?:年|年間|年前|ヶ月|ヶ月前|か月|日|日間|時間|分|秒|秒間|歳|歳時|歳時点|人|つ|個|回|度|件|番|倍|割|階|枚|本|匹|体|機|枠|行|文字|%|％|cm|mm|px)/;

// 次の語に結合する接頭辞・連体詞・開き括弧
const ATTACH_TO_NEXT_REGEX =
  /^(?:[「『（(]+|お|ご|第|不|無|未|非|元|本|新|旧|大|小|超|再|各|全|半|逆|この|その|あの|どの|こんな|そんな|あんな|どんな|ただの|いわゆる|まさに|まるで)$/;

// 単独で自立語になりうる短いひらがな語（前の語に誤結合させないためのリスト）
const STANDALONE_SHORT_HIRAGANA =
  /^(?:俺|おまえ|あいつ|こいつ|そいつ|これ|それ|あれ|ここ|そこ|あそこ|いま|今|昔|今日|明日|昨日|毎日|全部|自分|他人|人間|また|まだ|もう|すぐ|よく|どう|なぜ|なに|何|誰|だれ|どこ|いつ|いや|ああ|うん|ほら|なあ|おい|さあ|まあ|ふん|ちっ)$/;

/**
 * 複合固有名詞がSegmenterで分割されないよう事前結合したセグメント配列を返す
 */
function segmentWithAtomicCompounds(text: string): string[] {
  const baseSegments: string[] = segmenter
    ? Array.from(segmenter.segment(text)).map((s) => s.segment)
    : Array.from(text);

  const result: string[] = [];
  let i = 0;
  while (i < baseSegments.length) {
    let matchedCompound: string | null = null;
    let matchedLen = 0;

    // 現在位置から始まる複合固有名詞があるかチェック
    for (const word of ATOMIC_COMPOUND_WORDS) {
      let acc = '';
      let k = i;
      while (k < baseSegments.length && acc.length < word.length) {
        acc += baseSegments[k];
        k++;
      }
      if (acc === word && k - i > 1) {
        matchedCompound = word;
        matchedLen = k - i;
        break;
      }
    }

    if (matchedCompound) {
      result.push(matchedCompound);
      i += matchedLen;
    } else {
      result.push(baseSegments[i]);
      i++;
    }
  }

  return result;
}

/**
 * 日本語テキストを「途中で改行してはいけない文節（Bunsetsu）トークン」の配列に分割する
 */
export function tokenizeJapaneseBunsetsu(text: string): string[] {
  if (!text) return [];

  const rawSegments = segmentWithAtomicCompounds(text);
  const pass1: string[] = [];

  for (let i = 0; i < rawSegments.length; i++) {
    let seg = rawSegments[i];

    // 1. 連続する中黒リーダー（・・・・・・）および直後の感嘆符・句読点・促音は1つの不可分トークンにする
    if (seg.includes('・')) {
      while (
        i + 1 < rawSegments.length &&
        /^[・。、！？!?っッ」』）)　 ]+$/.test(rawSegments[i + 1])
      ) {
        seg += rawSegments[++i];
      }
    }

    // 2. 数字＋助数詞（3年前、2ヶ月前、10歳、20歳時点など）を1つの不可分トークンにする
    if (/[0-9０-９]+$/.test(seg) && i + 1 < rawSegments.length) {
      while (
        i + 1 < rawSegments.length &&
        COUNTER_UNIT_REGEX.test(rawSegments[i + 1])
      ) {
        seg += rawSegments[++i];
      }
    }

    // 3. 『...』や「...」で12文字以内の固有名詞・強調語は1つの不可分トークンにする
    if ((seg === '『' || seg === '「') && i + 1 < rawSegments.length) {
      const closeChar = seg === '『' ? '』' : '」';
      let lookahead = seg;
      let j = i + 1;
      let closed = false;
      while (j < rawSegments.length && calcVisualEm(lookahead) <= 12.5) {
        lookahead += rawSegments[j];
        if (rawSegments[j].includes(closeChar)) {
          closed = true;
          break;
        }
        j++;
      }
      if (closed) {
        seg = lookahead;
        i = j;
        while (
          i + 1 < rawSegments.length &&
          (ATTACH_TO_PREV_REGEX.test(rawSegments[i + 1]) ||
            /^[、。！？!?　 ]+$/.test(rawSegments[i + 1]))
        ) {
          seg += rawSegments[++i];
        }
      }
    }

    // 4. 前のトークンに結合すべき付属語（助詞・助動詞・句読点・送り仮名）なら前へ結合
    if (pass1.length > 0) {
      const prev = pass1[pass1.length - 1];
      const prevEndsWithPunctOrSpace = /[、。！？!?　 ]$/.test(prev);
      const prevIsOnlyEllipsis = /^・+$/.test(prev);

      const isNumberCounterContinuation =
        /[0-9０-９]$/.test(prev) && COUNTER_UNIT_REGEX.test(seg);

      const isDependentSuffix =
        isNumberCounterContinuation ||
        ATTACH_TO_PREV_REGEX.test(seg) ||
        /^[、。！？!?…」』）)　 ]/.test(seg) ||
        /[「『（(]$/.test(prev) ||
        (!prevEndsWithPunctOrSpace &&
          !prevIsOnlyEllipsis &&
          /^[ぁ-ん]+$/.test(seg) &&
          seg.length <= 2 &&
          !ATTACH_TO_NEXT_REGEX.test(seg) &&
          !STANDALONE_SHORT_HIRAGANA.test(seg));

      if (isDependentSuffix) {
        // 文頭の「・・・・・・」に続く最初の短い自立語・感嘆詞は「・・・・・・」が単独行にならないよう結合する
        if (prevIsOnlyEllipsis && pass1.length === 1) {
          pass1[0] += seg;
          continue;
        }
        if (
          prevIsOnlyEllipsis &&
          !/^[、。！？!?っッ」』）)　 ]+$/.test(seg)
        ) {
          pass1.push(seg);
          continue;
        }
        pass1[pass1.length - 1] += seg;
        continue;
      }
    }

    pass1.push(seg);
  }

  // 文頭の「・・・・・・」が単独トークンとして残っている場合は、直後のトークンと必ず結合する（1行目に「・・・・・・」だけ残るのを防ぐ）
  if (pass1.length >= 2 && /^・+$/.test(pass1[0])) {
    pass1[1] = pass1[0] + pass1[1];
    pass1.shift();
  }

  // 第2パス：接頭辞や1.8em以下の極小自立トークンを次のトークンと結合（ただし句読点終わりや結合後11em超えは除く）
  const merged: string[] = [];
  for (let i = 0; i < pass1.length; i++) {
    const cur = pass1[i];
    const endsWithBreakablePunct = /[、。！？!?　 ]$/.test(cur);
    const isEllipsis = cur.includes('・・・・・・');

    if (
      i + 1 < pass1.length &&
      !endsWithBreakablePunct &&
      !isEllipsis &&
      (ATTACH_TO_NEXT_REGEX.test(cur) ||
        (calcVisualEm(cur) <= 1.8 &&
          calcVisualEm(cur + pass1[i + 1]) <= 10.5))
    ) {
      pass1[i + 1] = cur + pass1[i + 1];
    } else {
      merged.push(cur);
    }
  }

  // 第3パス：末尾トークンが3.5em以下（例：「だ。」「のか？」「おまえは。」等）で単独落ちしそうな場合、
  // 前のトークンが句点「。」「！」「？」で終わっていない限り結合して端数落ちを防止
  if (merged.length >= 2) {
    const lastIdx = merged.length - 1;
    const lastToken = merged[lastIdx];
    const prevToken = merged[lastIdx - 1];
    if (
      calcVisualEm(lastToken) <= 3.5 &&
      !/[。！？!?　 ]$/.test(prevToken) &&
      calcVisualEm(prevToken + lastToken) <= 13.5
    ) {
      merged[lastIdx - 1] = prevToken + lastToken;
      merged.pop();
    }
  }

  return merged;
}

/**
 * トークン境界ごとの「改行しやすさボーナス」を算出
 */
function getBreakBoundaryBonus(leftToken: string, rightToken: string): number {
  if (/[。！？!?][　 ]*$/.test(leftToken)) return 18;
  if (/、[　 ]*$/.test(leftToken)) return 12;
  if (/[　 ]+$/.test(leftToken)) return 10;
  if (leftToken.endsWith('・・・・・・') && leftToken.length > 6) return 9;
  if (rightToken.startsWith('・・・・・・')) return 8;
  if (/(?:だが|けれど|けど|から|ので|のに|なら|たら|し|て|で)$/.test(leftToken)) {
    return 5;
  }
  return 0;
}

/**
 * 1つの段落（改行なし文字列）を、指定した1行最大幅（maxLineEm）以内で
 * 段落ち（1〜4文字の端数落ち・単語途中の分断）が起きないよう最適な文節位置で改行する
 */
export function wrapSingleParagraphJapanese(
  paragraph: string,
  maxLineEm: number
): string {
  const trimmed = paragraph.trim();
  if (!trimmed) return '';

  const totalEm = calcVisualEm(trimmed);
  // 1行に収まる場合は一切改行しない
  if (totalEm <= maxLineEm) {
    return trimmed;
  }

  const tokens = tokenizeJapaneseBunsetsu(trimmed);
  if (tokens.length <= 1) {
    return trimmed;
  }

  const targetLines = Math.max(2, Math.ceil(totalEm / (maxLineEm - 0.5)));

  // 2行に収まる場合：1行目と2行目のバランス＋句読点ボーナスが最大の分割点を選ぶ
  if (targetLines === 2 || totalEm <= maxLineEm * 2) {
    const hardCapEm = Math.max(maxLineEm, totalEm / 2 + 4.5);
    let bestSplitIdx = -1;
    let bestScore = -Infinity;

    for (let splitIdx = 1; splitIdx < tokens.length; splitIdx++) {
      const line1 = tokens.slice(0, splitIdx).join('').replace(/[　 ]+$/, '');
      const line2 = tokens.slice(splitIdx).join('').replace(/^[　 ]+/, '');
      const em1 = calcVisualEm(line1);
      const em2 = calcVisualEm(line2);

      if (em1 > hardCapEm || em2 > hardCapEm) continue;

      const orphanPenalty = em2 < 5.0 ? (5.0 - em2) * 16 : 0;
      const line1TooShortPenalty = em1 < 6.0 ? (6.0 - em1) * 14 : 0;

      const idealLine1Em = totalEm * 0.53;
      const balanceDiff = Math.abs(em1 - idealLine1Em);
      const boundaryBonus = getBreakBoundaryBonus(
        tokens[splitIdx - 1],
        tokens[splitIdx]
      );

      const score =
        boundaryBonus - balanceDiff * 1.35 - orphanPenalty - line1TooShortPenalty;
      if (score > bestScore) {
        bestScore = score;
        bestSplitIdx = splitIdx;
      }
    }

    if (bestSplitIdx !== -1) {
      const l1 = tokens.slice(0, bestSplitIdx).join('').replace(/[　 ]+$/, '');
      const l2 = tokens.slice(bestSplitIdx).join('').replace(/^[　 ]+/, '');
      return `${l1}\n${l2}`;
    }
  }

  // 3行以上になる場合：動的計画法（DP）で各行のバランスと文節区切りを最適化し、最終行の端数落ちを防ぐ
  const n = tokens.length;
  const lineLengthEm = (i: number, j: number): number => {
    const raw = tokens.slice(i, j).join('').replace(/^[　 ]+|[　 ]+$/g, '');
    return calcVisualEm(raw);
  };

  const idealEmPerLine = Math.min(maxLineEm - 1.5, totalEm / targetLines);
  const dp: number[] = new Array(n + 1).fill(-Infinity);
  const prevIdx: number[] = new Array(n + 1).fill(0);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] === -Infinity) continue;
      const em = lineLengthEm(j, i);
      if (em > maxLineEm + 1.5 && i > j + 1) continue;

      const isLastLine = i === n;
      let stepScore = 0;

      if (isLastLine) {
        if (em < 6.5) {
          stepScore -= (6.5 - em) * 18;
        }
        stepScore -= Math.abs(em - idealEmPerLine) * 0.9;
      } else {
        if (em < 8.0) {
          stepScore -= (8.0 - em) * 12;
        }
        stepScore -= Math.abs(em - idealEmPerLine) * 1.2;
        stepScore += getBreakBoundaryBonus(tokens[i - 1], tokens[i]);
      }

      if (em > maxLineEm) {
        stepScore -= (em - maxLineEm) * 25;
      }

      const candidate = dp[j] + stepScore;
      if (candidate > dp[i]) {
        dp[i] = candidate;
        prevIdx[i] = j;
      }
    }
  }

  const lines: string[] = [];
  let curr = n;
  while (curr > 0) {
    const p = prevIdx[curr];
    const lineStr = tokens
      .slice(p, curr)
      .join('')
      .replace(/^[　 ]+|[　 ]+$/g, '');
    lines.unshift(lineStr);
    curr = p;
  }

  return lines.join('\n');
}

/**
 * バグ・ノイズ音声（glitch, shout_glitch, tremble_glitch）用の文字化け＆デジタルノイズ付与
 * 文字自体が周期的にランダムに切り替わり、機械・光学・発声回路の不可逆な破損をリアルに表現する
 * ※厳密に1文字を1文字で置き換えるため、文字化けの前後で文字数・横幅が1pxも変化しません
 */
export function applyGlitchMojiBake(
  text: string,
  effect: BubbleVoiceEffect = 'normal',
  frame = 0
): string {
  if (
    effect !== 'glitch' &&
    effect !== 'shout_glitch' &&
    effect !== 'tremble_glitch'
  ) {
    return text;
  }

  // 全て全角1文字の厳密な等幅・置換専用グリッチグリフ群（文字の追加や横幅変化を完全防止）
  const NOISE_GLYPHS = [
    '■', '◆', '▲', '▼', '※', '░', '▒', '▓', '縺', '繧', 'ｽ', '縲', '█', '…', '・'
  ];

  const lines = text.split('\n');
  const processedLines = lines.map((line, lineIdx) => {
    let result = '';
    let dotStreak = 0;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const charCode = char.charCodeAt(0);
      const dynSeed = (charCode * 17 + i * 31 + lineIdx * 101 + frame) % NOISE_GLYPHS.length;

      if (char === '・') {
        dotStreak++;
        // 三点リーダーの特定位置（2点目、5点目等）で文字が1対1で動的に置き換わる
        if (dotStreak % 3 === 2) {
          result += NOISE_GLYPHS[dynSeed];
        } else {
          result += char;
        }
      } else {
        dotStreak = 0;
        // 厳密に1文字を1文字で置き換える（追加は一切行わず横幅を100%維持）
        if ((i * 13 + frame) % 31 === 0 && char !== ' ' && char !== '\t' && char !== '、' && char !== '。') {
          result += NOISE_GLYPHS[dynSeed];
        } else {
          result += char;
        }
      }
    }

    return result;
  });

  return processedLines.join('\n');
}

/**
 * 吹き出し（ガイ・アッシュのセリフ枠）用のテキスト整形
 * 声の大きさ（shout / normal / tremble）に応じた最適な1行文字数で美しい文節改行を行う
 */
export function formatBubbleText(
  text: string,
  effect: BubbleVoiceEffect = 'normal',
  frame = 0,
  enableMojiBake = true
): string {
  if (!text) return '';
  const isShout = effect === 'shout' || effect === 'shout_glitch';
  const isTremble = effect === 'tremble' || effect === 'tremble_glitch';

  const totalEm = calcVisualEm(text);
  const maxLineEm = isShout
    ? totalEm <= 44
      ? 22.0
      : 23.2
    : isTremble
      ? 30.0
      : totalEm <= 56.0
        ? 28.0
        : 26.8;

  // 常に元のテキストで文節・行分割を確定（文字化けの有無や切り替わりで横幅や改行位置が1ミリもブレない）
  const cleanWrapped = text
    .split('\n')
    .map((para) => wrapSingleParagraphJapanese(para, maxLineEm))
    .join('\n');

  if (!enableMojiBake) {
    return cleanWrapped;
  }

  return applyGlitchMojiBake(cleanWrapped, effect, frame);
}

/**
 * プロローグ・エンディング・端末INFO等の複数行テキスト用の段落ち防止整形
 */
export function formatParagraphText(text: string, maxLineEm = 31.5): string {
  if (!text) return '';
  return text
    .split('\n')
    .map((para) => wrapSingleParagraphJapanese(para, maxLineEm))
    .join('\n');
}
