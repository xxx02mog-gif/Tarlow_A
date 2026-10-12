import { GuyBodyReaction, GuyFaceParts } from '../components/GuyPortrait';

export interface KeywordUnlockTrigger {
  type: 'topic' | 'choice' | 'oralInfo' | 'sector' | 'initial' | 'question';
  targetId: string;
  detailLabel?: string;
}

export interface ThinkingKeyword {
  id: string;
  label: string;
  guyThought: string;
  sourceDescription: string;
  unlockTrigger: KeywordUnlockTrigger;
  unlockTriggers?: KeywordUnlockTrigger[]; // 複数経路（いずれか1つ達成で解放）
  whyAdopted: string;
  isStandalone?: boolean; // 単体思考専用（組み合わせレシピなし）
  guyFace?: GuyFaceParts; // 単語選択時のガイの表情パーツ
  guyReaction?: GuyBodyReaction; // 単語選択時のガイの身体の動き
}

export interface ExaminedSourceItem {
  id: string;
  name: string;
  sourceType: 'P1話題' | 'P2話題' | '端末SECログ' | '選択肢/証言';
  status: '採用' | '見送り';
  category:
    | '採用キー'
    | '単体思考キー'
    | '初期から対話可能'
    | '直接連動(端末読了で解放)'
    | '推理のゴール(ひらめく側)'
    | '情報重複・統合'
    | '相槌・日常小ネタ'
    | '設定不要・除外';
  reason: string;
}

export interface ThinkingRecipe {
  id: string;
  keywordIds: [string, string];
  alternativeKeywordIds?: [string[], string[]];
  label: string;
  type: 'core' | 'chat' | 'joke';
  guyEpiphany: string;
  targetType: 'existing' | 'new'; // 既存話題接続 or 新規会話
  existingTopicId?: string;
  unlockedTopicId: string; // App.tsxとの後方互換用
  descriptionOrReaction: string; // 既存会話のセリフ引用または新規会話の主旨
  requiredPhase1TopicId?: string; // フェーズ1で該当の話題を選択・質問済みであることが閃きの必須条件
  guyFace?: GuyFaceParts; // ひらめき時のガイの表情パーツ（話題ごとに全組み合わせ指定可能）
  guyReaction?: GuyBodyReaction; // ひらめき時のガイの身体の動き（頷き、ため息、身構え等）
}

// 2つのキーワードがレシピに適合するか判定（順不同・完全一致および類似代替キーワード対応）
export const isRecipeMatchKeywords = (
  recipe: ThinkingRecipe,
  id1: string,
  id2: string,
  phase1AskedTopicIds?: string[],
  ignorePhase1Requirement: boolean = false
): boolean => {
  if (!ignorePhase1Requirement && recipe.requiredPhase1TopicId) {
    if (!phase1AskedTopicIds || !phase1AskedTopicIds.includes(recipe.requiredPhase1TopicId)) {
      return false;
    }
  }

  if (id1 === id2) return false;
  const directMatch =
    (recipe.keywordIds[0] === id1 && recipe.keywordIds[1] === id2) ||
    (recipe.keywordIds[0] === id2 && recipe.keywordIds[1] === id1);
  if (directMatch) return true;

  if (recipe.alternativeKeywordIds) {
    const [alts1, alts2] = recipe.alternativeKeywordIds;
    const matchForward = alts1.includes(id1) && alts2.includes(id2);
    const matchReverse = alts1.includes(id2) && alts2.includes(id1);
    if (matchForward || matchReverse) return true;
  }
  return false;
};

// 指定した手持ちキーワード群で、そのレシピが作成可能か判定
export const canCraftRecipeWithKeywords = (
  recipe: ThinkingRecipe,
  unlockedKeywordIds: string[],
  phase1AskedTopicIds?: string[],
  ignorePhase1Requirement: boolean = false
): boolean => {
  if (!ignorePhase1Requirement && recipe.requiredPhase1TopicId) {
    if (!phase1AskedTopicIds || !phase1AskedTopicIds.includes(recipe.requiredPhase1TopicId)) {
      return false;
    }
  }

  // 直接一致
  const hasDirect =
    unlockedKeywordIds.includes(recipe.keywordIds[0]) &&
    unlockedKeywordIds.includes(recipe.keywordIds[1]);
  if (hasDirect) return true;

  // 代替キーワード一致
  if (recipe.alternativeKeywordIds) {
    const [alts1, alts2] = recipe.alternativeKeywordIds;
    const candidates1 = alts1.filter((id) => unlockedKeywordIds.includes(id));
    const candidates2 = alts2.filter((id) => unlockedKeywordIds.includes(id));
    return candidates1.some((c1) => candidates2.some((c2) => c1 !== c2));
  }
  return false;
};

// 不成立時のガイの汎用モノローグ
export const GENERIC_FAIL_MONOLOGUES: string[] = [
  '・・・・・・ん？ いや、これは関係ねえか',
  'さすがにこいつとこいつは繋がらねえな',
  '・・・・・・違うな。別の線から考えてみるか',
  '焦っても仕方ねえ。他の手がかりを洗ってみるか',
  'いくらなんでも、そりゃ突拍子もなさすぎるぜ',
];

