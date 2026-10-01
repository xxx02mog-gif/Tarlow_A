export type ExpressionId =
  | 'normal'
  | 'look_away'
  | 'glare'
  | 'shock'
  | 'pain'
  | 'empty';

export type BrowPartId =
  | 'normal' // 通常
  | 'angry'  // 怒り
  | 'sad'    // こまり・悲痛
  | 'smile'  // 笑い・柔らかい眉
  | 'doubt'  // 訝しみ・片眉上げ
  | 'pain';  // 苦悶・強く顰める

export type EyePartId =
  | 'normal' // 通常
  | 'away'   // 目線そらし
  | 'close'  // 閉じ
  | 'smile'  // 微笑み・細め
  | 'wide'   // 見開き
  | 'empty'  // 虚ろ（ハイライト消失）
  | 'glare'  // 鋭い睨み・半眼
  | 'pain'   // 苦痛（強く瞑る・片目閉じ）
  | 'down';  // 伏し目

export type MouthPartId =
  | 'close'  // 閉じ
  | 'open'   // 開け
  | 'shout'  // 怒鳴る・叫ぶ
  | 'smile'  // 笑う・皮肉な笑み
  | 'grit'   // 食いしばり
  | 'frown'  // への字・不機嫌
  | 'gasp';  // 息を呑む小開き

export type EmotionEffectId =
  | 'sweat'  // 汗
  | 'pale'   // 青褪め
  | 'blush'  // 頬染め
  | 'shadow' // 目元の影
  | 'tears'  // 涙
  | 'noise'; // 顔差分としてのノイズパーツ

export interface FaceParts {
  brow: BrowPartId;
  eyes: EyePartId;
  mouth: MouthPartId;
  effects: EmotionEffectId[];
}

export type BubbleVoiceEffect =
  | 'normal'         // 通常
  | 'shout'          // 大声・激昂（枠が激しく揺れる・力強い表示）
  | 'tremble'        // 震え声・動揺・苦悶（文字と枠が小刻みに震え続ける）
  | 'glitch'         // バグ・ノイズ表示（文字がバグって表示され、色収差やズレが走る）
  | 'shout_glitch'   // 大声＋バグ表示（強制解除への激昂など）
  | 'tremble_glitch'; // 震え声＋バグ表示（論理崩壊・苦痛の震え声など）

export type GamePhaseState = 'TITLE' | 'PROLOGUE' | 'PLAYING' | 'ENDING' | 'REPORT';

export type EndingDisposition = 'KEEP' | 'RETURN' | 'DESTROY';
export type EndingApproach = 'HUMAN' | 'ACCOMPLICE' | 'MACHINE' | 'HATRED';

export type TopicContextCategory = 'body' | 'past' | 'daily' | 'friends' | 'core' | 'fight';

// 端末2ページ目（INFO）の統一カテゴリラベル（新3軸：機体ログ・情動反応・深層記憶）
export type InfoCategoryLabel =
  | '機体ログ'
  | '情動反応'
  | '深層記憶'
  | '機体仕様'
  | '情動観測'
  | '対話記録'
  | '深層解凍';

export interface OralInfoEntry {
  id: string;
  category: InfoCategoryLabel;
  title: string;                   // 【】を含まない整列済みタイトル
  content: string;
  recordedAt?: number;
}

export interface CapturedProtectTrigger {
  sectorId: string;
  capturedQuote: string;           // 対話中にアッシュが黙ったりごまかした際の発言
  capturedContext: string;         // 内部識別メモ
}

export interface ScreenBubble {
  id: string;
  speaker: 'ASCH' | 'GUY';
  text: string;
  flashText?: string;
  voiceEffect?: BubbleVoiceEffect;
  exiting?: boolean;
}

export interface DialogueLogEntry {
  id: string;
  speaker: 'ASCH' | 'GUY';
  lines: string[];
}

export interface MemorySector {
  id: string;
  code: string;
  capturedQuote: string;           // 解除前に表示される「拾ったセリフ」
  capturedContext: string;         // 内部メモ
  unlockedTitle: string;           // 【】を含まない整列済みタイトル
  unlockedCategory?: InfoCategoryLabel; // 強制解除時のラベル（デフォルトは 深層解凍 または 機体仕様）
  unlockedContent: string;         // 強制解除後にINFOへ表示する詳細内容
  dialogueUnlockedContent?: string; // 対話・無言で自然解除された際にINFOへ表示する内容
  paradoxWarning?: string;
  errorCost: number;
  reactionLine: string;
  reactionExpression: ExpressionId;
  reactionFaceParts?: Partial<FaceParts>;
  reactionVoiceEffects?: BubbleVoiceEffect[];
  overrideFollowUp?: AschIncomingQuestion; // 強制解除直後に発生する専用やり取り
  onlyOverride?: boolean;          // trueの場合はディストの深層封印（強制解除のみ）
  discovered: boolean;
  discoveredAt?: number;
  unlocked: boolean;
  unlockedAt?: number;
  unlockedMethod?: 'OVERRIDE' | 'DIALOGUE';
}

