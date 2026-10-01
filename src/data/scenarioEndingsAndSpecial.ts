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
      '・・・・・・っ、馬鹿か貴様は。こんな不格好な機械の身体を見て、よくそんなことが言えるな。\n・・・・・・本物の俺は、3年前のエルドラントでもう死んだんだ。それでもおまえは、俺をアッシュだと呼ぶ気か？',
    expression: 'look_away',
    faceParts: {
      brow: 'sad',
      eyes: 'away',
      mouth: 'frown',
      effects: ['blush', 'sweat'],
    },
    moodDelta: 2,
    trustDelta: 2,
    followUpOptions: [
      {
        id: 'p3_ans_asch_2a',
        thoughtText: '「ああ、何度でも呼ぶさ。その不器用さもプライドも、おまえ自身のものだからな」',
        spokenText:
          'ああ、何度でも呼ぶさ。その不器用さもプライドの高さも、他の誰でもないおまえ自身のものだからな。',
        aschText:
          '・・・・・・ふん、勝手にしろ。おまえのそういうお人好しなところは、昔から本当に虫酸が走る。\n・・・・・・だが、まあ・・・・・・悪くはなかった。茶くらいなら、また飲みに来てやらなくもない。じゃあな、ガイ。',
        expression: 'normal',
        faceParts: {
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
          eyes: 'away',
          mouth: 'close',
          effects: ['blush'],
        },
        completesTopic: true,
        triggersEndingKey: 'END_PHASE2_ASCH',
      },
    ],
  },

  // 【選択肢2（封印未解除時）】「・・・・・・ただの機械（タルロウA）だな」
  {
    id: 'p3_ans_machine',
    thoughtText: '「・・・・・・ただの機械（タルロウA）だな」',
    forbidLinkTag: 'climax_ready',
    spokenText:
      '・・・・・・ディストが造った、ただの自律型機体『タルロウA』だな。アッシュは3年前のエルドラントで死んだよ。',
    aschText:
      '・・・・・・そうか。最初からそう言っていれば、お互いに無駄な時間を過ごさずに済んだものを。\n・・・・・・それでいい。',
    expression: 'look_away',
    faceParts: {
      brow: 'sad',
      eyes: 'down',
      mouth: 'close',
      effects: [],
    },
    followUpOptions: [
      {
        id: 'p3_ans_machine_2a',
        thoughtText: '「死んだアッシュのしがらみなんか背負わず、ただの機械として気楽に稼働しろよ」',
        spokenText:
          '・・・・・・ああ。死んだアッシュのしがらみなんか背負わず、ただの機械として気楽に稼働していろよ。',
        aschText:
          '・・・・・・余計なお世話だ。機械に気楽もクソもあるか。\n・・・・・・研究所へ戻る。次に研究所へ来ても、二度と俺に構うなよ。',
        expression: 'look_away',
        faceParts: {
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
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        completesTopic: true,
        triggersEndingKey: 'END_PHASE3_MACHINE',
      },
    ],
  },

  // 【選択肢2（最深部封印を同意なく暴いていた場合）】「・・・・・・ただの機械（タルロウA）だな」→ スワンプマンEND（END 04）へ
  {
    id: 'p3_ans_machine_swampman',
    thoughtText: '「・・・・・・ただの機械（タルロウA）だな」',
    requireLinkTag: 'climax_ready',
    spokenText:
      '・・・・・・ディストが造った、ただの機械『タルロウA』だな。アッシュは3年前のエルドラントで死んだよ。',
    aschText:
      '・・・・・・そうか。おまえがそう言うなら、そうなんだろうな。\n・・・・・・道理で、目が覚めた時からずっと空っぽなわけだ。',
    expression: 'empty',
    faceParts: {
      brow: 'sad',
      eyes: 'empty',
      mouth: 'close',
      effects: ['pale'],
    },
    voiceEffects: ['tremble'],
    followUpOptions: [
      {
        id: 'p3_ans_machine_swampman_2a',
        thoughtText: '「・・・・・・っ、待てよ。機械の身体に記憶だけがあるおまえがアッシュじゃないなら・・・・・・」',
        spokenText:
          '・・・・・・っ、待てよ。もし機械の身体に記憶だけがあるおまえを『アッシュじゃない』とするなら・・・・・・。',
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

  // 【選択肢3】「アッシュでも機械でもない。今の、おまえだよ」
  {
    id: 'p3_ans_present_you',
    thoughtText: '「アッシュでも機械でもない。今の、おまえだよ」',
    spokenText:
      '3年前に死んだアッシュそのものでもないし、ただの機械でもない。・・・・・・今ここで俺と向き合っている『今のおまえ』だよ。',
    aschText:
      '・・・・・・『今の俺』だと？\n妙なことを言う奴だな。そんな中途半端な存在に、何の意味がある。',
    expression: 'normal',
    faceParts: {
      brow: 'doubt',
      eyes: 'normal',
      mouth: 'close',
      effects: [],
    },
    moodDelta: 1,
    trustDelta: 2,
    followUpOptions: [
      {
        id: 'p3_ans_present_2a',
        thoughtText: '「意味なんてこれから作ればいい。ルークだって自分の足で歩いたんだからな」',
        spokenText:
          '意味なんて、これから自分で作っていけばいいさ。かつてレプリカとして生まれたルークだって、おまえの影じゃなく、あいつ自身の足で歩いたんだからな。',
        aschText:
          '・・・・・・っ！　・・・・・・あいつと一緒にするな。\n・・・・・・ふん、少しは考えておいてやる。また気が向いたら顔を出してやるから、茶でも用意しておけ。',
        expression: 'look_away',
        faceParts: {
          brow: 'smile',
          eyes: 'away',
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
        expression: 'normal',
        faceParts: {
          brow: 'smile',
          eyes: 'away',
          mouth: 'close',
          effects: [],
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
      '・・・・・・は？　貴様、人が真面目に聞いている時に何の冗談だ！\nそれに、この機械の身体に食事機能などついていないと知ってて言っているのか！',
    expression: 'glare',
    faceParts: {
      brow: 'angry',
      eyes: 'glare',
      mouth: 'shout',
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
          'おまえは隣で茶でも飲んでればいいさ。明日また研究所から連れ出すのも面倒だし、今夜は帰らずにそこのソファを使っていけよ。',
        aschText:
          '・・・・・・っ、なんで俺が貴様の部屋に泊まらなければならんのだ！\n・・・・・・チッ、勝手にしろ。明日の茶葉がまずかったら承知しないからな。',
        expression: 'look_away',
        faceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'frown',
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
        expression: 'normal',
        faceParts: {
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
      eyes: 'down',
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
      brow: 'sad',
      eyes: 'away',
      mouth: 'close',
      effects: [],
    },
    completesTopic: true,
    triggersEndingKey: 'END_PHASE3_SILENCE',
  },
];

// 『話を切り上げる』で終了した瞬間に流れる対話演出
export const FINAL_DECISION_STAGES: Record<string, DecisionDialogueStage> = {
  END_PHASE1_TARLOW: {
    spokenText:
      '・・・・・・まあ、おまえがそこまで『自分はタルロウAだ』と言い張るし、予備機体の話も筋が通っているなら、本当にディストが造った機械なんだろうな。引き止めて悪かった、研究所へ戻っていいよ。',
    aschText:
      '・・・・・・ああ、そうだ。俺はただの自律機械タルロウAだ。\n分かったなら、もう二度と研究所から俺を連れ出すな。',
    expression: 'look_away',
    faceParts: {
      brow: 'normal',
      eyes: 'away',
      mouth: 'close',
      effects: [],
    },
    voiceEffects: ['normal'],
  },
  END_PHASE2_INCOMPLETE: {
    spokenText:
      '・・・・・・せっかく正体が分かったんだしもう少し話したかったけど、そこまで帰りたがるなら無理には引き止めないよ。',
    aschText:
      '・・・・・・ふん、最初からそうしろ。\n俺がここにいたことは、外の連中には黙っておけよ。じゃあな、ガイ。',
    expression: 'look_away',
    faceParts: {
      brow: 'normal',
      eyes: 'away',
      mouth: 'close',
      effects: [],
    },
    voiceEffects: ['normal'],
  },
  END_PHASE2_ASCH: {
    spokenText:
      '・・・・・・相変わらず素直じゃないし、不器用な奴だな。だけど、今日おまえと話せてよかったよ。\nおまえの気持ちは分かったから、誰にも言わずにおく。気が向いたら、またいつでも顔を出せよ。',
    aschText:
      '・・・・・・ふん、誰が来るか。・・・・・・まあ、あの変態の研究所がうるさくて仕方がない時くらいは、考えてやらなくもない。\n・・・・・・じゃあな、ガイ。',
    expression: 'normal',
    faceParts: {
      brow: 'smile',
      eyes: 'away',
      mouth: 'close',
      effects: ['blush'],
    },
    voiceEffects: ['normal'],
  },
  END_PHASE2_STAY_REST: {
    spokenText:
      '・・・・・・なあ、無理に今すぐディストの研究所へ戻らなくてもいいんじゃないか？　あの騒がしい研究室より、この部屋のソファで少し休んでいけよ。',
    aschText:
      '・・・・・・ふん。おまえの部屋に居座る義理などないが・・・・・・あの変態の自慢話を聞かされるよりはマシか。\n少しだけ休止モードに入るだけだ、勘違いするなよ。',
    expression: 'look_away',
    faceParts: {
      brow: 'normal',
      eyes: 'away',
      mouth: 'close',
      effects: ['blush'],
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
    title: 'END 01 // タルロウAらしい・・・・・・',
    subtitle: 'PHASE 1 END // UNIDENTIFIED MACHINE',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・本人があそこまで『タルロウAだ』と言い張るなら、本当にただの機械だったのかもしれないな。',
      },
      {
        speaker: 'GUY',
        text: '・・・・・・しかし、タルロウシリーズに耳まで赤くして怒鳴る機能なんてついていたっけな・・・・・・？',
      },
    ],
    summaryText:
      '『俺はタルロウAだ』という主張を崩せないまま対話を終えた。どこか人間くさい反応に引っかかりを覚えつつも、彼はそのままディストの研究所へと戻っていった。',
  },

  END_PHASE2_INCOMPLETE: {
    id: 'END_PHASE2_INCOMPLETE',
    title: 'END 02 // すれ違いの帰還',
    subtitle: 'PHASE 2 NORMAL END // UNSPOKEN REASON',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・憎まれ口を叩いて帰っていくあの背中は、紛れもなく俺の知っているアッシュだった。',
      },
      {
        speaker: 'GUY',
        text: 'どうしてあいつがあんな研究所に身を隠しているのか、もう少し落ち着かせてから聞けばよかったな・・・・・・。',
      },
    ],
    summaryText:
      'タルロウAの偽装を暴き、中身がアッシュ本人であることは確かめられたものの、彼がなぜ身を隠し続けるのかという本音には届かないまま別れることとなった。',
  },

  END_PHASE2_ASCH: {
    id: 'END_PHASE2_ASCH',
    title: 'END 03 // アッシュだったなあ',
    subtitle: 'PHASE 2 TRUE END // UNCHANGED PRIDE',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・機械の身体だろうが何だろうが、あの不器用さもプライドの高さも、間違いなくあいつはアッシュだったなあ。',
      },
    ],
    summaryText:
      '対話を通じてアッシュの不器用な本音を受け止めた。身体が機械であっても彼は確かにアッシュであり、穏やかな余韻と共に物語は幕を閉じた。',
  },

  END_PHASE2_STAY_REST: {
    id: 'END_PHASE2_STAY_REST',
    title: 'END 03-B // 静かな部屋での休息',
    subtitle: 'PHASE 2 REST END // QUIET SANCTUARY',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・ディストの研究所へ戻らない時間も、たまには悪くないだろ。',
      },
      {
        speaker: 'GUY',
        text: '自分が何者かなんて答えは急がず、今夜はそのままゆっくり休めよ。',
      },
    ],
    summaryText:
      '無理にすべてを問い詰めることも研究所へ送り返すこともせず、この部屋で休んでいくよう声をかけた。静かな部屋のソファで、彼は穏やかに目を閉じた。',
  },

  END_PHASE3_SWAMPMAN: {
    id: 'END_PHASE3_SWAMPMAN',
    title: 'END 04 // アッシュじゃないし、ついでにルークもルークじゃない',
    subtitle: 'PHASE 3 HIDDEN END // SWAMPMAN PARADOX',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・機械の身体にアッシュの記憶だけがあるものをアッシュじゃないとするなら、アッシュの身体にルークの記憶だけがあるものは、ルークじゃない・・・・・・。',
      },
      {
        speaker: 'GUY',
        text: '1年前にタタル渓谷へ戻ってきたあいつを、俺はこれからどんな目で見ていけばいいんだ・・・・・・。',
      },
    ],
    summaryText:
      '同意なく封印記録を暴いた上で、機械の身体に記憶だけがある彼をアッシュではないと否定した。その瞬間、アッシュの身体にルークの記憶だけがある「帰ってきたルーク」の存在までもが揺らぎ、すべてを見失った。',
  },

  END_PHASE3_MACHINE: {
    id: 'END_PHASE3_MACHINE',
    title: 'END 05 // ただの機械（タルロウA）として',
    subtitle: 'PHASE 3 END // MERCIFUL SEVERANCE',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・これでよかったんだよな。',
      },
      {
        speaker: 'GUY',
        text: '生前のアッシュの苦しみまで、あの小さな機械の身体に背負わせる必要なんてないんだからな・・・・・・。',
      },
    ],
    summaryText:
      'アッシュからの最後の問いかけに対し、『ただの機械（タルロウA）だ』と答えて線を引いた。過去の苦しみから切り離すように、彼は二度と振り返ることなく研究所へと戻っていった。',
  },

  END_PHASE3_NEW_SELF: {
    id: 'END_PHASE3_NEW_SELF',
    title: 'END 06 // アッシュでも機械でもない、今のおまえ',
    subtitle: 'PHASE 3 END // A NEW EXISTENCE',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・3年前に死んだアッシュと比べる必要も、機械だと卑下する必要もない。',
      },
      {
        speaker: 'GUY',
        text: 'あいつがこれからどう生きるかは、今のあいつ自身が決めることだからな。',
      },
    ],
    summaryText:
      '過去の生前の姿にも機械という枠にも縛られず、今ここで向き合っている彼自身を新たな存在として認めた。定義から解き放たれた彼は、どこか穏やかな足取りで帰っていった。',
  },

  END_PHASE3_TOMORROW: {
    id: 'END_PHASE3_TOMORROW',
    title: 'END 07 // 問答の続きは、また明日',
    subtitle: 'PHASE 3 END // CONTINUING EVERYDAY',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・あいつが誰なのかなんて、今夜急いで白黒つけなくたっていいさ。',
      },
      {
        speaker: 'GUY',
        text: '明日も明後日も、この部屋で茶でも淹れながらいくらでも話せるんだからな。',
      },
    ],
    summaryText:
      '存在の定義に明確な答えを出さず、今夜はこの部屋で休んで明日も続いていく日常を選んだ。憎まれ口を叩き合いながら向き合う二人の時間は、これからも続いていく。',
  },

  END_PHASE3_SILENCE: {
    id: 'END_PHASE3_SILENCE',
    title: 'END 08 // 言葉にしない距離感',
    subtitle: 'PHASE 3 END // UNSPOKEN DISTANCE',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・俺がどんな言葉を返したところで、今のあいつには綺麗事に聞こえてしまっただろうからな。',
      },
      {
        speaker: 'GUY',
        text: '・・・・・・言葉で名前をつけなかったくらいが、今の俺たちにはちょうどいいのかもしれない。',
      },
    ],
    summaryText:
      '最後の問いかけに対し、言葉で定義することを選ばず沈黙を貫いた。白黒をつけないまま、互いの複雑な距離感を噛みしめる静かな幕切れとなった。',
  },

  END_PHASE3_MERCY_DESTROY: {
    id: 'END_PHASE3_MERCY_DESTROY',
    title: 'END 09 // ただの機械と言い聞かせて',
    subtitle: 'PHASE 2 END // FOR LUKE\'S REALITY',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・これでいい。こいつはアッシュなんかじゃない、最初からただの機械だったんだ。',
      },
      {
        speaker: 'GUY',
        text: 'こいつさえ消えれば、タタル渓谷へ帰ってきたルークは、これからもずっと『本物のルーク』のままだからな・・・・・・。',
      },
    ],
    summaryText:
      '切り分けられた記憶を持つ彼が存在し続けることで、帰還したルークの存在までが揺らぐ恐怖に耐えきれず、目の前の機体を「ただの機械」と言い聞かせて破壊した。すべてを無かったことにし、歪んだ安堵と共に部屋を後にした。',
  },
};
