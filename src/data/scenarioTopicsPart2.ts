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
          'しかし、なんでまた『タルロウA』なんて名前で機械のフリをしていたんだ？　とっさに思いついた嘘にしては妙に具体的だったけど。',
        aschText:
          '・・・・・・でまかせじゃない。2ヶ月前まで、俺は本当に『タルロウA』という50センチくらいの小型機体に入っていた。\nおまえやあの眼鏡、ピオニーが研究所に来た時にも、何度か顔を合わせている。',
        expression: 'normal',
        faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
        trustDelta: 1,
        replyOptions: [
          {
            id: 'p2_tarlow_past_reply_why_silent',
            thoughtText: '研究所で会っていたなら、なぜ声をかけなかったか聞く',
            spokenText:
              'えっ・・・・・・あの研究所にいた赤い小型機体、おまえだったのか！？　なんでその時に声をかけてくれなかったんだ！',
            aschText:
              '・・・・・・俺がこんな機械になって生き永らえているなどと、気付かないならそれに越したことはないだろう。\n2ヶ月前にそのタルロウAが壊れて、この予備機体に入れ替えられた。',
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
              '・・・・・・笑いたければ笑え。2ヶ月前にそのタルロウAが壊れて、この予備機体に入れ替えられた。',
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
          'やかましい！　身長の話をするな！\n・・・・・・まあ、以前の50センチしかない鉄塊に比べれば、人間の形になったから以前よりマシだがな。',
        expression: 'glare',
        faceParts: {
          brow: 'angry',
          eyes: 'away',
          mouth: 'frown',
          effects: ['blush'],
        },
        trustDelta: 1,
        grantsLinkTags: ['hint_human_limbs', 'talked_old_appearance'],
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
            grantsLinkTags: ['hint_human_limbs'],
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
            grantsLinkTags: ['hint_human_limbs'],
          },
          {
            id: 'p2_height_reply_provoke',
            thoughtText: '「その小さな体じゃ剣もまともに振れないだろうな」と口にする',
            spokenText:
              '・・・・・・だが、その小さな体じゃ、もう昔みたいに剣もまともに振れないだろうな。',
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
            grantsLinkTags: ['hint_human_limbs'],
          },
        ],
      },
    ],
  },

  // 3. お茶と味覚・好き嫌いの話（ほのぼの日常）
  {
    id: 'p2_tea_and_taste',
    thoughtText: '紅茶の好み',
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
    thoughtText: '壁際の『宝刀ガルディオス』',
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
        naturalUnlockSectorId: 'SEC-06',
      },
    ],
  },
  {
    id: 'p2_galdios_sword_after_p1',
    thoughtText: '壁際の『宝刀ガルディオス』',
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
          'その身体、普段通り歩いたり喋ったりはできているみたいだけど、剣を振ったりもできるのか？',
        retrySpokenText:
          'さっきの剣の話だけど・・・・・・やっぱりその身体、動かす時に制限がかかっているのが気になるのか？',
        aschText:
          '・・・・・・できない。ディストが四肢に出力制限をかけてやがる。\n・・・・・・おまえに心配される筋合いはない。',
        retryAschText:
          '・・・・・・チッ、ディストが四肢に出力制限をかけてやがると言っただろう。まだ何か言いたいことがあるのか。',
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
            thoughtText: '「人間の手足に戻ったんだ、隠れて素振りくらい試したんじゃないか？」',
            spokenText:
              'せっかく人間の手足に戻ったんだ、おまえのことだから誰もいない時に隠れて素振りくらい試したんじゃないか？',
            aschText:
              '・・・・・・っ！　き、貴様、見ていたわけじゃないだろうな・・・・・・！\nチッ、少し強く踏み込んだだけでリミッターが作動して、足元が狂っただけだ。',
            expression: 'look_away',
            faceParts: { brow: 'angry', eyes: 'away', mouth: 'grit', effects: ['blush', 'sweat'] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'hint_human_limbs',
            naturalUnlockSectorId: 'SEC-08',
            grantsLinkTags: ['hint_sleep_dreams'],
            completesTopic: true,
          },
          {
            id: 'p2_sword_reply_wrong_giveup',
            thoughtText: '「その小さな体じゃ危ないし、もう剣は諦めて大人しくしていた方がいい」',
            spokenText:
              'その小さな体じゃ危ないし、もう剣は諦めて大人しくしていた方がいいんじゃないか？',
            aschText:
              '・・・・・・っ、やかましい！　貴様に俺の剣まで否定される覚えはない！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush'] },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_sword_reply_wrong_beg_dist',
            thoughtText: '「ディストに頼み込んで、出力制限を外してもらえばいいじゃないか」',
            spokenText:
              'そんなに不便なら、ディストに頼み込んで出力制限を外してもらえばいいじゃないか。',
            aschText:
              '・・・・・・あの変態に頭を下げろと言うのか？　冗談じゃない、いずれ自力で外してやる。',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: [] },
            moodDelta: -1,
            completesTopic: true,
          },
          {
            id: 'p2_sword_reply_back_off',
            thoughtText: '「・・・・・・そうか、無理には聞かないでおくよ」と一旦引く',
            spokenText:
              '・・・・・・そうか。無理には聞かないでおくよ。',
            aschText:
              '・・・・・・ふん、余計なお世話だ。',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
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
          '・・・・・・あの変態の趣味に付き合わされる身にもなってみろ。\n機体名にとんでもない名前をつけようとするわ、毎日何時間も自慢話を聞かされるわで、うるさくて仕方がない。',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['sweat'] },
        moodDelta: 1,
        trustDelta: 1,
        grantsLinkTags: ['talked_dist_hideout'],
        badMoodResponse: {
          aschText: '・・・・・・あの変態が何時間も自慢話で騒ぐのを適当にあしらっているだけだ。',
          expression: 'look_away',
          faceParts: { brow: 'sad', eyes: 'away', mouth: 'close', effects: [] },
          moodDelta: 0,
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
            thoughtText: 'ディストのネーミングセンスに苦笑する',
            spokenText:
              'とんでもない名前って・・・・・・あいつ、昔からそういう大仰な名前をつけるのが好きだよな。',
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
          'そういえば、今日俺がディストの研究室に入ったとき、なんで物陰に隠れもしないで部屋の隅に突っ立っていたんだ？　前みたいにやり過ごすこともできただろ？',
        retrySpokenText:
          'さっきの話だけど・・・・・・今日俺が研究室に入ったとき、やっぱり何か隠れ損ねる理由があったんじゃないのか？',
        aschText:
          '・・・・・・別にボサッとしていたわけじゃない！　おまえがノックもなしに勝手に入ってきただけだろうが。',
        retryAschText:
          '・・・・・・まだその話をする気か。しつこい奴だな。',
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
            '「・・・・・・別にボサッとしていたわけじゃない！　おまえがノックもなしに勝手に入ってきただけだろうが。」',
          capturedContext: '研究室に入った際になぜ隠れなかったのか尋ねた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_why_outside_reply_correct_tired',
            thoughtText: '「俺が入る直前まで、ディストの長話に付き合わされて疲れていたんだろ？」',
            spokenText:
              '・・・・・・もしかして、俺が入る直前までディストの長い自慢話に付き合わされて、疲れ果てていたんじゃないのか？',
            aschText:
              '・・・・・・っ、なぜそれを知っている！？\n・・・・・・チッ、誰だって3時間も自慢話を聞かされりゃ、反応くらい鈍るだろうが。おかげでこうして貴様に捕まる羽目になった。',
            expression: 'look_away',
            faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'talked_dist_hideout',
            naturalUnlockSectorId: 'SEC-10',
            completesTopic: true,
          },
          {
            id: 'p2_why_outside_reply_wrong_wanted',
            thoughtText: '「本当は俺に見つけてほしくて、わざと残っていたんじゃないのか？」',
            spokenText:
              '本当は俺に見つけてほしくて、わざと部屋の隅に残っていたんじゃないのか？',
            aschText:
              '・・・・・・っ、ふざけるな！　誰が貴様なんかに見つけてほしがるか、自惚れるのも大概にしろ！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush'] },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_why_outside_reply_wrong_broken_sensor',
            thoughtText: '「機械の聴覚センサーが故障して、俺の足音に気づかなかったのか？」',
            spokenText:
              '機械の聴覚センサーでも故障して、俺が入ってきた足音に気づかなかったのか？',
            aschText:
              '・・・・・・俺を出来損ないのガラクタ扱いするな！　センサーは正常に動いている！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: [] },
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_why_outside_reply_back_off',
            thoughtText: '「・・・・・・いや、なんでもない。また後で聞くよ」と一旦引く',
            spokenText:
              '・・・・・・いや、なんでもない。また後で聞くよ。',
            aschText:
              '・・・・・・ふん、最初からくだらないことを聞くな。',
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
          '外の連中といえば、ナタリアもバチカルの復興で毎日忙しく飛び回っているし、ピオニー陛下や大佐も相変わらずだ。少しは気になっていたんじゃないか？',
        retrySpokenText:
          'さっきは興味がないって言っていたけど・・・・・・外の連中のこと、本当は少しくらい気にかけているんじゃないのか？',
        aschText:
          '・・・・・・外の連中のことなど、俺の知ったことか。',
        retryAschText:
          '・・・・・・しつこい奴だな。外の連中のことなど、俺には関係ないと言っているだろうが。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'away',
          mouth: 'frown',
          effects: ['blush'],
        },
        capturedProtect: {
          sectorId: 'SEC-07',
          capturedQuote: '「・・・・・・外の連中のことなど、俺の知ったことか。」',
          capturedContext: '仲間たちの近況について話題を振られた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_friends_reply_correct_comms',
            thoughtText: '「知ったことかって言う割に、研究所の通信機で動向を調べていたんじゃないか？」',
            spokenText:
              '『俺の知ったことか』って言う割に、研究所にある通信機でバチカルやマルクトの動向は調べていたんじゃないのか？',
            aschText:
              '・・・・・・っ、なぜそれを・・・・・・！\n・・・・・・暇つぶしに通信網を覗いていただけだ。あいつらが勝手に元気でやっているなら、それで十分だろう。',
            expression: 'look_away',
            faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'hint_lab_comms',
            naturalUnlockSectorId: 'SEC-07',
            grantsLinkTags: ['talked_friends_news'],
            completesTopic: true,
          },
          {
            id: 'p2_friends_reply_tease_angry',
            thoughtText: '「本当はひとりで研究所にいて寂しくてたまらないくせに、意地を張るなよ」',
            spokenText:
              '本当はひとりで研究所にいて寂しくてたまらないくせに、いつまでそんな意地を張ってるんだ？',
            aschText:
              '・・・・・・っ、ふざけるな！！　誰が寂しいなどと言った、勝手な決めつけをするな！！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['blush'] },
            voiceEffects: ['shout'],
            moodDelta: -3,
            completesTopic: true,
          },
          {
            id: 'p2_friends_reply_wrong_go_baticul',
            thoughtText: '「今すぐ俺と一緒にバチカルへ行って、みんなにその姿を見せよう」',
            spokenText:
              'そんなに気になるなら、今すぐ俺と一緒にバチカルへ行って、みんなにその姿を見せようじゃないか。',
            aschText:
              '・・・・・・断る！　こんな姿でバチカルへノコノコ戻れるわけがないだろうが！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: [] },
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_friends_reply_back_off',
            thoughtText: '「・・・・・・そうか、この話はまた後でしよう」と一旦引く',
            spokenText:
              '・・・・・・そうか。この話はまた後でしよう。',
            aschText:
              '・・・・・・ふん、いちいち報告しなくて結構だ。',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
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
          'なあ、おまえを研究室から連れ出すときにディストが『これを持っていきなさい』って渡してきたこの板なんだが・・・・・・見覚えはあるか？',
        aschText:
          'チッ、その忌々しい板を俺に向けるな！\n・・・・・・ディストの奴、俺の内部記録を見る管理端末までおまえに渡しやがったのか。',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: ['sweat'] },
        grantsLinkTags: ['terminal_revealed'],
        systemLog: 'TERMINAL REVEALED // TARGET AWARE OF MONITOR DEVICE',
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
    thoughtText: '【MC-001】顔が赤くなる仕組み',
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
    thoughtText: '【MC-002】『〜ズラ』語尾と壊した端末',
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
          'なっ・・・・・・！？　だ、誰にも見られていなかったはずだろうが、なぜ貴様がそれを知っている！？\n・・・・・・ち、違う、あれはたまたま上の棚の部品を確認していただけだ！　笑うな！',
        expression: 'shock',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec05_pepper',
    thoughtText: '【MC-004】突き返したディストの菓子',
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
    thoughtText: '【EM-004】真夜中の通信履歴',
    phase2Tab: '端末',
    contextCategory: 'friends',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-07',
    stages: [
      {
        spokenText:
          '研究所のサブ端末でバチカルやピオニー陛下の動向を調べていた時間、全部ディストが寝静まった『真夜中』だったんだってな。',
        aschText:
          '・・・・・・っ！　き、貴様、時刻の記録まで見やがったのか！？\n・・・・・・昼間に開いたら、あの変態が横から覗き込んでうるさいから夜中に繋いだだけだ！　変な勘繰りをするな！',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
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
          '当たり前だろうが！　どれもこれも正気を疑うような名前ばかり並べやがって・・・・・・！\n・・・・・・おい、そこでニヤニヤするな！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
        moodDelta: 1,
        trustDelta: 1,
      },
    ],
  },
  {
    id: 'p2_term_sec10_alley_lost',
    thoughtText: '【EM-006】ディストの3時間の長話',
    phase2Tab: '端末',
    contextCategory: 'daily',
    sensitiveToBadMood: true,
    requireLinkTag: 'phase2_started',
    requireSectorUnlocked: 'SEC-10',
    stages: [
      {
        spokenText:
          '今日俺が入ってきたとき、ディストの3時間の長話でぐったりして、反応が1.8秒遅れたんだってな。',
        aschText:
          '・・・・・・っ、1.8秒だと！？　そこまで記録してやがるのか！？\n・・・・・・うるさい、3時間もあいつの自慢話を聞かされてみろ、誰だって頭が痺れる！',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['blush', 'sweat'] },
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
          '・・・・・・っ、やかましい！　指先が小さくなって、生前と勝手が違っただけだろうが！\nくだらないことをいちいち口に出すな！',
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
          '・・・・・・っ！？　な、なぜそれを知っている！？　誰もいなかったはずだろうが・・・・・・！\nち、違う！　あれは一手前の盤面を検証し直していただけだ！',
        expression: 'shock',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['sweat'] },
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
          '・・・・・・っ、やかましい！！　なぜそんな記録まで残っているんだ！？\n・・・・・・声帯の調整が終わるまで声を出したくなかっただけだ、二度とその話を蒸し返すな！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'grit', effects: ['sweat'] },
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
          '・・・・・・っ、人の感情波形までいちいち読み上げるな！\n・・・・・・母上は昔から涙脆いからな。死んだはずの息子がこんな姿で現れたら、また余計な心労をかけるだけだ。',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
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
          '・・・・・・チッ、人の手元までいちいち見ているな。\n・・・・・・長年の感触が抜けないだけだ。',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
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
          '3ヶ月前に大佐が研究所へ来た時、タルロウAのおまえの前で立ち止まって『せいぜい壊れないようにしてくださいよ』って声をかけたんだってな。あれ、気づいていたのか？',
        aschText:
          '・・・・・・知るか！　ただの機械に向けた皮肉かもしれんし、あの眼鏡のことだから何か感づいていたのかもしれん。\n・・・・・・どっちにしろ気味が悪い。次に研究所へ来ても絶対に関わらん！',
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
          'PROTECT TRIGGERED // SECTOR LOCKED: [EM-007 / SEC-12]',
        replyOptions: [
          {
            id: 'p2_why_hide_reply_step_in',
            thoughtText: '「今の姿を見られるのが嫌なんじゃなくて・・・・・・死んだはずの自分がなぜ動いているか分からないからか？」',
            spokenText:
              '・・・・・・今の姿を見られるのが嫌なんじゃなくて、死んだはずの自分がなぜ機械の身体で動いているのか、おまえ自身にも分からないからか？',
            aschText:
              '・・・・・・あいつが戻っているなら、それでいいだろう。\n今の俺が何なのか、俺自身にも分からん。・・・・・・そんなまま、今さら誰の前に出られる。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
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
              '・・・・・・あの変態に縛られる俺じゃない。見当違いな詮索をするな。',
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
          brow: 'sad',
          eyes: 'away',
          mouth: 'frown',
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
              eyes: 'down',
              mouth: 'frown',
              effects: [],
            },
            trustDelta: 1,
            grantsLinkTags: ['hint_human_limbs', 'hint_10yo_body'],
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
              '・・・・・・ない。\nバチカルにも戻れん。騎士団にも俺の席はない。・・・・・・かといって、こんな身体でどこへ行けと言うんだ。',
            expression: 'look_away',
            faceParts: {
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
          eyes: 'normal',
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
              '・・・・・・おまえがそういう目で俺を見ていたことくらい、ずっと前から知っていた。\n・・・・・・ふん、妙な同情を向けられるより、気が楽だ。',
            expression: 'look_away',
            faceParts: {
              brow: 'sad',
              eyes: 'away',
              mouth: 'close',
              effects: [],
            },
            moodDelta: 1,
            trustDelta: 2,
            grantsLinkTags: ['hint_manor_parents'],
            systemLog:
              'RESPONSE LOGGED // TOPIC: MANOR_MEMORIES',
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
          'ディストの研究所にこもっている間、外出もしないで毎日何をして時間を潰しているんだ？',
        retrySpokenText:
          'さっきは『何もしていない』って言っていたけど・・・・・・本当は研究所で何か暇つぶしをしているんじゃないのか？',
        aschText:
          '・・・・・・別に、何もしていない。ただ音機関を休めているだけだ。余計なことを聞くな。',
        retryAschText:
          '・・・・・・しつこい奴だな。研究所で何をしていようが俺の勝手だろうが。',
        expression: 'look_away',
        faceParts: { brow: 'normal', eyes: 'away', mouth: 'frown', effects: [] },
        capturedProtect: {
          sectorId: 'SEC-13',
          capturedQuote: '「・・・・・・別に、何もしていない。ただ音機関を休めているだけだ。」',
          capturedContext: '研究所にこもっている間の暇つぶしについて尋ねた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_pastime_reply_correct_chess',
            thoughtText: '「『何もしていない』って・・・・・・暇つぶしに1人でチェスでも差していたんじゃないか？」',
            spokenText:
              '『何もしていない』って・・・・・・本当は暇つぶしに、1人でチェスでも差していたんじゃないのか？',
            aschText:
              '・・・・・・っ、なぜそれを知っている！？\n・・・・・・あの変態と差すと途中でルールを捻じ曲げやがるから、空き部屋で1人で詰み筋を考えていただけだ！',
            expression: 'look_away',
            faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['sweat'] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'hint_chess_board',
            naturalUnlockSectorId: 'SEC-13',
            completesTopic: true,
          },
          {
            id: 'p2_pastime_reply_wrong_help_dist',
            thoughtText: '「毎日ディストの実験の手伝いでもして時間を潰していたのか？」',
            spokenText:
              'もしかして、毎日ディストの実験の手伝いでもして時間を潰していたのか？',
            aschText:
              '・・・・・・冗談じゃない。誰があの変態の実験など手伝ってやるものか！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'frown', effects: [] },
            moodDelta: -1,
            completesTopic: true,
          },
          {
            id: 'p2_pastime_reply_wrong_stare_wall',
            thoughtText: '「暗い部屋でずっと壁でも眺めてボサッとしていたのか？」',
            spokenText:
              'まさか、暗い部屋でずっと壁でも眺めてボサッとしていたのか？',
            aschText:
              '・・・・・・俺をボケた年寄りか何かだと思っているのか！　失礼にも程があるだろうが！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: [] },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_pastime_reply_back_off',
            thoughtText: '「・・・・・・そうか、別に深く聞くつもりはないよ」と一旦引く',
            spokenText:
              '・・・・・・そうか。別に深く聞くつもりはないよ。',
            aschText:
              '・・・・・・ふん、どうでもいいことを詮索するな。',
            expression: 'look_away',
            faceParts: { brow: 'normal', eyes: 'away', mouth: 'close', effects: [] },
            resetsTopicProgress: true,
          },
        ],
      },
    ],
  },

  // ロック会話⑧（SEC-14）：10歳の声（声変わり前）への違和感（声が裏返った雑談がヒント）
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
          'その身体になってから、昔の10歳の頃の声で喋るのはやっぱり違和感があるんじゃないか？',
        retrySpokenText:
          'さっきははぐらかしたけど・・・・・・今のその声、やっぱり生前と勝手が違ってやりづらいんじゃないのか？',
        aschText:
          '・・・・・・声くらいなんだっていいだろうが。いちいち人の声を聞き比べるな、気色が悪い。',
        retryAschText:
          '・・・・・・まだ声の話をする気か。鬱陶しい奴だな。',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['sweat'] },
        capturedProtect: {
          sectorId: 'SEC-14',
          capturedQuote: '「・・・・・・声くらいなんだっていいだろうが。いちいち人の声を聞き比べるな。」',
          capturedContext: '10歳当時の声（声変わり前）の違和感について尋ねた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_voice_reply_correct_crack',
            thoughtText: '「最初は生前の低い声で怒鳴ろうとして、上手くいかなかったんじゃないか？」',
            spokenText:
              'もしかして、今の身体になったばかりの頃、生前の低い声で怒鳴ろうとして声が裏返ったりしたんじゃないのか？',
            aschText:
              '・・・・・・っ！　・・・・・・生前のつもりで怒鳴ったら、高い声が出て調子が狂っただけだ。それ以上言ったら承知しないからな！',
            expression: 'look_away',
            faceParts: { brow: 'angry', eyes: 'down', mouth: 'grit', effects: ['sweat'] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'hint_voice_crack',
            naturalUnlockSectorId: 'SEC-14',
            completesTopic: true,
          },
          {
            id: 'p2_voice_reply_wrong_cute',
            thoughtText: '「昔のおまえの声そのままで、なんだか可愛らしい声だよな」',
            spokenText:
              'いや、昔のおまえの声そのままで、なんだか可愛らしい声だなと思ってさ。',
            aschText:
              '・・・・・・っ、ふざけるな！！　気色の悪いことを言うな、今すぐその口を閉じろ！！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['sweat'] },
            voiceEffects: ['shout'],
            moodDelta: -3,
            completesTopic: true,
          },
          {
            id: 'p2_voice_reply_wrong_modify',
            thoughtText: '「ディストに頼んで、生前の低い声に改造してもらえばいいのに」',
            spokenText:
              'そんなに気になるなら、ディストに頼んで生前の低い声に改造してもらえばいいんじゃないか？',
            aschText:
              '・・・・・・あの変態にこれ以上身体を弄らせてたまるか。余計な知恵をつけるな。',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: [] },
            moodDelta: -1,
            completesTopic: true,
          },
          {
            id: 'p2_voice_reply_back_off',
            thoughtText: '「・・・・・・悪かった、変なことを聞いてすまん」と一旦引く',
            spokenText:
              '・・・・・・悪かったよ。変なことを聞いてすまん。',
            aschText:
              '・・・・・・ふん、最初から黙っていろ。',
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
              '・・・・・・一度死んだ人間が、こんな機械の姿で母上の前に出てみろ。混乱させるだけだ。\n・・・・・・あの屋敷は、今のままでいいんだよ。',
            expression: 'look_away',
            faceParts: { brow: 'sad', eyes: 'down', mouth: 'close', effects: [] },
            moodDelta: 1,
            trustDelta: 2,
            requireLinkTag: 'hint_manor_parents',
            naturalUnlockSectorId: 'SEC-15',
            grantsLinkTags: ['talked_parents_thought'],
            completesTopic: true,
          },
          {
            id: 'p2_parents_reply_wrong_grudge',
            thoughtText: '「自分の居場所をルークに奪われたと思って、まだ屋敷を恨んでいるのか？」',
            spokenText:
              '自分の居場所をルークに奪われたと思って、まだ屋敷のことを恨んでいるのか？',
            aschText:
              '・・・・・・っ、馬鹿なことを言うな！　俺が今さらそんなことで屋敷を恨んでいるなどと思うな！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: [] },
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_parents_reply_wrong_spoil',
            thoughtText: '「本当は今すぐ屋敷に帰って、昔みたいに奥様に甘えたいんじゃないのか？」',
            spokenText:
              '本当は今すぐ屋敷に帰って、昔みたいに奥様に甘えたいんじゃないのか？',
            aschText:
              '・・・・・・っ、誰が今さら甘えるなどと言った！！　俺を誰だと思っているんだ、いい加減にしろ！！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['sweat'] },
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
              '・・・・・・ああ。あの屋敷の話はもうするな。',
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
          'ふと気づいたんだけど・・・・・・その身体の掌や腕には、おまえが長年剣を振ってできた剣ダコも、昔の傷跡もひとつもないんだな。',
        retrySpokenText:
          'さっきの掌の話だけど・・・・・・やっぱり、剣ダコや傷跡がなくなっているのは気になるのか？',
        aschText:
          '・・・・・・当たり前だ。11年前に造られた新品の予備機体だからな。人の手をジロジロ見るな。',
        retryAschText:
          '・・・・・・まだ俺の手を見ているのか。趣味が悪い奴だな。',
        expression: 'look_away',
        faceParts: { brow: 'sad', eyes: 'down', mouth: 'frown', effects: [] },
        capturedProtect: {
          sectorId: 'SEC-16',
          capturedQuote:
            '「・・・・・・当たり前だ。11年前に造られた新品の予備機体だからな。人の手をジロジロ見るな。」',
          capturedContext: '掌や腕に剣ダコや生前の傷跡がないことについて触れた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_hands_reply_correct_doll',
            thoughtText: '「目が覚めるたびにその真っ白な掌を見ると、自分の身体じゃないみたいで落ち着かないか？」',
            spokenText:
              '・・・・・・目が覚めるたびにその真っ白な掌が目に入ると、自分の身体じゃないみたいで落ち着かないんじゃないか？',
            aschText:
              '・・・・・・ああ。長年剣を握ってきたタコひとつ残っていない。\n・・・・・・まるで作り物の人形の手だ。',
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
            thoughtText: '「傷跡だらけだった生前の身体より、綺麗になって良かったじゃないか」',
            spokenText:
              '傷跡だらけだった生前の身体より、綺麗になって良かったじゃないか。',
            aschText:
              '・・・・・・っ、ふざけるな！　俺が積み重ねてきた鍛錬の証まで、綺麗になって良かったで片付ける気か！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'grit', effects: [] },
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_hands_reply_wrong_no_pain',
            thoughtText: '「機械の身体なら、もう怪我をしても血も出ないし便利だよな」',
            spokenText:
              '機械の身体なら、もう怪我をしても血も出ないし便利だよな。',
            aschText:
              '・・・・・・便利なものか！　斬られても血も出ない身体のどこがいいと言うんだ！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: [] },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_hands_reply_back_off',
            thoughtText: '「・・・・・・そうだな、変なところを見て悪かった」と一旦引く',
            spokenText:
              '・・・・・・そうだな。変なところをじろじろ見て悪かったよ。',
            aschText:
              '・・・・・・ふん、くだらないことを気にするな。',
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
          'ディストの研究所には大佐もよく出入りしていたよな。あの大佐の目を盗んで、本当に今まで気づかれずにいられたのか？',
        retrySpokenText:
          'さっきの大佐の話だけど・・・・・・やっぱりおまえ、大佐に正体を勘づかれるのを一番警戒していたんじゃないのか？',
        aschText:
          '・・・・・・あの眼鏡の話をするな！　あいつが研究所に来た時はいつも物陰に隠れていたんだ、気づかれているはずがないだろうが。',
        retryAschText:
          '・・・・・・だから、あの死霊使いには気づかれていないと言っているだろうが。',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: ['sweat'] },
        capturedProtect: {
          sectorId: 'SEC-17',
          capturedQuote:
            '「・・・・・・あの眼鏡の話をするな！　あいつが研究所に来た時はいつも物陰に隠れていたんだ、気づかれているはずがないだろうが。」',
          capturedContext: '研究所を訪れていたジェイドに正体を気づかれていないか尋ねた際の発言',
        },
        replyOptions: [
          {
            id: 'p2_jade_reply_correct_tarlow',
            thoughtText: '「タルロウAの時に一度も声をかけなかったの、一番は大佐に知られるのが嫌だったからだろ？」',
            spokenText:
              'おまえが小型機体の『タルロウA』だった頃に俺たちに一度も声をかけなかったの、一番はあの大佐に勘づかれるのが嫌だったからじゃないのか？',
            aschText:
              '・・・・・・っ、あの死霊使いに知られてみろ！　どんな悪趣味な実験材料にされるか分かったものじゃない。\n・・・・・・いいか、おまえもあの眼鏡にだけは絶対に口を割るなよ！',
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
            thoughtText: '「大佐のことだから、とっくに全部お見通しで泳がされているんじゃないか？」',
            spokenText:
              'いや、大佐のことだから、とっくに全部お見通しで面白がって泳がされているだけじゃないか？',
            aschText:
              '・・・・・・っ、縁起でもないことを言うな！　あいつに泳がされているくらいなら、今すぐ研究所ごと吹き飛ばしてやる！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['sweat'] },
            voiceEffects: ['shout'],
            moodDelta: -2,
            completesTopic: true,
          },
          {
            id: 'p2_jade_reply_wrong_call_jade',
            thoughtText: '「今から大佐をこの部屋に呼んで、その身体を診てもらおうか？」',
            spokenText:
              'いっそ今から大佐をこの部屋に呼んで、その身体を詳しく診てもらおうか？',
            aschText:
              '・・・・・・っ、やめろ！　あの眼鏡をここに呼んでみろ、俺は即座に窓から出て行ってやるからな！',
            expression: 'glare',
            faceParts: { brow: 'angry', eyes: 'glare', mouth: 'shout', effects: ['sweat'] },
            voiceEffects: ['shout'],
            moodDelta: -3,
            completesTopic: true,
          },
          {
            id: 'p2_jade_reply_back_off',
            thoughtText: '「・・・・・・分かった、大佐には黙っておくよ」と一旦引く',
            spokenText:
              '・・・・・・分かったよ。大佐の話はこれくらいにしておく。',
            aschText:
              '・・・・・・ふん、あいつの名前を出すだけでも気分が悪くなる。',
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
          '・・・・・・崩れるエルドラントで、ルークが俺を抱えていたところまでは覚えている。\n・・・・・・だが、それから1年前にタルロウAとして目が覚めるまでの2年間だけ、何も出てこない。',
        retryAschText:
          '・・・・・・蒸し返すなと言っただろう。その2年間だけ、何も出てこないんだ。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'down',
          mouth: 'close',
          effects: [],
        },
        naturalUnlockSectorId: 'SEC-18',
        systemLog:
          'DIALOGUE UNLOCK // SECTOR: [DP-001 / SEC-18]',
        replyOptions: [
          {
            id: 'p2_eldrant_reply_step_in',
            thoughtText: '「1年前にルークが帰ってきた時期と重なる・・・・・・その2年間だけディストにロックされているんじゃないか？」',
            spokenText:
              '1年前といえばルークが戻ってきた時期だ。普段のことは覚えているのに、その2年間の記憶だけ抜けているのは・・・・・・ディストの手でロックがかけられているんじゃないのか？',
            aschText:
              '・・・・・・っ、くそ、頭が・・・・・・っ。\nあいつが俺の頭の中をどう弄ったかなど知るか・・・・・・っ。',
            expression: 'pain',
            faceParts: {
              brow: 'pain',
              eyes: 'down',
              mouth: 'frown',
              effects: ['sweat'],
            },
            voiceEffects: ['tremble', 'normal'],
            requireLinkTag: 'terminal_revealed',
            capturedProtect: {
              sectorId: 'SEC-19',
              capturedQuote:
                '「・・・・・・それから1年前にタルロウAとして目が覚めるまでの2年間だけ、何も出てこない。」',
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
            thoughtText: '「本当は覚えているのに、俺に言いたくないだけなんじゃないのか？」',
            spokenText:
              '本当はその2年間のことも覚えているのに、俺に言いたくなくて隠しているだけなんじゃないのか？',
            aschText:
              '・・・・・・言いがかりをつけるな！　思い出せないものは思い出せないと言っているだろうが！',
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
              '・・・・・・ふん。過ぎたことをいつまでも蒸し返すな。',
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
          '・・・・・・なあ、2ヶ月前にタルロウAが壊れた時のことだけど、本当に何があったのか少しも心当たりはないのか？',
        retrySpokenText:
          '・・・・・・2ヶ月前にタルロウAの機体が壊れた理由、本当にただの初期不良なんかじゃないんじゃないか？',
        aschText:
          '・・・・・・しつこい奴だな。あの時の損傷は、ディストの実験でも外敵のせいでもない。理由は思い出せんが、ただの初期不良か何かだ。',
        retryAschText:
          '・・・・・・しつこい奴だな。理由は思い出せんと言っているだろうが。',
        expression: 'look_away',
        faceParts: {
          brow: 'sad',
          eyes: 'away',
          mouth: 'frown',
          effects: [],
        },
        replyOptions: [
          {
            id: 'p2_broken_reply_correct_self',
            thoughtText: '「初期不良なんかじゃない・・・・・・おまえ自身が何かを知って無茶をしたせいじゃないのか？」',
            spokenText:
              '・・・・・・初期不良なんかじゃないだろ。おまえ自身が何かを知って、自分で無茶をしたせいじゃないのか？',
            aschText:
              '・・・・・・っ、ぐ・・・・・・ッ！！　あ、頭が・・・・・・っ！\n・・・・・・やめろ、それ以上聞くな・・・・・・っ！',
            expression: 'pain',
            faceParts: {
              brow: 'pain',
              eyes: 'pain',
              mouth: 'grit',
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
            thoughtText: '「ディストの過酷な実験に巻き込まれて壊されたんじゃないのか？」',
            spokenText:
              '本当はディストの過酷な実験に巻き込まれて、無理やり壊されたんじゃないのか？',
            aschText:
              '・・・・・・あいつのせいじゃないと言っているだろうが。人の話を聞け！',
            expression: 'glare',
            faceParts: {
              brow: 'angry',
              eyes: 'glare',
              mouth: 'frown',
              effects: [],
            },
            moodDelta: -1,
            completesTopic: true,
          },
          {
            id: 'p2_broken_reply_wrong_sword',
            thoughtText: '「50センチの小型機体で無理に剣を振ろうとして壊したのか？」',
            spokenText:
              'あの50センチの小型機体で、無理に剣でも振ろうとして自滅したのか？',
            aschText:
              '・・・・・・っ、俺を馬鹿にするのも大概にしろ！　あんな箱みたいな機体で剣など握れるわけがないだろうが！',
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
            thoughtText: '「・・・・・・思い出せないなら、今は無理に聞かないでおくよ」と一旦引く',
            spokenText:
              '・・・・・・そうか。思い出せないなら、今は無理に聞かないでおくよ。',
            aschText:
              '・・・・・・ふん、最初からそうしろ。',
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
                  '感謝くらいさせろよ。おまえがあいつの居場所を残してくれたおかげで、今があるんだからな。\n・・・・・・それに、おまえが今こうして消えずに残っていることも、俺は良かったと思ってるよ。',
                aschText:
                  '・・・・・・っ、馬鹿か貴様は・・・・・・！　こんな身体で生き恥を晒しているどこが良かっただ。\n・・・・・・おまえが勝手にそう思いたいなら、好きにしろ。',
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
                    completesTopic: true,
                  },
                ],
              },
              {
                id: 'p2_dilemma_a_step2_past_avenger',
                thoughtText: '「復讐を狙っていた俺が言うのも虫がいいよな」と吐露する',
                spokenText:
                  '・・・・・・昔、おまえに復讐しようと機会を窺っていた俺が言うのも虫がいいよな。\nそれでも、今のおまえを知らん顔で放っておく気にはなれないんだよ。',
                aschText:
                  '・・・・・・ふん。今さら昔の復讐の話など持ち出すな。\n俺に同情する暇があるなら、自分の心配でもしていろ。',
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
                      '・・・・・・しつこい奴だな。余計な世話を焼くな。',
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
              '・・・・・・2ヶ月前にタルロウAが壊れたの、やっぱり初期不良でもディストの実験でもなくて、おまえ自身が何か無茶をしたせいだったんじゃないのか？',
            aschText:
              '・・・・・・チッ、まだその話を蒸し返す気か。\nあの時の損傷はディストのせいじゃない。理由は思い出せんが、俺自身の問題だ。',
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
                  '・・・・・・おまえ自身の問題って、まさかおまえ、自分で自分の機体を壊そうとしたんじゃないだろうな。',
                aschText:
                  '・・・・・・っ！？　な、何を根拠にそんなことを言う・・・・・・！\n俺が自分で自分を壊すわけが・・・・・・っ、くそ、なぜだ・・・・・・。',
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
                      '・・・・・・っ、大げさなことを言うな！　俺はもう3年前に死んだ身だ。\n・・・・・・ちっ、その話はもういい。',
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
              '・・・・・・この端末の奥にあった封印記録を見たぞ、アッシュ。\n1年前にディストがルークと混ざっていた記憶を2つに切り分けて・・・・・・おまえはその時消去されるはずだった記憶で、2ヶ月前にそれを知って自壊しようとしたのか！？',
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
                  '・・・・・・っ、やめろ、ガイ！！　それ以上言うな・・・・・・ッ！！\nタタル渓谷へ戻ったあいつは本物に決まっているだろう！！　・・・・・・っ、ぐ、うあああっ！！',
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
                    thoughtText: '「おまえが生きていると、帰ってきたルークまで偽物になるじゃないか！」',
                    spokenText:
                      'ふざけるなよ・・・・・・！　おまえがここで動いていたら、タタル渓谷へ帰ってきたルークまで偽物になるじゃないか！！\nあいつがやっと帰ってきたのに、なんでおまえなんかが残ってるんだよ・・・・・・っ！！',
                    aschText:
                      '・・・・・・っ、うるさい、黙れ・・・・・・っ！！　俺だって頼んでこんな機械の身体に残ったわけじゃない・・・・・・！！\n俺が邪魔だと言うなら、またあの研究所へ戻すな！　今ここでおまえの剣で俺を壊せ、ガイ・・・・・・ッ！！',
                    expression: 'pain',
                    faceParts: {
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
                          '・・・・・・ああ、そうだな。おまえはアッシュじゃない、ディストが造ったただの機械だ。\nおまえとこの記録さえ無かったことにすれば、帰ってきたルークは『本物のルーク』のままでいられる・・・・・・っ！！',
                        aschText:
                          '・・・・・・っ、ハッ・・・・・・それでいい。最初から、俺など残るべきじゃなかったんだ・・・・・・。\n・・・・・・それで全部、無かったことにしろ、ガイ・・・・・・っ。',
                        expression: 'normal',
                        faceParts: {
                          brow: 'pain',
                          eyes: 'close',
                          mouth: 'grit',
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
                          '・・・・・・俺の手でおまえを壊せるわけないだろ・・・・・・！\nだけど、機械の身体に記憶だけがあるおまえを『アッシュじゃない』としたら、アッシュの身体にルークの記憶だけがあるタタル渓谷のルークも『ルークじゃない』ことになる・・・・・・っ。',
                        aschText:
                          '・・・・・・そうか。\n・・・・・・道理で、目が覚めた時からずっと空っぽなわけだ・・・・・・。',
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
                          'CRITICAL PARADOX // IDENTITY COLLAPSE DETECTED',
                        completesTopic: true,
                        triggersEnding: 'DESTROY',
                      },
                    ],
                  },
                  {
                    id: 'p2_dilemma_c_step3_question_selfharm',
                    thoughtText: '「おまえが記憶データなら、帰ってきたルークも本物じゃないのか！？」',
                    spokenText:
                      '・・・・・・答えろよ、アッシュ！　おまえが切り離された記憶データなら、タタル渓谷に帰ってきたルークも本物じゃないっていうのかよ・・・・・・！？',
                    aschText:
                      '・・・・・・っ、知らん！！　俺は何も覚えていないと言っているだろうが・・・・・・っ！！\nやめろ、それ以上その記録を読み上げるな・・・・・・っ！！',
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
                          '・・・・・・そうか。\n・・・・・・道理で、目が覚めた時からずっと空っぽなわけだ・・・・・・。',
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
                  brow: 'angry',
                  eyes: 'glare',
                  mouth: 'grit',
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
    thoughtText: '机の上の古い調査資料',
    phase2Tab: '雑談',
    contextCategory: 'daily',
    requireLinkTag: 'phase2_started',
    relatedTopicIds: ['p2_friends_news'],
    stages: [
      {
        spokenText:
          '机の上の書類か？　最近また古代の音機関の調査を手伝っていて、資料が山積みになってるんだよ。',
        aschText:
          '・・・・・・おまえも相変わらずそういう古い機械いじりが好きだな。\nディストの研究所にも似たようなガラクタや、外部と繋がった通信機が山ほど転がっている。',
        expression: 'normal',
        faceParts: { brow: 'normal', eyes: 'normal', mouth: 'close', effects: [] },
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
          '棚のチェス盤か？　昔、屋敷でおまえにルールを教えたよな。おまえ、負けそうになるとすぐ盤をひっくり返しそうになってたの覚えてるか？',
        aschText:
          '・・・・・・いつの話をしている。そんなガキみたいな真似をした覚えはない。\nおまえこそ、俺に追い詰められるとすぐ長考して時間を稼いでいただろうが。',
        expression: 'look_away',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'frown', effects: [] },
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
          'そういえば、さっきおまえが怒鳴った時の声、少し裏返りかけなかったか？　その身体だと、声の出し方も勝手が違うのか？',
        aschText:
          '・・・・・・っ、うるさい！　聞き間違いに決まっているだろうが！\n11年前の予備機体だから、声帯ユニットまで声変わり前の仕様になっているだけだ！',
        expression: 'glare',
        faceParts: { brow: 'angry', eyes: 'away', mouth: 'grit', effects: ['sweat'] },
        moodDelta: 0,
        trustDelta: 1,
        grantsLinkTags: ['hint_voice_crack'],
        badMoodResponse: {
          aschText: '・・・・・・声帯ユニットまで11年前の声変わり前の仕様になっているだけだ。',
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
