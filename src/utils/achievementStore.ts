import { AschQuestionReplyOption } from '../types/game';
import {
  CONVERSATION_TOPICS,
  ENDING_SCENARIOS,
  FINAL_ASCH_QUESTION_LINE,
  FINAL_DECISION_STAGES,
  INITIAL_MEMORY_SECTORS,
  OPENING_ASCH_TEXT,
  PHASE1_TOPIC_SLIP_CONFIGS,
  PHASE3_SILENT_TIMEOUT_OPTIONS,
  PHASE3_WHO_AM_I_OPTIONS,
  TURN_MILESTONE_QUESTIONS,
} from '../data/prototypeScenario';

export const ACHIEVEMENT_STORAGE_KEY = 'gitm_achievement_save_v1';

export interface AchievementDefinition {
  id: string;
  numberLabel: string;
  title: string;
  description: string;
}

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  {
    id: 'ach_01',
    numberLabel: '01',
    title: '端末いらず',
    description: '一度も管理端末を開かずにエンディングまで到達した',
  },
  {
    id: 'ach_02',
    numberLabel: '02',
    title: 'なにをみてる？',
    description: '管理端末を何度も覗き込んで、上限回数まで怪しまれた',
  },
  {
    id: 'ach_03',
    numberLabel: '03',
    title: 'のぞき見厳禁',
    description: '端末の正体を明かしたあと、再び端末を開閉して牽制された',
  },
  {
    id: 'ach_04',
    numberLabel: '04',
    title: 'プライバシー保護',
    description: 'フェーズ2以降へ進み、強制解除を一度も使わずにエンディングを迎えた',
  },
  {
    id: 'ach_05',
    numberLabel: '05',
    title: 'やぶへび',
    description: 'ディストの管理者権限ロックを両方こじ開けた',
  },
  {
    id: 'ach_06',
    numberLabel: '06',
    title: 'ご機嫌取り',
    description: '1回のプレイ中にアッシュの機嫌を最大（上機嫌）まで上げた',
  },
  {
    id: 'ach_07',
    numberLabel: '07',
    title: '隠す気ある？',
    description: 'フェーズ1で最短（質問3回）でボロを見抜いて正体を認めさせた',
  },
  {
    id: 'ach_08',
    numberLabel: '08',
    title: '勘違いだったらしい',
    description: 'フェーズ1で的外れな指摘をして、あしらわれた',
  },
  {
    id: 'ach_09',
    numberLabel: '09',
    title: 'カンニング',
    description: 'フェーズ1で手元の端末の画面を本人に見せて正体を認めさせた',
  },
  {
    id: 'ach_10',
    numberLabel: '10',
    title: '目と目が合う',
    description: '機嫌が悪いアッシュに目が合った瞬間話しかけた',
  },
  {
    id: 'ach_11',
    numberLabel: '11',
    title: 'なでなでマスター',
    description: 'アッシュの頭を限界まで撫でた',
  },
  {
    id: 'ach_12',
    numberLabel: '12',
    title: 'ひとり反省会',
    description: '怒っているアッシュをそっとしておき、自分で落ち着く反応を見た',
  },
  {
    id: 'ach_13',
    numberLabel: '13',
    title: 'なんでもない',
    description: 'アッシュからの逆質問に答えず黙り続けて、質問を取り下げられた',
  },
  {
    id: 'ach_14',
    numberLabel: '14',
    title: '片手間',
    description: 'プレイ中に別タブ・別ウィンドウへ移動し、画面に戻ったときの反応を見た',
  },
  {
    id: 'ach_15',
    numberLabel: '15',
    title: 'なんて言おうか',
    description: '1回のプレイ中に選択肢の切り替え（迷い回数）が15回以上になった',
  },
  {
    id: 'ach_16',
    numberLabel: '16',
    title: '食い気味',
    description: '1回のプレイ中に2秒以内の即答を10回以上行った',
  },
  {
    id: 'ach_17',
    numberLabel: '17',
    title: '百面相',
    description: '累計でアッシュのすべての表情差分を見た',
  },
  {
    id: 'ach_18',
    numberLabel: '18',
    title: 'もう寝よう',
    description: '全10種類のエンディングと、90%以上のセリフを回収した',
  },
];

