import {
  AschQuestionReplyOption,
  BubbleVoiceEffect,
  EndingApproach,
  EndingDisposition,
  EndingTransitionConfig,
  ExpressionId,
  FaceParts,
} from '../types/game';

export interface ExtraEndingRally {
  speaker: 'GUY' | 'ASCH';
  text: string;
  expression?: ExpressionId;
  faceParts?: Partial<FaceParts>;
  secondExpression?: ExpressionId;
  secondFaceParts?: Partial<FaceParts>;
  voiceEffect?: BubbleVoiceEffect;
  specialEffect?: 'destroy' | 'collapse' | 'shout_shock';
  silentFaceSequence?: {
    delayMs: number;
    expression?: ExpressionId;
    faceParts?: Partial<FaceParts>;
  }[];
  waitMs?: number;
}

export interface DecisionDialogueStage {
  spokenText: string;
  aschText: string;
  expression: ExpressionId;
  faceParts: Partial<FaceParts>;
  secondExpression?: ExpressionId;
  secondFaceParts?: Partial<FaceParts>;
  voiceEffects?: BubbleVoiceEffect[];
  specialEffect?: 'destroy' | 'collapse' | 'shout_shock';
  guyWaitMs?: number;
  aschWaitMs?: number;
  endingTransition?: EndingTransitionConfig;
  extraRallies?: ExtraEndingRally[];
}

export interface EndingScenarioData {
  id: string;
  title: string;
  subtitle: string;
  dialogues: {
    speaker: 'GUY' | 'ASCH' | 'NARRATION';
    text: string;
  }[];
  summaryText: string;
}

export const FINAL_ASCH_QUESTION_LINE =
  '・・・・・・ガイ。一つ聞いてもいいか。\nおまえには、俺が何に見える？';