export interface MoodVariantResponse {
  aschText: string;
  expression: ExpressionId;
  faceParts?: Partial<FaceParts>;
  voiceEffects?: BubbleVoiceEffect[];
  moodDelta?: number;
  trustDelta?: number;
  naturalUnlockSectorId?: string;
  oralInfo?: OralInfoEntry;
}

export interface AschQuestionReplyOption {
  id: string;
  thoughtText: string;             // ガイの返答選択肢テキスト
  spokenText: string;              // ガイの実際のセリフ
  aschText: string;                // ガイの返答に対するアッシュの反応
  expression: ExpressionId;
  faceParts?: Partial<FaceParts>;
  voiceEffects?: BubbleVoiceEffect[];
  moodDelta?: number;              // 機嫌の変化量（マイナスで不機嫌・怒り、プラスで軟化）
  guyMoodDelta?: number;           // ガイ側の機嫌変化量（マイナスでガイ苛立ち・不機嫌モード、プラスで鎮静）
  trustDelta?: number;
  hatredDelta?: number;            // ガイの嫌悪・決裂ポイント変化量
  errorDelta?: number;
  grantsLinkTags?: string[];       // この返答によって解放される関連フラグ
  requireLinkTag?: string;         // 指定タグがある時のみこの選択肢を表示
  forbidLinkTag?: string;          // 指定タグがある時はこの選択肢を非表示
  capturedProtect?: CapturedProtectTrigger;
  capturedProtects?: CapturedProtectTrigger[];
  naturalUnlockSectorId?: string;
  oralInfo?: OralInfoEntry;
  systemLog?: string;
  requireBadMoodOrCold?: boolean;  // trueの場合、ガイが不機嫌モードの時のみ出現するトゲのある選択肢
  hideWhenBadMoodOrCold?: boolean; // trueの場合、通常時のみ出現し、ガイが不機嫌モードの時は非表示になる
  completesTopic?: boolean;        // trueの場合、残りのステージがあってもこの反応でその話題を完了させる
  resetsTopicProgress?: boolean;   // trueの場合、「一旦引き下がる」等で話題を一旦終了しつつ未完了状態に戻す（後でまた聞ける）
  triggersEnding?: EndingDisposition; // 指定された場合、この返答のやり取り完了後に該当エンディングへ直接遷移する
  triggersEndingKey?: string;      // 指定された場合、この返答のやり取り完了後に指定IDのエンディングへ直接遷移する
  followUpOptions?: AschQuestionReplyOption[]; // この反応の後にさらに続くガイの反応選択肢
}

export interface AschIncomingQuestion {
  id: string;
  promptSummary: string;
  options: AschQuestionReplyOption[];
}

export interface TopicExchangeStage {
  thoughtText?: string;            // 2段階目以降の「直前の続き」として出る選択肢テキスト
  retryThoughtText?: string;       // 1度引き下がった後に再度聞き直す際の選択肢テキスト
  spokenText: string;              // ガイが喋るセリフ
  retrySpokenText?: string;        // 1度引き下がった後に再度聞き直す際のガイのセリフ
  aschText: string;                // アッシュの通常返答（\n区切りで複数枠）
  retryAschText?: string;          // 1度引き下がった後に再度聞き直す際のアッシュの返答
  aschTextCorrupted?: string;      // 高エラー時の返答（任意）
  expression: ExpressionId;
  faceParts?: Partial<FaceParts>;
  voiceEffects?: BubbleVoiceEffect[];
  typingSpeed?: 'normal' | 'fast' | 'slow' | 'laggy';
  moodDelta?: number;              // 機嫌パラメータの変化量
  guyMoodDelta?: number;           // ガイ側の機嫌パラメータ変化量
  trustDelta?: number;             // 信頼度の変化量
  hatredDelta?: number;            // ガイの嫌悪・決裂ポイント変化量
  errorDelta?: number;             // エラー率の変化量
  badMoodResponse?: MoodVariantResponse;  // 不機嫌（怒り）時にこの話題を振った場合の拒絶・別反応
  goodMoodResponse?: MoodVariantResponse; // 上機嫌（軟化）時にこの話題を振った場合の特別反応（頭を撫でさせてくれる等）
  oralInfo?: OralInfoEntry;        // 端末のINFOに記録される小難しい観測ログ
  capturedProtect?: CapturedProtectTrigger; // この段階で発生するプロテクト（ロック）
  capturedProtects?: CapturedProtectTrigger[]; // 複数のロックが同時発生する場合（SEC-19/20など）
  naturalUnlockSectorId?: string;  // この段階の対話で自然解除されるプロテクトID
  grantsLinkTags?: string[];       // この会話を見ることで解放される関連フラグ
  triggersAschQuestion?: AschIncomingQuestion; // 会話直後に選択肢が専用返答に切り替わるイベント
  replyOptions?: AschQuestionReplyOption[]; // このステージのアッシュの返答に対してガイが選べる複数の反応選択肢
  completesTopic?: boolean;
  triggersEndingKey?: string;
  systemLog?: string;
}