export interface EndingArchiveItem {
  key: string;
  numberLabel: string;
  hint: string;
}

export const ENDING_ARCHIVE_LIST: EndingArchiveItem[] = [
  {
    key: 'END_PHASE1_TARLOW',
    numberLabel: 'END 01',
    hint: '拙い嘘に騙されてあげよう',
  },
  {
    key: 'END_PHASE2_INCOMPLETE',
    numberLabel: 'END 02',
    hint: '機嫌を損ねるムーブを繰り返したら・・・',
  },
  {
    key: 'END_PHASE2_NORMAL_RETURN',
    numberLabel: 'END 03',
    hint: '詮索せずに、軽く雑談をしてから帰すと・・・',
  },
  {
    key: 'END_PHASE2_STAY_REST',
    numberLabel: 'END 04',
    hint: 'もう少し休んでいかないかと聞いてみよう',
  },
  {
    key: 'END_PHASE2_ASCH',
    numberLabel: 'END 05',
    hint: '彼の問いに迷わず彼の名前を呼ぶと吉',
  },
  {
    key: 'END_PHASE3_MACHINE',
    numberLabel: 'END 06',
    hint: '彼の問いに、あえて突き放そう',
  },
  {
    key: 'END_PHASE3_SILENCE',
    numberLabel: 'END 07',
    hint: '彼の問いに、言葉を見つけられずにいると・・・',
  },
  {
    key: 'END_PHASE3_TOMORROW',
    numberLabel: 'END 08',
    hint: '秘密を知っても、決して追及しないでおく',
  },
  {
    key: 'END_PHASE3_MERCY_DESTROY',
    numberLabel: 'END 09',
    hint: '■■する',
  },
  {
    key: 'END_PHASE3_SWAMPMAN',
    numberLabel: 'END 10',
    hint: '秘密を突きつけ、全てを明らかにしよう',
  },
];

export const NATURAL_UNLOCKABLE_SECTOR_IDS: string[] = INITIAL_MEMORY_SECTORS.filter(
  (s) => s.id !== 'SEC-00' && s.id !== 'SEC-19' && s.id !== 'SEC-20'
).map((s) => s.id);

// 方式B（エフェクト含む全パーツ制）：眉6種・目9種・口7種・エフェクト5種の計27パーツキー
export const ALL_FACE_PART_KEYS: string[] = [
  'brow:normal',
  'brow:angry',
  'brow:sad',
  'brow:smile',
  'brow:doubt',
  'brow:pain',
  'eyes:normal',
  'eyes:away',
  'eyes:close',
  'eyes:smile',
  'eyes:wide',
  'eyes:empty',
  'eyes:glare',
  'eyes:pain',
  'eyes:down',
  'mouth:close',
  'mouth:open',
  'mouth:shout',
  'mouth:smile',
  'mouth:grit',
  'mouth:frown',
  'mouth:gasp',
  'fx:sweat',
  'fx:pale',
  'fx:blush',
  'fx:shadow',
  'fx:tears',
];