// Phase 3：終幕・存在への問い掛け（DP-002/003未解放ルート：END 05 / END 06 / END 07）
export const PHASE3_WHO_AM_I_OPTIONS: AschQuestionReplyOption[] = [
  // 【END 05（True）ルート：アッシュだと答える（通常時）】
  {
    id: 'p3_ans_asch',
    thoughtText: 'おまえはアッシュだ',
    forbidLinkTag: 'terminal_opened_many',
    spokenText: '・・・・・・おまえは、アッシュだよ',
    waitMs: 2600,
    aschText: '・・・・・・っ、こんな、譜業の体でもか',
    aschWaitMs: 2200,
    extraExchanges: [
      {
        speaker: 'GUY',
        text: '体が譜業でも何でも、おまえはおまえだろ。違うか？',
        waitMs: 2400,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'close',
          effects: [],
        },
        waitMs: 2400,
      },
      {
        speaker: 'ASCH',
        text: 'わ、わからない',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'frown',
          effects: [],
        },
        waitMs: 2000,
      },
      {
        speaker: 'GUY',
        text: 'ははっ、わからないことあるかよ？',
        waitMs: 1400,
      },
      {
        speaker: 'GUY',
        text: 'わかんないならいいじゃねえか。一旦アッシュってことで！',
        waitMs: 2200,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・',
        expression: 'normal',
        faceParts: {
          brow: 'doubt',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        waitMs: 2000,
      },
      {
        speaker: 'ASCH',
        text: 'ふっ',
        expression: 'normal',
        faceParts: {
          brow: 'smile',
          eyes: 'close',
          mouth: 'smile',
          effects: ['blush'],
        },
        waitMs: 1800,
      },
      {
        speaker: 'ASCH',
        text: '参考にする',
        expression: 'normal',
        faceParts: {
          brow: 'smile',
          eyes: 'smile',
          mouth: 'smile',
          effects: ['blush'],
        },
        waitMs: 2400,
      },
      {
        speaker: 'GUY',
        text: 'おいおい、聞いておいて参考にするだけか？',
        waitMs: 1800,
      },
      {
        speaker: 'ASCH',
        text: '俺はもう行く',
        expression: 'look_away',
        faceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        waitMs: 1600,
      },
      {
        speaker: 'GUY',
        text: '行くって、どこに',
        waitMs: 1600,
      },
      {
        speaker: 'ASCH',
        text: '研究所に帰るだけだ',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        waitMs: 2200,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・またな',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'normal',
          mouth: 'smile',
          effects: [],
        },
        waitMs: 3000,
      },
    ],
    expression: 'shock',
    faceParts: {
      brow: 'sad',
      eyes: 'wide',
      mouth: 'gasp',
      effects: ['sweat'],
    },
    moodDelta: 2,
    trustDelta: 2,
    completesTopic: true,
    triggersEndingKey: 'END_PHASE2_ASCH',
    endingTransition: {
      waitBeforeExitMs: 1400,
      aschAction: 'fade_out',
      footsteps: 'normal',
      footstepsCount: 3,
      doorAction: 'none',
      waitAfterDoorMs: 1800,
    },
  },

  // 【END 05（True）ルート：アッシュだと答える（※いっぱい端末を開いているときの差分）】
  {
    id: 'p3_ans_asch_terminal_many',
    thoughtText: 'おまえはアッシュだ',
    requireLinkTag: 'terminal_opened_many',
    spokenText: '・・・・・・おまえは、アッシュだよ',
    waitMs: 2600,
    aschText:
      '・・・・・・っ、こんな、譜業の体でもか。\nそれで、何もかも見えるんだろう？\nそんなのは、人間とは呼べないはずだ',
    aschWaitMs: 2400,
    extraExchanges: [
      {
        speaker: 'GUY',
        text: '怒ってる、か？　わ、悪かったって！　興味本位で覗いちまって・・・・・・',
        waitMs: 1800,
      },
      {
        speaker: 'GUY',
        text: 'そ、それよりだな\nおまえはおまえだろ。違うか？',
        waitMs: 2400,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'close',
          effects: [],
        },
        waitMs: 2400,
      },
      {
        speaker: 'ASCH',
        text: 'わ、わからない',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'frown',
          effects: [],
        },
        waitMs: 2000,
      },
      {
        speaker: 'GUY',
        text: 'ははっ、わからないことあるかよ？',
        waitMs: 1400,
      },
      {
        speaker: 'GUY',
        text: 'わかんないならいいじゃねえか。一旦アッシュってことで！',
        waitMs: 2200,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・',
        expression: 'normal',
        faceParts: {
          brow: 'doubt',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        waitMs: 2000,
      },
      {
        speaker: 'ASCH',
        text: 'ふっ',
        expression: 'normal',
        faceParts: {
          brow: 'smile',
          eyes: 'close',
          mouth: 'smile',
          effects: ['blush'],
        },
        waitMs: 1800,
      },
      {
        speaker: 'ASCH',
        text: '参考にする',
        expression: 'normal',
        faceParts: {
          brow: 'smile',
          eyes: 'smile',
          mouth: 'smile',
          effects: ['blush'],
        },
        waitMs: 2400,
      },
      {
        speaker: 'GUY',
        text: 'おいおい、聞いておいて参考にするだけか？',
        waitMs: 1800,
      },
      {
        speaker: 'ASCH',
        text: '俺はもう行く',
        expression: 'look_away',
        faceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        waitMs: 1600,
      },
      {
        speaker: 'GUY',
        text: '行くって、どこに',
        waitMs: 1600,
      },
      {
        speaker: 'ASCH',
        text: '研究所に帰るだけだ',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        waitMs: 2200,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・またな',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'normal',
          mouth: 'smile',
          effects: [],
        },
        waitMs: 3000,
      },
    ],
    expression: 'shock',
    faceParts: {
      brow: 'sad',
      eyes: 'wide',
      mouth: 'gasp',
      effects: ['sweat'],
    },
    secondExpression: 'look_away',
    secondFaceParts: {
      brow: 'sad',
      eyes: 'down',
      mouth: 'frown',
      effects: [],
    },
    moodDelta: 2,
    trustDelta: 2,
    completesTopic: true,
    triggersEndingKey: 'END_PHASE2_ASCH',
    endingTransition: {
      waitBeforeExitMs: 1400,
      aschAction: 'fade_out',
      footsteps: 'normal',
      footstepsCount: 3,
      doorAction: 'none',
      waitAfterDoorMs: 1800,
    },
  },

  // 【END 06ルート：譜業だと答える】
  {
    id: 'p3_ans_machine',
    thoughtText: '譜業人形にしか見えない',
    spokenText:
      '・・・・・・おまえが最初に言っていた通り\nおまえは譜業人形みたいだな',
    waitMs: 2600,
    aschText: '・・・・・・！！',
    aschWaitMs: 2200,
    voiceEffects: ['tremble'],
    expression: 'shock',
    faceParts: {
      brow: 'sad',
      eyes: 'wide',
      mouth: 'gasp',
      effects: ['pale', 'sweat'],
    },
    extraExchanges: [
      {
        speaker: 'ASCH',
        text: '・・・・・・最、初から、そう言っていれば良かったんだ',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'wide',
          mouth: 'smile',
          effects: ['pale'],
        },
        voiceEffect: 'tremble',
        waitMs: 2600,
      },
      {
        speaker: 'GUY',
        text: '悪いね。何でも自分で見て判断したいタチなんだ',
        waitMs: 1800,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・それで、気は済んだか',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        waitMs: 2200,
      },
      {
        speaker: 'GUY',
        text: 'ああ、・・・・・・もう、大丈夫だ',
        waitMs: 2000,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・そうか',
        expression: 'normal',
        faceParts: {
          brow: 'sad',
          eyes: 'close',
          mouth: 'close',
          effects: [],
        },
        waitMs: 2200,
      },
      {
        speaker: 'ASCH',
        text: 'なら、任務完了だ。ディストのところへ帰投する',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        waitMs: 2000,
      },
      {
        speaker: 'GUY',
        text: '・・・・・・アッシュ',
        waitMs: 2400,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・タルロウAだ。二度と間違えるな、ガイ・セシル',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'empty',
          mouth: 'close',
          effects: ['shadow'],
        },
        waitMs: 3200,
      },
    ],
    secondExpression: 'look_away',
    secondFaceParts: {
      brow: 'sad',
      eyes: 'down',
      mouth: 'frown',
      effects: ['pale', 'tears'],
    },
    completesTopic: true,
    triggersEndingKey: 'END_PHASE3_MACHINE',
    endingTransition: {
      waitBeforeExitMs: 1400,
      aschAction: 'fade_out',
      footsteps: 'fast',
      footstepsCount: 4,
      doorAction: 'none',
      waitAfterDoorMs: 2000,
    },
  },
];

