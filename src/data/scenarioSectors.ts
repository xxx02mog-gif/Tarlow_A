import {
  AschIncomingQuestion,
  BubbleVoiceEffect,
  ExpressionId,
  FaceParts,
  MemorySector,
  OralInfoEntry,
  SystemLogEntry,
  TopicContextCategory,
} from '../types/game';

export const INITIAL_SYSTEM_LOGS: SystemLogEntry[] = [
  {
    id: 'sys-init-1',
    timestamp: '00:00:01',
    type: 'INFO',
    message:
      'ディスト私設研究所・管理端末 [FON-PAD v4.08] 起動完了。対象機体：自称『タルロウA』（10歳予備素体）とのリンクを確立。',
  },
  {
    id: 'sys-init-2',
    timestamp: '00:00:02',
    type: 'INFO',
    message:
      'サイレント観測モード稼働中。プロテクト解除時の対象機体への神経フィードバックは遮断されており、対象に知られることなく内部記録を閲覧可能です。',
  },
];

export const INITIAL_MEMORY_SECTORS: MemorySector[] = [
  {
    id: 'SEC-00',
    code: 'MC-001',
    capturedQuote: '',
    capturedContext: '初期登録済みの基本機体仕様',
    unlockedTitle: '機体基本構成・第七音素循環仕様',
    unlockedCategory: '機体仕様',
    unlockedContent:
      '自律稼働体『タルロウA』（現・10歳予備素体）の基本骨格構造。フォニム循環系および疑似知覚センサーは健常稼働中。感情波形の上昇に伴い機体表面温度の上昇（いわゆる赤面現象）が確認されている。',
    dialogueUnlockedContent: '',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: true,
    discoveredAt: 0,
    unlocked: true,
    unlockedAt: 1,
    unlockedMethod: 'OVERRIDE',
  },
  // ==========================================
  // 【フェーズ1：タルロウAの嘘を暴く初期ロック（SEC-01〜SEC-03）】
  // ==========================================
  {
    id: 'SEC-01',
    code: 'MC-002',
    capturedQuote: '「俺は『アッシュ』なんかじゃない、ディストが造った自律機械『タルロウA』だ。」',
    capturedContext: '自らの機体名を『タルロウA』と名乗った際の発言',
    unlockedTitle: '機体識別名『タルロウA』と音声設定の拒絶履歴',
    unlockedCategory: '機体仕様',
    unlockedContent:
      'ディストが小型自律機械『タルロウX』の後継機として『タルロウA』の識別名を登録した記録。初期化時にディストがタルロウシリーズ共通の語尾設定（『〜ズラ』）および忠誠プログラムを組み込もうとした際、被験体が激昂して設定端末を物理的に叩き割ったため、通常の言語野がそのまま維持されている。',
    dialogueUnlockedContent:
      '真実を交えた言い逃れで最新機『タルロウA』を演じていたものの、動揺の揺らぎを追及され、中身がアッシュ本人であることが確認された。',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-02',
    code: 'EM-001',
    capturedQuote: '「おまえが誰かは知らんが、用がないならさっさと研究所へ戻せ。」',
    capturedContext: 'ガイのことを知らないふりをした際の発言',
    unlockedTitle: '対象人物『ガイ・セシル』に対する視覚認識・情動反応ログ',
    unlockedCategory: '情動観測',
    unlockedContent:
      '視覚センサーが『ガイ・セシル』を捉えた瞬間、内部メモリが即座にファブレ公爵家および過去の同行記録を参照し、情動波形が急上昇している。「おまえが誰かは知らん」と発言した直後にも強い動揺ノイズが記録されており、ガイを知らないという主張は明白な虚偽である。',
    dialogueUnlockedContent:
      '会話の中で思わずガイの名前を呼んでしまい、最初からガイのことを分かった上で知らないふりをしていたことが判明した。',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-03',
    code: 'MC-003',
    capturedQuote:
      '「・・・・・・2ヶ月前まで、俺は本当に『タルロウA』という50センチくらいの小型機体に入っていた。」',
    capturedContext: '2ヶ月前まで小型機体タルロウAに入っていたと明かした際の発言',
    unlockedTitle: '2ヶ月前の素体換装履歴（小型機体タルロウAから10歳予備素体へ）',
    unlockedCategory: '機体仕様',
    unlockedContent:
      '1年前から2ヶ月前までは全高約50cmの小型機体『タルロウA（アッシュカラーのタルロウ型機体）』として稼働していたが、2ヶ月前に機体が損傷。かつてバチカルでレプリカルークとの入れ替えを行う際、レプリカ生成が滞った場合に送り返される予定だった「10歳当時の予備素体」へとコアが移し替えられた。',
    dialogueUnlockedContent:
      'アッシュ本人の口から、2ヶ月前までは小型機体『タルロウA』だったこと、機体が壊れたために現在の10歳当時の予備素体へ移し替えられたことが語られた。',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },

  // ==========================================
  // 【フェーズ2：しょうもないロック・微笑ましい日常ロック（SEC-04〜SEC-11）】
  // ==========================================
  {
    id: 'SEC-04',
    code: 'EM-002',
    capturedQuote: '「やかましい！　身長の話をするな！」',
    capturedContext: '目線の低さや背丈について触れた際の発言',
    unlockedTitle: '生前身体との視覚高誤差と「高い棚」への不満ログ',
    unlockedCategory: '情動観測',
    unlockedContent:
      '生前の17歳時点（171cm）と現在の10歳予備素体のアイレベルの差により、見下ろされる視線に強い羞恥反応を示す。なお、研究所内で高い棚の資料に手が届かず、周囲に誰もいないことを確認してから踏み台を探し回った稼働記録が残されている。',
    dialogueUnlockedContent:
      '背が小さくなったことへの苛立ちを隠せない様子だったが、小型機体だった頃よりは人間の形になっただけマシだと本人は感じている。',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-05',
    code: 'MC-004',
    capturedQuote: '「・・・・・・茶などいらんと言っているだろう。」',
    capturedContext: 'お茶や食事を勧められた際の発言',
    unlockedTitle: '味覚センサーの嗜好データと差し入れ菓子廃棄ログ',
    unlockedCategory: '機体仕様',
    unlockedContent:
      '機械素体であるため栄養摂取は不要だが、擬似味覚センサーは生前の嗜好を完全に再現している。先日ディストが実験の合間に差し入れた特製の砂糖漬けケーキを一口検知した瞬間に激しい拒絶波形が出力され、即座に突き返した記録が残っている。一方、無糖の紅茶の香りには緩和反応を示す。',
    dialogueUnlockedContent:
      'ガイが淹れたお茶や食べ物の話を通じて、機械の身体になっても生前と変わらない味覚や好みが残っていることが確認された。',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-06',
    code: 'EM-003',
    capturedQuote: '「・・・・・・その刀、おまえの手に戻ったんだな。」',
    capturedContext: '部屋に置かれた宝刀ガルディオスを見た際の発言',
    unlockedTitle: '宝刀ガルディオス視認時の情動緩和ログ',
    unlockedCategory: '情動観測',
    unlockedContent:
      '室内に置かれた『宝刀ガルディオス』を視認した瞬間、警戒状態だった情動波形が大きく軟化し、純粋な安堵反応が記録された。この出来事に関する事前知識はメモリ内に存在せず、今この場で実物を見て初めて知った反応である。',
    dialogueUnlockedContent:
      'ガイの実家の宝刀ガルディオスが戻っていることを今初めて知り、素直に安堵する様子を見せた。',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-07',
    code: 'EM-004',
    capturedQuote: '「・・・・・・外の連中のことなど、俺の知ったことか。」',
    capturedContext: '仲間たちの近況について話題を振られた際の発言',
    unlockedTitle: 'ディスト端末からの外部通信・近況記事の密かな閲覧履歴',
    unlockedCategory: '情動観測',
    unlockedContent:
      '本人は「興味がない」と主張しているが、研究所内のサブ端末から深夜帯にバチカル王城の復興状況、マルクト帝国（ピオニー陛下）の動向、およびタタル渓谷周辺の通信記録を繰り返し検索・閲覧していたアクセス履歴が残っている。',
    dialogueUnlockedContent:
      '口では突き放しつつも、ナタリアやピオニー、そして帰還したルークたちの様子を気にかけていたことが会話の端々から窺えた。',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-08',
    code: 'MC-005',
    capturedQuote: '「・・・・・・ディストが四肢に出力制限をかけてやがる。」',
    capturedContext: '身体の動かしづらさや剣について触れた際の発言',
    unlockedTitle: '戦闘出力リミッター（上限18%）と模擬刀素振り記録',
    unlockedCategory: '機体仕様',
    unlockedContent:
      'ディストにより四肢のアクチュエータへ戦闘出力リミッター（上限18%）が設定されている。研究所の空き部屋で隠れて剣の素振りを試みたものの、出力制限により途中でバランスを崩して転倒し、壁を蹴飛ばしたログが記録されている。',
    dialogueUnlockedContent:
      'ディストに出力制限をかけられて思うように剣を振れないことを忌々しく思っている様子が判明した。',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-09',
    code: 'EM-005',
    capturedQuote: '「・・・・・・あの変態の趣味に付き合わされる身にもなってみろ。」',
    capturedContext: 'ディストの研究所での扱いについて愚痴をこぼした際の発言',
    unlockedTitle: 'ディストによる不採用機体名リストと雑用拒否ログ',
    unlockedCategory: '情動観測',
    unlockedContent:
      'ディストが初期登録時に提案した『スーパー・タルロウA（エース）』『深紅の貴公子クリムゾン号』等の名称案を被験体がすべて却下した記録。また、研究所内の片付けや珈琲淹れを命じられた際もすべて無視している。',
    dialogueUnlockedContent:
      'ディストの悪趣味なネーミングや雑用押し付けに辟易しながらも、研究所を隠れ蓑として利用していたことが分かった。',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-10',
    code: 'EM-006',
    capturedQuote:
      '「・・・・・・別にボサッとしていたわけじゃない。あの変態の相手で疲れていたところに、おまえが勝手に入ってきただけだ。」',
    capturedContext: '研究室に入った際になぜ隠れなかったのか尋ねた際の発言',
    unlockedTitle: 'ディストの長広舌による消耗と隠蔽行動の遅れログ',
    unlockedCategory: '情動観測',
    unlockedContent:
      '本日、ディストが「我が薔薇の芸術と音機関の素晴らしさ」について3時間連続で語り続けたため、被験体の聴覚処理および思考回路が著しく消耗した記録。ディストが席を外した直後、被験体が研究室の隅で聴覚センサーを休めていたところにガイが入室したため、咄嗟に物陰へ隠れる反応が1.8秒遅れ、そのまま発見されるに至った。',
    dialogueUnlockedContent:
      'ディストの果てしない自慢話に付き合わされて消耗していたところにガイが研究室へ入ってきたため、隠れ損ねて鉢合わせしたことが判明した。',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-11',
    code: 'MC-006',
    capturedQuote: '「・・・・・・服の話などどうでもいいだろう。着替えがこれしかなかっただけだ。」',
    capturedContext: '10歳当時の服について触れられた際の発言',
    unlockedTitle: '装飾衣装の廃棄処分と襟元ボタンの格闘記録',
    unlockedCategory: '機体仕様',
    unlockedContent:
      '素体換装時、ディストが用意した過剰なフリル付きの衣装を被験体が即座に廃棄処分にし、備品庫にあった最も簡素な予備服を自ら選んで着用した記録。なお、10歳素体の小さな手指でのボタン留めに慣れておらず、一番上の襟ボタンを留めるのに約3分間格闘していた稼働ログが残っている。',
    dialogueUnlockedContent:
      'ディストが用意した悪趣味な服を拒絶し、備品庫にあった一番まともな服を自分で選んで着ていたことが分かった。',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },

  // ==========================================
  // 【フェーズ2核心（強い心理的負荷により自動ロックがかかった個人的本音）：SEC-12】
  // ==========================================
  {
    id: 'SEC-12',
    code: 'EM-007',
    capturedQuote: '「・・・・・・帰る場所などない。俺は3年前のエルドラントで、確かに死んだはずなんだ。」',
    capturedContext: 'なぜナタリアやルークに会わず研究所に身を隠すのか尋ねた際の発言',
    unlockedTitle: 'バチカル・タタル渓谷への接近回避と被験体の個人的心情',
    unlockedCategory: '情動観測',
    unlockedContent:
      '被験体の強い心理的負荷・忌避反応に伴い、機体システムが本人の意識外で自動的にアクセス制限（PROTECT）を施した領域。「1年前にルークが帰還しているならそれでいい」という反応に加え、「3年前のエルドラントで確かに死んだはずの自分が、なぜ機械の身体でまだ動いているのか自分自身にも分からない」という深い空虚感と、自分が何者かも曖昧なままかつての仲間たちの前に出られないという葛藤波形が記録されている。',
    dialogueUnlockedContent:
      'ルークが戻っているならそれでいいこと、そして死んだはずの自分がなぜ機械の身体で動いているのか自分でも分からないまま誰の前にも出られないという本音が語られた。',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },

  // ==========================================
  // 【フェーズ2〜裏の秘密：エルドラント最期の記憶（SEC-18）とディストによる最深部封印（SEC-19・SEC-20）】
  // ==========================================
  {
    id: 'SEC-18',
    code: 'DP-001',
    capturedQuote: '「・・・・・・ルークが俺を抱えて、眩しい光の中で音素乖離を起こしたことまでは覚えている。」',
    capturedContext: '3年前のエルドラント崩落時の記憶について尋ねた際の発言',
    unlockedTitle: 'エルドラント崩落時の最終記憶と音素乖離の断片',
    unlockedCategory: '深層解凍',
    unlockedContent:
      '崩れゆくエルドラントでルークがアッシュを抱きかかえ、音素乖離（ビッグバン）を起こした瞬間の記憶。アッシュ自身が自覚・保持している「ルーク側の記憶」はこの瞬間の断片のみであり、それ以降の記憶領域には管理者権限による強力なアクセス遮断が施されている。',
    dialogueUnlockedContent:
      '崩れるエルドラントでルークが自分を抱えて音素乖離を起こした瞬間までは覚えているものの、その直後からの記憶には靄がかかっており思い出せないことが判明した。',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-19',
    code: 'DP-002',
    capturedQuote: '「・・・・・・その2年間のことだけ、頭の中に靄がかかったみたいに何も出てこない・・・・・・。」',
    capturedContext: 'エルドラントから1年前までの「空白の2年間」について尋ねた際の発言',
    unlockedTitle: '空白の2年間の放浪と自発的な記憶分離の依頼',
    unlockedCategory: '深層解凍',
    unlockedContent:
      '【管理者権限ロック 1/2】エルドラントでの音素乖離により、ルークとアッシュの記憶が混ざり合った状態で1つの肉体に宿った。その後2年間、自分が生き残ってしまったことに苦悩しながら各地を放浪。1年前、その肉体を「ルーク」としてタタル渓谷へ帰すため、アッシュ自らがディストのもとを訪れ「俺の記憶を切り離せ」と記憶の分離を依頼した記録。ディストは切り離したアッシュ側の記憶を消去せず、プラネットストーム停止により希少化した高純度の第七音素（資源）および記憶ベースの自律稼働機体へ組み込むのに好都合な「生体記憶」として確保し、小型機体『タルロウA』へと移植した。',
    paradoxWarning:
      'ディストによる管理者権限ロック（1/2）：機体サンプルの精神崩壊・資源損失を防ぐため閲覧が遮断されている記録です',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    onlyOverride: true,
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-20',
    code: 'DP-003',
    capturedQuote: '「・・・・・・やめろ、それ以上聞くな・・・・・・っ！　考えようとすると、思考回路が焼き切れそうになる・・・・・・っ！」',
    capturedContext: '2ヶ月前にタルロウAが壊れた理由を思い出そうとして頭痛・ノイズ発作を起こした際の発言',
    unlockedTitle: '小型機体『タルロウA』損傷の真相と自壊の試み',
    unlockedCategory: '深層解凍',
    unlockedContent:
      '【管理者権限ロック 2/2】2ヶ月前、タルロウAとして稼働していた被験体が自力でプロテクトを解除し、1年前の記憶分離の経緯および「自分が本来消去されるはずだった記憶の残り滓である」という事実に気付いて自ら機体を破壊（自壊）しようとした記録。半壊しているところを発見したディストが、貴重な機体サンプルおよび高純度の第七音素資源の損失を防ぐため、管理者権限で SEC-19 および本セクター（SEC-20）に強固なロックをかけ直し、現在の10歳予備素体へと換装した。',
    paradoxWarning:
      'ディストによる管理者権限ロック（2/2）：被験体の自己破壊によるサンプル損失を防ぐため厳重に遮断されている記録です',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'shock',
    onlyOverride: true,
    discovered: false,
    unlocked: false,
  },
];