// === 1. 厳選キーワード一覧（全19件：組み合わせ18件 ＋ 単体思考専用1件） ===
export const THINKING_KEYWORDS: ThinkingKeyword[] = [
  {
    id: 'kw_tarlow_a',
    label: 'タルロウA',
    guyThought:
      'あれが、あいつだったのか・・・・・・？\n何度も見かけたはずだが、全然気づかなかったな',
    sourceDescription:
      '会話「『タルロウA』と名乗っていた理由」「お茶でも淹れようか」完了、または端末SEC-01/05/09閲覧後に獲得',
    unlockTrigger: {
      type: 'topic',
      targetId: 'p2_tarlow_past',
      detailLabel: '話題「タルロウAと名乗っていた理由」完了',
    },
    unlockTriggers: [
      {
        type: 'topic',
        targetId: 'p2_tarlow_past',
        detailLabel: '話題「タルロウAと名乗っていた理由」完了',
      },
      {
        type: 'topic',
        targetId: 'p1_dist_loyalty',
        detailLabel: '話題「ディストのこと」(P1)完了',
      },
      {
        type: 'topic',
        targetId: 'p2_tea_and_taste',
        detailLabel: '話題「お茶でも淹れようか」完了',
      },
      {
        type: 'sector',
        targetId: 'SEC-01',
        detailLabel: '端末SEC-01「機体名登録・音声設定破損履歴」閲覧',
      },
      {
        type: 'sector',
        targetId: 'SEC-05',
        detailLabel: '端末SEC-05「経口摂取機構仕様・味覚嗜好記録」閲覧',
      },
      {
        type: 'sector',
        targetId: 'SEC-09',
        detailLabel: '端末SEC-09「機体名変更拒否・雑務命令不履行記録」閲覧',
      },
      {
        type: 'topic',
        targetId: 'p2_term_sec05_pepper',
        detailLabel: '話題「飲食できる機体の仕様」完了',
      },
    ],
    whyAdopted: '過去の機体と潜伏の事実を象徴する基本核情報。',
    guyFace: {
      base: 'base',
      brow: 'normal',
      eyes: 'away',
      mouth: 'close',
    },
    guyReaction: 'sigh',
  },
  {
    id: 'kw_height_10yo',
    label: '今の機体',
    guyThought:
      '・・・・・・ちっこいな。11年前に屋敷で見た姿そのままだ。こんな小さな機体になっちまって・・・・・・',
    sourceDescription:
      '会話「昔を思い出す背丈」「どうしてその10歳の姿なのか」「傷のない体」「今着ている服」完了、または端末SEC-00/03/11/16閲覧後に獲得',
    unlockTrigger: {
      type: 'choice',
      targetId: 'choice_pat_head',
      detailLabel: '会話中の選択肢「頭にポンと手を置く」実行時',
    },
    unlockTriggers: [
      {
        type: 'choice',
        targetId: 'choice_pat_head',
        detailLabel: '会話中の選択肢「頭にポンと手を置く」実行時',
      },
      {
        type: 'topic',
        targetId: 'p2_height_headpat',
        detailLabel: '話題「昔を思い出す背丈」完了',
      },
      {
        type: 'topic',
        targetId: 'p2_why_10yo_body',
        detailLabel: '話題「どうしてその10歳の姿なのか」完了',
      },
      {
        type: 'topic',
        targetId: 'p2_unscarred_hands',
        detailLabel: '話題「傷のない体」完了',
      },
      {
        type: 'topic',
        targetId: 'p2_clothes',
        detailLabel: '話題「今着ている服」完了',
      },
      {
        type: 'oralInfo',
        targetId: 'oral_unscarred_hands',
        detailLabel: '口頭証言「人形のように滑らかな肌質」獲得時',
      },
      {
        type: 'topic',
        targetId: 'p1_touch_shoulder',
        detailLabel: '話題「不意に頭へ手を伸ばす」(P1)完了',
      },
      {
        type: 'sector',
        targetId: 'SEC-00',
        detailLabel: '端末SEC-00「機体基本仕様・排熱循環系」閲覧',
      },
      {
        type: 'sector',
        targetId: 'SEC-03',
        detailLabel: '端末SEC-03「機体換装履歴」閲覧',
      },
      {
        type: 'sector',
        targetId: 'SEC-11',
        detailLabel: '端末SEC-11「衣装破棄・襟元ボタン装着時間記録」閲覧',
      },
      {
        type: 'sector',
        targetId: 'SEC-16',
        detailLabel: '端末SEC-16「人工表皮初期状態・右掌接触動作記録」閲覧',
      },
      {
        type: 'topic',
        targetId: 'p2_term_sec00_blush',
        detailLabel: '話題「顔が赤くなる仕組み」完了',
      },
      {
        type: 'topic',
        targetId: 'p2_term_sec16_palm_habit',
        detailLabel: '話題「右の掌をこする癖」完了',
      },
    ],
    whyAdopted: '現在の視覚的・感情的中心。屋敷の思い出と剣士の歴史喪失を集約する最重要核。',
    guyFace: {
      base: 'base2',
      brow: 'troubled',
      eyes: 'half',
      mouth: 'close',
    },
    guyReaction: 'sigh',
  },
  {
    id: 'kw_sword_limiter',
    label: '出力制限',
    guyThought:
      '出力が二割も出ねえのか。そんな制限かけられてたら、\nまともに動くことすらままならないのかもしれない',
    sourceDescription:
      '会話「その機体で剣は振れるのか」完了、または端末SEC-08閲覧後に獲得',
    unlockTrigger: {
      type: 'topic',
      targetId: 'p2_sword_limiter',
      detailLabel: '話題「その機体で剣は振れるのか」完了',
    },
    unlockTriggers: [
      {
        type: 'topic',
        targetId: 'p2_sword_limiter',
        detailLabel: '話題「その機体で剣は振れるのか」完了',
      },
      {
        type: 'sector',
        targetId: 'SEC-08',
        detailLabel: '端末SEC-08「四肢出力制限（上限18%）・転倒記録」閲覧',
      },
      {
        type: 'topic',
        targetId: 'p2_term_sec08_swing_fall',
        detailLabel: '話題「空き部屋での素振りの記録」完了',
      },
    ],
    whyAdopted: '剣士としてのアイデンティティ剥奪と束縛を示す重要概念。',
    guyFace: {
      base: 'base',
      brow: 'angry',
      eyes: 'away',
      mouth: 'close',
    },
    guyReaction: 'none',
  },
  {
    id: 'kw_apron',
    label: 'エプロン',
    guyThought:
      'こんなヒラヒラしたもん着せられて・・・・・・\nすげえ嫌そうな顔してるのが、逆にいつものあいつらしいというか・・・・・・',
    sourceDescription:
      '会話「エプロンのこと」「家事労働補助プロトコル」完了後に獲得',
    unlockTrigger: {
      type: 'topic',
      targetId: 'p2_maid_apron',
      detailLabel: '話題「エプロンのこと」完了時',
    },
    unlockTriggers: [
      {
        type: 'topic',
        targetId: 'p2_maid_apron',
        detailLabel: '話題「エプロンのこと」完了時',
      },
      {
        type: 'topic',
        targetId: 'p2_tea_reply_preferences',
        detailLabel: '話題「自律給仕型家事労働補助プロトコル」完了',
      },
    ],
    whyAdopted: '本作特有の日常・小ネタ象徴。おふざけ掛け合わせの主軸。',
    guyFace: {
      base: 'base',
      brow: 'troubled',
      eyes: 'half',
      mouth: 'smile',
    },
    guyReaction: 'none',
  },
  {
    id: 'kw_zura_speech',
    label: '語尾',
    guyThought:
      '〜ズラ、か・・・・・・。\n怒り狂って端末ぶっ壊すあいつの顔、目に浮かぶようだぜ',
    sourceDescription:
      '会話「『タルロウX』の語尾」完了、または端末SEC-01閲覧後に獲得',
    unlockTrigger: {
      type: 'sector',
      targetId: 'SEC-01',
      detailLabel: '端末セクターSEC-01閲覧時',
    },
    unlockTriggers: [
      {
        type: 'sector',
        targetId: 'SEC-01',
        detailLabel: '端末SEC-01「機体名登録・音声設定破損履歴」閲覧',
      },
      {
        type: 'topic',
        targetId: 'p1_tarlow_zura',
        detailLabel: '話題「『タルロウX』の語尾」(P1)完了',
      },
      {
        type: 'topic',
        targetId: 'p2_term_sec01_zura',
        detailLabel: '話題「『〜ズラ』語尾と壊した端末」完了',
      },
    ],
    whyAdopted: 'ディストの悪ふざけとアッシュの激怒を象徴する最高のおふざけ素材。',
    guyFace: {
      base: 'base',
      brow: 'normal',
      eyes: 'smile',
      mouth: 'smile',
    },
    guyReaction: 'none',
  },
  {
    id: 'kw_step_stool',
    label: '踏み台',
    guyThought:
      '棚に手が届かなくて部屋中踏み台探して歩き回ってたのか？\nさぞ屈辱だっただろうな・・・・・・',
    sourceDescription:
      '端末SEC-04閲覧、または会話「高い棚と『踏み台』の記録」完了後に獲得',
    unlockTrigger: {
      type: 'sector',
      targetId: 'SEC-04',
      detailLabel: '端末セクターSEC-04閲覧時',
    },
    unlockTriggers: [
      {
        type: 'sector',
        targetId: 'SEC-04',
        detailLabel: '端末SEC-04「視覚高低差照合・踏み台探索記録」閲覧',
      },
      {
        type: 'topic',
        targetId: 'p2_term_sec04_stepstool',
        detailLabel: '話題「高い棚と『踏み台』の記録」完了',
      },
    ],
    whyAdopted: '10歳の背丈ゆえの物理的苦労。からかい会話に直結。',
    guyFace: {
      base: 'base',
      brow: 'troubled',
      eyes: 'half',
      mouth: 'smile',
      ex: 'EX1',
    },
    guyReaction: 'none',
  },
  {
    id: 'kw_lab',
    label: '研究所',
    guyThought:
      'あんな薄気味の悪い研究所で、ディストと二人で・・・・・・。\n息が詰まりそうだな',
    sourceDescription:
      '会話「ディストの研究所での暮らし」「棚に置いてあるチェス盤」完了、または端末SEC-10/13閲覧後に獲得',
    unlockTrigger: {
      type: 'topic',
      targetId: 'p2_dist_complaints',
      detailLabel: '話題「ディストの研究所での暮らし」完了',
    },
    unlockTriggers: [
      {
        type: 'topic',
        targetId: 'p2_dist_complaints',
        detailLabel: '話題「ディストの研究所での暮らし」完了',
      },
      {
        type: 'topic',
        targetId: 'p2_why_outside',
        detailLabel: '話題「研究室で隠れずにいた理由」完了',
      },
      {
        type: 'topic',
        targetId: 'p2_idle_chess',
        detailLabel: '話題「棚に置いてあるチェス盤」完了',
      },
      {
        type: 'topic',
        targetId: 'p2_pastime_reply_correct_chess',
        detailLabel: '話題「チェスでも差して時間を潰さないのか？」完了',
      },
      {
        type: 'sector',
        targetId: 'SEC-10',
        detailLabel: '端末SEC-10「接近音検知・退避初動遅延ログ」閲覧',
      },
      {
        type: 'sector',
        targetId: 'SEC-13',
        detailLabel: '端末SEC-13「単独チェス稼働・盤面再配置記録」閲覧',
      },
      {
        type: 'topic',
        targetId: 'p2_term_sec13_chess_cheat',
        detailLabel: '話題「1人チェスの記録」完了',
      },
    ],
    whyAdopted: '潜伏していた閉鎖環境。シリアスから共同生活の雑談まで展開。',
    guyFace: {
      base: 'base2',
      brow: 'troubled',
      eyes: 'away',
      mouth: 'close',
    },
    guyReaction: 'sigh',
  },
  {
    id: 'kw_chassis_swap',
    label: '機体換装',
    guyThought:
      '二ヶ月前の機体大破・・・・・・\n研究所にいただけのやつが、なんでそんなボロボロに壊れるんだ？',
    sourceDescription:
      '端末SEC-03閲覧、または会話「どうしてその10歳の姿なのか」完了後に獲得',
    unlockTrigger: {
      type: 'sector',
      targetId: 'SEC-03',
      detailLabel: '端末セクターSEC-03閲覧時',
    },
    unlockTriggers: [
      {
        type: 'sector',
        targetId: 'SEC-03',
        detailLabel: '端末SEC-03「機体換装履歴」閲覧',
      },
      {
        type: 'topic',
        targetId: 'p2_why_10yo_body',
        detailLabel: '話題「どうしてその10歳の姿なのか」完了',
      },
    ],
    whyAdopted: '自壊の謎を解く客観的データとして推論に不可欠。',
    guyFace: {
      base: 'base2',
      brow: 'serious',
      eyes: 'half',
      mouth: 'close',
    },
    guyReaction: 'none',
  },
  {
    id: 'kw_blank_2years',
    label: '空白の2年',
    guyThought:
      'エルドラント崩落後の2年間・・・・・・\nあいつ、どこで何をしてたんだ？',
    sourceDescription:
      '会話「空白の2年間の記録について」完了、または端末SEC-19閲覧後に獲得',
    unlockTrigger: {
      type: 'topic',
      targetId: 'p2_ask_about_dp002',
      detailLabel: '話題「空白の2年間の記録について」完了',
    },
    unlockTriggers: [
      {
        type: 'topic',
        targetId: 'p2_ask_about_dp002',
        detailLabel: '話題「空白の2年間の記録について」完了',
      },
      {
        type: 'topic',
        targetId: 'p2_eldrant_and_blank',
        detailLabel: '話題「エルドラントの後のこと」完了',
      },
      {
        type: 'sector',
        targetId: 'SEC-19',
        detailLabel: '端末SEC-19「記憶分離依頼ログ」閲覧',
      },
    ],
    whyAdopted: '物語の最大の謎を握る核心要素。自壊の動機解明の起点。',
    guyFace: {
      base: 'base2',
      brow: 'serious',
      eyes: 'half',
      mouth: 'close',
    },
    guyReaction: 'none',
  },
  {
    id: 'kw_memory_separation',
    label: '記憶分離',
    guyThought:
      'じゃあ、今バチカルにいるルークは・・・・・・！？\n目の前にいるこいつは・・・・・・っ',
    sourceDescription:
      '端末SEC-19「記憶分離依頼ログ」閲覧（または会話「空白の2年間の記録について」）で獲得',
    unlockTrigger: {
      type: 'sector',
      targetId: 'SEC-19',
      detailLabel: '端末SEC-19「記憶分離依頼ログ」閲覧',
    },
    unlockTriggers: [
      {
        type: 'sector',
        targetId: 'SEC-19',
        detailLabel: '端末SEC-19「記憶分離依頼ログ」閲覧',
      },
      {
        type: 'topic',
        targetId: 'p2_ask_about_dp002',
        detailLabel: '話題「空白の2年間の記録について」完了',
      },
    ],
    whyAdopted: '記憶分離の事実から自壊の真相へと繋がる重要キーワード。',
    guyFace: {
      base: 'base2',
      brow: 'serious',
      eyes: 'surprise',
      mouth: 'open',
      ex: 'shadow',
    },
    guyReaction: 'startle',
  },
  {
    id: 'kw_self_destruct',
    label: '自壊の記録',
    guyThought:
      '無茶どころじゃない！\nあいつ、自分の身体を自分で・・・・・・！？',
    sourceDescription:
      '端末SEC-20「『タルロウA』自壊インシデント・再封印記録」閲覧で獲得',
    unlockTrigger: {
      type: 'sector',
      targetId: 'SEC-20',
      detailLabel: '端末セクターSEC-20閲覧時',
    },
    unlockTriggers: [
      {
        type: 'sector',
        targetId: 'SEC-20',
        detailLabel: '端末SEC-20「『タルロウA』自壊インシデント・再封印記録」閲覧',
      },
    ],
    whyAdopted: '物語の最深部に位置する決定打。空白の2年と結びついて真相を暴く。',
    guyFace: {
      base: 'base',
      brow: 'normal',
      eyes: 'surprise',
      mouth: 'open',
      ex: 'shadow',
    },
    guyReaction: 'startle',
  },
  {
    id: 'kw_tatalian',
    label: 'タタル渓谷',
    guyThought:
      'ルークが戻ってきた時の記録を、あいつが何度も漁ってた・・・・・・？\n一体どんな気持ちで見てたんだよ・・・・・・',
    sourceDescription:
      '端末SEC-07閲覧、または会話「タタル渓谷の帰還記録」完了後に獲得',
    unlockTrigger: {
      type: 'sector',
      targetId: 'SEC-07',
      detailLabel: '端末セクターSEC-07閲覧時',
    },
    unlockTriggers: [
      {
        type: 'sector',
        targetId: 'SEC-07',
        detailLabel: '端末SEC-07「外部通信反復照会ログ」閲覧',
      },
      {
        type: 'topic',
        targetId: 'p2_term_sec07_night_search',
        detailLabel: '話題「タタル渓谷の帰還記録」完了',
      },
    ],
    whyAdopted: '最期の地のタブー。空白の2年と組み合わせることで放浪の動機を暴く。',
    guyFace: {
      base: 'base2',
      brow: 'troubled',
      eyes: 'away',
      mouth: 'close',
    },
    guyReaction: 'sigh',
  },
  {
    id: 'kw_asch_alias',
    label: 'アッシュ',
    guyThought:
      '目の前にいるこいつは、一体誰なんだ？\n憎まれ口も目つきも昔のあいつのままだが・・・・・・',
    sourceDescription: '最初から所持',
    unlockTrigger: {
      type: 'initial',
      targetId: 'initial',
      detailLabel: '初期所持キーワード',
    },
    whyAdopted: '目の前にいるあいつそのもの。失われた過去や身体の違和感と結びつける基軸キーワード。',
    guyFace: {
      base: 'base2',
      brow: 'serious',
      eyes: 'normal',
      mouth: 'close',
    },
    guyReaction: 'none',
  },
  {
    id: 'kw_luke',
    label: 'ルーク',
    guyThought:
      'バチカルのルークからは、たまに手紙が届く。あっちで元気にやってるみたいだな',
    sourceDescription:
      '会話「ルークによく似た外見」完了後、またはアッシュからの質問「ルークはどうしてる」回答後に獲得',
    unlockTrigger: {
      type: 'topic',
      targetId: 'p1_luke_model',
      detailLabel: '話題「ルークによく似た外見」完了',
    },
    unlockTriggers: [
      {
        type: 'topic',
        targetId: 'p1_luke_model',
        detailLabel: '話題「ルークによく似た外見」(P1)完了',
      },
      {
        type: 'topic',
        targetId: 'p2_parents_reply_wrong_grudge',
        detailLabel: '会話「ルークに奪われた恨みか？」完了',
      },
      {
        type: 'question',
        targetId: 'q_p2_guy_luke',
        detailLabel: '質問「ルークはどうしてる」回答後',
      },
    ],
    whyAdopted: 'アッシュの最大のコンプレックス。核心対話の外堀を埋めるキー。',
    guyFace: {
      base: 'base',
      brow: 'normal',
      eyes: 'away',
      mouth: 'smile',
    },
    guyReaction: 'none',
  },
  {
    id: 'kw_parents',
    label: 'ファブレ公爵家',
    guyThought:
      'バチカルのお屋敷に、ルークが戻って一年になるのか。\n俺があの家を離れてもう何年になるか・・・・・・懐かしささえ感じるな',
    sourceDescription:
      '会話「今着ている服」「昔を思い出す背丈」「屋敷の公爵様や奥様のこと」完了、または端末SEC-02/15閲覧後に獲得',
    unlockTrigger: {
      type: 'topic',
      targetId: 'p2_clothes',
      detailLabel: '話題「今着ている服」完了',
    },
    unlockTriggers: [
      {
        type: 'topic',
        targetId: 'p2_clothes',
        detailLabel: '話題「今着ている服」完了',
      },
      {
        type: 'topic',
        targetId: 'p2_height_headpat',
        detailLabel: '話題「昔を思い出す背丈」完了',
      },
      {
        type: 'sector',
        targetId: 'SEC-02',
        detailLabel: '端末SEC-02「『ガイ・セシル』照合・メモリ参照ログ」閲覧',
      },
      {
        type: 'sector',
        targetId: 'SEC-15',
        detailLabel: '端末SEC-15「ファブレ公爵夫妻音声照合・波形推移」閲覧',
      },
      {
        type: 'topic',
        targetId: 'p2_parents_thought',
        detailLabel: '話題「屋敷の公爵様や奥様のこと」完了',
      },
      {
        type: 'topic',
        targetId: 'p2_term_sec15_mother_avoid',
        detailLabel: '話題「公爵夫妻に対する感情波形」完了',
      },
    ],
    whyAdopted: '生まれ育った家柄と、ルークが居場所を得たことによる絶望を突く重要キー。',
    guyFace: {
      base: 'base2',
      brow: 'normal',
      eyes: 'half',
      mouth: 'close',
    },
    guyReaction: 'sigh',
  },
  {
    id: 'kw_natalia',
    label: 'ナタリア',
    guyThought:
      'ナタリアは今でもおまえのことを信じて待ってるっていうのに・・・・・・\nあいつ、何でそんな頑なに拒むんだ',
    sourceDescription:
      '会話「みんなの近況」(P2)／「ナタリアのこと」(P1)完了、または選択肢実行で獲得',
    unlockTrigger: {
      type: 'choice',
      targetId: 'choice_bring_up_natalia',
      detailLabel: '会話中の選択肢「ナタリアの話を切り出す」実行時',
    },
    unlockTriggers: [
      {
        type: 'topic',
        targetId: 'p2_friends_news',
        detailLabel: '話題「みんなの近況」完了',
      },
      {
        type: 'choice',
        targetId: 'choice_bring_up_natalia',
        detailLabel: '会話中の選択肢「ナタリアの話を切り出す」実行時',
      },
      {
        type: 'topic',
        targetId: 'p1_natalia_rumor',
        detailLabel: '話題「ナタリアのこと」(P1)完了',
      },
    ],
    whyAdopted: 'ナタリアへの想いとアッシュの拒絶の対比。「なぜ戻らないのか」の前提。',
    guyFace: {
      base: 'base',
      brow: 'troubled',
      eyes: 'close',
      mouth: 'close',
    },
    guyReaction: 'sigh',
  },
  {
    id: 'kw_galdios_sword',
    label: '宝刀ガルディオス',
    guyThought:
      '俺の剣を見るあいつの目・・・・・・\n機体はこんなになっちまっても、やっぱりあいつは剣士なんだな',
    sourceDescription:
      '会話「『宝刀ガルディオス』のこと」(P1/P2)完了、または端末SEC-06閲覧後に獲得',
    unlockTrigger: {
      type: 'topic',
      targetId: 'p1_galdios_sword',
      detailLabel: '話題「宝刀ガルディオスのこと」完了',
    },
    unlockTriggers: [
      {
        type: 'topic',
        targetId: 'p1_galdios_sword',
        detailLabel: '話題「『宝刀ガルディオス』のこと」(P1)完了',
      },
      {
        type: 'topic',
        targetId: 'p2_galdios_sword',
        detailLabel: '話題「『宝刀ガルディオス』のこと」(P2)完了',
      },
      {
        type: 'topic',
        targetId: 'p2_galdios_sword_after_p1',
        detailLabel: '話題「『宝刀ガルディオス』のこと」(P2・P1既出)完了',
      },
      {
        type: 'sector',
        targetId: 'SEC-06',
        detailLabel: '端末SEC-06「『宝刀ガルディオス』視認・波形推移」閲覧',
      },
    ],
    whyAdopted: '剣士としての誇りと執着を象徴する正式名称刀。',
    guyFace: {
      base: 'base',
      brow: 'normal',
      eyes: 'normal',
      mouth: 'normal',
    },
    guyReaction: 'none',
  },

  // --- 【単体思考専用（組み合わせレシピなし：内省・観察読み物）】 ---
  {
    id: 'kw_jade_visit',
    label: 'ジェイド',
    guyThought:
      'あの喰えない男のことだ、全部知ってて面白がってたんじゃねえだろうな',
    sourceDescription:
      '会話「『タルロウA』と名乗っていた理由」「研究所に来ていた大佐のこと」完了、または端末SEC-17閲覧後に獲得',
    unlockTrigger: {
      type: 'topic',
      targetId: 'p2_tarlow_past',
      detailLabel: '話題「タルロウAと名乗っていた理由」完了',
    },
    unlockTriggers: [
      {
        type: 'topic',
        targetId: 'p2_tarlow_past',
        detailLabel: '話題「タルロウAと名乗っていた理由」完了',
      },
      {
        type: 'sector',
        targetId: 'SEC-17',
        detailLabel: '端末SEC-17「『ジェイド・カーティス』接近・警戒ログ」閲覧',
      },
      {
        type: 'topic',
        targetId: 'p2_jade_suspicion',
        detailLabel: '話題「研究所に来ていた大佐のこと」完了',
      },
      {
        type: 'topic',
        targetId: 'p2_term_sec17_jade_smile',
        detailLabel: '話題「大佐の様子」完了',
      },
    ],
    whyAdopted: '大佐の暗躍に対するガイの考察。単体で深く味わう内省キー。',
    guyFace: {
      base: 'base',
      brow: 'serious',
      eyes: 'away',
      mouth: 'open',
    },
    guyReaction: 'none',
    isStandalone: true,
  },
  {
    id: 'kw_dist',
    label: 'ディスト',
    guyThought:
      'よりによってディストなんかに拾われるとはな。あんなやつに生殺与奪を握られてるなんて、\nあいつにすりゃ屈辱以外の何物でもねえだろうに',
    sourceDescription:
      '話題「ディストのこと」(P1)完了、または端末SEC-00閲覧後に獲得',
    unlockTrigger: {
      type: 'topic',
      targetId: 'p1_dist_loyalty',
      detailLabel: '話題「ディストのこと」(P1)完了',
    },
    unlockTriggers: [
      {
        type: 'topic',
        targetId: 'p1_dist_loyalty',
        detailLabel: '話題「ディストのこと」(P1)完了',
      },
      {
        type: 'sector',
        targetId: 'SEC-00',
        detailLabel: '端末SEC-00「初期設定・改修ログ」閲覧',
      },
      {
        type: 'topic',
        targetId: 'p2_dist_complaints',
        detailLabel: '話題「ディストへの愚痴」完了',
      },
    ],
    whyAdopted: 'アッシュを拾い、機体を管理している張本人としての重要キー。',
    guyFace: {
      base: 'base',
      brow: 'troubled',
      eyes: 'half',
      mouth: 'smile',
      ex: 'EX1',
    },
    guyReaction: 'none',
  },
  {
    id: 'kw_taste',
    label: '味覚',
    guyThought:
      '腹は減らねえのに味覚センサーだけは付いてるのか。\n昔の味の好みまで照合できるってんだから、ディストの奴も変なところで凝り性だな',
    sourceDescription:
      '会話「食事はとるのか」(P1)や「砂糖は入れないでおく」(P2)完了、または端末SEC-05閲覧後に獲得',
    unlockTrigger: {
      type: 'topic',
      targetId: 'p1_octopus_meal',
      detailLabel: '話題「食事はとるのか」(P1)完了',
    },
    unlockTriggers: [
      {
        type: 'topic',
        targetId: 'p1_octopus_meal',
        detailLabel: '話題「食事はとるのか」(P1)完了',
      },
      {
        type: 'topic',
        targetId: 'p2_tea_reply_preferences',
        detailLabel: '話題「砂糖は入れないでおく」完了',
      },
      {
        type: 'topic',
        targetId: 'p2_tea_and_taste',
        detailLabel: '話題「お茶でも淹れようか」完了',
      },
      {
        type: 'sector',
        targetId: 'SEC-05',
        detailLabel: '端末SEC-05「経口摂取機構仕様・味覚嗜好記録」閲覧',
      },
    ],
    whyAdopted: '食事や嗜好、センサーにまつわる日常的な疑問のキー。',
    guyFace: {
      base: 'base',
      brow: 'normal',
      eyes: 'away',
      mouth: 'open',
    },
    guyReaction: 'none',
  },
  {
    id: 'kw_age',
    label: '年齢',
    guyThought:
      '見た目と実際の年齢に差があるが、昔から小難しい顔していたからあんまり気にならないもんだな',
    sourceDescription:
      '会話「昔を思い出す背丈」「子ども扱いされるのが嫌なのか？」完了、または端末SEC-11閲覧後に獲得',
    unlockTrigger: {
      type: 'topic',
      targetId: 'p2_height_headpat',
      detailLabel: '話題「昔を思い出す背丈」完了',
    },
    unlockTriggers: [
      {
        type: 'topic',
        targetId: 'p2_height_headpat',
        detailLabel: '話題「昔を思い出す背丈」完了',
      },
      {
        type: 'topic',
        targetId: 'p2_why_hide_reply_wrong_childish',
        detailLabel: '話題「子ども扱いされるのが嫌なのか？」完了',
      },
      {
        type: 'sector',
        targetId: 'SEC-11',
        detailLabel: '端末SEC-11「衣装破棄・襟元ボタン装着時間記録」閲覧',
      },
    ],
    whyAdopted: '10歳の外見と生きていれば21歳という年齢のギャップに迫るキー。',
    guyFace: {
      base: 'base2',
      brow: 'normal',
      eyes: 'half',
      mouth: 'close',
    },
    guyReaction: 'none',
  },
];

