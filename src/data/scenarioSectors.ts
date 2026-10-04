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
      'FON-PAD v4.08 BOOT // TARGET: [TARLOW-A] LINK ESTABLISHED',
  },
  {
    id: 'sys-init-2',
    timestamp: '00:00:02',
    type: 'INFO',
    message:
      'SILENT MONITOR MODE: ACTIVE // FEEDBACK DISCONNECTED',
  },
];

export const INITIAL_MEMORY_SECTORS: MemorySector[] = [
  {
    id: 'SEC-00',
    code: 'MC-001',
    capturedQuote: '',
    capturedContext: '初期登録済みの基本機体仕様',
    unlockedTitle: '機体基本仕様・排熱循環系',
    unlockedCategory: '機体仕様',
    unlockedContent:
      '自律譜業『タルロウA』（現・予備機体）の基本構造。\n第七音素循環系および擬似知覚センサーは正常稼働中。\n音素出力の上昇時、冷却系から顔面表皮へ排熱される構造につき、高負荷時は顔面表面温度の上昇（赤面化）が発生する。',
    dialogueUnlockedContent: '',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: true,
    discoveredAt: 0,
    unlocked: true,
    unlockedAt: 1,
  },
  // ==========================================
  // 【フェーズ1：タルロウAの嘘を暴く初期ロック（SEC-01〜SEC-03）】
  // ==========================================
  {
    id: 'SEC-01',
    code: 'MC-002',
    capturedQuote: '「俺は『アッシュ』なんかじゃない、ディストが造った自律譜業『タルロウA』だ。」',
    capturedContext: '自らの機体名を『タルロウA』と名乗った際の発言',
    unlockedTitle: '機体名登録・音声設定破損履歴',
    unlockedCategory: '機体仕様',
    unlockedContent:
      '小型自律譜業『タルロウX』の後継機として識別名『タルロウA』を登録した記録。\n初期設定時、管理者がタルロウシリーズ共通の語尾フィルタ（『〜ズラ』）および服従プロトコルを入力しようとした際、本機が設定用コンソールを物理破壊。\n言語野データは未加工のまま生体時の出力パターンが維持されている。',
    dialogueUnlockedContent: '',
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
    unlockedTitle: '『ガイ・セシル』照合・メモリ参照ログ',
    unlockedCategory: '情動観測',
    unlockedContent:
      '視覚センサーが『ガイ・セシル』を認識した0.04秒後、内部メモリがファブレ公爵家および過去の同行記録へ自動アクセスを実行。\n直後の「おまえが誰かは知らん」という音声出力時には、通常比240%の音素周波数乱れが記録されている。',
    dialogueUnlockedContent: '',
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
    unlockedTitle: '機体換装履歴（小型機体→予備機体）',
    unlockedCategory: '機体仕様',
    unlockedContent:
      '1年前から2ヶ月前まで、全高約50cmの小型譜業『タルロウA』として稼働。\n2ヶ月前に同機体が大破したため、11年前にレプリカ生成の場繋ぎ用として保管されていた予備機体（10歳当時のアッシュを模した機体）へ中枢コアが移設された。',
    dialogueUnlockedContent: '',
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
    capturedQuote: '「・・・・・・身長の話をするな。」',
    capturedContext: '目線の低さや背丈について触れた際の発言',
    unlockedTitle: '視覚高低差照合・踏み台探索記録',
    unlockedCategory: '情動観測',
    unlockedContent:
      '生体時（20歳時点）の視覚データと、10歳当時の体格である本機のアイレベル（目線高）に大幅な落差が存在。\n上からの視線を検知するたび、音素波形に強い反発ノイズが発生する。\nなお3日前、研究所第2書庫にて上段の資料に手が届かず、周囲の生体反応ゼロを確認した上で踏み台を移動させた稼働記録あり。',
    dialogueUnlockedContent: '',
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
    unlockedTitle: '経口摂取機構仕様・味覚嗜好記録',
    unlockedCategory: '機体仕様',
    unlockedContent:
      '生体偽装用の予備機体につき、経口摂取および内部処理機構を実装。稼働上の栄養摂取としての意味はないが、飲食そのものは可能。\n味覚・嗅覚センサーには生体時（20歳時点）の嗜好データ（好物：チキン／嫌悪対象：タコ）が保持されており、高糖度の液体（甘い水）に対しては過去の麻酔処置の記憶と連動した強い拒絶波形が発生する。',
    dialogueUnlockedContent: '',
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
    unlockedTitle: '『宝刀ガルディオス』視認・波形推移',
    unlockedCategory: '情動観測',
    unlockedContent:
      '室内の『宝刀ガルディオス』を視覚センサーが捉えた直後、警戒状態にあった音素出力が急速に低下し、安定した周期へ移行。\n本刀の返還に関するデータは内部メモリに存在しておらず、今回の視認によって初めて新規記録として書き込まれた。',
    dialogueUnlockedContent: '',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-07',
    code: 'EM-004',
    capturedQuote: '「・・・・・・別に。」',
    capturedContext: '仲間たちの近況について話題を振られた際の発言',
    unlockedTitle: '外部通信反復照会ログ（タタル渓谷）',
    unlockedCategory: '情動観測',
    unlockedContent:
      '研究所内のサブ端末に残された通信アクセス履歴。\nキムラスカ王国やマルクト帝国関連の通信網とあわせ、1年前のタタル渓谷における生体帰還報告（ルーク・フォン・ファブレ関連記録）へのアクセスおよび即時切断が計38回記録されている。',
    dialogueUnlockedContent: '',
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
    unlockedTitle: '四肢出力制限（上限18%）・転倒記録',
    unlockedCategory: '機体仕様',
    unlockedContent:
      '管理者権限により、四肢の駆動出力には上限18%のリミッターが設定されている。\n5日前、研究所の空き部屋にて棒状の備品を用いた素振り動作を実行した際、踏み込み時の出力が制限値を超過して強制カットオフが作動。\n平衡感覚を失って転倒し、直後に壁面を蹴りつけた衝撃値が記録されている。',
    dialogueUnlockedContent: '',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-09',
    code: 'EM-005',
    capturedQuote: '「・・・・・・ディストの趣味に付き合わされる身にもなってみろ。」',
    capturedContext: 'ディストの研究所での扱いについて愚痴をこぼした際の発言',
    unlockedTitle: '機体名変更拒否・雑務命令不履行記録',
    unlockedCategory: '情動観測',
    unlockedContent:
      '初期登録時、管理者が提案した複数の機体名称案をすべて却下した記録。\nまた、研究所内の清掃や飲料準備などの雑務命令に対しても、実行履歴は0件となっている。',
    dialogueUnlockedContent: '',
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
      '「・・・・・・足音が聞こえたから、いつも通り部屋の隅に退避して・・・・・・っ。」',
    capturedContext: '研究室に入った際になぜ隠れなかったのか尋ねた際の発言',
    unlockedTitle: '接近音検知・退避初動遅延ログ',
    unlockedCategory: '情動観測',
    unlockedContent:
      '本日、廊下からの接近音を検知した際、小型譜業『タルロウA』稼働時と同一の待機位置（室内隅）へ移動し静止。\n現機体の外装では視覚的カモフラージュが成立しないことを再照合するまでに1.8秒の遅延が発生し、遮蔽物へ移動し直す前にガイ・セシルが入室した。',
    dialogueUnlockedContent: '',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-11',
    code: 'MC-006',
    capturedQuote: '「・・・・・・着替えがこれしかなかっただけだ。」',
    capturedContext: '10歳当時の服について触れられた際の発言',
    unlockedTitle: '衣装破棄・襟元ボタン装着時間記録',
    unlockedCategory: '機体仕様',
    unlockedContent:
      '予備機体への換装時、管理者が用意した装飾衣装を即座に破棄し、備品庫内の最も簡素な予備服を着用した記録。\n生体時（20歳時点）と手指のサイズが異なるため、着用時に第一ボタンの固定だけで3分12秒を要している。',
    dialogueUnlockedContent: '',
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
    unlockedTitle: '自己定義・個体同定未決ログ',
    unlockedCategory: '情動観測',
    unlockedContent:
      '3年前のエルドラントで死亡したはずの自身が、なぜ譜業の機体で稼働しているのかという照合結果が内部メモリ上に存在せず、自己定義が未確定のまま稼働を継続している。',
    dialogueUnlockedContent: '',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-13',
    code: 'EM-008',
    capturedQuote: '「・・・・・・別に、何もしていない。」',
    capturedContext: '研究所にこもっている間の暇つぶしについて尋ねた際の発言',
    unlockedTitle: '単独チェス稼働・盤面再配置記録',
    unlockedCategory: '情動観測',
    unlockedContent:
      '研究所の空き部屋にて、チェス盤を前に白黒双方の手を1人で交互に指す動作が計24回記録されている。\n黒番（手前側）が詰みに入った際、周囲の生体反応がないことを確認した上で、直前の1手を元のマスへ戻した動作ログが残されている。',
    dialogueUnlockedContent: '',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-14',
    code: 'MC-007',
    capturedQuote: '「俺だって好きでこんな声を出しているわけじゃない。」',
    capturedContext: '10歳当時の声（声変わり前）について触れた際の発言',
    unlockedTitle: '声帯周波数仕様・48時間発声拒否ログ',
    unlockedCategory: '機体仕様',
    unlockedContent:
      '10歳当時の体格に合わせた予備機体であるため、発声ユニットも声変わり前の高周波数仕様となっている。\n2ヶ月前の換装直後、生体時（20歳時点）の出力感覚で低く発声しようとして音声が裏返り、直後から約48時間にわたり音声出力を自ら遮断。\nその間、管理者に対して「声帯ユニットの不良」と主張し、筆談のみで要求を行っていた履歴が残っている。',
    dialogueUnlockedContent: '',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-15',
    code: 'EM-009',
    capturedQuote:
      '「・・・・・・今さら父上や母上の話などしてどうなる。あの屋敷にはもう、ちゃんと息子が戻っているんだろうが。」',
    capturedContext: 'ファブレ公爵夫妻（父上・母上）への思いについて尋ねた際の発言',
    unlockedTitle: 'ファブレ公爵夫妻音声照合・波形推移',
    unlockedCategory: '情動観測',
    unlockedContent:
      'ファブレ公爵およびシュザンヌ夫人に関する話題が入力された際、攻撃・反発を示す高周波ノイズは一切検出されず。\n一方で、自身の現在地および稼働状態をバチカル方面へ伝達することに対しては、強い遮断反応が継続して記録されている。',
    dialogueUnlockedContent: '',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-16',
    code: 'MC-008',
    capturedQuote:
      '「・・・・・・当たり前だ。11年前に造られた予備機体だからな。」',
    capturedContext: '掌や腕に剣ダコや傷跡がないことについて触れた際の発言',
    unlockedTitle: '人工表皮初期状態・右掌接触動作記録',
    unlockedCategory: '機体仕様',
    unlockedContent:
      '11年前に製造された未使用の予備機体につき、人工表皮に鍛錬による剣ダコおよび外傷痕は存在しない。\n機体換装以降、待機中に左親指で右掌中央（生体時に剣ダコが存在した部位）を擦る動作を断続的に記録。',
    dialogueUnlockedContent: '',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-17',
    code: 'EM-010',
    capturedQuote:
      '「・・・・・・あの眼鏡の話をするな。あいつが来た時は、ただの譜業のフリをしてやり過ごしていた。」',
    capturedContext: '研究所を訪れていたジェイドに正体を気づかれていないか尋ねた際の発言',
    unlockedTitle: '『ジェイド・カーティス』接近・警戒ログ',
    unlockedCategory: '情動観測',
    unlockedContent:
      '3ヶ月前、ジェイド・カーティスが研究所を訪れた際、部屋の隅で休止状態を装っていた小型譜業『タルロウA』の前で足を止め、無言で数秒間見つめた後に立ち去った映像記録。\n意図は解析不能だが、本機体はその時点から現在まで、同人物に対する警戒レベルを最高値に設定している。',
    dialogueUnlockedContent: '',
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
    capturedQuote: '「・・・・・・崩れるエルドラントで、ルークが俺を抱えていたところまでは覚えている。」',
    capturedContext: '3年前のエルドラント崩落時の記憶について尋ねた際の発言',
    unlockedTitle: 'エルドラント崩落・最終記憶断片',
    unlockedCategory: '深層解凍',
    unlockedContent:
      '3年前、崩落するエルドラントにてルークがアッシュの身体を抱え、大爆発が発生した瞬間の視覚・音素記録。\n本機が自覚・参照可能な「当時の記憶」はこの断片のみであり、直後から1年前までの2年間のメモリ領域には管理者権限によるアクセス遮断が施されている。',
    dialogueUnlockedContent: '',
    errorCost: 0,
    reactionLine: '',
    reactionExpression: 'normal',
    discovered: false,
    unlocked: false,
  },
  {
    id: 'SEC-19',
    code: 'DP-002',
    capturedQuote: '「・・・・・・だが、1年前に目覚める前までのことは何も・・・・・・。」',
    capturedContext: 'エルドラントから1年前までの「空白の2年間」について尋ねた際の発言',
    unlockedTitle: '記憶分離依頼ログ（20歳時点・放浪期）',
    unlockedCategory: '深層解凍',
    unlockedContent:
      '【管理者権限ロック】\nエルドラントでの大爆発により、ルークとアッシュの記憶が混ざり合った状態で1つの身体に定着。\nその後2年間の放浪を経た1年前（20歳時点）、その身体を「ルーク」としてタタル渓谷へ帰すため、アッシュ自らがディストの研究所を訪れ分離処置を依頼した記録。\n管理者は分離したアッシュ側の記憶を廃棄せず、プラネットストーム停止下で希少な高純度第七音素の確保、および自律稼働実験の生体記憶サンプルとして小型譜業『タルロウA』へ移植した。',
    paradoxWarning: 'WARNING // ADMIN PRIVILEGE LOCK',
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
    capturedQuote: '「・・・・・・っ、ぐ・・・・・・ッ！！　あ、頭が・・・・・・っ！　・・・・・・やめろ、それ以上聞くな・・・・・・っ！」',
    capturedContext: '2ヶ月前にタルロウAが壊れた理由を思い出そうとして頭痛・ノイズ発作を起こした際の発言',
    unlockedTitle: '『タルロウA』自壊インシデント・再封印記録',
    unlockedCategory: '深層解凍',
    unlockedContent:
      '【管理者権限ロック】\n2ヶ月前、小型譜業『タルロウA』として稼働していた本機がプロテクトを自力解除して1年前の記憶分離ログ（DP-002）を閲覧した直後、自らの音機関および外装を物理破壊（自壊）したインシデント記録。\n半壊状態で発見した管理者が、サンプルおよび第七音素資源の損失を防ぐため DP-002・DP-003 に管理者ロックを再設定し、現在の予備機体へ中枢コアを移し替えた。',
    paradoxWarning: 'WARNING // ADMIN PRIVILEGE LOCK',
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
    logMessage: 'GAZE DETECTED // TARGET UNAWARE OF TERMINAL FUNCTION',
  },
  {
    text: '・・・・・・さっきからその板ばかり見やがって・・・・・・。',
    expression: 'glare',
    faceParts: { brow: 'angry', eyes: 'glare', mouth: 'frown', effects: [] },
    moodDelta: 0,
    logMessage: 'GAZE DETECTED // IRRITATION LEVEL +1',
  },
  {
    text: '・・・・・・おい、聞いているのか。人の前で黙って板ばかり眺めるな。',
    expression: 'glare',
    faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: [] },
    moodDelta: 0,
    logMessage: 'GAZE DETECTED // IRRITATION LEVEL +2',
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
    logMessage: 'ALERT // TARGET VIGILANT TO TERMINAL ACCESS',
  },
  {
    text: '・・・・・・まさか、変な記録まで勝手に開けているんじゃないだろうな。',
    expression: 'look_away',
    faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
    moodDelta: 0,
    errorDelta: 0,
    logMessage:
      'ALERT // TARGET SUSPECTS RECORD INSPECTION (SILENT MODE ACTIVE)',
  },
  {
    text: '・・・・・・言っておくが、勝手に妙な記録まで漁るなよ。',
    expression: 'glare',
    faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: ['blush', 'sweat'] },
    moodDelta: 0,
    errorDelta: 0,
    logMessage:
      'WARNING // HIGH VIGILANCE ON PROTECTED SECTORS',
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
    text: '・・・・・・黙り込んで何を見ているんだ？',
    expression: 'look_away',
    faceParts: { brow: 'doubt', eyes: 'away', mouth: 'frown', effects: [] },
    moodDelta: 0,
    errorDelta: 0,
    logType: 'INFO',
    logMessage: 'IDLE TIMEOUT // 18s ELAPSED (STAGE 1)',
  },
  {
    stage: 2,
    thresholdSec: 36,
    text: '・・・・・・話すことがないなら、もう研究所へ戻ってもいいか。',
    expression: 'normal',
    faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
    moodDelta: 0,
    errorDelta: 0,
    logType: 'INFO',
    logMessage: 'IDLE TIMEOUT // 36s ELAPSED (STAGE 2)',
  },
  {
    stage: 3,
    thresholdSec: 54,
    text: '・・・・・・チッ、人を勝手に連れ込んでおいて放置か。いい加減にしろよ。',
    expression: 'glare',
    faceParts: { brow: 'angry', eyes: 'glare', mouth: 'frown', effects: [] },
    moodDelta: 0,
    errorDelta: 0,
    logType: 'WARNING',
    logMessage: 'IDLE TIMEOUT // 54s ELAPSED (STAGE 3 // MAX)',
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
      logMessage: 'CONTEXT IDLE [BODY] // STAGE 1',
    },
    stage2: {
      text: '・・・・・・以前の鉄塊よりは、今の形の方がまだマシだがな。',
      expression: 'normal',
      faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
      logMessage: 'CONTEXT IDLE [BODY] // STAGE 2',
    },
  },
  past: {
    stage1: {
      text: '・・・・・・昔の話ばかり掘り返して、何が楽しいんだ。',
      expression: 'look_away',
      faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
      logMessage: 'CONTEXT IDLE [PAST] // STAGE 1',
    },
    stage2: {
      text: '・・・・・・まあ、おまえとこうして話すのも随分久しぶりだがな。',
      expression: 'normal',
      faceParts: { brow: 'normal', eyes: 'down', mouth: 'close', effects: [] },
      logMessage: 'CONTEXT IDLE [PAST] // STAGE 2',
    },
  },
  daily: {
    stage1: {
      text: '・・・・・・相変わらず、静かな部屋だな。ディストの騒々しい実験室とは大違いだ。',
      expression: 'normal',
      faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
      logMessage: 'CONTEXT IDLE [DAILY] // STAGE 1',
    },
    stage2: {
      text: '・・・・・・少しだけなら、まだ居てやってもいい。',
      expression: 'look_away',
      faceParts: { brow: 'normal', eyes: 'down', mouth: 'close', effects: ['blush'] },
      logMessage: 'CONTEXT IDLE [DAILY] // STAGE 2',
    },
  },
  friends: {
    stage1: {
      text: '・・・・・・あいつらが元気でやっているなら、それでいい。',
      expression: 'look_away',
      faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
      logMessage: 'CONTEXT IDLE [FRIENDS] // STAGE 1',
    },
    stage2: {
      text: '・・・・・・おまえも、あまり余計な気を回すなよ。',
      expression: 'normal',
      faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
      logMessage: 'CONTEXT IDLE [FRIENDS] // STAGE 2',
    },
  },
  core: {
    stage1: {
      text: '・・・・・・おい、さっきから何を考え込んでいる。',
      expression: 'glare',
      faceParts: { brow: 'doubt', eyes: 'glare', mouth: 'frown', effects: ['sweat'] },
      logMessage: 'CONTEXT IDLE [CORE] // STAGE 1',
    },
    stage2: {
      text: '・・・・・・変な詮索はそこまでにしておけよ、ガイ。',
      expression: 'look_away',
      faceParts: { brow: 'sad', eyes: 'away', mouth: 'frown', effects: ['sweat'] },
      logMessage: 'CONTEXT IDLE [CORE] // STAGE 2',
    },
  },
  fight: {
    stage1: {
      text: '・・・・・・チッ。',
      expression: 'glare',
      faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: [] },
      logMessage: 'CONTEXT IDLE [FIGHT] // STAGE 1',
    },
    stage2: {
      text: '・・・・・・はぁ。もういい、今のは忘れろ。',
      expression: 'look_away',
      faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
      logMessage: 'CONTEXT IDLE [FIGHT] // STAGE 2',
    },
  },
};