// ゲーム内の全セリフ枠（方式B：選択肢分岐を含む全吹き出し行）のユニーク集合を構築
const buildCanonicalDialogueLines = (): Set<string> => {
  const set = new Set<string>();

  const addRawText = (raw?: string) => {
    if (!raw) return;
    raw
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((line) => set.add(line));
  };

  const walkOptions = (options?: AschQuestionReplyOption[]) => {
    if (!options) return;
    options.forEach((opt) => {
      addRawText(opt.spokenText);
      addRawText(opt.aschText);
      if (opt.followUpOptions) {
        walkOptions(opt.followUpOptions);
      }
    });
  };

  addRawText(OPENING_ASCH_TEXT);
  addRawText(FINAL_ASCH_QUESTION_LINE);

  Object.values(PHASE1_TOPIC_SLIP_CONFIGS).forEach((cfg) => {
    cfg.variants.forEach((v) => {
      addRawText(v.slipPrefixText);
      addRawText(v.slipCorrectedText);
      addRawText(v.guyPointOutSpoken);
    });
  });

  CONVERSATION_TOPICS.forEach((topic) => {
    topic.stages.forEach((stage) => {
      addRawText(stage.spokenText);
      addRawText(stage.aschText);
      addRawText(stage.retrySpokenText);
      addRawText(stage.retryAschText);
      addRawText(stage.badMoodResponse?.aschText);
      addRawText(stage.goodMoodResponse?.aschText);
      walkOptions(stage.replyOptions);
      if (stage.triggersAschQuestion) {
        walkOptions(stage.triggersAschQuestion.options);
      }
    });
  });

  TURN_MILESTONE_QUESTIONS.forEach((mq) => {
    addRawText(mq.questionLine);
    walkOptions(mq.question.options);
  });

  walkOptions(PHASE3_WHO_AM_I_OPTIONS);
  walkOptions(PHASE3_SILENT_TIMEOUT_OPTIONS);

  Object.values(FINAL_DECISION_STAGES).forEach((stage) => {
    addRawText(stage.spokenText);
    addRawText(stage.aschText);
  });

  Object.values(ENDING_SCENARIOS).forEach((end) => {
    end.dialogues.forEach((d) => addRawText(d.text));
  });

  return set;
};

export const ALL_CANONICAL_DIALOGUE_LINES: Set<string> =
  buildCanonicalDialogueLines();

export interface AchievementSaveData {
  seenLines: string[];
  seenFacePartKeys: string[];
  unlockedSectorIds: string[];
  naturalUnlockedSectorIds: string[];
  reachedEndingKeys: string[];
  unlockedAchievementIds: string[];
  showEndingHints: boolean;
}

export const createDefaultAchievementSave = (): AchievementSaveData => ({
  seenLines: [],
  seenFacePartKeys: [],
  unlockedSectorIds: ['SEC-00'],
  naturalUnlockedSectorIds: [],
  reachedEndingKeys: [],
  unlockedAchievementIds: [],
  showEndingHints: false,
});

export const sanitizeAchievementSave = (
  raw: Partial<AchievementSaveData> | null | undefined
): AchievementSaveData => {
  const base = createDefaultAchievementSave();
  if (!raw || typeof raw !== 'object') return base;

  const validSectorIds = new Set(INITIAL_MEMORY_SECTORS.map((s) => s.id));
  const validEndingKeys = new Set(Object.keys(ENDING_SCENARIOS));
  const validAchIds = new Set(ACHIEVEMENT_DEFINITIONS.map((a) => a.id));
  const validFacePartKeys = new Set(ALL_FACE_PART_KEYS);

  const seenLines = Array.isArray(raw.seenLines)
    ? Array.from(
        new Set(
          raw.seenLines.filter(
            (s): s is string =>
              typeof s === 'string' && ALL_CANONICAL_DIALOGUE_LINES.has(s)
          )
        )
      )
    : [];

  const seenFacePartKeys = Array.isArray(raw.seenFacePartKeys)
    ? Array.from(
        new Set(
          raw.seenFacePartKeys.filter(
            (k): k is string =>
              typeof k === 'string' && validFacePartKeys.has(k)
          )
        )
      )
    : [];

  const unlockedSectorIds = Array.from(
    new Set([
      'SEC-00',
      ...(Array.isArray(raw.unlockedSectorIds)
        ? raw.unlockedSectorIds.filter(
            (s): s is string => typeof s === 'string' && validSectorIds.has(s)
          )
        : []),
    ])
  );

  const naturalUnlockedSectorIds = Array.isArray(raw.naturalUnlockedSectorIds)
    ? Array.from(
        new Set(
          raw.naturalUnlockedSectorIds.filter(
            (s): s is string =>
              typeof s === 'string' &&
              NATURAL_UNLOCKABLE_SECTOR_IDS.includes(s)
          )
        )
      )
    : [];

  const reachedEndingKeys = Array.isArray(raw.reachedEndingKeys)
    ? Array.from(
        new Set(
          raw.reachedEndingKeys.filter(
            (s): s is string => typeof s === 'string' && validEndingKeys.has(s)
          )
        )
      )
    : [];

  const unlockedAchievementIds = Array.isArray(raw.unlockedAchievementIds)
    ? Array.from(
        new Set(
          raw.unlockedAchievementIds.filter(
            (s): s is string => typeof s === 'string' && validAchIds.has(s)
          )
        )
      )
    : [];

  const showEndingHints = Boolean(raw.showEndingHints);

  const next: AchievementSaveData = {
    seenLines,
    seenFacePartKeys,
    unlockedSectorIds,
    naturalUnlockedSectorIds,
    reachedEndingKeys,
    unlockedAchievementIds,
    showEndingHints,
  };

  return evaluateMilestoneAchievements(next);
};

