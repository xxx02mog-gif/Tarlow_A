import {
  AschQuestionReplyOption,
  BubbleVoiceEffect,
  EndingApproach,
  EndingDisposition,
  ExpressionId,
  FaceParts,
} from '../types/game';

export interface DecisionDialogueStage {
  spokenText: string;
  aschText: string;
  expression: ExpressionId;
  faceParts: Partial<FaceParts>;
  secondExpression?: ExpressionId;
  secondFaceParts?: Partial<FaceParts>;
  voiceEffects?: BubbleVoiceEffect[];
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
  '・・・・・・なあ、ガイ。最後に1つだけ聞かせろ。\n・・・・・・おまえから見て、今の俺は誰に見える？';

// Phase 3：終幕・存在への問い掛け（「・・・・・・おまえから見て、今の俺は誰に見える？」）に対する選択肢（1〜4）＋2往復目分岐
export const PHASE3_WHO_AM_I_OPTIONS: AschQuestionReplyOption[] = [
  // 【選択肢1】「アッシュだ」
  {
    id: 'p3_ans_asch',
    thoughtText: '「アッシュだ」',
    spokenText:
      '・・・・・・アッシュだ。身体がどんなだろうと、今俺の目の前にいるおまえは、紛れもなくアッシュだよ。',
    aschText:
      '・・・・・・こんな譜業の身体を見て、よくそんなことが言えるな。\n・・・・・・俺は3年前のエルドラントで死んだんだ。それでもおまえは、俺をアッシュだと呼ぶのか？',
    expression: 'shock',
    faceParts: {
      brow: 'sad',
      eyes: 'wide',
      mouth: 'gasp',
      effects: ['blush', 'sweat'],
    },
    secondExpression: 'look_away',
    secondFaceParts: {
      brow: 'sad',
      eyes: 'down',
      mouth: 'frown',
      effects: ['blush'],
    },
    moodDelta: 2,
    trustDelta: 2,
    followUpOptions: [
      {
        id: 'p3_ans_asch_2a',
        thoughtText: '「ああ。今日こうして話して、おまえ自身だと分かったからな」',
        spokenText:
          'ああ。今日こうして向き合って話してみて、他の誰でもないおまえ自身だと分かったからな。',
        aschText:
          '・・・・・・ふん、勝手にしろ。\n・・・・・・だが、まあ・・・・・・悪くはなかった。茶くらいなら、また飲みに来てやらなくもない。',
        expression: 'look_away',
        faceParts: {
          brow: 'normal',
          eyes: 'close',
          mouth: 'close',
          effects: ['blush'],
        },
        secondExpression: 'normal',
        secondFaceParts: {
          brow: 'smile',
          eyes: 'away',
          mouth: 'close',
          effects: ['blush'],
        },
        completesTopic: true,
        triggersEndingKey: 'END_PHASE2_ASCH',
      },
      {
        id: 'p3_ans_asch_2b',
        thoughtText: '「昔、屋敷でおまえの背中を睨んでいた俺が言うんだ。間違えるわけがないだろ」',
        spokenText:
          '昔、ファブレ邸でおまえの背中をずっと睨んでいた俺が言うんだ。おまえがアッシュかどうかくらい、俺が間違えるわけないだろ。',
        aschText:
          '・・・・・・ハッ、昔の俺を散々睨んでいたおまえが言うなら、間違いないんだろうな。\n・・・・・・今日のところは帰る。外の連中には黙っておけよ、ガイ。',
        expression: 'look_away',
        faceParts: {
          brow: 'smile',
          eyes: 'close',
          mouth: 'close',
          effects: ['blush'],
        },
        secondExpression: 'normal',
        secondFaceParts: {
          brow: 'smile',
          eyes: 'normal',
          mouth: 'close',
          effects: ['blush'],
        },
        completesTopic: true,
        triggersEndingKey: 'END_PHASE2_ASCH',
      },
    ],
  },

  // 【選択肢2（封印未解除時）】「・・・・・・ただの譜業だな」
  {
    id: 'p3_ans_machine',
    thoughtText: '「・・・・・・ただの譜業だな」',
    forbidLinkTag: 'climax_ready',
    spokenText:
      '・・・・・・ディストが造った、ただの自律譜業『タルロウA』だな。アッシュは3年前のエルドラントで死んだよ。',
    aschText:
      '・・・・・・そうか。最初からそう言っていれば、お互いに無駄な時間を過ごさずに済んだものを。\n・・・・・・それでいい。',
    expression: 'look_away',
    faceParts: {
      brow: 'sad',
      eyes: 'close',
      mouth: 'close',
      effects: [],
    },
    secondFaceParts: {
      brow: 'sad',
      eyes: 'down',
      mouth: 'close',
      effects: [],
    },
    followUpOptions: [
      {
        id: 'p3_ans_machine_2a',
        thoughtText: '「死んだアッシュのしがらみなんか背負わず、ただの譜業として気楽に稼働しろよ」',
        spokenText:
          '・・・・・・ああ。死んだアッシュのしがらみなんか背負わず、ただの譜業として気楽に稼働していろよ。',
        aschText:
          '・・・・・・余計なお世話だ。譜業に気楽もクソもあるか。\n・・・・・・研究所へ戻る。次に研究所へ来ても、二度と俺に構うなよ。',
        expression: 'look_away',
        faceParts: {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'frown',
          effects: [],
        },
        secondFaceParts: {
          brow: 'sad',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        completesTopic: true,
        triggersEndingKey: 'END_PHASE3_MACHINE',
      },
      {
        id: 'p3_ans_machine_2b',
        thoughtText: '「これ以上ここにいてもお互いになんの得にもならない。研究所へ戻れ」',
        spokenText:
          'これ以上ここにいても、お互いになんの得にもならないからな。ディストの研究所へ戻れよ。',
        aschText:
          '・・・・・・言われなくてもそうする。じゃあな、ガイ・セシル。',
        expression: 'look_away',
        faceParts: {
          brow: 'normal',
          eyes: 'close',
          mouth: 'close',
          effects: [],
        },
        completesTopic: true,
        triggersEndingKey: 'END_PHASE3_MACHINE',
      },
    ],
  },

  // 【選択肢2（最深部封印を同意なく暴いていた場合）】「・・・・・・ただの譜業だな」→ スワンプマンEND（END 04）へ
  {
    id: 'p3_ans_machine_swampman',
    thoughtText: '「・・・・・・ただの譜業だな」',
    requireLinkTag: 'climax_ready',
    spokenText:
      '・・・・・・ディストが造った、ただの譜業『タルロウA』だな。アッシュは3年前のエルドラントで死んだよ。',
    aschText:
      '・・・・・・そうか。おまえがそう言うなら、そうなんだろうな。\n・・・・・・道理で、目が覚めた時からずっと空っぽなわけだ。',
    expression: 'look_away',
    faceParts: {
      brow: 'sad',
      eyes: 'close',
      mouth: 'close',
      effects: ['pale'],
    },
    secondExpression: 'empty',
    secondFaceParts: {
      brow: 'sad',
      eyes: 'empty',
      mouth: 'close',
      effects: ['pale'],
    },
    voiceEffects: ['tremble'],
    followUpOptions: [
      {
        id: 'p3_ans_machine_swampman_2a',
        thoughtText: '「・・・・・・っ、待てよ。譜業の身体に記憶だけがあるおまえがアッシュじゃないなら・・・・・・」',
        spokenText:
          '・・・・・・っ、待てよ。もし譜業の身体に記憶だけがあるおまえを『アッシュじゃない』とするなら・・・・・・。',
        aschText:
          '・・・・・・もういい。俺は研究所へ戻る。二度と俺に構うな、ガイ。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'close',
          effects: ['pale'],
        },
        completesTopic: true,
        triggersEndingKey: 'END_PHASE3_SWAMPMAN',
      },
    ],
  },

  // 【選択肢3】「アッシュでも譜業でもない。今の、おまえだよ」
  {
    id: 'p3_ans_present_you',
    thoughtText: '「アッシュでも譜業でもない。今の、おまえだよ」',
    spokenText:
      '3年前に死んだアッシュそのものでもないし、ただの譜業でもない。・・・・・・今ここで俺と向き合っている『今のおまえ』だよ。',
    aschText:
      '・・・・・・『今の俺』だと？\n妙なことを言う奴だな。そんな中途半端な存在に、何の意味がある。',
    expression: 'shock',
    faceParts: {
      brow: 'doubt',
      eyes: 'wide',
      mouth: 'gasp',
      effects: [],
    },
    secondExpression: 'normal',
    secondFaceParts: {
      brow: 'doubt',
      eyes: 'away',
      mouth: 'frown',
      effects: [],
    },
    moodDelta: 1,
    trustDelta: 2,
    followUpOptions: [
      {
        id: 'p3_ans_present_2a',
        thoughtText: '「意味なんてこれから作ればいい。ルークだって自分の足で歩いたんだからな」',
        spokenText:
          '意味なんて、これから自分で作っていけばいいさ。ルークだって、そうやって自分の足で歩いたんだからな。',
        aschText:
          '・・・・・・あいつと一緒にするな。\n・・・・・・ふん、少しは考えておいてやる。また気が向いたら顔を出してやるから、茶でも用意しておけ。',
        expression: 'look_away',
        faceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'frown',
          effects: ['blush'],
        },
        secondFaceParts: {
          brow: 'smile',
          eyes: 'close',
          mouth: 'close',
          effects: ['blush'],
        },
        completesTopic: true,
        triggersEndingKey: 'END_PHASE3_NEW_SELF',
      },
      {
        id: 'p3_ans_present_2b',
        thoughtText: '「今こうして俺の部屋で向き合って憎まれ口を叩いている、それだけで十分だろ」',
        spokenText:
          '大層な意味なんてなくたっていいだろ。少なくとも、今こうして俺の部屋で向き合って憎まれ口を叩いている、それだけで十分じゃないか。',
        aschText:
          '・・・・・・どこまでも呑気な奴だな、おまえは。\n・・・・・・だが、まあ、そういうのも悪くはない。じゃあな、ガイ。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'close',
          mouth: 'close',
          effects: [],
        },
        secondExpression: 'normal',
        secondFaceParts: {
          brow: 'smile',
          eyes: 'normal',
          mouth: 'close',
          effects: ['blush'],
        },
        completesTopic: true,
        triggersEndingKey: 'END_PHASE3_NEW_SELF',
      },
    ],
  },

  // 【選択肢4】「腹が減ったな。・・・・・・明日、美味いもんでも食いに行くか」（部屋に泊まるEND 07）
  {
    id: 'p3_ans_tomorrow_meal',
    thoughtText: '「腹が減ったな。・・・・・・明日、美味いもんでも食いに行くか」',
    spokenText:
      '・・・・・・なんだか急に腹が減ったな。なあ、難しい話はもう終わりにして、明日あたり街で美味いもんでも食いに行くか？',
    aschText:
      '・・・・・・は？　おまえ、人が真面目に聞いている時に何の冗談だ！\nそれに、この譜業の身体で飯を食ったところで、腹の足しにもならんと知ってて言っているのか！',
    expression: 'shock',
    faceParts: {
      brow: 'doubt',
      eyes: 'wide',
      mouth: 'open',
      effects: ['blush', 'sweat'],
    },
    secondExpression: 'glare',
    secondFaceParts: {
      brow: 'angry',
      eyes: 'glare',
      mouth: 'grit',
      effects: ['blush', 'sweat'],
    },
    voiceEffects: ['shout', 'normal'],
    moodDelta: 2,
    trustDelta: 2,
    followUpOptions: [
      {
        id: 'p3_ans_tomorrow_2a',
        thoughtText: '「明日また連れ出すのも面倒だし、今夜はそこのソファを使っていけよ」',
        spokenText:
          '腹の足しにならなくたって、好物のチキンくらい味わえるだろ。明日また研究所から連れ出すのも面倒だし、今夜は帰らずにそこのソファを使っていけよ。',
        aschText:
          'なんで・・・・・・っ。\n・・・・・・チッ、まずい店だったら承知しないからな。',
        expression: 'shock',
        faceParts: {
          brow: 'sad',
          eyes: 'wide',
          mouth: 'gasp',
          effects: ['blush', 'sweat'],
        },
        secondExpression: 'look_away',
        secondFaceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'close',
          effects: ['blush'],
        },
        completesTopic: true,
        triggersEndingKey: 'END_PHASE3_TOMORROW',
      },
      {
        id: 'p3_ans_tomorrow_2b',
        thoughtText: '「答えなんて急がなくていい。今夜はこの部屋で休んでいけ」',
        spokenText:
          'おまえが誰なのかなんて、今夜急いで白黒つけなくてもいいってことさ。もう遅いし、今夜はこの部屋で休んでいけよ。',
        aschText:
          '・・・・・・やれやれ、おまえと話していると調子が狂う。\n・・・・・・分かったよ。そのくだらない問答の続きは、また明日にでもしてやる。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'close',
          mouth: 'close',
          effects: ['blush'],
        },
        secondExpression: 'normal',
        secondFaceParts: {
          brow: 'smile',
          eyes: 'away',
          mouth: 'close',
          effects: ['blush'],
        },
        completesTopic: true,
        triggersEndingKey: 'END_PHASE3_TOMORROW',
      },
    ],
  },
];

