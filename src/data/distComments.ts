export interface DistCommentData {
  comment: string;
  lines: string[];
  brow: 'nomal' | 'angry' | 'stunned' | 'none';
  eye: 'open' | 'close' | 'away' | 'none';
  mouth: 'nomal' | 'close' | 'smile' | 'laugh' | 'angry' | 'none';
  secondBrow?: 'nomal' | 'angry' | 'stunned' | 'none';
  secondEye?: 'open' | 'close' | 'away' | 'none';
  secondMouth?: 'nomal' | 'close' | 'smile' | 'laugh' | 'angry' | 'none';
  thirdBrow?: 'nomal' | 'angry' | 'stunned' | 'none';
  thirdEye?: 'open' | 'close' | 'away' | 'none';
  thirdMouth?: 'nomal' | 'close' | 'smile' | 'laugh' | 'angry' | 'none';
}

export const DIST_ENDING_COMMENTS: Record<string, DistCommentData> = {
  // END 01：たぶんタルロウA
  END_PHASE1_TARLOW: {
    comment:
      '中身が誰の記憶なのかも見抜けず、本気でただの自律譜業だと思い込んで帰すとは。節穴とは、まさにこのことを言うのでしょうね！',
    lines: [
      '中身が誰の記憶なのかも見抜けず、本気でただの自律譜業だと思い込んで帰すとは',
      '節穴とは、まさにこのことを言うのでしょうね！',
    ],
    brow: 'stunned',
    eye: 'close',
    mouth: 'smile',
    secondBrow: 'nomal',
    secondEye: 'none',
    secondMouth: 'laugh',
  },

  // END 02：怒って帰っちゃった（目パーツ非表示：眼鏡のみ、最長・3枠送り）
  END_PHASE2_INCOMPLETE: {
    comment:
      'おや？帰ってきたのですか。てっきりあの男に破壊されるものだと思っていましたが・・・・・・あっ！痛い！蹴るのを辞めなさいっ！また四肢の出力を下げますよ！',
    lines: [
      'おや？帰ってきたのですか。てっきりあの男に破壊されるものだと思っていましたが・・・・・・',
      'あっ！痛い！蹴るのを辞めなさいっ！',
      'また四肢の出力を下げますよ！',
    ],
    brow: 'nomal',
    eye: 'none',
    mouth: 'smile',
    secondBrow: 'angry',
    secondEye: 'none',
    secondMouth: 'angry',
    thirdBrow: 'angry',
    thirdEye: 'none',
    thirdMouth: 'angry',
  },
  END_PHASE2_STAY_REFUSED: {
    comment:
      'おや？帰ってきたのですか。てっきりあの男に破壊されるものだと思っていましたが・・・・・・あっ！痛い！蹴るのを辞めなさいっ！また四肢の出力を下げますよ！',
    lines: [
      'おや？帰ってきたのですか。てっきりあの男に破壊されるものだと思っていましたが・・・・・・',
      'あっ！痛い！蹴るのを辞めなさいっ！',
      'また四肢の出力を下げますよ！',
    ],
    brow: 'nomal',
    eye: 'none',
    mouth: 'smile',
    secondBrow: 'angry',
    secondEye: 'none',
    secondMouth: 'angry',
    thirdBrow: 'angry',
    thirdEye: 'none',
    thirdMouth: 'angry',
  },

  // END 03：また気が向いたら（1枠集約）
  END_PHASE2_NORMAL_RETURN: {
    comment: 'ほぉ・・・・・・。深入りせず逃がしましたか。甘いというか、煮え切らない男ですね',
    lines: [
      'ほぉ・・・・・・。深入りせず逃がしましたか。甘いというか、煮え切らない男ですね',
    ],
    brow: 'stunned',
    eye: 'away',
    mouth: 'nomal',
  },

  // END 04：たまにはゆっくり（2枠）
  END_PHASE2_STAY_REST: {
    comment:
      '譜業に睡眠など不要だというのに、人間の真似事をさせるのですか？\nお人好しなのか、それとも・・・・・・',
    lines: [
      '譜業に睡眠など不要だというのに、人間の真似事をさせるのですか？',
      'お人好しなのか、それとも・・・・・・',
    ],
    brow: 'nomal',
    eye: 'none',
    mouth: 'nomal',
    secondBrow: 'nomal',
    secondEye: 'away',
    secondMouth: 'smile',
  },

  // END 05：一旦そういうことで（1枠集約）
  END_PHASE2_ASCH: {
    comment:
      'ふん、好きにすればいいでしょう。私としてはどちらでも構いませんからね',
    lines: [
      'ふん、好きにすればいいでしょう。私としてはどちらでも構いませんからね',
    ],
    brow: 'nomal',
    eye: 'none',
    mouth: 'nomal',
  },

  // END 06：そういうことにした（2枠）
  END_PHASE3_MACHINE: {
    comment:
      'あなたにしては、しっかりと割り切りましたね\nええ、賢明な判断ですよ。所詮は私が組んだ譜業人形にすぎないのですから',
    lines: [
      'あなたにしては、しっかりと割り切りましたね',
      'ええ、賢明な判断ですよ。所詮は私が組んだ譜業人形にすぎないのですから',
    ],
    brow: 'nomal',
    eye: 'away',
    mouth: 'smile',
    secondBrow: 'nomal',
    secondEye: 'open',
    secondMouth: 'laugh',
  },

  // END 07：何も言えなかった（2枠）
  END_PHASE3_SILENCE: {
    comment:
      '帰還プログラムも無視して、一体何処へ行ったのやら・・・・・・\nデータは既に取りきっていますから、何処で朽ちてくれても困りませんが\nずいぶん退屈な幕引きになりましたね',
    lines: [
      '帰還プログラムも無視して、一体何処へ行ったのやら・・・・・・',
      'データは既に取りきっていますから、何処で朽ちてくれても困りませんが\nずいぶん退屈な幕引きになりましたね',
    ],
    brow: 'nomal',
    eye: 'close',
    mouth: 'nomal',
  },

  // END 08a：これで全部うまくいく（茶・2枠）
  END_PHASE3_TOMORROW: {
    comment:
      '本当にそれでよろしいのですか？\nいえ、構いませんよ。私が困るわけではありませんし\nお似合いの茶番劇なのではないですか？',
    lines: [
      '本当にそれでよろしいのですか？\nいえ、構いませんよ。私が困るわけではありませんし',
      'お似合いの茶番劇なのではないですか？',
    ],
    brow: 'nomal',
    eye: 'none',
    mouth: 'smile',
    secondBrow: 'stunned',
    secondEye: 'away',
    secondMouth: 'smile',
  },

  // END 08b：これで全部うまくいく（見送り・2枠）
  END_PHASE3_TOMORROW_RETURN: {
    comment:
      '本当にそれでよろしいのですか？\nいえ、構いませんよ。私が困るわけではありませんし\nお似合いの茶番劇なのではないですか？',
    lines: [
      '本当にそれでよろしいのですか？\nいえ、構いませんよ。私が困るわけではありませんし',
      'お似合いの茶番劇なのではないですか？',
    ],
    brow: 'nomal',
    eye: 'none',
    mouth: 'smile',
    secondBrow: 'stunned',
    secondEye: 'away',
    secondMouth: 'smile',
  },

  // END 09：これで全部元通り（2枠）
  END_PHASE3_MERCY_DESTROY: {
    comment:
      'おや、壊してしまいましたか。安心なさい。他言しませんし、責めるつもりもありませんよ\n壊れて困るものを他人に預けるはずないでしょう？',
    lines: [
      'おや、壊してしまいましたか。安心なさい。他言しませんし、責めるつもりもありませんよ',
      '壊れて困るものを他人に預けるはずないでしょう？',
    ],
    brow: 'nomal',
    eye: 'none',
    mouth: 'nomal',
    secondBrow: 'stunned',
    secondEye: 'open',
    secondMouth: 'smile',
  },

  // END 10：魂の容れ物（3枠送り）
  END_PHASE3_SWAMPMAN: {
    comment:
      '皆は幸せ、彼も役目を果たして大満足。……なら、なぜあなたはそんな顔をしているんです？ あなたが望んだハッピーエンドでしょうに',
    lines: [
      '皆は幸せ、彼も役目を果たして大満足',
      '……なら、なぜあなたはそんな顔をしているんです？',
      'あなたが望んだハッピーエンドでしょうに',
    ],
    brow: 'nomal',
    eye: 'close',
    mouth: 'nomal',
    secondBrow: 'nomal',
    secondEye: 'open',
    secondMouth: 'nomal',
    thirdBrow: 'nomal',
    thirdEye: 'open',
    thirdMouth: 'smile',
  },
};
