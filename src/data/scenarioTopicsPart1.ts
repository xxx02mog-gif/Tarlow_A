import { ConversationTopic, FaceParts } from '../types/game';

export const OPENING_ASCH_TEXT =
  '離せ。俺は『アッシュ』なんかじゃない、ディストが造った自律機械『タルロウA』だ。\nおまえが誰かは知らんが、用がないならさっさと研究所へ戻せ。';

export type Phase1SlipType = 'REWRITE' | 'PRE_FACE';

export interface Phase1SlipVariant {
  type: Phase1SlipType;
  flashText?: string;
  slipPrefixText?: string;       // 案B枠1：思わず漏れた本音（1枠目）
  slipCorrectedText?: string;    // 案B枠2：慌てて訂正したセリフ（2枠目）
  preFaceParts?: Partial<FaceParts>;
  guyPointOutSpoken: string;
  terminalRecordSummary: string;
}

export interface Phase1TopicSlipConfig {
  topicId: string;
  shortLabel: string;
  canSlip: boolean;
  variants: Phase1SlipVariant[];
}

// 全10項目のカマかけ質問に対するボロ定義（①〜⑧はボロ候補、⑨・⑩は絶対反応しないブラフ枠）
export const PHASE1_TOPIC_SLIP_CONFIGS: Record<string, Phase1TopicSlipConfig> = {
  p1_luke_model: {
    topicId: 'p1_luke_model',
    shortLabel: '『ルーク』をモデルに機体を作ったのかと聞いたとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: 'ふざけるな、これは俺の・・・・・・ッ！',
        slipCorrectedText: '・・・・・・研究所にあった予備機体を仮で使っているだけだ。',
        flashText: 'ふざけるな、これは俺の・・・・・・ッ！',
        guyPointOutSpoken:
          'さっき、「ふざけるな、これは俺の――」って口を滑らせたよな。\nただの機械が、なんでこの機体を「俺の」なんて言うんだ？',
        terminalRecordSummary:
          '機体モデルに関する質問時、「ふざけるな、これは俺の」という未フィルタ音声を出力。0.4秒後に「研究所にあった予備機体」へ発言を修正。',
      },
      {
        type: 'PRE_FACE',
        preFaceParts: {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'grit',
          effects: [],
        },
        guyPointOutSpoken:
          'さっき、俺を睨みつけたよな。\nルークに似てるって言われたくらいで、ただの機械がなんで睨むんだ？',
        terminalRecordSummary:
          '機体モデルに関する質問直後、発話前の0.7秒間に眉間および口元の筋電位が急上昇し、音素出力スパイクを記録。',
      },
    ],
  },
  p1_dist_loyalty: {
    topicId: 'p1_dist_loyalty',
    shortLabel: 'ディストを尊敬しているのかと聞いたとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: '誰があの変態を・・・・・・ッ！',
        slipCorrectedText: '・・・・・・ディストは俺の管理者だ。それ以上でも以下でもない。',
        flashText: '誰があの変態を・・・・・・ッ！',
        guyPointOutSpoken:
          'さっき、「誰があの変態を」って口走ったよな。\n自分を作ったディストのことを「あの変態」なんて呼ぶ機械がいるかよ。',
        terminalRecordSummary:
          '管理者（ディスト）に関する質問時、「誰があの変態を」という未フィルタ音声を出力し、直後に定型文へ修正。',
      },
      {
        type: 'PRE_FACE',
        preFaceParts: {
          brow: 'pain',
          eyes: 'away',
          mouth: 'frown',
          effects: [],
        },
        guyPointOutSpoken:
          'さっき、嫌そうな顔をして目を逸らしたよな。\n自分を作ったディストの名前で、機械がそんな顔をするわけないだろ。',
        terminalRecordSummary:
          '管理者（ディスト）に関する質問直後、発話前の0.7秒間に視線回避動作および音素周波数の乱れを記録。',
      },
    ],
  },
  p1_touch_shoulder: {
    topicId: 'p1_touch_shoulder',
    shortLabel: '不意打ちで頭に手を伸ばしたとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: 'なっ、ガイッ！？',
        slipCorrectedText: '・・・・・・ガ、ガキ扱いするな！',
        flashText: 'なっ、ガイッ！？',
        guyPointOutSpoken:
          'さっき、「なっ、ガイッ！？」って俺の名前を呼んだよな。\n俺を知らないって言ってたのに、なんで名前が出るんだ？',
        terminalRecordSummary:
          '頭部への接近動作を検知した瞬間、0.1秒で「なっ、ガイッ！？」と対象人物の個人名を音声出力。直後に発言を修正。',
      },
    ],
  },
  p1_galdios_sword: {
    topicId: 'p1_galdios_sword',
    shortLabel: '『宝刀ガルディオス』について聞いたとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: 'そうか、おまえの手に戻ったんだな・・・・・・。',
        slipCorrectedText: '・・・・・・いや、その剣がなんだろうと俺には関係ない。',
        flashText: 'そうか、おまえの手に戻ったんだな・・・・・・。',
        guyPointOutSpoken:
          'さっき、「そうか、おまえの手に戻ったんだな」って漏らしたよな。\n初対面の機械が、俺の家の刀の事情を知ってるわけがないだろ。',
        terminalRecordSummary:
          '『宝刀ガルディオス』視認時、「そうか、おまえの手に戻ったんだな」という音声出力と共に音素波形が鎮静化。直後に無関係を装う発言へ修正。',
      },
    ],
  },
  p1_natalia_rumor: {
    topicId: 'p1_natalia_rumor',
    shortLabel: 'ナタリアの話を振ったとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: '・・・・・・っ、ルークと・・・・・・！？　・・・・・・いや、あいつが幸せなら、それで・・・・・・',
        slipCorrectedText: '・・・・・・知らん。他国の王族の話など、俺には何の関係もないことだ。',
        flashText: '・・・・・・っ、ルークと・・・・・・！？　・・・・・・いや、あいつが幸せなら、それで・・・・・・',
        guyPointOutSpoken:
          'さっき、「ルークと！？」って息を呑んでから「あいつが幸せなら」って言いかけたよな。\n赤の他人の機械が、彼女の婚約相手を聞いてそんな反応をするわけないだろ。',
        terminalRecordSummary:
          'バチカル王女に関する質問時、「ルークと！？」「あいつが幸せなら」という音声出力と最大振幅の波形乱れを記録。直後に発言を修正。',
      },
      {
        type: 'PRE_FACE',
        preFaceParts: {
          brow: 'pain',
          eyes: 'down',
          mouth: 'grit',
          effects: ['pale'],
        },
        guyPointOutSpoken:
          'さっき、息を呑んで目を伏せたよな。\n赤の他人なら、彼女の婚約の話でそんな顔になるはずがないだろ。',
        terminalRecordSummary:
          'バチカル王女に関する質問直後、発話前の0.7秒間に視線降下および音素出力の急激な乱れを記録。',
      },
    ],
  },
  p1_peony_rabbits: {
    topicId: 'p1_peony_rabbits',
    shortLabel: 'ブウサギの『アッシュ』の話をしたとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: 'なっ・・・・・・！？ なんで俺の名前が・・・・・・ッ！',
        slipCorrectedText: '・・・・・・だから何だ。他人のペットの話など俺には関係ない。',
        flashText: 'なっ・・・・・・！？ なんで俺の名前が・・・・・・ッ！',
        guyPointOutSpoken:
          'さっき、「なんで俺の名前が」って声を荒げたよな。\n自分がアッシュじゃないなら、ブウサギの名前くらいで怒るわけないだろ。',
        terminalRecordSummary:
          'ブウサギの個体名『アッシュ』が入力された瞬間、「なんで俺の名前が」という未フィルタ音声を出力し、直後に発言を修正。',
      },
      {
        type: 'PRE_FACE',
        preFaceParts: {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'grit',
          effects: [],
        },
        guyPointOutSpoken:
          'さっき、俺を睨みつけたよな。\n他人のペットの名前くらいで、なんでそんなに睨むんだ？',
        terminalRecordSummary:
          'ブウサギの個体名『アッシュ』が入力された直後、発話前の0.7秒間に音素出力の急上昇と睨みつけ動作を記録。',
      },
    ],
  },
  p1_octopus_meal: {
    topicId: 'p1_octopus_meal',
    shortLabel: 'タコ料理を勧めたとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: '嫌がらせか・・・・・・？',
        slipCorrectedText: '・・・・・・俺は機械だから食事は摂らない。音素の供給さえあれば稼働に問題はない。',
        flashText: '嫌がらせか・・・・・・？',
        guyPointOutSpoken:
          'さっき、「嫌がらせか？」って食ってかかったよな。\nただ飯を勧めただけなのに、「嫌がらせか」なんて返すのタコ嫌いのおまえくらいだぞ。',
        terminalRecordSummary:
          'タコ料理の提案に対し、「嫌がらせか・・・・・・？」という未フィルタ音声を出力。生体時（20歳時点）の嫌悪食品データと完全一致。',
      },
      {
        type: 'PRE_FACE',
        preFaceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'frown',
          effects: [],
        },
        guyPointOutSpoken:
          'さっき、露骨に顔をしかめたよな。\n機械がタコ料理を勧められただけで、なんでそんな嫌そうな顔をするんだ？',
        terminalRecordSummary:
          'タコ料理の提案直後、発話前の0.7秒間に視線降下および拒絶波形スパイクを記録。',
      },
    ],
  },
  p1_asch_rumor: {
    topicId: 'p1_asch_rumor',
    shortLabel: '『鮮血のアッシュ』の身長の噂をしたとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: '気にしてなど・・・・・・ッ！',
        slipCorrectedText: '知らん。俺には関係ない。',
        flashText: '気にしてなど・・・・・・ッ！',
        guyPointOutSpoken:
          'さっき、「気にしてなど――」って言い返しかけたよな。\n他人事ならそんなに怒るはずがないだろ。',
        terminalRecordSummary:
          '『鮮血のアッシュ』の身長に関する言及に対し、「気にしてなど」という未フィルタ音声を出力し、直後に発言を修正。',
      },
      {
        type: 'PRE_FACE',
        preFaceParts: {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'grit',
          effects: [],
        },
        guyPointOutSpoken:
          'さっき、俺を睨みつけたよな。\n死んだ人間の身長の話に、なんでおまえがそこまでムキになるんだ？',
        terminalRecordSummary:
          '『鮮血のアッシュ』の身長に関する言及直後、発話前の0.7秒間に音素出力の急上昇と睨みつけ動作を記録。',
      },
    ],
  },
  p1_tarlow_zura: {
    topicId: 'p1_tarlow_zura',
    shortLabel: 'タルロウXの語尾について聞いたとき',
    canSlip: false,
    variants: [],
  },
  p1_why_sneaking: {
    topicId: 'p1_why_sneaking',
    shortLabel: '研究室でディストの助手でもしていたのか聞いたとき',
    canSlip: false,
    variants: [],
  },
};