// 【END 07ルート：何も答えない（一定秒数答えず待機）】
export const PHASE3_SILENT_TIMEOUT_OPTIONS: AschQuestionReplyOption[] = [
  {
    id: 'p3_silent_watch_back',
    thoughtText: '（一定秒数答えず待機）',
    spokenText: '・・・・・・',
    waitMs: 2400,
    aschText: '・・・・・・',
    aschWaitMs: 2000,
    expression: 'look_away',
    faceParts: {
      brow: 'sad',
      eyes: 'down',
      mouth: 'close',
      effects: ['shadow'],
    },
    extraExchanges: [
      {
        speaker: 'ASCH',
        text: '・・・・・・、いや。いい。なんでもない',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'close',
          effects: ['shadow'],
        },
        voiceEffect: 'normal',
        waitMs: 2000,
      },
      {
        speaker: 'ASCH',
        text: '変なことを聞いた。忘れてくれ',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'away',
          mouth: 'close',
          effects: ['shadow'],
        },
        waitMs: 2400,
      },
    ],
    completesTopic: true,
    triggersEndingKey: 'END_PHASE3_SILENCE',
    endingTransition: {
      waitBeforeExitMs: 1000,
      aschAction: 'fade_out',
      footsteps: 'slow',
      footstepsCount: 3,
      doorAction: 'none',
      waitAfterDoorMs: 1400,
    },
  },
];

