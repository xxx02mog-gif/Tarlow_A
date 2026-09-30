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
          'さっき「ルークをモデルに作ったのか」って聞いたとき、「ふざけるな、これは俺の――」って口を滑らせたよな。\nただの機械が、なんでこの機体を「俺の」なんて言うんだ？',
        terminalRecordSummary:
          '機体モデルの質問時、「ふざけるな、これは俺の」と自己同一性を示す未フィルタ音声を検出し、直後に訂正。自己防衛衝動を検知。',
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
          'さっき「ルークをモデルに作ったのか」って聞いた瞬間、答える前にすごく忌々しそうに俺を睨んだよな。\nただの機械が、ルークの複製扱いされたくらいでなんでそんなにムキになるんだ？',
        terminalRecordSummary:
          '機体モデルの質問直後、発話前の0.7秒間に強い反発・憤慨を示す表情筋反応と情動波形スパイクを検出。',
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
          'さっきディストを尊敬してるのかって聞いたとき、「誰があの変態を」って口走ってから「管理者だ」って言い直したよな。\n造物主のことを「あの変態」なんて呼ぶ機械がいるかよ。',
        terminalRecordSummary:
          '管理者（ディスト）への忠誠確認時、「誰があの変態を」という強い個人的嫌悪語を検出。忠誠心は皆無であり、強い感情反発を記録。',
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
          'さっきディストを尊敬してるのかって聞いた瞬間、答える前に虫唾が走るみたいな嫌そうな顔をして目を逸らしたよな。\n忠実な後継機が、造物主の名前でそんな顔をするわけないだろ。',
        terminalRecordSummary:
          '管理者（ディスト）への忠誠確認直後、発話前の0.7秒間に強い嫌悪を示す表情変化と情動スパイクを検出。',
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
          'さっき頭に手を伸ばしたとき、咄嗟に「なっ、ガイッ！？」って俺の名前を呼んだよな。\n「おまえなんか知らない」って言ってたのに、なんで俺の名前が出るんだ？',
        terminalRecordSummary:
          '頭部への接触動作時、反射的に「なっ、ガイッ！？」と相手の個体名を呼称。条件反射的な親密性と元体記憶の表層化を検出。',
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
          'さっき宝刀ガルディオスを覚えているか聞いたとき、「そうか、おまえの手に戻ったんだな」って安心したように漏らしたよな。\n初対面の機械が、俺の家の刀の事情を知ってるわけがないだろ。',
        terminalRecordSummary:
          '『宝刀ガルディオス』を視認した際、「そうか、おまえの手に戻ったんだな」と個人的安堵を示す音声を検出。所有権回復への安堵と懐旧を記録。',
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
        slipPrefixText: 'そうか・・・・・・あいつが幸せなら・・・・・・。',
        slipCorrectedText: '・・・・・・知らん。他国の王族の話など、俺には何の関係もないことだ。',
        flashText: 'そうか・・・・・・あいつが幸せなら・・・・・・。',
        guyPointOutSpoken:
          'さっきナタリアが幸せそうに笑ってたって話したとき、「知らん」って突き放す前に「そうか、あいつが幸せなら」って漏らしたよな。\nあれはどう見ても、あいつの幸せを願ってた人間の反応だったぞ。',
        terminalRecordSummary:
          'ナタリアに関する話題提示時、「そうか、あいつが幸せなら」という強い情愛を含む応答を検出。直後に無関心文へ上書きを試みるも動揺を検知。',
      },
      {
        type: 'PRE_FACE',
        preFaceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'close',
          effects: [],
        },
        guyPointOutSpoken:
          'さっきナタリアが幸せそうだったって話した瞬間、答える前に一瞬だけ切なそうに目を伏せたよな。\n他国の王族を本当に知らないなら、そんな表情になるはずがないだろ。',
        terminalRecordSummary:
          'ナタリアに関する話題提示直後、発話前の0.7秒間に強い惜別・安堵の情動スパイクと伏し目反応を検出。',
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
          'さっきピオニー陛下のブウサギに『アッシュ』って名前がついてるって話したとき、「なんで俺の名前が」って声を荒げたよな。\n自分がアッシュじゃないなら、ブウサギの名前くらいで怒るわけないだろ。',
        terminalRecordSummary:
          'ブウサギの個体名『アッシュ』を聞いた瞬間、「なんで俺の名前が」という激しい自己同一性反応を検出。ペットへの命名に対する憤慨を記録。',
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
          'さっきブウサギに『アッシュ』って名前がついてるって話した瞬間、答える前に怒った顔で睨んできたよな。\n自分の名前をペットにつけられてたから、思わず反応したんだろ。',
        terminalRecordSummary:
          'ブウサギの個体名『アッシュ』を聞いた直後、発話前の0.7秒間に憤慨を示す表情変化と情動スパイクを検出。',
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
          'さっきタコ料理を勧めたとき、「嫌がらせか？」って食ってかかったよな。\nタコが苦手で、しかも俺に嫌われてるって自覚があるアッシュじゃなきゃ、そんな言葉は出ないはずだぞ。',
        terminalRecordSummary:
          'タコ料理の提案時、「嫌がらせか・・・・・・？」と嫌悪および対人負い目に基づく未フィルタ音声を検出。個人の食嗜好の完全な残存を記録。',
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
          'さっきタコ料理を勧めた瞬間、答える前に苦々しそうに目を伏せたよな。\n初対面の機械が、食事を勧められただけでそんな顔をするか？',
        terminalRecordSummary:
          'タコ料理の提案直後、発話前の0.7秒間に嫌悪と苦々しさを示す伏し目反応および情動波形スパイクを検出。',
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
          'さっき『鮮血のアッシュが身長が低いことを気にしてた』って噂を振ったとき、「気にしてなど――」ってムキになって言い返しかけたよな。\n他人事ならそんなに怒るはずがないだろ。',
        terminalRecordSummary:
          '身長に関する言及に対し、「気にしてなど」と即座に反応。六神将当時のコンプレックスの表層化を記録。',
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
          'さっき『鮮血のアッシュが身長を気にしてた』って話した瞬間、答える前に強い怒りで睨みつけてきたよな。\n死んだ人間の噂話に、なんでおまえがそこまでキレるんだ？',
        terminalRecordSummary:
          '身長に関する言及直後、発話前の0.7秒間に強い怒り（睨みつけ）の表情筋反応と情動スパイクを検出。',
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
    thoughtText: 'その姿は『ルーク』がモデルの機体かとカマをかける',
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
        systemLog: '機体換装の事実を交えた回答。',
      },
    ],
  },

  // ② ディストへの忠誠について【嫌悪の挑発】
  {
    id: 'p1_dist_loyalty',
    thoughtText: 'タルロウXのようにディストを尊敬しているか挑発する',
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
        systemLog: '管理者に関する定型回答。',
      },
    ],
  },

  // ③ 不意打ちで頭に手を伸ばす【条件反射テスト】
  {
    id: 'p1_touch_shoulder',
    thoughtText: '不意打ちで頭に手を伸ばしてみる',
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
        systemLog: '頭部への接触試行に対し拒絶を記録。',
      },
    ],
  },

  // ④ 宝刀ガルディオスについて【有罪知識テスト】
  {
    id: 'p1_galdios_sword',
    thoughtText: '壁際の『宝刀ガルディオス』を覚えているか聞いてみる',
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
        systemLog: '室内の武器確認を理由とした回答。',
      },
    ],
  },

  // ⑤ ナタリアの噂話について【有罪知識・誤前提のカマかけ】
  {
    id: 'p1_natalia_rumor',
    thoughtText: 'ナタリアがルークと婚約して幸せそうだったと振る',
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
        systemLog: '他国王族に関する無関心を装った回答。',
      },
    ],
  },

  // ⑥ ピオニー陛下のブウサギについて【挑発のカマかけ】
  {
    id: 'p1_peony_rabbits',
    thoughtText: 'ピオニー陛下のブウサギに『アッシュ』がいると話す',
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
        systemLog: 'ペットの話題に対する切り捨て回答。',
      },
    ],
  },

  // ⑦ 食事の勧め（タコ料理）【誤前提のカマかけ】
  {
    id: 'p1_octopus_meal',
    thoughtText: '美味いタコ料理の店があるから食べないかと勧める',
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
        systemLog: '動力源を理由とした食事拒否回答。',
      },
    ],
  },

  // ⑧ 鮮血のアッシュの噂について【誤前提のカマかけ】
  {
    id: 'p1_asch_rumor',
    thoughtText: '『鮮血のアッシュ』は低身長を気にしていたと振る',
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
        systemLog: '過去の人物に関する無関心を装った回答。',
      },
    ],
  },

  // ⑨ タルロウXの語尾について【絶対反応しないブラフ枠①】
  {
    id: 'p1_tarlow_zura',
    thoughtText: 'タルロウXの後継機なら語尾に「ズラ」がつくか聞く',
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
        systemLog: '音声出力・情動波形ともに安定。対象は冷静に旧型機との違いを主張しています。',
      },
    ],
  },

  // ⑩ 研究室で何をしていたのか【絶対反応しないブラフ枠②】
  {
    id: 'p1_why_sneaking',
    thoughtText: '研究室でディストの助手でもしていたのか聞く',
    contextCategory: 'daily',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_tarlow_zura', 'p1_luke_model'],
    stages: [
      {
        spokenText:
          '俺がディストの研究室に入ったとき、部屋の隅にいたよな。あそこでディストの実験の助手でもしていたのか？',
        aschText:
          '俺は管理用の機体だ。研究室の備品と音機関の稼働状況を確認していただけで、怪しまれるようなことはしていない。',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'normal',
          mouth: 'close',
          effects: [],
        },
        voiceEffects: ['normal'],
        systemLog: '管理業務を理由とした回答。情動波形に異常なし。',
      },
    ],
  },
];