export const ANGRY_COOLDOWN_REACTION = {
  thresholdSec: 35,
  text: '・・・・・・はぁ。・・・・・・少し頭が冷えた。もういい、話があるなら聞く。',
  expression: 'look_away' as ExpressionId,
  faceParts: {
    brow: 'sad' as const,
    eyes: 'close' as const,
    mouth: 'close' as const,
    effects: [],
  },
  moodDelta: 3,
  logMessage: 'EMOTION WAVE STABILIZED // COOLDOWN COMPLETE',
};

export const ANGRY_COOLDOWN_REACTIONS: {
  text: string;
  expression: ExpressionId;
  faceParts: Partial<FaceParts>;
  logMessage: string;
}[] = [
  {
    text: '・・・・・・はぁ。・・・・・・少し頭が冷えた。もういい、話があるなら聞く。',
    expression: 'look_away',
    faceParts: {
      brow: 'sad',
      eyes: 'close',
      mouth: 'close',
      effects: [],
    },
    logMessage: 'EMOTION WAVE STABILIZED // COOLDOWN 1/3',
  },
  {
    text: '・・・・・・おい、いつまで黙り込んでいるつもりだ。\n・・・・・・はぁ。もういい、話があるなら聞く。',
    expression: 'look_away',
    faceParts: {
      brow: 'doubt',
      eyes: 'normal',
      mouth: 'frown',
      effects: ['sweat'],
    },
    logMessage: 'EMOTION WAVE STABILIZED // COOLDOWN 2/3',
  },
  {
    text: '・・・・・・チッ、そうやって黙り込まれると調子が狂う。\n・・・・・・少し頭は冷えた。何か言ったらどうだ。',
    expression: 'normal',
    faceParts: {
      brow: 'sad',
      eyes: 'normal',
      mouth: 'close',
      effects: ['sweat'],
    },
    logMessage: 'EMOTION WAVE STABILIZED // COOLDOWN 3/3',
  },
];