// 『話を切り上げる』で終了した瞬間に流れる対話演出
export const FINAL_DECISION_STAGES: Record<string, DecisionDialogueStage> = {
  END_PHASE1_TARLOW: {
    spokenText:
      '・・・・・・ここまで言い張るなら、本当にそうなんだろうな。\n変に引き止めて悪かった',
    aschText:
      '・・・・・・ああ、そうだ。俺はただの自律譜業タルロウAだ。\n分かったなら、もう二度と俺に関わるな',
    expression: 'look_away',
    faceParts: {
      brow: 'normal',
      eyes: 'away',
      mouth: 'close',
      effects: [],
    },
    secondExpression: 'look_away',
    secondFaceParts: {
      brow: 'angry',
      eyes: 'glare',
      mouth: 'frown',
      effects: [],
    },
    voiceEffects: ['normal'],
    guyWaitMs: 1800,
    aschWaitMs: 1900,
    endingTransition: {
      waitBeforeExitMs: 800,
      aschAction: 'fade_out',
      footsteps: 'fast',
      footstepsCount: 4,
      doorAction: 'none',
      waitAfterDoorMs: 1100,
    },
  },
  END_PHASE2_INCOMPLETE: {
    spokenText:
      'あ、おい！\nまだ聞きたいことが',
    aschText:
      'フン！\nもう話は終わりだ。俺は研究所へ戻る！',
    expression: 'look_away',
    faceParts: {
      brow: 'angry',
      eyes: 'away',
      mouth: 'frown',
      effects: [],
    },
    secondExpression: 'glare',
    secondFaceParts: {
      brow: 'angry',
      eyes: 'glare',
      mouth: 'shout',
      effects: [],
    },
    voiceEffects: ['normal', 'shout'],
    guyWaitMs: 1600,
    aschWaitMs: 1800,
    endingTransition: {
      waitBeforeExitMs: 700,
      aschAction: 'fade_out',
      footsteps: 'fast',
      footstepsCount: 4,
      doorAction: 'none',
      waitAfterDoorMs: 1000,
      keepBgm: true,
    },
  },
  END_PHASE2_NORMAL_RETURN: {
    spokenText:
      '・・・・・・今日、おまえと話せてよかったよ。\nおまえの事情も分かったから、誰にも言わずにおく。気が向いたら、またいつでも顔を出せよ',
    aschText:
      '・・・・・・ああ。\n・・・・・・じゃあな、ガイ',
    expression: 'look_away',
    faceParts: {
      brow: 'normal',
      eyes: 'away',
      mouth: 'close',
      effects: [],
    },
    secondExpression: 'look_away',
    secondFaceParts: {
      brow: 'smile',
      eyes: 'away',
      mouth: 'close',
      effects: [],
    },
    voiceEffects: ['normal'],
    guyWaitMs: 1900,
    aschWaitMs: 2000,
    endingTransition: {
      waitBeforeExitMs: 800,
      aschAction: 'fade_out',
      footsteps: 'normal',
      footstepsCount: 3,
      doorAction: 'none',
      waitAfterDoorMs: 1200,
    },
  },
  END_PHASE2_ASCH: {
    spokenText:
      '・・・・・・今日、おまえと話せてよかったよ。\nおまえの事情も分かったから、誰にも言わずにおく。気が向いたら、またいつでも顔を出せよ',
    aschText:
      '・・・・・・ああ。\n・・・・・・じゃあな、ガイ',
    expression: 'look_away',
    faceParts: {
      brow: 'normal',
      eyes: 'away',
      mouth: 'close',
      effects: [],
    },
    secondExpression: 'look_away',
    secondFaceParts: {
      brow: 'smile',
      eyes: 'away',
      mouth: 'close',
      effects: [],
    },
    voiceEffects: ['normal'],
    guyWaitMs: 1900,
    aschWaitMs: 2000,
    endingTransition: {
      waitBeforeExitMs: 800,
      aschAction: 'fade_out',
      footsteps: 'normal',
      footstepsCount: 3,
      doorAction: 'none',
      waitAfterDoorMs: 1200,
    },
  },
  END_PHASE2_STAY_REST: {
    spokenText:
      '・・・・・・なあ。そんなに急いで戻ることもないだろ。\nそこのソファで、少し休んでいけよ',
    aschText:
      '・・・・・・ふん。くだらない。\n俺に休息など必要ない',
    expression: 'look_away',
    faceParts: {
      brow: 'angry',
      eyes: 'glare',
      mouth: 'frown',
      effects: [],
    },
    secondExpression: 'look_away',
    secondFaceParts: {
      brow: 'angry',
      eyes: 'glare',
      mouth: 'frown',
      effects: [],
    },
    voiceEffects: ['normal'],
    guyWaitMs: 1800,
    aschWaitMs: 2000,
    extraRallies: [
      {
        speaker: 'GUY',
        text: 'そう言うなって。\n少し横になるくらい、減るもんじゃないだろ',
        waitMs: 2000,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・言っておくが、寝るわけじゃないからな。\n・・・・・・少し、座るだけだ',
        expression: 'look_away',
        faceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'close',
          effects: ['blush'],
        },
        secondExpression: 'look_away',
        secondFaceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'close',
          effects: ['blush'],
        },
        voiceEffect: 'normal',
        waitMs: 2200,
      },
    ],
    endingTransition: {
      waitBeforeExitMs: 1200,
      aschAction: 'fade_out',
      footsteps: 'slow',
      footstepsCount: 3,
      doorAction: 'none',
      waitAfterDoorMs: 1400,
    },
  },
  END_PHASE2_STAY_REFUSED: {
    spokenText:
      '・・・・・・なあ、今すぐ急いで戻らなくてもいいだろ。そこのソファで少し休んでいけよ',
    aschText:
      '・・・・・・話はそれで終わりか？\n俺は研究所へ戻る',
    expression: 'look_away',
    faceParts: {
      brow: 'angry',
      eyes: 'glare',
      mouth: 'frown',
      effects: [],
    },
    secondExpression: 'look_away',
    secondFaceParts: {
      brow: 'angry',
      eyes: 'away',
      mouth: 'shout',
      effects: [],
    },
    voiceEffects: ['normal', 'shout'],
    guyWaitMs: 1800,
    aschWaitMs: 1800,
    endingTransition: {
      waitBeforeExitMs: 700,
      aschAction: 'fade_out',
      footsteps: 'fast',
      footstepsCount: 4,
      doorAction: 'none',
      waitAfterDoorMs: 1000,
      keepBgm: true,
    },
  },
  END_PHASE3_TOMORROW: {
    spokenText:
      '・・・・・・少し休んでいけよ。熱い茶でも淹れ直すからさ',
    aschText:
      '・・・・・・急に何を言い出すかと思えば。\n休息など必要ない',
    expression: 'look_away',
    faceParts: {
      brow: 'doubt',
      eyes: 'glare',
      mouth: 'frown',
      effects: [],
    },
    voiceEffects: ['normal'],
    guyWaitMs: 2200,
    aschWaitMs: 2000,
    extraRallies: [
      {
        speaker: 'GUY',
        text: 'そう言うなって。\nおまえとこうして茶を飲むのも、いつぶりか分かんねえしな。\n・・・・・・少しだけ、付き合えよ',
        waitMs: 2600,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・っ\n一杯だけだ。飲んだら帰るからな！',
        expression: 'look_away',
        faceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'close',
          effects: ['blush'],
        },
        secondExpression: 'look_away',
        secondFaceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'close',
          effects: ['blush'],
        },
        voiceEffect: 'normal',
        waitMs: 2200,
      },
      {
        speaker: 'GUY',
        text: 'ああ。・・・・・・すぐ淹れるよ',
        waitMs: 2000,
      },
    ],
    endingTransition: {
      waitBeforeExitMs: 1600,
      aschAction: 'stay',
      doorAction: 'none',
      waitAfterDoorMs: 1600,
      keepBgm: true,
    },
  },
  END_PHASE3_TOMORROW_PANIC: {
    spokenText:
      '・・・・・・待てよ！\nそんな息も絶え絶えな状態で、帰れるわけないだろ',
    aschText:
      '・・・・・・っ、ハァ・・・・・・放せ・・・・・・っ、俺は・・・・・・',
    expression: 'pain',
    faceParts: {
      brow: 'pain',
      eyes: 'away',
      mouth: 'grit',
      effects: ['sweat', 'noise'],
    },
    voiceEffects: ['tremble_glitch', 'tremble'],
    guyWaitMs: 1800,
    aschWaitMs: 2000,
    extraRallies: [
      {
        speaker: 'GUY',
        text: '頼むから、少し座って息を整えろ。\n・・・・・・熱い茶でも淹れ直すからさ',
        waitMs: 2200,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・っ。\n・・・・・・ハァ・・・・・・一杯だけだぞ・・・・・・っ',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'close',
          effects: ['sweat'],
        },
        secondExpression: 'look_away',
        secondFaceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'close',
          effects: ['sweat'],
        },
        voiceEffect: 'tremble',
        waitMs: 2200,
      },
    ],
    endingTransition: {
      waitBeforeExitMs: 1600,
      aschAction: 'none',
      doorAction: 'none',
      waitAfterDoorMs: 1400,
    },
  },
  END_PHASE3_TOMORROW_RETURN: {
    spokenText:
      '・・・・・・なあ、アッシュ',
    aschText:
      '・・・・・・？　なんだ。',
    expression: 'look_away',
    faceParts: {
      brow: 'doubt',
      eyes: 'glare',
      mouth: 'close',
      effects: [],
    },
    voiceEffects: ['normal'],
    guyWaitMs: 1800,
    aschWaitMs: 2000,
    extraRallies: [
      {
        speaker: 'GUY',
        text: '・・・・・・いや。\n夜道だ、気をつけて帰れよ',
        waitMs: 2400,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・ふん。子ども扱いするな。\n・・・・・・じゃあな、ガイ',
        expression: 'look_away',
        faceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        secondExpression: 'look_away',
        secondFaceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        voiceEffect: 'normal',
        waitMs: 2200,
      },
      {
        speaker: 'GUY',
        text: 'ああ。・・・・・・またな',
        waitMs: 1800,
      },
    ],
    endingTransition: {
      waitBeforeExitMs: 1100,
      aschAction: 'fade_out',
      footsteps: 'normal',
      footstepsCount: 4,
      doorAction: 'soft',
      waitAfterDoorMs: 1600,
    },
  },
  END_PHASE3_TOMORROW_RETURN_PANIC: {
    spokenText:
      '・・・・・・おい、本当に歩けるのか？\n無理するなよ・・・・・・',
    aschText:
      '・・・・・・っ、ハァ・・・・・・余計な、心配をするな・・・・・・っ',
    expression: 'pain',
    faceParts: {
      brow: 'pain',
      eyes: 'away',
      mouth: 'grit',
      effects: ['sweat'],
    },
    voiceEffects: ['tremble'],
    guyWaitMs: 1600,
    aschWaitMs: 1800,
    extraRallies: [
      {
        speaker: 'GUY',
        text: '・・・・・・何かあったら、すぐ呼べよ。\n・・・・・・気をつけてな',
        waitMs: 2000,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・ふん。・・・・・・言われなくても分かってる。\n・・・・・・じゃあな、ガイ',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        secondExpression: 'look_away',
        secondFaceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        voiceEffect: 'normal',
        waitMs: 2200,
      },
      {
        speaker: 'GUY',
        text: '・・・・・・ああ。またな',
        waitMs: 1600,
      },
    ],
    endingTransition: {
      waitBeforeExitMs: 1100,
      aschAction: 'fade_out',
      footsteps: 'normal',
      footstepsCount: 4,
      doorAction: 'none',
      waitAfterDoorMs: 1400,
    },
  },
  END_PHASE3_MERCY_DESTROY: {
    spokenText:
      '・・・・・・アッシュ。\n首の後ろ・・・・・・埃がついてるぞ。取ってやる',
    aschText:
      '？　・・・・・・何だ。\n・・・・・・っ、おい、気安く触るなと言って――',
    expression: 'normal',
    faceParts: {
      brow: 'doubt',
      eyes: 'away',
      mouth: 'close',
      effects: [],
    },
    secondExpression: 'glare',
    secondFaceParts: {
      brow: 'angry',
      eyes: 'glare',
      mouth: 'shout',
      effects: [],
    },
    specialEffect: 'destroy',
    guyWaitMs: 1900,
    aschWaitMs: 2200,
    extraRallies: [
      {
        speaker: 'ASCH',
        text: '・・・・・・っ、が・・・・・・イ・・・・・・？',
        expression: 'shock',
        faceParts: {
          brow: 'pain',
          eyes: 'wide',
          mouth: 'gasp',
          effects: ['sweat', 'pale'],
        },
        voiceEffect: 'tremble_glitch',
        waitMs: 1900,
      },
      {
        speaker: 'ASCH',
        text: 'な、にを・・・・・・し、て・・・・・・',
        expression: 'empty',
        faceParts: {
          brow: 'pain',
          eyes: 'empty',
          mouth: 'gasp',
          effects: ['shadow', 'tears'],
        },
        secondExpression: 'pain',
        secondFaceParts: {
          brow: 'sad',
          eyes: 'close',
          mouth: 'close',
          effects: ['shadow', 'tears'],
        },
        voiceEffect: 'tremble_glitch',
        waitMs: 2700,
        specialEffect: 'collapse',
      },
      {
        speaker: 'GUY',
        text: '・・・・・・',
        waitMs: 1600,
      },
      {
        speaker: 'GUY',
        text: 'これで・・・・・・',
        waitMs: 1800,
      },
      {
        speaker: 'GUY',
        text: '・・・・・・これで、いいんだ',
        waitMs: 2400,
      },
    ],
    endingTransition: {
      waitBeforeExitMs: 1800,
      aschAction: 'none',
      doorAction: 'none',
      waitAfterDoorMs: 1600,
    },
  },
  END_PHASE3_SWAMPMAN: {
    spokenText:
      '・・・・・・おまえ、本当に知らないのか？\n２ヶ月前に、自分が何で壊れたのかも・・・・・・',
    aschText: '・・・・・・っ、何の話だ。さっきから・・・・・・',
    expression: 'look_away',
    faceParts: {
      brow: 'doubt',
      eyes: 'away',
      mouth: 'close',
      effects: ['sweat'],
    },
    guyWaitMs: 2000,
    aschWaitMs: 2000,
    extraRallies: [
      {
        speaker: 'GUY',
        text: '・・・・・・見てくれ。嘘だって言ってくれよ、こんなの・・・・・・！',
        voiceEffect: 'tremble',
        waitMs: 2000,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・？\n・・・・・・っ！？ こ、れは・・・・・・',
        expression: 'shock',
        faceParts: {
          brow: 'sad',
          eyes: 'wide',
          mouth: 'gasp',
          effects: ['sweat', 'pale'],
        },
        waitMs: 2200,
      },
      {
        speaker: 'GUY',
        text: '本当なのか？ ここに書いてあることは、本当に・・・・・・！',
        voiceEffect: 'tremble',
        waitMs: 2000,
      },
      {
        speaker: 'ASCH',
        text: 'し、らない・・・・・・\n俺の記憶には、何も・・・・・・',
        expression: 'shock',
        faceParts: {
          brow: 'sad',
          eyes: 'wide',
          mouth: 'gasp',
          effects: ['sweat', 'pale'],
        },
        voiceEffect: 'tremble',
        waitMs: 2400,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・大爆発、・・・・・・そうだ、それで俺は、ディストに・・・・・・',
        expression: 'pain',
        faceParts: {
          brow: 'pain',
          eyes: 'pain',
          mouth: 'grit',
          effects: ['sweat', 'shadow'],
        },
        voiceEffect: 'tremble_glitch',
        waitMs: 2600,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・俺の身体に、ルークの記憶を・・・・・・',
        expression: 'pain',
        faceParts: {
          brow: 'pain',
          eyes: 'close',
          mouth: 'grit',
          effects: ['sweat', 'shadow'],
        },
        voiceEffect: 'tremble_glitch',
        waitMs: 2800,
      },
      {
        speaker: 'ASCH',
        text: 'そうだ、だから俺は、・・・・・・！',
        expression: 'shock',
        faceParts: {
          brow: 'pain',
          eyes: 'close',
          mouth: 'gasp',
          effects: ['sweat', 'pale', 'shadow'],
        },
        voiceEffect: 'tremble_glitch',
        waitMs: 2200,
      },
      {
        speaker: 'GUY',
        text: '・・・・・・アッシュ！',
        voiceEffect: 'tremble',
        waitMs: 1800,
      },
      {
        speaker: 'ASCH',
        text: 'っ、ガイ・・・・・・',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'away',
          mouth: 'gasp',
          effects: ['sweat'],
        },
        voiceEffect: 'tremble',
        waitMs: 1800,
      },
      {
        speaker: 'GUY',
        text: '・・・・・・っ、',
        voiceEffect: 'tremble',
        waitMs: 1200,
      },
      {
        speaker: 'GUY',
        text: 'やめろ・・・・・・っ、そんな顔すんなよ・・・・・・！',
        voiceEffect: 'tremble',
        waitMs: 2000,
      },
      {
        speaker: 'GUY',
        text: '言えよ・・・・・・！',
        voiceEffect: 'shout',
        waitMs: 1400,
      },
      {
        speaker: 'GUY',
        text: '自分は紛れもなく、アッシュだって・・・・・・言え！！！！',
        voiceEffect: 'shout',
        specialEffect: 'shout_shock',
        waitMs: 2400,
      },
      {
        speaker: 'GUY',
        text: '・・・・・・頼むから、',
        voiceEffect: 'tremble',
        waitMs: 1400,
      },
      {
        speaker: 'GUY',
        text: '言ってくれ・・・・・・っ',
        voiceEffect: 'tremble',
        silentFaceSequence: [
          {
            delayMs: 1400,
            expression: 'glare',
            faceParts: {
              brow: 'angry',
              eyes: 'glare',
              mouth: 'close',
              effects: [],
            },
          },
          {
            delayMs: 1600,
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'close',
              effects: [],
            },
          },
          {
            delayMs: 1600,
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'close',
              mouth: 'close',
              effects: [],
            },
          },
        ],
        waitMs: 800,
      },
      {
        speaker: 'ASCH',
        text: '・・・・・・そうだ。俺が、アッシュだ',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'close',
          mouth: 'close',
          effects: [],
        },
        voiceEffect: 'normal',
        waitMs: 2400,
      },
      {
        speaker: 'ASCH',
        text: '俺が――・・・・・・',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'close',
          effects: [],
        },
        voiceEffect: 'normal',
        waitMs: 3200,
      },
    ],
    endingTransition: {
      waitBeforeExitMs: 2400,
      aschAction: 'none',
      doorAction: 'none',
      waitAfterDoorMs: 1800,
    },
  },
};

