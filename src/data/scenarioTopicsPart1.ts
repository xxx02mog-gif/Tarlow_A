import { ConversationTopic, FaceParts } from '../types/game';

export const OPENING_ASCH_TEXT =
  '離せ。俺は『アッシュ』なんかじゃない、ディストが造った自律譜業『タルロウA』だ。\nおまえが誰かは知らんが、用がないならさっさと研究所へ戻せ';

export type Phase1SlipType = 'REWRITE' | 'PRE_FACE';

export interface Phase1SlipVariant {
  type: Phase1SlipType;
  flashText?: string;
  slipPrefixText?: string;       // 案B枠1：思わず漏れた本音（1枠目）
  slipCorrectedText?: string;    // 案B枠2：慌てて訂正したセリフ（2枠目）
  slipFaceParts?: Partial<FaceParts>;      // 1枠目（本音が漏れた瞬間）の表情
  correctedFaceParts?: Partial<FaceParts>; // 2枠目（言い直して取り繕った瞬間）の表情
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
    shortLabel: 'ルークをモデルに造ったのか聞いたとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: 'ふざけるな、これは俺の・・・・・・ッ！',
        slipCorrectedText: '・・・・・・研究所にあった予備機体を仮で使っているだけだ',
        flashText: 'ふざけるな、これは俺の・・・・・・ッ！',
        slipFaceParts: {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'shout',
          effects: ['sweat'],
        },
        correctedFaceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'close',
          effects: ['sweat'],
        },
        guyPointOutSpoken:
          'さっき、その機体のことを「俺の」って言いかけて言い直したよな。\nただの譜業が、なんでそんな言い方をするんだ？',
        terminalRecordSummary:
          '機体モデルに関する質問時、「ふざけるな、これは俺の」という未フィルタ音声を出力。0.4秒後に「研究所にあった予備機体」へ発言を修正',
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
          'ルークに似てるって言ったとき、俺を睨みつけたよな。\nただの譜業が、なんでそんなことで睨むんだ？',
        terminalRecordSummary:
          '機体モデルに関する質問直後、発話前の0.7秒間に顔面駆動部の負荷が急上昇し、音素出力の乱れを記録',
      },
    ],
  },
  p1_dist_loyalty: {
    topicId: 'p1_dist_loyalty',
    shortLabel: 'ディストを尊敬しているのか聞いたとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: '誰があんな奴を・・・・・・ッ！',
        slipCorrectedText: '・・・・・・ディストは俺の管理者だ。それ以上でも以下でもない',
        flashText: '誰があんな奴を・・・・・・ッ！',
        slipFaceParts: {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'grit',
          effects: [],
        },
        correctedFaceParts: {
          brow: 'normal',
          eyes: 'close',
          mouth: 'close',
          effects: [],
        },
        guyPointOutSpoken:
          'ディストのことを「あんな奴」って口走ったよな。\n自分を造った相手をそんな風に呼ぶ譜業がいるかよ',
        terminalRecordSummary:
          '管理者（ディスト）に関する質問時、「誰があんな奴を」という未フィルタ音声を出力し、直後に定型文へ修正',
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
          'ディストの名前を出したとき、嫌そうな顔をして目を逸らしたよな。\n自分を造った相手に、ただの譜業がそんな顔をするわけないだろ',
        terminalRecordSummary:
          '管理者（ディスト）に関する質問直後、発話前の0.7秒間に視線回避動作および音素周波数の乱れを記録',
      },
    ],
  },
  p1_touch_shoulder: {
    topicId: 'p1_touch_shoulder',
    shortLabel: '不意に頭へ手を伸ばしたとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: 'なっ、ガイッ！？',
        slipCorrectedText: '・・・・・・ガ、ガキ扱いするな！',
        flashText: 'なっ、ガイッ！？',
        slipFaceParts: {
          brow: 'sad',
          eyes: 'wide',
          mouth: 'gasp',
          effects: ['sweat'],
        },
        correctedFaceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'frown',
          effects: ['blush', 'sweat'],
        },
        guyPointOutSpoken:
          '頭に触れようとしたとき、思わず「ガイ」って呼んだよな。\n俺を知らないはずなのに、なんで名前が出てくるんだ？',
        terminalRecordSummary:
          '頭部への接近動作を検知した瞬間、0.1秒で「なっ、ガイッ！？」と対象人物の個人名を音声出力。直後に発言を修正',
      },
    ],
  },
  p1_galdios_sword: {
    topicId: 'p1_galdios_sword',
    shortLabel: '『宝刀ガルディオス』を見せたとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: 'そうか、おまえの手に戻ったんだな・・・・・・',
        slipCorrectedText: '・・・・・・いや、その刀がなんだろうと俺には関係ない',
        flashText: 'そうか、おまえの手に戻ったんだな・・・・・・',
        slipFaceParts: {
          brow: 'smile',
          eyes: 'smile',
          mouth: 'close',
          effects: [],
        },
        correctedFaceParts: {
          brow: 'normal',
          eyes: 'close',
          mouth: 'close',
          effects: [],
        },
        guyPointOutSpoken:
          'あの刀を見せたとき、俺が何も説明する前に「おまえの手に戻ったんだな」って漏らしたよな。\n初対面の譜業が、ファブレ邸にあった俺の家の刀を知ってるわけがないだろ',
        terminalRecordSummary:
          '『宝刀ガルディオス』視認時、「そうか、おまえの手に戻ったんだな」という音声出力と共に音素波形が鎮静化。直後に「俺には関係ない」へ発言を修正',
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
        slipPrefixText: '・・・・・・っ、あいつが、ルークと・・・・・・！？',
        slipCorrectedText: '・・・・・・知らん。他国の王族の話など、俺には何の関係もないことだ',
        flashText: '・・・・・・っ、あいつが、ルークと・・・・・・！？',
        slipFaceParts: {
          brow: 'pain',
          eyes: 'wide',
          mouth: 'gasp',
          effects: ['pale', 'sweat'],
        },
        correctedFaceParts: {
          brow: 'sad',
          eyes: 'close',
          mouth: 'frown',
          effects: ['shadow'],
        },
        guyPointOutSpoken:
          'ナタリアが婚約したって話したとき、「あいつが、ルークと！？」って食いついたよな。\n赤の他人の譜業が、なんでそんなに動揺するんだ？',
        terminalRecordSummary:
          'ナタリア王女に関する質問時、「あいつが、ルークと！？」という音声出力と最大振幅の波形乱れを記録。直後に発言を修正',
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
          'ナタリアの婚約の話をしたとき、息を呑んで目を伏せたよな。\n赤の他人の譜業なら、そんな顔になるはずがないだろ',
        terminalRecordSummary:
          'ナタリア王女に関する質問直後、発話前の0.7秒間に視線降下および音素出力の急激な乱れを記録',
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
        slipCorrectedText: '・・・・・・だから何だ。他人のペットの話など俺には関係ない',
        flashText: 'なっ・・・・・・！？ なんで俺の名前が・・・・・・ッ！',
        slipFaceParts: {
          brow: 'angry',
          eyes: 'wide',
          mouth: 'shout',
          effects: ['blush', 'sweat'],
        },
        correctedFaceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'frown',
          effects: ['sweat'],
        },
        guyPointOutSpoken:
          'さっき、「なんで俺の名前が」って声を荒げたよな。\n自分がアッシュじゃないなら、ブウサギの名前くらいで怒るわけないだろ',
        terminalRecordSummary:
          'ブウサギの個体名『アッシュ』が入力された瞬間、「なんで俺の名前が」という未フィルタ音声を出力し、直後に発言を修正',
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
          'ブウサギの話をしたとき、俺を睨みつけたよな。\n他人のペットの名前くらいで、なんでそんなに睨むんだ？',
        terminalRecordSummary:
          'ブウサギの個体名『アッシュ』が入力された直後、発話前の0.7秒間に音素出力の急上昇と睨みつけ動作を記録',
      },
    ],
  },
  p1_octopus_meal: {
    topicId: 'p1_octopus_meal',
    shortLabel: '食事に誘ったとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: '嫌がらせか・・・・・・？',
        slipCorrectedText: '・・・・・・俺は譜業だから食事は摂らない。音素の供給さえあれば稼働に問題はない',
        flashText: '嫌がらせか・・・・・・？',
        slipFaceParts: {
          brow: 'doubt',
          eyes: 'glare',
          mouth: 'frown',
          effects: ['shadow'],
        },
        correctedFaceParts: {
          brow: 'normal',
          eyes: 'close',
          mouth: 'close',
          effects: [],
        },
        guyPointOutSpoken:
          'タコ料理を勧めたとき、思わず「嫌がらせか」って口走ったよな。\nただ飯に誘っただけでそんな返しをするのは、タコ嫌いのおまえくらいだぞ',
        terminalRecordSummary:
          'タコ料理の提案に対し、「嫌がらせか・・・・・・？」という未フィルタ音声を出力。生体時（20歳時点）の嫌悪食品データと完全一致',
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
          'タコ料理を勧めたとき、露骨に顔をしかめたよな。\nただの譜業が、食べ物の名前だけでそんな嫌そうな顔をするかよ',
        terminalRecordSummary:
          'タコ料理の提案直後、発話前の0.7秒間に視線降下および拒絶波形スパイクを記録',
      },
    ],
  },
  p1_asch_rumor: {
    topicId: 'p1_asch_rumor',
    shortLabel: '『鮮血のアッシュ』の噂話をしたとき',
    canSlip: true,
    variants: [
      {
        type: 'REWRITE',
        slipPrefixText: '気にしてなど・・・・・・ッ！',
        slipCorrectedText: '知らん。俺には関係ない',
        flashText: '気にしてなど・・・・・・ッ！',
        slipFaceParts: {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'shout',
          effects: ['blush'],
        },
        correctedFaceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'frown',
          effects: [],
        },
        guyPointOutSpoken:
          'アッシュの噂話をしたとき、「気にしてなど」って言い返しかけたよな。\n赤の他人なら、自分のことみたいに怒るはずがないだろ',
        terminalRecordSummary:
          '『鮮血のアッシュ』の身長に関する言及に対し、「気にしてなど」という未フィルタ音声を出力し、直後に発言を修正',
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
          'アッシュの噂話をしたとき、俺を睨みつけたよな。\n赤の他人の噂話に、なんでおまえがムッとするんだ？',
        terminalRecordSummary:
          '『鮮血のアッシュ』の身長に関する言及直後、発話前の0.7秒間に音素出力の急上昇と睨みつけ動作を記録',
      },
    ],
  },
  p1_tarlow_zura: {
    topicId: 'p1_tarlow_zura',
    shortLabel: 'タルロウXの語尾のことを聞いたとき',
    canSlip: false,
    variants: [],
  },
  p1_why_sneaking: {
    topicId: 'p1_why_sneaking',
    shortLabel: '部屋の隅で何をしていたのか聞いたとき',
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
    thoughtText: 'ルークによく似た外見',
    contextCategory: 'body',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_dist_loyalty', 'p1_touch_shoulder'],
    stages: [
      {
        spokenText:
          'その姿、ルークにそっくりだぞ。ディストの奴、ルークをモデルにその機体を造ったのか？',
        aschText:
          '知らん。俺は以前の機体が壊れたから、研究所にあった予備機体を仮で使っているだけだ',
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
          'ディストは俺の管理者だ。それ以上でも以下でもない',
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
        spokenText: 'おい、頭にゴミがついてるぞ。ちょっとじっとしてろよ',
        aschText: '不要な接触はやめろ。',
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
    thoughtText: '『宝刀ガルディオス』のこと',
    contextCategory: 'past',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_natalia_rumor', 'p1_asch_rumor'],
    stages: [
      {
        spokenText:
          'そこの壁際に置いてある刀、珍しい形をしてるだろ。見覚えはないか？',
        aschText: '知らん。その刀がなんだろうと俺には関係ない',
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
    thoughtText: 'ナタリアのこと',
    contextCategory: 'friends',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_galdios_sword', 'p1_peony_rabbits'],
    stages: [
      {
        spokenText:
          '最近バチカルに行ったんだが、ナタリアが『ルークと婚約して本当に良かった』って幸せそうに笑ってたぞ',
        aschText: '知らん。他国の王族の話など、俺には何の関係もないことだ',
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
          'そういえばピオニー陛下の飼ってるブウサギに『アッシュ』って名前のやつがいてな。俺が時々世話をしてるんだ',
        aschText: 'だから何だ。他人のペットの話など俺には関係ない',
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
          'あのディストが作った機体なんだろ？ 人間の食事も摂れるんじゃないのか？ 美味いタコ料理を出す店があるんだが、どうだ？',
        aschText:
          '俺は譜業だから食事は摂らない。音素の供給さえあれば稼働に問題はない',
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
          '昔、六神将に『鮮血のアッシュ』って呼ばれてた奴がいたんだが、そいつ、身長が低いことを気にしてたらしいぞ',
        aschText: '知らん。俺には関係ない',
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
          'おまえはタルロウXの後継機なんだろ？　語尾に『ズラ』ってつけないのか？',
        aschText:
          '俺は最新機だ。そんな古臭い語尾は使わない。旧型のポンコツと一緒にするな',
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
    thoughtText: '部屋の隅で何をしていたか',
    contextCategory: 'daily',
    forbidLinkTags: ['phase2_started'],
    relatedTopicIds: ['p1_tarlow_zura', 'p1_luke_model'],
    stages: [
      {
        spokenText:
          '俺がディストの研究所に入ったとき、部屋の隅に立っていたろ。あそこで実験の助手でもしていたのか？',
        aschText:
          '俺はあの部屋の管理機体だ。待機していただけだ、怪しまれる覚えはない',
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