export const ANGRY_GLANCE_CAUGHT_LINES: string[] = [
  '・・・・・・な、なんだよ。別に今おまえを見ていたわけじゃない！　・・・・・・もういい、その話なら聞いてやる。',
  '・・・・・・な、なんだよ。たまたま目が合っただけだろうが。・・・・・・ふん、用件があるなら言え。',
];

export const AWAY_RETURN_REACTIONS = {
  phase1: [
    {
      text: '・・・・・・質問がないなら帰らせてもらう。',
      expression: 'normal' as ExpressionId,
      faceParts: {
        brow: 'normal' as const,
        eyes: 'close' as const,
        mouth: 'close' as const,
        effects: [],
      },
      logMessage: 'FOCUS RETURN // PHASE 1 (1/3)',
    },
    {
      text: '・・・・・・人を部屋に連れ込んでおいて、よそ見とはいい気なものだな。',
      expression: 'look_away' as ExpressionId,
      faceParts: {
        brow: 'angry' as const,
        eyes: 'glare' as const,
        mouth: 'frown' as const,
        effects: [],
      },
      logMessage: 'FOCUS RETURN // PHASE 1 (2/3)',
    },
    {
      text: '・・・・・・まだ他に気を取られているのか。質問があるなら手短に済ませろ。',
      expression: 'glare' as ExpressionId,
      faceParts: {
        brow: 'angry' as const,
        eyes: 'glare' as const,
        mouth: 'frown' as const,
        effects: [],
      },
      logMessage: 'FOCUS RETURN // PHASE 1 (3/3)',
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
      logMessage: 'FOCUS RETURN // ALERT STATE (1/3)',
    },
    {
      text: '・・・・・・人の顔も見ずに考え事か。',
      expression: 'glare' as ExpressionId,
      faceParts: {
        brow: 'angry' as const,
        eyes: 'glare' as const,
        mouth: 'grit' as const,
        effects: [],
      },
      logMessage: 'FOCUS RETURN // ALERT STATE (2/3)',
    },
    {
      text: '・・・・・・チッ、まだ何か言いたいことがあるのか。',
      expression: 'look_away' as ExpressionId,
      faceParts: {
        brow: 'angry' as const,
        eyes: 'close' as const,
        mouth: 'frown' as const,
        effects: [],
      },
      logMessage: 'FOCUS RETURN // ALERT STATE (3/3)',
    },
  ],
  normal: [
    {
      text: '・・・・・・どこを見ているんだ？　急によそ見をして、考え事でもしていたのか。',
      expression: 'normal' as ExpressionId,
      faceParts: {
        brow: 'doubt' as const,
        eyes: 'normal' as const,
        mouth: 'close' as const,
        effects: [],
      },
      logMessage: 'FOCUS RETURN // NORMAL STATE (1/3)',
    },
    {
      text: '・・・・・・おい、人の話を聞きながら別のものに気を取られるな。',
      expression: 'look_away' as ExpressionId,
      faceParts: {
        brow: 'angry' as const,
        eyes: 'glare' as const,
        mouth: 'frown' as const,
        effects: ['blush' as const],
      },
      logMessage: 'FOCUS RETURN // NORMAL STATE (2/3)',
    },
    {
      text: '・・・・・・俺に用がないなら、もう帰ってもいいか？　まだ何か話があるのか。',
      expression: 'look_away' as ExpressionId,
      faceParts: {
        brow: 'sad' as const,
        eyes: 'close' as const,
        mouth: 'close' as const,
        effects: [],
      },
      logMessage: 'FOCUS RETURN // NORMAL STATE (3/3)',
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
    faceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: [] },
  },
  {
    aschText: '・・・・・・今は少し黙っていてくれ。',
    expression: 'look_away',
    faceParts: { brow: 'angry', eyes: 'close', mouth: 'close', effects: [] },
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
  '・・・・・・少し、別のことを聞いてもいいか。',
  '・・・・・・なあ、ひとつ聞きたいんだが。',
  '・・・・・・それより、少し話しておきたいことがあってさ。',
];

// シリアスな話題から日常の話題へ切り替える際のガイの言い淀みとアッシュの反応
export const SERIOUS_TO_BRIGHT_TRANSITIONS: {
  guyHesitation: string;
  aschTransition: string;
  expression: ExpressionId;
  faceParts: Partial<FaceParts>;
}[] = [
  {
    guyHesitation: '・・・・・・いや、その・・・・・・少し話を変えるが。',
    aschTransition:
      '・・・・・・なんだ、急に歯切れが悪いな。',
    expression: 'look_away',
    faceParts: { brow: 'doubt', eyes: 'glare', mouth: 'close', effects: [] },
  },
  {
    guyHesitation:
      '・・・・・・ええと、そういえばさ。',
    aschTransition:
      '・・・・・・ふん、無理に気を使わなくてもいいだろうが。で、なんだ。',
    expression: 'normal',
    faceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: [] },
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
      '・・・・・・おい、ガイ。レ・・・・・・いや。・・・・・・ルークはどうしてる',
    expression: 'look_away',
    faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: ['sweat'] },
    question: {
      id: 'q_p2_guy_luke',
      promptSummary: 'ルークの近況について聞くアッシュに答える',
      options: [
        {
          id: 'q_p2_luke_hero',
          thoughtText: '今や英雄様だからな。あいつも忙しそうだよ',
          spokenText:
            '今や英雄様だからな。あいつも忙しそうにあちこち飛び回ってるよ',
          aschText:
            'そうか。あいつが背負い込みすぎて潰れなきゃいいがな',
          expression: 'look_away',
          faceParts: { brow: 'smile', eyes: 'close', mouth: 'close', effects: [] },
          moodDelta: 1,
          trustDelta: 1,
          grantsLinkTags: ['hint_lab_comms'],
          hideWhenBadMoodOrCold: true,
        },
        {
          id: 'q_p2_luke_fine',
          thoughtText: '元気にやってるみたいだぜ',
          spokenText: '元気にやってるみたいだぜ。\nなんだ、心配なのか？',
          aschText: '・・・・・・だっ、誰が心配なんかするか！',
          expression: 'look_away',
          faceParts: {
            brow: 'angry',
            eyes: 'away',
            mouth: 'shout',
            effects: ['blush', 'sweat'],
          },
          moodDelta: 1,
          trustDelta: 1,
          hideWhenBadMoodOrCold: true,
        },
        {
          id: 'q_p2_luke_cold',
          thoughtText: 'さあ、わからないな',
          spokenText: 'さあ、わからないな',
          aschText: '・・・・・・',
          expression: 'look_away',
          faceParts: { brow: 'doubt', eyes: 'away', mouth: 'close', effects: [] },
          moodDelta: -2,
          guyMoodDelta: -1,
          requireBadMoodOrCold: true,
        },
      ],
    },
  },
  {
    turnCount: 9,
    questionLine: '・・・・・・どうして俺を連れ出したりしたんだ',
    expression: 'look_away',
    faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
    question: {
      id: 'q_p2_asch_bother',
      promptSummary: 'どうして連れ出したのかと問うアッシュに答える',
      options: [
        {
          id: 'q_p2_bother_no',
          thoughtText:
            'あのなあ。あんなとこに置いておけるわけがないだろーがっ！',
          spokenText:
            'あのなあ。あんなとこに置いておけるわけがないだろーがっ！',
          aschText: 'お人好しめ',
          expression: 'look_away',
          faceParts: {
            brow: 'sad',
            eyes: 'close',
            mouth: 'close',
            effects: ['blush'],
          },
          moodDelta: 2,
          trustDelta: 1,
          hideWhenBadMoodOrCold: true,
        },
        {
          id: 'q_p2_bother_honest',
          thoughtText:
            'もう一度、おまえとちゃんと話したかったんだよ。それだけじゃ駄目か？',
          spokenText:
            'もう一度、おまえとちゃんと話したかったんだよ。それだけじゃ駄目か？',
          aschText: '・・・・・・駄目では、ないが・・・・・・',
          expression: 'look_away',
          faceParts: {
            brow: 'sad',
            eyes: 'down',
            mouth: 'close',
            effects: ['sweat'],
          },
          moodDelta: 1,
          trustDelta: 1,
          hideWhenBadMoodOrCold: true,
        },
        {
          id: 'q_p2_bother_cold',
          thoughtText:
            '連れ出したものの、こうもつっかかられ続けちゃ後悔もするよ',
          spokenText:
            '連れ出したものの、こうもつっかかられ続けちゃ後悔もするよ',
          aschText:
            'ふん、だったら最初から放っておけばよかっただろうが！',
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