// 端末の正体を明かす前（terminal_revealed未取得時）に端末を閉じたときの反応（最大3回・すべて別セリフ）
export const TERMINAL_UNREVEALED_REACTIONS: {
  text: string;
  expression: ExpressionId;
  faceParts: Partial<FaceParts>;
  voiceEffect?: BubbleVoiceEffect;
  moodDelta: number;
  logMessage: string;
}[] = [
  {
    text: '・・・・・・人の顔と手元の板を交互に見て、さっきから何のつもりだ。',
    expression: 'look_away',
    faceParts: { brow: 'doubt', eyes: 'away', mouth: 'frown', effects: [] },
    moodDelta: 0,
    logMessage: '対象は手元の板の用途を訝しんでいます（自身の内部モニターだとは気づいていません）。',
  },
  {
    text: '・・・・・・さっきからその板ばかり見やがって・・・・・・。用がないなら俺は戻るぞ。',
    expression: 'glare',
    faceParts: { brow: 'angry', eyes: 'glare', mouth: 'frown', effects: [] },
    moodDelta: -1,
    logMessage: '対象が端末への頻繁な視線移動に苛立ちを示しています。',
  },
  {
    text: '・・・・・・おい、聞いているのか。人の前で黙って板ばかり眺めるな。',
    expression: 'glare',
    faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: [] },
    moodDelta: -2,
    logMessage: '対象が放置と端末注視に対して強い不機嫌反応を示しました。',
  },
];