// 累計系実績（17: 百面相 / 18: もう寝よう）の自動再計算
export const evaluateMilestoneAchievements = (
  data: AchievementSaveData
): AchievementSaveData => {
  const achSet = new Set(data.unlockedAchievementIds);

  // 17: 累計でアッシュのすべての表情差分（眉・目・口・エフェクト全28パーツ）を見た
  if (
    ALL_FACE_PART_KEYS.every((key) =>
      data.seenFacePartKeys.includes(key)
    )
  ) {
    achSet.add('ach_17');
  }

  // 18: 全10種類のエンディング ＆ セリフ回収率90%以上
  const totalCanonical = Math.max(1, ALL_CANONICAL_DIALOGUE_LINES.size);
  const lineRate = data.seenLines.length / totalCanonical;
  if (
    data.reachedEndingKeys.length >= ENDING_ARCHIVE_LIST.length &&
    lineRate >= 0.9
  ) {
    achSet.add('ach_18');
  }

  if (achSet.size === data.unlockedAchievementIds.length) {
    return data;
  }

  return {
    ...data,
    unlockedAchievementIds: Array.from(achSet),
  };
};

export const loadAchievementSave = (): AchievementSaveData => {
  try {
    const rawStr = localStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
    if (!rawStr) return createDefaultAchievementSave();
    const parsed = JSON.parse(rawStr);
    return sanitizeAchievementSave(parsed);
  } catch {
    return createDefaultAchievementSave();
  }
};

export const persistAchievementSave = (data: AchievementSaveData): void => {
  try {
    localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage quota errors
  }
};

export const encodeAchievementBackupCode = (
  data: AchievementSaveData
): string => {
  const json = JSON.stringify({
    v: 1,
    s: data.seenLines,
    f: data.seenFacePartKeys,
    u: data.unlockedSectorIds,
    n: data.naturalUnlockedSectorIds,
    e: data.reachedEndingKeys,
    a: data.unlockedAchievementIds,
  });
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return `GITM1:${btoa(binary)}`;
};

export const decodeAchievementBackupCode = (
  code: string
): AchievementSaveData | null => {
  try {
    const trimmed = code.trim();
    const base64Part = trimmed.startsWith('GITM1:')
      ? trimmed.slice(6).trim()
      : trimmed;
    const binary = atob(base64Part);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr);
    if (parsed && typeof parsed === 'object') {
      return sanitizeAchievementSave({
        seenLines: parsed.s ?? parsed.seenLines,
        seenFacePartKeys: parsed.f ?? parsed.seenFacePartKeys,
        unlockedSectorIds: parsed.u ?? parsed.unlockedSectorIds,
        naturalUnlockedSectorIds: parsed.n ?? parsed.naturalUnlockedSectorIds,
        reachedEndingKeys: parsed.e ?? parsed.reachedEndingKeys,
        unlockedAchievementIds: parsed.a ?? parsed.unlockedAchievementIds,
      });
    }
    return null;
  } catch {
    return null;
  }
};
