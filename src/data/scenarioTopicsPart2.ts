import { ConversationTopic } from '../types/game';

export const SCENARIO_TOPICS_PART2: ConversationTopic[] = [
  // ==========================================
  // 【フェーズ2：ほのぼの対話パート（正体判明後）】
  // ==========================================

  // 1. タルロウAだった頃の話と現在の10歳予備機体（IMMUTABLE_RULES 5-⑥準拠）
  {
    id: 'p2_tarlow_past',
    thoughtText: '『タルロウA』と名乗っていた理由',
    phase2Tab: '追求',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_height_headpat', 'p2_dist_complaints'],
    stages: [
      {
        spokenText:
          'しかし、なんでまた『タルロウA』なんて名前で譜業のフリをしていたんだ？　とっさに思いついた嘘にしては妙に具体的だったけど。',
        aschText:
          '・・・・・・でまかせじゃない。2ヶ月前にその機体が壊れてこれに移されるまで、俺は本当に『タルロウA』という50センチくらいの小型譜業に入っていた。\nおまえやあの眼鏡、皇帝が研究所に来た時にも、何度か顔を合わせている。',
        expression: 'normal',
        faceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: [] },
        secondFaceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
        trustDelta: 1,
        replyOptions: [
          {
            id: 'p2_tarlow_past_reply_why_silent',
            thoughtText: '研究所で会っていたなら、なぜ声をかけなかったか聞く',
            spokenText:
              'あの研究所にいた赤い小型譜業、おまえだったのか！？　目の前にいたなら、なんでその時に声をかけてくれなかったんだ！',
            aschText:
              '・・・・・・俺がこんな譜業になって生き永らえているなどと、気付かないならそれに越したことはないだろう。\n今はもうこの姿で見つかってしまったから、隠しても仕方がないがな。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: ['shadow'] },
            secondFaceParts: { brow: 'sad', eyes: 'close', mouth: 'frown', effects: [] },
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-03',
            grantsLinkTags: ['talked_tarlow_history'],
          },
          {
            id: 'p2_tarlow_past_reply_surprised',
            thoughtText: '大佐やピオニー陛下にまで会っていて、よくバレなかったなと言う',
            spokenText:
              'まさかあの小型譜業の中に入っていたとはな・・・・・・。俺はともかく、あの目ざとい大佐やピオニー陛下にまで会っていて、よく正体がバレなかったな。',
            aschText:
              '・・・・・・ただの自律譜業のフリをして、部屋の隅で休止したふりをしていたからな。\nあの皇帝には面白半分に頭を叩かれたが、まさか中身が俺だとは思わなかったんだろう。',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'close', mouth: 'close', effects: [] },
            secondFaceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: [] },
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-03',
            grantsLinkTags: ['talked_tarlow_history'],
          },
        ],
      },
    ],
  },

  // 2. 背が小さい・視線が低い話
  {
    id: 'p2_height_headpat',
    thoughtText: '昔を思い出す背丈',
    phase2Tab: '雑談',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_tarlow_history',
    relatedTopicIds: ['p2_tea_and_taste', 'p2_clothes'],
    stages: [
      {
        spokenText:
          '11年前の予備機体ってことは、俺が屋敷にいた頃の背丈そのままなんだよな。やっぱり目線が低くて動きづらいか？',
        aschText:
          '・・・・・・身長の話をするな。\n50センチの鉄塊だった頃に比べれば、人間の形になっただけマシだがな。',
        expression: 'glare',
        faceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'frown',
          effects: ['blush'],
        },
        secondExpression: 'look_away',
        secondFaceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'frown',
          effects: [],
        },
        trustDelta: 1,
        grantsLinkTags: ['hint_human_limbs', 'talked_old_appearance'],
        replyOptions: [
          {
            id: 'p2_height_reply_nod',
            thoughtText: '「こうして向かい合っていると、本当にあの頃に戻ったみたいだよ」と言う',
            spokenText:
              'そうだな。・・・・・・こうして向かい合っていると、本当にあの頃に戻ったみたいだよ。',
            aschText:
              '・・・・・・そうだな・・・・・・。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'close',
              effects: [],
            },
            moodDelta: 1,
            trustDelta: 1,
            hideWhenBadMoodOrCold: true,
            naturalUnlockSectorId: 'SEC-04',
            grantsLinkTags: ['hint_human_limbs'],
          },
          {
            id: 'p2_height_reply_provoke',
            thoughtText: '「その小さな身体じゃ、もう昔みたいに剣もまともに振れないだろうな」と口にする',
            spokenText:
              '・・・・・・だが、その小さな身体じゃ、もう昔みたいに剣もまともに振れないだろうな。',
            aschText:
              'いちいち言うな。そんなことは俺が一番分かっている！',
            expression: 'glare',
            faceParts: {
              brow: 'angry',
              eyes: 'glare',
              mouth: 'shout',
              effects: ['blush'],
            },
            voiceEffects: ['shout'],
            moodDelta: -3,
            grantsLinkTags: ['hint_human_limbs'],
          },
        ],
      },
    ],
  },

  // 3. お茶と味覚・好き嫌いの話（ほのぼの日常）
  {
    id: 'p2_tea_and_taste',
    thoughtText: 'お茶でも淹れようか',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    calmsAnger: true,
    hideWhenGuyAngry: true,
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_galdios_sword', 'p2_dist_complaints'],
    stages: [
      {
        spokenText:
          'そうだ、せっかく俺の部屋に来たんだし、紅茶でも淹れようか。',
        aschText:
          '・・・・・・茶などいらんと言っているだろう。飲めるには飲めるが、この身体には何の意味もない。\n・・・・・・まあ、おまえが勝手に淹れて置くというなら、止めはしない。',
        expression: 'look_away',
        faceParts: { brow: 'normal', eyes: 'close', mouth: 'close', effects: [] },
        secondFaceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: ['blush'] },
        moodDelta: 2,
        guyMoodDelta: 2,
        trustDelta: 1,
        badMoodResponse: {
          aschText: '・・・・・・淹れてくれるなら、貰っておく。',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: [] },
          moodDelta: 2,
          trustDelta: 1,
        },
        grantsLinkTags: ['tea_served'],
        replyOptions: [
          {
            id: 'p2_tea_reply_preferences',
            thoughtText: '砂糖は入れずにそのまま出し、昔の好き嫌いの話をする',
            spokenText:
              'ほら、砂糖は入れないでおいたよ。おまえ、甘い水とタコだけは昔から絶対に口にしなかったからな。',
            aschText:
              '・・・・・・余計なことまで覚えているな、おまえは。',
            expression: 'normal',
            faceParts: { brow: 'smile', eyes: 'smile', mouth: 'smile', effects: [] },
            moodDelta: 1,
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-05',
          },
          {
            id: 'p2_tea_reply_quietly_place',
            thoughtText: '余計なことは言わず、静かにカップを置いてやる',
            spokenText:
              'ああ、ここに置いておくよ。おまえの好きにしろ。',
            aschText:
              '・・・・・・ふん。\n・・・・・・悪くない茶葉だな。研究所の薬品臭い空気よりはずっとマシだ。',
            expression: 'normal',
            faceParts: { brow: 'normal', eyes: 'close', mouth: 'close', effects: [] },
            secondFaceParts: { brow: 'smile', eyes: 'down', mouth: 'close', effects: [] },
            moodDelta: 1,
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-05',
          },
        ],
      },
    ],
  },

  // 4. 宝刀ガルディオスの話（IMMUTABLE_RULES 5-⑤準拠：Phase1で未質問の場合／質問済みの場合で自然な導入に）
  {
    id: 'p2_galdios_sword',
    thoughtText: '『宝刀ガルディオス』のこと',
    phase2Tab: '追求',
    contextCategory: 'past',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    forbidLinkTags: ['talked_galdios_p1'],
    relatedTopicIds: ['p2_sword_limiter', 'p2_friends_news'],
    stages: [
      {
        spokenText:
          'そこの『宝刀ガルディオス』、やっぱり気になるか？　少し前に、公爵様から返してもらったんだ。',
        aschText:
          '・・・・・・そうか。その刀、おまえの手に戻ったんだな。\n・・・・・・元々おまえの家のものだ。あの屋敷に飾っておくより、よほどいい。',
        expression: 'normal',
        faceParts: { brow: 'sad', eyes: 'normal', mouth: 'open', effects: [] },
        secondFaceParts: { brow: 'smile', eyes: 'close', mouth: 'close', effects: [] },
        moodDelta: 1,
        trustDelta: 2,
        grantsLinkTags: ['done_p2_galdios'],
        naturalUnlockSectorId: 'SEC-06',
      },
    ],
  },
  {
    id: 'p2_galdios_sword_after_p1',
    thoughtText: '『宝刀ガルディオス』のこと',
    phase2Tab: '追求',
    contextCategory: 'past',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_galdios_p1',
    relatedTopicIds: ['p2_sword_limiter', 'p2_friends_news'],
    stages: [
      {
        spokenText:
          'この『宝刀ガルディオス』が俺の手元に戻ったこと、今まで知らなかったのか？',
        aschText:
          '・・・・・・ああ、知らなかった。父上が手放したんだな。\n・・・・・・元々おまえの家のものだ。あるべき場所に戻ったのなら、それでいい。',
        expression: 'normal',
        faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
        secondFaceParts: { brow: 'smile', eyes: 'close', mouth: 'close', effects: [] },
        moodDelta: 1,
        trustDelta: 2,
        grantsLinkTags: ['done_p2_galdios'],
        naturalUnlockSectorId: 'SEC-06',
      },
    ],
  },

  // 5. 出力制限と剣の話（ロック会話②：宝刀ガルディオスの話で出現／10歳の姿・背丈の話がヒント）
  {
    id: 'p2_sword_limiter',
    thoughtText: 'その身体で剣は振れるのか',
    phase2Tab: '追求',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'done_p2_galdios',
    relatedTopicIds: ['p2_dist_complaints', 'p2_friends_news'],
    stages: [
      {
        retryThoughtText: 'その身体での剣のこと（もう一度聞く）',
        spokenText:
          '普段通り歩いたり喋ったりはできているみたいだけど、その身体で剣を振ったりもできるのか？',
        retrySpokenText:
          'さっきの剣の話だけど・・・・・・やっぱりその身体、動かす時に制限がかかっているのが気になるのか？',
        aschText:
          '・・・・・・できない。ディストが四肢に出力制限をかけてやがる。',
        retryAschText:
          '・・・・・・ディストが四肢に出力制限をかけてやがると言っただろう。',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: [] },
        capturedProtect: {
          sectorId: 'SEC-08',
          capturedQuote: '「・・・・・・ディストが四肢に出力制限をかけてやがる。」',
          capturedContext: '身体の動かしづらさや剣について触れた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_sword_reply_correct_swing',
            thoughtText: '「前の小型機体よりはずっとマシなんだろうけど、剣を振れないのはもどかしいよな」',
            spokenText:
              '前の小型機体よりはずっとマシなんだろうけど、剣を振れないのはもどかしいよな。',
            aschText:
              '・・・・・・せっかく手足があるのに、強く踏み込むことすらできんからな。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'hint_human_limbs',
            naturalUnlockSectorId: 'SEC-08',
            grantsLinkTags: ['hint_sleep_dreams'],
            completesTopic: true,
          },
          {
            id: 'p2_sword_reply_wrong_giveup',
            thoughtText: '「その小さな身体じゃ危ないし、制限がかかっているくらいでちょうどいいんじゃないか？」',
            spokenText:
              'その小さな身体じゃ危ないし、制限がかかっているくらいでちょうどいいんじゃないか？',
            aschText:
              '・・・・・・おまえまで俺をガキ扱いする気か！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush'] },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_sword_reply_wrong_beg_dist',
            thoughtText: '「ディストに頼んで、その制限を外してもらえばいいんじゃないか？」',
            spokenText:
              'ディストに頼んで、その制限を外してもらえばいいんじゃないか？',
            aschText:
              '・・・・・・あいつに頭を下げろと言うのか。冗談じゃない。',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: [] },
            moodDelta: -1,
            completesTopic: true,
          },
          {
            id: 'p2_sword_reply_back_off',
            thoughtText: '「・・・・・・そうか。あまり触れられたくない話だったな、悪かったよ」と一旦引く',
            spokenText:
              '・・・・・・そうか。あまり触れられたくない話だったな、悪かったよ。',
            aschText:
              '・・・・・・別に。',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'close', mouth: 'close', effects: [] },
            resetsTopicProgress: true,
          },
        ],
      },
    ],
  },

  // 6. ディストの研究所での暮らしぶり（ロックなし・情報集め：『なぜ隠れなかったのか』のヒント）
  {
    id: 'p2_dist_complaints',
    thoughtText: 'ディストの研究所での暮らし',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_why_outside', 'p2_why_hide_truth'],
    stages: [
      {
        spokenText:
          'ディストの研究所にいる間、あいつに妙な実験や雑用を押し付けられたりしていないか？',
        aschText:
          '・・・・・・ディストの趣味に付き合わされる身にもなってみろ。\n機体名にとんでもない名前をつけようとするわ、毎日何時間も自慢話を聞かされるわで、うるさくて仕方がない。',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'close', mouth: 'frown', effects: ['sweat'] },
        secondFaceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['sweat'] },
        moodDelta: 1,
        trustDelta: 1,
        grantsLinkTags: ['talked_dist_hideout'],
        badMoodResponse: {
          aschText: '・・・・・・あいつが何時間も自慢話で騒ぐのを適当にあしらっているだけだ。',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: [] },
          moodDelta: 0,
        },
        replyOptions: [
          {
            id: 'p2_dist_reply_hideout',
            thoughtText: 'それでもディストの研究所に居続けるのは意外だと言う',
            spokenText:
              'はは、ディスト相手に毎日怒鳴り散らしてるおまえの姿が目に浮かぶよ。でも、そんなに騒がしいならあんな研究所に居続けなくてもいいのにな。',
            aschText:
              '・・・・・・あそこは人目につかない。あいつも口だけは堅いからな、身を隠すには都合がいいだけだ。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-09',
            grantsLinkTags: ['talked_dist_hideout'],
          },
          {
            id: 'p2_dist_reply_rose_knight',
            thoughtText: 'ディストのネーミングセンスに苦笑する',
            spokenText:
              'とんでもない名前って・・・・・・あいつ、昔からそういう大仰な名前をつけるのが好きだよな。',
            aschText:
              '笑い事じゃない！　本気で銘板に刻もうとしやがったから、その場でへし折ってやった。\n・・・・・・まったく、あいつは騒がしいにも程がある。',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush'] },
            secondExpression: 'look_away',
            secondFaceParts: { brow: 'sad', eyes: 'close', mouth: 'frown', effects: [] },
            moodDelta: 1,
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-09',
            grantsLinkTags: ['talked_dist_hideout'],
          },
        ],
      },
    ],
  },

  // 7. 今日俺が研究室に入ったとき、なぜ隠れなかったのか（ロック会話①：タルロウAの話で出現／ディストの暮らしぶりがヒント）
  {
    id: 'p2_why_outside',
    thoughtText: '研究室で隠れずにいた理由',
    phase2Tab: '追求',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_tarlow_history',
    relatedTopicIds: ['p2_clothes', 'p2_friends_news'],
    stages: [
      {
        retryThoughtText: '研究室で隠れなかった理由（もう一度聞く）',
        spokenText:
          '今日俺が研究室に入ったとき、なんで物陰に隠れもせずに部屋の隅に立っていたんだ？',
        retrySpokenText:
          'さっきの話だけど・・・・・・今日俺が研究室に入ったとき、やっぱり何か隠れ損ねる理由があったんじゃないのか？',
        aschText:
          '・・・・・・足音が聞こえたから、いつも通り部屋の隅に退避して・・・・・・っ。',
        retryAschText:
          '・・・・・・まだその話をする気か。',
        expression: 'look_away',
        faceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'frown',
          effects: ['blush'],
        },
        capturedProtect: {
          sectorId: 'SEC-10',
          capturedQuote:
            '「・・・・・・足音が聞こえたから、いつも通り部屋の隅に退避して・・・・・・っ。」',
          capturedContext: '研究室に入った際になぜ隠れなかったのか尋ねた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_why_outside_reply_correct_tired',
            thoughtText: '「・・・・・・まだ自分が50センチの『タルロウA』のつもりだったのか？」',
            spokenText:
              '・・・・・・まだ自分が50センチの『タルロウA』のつもりだったのか？',
            aschText:
              '・・・・・・咄嗟に前の癖が出ただけだ。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'away', mouth: 'frown', effects: ['blush'] },
            moodDelta: 1,
            trustDelta: 2,
            naturalUnlockSectorId: 'SEC-10',
            completesTopic: true,
          },
          {
            id: 'p2_why_outside_reply_wrong_wanted',
            thoughtText: '「俺に見つけてほしくて、わざと残っていたんじゃないのか？」',
            spokenText:
              '俺に見つけてほしくて、わざと残っていたんじゃないのか？',
            aschText:
              'そんな訳があるか！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush'] },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_why_outside_reply_wrong_broken_sensor',
            thoughtText: '「部屋の隅に突っ立っていれば、置物のフリで誤魔化せると思ったのか？」',
            spokenText:
              '部屋の隅に突っ立っていれば、置物のフリで誤魔化せると思ったのか？',
            aschText:
              '・・・・・・悪かったな、どうせ間抜けな見た目だっただろうよ！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: ['blush'] },
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_why_outside_reply_back_off',
            thoughtText: '「・・・・・・いや、なんでもない。追及して悪かったな」と一旦引く',
            spokenText:
              '・・・・・・いや、なんでもない。追及して悪かったな。',
            aschText:
              '・・・・・・',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
            resetsTopicProgress: true,
          },
        ],
      },
    ],
  },

  // 8. 今の10歳当時の服装について（ロックなし・日常会話）
  {
    id: 'p2_clothes',
    thoughtText: '今着ている服',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_tea_and_taste', 'p2_friends_news'],
    stages: [
      {
        spokenText:
          'その着ている服も、昔屋敷にいた頃の服によく似ているよな。ディストが用意してくれたのか？',
        aschText:
          '・・・・・・着替えがこれしかなかっただけだ。\nあいつが最初に持ってきた悪趣味な服よりは、まだこれの方がマシだったからな。',
        expression: 'look_away',
        faceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'frown',
          effects: [],
        },
        secondFaceParts: {
          brow: 'sad',
          eyes: 'close',
          mouth: 'frown',
          effects: ['sweat'],
        },
        trustDelta: 1,
        badMoodResponse: {
          aschText: '・・・・・・着替えがこれしかなかっただけだ。',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: [] },
          moodDelta: 0,
        },
        replyOptions: [
          {
            id: 'p2_clothes_reply_suits_you',
            thoughtText: '「今のその服、よく似合っているよ。昔を思い出すな」と微笑む',
            spokenText:
              '今のその服、よく似合っているよ。昔を思い出すな。',
            aschText:
              '・・・・・・まじまじ見るな。',
            expression: 'look_away',
            faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush'] },
            moodDelta: 1,
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-11',
            grantsLinkTags: ['talked_clothes', 'hint_manor_parents'],
          },
        ],
      },
    ],
  },

  // 9. 仲間たち（ナタリア・ピオニー・ルーク）の近況（ロック会話③：最初から出現／机の資料の雑談がヒント）
  {
    id: 'p2_friends_news',
    thoughtText: 'ナタリアやピオニー陛下たちの近況',
    phase2Tab: '追求',
    contextCategory: 'friends',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_why_hide_truth'],
    stages: [
      {
        retryThoughtText: '仲間たちの近況（もう一度聞く）',
        spokenText:
          'ナタリアもバチカルの復興で忙しく飛び回っているし、ピオニー陛下や大佐も相変わらずだ。少しは気になっていたんじゃないか？',
        retrySpokenText:
          'さっきは興味がないって言っていたけど・・・・・・外の連中のこと、本当は少しくらい気にかけているんじゃないのか？',
        aschText:
          '・・・・・・外の連中のことなど、俺の知ったことか。',
        retryAschText:
          '・・・・・・外の連中のことなど、俺には関係ないと言っているだろうが。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'frown',
          effects: [],
        },
        capturedProtect: {
          sectorId: 'SEC-07',
          capturedQuote: '「・・・・・・外の連中のことなど、俺の知ったことか。」',
          capturedContext: '仲間たちの近況について話題を振られた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_friends_reply_correct_comms',
            thoughtText: '「そう言いつつ、研究所にある通信機でみんなの動向くらいは見ていたんじゃないか？」',
            spokenText:
              'そう言いつつ、研究所にある通信機でみんなの動向くらいは見ていたんじゃないか？',
            aschText:
              '・・・・・・暇つぶしに通信網を覗いていただけだ。元気にやっているなら、それでいい。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: ['blush'] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'hint_lab_comms',
            naturalUnlockSectorId: 'SEC-07',
            grantsLinkTags: ['talked_friends_news'],
            completesTopic: true,
          },
          {
            id: 'p2_friends_reply_tease_angry',
            thoughtText: '「本当はひとりで研究所にいて寂しいくせに、意地を張るなよ」',
            spokenText:
              '本当はひとりで研究所にいて寂しいくせに、意地を張るなよ。',
            aschText:
              '・・・・・・勝手な決めつけをするな！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush'] },
            voiceEffects: ['shout'],
            moodDelta: -3,
            completesTopic: true,
          },
          {
            id: 'p2_friends_reply_wrong_go_baticul',
            thoughtText: '「せっかく生きているんだから、今からでもバチカルへ顔を出せばいいじゃないか」',
            spokenText:
              'せっかく生きているんだから、今からでもバチカルへ顔を出せばいいじゃないか。',
            aschText:
              '・・・・・・断る。こんな姿で戻れるわけがないだろう。',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: [] },
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_friends_reply_back_off',
            thoughtText: '「・・・・・・そうか、気が向かないなら今はやめておくよ」と一旦引く',
            spokenText:
              '・・・・・・そうか。気が向かないなら、今はやめておくよ。',
            aschText:
              '・・・・・・ああ。',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'close', mouth: 'close', effects: [] },
            resetsTopicProgress: true,
          },
        ],
      },
    ],
  },

  // 10. 手元の端末（管理パッド）について尋ねる（IMMUTABLE_RULES 2-①・SCENARIO_DESIGN 会話13準拠）
  {
    id: 'p2_show_terminal',
    thoughtText: 'ディストから渡された端末',
    phase2Tab: '端末',
    contextCategory: 'body',
    requireLinkTag: 'phase2_started',
    forbidLinkTags: ['terminal_revealed'],
    relatedTopicIds: ['p2_why_outside', 'p2_dist_complaints'],
    stages: [
      {
        spokenText:
          'なあ、研究室を出るときにディストからこれを渡されたんだが・・・・・・この画面、おまえの記録か？',
        aschText:
          'なっ・・・・・・おい、それは俺の内部モニターじゃないか！\n・・・・・・ディストの奴、俺の管理端末までおまえに渡しやがったのか。',
        expression: 'shock',
        faceParts: { brow: 'angry', eyes: 'wide', mouth: 'gasp', effects: ['sweat'] },
        secondExpression: 'look_away',
        secondFaceParts: { brow: 'angry', eyes: 'close', mouth: 'frown', effects: ['sweat'] },
        grantsLinkTags: ['terminal_revealed'],
        systemLog: 'TERMINAL REVEALED // TARGET AWARE OF MONITOR DEVICE',
        replyOptions: [
          {
            id: 'p2_show_terminal_reply_lower',
            thoughtText: '「悪かったよ。むやみに弄ったりしないでおく」と端末を下げる',
            spokenText:
              '悪かったよ。むやみに弄ったりしないでおく。',
            aschText:
              '・・・・・・当たり前だ。',
            expression: 'look_away',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'frown', effects: [] },
            trustDelta: 1,
            hideWhenBadMoodOrCold: true,
          },
          {
            id: 'p2_show_terminal_reply_care',
            thoughtText: '「その身体に無理が出ていないか気になってな」と言う',
            spokenText:
              'すまん。ただ、その身体に無理が出ていないか気になってな。',
            aschText:
              '・・・・・・余計なお世話だ。自分の身体くらい自分で分かる。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'close', mouth: 'frown', effects: [] },
            moodDelta: 1,
            trustDelta: 1,
            hideWhenBadMoodOrCold: true,
          },
          {
            id: 'p2_show_terminal_reply_provoke',
            thoughtText: '「おまえが隠してることも、これで全部丸見えだな」と煽る',
            spokenText:
              'へえ、これが管理端末なのか。つまりおまえが隠してることも、これを見れば全部丸見えってわけだな。',
            aschText:
              '趣味の悪い真似をするな！！　人の頭の中を勝手に覗き見て楽しいのか、おまえは・・・・・・ッ！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush', 'sweat'] },
            voiceEffects: ['shout'],
            moodDelta: -3,
          },
        ],
      },
    ],
  },

  // 10-2. 端末連動トピック群（【表記案A：略称-ログ番号】・短め1往復完結・アコーディオン既読後に解放）
  {
    id: 'p2_term_sec00_blush',
    thoughtText: '【MC-001】顔が赤くなる仕組み',
    phase2Tab: '端末',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-00',
    stages: [
      {
        spokenText:
          '顔が赤いぞ？　どういう仕組みなんだ？',
        aschText:
          '・・・・・・ただの放熱だ。',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec01_zura',
    thoughtText: '【MC-002】『〜ズラ』語尾と壊した端末',
    phase2Tab: '端末',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-01',
    stages: [
      {
        spokenText:
          'ディストの奴、最初におまえの語尾を『〜ズラ』に設定しようとして、設定端末ごと叩き割られたんだってな。',
        aschText:
          '・・・・・・思い出すだけで腹が立つ。\n次に同じ真似をしたら、端末だけでは済まさんからな・・・・・・！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'glare', mouth: 'frown', effects: [] },
        secondFaceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: ['shadow'] },
        moodDelta: 1,
        trustDelta: 1,
        grantsLinkTags: ['hint_voice_crack'],
      },
    ],
  },
  {
    id: 'p2_term_sec04_stepstool',
    thoughtText: '【EM-002】高い棚と『踏み台』の記録',
    phase2Tab: '端末',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-04',
    stages: [
      {
        spokenText:
          '研究所の高い棚に手が届かなくて、誰もいない時に踏み台を探し回ったっていうのは本当か？',
        aschText:
          'なっ・・・・・・！？\n・・・・・・ち、違う、あれは上の棚の資料を確認していただけだ！',
        expression: 'shock',
        faceParts: { brow: 'sad', eyes: 'wide', mouth: 'gasp', effects: ['blush', 'sweat'] },
        secondExpression: 'look_away',
        secondFaceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec05_pepper',
    thoughtText: '【MC-004】飲食できる身体の仕様',
    phase2Tab: '端末',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-05',
    stages: [
      {
        spokenText:
          'その身体、栄養にはならなくても食事はできる仕様なんだな。今度、好物のチキンでも用意しようか？',
        aschText:
          '・・・・・・余計な気を使うな。腹も減らない身体で食ったところで、虚しくなるだけだろうが。',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec07_night_search',
    thoughtText: '【EM-004】タタル渓谷の帰還記録',
    phase2Tab: '端末',
    contextCategory: 'friends',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-07',
    stages: [
      {
        spokenText:
          '研究所の通信機で、1年前にルークがタタル渓谷へ戻った時の記録を何度も開いていたんだな。',
        aschText:
          '・・・・・・あいつが本当に戻ったのか、確かめただけだ。\n・・・・・・あいつが戻っているなら、俺が顔を出す必要はない。',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
        secondFaceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: ['shadow'] },
        moodDelta: 1,
        trustDelta: 1,
        grantsLinkTags: ['talked_friends_news', 'hint_sleep_dreams'],
      },
    ],
  },
  {
    id: 'p2_term_sec08_swing_fall',
    thoughtText: '【MC-005】空き部屋での素振りの記録',
    phase2Tab: '端末',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-08',
    stages: [
      {
        spokenText:
          '空き部屋で剣の素振りをしようとして、出力制限で転んで壁を蹴飛ばしたそうじゃないか。',
        aschText:
          '・・・・・・この身体がどれくらい動くか、試していただけだ。',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'away', mouth: 'frown', effects: ['blush'] },
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec09_rejected_names',
    thoughtText: '【EM-005】却下した機体名の記録',
    phase2Tab: '端末',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-09',
    stages: [
      {
        spokenText:
          'ディストが提案した機体名の候補、おまえが片っ端から却下したっていう記録が残っているぞ。',
        aschText:
          '当たり前だろうが！　どれもこれも正気を疑うような名前ばかり並べやがって・・・・・・！\n・・・・・・思い出すだけでも頭痛がしてくる。',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: [] },
        secondExpression: 'look_away',
        secondFaceParts: { brow: 'pain', eyes: 'close', mouth: 'frown', effects: ['sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec10_alley_lost',
    thoughtText: '【EM-006】部屋の隅で固まっていた記録',
    phase2Tab: '端末',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-10',
    stages: [
      {
        spokenText:
          '部屋の隅に立ったあと、今の身体じゃ丸見えだって気づいて、慌てて隠れ場所を探しかけた記録が残ってるぞ。',
        aschText:
          'う、うるさい！',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'shout', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec11_button_struggle',
    thoughtText: '【MC-006】着替えに手こずっていた記録',
    phase2Tab: '端末',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-11',
    stages: [
      {
        spokenText:
          '今の身体に替わった時、一番上の襟ボタンを留めるのに3分も格闘していたんだってな。',
        aschText:
          '・・・・・・指先が小さくなって、勝手が違っただけだ。',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec13_chess_cheat',
    thoughtText: '【EM-008】空き部屋での1人チェスの記録',
    phase2Tab: '端末',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-13',
    stages: [
      {
        spokenText:
          '研究所の空き部屋で1人チェスをしていた時、自分側の黒番が負けそうになってこっそり駒を1つ戻したそうじゃないか。',
        aschText:
          'ち、違う！　あれは一手前の盤面を検証し直していただけだ！',
        expression: 'shock',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'open', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec14_pen_talk',
    thoughtText: '【MC-007】2日間筆談で通した記録',
    phase2Tab: '端末',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-14',
    stages: [
      {
        spokenText:
          '今の身体に替わった直後、怒鳴ろうとして声が裏返ったのが悔しくて、2日間ずっと筆談で通したんだってな。',
        aschText:
          '声に慣れるまで喋りたくなかっただけだ！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'grit', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec15_mother_avoid',
    thoughtText: '【EM-009】公爵夫妻に対する感情波形',
    phase2Tab: '端末',
    contextCategory: 'past',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-15',
    stages: [
      {
        spokenText:
          '公爵様や奥様の話をした時の波形、怒りや反発は少しも出ていなかったぞ。本当は奥様たちのこと、今でも心配なんだろ。',
        aschText:
          '・・・・・・人の感情波形までいちいち読み上げるな。\n・・・・・・母上は昔から、涙脆いからな。',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: [] },
        secondFaceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: [] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec16_palm_habit',
    thoughtText: '【MC-008】右の掌をこする癖',
    phase2Tab: '端末',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-16',
    stages: [
      {
        spokenText:
          'おまえ、無意識のうちに右の掌を親指で擦る癖がついているんだな。やっぱり剣ダコがないのが気になるのか？',
        aschText:
          '・・・・・・チッ。\n・・・・・・長年の感触が、抜けないだけだ。',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'close', mouth: 'frown', effects: [] },
        secondFaceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec17_jade_smile',
    thoughtText: '【EM-010】タルロウAの前で足を止めた大佐',
    phase2Tab: '端末',
    contextCategory: 'friends',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-17',
    stages: [
      {
        spokenText:
          '3ヶ月前に大佐が研究所へ来た時、おまえを無言でじっと見ていったんだってな。あれ、気づかれていたのか？',
        aschText:
          '・・・・・・知るか。だから余計に気味が悪いんだろうが・・・・・・。',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'grit', effects: ['sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },

  // ==========================================
  // 【フェーズ2表クリア核心トピック：なぜナタリアやルークに会わず研究所に身を隠すのか（ロック会話④：仲間たちの近況解除後に出現／睡眠・休止の話がヒント）】
  // ==========================================
  {
    id: 'p2_why_hide_truth',
    thoughtText: 'みんなの元へ戻らない理由',
    phase2Tab: '追求',
    contextCategory: 'core',
    sensitiveToBadMood: true,
    prioritySlot1: true,
    requireLinkTag: 'talked_friends_news',
    stages: [
      {
        retryThoughtText: 'みんなの元へ戻らない理由（もう一度聞く）',
        spokenText:
          '・・・・・・なあ。どうしてバチカルへ帰らないんだ？　ナタリアにも会わず、こんな研究所に身を置いているのはなぜだ？',
        retrySpokenText:
          '・・・・・・さっきは引いたけど、これだけは聞かせてくれ。どうして誰にも会わずに研究所に身を隠しているんだ？',
        aschText:
          '・・・・・・帰る場所などない。俺は3年前のエルドラントで、確かに死んだはずなんだ。',
        retryAschText:
          '・・・・・・またその話か。帰る場所などないと言ったはずだ。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'close',
          mouth: 'frown',
          effects: ['sweat'],
        },
        capturedProtect: {
          sectorId: 'SEC-12',
          capturedQuote: '「・・・・・・帰る場所などない。俺は3年前のエルドラントで、確かに死んだはずなんだ。」',
          capturedContext: 'なぜナタリアやルークに会わず研究所に身を隠すのか尋ねた際の発言',
        },
        grantsLinkTags: ['sec12_discovered'],
        systemLog:
          'PROTECT TRIGGERED // SECTOR LOCKED: [EM-007 / SEC-12]',
        replyOptions: [
          {
            id: 'p2_why_hide_reply_step_in',
            thoughtText: '「今の姿を見られるのが嫌なんじゃなくて・・・・・・死んだはずの自分がなぜ動いているか分からないからか？」',
            spokenText:
              '・・・・・・今の姿を見られるのが嫌なんじゃなくて、死んだはずの自分がなぜ譜業の身体で動いているのか、おまえ自身にも分からないからか？',
            aschText:
              '・・・・・・あいつが戻っているなら、それでいいだろう。\n今の俺が何なのか、俺自身にも分からん。・・・・・・そんなまま、今さら誰の前に出られる。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'close',
              mouth: 'close',
              effects: [],
            },
            secondFaceParts: {
              brow: 'pain',
              eyes: 'down',
              mouth: 'frown',
              effects: [],
            },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'hint_sleep_dreams',
            naturalUnlockSectorId: 'SEC-12',
            grantsLinkTags: ['p2_heard_true_reason'],
            systemLog:
              'DIALOGUE UNLOCK // SECTOR: [EM-007 / SEC-12]',
            followUpOptions: [
              {
                id: 'p2_why_hide_reply_nod',
                thoughtText: '「・・・・・・そういうことか。無理に誰にも言わないよ」と頷く',
                spokenText:
                  '・・・・・・そういうことか。\n分かったよ。おまえがそういう気持ちでいるなら、俺からナタリアやルークに話すことはしない。',
                aschText:
                  '・・・・・・ああ。',
                expression: 'look_away',
                faceParts: {
                  brow: 'normal',
                  eyes: 'away',
                  mouth: 'close',
                  effects: [],
                },
                moodDelta: 1,
                completesTopic: true,
              },
            ],
          },
          {
            id: 'p2_why_hide_reply_wrong_childish',
            thoughtText: '「その小さな姿を見られて、子ども扱いされるのが嫌なのか？」',
            spokenText:
              'その小さな姿を見られて、みんなに子ども扱いされるのが嫌なのか？',
            aschText:
              '・・・・・・そんなくだらない見栄だけで隠れていると思うな！　何も分かっていないくせに知った風な口を利くな！',
            expression: 'glare',
            faceParts: {
              brow: 'angry',
              eyes: 'glare',
              mouth: 'shout',
              effects: ['blush'],
            },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_why_hide_reply_wrong_dist_weakness',
            thoughtText: '「ディストに弱みを握られて、研究所から出られないようにされているのか？」',
            spokenText:
              'まさかディストに何か弱みを握られて、研究所から出られないようにされているのか？',
            aschText:
              '・・・・・・ディストに縛られる俺じゃない。見当違いな詮索をするな。',
            expression: 'glare',
            faceParts: {
              brow: 'doubt',
              eyes: 'glare',
              mouth: 'frown',
              effects: [],
            },
            moodDelta: -1,
            completesTopic: true,
          },
          {
            id: 'p2_why_hide_reply_back_off',
            thoughtText: '「・・・・・・分かった、無理には聞かないよ」と一旦引き下がる',
            spokenText:
              '・・・・・・そうか。おまえがそこまで言いたくないなら、無理には聞かないでおくよ。',
            aschText:
              '・・・・・・',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'close',
              effects: [],
            },
            resetsTopicProgress: true,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 【終幕の問いかけへ繋がる深層対話（軸A・軸B・軸C 追加トピック）】
  // ==========================================

  // 【軸A-1】なぜよりによって「10歳の姿」なのか（予備機体の皮肉・ロック会話②のヒント）
  {
    id: 'p2_why_10yo_body',
    thoughtText: 'どうしてその10歳の姿なのか',
    phase2Tab: '追求',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_tarlow_history',
    stages: [
      {
        spokenText:
          'それにしても・・・・・・なんでよりによって、その『10歳の頃の姿』なんだ？',
        aschText:
          '・・・・・・俺が選んだわけじゃない。\n昔、万が一レプリカの生成が滞った時の『場繋ぎ』として造られていた予備の機体だ。ディストの研究所に転がっていたのが、これしかなかっただけだ。',
        expression: 'look_away',
        faceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'frown',
          effects: [],
        },
        secondFaceParts: {
          brow: 'sad',
          eyes: 'close',
          mouth: 'close',
          effects: [],
        },
        trustDelta: 1,
        grantsLinkTags: ['hint_human_limbs', 'hint_10yo_body', 'hint_voice_crack'],
        systemLog:
          'RESPONSE LOGGED // TOPIC: SPARE_FRAME_ORIGIN',
        replyOptions: [
          {
            id: 'p2_why_10yo_reply_irony',
            thoughtText: '「場繋ぎの予備、か・・・・・・皮肉な器だな」と言う',
            spokenText:
              '場繋ぎの予備、か・・・・・・おまえにとっては皮肉な器だな。',
            aschText:
              '・・・・・・まったくだ。本物の俺が、自分の『予備』の中に入っているんだからな。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'close',
              mouth: 'frown',
              effects: [],
            },
            trustDelta: 1,
            grantsLinkTags: ['hint_human_limbs', 'hint_10yo_body'],
            completesTopic: true,
          },
          {
            id: 'p2_why_10yo_reply_better_than_tarlow',
            thoughtText: '「11年前の予備機体・・・・・・ね。」と呟く',
            spokenText:
              '11年前の予備機体・・・・・・ね。',
            aschText:
              '・・・・・・手足があって剣を握れるだけ、あの鉄くずよりはマシだ。',
            expression: 'normal',
            faceParts: {
              brow: 'normal',
              eyes: 'down',
              mouth: 'close',
              effects: [],
            },
            moodDelta: 1,
            trustDelta: 1,
            grantsLinkTags: ['hint_human_limbs', 'hint_10yo_body'],
            completesTopic: true,
          },
        ],
      },
    ],
  },

  // 【軸A-2】その身体で眠ったり夢を見たりするのか（音機関の休止状態と喪失感・ロック会話④のヒント）
  {
    id: 'p2_sleep_and_dreams',
    thoughtText: '眠ったり夢を見たりするか',
    phase2Tab: '雑談',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_unscarred_hands', 'p2_why_hide_truth'],
    stages: [
      {
        spokenText:
          'その身体になってから、夜に眠ったり夢を見たりすることはあるのか？',
        aschText:
          '・・・・・・ない。音機関の出力を落として休止状態に入るだけだ。\n目を閉じて、次に開けた時にはただ時間が飛んでいる。夢なんてものは一度も見ない。',
        expression: 'normal',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'close',
          effects: [],
        },
        secondFaceParts: {
          brow: 'sad',
          eyes: 'close',
          mouth: 'close',
          effects: [],
        },
        trustDelta: 1,
        grantsLinkTags: ['hint_sleep_dreams'],
        oralInfo: {
          id: 'oral-sleep-and-dreams',
          category: '機体ログ',
          title: '休止モードと睡眠機能の未実装',
          content:
            '本機に睡眠機能および夢の再生機能は未実装。\n待機時は第七音素の循環出力を30%まで低下させた休止モードへ移行する。',
        },
        systemLog:
          'SPEC RECORDED // CODE: [MC-SLEEP_MODE]',
        replyOptions: [
          {
            id: 'p2_sleep_reply_wake_feeling',
            thoughtText: '「目が覚めた時、変な感じがしないか？」と聞く',
            spokenText:
              'そうか・・・・・・。目が覚めた時、変な感じがしないか？',
            aschText:
              '・・・・・・ああ。意識が戻るたびに、心臓の拍動じゃなく、胸の中で音機関が回る微かな振動だけが響く。\n・・・・・・いつまで経っても、慣れる気はしないがな。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'close',
              mouth: 'close',
              effects: [],
            },
            secondFaceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'frown',
              effects: [],
            },
            trustDelta: 2,
            grantsLinkTags: ['hint_sleep_dreams'],
            completesTopic: true,
          },
        ],
      },
    ],
  },

  // 【軸B-1】これからどうするつもりなのか（どこにも居場所がない現実）
  {
    id: 'p2_future_whereabouts',
    thoughtText: 'これからどうするつもりか',
    phase2Tab: '追求',
    contextCategory: 'core',
    sensitiveToBadMood: true,
    requireAnyLinkTags: ['talked_friends_news', 'talked_parents_thought'],
    stages: [
      {
        spokenText:
          'おまえ、これからどうするつもりなんだ？　やっぱりディストの研究所へ戻る気か？',
        aschText:
          '・・・・・・さあな。あんな騒がしい場所、好き好んで居座りたいわけじゃない。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        trustDelta: 1,
        replyOptions: [
          {
            id: 'p2_future_reply_other_place',
            thoughtText: '「じゃあ、どこか他に身を寄せる当てでもあるのか？」と聞く',
            spokenText:
              'じゃあ、どこか他に身を寄せる当てでもあるのか？',
            aschText:
              '・・・・・・ない。\nバチカルにも戻れん。・・・・・・こんな身体で、どこへ行けと言うんだ。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'close',
              mouth: 'close',
              effects: [],
            },
            secondFaceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'frown',
              effects: [],
            },
            trustDelta: 2,
            systemLog:
              'RESPONSE LOGGED // TOPIC: FUTURE_WHEREABOUTS',
            completesTopic: true,
          },
        ],
      },
    ],
  },

  // 【軸C-1】10歳の姿とファブレ屋敷時代の因縁（綺麗事ではないガイとの関係）
  {
    id: 'p2_manor_memories',
    thoughtText: '昔の屋敷での暮らし',
    phase2Tab: '追求',
    contextCategory: 'past',
    sensitiveToBadMood: true,
    requireAnyLinkTags: ['talked_old_appearance', 'talked_clothes'],
    relatedTopicIds: ['p2_parents_thought'],
    stages: [
      {
        spokenText:
          '・・・・・・その10歳の姿を目の前にしていると、どうしてもファブレの屋敷にいた頃を思い出すよ。',
        aschText:
          '・・・・・・ふん。俺がヴァンに攫われる前のことか。',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'down',
          mouth: 'close',
          effects: [],
        },
        trustDelta: 1,
        grantsLinkTags: ['hint_manor_parents'],
        replyOptions: [
          {
            id: 'p2_manor_reply_past_revenge',
            thoughtText: '「あの頃の俺は、復讐しようとずっと機会を窺っていた」と話す',
            spokenText:
              'ああ。あの頃の俺は、おまえたちファブレ一族を恨んで、隙あらば復讐しようとずっと機会を窺っていた。\n・・・・・・まさか何年も経って、あの時と同じ姿のおまえとこうして向き合うことになるとはな。',
            aschText:
              'おまえは・・・・・・\n・・・・・・いや、いい。',
            expression: 'normal',
            faceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'open',
              effects: [],
            },
            secondExpression: 'look_away',
            secondFaceParts: {
              brow: 'sad',
              eyes: 'close',
              mouth: 'close',
              effects: [],
            },
            moodDelta: 1,
            trustDelta: 2,
            grantsLinkTags: ['hint_manor_parents'],
            oralInfo: {
              id: 'oral-manor-unsaid-words',
              category: '情動反応',
              title: '屋敷時代の話題における発声中断と未出力テキスト',
              content:
                '屋敷時代の因縁に関する対話中、「おまえは・・・・・・」の後続として言語野で『今でも俺が憎いんだろう』という音声バッファが形成されたが、声帯ユニットへの出力直前に破棄され、「・・・・・・いや、いい」へ差し替えられた履歴。',
            },
            systemLog:
              'SPEECH BUFFER ABORTED // CODE: [EM-UNSAID_QUERY]',
            completesTopic: true,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 【追加ロック付き会話群（SEC-13〜SEC-17：日常・身体・家族・ジェイドへの警戒）】
  // ==========================================

  // ロック会話⑦（SEC-13）：研究所での暇つぶし（チェス盤の雑談がヒント）
  {
    id: 'p2_lab_pastime',
    thoughtText: '研究所で何をして過ごしているか',
    phase2Tab: '追求',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    stages: [
      {
        retryThoughtText: '研究所での過ごし方（もう一度聞く）',
        spokenText:
          '研究所にこもっている間、外出もしないで毎日何をして時間を潰しているんだ？',
        retrySpokenText:
          'さっきは『何もしていない』って言っていたけど・・・・・・本当は研究所で何か暇つぶしをしているんじゃないのか？',
        aschText:
          '・・・・・・別に、何もしていない。',
        retryAschText:
          '・・・・・・研究所で何をしていようが俺の勝手だろうが。',
        expression: 'look_away',
        faceParts: { brow: 'normal', eyes: 'away', mouth: 'frown', effects: [] },
        capturedProtect: {
          sectorId: 'SEC-13',
          capturedQuote: '「・・・・・・別に、何もしていない。」',
          capturedContext: '研究所にこもっている間の暇つぶしについて尋ねた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_pastime_reply_correct_chess',
            thoughtText: '「昔みたいに、チェスでも差して時間を潰したりはしないのか？」',
            spokenText:
              '昔みたいに、チェスでも差して時間を潰したりはしないのか？',
            aschText:
              '・・・・・・たまに盤面を並べるくらいだ。相手になる奴がいないからな。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'hint_chess_board',
            naturalUnlockSectorId: 'SEC-13',
            completesTopic: true,
          },
          {
            id: 'p2_pastime_reply_wrong_help_dist',
            thoughtText: '「毎日ディストの実験の手伝いでもさせられていたのか？」',
            spokenText:
              '毎日ディストの実験の手伝いでもさせられていたのか？',
            aschText:
              '・・・・・・冗談じゃない。誰があいつの手伝いなどするか。',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'frown', effects: [] },
            moodDelta: -1,
            completesTopic: true,
          },
          {
            id: 'p2_pastime_reply_wrong_stare_wall',
            thoughtText: '「暗い部屋でずっと壁でも眺めてる、とか？」',
            spokenText:
              '暗い部屋でずっと壁でも眺めてる、とか？',
            aschText:
              '俺を何だと思っているんだ・・・・・・！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: [] },
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_pastime_reply_back_off',
            thoughtText: '「・・・・・・そうか。深く聞くつもりはなかったんだ」と一旦引く',
            spokenText:
              '・・・・・・そうか。深く聞くつもりはなかったんだ。',
            aschText:
              '・・・・・・',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
            resetsTopicProgress: true,
          },
        ],
      },
    ],
  },

  // ロック会話⑧（SEC-14）：10歳の声（声変わり前）への違和感（予備機体の話がヒント）
  {
    id: 'p2_voice_discomfort',
    thoughtText: '昔の声で喋りづらくないか',
    phase2Tab: '追求',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_tarlow_history',
    stages: [
      {
        retryThoughtText: '今の声のこと（もう一度聞く）',
        spokenText:
          '・・・・・・しかし、声まであの頃のままだと、怒鳴られてもなんだか調子が狂うな。',
        retrySpokenText:
          'さっきは悪かったけど・・・・・・やっぱりその声、聞いているとあの頃を思い出すな。',
        aschText:
          '俺だって好きでこんな声を出しているわけじゃない。',
        retryAschText:
          '・・・・・・まだ声の話をする気か。',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush'] },
        capturedProtect: {
          sectorId: 'SEC-14',
          capturedQuote: '「俺だって好きでこんな声を出しているわけじゃない。」',
          capturedContext: '10歳当時の声（声変わり前）について触れた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_voice_reply_correct_crack',
            thoughtText: '「11年前の予備機体なんだから仕方ないよな。昔を思い出して懐かしかっただけなんだ」',
            spokenText:
              '11年前の予備機体なんだから仕方ないよな。昔を思い出して懐かしかっただけなんだ。',
            aschText:
              '・・・・・・懐かしい、か。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'hint_voice_crack',
            naturalUnlockSectorId: 'SEC-14',
            completesTopic: true,
          },
          {
            id: 'p2_voice_reply_wrong_cute',
            thoughtText: '「その高い声で必死に凄まれてもなあ」',
            spokenText:
              'その高い声で必死に凄まれてもなあ。',
            aschText:
              'ぐっ・・・・・・！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: ['blush', 'sweat'] },
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_voice_reply_wrong_modify',
            thoughtText: '「ディストに言えば、声くらい元の低い声に直してもらえるんじゃないか？」',
            spokenText:
              'ディストに言えば、声くらい元の低い声に直してもらえるんじゃないか？',
            aschText:
              '・・・・・・あいつにこれ以上身体を弄らせてたまるか。余計な知恵をつけるな。',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'pain', mouth: 'frown', effects: ['pale'] },
            moodDelta: -1,
            completesTopic: true,
          },
          {
            id: 'p2_voice_reply_back_off',
            thoughtText: '「・・・・・・悪かったよ。からかうつもりはなかったんだ」と一旦引く',
            spokenText:
              '・・・・・・悪かったよ。からかうつもりはなかったんだ。',
            aschText:
              '・・・・・・',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
            resetsTopicProgress: true,
          },
        ],
      },
    ],
  },

  // ロック会話⑨（SEC-15）：ファブレ公爵夫妻（父上・母上）への思い（屋敷時代の思い出がヒント）
  {
    id: 'p2_parents_thought',
    thoughtText: '屋敷の公爵様や奥様のこと',
    phase2Tab: '追求',
    contextCategory: 'past',
    sensitiveToBadMood: true,
    requireAnyLinkTags: ['talked_old_appearance', 'talked_clothes', 'hint_manor_parents'],
    stages: [
      {
        retryThoughtText: '屋敷の公爵様たちのこと（もう一度聞く）',
        spokenText:
          '・・・・・・なあ。バチカルの公爵様や奥様のことは、今どう思っているんだ？',
        retrySpokenText:
          '・・・・・・さっきは話を逸らしたけど、やっぱり屋敷の公爵様や奥様のことは気にかかっているんじゃないのか？',
        aschText:
          '・・・・・・今さら父上や母上の話などしてどうなる。あの屋敷にはもう、帰るべき息子が戻っているだろうが。',
        retryAschText:
          '・・・・・・父上や母上の話はするなと言ったはずだ。',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
        capturedProtect: {
          sectorId: 'SEC-15',
          capturedQuote:
            '「・・・・・・今さら父上や母上の話などしてどうなる。あの屋敷にはもう、帰るべき息子が戻っているだろうが。」',
          capturedContext: 'ファブレ公爵夫妻（父上・母上）への思いについて尋ねた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_parents_reply_correct_confusion',
            thoughtText: '「おまえが顔を出したら、また奥様を泣かせてしまうと思っているのか？」',
            spokenText:
              '・・・・・・おまえが顔を出したら、また奥様を泣かせてしまうと思っているのか？',
            aschText:
              '・・・・・・一度死んだ人間が、こんな譜業の姿で母上の前に出てみろ。混乱させるだけだ。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: [] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'hint_manor_parents',
            naturalUnlockSectorId: 'SEC-15',
            grantsLinkTags: ['talked_parents_thought'],
            completesTopic: true,
          },
          {
            id: 'p2_parents_reply_wrong_grudge',
            thoughtText: '「自分の居場所をルークに奪われたと思って、まだ恨んでいるのか？」',
            spokenText:
              '自分の居場所をルークに奪われたと思って、まだ恨んでいるのか？',
            aschText:
              '・・・・・・見くびるな！　今さらそんなことを思うわけがないだろう！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: [] },
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_parents_reply_wrong_spoil',
            thoughtText: '「本当は屋敷に帰って、昔みたいに奥様に甘えたいんじゃないのか？」',
            spokenText:
              '本当は屋敷に帰って、昔みたいに奥様に甘えたいんじゃないのか？',
            aschText:
              '・・・・・・ふっ、ふざけるな！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush', 'sweat'] },
            voiceEffects: ['shout'],
            moodDelta: -3,
            completesTopic: true,
          },
          {
            id: 'p2_parents_reply_back_off',
            thoughtText: '「・・・・・・そうだな、今聞くことじゃなかったな」と一旦引く',
            spokenText:
              '・・・・・・そうだな。無理に聞くことじゃなかったよ。',
            aschText:
              '・・・・・・ああ。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
            resetsTopicProgress: true,
          },
        ],
      },
    ],
  },

  // ロック会話⑩（SEC-16）：剣ダコも傷跡もない人工皮膚の手（眠り・休止の話がヒント）
  {
    id: 'p2_unscarred_hands',
    thoughtText: '傷もタコもない掌',
    phase2Tab: '追求',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_tarlow_history',
    stages: [
      {
        retryThoughtText: '自分の掌のこと（もう一度聞く）',
        spokenText:
          '・・・・・・その身体の掌や腕には、剣ダコも昔の傷跡もひとつもないんだな。',
        retrySpokenText:
          'さっきの掌の話だけど・・・・・・やっぱり、剣ダコや傷跡がなくなっているのは気になるのか？',
        aschText:
          '・・・・・・当たり前だ。11年前に造られた予備機体だからな。あまりジロジロ見るな。',
        retryAschText:
          '・・・・・・まだ俺の手を見ているのか。趣味が悪い奴だな。',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
        capturedProtect: {
          sectorId: 'SEC-16',
          capturedQuote:
            '「・・・・・・当たり前だ。11年前に造られた予備機体だからな。あまりジロジロ見るな。」',
          capturedContext: '掌や腕に剣ダコや傷跡がないことについて触れた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_hands_reply_correct_doll',
            thoughtText: '「・・・・・・ふと自分の手を見た時、前の身体と違いすぎて落ち着かないんじゃないか？」',
            spokenText:
              '・・・・・・ふと自分の手を見た時、前の身体と違いすぎて落ち着かないんじゃないか？',
            aschText:
              '・・・・・・ああ。まるで作り物の人形の手だ。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'hint_sleep_dreams',
            naturalUnlockSectorId: 'SEC-16',
            completesTopic: true,
          },
          {
            id: 'p2_hands_reply_wrong_clean',
            thoughtText: '「傷だらけだった前の身体より、綺麗になって良かったじゃないか」',
            spokenText:
              '傷だらけだった前の身体より、綺麗になって良かったじゃないか。',
            aschText:
              '・・・・・・ふっ、そうかもしれないな。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'close', mouth: 'smile', effects: [] },
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_hands_reply_wrong_no_pain',
            thoughtText: '「譜業の身体なら、もう怪我もしないし便利だよな」',
            spokenText:
              '譜業の身体なら、もう怪我もしないし便利だよな。',
            aschText:
              '・・・・・・斬られても血も出ない身体の、どこがいいと言うんだ。',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'frown', effects: [] },
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_hands_reply_back_off',
            thoughtText: '「・・・・・・そうだな。悪かったよ」と一旦引く',
            spokenText:
              '・・・・・・そうだな。悪かったよ。',
            aschText:
              '・・・・・・',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
            resetsTopicProgress: true,
          },
        ],
      },
    ],
  },

  // ロック会話⑪（SEC-17）：大佐（ジェイド）に気づかれていないか（タルロウAの過去話がヒント）
  {
    id: 'p2_jade_suspicion',
    thoughtText: '研究所に来ていた大佐のこと',
    phase2Tab: '追求',
    contextCategory: 'friends',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_dist_hideout',
    relatedTopicIds: ['p2_tarlow_past'],
    stages: [
      {
        retryThoughtText: '大佐のこと（もう一度聞く）',
        spokenText:
          '研究所には大佐もよく出入りしていたよな。よく今まで気づかれずにいられたな。',
        retrySpokenText:
          'さっきの大佐の話だけど・・・・・・やっぱりおまえ、大佐に正体を勘づかれるのを一番警戒していたんじゃないのか？',
        aschText:
          '・・・・・・あの眼鏡の話をするな。あいつが来た時は、ただの譜業のフリをしてやり過ごしていた。',
        retryAschText:
          '・・・・・・あの死霊使いには気づかれていないと言っているだろうが。',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['sweat'] },
        capturedProtect: {
          sectorId: 'SEC-17',
          capturedQuote:
            '「・・・・・・あの眼鏡の話をするな。あいつが来た時は、ただの譜業のフリをしてやり過ごしていた。」',
          capturedContext: '研究所を訪れていたジェイドに正体を気づかれていないか尋ねた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_jade_reply_correct_tarlow',
            thoughtText: '「研究所で俺たちに声をかけなかったのも、あの大佐に勘づかれるのが一番厄介だったからか？」',
            spokenText:
              '研究所で俺たちに声をかけなかったのも、あの大佐に勘づかれるのが一番厄介だったからか？',
            aschText:
              '・・・・・・あの死霊使いに知られてみろ、どんな実験材料にされるか分かったものじゃない。',
            expression: 'look_away',
            faceParts: { brow: 'angry', eyes: 'away', mouth: 'grit', effects: ['sweat'] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'talked_tarlow_history',
            naturalUnlockSectorId: 'SEC-17',
            completesTopic: true,
          },
          {
            id: 'p2_jade_reply_wrong_seen_through',
            thoughtText: '「大佐のことだから、とっくに全部お見通しだったりしてな」',
            spokenText:
              '大佐のことだから、とっくに全部お見通しだったりしてな。',
            aschText:
              '・・・・・・縁起でもないことを言うな！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['sweat'] },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_jade_reply_wrong_call_jade',
            thoughtText: '「いっそ大佐を呼んで、その身体を診てもらおうか？」',
            spokenText:
              'いっそ大佐を呼んで、その身体を診てもらおうか？',
            aschText:
              'やめろ！　あいつを呼ぶなら、俺は今すぐここから出て行く！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['sweat'] },
            voiceEffects: ['shout'],
            moodDelta: -3,
            completesTopic: true,
          },
          {
            id: 'p2_jade_reply_back_off',
            thoughtText: '「・・・・・・なんか寒気がしてきたぞ。大佐の話はやめておこうか」と一旦引く',
            spokenText:
              '・・・・・・なんか寒気がしてきたぞ。大佐の話はやめておこうか。',
            aschText:
              '・・・・・・名前を聞くだけでも具合が悪くなる。',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
            resetsTopicProgress: true,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 【裏の秘密への段階的導入①：エルドラントの最期と空白の2年間（ロック会話⑤：タルロウAの話で出現／端末提示がヒント → SEC-19浮上）】
  // ==========================================
  {
    id: 'p2_eldrant_and_blank',
    thoughtText: 'エルドラントの後のこと',
    phase2Tab: '追求',
    contextCategory: 'past',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_tarlow_history',
    stages: [
      {
        retryThoughtText: 'エルドラントの後のこと（もう一度聞く）',
        spokenText:
          '・・・・・・3年前のエルドラントで、おまえは確かに死んだはずだったよな。あのあと何が起きたか覚えているか？',
        retrySpokenText:
          '・・・・・・さっき言っていた、エルドラントから1年前までの『空白の2年間』のことだけど、どうしても引っかかるんだ。',
        aschText:
          '・・・・・・崩れるエルドラントで、ルークが俺を抱えていたところまでは覚えている。\n・・・・・・だが、1年前に目覚める前までのことは何も・・・・・・。',
        retryAschText:
          '・・・・・・蒸し返すなと言っただろう。1年前に目覚める前までのことは、何も出てこないんだ。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'close',
          mouth: 'close',
          effects: [],
        },
        secondFaceParts: {
          brow: 'doubt',
          eyes: 'down',
          mouth: 'frown',
          effects: [],
        },
        naturalUnlockSectorId: 'SEC-18',
        systemLog:
          'DIALOGUE UNLOCK // SECTOR: [DP-001 / SEC-18]',
        replyOptions: [
          {
            id: 'p2_eldrant_reply_step_in',
            thoughtText: '「1年前といえばルークが戻ってきた時期だ。その2年間だけディストにロックをかけられているんじゃないか？」',
            spokenText:
              '1年前といえばルークが戻ってきた時期だ。その2年間だけ抜けているのは、ディストにロックをかけられているんじゃないか？',
            aschText:
              '・・・・・・っ、くそ、頭が・・・・・・っ。\nあいつが俺の記憶をどう弄ったかなど知るか・・・・・・っ。',
            expression: 'pain',
            faceParts: {
              brow: 'pain',
              eyes: 'close',
              mouth: 'grit',
              effects: ['pale', 'sweat'],
            },
            secondExpression: 'glare',
            secondFaceParts: {
              brow: 'pain',
              eyes: 'glare',
              mouth: 'frown',
              effects: ['sweat'],
            },
            voiceEffects: ['tremble', 'normal'],
            requireLinkTag: 'terminal_revealed',
            capturedProtect: {
              sectorId: 'SEC-19',
              capturedQuote:
                '「・・・・・・だが、1年前に目覚める前までのことは何も・・・・・・。」',
              capturedContext:
                'エルドラントから1年前までの「空白の2年間」について尋ねた際の発言',
            },
            grantsLinkTags: ['talked_eldrant_blank'],
            systemLog:
              'WARNING // ADMIN LOCK DETECTED: [DP-002 / SEC-19]',
            completesTopic: true,
          },
          {
            id: 'p2_eldrant_reply_wrong_shock',
            thoughtText: '「エルドラントが崩れた時の衝撃で、記憶が消えてしまっただけじゃないか？」',
            spokenText:
              'エルドラントが崩れた時の衝撃で、たまたまその時期の記憶だけ消えてしまったんじゃないのか？',
            aschText:
              '・・・・・・だったらその前後の記憶まで残っている説明がつかんだろうが。適当な気休めを言うな。',
            expression: 'glare',
            faceParts: {
              brow: 'angry',
              eyes: 'away',
              mouth: 'frown',
              effects: [],
            },
            moodDelta: -1,
            completesTopic: true,
          },
          {
            id: 'p2_eldrant_reply_wrong_hiding',
            thoughtText: '「本当は覚えているのに、俺に言いたくなくて隠しているだけじゃないのか？」',
            spokenText:
              '本当は覚えているのに、俺に言いたくなくて隠しているだけじゃないのか？',
            aschText:
              '・・・・・・言いがかりをつけるな！',
            expression: 'glare',
            faceParts: {
              brow: 'angry',
              eyes: 'glare',
              mouth: 'shout',
              effects: ['blush'],
            },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_eldrant_reply_back_off',
            thoughtText: '「・・・・・・いや、無理に思い出させようとして悪かった」と一旦引く',
            spokenText:
              '・・・・・・そうか。無理に掘り返すようなことを聞いて悪かったよ。',
            aschText:
              '・・・・・・',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'away',
              mouth: 'close',
              effects: [],
            },
            resetsTopicProgress: true,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 【裏の秘密への段階的導入②：2ヶ月前にタルロウAが壊れた理由（ロック会話⑥：タルロウAの話で出現／端末でSEC-19閲覧がヒント → SEC-20浮上）】
  // ==========================================
  {
    id: 'p2_tarlow_broken_reason',
    thoughtText: 'なぜ前の機体が壊れたのか',
    phase2Tab: '追求',
    contextCategory: 'core',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_tarlow_history',
    stages: [
      {
        retryThoughtText: '前の機体が壊れた理由（もう一度聞く）',
        spokenText:
          '・・・・・・なあ、2ヶ月前にタルロウAは何で壊れたんだ？　ずっと研究所の中にいたんだろ？',
        retrySpokenText:
          '・・・・・・やっぱり引っかかるんだ。2ヶ月前にタルロウAが壊れた時、本当は何があったんだ？',
        aschText:
          '・・・・・・知らん。なぜ壊れたのかは覚えていない。気づいた時には、もうこの身体に移されていた。',
        retryAschText:
          '・・・・・・しつこい奴だな。なぜ壊れたかは覚えていないと言っているだろうが。',
        expression: 'look_away',
        faceParts: {
          brow: 'doubt',
          eyes: 'down',
          mouth: 'close',
          effects: [],
        },
        replyOptions: [
          {
            id: 'p2_broken_reply_correct_self',
            thoughtText: '「ただの故障じゃない・・・・・・おまえ自身が何かを知って無茶をしたせいじゃないのか？」',
            spokenText:
              '・・・・・・ただの故障なんかじゃないだろ。おまえ自身が何かを知って、自分で無茶をしたせいじゃないのか？',
            aschText:
              '・・・・・・っ、ぐ・・・・・・ッ！！　あ、頭が・・・・・・っ！\n・・・・・・やめろ、それ以上聞くな・・・・・・っ！',
            expression: 'pain',
            faceParts: {
              brow: 'pain',
              eyes: 'close',
              mouth: 'grit',
              effects: ['pale', 'sweat', 'noise'],
            },
            secondExpression: 'pain',
            secondFaceParts: {
              brow: 'pain',
              eyes: 'wide',
              mouth: 'open',
              effects: ['pale', 'sweat', 'noise'],
            },
            voiceEffects: ['tremble_glitch', 'shout_glitch'],
            requireLinkTag: 'sec19_unlocked',
            capturedProtect: {
              sectorId: 'SEC-20',
              capturedQuote:
                '「・・・・・・っ、ぐ・・・・・・ッ！！　あ、頭が・・・・・・っ！　・・・・・・やめろ、それ以上聞くな・・・・・・っ！」',
              capturedContext:
                '2ヶ月前にタルロウAが壊れた理由を思い出そうとして頭痛・ノイズ発作を起こした際の発言',
            },
            grantsLinkTags: ['talked_tarlow_broken'],
            systemLog:
              'CRITICAL // ADMIN LOCK DETECTED: [DP-003 / SEC-20]',
            completesTopic: true,
          },
          {
            id: 'p2_broken_reply_wrong_dist_exp',
            thoughtText: '「ディストの実験に巻き込まれて、壊されたんじゃないのか？」',
            spokenText:
              'ディストの実験に巻き込まれて、壊されたんじゃないのか？',
            aschText:
              '・・・・・・あいつが自分の研究材料をわざわざ壊すわけがないだろう。',
            expression: 'glare',
            faceParts: {
              brow: 'doubt',
              eyes: 'glare',
              mouth: 'frown',
              effects: [],
            },
            moodDelta: -1,
            completesTopic: true,
          },
          {
            id: 'p2_broken_reply_wrong_sword',
            thoughtText: '「あの50センチの小型機体で、無理に剣でも振ろうとしたのか？」',
            spokenText:
              'あの50センチの小型機体で、無理に剣でも振ろうとしたのか？',
            aschText:
              '・・・・・・あんな樽みたいな機体で、剣など握れるわけがないだろうが！',
            expression: 'glare',
            faceParts: {
              brow: 'angry',
              eyes: 'glare',
              mouth: 'shout',
              effects: ['blush'],
            },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_broken_reply_back_off',
            thoughtText: '「・・・・・・そうか。思い出せないなら、無理には聞かないよ」と一旦引く',
            spokenText:
              '・・・・・・そうか。思い出せないなら、無理には聞かないよ。',
            aschText:
              '・・・・・・',
            expression: 'look_away',
            faceParts: {
              brow: 'normal',
              eyes: 'away',
              mouth: 'close',
              effects: [],
            },
            resetsTopicProgress: true,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 【裏の秘密・クライマックス対話（Step 2-2B）：サイレント解除で知った真実への向き合い方（パターンA・B・C多段分岐）】
  // ==========================================
  {
    id: 'p2_deep_truth_dilemma',
    thoughtText: '【DP-002/003】封じられていた『空白の記憶』',
    phase2Tab: '端末',
    contextCategory: 'core',
    prioritySlot1: true,
    requireLinkTag: 'climax_ready',
    stages: [
      {
        spokenText:
          '・・・・・・なあ、アッシュ。今のままディストの研究所に身を隠し続けて、おまえ自身は本当にそれでいいのか？',
        aschText:
          '・・・・・・なんだ、藪から棒に。\n言いたいことがあるなら、回りくどい真似をせずにはっきり言え。',
        expression: 'normal',
        faceParts: {
          brow: 'doubt',
          eyes: 'normal',
          mouth: 'close',
          effects: [],
        },
        secondExpression: 'glare',
        secondFaceParts: {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'close',
          effects: [],
        },
        replyOptions: [
          // --------------------------------------------------
          // 【パターンA】真相は胸に秘め、ルークのために犠牲になったアッシュの献身を労う（3往復＋分岐）
          // --------------------------------------------------
          {
            id: 'p2_dilemma_pattern_a',
            thoughtText: '記録は伏せ「ルークが戻れたのはおまえのおかげだ」と労う',
            spokenText:
              '・・・・・・いや、おまえが覚えていないならそれでいいんだ。ただ・・・・・・1年前にルークが戻ってこられたのは、おまえのおかげだったんだなと思ってさ。',
            aschText:
              '・・・・・・何の話だ。\n俺があいつのために何かしてやったことなど・・・・・・。',
            expression: 'look_away',
            faceParts: {
              brow: 'doubt',
              eyes: 'normal',
              mouth: 'close',
              effects: [],
            },
            secondExpression: 'look_away',
            secondFaceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'close',
              effects: [],
            },
            moodDelta: 1,
            trustDelta: 1,
            followUpOptions: [
              {
                id: 'p2_dilemma_a_step2_warm',
                thoughtText: '「おまえが消えずに残っていることも良かったと思う」',
                spokenText:
                  'おまえが覚えていなくても、俺はそう思ってるよ。\n・・・・・・それに、おまえが今こうして消えずに残っていることも、俺は良かったと思ってる。',
                aschText:
                  '・・・・・・そうか。',
                expression: 'look_away',
                faceParts: {
                  brow: 'sad',
                  eyes: 'close',
                  mouth: 'close',
                  effects: ['blush'],
                },
                moodDelta: 1,
                trustDelta: 2,
                followUpOptions: [
                  {
                    id: 'p2_dilemma_a_step3_never_break',
                    thoughtText: '「いつでもここへ茶を飲みに来いよ」',
                    spokenText:
                      '・・・・・・ああ。いつでもここへ茶を飲みに来いよ。',
                    aschText:
                      '・・・・・・気が向いたらな。',
                    expression: 'look_away',
                    faceParts: {
                      brow: 'smile',
                      eyes: 'away',
                      mouth: 'close',
                      effects: ['blush'],
                    },
                    moodDelta: 2,
                    trustDelta: 2,
                    grantsLinkTags: ['p2_dilemma_resolved', 'p2_dilemma_kept_secret'],
                    completesTopic: true,
                  },
                  {
                    id: 'p2_dilemma_a_step3_keep_quiet',
                    thoughtText: '「おまえが言いたくないことは、全部俺の胸にしまっておくよ」',
                    spokenText:
                      '・・・・・・ああ。おまえが言いたくないことは、全部俺の胸にしまっておくよ。',
                    aschText:
                      '・・・・・・おまえは昔から、お人好しにも程がある。',
                    expression: 'look_away',
                    faceParts: {
                      brow: 'smile',
                      eyes: 'close',
                      mouth: 'close',
                      effects: ['blush'],
                    },
                    moodDelta: 2,
                    trustDelta: 2,
                    grantsLinkTags: ['p2_dilemma_resolved', 'p2_dilemma_kept_secret'],
                    completesTopic: true,
                  },
                ],
              },
              {
                id: 'p2_dilemma_a_step2_past_avenger',
                thoughtText: '「復讐を狙っていた俺が言うのも虫がいいよな」と吐露する',
                spokenText:
                  '・・・・・・昔、おまえに復讐しようと機会を窺っていた俺が言うのも虫がいいよな。\nそれでも、今のおまえを知らん顔で放っておく気にはなれないんだ。',
                aschText:
                  '・・・・・・今さら昔の復讐の話など持ち出すな。\n俺に同情する暇があるなら、自分の心配でもしていろ。',
                expression: 'look_away',
                faceParts: {
                  brow: 'sad',
                  eyes: 'close',
                  mouth: 'close',
                  effects: [],
                },
                secondFaceParts: {
                  brow: 'normal',
                  eyes: 'away',
                  mouth: 'frown',
                  effects: [],
                },
                moodDelta: 1,
                trustDelta: 2,
                followUpOptions: [
                  {
                    id: 'p2_dilemma_a_step3_avenger_reply',
                    thoughtText: '「同情なんかじゃないさ。ただ、あまりひとりで無茶だけはするなよ」',
                    spokenText:
                      '同情なんかじゃないさ。・・・・・・ただ、あまりひとりで無茶だけはするなよ。',
                    aschText:
                      '・・・・・・俺なんかを気にかける暇があるなら、もっと有意義なことに時間を・・・・・・。',
                    expression: 'look_away',
                    faceParts: {
                      brow: 'sad',
                      eyes: 'away',
                      mouth: 'close',
                      effects: ['blush'],
                    },
                    moodDelta: 1,
                    trustDelta: 2,
                    grantsLinkTags: ['p2_dilemma_resolved', 'p2_dilemma_kept_secret'],
                    completesTopic: true,
                  },
                ],
              },
            ],
          },

          // --------------------------------------------------
          // 【パターンB】封印記録そのものは伏せつつ、2ヶ月前に『タルロウA』が壊れた理由へ遠回しに踏み込む（3往復＋分岐）
          // --------------------------------------------------
          {
            id: 'p2_dilemma_pattern_b',
            thoughtText: '「2ヶ月前に壊れたのは無茶をしたせいでは」と探る',
            spokenText:
              '・・・・・・2ヶ月前にタルロウAが壊れたの、ただの故障なんかじゃなくて、おまえ自身が何か無茶をしたせいだったんじゃないのか？',
            aschText:
              '・・・・・・チッ、まだその話を蒸し返す気か。\nなぜ壊れたかは思い出せんと言ったはずだ。余計な詮索をするな。',
            expression: 'look_away',
            faceParts: {
              brow: 'angry',
              eyes: 'glare',
              mouth: 'frown',
              effects: [],
            },
            secondFaceParts: {
              brow: 'sad',
              eyes: 'away',
              mouth: 'close',
              effects: [],
            },
            followUpOptions: [
              {
                id: 'p2_dilemma_b_step2_selfharm',
                thoughtText: '「まさか自分で自分の機体を壊そうとしたのか」と迫る',
                spokenText:
                  '・・・・・・まさかおまえ、自分で自分の機体を壊そうとしたんじゃないだろうな。',
                aschText:
                  '・・・・・・っ！？　な、何を根拠にそんなことを言う・・・・・・！\n俺が自分で自分を壊すわけが・・・・・・っ、くそ、なぜだ・・・・・・。',
                expression: 'shock',
                faceParts: {
                  brow: 'doubt',
                  eyes: 'wide',
                  mouth: 'gasp',
                  effects: ['sweat'],
                },
                secondExpression: 'pain',
                secondFaceParts: {
                  brow: 'pain',
                  eyes: 'pain',
                  mouth: 'grit',
                  effects: ['pale', 'sweat'],
                },
                voiceEffects: ['tremble', 'normal'],
                followUpOptions: [
                  {
                    id: 'p2_dilemma_b_step3_dont_throw_away',
                    thoughtText: '「譜業の身体だからって自分を粗末にするなよ。おまえにいなくなられたら、俺が困るんだ」',
                    spokenText:
                      '・・・・・・やっぱりそうだったのか。譜業の身体だからって自分を粗末にするなよ。おまえにいなくなられたら、俺が困るんだ。',
                    aschText:
                      '・・・・・・っ、勝手なことを言うな。俺はもう3年前に死んだ身だ。\n・・・・・・っ、くそ・・・・・・。',
                    expression: 'glare',
                    faceParts: {
                      brow: 'angry',
                      eyes: 'glare',
                      mouth: 'open',
                      effects: ['blush', 'sweat'],
                    },
                    secondExpression: 'look_away',
                    secondFaceParts: {
                      brow: 'pain',
                      eyes: 'down',
                      mouth: 'grit',
                      effects: ['blush'],
                    },
                    moodDelta: 1,
                    trustDelta: 2,
                    grantsLinkTags: ['p2_dilemma_resolved'],
                    completesTopic: true,
                  },
                  {
                    id: 'p2_dilemma_b_step3_dist_lock',
                    thoughtText: '「ディストのロックも無茶をさせないためかもな」と呟く',
                    spokenText:
                      '・・・・・・あのディストが珍しくおまえの記憶に強固なロックをかけたのも、おまえがまた自分を傷つけるような無茶をしないためだったのかもしれないな。',
                    aschText:
                      '・・・・・・ハッ、あいつがそんな殊勝な理由で動くものか。どうせ貴重なサンプルを壊されたくなかっただけだろう。\n・・・・・・まあいい。思い出せないことは、今の俺には必要のないことだ。',
                    expression: 'look_away',
                    faceParts: {
                      brow: 'doubt',
                      eyes: 'glare',
                      mouth: 'smile',
                      effects: [],
                    },
                    secondFaceParts: {
                      brow: 'sad',
                      eyes: 'close',
                      mouth: 'close',
                      effects: [],
                    },
                    trustDelta: 1,
                    grantsLinkTags: ['p2_dilemma_resolved'],
                    completesTopic: true,
                  },
                ],
              },
              {
                id: 'p2_dilemma_b_step2_body_change',
                thoughtText: '「今の身体に乗り換えて少しは落ち着いたか？」と聞く',
                spokenText:
                  '思い出せないなら無理にとは言わないよ。ただ、タルロウAから今の身体に乗り換えて、少しは気持ちも落ち着けたのか？',
                aschText:
                  '・・・・・・背が縮んで目線が低いのは相変わらず腹が立つがな。\nあの樽みたいな鉄塊に入っていた頃よりは、いくらかマシだ。',
                expression: 'look_away',
                faceParts: {
                  brow: 'angry',
                  eyes: 'away',
                  mouth: 'frown',
                  effects: [],
                },
                secondExpression: 'normal',
                secondFaceParts: {
                  brow: 'normal',
                  eyes: 'down',
                  mouth: 'close',
                  effects: [],
                },
                moodDelta: 1,
                trustDelta: 1,
                followUpOptions: [
                  {
                    id: 'p2_dilemma_b_step3_take_care',
                    thoughtText: '「せっかく人間の形に戻れたんだ、壊すような無茶はするなよ」',
                    spokenText:
                      '・・・・・・そうか。せっかく人間の形に戻れたんだ、もうその身体を壊すような無茶だけはするなよ。',
                    aschText:
                      '・・・・・・ああ。',
                    expression: 'look_away',
                    faceParts: {
                      brow: 'normal',
                      eyes: 'away',
                      mouth: 'close',
                      effects: [],
                    },
                    moodDelta: 1,
                    trustDelta: 1,
                    grantsLinkTags: ['p2_dilemma_resolved'],
                    completesTopic: true,
                  },
                ],
              },
            ],
          },

          // --------------------------------------------------
          // 【パターンC】封印記録をすべてバラして問い詰め、アッシュもルークも本物じゃないとガイがパニックになる破滅ルート（4往復＋分岐）
          // --------------------------------------------------
          {
            id: 'p2_dilemma_pattern_c',
            thoughtText: '封印記録を突きつけ「消去される残り滓なのか！？」と迫る',
            spokenText:
              '・・・・・・この端末の奥にあった封印記録を見たぞ、アッシュ。\n1年前にディストがルークと混ざっていた記憶を2つに切り分けて・・・・・・おまえはその時消去されるはずだった記憶で、2ヶ月前にそれを知って自壊しようとしたのか！？',
            aschText:
              '・・・・・・なっ！？　おまえ、勝手にあの端末の奥をこじ開けたのか・・・・・・ッ！？\n・・・・・・やめろ、そんな記録は知らん！！　人の頭の中を勝手に暴くな！！',
            expression: 'shock',
            faceParts: {
              brow: 'sad',
              eyes: 'wide',
              mouth: 'gasp',
              effects: ['pale', 'sweat'],
            },
            secondExpression: 'glare',
            secondFaceParts: {
              brow: 'angry',
              eyes: 'glare',
              mouth: 'shout',
              effects: ['pale', 'sweat'],
            },
            voiceEffects: ['shout', 'shout_glitch'],
            moodDelta: -3,
            hatredDelta: 1,
            grantsLinkTags: ['terminal_revealed'],
            followUpOptions: [
              {
                id: 'p2_dilemma_c_step2_panic_luke',
                thoughtText: '「タタル渓谷へ戻ったルークも本物じゃないのか！？」',
                spokenText:
                  'この端末の内部記録に全部残ってるんだよ！！\n・・・・・・待てよ。もし混ざり合った記憶を音機関で2つに切り分けただけなら・・・・・・1年前にタタル渓谷へ帰ってきた『ルーク』は一体何なんだ！？　あいつも俺たちの知ってるルークじゃないのかよ・・・・・・！？',
                aschText:
                  '・・・・・・っ、やめろ、ガイ！！　それ以上言うな・・・・・・ッ！！\nタタル渓谷へ戻ったあいつは本物に決まっているだろう！！　・・・・・・っ、ぐ、うあああっ！！',
                expression: 'pain',
                faceParts: {
                  brow: 'pain',
                  eyes: 'wide',
                  mouth: 'shout',
                  effects: ['pale', 'sweat'],
                },
                secondExpression: 'pain',
                secondFaceParts: {
                  brow: 'pain',
                  eyes: 'close',
                  mouth: 'grit',
                  effects: ['pale', 'sweat', 'noise'],
                },
                voiceEffects: ['shout_glitch', 'tremble_glitch'],
                moodDelta: -2,
                hatredDelta: 1,
                followUpOptions: [
                  {
                    id: 'p2_dilemma_c_step3_blame_asch',
                    thoughtText: '「おまえが生きていると、帰ってきたルークまで偽物になるじゃないか！」',
                    spokenText:
                      'ふざけるなよ・・・・・・！　おまえがここで動いていたら、タタル渓谷へ帰ってきたルークまで偽物になるじゃないか！！\nあいつがやっと帰ってきたのに、なんでおまえなんかが残ってるんだよ・・・・・・っ！！',
                    aschText:
                      '・・・・・・っ、黙れ・・・・・・っ！！　俺だって、頼んでこんな譜業の身体に残ったわけじゃない・・・・・・！！\n俺が邪魔だと言うなら、今ここでおまえの剣で壊せ、ガイ・・・・・・ッ！！',
                    expression: 'pain',
                    faceParts: {
                      brow: 'pain',
                      eyes: 'close',
                      mouth: 'grit',
                      effects: ['pale', 'sweat', 'tears', 'noise'],
                    },
                    secondExpression: 'pain',
                    secondFaceParts: {
                      brow: 'pain',
                      eyes: 'wide',
                      mouth: 'shout',
                      effects: ['pale', 'sweat', 'tears', 'noise'],
                    },
                    voiceEffects: ['shout_glitch', 'tremble_glitch'],
                    moodDelta: -2,
                    guyMoodDelta: -2,
                    hatredDelta: 1,
                    followUpOptions: [
                      {
                        id: 'p2_dilemma_c_step4_mercy_destroy',
                        thoughtText: '「・・・・・・おまえさえ消えれば、ルークは本物のままだ」と剣を抜く',
                        spokenText:
                          '・・・・・・ああ、そうだな。おまえはアッシュじゃない、ディストが造ったただの譜業だ。\nおまえとこの記録さえ無かったことにすれば、帰ってきたルークは『本物のルーク』のままでいられる・・・・・・っ！！',
                        aschText:
                          '・・・・・・っ、ハッ・・・・・・それでいい。最初から、俺など残るべきじゃなかったんだ・・・・・・。\n・・・・・・それで全部、無かったことにしろ、ガイ・・・・・・っ。',
                        expression: 'empty',
                        faceParts: {
                          brow: 'sad',
                          eyes: 'empty',
                          mouth: 'close',
                          effects: ['pale', 'tears'],
                        },
                        secondExpression: 'normal',
                        secondFaceParts: {
                          brow: 'pain',
                          eyes: 'close',
                          mouth: 'close',
                          effects: ['pale', 'tears'],
                        },
                        voiceEffects: ['tremble_glitch'],
                        moodDelta: -5,
                        guyMoodDelta: -5,
                        hatredDelta: 3,
                        grantsLinkTags: ['phase3_triggered', 'tag_hatred_locked'],
                        systemLog:
                          'SYSTEM HALT // CORE UNIT DESTROYED',
                        completesTopic: true,
                        triggersEndingKey: 'END_PHASE3_MERCY_DESTROY',
                      },
                      {
                        id: 'p2_dilemma_c_step4_total_collapse',
                        thoughtText: '「壊せるわけないだろ！ だが誰が本物なのかもう分からない」と立ち尽くす',
                        spokenText:
                          '・・・・・・俺の手でおまえを壊せるわけないだろ・・・・・・！\nだけど、譜業の身体に記憶だけがあるおまえを『アッシュじゃない』としたら、アッシュの身体にルークの記憶だけがあるタタル渓谷のルークも『ルークじゃない』ことになる・・・・・・っ。',
                        aschText:
                          '・・・・・・そうか。\n・・・・・・道理で、目が覚めた時からずっと空っぽなわけだ・・・・・・。',
                        expression: 'look_away',
                        faceParts: {
                          brow: 'sad',
                          eyes: 'close',
                          mouth: 'close',
                          effects: ['pale', 'tears', 'noise'],
                        },
                        secondExpression: 'empty',
                        secondFaceParts: {
                          brow: 'sad',
                          eyes: 'empty',
                          mouth: 'close',
                          effects: ['pale', 'tears', 'noise'],
                        },
                        voiceEffects: ['tremble_glitch'],
                        moodDelta: -5,
                        hatredDelta: 3,
                        grantsLinkTags: [
                          'phase3_triggered',
                          'swampman_paradox_reached',
                          'tag_hatred_locked',
                        ],
                        systemLog:
                          'CRITICAL PARADOX // IDENTITY COLLAPSE DETECTED',
                        completesTopic: true,
                        triggersEnding: 'DESTROY',
                      },
                    ],
                  },
                  {
                    id: 'p2_dilemma_c_step3_question_selfharm',
                    thoughtText: '「・・・・・・答えろよ、アッシュ！」',
                    spokenText:
                      '・・・・・・答えろよ、アッシュ！',
                    aschText:
                      '・・・・・・っ、知らん！！　俺は何も覚えていないと言っているだろうが・・・・・・っ！！\nやめろ、それ以上は・・・・・・っ！！',
                    expression: 'pain',
                    faceParts: {
                      brow: 'pain',
                      eyes: 'wide',
                      mouth: 'shout',
                      effects: ['pale', 'sweat', 'tears', 'noise'],
                    },
                    secondExpression: 'pain',
                    secondFaceParts: {
                      brow: 'pain',
                      eyes: 'close',
                      mouth: 'grit',
                      effects: ['pale', 'sweat', 'tears', 'noise'],
                    },
                    voiceEffects: ['shout_glitch', 'tremble_glitch'],
                    followUpOptions: [
                      {
                        id: 'p2_dilemma_c_step4_push_paradox',
                        thoughtText: '「おまえもルークも、音機関で切り分けた複製じゃないか！」',
                        spokenText:
                          'ごまかすなよ！！　譜業の身体にアッシュの記憶だけがあるおまえがアッシュじゃないなら、アッシュの身体にルークの記憶だけがあるタタル渓谷のルークも、本物のルークじゃないことになるじゃないか！！',
                        aschText:
                          '・・・・・・そうか。\n・・・・・・道理で、目が覚めた時からずっと空っぽなわけだ・・・・・・。',
                        expression: 'look_away',
                        faceParts: {
                          brow: 'sad',
                          eyes: 'close',
                          mouth: 'close',
                          effects: ['pale', 'tears', 'noise'],
                        },
                        secondExpression: 'empty',
                        secondFaceParts: {
                          brow: 'sad',
                          eyes: 'empty',
                          mouth: 'close',
                          effects: ['pale', 'tears', 'noise'],
                        },
                        voiceEffects: ['tremble_glitch'],
                        moodDelta: -5,
                        hatredDelta: 3,
                        grantsLinkTags: [
                          'phase3_triggered',
                          'swampman_paradox_reached',
                          'tag_hatred_locked',
                        ],
                        systemLog:
                          'CRITICAL PARADOX // IDENTITY COLLAPSE DETECTED',
                        completesTopic: true,
                        triggersEnding: 'DESTROY',
                      },
                      {
                        id: 'p2_dilemma_c_step4_bitter_stop',
                        thoughtText: '青褪めるアッシュにハッとし、言葉を呑み込む',
                        spokenText:
                          '・・・・・・っ、くそ・・・・・・。',
                        aschText:
                          '・・・・・・はぁ、はぁ・・・・・・っ。\n・・・・・・しばらく、俺に話しかけるな・・・・・・っ。',
                        expression: 'pain',
                        faceParts: {
                          brow: 'pain',
                          eyes: 'close',
                          mouth: 'grit',
                          effects: ['pale', 'sweat'],
                        },
                        secondExpression: 'glare',
                        secondFaceParts: {
                          brow: 'angry',
                          eyes: 'down',
                          mouth: 'frown',
                          effects: ['pale', 'sweat'],
                        },
                        voiceEffects: ['tremble'],
                        moodDelta: -3,
                        hatredDelta: 1,
                        grantsLinkTags: ['p2_dilemma_resolved', 'p2_dilemma_bitter_scar'],
                        completesTopic: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'p2_dilemma_c_step2_pull_back',
                thoughtText: '拒絶するアッシュを見て我に返り「悪かった」と引き下がる',
                spokenText:
                  '・・・・・・っ、悪かった！！　俺が悪かったから・・・・・・落ち着いてくれ、アッシュ。',
                aschText:
                  '・・・・・・はぁ、はぁ・・・・・・人の頭の中を勝手に暴いておいて、今さら謝って済むと思うな・・・・・・！\n・・・・・・その端末を今すぐ閉じろ・・・・・・っ。',
                expression: 'glare',
                faceParts: {
                  brow: 'pain',
                  eyes: 'glare',
                  mouth: 'grit',
                  effects: ['pale', 'sweat'],
                },
                secondExpression: 'look_away',
                secondFaceParts: {
                  brow: 'angry',
                  eyes: 'away',
                  mouth: 'frown',
                  effects: ['pale', 'sweat'],
                },
                voiceEffects: ['tremble', 'shout'],
                followUpOptions: [
                  {
                    id: 'p2_dilemma_c_step3_promise_silence',
                    thoughtText: '端末を脇へ置いて頷く',
                    spokenText:
                      '・・・・・・ああ、分かった・・・・・・。',
                    aschText:
                      '・・・・・・チッ。しばらくそこで黙っていろ。',
                    expression: 'look_away',
                    faceParts: {
                      brow: 'angry',
                      eyes: 'away',
                      mouth: 'frown',
                      effects: ['sweat'],
                    },
                    moodDelta: -2,
                    grantsLinkTags: ['p2_dilemma_resolved', 'p2_dilemma_bitter_scar'],
                    completesTopic: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ==========================================
  // 【機嫌鎮静・不機嫌エスカレート＆冷たい破壊・放置時の雑談トピック（IMMUTABLE_RULES 1・6準拠）】
  // ==========================================
  {
    id: 'topic_41_apologize',
    thoughtText: '言い過ぎたことを素直に謝って空気を和らげる',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    calmsAnger: true,
    requireLinkTag: 'phase2_started',
    stages: [
      {
        spokenText: '・・・・・・悪かったよ。お互いに少し熱くなりすぎたな、頭を冷やそう。',
        aschText: '・・・・・・ふん。分かればいい。あまりしつこく妙なことを聞くな。',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: [] },
        moodDelta: 3,
        guyMoodDelta: 3,
      },
    ],
  },

  // ガイが不機嫌モード（guyMood < 0）の時に出現する苛立ちの衝突トピック（相手も不機嫌に引きずり込む）
  {
    id: 'p2_irritated_clash',
    thoughtText: '【苛立ち】「さっきからなんだその態度は」と苛立ちをぶつける',
    phase2Tab: '追求',
    contextCategory: 'fight',
    prioritySlot1: true,
    requireLinkTag: 'phase2_started',
    requireGuyAngry: true,
    stages: [
      {
        spokenText:
          '・・・・・・いい加減にしろよ。さっきから何を聞いても突っかかりやがって、人の気も知らないでなんだその態度は。',
        aschText:
          'それはこっちの台詞だ！　勝手に研究室から連れ出しておいて、指図される筋合いはない！！\nそんなに俺の態度が気に入らないなら、今すぐここから出て行ってやる！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush'] },
        secondFaceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: ['sweat'] },
        voiceEffects: ['shout'],
        moodDelta: -4,
        guyMoodDelta: -2,
        hatredDelta: 2,
        grantsLinkTags: ['cold_clash_escalated'],
        systemLog: 'WARNING // HOSTILE ESCALATION DETECTED',
      },
    ],
  },

  {
    id: 'p2_idle_weather',
    thoughtText: '今日のグランコクマの風',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    idleChatter: true,
    requireLinkTag: 'phase2_started',
    stages: [
      {
        spokenText:
          'しかし、今日のグランコクマは風が少し冷たいな。その身体だと寒さとかは感じないのか？',
        aschText:
          '・・・・・・温度センサーくらいついているが、人間みたいに凍えることはない。\nもっとも、冷えすぎると関節の駆動音がうるさくなるから鬱陶しいがな。',
        expression: 'normal',
        faceParts: { brow: 'normal', eyes: 'normal', mouth: 'close', effects: [] },
        secondExpression: 'look_away',
        secondFaceParts: { brow: 'doubt', eyes: 'glare', mouth: 'frown', effects: [] },
        moodDelta: 1,
        trustDelta: 1,
        badMoodResponse: {
          aschText: '・・・・・・別に、寒くはない。',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
          moodDelta: 0,
        },
      },
    ],
  },

  {
    id: 'p2_idle_books',
    thoughtText: '机の上の古い調査資料',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_friends_news'],
    stages: [
      {
        spokenText:
          '机の上が散らかっていて悪いな。最近また古代の音機関の調査を手伝っていて、資料が山積みになってるんだ。',
        aschText:
          '・・・・・・おまえも相変わらずそういう音機関いじりが好きだな。\nディストの研究所にも、似たようなガラクタや通信機が山ほど転がっている。',
        expression: 'normal',
        faceParts: { brow: 'normal', eyes: 'down', mouth: 'close', effects: [] },
        secondExpression: 'look_away',
        secondFaceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
        moodDelta: 1,
        trustDelta: 1,
        grantsLinkTags: ['hint_lab_comms'],
        badMoodResponse: {
          aschText: '・・・・・・ディストの研究所にも似たようなガラクタや通信機が転がっているな。',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
          moodDelta: 0,
        },
      },
    ],
  },

  {
    id: 'p2_idle_chess',
    thoughtText: '棚に置いてあるチェス盤',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_lab_pastime'],
    stages: [
      {
        spokenText:
          '昔、屋敷でよく相手をさせられたよな。ずっと負け通しだったが・・・・・・。',
        aschText:
          '・・・・・・おまえがわざと手を抜いていたことくらい、とっくに気づいているぞ。\n俺は何度も本気で指せと言ったのに。',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush'] },
        secondExpression: 'look_away',
        secondFaceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
        moodDelta: 1,
        trustDelta: 1,
        grantsLinkTags: ['hint_chess_board'],
        badMoodResponse: {
          aschText: '・・・・・・チェスなど、暇つぶしに盤面を並べる程度だ。',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
          moodDelta: 0,
        },
      },
    ],
  },

  {
    id: 'p2_idle_voice_crack',
    thoughtText: 'まだ幼い声',
    phase2Tab: '雑談',
    contextCategory: 'body',
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_voice_discomfort'],
    stages: [
      {
        spokenText:
          'こうして話していると、声の高さまであの頃のままだよな。やっぱり前とは勝手が違うか？',
        aschText:
          '・・・・・・ああ。少し声を荒らげただけで高い音が出るから、鬱陶しくて仕方がない。',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'grit', effects: ['blush', 'sweat'] },
        moodDelta: 0,
        trustDelta: 1,
        grantsLinkTags: ['hint_voice_crack'],
        badMoodResponse: {
          aschText: '・・・・・・少し声を荒らげただけで高い音が出るから、鬱陶しくて仕方がない。',
          expression: 'look_away',
          faceParts: { brow: 'angry', eyes: 'down', mouth: 'frown', effects: [] },
          moodDelta: 0,
        },
      },
    ],
  },

  {
    id: 'p2_awkward_silence',
    thoughtText: 'ふと訪れた沈黙',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    awkwardSilenceTopic: true,
    requireLinkTag: 'phase2_started',
    stages: [
      {
        spokenText:
          '・・・・・・こうしておまえと2人で部屋で向き合っていると、なんだか不思議な気分だな。',
        aschText:
          '・・・・・・妙な感傷に浸るな。俺はただ、おまえが勝手に連れ込んだからここにいるだけだ。',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: ['blush'] },
        moodDelta: 1,
        trustDelta: 1,
        badMoodResponse: {
          aschText: '・・・・・・別に、おまえに腹を立てているわけじゃない。',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
          moodDelta: 0,
        },
      },
    ],
  },
];
