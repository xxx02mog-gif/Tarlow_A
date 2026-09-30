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
      '・・・・・・アッシュだ。身体が10歳の機械だろうが、記憶にどんな空白があろうが、俺の目の前で憎まれ口を叩いているおまえは、紛れもなくアッシュだよ。',
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
          'ああ、何度でも呼ぶさ。その不器用さも、素直に礼ひとつ言えないプライドの高さも、他の誰でもないおまえ自身のものだからな。',
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
          '・・・・・・ハッ、違いないな。元復讐者にそこまで太鼓判を押されりゃ、嫌でも認めるしかなさそうだ。\n・・・・・・今日のところは帰る。外の連中には黙っておけよ、ガイ。',
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
      '・・・・・・そうか。最初からそう言っていれば、お互いに無駄な時間を過ごさずに済んだものを。\n・・・・・・それでいい。死んだ人間がいつまでも亡霊みたいにうろつく道理はないからな。',
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
        thoughtText: '「死んだアッシュの分まで背負わず、ただの機械として気楽に稼働しろよ」',
        spokenText:
          '・・・・・・ああ。だからおまえは、死んだアッシュの過去やしがらみなんか全部忘れて、ただの機械として気楽に稼働していろよ。',
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
        thoughtText: '「これ以上ここにいても過去の亡霊に振り回されるだけだ。研究所へ戻れ」',
        spokenText:
          'これ以上ここにいても、お互いに過去の亡霊に振り回されるだけだ。ディストの研究所へ戻れよ。',
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
      '3年前に死んだ生前のアッシュそのものでもないし、かといってただの機械でもない。・・・・・・今ここで俺と向き合って、自分の意志で喋っている『今のおまえ』だよ。',
    aschText:
      '・・・・・・『今の俺』だと？　生前のアッシュでもなく、ただのタルロウAでもなく・・・・・・。\n・・・・・・妙なことを言う奴だな、おまえは。そんな中途半端な存在に、何の意味があると言うんだ。',
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
          '・・・・・・っ！　・・・・・・あいつと一緒にするなと言いたいところだが、今の俺には何も言い返せそうにないな。\n・・・・・・ふん、少しは考えておいてやる。また気が向いたら顔を出してやるから、茶でも用意しておけ。',
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
          '・・・・・・どこまでも呑気な奴だな、おまえは。\n・・・・・・だが、そうやって定義を押し付けられないのは、案外悪くない。じゃあな、ガイ。',
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

  // 【クライマックス深層解読後限定】切ない機能停止（介錯）ルート
  {
    id: 'p3_ans_mercy_destroy',
    thoughtText: '「・・・・・・もう十分苦しんだだろ。俺の手で、アッシュとして眠らせてやる」',
    requireLinkTag: 'climax_ready',
    spokenText:
      '・・・・・・おまえは紛れもなくアッシュだ。だけど、ルークの居場所を守るために消えようとしたおまえを、これ以上ディストの玩具として機械の身体に閉じ込めておくわけにはいかない。',
    aschText:
      '・・・・・・っ、ガイ・・・・・・貴様、全部知っていやがったのか。\n・・・・・・それで、どうする気だ。その剣を抜いて、ここで俺を壊すか？',
    expression: 'normal',
    faceParts: {
      brow: 'sad',
      eyes: 'normal',
      mouth: 'close',
      effects: ['pale'],
    },
    followUpOptions: [
      {
        id: 'p3_ans_mercy_destroy_2a',
        thoughtText: '「ああ。二度とノイズにも記憶にも苦しまないよう、俺の手で終わらせる」と剣を抜く',
        spokenText:
          '・・・・・・ああ。二度とノイズにも、消えない記憶にも苦しまなくていいように、俺の手で終わらせてやる。・・・・・・おやすみ、アッシュ。',
        aschText:
          '・・・・・・ふん。元復讐者の貴様に介錯されるなら、悪くない幕引きだな。\n・・・・・・悪かったな、ガイ・・・・・・。',
        expression: 'normal',
        faceParts: {
          brow: 'smile',
          eyes: 'close',
          mouth: 'close',
          effects: ['pale', 'tears'],
        },
        voiceEffects: ['tremble'],
        completesTopic: true,
        triggersEndingKey: 'END_PHASE3_MERCY_DESTROY',
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
      '・・・・・・まあ、おまえがそこまで『自分はタルロウAだ』と言い張るし、予備素体の話も筋が通っているなら、本当にディストが造った機械なんだろうな。引き止めて悪かった、研究所へ戻っていいよ。',
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
      '・・・・・・道理で、目が覚めた時からずっと空っぽなわけだ。\n・・・・・・もういい。二度と俺に関わるな、ガイ。',
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
        text: 'ルークが戻ってきてくれたと心から思っていたのに、俺が勝手にこいつの封印を暴いたせいで、帰ってきた『ルーク』の存在さえ揺らいでしまった・・・・・・。',
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
    title: 'END 09 // 静かな機能停止',
    subtitle: 'PHASE 3 END // MERCIFUL SHUTDOWN',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・ルークのためにひとりで記憶を切り離して、消えようとまでしていたなんてな。',
      },
      {
        speaker: 'GUY',
        text: '・・・・・・もう十分だろ。ゆっくり眠れよ、アッシュ。',
      },
    ],
    summaryText:
      '消去されるはずだった記憶として苦しみ続けたアッシュの願いを受け止め、ガイ自身の手で機体の機能を停止させた。彼はようやくすべての苦痛と矛盾から解き放たれた。',
  },

  END_PHASE2_COLD_DESTROY: {
    id: 'END_PHASE2_COLD_DESTROY',
    title: 'END 10 // 冷たい鉄屑',
    subtitle: 'PHASE 2 END // COLD DESTRUCTION',
    dialogues: [
      {
        speaker: 'GUY',
        text: '・・・・・・アッシュは3年前のエルドラントで死んだよ。',
      },
      {
        speaker: 'GUY',
        text: 'おまえはディストが造った、ただの質の悪い機械だ。',
      },
    ],
    summaryText:
      '互いに苛立ちをぶつけ合う激しい衝突の末、目の前の機体を死者の尊厳を冒涜する紛い物と断じて物理的に破壊した。冷え切った部屋には、動かなくなった鉄塊だけが残された。',
  },
};