// 【選択肢5】無言（タイムアウト）発生後のガイの最終反応2択
export const PHASE3_SILENT_TIMEOUT_OPTIONS: AschQuestionReplyOption[] = [
  {
    id: 'p3_silent_watch_back',
    thoughtText: '呼び止めず、無言のまま小さな背中を見送る',
    spokenText: '・・・・・・。',
    aschText: '・・・・・・じゃあな、ガイ。',
    expression: 'look_away',
    faceParts: {
      brow: 'sad',
      eyes: 'close',
      mouth: 'close',
      effects: [],
    },
    completesTopic: true,
    triggersEndingKey: 'END_PHASE3_SILENCE',
  },
  {
    id: 'p3_silent_call_gently',
    thoughtText: '「すぐには言葉にできなくて悪かった。だけど、またいつでも来いよ」と声をかける',
    spokenText:
      '・・・・・・すぐには言葉にできなくて悪かった。だけど、ここはおまえを拒まないから、またいつでも来いよ。',
    aschText: '・・・・・・ふん。気が向いたらな。',
    expression: 'look_away',
    faceParts: {
      brow: 'smile',
      eyes: 'away',
      mouth: 'close',
      effects: ['blush'],
    },
    completesTopic: true,
    triggersEndingKey: 'END_PHASE3_SILENCE',
  },
];

