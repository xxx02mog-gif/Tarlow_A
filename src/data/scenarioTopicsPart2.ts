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
          'しかし、なんでまた『タルロウA』なんて名前で譜業のフリをしていたんだ？\nとっさに思いついた嘘にしては妙に具体的だったけど',
        aschText:
          'でまかせじゃない。2ヶ月前にその機体が壊れてこれに移されるまで、\n俺は本当に『タルロウA』という50センチくらいの小型譜業に入っていた。\nおまえやあの眼鏡、皇帝が研究所に来た時にも、何度か顔を合わせている',
        expression: 'normal',
        faceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
        secondFaceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
        trustDelta: 1,
        replyOptions: [
          {
            id: 'p2_tarlow_past_reply_why_silent',
            thoughtText: 'なぜ声をかけなかったのか',
            spokenText:
              'そんな小型譜業に入っていたのか！？\n同じ部屋にいたなら、なんでその時に声をかけてくれなかったんだ！',
            aschText:
              '・・・・・・俺がこんな譜業になって生き永らえているなどと、\n気付かないならそれに越したことはないだろう。\n今はもうこの姿で見つかってしまったから、隠しても仕方がないがな',
            expression: 'look_away',
            faceParts: { brow: 'angry', eyes: 'down', mouth: 'grit', effects: ['sweat'] },
            secondFaceParts: { brow: 'sad', eyes: 'close', mouth: 'frown', effects: [] },
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-03',
            grantsLinkTags: ['talked_tarlow_history'],
          },
          {
            id: 'p2_tarlow_past_reply_surprised',
            thoughtText: 'よく正体がバレなかったな',
            spokenText:
              'まさかそんな小型譜業の中に入っていたとはね・・・・・・。\nあの目ざとい大佐やピオニー陛下にまで会っていて、よく正体がバレなかったもんだ',
            aschText:
              'ただの自律譜業のフリをして、部屋の隅で休止したふりをしていたからな。\nあの皇帝には面白半分に頭を叩かれたが、まさか中身が俺だとは思わなかったんだろう',
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
          '11年前の予備機体ってことは、俺が屋敷にいた頃の背丈そのままなんだな。やっぱり目線が低くて動きづらいか？',
        aschText:
          '身長の話をするな。\n50センチの鉄塊だった頃に比べれば、人間の形になっただけマシだがな',
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
        grantsLinkTags: ['hint_human_limbs', 'talked_old_appearance'],
        replyOptions: [
          {
            id: 'p2_height_reply_nod',
            thoughtText: 'あの頃に戻ったみたいだ',
            spokenText:
              'そうだな。・・・・・・こうして向かい合っていると、本当にあの頃に戻ったみたいだよ',
            aschText:
              '・・・・・・',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'close',
              effects: [],
            },
            moodDelta: 0,
            trustDelta: 2,
            hideWhenBadMoodOrCold: true,
            naturalUnlockSectorId: 'SEC-04',
            grantsLinkTags: ['hint_human_limbs'],
            completesTopic: true,
          },
          {
            id: 'p2_height_reply_provoke',
            thoughtText: 'その身体じゃ剣も振れないんじゃないか？',
            spokenText:
              '・・・・・・だが、その小さな身体じゃ、もう剣もまともに振れないんじゃないか？',
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
            moodDelta: -2,
            grantsLinkTags: ['hint_human_limbs'],
            completesTopic: true,
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
          'そうだ。紅茶でも淹れようか',
        aschText:
          '茶などいらんと言っているだろう。飲めるには飲めるが、この身体には何の意味もない。\n・・・・・・淹れたいなら好きにすればいい',
        expression: 'look_away',
        faceParts: { brow: 'normal', eyes: 'close', mouth: 'close', effects: [] },
        secondFaceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: ['blush'] },
        moodDelta: 2,
        guyMoodDelta: 2,
        trustDelta: 1,
        badMoodResponse: {
          spokenText:
            '・・・・・・その、機嫌直せよ。\n・・・・・・紅茶でも淹れようか。おまえの分も',
          aschText: '・・・・・・淹れてくれるなら、貰っておく',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: [] },
          moodDelta: 2,
          trustDelta: 1,
        },
        grantsLinkTags: ['tea_served'],
        naturalUnlockSectorId: 'SEC-25',
        oralInfo: {
          id: 'oral-tea-and-taste',
          category: '機体ログ',
          title: '味覚受容センサーと気化排熱機構',
          content:
            '口腔内の音素センサーにより味覚データを数値化し、本来の肉体時における嗜好メモリと照合可能。\nただし消化器官系が存在しないため、摂取された水分は内部の気化排熱機構へ送られ、微小蒸気として外部へ排出される構造。\n対象が淹れた茶を摂取した際、嗜好照合結果に基づき「悪くない」という情動波形の微細な好転が記録されている。',
        },
        systemLog: 'GUSTATORY SENSOR LOG // CODE: [MC-TEA_VAPORIZE]',
        replyOptions: [
          {
            id: 'p2_tea_reply_preferences',
            thoughtText: '砂糖は入れないでおく',
            spokenText:
              'ほら、砂糖は入れないでおいたぞ。おまえ、甘い水とタコだけは昔から絶対に口にしなかったからな',
            aschText:
              '余計なことまで覚えているな、おまえは',
            expression: 'normal',
            faceParts: { brow: 'smile', eyes: 'close', mouth: 'close', effects: [] },
            moodDelta: 1,
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-05',
          },
          {
            id: 'p2_tea_reply_quietly_place',
            thoughtText: '静かにカップを置く',
            spokenText:
              'ああ、ここに置いておくよ。おまえの好きにしろ',
            aschText:
              '・・・・・・ふん。\n・・・・・・悪くない茶葉だな。研究所の薬品臭い空気よりはずっとマシだ',
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

  // メイドも～ど限定：エプロンについて【特別会話】
  {
    id: 'p2_maid_apron',
    thoughtText: 'エプロンのこと',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    requireMaidMode: true,
    requireLinkTag: 'phase2_started',
    stages: [
      {
        spokenText:
          'ところで・・・・・・、気になっていたんだが\nなんでエプロンなんか着てるんだ？',
        aschText: '？　何を言ってる',
        expression: 'normal',
        faceParts: {
          brow: 'doubt',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        extraExchanges: [
          {
            speaker: 'GUY',
            text: 'いや、だっておまえ、そんなフリフリのエプロン・・・・・・',
          },
          {
            speaker: 'ASCH',
            text: 'アンドロイドがエプロンを着用するのは当然だろうが。妙なことを言うな！',
            expression: 'glare',
            faceParts: {
              brow: 'angry',
              eyes: 'glare',
              mouth: 'shout',
              effects: [],
            },
          },
          {
            speaker: 'GUY',
            text: '（妙なのはおまえだろ・・・・・・）',
          },
        ],
        oralInfo: {
          id: 'oral-maid-apron-protocol',
          category: '機体仕様',
          title: '補助給仕外装適合プロトコル',
          content:
            '正式名称：自律給仕型家事労働補助プロトコル。\n本機の中枢アセンブリへ組み込まれた生活支援および偽装給仕ルーチン。\n本プロトコルの稼働下においては、「高機能自律譜業における給仕用外装の着用は、稼働効率の最大化および機体規格上、極めて論理的かつ必然的な義務である」という認知補正が中枢論理回路に常時適用される。',
        },
        systemLog: 'PROTOCOL VERIFIED // MAID_MODE',
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
        spokenText: 'そこの剣、やっぱり気になるか？',
        aschText:
          '・・・・・・おまえの手に戻ったんだな。\n・・・・・・元々おまえの家のものだ。あの屋敷に飾っておくより、よほどいい',
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
          '・・・・・・ああ、知らなかった。父上が手放したんだな。\n・・・・・・元々おまえの家のものだ。あるべき場所に戻ったのなら、それでいい',
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
          '・・・・・・できない。ディストが四肢に出力制限をかけてやがる',
        retryAschText:
          '・・・・・・ディストが四肢に出力制限をかけてやがると言っただろう',
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
            thoughtText: '思いきり剣を振れないのはもどかしいだろ',
            spokenText:
              'せっかく人間の形に戻れたのに、思いきり剣を振れないのはもどかしいだろうな',
            aschText:
              '・・・・・・せっかく手足があるのに、強く踏み込むことすらできんからな',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
            moodDelta: 0,
            trustDelta: 2,
            requireLinkTag: 'hint_human_limbs',
            naturalUnlockSectorId: 'SEC-08',
            grantsLinkTags: ['hint_sleep_dreams'],
            completesTopic: true,
          },
          {
            id: 'p2_sword_reply_wrong_giveup',
            thoughtText: '制限がかかっているくらいでちょうどいい',
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
            id: 'p2_sword_reply_back_off',
            thoughtText: 'あまり触れられたくない話だったな',
            spokenText:
              '・・・・・・そうか。あまり触れられたくない話だったな、悪かったよ',
            aschText:
              '・・・・・・別にいい。気にしてない',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'close', mouth: 'close', effects: [] },
            moodDelta: 0,
            trustDelta: 1,
            completesTopic: true,
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
          'ディストの所になんかよくいられるな',
        aschText:
          '機体名にとんでもない名前をつけようとするわ、毎日何時間も自慢話を聞かされるわで、うるさくて仕方がない',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'close', mouth: 'frown', effects: ['sweat'] },
        secondFaceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['sweat'] },
        moodDelta: 1,
        trustDelta: 1,
        grantsLinkTags: ['talked_dist_hideout'],
        badMoodResponse: {
          aschText: '適当にあしらっている。妙な名前を付けられそうになった時は殴り飛ばしてやったが・・・・・・',
          expression: 'look_away',
          faceParts: { brow: 'doubt', eyes: 'away', mouth: 'frown', effects: [] },
          moodDelta: 0,
        },
        replyOptions: [
          {
            id: 'p2_dist_reply_hideout',
            thoughtText: 'あんな研究所に居続けなくてもいいだろ',
            spokenText:
              'はは、ディスト相手に毎日怒鳴り散らしてるおまえの姿が目に浮かぶよ。\nでも、そんなに騒がしいならあんな研究所に居続けなくてもいいだろうに',
            aschText:
              '・・・・・・あそこは人目につかない。身を隠すには都合がいいだけだ',
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
              'あいつ、そういう大仰な名前をつけるのが好きだもんなぁ',
            aschText:
              '笑い事じゃない！　本気で銘板に刻もうとしやがったから、その場でへし折ってやった',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush'] },
            secondExpression: 'look_away',
            secondFaceParts: { brow: 'sad', eyes: 'close', mouth: 'frown', effects: [] },
            moodDelta: 0,
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
          '・・・・・・足音が聞こえたから、いつも通り部屋の隅に退避して・・・・・・っ',
        retryAschText:
          '・・・・・・まだその話をする気か',
        expression: 'look_away',
        faceParts: {
          brow: 'doubt',
          eyes: 'away',
          mouth: 'close',
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
            id: 'p2_why_outside_reply_correct_corner',
            thoughtText: '体を換えたことを忘れてた？',
            spokenText:
              'ああ、その体になってるって忘れてたのか！\n意外と抜けてるよなあ、おまえ',
            aschText:
              '～～っ！！　ぬ、抜けてる・・・だと・・・！？',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: ['blush', 'sweat'] },
            moodDelta: 0,
            trustDelta: 2,
            requireLinkTag: 'talked_dist_hideout',
            naturalUnlockSectorId: 'SEC-10',
            grantsLinkTags: ['talked_why_corner'],
            completesTopic: true,
          },
          {
            id: 'p2_why_outside_reply_wrong_wanted',
            thoughtText: 'わざと残っていたんじゃないのか？',
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
            id: 'p2_why_outside_reply_back_off',
            thoughtText: '退避して？',
            spokenText: '退避して、どうしたんだ？',
            aschText:
              'こんな話をするために連れてきたのか？！　違うだろうが！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush'] },
            voiceEffects: ['shout'],
            moodDelta: 0,
            trustDelta: 1,
            completesTopic: true,
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
          'その着ている服も、昔屋敷にいた頃の服によく似ているな。ディストが用意してくれたのか？',
        aschText:
          '着替えがこれしかなかっただけだ。\nあいつが最初に持ってきた悪趣味な服よりは、まだこれの方がマシだったからな',
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
          aschText: '着替えがこれしかなかっただけだ',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: [] },
          moodDelta: 0,
        },
        replyOptions: [
          {
            id: 'p2_clothes_reply_suits_you',
            thoughtText: '似合ってるじゃないか',
            spokenText:
              '似合ってるじゃないか',
            aschText:
              'まじまじ見るな',
            expression: 'look_away',
            faceParts: { brow: 'doubt', eyes: 'away', mouth: 'frown', effects: ['blush'] },
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
          'ナタリアもバチカルの復興で飛び回っているし、\nピオニー陛下や大佐も相変わらずだ。少しは気になっていたんじゃないか？',
        retrySpokenText:
          'さっきは興味がないって言っていたけど、\n外の連中のこと、本当は少しくらい気にかけているんじゃないのか？',
        aschText:
          '・・・・・・別に',
        retryAschText:
          '外の連中のことなど、俺には関係ないと言っているだろうが',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'frown',
          effects: [],
        },
        capturedProtect: {
          sectorId: 'SEC-07',
          capturedQuote: '「・・・・・・別に。」',
          capturedContext: '仲間たちの近況について話題を振られた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_friends_reply_correct_comms',
            thoughtText: 'みんなの様子を調べていたんじゃないか',
            spokenText:
              'そう言いつつ、研究所にある通信機でみんなの動向くらいは見ていたんじゃないか？',
            aschText:
              '暇つぶしに通信網を覗いていただけだ。元気にやっているなら、それでいい',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: ['blush'] },
            moodDelta: 0,
            trustDelta: 2,
            naturalUnlockSectorId: 'SEC-07',
            grantsLinkTags: ['talked_friends_news'],
            completesTopic: true,
          },
          {
            id: 'p2_friends_reply_tease_angry',
            thoughtText: '本当は寂しいくせに意地を張るなよ',
            spokenText:
              '本当はひとりで研究所にいて寂しいくせに、意地を張るなよ',
            aschText:
              '勝手な決めつけをするな！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush'] },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_friends_reply_back_off',
            thoughtText: '本当に興味ないのか？',
            spokenText:
              '本当に興味ないのか？',
            aschText:
              '・・・・・・しつこいぞ。ないと言ったら、ない',
            expression: 'look_away',
            faceParts: { brow: 'doubt', eyes: 'away', mouth: 'frown', effects: [] },
            moodDelta: 0,
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
    forbidLinkTags: ['terminal_revealed', 'sec19_unlocked', 'asked_about_dp002'],
    relatedTopicIds: ['p2_why_outside', 'p2_dist_complaints'],
    stages: [
      {
        spokenText:
          'なあ、研究室を出るときにディストからこれを渡されたんだが・・・・・・この画面、おまえの記録か？',
        aschText:
          'なっ・・・・・・ディストの奴、\n俺の管理端末までおまえに渡しやがったのか',
        expression: 'shock',
        faceParts: { brow: 'angry', eyes: 'wide', mouth: 'gasp', effects: ['sweat'] },
        secondExpression: 'look_away',
        secondFaceParts: { brow: 'angry', eyes: 'close', mouth: 'frown', effects: ['sweat'] },
        grantsLinkTags: ['terminal_revealed'],
        systemLog: 'TERMINAL REVEALED // TARGET AWARE OF MONITOR DEVICE',
        replyOptions: [
          {
            id: 'p2_show_terminal_reply_lower',
            thoughtText: 'むやみに弄ったりしないでおく',
            spokenText:
              '悪かったよ。むやみに弄ったりしないでおく',
            aschText:
              '・・・・・・当たり前だ',
            expression: 'look_away',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'frown', effects: [] },
            moodDelta: 0,
            trustDelta: 1,
            completesTopic: true,
            hideWhenBadMoodOrCold: true,
          },
          {
            id: 'p2_show_terminal_reply_care',
            thoughtText: '身体に無理が出ていないか気になったんだ',
            spokenText:
              'すまん。ただ、その身体に無理が出ていないか気になったんだ',
            aschText:
              '・・・・・・余計なお世話だ。自分の身体くらい自分で分かる',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'close', mouth: 'frown', effects: [] },
            moodDelta: 0,
            trustDelta: 1,
            completesTopic: true,
            hideWhenBadMoodOrCold: true,
          },
          {
            id: 'p2_show_terminal_reply_provoke',
            thoughtText: '隠してることもこれで丸見えだな',
            spokenText:
              'へえ、これが管理端末なのか。つまりおまえが隠してることも、これを見れば全部丸見えってわけだ',
            aschText:
              '趣味の悪い真似をするな！！　人の頭の中を勝手に覗き見て楽しいのか、おまえは・・・・・・ッ！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush', 'sweat'] },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
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
          '・・・・・・ただの放熱だ',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush'] },
        moodDelta: 0,
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
          'ディストの奴、最初におまえの語尾を『〜ズラ』に設定しようとして、設定端末ごと叩き割られたんだってな',
        aschText:
          '・・・・・・思い出すだけで腹が立つ。\n次に同じ真似をしたら、端末だけでは済まさんからな・・・・・・！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'glare', mouth: 'frown', effects: [] },
        secondFaceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: ['shadow'] },
        moodDelta: 0,
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
        moodDelta: 0,
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
          'その身体、栄養にはならなくても食事はできる仕様なんだって？　今度、好物のチキンでも用意しようか？',
        aschText:
          '・・・・・・余計な気を使うな。腹も減らない身体で食ったところで、虚しくなるだけだろうが',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
        moodDelta: 0,
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
          '研究所の通信機で、1年前にルークがタタル渓谷へ戻った時の記録を何度も開いていたみたいだな',
        aschText:
          '・・・・・・あいつが本当に戻ったのか、確かめただけだ',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'away', mouth: 'frown', effects: [] },
        secondFaceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: ['shadow'] },
        moodDelta: 0,
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
          '空き部屋で剣の素振りをしようとして、出力制限で転んで壁を蹴飛ばしたそうじゃないか',
        aschText:
          '・・・・・・この身体がどれくらい動くか、試していただけだ',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'away', mouth: 'frown', effects: ['blush'] },
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec09_rejected_names',
    thoughtText: '【EM-005】機体名のボツ案リスト',
    phase2Tab: '端末',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-09',
    stages: [
      {
        spokenText:
          '端末に、ディストが登録しようとした機体名のボツ案リストが残ってるぞ。えーと、どれどれ・・・・・・',
        aschText:
          'よ、読み上げるんじゃねぇ！\nどれもこれも正気を疑うような名前ばかり並べやがって・・・・・・！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush', 'sweat'] },
        secondExpression: 'look_away',
        secondFaceParts: { brow: 'pain', eyes: 'close', mouth: 'frown', effects: ['sweat'] },
        moodDelta: 0,
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
          'なになに・・・・・・？\n部屋の隅に立ったあと、今の身体じゃ丸見えだって気づいて、慌てて隠れ場所を探しかけた・・・・・・',
        aschText:
          'う、うるさい！',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'shout', effects: ['blush', 'sweat'] },
        moodDelta: 0,
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
          '今の身体に替わった時、一番上の襟ボタンを留めるのに3分も格闘していたらしいじゃないか',
        aschText:
          '・・・・・・指先が小さくなって、勝手が違っただけだ',
        expression: 'look_away',
        faceParts: { brow: 'doubt', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
        moodDelta: 0,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec13_chess_cheat',
    thoughtText: '【EM-008】1人チェスの記録',
    phase2Tab: '端末',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-13',
    stages: [
      {
        spokenText:
          '一人でチェスをしていた時、自分側の黒番が負けそうになってこっそり駒を1つ戻したそうじゃないか',
        aschText:
          'ち、違う！　あれは一手前の盤面を検証し直していただけだ！',
        expression: 'shock',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'open', effects: ['blush', 'sweat'] },
        moodDelta: 0,
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
          '今の身体に替わった直後、怒鳴ろうとして声が裏返ったのが悔しくて、2日間ずっと筆談で通したんだってな',
        aschText:
          '声に慣れるまで喋りたくなかっただけだ！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'grit', effects: ['blush', 'sweat'] },
        moodDelta: 0,
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
          '公爵様や奥様の話をした時の波形、怒りや反発は少しも出ていなかったぞ。本当は奥様たちのこと、今でも心配なんだろ',
        aschText:
          '・・・・・・人の感情波形までいちいち読み上げるな',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: [] },
        secondFaceParts: { brow: 'sad', eyes: 'close', mouth: 'close', effects: [] },
        moodDelta: 0,
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
          'ずっと手を気にしてるな',
        aschText:
          '・・・・・・癖が、抜けないだけだ',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'close', mouth: 'frown', effects: [] },
        secondFaceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
        moodDelta: 0,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec17_jade_smile',
    thoughtText: '【EM-010】大佐の様子',
    phase2Tab: '端末',
    contextCategory: 'friends',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-17',
    stages: [
      {
        spokenText:
          '3ヶ月前に大佐が研究所へ来た時、おまえを無言でじっと見ていったんだってな',
        aschText:
          '・・・・・・知るか。だから余計に気味が悪いんだろうが・・・・・・',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'grit', effects: ['sweat'] },
        moodDelta: 0,
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
          '・・・・・・なあ。どうしてバチカルへ帰らないんだ？',
        retrySpokenText:
          '・・・・・・さっきは引いたけど、これだけは聞かせてくれ。どうして誰にも会わずに研究所に身を隠しているんだ？',
        aschText:
          '・・・・・・帰る場所などない。俺は3年前のエルドラントで、確かに死んだはずなんだ',
        retryAschText:
          '・・・・・・またその話か。帰る場所などないと言ったはずだ',
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
          capturedContext: 'なぜバチカルへ帰らないのか尋ねた際の発言',
        },
        grantsLinkTags: ['sec12_discovered'],
        systemLog:
          'PROTECT TRIGGERED // SECTOR LOCKED: [EM-007 / SEC-12]',
        replyOptions: [
          {
            id: 'p2_why_hide_reply_step_in',
            thoughtText: '自分が何者か分からないからか？',
            spokenText:
              '・・・・・・自分が何なのかわからない、ってことか？',
            aschText:
              '・・・・・・。\n記憶から演算されているだけの譜業なのか、俺自身なのか・・・・・・\nそんなこともわからねえままで、誰の前にでれるっていうんだ',
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
            moodDelta: 0,
            trustDelta: 2,
            naturalUnlockSectorId: 'SEC-12',
            grantsLinkTags: ['p2_heard_true_reason'],
            systemLog:
              'DIALOGUE UNLOCK // SECTOR: [EM-007 / SEC-12]（核心対話完了：いつでも話を切り上げて結末へ進めます）',
            completesTopic: true,
          },
          {
            id: 'p2_why_hide_reply_wrong_childish',
            thoughtText: '子ども扱いされるのが嫌なのか？',
            spokenText:
              'その小さな姿を見られて、みんなに子ども扱いされるのが嫌なのか？',
            aschText:
              'くだらない見栄だけで隠れてるわけがないだろうが！',
            expression: 'glare',
            faceParts: {
              brow: 'angry',
              eyes: 'glare',
              mouth: 'shout',
              effects: [],
            },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_why_hide_reply_back_off',
            thoughtText: '無理には聞かないよ',
            spokenText:
              '・・・・・・そうか。おまえがそこまで言いたくないなら、無理には聞かないでおくよ',
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
          '・・・・・・俺が選んだわけじゃない。\n昔、万が一レプリカの生成が滞った時の『場繋ぎ』として造られていた予備の機体だ。\nディストの研究所に転がっていたのが、これしかなかっただけだ',
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
            thoughtText: '場繋ぎの予備か・・・・・・皮肉だな',
            spokenText:
              '場繋ぎの予備、か・・・・・・おまえにとっては皮肉なもんだな',
            aschText:
              '・・・・・・まったくだ。本物の俺が、自分の『予備』の中に入っているんだからな',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'wide',
              mouth: 'smile',
              effects: [],
            },
            trustDelta: 1,
            grantsLinkTags: ['hint_human_limbs', 'hint_10yo_body'],
            completesTopic: true,
          },
          {
            id: 'p2_why_10yo_reply_better_than_tarlow',
            thoughtText: '11年前の予備機体か',
            spokenText:
              '11年前の予備機体・・・・・・ね',
            aschText:
              '・・・・・・まともに握れやしねえが、手足があるだけあの鉄くずよりはマシだ',
            expression: 'normal',
            faceParts: {
              brow: 'normal',
              eyes: 'down',
              mouth: 'close',
              effects: [],
            },
            moodDelta: 0,
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
          '・・・・・・ない。音機関の出力を落として休止状態に入るだけだ。\n目を閉じて、次に開けた時にはただ時間が飛んでいる。夢なんてものは一度も見ない',
        expression: 'normal',
        faceParts: {
          brow: 'doubt',
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
            '本機に睡眠機能および夢の再生機能は未実装。\n待機時は第七音素の循環出力を30%まで低下させた休止モードへ移行する',
        },
        systemLog:
          'SPEC RECORDED // CODE: [MC-SLEEP_MODE]',
        replyOptions: [
          {
            id: 'p2_sleep_reply_wake_feeling',
            thoughtText: '目が覚めた時、変な感じはしないか？',
            spokenText:
              'そうか・・・・・・。目が覚めた時、変な感じがしないか？',
            aschText:
              '意識が戻るたびに、体の奥から音機関が回る音がしやがる。\nいつまで経っても、慣れないもんだな',
            expression: 'look_away',
            faceParts: {
              brow: 'pain',
              eyes: 'close',
              mouth: 'grit',
              effects: ['pale'],
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
          'あんな場所、好き好んで居るわけじゃない',
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
            thoughtText: '他に身を寄せる当てでもあるのか？',
            spokenText:
              'じゃあ、どこか他に身を寄せる当てでもあるのか？',
            aschText:
              '・・・・・・ない。\nこんな身体で、どこへ行けと言うんだ',
            expression: 'look_away',
            faceParts: {
              brow: 'pain',
              eyes: 'close',
              mouth: 'frown',
              effects: ['shadow'],
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
          '・・・・・・その10歳の姿を目の前にしていると、どうしてもファブレの屋敷にいた頃を思い出すよ',
        aschText:
          '・・・・・・ふん。俺がヴァンに攫われる前のことか',
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
            thoughtText: 'あの頃の俺はずっと復讐の機会を窺っていた',
            spokenText:
              'ああ。あの頃の俺は、おまえたちファブレ一族を恨んで、\n隙あらば復讐しようとずっと機会を窺っていた。\n・・・・・・まさか何年も経って、あの時と同じ姿のおまえと向き合うことになるとはね',
            aschText:
              'おまえは・・・・・・\n・・・・・・いや、いい',
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
            moodDelta: 0,
            trustDelta: 2,
            grantsLinkTags: ['hint_manor_parents'],
            oralInfo: {
              id: 'oral-manor-unsaid-words',
              category: '情動反応',
              title: '屋敷時代の話題における発声中断と未出力テキスト',
              content:
                '屋敷時代の因縁に関する対話中、「おまえは・・・・・・」の後続として言語野で『今でも俺が憎いんだろう』という音声バッファが形成されたが、声帯ユニットへの出力直前に破棄され、「・・・・・・いや、いい」へ差し替えられた履歴',
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
          '・・・・・・別に、何もしていない',
        retryAschText:
          '・・・・・・研究所で何をしていようが俺の勝手だろうが',
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
            thoughtText: 'チェスでも差して時間を潰さないのか？',
            spokenText:
              'チェスでも差して時間を潰したりはしないのか？',
            aschText:
              '・・・・・・たまに盤面を並べるくらいだ。相手になる奴がいないからな',
            expression: 'look_away',
            faceParts: { brow: 'smile', eyes: 'down', mouth: 'close', effects: [] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'hint_chess_board',
            naturalUnlockSectorId: 'SEC-13',
            completesTopic: true,
          },
          {
            id: 'p2_pastime_reply_wrong_stare_wall',
            thoughtText: 'ずっと壁でも眺めているのか？',
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
            thoughtText: '深く聞くつもりはなかったんだ',
            spokenText:
              '・・・・・・そうか。深く聞くつもりはなかったんだ',
            aschText:
              '・・・・・・別にいい。気にしてない',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
            moodDelta: 0,
            trustDelta: 1,
            completesTopic: true,
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
          '・・・・・・しかし、声まで子供のままだと、怒鳴られてもなんだか調子が狂うよ',
        retrySpokenText:
          'さっきは悪かったけど・・・・・・やっぱり前とは勝手が違って喋りづらかったりするのか？',
        aschText:
          '俺だって好きでこんな声を出しているわけじゃない',
        retryAschText:
          '・・・・・・まだ声の話をする気か',
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
            thoughtText: '11年前の機体だったか？　すごい技術だよな',
            spokenText:
              '11年前の機体だったか？　すごい技術だよな',
            aschText:
              'ああ・・・・・・。ヴァンが贔屓にしていた理由も、少しだけわかる気がする',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
            moodDelta: 0,
            trustDelta: 2,
            requireLinkTag: 'hint_voice_crack',
            naturalUnlockSectorId: 'SEC-14',
            completesTopic: true,
          },
          {
            id: 'p2_voice_reply_wrong_cute',
            thoughtText: 'その高い声で必死に凄まれてもな',
            spokenText:
              'その高い声で必死に凄まれてもなあ',
            aschText:
              'ぐっ・・・・・・！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: ['blush', 'sweat'] },
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_voice_reply_back_off',
            thoughtText: 'からかうつもりはなかったんだ',
            spokenText:
              '・・・・・・悪かったよ。からかうつもりはなかったんだ',
            aschText:
              '・・・・・・分かればいい。二度とその話題を出すな',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
            moodDelta: 0,
            trustDelta: 1,
            completesTopic: true,
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
          '・・・・・・今さら父上や母上の話などしてどうなる。あの屋敷にはもう、ちゃんと息子が戻っているんだろうが',
        retryAschText:
          '・・・・・・父上や母上の話はするなと言ったはずだ',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
        capturedProtect: {
          sectorId: 'SEC-15',
          capturedQuote:
            '「・・・・・・今さら父上や母上の話などしてどうなる。あの屋敷にはもう、ちゃんと息子が戻っているんだろうが。」',
          capturedContext: 'ファブレ公爵夫妻（父上・母上）への思いについて尋ねた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_parents_reply_correct_confusion',
            thoughtText: 'また奥様を泣かせてしまうと思っているのか？',
            spokenText:
              '・・・・・・おまえが顔を出したら、また奥様を泣かせてしまうと思っているのか？',
            aschText:
              '・・・・・・一度死んだ人間が、こんな譜業の姿で母上の前に出てみろ。混乱させるだけだ',
            expression: 'look_away',
            faceParts: { brow: 'pain', eyes: 'down', mouth: 'frown', effects: ['shadow'] },
            moodDelta: 0,
            trustDelta: 2,
            requireLinkTag: 'hint_manor_parents',
            naturalUnlockSectorId: 'SEC-15',
            grantsLinkTags: ['talked_parents_thought'],
            completesTopic: true,
          },
          {
            id: 'p2_parents_reply_wrong_grudge',
            thoughtText: '自分の居場所をルークに奪われた恨みか？',
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
            id: 'p2_parents_reply_back_off',
            thoughtText: '・・・・・・そうだな',
            spokenText:
              '・・・・・・そうだな',
            aschText:
              '・・・・・・ああ。余計な気遣いは無用だ',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
            moodDelta: 0,
            trustDelta: 1,
            completesTopic: true,
          },
        ],
      },
    ],
  },

  // ロック会話⑩（SEC-16）：剣ダコも傷跡もない人工皮膚の手（眠り・休止の話がヒント）
  {
    id: 'p2_unscarred_hands',
    thoughtText: '傷のない体',
    phase2Tab: '追求',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_tarlow_history',
    stages: [
      {
        retryThoughtText: '自分の掌のこと（もう一度聞く）',
        spokenText:
          '・・・・・・その身体には、傷跡ひとつないんだな',
        retrySpokenText:
          'さっきの掌の話だけど・・・・・・やっぱり、剣ダコや傷跡がなくなっているのは気になるのか？',
        aschText:
          '・・・・・・当たり前だ。11年前に造られた予備機体だからな',
        retryAschText:
          '・・・・・・まだ俺の手を見ているのか。趣味が悪い奴だな',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
        capturedProtect: {
          sectorId: 'SEC-16',
          capturedQuote:
            '「・・・・・・当たり前だ。11年前に造られた予備機体だからな。」',
          capturedContext: '掌や腕に剣ダコや傷跡がないことについて触れた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_hands_reply_correct_doll',
            thoughtText: '自分の手を見て落ち着かないんじゃないか？',
            spokenText:
              '・・・・・・ふと自分の手を見た時、前の身体と違いすぎて落ち着かないんじゃないか？',
            aschText:
              '・・・・・・ああ。まるで作り物の人形の手だ',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
            moodDelta: 0,
            trustDelta: 2,
            requireLinkTag: 'hint_sleep_dreams',
            naturalUnlockSectorId: 'SEC-16',
            completesTopic: true,
          },
          {
            id: 'p2_hands_reply_wrong_no_pain',
            thoughtText: '譜業の身体なら怪我もしないし便利だな',
            spokenText:
              '譜業の身体なら、もう怪我もしないし便利だよな',
            aschText:
              '・・・・・・斬られても血も出ない身体の、どこがいいと言うんだ',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'frown', effects: [] },
            moodDelta: -2,
            oralInfo: {
              id: 'oral-hands-feeling-bloodless',
              category: '機体ログ',
              title: '痛覚オミットと生体模倣の限界',
              content:
                '本機は痛覚受容回路が遮断されており外傷による機能低下は生じないが、本機自身は「出血しないこと」に強い疎外感を抱いており、自己同一性を損なう主要因となっていることが判明。',
            },
            systemLog: 'PAIN SENSOR STATUS // CODE: [MC-NO_PAIN_OMIT]',
            naturalUnlockSectorId: 'SEC-24',
            completesTopic: true,
          },
          {
            id: 'p2_hands_reply_back_off',
            thoughtText: 'そりゃそうだよな',
            spokenText:
              '悪い、そりゃそうだよな',
            aschText:
              '・・・・・・別にいい。気にしてない',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
            moodDelta: 0,
            trustDelta: 1,
            completesTopic: true,
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
          '研究所には大佐もよく出入りしていただろ。よく今まで気づかれずにいられたな',
        retrySpokenText:
          'さっきの大佐の話だけど・・・・・・やっぱりおまえ、大佐に正体を勘づかれるのを一番警戒していたんじゃないのか？',
        aschText:
          '・・・・・・あの眼鏡の話をするな。あいつが来た時は、ただの譜業のフリをしてやり過ごしていた',
        retryAschText:
          '・・・・・・あの死霊使いには気づかれていないと言っているだろうが',
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
            thoughtText: '大佐に勘付かれたくなかったのか？',
            spokenText:
              '・・・・・・研究所で俺たちに声をかけなかったのも、\n大佐に勘付かれたくなかったからか？',
            aschText:
              '・・・・・・あの死霊使いに知られてみろ、どんな実験材料にされるか分かったものじゃない',
            expression: 'look_away',
            faceParts: { brow: 'angry', eyes: 'away', mouth: 'grit', effects: ['sweat'] },
            moodDelta: 0,
            trustDelta: 2,
            requireLinkTag: 'talked_tarlow_history',
            naturalUnlockSectorId: 'SEC-17',
            completesTopic: true,
          },
          {
            id: 'p2_jade_reply_wrong_call_jade',
            thoughtText: 'いっそ大佐を呼んで診てもらおうか？',
            spokenText:
              'いっそ大佐を呼んで、その身体を診てもらおうか？',
            aschText:
              'やめろ！　あいつを呼ぶなら、俺は今すぐここから出て行く！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['sweat'] },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_jade_reply_back_off',
            thoughtText: '大佐の話はやめておこうか',
            spokenText:
              '・・・・・・大佐の話はやめておこうか。名前を聞くだけでも具合が悪くなる',
            aschText:
              '・・・・・・ああ、そうしてくれ。思い出すだけでも鳥肌が立つ',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
            moodDelta: 0,
            trustDelta: 1,
            completesTopic: true,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 【裏の秘密への段階的導入①：エルドラントの最期と空白の2年間（ロック会話⑤：DP-001自動解凍／問うとSEC-19浮上）】
  // ==========================================
  {
    id: 'p2_eldrant_and_blank',
    thoughtText: 'エルドラントの後のこと',
    phase2Tab: '追求',
    contextCategory: 'past',
    sensitiveToBadMood: true,
    stages: [
      {
        retryThoughtText: 'エルドラントの後のこと（もう一度聞く）',
        spokenText:
          '・・・・・・3年前のエルドラントで、おまえは確かに死んだはずだったよな。あのあと何が起きたか覚えているか？',
        retrySpokenText:
          '・・・・・・さっき言っていた、エルドラントから1年前までの『空白の2年間』のことだけど、どうしても引っかかるんだ',
        aschText:
          '・・・・・・崩れるエルドラントで、ルークが俺を抱えていたところまでは覚えている。\n・・・・・・だが、1年前に目覚める前までのことは何も・・・・・・',
        retryAschText:
          '・・・・・・蒸し返すなと言っただろう。1年前に目覚める前までのことは、何も出てこないんだ',
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
            thoughtText: 'ロックをかけられている？',
            spokenText:
              'エルドラントから1年前まで・・・・・・その2年間だけ抜けているのは、\nディストにロックをかけられているんじゃないか？',
            aschText:
              '・・・・・・っ、くそ、頭が・・・・・・っ。\nあいつが俺の記憶をどう弄ったかなど知るか・・・・・・っ',
            expression: 'pain',
            faceParts: {
              brow: 'pain',
              eyes: 'pain',
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
            id: 'p2_eldrant_reply_wrong_hiding',
            thoughtText: '言いたくなくて隠しているだけじゃないのか？',
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
            resetsTopicProgress: true,
          },
          {
            id: 'p2_eldrant_reply_back_off',
            thoughtText: '思い出させようとして悪かった',
            spokenText:
              '・・・・・・そうか。思い出させようとして悪かったよ',
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
  // 【裏の秘密への段階的導入②：空白の2年間の記憶分離について問う（ロック会話⑤後：SEC-19強制解除で出現 → アッシュの拒絶反応）】
  // ==========================================
  {
    id: 'p2_ask_about_dp002',
    thoughtText: '空白の2年間の記録について',
    phase2Tab: '追求',
    contextCategory: 'past',
    sensitiveToBadMood: true,
    prioritySlot1: true,
    requireLinkTag: 'sec19_unlocked',
    forbidLinkTags: ['asked_about_dp002'],
    stages: [
      {
        retryThoughtText: '空白の2年間の記録について（もう一度聞く）',
        spokenText:
          '・・・・・・さっき端末で、ディストの実験記録を見た。\n気になるところがあったんだ。おまえの生体データに関する記述で・・・・・・',
        retrySpokenText:
          '・・・・・・なあ、アッシュ。さっきの記録のことなんだが・・・・・・\n本当に何も心当たりはないのか？　あいつが何かおかしな処置をしたんじゃないのか？',
        aschText:
          '・・・・・・っ！？　な、何の話をしている・・・・・・！\nディストの戯言など真に受けてどうする！　それ以上、変なことを聞くな・・・・・・！',
        retryAschText:
          '・・・・・・おい、いい加減にしろ！　知らんと言っているだろうが・・・・・・っ！',
        expression: 'shock',
        faceParts: {
          brow: 'doubt',
          eyes: 'wide',
          mouth: 'open',
          effects: ['sweat'],
        },
        secondExpression: 'pain',
        secondFaceParts: {
          brow: 'pain',
          eyes: 'pain',
          mouth: 'grit',
          effects: ['pale', 'sweat', 'noise'],
        },
        voiceEffects: ['tremble_glitch', 'normal'],
        replyOptions: [
          {
            id: 'p2_dp002_reply_why_hide',
            thoughtText: 'おまえ、本当に覚えていないのか？',
            spokenText:
              '・・・・・・なあ、おまえ、本当に何も覚えていないのか？\nエルドラントのあと・・・・・・ディストのところへ行くまでのこと',
            aschText:
              '・・・・・・知るかそんなもの・・・・・・ッ！！\n・・・・・・何なんだよ、おまえは・・・・・・！\n・・・・・・俺を疑って、何を探ろうとしているんだ・・・・・・っ！',
            expression: 'glare',
            faceParts: {
              brow: 'pain',
              eyes: 'glare',
              mouth: 'shout',
              effects: ['pale', 'sweat'],
            },
            secondExpression: 'look_away',
            secondFaceParts: {
              brow: 'sad',
              eyes: 'away',
              mouth: 'grit',
              effects: ['sweat'],
            },
            voiceEffects: ['shout_glitch', 'tremble'],
            extraExchanges: [
              {
                speaker: 'ASCH',
                text: '・・・・・・っ、ハァ・・・・・・ハァ・・・・・・っ！\nもういい、喋るな・・・・・・！　これ以上、過去の話をする気はない・・・・・・っ！',
                expression: 'pain',
                faceParts: {
                  brow: 'pain',
                  eyes: 'away',
                  mouth: 'grit',
                  effects: ['pale', 'sweat', 'noise'],
                },
                voiceEffect: 'tremble_glitch',
                waitMs: 2500,
              },
            ],
            grantsLinkTags: ['asked_about_dp002'],
            oralInfo: {
              id: 'oral-dp002-memory-defense',
              category: '情動反応',
              title: '記憶防衛プロテクト強制励起の形跡',
              content:
                '空白の2年間に言及された際、言語野の音声出力がグリッチ状に乱壊。\n激しい拒絶反応とともに、中枢コアの自壊を防ぐための緊急メモリ封鎖が作動した。',
            },
            systemLog: 'PROTECT RESISTANCE DETECTED // CODE: [EM-MEMORY_DEFENSE]',
            naturalUnlockSectorId: 'SEC-26',
            completesTopic: true,
          },
          {
            id: 'p2_dp002_reply_back_off',
            thoughtText: 'すまない、俺の気のせいかもしれない',
            spokenText:
              '・・・・・・すまない。俺の気のせいかもしれない。少し動転してたみたいだ',
            aschText:
              '・・・・・・っ。　へ、平気だ・・・・・・',
            expression: 'look_away',
            faceParts: {
              brow: 'doubt',
              eyes: 'away',
              mouth: 'frown',
              effects: [],
            },
            resetsTopicProgress: true,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 【DP-002後の心理・状況追求①：すまない、追い詰めるようなことを言って（謝罪・寄り添い）】
  // ==========================================
  {
    id: 'p2_dp002_apologize',
    thoughtText: 'すまない、追い詰めるようなことを言って',
    phase2Tab: '追求',
    contextCategory: 'core',
    requireLinkTag: 'asked_about_dp002',
    forbidLinkTags: ['talked_tarlow_broken', 'climax_ready'],
    stages: [
      {
        spokenText:
          'おまえを追い詰めるような聞き方をして悪かった。取り乱させるつもりはなかったんだ',
        aschText:
          '・・・・・・っ、ハァ・・・・・・ハァ・・・・・・。\n謝るくらいなら・・・・・・最初から余計なことを聞くな・・・・・・っ',
        expression: 'pain',
        faceParts: {
          brow: 'pain',
          eyes: 'away',
          mouth: 'grit',
          effects: ['sweat'],
        },
        secondExpression: 'look_away',
        secondFaceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'close',
          effects: [],
        },
        moodDelta: 1,
      },
    ],
  },

  // ==========================================
  // 【DP-002後の心理・状況追求②：頭痛は大丈夫か？（発作の心配）】
  // ==========================================
  {
    id: 'p2_dp002_headache_worry',
    thoughtText: '頭痛は大丈夫か？',
    phase2Tab: '追求',
    contextCategory: 'body',
    requireLinkTag: 'asked_about_dp002',
    forbidLinkTags: ['talked_tarlow_broken', 'climax_ready'],
    stages: [
      {
        spokenText:
          '・・・・・・おい、頭痛は大丈夫か？　さっきから息が荒いぞ',
        aschText:
          '・・・・・・触るな！　別にどうということもない・・・・・・っ。\n・・・・・・ただ、頭の中がやけに騒がしいだけだ・・・・・・',
        expression: 'pain',
        faceParts: {
          brow: 'pain',
          eyes: 'close',
          mouth: 'grit',
          effects: ['pale', 'sweat', 'noise'],
        },
        secondExpression: 'glare',
        secondFaceParts: {
          brow: 'doubt',
          eyes: 'glare',
          mouth: 'frown',
          effects: ['sweat'],
        },
        voiceEffects: ['tremble_glitch', 'normal'],
      },
    ],
  },

  // ==========================================
  // 【DP-002後の心理・状況追求③：ディストはおまえに何を話したんだ？（状況確認）】
  // ==========================================
  {
    id: 'p2_dp002_dist_inquiry',
    thoughtText: 'ディストはおまえに何を話したんだ？',
    phase2Tab: '追求',
    contextCategory: 'core',
    requireLinkTag: 'asked_about_dp002',
    forbidLinkTags: ['talked_tarlow_broken', 'climax_ready'],
    stages: [
      {
        spokenText:
          '・・・・・・なあ、アッシュ。ディストはおまえに、どこまで話したんだ？　この身体で目覚めさせた時に',
        aschText:
          'ただ「前の機体が壊れたから予備に移し替えた」とだけ言われた。\n・・・・・・あいつの戯言など、最初から真に受けていない',
        expression: 'look_away',
        faceParts: {
          brow: 'doubt',
          eyes: 'away',
          mouth: 'frown',
          effects: [],
        },
        secondExpression: 'glare',
        secondFaceParts: {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'close',
          effects: [],
        },
      },
    ],
  },

  // ==========================================
  // 【裏の秘密への段階的導入③：2ヶ月前にタルロウAが壊れた理由（ロック会話⑥：DP-002対話完了で出現 → SEC-20浮上）】
  // ==========================================
  {
    id: 'p2_tarlow_broken_reason',
    thoughtText: 'なぜ前の機体が壊れたのか',
    phase2Tab: '追求',
    contextCategory: 'core',
    sensitiveToBadMood: true,
    requireLinkTag: 'asked_about_dp002',
    stages: [
      {
        retryThoughtText: '前の機体が壊れた理由（もう一度聞く）',
        spokenText:
          '・・・・・・なあ、何でタルロウAは壊れたんだ？　ずっと研究所の中にいたんだろ？',
        retrySpokenText:
          '・・・・・・やっぱり引っかかるんだ。ディストの記録といい、2ヶ月前にタルロウAが壊れた時、本当は何があったんだ？',
        aschText:
          '・・・・・・知らん。なぜ壊れたのかは覚えていない。気づいた時には、もうこの身体に移されていた',
        retryAschText:
          '・・・・・・しつこい奴だな。なぜ壊れたかは覚えていないと言っているだろうが',
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
            thoughtText: '何かを知って無茶をしたせいじゃないのか？',
            spokenText:
              '・・・・・・ただの故障なんかじゃないだろ。\nおまえ自身が何かを知って、自分で無茶をしたせいじゃないのか？',
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
              effects: ['pale', 'sweat', 'noise', 'tears'],
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
            completesTopic: true,
          },
          {
            id: 'p2_broken_reply_wrong_sword',
            thoughtText: '無理に剣でも振ろうとしたのか？',
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
            resetsTopicProgress: true,
          },
          {
            id: 'p2_broken_reply_back_off',
            thoughtText: '無理には聞かないが・・・・・・',
            spokenText:
              '・・・・・・そうか。思い出せないなら、無理には聞かないが・・・・・・',
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
  // 【発作直後の介抱・息を整える対話：おい、しっかりしろ！】
  // ==========================================
  {
    id: 'p2_soothe_after_broken',
    thoughtText: 'おい、しっかりしろ！',
    phase2Tab: '追求',
    contextCategory: 'body',
    prioritySlot1: true,
    requireLinkTag: 'talked_tarlow_broken',
    forbidLinkTags: ['soothed_after_broken'],
    stages: [
      {
        spokenText:
          'おい、しっかりしろ！\n・・・・・・悪かった、無理に思い出させようとして',
        aschText:
          '・・・・・・っ、ハァ・・・・・・触るな・・・・・・っ！\n一時的な、ノイズだ・・・・・・',
        expression: 'pain',
        faceParts: {
          brow: 'pain',
          eyes: 'close',
          mouth: 'grit',
          effects: ['sweat', 'noise'],
        },
        secondExpression: 'pain',
        secondFaceParts: {
          brow: 'pain',
          eyes: 'away',
          mouth: 'grit',
          effects: ['sweat'],
        },
        voiceEffects: ['tremble_glitch', 'tremble'],
        extraExchanges: [
          {
            speaker: 'GUY',
            text: '少し座れ。・・・・・・息を整えろよ',
            waitMs: 1600,
          },
          {
            speaker: 'ASCH',
            text: '・・・・・・ふぅ、・・・・・・っ。\n・・・・・・騒ぐな。もう、治まった・・・・・・',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'close',
              effects: ['sweat'],
            },
            voiceEffect: 'tremble',
            waitMs: 2000,
          },
        ],
        grantsLinkTags: ['soothed_after_broken'],
      },
    ],
  },

  // ==========================================
  // 【発作・介抱後の端末確認誘導：端末に何か新しい記録が届いているようだ】
  // ==========================================
  {
    id: 'p2_examine_terminal_clue',
    thoughtText: '（端末の新しい記録を確認する）',
    phase2Tab: '端末',
    contextCategory: 'core',
    prioritySlot1: true,
    requireLinkTag: 'soothed_after_broken',
    forbidLinkTags: ['sec20_unlocked', 'climax_ready'],
    stages: [
      {
        spokenText:
          '・・・・・・なあ、アッシュ。さっきから端末のランプが点滅してるんだが',
        aschText:
          '・・・・・・好きに見ろ。俺の知ったことじゃない',
        expression: 'look_away',
        faceParts: {
          brow: 'normal',
          eyes: 'away',
          mouth: 'close',
          effects: [],
        },
        voiceEffects: ['normal'],
      },
    ],
  },

  // ==========================================
  // 【裏の秘密・クライマックス対話A（DP-002 解放時）：秘密を問い詰めないルート ➔ END 08 / END 09】
  // ==========================================
  {
    id: 'p2_deep_truth_dilemma',
    thoughtText: '部屋を出ていこうとするアッシュを引き止める',
    phase2Tab: '追求',
    contextCategory: 'core',
    prioritySlot1: true,
    requireLinkTag: 'never_show_in_topic_list',
    forbidLinkTags: ['sec19_unlocked', 'phase2_started'],
    stages: [
      {
        spokenText: '・・・・・・',
        aschText:
          '・・・・・・っ、　何を、みてるんだ・・・・・・！\n気は済んだか・・・・・・！？　なら、もう帰・・・',
        expression: 'pain',
        faceParts: {
          brow: 'pain',
          eyes: 'away',
          mouth: 'grit',
          effects: ['sweat', 'noise'],
        },
        secondExpression: 'glare',
        secondFaceParts: {
          brow: 'angry',
          eyes: 'glare',
          mouth: 'grit',
          effects: ['sweat'],
        },
        voiceEffects: ['tremble_glitch', 'tremble'],
        replyOptions: [
          {
            id: 'p2_dilemma_pattern_a',
            thoughtText: '待てよ！',
            spokenText: '・・・・・・っ、待てよ！',
            waitMs: 1800,
            aschText: '・・・・・・っ！？ 離せっ、',
            aschWaitMs: 2000,
            expression: 'shock',
            faceParts: {
              brow: 'angry',
              eyes: 'wide',
              mouth: 'gasp',
              effects: ['sweat'],
            },
            voiceEffects: ['tremble_glitch', 'normal'],
            extraExchanges: [
              {
                speaker: 'GUY',
                text: '・・・・・・おまえ、は・・・・・・',
                voiceEffect: 'tremble',
                waitMs: 2000,
              },
              {
                speaker: 'ASCH',
                text: '・・・・・・？ 何を言いたいんだ',
                expression: 'look_away',
                faceParts: {
                  brow: 'doubt',
                  eyes: 'glare',
                  mouth: 'frown',
                  effects: [],
                },
                waitMs: 2400,
              },
              {
                speaker: 'GUY',
                text: '・・・・・・いや。……なんでもない',
                waitMs: 2000,
              },
              {
                speaker: 'GUY',
                text: '・・・・・・ただ、頼むから。もう少しだけ、ここにいてくれないか',
                voiceEffect: 'tremble',
                waitMs: 2200,
              },
              {
                speaker: 'ASCH',
                text: '・・・・・・は？ 何を言って――',
                expression: 'shock',
                faceParts: {
                  brow: 'doubt',
                  eyes: 'wide',
                  mouth: 'gasp',
                  effects: [],
                },
                waitMs: 2000,
              },
              {
                speaker: 'GUY',
                text: 'そう言うなって。\nおまえとこうして茶を飲むのも、いつぶりか分かんねえしな。\n・・・・・・少しだけ、付き合えよ',
                waitMs: 2600,
              },
              {
                speaker: 'ASCH',
                text: '・・・・・・っ\n一杯だけだ。飲んだら帰るからな！',
                expression: 'look_away',
                faceParts: {
                  brow: 'angry',
                  eyes: 'away',
                  mouth: 'close',
                  effects: ['blush'],
                },
                secondExpression: 'look_away',
                secondFaceParts: {
                  brow: 'angry',
                  eyes: 'away',
                  mouth: 'close',
                  effects: ['blush'],
                },
                voiceEffect: 'normal',
                waitMs: 2200,
              },
              {
                speaker: 'GUY',
                text: 'ああ。・・・・・・すぐ淹れるよ',
                waitMs: 2000,
              },
            ],
            grantsLinkTags: ['p2_dilemma_resolved', 'p2_dilemma_kept_secret'],
            completesTopic: true,
            triggersEndingKey: 'END_PHASE3_TOMORROW',
            endingTransition: {
              waitBeforeExitMs: 1600,
              aschAction: 'stay',
              doorAction: 'none',
              waitAfterDoorMs: 1600,
              keepBgm: true,
            },
          },
          {
            id: 'p2_dilemma_pattern_kill',
            thoughtText: '首の後ろに埃がついてるぞ',
            spokenText: '・・・・・・アッシュ。\n首の後ろ・・・・・・埃がついてるぞ。取ってやる',
            waitMs: 1900,
            aschText:
              '？　・・・・・・何だ。\n・・・・・・っ、おい、気安く触るなと言って――',
            aschWaitMs: 2200,
            expression: 'normal',
            faceParts: {
              brow: 'doubt',
              eyes: 'away',
              mouth: 'close',
              effects: [],
            },
            secondExpression: 'glare',
            secondFaceParts: {
              brow: 'angry',
              eyes: 'glare',
              mouth: 'shout',
              effects: [],
            },
            specialEffect: 'destroy',
            extraExchanges: [
              {
                speaker: 'ASCH',
                text: '・・・・・・っ、が・・・・・・イ・・・・・・？',
                expression: 'shock',
                faceParts: {
                  brow: 'pain',
                  eyes: 'wide',
                  mouth: 'gasp',
                  effects: ['sweat', 'pale'],
                },
                voiceEffect: 'tremble_glitch',
                waitMs: 1900,
              },
              {
                speaker: 'ASCH',
                text: 'な、にを・・・・・・し、て・・・・・・',
                expression: 'empty',
                faceParts: {
                  brow: 'pain',
                  eyes: 'empty',
                  mouth: 'gasp',
                  effects: ['shadow', 'tears'],
                },
                secondExpression: 'pain',
                secondFaceParts: {
                  brow: 'sad',
                  eyes: 'close',
                  mouth: 'close',
                  effects: ['shadow', 'tears'],
                },
                voiceEffect: 'tremble_glitch',
                waitMs: 2700,
                specialEffect: 'collapse',
              },
              {
                speaker: 'GUY',
                text: '・・・・・・',
                waitMs: 1600,
              },
              {
                speaker: 'GUY',
                text: 'これで・・・・・・',
                waitMs: 1800,
              },
              {
                speaker: 'GUY',
                text: '・・・・・・これで、いいんだ',
                waitMs: 2400,
              },
            ],
            grantsLinkTags: ['p2_dilemma_resolved'],
            completesTopic: true,
            triggersEndingKey: 'END_PHASE3_MERCY_DESTROY',
            endingTransition: {
              waitBeforeExitMs: 1800,
              aschAction: 'none',
              doorAction: 'none',
              waitAfterDoorMs: 1600,
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // 【裏の秘密・クライマックス対話C（DP-002・DP-003 解放時）：秘密を問い詰めるルート ➔ END 10】
  // ==========================================
  {
    id: 'p2_deep_truth_confront',
    thoughtText: '嘘だよな、こんな記録・・・・・・',
    phase2Tab: '端末',
    contextCategory: 'core',
    prioritySlot1: true,
    requireLinkTag: 'climax_ready',
    forbidLinkTags: ['p2_dilemma_resolved'],
    stages: [
      {
        spokenText:
          '・・・・・・おまえ、本当に知らないのか？\n２ヶ月前に、自分が何で壊れたのかも・・・・・・',
        aschText: '・・・・・・っ、何の話だ。さっきから・・・・・・',
        expression: 'look_away',
        faceParts: {
          brow: 'doubt',
          eyes: 'away',
          mouth: 'close',
          effects: ['sweat'],
        },
        extraExchanges: [
          {
            speaker: 'GUY',
            text: '・・・・・・見てくれ。嘘だって言ってくれよ、こんなの・・・・・・！',
            voiceEffect: 'tremble',
            waitMs: 2000,
          },
          {
            speaker: 'ASCH',
            text: '・・・・・・？\n・・・・・・っ！？ こ、れは・・・・・・',
            expression: 'shock',
            faceParts: {
              brow: 'sad',
              eyes: 'wide',
              mouth: 'gasp',
              effects: ['sweat', 'pale'],
            },
            waitMs: 2200,
          },
          {
            speaker: 'GUY',
            text: '本当なのか？ ここに書いてあることは、本当に・・・・・・！',
            voiceEffect: 'tremble',
            waitMs: 2000,
          },
          {
            speaker: 'ASCH',
            text: 'し、らない・・・・・・\n俺の記憶には、何も・・・・・・',
            expression: 'shock',
            faceParts: {
              brow: 'sad',
              eyes: 'wide',
              mouth: 'gasp',
              effects: ['sweat', 'pale'],
            },
            voiceEffect: 'tremble',
            waitMs: 2400,
          },
          {
            speaker: 'ASCH',
            text: '・・・・・・大爆発、・・・・・・そうだ、それで俺は、ディストに・・・・・・',
            expression: 'pain',
            faceParts: {
              brow: 'pain',
              eyes: 'pain',
              mouth: 'grit',
              effects: ['sweat', 'shadow'],
            },
            voiceEffect: 'tremble_glitch',
            waitMs: 2600,
          },
          {
            speaker: 'ASCH',
            text: '・・・・・・俺の身体に、ルークの記憶を・・・・・・',
            expression: 'pain',
            faceParts: {
              brow: 'pain',
              eyes: 'close',
              mouth: 'grit',
              effects: ['sweat', 'shadow'],
            },
            voiceEffect: 'tremble_glitch',
            waitMs: 2800,
          },
          {
            speaker: 'ASCH',
            text: 'そうだ、だから俺は、・・・・・・！',
            expression: 'shock',
            faceParts: {
              brow: 'pain',
              eyes: 'close',
              mouth: 'gasp',
              effects: ['sweat', 'pale', 'shadow'],
            },
            voiceEffect: 'tremble_glitch',
            waitMs: 2200,
          },
          {
            speaker: 'GUY',
            text: '・・・・・・アッシュ！',
            voiceEffect: 'tremble',
            waitMs: 1800,
          },
          {
            speaker: 'ASCH',
            text: 'っ、ガイ・・・・・・',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'away',
              mouth: 'gasp',
              effects: ['sweat'],
            },
            voiceEffect: 'tremble',
            waitMs: 1800,
          },
          {
            speaker: 'GUY',
            text: '・・・・・・っ、',
            voiceEffect: 'tremble',
            waitMs: 1200,
          },
          {
            speaker: 'GUY',
            text: 'やめろ・・・・・・っ、そんな顔すんなよ・・・・・・！',
            voiceEffect: 'tremble',
            waitMs: 2000,
          },
          {
            speaker: 'GUY',
            text: '言えよ・・・・・・！',
            voiceEffect: 'shout',
            waitMs: 1400,
          },
          {
            speaker: 'GUY',
            text: '自分は紛れもなく、アッシュだって・・・・・・言え！！！！',
            voiceEffect: 'shout',
            specialEffect: 'shout_shock',
            waitMs: 2400,
          },
          {
            speaker: 'GUY',
            text: '・・・・・・頼むから、',
            voiceEffect: 'tremble',
            waitMs: 1400,
          },
          {
            speaker: 'GUY',
            text: '言ってくれ・・・・・・っ',
            voiceEffect: 'tremble',
            silentFaceSequence: [
              {
                delayMs: 1400,
                expression: 'glare',
                faceParts: {
                  brow: 'angry',
                  eyes: 'glare',
                  mouth: 'close',
                  effects: [],
                },
              },
              {
                delayMs: 1600,
                expression: 'look_away',
                faceParts: {
                  brow: 'sad',
                  eyes: 'down',
                  mouth: 'close',
                  effects: [],
                },
              },
              {
                delayMs: 1600,
                expression: 'look_away',
                faceParts: {
                  brow: 'sad',
                  eyes: 'close',
                  mouth: 'close',
                  effects: [],
                },
              },
            ],
            waitMs: 800,
          },
          {
            speaker: 'ASCH',
            text: '・・・・・・そうだ。俺が、アッシュだ',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'close',
              mouth: 'close',
              effects: [],
            },
            voiceEffect: 'normal',
            waitMs: 2400,
          },
          {
            speaker: 'ASCH',
            text: '俺が――・・・・・・',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'close',
              effects: [],
            },
            voiceEffect: 'normal',
            waitMs: 3200,
          },
        ],
        grantsLinkTags: ['p2_dilemma_resolved'],
        completesTopic: true,
        triggersEndingKey: 'END_PHASE3_SWAMPMAN',
      },
    ],
  },

  // ==========================================
  // 【通常話題：ディストが記憶を封じた理由（DP-003 / SEC-20 解除で『雑談』タブに出現）】
  // ==========================================
  {
    id: 'p2_after_dilemma_dist_lock',
    thoughtText: 'ディストが記憶にロックをかけた理由',
    phase2Tab: '雑談',
    contextCategory: 'core',
    requireLinkTag: 'sec20_unlocked',
    stages: [
      {
        spokenText:
          '・・・・・・あのディストが珍しくおまえの記憶に強固なロックをかけたのもさ。\nおまえがまた無茶をしないためだったのかもしれないな',
        aschText:
          '・・・・・・ハッ、あいつがそんな殊勝な理由で動くものか。どうせ貴重なサンプルを壊されたくなかっただけだろう。\n・・・・・・まあいい。思い出せないことは、今の俺には必要のないことだ',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'wide',
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
        completesTopic: true,
      },
    ],
  },

  // ==========================================
  // 【機嫌鎮静・不機嫌エスカレート＆冷たい破壊・放置時の雑談トピック（IMMUTABLE_RULES 1・6準拠）】
  // ==========================================
  {
    id: 'topic_41_apologize',
    thoughtText: '言い過ぎたことを素直に謝る',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    calmsAnger: true,
    requireLinkTag: 'phase2_started',
    stages: [
      {
        spokenText: '・・・・・・悪かったよ。お互いに少し熱くなりすぎたな、頭を冷やそう',
        aschText: '・・・・・・ふん。分かればいい。あまりしつこく妙なことを聞くな',
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
    thoughtText: 'さっきからなんだその態度は',
    phase2Tab: '追求',
    contextCategory: 'fight',
    prioritySlot1: true,
    requireLinkTag: 'phase2_started',
    requireGuyAngry: true,
    stages: [
      {
        spokenText:
          '・・・・・・いい加減にしろよ。さっきから何を聞いても突っかかりやがって、人の気も知らないでなんだその態度は',
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
          'しかし、今日のグランコクマは風が少し冷たいなあ。その身体だと寒さとかは感じないのか？',
        aschText:
          '・・・・・・温度センサーくらいついているが、人間みたいに凍えることはない。\nもっとも、冷えすぎると関節の駆動音がうるさくなるから鬱陶しいがな',
        expression: 'normal',
        faceParts: { brow: 'normal', eyes: 'normal', mouth: 'close', effects: [] },
        secondExpression: 'look_away',
        secondFaceParts: { brow: 'doubt', eyes: 'glare', mouth: 'frown', effects: [] },
        moodDelta: 1,
        trustDelta: 1,
        badMoodResponse: {
          aschText: '・・・・・・別に、寒くはない',
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
          '机の上が散らかっていて悪いね。最近また古代の音機関の調査を手伝っていて、資料が山積みになってるんだ',
        aschText:
          '・・・・・・おまえも相変わらずそういう音機関いじりが好きだな。\nディストの研究所にも、似たようなガラクタや通信機が山ほど転がっている',
        expression: 'normal',
        faceParts: { brow: 'normal', eyes: 'down', mouth: 'close', effects: [] },
        secondExpression: 'look_away',
        secondFaceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
        moodDelta: 1,
        trustDelta: 1,
        grantsLinkTags: ['hint_lab_comms'],
        badMoodResponse: {
          aschText: '・・・・・・ディストの研究所にも似たようなガラクタや通信機が転がっているな',
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
          '屋敷でよく相手をさせられたよな。\nずっと負け通しだったが・・・・・・',
        aschText:
          '・・・・・・おまえがわざと手を抜いていたことくらい、とっくに気づいているぞ。\n俺は何度も本気で指せと言ったのに',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush'] },
        secondExpression: 'look_away',
        secondFaceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
        moodDelta: 1,
        trustDelta: 1,
        grantsLinkTags: ['hint_chess_board'],
        badMoodResponse: {
          aschText: '・・・・・・チェスなど、暇つぶしに盤面を並べる程度だ',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
          moodDelta: 0,
        },
      },
    ],
  },

  {
    id: 'p2_awkward_silence',
    thoughtText: '気まずい',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    awkwardSilenceTopic: true,
    requireLinkTag: 'phase2_started',
    stages: [
      {
        spokenText: '・・・・・・なんだか間が持たないな',
        aschText:
          '・・・・・・気まずそうにするな。おまえが勝手に連れ込んだんだろうが',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: ['blush'] },
        moodDelta: 0,
        trustDelta: 1,
        badMoodResponse: {
          aschText:
            '・・・・・・気まずそうにするな。おまえが勝手に連れ込んだんだろうが',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
          moodDelta: 0,
        },
      },
    ],
  },
];