// === 2. 組み合わせレシピ一覧（核心・雑談・おふざけ） ===
export const THINKING_RECIPES: ThinkingRecipe[] = [
  // --- 【核心系】 ---
  {
    id: 'recipe_why_hide_truth',
    keywordIds: ['kw_natalia', 'kw_height_10yo'],
    alternativeKeywordIds: [
      ['kw_natalia'],
      ['kw_height_10yo', 'kw_tarlow_a', 'kw_asch_alias'],
    ],
    label: 'みんなの元へ戻らない理由',
    type: 'core',
    targetType: 'existing',
    existingTopicId: 'p2_why_hide_truth',
    guyEpiphany:
      'あいつがナタリアたちのことを突っぱねる理由・・・・・・\nこんな機体じゃ、顔を合わせられねえってことなのか？',
    guyFace: {
      base: 'base2',
      brow: 'serious',
      eyes: 'away',
      mouth: 'close',
    },
    guyReaction: 'sigh',
    unlockedTopicId: 'p2_why_hide_truth',
    descriptionOrReaction:
      'ガイ「・・・・・・なあ。どうしてみんなのところへ帰らないんだ？ ナタリアも、ルークも待ってるっていうのに」／アッシュ「・・・・・・帰る場所などない。俺は3年前のエルドラントで、確かに死んだはずなんだ」',
  },
  {
    id: 'recipe_natalia_rumor_resolve',
    keywordIds: ['kw_luke', 'kw_natalia'],
    label: 'ルークとナタリアの結婚の話',
    type: 'chat',
    targetType: 'new',
    guyEpiphany:
      'そういえば・・・・・・さっきのカマかけ、ルークとナタリアが結婚するって話、あいつ本気にしてねえだろうな',
    guyFace: {
      base: 'base',
      brow: 'troubled',
      eyes: 'surprise',
      mouth: 'smile',
      ex: 'EX1',
    },
    guyReaction: 'startle',
    unlockedTopicId: 'p2_natalia_rumor_resolve',
    descriptionOrReaction:
      'ガイ「さっき話したルークとナタリアの結婚の話だが・・・・・・あれ、お前を揺さぶるためのウソだ。悪かったな」／アッシュ「・・・・・・ルークとナタリアは元々婚約者だ。結婚に向けて話が進んでいるのは当然だろう」',
    requiredPhase1TopicId: 'p1_natalia_rumor',
  },
  {
    id: 'recipe_asch_and_luke',
    keywordIds: ['kw_asch_alias', 'kw_luke'],
    label: 'ルークのこと',
    type: 'chat',
    targetType: 'new',
    guyEpiphany:
      'あいつ、ルークのことは気にしてるみたいだが、本当はどう思ってるんだ？',
    guyFace: {
      base: 'base2',
      brow: 'troubled',
      eyes: 'away',
      mouth: 'close',
    },
    guyReaction: 'none',
    unlockedTopicId: 'p2_asch_and_luke',
    descriptionOrReaction:
      'ガイ「・・・・・・なあ。ルークのことは、今どう思ってるんだ？ あいつ、バチカルでお前の分まで背負い込んであちこち飛び回ってるぞ」／アッシュ「・・・・・・あいつのことは、もう俺が口を挟むことじゃない。あいつはあいつ自身で選んだ道を進んでいる。・・・・・・俺がいちいち指図することじゃねえよ」',
  },
  {
    id: 'recipe_why_10yo_body',
    keywordIds: ['kw_tarlow_a', 'kw_height_10yo'],
    alternativeKeywordIds: [
      ['kw_tarlow_a', 'kw_chassis_swap', 'kw_dist'],
      ['kw_height_10yo'],
    ],
    label: 'どうしてその機体なのか',
    type: 'core',
    targetType: 'existing',
    existingTopicId: 'p2_why_10yo_body',
    guyEpiphany:
      'あいつが何でその機体に入ってるのか・・・・・・ディストの趣味だけで片付く話じゃねえよな',
    guyFace: {
      base: 'base2',
      brow: 'serious',
      eyes: 'half',
      mouth: 'open',
    },
    guyReaction: 'none',
    unlockedTopicId: 'p2_why_10yo_body',
    descriptionOrReaction:
      'ガイ「なぜ、その機体なんだ？ あいつの気まぐれか？」／アッシュ「・・・・・・俺が選んだわけじゃない。レプリカの生成が滞った時の『場繋ぎ』として残されていた機体だ。研究所にこれしかなかっただけだ」',
  },
  {
    id: 'recipe_memory_lock',
    keywordIds: ['kw_blank_2years', 'kw_dist'],
    alternativeKeywordIds: [
      ['kw_blank_2years'],
      ['kw_dist', 'kw_chassis_swap', 'kw_lab', 'kw_tarlow_a'],
    ],
    label: 'ロックをかけられている？',
    type: 'core',
    targetType: 'existing',
    existingTopicId: 'p2_ask_about_memory_lock',
    guyEpiphany:
      '抜け落ちている・・・・・・\nまさか、意図的にロックをかけられているんじゃないか？',
    guyFace: {
      base: 'base2',
      brow: 'serious',
      eyes: 'half',
      mouth: 'open',
      ex: 'EX2',
    },
    guyReaction: 'none',
    unlockedTopicId: 'p2_ask_about_memory_lock',
    descriptionOrReaction:
      'ガイ「エルドラントから1年前まで・・・・・・その2年間だけ抜けているのは、ディストにロックをかけられているんじゃないか？」／アッシュ「・・・・・・っ、くそ、頭が・・・・・・っ。あいつが俺の記憶をどう弄ったかなど知るか・・・・・・っ」',
  },
  {
    id: 'recipe_deep_truth_confront',
    keywordIds: ['kw_self_destruct', 'kw_memory_separation'],
    label: '嘘だよな、こんな記録・・・・・・',
    type: 'core',
    targetType: 'existing',
    existingTopicId: 'p2_deep_truth_confront',
    guyEpiphany:
      'だから、こいつは自壊までしなきゃいけなかった・・・・・・？\n嘘だ、そんなはずない。そんなこと、あってたまるかよ・・・・・・！！',
    guyFace: {
      base: 'base',
      brow: 'angry',
      eyes: 'half',
      mouth: 'open',
      ex: 'EX1',
    },
    guyReaction: 'sigh',
    unlockedTopicId: 'p2_deep_truth_confront',
    descriptionOrReaction:
      'ガイ「・・・・・・おまえ、本当に何も覚えてないのか？ ２ヶ月前に、自分が何で壊れたのかも・・・・・・」／アッシュ「・・・・・・っ、何の話だ。さっきから・・・・・・」',
  },
  {
    id: 'recipe_parents_thought',
    keywordIds: ['kw_parents', 'kw_height_10yo'],
    alternativeKeywordIds: [
      ['kw_parents'],
      ['kw_height_10yo', 'kw_luke', 'kw_asch_alias'],
    ],
    label: '屋敷の公爵様や奥様のこと',
    type: 'core',
    targetType: 'existing',
    existingTopicId: 'p2_parents_thought',
    guyEpiphany:
      'こんな姿で屋敷に戻ったら、奥様がどれだけ取り乱すか・・・・・・あいつ自身、誰よりも分かってるんだろうな',
    guyFace: {
      base: 'base2',
      brow: 'troubled',
      eyes: 'close',
      mouth: 'close',
    },
    guyReaction: 'sigh',
    unlockedTopicId: 'p2_parents_thought',
    descriptionOrReaction:
      'ガイ「・・・・・・なあ。バチカルの公爵様や奥様のことは、今どう思っているんだ？」／アッシュ「・・・・・・今さら父上や母上の話などしてどうなる。あの屋敷にはもう、ちゃんと息子が戻っているんだろうが」',
  },
  {
    id: 'recipe_sword_limiter',
    keywordIds: ['kw_galdios_sword', 'kw_height_10yo'],
    alternativeKeywordIds: [
      ['kw_galdios_sword'],
      ['kw_height_10yo', 'kw_sword_limiter', 'kw_asch_alias'],
    ],
    label: 'その機体で剣は振れるのか',
    type: 'core',
    targetType: 'existing',
    existingTopicId: 'p2_sword_limiter',
    unlockedTopicId: 'p2_sword_limiter',
    guyEpiphany:
      'その小さな手足じゃ、剣を握ることすらできねえんじゃねえのか？',
    descriptionOrReaction:
      'ガイ「普段通り歩いたり喋ったりはできているみたいだけど、その機体で剣を振ったりもできるのか？」／アッシュ「・・・・・・できない。ディストが四肢に出力制限をかけてやがる」',
    guyFace: {
      base: 'base',
      brow: 'angry',
      eyes: 'away',
      mouth: 'close',
    },
    guyReaction: 'none',
  },
  {
    id: 'recipe_hands_and_asch_alias',
    keywordIds: ['kw_height_10yo', 'kw_asch_alias'],
    label: '消えた傷跡',
    type: 'core',
    targetType: 'new',
    guyEpiphany:
      '傷ひとつねえ手・・・・・・。ずっと戦ってきたあいつの手が、こんななわけねえだろ',
    unlockedTopicId: 'p2_hands_and_asch',
    descriptionOrReaction:
      'ガイ「・・・・・・お前が生きて戦ってきた傷跡も、その小さな手からは全部消えているな」／アッシュ「・・・・・・そうだな」',
    guyFace: {
      base: 'base',
      brow: 'troubled',
      eyes: 'half',
      mouth: 'tight',
      ex: 'EX2',
    },
    guyReaction: 'sigh',
  },

  // --- 【雑談・心情系】 ---
  {
    id: 'recipe_tea_memory',
    keywordIds: ['kw_parents', 'kw_height_10yo'],
    alternativeKeywordIds: [
      ['kw_parents'],
      ['kw_height_10yo'],
    ],
    label: '屋敷の紅茶の香り',
    type: 'chat',
    targetType: 'new',
    guyEpiphany:
      'その姿を見てると、昔屋敷で飲んでた紅茶を思い出すぜ。・・・・・・あいつも覚えてるのかね',
    unlockedTopicId: 'p2_tea_memory',
    descriptionOrReaction:
      'ガイ「その姿を見ていると、昔屋敷で淹れてもらった紅茶の香りを思い出すな」／アッシュ「・・・・・・下らんことを思い出すな。こんな機体で茶なんぞ飲んだところで、何の足しにもならん」',
    guyFace: {
      base: 'base',
      brow: 'normal',
      eyes: 'smile',
      mouth: 'smile',
    },
    guyReaction: 'none',
  },

  // --- 【おふざけ・ギャグ系】 ---
  {
    id: 'recipe_stepstool',
    keywordIds: ['kw_height_10yo', 'kw_step_stool'],
    label: '高い棚と『踏み台』の記録',
    type: 'joke',
    targetType: 'existing',
    existingTopicId: 'p2_term_sec04_stepstool',
    guyEpiphany:
      '棚に手が届かねえからって、踏み台探してウロウロしてたのか。くくっ、ちょっとからかってやるか',
    unlockedTopicId: 'p2_term_sec04_stepstool',
    descriptionOrReaction:
      'ガイ「研究所の高い棚に手が届かなくて、誰もいない時に踏み台を探し回ったっていうのは本当か？」／アッシュ「なっ・・・・・・！？ ち、違う、あれは上の棚の資料を確認していただけだ！」',
    guyFace: {
      base: 'base',
      brow: 'normal',
      eyes: 'half',
      mouth: 'smile',
    },
    guyReaction: 'none',
  },
  {
    id: 'recipe_joke_dist_tea',
    keywordIds: ['kw_taste', 'kw_lab'],
    alternativeKeywordIds: [
      ['kw_taste'],
      ['kw_lab', 'kw_dist'],
    ],
    label: '研究所の薬品臭いお茶',
    type: 'joke',
    targetType: 'new',
    guyEpiphany:
      '研究所にいた頃、ディストの淹れたお茶を飲んだりしたのか？ 薬品臭くて飲めたもんじゃなさそうだが',
    unlockedTopicId: 'p2_joke_dist_tea',
    descriptionOrReaction:
      '【新規会話】「ディストの淹れたお茶を飲んだりしなかったのか？」と聞いて呆れられる会話。',
    guyFace: {
      base: 'base',
      brow: 'normal',
      eyes: 'away',
      mouth: 'smile',
    },
    guyReaction: 'none',
  },
  {
    id: 'recipe_joke_ask_zura',
    keywordIds: ['kw_zura_speech', 'kw_height_10yo'],
    label: '一度でいいから',
    type: 'joke',
    targetType: 'new',
    guyEpiphany:
      '怒られるのは百も承知だが、一回くらい『ズラ』って言わせてみてえよな',
    unlockedTopicId: 'p2_joke_ask_zura',
    descriptionOrReaction:
      '【新規会話】「一度だけでいいから『ズラ』って言ってくれないか？」と頼んで、軽蔑の眼差しで見つめられる会話。',
    guyFace: {
      base: 'base',
      brow: 'troubled',
      eyes: 'smile',
      mouth: 'smile',
      ex: 'EX1',
    },
    guyReaction: 'none',
  },
  {
    id: 'recipe_joke_tarlow_apron',
    keywordIds: ['kw_tarlow_a', 'kw_apron'],
    label: 'エプロンを着たタルロウ',
    type: 'joke',
    targetType: 'new',
    guyEpiphany:
      'あの掃除機みたいなタルロウにエプロン巻いて給仕してたのか・・・・・・？',
    unlockedTopicId: 'p2_joke_tarlow_apron',
    descriptionOrReaction:
      '【新規会話】「タルロウAの時もエプロンを巻いて給仕してたのか？」と想像して激怒される会話。',
    guyFace: {
      base: 'base',
      brow: 'troubled',
      eyes: 'half',
      mouth: 'smile',
    },
    guyReaction: 'none',
  },
  {
    id: 'recipe_joke_cup_break',
    keywordIds: ['kw_natalia', 'kw_taste'],
    label: 'ナタリアの料理',
    type: 'joke',
    targetType: 'new',
    guyEpiphany:
      'この機体にも味覚センサーがあるらしいが、\nナタリアの手料理を食わされたらどうなるんだろう',
    unlockedTopicId: 'p2_joke_cup_break',
    descriptionOrReaction:
      '【新規会話】「ナタリアの料理を食べさせられたら、流石に味覚センサーがショートしそうだよな」と聞いて怒鳴られる会話。',
    guyFace: {
      base: 'base',
      brow: 'normal',
      eyes: 'half',
      mouth: 'smile',
    },
    guyReaction: 'none',
  },
  {
    id: 'recipe_joke_asch_age',
    keywordIds: ['kw_age', 'kw_asch_alias'],
    label: 'アッシュの年齢',
    type: 'joke',
    targetType: 'new',
    guyEpiphany:
      '見た目は10歳、生きてりゃもう21歳か。・・・・・・あいつ自身、自分のこと今何歳だと思ってるんだ？',
    unlockedTopicId: 'p2_joke_asch_age',
    descriptionOrReaction:
      '【新規会話】「おまえ、自分のこと今何歳だと思ってるんだ？」と聞いて即答される会話。',
    guyFace: {
      base: 'base',
      brow: 'normal',
      eyes: 'half',
      mouth: 'smile',
    },
    guyReaction: 'none',
  },
  {
    id: 'recipe_joke_luke_age',
    keywordIds: ['kw_age', 'kw_luke'],
    label: 'ルークの年齢',
    type: 'chat',
    targetType: 'new',
    guyEpiphany:
      'そういえばルークの奴、まだ19歳の感覚だとか言ってたな',
    unlockedTopicId: 'p2_joke_luke_age',
    descriptionOrReaction:
      '【新規会話】「ルークの奴、まだ19歳くらいの感覚だって言ってたな」と話す会話。',
    guyFace: {
      base: 'base',
      brow: 'normal',
      eyes: 'smile',
      mouth: 'smile',
    },
    guyReaction: 'none',
  },

  // --- 【ディスト関連（力関係・研究所生活）】 ---
  {
    id: 'recipe_why_dist',
    keywordIds: ['kw_dist', 'kw_blank_2years'],
    alternativeKeywordIds: [
      ['kw_dist'],
      ['kw_blank_2years', 'kw_asch_alias'],
    ],
    label: 'ディストを頼った理由',
    type: 'core',
    targetType: 'new',
    guyEpiphany:
      'そもそも、あいつはなんでディストのところへ行ったんだ？ ろくなことにならないくらい、あいつだって分かってただろうに',
    unlockedTopicId: 'p2_why_dist',
    descriptionOrReaction:
      'ガイ「・・・・・・どうしてディストだったんだ？ 機体の制御まで握られて、好き放題されるって分かってただろうに」／アッシュ「・・・・・・奴なら、俺が死に損ないだろうが何だろうが気にも留めんからだ。気まぐれに実験台にする以外は、放っておいてくれる」',
    guyFace: {
      base: 'base2',
      brow: 'angry',
      eyes: 'away',
      mouth: 'close',
    },
    guyReaction: 'sigh',
  },
  {
    id: 'recipe_dist_life',
    keywordIds: ['kw_dist', 'kw_lab'],
    label: 'ディストとの二人暮らし',
    type: 'chat',
    targetType: 'new',
    guyEpiphany:
      'あのディストと二人きりじゃ、鬱陶しいこと山ほどあっただろうな。・・・・・・少し聞いてやるか',
    unlockedTopicId: 'p2_dist_life',
    descriptionOrReaction:
      'ガイ「あのディストとずっと二人で暮らしていて、よく息が詰まらなかったな。主電源を握られてちゃ下手に逆らえもしないだろ？」／アッシュ「奴の関心は自分の研究だけだ。たまに実験や雑用で喚く以外は放置されていた。・・・・・・くだらん同情を寄せてくる連中より、よほどマシだ」',
    guyFace: {
      base: 'base',
      brow: 'normal',
      eyes: 'normal',
      mouth: 'close',
    },
    guyReaction: 'sigh',
  },
  {
    id: 'recipe_dist_rebellion',
    keywordIds: ['kw_dist', 'kw_sword_limiter'],
    label: 'ディストへの小さな反抗',
    type: 'joke',
    targetType: 'new',
    guyEpiphany:
      '出力制限かけられてたって、あいつの気性ならディストの隙を見て一発くらい蹴り飛ばしてそうだな',
    unlockedTopicId: 'p2_dist_rebellion',
    descriptionOrReaction:
      'ガイ「出力制限をかけられてるとはいえ、あいつが油断してる隙に蹴っ飛ばしたりくらいはしたんじゃないか？」／アッシュ「・・・・・・一度、背後から椅子の脚を蹴り倒したら『私の繊細な骨盤が！』と半日騒ぎ立てやがった。主電源を落とされかけたから、それ以来は無視している」',
    guyFace: {
      base: 'base',
      brow: 'troubled',
      eyes: 'half',
      mouth: 'smile',
      ex: 'EX1',
    },
    guyReaction: 'none',
  },
  {
    id: 'recipe_jade_suspicion',
    keywordIds: ['kw_jade_visit', 'kw_height_10yo'],
    alternativeKeywordIds: [
      ['kw_jade_visit'],
      ['kw_height_10yo', 'kw_asch_alias'],
    ],
    label: '研究所に来ていた大佐のこと',
    type: 'core',
    targetType: 'existing',
    existingTopicId: 'p2_jade_suspicion',
    guyEpiphany:
      'あのジェイドが研究所に出入りしてて、気づいてねえはずがねえ。・・・・・・ちょっとカマをかけてみるか',
    unlockedTopicId: 'p2_jade_suspicion',
    descriptionOrReaction:
      'ガイ「研究所には大佐もよく出入りしていただろ。よく今まで気づかれずにいられたな」／アッシュ「・・・・・・あの眼鏡の話をするな。あいつが来た時は、ただの譜業のフリをしてやり過ごしていた」',
    guyFace: {
      base: 'base',
      brow: 'serious',
      eyes: 'away',
      mouth: 'open',
    },
    guyReaction: 'none',
  },
];