export const resolveEndingKey = (
  disposition: EndingDisposition,
  approach: EndingApproach
): string => {
  if (disposition === 'DESTROY' || approach === 'MACHINE') {
    return 'END_PHASE3_SWAMPMAN';
  }
  if (approach === 'HATRED') {
    return 'END_PHASE1_TARLOW';
  }
  if (disposition === 'KEEP') {
    return 'END_PHASE2_STAY_REST';
  }
  return 'END_PHASE2_NORMAL_RETURN';
};

export const ENDING_SCENARIOS: Record<string, EndingScenarioData> = {
  // END 01：演技を見抜けずタルロウAのまま（ゲームオーバー扱い）
  END_PHASE1_TARLOW: {
    id: 'END_PHASE1_TARLOW',
    title: 'END 01 // たぶんタルロウA',
    subtitle: 'GAME OVER // SO HE SAYS',
    dialogues: [
      {
        speaker: 'GUY',
        text: 'どうやら、俺の思い違いだったようだ',
      },
      {
        speaker: 'GUY',
        text: 'ただの譜業にしちゃ、妙に態度が人間臭かった気もするけど・・・・・・\nまあ、気のせいか',
      },
    ],
    summaryText:
      '『俺はタルロウAだ』という演技を見抜けないまま対話を終えた。どこか人間くさい反応に引っかかりを覚えつつも、彼はそのままディストの研究所へと戻っていった',
  },

  // END 02：怒って帰られる（ゲームオーバー扱い）
  END_PHASE2_INCOMPLETE: {
    id: 'END_PHASE2_INCOMPLETE',
    title: 'END 02 // 怒って帰っちゃった',
    subtitle: 'GAME OVER // SLAMMED DOOR',
    dialogues: [
      {
        speaker: 'GUY',
        text: 'まいったな、すっかり臍を曲げられたまま帰られちまった',
      },
      {
        speaker: 'GUY',
        text: 'あんな風に突っ撥ねるところはどう見てもアッシュなんだけど・・・・・・\nもう少し落ち着いて話せばよかったな',
      },
    ],
    summaryText:
      'タルロウAの偽装を暴き、中身がアッシュ本人であることは確かめられたものの、怒らせて帰られてしまった',
  },

  // END_PHASE2_STAY_REFUSED：引き留め拒絶時（END 02扱い安全フォールバック）
  END_PHASE2_STAY_REFUSED: {
    id: 'END_PHASE2_INCOMPLETE',
    title: 'END 02 // 怒って帰っちゃった',
    subtitle: 'GAME OVER // SLAMMED DOOR',
    dialogues: [
      {
        speaker: 'GUY',
        text: 'まいったな、すっかり臍を曲げられたまま帰られちまった',
      },
      {
        speaker: 'GUY',
        text: 'あんな風に突っ撥ねるところはどう見てもアッシュなんだけど・・・・・・\nもう少し落ち着いて話せばよかったな',
      },
    ],
    summaryText:
      'タルロウAの偽装を暴き、中身がアッシュ本人であることは確かめられたものの、怒らせて帰られてしまった',
  },

  // END 03：深く話さず帰す（雑談エンド）
  END_PHASE2_NORMAL_RETURN: {
    id: 'END_PHASE2_NORMAL_RETURN',
    title: 'END 03 // また気が向いたら',
    subtitle: 'CASUAL END // SEE YOU AROUND',
    dialogues: [
      {
        speaker: 'GUY',
        text: '詳しい事情までは聞けなかったけど・・・・・・まあ、本人が言いたくないなら無理に暴くこともないか',
      },
      {
        speaker: 'GUY',
        text: 'せめてナタリアには会ってやりゃいいのに',
      },
    ],
    summaryText:
      '正体がアッシュであることを確かめ、穏やかに雑談を交わして送り出した。深い事情には踏み込まないまま、秘密の共有者として静かに見送った',
  },

  // END 04：深く話さず家に残す（雑談エンド）
  END_PHASE2_STAY_REST: {
    id: 'END_PHASE2_STAY_REST',
    title: 'END 04 // たまにはゆっくり',
    subtitle: 'CASUAL END // GOODNIGHT FOR NOW',
    dialogues: [
      {
        speaker: 'GUY',
        text: '相変わらず可愛げのない態度だけど、なんだかんだ堪えてるみたいだな・・・・・・',
      },
      {
        speaker: 'GUY',
        text: '休息は必要ないらしいが、子どもみたいにソファに丸まって横になっている',
      },
      {
        speaker: 'GUY',
        text: 'これは、「少し」じゃ済まないかもな',
      },
    ],
    summaryText:
      '無理に深い事情を問い詰めることも研究所へ送り返すこともせず、この部屋で休んでいくよう声をかけた。静かな部屋のソファで、彼は穏やかに目を閉じた',
  },

  // END 05：最後の問いかけ（DP-002/003なし）に「アッシュだ」と答える（True）
  END_PHASE2_ASCH: {
    id: 'END_PHASE2_ASCH',
    title: 'END 05 // 一旦そういうことで',
    subtitle: 'PHASE 3 END // ASCH FOR NOW',
    dialogues: [
      {
        speaker: 'GUY',
        text: '我ながら随分と適当なことを言ったもんだ',
      },
      {
        speaker: 'GUY',
        text: 'だけど、あいつの存在を証明するのに、これ以上の理屈なんて必要ない',
      },
      {
        speaker: 'GUY',
        text: '参考にもしてくれるらしいしな',
      },
    ],
    summaryText:
      '身体が譜業であっても「おまえはおまえだ、一旦アッシュってことで」と笑い飛ばした。これ以上の理屈など必要なく、「またな」と去っていく背中を穏やかに見送った',
  },

  // END 06：最後の問いかけ（DP-002/003なし）に「譜業だ」と答える
  END_PHASE3_MACHINE: {
    id: 'END_PHASE3_MACHINE',
    title: 'END 06 // そういうことにした',
    subtitle: 'PHASE 3 END // KIND ENOUGH TO LIE',
    dialogues: [
      {
        speaker: 'GUY',
        text: '扉が閉まる',
      },
      {
        speaker: 'GUY',
        text: 'あいつのしたいようにやらせてやるのが一番なんだ、と自分に言い聞かせる',
      },
      {
        speaker: 'GUY',
        text: '・・・・・・いや。そうすることしか、できなかった',
      },
    ],
    summaryText:
      '譜業人形だと告げられ、アッシュは「タルロウA」として去っていった。あいつのしたいようにやらせてやるのが一番なんだと自分に言い聞かせることしか、できなかった',
  },

  // END 07：最後の問いかけ（DP-002/003なし）に何も答えない
  END_PHASE3_SILENCE: {
    id: 'END_PHASE3_SILENCE',
    title: 'END 07 // 何も言えなかった',
    subtitle: 'PHASE 3 END // BETTER LEFT UNSAID',
    dialogues: [
      {
        speaker: 'GUY',
        text: 'そう言って、アッシュは部屋から出ていった',
      },
      {
        speaker: 'GUY',
        text: '翌日、研究所に出向いたが、奴の姿はなかった。\n残ったのは、この管理端末だけだ',
      },
    ],
    summaryText:
      '最後の問いかけに答えられないまま沈黙し、アッシュは部屋を出ていった。翌日研究所を訪ねたが彼の姿はなく、手元には管理端末だけが残された',
  },

  // END 08a：DP-002, DP-003を解放した上で、秘密を問い詰めず休ませる
  END_PHASE3_TOMORROW: {
    id: 'END_PHASE3_TOMORROW',
    title: 'END 08a // これで全部うまくいく',
    subtitle: 'SECRET END // LET IT BE UNSAID (TEA)',
    dialogues: [
      {
        speaker: 'GUY',
        text: '湯気を立てるケトルの向こうで、あいつが静かに座っている',
      },
      {
        speaker: 'GUY',
        text: '喉元まで出かけた真実は、全部俺が呑み込めばいい',
      },
      {
        speaker: 'GUY',
        text: '墓場まで持っていく秘密が、ひとつ増えただけの話だ',
      },
      {
        speaker: 'GUY',
        text: '――そうだ。それできっと、全部うまくいく',
      },
    ],
    summaryText:
      '肉体の秘密を知りながらも真実を口にせず、もう一杯の茶を淹れた。真実を胸の奥にしまい込み、あいつと生きる平穏な日常を守ることを選んだ',
  },

  // END 08b：DP-002, DP-003を解放した上で、秘密を問い詰めず見送る
  END_PHASE3_TOMORROW_RETURN: {
    id: 'END_PHASE3_TOMORROW_RETURN',
    title: 'END 08b // これで全部うまくいく',
    subtitle: 'SECRET END // LET IT BE UNSAID (FAREWELL)',
    dialogues: [
      {
        speaker: 'GUY',
        text: 'バチカルの日常と、あの子どもの身体で研究所へ戻るあいつ',
      },
      {
        speaker: 'GUY',
        text: 'どちらの真実も壊さないために、俺が全部呑み込めばいい',
      },
      {
        speaker: 'GUY',
        text: '墓場まで持っていく秘密が、ひとつ増えただけの話だ',
      },
      {
        speaker: 'GUY',
        text: '――そうだ。それできっと、全部うまくいく',
      },
    ],
    summaryText:
      '肉体の秘密を知りながらも真実を口にせず、研究所へ戻るあいつの背中を静かに見送った。バチカルの日常とあいつの日常、その両方を守るため、真実を胸の奥にしまい込むことを選んだ',
  },

  // END 09：DP-002, DP-003を解放した上で、問い詰めずに殺す
  END_PHASE3_MERCY_DESTROY: {
    id: 'END_PHASE3_MERCY_DESTROY',
    title: 'END 09 // これで全部元通り',
    subtitle: 'DEAD END // NOTHING HAPPENED HERE',
    dialogues: [
      {
        speaker: 'GUY',
        text: '床に横たわった、動かなくなった譜業を見下ろす',
      },
      {
        speaker: 'GUY',
        text: 'タタル渓谷へ帰ってきて、今バチカルで笑っているあいつは、これからもずっと『ルーク』だ',
      },
      {
        speaker: 'GUY',
        text: 'あとは、俺が今日のことを忘れてしまうだけでいい',
      },
      {
        speaker: 'GUY',
        text: 'そうだ。それできっと、全部うまくいく',
      },
    ],
    summaryText:
      '秘密を問い詰めることなく、動かなくなった機体をただ見下ろした。今バチカルにいるルークの日常を守るため、今日の記憶を自分だけの胸に葬り去った',
  },

  // END 10：DP-002, DP-003を解放した上で、秘密を問い詰める
  END_PHASE3_SWAMPMAN: {
    id: 'END_PHASE3_SWAMPMAN',
    title: 'END 10 // 魂の容れ物',
    subtitle: 'Ghost in the mASCHine',
    dialogues: [
      {
        speaker: 'GUY',
        text: 'きっとあいつは誰かに「アッシュ」だと\n認められたかったんだろう',
      },
      {
        speaker: 'GUY',
        text: 'それを、俺は、俺のためだけに\nあいつ自身に「アッシュ」だと言わせてしまった',
      },
      {
        speaker: 'GUY',
        text: '――あれからというもの、あいつは堂々としている',
      },
      {
        speaker: 'GUY',
        text: '先日、皆に会いに行ったようだ\nルークも、ナタリアも・・・・・・皆泣いて喜んだらしい',
      },
      {
        speaker: 'GUY',
        text: 'これでよかったんだ',
      },
      {
        speaker: 'GUY',
        text: '何度、自分にそう言い聞かせても\nあの記録の文字が、頭にこびりついて離れない',
      },
    ],
    summaryText:
      'きっとあいつは誰かに認められたかったはずなのに、ガイは自分のためだけにあいつ自身に「アッシュ」と言わせてしまった。皆が涙を流して再会を喜ぶ中、何度自分に言い聞かせても、脳裏からはあの記録の文字が離れなかった',
  },
};