// 端末の正体を明かした後（terminal_revealed取得後）に閉じたときの反応（最大3回・すべて別セリフ）
export const TERMINAL_GAZE_REACTIONS: {
  text: string;
  expression: ExpressionId;
  faceParts: Partial<FaceParts>;
  voiceEffect?: BubbleVoiceEffect;
  moodDelta: number;
  errorDelta: number;
  logMessage: string;
}[] = [
  {
    text: '・・・・・・おい、さっきからその端末で何を見ている。',
    expression: 'glare',
    faceParts: { brow: 'doubt', eyes: 'glare', mouth: 'frown', effects: ['sweat'] },
    moodDelta: 0,
    errorDelta: 0,
    logMessage: '対象が端末画面への視線を警戒しています。',
  },
  {
    text: '・・・・・・まさか、変な記録まで勝手に開けているんじゃないだろうな。',
    expression: 'look_away',
    faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
    moodDelta: -1,
    errorDelta: 0,
    logMessage:
      '対象が内部記録の閲覧状況を探っています（どの項目が解除されたかは対象には通知されません）。',
  },
  {
    text: '・・・・・・言っておくが、これ以上奥の項目を漁るなよ。趣味が悪いからな。',
    expression: 'glare',
    faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: ['blush', 'sweat'] },
    moodDelta: -2,
    errorDelta: 0,
    logMessage:
      '対象は自身の個人的な隠し事（SEC-12）を見られることを強く警戒しています（最下層のディスト封印には気づいていません）。',
  },
];