export interface ConversationTopic {
  id: string;
  thoughtText: string;             // 1回目の選択肢テキスト（カッコ書き補足なし）
  phase2Tab?: '雑談' | '端末' | '追求'; // Phase 2での所属タブ
  contextCategory?: TopicContextCategory; // 直後の無言放置反応の文脈カテゴリ
  relatedTopicIds?: string[];      // この話題の直後に「関連する話題」枠へ優先表示するトピックID
  requireLinkTag?: string;         // 出現に必要なフラグ（別の話題を聞いた後に出現する話題）
  requireAnyLinkTags?: string[];   // いずれかのタグがあれば出現
  forbidLinkTags?: string[];       // 指定タグがある場合は出現しない
  grantsLinkTags?: string[];       // トピックに設定された解放フラグ
  requireTrust?: number;           // 出現に必要な信頼度
  requireSectorUnlocked?: string;  // 特定のロック強制解除で出現
  positiveTopic?: boolean;         // trueの場合、ガイが「嫌悪・決裂モード」に入ると出現しなくなる
  hatredOnly?: boolean;            // trueの場合、ガイが「嫌悪・決裂モード」の時のみ出現
  requireGuyAngry?: boolean;       // trueの場合、ガイが不機嫌モード（guyMood < 0）の時のみ出現
  hideWhenGuyAngry?: boolean;      // trueの場合、ガイが不機嫌モード（guyMood < 0）の時は非表示
  requireBothAngry?: boolean;      // trueの場合、ガイとアッシュの双方が不機嫌モードの時のみ出現
  postDecisionFor?: EndingDisposition; // エンド処遇決定後のおしゃべり専用トピック
  postDecisionApproach?: EndingApproach[]; // エンド処遇決定後のスタンス限定
  prioritySlot1?: boolean;         // trueの場合、出現条件を満たしている間は1枠目に最優先表示
  idleChatter?: boolean;           // trueの場合、しばらく待っていると出現し、さらに待つと別の雑談へ切り替わる「関係ない雑談」
  awkwardSilenceTopic?: boolean;   // trueの場合、話題に詰まっている気まずい選択肢として出現
  sensitiveToBadMood?: boolean;    // trueの場合、不機嫌時に振ると答えてくれず（未消化のまま残り、機嫌が直るとまた聞ける）
  calmsAnger?: boolean;            // trueの場合、不機嫌時に振ると機嫌を和らげる効果がある（お茶を淹れる等）
  stages: TopicExchangeStage[];    // 各段階のやり取り（最後まで見たら消化済みとなり繰り返されない）
}

export interface SystemLogEntry {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'PARADOX';
  message: string;
}

export interface ObservationStats {
  sessionId: string;
  startTime: number;
  endTime: number | null;
  totalTurns: number;
  completedTopicsCount: number;
  totalResponseTimeMs: number;     // 解答時間の合計（平均解答時間の算出用）
  quickReplyCount: number;         // 即答回数（2秒以内）
  choiceHoverSwitchCount: number;  // 迷い回数（選択肢の上で迷った回数）
  idleTimeoutCount: number;        // 無言（放置）発生回数
  tabSwitchCount: number;          // 画面から目を離した回数（離席）
  terminalOpenCount: number;
  terminalTotalDurationMs: number;
  overrideCount: number;
  purgeCount: number;              // 感情抑制（機械的制御）の使用回数
}