export const SCENARIO_TOPICS_PART1: ConversationTopic[] = [
  // ==========================================
  // 【フェーズ1：自称『タルロウA』へのカマかけ質問（全10項目・上限5回）】
  // ==========================================

  // ① 機体のモデルについて【誤前提のカマかけ】
  {
    id: 'p1_luke_model',
    thoughtText: '『ルーク』によく似た外見',
    contextCategory: 'body',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_dist_loyalty', 'p1_touch_shoulder'],
    stages: [
      {
        spokenText:
          'その姿、『ルーク』にそっくりだな。ディストの奴、ルークをモデルにその機体を作ったのか？',
        aschText:
          '知らん。俺は以前の機体が壊れたから、研究所にあった予備機体を仮で使っているだけだ。',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'normal',
          mouth: 'close',
          effects: [],
        },
        voiceEffects: ['normal'],
        systemLog: 'RESPONSE LOGGED // TOPIC: FRAME_MODEL',
      },
    ],
  },

  // ② ディストへの忠誠について【嫌悪の挑発】
  {
    id: 'p1_dist_loyalty',
    thoughtText: '造ったディストのこと',
    contextCategory: 'body',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_luke_model', 'p1_tarlow_zura'],
    stages: [
      {
        spokenText:
          'タルロウXはディストを崇拝してたよな。おまえもやっぱりディストを尊敬してるのか？',
        aschText:
          'ディストは俺の管理者だ。それ以上でも以下でもない。',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'normal',
          mouth: 'close',
          effects: [],
        },
        voiceEffects: ['normal'],
        systemLog: 'RESPONSE LOGGED // TOPIC: ADMINISTRATOR',
      },
    ],
  },

  // ③ 不意打ちで頭に手を伸ばす【条件反射テスト】
  {
    id: 'p1_touch_shoulder',
    thoughtText: '不意に頭へ手を伸ばす',
    contextCategory: 'body',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_luke_model', 'p1_octopus_meal'],
    stages: [
      {
        spokenText: 'おい、ちょっとじっとしてろよ。（頭に手を伸ばす）',
        aschText: '不要な接触はやめろ。機体のセンサーに障る。',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'glare',
          mouth: 'close',
          effects: [],
        },
        voiceEffects: ['normal'],
        systemLog: 'REFLEX ACTION DETECTED // PROXIMITY ALERT',
      },
    ],
  },

  // ④ 宝刀ガルディオスについて【有罪知識テスト】
  {
    id: 'p1_galdios_sword',
    thoughtText: '壁際の『宝刀ガルディオス』',
    contextCategory: 'past',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_natalia_rumor', 'p1_asch_rumor'],
    stages: [
      {
        spokenText: '壁際に立てかけてあるこの『宝刀ガルディオス』、見覚えがあるんじゃないか？',
        aschText: 'その剣がなんだろうと俺には関係ない。',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'normal',
          mouth: 'close',
          effects: [],
        },
        voiceEffects: ['normal'],
        grantsLinkTags: ['talked_galdios_p1'],
        systemLog: 'RESPONSE LOGGED // TOPIC: GALDIOS_SWORD',
      },
    ],
  },

  // ⑤ ナタリアの噂話について【有罪知識・誤前提のカマかけ】
  {
    id: 'p1_natalia_rumor',
    thoughtText: '王女『ナタリア』のこと',
    contextCategory: 'friends',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_galdios_sword', 'p1_peony_rabbits'],
    stages: [
      {
        spokenText:
          '最近バチカルに行ったんだが、ナタリアが『ルークと婚約して本当に良かった』って幸せそうに笑ってたぞ。',
        aschText: '知らん。他国の王族の話など、俺には何の関係もないことだ。',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'normal',
          mouth: 'close',
          effects: [],
        },
        voiceEffects: ['normal'],
        systemLog: 'RESPONSE LOGGED // TOPIC: BATICUL_ROYAL',
      },
    ],
  },

  // ⑥ ピオニー陛下のブウサギについて【挑発のカマかけ】
  {
    id: 'p1_peony_rabbits',
    thoughtText: 'ピオニー陛下のブウサギ',
    contextCategory: 'daily',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_octopus_meal', 'p1_natalia_rumor'],
    stages: [
      {
        spokenText:
          'そういえばピオニー陛下の飼ってるブウサギに『アッシュ』って名前のやつがいてさ、俺が毎日散歩させてるんだよ。',
        aschText: 'だから何だ。他人のペットの話など俺には関係ない。',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'normal',
          mouth: 'close',
          effects: [],
        },
        voiceEffects: ['normal'],
        systemLog: 'RESPONSE LOGGED // TOPIC: MALKUTH_PET',
      },
    ],
  },

  // ⑦ 食事の勧め（タコ料理）【誤前提のカマかけ】
  {
    id: 'p1_octopus_meal',
    thoughtText: '食事はとるのか',
    contextCategory: 'daily',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_peony_rabbits', 'p1_touch_shoulder'],
    stages: [
      {
        spokenText:
          'ディストの造った精巧な機体なら、人間の食事も摂れるんじゃないのか？ 美味いタコ料理を出す店があるんだが、どうだ？',
        aschText:
          '俺は機械だから食事は摂らない。音素の供給さえあれば稼働に問題はない。',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'normal',
          mouth: 'close',
          effects: [],
        },
        voiceEffects: ['normal'],
        grantsLinkTags: ['talked_meal_spec'],
        systemLog: 'RESPONSE LOGGED // TOPIC: ORGANIC_INTAKE',
      },
    ],
  },

  // ⑧ 鮮血のアッシュの噂について【誤前提のカマかけ】
  {
    id: 'p1_asch_rumor',
    thoughtText: '『鮮血のアッシュ』の噂',
    contextCategory: 'past',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_galdios_sword', 'p1_luke_model'],
    stages: [
      {
        spokenText:
          '昔、六神将に『鮮血のアッシュ』って呼ばれてた奴がいたんだが、そいつ、身長が低いことを気にしてたらしいぞ。',
        aschText: '知らん。俺には関係ない。',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'normal',
          mouth: 'close',
          effects: [],
        },
        voiceEffects: ['normal'],
        systemLog: 'RESPONSE LOGGED // TOPIC: ORACLE_GENERAL',
      },
    ],
  },

  // ⑨ タルロウXの語尾について【絶対反応しないブラフ枠①】
  {
    id: 'p1_tarlow_zura',
    thoughtText: '『タルロウX』の語尾',
    contextCategory: 'body',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_dist_loyalty', 'p1_why_sneaking'],
    stages: [
      {
        spokenText:
          'おまえはタルロウXの後継機なんだよな？　語尾に『ズラ』ってつけないのか？',
        aschText:
          '俺は最新機だ。そんな古臭い語尾は使わない。旧型のポンコツと一緒にするな。',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'normal',
          mouth: 'close',
          effects: [],
        },
        voiceEffects: ['normal'],
        systemLog: 'RESPONSE LOGGED // TOPIC: SPEECH_SETTING (WAVE STABLE)',
      },
    ],
  },

  // ⑩ 研究室で何をしていたのか【絶対反応しないブラフ枠②】
  {
    id: 'p1_why_sneaking',
    thoughtText: '研究室の隅で何をしていたか',
    contextCategory: 'daily',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_tarlow_zura', 'p1_luke_model'],
    stages: [
      {
        spokenText:
          '俺がディストの研究室に入ったとき、部屋の隅にいたよな。あそこでディストの実験の助手でもしていたのか？',
        aschText:
          '俺はあの部屋の管理機体だ。待機していただけだ、怪しまれる覚えはない。',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'normal',
          mouth: 'close',
          effects: [],
        },
        voiceEffects: ['normal'],
        systemLog: 'RESPONSE LOGGED // TOPIC: STANDBY_STATE (WAVE STABLE)',
      },
    ],
  },
];