// 無言で放置したときの反応（最大3回・すべて別セリフ）
export const IDLE_REACTIONS: {
  stage: number;
  thresholdSec: number;
  text: string;
  expression: ExpressionId;
  faceParts?: Partial<FaceParts>;
  moodDelta?: number;
  errorDelta: number;
  logType: 'INFO' | 'WARNING' | 'ERROR';
  logMessage: string;
}[] = [
  {
    stage: 1,
    thresholdSec: 18,
    text: '・・・・・・おい。黙り込んで何を見ている。',
    expression: 'look_away',
    faceParts: { brow: 'doubt', eyes: 'away', mouth: 'frown', effects: [] },
    moodDelta: 0,
    errorDelta: 0,
    logType: 'INFO',
    logMessage: '無言状態の継続（1回目）を検知。',
  },
  {
    stage: 2,
    thresholdSec: 36,
    text: '・・・・・・話すことがないなら、もう研究所へ戻ってもいいか。',
    expression: 'normal',
    faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
    moodDelta: -1,
    errorDelta: 0,
    logType: 'INFO',
    logMessage: '対象が沈黙に居心地の悪さを示しています（2回目）。',
  },
  {
    stage: 3,
    thresholdSec: 54,
    text: '・・・・・・チッ、人を勝手に連れ込んでおいて放置か。いい加減にしろよ。',
    expression: 'glare',
    faceParts: { brow: 'angry', eyes: 'glare', mouth: 'frown', effects: [] },
    moodDelta: -2,
    errorDelta: 0,
    logType: 'WARNING',
    logMessage: '長時間の放置により対象の機嫌が悪化しました（3回目・以降放置反応停止）。',
  },
];