// 『話を切り上げる』で終了した瞬間に流れる対話演出
export const FINAL_DECISION_STAGES: Record<string, DecisionDialogueStage> = {
  END_PHASE1_TARLOW: {
    spokenText:
      '・・・・・・そこまで『タルロウAだ』と言い張るなら、本当にただの譜業なんだろうな。\n変に引き止めて悪かったよ。研究所へ戻ってくれ。',
    aschText:
      '・・・・・・ああ、そうだ。俺はただの自律譜業タルロウAだ。\n分かったなら、もう二度と研究所から俺を連れ出すな。',
    expression: 'look_away',
    faceParts: {
      brow: 'normal',
      eyes: 'close',
      mouth: 'close',
      effects: [],
    },
    secondExpression: 'normal',
    secondFaceParts: {
      brow: 'normal',
      eyes: 'normal',
      mouth: 'close',
      effects: [],
    },
    voiceEffects: ['normal'],
  },
  END_PHASE2_INCOMPLETE: {
    spokenText:
      '・・・・・・もう少し話したかったんだけどね。',
    aschText:
      '・・・・・・。',
    expression: 'look_away',
    faceParts: {
      brow: 'angry',
      eyes: 'away',
      mouth: 'frown',
      effects: [],
    },
    voiceEffects: ['normal'],
  },
  END_PHASE2_ASCH: {
    spokenText:
      '・・・・・・今日、おまえと話せてよかったよ。\nおまえの気持ちは分かったから、誰にも言わずにおく。気が向いたら、またいつでも顔を出せよ。',
    aschText:
      '・・・・・・ディストの研究所がうるさくてかなわん時くらいは、考えてやらなくもない。\n・・・・・・じゃあな、ガイ。',
    expression: 'look_away',
    faceParts: {
      brow: 'angry',
      eyes: 'away',
      mouth: 'close',
      effects: ['blush'],
    },
    secondExpression: 'normal',
    secondFaceParts: {
      brow: 'smile',
      eyes: 'normal',
      mouth: 'close',
      effects: ['blush'],
    },
    voiceEffects: ['normal'],
  },
  END_PHASE2_STAY_REST: {
    spokenText:
      '・・・・・・なあ、今すぐ急いで戻らなくてもいいだろ。まだ時間も早いし、そこのソファで少し休んでいけよ。',
    aschText:
      '・・・・・・戻って早々、ディストの騒がしい相手をするよりはマシか。\n・・・・・・少しだけだぞ。',
    expression: 'look_away',
    faceParts: {
      brow: 'sad',
      eyes: 'close',
      mouth: 'close',
      effects: ['blush'],
    },
    secondFaceParts: {
      brow: 'angry',
      eyes: 'away',
      mouth: 'frown',
      effects: ['blush'],
    },
    voiceEffects: ['normal'],
  },
  END_PHASE2_STAY_REFUSED: {
    spokenText:
      '・・・・・・なあ、今すぐ急いで戻らなくてもいいだろ。まだ時間も早いし、そこのソファで少し休んでいけよ。',
    aschText:
      '・・・・・・話はそれで終わりか？\n俺は研究所へ戻る。',
    expression: 'look_away',
    faceParts: {
      brow: 'angry',
      eyes: 'glare',
      mouth: 'frown',
      effects: [],
    },
    secondExpression: 'look_away',
    secondFaceParts: {
      brow: 'sad',
      eyes: 'away',
      mouth: 'close',
      effects: [],
    },
    voiceEffects: ['normal'],
  },
  END_PHASE3_SWAMPMAN: {
    spokenText:
      '・・・・・・開けられるからって、全部開けて見るんじゃなかったな・・・・・・。',
    aschText:
      '・・・・・・道理で、目が覚めた時からずっと空っぽなわけだ・・・・・・。',
    expression: 'empty',
    faceParts: {
      brow: 'sad',
      eyes: 'empty',
      mouth: 'close',
      effects: ['pale', 'tears'],
    },
    voiceEffects: ['tremble_glitch'],
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
  if (approach === 'ACCOMPLICE') {
    return 'END_PHASE2_INCOMPLETE';
  }
  return 'END_PHASE2_ASCH';
};

export const ENDING_SCENARIOS: Record<string, EndingScenarioData> = {
  END_PHASE1_TARLOW: {
    id: 'END_PHASE1_TARLOW',
    title: 'END 01 // たぶんタルロウA',
    subtitle: 'PHASE 1 END // SO HE SAYS',
    dialogues: [
      {
        speaker: 'GUY',
        text: 'どうやら、俺の思い違いだったようだ。',
      },
      {
        speaker: 'GUY',
        text: 'ただの譜業にしちゃ、妙に態度が人間臭かった気もするけど・・・・・・\nまあ、気のせいか。',
      },
    ],
    summaryText:
      '『俺はタルロウAだ』という主張を崩せないまま対話を終えた。どこか人間くさい反応に引っかかりを覚えつつも、彼はそのままディストの研究所へと戻っていった。',
  },

  END_PHASE2_INCOMPLETE: {
    id: 'END_PHASE2_INCOMPLETE',
    title: 'END 02 // 怒って帰っちゃった',
    subtitle: 'PHASE 2 END // SLAMMED DOOR',
    dialogues: [
      {
        speaker: 'GUY',
        text: 'まいったな、すっかり臍を曲げられたまま帰られちまった。',
      },
      {
        speaker: 'GUY',
        text: 'あんな風に突っ撥ねるところはどう見てもアッシュなんだけど・・・・・・もう少し落ち着いて話せばよかったな。',
      },
    ],
    summaryText:
      'タルロウAの偽装を暴き、中身がアッシュ本人であることは確かめられたものの、彼がなぜ身を隠し続けるのかという本音には届かないまま別れることとなった。',
  },

  END_PHASE2_ASCH: {
    id: 'END_PHASE2_ASCH',
    title: 'END 03 // 中身はそのまま',
    subtitle: 'TRUE END // Ghost in the mASCHine',
    dialogues: [
      {
        speaker: 'GUY',
        text: '最後の最後まで素直じゃないな、あいつは。',
      },
      {
        speaker: 'GUY',
        text: '身体が譜業だろうと何だろうと・・・・・・俺には、昔から知ってるアッシュにしか見えなかった。',
      },
    ],
    summaryText:
      '対話を通じてアッシュの不器用な本音を受け止めた。身体が譜業であっても彼は確かにアッシュであり、穏やかな余韻と共に物語は幕を閉じた。',
  },

  END_PHASE2_STAY_REST: {
    id: 'END_PHASE2_STAY_REST',
    title: 'END 04 // たまにはゆっくり',
    subtitle: 'PHASE 2 END // GOODNIGHT FOR NOW',
    dialogues: [
      {
        speaker: 'GUY',
        text: '口ではあんなことを言ってたけど、やっぱり疲れてたんだろう。',
      },
      {
        speaker: 'GUY',
        text: '今日くらいはそのままゆっくり休めよ。',
      },
    ],
    summaryText:
      '無理にすべてを問い詰めることも研究所へ送り返すこともせず、この部屋で休んでいくよう声をかけた。静かな部屋のソファで、彼は穏やかに目を閉じた。',
  },

  END_PHASE3_SWAMPMAN: {
    id: 'END_PHASE3_SWAMPMAN',
    title: 'END 05 // つまり、そういうこと',
    subtitle: 'PHASE 3 END // NOBODY CAME HOME',
    dialogues: [
      {
        speaker: 'GUY',
        text: '譜業の身体にアッシュの記憶だけがあるものをアッシュじゃないとするなら、アッシュの身体にルークの記憶だけがあるものは・・・・・・？',
      },
      {
        speaker: 'GUY',
        text: '・・・・・・いや、よそう。何も、考えたくない。',
      },
    ],
    summaryText:
      '同意なく封印記録を暴いた上で、譜業の身体に記憶だけがある彼をアッシュではないと否定した。その瞬間、アッシュの身体にルークの記憶だけがある「帰ってきたルーク」の存在までもが揺らぎ、すべてを見失った。',
  },

  END_PHASE3_MACHINE: {
    id: 'END_PHASE3_MACHINE',
    title: 'END 06 // そういうことにした',
    subtitle: 'PHASE 3 END // KIND ENOUGH TO LIE',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・これでよかったんだ。',
      },
      {
        speaker: 'GUY',
        text: 'あいつはただの譜業で、アッシュは3年前に死んだ。・・・・・・そういうことにしておこう。',
      },
    ],
    summaryText:
      'アッシュからの最後の問いかけに対し、『ただの譜業だ』と答えて線を引いた。過去の苦しみから切り離すように、彼は二度と振り返ることなく研究所へと戻っていった。',
  },

  END_PHASE3_NEW_SELF: {
    id: 'END_PHASE3_NEW_SELF',
    title: 'END 07 // 誰でもないあなた',
    subtitle: 'PHASE 3 END // WALK ON YOUR OWN FEET',
    dialogues: [
      {
        speaker: 'GUY',
        text: '次にここへ顔を出した時、あいつがなんて名乗るかは分からない。',
      },
      {
        speaker: 'GUY',
        text: 'どうあれ、今のあいつとして生きていければいいんだが。',
      },
    ],
    summaryText:
      '過去の生前の姿にも譜業という枠にも縛られず、今ここで向き合っている彼自身を新たな存在として認めた。定義から解き放たれた彼は、どこか穏やかな足取りで帰っていった。',
  },

  END_PHASE3_TOMORROW: {
    id: 'END_PHASE3_TOMORROW',
    title: 'END 08 // とりあえず寝て、続きは明日',
    subtitle: 'PHASE 3 END // ROAST CHICKEN FOR TOMORROW',
    dialogues: [
      {
        speaker: 'GUY',
        text: 'さて、あいつに毛布でも出してやるか。',
      },
      {
        speaker: 'GUY',
        text: '難しい話の続きは、明日美味いもんでも食ってからで十分だろ。',
      },
    ],
    summaryText:
      '存在の定義に明確な答えを出さず、今夜はこの部屋で休んで明日も続いていく日常を選んだ。憎まれ口を叩き合いながら向き合う二人の時間は、これからも続いていく。',
  },

  END_PHASE3_SILENCE: {
    id: 'END_PHASE3_SILENCE',
    title: 'END 09 // 何も言えなかった',
    subtitle: 'PHASE 3 END // BETTER LEFT UNSAID',
    dialogues: [
      {
        speaker: 'GUY',
        text: 'そんなこと聞かれても、そう簡単に返せる訳ないだろ。',
      },
      {
        speaker: 'GUY',
        text: '・・・・・・次に顔を合わせる時までには、もう少しマシな答えを考えておかないとな。',
      },
    ],
    summaryText:
      '最後の問いかけに対し、言葉で定義することを選ばず沈黙を貫いた。白黒をつけないまま、互いの複雑な距離感を噛みしめる静かな幕切れとなった。',
  },

  END_PHASE3_MERCY_DESTROY: {
    id: 'END_PHASE3_MERCY_DESTROY',
    title: 'END 10 // これでぜんぶ元通り',
    subtitle: 'PHASE 2 END // NOTHING HAPPENED HERE',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・これでいい。こいつはアッシュなんかじゃない、最初からただの譜業だったんだ。',
      },
      {
        speaker: 'GUY',
        text: 'タタル渓谷へ帰ってきたあいつは、俺たちのルークだ。',
      },
    ],
    summaryText:
      '切り分けられた記憶を持つ彼が存在し続けることで、帰還したルークの存在までが揺らぐ恐怖に耐えきれず、目の前の機体を「ただの譜業」と言い聞かせて破壊した。すべてを無かったことにし、歪んだ安堵と共に部屋を後にした。',
  },
};