// === 3. 全情報精査テーブルデータ（ALL_EXAMINED_SOURCES：全85件） ===
export const ALL_EXAMINED_SOURCES: ExaminedSourceItem[] = [
  // --- 【フェーズ1話題（全10件）】 ---
  {
    id: 'p1_luke_model',
    name: 'ルークによく似た外見',
    sourceType: 'P1話題',
    status: '採用',
    category: '採用キー',
    reason: '【採用：ルーク】アッシュが最も直視を嫌う存在として採用。',
  },
  {
    id: 'p1_dist_loyalty',
    name: 'ディストのこと',
    sourceType: 'P1話題',
    status: '見送り',
    category: '情報重複・統合',
    reason: 'P2の「ディストの研究所での暮らし（研究所）」に集約。',
  },
  {
    id: 'p1_touch_shoulder',
    name: '不意に頭へ手を伸ばす',
    sourceType: 'P1話題',
    status: '見送り',
    category: '相槌・日常小ネタ',
    reason: '触れ合いアクションの導入部。P2の「10歳の身体」トリガーへ吸収。',
  },
  {
    id: 'p1_galdios_sword',
    name: '『宝刀ガルディオス』のこと',
    sourceType: 'P1話題',
    status: '採用',
    category: '採用キー',
    reason: '【採用：宝刀ガルディオス】剣士の誇りを象徴する名刀として採用。',
  },
  {
    id: 'p1_natalia_rumor',
    name: 'ナタリアのこと',
    sourceType: 'P1話題',
    status: '見送り',
    category: '情報重複・統合',
    reason: 'P2の「ナタリアの近況（ナタリア）」に包括採用。',
  },
  {
    id: 'p1_peony_rabbits',
    name: 'ピオニー陛下のブウサギ',
    sourceType: 'P1話題',
    status: '見送り',
    category: '相槌・日常小ネタ',
    reason: 'P1で完結する小ネタ。境遇推論キーワードとしては浮くため除外。',
  },
  {
    id: 'p1_octopus_meal',
    name: '食事はとるのか',
    sourceType: 'P1話題',
    status: '見送り',
    category: '情報重複・統合',
    reason: '「味覚」キーワードに飲食設定を集約。',
  },
  {
    id: 'p1_asch_rumor',
    name: '『鮮血のアッシュ』の噂',
    sourceType: 'P1話題',
    status: '採用',
    category: '採用キー',
    reason: '【採用：鮮血のアッシュ】過去の二つ名タブーとして採用。',
  },
  {
    id: 'p1_tarlow_zura',
    name: '『タルロウX』の語尾',
    sourceType: 'P1話題',
    status: '採用',
    category: '採用キー',
    reason: '【採用：ズラ語尾】屈辱の音声設定を象徴するおふざけキーとして採用。',
  },
  {
    id: 'p1_why_sneaking',
    name: '部屋の隅で何をしていたか',
    sourceType: 'P1話題',
    status: '見送り',
    category: '相槌・日常小ネタ',
    reason: '潜伏時の相槌話題。「研究所」に包括。',
  },

  // --- 【端末SECログ（全21件）】 ---
  {
    id: 'SEC-00',
    name: '機体基本仕様・排熱循環系',
    sourceType: '端末SECログ',
    status: '採用',
    category: '単体思考キー',
    reason: '【単体思考キー：赤面化の仕組み】譜業仕様を観察するガイの内省用。',
  },
  {
    id: 'SEC-01',
    name: '機体名登録・音声設定破損履歴',
    sourceType: '端末SECログ',
    status: '採用',
    category: '採用キー',
    reason: '【採用：ズラ語尾】端末を叩き割った記録として採用。',
  },
  {
    id: 'SEC-02',
    name: '『ガイ・セシル』照合・メモリ参照ログ',
    sourceType: '端末SECログ',
    status: '見送り',
    category: '直接連動(端末読了で解放)',
    reason: '端末閲覧時の内省演出で完結するため独立キーワード化は見送り。',
  },
  {
    id: 'SEC-03',
    name: '機体換装履歴',
    sourceType: '端末SECログ',
    status: '採用',
    category: '採用キー',
    reason: '【採用：機体換装】2ヶ月前の大破と移設の客観的証拠。',
  },
  {
    id: 'SEC-04',
    name: '視覚高低差照合・踏み台探索記録',
    sourceType: '端末SECログ',
    status: '採用',
    category: '採用キー',
    reason: '【採用：踏み台】高い棚に届かず踏み台を探した記録として採用。',
  },
  {
    id: 'SEC-05',
    name: '経口摂取機構仕様・味覚嗜好記録',
    sourceType: '端末SECログ',
    status: '見送り',
    category: '情報重複・統合',
    reason: '「味覚」キーワードに集約。',
  },
  {
    id: 'SEC-06',
    name: '『宝刀ガルディオス』視認・波形推移',
    sourceType: '端末SECログ',
    status: '見送り',
    category: '情報重複・統合',
    reason: '「宝刀ガルディオス」に包括。',
  },
  {
    id: 'SEC-07',
    name: '外部通信反復照会ログ（タタル渓谷）',
    sourceType: '端末SECログ',
    status: '採用',
    category: '採用キー',
    reason: '【採用：タタル渓谷】ルークが帰還した約束の地への照会ログとして採用。',
  },
  {
    id: 'SEC-08',
    name: '四肢出力制限（上限18%）・転倒記録',
    sourceType: '端末SECログ',
    status: '採用',
    category: '採用キー',
    reason: '【採用：出力制限】剣を振ろうとして転倒した記録として採用。',
  },
  {
    id: 'SEC-09',
    name: '機体名変更拒否・雑務命令不履行記録',
    sourceType: '端末SECログ',
    status: '見送り',
    category: '設定不要・除外',
    reason: '不要な機体名創作を避けるため除外。',
  },
  {
    id: 'SEC-10',
    name: '接近音検知・退避初動遅延ログ',
    sourceType: '端末SECログ',
    status: '見送り',
    category: '直接連動(端末読了で解放)',
    reason: '直接話題「研究室で隠れずにいた理由」に連動。',
  },
  {
    id: 'SEC-11',
    name: '衣装破棄・襟元ボタン装着時間記録',
    sourceType: '端末SECログ',
    status: '見送り',
    category: '情報重複・統合',
    reason: '「子ども服」に集約。',
  },
  {
    id: 'SEC-12',
    name: '自己定義・個体同定未決ログ',
    sourceType: '端末SECログ',
    status: '見送り',
    category: '推理のゴール(ひらめく側)',
    reason: '最終的に突きつける結論側であるため素材からは除外。',
  },
  {
    id: 'SEC-13',
    name: '単独チェス稼働・盤面再配置記録',
    sourceType: '端末SECログ',
    status: '採用',
    category: '採用キー',
    reason: '【採用：チェス】一人チェス盤を並べていた記録として採用。',
  },
  {
    id: 'SEC-14',
    name: '声帯周波数仕様・48時間発声拒否ログ',
    sourceType: '端末SECログ',
    status: '見送り',
    category: '情報重複・統合',
    reason: '声の拒絶は「10歳の身体」と重複するため統合。',
  },
  {
    id: 'SEC-15',
    name: 'ファブレ公爵夫妻音声照合・波形推移',
    sourceType: '端末SECログ',
    status: '採用',
    category: '採用キー',
    reason: '【採用：公爵夫妻】両親への感情を突くタブーキーとして採用。',
  },
  {
    id: 'SEC-16',
    name: '人工表皮初期状態・右掌接触動作記録',
    sourceType: '端末SECログ',
    status: '見送り',
    category: '情報重複・統合',
    reason: '「傷のない手」と完全に重複するため統合。',
  },
  {
    id: 'SEC-17',
    name: '『ジェイド・カーティス』接近・警戒ログ',
    sourceType: '端末SECログ',
    status: '採用',
    category: '単体思考キー',
    reason: '【単体思考キー：ジェイドの来訪】大佐の暗躍を巡るガイの内省用。',
  },
  {
    id: 'SEC-18',
    name: 'エルドラント崩落・最終記憶断片',
    sourceType: '端末SECログ',
    status: '見送り',
    category: '情報重複・統合',
    reason: '「空白の2年」に集約。',
  },
  {
    id: 'SEC-19',
    name: '記憶分離依頼ログ',
    sourceType: '端末SECログ',
    status: '見送り',
    category: '推理のゴール(ひらめく側)',
    reason: '自壊後の記憶封印依頼であり、核心対話の結論そのもの。',
  },
  {
    id: 'SEC-20',
    name: '『タルロウA』自壊インシデント・再封印記録',
    sourceType: '端末SECログ',
    status: '採用',
    category: '採用キー',
    reason: '【採用：自壊の記録】大破の真相が自壊だった証拠。空白の2年にのみ接続。',
  },

  // --- 【フェーズ2主要話題の精査（抜粋）】 ---
  {
    id: 'p2_tarlow_past',
    name: '『タルロウA』と名乗っていた理由',
    sourceType: 'P2話題',
    status: '採用',
    category: '採用キー',
    reason: '【採用：タルロウA】過去の姿の事実。',
  },
  {
    id: 'p2_height_headpat',
    name: '昔を思い出す背丈',
    sourceType: 'P2話題',
    status: '採用',
    category: '採用キー',
    reason: '【採用：10歳の身体】現在の背丈のキー。',
  },
  {
    id: 'p2_tea_and_taste',
    name: 'お茶でも淹れようか',
    sourceType: 'P2話題',
    status: '採用',
    category: '採用キー',
    reason: '【採用：味覚】飲食機構と習慣のキー。',
  },
  {
    id: 'p2_maid_apron',
    name: 'エプロンのこと',
    sourceType: 'P2話題',
    status: '採用',
    category: '採用キー',
    reason: '【採用：エプロン】給仕服の小ネタ・ギャグキー。',
  },
  {
    id: 'p2_sword_limiter',
    name: 'その身体で剣は振れるのか',
    sourceType: 'P2話題',
    status: '採用',
    category: '推理のゴール(ひらめく側)',
    reason:
      '【ひらめく側】「宝刀ガルディオス」＋「10歳の身体（幼い姿）」で開く話題そのもの。完了で【出力制限】獲得。',
  },
  {
    id: 'p2_dist_complaints',
    name: 'ディストの研究所での暮らし',
    sourceType: 'P2話題',
    status: '採用',
    category: '採用キー',
    reason: '【採用：研究所】潜伏生活のキー。',
  },
  {
    id: 'p2_unscarred_hands',
    name: '傷のない体',
    sourceType: 'P2話題',
    status: '採用',
    category: '採用キー',
    reason: '【採用：傷のない手】戦ってきた傷跡の消失のキー。',
  },
  {
    id: 'p2_clothes',
    name: '今着ている服',
    sourceType: 'P2話題',
    status: '採用',
    category: '採用キー',
    reason: '【採用：子ども服】屋敷の思い出の象徴。',
  },
  {
    id: 'p2_friends_news',
    name: 'ナタリアの近況',
    sourceType: 'P2話題',
    status: '採用',
    category: '採用キー',
    reason: '【採用：ナタリア】外の世界と約束の現実キー。',
  },
  {
    id: 'p2_ask_about_dp002',
    name: '空白の2年間の記録について',
    sourceType: 'P2話題',
    status: '採用',
    category: '採用キー',
    reason: '【採用：空白の2年】最大の謎を握る核心キー。',
  },
  {
    id: 'p2_why_hide_truth',
    name: 'ナタリアの元へ戻らない理由',
    sourceType: 'P2話題',
    status: '見送り',
    category: '推理のゴール(ひらめく側)',
    reason: '【ひらめく側】「ナタリア」＋「10歳の身体」で開く話題そのもの。',
  },
  {
    id: 'p2_why_10yo_body',
    name: 'どうしてその10歳の姿なのか',
    sourceType: 'P2話題',
    status: '見送り',
    category: '推理のゴール(ひらめく側)',
    reason: '【ひらめく側】「タルロウA」＋「10歳の身体」で開く話題そのもの。',
  },
  {
    id: 'p2_tarlow_broken_reason',
    name: 'なぜ前の機体が壊れたのか',
    sourceType: 'P2話題',
    status: '見送り',
    category: '直接連動(端末読了で解放)',
    reason: '端末進行（DP-002追究）で解放。思考レシピからは除外・一本化。',
  },
  {
    id: 'p2_deep_truth_confront',
    name: '真相の追及：自壊と封印',
    sourceType: 'P2話題',
    status: '見送り',
    category: '推理のゴール(ひらめく側)',
    reason: '【ひらめく側】「自壊の記録」＋「空白の2年」で到達する最深部話題。',
  },
  {
    id: 'p2_parents_thought',
    name: '屋敷の公爵様や奥様のこと',
    sourceType: 'P2話題',
    status: '見送り',
    category: '推理のゴール(ひらめく側)',
    reason: '【ひらめく側】「公爵夫妻」＋「10歳の身体」で開く話題そのもの。',
  },
  {
    id: 'p2_term_sec04_stepstool',
    name: '高い棚と『踏み台』の記録',
    sourceType: 'P2話題',
    status: '見送り',
    category: '推理のゴール(ひらめく側)',
    reason: '【ひらめく側】「10歳の身体」＋「踏み台」で開く話題そのもの。',
  },
  {
    id: 'p2_term_sec08_swing_fall',
    name: '空き部屋での素振りの記録',
    sourceType: 'P2話題',
    status: '見送り',
    category: '推理のゴール(ひらめく側)',
    reason: '【ひらめく側】「出力制限」＋「傷のない手」で開く話題そのもの。',
  },
  {
    id: 'p2_lab_pastime',
    name: '研究所での食事',
    sourceType: 'P2話題',
    status: '見送り',
    category: '推理のゴール(ひらめく側)',
    reason: '【ひらめく側】「研究所」＋「味覚」で開く話題そのもの。',
  },
  {
    id: 'p2_idle_chess',
    name: '棚に置いてあるチェス盤',
    sourceType: 'P2話題',
    status: '見送り',
    category: '推理のゴール(ひらめく側)',
    reason: '【ひらめく側】「チェス」＋「研究所」で開く話題そのもの。',
  },
];