export const CONTEXT_IDLE_REACTIONS: Record<
  TopicContextCategory,
  {
    stage1: {
      text: string;
      expression: ExpressionId;
      faceParts: Partial<FaceParts>;
      logMessage: string;
    };
    stage2: {
      text: string;
      expression: ExpressionId;
      faceParts: Partial<FaceParts>;
      logMessage: string;
      naturalUnlockSectorId?: string;
      oralInfo?: OralInfoEntry;
    };
  }
> = {
  body: {
    stage1: {
      text: '・・・・・・なんだよ。人の身体をじろじろ見るな。',
      expression: 'look_away',
      faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush'] },
      logMessage: '素体に関する会話後の沈黙：対象が視線を気にしています。',
    },
    stage2: {
      text: '・・・・・・以前の鉄塊よりは、今の形の方がまだマシだがな。',
      expression: 'normal',
      faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
      logMessage: '素体に対する本音が観測されました。',
    },
  },
  past: {
    stage1: {
      text: '・・・・・・昔の話ばかり掘り返して、何が楽しいんだ。',
      expression: 'look_away',
      faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
      logMessage: '過去の話題後の沈黙：対象が視線を逸らしています。',
    },
    stage2: {
      text: '・・・・・・まあ、おまえとこうして話すのも随分久しぶりだがな。',
      expression: 'normal',
      faceParts: { brow: 'normal', eyes: 'down', mouth: 'close', effects: [] },
      logMessage: '対象の情動波形が穏やかに安定しています。',
    },
  },
  daily: {
    stage1: {
      text: '・・・・・・相変わらず、静かな部屋だな。ディストの騒々しい実験室とは大違いだ。',
      expression: 'normal',
      faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
      logMessage: '日常会話後の沈黙：対象が室内を見回しています。',
    },
    stage2: {
      text: '・・・・・・少しだけなら、まだ居てやってもいい。',
      expression: 'look_away',
      faceParts: { brow: 'normal', eyes: 'down', mouth: 'close', effects: ['blush'] },
      logMessage: '対象の警戒レベルが低下しました。',
    },
  },
  friends: {
    stage1: {
      text: '・・・・・・あいつらが元気でやっているなら、それでいい。',
      expression: 'look_away',
      faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
      logMessage: '仲間に関する話題後の沈黙。',
    },
    stage2: {
      text: '・・・・・・おまえも、あまり余計な気を回すなよ。',
      expression: 'normal',
      faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
      logMessage: '対象が静かに息をつきました。',
    },
  },
  core: {
    stage1: {
      text: '・・・・・・おい、さっきから何を考え込んでいる。',
      expression: 'glare',
      faceParts: { brow: 'doubt', eyes: 'glare', mouth: 'frown', effects: ['sweat'] },
      logMessage: '核心話題後の沈黙：対象がガイの表情を窺っています。',
    },
    stage2: {
      text: '・・・・・・変な詮索はそこまでにしておけよ、ガイ。',
      expression: 'look_away',
      faceParts: { brow: 'sad', eyes: 'away', mouth: 'frown', effects: ['sweat'] },
      logMessage: '対象がこれ以上の踏み込みを警戒しています。',
    },
  },
  fight: {
    stage1: {
      text: '・・・・・・チッ。',
      expression: 'glare',
      faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: [] },
      logMessage: '反発後の沈黙。',
    },
    stage2: {
      text: '・・・・・・はぁ。もういい、今のは忘れろ。',
      expression: 'look_away',
      faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
      logMessage: '対象が自ら怒りを収めました。',
    },
  },
};

