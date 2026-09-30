import { ConversationTopic } from '../types/game';

export const SCENARIO_TOPICS_PART2: ConversationTopic[] = [
  // ==========================================
  // 【フェーズ2：ほのぼの対話パート（正体判明後）】
  // ==========================================

  // 1. タルロウAだった頃の話と現在の10歳予備素体（IMMUTABLE_RULES 5-⑥準拠）
  {
    id: 'p2_tarlow_past',
    thoughtText: 'どうして「タルロウA」なんて名前を名乗っていたのか聞く',
    phase2Tab: '追求',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_height_headpat', 'p2_dist_complaints'],
    stages: [
      {
        spokenText:
          'しかし、なんでまた『タルロウA』なんて名前で機械のフリをしていたんだ？　とっさに思いついた嘘にしては妙に具体的だったけど。',
        aschText:
          '・・・・・・でまかせじゃない。2ヶ月前まで、俺は本当に『タルロウA』という50センチくらいの小型機体に入っていた。\nおまえやあの眼鏡、ピオニーが研究所に来た時にも、何度か顔を合わせている。',
        expression: 'normal',
        faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
        trustDelta: 1,
        capturedProtect: {
          sectorId: 'SEC-03',
          capturedQuote:
            '「・・・・・・2ヶ月前まで、俺は本当に『タルロウA』という50センチくらいの小型機体に入っていた。」',
          capturedContext: '2ヶ月前まで小型機体タルロウAに入っていたと明かした際の発言',
        },
        oralInfo: {
          id: 'oral-tarlow-a-history',
          category: '機体ログ',
          title: '小型機体『タルロウA』としての稼働期間',
          content:
            '1年前から2ヶ月前まで、タルロウXの外装をアッシュカラーにした小型機体『タルロウA』として稼働していた。研究所を訪れたガイやジェイド、ピオニーとも顔を合わせていたが、誰も中身がアッシュだとは気づいていなかった。',
        },
        replyOptions: [
          {
            id: 'p2_tarlow_past_reply_why_silent',
            thoughtText: '研究所で会っていたなら、なぜ声をかけなかったか聞く',
            spokenText:
              'えっ・・・・・・あの研究所にいた赤い小型機体、おまえだったのか！？　なんでその時に声をかけてくれなかったんだ！',
            aschText:
              '・・・・・・ふん、俺がこんな機械になって生き永らえているなどと、気付かないならそれに越したことはないだろう。\n2ヶ月前にそのタルロウAが壊れて、空きがなかったからこの10歳当時の予備素体に入れ替えられた。・・・・・・なぜ壊れたのかは覚えていないがな。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-03',
            grantsLinkTags: ['talked_tarlow_history'],
          },
          {
            id: 'p2_tarlow_past_reply_surprised',
            thoughtText: 'あの赤い小型機体がアッシュだったと知って驚く',
            spokenText:
              'あの研究所の隅にいた赤い小型機体か・・・・・・！　まさかあの中に、おまえが入っていたとはな。',
            aschText:
              '・・・・・・笑いたければ笑え。2ヶ月前にそのタルロウAが壊れて、空きがなかったからこの10歳当時の予備素体に入れ替えられた。・・・・・・なぜ壊れたのかは覚えていないがな。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'away', mouth: 'frown', effects: [] },
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-03',
            grantsLinkTags: ['talked_tarlow_history'],
          },
        ],
      },
    ],
  },

  // 2. 背が小さい・視線が低い話と頭を撫でるイベント（この1箇所のみ：IMMUTABLE_RULES 3準拠）
  {
    id: 'p2_height_headpat',
    thoughtText: '昔の10歳の姿だと、やっぱり目線が低くてやりづらいか聞く',
    phase2Tab: '雑談',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_tarlow_history',
    relatedTopicIds: ['p2_tea_and_taste', 'p2_clothes'],
    stages: [
      {
        spokenText:
          '7年前の予備素体ってことは、俺が屋敷にいた頃の背丈そのままなんだよな。やっぱり目線が低くて動きづらいか？',
        aschText:
          'やかましい！　身長の話をするな！\n・・・・・・まあ、以前の50センチしかない鉄塊に比べれば、人間の形になったから以前よりマシだがな。',
        expression: 'glare',
        faceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'frown',
          effects: ['blush'],
        },
        trustDelta: 1,
        capturedProtect: {
          sectorId: 'SEC-04',
          capturedQuote: '「やかましい！　身長の話をするな！」',
          capturedContext: '目線の低さや背丈について触れた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_height_reply_headpat',
            thoughtText: '昔の屋敷時代を思い出して、つい頭を撫でてしまう',
            spokenText:
              'はは、人間の形になって安心したっていうのは正直でいいな。・・・・・・こうして見ると、本当にあの頃のままだ。',
            aschText:
              'なっ・・・・・・おい、勝手に頭を撫でるな！　子ども扱いするなと言っているだろうが！\n・・・・・・チッ、調子の狂う奴だ。',
            expression: 'look_away',
            faceParts: {
              brow: 'angry',
              eyes: 'away',
              mouth: 'frown',
              effects: ['blush', 'sweat'],
            },
            moodDelta: 1,
            trustDelta: 1,
            hideWhenBadMoodOrCold: true,
            naturalUnlockSectorId: 'SEC-04',
            oralInfo: {
              id: 'oral-headpat',
              category: '情動反応',
              title: '頭部接触に対する反発と情動軟化',
              content:
                'ガイに頭を撫でられた際、言葉では子ども扱いされたことに怒って手を払い除けたものの、内部の情動波形はかつての屋敷時代を想起して穏やかな軟化を示した。',
            },
          },
          {
            id: 'p2_height_reply_nod',
            thoughtText: '「人間の形になってよかったな」と素直に頷く',
            spokenText:
              'そうだな。50センチの鉄の塊よりは、今の姿の方がずっといいよ。',
            aschText:
              '・・・・・・ふん、当たり前だ。こんなガキの背丈でも、自分の手足があるだけマシだからな。',
            expression: 'look_away',
            faceParts: {
              brow: 'normal',
              eyes: 'away',
              mouth: 'close',
              effects: [],
            },
            moodDelta: 1,
            trustDelta: 1,
            hideWhenBadMoodOrCold: true,
            naturalUnlockSectorId: 'SEC-04',
          },
          {
            id: 'p2_height_reply_provoke',
            thoughtText: '「その小さな体じゃ剣もまともに振れないだろうな」と口にする',
            spokenText:
              '・・・・・・だが、その10歳の小さな体じゃ、もう昔みたいに剣もまともに振れないだろうな。',
            aschText:
              '・・・・・・っ、やかましい！！　俺の剣の腕まで見下す気か、貴様・・・・・・ッ！\nそれ以上ガキ扱いするなら、口を利かんからな！',
            expression: 'glare',
            faceParts: {
              brow: 'angry',
              eyes: 'glare',
              mouth: 'shout',
              effects: ['blush'],
            },
            voiceEffects: ['shout'],
            moodDelta: -3,
          },
        ],
      },
    ],
  },

  // 3. お茶と味覚・好き嫌いの話（ほのぼの日常）
  {
    id: 'p2_tea_and_taste',
    thoughtText: 'せっかく部屋に来たんだし、お茶でも淹れようと勧める',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    calmsAnger: true,
    hideWhenGuyAngry: true,
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_galdios_sword', 'p2_dist_complaints'],
    stages: [
      {
        spokenText:
          'そうだ、せっかく俺の部屋に来たんだし、紅茶でも淹れようか。飲めなくても、香りくらいなら分かるんだろ？',
        aschText:
          '・・・・・・茶などいらんと言っているだろう。機械の身体に飲食など不要だ。\n・・・・・・だが、まあ、おまえが勝手に淹れて香りだけ置いておくというなら、止めはしない。',
        expression: 'look_away',
        faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: ['blush'] },
        moodDelta: 2,
        guyMoodDelta: 2,
        trustDelta: 1,
        badMoodResponse: {
          aschText: '・・・・・・淹れてくれるなら、香りだけ貰っておく。',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
          moodDelta: 2,
          trustDelta: 1,
        },
        grantsLinkTags: ['tea_served'],
        capturedProtect: {
          sectorId: 'SEC-05',
          capturedQuote: '「・・・・・・茶などいらんと言っているだろう。」',
          capturedContext: 'お茶や食事を勧められた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_tea_reply_preferences',
            thoughtText: '砂糖は入れずにそのまま出し、昔の好き嫌いの話をする',
            spokenText:
              'ほら、砂糖は入れないでおいたよ。おまえ、昔から甘いお菓子とピーマンだけは絶対に手をつけなかったからな。',
            aschText:
              '・・・・・・余計なことまで覚えているな、おまえは。\n・・・・・・悪くない香りだ。あの変態の研究所は薬品臭くてかなわんからな。',
            expression: 'normal',
            faceParts: { brow: 'smile', eyes: 'down', mouth: 'close', effects: [] },
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
            faceParts: { brow: 'normal', eyes: 'down', mouth: 'close', effects: [] },
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
    thoughtText: '壁際の『宝刀ガルディオス』を見ているのに気づく',
    phase2Tab: '追求',
    contextCategory: 'past',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    forbidLinkTags: ['talked_galdios_p1'],
    relatedTopicIds: ['p2_sword_limiter', 'p2_friends_news'],
    stages: [
      {
        spokenText:
          'ん？　ああ、壁際の刀か。それは実家の『宝刀ガルディオス』だよ。いろいろあったけど、無事に俺の手元に戻ってきたんだ。',
        aschText:
          '・・・・・・そうか。その刀、おまえの手に戻ったんだな。\n・・・・・・ホドのものが、少しでもおまえのところへ帰ってきたのなら、よかった。',
        expression: 'normal',
        faceParts: { brow: 'sad', eyes: 'normal', mouth: 'close', effects: [] },
        moodDelta: 1,
        trustDelta: 2,
        grantsLinkTags: ['done_p2_galdios'],
        capturedProtect: {
          sectorId: 'SEC-06',
          capturedQuote: '「・・・・・・その刀、おまえの手に戻ったんだな。」',
          capturedContext: '部屋に置かれた宝刀ガルディオスを見た際の発言',
        },
        naturalUnlockSectorId: 'SEC-06',
        oralInfo: {
          id: 'oral-galdios-sword',
          category: '情動反応',
          title: '宝刀ガルディオスに対する安堵反応',
          content:
            'ガイの部屋に置かれた『宝刀ガルディオス』を見て、今初めてその事実を知り素直に安堵する様子を見せた。',
        },
      },
    ],
  },
  {
    id: 'p2_galdios_sword_after_p1',
    thoughtText: 'さっきはぐらかした『宝刀ガルディオス』についてもう一度聞く',
    phase2Tab: '追求',
    contextCategory: 'past',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_galdios_p1',
    relatedTopicIds: ['p2_sword_limiter', 'p2_friends_news'],
    stages: [
      {
        spokenText:
          'さっきは機械のフリをしてはぐらかしたけど、壁際の『宝刀ガルディオス』を見て驚いていたよな。これが俺の手元に戻ったこと、知らなかったのか？',
        aschText:
          '・・・・・・ああ、今ここで実物を見て初めて知った。その刀、おまえの手に戻ったんだな。\n・・・・・・ホドのものが、少しでもおまえのところへ帰ってきたのなら、よかった。',
        expression: 'normal',
        faceParts: { brow: 'sad', eyes: 'normal', mouth: 'close', effects: [] },
        moodDelta: 1,
        trustDelta: 2,
        grantsLinkTags: ['done_p2_galdios'],
        capturedProtect: {
          sectorId: 'SEC-06',
          capturedQuote: '「・・・・・・その刀、おまえの手に戻ったんだな。」',
          capturedContext: '部屋に置かれた宝刀ガルディオスを見た際の発言',
        },
        naturalUnlockSectorId: 'SEC-06',
        oralInfo: {
          id: 'oral-galdios-sword',
          category: '情動反応',
          title: '宝刀ガルディオスに対する安堵反応',
          content:
            'ガイの部屋に置かれた『宝刀ガルディオス』を見て、今初めてその事実を知り素直に安堵する様子を見せた。',
        },
      },
    ],
  },

  // 5. 出力制限と剣の話
  {
    id: 'p2_sword_limiter',
    thoughtText: 'その身体で剣を握ったり動かしたりできるのか尋ねる',
    phase2Tab: '雑談',
    contextCategory: 'body',
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_dist_complaints', 'p2_friends_news'],
    stages: [
      {
        spokenText:
          'その身体、普段通り歩いたり喋ったりはできているみたいだけど、剣を振ったりもできるのか？',
        aschText:
          '・・・・・・できない。ディストが四肢に出力制限をかけてやがる。\n少し強く踏み込もうとするだけでリミッターが作動して、足元がふらつく始末だ。おまえに心配される筋合いはない。',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: [] },
        trustDelta: 1,
        capturedProtect: {
          sectorId: 'SEC-08',
          capturedQuote: '「・・・・・・ディストが四肢に出力制限をかけてやがる。」',
          capturedContext: '身体の動かしづらさや剣について触れた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_sword_reply_sympathy',
            thoughtText: '「剣士のおまえにはもどかしいよな」と気遣う',
            spokenText:
              'そうか・・・・・・剣を振るうのが当たり前だったおまえには、もどかしい仕様だな。',
            aschText:
              '・・・・・・ふん、同情するな。いずれリミッターくらい自力で外してやる。',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
            trustDelta: 1,
            hideWhenBadMoodOrCold: true,
            naturalUnlockSectorId: 'SEC-08',
          },
          {
            id: 'p2_sword_reply_guy_irritated',
            thoughtText: '「心配して聞いてやってるのに、なんだその態度は」と苛立つ',
            spokenText:
              '・・・・・・おい、こっちは身体の具合を心配して聞いてやってるのに、なんだその棘のある言い方は。',
            aschText:
              '・・・・・・誰が心配しろと頼んだ！　おまえが勝手に連れ込んで勝手に質問しているだけだろうが！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: [] },
            moodDelta: -2,
            guyMoodDelta: -3,
          },
        ],
      },
    ],
  },

  // 6. ディストの研究所での暮らしぶり（しょうもないロック・ほのぼの愚痴）
  {
    id: 'p2_dist_complaints',
    thoughtText: 'ディストの研究所では普段どんな風に過ごしているのか聞く',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_why_outside', 'p2_why_hide_truth'],
    stages: [
      {
        spokenText:
          'ディストの研究所にいる間、あいつに妙な実験や雑用を押し付けられたりしていないか？',
        aschText:
          '・・・・・・あの変態の趣味に付き合わされる身にもなってみろ。\n機体名に『薔薇の騎士』だの何だのふざけた名前をつけようとするわ、珈琲を淹れろと騒ぐわ、毎日うるさくて仕方がない。',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['sweat'] },
        moodDelta: 1,
        trustDelta: 1,
        badMoodResponse: {
          aschText: '・・・・・・あの変態が騒ぐのを適当にあしらっているだけだ。',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
          moodDelta: 0,
        },
        capturedProtect: {
          sectorId: 'SEC-09',
          capturedQuote: '「・・・・・・あの変態の趣味に付き合わされる身にもなってみろ。」',
          capturedContext: 'ディストの研究所での扱いについて愚痴をこぼした際の発言',
        },
        replyOptions: [
          {
            id: 'p2_dist_reply_hideout',
            thoughtText: 'それでもディストの研究所に居続けるのは意外だと言う',
            spokenText:
              'はは、ディスト相手に毎日ツッコミを入れてるおまえの姿が目に浮かぶよ。でも、そんなに騒がしいならあんな研究所に居続けなくてもいいのにな。',
            aschText:
              '・・・・・・あそこは人目につかない。あの変態も口だけは堅いからな、身を隠すには都合がいいだけだ。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-09',
            grantsLinkTags: ['talked_dist_hideout'],
          },
          {
            id: 'p2_dist_reply_rose_knight',
            thoughtText: '『薔薇の騎士』というネーミングセンスに苦笑する',
            spokenText:
              '『薔薇の騎士』って・・・・・・あいつ、昔からそういう大仰な名前をつけるのが好きだよな。',
            aschText:
              '笑い事じゃない！　本気で銘板に刻もうとしやがったから、その場でへし折ってやった。\n・・・・・・まったく、あいつは騒がしいにも程がある。',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush'] },
            moodDelta: 1,
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-09',
            grantsLinkTags: ['talked_dist_hideout'],
          },
        ],
      },
    ],
  },

  // 7. 今日俺が研究室に入ったとき、なぜ隠れなかったのか（しょうもないロック：SEC-10）
  {
    id: 'p2_why_outside',
    thoughtText: '俺が研究室に入ったとき、どうして隠れずに隅にいたのか聞く',
    phase2Tab: '追求',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_clothes', 'p2_friends_news'],
    stages: [
      {
        spokenText:
          'そういえば、今日俺がディストの研究室に入ったとき、なんで物陰に隠れもしないで部屋の隅に突っ立っていたんだ？　前みたいにやり過ごすこともできただろ？',
        aschText:
          '・・・・・・別にボサッとしていたわけじゃない。あの変態の相手で疲れていたところに、おまえが勝手に入ってきただけだ。\n誰だって3時間も音機関の自慢話を聞かされりゃ、反応くらい鈍るだろうが。',
        expression: 'look_away',
        faceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'frown',
          effects: ['blush'],
        },
        trustDelta: 1,
        capturedProtect: {
          sectorId: 'SEC-10',
          capturedQuote:
            '「・・・・・・別にボサッとしていたわけじゃない。あの変態の相手で疲れていたところに、おまえが勝手に入ってきただけだ。」',
          capturedContext: '研究室に入った際になぜ隠れなかったのか尋ねた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_why_outside_reply_sympathy',
            thoughtText: '「3時間も自慢話は災難だったな」と同情する',
            spokenText:
              'はは、ディストの自慢話を3時間も聞かされていたのか。そりゃ誰だってぐったりするよ、災難だったな。',
            aschText:
              '・・・・・・笑い事じゃない。おかげでこうして貴様に捕まって連れ出される羽目になったんだろうが。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'away', mouth: 'frown', effects: [] },
            moodDelta: 1,
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-10',
          },
          {
            id: 'p2_why_outside_reply_glad',
            thoughtText: '「でも、おかげでおまえを見つけられた」と言う',
            spokenText:
              '・・・・・・でも、おまえが隠れ損ねてくれたおかげで、こうして生きているおまえを見つけられたんだからな。',
            aschText:
              '・・・・・・ふん、俺にとってはありがた迷惑な話だ。',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: ['blush'] },
            moodDelta: 1,
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-10',
          },
        ],
      },
    ],
  },

  // 8. 今の10歳当時の服装について（しょうもないロック：SEC-11）
  {
    id: 'p2_clothes',
    thoughtText: '着ている服も昔の屋敷にいた頃とよく似ているなと触れる',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_tea_and_taste', 'p2_friends_news'],
    stages: [
      {
        spokenText:
          'その着ている服も、昔バチカルの屋敷にいた頃の服によく似ているよな。ディストが用意してくれたのか？',
        aschText:
          '・・・・・・服の話などどうでもいいだろう。着替えがこれしかなかっただけだ。\nあいつが最初に持ってきた悪趣味な服よりは、まだこれの方がマシだったからな。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'away',
          mouth: 'frown',
          effects: ['blush'],
        },
        trustDelta: 1,
        badMoodResponse: {
          aschText: '・・・・・・着替えがこれしかなかっただけだ。',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
          moodDelta: 0,
        },
        capturedProtect: {
          sectorId: 'SEC-11',
          capturedQuote:
            '「・・・・・・服の話などどうでもいいだろう。着替えがこれしかなかっただけだ。」',
          capturedContext: '10歳当時の服について触れられた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_clothes_reply_suits_you',
            thoughtText: '「よく似合っているよ。昔を思い出すな」と微笑む',
            spokenText:
              'ディストが持ってきた悪趣味な服っていうのも気になるけど・・・・・・今のその服、よく似合っているよ。昔を思い出すな。',
            aschText:
              '・・・・・・うるさい、しみじみ見るな！　小さい身体で着慣れないから、襟元が窮屈でかなわん。',
            expression: 'look_away',
            faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush'] },
            moodDelta: 1,
            trustDelta: 1,
            naturalUnlockSectorId: 'SEC-11',
          },
        ],
      },
    ],
  },

  // 9. 仲間たち（ナタリア・ピオニー・ルーク）の近況
  {
    id: 'p2_friends_news',
    thoughtText: 'バチカルのナタリアや、ピオニー陛下たちの近況を話す',
    phase2Tab: '追求',
    contextCategory: 'friends',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_why_hide_truth'],
    stages: [
      {
        spokenText:
          '外の連中といえば、ナタリアもバチカルの復興で毎日忙しく飛び回っているし、ピオニー陛下や大佐も相変わらずだ。少しは気になっていたんじゃないか？',
        aschText:
          '・・・・・・外の連中のことなど、俺の知ったことか。\n・・・・・・あいつらが勝手に元気でやっているなら、それで十分だろう。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'away',
          mouth: 'frown',
          effects: ['blush'],
        },
        trustDelta: 1,
        capturedProtect: {
          sectorId: 'SEC-07',
          capturedQuote: '「・・・・・・外の連中のことなど、俺の知ったことか。」',
          capturedContext: '仲間たちの近況について話題を振られた際の発言',
        },
        grantsLinkTags: ['talked_friends_news'],
        replyOptions: [
          {
            id: 'p2_friends_reply_warm',
            thoughtText: '「おまえらしい言い方だな」と静かに微笑む',
            spokenText:
              'はは、おまえらしい言い方だな。ああ、みんな元気でやっているよ。',
            aschText:
              '・・・・・・ふん、ならいい。それ以上いちいち報告しなくて結構だ。',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
            trustDelta: 1,
            hideWhenBadMoodOrCold: true,
            naturalUnlockSectorId: 'SEC-07',
          },
          {
            id: 'p2_friends_reply_tease_angry',
            thoughtText: '「本当は寂しくてたまらないくせに、意地を張るなよ」とからかう',
            spokenText:
              '本当はひとりで研究所にいて寂しくてたまらないくせに、いつまでそんな意地を張ってるんだ？',
            aschText:
              '・・・・・・っ、ふざけるな！！　誰が寂しいなどと言った、勝手な決めつけをするな！！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush'] },
            voiceEffects: ['shout'],
            moodDelta: -3,
          },
          {
            id: 'p2_friends_reply_guy_irritated',
            thoughtText: '「俺の知ったことか、はないだろ」と突き放す態度に苛立つ',
            spokenText:
              '・・・・・・あいつらがどれだけおまえの死を悼んだか知りもしないで、『俺の知ったことか』はないだろ。',
            aschText:
              '・・・・・・だから死んだ人間は大人しく引っ込んでいると言っているだろうが！　俺にどうしろと言うんだ！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: [] },
            moodDelta: -2,
            guyMoodDelta: -3,
          },
        ],
      },
    ],
  },

  // 10. 手元の端末（管理パッド）について尋ねる（IMMUTABLE_RULES 2-①・SCENARIO_DESIGN 会話13準拠）
  {
    id: 'p2_show_terminal',
    thoughtText: '【端末提示】手元の管理端末を本人に見せる',
    phase2Tab: '端末',
    contextCategory: 'body',
    requireLinkTag: 'phase2_started',
    forbidLinkTags: ['terminal_revealed'],
    relatedTopicIds: ['p2_why_outside', 'p2_dist_complaints'],
    stages: [
      {
        spokenText:
          'なあ、おまえを研究室から連れ出すときにディストが『これを持っていきなさい』って渡してきたこの板なんだが・・・・・・見覚えはあるか？',
        aschText:
          'チッ、その忌々しい板を俺に向けるな！\n・・・・・・ディストの奴、俺の内部記録を見る管理端末までおまえに渡しやがったのか。',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: ['sweat'] },
        grantsLinkTags: ['terminal_revealed'],
        systemLog: '対象に管理端末の画面を提示。対象は自身を管理・観測する装置として認識しました。',
        replyOptions: [
          {
            id: 'p2_show_terminal_reply_lower',
            thoughtText: '「むやみに弄ったりしないよ」と端末を下げる',
            spokenText:
              '悪かったよ。むやみに弄ったりしないでおくから、そう睨むな。',
            aschText:
              '・・・・・・ふん。勝手に俺の内部モニターを覗き見るなよ。',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'frown', effects: [] },
            trustDelta: 1,
            hideWhenBadMoodOrCold: true,
          },
          {
            id: 'p2_show_terminal_reply_care',
            thoughtText: '「その身体に無理が出ていないか気になってさ」と言う',
            spokenText:
              'すまん。ただ、その身体に無理が出ていないか気になってさ。',
            aschText:
              '・・・・・・余計なお世話だ。俺の身体くらい自分で分かる。変な記録まで勝手に開けるなよ。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'away', mouth: 'frown', effects: [] },
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
              '・・・・・・っ、趣味の悪い真似をするな！！　人の頭の中を勝手に覗き見て楽しいか、貴様・・・・・・ッ！',
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
    thoughtText: '【MC-001】動揺すると顔が赤くなる仕様に触れる',
    phase2Tab: '端末',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-00',
    stages: [
      {
        spokenText:
          'その身体、感情が上がると顔に熱がこもって赤くなる仕様なんだな。生前とまるで同じじゃないか。',
        aschText:
          'うるさい！　冷却系の放熱処理がそうなっているだけだ！\n・・・・・・いちいち人の顔を覗き込むな、鬱陶しい！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec01_zura',
    thoughtText: '【MC-002】『〜ズラ』語尾設定と端末破壊の件に触れる',
    phase2Tab: '端末',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-01',
    stages: [
      {
        spokenText:
          'ディストの奴、最初におまえの語尾を『〜ズラ』に設定しようとして、おまえに設定端末ごと叩き割られたんだってな。',
        aschText:
          '・・・・・・思い出すだけで腹が立つ！　誰があんなふざけた語尾で喋るか！\nあの変態、次に同じ真似をしたら研究所ごとスクラップにしてやる・・・・・・！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: ['blush'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec04_stepstool',
    thoughtText: '【EM-002】高い棚と『踏み台』の記録に触れる',
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
          'なっ・・・・・・！？　だ、誰にも見られていなかったはずだぞ、なぜ貴様がそれを知っている！？\n・・・・・・ち、違う、あれはたまたま上の棚の部品を確認していただけだ！　笑うな！',
        expression: 'shock',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec05_pepper',
    thoughtText: '【MC-004】ディストの差し入れ菓子を突き返した記録に触れる',
    phase2Tab: '端末',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-05',
    stages: [
      {
        spokenText:
          'ディストが差し入れた特製の砂糖漬けケーキを、一口検知した瞬間に突き返したんだってな。',
        aschText:
          '・・・・・・っ、あんな砂糖の塊、味覚センサーが壊れるに決まっているだろうが！\nあの変態、人の好みを知っていてわざと持ってきやがったんだ！',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec07_night_search',
    thoughtText: '【EM-004】深夜の『近況検索履歴』に触れる',
    phase2Tab: '端末',
    contextCategory: 'friends',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-07',
    stages: [
      {
        spokenText:
          '外の連中には興味がないって言っていた割に、夜中に研究所の通信端末でバチカルやピオニー陛下の動向を調べていただろ。',
        aschText:
          '・・・・・・っ！　き、貴様、いつの間に研究所の通信履歴など見やがった！？\n・・・・・・暇つぶしに通信網のテストをしていただけだ！　あいつらのことなど気にしていない！',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec08_swing_fall',
    thoughtText: '【MC-005】隠れて素振りをして転んだ記録に触れる',
    phase2Tab: '端末',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-08',
    stages: [
      {
        spokenText:
          '空き部屋で隠れて剣の素振りをしようとして、出力制限で転んで壁を蹴飛ばしたそうじゃないか。',
        aschText:
          'チッ・・・・・・うるさい！　急にリミッターが作動したせいで、足元が狂っただけだ！\n体がどれくらい動くか試していただけだ、二度とその話をするな！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'grit', effects: ['blush'] },
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec09_rejected_names',
    thoughtText: '【EM-005】却下された『機体名リスト』に触れる',
    phase2Tab: '端末',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-09',
    stages: [
      {
        spokenText:
          '『スーパー・タルロウA（エース）』に『深紅の貴公子クリムゾン号』・・・・・・この候補、全部おまえが却下したのか。',
        aschText:
          '当たり前だろうが！　どいつもこいつも正気を疑うような名前ばかり並べやがって・・・・・・！\n・・・・・・おい、そこでニヤニヤするな！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec10_alley_lost',
    thoughtText: '【EM-006】3時間の自慢話で消耗して隠れ損ねた件に触れる',
    phase2Tab: '端末',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-10',
    stages: [
      {
        spokenText:
          '今日俺が研究室に入ったときに隠れなかったの、ディストの3時間連続の自慢話で聴覚センサーが疲れ果てて、反応が1.8秒遅れたからなんだってな。',
        aschText:
          '・・・・・・っ、1.8秒だと！？　この身体、そんな細かい秒数まで勝手に記録してやがるのか！？\n・・・・・・うるさい、3時間も薔薇だの芸術だの聞かされてみろ、誰だって頭が痺れる！　それ以上言うな！',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec11_button_struggle',
    thoughtText: '【MC-006】襟のボタン留めに格闘した記録に触れる',
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
          '・・・・・・っ、やかましい！　指先が小さくなって、生前と勝手が違っただけだろうが！\nくだらないことをいちいち口に出すな！',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },

  // ==========================================
  // 【フェーズ2表クリア核心トピック：なぜナタリアやルークに会わず研究所に身を隠すのか（案A）】
  // （少し打ち解けた後に出現。これを最後まで聞くと表クリア条件達成＆SEC-12発見・解除）
  // ==========================================
  {
    id: 'p2_why_hide_truth',
    thoughtText: 'なぜナタリアやルークに会わず身を隠すのか聞く',
    phase2Tab: '追求',
    contextCategory: 'core',
    sensitiveToBadMood: true,
    prioritySlot1: true,
    requireLinkTag: 'phase2_started',
    requireTrust: 3,
    stages: [
      {
        spokenText:
          '・・・・・・なあ。どうしてバチカルへ帰らないんだ？　ナタリアにも会わず、こんな研究所に身を置いているのはなぜだ？',
        aschText:
          '・・・・・・帰る場所などない。俺は3年前のエルドラントで、確かに死んだはずなんだ。\nこれ以上その話を蒸し返すな。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
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
          '対象が最も隠したがっている個人的本音（SEC-12）をロック領域として捕捉しました。',
        replyOptions: [
          {
            id: 'p2_why_hide_reply_step_in',
            thoughtText: '「今のその身体を見られるのが嫌なのか？」と静かに聞く',
            spokenText:
              '・・・・・・今のその身体を見られるのが嫌なのか？　それとも、1年前に戻ってきたルークのことを気にしているのか。',
            aschText:
              '・・・・・・あいつが戻っているなら、それでいいだろう。\n死んだはずの俺が、なぜこんな機械の身体でまだ動いているのか、俺自身にも分からん。・・・・・・自分が何なのかも分からないまま、今さら誰の前に出られる。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'frown',
              effects: [],
            },
            moodDelta: 1,
            trustDelta: 2,
            naturalUnlockSectorId: 'SEC-12',
            grantsLinkTags: ['p2_heard_true_reason'],
            oralInfo: {
              id: 'oral-p2-true-reason',
              category: '情動反応',
              title: '身を隠す理由と自己同一性の揺らぎ',
              content:
                '1年前に帰還したルークたちの平穏を乱したくないという思いとともに、エルドラントで死んだはずの自分がなぜ機械の身体で動いているのか自分自身にも分からず、自分が何者かも曖昧なまま誰の前にも出られないという本音が語られた。',
            },
            systemLog:
              '対象が最も隠したがっていた個人的本音（SEC-12）を対話により開示しました。',
            followUpOptions: [
              {
                id: 'p2_why_hide_reply_nod',
                thoughtText: '「・・・・・・そういうことか。無理に誰にも言わないよ」と頷く',
                spokenText:
                  '・・・・・・そういうことか。\n分かったよ。おまえがそういう気持ちでいるなら、俺からナタリアやルークに話すことはしない。',
                aschText:
                  '・・・・・・ふん、最初からそうしろ。\n・・・・・・それと、これ以上俺の頭の中を勝手に詮索するなよ。',
                expression: 'look_away',
                faceParts: {
                  brow: 'sad',
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
            id: 'p2_why_hide_reply_back_off',
            thoughtText: '「・・・・・・分かった、無理には聞かないよ」と一旦引き下がる',
            spokenText:
              '・・・・・・そうか。おまえがそこまで言いたくないなら、無理には聞かないでおくよ。',
            aschText:
              '・・・・・・ああ。余計な詮索はするな。',
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

  // 【軸A-1】なぜよりによって「10歳の姿」なのか（予備素体の皮肉）
  {
    id: 'p2_why_10yo_body',
    thoughtText: 'なんでよりによって、その「10歳の姿」なのか聞く',
    phase2Tab: '追求',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_tarlow_history',
    stages: [
      {
        spokenText:
          'それにしても・・・・・・なんでよりによって、その『10歳の頃の姿』なんだ？',
        aschText:
          '・・・・・・俺が選んだわけじゃない。\n昔、万が一レプリカの生成が滞った時の『場繋ぎ』として造られていた予備の素体だ。ディストの研究所に転がっていたのが、これしかなかっただけだ。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'away',
          mouth: 'frown',
          effects: [],
        },
        trustDelta: 1,
        oralInfo: {
          id: 'oral-10yo-spare-body',
          category: '機体ログ',
          title: '10歳当時の予備素体（場繋ぎ用モデル）の来歴',
          content:
            '現在の機体は、7年前にレプリカルークとの入れ替え計画が進行していた際、レプリカ生成が滞った場合の「完成までの場繋ぎ」として造られた10歳当時のアッシュを模した予備素体である。小型機体『タルロウA』大破に伴い、代替筐体として転用された。',
        },
        systemLog:
          '[機体ログ] 「10歳当時の予備素体（場繋ぎ用モデル）の来歴」をINFOへ記録しました。',
        replyOptions: [
          {
            id: 'p2_why_10yo_reply_irony',
            thoughtText: '「場繋ぎの予備、か・・・・・・皮肉な器だな」と言う',
            spokenText:
              '場繋ぎの予備、か・・・・・・おまえにとっては皮肉な器だな。',
            aschText:
              '・・・・・・まったくだ。造り物をあれだけ忌み嫌っていた俺が、10歳の自分の抜け殻に入っているんだからな。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'frown',
              effects: [],
            },
            trustDelta: 1,
            completesTopic: true,
          },
          {
            id: 'p2_why_10yo_reply_better_than_tarlow',
            thoughtText: '「小型のタルロウAよりはマシだったのか？」と聞く',
            spokenText:
              '小型のタルロウAよりは、今の姿のほうがマシだったのか？',
            aschText:
              '・・・・・・視線が低いのは気に食わないが、手足があって剣を握れるだけ、あの鉄くずよりはマシだ。',
            expression: 'normal',
            faceParts: {
              brow: 'normal',
              eyes: 'away',
              mouth: 'close',
              effects: [],
            },
            moodDelta: 1,
            trustDelta: 1,
            completesTopic: true,
          },
        ],
      },
    ],
  },

  // 【軸A-2】その身体で眠ったり夢を見たりするのか（音機関の休止状態と喪失感）
  {
    id: 'p2_sleep_and_dreams',
    thoughtText: 'その身体で、夜に眠ったり夢を見たりすることはあるのか聞く',
    phase2Tab: '雑談',
    contextCategory: 'body',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
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
        trustDelta: 1,
        oralInfo: {
          id: 'oral-sleep-and-dreams',
          category: '機体ログ',
          title: '休止モードと睡眠・夢の欠如',
          content:
            '本機体に生体的な睡眠機能および夢を見る機能は未実装。夜間は音機関の出力を低下させた休止状態へ移行するのみである。再起動のたびに胸部の駆動振動によって生身ではない現実を自覚させられている。',
        },
        systemLog:
          '[機体ログ] 「休止モードと睡眠・夢の欠如」をINFOへ記録しました。',
        replyOptions: [
          {
            id: 'p2_sleep_reply_wake_feeling',
            thoughtText: '「目が覚めた時、変な感じがしないか？」と聞く',
            spokenText:
              'そうか・・・・・・。目が覚めた時、変な感じがしないか？',
            aschText:
              '・・・・・・ああ。意識が戻るたびに、胸の中で音機関が回る微かな振動だけが響く。\n・・・・・・そのたびに、自分がもう人間じゃないことを嫌でも思い出させられる。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'frown',
              effects: [],
            },
            trustDelta: 2,
            completesTopic: true,
          },
        ],
      },
    ],
  },

  // 【軸B-1】これからどうするつもりなのか（どこにも居場所がない現実）
  {
    id: 'p2_future_whereabouts',
    thoughtText: 'これからどうするつもりなのか、ディストの所へ戻るのか聞く',
    phase2Tab: '追求',
    contextCategory: 'core',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_friends_news',
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
              '・・・・・・ない。\nバチカルにも戻れん。騎士団にも俺の席はない。・・・・・・かといって、こんな身体でどこへ行けと言うんだ。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'down',
              mouth: 'frown',
              effects: [],
            },
            trustDelta: 2,
            oralInfo: {
              id: 'oral-future-whereabouts',
              category: '情動反応',
              title: '帰属先の喪失と身の振り方への迷い',
              content:
                '発言：「バチカルにも戻れん。騎士団にも俺の席はない。・・・・・・かといって、こんな身体でどこへ行けと言うんだ。」\n\n【分析】 音素出力波形を解析。ディストの研究所への帰還を忌避する一方、バチカルの屋敷や神託の盾騎士団にも自身の居場所はないと強く認識しており、帰属先の完全な喪失による深い孤立波形を検出。',
            },
            systemLog:
              '[情動反応] 「帰属先の喪失と身の振り方への迷い」の分析カルテをINFOへ自動記録しました。',
            completesTopic: true,
          },
        ],
      },
    ],
  },

  // 【軸C-1】10歳の姿とファブレ屋敷時代の因縁（綺麗事ではないガイとの関係）
  {
    id: 'p2_manor_memories',
    thoughtText: 'その10歳の姿を見ていると、屋敷にいた頃を思い出すと話す',
    phase2Tab: '追求',
    contextCategory: 'past',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    stages: [
      {
        spokenText:
          '・・・・・・その10歳の姿を目の前にしていると、どうしてもファブレの屋敷にいた頃を思い出すよ。',
        aschText:
          '・・・・・・ふん。俺がヴァンに攫われる前のことか。',
        expression: 'normal',
        faceParts: {
          brow: 'normal',
          eyes: 'normal',
          mouth: 'close',
          effects: [],
        },
        trustDelta: 1,
        replyOptions: [
          {
            id: 'p2_manor_reply_past_revenge',
            thoughtText: '「あの頃の俺は、復讐しようとずっと機会を窺っていた」と話す',
            spokenText:
              'ああ。あの頃の俺は、おまえたちファブレ一族を恨んで、隙あらば復讐しようとずっと機会を窺っていた。\n・・・・・・まさか何年も経って、あの時と同じ姿のおまえとこうして向き合うことになるとはな。',
            aschText:
              '・・・・・・おまえがそういう目で俺を見ていたことくらい、後から全部知った。\n・・・・・・だからこそ、おまえの前では変に繕う気も起きないんだろうな。昔からおまえは、俺を甘やかすような人間じゃなかったからな。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'away',
              mouth: 'close',
              effects: [],
            },
            moodDelta: 1,
            trustDelta: 2,
            oralInfo: {
              id: 'oral-manor-memories',
              category: '情動反応',
              title: 'ファブレ邸時代の因縁とガイに対する心理的距離',
              content:
                '発言：「・・・・・・おまえがそういう目で俺を見ていたことくらい、後から全部知った。だからこそ、おまえの前では変に繕う気も起きないんだろうな。」\n\n【分析】 音素出力波形を解析。かつて復讐対象として自身を狙っていたガイの過去を把握した上で、同情や綺麗事を向けない相手だからこそ防衛機制が緩むという特異な信頼波形を検出。',
            },
            systemLog:
              '[情動反応] 「ファブレ邸時代の因縁とガイに対する心理的距離」の分析カルテをINFOへ自動記録しました。',
            completesTopic: true,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 【裏の秘密への段階的導入①：エルドラントの最期と空白の2年間（SEC-18 → SEC-19）】
  // ==========================================
  {
    id: 'p2_eldrant_and_blank',
    thoughtText: '3年前のエルドラントの後、どうなったのか聞く',
    phase2Tab: '追求',
    contextCategory: 'past',
    sensitiveToBadMood: true,
    requireLinkTag: 'talked_tarlow_history',
    stages: [
      {
        spokenText:
          '・・・・・・3年前のエルドラントの後、おまえがどうやって生き延びてディストの研究所にいたのか、ずっと気になっていたんだ。あそこで何が起きたか覚えているか？',
        aschText:
          '・・・・・・崩れるエルドラントの中で、あいつ・・・・・・ルークが俺を抱えて、眩しい光の中で音素乖離を起こしたことまでは覚えている。\n・・・・・・だが、その後のことは考えるな。妙に頭が重くなる。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'close',
          effects: [],
        },
        capturedProtect: {
          sectorId: 'SEC-18',
          capturedQuote:
            '「・・・・・・ルークが俺を抱えて、眩しい光の中で音素乖離を起こしたことまでは覚えている。」',
          capturedContext: '3年前のエルドラント崩落時の記憶について尋ねた際の発言',
        },
        systemLog:
          'エルドラント崩落時の最終記憶（SEC-18）をロック領域として捕捉しました。',
        replyOptions: [
          {
            id: 'p2_eldrant_reply_step_in',
            thoughtText: 'タルロウAになるまでの2年間、何をしていたのか聞く',
            spokenText:
              'エルドラントが崩れたのは3年前で、おまえがタルロウAになったのは1年前だろ？　その間の2年間、どこで何をしていたのかも覚えていないのか？',
            aschText:
              '・・・・・・っ、くそ・・・・・・妙だな。その2年間のことだけ、頭の中に靄がかかったみたいに何も出てこない・・・・・・。\n・・・・・・チッ、思い出そうとするとノイズが走る。この話はやめだ。',
            expression: 'pain',
            faceParts: {
              brow: 'pain',
              eyes: 'down',
              mouth: 'frown',
              effects: ['sweat'],
            },
            voiceEffects: ['tremble', 'normal'],
            naturalUnlockSectorId: 'SEC-18',
            capturedProtect: {
              sectorId: 'SEC-19',
              capturedQuote:
                '「・・・・・・その2年間のことだけ、頭の中に靄がかかったみたいに何も出てこない・・・・・・。」',
              capturedContext:
                'エルドラントから1年前までの「空白の2年間」について尋ねた際の発言',
            },
            grantsLinkTags: ['talked_eldrant_blank'],
            oralInfo: {
              id: 'oral-eldrant-blank',
              category: '深層記憶',
              title: '空白の2年間に関する記憶欠落とノイズ反応',
              content:
                'エルドラントでルークが音素乖離を起こした瞬間までは記憶しているものの、それから1年前に『タルロウA』として稼働するまでの2年間の記憶がすっぽりと欠落しており、参照しようとするとノイズが走ることが判明した。',
            },
            systemLog:
              '【WARNING】対象の記憶領域に人為的なアクセス遮断（SEC-19）を検知しました。',
            completesTopic: true,
          },
          {
            id: 'p2_eldrant_reply_back_off',
            thoughtText: '「・・・・・・いや、無理に思い出させようとして悪かった」と引く',
            spokenText:
              '・・・・・・そうか。無理に掘り返すようなことを聞いて悪かったよ。',
            aschText:
              '・・・・・・ふん。過ぎたことをいつまでも蒸し返すな。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'away',
              mouth: 'close',
              effects: [],
            },
            naturalUnlockSectorId: 'SEC-18',
            capturedProtect: {
              sectorId: 'SEC-19',
              capturedQuote:
                '「・・・・・・だが、その後のことは考えるな。妙に頭が重くなる。」',
              capturedContext:
                'エルドラント崩落後の記憶について尋ねた際の発言',
            },
            grantsLinkTags: ['talked_eldrant_blank'],
            completesTopic: true,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 【裏の秘密への段階的導入②：2ヶ月前にタルロウAが壊れた理由と頭痛発作（→ SEC-20）】
  // ==========================================
  {
    id: 'p2_tarlow_broken_reason',
    thoughtText: '2ヶ月前にタルロウAが壊れた理由に心当たりはないか聞く',
    phase2Tab: '追求',
    contextCategory: 'core',
    sensitiveToBadMood: true,
    prioritySlot1: true,
    requireLinkTag: 'talked_eldrant_blank',
    stages: [
      {
        spokenText:
          '・・・・・・なあ、アッシュ。さっき『2ヶ月前にタルロウAが壊れた理由は覚えていない』って言っていたよな。本当に、何があって壊れたのか少しも心当たりはないのか？',
        aschText:
          '・・・・・・っ、ぐ・・・・・・ッ！！　な、なんだ・・・・・・急に頭の中が・・・・・・っ！\n・・・・・・やめろ、それ以上聞くな・・・・・・っ！　考えようとすると、思考回路が焼き切れそうになる・・・・・・っ！',
        expression: 'pain',
        faceParts: {
          brow: 'pain',
          eyes: 'pain',
          mouth: 'grit',
          effects: ['pale', 'sweat', 'noise'],
        },
        voiceEffects: ['tremble_glitch', 'shout_glitch'],
        capturedProtect: {
          sectorId: 'SEC-20',
          capturedQuote:
            '「・・・・・・やめろ、それ以上聞くな・・・・・・っ！　考えようとすると、思考回路が焼き切れそうになる・・・・・・っ！」',
          capturedContext:
            '2ヶ月前にタルロウAが壊れた理由を思い出そうとして頭痛・ノイズ発作を起こした際の発言',
        },
        grantsLinkTags: ['talked_tarlow_broken'],
        systemLog:
          '【CRITICAL】対象の思考回路に激しい防衛ノイズが発生。最下層にディストの厳重封印セクター（DP-020）を検出しました。',
        replyOptions: [
          {
            id: 'p2_broken_reply_rest',
            thoughtText: '無理に思い出さなくていい、今は休めと声をかける',
            spokenText:
              '・・・・・・おい、大丈夫か！？　悪かった、もう何も聞かないから今は黙って休め！',
            aschText:
              '・・・・・・はぁ、はぁ・・・・・・チッ、うるさい・・・・・・ただの初期不良だ。大騒ぎするな・・・・・・っ。',
            expression: 'look_away',
            faceParts: {
              brow: 'pain',
              eyes: 'down',
              mouth: 'frown',
              effects: ['pale', 'sweat'],
            },
            voiceEffects: ['tremble'],
            moodDelta: 1,
            trustDelta: 1,
            completesTopic: true,
          },
          {
            id: 'p2_broken_reply_lock_suspect',
            thoughtText: 'ディストの奴、その記憶にもロックをかけてやがるのかと呟く',
            spokenText:
              '・・・・・・おい、無理をするな！　・・・・・・ディストの奴、2ヶ月前の記憶にも強固なロックをかけてやがるのか・・・・・・。',
            aschText:
              '・・・・・・はぁ、はぁ・・・・・・知らん。あいつが俺の頭の中をどう弄ったかなど、俺が知るわけないだろう・・・・・・っ。',
            expression: 'look_away',
            faceParts: {
              brow: 'pain',
              eyes: 'away',
              mouth: 'grit',
              effects: ['pale', 'sweat'],
            },
            voiceEffects: ['tremble'],
            trustDelta: 1,
            completesTopic: true,
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
    thoughtText: '【DP-002/003】『記憶の分離と自壊』の真実に触れる',
    phase2Tab: '端末',
    contextCategory: 'core',
    prioritySlot1: true,
    requireLinkTag: 'climax_ready',
    stages: [
      {
        spokenText:
          '・・・・・・なあ、アッシュ。さっきから少し考え事をしていたんだが・・・・・・今のままディストの研究所とここを往復するばかりで、おまえ自身は本当にそれでいいのか？',
        aschText:
          '・・・・・・なんだ、藪から棒に。さっきから妙に神妙なツラをして、こっちの顔をジロジロ見やがって。\n言いたいことがあるなら、回りくどい真似をせずにはっきり言え。',
        expression: 'normal',
        faceParts: {
          brow: 'doubt',
          eyes: 'normal',
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
              '・・・・・・いや、おまえが覚えていないならそれでいいんだ。ただ・・・・・・1年前にルークがタタル渓谷へ戻ってこられたのは、おまえのおかげだったんだなと思ってさ。',
            aschText:
              '・・・・・・は？　何の話だ、気色の悪い。\n俺があいつのために何かした覚えなどない。勝手に妙な感謝をするな。',
            expression: 'look_away',
            faceParts: {
              brow: 'doubt',
              eyes: 'away',
              mouth: 'frown',
              effects: [],
            },
            moodDelta: 1,
            trustDelta: 1,
            followUpOptions: [
              {
                id: 'p2_dilemma_a_step2_warm',
                thoughtText: '「おまえが消えずに生きていることも良かったと思う」',
                spokenText:
                  '感謝くらいさせろよ。おまえは覚えていなくても、おまえがどれだけ苦しんであいつの居場所を守ろうとしたか、俺には分かる。\n・・・・・・それに、どんな形であれ、おまえが今こうして消えずに生きていることも、俺は本当に良かったと思ってるよ。',
                aschText:
                  '・・・・・・っ、ば、馬鹿か貴様は・・・・・・！　こんな10歳のガキみたいな機械の身体で生き恥を晒しているどこが良かっただ・・・・・・。\n・・・・・・だが、まあ・・・・・・おまえがどうしてもそう思い込みたいなら、好きにしろ。',
                expression: 'look_away',
                faceParts: {
                  brow: 'sad',
                  eyes: 'away',
                  mouth: 'frown',
                  effects: ['blush', 'sweat'],
                },
                moodDelta: 1,
                trustDelta: 2,
                followUpOptions: [
                  {
                    id: 'p2_dilemma_a_step3_never_break',
                    thoughtText: '「二度と自分の身体を壊すような真似はするなよ」',
                    spokenText:
                      '・・・・・・ああ、そうだな。とにかく、理由がどうであれ、もう二度と自分の身体を壊すような真似だけはするなよ。\nディストの研究所が息苦しくなったら、いつでもここへ茶を飲みにくればいい。',
                    aschText:
                      '・・・・・・ふん、誰が来るか。馬鹿にするな。\n・・・・・・だが、おまえの淹れる茶がもう少しマシになったら、暇つぶしに寄ってやらなくもない。',
                    expression: 'normal',
                    faceParts: {
                      brow: 'smile',
                      eyes: 'away',
                      mouth: 'close',
                      effects: ['blush'],
                    },
                    moodDelta: 2,
                    trustDelta: 2,
                    grantsLinkTags: ['p2_dilemma_resolved', 'p2_dilemma_kept_secret'],
                    oralInfo: {
                      id: 'oral-dilemma-secret-kept',
                      category: '情動反応',
                      title: '封印記録の秘匿と対象機体の精神的安定',
                      content:
                        'ガイは端末で閲覧した記憶分離および自壊未遂の記録を対象に明かさず、胸の内に秘めたまま献身を労う選択を取った。対象は反発しつつも高い精神安定性を示している。',
                    },
                    completesTopic: true,
                  },
                  {
                    id: 'p2_dilemma_a_step3_keep_quiet',
                    thoughtText: '「思い出したくないことは俺の胸にしまっておくよ」',
                    spokenText:
                      '・・・・・・ああ。おまえが思い出したくないことも、言いたくないことも、全部俺の胸の内にしまっておくよ。誰にも話すつもりはない。',
                    aschText:
                      '・・・・・・最初からそうしろ。おまえは昔から、余計なところにばかり首を突っ込みすぎるんだ。\n・・・・・・だが、まあ・・・・・・悪くはなかった。',
                    expression: 'look_away',
                    faceParts: {
                      brow: 'normal',
                      eyes: 'away',
                      mouth: 'close',
                      effects: ['blush'],
                    },
                    moodDelta: 2,
                    trustDelta: 2,
                    grantsLinkTags: ['p2_dilemma_resolved', 'p2_dilemma_kept_secret'],
                    oralInfo: {
                      id: 'oral-dilemma-secret-kept',
                      category: '情動反応',
                      title: '封印記録の秘匿と対象機体の精神的安定',
                      content:
                        'ガイは端末で閲覧した記憶分離および自壊未遂の記録を対象に明かさず、胸の内に秘めたまま献身を労う選択を取った。対象は反発しつつも高い精神安定性を示している。',
                    },
                    completesTopic: true,
                  },
                ],
              },
              {
                id: 'p2_dilemma_a_step2_past_avenger',
                thoughtText: '「復讐を狙っていた俺が言うのも虫がいいよな」と吐露する',
                spokenText:
                  '・・・・・・昔、ファブレ公爵家で復讐の機会ばかり窺っていた俺がこんなことを言うのは、虫が良すぎるよな。\nそれでも、おまえが全部ひとりで背負って消えようとしていたなんて知ったら、知らん顔なんてできないだろ。',
                aschText:
                  '・・・・・・ふん。今さら昔の復讐の話など持ち出すな。おまえが何を背負ってあの屋敷にいたかなど、とっくに知っている。\n・・・・・・俺に同情する暇があるなら、自分の心配でもしていろ。',
                expression: 'look_away',
                faceParts: {
                  brow: 'sad',
                  eyes: 'down',
                  mouth: 'close',
                  effects: [],
                },
                moodDelta: 1,
                trustDelta: 2,
                followUpOptions: [
                  {
                    id: 'p2_dilemma_a_step3_avenger_reply',
                    thoughtText: '「同情じゃない。二度と自分を壊す無茶はするなよ」',
                    spokenText:
                      '同情なんかじゃないさ。・・・・・・ただ、もう二度と自分を壊すような無茶だけはするなよ。それだけは約束してくれ。',
                    aschText:
                      '・・・・・・しつこい奴だな。勝手に壊れたりしないから、そんな面倒な顔をさっさと引っ込めろ。',
                    expression: 'look_away',
                    faceParts: {
                      brow: 'normal',
                      eyes: 'away',
                      mouth: 'close',
                      effects: ['blush'],
                    },
                    moodDelta: 1,
                    trustDelta: 2,
                    grantsLinkTags: ['p2_dilemma_resolved', 'p2_dilemma_kept_secret'],
                    oralInfo: {
                      id: 'oral-dilemma-secret-kept',
                      category: '情動反応',
                      title: '封印記録の秘匿と対象機体の精神的安定',
                      content:
                        'ガイは端末で閲覧した記憶分離および自壊未遂の記録を対象に明かさず、胸の内に秘めたまま献身を労う選択を取った。対象は反発しつつも高い精神安定性を示している。',
                    },
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
              '・・・・・・さっき、2ヶ月前にタルロウAの機体が壊れた時のことを聞いた時、ひどく苦しそうにしていただろ。\nあれは初期不良でもディストの実験でもなくて、おまえ自身が何か無茶をしたせいだったんじゃないのか？',
            aschText:
              '・・・・・・チッ、まだその話を蒸し返す気か。\nあの変態が俺の機体を弄くり回すのは今に始まったことじゃないが・・・・・・あの時の損傷は、あいつのせいじゃない。理由は思い出せんが、俺自身の問題だ。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'away',
              mouth: 'frown',
              effects: [],
            },
            followUpOptions: [
              {
                id: 'p2_dilemma_b_step2_selfharm',
                thoughtText: '「まさか自分で自分の機体を壊そうとしたのか」と迫る',
                spokenText:
                  '・・・・・・おまえ自身の問題って、どういう意味だ？　外敵に襲われたわけでも、ディストの実験でもないなら・・・・・・まさかおまえ、自分で自分の機体を壊そうとしたんじゃないだろうな。',
                aschText:
                  '・・・・・・っ！？　な、何を根拠にそんなことを言う・・・・・・！\n俺が自分で自分を壊すわけがないだろう・・・・・・と言いたいところだが、妙だな。おまえにそう言われた途端、胸の奥がざわつく・・・・・・。',
                expression: 'shock',
                faceParts: {
                  brow: 'pain',
                  eyes: 'wide',
                  mouth: 'frown',
                  effects: ['sweat'],
                },
                voiceEffects: ['tremble', 'normal'],
                followUpOptions: [
                  {
                    id: 'p2_dilemma_b_step3_dont_throw_away',
                    thoughtText: '「機械だからって粗末にするな。消えたら悲しむ奴がいる」',
                    spokenText:
                      '・・・・・・やっぱりそうだったのか。いいか、機械の身体だからって自分を粗末にするなよ。今ここにいるおまえが消えたら、後味の悪い思いをする人間がここにいるんだからな。',
                    aschText:
                      '・・・・・・っ、大げさなことを言うな！　俺はもう3年前にエルドラントで死んだ身だ。\n・・・・・・だが、おまえにまでそんな顔をされるのは業腹だ。もう勝手に壊れたりしないから、その話は終わりにしろ。',
                    expression: 'look_away',
                    faceParts: {
                      brow: 'angry',
                      eyes: 'away',
                      mouth: 'close',
                      effects: ['blush'],
                    },
                    moodDelta: 1,
                    trustDelta: 2,
                    grantsLinkTags: ['p2_dilemma_resolved'],
                    oralInfo: {
                      id: 'oral-dilemma-indirect-care',
                      category: '情動反応',
                      title: '自壊未遂への遠回しな牽制と生存肯定',
                      content:
                        '封印された記憶の詳細は伏せつつ、2ヶ月前の機体損傷（自壊未遂）について無茶をしないよう釘を刺した。対象は記憶の欠落に違和感を抱きながらも、ガイの制止を受け入れた。',
                    },
                    completesTopic: true,
                  },
                  {
                    id: 'p2_dilemma_b_step3_dist_lock',
                    thoughtText: '「ディストのロックも無茶をさせないためかもな」と呟く',
                    spokenText:
                      '・・・・・・あのディストが珍しくおまえの記憶に強固なロックをかけたのも、おまえがまた自分を傷つけるような無茶をしないためだったのかもしれないな。',
                    aschText:
                      '・・・・・・ハッ、あの変態がそんな殊勝な理由で動くものか。どうせ貴重なサンプルを壊されたくなかっただけだろう。\n・・・・・・まあいい。思い出せないことは、今の俺には必要のないことだ。',
                    expression: 'look_away',
                    faceParts: {
                      brow: 'sad',
                      eyes: 'away',
                      mouth: 'close',
                      effects: [],
                    },
                    trustDelta: 1,
                    grantsLinkTags: ['p2_dilemma_resolved'],
                    oralInfo: {
                      id: 'oral-dilemma-indirect-care',
                      category: '情動反応',
                      title: '自壊未遂への遠回しな牽制と生存肯定',
                      content:
                        '封印された記憶の詳細は伏せつつ、ディストによるロックの意図に言及した。対象は思い出せない過去を深追いしない姿勢を示している。',
                    },
                    completesTopic: true,
                  },
                ],
              },
              {
                id: 'p2_dilemma_b_step2_body_change',
                thoughtText: '「今の身体に乗り換えて少しは落ち着いたか？」と聞く',
                spokenText:
                  '思い出せないなら無理にとは言わないよ。ただ、タルロウAから今の10歳の身体に乗り換えて、少しは気持ちも落ち着けたのか？',
                aschText:
                  '・・・・・・背が縮んで視線が低いのは相変わらず腹が立つがな。\nあの箱みたいな鉄塊に入っていた頃よりは、こうして手足が動く人間の形になっただけマシだ。',
                expression: 'normal',
                faceParts: {
                  brow: 'normal',
                  eyes: 'away',
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
                      '・・・・・・ふん、誰が無茶などするか。余計な心配をするな。',
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
              '・・・・・・隠さずに言うぞ、アッシュ。さっきこの端末の奥にあったディストの封印記録を見た。\nルークと混ざり合った記憶をディストが音機関で2つに切り分けた・・・・・・そしておまえは、切り離されて消去されるはずだった記憶で、2ヶ月前にそれを知って自壊しようとしたって書いてあるじゃないか！！',
            aschText:
              '・・・・・・なっ！？　貴様、勝手にあの端末の奥をこじ開けたのか・・・・・・ッ！？\n・・・・・・やめろ、そんな記録は知らん！！　人の頭の中を勝手に暴くな！！',
            expression: 'shock',
            faceParts: {
              brow: 'angry',
              eyes: 'wide',
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
                  '・・・・・・っ、やめろ、ガイ！！　それ以上言うな・・・・・・ッ！！\nあいつは・・・・・・タタル渓谷へ戻ったあいつは本物に決まっているだろう！！　・・・・・・っ、ぐ、うあああっ！！　頭が・・・・・・またノイズが・・・・・・ッ！！',
                expression: 'pain',
                faceParts: {
                  brow: 'pain',
                  eyes: 'pain',
                  mouth: 'shout',
                  effects: ['pale', 'sweat', 'noise'],
                },
                voiceEffects: ['shout_glitch', 'tremble_glitch'],
                moodDelta: -2,
                hatredDelta: 1,
                followUpOptions: [
                  {
                    id: 'p2_dilemma_c_step3_blame_asch',
                    thoughtText: '「そんな自己犠牲も、ディストの切り分けもあんまりじゃないか！」',
                    spokenText:
                      'あんまりじゃないか、そんなの・・・・・・！　ルークを帰すために、おまえがひとりで記憶を切り離して、自分を壊そうとまでしていたなんて・・・・・・！\nしかも、こんな切り分け方をされたせいで、目の前のおまえも、タタル渓谷へ帰ってきたルークも、どこまでが本人なのか分からないなんて残酷すぎるだろ・・・・・・っ！！',
                    aschText:
                      '・・・・・・っ、うるさい、黙れ・・・・・・っ！！　俺にどうしろと言うんだ・・・・・・！！\nまたあの研究所へ戻されて、自分が何なのかも分からないまま機械の身体を持て余すくらいなら、今ここでおまえの剣で俺を壊せ、ガイ・・・・・・ッ！！',
                    expression: 'pain',
                    faceParts: {
                      brow: 'pain',
                      eyes: 'wide',
                      mouth: 'shout',
                      effects: ['pale', 'sweat', 'tears', 'noise'],
                    },
                    voiceEffects: ['shout_glitch', 'tremble_glitch'],
                    followUpOptions: [
                      {
                        id: 'p2_dilemma_c_step4_mercy_destroy',
                        thoughtText: '「・・・・・・分かった。おまえをこれ以上苦しませない」と剣を抜く',
                        spokenText:
                          '・・・・・・っ、アッシュ・・・・・・！\n・・・・・・分かった。おまえをこれ以上、機械の身体に縛りつけて苦しませたりしない。・・・・・・俺の手で終わらせてやる。おやすみ、アッシュ。',
                        aschText:
                          '・・・・・・ああ。・・・・・・最初から、こうなるべきだったんだ・・・・・・。\n・・・・・・悪かったな、ガイ・・・・・・。',
                        expression: 'normal',
                        faceParts: {
                          brow: 'sad',
                          eyes: 'close',
                          mouth: 'close',
                          effects: ['pale', 'tears'],
                        },
                        voiceEffects: ['tremble'],
                        grantsLinkTags: ['phase3_triggered'],
                        systemLog:
                          '【SYSTEM HALT】被験体の中枢コアに対する物理的破壊を確認。全機能が停止しました。',
                        completesTopic: true,
                        triggersEndingKey: 'END_PHASE3_MERCY_DESTROY',
                      },
                      {
                        id: 'p2_dilemma_c_step4_total_collapse',
                        thoughtText: '「壊せるわけないだろ！ だが誰が本物なのかもう分からない」と立ち尽くす',
                        spokenText:
                          '・・・・・・俺の手でおまえを壊せるわけないだろ・・・・・・！\nだけど、機械の身体に記憶だけがあるおまえを『アッシュじゃない』としたら、アッシュの身体にルークの記憶だけがあるタタル渓谷のルークも『ルークじゃない』ことになる・・・・・・っ。こんな記録、見るんじゃなかった・・・・・・！！',
                        aschText:
                          '・・・・・・そうか。・・・・・・道理で、目が覚めた時からずっと空っぽなわけだ。\n・・・・・・もういい。二度と俺に関わるな、ガイ。',
                        expression: 'empty',
                        faceParts: {
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
                          '【PARADOX CRITICAL】同一性崩壊（スワンプマン・パラドックス）が発生。対話継続不能につき破滅結末へ遷移します。',
                        completesTopic: true,
                        triggersEnding: 'DESTROY',
                      },
                    ],
                  },
                  {
                    id: 'p2_dilemma_c_step3_question_selfharm',
                    thoughtText: '「自壊しようとしたのも本物じゃないと知ったからか？」',
                    spokenText:
                      '・・・・・・おまえが2ヶ月前にタルロウAの身体を自分で壊そうとしたのも、その記録を見て、自分が『ルークから切り離された記憶』だと気付いたからなのか・・・・・・？\n答えろよ！　おまえがただの記憶データなら、タタル渓谷に帰ってきたルークも本物じゃないっていうのかよ・・・・・・！？',
                    aschText:
                      '・・・・・・っ、知らん！！　俺は何も覚えていないと言っているだろうが・・・・・・っ！！\nやめろ、それ以上その記録を読み上げるな・・・・・・！　頭の中が軋んで、本当に思考回路が焼き切れる・・・・・・っ！！',
                    expression: 'pain',
                    faceParts: {
                      brow: 'pain',
                      eyes: 'pain',
                      mouth: 'shout',
                      effects: ['pale', 'sweat', 'tears', 'noise'],
                    },
                    voiceEffects: ['shout_glitch', 'tremble_glitch'],
                    followUpOptions: [
                      {
                        id: 'p2_dilemma_c_step4_push_paradox',
                        thoughtText: '「おまえもルークも、機械で切り分けた複製じゃないか！」',
                        spokenText:
                          'ごまかすなよ！！　機械の身体にアッシュの記憶だけがあるおまえがアッシュじゃないなら、アッシュの身体にルークの記憶だけがあるタタル渓谷のルークも、本物のルークじゃないことになるじゃないか！！',
                        aschText:
                          '・・・・・・そうか。おまえがそう言うなら、そうなんだろうな。\n・・・・・・道理で、目が覚めた時からずっと空っぽなわけだ。・・・・・・もういい、二度と俺に構うな。',
                        expression: 'empty',
                        faceParts: {
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
                          '【PARADOX CRITICAL】同一性崩壊（スワンプマン・パラドックス）が発生。対話継続不能につき破滅結末へ遷移します。',
                        completesTopic: true,
                        triggersEnding: 'DESTROY',
                      },
                      {
                        id: 'p2_dilemma_c_step4_bitter_stop',
                        thoughtText: '青褪めるアッシュにハッとし「・・・・・・悪かった」と口を噤む',
                        spokenText:
                          '・・・・・・っ、くそ・・・・・・俺は一体、誰に向かって何を八つ当たりしてるんだ・・・・・・。\n・・・・・・悪かった、アッシュ。今言ったことは全部取り消す。これ以上はもう、何も言わない・・・・・・。',
                        aschText:
                          '・・・・・・はぁ、はぁ・・・・・・今さら取り消せるわけがないだろうが・・・・・・。\n・・・・・・勝手な真似をしやがって。しばらく俺に話しかけるな・・・・・・っ。',
                        expression: 'glare',
                        faceParts: {
                          brow: 'pain',
                          eyes: 'away',
                          mouth: 'grit',
                          effects: ['pale', 'sweat'],
                        },
                        voiceEffects: ['tremble'],
                        moodDelta: -3,
                        hatredDelta: 1,
                        grantsLinkTags: ['p2_dilemma_resolved', 'p2_dilemma_bitter_scar'],
                        oralInfo: {
                          id: 'oral-dilemma-bitter-scar',
                          category: '情動反応',
                          title: '封印記録の暴露による深刻な亀裂',
                          content:
                            'ガイが端末の最下層記録を突きつけ、ルークおよびアッシュの同一性に対する疑念をぶつけたことで、両者の間に深刻な心理的亀裂が生じた。',
                        },
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
                  '・・・・・・っ、悪かった！！　おまえがそこまで拒絶するなら、もうこれ以上は言わない。\n勝手に端末の奥をこじ開けた俺が悪かったよ・・・・・・落ち着いてくれ、アッシュ。',
                aschText:
                  '・・・・・・はぁ、はぁ・・・・・・ふざけるな、人の頭の中を土足で踏み荒らしておいて、今さら謝って済むと思うなよ・・・・・・！\n・・・・・・その端末を今すぐ閉じろ。次にその記録の話を口にしたら、容赦しないからな・・・・・・っ。',
                expression: 'glare',
                faceParts: {
                  brow: 'angry',
                  eyes: 'glare',
                  mouth: 'grit',
                  effects: ['pale', 'sweat'],
                },
                voiceEffects: ['tremble', 'shout'],
                followUpOptions: [
                  {
                    id: 'p2_dilemma_c_step3_promise_silence',
                    thoughtText: '端末を脇へ置き「もう二度と口にはしない」と約束する',
                    spokenText:
                      '・・・・・・ああ、分かった。この記録のことは、もう二度と口にはしない。約束するよ。',
                    aschText:
                      '・・・・・・チッ。信用できるものか・・・・・・しばらくそこで黙っていろ。',
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
        faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
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
          '・・・・・・っ、それはこっちの台詞だ！　勝手に研究室から連れ出しておいて、指図される筋合いはない！！\nそんなに俺の態度が気に入らないなら、今すぐここから出て行ってやる！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: [] },
        voiceEffects: ['shout'],
        moodDelta: -4,
        guyMoodDelta: -2,
        grantsLinkTags: ['cold_clash_escalated'],
        systemLog: '【WARNING】双方の感情波形が険悪化。対立が深刻化しています。',
      },
    ],
  },

  // 双方が不機嫌モード（requireBothAngry）かつ衝突後に解放される「冷たい物理破壊」ルート
  {
    id: 'p2_cold_destroy_execution',
    thoughtText: '【機能停止】「その紛い物の機体、ここで壊してやる」と剣に手をかける',
    phase2Tab: '追求',
    contextCategory: 'fight',
    prioritySlot1: true,
    requireLinkTag: 'cold_clash_escalated',
    requireBothAngry: true,
    stages: [
      {
        spokenText:
          '・・・・・・もう沢山だ。こんな10歳の姿をした紛い物の機械、最初から造られるべきじゃなかったんだ。\nディストの研究所へなんか戻さない。今ここで、俺が機能を止めてやる。',
        aschText:
          '・・・・・・っ！？　き、貴様、本気で剣を抜く気か・・・・・・！？\n・・・・・・ふん、死に損ないの機械には、おまえの剣で壊されるくらいが相応しいか・・・・・・っ。',
        expression: 'shock',
        faceParts: { brow: 'pain', eyes: 'wide', mouth: 'grit', effects: ['pale', 'sweat'] },
        voiceEffects: ['tremble_glitch'],
        moodDelta: -5,
        guyMoodDelta: -5,
        completesTopic: true,
        triggersEndingKey: 'END_PHASE2_COLD_DESTROY',
      },
    ],
  },

  {
    id: 'p2_idle_weather',
    thoughtText: '窓の外の天気やグランコクマの気候について他愛のない話をする',
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
        faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
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
    thoughtText: '机の上に積んである音機関の資料について雑談する',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    idleChatter: true,
    requireLinkTag: 'phase2_started',
    stages: [
      {
        spokenText:
          '机の上の書類か？　最近また古代の音機関の調査を手伝っていて、資料が山積みになってるんだよ。',
        aschText:
          '・・・・・・おまえも相変わらずそういう古い機械いじりが好きだな。\nディストの研究所にも似たようなガラクタが山ほど転がっている。',
        expression: 'normal',
        faceParts: { brow: 'normal', eyes: 'normal', mouth: 'close', effects: [] },
        moodDelta: 1,
        trustDelta: 1,
        badMoodResponse: {
          aschText: '・・・・・・おまえは昔から機械いじりが好きだったな。',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
          moodDelta: 0,
        },
      },
    ],
  },

  {
    id: 'p2_awkward_silence',
    thoughtText: '少し言葉に詰まりつつ、静かにアッシュの様子を窺う',
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