export const ANGRY_COOLDOWN_REACTION = {
  thresholdSec: 56,
  text: '・・・・・・はぁ。・・・・・・俺も少し大人気なかったな。もういい、話したければ話せ。',
  expression: 'look_away' as ExpressionId,
  faceParts: {
    brow: 'sad' as const,
    eyes: 'away' as const,
    mouth: 'close' as const,
    effects: [],
  },
  moodDelta: 3,
  logMessage: '無言の経過により対象の情動波形が鎮静化しました。',
};

export const AWAY_RETURN_REACTIONS = {
  phase1: [
    {
      text: '・・・・・・視線が外れたな。質問がないなら、俺はいつでも研究所へ戻る。',
      expression: 'normal' as ExpressionId,
      faceParts: {
        brow: 'normal' as const,
        eyes: 'normal' as const,
        mouth: 'close' as const,
        effects: [],
      },
      logMessage: '視線離脱からの復帰（Phase 1・1回目）を記録。',
    },
    {
      text: '・・・・・・人を部屋に連れ込んでおいて、よそ見とはいい気なものだな。',
      expression: 'look_away' as ExpressionId,
      faceParts: {
        brow: 'angry' as const,
        eyes: 'away' as const,
        mouth: 'frown' as const,
        effects: [],
      },
      logMessage: '視線離脱からの復帰（Phase 1・2回目）を記録。',
    },
    {
      text: '・・・・・・まだ他に気を取られているのか。用が済んだなら帰らせろ。',
      expression: 'glare' as ExpressionId,
      faceParts: {
        brow: 'angry' as const,
        eyes: 'glare' as const,
        mouth: 'frown' as const,
        effects: [],
      },
      logMessage: '視線離脱からの復帰（Phase 1・3回目）を記録。',
    },
  ],
  angry: [
    {
      text: '・・・・・・どこへ目を逸らしていたんだ、おい。',
      expression: 'glare' as ExpressionId,
      faceParts: {
        brow: 'angry' as const,
        eyes: 'glare' as const,
        mouth: 'frown' as const,
        effects: [],
      },
      logMessage: '離席復帰時の反応（怒り・1回目）を記録。',
    },
    {
      text: '・・・・・・人の顔も見ずに考え事か。感じが悪いぞ、ガイ。',
      expression: 'glare' as ExpressionId,
      faceParts: {
        brow: 'angry' as const,
        eyes: 'away' as const,
        mouth: 'grit' as const,
        effects: [],
      },
      logMessage: '離席復帰時の反応（怒り・2回目）を記録。',
    },
    {
      text: '・・・・・・チッ、話す気がないなら勝手にしろ。',
      expression: 'look_away' as ExpressionId,
      faceParts: {
        brow: 'angry' as const,
        eyes: 'down' as const,
        mouth: 'frown' as const,
        effects: [],
      },
      logMessage: '離席復帰時の反応（怒り・3回目）を記録。',
    },
  ],
  normal: [
    {
      text: '・・・・・・なんだ、急によそ見をして。考え事でもしていたのか。',
      expression: 'normal' as ExpressionId,
      faceParts: {
        brow: 'doubt' as const,
        eyes: 'normal' as const,
        mouth: 'close' as const,
        effects: [],
      },
      logMessage: '離席復帰時の反応（通常・1回目）を記録。',
    },
    {
      text: '・・・・・・おい、人の話を聞きながら別のことを考えるな。',
      expression: 'look_away' as ExpressionId,
      faceParts: {
        brow: 'angry' as const,
        eyes: 'away' as const,
        mouth: 'frown' as const,
        effects: ['blush' as const],
      },
      logMessage: '離席復帰時の反応（通常・2回目）を記録。',
    },
    {
      text: '・・・・・・まったく、落ち着きのない奴だな。もう用は済んだのか？',
      expression: 'look_away' as ExpressionId,
      faceParts: {
        brow: 'sad' as const,
        eyes: 'away' as const,
        mouth: 'close' as const,
        effects: [],
      },
      logMessage: '離席復帰時の反応（通常・3回目）を記録。',
    },
  ],
};

export const DEFAULT_BAD_MOOD_REFUSAL_LINES: {
  aschText: string;
  expression: ExpressionId;
  faceParts: Partial<FaceParts>;
  voiceEffects?: BubbleVoiceEffect[];
}[] = [
  {
    aschText: '・・・・・・今はその話をする気にならん。',
    expression: 'look_away',
    faceParts: { brow: 'sad', eyes: 'away', mouth: 'frown', effects: [] },
  },
  {
    aschText: '・・・・・・わるいが、その話は後にしてくれ。',
    expression: 'look_away',
    faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
  },
  {
    aschText: '・・・・・・今は少し黙っていてくれ。',
    expression: 'look_away',
    faceParts: { brow: 'angry', eyes: 'away', mouth: 'close', effects: [] },
  },
  {
    aschText: '・・・・・・その話はまた今度にしろ。',
    expression: 'look_away',
    faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
  },
  {
    aschText: '・・・・・・今は少し頭を冷やしているところだ。',
    expression: 'look_away',
    faceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
  },
];

// 無言（放置）から復帰してガイが話しかけた際、アッシュが本題の前に挟む短い一言
export const RETURN_FROM_IDLE_LINES: string[] = [
  '・・・・・・なんだ、やっと口を開いたか。',
  '・・・・・・急に黙り込むから、何を考えているのかと思っただろうが。',
  '・・・・・・ふん、まだ話すことがあるなら聞いてやる。',
];

// 気まずい・不機嫌な空気の中で別の通常話題を振る際のガイの言い淀み（IMMUTABLE_RULES 6-②準拠）
export const AWKWARD_TOPIC_PREFIXES: string[] = [
  '・・・・・・ええと、少し話を変えるが、',
  '・・・・・・いや、その・・・・・・それよりさ、',
  '・・・・・・なあ、こういう空気で聞くのもあれだけど、',
];

// シリアスな話題から日常の話題へ切り替える際のガイの言い淀みとアッシュの反応
export const SERIOUS_TO_BRIGHT_TRANSITIONS: {
  guyHesitation: string;
  aschTransition: string;
  expression: ExpressionId;
  faceParts: Partial<FaceParts>;
}[] = [
  {
    guyHesitation: '・・・・・・いや、少し話が重くなったな。ええと・・・・・・。',
    aschTransition:
      '・・・・・・なんだ、急に歯切れが悪いな。言いたいことがあるならはっきり言え。',
    expression: 'look_away',
    faceParts: { brow: 'doubt', eyes: 'away', mouth: 'close', effects: [] },
  },
  {
    guyHesitation:
      '・・・・・・っと、こういう話ばかりでも詰まるよな。そういえばさ・・・・・・。',
    aschTransition:
      '・・・・・・ふん、無理に気を使わなくてもいいだろうが。で、なんだ。',
    expression: 'normal',
    faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
  },
];

// フェーズ2の穏やかな会話の区切りで発生するアッシュからの逆質問（IMMUTABLE_RULES 6-①準拠）
export const TURN_MILESTONE_QUESTIONS: {
  turnCount: number;
  questionLine: string;
  expression: ExpressionId;
  faceParts: Partial<FaceParts>;
  question: AschIncomingQuestion;
}[] = [
  {
    turnCount: 6,
    questionLine:
      '・・・・・・おい、ガイ。おまえ自身は今、バチカルとグランコクマのどっちにいることが多いんだ。',
    expression: 'normal',
    faceParts: { brow: 'normal', eyes: 'normal', mouth: 'open', effects: [] },
    question: {
      id: 'q_p2_guy_life',
      promptSummary: '最近の拠点や暮らしぶりについてアッシュに答える',
      options: [
        {
          id: 'q_p2_life_both',
          thoughtText: '最近は仕事でグランコクマとバチカルを行ったり来たりしていると答える',
          spokenText:
            '最近は仕事でグランコクマとバチカルを行ったり来たりしているよ。ピオニー陛下にも大佐にもよく呼び出されるからな。',
          aschText:
            '・・・・・・そうか。おまえはお人好しだからな、あの眼鏡やピオニーにいいようにこき使われるなよ。',
          expression: 'normal',
          faceParts: { brow: 'smile', eyes: 'away', mouth: 'close', effects: [] },
          moodDelta: 1,
          trustDelta: 1,
          hideWhenBadMoodOrCold: true,
        },
        {
          id: 'q_p2_life_room',
          thoughtText: '今はここ（グランコクマ）の屋敷にいることが多いと答える',
          spokenText:
            '今はここの屋敷にいることが多いかな。静かで落ち着いたいい部屋だろ？',
          aschText:
            '・・・・・・ふん、まあ悪くはないな。少なくとも、あの変態の騒々しい研究所よりは落ち着く。',
          expression: 'look_away',
          faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: ['blush'] },
          moodDelta: 1,
          trustDelta: 1,
          hideWhenBadMoodOrCold: true,
        },
        {
          id: 'q_p2_life_cold',
          thoughtText: '「おまえに俺の居場所をいちいち教える義理はないだろ」と突き放す',
          spokenText: '・・・・・・おまえに俺の居場所をいちいち教える義理はないだろ。',
          aschText: '・・・・・・チッ、聞いた俺が馬鹿だったな。そういう態度なら好きにしろ。',
          expression: 'glare',
          faceParts: { brow: 'angry', eyes: 'glare', mouth: 'frown', effects: [] },
          moodDelta: -3,
          guyMoodDelta: -1,
          requireBadMoodOrCold: true,
        },
      ],
    },
  },
  {
    turnCount: 9,
    questionLine:
      '・・・・・・なあ、ガイ。俺が突然こんな姿で現れて・・・・・・正直、目障りだったんじゃないのか。',
    expression: 'look_away',
    faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
    question: {
      id: 'q_p2_asch_bother',
      promptSummary: 'こんな姿で現れて目障りだったかと聞くアッシュに答える',
      options: [
        {
          id: 'q_p2_bother_no',
          thoughtText: '最初は驚いたけど、こうしてまた憎まれ口を聞けて安心したと言う',
          spokenText:
            '最初は10歳の頃の姿だから驚いたし戸惑ったよ。だけど、話してみれば相変わらずのおまえで安心したくらいだ。',
          aschText:
            '・・・・・・っ、素直にそういうことを言うな。調子が狂うだろうが。',
          expression: 'look_away',
          faceParts: {
            brow: 'angry',
            eyes: 'away',
            mouth: 'frown',
            effects: ['blush', 'sweat'],
          },
          moodDelta: 2,
          trustDelta: 1,
          hideWhenBadMoodOrCold: true,
        },
        {
          id: 'q_p2_bother_honest',
          thoughtText: '目障りなんてことはない、昔のわだかまりも今はもうないと言う',
          spokenText:
            '目障りなんてことはないさ。昔はいろいろあったけど、今こうして同じ部屋で静かに話せるくらいには、俺も整理がついているからな。',
          aschText: '・・・・・・そうか。おまえがそう言うなら、まあ、信じてやる。',
          expression: 'normal',
          faceParts: { brow: 'normal', eyes: 'down', mouth: 'close', effects: [] },
          moodDelta: 1,
          trustDelta: 1,
          hideWhenBadMoodOrCold: true,
        },
        {
          id: 'q_p2_bother_cold',
          thoughtText: '「その態度で居座られちゃ、さすがに気が滅入るな」と冷たく返す',
          spokenText:
            '・・・・・・ああ。連れ出したのは俺だけど、こうもつっかかられ続けちゃさすがに気が滅入るな。',
          aschText: '・・・・・・ふん、だったら最初から連れ出すなと言っただろうが！',
          expression: 'glare',
          faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: [] },
          moodDelta: -3,
          guyMoodDelta: -1,
          requireBadMoodOrCold: true,
        },
      ],
    },
  },
];
