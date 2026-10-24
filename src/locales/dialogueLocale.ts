/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../utils/i18n';

export const DIALOGUE_TRANSLATIONS: Record<string, Record<Language, string>> = {
  // === オープニング（第一声） ===
  '離せ。俺は『アッシュ』なんかじゃない、ディストが造った自律譜業『タルロウA』だ。\nおまえが誰かは知らんが、用がないならさっさと研究所へ戻せ': {
    ja: '離せ。俺は『アッシュ』なんかじゃない、ディストが造った自律譜業『タルロウA』だ。\nおまえが誰かは知らんが、用がないならさっさと研究所へ戻せ',
    en: "Let go of me. I'm not 'Asch'. I'm 'Tarlow A', an autonomous fonic craft built by Dist.\nI don't care who you are. If you don't need anything, send me back to the lab.",
    ko: '이 손 놓아라. 난 "애쉬" 같은 게 아냐. 디스트가 만든 자율 포업 "타르로우 A"다.\n네놈이 누군진 몰라도, 볼일 없으면 당장 연구소로 돌려보내라.',
  },

  // === フェーズ1：選択肢（thoughtText） ===
  'ルークによく似た外見': {
    ja: 'ルークによく似た外見',
    en: 'Looks just like Luke',
    ko: '루크와 쏙 빼닮은 외견',
  },
  'ディストのこと': {
    ja: 'ディストのこと',
    en: 'About Dist',
    ko: '디스트에 대하여',
  },
  '不意に頭へ手を伸ばす': {
    ja: '不意に頭へ手を伸ばす',
    en: 'Reach for his head',
    ko: '불시에 머리로 손을 뻗는다',
  },
  'タコ料理のこと': {
    ja: 'タコ料理のこと',
    en: 'About octopus dishes',
    ko: '문어 요리에 대하여',
  },
  'ナタリアのこと': {
    ja: 'ナタリアのこと',
    en: 'About Natalia',
    ko: '나탈리아에 대하여',
  },
  '語尾の「〜ズラ」': {
    ja: '語尾の「〜ズラ」',
    en: "The '~zura' speech filter",
    ko: "어미인 '~즈라'",
  },
  '剣を構える': {
    ja: '剣を構える',
    en: 'Draw sword',
    ko: '검을 겨눈다',
  },
  'バチカルのこと': {
    ja: 'バチカルのこと',
    en: 'About Baticul',
    ko: '바티칼에 대하여',
  },
  '天気の話題': {
    ja: '天気の話題',
    en: 'The weather',
    ko: '날씨 이야기',
  },
  '機体の色': {
    ja: '機体の色',
    en: 'Color of the chassis',
    ko: '기체 색상',
  },

  // === フェーズ1：ガイの発言（spokenText） ===
  'その姿、ルークにそっくりだぞ。ディストの奴、ルークをモデルにその機体を造ったのか？': {
    ja: 'その姿、ルークにそっくりだぞ。ディストの奴、ルークをモデルにその機体を造ったのか？',
    en: "You look just like Luke. Did Dist model that body after him?",
    ko: '그 모습, 루크랑 쏙 빼닮았잖아. 디스트 녀석, 루크를 모델로 그 기체를 만든 건가?',
  },
  'タルロウXはディストを崇拝してたよな。おまえもやっぱりディストを尊敬してるのか？': {
    ja: 'タルロウXはディストを崇拝してたよな。おまえもやっぱりディストを尊敬してるのか？',
    en: "Tarlow X worshipped Dist. Do you respect him like that too?",
    ko: '타르로우 X는 디스트를 숭배했었지. 너도 역시 디스트를 존경하는 거냐?',
  },
  'おい、頭にゴミがついてるぞ。ちょっとじっとしてろよ': {
    ja: 'おい、頭にゴミがついてるぞ。ちょっとじっとしてろよ',
    en: "Hey, there's debris in your hair. Hold still for a second.",
    ko: '이봐, 머리에 먼지 묻었잖아. 가만히 좀 있어 봐.',
  },
  '今夜の飯、タコ料理にするか。おまえも食うだろ？': {
    ja: '今夜の飯、タコ料理にするか。おまえも食うだろ？',
    en: "How about octopus for dinner tonight? You'll have some, right?",
    ko: '오늘 저녁은 문어 요리로 할까. 너도 먹을 거지?',
  },
  'そういえば、ナタリアがルークと結婚するらしいぜ。おまえはどう思う？': {
    ja: 'そういえば、ナタリアがルークと結婚するらしいぜ。おまえはどう思う？',
    en: "By the way, hear Natalia might be marrying Luke. What do you think?",
    ko: '그러고 보니, 나탈리아가 루크와 결혼한다던데. 넌 어떻게 생각해?',
  },
  'タルロウなら、語尾に「〜ズラ」ってつけるはずだろ。なんでおまえはつけないんだ？': {
    ja: 'タルロウなら、語尾に「〜ズラ」ってつけるはずだろ。なんでおまえはつけないんだ？',
    en: "If you're a Tarlow, shouldn't you end your sentences with '~zura'? Why don't you?",
    ko: '타르로우라면 말끝에 "~즈라"를 붙여야 정상이잖아. 넌 왜 안 붙여?',
  },
  'ちょっと動くなよ。剣の素振りの的にさせてもらうぜ': {
    ja: 'ちょっと動くなよ。剣の素振りの的にさせてもらうぜ',
    en: "Don't move. Mind being my target for some practice swings?",
    ko: '잠깐 가만히 있어 봐. 칼 연습용 표적으로 삼아볼까 하는데.',
  },
  'バチカルの街、ずいぶん復興が進んだぜ。おまえも行ってみたいか？': {
    ja: 'バチカルの街、ずいぶん復興が進んだぜ。おまえも行ってみたいか？',
    en: "Reconstruction in Baticul has come a long way. Want to visit sometime?",
    ko: '바티칼 거리, 재건이 제법 많이 진행됐어. 너도 가보고 싶냐?',
  },
  '今日は雨が降りそうだな。研究所の中だと天気なんか分からないだろ': {
    ja: '今日は雨が降りそうだな。研究所の中だと天気なんか分からないだろ',
    en: "Looks like rain today. Can't tell the weather from inside a lab, can you?",
    ko: '오늘은 비가 올 것 같네. 연구소 안에만 있으면 날씨 같은 건 모르겠지.',
  },
  'その機体の赤い色、派手で目立つよな。ディストの趣味なのか？': {
    ja: 'その機体の赤い色、派手で目立つよな。ディストの趣味なのか？',
    en: "That red chassis really stands out. Dist's eccentric taste?",
    ko: '그 기체의 붉은색, 화려해서 눈에 띄네. 디스트 취향이냐?',
  },

  // === フェーズ1：アッシュの返答（aschText） ===
  '知らん。俺は以前の機体が壊れたから、研究所にあった予備機体を仮で使っているだけだ': {
    ja: '知らん。俺は以前の機体が壊れたから、研究所にあった予備機体を仮で使っているだけだ',
    en: "I wouldn't know. My prior frame broke, so I'm temporarily using a spare from the lab.",
    ko: '모른다. 이전 기체가 고장 나서 연구소에 있던 예비 기체를 임시로 쓰고 있을 뿐이다.',
  },
  'ディストは俺の管理者だ。それ以上でも以下でもない': {
    ja: 'ディストは俺の管理者だ。それ以上でも以下でもない',
    en: "Dist is my administrator. Nothing more, nothing less.",
    ko: '디스트는 내 관리자다. 그 이상도 그 이하도 아냐.',
  },
  '不要な接触はやめろ': {
    ja: '不要な接触はやめろ',
    en: 'Cut out the pointless touching.',
    ko: '쓸데없이 건드리지 마라.',
  },
  '自律譜業に経口摂取の機能はない。俺の機体に食事は不要だ': {
    ja: '自律譜業に経口摂取の機能はない。俺の機体に食事は不要だ',
    en: 'Autonomous crafts have no oral intake system. This body needs no food.',
    ko: '자율 포업에 경구 섭취 기능 따윈 없다. 내 기체에 식사는 불필요해.',
  },
  '他人の婚姻など俺の知ったことではない。外部の情報を持ち込むな': {
    ja: '他人の婚姻など俺の知ったことではない。外部の情報を持ち込むな',
    en: "Other people's marriages are none of my concern. Stop bringing in outside noise.",
    ko: '남의 결혼 따위 알 바 아니다. 바깥 정보를 끌어들이지 마라.',
  },
  '言語野の設定に不具合が生じている。機能の最適化を優先した結果だ': {
    ja: '言語野の設定に不具合が生じている。機能の最適化を優先した結果だ',
    en: 'There is a bug in my speech module. Priority was given to core functionality.',
    ko: '언어 영역 설정에 결함이 발생했을 뿐이다. 기능 최적화를 우선한 결과다.',
  },
  '自律譜業に対する物理的破壊行為は禁止されている。武器を引け': {
    ja: '自律譜業に対する物理的破壊行為は禁止されている。武器を引け',
    en: 'Physical destruction of autonomous crafts is prohibited. Lower your weapon.',
    ko: '자율 포업을 향한 물리적 파괴 행위는 금지되어 있다. 무기를 치워라.',
  },
  '自律譜業に移動の自由はない。研究所の外に興味はない': {
    ja: '自律譜業に移動の自由はない。研究所の外に興味はない',
    en: 'Autonomous crafts have no freedom of movement. I have no interest outside the lab.',
    ko: '자율 포업에 이동의 자유는 없다. 연구소 바깥엔 흥미 없어.',
  },
  '気象データは観測業務に関係ない。無意味な質問だ': {
    ja: '気象データは観測業務に関係ない。無意味な質問だ',
    en: 'Meteorological data is irrelevant to observation duties. Pointless question.',
    ko: '기상 데이터는 관측 업무와 무관하다. 무의미한 질문이다.',
  },
  '塗装は音素循環の効率化に基づいている。意匠に意味はない': {
    ja: '塗装は音素循環の効率化に基づいている。意匠に意味はない',
    en: 'The paint optimizes fonon circulation. There is no intent behind the design.',
    ko: '도색은 음소 순환 효율화에 따른 것이다. 외형 디자인에 의미는 없다.',
  },

  // === フェーズ1：ボロ（Slip lines & Point outs） ===
  'ふざけるな、これは俺の・・・・・・ッ！': {
    ja: 'ふざけるな、これは俺の・・・・・・ッ！',
    en: "Don't screw with me, this is my...!",
    ko: '웃기지 마라, 이건 내......읏!',
  },
  '・・・・・・研究所にあった予備機体を仮で使っているだけだ': {
    ja: '・・・・・・研究所にあった予備機体を仮で使っているだけだ',
    en: "...I'm just temporarily using a spare frame that was in the lab.",
    ko: '......연구소에 있던 예비 기체를 임시로 쓰고 있을 뿐이다.',
  },
  'さっき、その機体のことを「俺の」って言いかけて言い直したよな。\nただの譜業が、なんでそんな言い方をするんだ？': {
    ja: 'さっき、その機体のことを「俺の」って言いかけて言い直したよな。\nただの譜業が、なんでそんな言い方をするんだ？',
    en: "Just now, you almost called that body 'mine'.\nWhy would a mere fonic craft say something like that?",
    ko: '방금 그 기체를 두고 "내 것"이라 말하려다 고쳐 말했지.\n일개 포업이 왜 그런 표현을 쓰는 거지?',
  },
  'ルークに似てるって言ったとき、俺を睨みつけたよな。\nただの譜業が、なんでそんなことで睨むんだ？': {
    ja: 'ルークに似てるって言ったとき、俺を睨みつけたよな。\nただの譜業が、なんでそんなことで睨むんだ？',
    en: "When I said you look like Luke, you glared at me.\nWhy would a simple craft glare over something like that?",
    ko: '루크를 닮았다고 했을 때 날 째려봤잖아.\n일개 포업이 왜 그런 일로 노려보는 거지?',
  },
  '誰があんな奴を・・・・・・ッ！': {
    ja: '誰があんな奴を・・・・・・ッ！',
    en: "Who would ever respect that...!",
    ko: '누가 그딴 녀석을......읏!',
  },
  '・・・・・・ディストは俺の管理者だ。それ以上でも以下でもない': {
    ja: '・・・・・・ディストは俺の管理者だ。それ以上でも以下でもない',
    en: '...Dist is my administrator. Nothing more, nothing less.',
    ko: '......디스트는 내 관리자다. 그 이상도 그 이하도 아냐.',
  },
  'ディストのことを「あんな奴」って口走ったよな。\n自分を造った相手をそんな風に呼ぶ譜業がいるかよ': {
    ja: 'ディストのことを「あんな奴」って口走ったよな。\n自分を造った相手をそんな風に呼ぶ譜業がいるかよ',
    en: "You just called Dist 'that guy'.\nWhat kind of craft refers to its creator that way?",
    ko: '디스트를 두고 "그딴 녀석"이라고 내뱉었지.\n자신을 만든 상대를 그렇게 부르는 포업이 어디 있냐고.',
  },
  '気安く触るな、ガイ・・・・・・ッ！': {
    ja: '気安く触るな、ガイ・・・・・・ッ！',
    en: "Don't touch me so casually, Guy...!",
    ko: '함부로 건드리지 마라, 가이......읏!',
  },
  '今、俺の名前を呼んだよな。\nただの譜業が、なんで初対面の俺の名前を知ってるんだ？': {
    ja: '今、俺の名前を呼んだよな。\nただの譜業が、なんで初対面の俺の名前を知ってるんだ？',
    en: "You just said my name.\nHow would a craft I just met know who I am?",
    ko: '너 방금 내 이름을 불렀지.\n일개 포업이 초면인 내 이름을 어떻게 아는 거지?',
  },
  'あんなゲテモノ食えるか・・・・・・ッ！': {
    ja: 'あんなゲテモノ食えるか・・・・・・ッ！',
    en: "As if I'd ever eat that revolting...!",
    ko: '그딴 괴상한 걸 먹을 수 있겠냐......읏!',
  },
  'タコのこと「ゲテモノ」って言って嫌がったよな。\n食事がいらない譜業が、なんでタコ嫌いなんだ？': {
    ja: 'タコのこと「ゲテモノ」って言って嫌がったよな。\n食事がいらない譜業が、なんでタコ嫌いなんだ？',
    en: "You called octopus 'revolting'.\nWhy would a machine with no need for food hate octopus?",
    ko: '문어를 두고 "괴상한 것"이라며 질색했지.\n밥도 안 먹는 포업이 왜 문어를 싫어하는 건데?',
  },
  'なっ・・・・・・あいつが、ルークと・・・・・・！？': {
    ja: 'なっ・・・・・・あいつが、ルークと・・・・・・！？',
    en: "Wh... She's marrying... Luke...?!",
    ko: '뭐...... 그 녀석이, 루크와......?!',
  },
  'ナタリアの結婚の話をしたとき、動揺して息を呑んだよな。\nただの譜業が、なんでそんな反応をするんだ？': {
    ja: 'ナタリアの結婚の話をしたとき、動揺して息を呑んだよな。\nただの譜業が、なんでそんな反応をするんだ？',
    en: "When I brought up Natalia marrying, you gasped.\nWhy would a mere craft react like that?",
    ko: '나탈리아 결혼 이야기를 꺼냈을 때 숨을 삼키며 동요했지.\n일개 포업이 왜 그런 반응을 보이는 거냐?',
  },
  'あんな間抜けな喋り方できるか・・・・・・ッ！': {
    ja: 'あんな間抜けな喋り方できるか・・・・・・ッ！',
    en: "Like hell I'd ever talk like an idiot...!",
    ko: '그딴 바보 같은 말투를 쓸 수 있겠냐......읏!',
  },
  '「あんな間抜けな喋り方できるか」って吐き捨てたよな。\n不具合で喋れないんじゃなくて、自分で拒否したんだろ？': {
    ja: '「あんな間抜けな喋り方できるか」って吐き捨てたよな。\n不具合で喋れないんじゃなくて、自分で拒否したんだろ？',
    en: "You spat out that you'd never talk like an idiot.\nIt wasn't a glitch—you refused it yourself, didn't you?",
    ko: '"그딴 바보 같은 말투를 쓰겠냐"고 내뱉었지.\n결함이 아니라 네 의지로 거부한 거잖아?',
  },
  '抜刀の構えが甘いぞ、ガイ・・・・・・ッ！': {
    ja: '抜刀の構えが甘いぞ、ガイ・・・・・・ッ！',
    en: "Your stance is sloppy, Guy...!",
    ko: '발도 자세가 허술하잖아, 가이......읏!',
  },
  '俺が剣を構えたとき、構えの甘さを指摘しかけたよな。\n剣術の心得がある譜業なんて、ディストが造るわけないだろ': {
    ja: '俺が剣を構えたとき、構えの甘さを指摘しかけたよな。\n剣術の心得がある譜業なんて、ディストが造るわけないだろ',
    en: "When I drew my blade, you almost corrected my stance.\nThere's no way Dist built a servant craft with master swordsmanship.",
    ko: '내가 칼을 뽑았을 때 자세의 허점을 지적하려 했지.\n검술을 아는 포업 따윌 디스트가 만들 리 없잖아.',
  },
  '屋敷の連中は・・・・・・無事なのか？': {
    ja: '屋敷の連中は・・・・・・無事なのか？',
    en: "Are the people... at the manor safe?",
    ko: '저택 사람들은...... 무사한 건가?',
  },
  'バチカルの話をしたとき、「屋敷の連中は無事なのか」って聞いたよな。\nあそこの屋敷を「屋敷」と呼ぶのは、ファブレ公爵家の人間だけだ': {
    ja: 'バチカルの話をしたとき、「屋敷の連中は無事なのか」って聞いたよな。\nあそこの屋敷を「屋敷」と呼ぶのは、ファブレ公爵家の人間だけだ',
    en: "When I mentioned Baticul, you asked if the manor folk were safe.\nThe only ones who call it 'the manor' are family of House Fabre.",
    ko: '바티칼 이야기를 꺼냈을 때 "저택 사람들은 무사하냐"고 물었지.\n그곳을 그저 "저택"이라 부르는 건 파브레 공작가 사람뿐이야.',
  },

  // === フェーズ1：決断メニュー項目 ===
  '『タルロウA』というのは嘘だと矛盾を指摘する': {
    ja: '『タルロウA』というのは嘘だと矛盾を指摘する',
    en: "Point out the contradiction in claiming to be 'Tarlow A'",
    ko: "'타르로우 A'라는 주장의 모순을 지적한다",
  },
  '手元の端末の画面（内部記録）を本人に見せる': {
    ja: '手元の端末の画面（内部記録）を本人に見せる',
    en: 'Show the terminal screen (internal records) to him',
    ko: '단말기 화면(내부 기록)을 본인에게 보여준다',
  },
  '『タルロウA』という主張を信じて研究所へ帰す': {
    ja: '『タルロウA』という主張を信じて研究所へ帰す',
    en: "Accept the 'Tarlow A' claim and return him to the lab",
    ko: "'타르로우 A'라는 주장을 믿고 연구소로 돌려보낸다",
  },

  // === 共通リアクション（不機嫌・放置復帰・言い淀みなど） ===
  '・・・・・・今はその話をする気にならん。': {
    ja: '・・・・・・今はその話をする気にならん。',
    en: "...I'm not in the mood to talk about that right now.",
    ko: '......지금은 그 이야기를 할 기분이 아니다.',
  },
  '・・・・・・わるいが、その話は後にしてくれ。': {
    ja: '・・・・・・わるいが、その話は後にしてくれ。',
    en: "...Sorry, but leave that for later.",
    ko: '......미안하지만, 그 이야기는 나중에 해라.',
  },
  '・・・・・・今は少し黙っていてくれ。': {
    ja: '・・・・・・今は少し黙っていてくれ。',
    en: '...Keep quiet for a moment.',
    ko: '......지금은 잠깐 입 다물고 있어라.',
  },
  '・・・・・・その話はまた今度にしろ。': {
    ja: '・・・・・・その話はまた今度にしろ。',
    en: '...Save that topic for another time.',
    ko: '......그 이야기는 다음에 해라.',
  },
  '・・・・・・今は少し頭を冷やしているところだ。': {
    ja: '・・・・・・今は少し頭を冷やしているところだ。',
    en: "...I'm trying to cool my head. Back off.",
    ko: '......지금은 머리를 좀 식히고 있는 중이다.',
  },
  '・・・・・・なんだ、やっと口を開いたか。': {
    ja: '・・・・・・なんだ、やっと口を開いたか。',
    en: '...Finally decided to open your mouth?',
    ko: '......뭐냐, 이제야 입을 연 건가.',
  },
  '・・・・・・急に黙り込むから、何を考えているのかと思っただろうが。': {
    ja: '・・・・・・急に黙り込むから、何を考えているのかと思っただろうが。',
    en: "...Going quiet out of nowhere. I had no idea what you were plotting.",
    ko: '......갑자기 입을 꾹 닫길래, 무슨 꿍꿍인가 했잖아.',
  },
  '・・・・・・ふん、まだ話すことがあるなら聞いてやる。': {
    ja: '・・・・・・ふん、まだ話すことがあるなら聞いてやる。',
    en: "...Hmph. If you've still got something to say, I'll listen.",
    ko: '......흥, 아직 할 말이 남았다면 들어주지.',
  },
  '・・・・・・少し、別のことを聞いてもいいか。': {
    ja: '・・・・・・少し、別のことを聞いてもいいか。',
    en: '...Mind if I ask something else?',
    ko: '......잠깐, 다른 걸 물어봐도 될까.',
  },
  '・・・・・・なあ、ひとつ聞きたいんだが。': {
    ja: '・・・・・・なあ、ひとつ聞きたいんだが。',
    en: '...Hey, there is one thing I want to ask.',
    ko: '......이봐, 하나 묻고 싶은 게 있는데.',
  },
  '・・・・・・それより、少し話しておきたいことがあってさ。': {
    ja: '・・・・・・それより、少し話しておきたいことがあってさ。',
    en: '...More importantly, there is something we should talk about.',
    ko: '......그것보다, 조금 이야기해 두고 싶은 게 있어서.',
  },
  '・・・・・・いや、その・・・・・・少し話を変えるが。': {
    ja: '・・・・・・いや、その・・・・・・少し話を変えるが。',
    en: '...Well, uh... changing the subject for a sec.',
    ko: '......아니, 그...... 화제를 조금 바꾸겠지만.',
  },
  '・・・・・・なんだ、急に歯切れが悪いな。': {
    ja: '・・・・・・なんだ、急に歯切れが悪いな。',
    en: "...What's with the sudden hesitation?",
    ko: '......뭐냐, 갑자기 말을 더듬기는.',
  },
  '・・・・・・ええと、そういえばさ。': {
    ja: '・・・・・・ええと、そういえばさ。',
    en: '...Uh, by the way.',
    ko: '......어음, 그러고 보니 말이야.',
  },
  '・・・・・・ふん、無理に気を使わなくてもいいだろうが。で、なんだ。': {
    ja: '・・・・・・ふん、無理に気を使わなくてもいいだろうが。で、なんだ。',
    en: "...Hmph, don't force yourself to be considerate. What is it?",
    ko: '......흥, 억지로 신경 써줄 필요까진 없는데. 그래서 뭔데.',
  },

  // === プロローグ ===
  'ルークがタタル渓谷へ帰ってきてから1年が経った、ある日。': {
    ja: 'ルークがタタル渓谷へ帰ってきてから1年が経った、ある日。',
    en: 'One year after Luke returned to the Tataroo Valley, one day.',
    ko: '루크가 타타르 계곡으로 돌아온 지 1년이 지난 어느 날.',
  },
  '俺がディストの研究所を訪ねると、部屋の隅に見覚えのある子どもがいた。': {
    ja: '俺がディストの研究所を訪ねると、部屋の隅に見覚えのある子どもがいた。',
    en: 'Visiting Dist’s laboratory, I found a familiar child sitting in the corner of the room.',
    ko: '디스트의 연구소를 찾아가자, 방 구석에 낯익은 아이가 있었다.',
  },
  'ディストにどういうことなのか尋ねても、': {
    ja: 'ディストにどういうことなのか尋ねても、',
    en: 'Even when I asked Dist what was going on,',
    ko: '디스트에게 어떻게 된 일인지 물어보아도,',
  },
  '奴は管理用の端末を差し出して不気味に笑うだけだった。': {
    ja: '奴は管理用の端末を差し出して不気味に笑うだけだった。',
    en: 'he merely handed me a maintenance terminal and smiled eerily.',
    ko: '녀석은 관리 단말기를 내밀며 기분 나쁘게 웃을 뿐이었다.',
  },
  '何が何やらわからないが、放置することもできない。': {
    ja: '何が何やらわからないが、放置することもできない。',
    en: "I had no idea what was happening, but I couldn't just leave him there.",
    ko: '영문을 알 수 없었지만, 그대로 방치할 수도 없었다.',
  },
  '俺は、半ば強引にそいつを連れ帰ることにした。': {
    ja: '俺は、半ば強引にそいつを連れ帰ることにした。',
    en: 'I decided, half by force, to bring him home with me.',
    ko: '나는 반쯤 억지로 녀석을 데려가기로 했다.',
  },

  // === フェーズ1：ボロ指摘（質問ラベル） ===
  'ルークをモデルに造ったのか聞いたとき': {
    ja: 'ルークをモデルに造ったのか聞いたとき',
    en: 'When asking if Luke was the model',
    ko: '루크를 모델로 만들었냐고 물었을 때',
  },
  'ディストを尊敬しているのか聞いたとき': {
    ja: 'ディストを尊敬しているのか聞いたとき',
    en: 'When asking if he respects Dist',
    ko: '디스트를 존경하냐고 물었을 때',
  },
  '不意に頭へ手を伸ばしたとき': {
    ja: '不意に頭へ手を伸ばしたとき',
    en: 'When suddenly reaching for his head',
    ko: '불시에 머리로 손을 뻗었을 때',
  },
  '『宝刀ガルディオス』を見せたとき': {
    ja: '『宝刀ガルディオス』を見せたとき',
    en: "When showing the 'Sword of Gardios'",
    ko: '"보도 가르디오스"를 보여주었을 때',
  },
  'ナタリアの話を振ったとき': {
    ja: 'ナタリアの話を振ったとき',
    en: 'When bringing up Natalia',
    ko: '나탈리아 이야기를 꺼냈을 때',
  },
  'ブウサギの『アッシュ』の話をしたとき': {
    ja: 'ブウサギの『アッシュ』の話をしたとき',
    en: "When talking about the Rappig 'Asch'",
    ko: "부우토끼 '애쉬' 이야기를 꺼냈을 때",
  },
  '食事に誘ったとき': {
    ja: '食事に誘ったとき',
    en: 'When inviting him to eat',
    ko: '식사에 초대했을 때',
  },
  '『鮮血のアッシュ』の噂話をしたとき': {
    ja: '『鮮血のアッシュ』の噂話をしたとき',
    en: "When mentioning rumors about 'Asch the Bloody'",
    ko: '"선혈의 애쉬"의 소문을 이야기했을 때',
  },
  'タルロウXの語尾のことを聞いたとき': {
    ja: 'タルロウXの語尾のことを聞いたとき',
    en: "When asking about Tarlow X's speech suffix",
    ko: '타르로우 X의 어미에 대해 물었을 때',
  },
  '部屋の隅で何をしていたのか聞いたとき': {
    ja: '部屋の隅で何をしていたのか聞いたとき',
    en: 'When asking what he was doing in the corner',
    ko: '방 구석에서 무엇을 하고 있었냐고 물었을 때',
  },

  // === フェーズ2：処遇選択肢 ===
  '少し休んでいけと声をかける': {
    ja: '少し休んでいけと声をかける',
    en: 'Tell him to stay and rest a little',
    ko: '잠깐 쉬어가라고 권한다',
  },
  'ディストの研究所へ帰す': {
    ja: 'ディストの研究所へ帰す',
    en: "Send him back to Dist's laboratory",
    ko: '디스트의 연구소로 돌려보낸다',
  },
  '機能停止させる': {
    ja: '機能停止させる',
    en: 'Deactivate / Shut down system',
    ko: '기능을 정지시킨다',
  },

  // === フェーズ2：主要話題（thoughtText） ===
  '『タルロウA』と名乗っていた理由': {
    ja: '『タルロウA』と名乗っていた理由',
    en: "Why you claimed to be 'Tarlow A'",
    ko: "'타르로우 A'라고 자칭했던 이유",
  },
  'なぜ声をかけなかったのか': {
    ja: 'なぜ声をかけなかったのか',
    en: "Why didn't you say anything to me?",
    ko: '왜 말을 걸지 않았던 건지',
  },
  'よく正体がバレなかったな': {
    ja: 'よく正体がバレなかったな',
    en: "Surprised you didn't blow your cover",
    ko: '용케 정체를 안 들켰네',
  },
  '昔を思い出す背丈': {
    ja: '昔を思い出す背丈',
    en: 'That height brings back memories',
    ko: '예전을 떠올리게 하는 키',
  },
  'あの頃に戻ったみたいだ': {
    ja: 'あの頃に戻ったみたいだ',
    en: 'It feels like back in those days',
    ko: '그 시절로 돌아간 것 같아',
  },
  'その身体じゃ剣も振れないんじゃないか？': {
    ja: 'その身体じゃ剣も振れないんじゃないか？',
    en: "Can you even swing a sword in that body?",
    ko: '그 몸으론 검도 제대로 못 휘두르는 거 아냐?',
  },
  'お茶でも淹れようか': {
    ja: 'お茶でも淹れようか',
    en: 'Shall I brew some tea?',
    ko: '차라도 한 잔 끓일까',
  },
  '砂糖は入れないでおく': {
    ja: '砂糖は入れないでおく',
    en: 'I will leave the sugar out',
    ko: '설탕은 넣지 않을게',
  },
  '静かにカップを置く': {
    ja: '静かにカップを置く',
    en: 'Quietly set down the cup',
    ko: '조용히 찻잔을 내려놓는다',
  },
  'エプロンのこと': {
    ja: 'エプロンのこと',
    en: 'About the apron',
    ko: '앞치마에 대하여',
  },
  '『宝刀ガルディオス』のこと': {
    ja: '『宝刀ガルディオス』のこと',
    en: "About the 'Sword of Gardios'",
    ko: '"보도 가르디오스"에 대하여',
  },
  'その機体で剣は振れるのか': {
    ja: 'その機体で剣は振れるのか',
    en: 'Can that craft swing a sword?',
    ko: '그 기체로 검을 휘두를 수 있어?',
  },
  '思いきり剣を振れないのはもどかしいだろ': {
    ja: '思いきり剣を振れないのはもどかしいだろ',
    en: "Must be frustrating not swinging with all your might",
    ko: '마음껏 검을 휘두르지 못해 답답하겠지',
  },
  '制限がかかっているくらいでちょうどいい': {
    ja: '制限がかかっているくらいでちょうどいい',
    en: 'Having output limits is probably for the best',
    ko: '제한이 걸려 있는 편이 딱 좋을지도',
  },
  'あまり触れられたくない話だったな': {
    ja: 'あまり触れられたくない話だったな',
    en: "Guess that's not something you want to touch on",
    ko: '별로 건드리고 싶지 않은 이야기였나 보네',
  },
  'ディストの研究所での暮らし': {
    ja: 'ディストの研究所での暮らし',
    en: "Living in Dist's laboratory",
    ko: '디스트의 연구소에서의 생활',
  },
  'あんな研究所に居続けなくてもいいだろ': {
    ja: 'あんな研究所に居続けなくてもいいだろ',
    en: "You don't have to stay in a lab like that",
    ko: '그런 연구소에 계속 머물지 않아도 되잖아',
  },
  'ディストのネーミングセンスに苦笑する': {
    ja: 'ディストのネーミングセンスに苦笑する',
    en: "Smile wryly at Dist's naming sense",
    ko: '디스트의 작명 센스에 쓴웃음을 짓는다',
  },
  '研究室で隠れずにいた理由': {
    ja: '研究室で隠れずにいた理由',
    en: "Why you didn't hide in the lab",
    ko: '연구실에서 숨지 않고 있었던 이유',
  },
  '体を換えたことを忘れてた？': {
    ja: '体を換えたことを忘れてた？',
    en: 'Did you forget your body had changed?',
    ko: '몸이 바뀐 걸 깜빡했었어?',
  },
  'わざと残っていたんじゃないのか？': {
    ja: 'わざと残っていたんじゃないのか？',
    en: 'Didn’t you stay behind on purpose?',
    ko: '일부러 남아 있었던 거 아냐?',
  },
  '今着ている服': {
    ja: '今着ている服',
    en: 'The clothes you are wearing',
    ko: '지금 입고 있는 옷',
  },
  'みんなの近況': {
    ja: 'みんなの近況',
    en: 'How everyone is doing',
    ko: '모두의 근황',
  },
  'ナタリアの様子を調べていたんじゃないか': {
    ja: 'ナタリアの様子を調べていたんじゃないか',
    en: 'Were you checking up on Natalia?',
    ko: '나탈리아의 모습을 살피고 있었던 거 아냐?',
  },
  '本当は寂しいくせに意地を張るなよ': {
    ja: '本当は寂しいくせに意地を張るなよ',
    en: "Don't act stubborn when you're actually lonely",
    ko: '사실은 외로우면서 고집부리지 마라',
  },
  '本当に興味ないのか？': {
    ja: '本当に興味ないのか？',
    en: 'Are you really not interested?',
    ko: '정말로 관심 없어?',
  },
  'ディストから渡された端末': {
    ja: 'ディストから渡された端末',
    en: 'The terminal Dist gave me',
    ko: '디스트가 건넨 단말기',
  },
  'むやみに弄ったりしないでおく': {
    ja: 'むやみに弄ったりしないでおく',
    en: "I won't tamper with it carelessly",
    ko: '함부로 만지지 않도록 할게',
  },
  '身体に無理が出ていないか気になったんだ': {
    ja: '身体に無理が出ていないか気になったんだ',
    en: 'I was worried if your body was straining',
    ko: '몸에 무리가 가진 않았는지 신경 쓰여서',
  },
  '隠してることもこれで丸見えだな': {
    ja: '隠してることもこれで丸見えだな',
    en: "Whatever you're hiding is plain to see now",
    ko: '숨기는 것도 이걸로 훤히 보이네',
  },
  '顔が赤くなる仕組み': {
    ja: '顔が赤くなる仕組み',
    en: 'The blushing mechanism',
    ko: '얼굴이 붉어지는 구조',
  },
  '『〜ズラ』語尾と壊した端末': {
    ja: '『〜ズラ』語尾と壊した端末',
    en: "The '~zura' suffix and broken terminal",
    ko: "'~즈라' 어미와 부순 단말기",
  },
  '高い棚と『踏み台』の記録': {
    ja: '高い棚と『踏み台』の記録',
    en: "The high shelf and 'step stool' log",
    ko: '높은 선반과 "디딤대"의 기록',
  },
  '飲食できる機体の仕様': {
    ja: '飲食できる機体の仕様',
    en: 'Edible consumption craft specs',
    ko: '음식 섭취가 가능한 기체 사양',
  },
  'タタル渓谷の帰還記録': {
    ja: 'タタル渓谷の帰還記録',
    en: 'Tataroo Valley return log',
    ko: '타타르 계곡 귀환 기록',
  },
  '空き部屋での素振りの記録': {
    ja: '空き部屋での素振りの記録',
    en: 'Sword swinging log in the vacant room',
    ko: '빈 방에서의 검 휘두르기 기록',
  },
  '機体名のボツ案リスト': {
    ja: '機体名のボツ案リスト',
    en: 'Rejected craft name ideas list',
    ko: '기체명 퇴짜 목록',
  },
  '部屋の隅で固まっていた記録': {
    ja: '部屋の隅で固まっていた記録',
    en: 'Log of freezing in the room corner',
    ko: '방 구석에서 굳어 있던 기록',
  },
  '着替えに手こずっていた記録': {
    ja: '着替えに手こずっていた記録',
    en: 'Log of struggling to change clothes',
    ko: '옷 갈아입느라 애먹던 기록',
  },
  '1人チェスの記録': {
    ja: '1人チェスの記録',
    en: 'Solo chess log',
    ko: '혼자 두던 체스 기록',
  },
  '2日間筆談で通した記録': {
    ja: '2日間筆談で通した記録',
    en: '2-day written communication log',
    ko: '이틀간 필담으로 버텼던 기록',
  },
  '公爵夫妻に対する感情波形': {
    ja: '公爵夫妻に対する感情波形',
    en: 'Emotional waveform toward Duke & Duchess',
    ko: '공작 부부에 대한 감정 파형',
  },
  '右の掌をこする癖': {
    ja: '右の掌をこする癖',
    en: 'Habit of rubbing right palm',
    ko: '오른쪽 손바닥을 문지르는 버릇',
  },
  '大佐の様子': {
    ja: '大佐の様子',
    en: 'How the Colonel is doing',
    ko: '대령님의 근황',
  },
  'みんなの元へ戻らない理由': {
    ja: 'みんなの元へ戻らない理由',
    en: 'Reason for not returning to everyone',
    ko: '모두의 곁으로 돌아가지 않는 이유',
  },
  '自分が何者か分からないからか？': {
    ja: '自分が何者か分からないからか？',
    en: "Because you don't know who you are?",
    ko: '자신이 누구인지 모르기 때문이야?',
  },
  '子ども扱いされるのが嫌なのか？': {
    ja: '子ども扱いされるのが嫌なのか？',
    en: 'Is it because you hate being treated like a kid?',
    ko: '아이 취급받는 게 싫은 거야?',
  },
  '無理には聞かないよ': {
    ja: '無理には聞かないよ',
    en: "I won't press you if you don't want to say",
    ko: '무리해서 묻진 않을게',
  },
  'どうしてその機体なのか': {
    ja: 'どうしてその機体なのか',
    en: 'Why this particular craft?',
    ko: '어째서 그 기체인 건가',
  },
  '場繋ぎの予備か・・・・・・皮肉だな': {
    ja: '場繋ぎの予備か・・・・・・皮肉だな',
    en: 'A makeshift spare... how ironic',
    ko: '땜빵용 예비 기체인가...... 얄궂네',
  },
  '11年前の予備機体か': {
    ja: '11年前の予備機体か',
    en: 'A spare body from 11 years ago, huh',
    ko: '11년 전의 예비 기체인가',
  },
  '眠ったり夢を見たりするか': {
    ja: '眠ったり夢を見たりするか',
    en: 'Do you sleep or dream?',
    ko: '잠을 자거나 꿈을 꾸기도 해?',
  },
  'これからどうするつもりか': {
    ja: 'これからどうするつもりか',
    en: 'What do you plan to do from now on?',
    ko: '앞으로 어떻게 할 셈이야?',
  },
  '昔の屋敷での暮らし': {
    ja: '昔の屋敷での暮らし',
    en: 'Life in the manor back then',
    ko: '옛날 저택에서의 생활',
  },
  '研究所で何をして過ごしているか': {
    ja: '研究所で何をして過ごしているか',
    en: 'How do you spend time at the lab?',
    ko: '연구소에서 뭘 하며 시간을 보내?',
  },
  'チェスでも差して時間を潰さないのか？': {
    ja: 'チェスでも差して時間を潰さないのか？',
    en: "Don't you pass the time playing chess?",
    ko: '체스라도 두면서 시간 때우진 않아?',
  },
  'ずっと壁でも眺めているのか？': {
    ja: 'ずっと壁でも眺めているのか？',
    en: 'Do you just stare at the wall the whole time?',
    ko: '계속 벽만 바라보고 있는 거야?',
  },
  '深く聞くつもりはなかったんだ': {
    ja: '深く聞くつもりはなかったんだ',
    en: "I didn't mean to pry so deeply",
    ko: '깊이 캐물을 생각은 없었어',
  },
  '昔の声で喋りづらくないか': {
    ja: '昔の声で喋りづらくないか',
    en: "Isn't it hard speaking with your old voice?",
    ko: '예전 목소리로 말하기 불편하진 않아?',
  },
  '11年前の機体だったか？　すごい技術だよな': {
    ja: '11年前の機体だったか？　すごい技術だよな',
    en: 'Craft from 11 years ago? Amazing tech.',
    ko: '11년 전 기체랬나? 대단한 기술이네',
  },
  'その高い声で必死に凄まれてもな': {
    ja: 'その高い声で必死に凄まれてもな',
    en: 'Hard to feel threatened by such a high voice',
    ko: '그 높은 목소리로 안간힘을 써봤자',
  },
  'からかうつもりはなかったんだ': {
    ja: 'からかうつもりはなかったんだ',
    en: "I didn't mean to tease you",
    ko: '놀릴 생각은 없었어',
  },
  '屋敷の公爵様や奥様のこと': {
    ja: '屋敷の公爵様や奥様のこと',
    en: 'About the Duke and Duchess',
    ko: '저택의 공작님과 사모님에 대하여',
  },
  'また奥様を泣かせてしまうと思っているのか？': {
    ja: 'また奥様を泣かせてしまうと思っているのか？',
    en: 'Do you think you would make the Duchess cry again?',
    ko: '또 사모님을 울리게 될까 봐 그래?',
  },
  '自分の居場所をルークに奪われた恨みか？': {
    ja: '自分の居場所をルークに奪われた恨みか？',
    en: 'Is it resentment that Luke took your place?',
    ko: '자신의 자리를 루크에게 빼앗긴 원망인가?',
  },
  '・・・・・・そうだな': {
    ja: '・・・・・・そうだな',
    en: '...Yeah, I suppose',
    ko: '......그렇겠네',
  },
  '傷のない体': {
    ja: '傷のない体',
    en: 'A body without scars',
    ko: '상처 없는 몸',
  },
  '自分の手を見て落ち着かないんじゃないか？': {
    ja: '自分の手を見て落ち着かないんじゃないか？',
    en: 'Does looking at your hands make you uneasy?',
    ko: '네 손을 보면 마음이 뒤숭숭하지 않아?',
  },
  '譜業の身体なら怪我もしないし便利だな': {
    ja: '譜業の身体なら怪我もしないし便利だな',
    en: "A craft body doesn't get hurt, so that's handy",
    ko: '포업 몸이면 다치지도 않고 편리하네',
  },
  'そりゃそうだよな': {
    ja: 'そりゃそうだよな',
    en: "Well, that's true",
    ko: '그야 그렇겠지',
  },
  '研究所に来ていた大佐のこと': {
    ja: '研究所に来ていた大佐のこと',
    en: 'About the Colonel visiting the lab',
    ko: '연구소에 찾아왔던 대령님에 대하여',
  },
  '大佐に勘付かれたくなかったのか？': {
    ja: '大佐に勘付かれたくなかったのか？',
    en: "Didn't want the Colonel to catch on?",
    ko: '대령님께 눈치채이고 싶지 않았어?',
  },
  'いっそ大佐を呼んで診てもらおうか？': {
    ja: 'いっそ大佐を呼んで診てもらおうか？',
    en: 'Shall we call the Colonel to take a look?',
    ko: '차라리 대령님을 불러 진찰받아 볼래?',
  },
  '大佐の話はやめておこうか': {
    ja: '大佐の話はやめておこうか',
    en: "Let's drop the talk about the Colonel",
    ko: '대령님 이야기는 그만둘까',
  },
  'エルドラントの後のこと': {
    ja: 'エルドラントの後のこと',
    en: 'After Eldrant',
    ko: '엘드란트 이후의 일',
  },
  'ロックをかけられている？': {
    ja: 'ロックをかけられている？',
    en: 'Are there locks placed on you?',
    ko: '잠금이 걸려 있는 거야?',
  },
  '空白の2年間の記録について': {
    ja: '空白の2年間の記録について',
    en: 'Regarding the 2 blank years of logs',
    ko: '공백의 2년간의 기록에 대하여',
  },
  'すまない、追い詰めるようなことを言って': {
    ja: 'すまない、追い詰めるようなことを言って',
    en: 'Sorry, I shouldn’t corner you like that',
    ko: '미안, 몰아세우는 말을 해서',
  },
  '頭痛は大丈夫か？': {
    ja: '頭痛は大丈夫か？',
    en: 'Is your headache alright?',
    ko: '두통은 괜찮아?',
  },
  'ディストはおまえに何を話したんだ？': {
    ja: 'ディストはおまえに何を話したんだ？',
    en: 'What did Dist tell you?',
    ko: '디스트는 네게 무슨 말을 한 거야?',
  },
  'なぜ前の機体が壊れたのか': {
    ja: 'なぜ前の機体が壊れたのか',
    en: 'Why the previous craft broke',
    ko: '어째서 이전 기체가 망가졌는지',
  },
  '前の機体に何があったのか': {
    ja: '前の機体に何があったのか',
    en: 'What happened to the previous craft',
    ko: '이전 기체에 무슨 일이 있었는지',
  },
  '前の機体に何があったのか（もう一度聞く）': {
    ja: '前の機体に何があったのか（もう一度聞く）',
    en: 'What happened to the previous craft (ask again)',
    ko: '이전 기체에 무슨 일이 있었는지 (다시 묻기)',
  },
  '何かを知って無茶をしたせいじゃないのか？': {
    ja: '何かを知って無茶をしたせいじゃないのか？',
    en: "Didn't you overdo it after finding something out?",
    ko: '뭔가를 알고 무리를 한 탓이 아냐?',
  },
  '無理に剣でも振ろうとしたのか？': {
    ja: '無理に剣でも振ろうとしたのか？',
    en: 'Did you force yourself to swing a sword?',
    ko: '억지로 검이라도 휘두르려 한 건가?',
  },
  '無理には聞かないが・・・・・・': {
    ja: '無理には聞かないが・・・・・・',
    en: "I won't force you, but...",
    ko: '무리해서 묻진 않겠지만......',
  },
  'おい、しっかりしろ！': {
    ja: 'おい、しっかりしろ！',
    en: 'Hey, pull yourself together!',
    ko: '야, 정신 차려!',
  },
  '・・・・・・もうこれ以上、話せることはない': {
    ja: '・・・・・・もうこれ以上、話せることはない',
    en: "...There's nothing more I can tell you",
    ko: '......이제 더 이상 할 말은 없다',
  },
  '部屋を出ていこうとするアッシュを引き止める': {
    ja: '部屋を出ていこうとするアッシュを引き止める',
    en: 'Stop Asch as he tries to leave the room',
    ko: '방을 나가려는 애쉬를 제지한다',
  },
  '待てよ！': {
    ja: '待てよ！',
    en: 'Wait!',
    ko: '기다려!',
  },
  '首の後ろに埃がついてるぞ': {
    ja: '首の後ろに埃がついてるぞ',
    en: "There's dust on the back of your neck",
    ko: '목 뒤에 먼지가 묻어 있다고',
  },
  '嘘だよな、こんな記録・・・・・・': {
    ja: '嘘だよな、こんな記録・・・・・・',
    en: 'This record must be a lie...',
    ko: '거짓말이지, 이런 기록......',
  },
  'ディストが記憶にロックをかけた理由': {
    ja: 'ディストが記憶にロックをかけた理由',
    en: 'Why Dist locked your memories',
    ko: '디스트가 기억에 락을 건 이유',
  },
  'ルークとナタリアの結婚の話': {
    ja: 'ルークとナタリアの結婚の話',
    en: "About Luke and Natalia's marriage",
    ko: '루크와 나탈리아의 결혼 이야기',
  },
  '言い過ぎたことを素直に謝る': {
    ja: '言い過ぎたことを素直に謝る',
    en: 'Honestly apologize for going too far',
    ko: '지나쳤던 점을 솔직하게 사과한다',
  },
  'さっきからなんだその態度は': {
    ja: 'さっきからなんだその態度は',
    en: "What's with that attitude since earlier?",
    ko: '아까부터 뭐야 그 태도는',
  },
  '今日のグランコクマの風': {
    ja: '今日のグランコクマの風',
    en: "Today's breeze in Grand Chokmah",
    ko: '오늘의 그란코크마의 바람',
  },
  '机の上の古い調査資料': {
    ja: '机の上の古い調査資料',
    en: 'Old research papers on the desk',
    ko: '책상 위의 낡은 조사 자료',
  },
  '棚に置いてあるチェス盤': {
    ja: '棚に置いてあるチェス盤',
    en: 'Chessboard on the shelf',
    ko: '선반에 놓인 체스판',
  },
  '気まずい': {
    ja: '気まずい',
    en: 'Awkward silence',
    ko: '어색하다',
  },
  '精巧な機体': {
    ja: '精巧な機体',
    en: 'Exquisite craft body',
    ko: '정교한 기체',
  },
  '屋敷の紅茶の香り': {
    ja: '屋敷の紅茶の香り',
    en: 'Aroma of manor black tea',
    ko: '저택의 홍차 향기',
  },
  '研究所の薬品臭いお茶': {
    ja: '研究所の薬品臭いお茶',
    en: 'Chemical-smelling tea from the lab',
    ko: '연구소의 약품 냄새 나는 차',
  },
  '一度でいいから': {
    ja: '一度でいいから',
    en: 'Just once',
    ko: '한 번만이라도',
  },
  'エプロンを着たタルロウ': {
    ja: 'エプロンを着たタルロウ',
    en: 'Tarlow wearing an apron',
    ko: '앞치마를 두른 타르로우',
  },
  'ナタリアの料理': {
    ja: 'ナタリアの料理',
    en: "Natalia's cooking",
    ko: '나탈리아의 요리',
  },
  'アッシュの年齢': {
    ja: 'アッシュの年齢',
    en: "Asch's age",
    ko: '애쉬의 나이',
  },
  'ルークの年齢': {
    ja: 'ルークの年齢',
    en: "Luke's age",
    ko: '루크의 나이',
  },
  'ディストを頼った理由': {
    ja: 'ディストを頼った理由',
    en: 'Why you turned to Dist',
    ko: '디스트를 의지한 이유',
  },
  'ディストとの二人暮らし': {
    ja: 'ディストとの二人暮らし',
    en: 'Living together with Dist',
    ko: '디스트와의 두 사람 생활',
  },
  'ディストへの小さな反抗': {
    ja: 'ディストへの小さな反抗',
    en: 'Little rebellions against Dist',
    ko: '디스트를 향한 작은 반항',
  },
  'ルークのこと': {
    ja: 'ルークのこと',
    en: 'About Luke',
    ko: '루크에 대하여',
  },

  // === フェーズ3：問いかけと選択肢 ===
  '・・・・・・ガイ。一つ聞いてもいいか。\nおまえには、俺が何に見える？': {
    ja: '・・・・・・ガイ。一つ聞いてもいいか。\nおまえには、俺が何に見える？',
    en: "...Guy. May I ask you one thing?\nTo you, what do I look like?",
    ko: '......가이. 하나 물어봐도 될까.\n네 눈에는, 내가 뭘로 보여?',
  },
  'おまえはアッシュだ': {
    ja: 'おまえはアッシュだ',
    en: 'You are Asch',
    ko: '너는 애쉬다',
  },
  '譜業人形にしか見えない': {
    ja: '譜業人形にしか見えない',
    en: 'You look like nothing but a fonic craft doll',
    ko: '포업 인형으로밖에 안 보여',
  },
  '（一定秒数答えず待機）': {
    ja: '（一定秒数答えず待機）',
    en: '(Wait in silence)',
    ko: '(침묵한 채 대기)',
  },

  // === エンディングタイトル＆サブタイトル ===
  'END 01 // たぶんタルロウA': {
    ja: 'END 01 // たぶんタルロウA',
    en: 'END 01 // Probably Tarlow A',
    ko: 'END 01 // 아마도 타르로우 A',
  },
  'GAME OVER // SO HE SAYS': {
    ja: 'GAME OVER // SO HE SAYS',
    en: 'GAME OVER // SO HE SAYS',
    ko: 'GAME OVER // SO HE SAYS',
  },
  'END 02 // 怒って帰っちゃった': {
    ja: 'END 02 // 怒って帰っちゃった',
    en: 'END 02 // Stormed Out Angry',
    ko: 'END 02 // 화내며 돌아가 버렸다',
  },
  'GAME OVER // SLAMMED DOOR': {
    ja: 'GAME OVER // SLAMMED DOOR',
    en: 'GAME OVER // SLAMMED DOOR',
    ko: 'GAME OVER // SLAMMED DOOR',
  },
  'END 03 // ただの譜業として': {
    ja: 'END 03 // ただの譜業として',
    en: 'END 03 // Just a Fonic Craft',
    ko: 'END 03 // 그저 평범한 포업으로서',
  },
  'END 04 // 研究所の同居人': {
    ja: 'END 04 // 研究所の同居人',
    en: 'END 04 // Roommates in the Lab',
    ko: 'END 04 // 연구소의 동거인',
  },
  'END 05 // おまえは誰だ': {
    ja: 'END 05 // おまえは誰だ',
    en: 'END 05 // Who Are You?',
    ko: 'END 05 // 너는 누구냐',
  },
  'END 06 // ナタリアの元へ': {
    ja: 'END 06 // ナタリアの元へ',
    en: 'END 06 // To Natalia',
    ko: 'END 06 // 나탈리아의 곁으로',
  },
  'END 07 // 二人の剣士': {
    ja: 'END 07 // 二人の剣士',
    en: 'END 07 // Two Swordsmen',
    ko: 'END 07 // 두 명의 검사',
  },
  'END 08 // 沈黙の夜': {
    ja: 'END 08 // 沈黙の夜',
    en: 'END 08 // Silent Night',
    ko: 'END 08 // 침묵의 밤',
  },
  'END 09 // 忘却の箱庭': {
    ja: 'END 09 // 忘却の箱庭',
    en: 'END 09 // Miniature Garden of Oblivion',
    ko: 'END 09 // 망각의 모형정원',
  },
  'END 10 // ゴースト・イン・ザ・マシン': {
    ja: 'END 10 // ゴースト・イン・ザ・マシン',
    en: 'END 10 // Ghost in the mASCHine',
    ko: 'END 10 // 고스트 인 더 머신',
  },

  // === ディストのエンディング後コメント ===
  '中身が誰の記憶なのかも見抜けず、本気でただの自律譜業だと思い込んで帰すとは': {
    ja: '中身が誰の記憶なのかも見抜けず、本気でただの自律譜業だと思い込んで帰すとは',
    en: "Unable to see whose memories reside inside, sending him back believing he's truly a mere autonomous craft...",
    ko: '속에 든 게 누구의 기억인지도 못 알아보고, 진짜로 단순한 자율 포업인 줄 알고 돌려보내다니.',
  },
  '節穴とは、まさにこのことを言うのでしょうね！': {
    ja: '節穴とは、まさにこのことを言うのでしょうね！',
    en: "'Having eyes but seeing nothing'—they must have coined that phrase just for you!",
    ko: "'눈뜬장님'이란, 바로 이런 걸 두고 하는 말이겠지요!",
  },
  'おや？帰ってきたのですか。てっきりあの男に破壊されるものだと思っていましたが・・・・・・': {
    ja: 'おや？帰ってきたのですか。てっきりあの男に破壊されるものだと思っていましたが・・・・・・',
    en: 'My, my? Back already? I was certain that man would reduce you to scrap, but...',
    ko: '이런? 돌아온 건가요. 틀림없이 그 사내에게 파괴당할 줄 알았는데 말이죠......',
  },
  'あっ！痛い！蹴るのを辞めなさいっ！': {
    ja: 'あっ！痛い！蹴るのを辞めなさいっ！',
    en: 'Ow! That hurts! Stop kicking me this instant!',
    ko: '앗! 아파요! 발길질 그만두지 못합니까!',
  },
  'また四肢の出力を下げますよ！': {
    ja: 'また四肢の出力を下げますよ！',
    en: "I'll throttle your limb output limiters again, I swear!",
    ko: '또 사지의 출력을 낮춰버릴 테니까요!',
  },
  'ほぉ・・・・・・。深入りせず逃がしましたか。甘いというか、煮え切らない男ですね': {
    ja: 'ほぉ・・・・・・。深入りせず逃がしましたか。甘いというか、煮え切らない男ですね',
    en: "Oh...? Let him slip away without probing deeper? Softhearted, or just indecisive, aren't we?",
    ko: '호오...... 깊이 파고들지 않고 보내주었군요. 무르다고 해야 할지, 우유부단한 사내로군요.',
  },
  '譜業に睡眠など不要だというのに、人間の真似事をさせるのですか？': {
    ja: '譜業に睡眠など不要だというのに、人間の真似事をさせるのですか？',
    en: 'Fonic crafts have no need for sleep, yet you indulge him in playing human?',
    ko: '포업에겐 수면 따위 필요치 않거늘, 인간 흉내를 내게 하는 겁니까?',
  },
  'お人好しなのか、それとも・・・・・・': {
    ja: 'お人好しなのか、それとも・・・・・・',
    en: 'Are you just a simple softie, or perhaps...',
    ko: '무른 건지, 아니면......',
  },
  'ふん、好きにすればいいでしょう。私としてはどちらでも構いませんからね': {
    ja: 'ふん、好きにすればいいでしょう。私としてはどちらでも構いませんからね',
    en: 'Hmph, do as you please. It makes no difference to me either way.',
    ko: '흥, 좋을 대로 하시죠. 제 입장에선 어느 쪽이든 상관없으니까요.',
  },
  'あなたにしては、しっかりと割り切りましたね': {
    ja: 'あなたにしては、しっかりと割り切りましたね',
    en: 'Quite the pragmatic detachment, considering who you are.',
    ko: '당신치고는 아주 깔끔하게 선을 그었군요.',
  },
  'ええ、賢明な判断ですよ。所詮は私が組んだ譜業人形にすぎないのですから': {
    ja: 'ええ、賢明な判断ですよ。所詮は私が組んだ譜業人形にすぎないのですから',
    en: 'Indeed, a wise choice. After all, he is merely a fonic puppet I crafted.',
    ko: '네에, 현명한 판단입니다. 어차피 제가 조립한 포업 인형에 불과하니까요.',
  },
  '帰還プログラムも無視して、一体何処へ行ったのやら・・・・・・': {
    ja: '帰還プログラムも無視して、一体何処へ行ったのやら・・・・・・',
    en: 'Ignoring even the homing routine, where on earth did he wander off to...?',
    ko: '귀환 프로그램도 무시하고, 대체 어디로 가버린 건지......',
  },
  'データは既に取りきっていますから、何処で朽ちてくれても困りませんが\nずいぶん退屈な幕引きになりましたね': {
    ja: 'データは既に取りきっていますから、何処で朽ちてくれても困りませんが\nずいぶん退屈な幕引きになりましたね',
    en: "I've extracted all necessary data, so it matters not where he rots away.\nStill, what a dreadfully dull finale.",
    ko: '데이터는 이미 다 뽑아냈으니, 어디서 썩어 문드러지든 상관은 없습니다만\n참으로 따분한 막을 내렸군요.',
  },
  '本当にそれでよろしいのですか？\nいえ、構いませんよ。私が困るわけではありませんし': {
    ja: '本当にそれでよろしいのですか？\nいえ、構いませんよ。私が困るわけではありませんし',
    en: "Are you truly satisfied with that?\nOh, fine by me. I'm not the one at a loss here.",
    ko: '정말로 그걸로 괜찮은 겁니까?\n아뇨, 상관없습니다. 제가 곤란할 일은 없으니까요.',
  },
  'お似合いの茶番劇なのではないですか？': {
    ja: 'お似合いの茶番劇なのではないですか？',
    en: "Isn't it such a fitting little farce for the two of you?",
    ko: '아주 딱 어울리는 한 편의 촌극이잖습니까?',
  },
  'おや、壊してしまいましたか。安心なさい。他言しませんし、責めるつもりもありませんよ': {
    ja: 'おや、壊してしまいましたか。安心なさい。他言しませんし、責めるつもりもありませんよ',
    en: "Oh my, broken it, have you? Rest easy. I shan't breathe a word, nor do I intend to blame you.",
    ko: '이런, 부숴버렸습니까. 안심하시길. 다른 데 발설하지도, 탓할 생각도 없으니까요.',
  },
  '壊れて困るものを他人に預けるはずないでしょう？': {
    ja: '壊れて困るものを他人に預けるはずないでしょう？',
    en: "Why would I ever entrust someone else with something I couldn't afford to break?",
    ko: '부서져서 곤란할 물건을 남에게 맡길 리가 없잖습니까?',
  },
  '皆は幸せ、彼も役目を果たして大満足': {
    ja: '皆は幸せ、彼も役目を果たして大満足',
    en: 'Everyone is happy, and he fulfilled his purpose with utter satisfaction.',
    ko: '모두가 행복하고, 그 또한 역할을 다해 대만족.',
  },
  '……なら、なぜあなたはそんな顔をしているんです？': {
    ja: '……なら、なぜあなたはそんな顔をしているんです？',
    en: '...Then pray tell, why are you making such a face?',
    ko: '……그렇다면, 대체 왜 당신은 그런 표정을 짓고 있는 겁니까?',
  },
  'あなたが望んだ「ハッピーエンド」でしょうに': {
    ja: 'あなたが望んだ「ハッピーエンド」でしょうに',
    en: "When this is the very 'happy ending' you wished for.",
    ko: '당신이 바라 마지않던 "해피 엔딩"일 텐데 말입니다.',
  },

  '機体モデルに関する質問時、「ふざけるな、これは俺の」という未フィルタ音声を出力。0.4秒後に「研究所にあった予備機体」へ修正': {
    ja: '機体モデルに関する質問時、「ふざけるな、これは俺の」という未フィルタ音声を出力。0.4秒後に「研究所にあった予備機体」へ修正',
    en: 'When questioned about the model, unfiltered audio saying "Don\'t mess with me, this is my—" was logged, corrected to "spare craft in the lab" after 0.4s.',
    ko: '기체 모델에 관한 질문 시, "웃기지 마, 이건 내—"라는 미필터 음성을 출력. 0.4초 후 "연구소에 있던 예비 기체"로 정정.',
  },
  '機体モデルに関する質問直後、発話前の0.7秒間に顔面駆動部の負荷が急上昇し、音素出力の乱れを記録': {
    ja: '機体モデルに関する質問直後、発話前の0.7秒間に顔面駆動部の負荷が急上昇し、音素出力の乱れを記録',
    en: 'Immediately after the model query, facial drive load spiked during 0.7s before speech, logging phonetic output irregularities.',
    ko: '기체 모델에 관한 질문 직후, 발화 전 0.7초간 안면 구동부 부하가 급상승하여 음소 출력 난조를 기록.',
  },
  '管理者（ディスト）に関する質問時、「誰があんな奴を」という未フィルタ音声を出力し、直後に定型文へ修正': {
    ja: '管理者（ディスト）に関する質問時、「誰があんな奴を」という未フィルタ音声を出力し、直後に定型文へ修正',
    en: 'When questioned about the administrator (Dist), unfiltered audio saying "Who would ever [call] that guy—" was logged, immediately corrected to boilerplate.',
    ko: '관리자(디스트)에 관한 질문 시, "누가 그딴 놈을"이라는 미필터 음성을 출력한 직후 정형 문구로 정정.',
  },
  'ディストの名前を出したとき、嫌そうな顔をして目を逸らしたよな。\n自分を造った相手に、ただの譜業がそんな顔をするわけない': {
    ja: 'ディストの名前を出したとき、嫌そうな顔をして目を逸らしたよな。\n自分を造った相手に、ただの譜業がそんな顔をするわけない',
    en: 'When I brought up Dist\'s name, you made a disgusted face and looked away.\nA mere fonic craft wouldn\'t look like that at its own creator.',
    ko: '디스트의 이름을 꺼냈을 때, 싫은 표정을 지으며 눈을 돌렸잖아.\n자신을 만든 상대에게 단순한 포업이 그런 표정을 지을 리 없어.',
  },
  '管理者（ディスト）に関する質問直後、発話前の0.7秒間に視線回避動作および音素周波数の乱れを記録': {
    ja: '管理者（ディスト）に関する質問直後、発話前の0.7秒間に視線回避動作および音素周波数の乱れを記録',
    en: 'Immediately after the question about Dist, recorded gaze-avoidance behavior and phoneme frequency fluctuations in the 0.7s prior to speech.',
    ko: '관리자(디스트)에 관한 질문 직후, 발화 전 0.7초간 시선 회피 동작 및 음소 주파수 난조를 기록.',
  },
  'なっ、ガイッ！？': {
    ja: 'なっ、ガイッ！？',
    en: 'Wh—Guy!?',
    ko: '앗, 가이!?',
  },
  '・・・・・・ガ、ガキ扱いするな！': {
    ja: '・・・・・・ガ、ガキ扱いするな！',
    en: '...D-Don\'t treat me like a brat!',
    ko: '......애, 애 취급하지 마라!',
  },
  '頭に触れようとしたとき、思わず「ガイ」って呼んだよな。\n俺を知らないはずなのに、なんで名前が出てくるんだ？': {
    ja: '頭に触れようとしたとき、思わず「ガイ」って呼んだよな。\n俺を知らないはずなのに、なんで名前が出てくるんだ？',
    en: 'When I reached for your head, you blurted out "Guy".\nIf you don\'t know me, why did my name come out of your mouth?',
    ko: '머리에 손을 대려 했을 때, 무심코 "가이"라고 불렀지.\n날 모를 텐데, 어째서 내 이름이 튀어나온 거지?',
  },
  '頭部への接近動作を検知した瞬間、0.1秒で「なっ、ガイッ！？」と対象人物の個人名を音声出力。直後に発言を修正': {
    ja: '頭部への接近動作を検知した瞬間、0.1秒で「なっ、ガイッ！？」と対象人物の個人名を音声出力。直後に発言を修正',
    en: 'Upon detecting approach toward head, voiced target\'s personal name ("Wh—Guy!?") within 0.1s, immediately followed by correction.',
    ko: '두부 접근 동작 감지 순간, 0.1초 만에 "앗, 가이!?"라며 대상자의 개인명을 음성 출력. 직후 발언을 정정.',
  },
  'そうか、おまえの手に戻ったんだな・・・・・・': {
    ja: 'そうか、おまえの手に戻ったんだな・・・・・・',
    en: 'I see... so it found its way back to your hands...',
    ko: '그렇군, 네 손으로 돌아간 건가......',
  },
  '・・・・・・なんでもない': {
    ja: '・・・・・・なんでもない',
    en: '...Never mind.',
    ko: '......아무것도 아니다.',
  },
  '・・・・・・おまえは、アッシュだよ': {
    ja: '・・・・・・おまえは、アッシュだよ',
    en: '...You\'re Asch.',
    ko: '......너는, 애쉬야.',
  },
  '・・・・・・おまえが最初に言っていた通り\nおまえは譜業人形みたいだな': {
    ja: '・・・・・・おまえが最初に言っていた通り\nおまえは譜業人形みたいだな',
    en: '...Just like you told me at the start,\nyou really do seem like a fonic doll.',
    ko: '......네가 처음에 말했던 대로,\n너는 포업 인형인 것 같네.',
  },
  '・・・・・・ここまで言い張るなら、本当にそうなんだろうな。\n変に引き止めて悪かった': {
    ja: '・・・・・・ここまで言い張るなら、本当にそうなんだろうな。\n変に引き止めて悪かった',
    en: '...If you insist this far, I suppose it must be true.\nSorry for holding you back like this.',
    ko: '......여기까지 우긴다면, 정말로 그런 거겠지.\n이상하게 붙잡아서 미안했다.',
  },
  'あ、おい！\nまだ聞きたいことが': {
    ja: 'あ、おい！\nまだ聞きたいことが',
    en: 'Ah, hey!\nI still had things to ask—',
    ko: '아, 이봐!\n아직 묻고 싶은 게—',
  },
  '・・・・・・今日、おまえと話せてよかったよ。\nおまえの事情も分かったから、誰にも言わずにおく。気が向いたら、またいつでも来いよ': {
    ja: '・・・・・・今日、おまえと話せてよかったよ。\nおまえの事情も分かったから、誰にも言わずにおく。気が向いたら、またいつでも来いよ',
    en: '...I\'m glad I got to talk with you today.\nI understand your circumstances now, so I won\'t tell a soul. Feel free to come back whenever you feel like it.',
    ko: '......오늘, 너랑 이야기해서 좋았어.\n네 사정도 알았으니, 아무에게도 말하지 않을게. 생각나면 언제든 또 찾아와.',
  },
  '・・・・・・なあ。そんなに急いで戻ることもないだろ。\nそこのソファで、少し休んでいけよ': {
    ja: '・・・・・・なあ。そんなに急いで戻ることもないだろ。\nそこのソファで、少し休んでいけよ',
    en: '...Hey. There\'s no need to rush back so quickly.\nRest for a bit on that sofa over there.',
    ko: '......이봐. 그렇게 서둘러 돌아갈 것도 없잖아.\n저기 소파에서 좀 쉬다 가.',
  },
  '・・・・・・なあ、今すぐ急いで戻らなくてもいいだろ。そこのソファで少し休んでいけよ': {
    ja: '・・・・・・なあ、今すぐ急いで戻らなくてもいいだろ。そこのソファで少し休んでいけよ',
    en: '...Hey, you don\'t have to rush back right this second. Rest on the sofa for a bit.',
    ko: '......이봐, 지금 당장 서둘러 가지 않아도 되잖아. 저 소파에서 조금 쉬다 가.',
  },
  '・・・・・・少し休んでいけよ。熱い茶でも淹れ直すからさ': {
    ja: '・・・・・・少し休んでいけよ。熱い茶でも淹れ直すからさ',
    en: '...Rest for a while. I\'ll brew another fresh cup of hot tea for you.',
    ko: '......조금 쉬다 가. 따뜻한 차라도 새로 끓여줄 테니까.',
  },
  '・・・・・・待てよ！\nそんな息も絶え絶えな状態で、帰れるわけないだろ': {
    ja: '・・・・・・待てよ！\nそんな息も絶え絶えな状態で、帰れるわけないだろ',
    en: '...Wait!\nYou can\'t possibly walk back gasping for breath like that!',
    ko: '......기다려!\n그렇게 숨도 제대로 못 쉬면서 어떻게 돌아가겠단 거야.',
  },
  '・・・・・・なあ、アッシュ': {
    ja: '・・・・・・なあ、アッシュ',
    en: '...Hey, Asch.',
    ko: '......이봐, 애쉬.',
  },
  '・・・・・・おい、本当に歩けるのか？\n無理するなよ・・・・・・': {
    ja: '・・・・・・おい、本当に歩けるのか？\n無理するなよ・・・・・・',
    en: '...Hey, can you really even walk?\nDon\'t push yourself...',
    ko: '......이봐, 정말 걸을 수는 있어?\n무리하지 마......',
  },
  '・・・・・・アッシュ。\n首の後ろ・・・・・・埃がついてるぞ。取ってやる': {
    ja: '・・・・・・アッシュ。\n首の後ろ・・・・・・埃がついてるぞ。取ってやる',
    en: '...Asch.\nThe back of your neck... there\'s some dust. Let me brush it off.',
    ko: '......애쉬.\n목 뒤에...... 먼지가 묻었어. 털어줄게.',
  },
  '・・・・・・おまえ、本当に知らないのか？\n２ヶ月前に、自分が何で壊れたのかも・・・・・・': {
    ja: '・・・・・・おまえ、本当に知らないのか？\n２ヶ月前に、自分が何で壊れたのかも・・・・・・',
    en: '...Do you truly not know?\nEven what broke you two months ago...?',
    ko: '......너, 정말로 모르는 거야?\n2달 전에 자신이 왜 부서졌는지조차......',
  },
  '・・・・・・っ、こんな、譜業の体でもか': {
    ja: '・・・・・・っ、こんな、譜業の体でもか',
    en: '...Even in a fonic body like this...?',
    ko: '......큭, 이런 포업의 몸인데도 말이냐.',
  },
  '・・・・・・っ、こんな、譜業の体でもか。\nそれで、何もかも見えるんだろう？\nそんなのは、人間とは呼べないはずだ': {
    ja: '・・・・・・っ、こんな、譜業の体でもか。\nそれで、何もかも見えるんだろう？\nそんなのは、人間とは呼べないはずだ',
    en: '...Even in a body like this?\nAnd you can see everything in that terminal, can\'t you?\nThere\'s no way you can call something like that human.',
    ko: '......큭, 이런 포업의 몸인데도 말이냐.\n거기서 모든 걸 다 봤을 텐데?\n그런 건 인간이라고 부를 수 없을 텐데 말이다.',
  },
  '・・・・・・！！': {
    ja: '・・・・・・！！',
    en: '...!!',
    ko: '......!!',
  },
  '・・・・・・ああ、そうだ。俺はただの自律譜業タルロウAだ。\n分かったなら、もう二度と俺に関わるな': {
    ja: '・・・・・・ああ、そうだ。俺はただの自律譜業タルロウAだ。\n分かったなら、もう二度と俺に関わるな',
    en: '...Yeah, that\'s right. I\'m just a simple autonomous fonic craft, Tarlow A.\nNow that you know, don\'t you ever get involved with me again.',
    ko: '......그래, 맞다. 난 단순한 자율 포업 타르로우 A다.\n알았으면 다시는 내 일에 상관하지 마라.',
  },
  'フン！\nもう話は終わりだ。俺は研究所へ戻る！': {
    ja: 'フン！\nもう話は終わりだ。俺は研究所へ戻る！',
    en: 'Hmph!\nWe\'re done talking. I\'m going back to the lab!',
    ko: '흥!\n이제 볼일은 끝났다. 난 연구소로 돌아가겠다!',
  },
  '・・・・・・ああ。\n・・・・・・じゃあな、ガイ': {
    ja: '・・・・・・ああ。\n・・・・・・じゃあな、ガイ',
    en: '...Yeah.\n...See ya, Guy.',
    ko: '......그래.\n......잘 있어라, 가이.',
  },
  '・・・・・・ふん。くだらない。\n俺に休息など必要ない': {
    ja: '・・・・・・ふん。くだらない。\n俺に休息など必要ない',
    en: '...Hmph. Ridiculous.\nI have no need for rest.',
    ko: '......흥. 시시하군.\n내겐 휴식 따위 필요 없다.',
  },
  '・・・・・・話はそれで終わりか？\n俺は研究所へ戻る': {
    ja: '・・・・・・話はそれで終わりか？\n俺は研究所へ戻る',
    en: '...Is that all you had to say?\nI am returning to the lab.',
    ko: '......할 말은 그걸로 끝인가?\n난 연구소로 돌아가겠다.',
  },
  '・・・・・・急に何を言い出すかと思えば。\n休息など必要ない': {
    ja: '・・・・・・急に何を言い出すかと思えば。\n休息など必要ない',
    en: '...What nonsense is that all of a sudden?\nI have no need for rest.',
    ko: '......느닷없이 무슨 소릴 하나 했더니.\n휴식 따위 필요 없다.',
  },
  '・・・・・・っ、ハァ・・・・・・放せ・・・・・・っ、俺は・・・・・・': {
    ja: '・・・・・・っ、ハァ・・・・・・放せ・・・・・・っ、俺は・・・・・・',
    en: '...Gah, haah... Let go... I am...',
    ko: '......큭, 하아...... 놓아라...... 난......',
  },
  '・・・・・・？　なんだ。': {
    ja: '・・・・・・？　なんだ。',
    en: '...? What is it.',
    ko: '......? 뭐냐.',
  },
  '・・・・・・っ、ハァ・・・・・・余計な、心配をするな・・・・・・っ': {
    ja: '・・・・・・っ、ハァ・・・・・・余計な、心配をするな・・・・・・っ',
    en: '...Gah, haah... Stop worrying... over nothing...!',
    ko: '......큭, 하아...... 쓸데없는 걱정...... 하지 마라......',
  },
  '？　・・・・・・何だ。\n・・・・・・っ、おい、気安く触るなと言って――': {
    ja: '？　・・・・・・何だ。\n・・・・・・っ、おい、気安く触るなと言って――',
    en: '? ...What is it.\n...Hey, didn\'t I tell you not to touch me so casually—',
    ko: '? ......뭐냐.\n......큭, 이봐, 함부로 만지지 말라고—',
  },
  '・・・・・・っ、何の話だ。さっきから・・・・・・': {
    ja: '・・・・・・っ、何の話だ。さっきから・・・・・・',
    en: '...What are you talking about? You\'ve been going on since earlier...',
    ko: '......큭, 무슨 소릴 하는 거냐, 아까부터......',
  },
  '体が譜業でも何でも、おまえはおまえだろ。違うか？': {
    ja: '体が譜業でも何でも、おまえはおまえだろ。違うか？',
    en: 'Whether your body is a fonic craft or whatever else, you\'re still you. Am I wrong?',
    ko: '몸이 포업이든 뭐든, 넌 너잖아? 안 그래?',
  },
  'わ、わからない': {
    ja: 'わ、わからない',
    en: 'I-I don\'t know.',
    ko: '모, 모르겠어.',
  },
  'ははっ、わからないことあるかよ？': {
    ja: 'ははっ、わからないことあるかよ？',
    en: 'Haha, how can you not know?',
    ko: '하하, 모를 게 뭐가 있어?',
  },
  'わかんないならいいじゃねえか。一旦アッシュってことで！': {
    ja: 'わかんないならいいじゃねえか。一旦アッシュってことで！',
    en: 'If you don\'t know, then that\'s fine! Let\'s just say you\'re Asch for now!',
    ko: '모르겠으면 됐잖아. 일단 애쉬인 걸로 치자고!',
  },
  'ふっ': {
    ja: 'ふっ',
    en: 'Hmph.',
    ko: '풋.',
  },
  '参考にする': {
    ja: '参考にする',
    en: 'I\'ll take it under consideration.',
    ko: '참고는 해 두지.',
  },
  'おいおい、聞いておいて参考にするだけか？': {
    ja: 'おいおい、聞いておいて参考にするだけか？',
    en: 'Whoa now, you asked me just to take it under consideration?',
    ko: '어이어이, 물어봐 놓고 고작 참고만 하겠다고?',
  },
  '俺はもう行く': {
    ja: '俺はもう行く',
    en: 'I\'m leaving now.',
    ko: '난 이제 가겠다.',
  },
  '行くって、どこに': {
    ja: '行くって、どこに',
    en: 'Leaving? Where to?',
    ko: '간다니, 어디로?',
  },
  '研究所に帰るだけだ': {
    ja: '研究所に帰るだけだ',
    en: 'Just heading back to the lab.',
    ko: '연구소로 돌아갈 뿐이다.',
  },
  '・・・・・・またな': {
    ja: '・・・・・・またな',
    en: '...See you later.',
    ko: '......또 보자.',
  },
  '怒ってる、か？　わ、悪かったって！　興味本位で覗いちまって・・・・・・': {
    ja: '怒ってる、か？　わ、悪かったって！　興味本位で覗いちまって・・・・・・',
    en: 'Are you mad? I-I\'m sorry, alright! Prying out of curiosity like that...',
    ko: '화났어? 미, 미안하다니까! 호기심에 들여다봐서......',
  },
  'そ、それよりだな\nおまえはおまえだろ。違うか？': {
    ja: 'そ、それよりだな\nおまえはおまえだろ。違うか？',
    en: 'M-More importantly,\nyou\'re still you, right? Am I wrong?',
    ko: '그, 그보다 말이야.\n넌 너잖아? 안 그래?',
  },
  '・・・・・・最、初から、そう言っていれば良かったんだ': {
    ja: '・・・・・・最、初から、そう言っていれば良かったんだ',
    en: '...You should have just said that from the very beginning.',
    ko: '......처, 음부터 그렇게 말했으면 됐잖아.',
  },
  '悪いね。何でも自分で見て判断したいタチなんだ': {
    ja: '悪いね。何でも自分で見て判断したいタチなんだ',
    en: 'My bad. I just have a habit of seeing and judging everything with my own eyes.',
    ko: '미안하게 됐네. 뭐든 내 눈으로 직접 보고 판단하는 성미라서 말이지.',
  },
  '・・・・・・それで、気は済んだか': {
    ja: '・・・・・・それで、気は済んだか',
    en: '...Satisfied now?',
    ko: '......그래서, 속은 시원하냐.',
  },
  'ああ、・・・・・・もう、大丈夫だ': {
    ja: 'ああ、・・・・・・もう、大丈夫だ',
    en: 'Yeah... I\'m good now.',
    ko: '응...... 이제, 괜찮아.',
  },
  '・・・・・・そうか': {
    ja: '・・・・・・そうか',
    en: '...I see.',
    ko: '......그런가.',
  },
  'なら、任務完了だ。ディストのところへ帰投する': {
    ja: 'なら、任務完了だ。ディストのところへ帰投する',
    en: 'Then my mission is complete. Returning to Dist\'s post.',
    ko: '그렇다면 임무 완료다. 디스트에게 복귀하겠다.',
  },
  '・・・・・・アッシュ': {
    ja: '・・・・・・アッシュ',
    en: '...Asch.',
    ko: '......애쉬.',
  },
  '・・・・・・タルロウAだ。二度と間違えるな、ガイ・セシル': {
    ja: '・・・・・・タルロウAだ。二度と間違えるな、ガイ・セシル',
    en: '...I am Tarlow A. Do not mistake it again, Guy Cecil.',
    ko: '......타르로우 A다. 다시는 틀리지 마라, 가이 세실.',
  },
  '・・・・・・、いや。いい。なんでもない': {
    ja: '・・・・・・、いや。いい。なんでもない',
    en: '...No. Forget it. It\'s nothing.',
    ko: '......아니. 됐어. 아무것도 아니야.',
  },
  '変なことを聞いた。忘れてくれ': {
    ja: '変なことを聞いた。忘れてくれ',
    en: 'I asked something weird. Forget it.',
    ko: '이상한 걸 물었군. 잊어버려라.',
  },
  'そう言うなって。\n少し横になるくらい、減るもんじゃないだろ': {
    ja: 'そう言うなって。\n少し横になるくらい、減るもんじゃないだろ',
    en: 'Don\'t be like that.\nLying down for a bit won\'t wear you out.',
    ko: '그렇게 굴지 마.\n잠깐 눕는다고 닳는 것도 아니잖아.',
  },
  '・・・・・・言っておくが、寝るわけじゃないからな。\n・・・・・・少し、座るだけだ': {
    ja: '・・・・・・言っておくが、寝るわけじゃないからな。\n・・・・・・少し、座るだけだ',
    en: '...Just so you know, I\'m not going to sleep.\n...I\'m just sitting for a moment.',
    ko: '......미리 말해두는데, 자는 건 아니니까.\n......조금 앉아 있을 뿐이다.',
  },
  'そう言うなって。\nおまえとこうして茶を飲むのも、いつぶりか分かんねえしな。\n・・・・・・少しだけ、付き合えよ': {
    ja: 'そう言うなって。\nおまえとこうして茶を飲むのも、いつぶりか分かんねえしな。\n・・・・・・少しだけ、付き合えよ',
    en: 'Don\'t say that.\nWho knows how long it\'s been since we sat down for tea like this.\n...Humor me for just a bit.',
    ko: '그러지 말고.\n너랑 이렇게 차를 마시는 것도 얼마 만인지 모르겠는데 말이야.\n......잠깐만 어울려 줘.',
  },
  '・・・・・・っ\n一杯だけだ。飲んだら帰るからな！': {
    ja: '・・・・・・っ\n一杯だけだ。飲んだら帰るからな！',
    en: '...Gah!\nJust one cup! As soon as I\'m done, I\'m leaving!',
    ko: '......큭!\n딱 한 잔만이다. 다 마시면 갈 거니까!',
  },
  'ああ。・・・・・・すぐ淹れるよ': {
    ja: 'ああ。・・・・・・すぐ淹れるよ',
    en: 'Yeah... I\'ll brew it right away.',
    ko: '응...... 바로 타 올게.',
  },
  '頼むから、少し座って息を整えろ。\n・・・・・・熱い茶でも淹れ直すからさ': {
    ja: '頼むから、少し座って息を整えろ。\n・・・・・・熱い茶でも淹れ直すからさ',
    en: 'I\'m begging you, just sit down and catch your breath.\n...I\'ll brew another fresh cup of hot tea.',
    ko: '부탁이니까, 조금 앉아서 숨 좀 가다듬어.\n......따뜻한 차라도 새로 타 올 테니까.',
  },
  '・・・・・・っ。\n・・・・・・ハァ・・・・・・一杯だけだぞ・・・・・・っ': {
    ja: '・・・・・・っ。\n・・・・・・ハァ・・・・・・一杯だけだぞ・・・・・・っ',
    en: '...Gah.\n...Haah... Just one cup, got that...!',
    ko: '......큭.\n......하아...... 딱 한 잔뿐이다......',
  },
  '・・・・・・いや。\n夜道だ、気をつけて帰れよ': {
    ja: '・・・・・・いや。\n夜道だ、気をつけて帰れよ',
    en: '...No.\nIt\'s dark outside, be careful on your way back.',
    ko: '......아니.\n밤길이다, 조심해서 돌아가.',
  },
  '・・・・・・ふん。子ども扱いするな。\n・・・・・・じゃあな、ガイ': {
    ja: '・・・・・・ふん。子ども扱いするな。\n・・・・・・じゃあな、ガイ',
    en: '...Hmph. Don\'t treat me like a child.\n...See ya, Guy.',
    ko: '......흥. 애 취급하지 마라.\n......잘 있어라, 가이.',
  },
  'ああ。・・・・・・またな': {
    ja: 'ああ。・・・・・・またな',
    en: 'Yeah... See you around.',
    ko: '응...... 또 보자.',
  },
  '・・・・・・何かあったら、すぐ呼べよ。\n・・・・・・気をつけてな': {
    ja: '・・・・・・何かあったら、すぐ呼べよ。\n・・・・・・気をつけてな',
    en: '...If anything happens, call me right away.\n...Take care.',
    ko: '......무슨 일 있으면, 바로 불러.\n......조심하고.',
  },
  '・・・・・・ふん。・・・・・・言われなくても分かってる。\n・・・・・・じゃあな、ガイ': {
    ja: '・・・・・・ふん。・・・・・・言われなくても分かってる。\n・・・・・・じゃあな、ガイ',
    en: '...Hmph. ...I know without you telling me.\n...See ya, Guy.',
    ko: '......흥. ......말 안 해도 알고 있다.\n......잘 있어라, 가이.',
  },
  '・・・・・・ああ。またな': {
    ja: '・・・・・・ああ。またな',
    en: '...Yeah. See ya.',
    ko: '......응. 또 보자.',
  },
  '・・・・・・っ、が・・・・・・イ・・・・・・？': {
    ja: '・・・・・・っ、が・・・・・・イ・・・・・・？',
    en: '...Gah, G... uy...?',
    ko: '......큭, 가...... 이......?',
  },
  'な、にを・・・・・・し、て・・・・・・': {
    ja: 'な、にを・・・・・・し、て・・・・・・',
    en: 'Wh-what... are you... do... ing...',
    ko: '무, 슨 짓을...... 하, 는......',
  },
  'これで・・・・・・': {
    ja: 'これで・・・・・・',
    en: 'With this...',
    ko: '이걸로......',
  },
  '・・・・・・これで、いいんだ': {
    ja: '・・・・・・これで、いいんだ',
    en: '...This is for the best.',
    ko: '......이걸로, 된 거야.',
  },
  '・・・・・・見てくれ。嘘だって言ってくれよ、こんなの・・・・・・！': {
    ja: '・・・・・・見てくれ。嘘だって言ってくれよ、こんなの・・・・・・！',
    en: '...Look at this. Tell me this is a lie, please...!',
    ko: '......이것 좀 봐줘. 거짓말이라고 해줘, 이런 거......!',
  },
  '・・・・・・？\n・・・・・・っ！？ こ、れは・・・・・・': {
    ja: '・・・・・・？\n・・・・・・っ！？ こ、れは・・・・・・',
    en: '...?\n...!? Th-this is...',
    ko: '......?\n......큭!? 이, 이건......',
  },
  '本当なのか？ ここに書いてあることは、本当に・・・・・・！': {
    ja: '本当なのか？ ここに書いてあることは、本当に・・・・・・！',
    en: 'Is it true? What is written here, is it really...!',
    ko: '진짜인 거냐? 여기에 적혀 있는 말은, 정말로......!',
  },
  'し、らない・・・・・・\n俺の記憶には、何も・・・・・・': {
    ja: 'し、らない・・・・・・\n俺の記憶には、何も・・・・・・',
    en: 'I-I don\'t know...\nThere\'s nothing in my memories...',
    ko: '모, 몰라......\n내 기억에는, 아무것도......',
  },
  '・・・・・・大爆発、・・・・・・そうだ、それで俺は、ディストに・・・・・・': {
    ja: '・・・・・・大爆発、・・・・・・そうだ、それで俺は、ディストに・・・・・・',
    en: '...The massive explosion... Right, and after that, Dist...',
    ko: '......대폭발, ......맞아, 그래서 난, 디스트에게......',
  },
  '・・・・・・俺の身体に、ルークの記憶を・・・・・・': {
    ja: '・・・・・・俺の身体に、ルークの記憶を・・・・・・',
    en: '...Into my body, Luke\'s memories were...',
    ko: '......내 몸에, 루크의 기억을......',
  },
  'そうだ、だから俺は、・・・・・・！': {
    ja: 'そうだ、だから俺は、・・・・・・！',
    en: 'That\'s right, so that\'s why I...!',
    ko: '그래, 그러니까 나는, ......!',
  },
  '・・・・・・アッシュ！': {
    ja: '・・・・・・アッシュ！',
    en: '...Asch!',
    ko: '......애쉬!',
  },
  'っ、ガイ・・・・・・': {
    ja: 'っ、ガイ・・・・・・',
    en: 'Gh, Guy...',
    ko: '큭, 가이......',
  },
  '・・・・・・っ、': {
    ja: '・・・・・・っ、',
    en: '...!',
    ko: '......큭,',
  },
  'やめろ・・・・・・っ、そんな顔すんなよ・・・・・・！': {
    ja: 'やめろ・・・・・・っ、そんな顔すんなよ・・・・・・！',
    en: 'Stop it... Don\'t make a face like that...!',
    ko: '하지 마...... 그런 표정 짓지 말라고......!',
  },
  '言えよ・・・・・・！': {
    ja: '言えよ・・・・・・！',
    en: 'Say it...!',
    ko: '말해......!',
  },
  '自分は紛れもなく、アッシュだって・・・・・・言え！！！！': {
    ja: '自分は紛れもなく、アッシュだって・・・・・・言え！！！！',
    en: 'Tell me that you\'re unmistakably Asch... SAY IT!!!!',
    ko: '자신은 틀림없는 애쉬라고...... 말하라고!!!!',
  },
  '・・・・・・頼むから、': {
    ja: '・・・・・・頼むから、',
    en: '...Please,',
    ko: '......부탁이니까,',
  },
  '言ってくれ・・・・・・っ': {
    ja: '言ってくれ・・・・・・っ',
    en: 'Just tell me... please...',
    ko: '말해줘...... 제발...',
  },
  '・・・・・・そうだ。俺が、アッシュだ': {
    ja: '・・・・・・そうだ。俺が、アッシュだ',
    en: '...That\'s right. I am Asch.',
    ko: '......그래. 내가, 애쉬다.',
  },
  '俺が――・・・・・・': {
    ja: '俺が――・・・・・・',
    en: 'I am—...',
    ko: '내가—......',
  },
  'どうやら、俺の思い違いだったようだ': {
    ja: 'どうやら、俺の思い違いだったようだ',
    en: 'Seems it was all in my head after all.',
    ko: '아무래도 내 착각이었던 모양이다.',
  },
  'ただの譜業にしちゃ、妙に態度が人間臭かった気もするけど・・・・・・\nまあ、気のせいか': {
    ja: 'ただの譜業にしちゃ、妙に態度が人間臭かった気もするけど・・・・・・\nまあ、気のせいか',
    en: 'His attitude felt strangely human for a mere fonic craft, though...\nWell, must have imagined it.',
    ko: '단순한 포업치고는 묘하게 태도가 인간다웠던 것 같기도 하지만......\n뭐, 기분 탓인가.',
  },
  'まいったな、すっかり臍を曲げられたまま帰られちまった': {
    ja: 'まいったな、すっかり臍を曲げられたまま帰られちまった',
    en: 'Good grief, he stormed off in a total huff.',
    ko: '난감하네, 완전히 삐친 채로 돌아가 버렸군.',
  },
  'あんな風に突っ撥ねるところはどう見てもアッシュなんだけど・・・・・・\nもう少し落ち着いて話せばよかったな': {
    ja: 'あんな風に突っ撥ねるところはどう見てもアッシュなんだけど・・・・・・\nもう少し落ち着いて話せばよかったな',
    en: 'The way he lashed out was unmistakable for Asch, though...\nI should have handled that with a bit more calm.',
    ko: '그렇게 퉁명스럽게 쳐내는 모습은 어딜 봐도 애쉬였는데......\n조금 더 차분하게 이야기해 볼 걸 그랬어.',
  },
  '詳しい事情までは聞けなかったけど・・・・・・まあ、本人が言いたくないなら無理に暴くこともないか': {
    ja: '詳しい事情までは聞けなかったけど・・・・・・まあ、本人が言いたくないなら無理に暴くこともないか',
    en: 'I couldn\'t get the full story out of him, but... well, if he doesn\'t want to talk, no sense in prying it open by force.',
    ko: '자세한 사정까지는 듣지 못했지만...... 뭐, 본인이 말하기 싫다면 억지로 캐물을 것도 없겠지.',
  },
  'せめてナタリアには会ってやりゃいいのに': {
    ja: 'せめてナタリアには会ってやりゃいいのに',
    en: 'At the very least, he could have gone to see Natalia.',
    ko: '적어도 나탈리아만큼은 만나보고 가지.',
  },
  '相変わらず可愛げのない態度だけど、なんだかんだ堪えてるみたいだな・・・・・・': {
    ja: '相変わらず可愛げのない態度だけど、なんだかんだ堪えてるみたいだな・・・・・・',
    en: 'Unpleasant as ever, but he\'s soldiering on in his own way...',
    ko: '여전히 싹싹하지 못한 태도지만, 어떻게든 버텨내고 있는 모양이네......',
  },
  '休息は必要ないらしいが、子どもみたいにソファに丸まって横になっている': {
    ja: '休息は必要ないらしいが、子どもみたいにソファに丸まって横になっている',
    en: 'He claimed he had no need for rest, yet he lies curled up on the sofa just like a child.',
    ko: '휴식 따윈 필요 없다더니, 어린아이처럼 소파에 웅크리고 누워 있다.',
  },
  'これは、「少し」じゃ済まないかもな': {
    ja: 'これは、「少し」じゃ済まないかもな',
    en: 'Guess this won\'t be over in just \'a little while\'.',
    ko: '이러면, \"조금\" 쉬는 걸로는 안 끝나겠는데.',
  },
  '我ながら随分と適当なことを言ったもんだ': {
    ja: '我ながら随分と適当なことを言ったもんだ',
    en: 'Even for me, that was quite the reckless thing to say.',
    ko: '나 스스로도 참 무책임한 소릴 지껄였다 싶다.',
  },
  'だけど、あいつの存在を証明するのに、これ以上の理屈なんて必要ない': {
    ja: 'だけど、あいつの存在を証明するのに、これ以上の理屈なんて必要ない',
    en: 'Still, proving his very existence doesn\'t need any more reason than that.',
    ko: '하지만, 그 녀석의 존재를 증명하는 데 이 이상의 논리 따윈 필요 없어.',
  },
  '参考にもしてくれるらしいしな': {
    ja: '参考にもしてくれるらしいしな',
    en: 'And he did say he\'d take it under consideration.',
    ko: '참고는 해 주겠다고도 했으니까 말이야.',
  },
  '扉が閉まる': {
    ja: '扉が閉まる',
    en: 'The door clicks shut.',
    ko: '문이 닫힌다.',
  },
  'あいつのしたいようにやらせてやるのが一番なんだ、と自分に言い聞かせる': {
    ja: 'あいつのしたいようにやらせてやるのが一番なんだ、と自分に言い聞かせる',
    en: 'Letting him do as he pleases is what\'s best—I tell myself.',
    ko: '그 녀석이 하고 싶은 대로 하게 놔두는 게 최선이다, 라며 스스로를 타이른다.',
  },
  '・・・・・・いや。そうすることしか、できなかった': {
    ja: '・・・・・・いや。そうすることしか、できなかった',
    en: '...No. That was simply the only thing I could do.',
    ko: '......아니. 그렇게 할 수밖에 없었던 거다.',
  },
  'そう言って、アッシュは部屋から出ていった': {
    ja: 'そう言って、アッシュは部屋から出ていった',
    en: 'With those parting words, Asch walked out of the room.',
    ko: '그렇게 말하고, 애쉬는 방을 나갔다.',
  },
  '翌日、研究所に出向いたが、奴の姿はなかった。\n残ったのは、この管理端末だけだ': {
    ja: '翌日、研究所に出向いたが、奴の姿はなかった。\n残ったのは、この管理端末だけだ',
    en: 'The next day, I went to the lab, but he was nowhere to be found.\nAll that remained was this management terminal.',
    ko: '다음 날 연구소를 찾아갔지만, 녀석의 모습은 없었다.\n남겨진 것은 이 관리 단말기뿐이었다.',
  },
  '湯気を立てるケトルの向こうで、あいつが静かに座っている': {
    ja: '湯気を立てるケトルの向こうで、あいつが静かに座っている',
    en: 'Beyond the steaming kettle, he sits in quiet stillness.',
    ko: '김이 피어오르는 주전자 너머로, 녀석이 조용히 앉아 있다.',
  },
  '喉元まで出かけた真実は、全部俺が呑み込めばいい': {
    ja: '喉元まで出かけた真実は、全部俺が呑み込めばいい',
    en: 'The truth rising to the edge of my throat—I will swallow every last bit of it.',
    ko: '목구멍까지 차오른 진실은, 내가 전부 삼켜내면 된다.',
  },
  '墓場まで持っていく秘密が、ひとつ増えただけの話だ': {
    ja: '墓場まで持っていく秘密が、ひとつ増えただけの話だ',
    en: 'Just one more secret I\'ll take to my grave.',
    ko: '무덤까지 가져갈 비밀이 하나 늘었을 뿐이다.',
  },
  '――そうだ。それできっと、全部うまくいく': {
    ja: '――そうだ。それできっと、全部うまくいく',
    en: '—Yes. That way, everything will surely be alright.',
    ko: '――그래. 그러면 분명, 전부 잘 풀릴 것이다.',
  },
  'バチカルの日常と、あの子どもの身体で研究所へ戻るあいつ': {
    ja: 'バチカルの日常と、あの子どもの身体で研究所へ戻るあいつ',
    en: 'Everyday life in Baticul, and him returning to the lab in that child body.',
    ko: '바티칼의 일상과, 그 어린아이의 몸으로 연구소에 돌아가는 녀석.',
  },
  'どちらの真実も壊さないために、俺が全部呑み込めばいい': {
    ja: 'どちらの真実も壊さないために、俺が全部呑み込めばいい',
    en: 'To keep neither truth from shattering, I will carry it all alone.',
    ko: '어느 쪽의 진실도 깨뜨리지 않기 위해, 내가 전부 삼켜내면 된다.',
  },
  '床に横たわった、動かなくなった譜業を見下ろす': {
    ja: '床に横たわった、動かなくなった譜業を見下ろす',
    en: 'I look down at the lifeless fonic craft resting on the floor.',
    ko: '바닥에 누워 움직이지 않게 된 포업을 내려다본다.',
  },
  'タタル渓谷へ帰ってきて、今バチカルで笑っているあいつは、これからもずっと『ルーク』だ': {
    ja: 'タタル渓谷へ帰ってきて、今バチカルで笑っているあいつは、これからもずっと『ルーク』だ',
    en: 'The one who returned to the Tataroo Valley and laughs in Baticul today—he will remain \'Luke\' forevermore.',
    ko: '타타르 계곡으로 돌아와 지금 바티칼에서 웃고 있는 녀석은, 앞으로도 영원히 "루크"다.',
  },
  'あとは、俺が今日のことを忘れてしまうだけでいい': {
    ja: 'あとは、俺が今日のことを忘れてしまうだけでいい',
    en: 'All that is left is for me to forget today ever happened.',
    ko: '이제는, 내가 오늘 일을 잊어버리기만 하면 된다.',
  },
  'きっとあいつは誰かに「アッシュ」だと\n認められたかったんだろう': {
    ja: 'きっとあいつは誰かに「アッシュ」だと\n認められたかったんだろう',
    en: 'Surely, he just longed for someone to acknowledge him\nas "Asch".',
    ko: '분명 녀석은 누군가에게 "애쉬"라고\n인정받고 싶었을 것이다.',
  },
  'それを、俺は、俺のためだけに\nあいつ自身に「アッシュ」だと言わせてしまった': {
    ja: 'それを、俺は、俺のためだけに\nあいつ自身に「アッシュ」だと言わせてしまった',
    en: 'And yet, solely for my own sake,\nI forced him to utter that he was "Asch".',
    ko: '그것을, 나는 오직 나 자신만을 위해\n녀석의 입으로 직접 "애쉬"라고 말하게 해 버렸다.',
  },
  '――あれからというもの、あいつは堂々としている': {
    ja: '――あれからというもの、あいつは堂々としている',
    en: '—Ever since that day, he has carried himself proudly.',
    ko: '――그 뒤로 녀석은 당당하게 지내고 있다.',
  },
  '先日、皆に会いに行ったようだ\nルークも、ナタリアも・・・・・・皆泣いて喜んだらしい': {
    ja: '先日、皆に会いに行ったようだ\nルークも、ナタリアも・・・・・・皆泣いて喜んだらしい',
    en: 'Just the other day, it seems he went to see everyone.\nLuke, Natalia... they all wept with joy, so I hear.',
    ko: '얼마 전, 모두를 만나러 갔던 모양이다.\n루크도, 나탈리아도...... 다들 울며 기뻐했다고 한다.',
  },
  'これでよかったんだ': {
    ja: 'これでよかったんだ',
    en: 'This was for the best.',
    ko: '이걸로 됐던 거야.',
  },
  '何度、自分にそう言い聞かせても\nあの記録の文字が、頭にこびりついて離れない': {
    ja: '何度、自分にそう言い聞かせても\nあの記録の文字が、頭にこびりついて離れない',
    en: 'No matter how many times I tell myself that,\nthose words from the record remain seared into my mind.',
    ko: '몇 번이나 스스로를 그렇게 타이른다 해도,\n그 기록의 글자들이 머릿속에 들러붙어 떨어지지 않는다.',
  },

  'ピオニー陛下のブウサギ': {
    ja: 'ピオニー陛下のブウサギ',
    en: 'Emperor Peony\'s Rappe',
    ko: '피오니 폐하의 부우사기',
  },
  '食事はとるのか': {
    ja: '食事はとるのか',
    en: 'Do you eat food?',
    ko: '식사는 하는가',
  },
  '『タルロウX』の語尾': {
    ja: '『タルロウX』の語尾',
    en: 'The speech quirk of \'Tarlow X\'',
    ko: '"타르로우 X"의 어미',
  },
  '部屋の隅で何をしていたか': {
    ja: '部屋の隅で何をしていたか',
    en: 'What were you doing in the corner?',
    ko: '방구석에서 뭘 하고 있었나',
  },
  'そこの壁際に置いてある刀、珍しい形をしてるだろ。見覚えはないか？': {
    ja: 'そこの壁際に置いてある刀、珍しい形をしてるだろ。見覚えはないか？',
    en: 'That sword resting against the wall over there has quite a rare shape, doesn\'t it? Recognize it?',
    ko: '저기 벽 쪽에 놓인 도, 보기 드문 모양이지. 본 기억 없어?',
  },
  '最近バチカルに行ったんだが、ナタリアとルークの結婚の話が本格的に進んでるって聞いたぞ。彼女、すごく嬉しそうだった': {
    ja: '最近バチカルに行ったんだが、ナタリアとルークの結婚の話が本格的に進んでるって聞いたぞ。彼女、すごく嬉しそうだった',
    en: 'I went to Baticul recently, and heard wedding talks between Natalia and Luke are moving along for real. She looked so happy.',
    ko: '얼마 전에 바티칼에 갔었는데, 나탈리아와 루크의 혼담이 본격적으로 진행되고 있다더군. 그녀, 무척 기뻐 보였어.',
  },
  'そういえばピオニー陛下の飼ってるブウサギに『アッシュ』って名前のやつがいてな。俺が時々世話をしてるんだ': {
    ja: 'そういえばピオニー陛下の飼ってるブウサギに『アッシュ』って名前のやつがいてな。俺が時々世話をしてるんだ',
    en: 'Come to think of it, Emperor Peony has a rappe named "Asch". I look after it from time to time.',
    ko: '그러고 보니 피오니 폐하가 키우는 부우사기 중에 "애쉬"라는 녀석이 있어서 말이지. 내가 가끔 돌봐주고 있어.',
  },
  'あのディストが作った機体なら、人間の食事も摂れるんじゃないのか？\n美味いタコ料理を出す店があるんだが、どうだ？': {
    ja: 'あのディストが作った機体なら、人間の食事も摂れるんじゃないのか？\n美味いタコ料理を出す店があるんだが、どうだ？',
    en: 'If it\'s a craft built by Dist, can\'t you eat human food too?\nI know a place that serves great octopus dishes. How about it?',
    ko: '그 디스트가 만든 기체라면, 인간의 음식도 섭취할 수 있지 않아?\n맛있는 문어 요리를 파는 가게가 있는데, 어때?',
  },
  '昔、六神将に『鮮血のアッシュ』って呼ばれてた奴がいたんだが、そいつ、身長が低いことを気にしてたらしいぞ': {
    ja: '昔、六神将に『鮮血のアッシュ』って呼ばれてた奴がいたんだが、そいつ、身長が低いことを気にしてたらしいぞ',
    en: 'Long ago among the God-Generals, there was a guy called "Asch the Bloody". Word is he was insecure about being short.',
    ko: '예전에 육신장에 "선혈의 애쉬"라고 불리던 녀석이 있었는데, 그 녀석 키가 작은 걸 꽤 신경 썼다더군.',
  },
  'おまえはタルロウXの後継機なんだろ？　語尾に『ズラ』ってつけないのか？': {
    ja: 'おまえはタルロウXの後継機なんだろ？　語尾に『ズラ』ってつけないのか？',
    en: 'You\'re the successor to Tarlow X, aren\'t you? Don\'t you end your sentences with "zura"?',
    ko: '너 타르로우 X의 후계기잖아? 어미에 "즈라" 안 붙여?',
  },
  '俺がディストの研究所に入ったとき、部屋の隅に立っていたろ。あそこで実験の助手でもしていたのか？': {
    ja: '俺がディストの研究所に入ったとき、部屋の隅に立っていたろ。あそこで実験の助手でもしていたのか？',
    en: 'When I entered Dist\'s lab, you were standing in the corner of the room. Were you acting as an experiment assistant there?',
    ko: '내가 디스트의 연구소에 들어갔을 때, 방구석에 서 있었잖아. 거기서 실험 조수라도 하고 있었어?',
  },
  '知らん。その刀がなんだろうと俺には関係ない': {
    ja: '知らん。その刀がなんだろうと俺には関係ない',
    en: 'No idea. Whatever that blade is has nothing to do with me.',
    ko: '모른다. 그 칼이 뭐든 나와는 상관없다.',
  },
  '知らん。他国の王族の話など、俺には何の関係もないことだ': {
    ja: '知らん。他国の王族の話など、俺には何の関係もないことだ',
    en: 'No idea. Talk of another nation\'s royalty has nothing to do with me.',
    ko: '모른다. 다른 나라 왕족 이야기 따위, 나와는 아무 상관없는 일이다.',
  },
  'だから何だ。他人のペットの話など俺には関係ない': {
    ja: 'だから何だ。他人のペットの話など俺には関係ない',
    en: 'So what? Talk about someone else\'s pet has nothing to do with me.',
    ko: '그래서 어쩌라고. 남의 애완동물 이야기 따위 내 알 바 아니다.',
  },
  '俺は譜業だから食事は摂らない。音素の供給さえあれば稼働に問題はない': {
    ja: '俺は譜業だから食事は摂らない。音素の供給さえあれば稼働に問題はない',
    en: 'I\'m a fonic craft, so I don\'t eat food. As long as there\'s fonon supply, operation is unaffected.',
    ko: '난 포업이라 식사는 하지 않는다. 음소 공급만 있다면 가동에 문제없다.',
  },
  '知らん。俺には関係ない': {
    ja: '知らん。俺には関係ない',
    en: 'No idea. It has nothing to do with me.',
    ko: '모른다. 나와는 상관없다.',
  },
  '俺は最新機だ。そんな古臭い語尾は使わない。旧型のポンコツと一緒にするな': {
    ja: '俺は最新機だ。そんな古臭い語尾は使わない。旧型のポンコツと一緒にするな',
    en: 'I am the latest model. I don\'t use archaic speech filters like that. Don\'t lump me in with outdated junk.',
    ko: '난 최신 기체다. 그런 케케묵은 어미 따윈 쓰지 않는다. 구형 고물과 똑같이 취급하지 마라.',
  },
  '俺はあの部屋の管理機体だ。待機していただけだ、怪しまれる覚えはない': {
    ja: '俺はあの部屋の管理機体だ。待機していただけだ、怪しまれる覚えはない',
    en: 'I am the maintenance craft of that room. I was merely on standby, nothing suspicious about it.',
    ko: '난 그 방의 관리 기체다. 대기하고 있었을 뿐이다, 의심받을 이유는 없다.',
  },
  '・・・・・・っ、あいつらが、結婚・・・・・・！？': {
    ja: '・・・・・・っ、あいつらが、結婚・・・・・・！？',
    en: '...Wh—Those two, marriage...?!',
    ko: '......큭, 그 녀석들이, 결혼......!?',
  },
  'なっ・・・・・・！？ なんで俺の名前が・・・・・・ッ！': {
    ja: 'なっ・・・・・・！？ なんで俺の名前が・・・・・・ッ！',
    en: 'Wh—...!? Why is MY name being used...!',
    ko: '뭐라고......!? 왜 내 이름이......읏!',
  },
  '嫌がらせか・・・・・・？': {
    ja: '嫌がらせか・・・・・・？',
    en: 'Is this harassment...?',
    ko: '괴롭히는 거냐......?',
  },
  '気にしてなど・・・・・・ッ！': {
    ja: '気にしてなど・・・・・・ッ！',
    en: 'I didn\'t care about that...!',
    ko: '신경 따위...... 쓰지 않았...!',
  },
  '・・・・・・いや、その刀がなんだろうと俺には関係ない': {
    ja: '・・・・・・いや、その刀がなんだろうと俺には関係ない',
    en: '...No, whatever that sword is has nothing to do with me.',
    ko: '......아니, 그 칼이 뭐든 나와는 상관없다.',
  },
  '・・・・・・知らん。他国の王族の話など、俺には何の関係もないことだ': {
    ja: '・・・・・・知らん。他国の王族の話など、俺には何の関係もないことだ',
    en: '...No idea. Talk of foreign royals is none of my concern.',
    ko: '......모른다. 타국 왕족 이야기 따위, 나와는 아무런 상관도 없다.',
  },
  '・・・・・・だから何だ。他人のペットの話など俺には関係ない': {
    ja: '・・・・・・だから何だ。他人のペットの話など俺には関係ない',
    en: '...So what? Other people\'s pets have nothing to do with me.',
    ko: '......그래서 뭐냐. 남의 애완동물 이야기 따위 내 알 바 아니다.',
  },
  '・・・・・・俺は譜業だから食事は摂らない。音素の供給さえあれば稼働に問題はない': {
    ja: '・・・・・・俺は譜業だから食事は摂らない。音素の供給さえあれば稼働に問題はない',
    en: '...I am a fonic craft, so I don\'t consume food. As long as fonons are supplied, operation is fine.',
    ko: '......난 포업이라 식사는 하지 않는다. 음소 공급만 있다면 가동에는 지장 없다.',
  },
  'そうか。あいつが背負い込みすぎて潰れなきゃいいがな': {
    ja: 'そうか。あいつが背負い込みすぎて潰れなきゃいいがな',
    en: 'I see. I just hope he doesn\'t shoulder too much and break down.',
    ko: '그런가. 그 녀석이 너무 짊어지다 짓눌리지나 않으면 좋겠군.',
  },
  '・・・・・・だっ、誰が心配なんかするか！': {
    ja: '・・・・・・だっ、誰が心配なんかするか！',
    en: '...Wh—Who\'s worrying about him?!',
    ko: '......누, 누가 걱정 따윌 할 줄 아냐!',
  },
  'お人好しめ': {
    ja: 'お人好しめ',
    en: 'Soft-hearted fool.',
    ko: '물러터진 녀석.',
  },
  '・・・・・・駄目では、ないが・・・・・・': {
    ja: '・・・・・・駄目では、ないが・・・・・・',
    en: '...It\'s not that it\'s bad, but...',
    ko: '......안 될 건, 없지만......',
  },
  'ふん、だったら最初から放っておけばよかっただろうが！': {
    ja: 'ふん、だったら最初から放っておけばよかっただろうが！',
    en: 'Hmph, then you should have just left me alone from the start!',
    ko: '흥, 그럴 거면 처음부터 내버려 뒀으면 됐잖아!',
  },
  '今や英雄様だからな。あいつも忙しそうにあちこち飛び回ってるよ': {
    ja: '今や英雄様だからな。あいつも忙しそうにあちこち飛び回ってるよ',
    en: 'He\'s the hero of the world now, after all. Busy flying all over the place.',
    ko: '이제는 영웅 나으리시니까. 그 녀석도 바쁘게 여기저기 날아다니고 있어.',
  },
  '元気にやってるみたいだぜ。\nなんだ、心配なのか？': {
    ja: '元気にやってるみたいだぜ。\nなんだ、心配なのか？',
    en: 'Seems he\'s doing great.\nWhat, were you worried?',
    ko: '건강하게 잘 지내는 것 같더라.\n뭐야, 걱정돼?',
  },
  'さあ、わからないな': {
    ja: 'さあ、わからないな',
    en: 'Well, who knows.',
    ko: '글쎄, 모르겠네.',
  },
  'あのなあ。あんなとこに置いておけるわけがないだろーがっ！': {
    ja: 'あのなあ。あんなとこに置いておけるわけがないだろーがっ！',
    en: 'Come on now! There\'s no way in hell I could just leave you there!',
    ko: '이봐. 그런 곳에 널 내버려 둘 수 있을 리가 없잖아!',
  },
  'もう一度、おまえとちゃんと話したかったんだよ。それだけじゃ駄目か？': {
    ja: 'もう一度、おまえとちゃんと話したかったんだよ。それだけじゃ駄目か？',
    en: 'I just wanted to talk with you properly one more time. Is that so wrong?',
    ko: '다시 한번 너랑 제대로 이야기하고 싶었어. 그것만으론 안 돼?',
  },
  '連れ出したものの、こうもつっかかられ続けちゃ後悔もするよ': {
    ja: '連れ出したものの、こうもつっかかられ続けちゃ後悔もするよ',
    en: 'I brought you out here, but if you keep snapping at me like this, I might start regretting it.',
    ko: '데리고 나오긴 했는데, 이렇게 계속 쏘아붙이기만 하면 후회되잖아.',
  },
  '退避して？': {
    ja: '退避して？',
    en: 'Evacuate where?',
    ko: '대피해서?',
  },
  '味覚受容センサーと気化排熱機構': {
    ja: '味覚受容センサーと気化排熱機構',
    en: 'Taste Sensors & Vapor Heat Dissipation',
    ko: '미각 수용 센서와 기화 배열 기구',
  },
  '自律給仕型家事労働補助プロトコル': {
    ja: '自律給仕型家事労働補助プロトコル',
    en: 'Autonomous Butler Housework Protocol',
    ko: '자율 급사형 가사 노동 보조 프로토콜',
  },
  '休止モードと睡眠機能の未実装': {
    ja: '休止モードと睡眠機能の未実装',
    en: 'Unimplemented Sleep & Standby Functions',
    ko: '휴식 모드와 수면 기능의 미구현',
  },
  '屋敷時代の話題における発声中断と未出力テキスト': {
    ja: '屋敷時代の話題における発声中断と未出力テキスト',
    en: 'Speech Halts & Unvoiced Text on Manor Topics',
    ko: '저택 시절 화제에 대한 발성 중단 및 미출력 텍스트',
  },
  '痛覚オミットと生体模倣の限界': {
    ja: '痛覚オミットと生体模倣の限界',
    en: 'Pain Reception Omission & Biomimetic Limits',
    ko: '통각 생략과 생체 모방의 한계',
  },
  '記憶防衛プロテクト強制励起の形跡': {
    ja: '記憶防衛プロテクト強制励起の形跡',
    en: 'Traces of Forced Memory Defense Activation',
    ko: '기억 방어 프로텍트 강제 여기의 흔적',
  },

  // === 分割行（pushScreenBubbleで1行ずつ渡されるセリフ） ===
  '離せ。俺は『アッシュ』なんかじゃない、ディストが造った自律譜業『タルロウA』だ。': {
    ja: '離せ。俺は『アッシュ』なんかじゃない、ディストが造った自律譜業『タルロウA』だ。',
    en: "Let go of me. I'm not 'Asch'. I'm 'Tarlow A', an autonomous fonic craft built by Dist.",
    ko: '이 손 놓아라. 난 "애쉬" 같은 게 아냐. 디스트가 만든 자율 포업 "타르로우 A"다.',
  },
  'おまえが誰かは知らんが、用がないならさっさと研究所へ戻せ': {
    ja: 'おまえが誰かは知らんが、用がないならさっさと研究所へ戻せ',
    en: "I don't care who you are. If you don't need anything, send me back to the lab.",
    ko: '네놈이 누군진 몰라도, 볼일 없으면 당장 연구소로 돌려보내라.',
  },
  '・・・・・・ガイ。一つ聞いてもいいか。': {
    ja: '・・・・・・ガイ。一つ聞いてもいいか。',
    en: '...Guy. Can I ask you one thing?',
    'ko': '......가이. 하나 물어봐도 될까.',
  },
  'おまえには、俺が何に見える？': {
    ja: 'おまえには、俺が何に見える？',
    en: 'What do I look like to you?',
    ko: '네 눈에는, 내가 뭘로 보여?',
  },

  'いい加減にしろ！ 何度も触るなと言っているだろうが！': {
    ja: 'いい加減にしろ！ 何度も触るなと言っているだろうが！',
    en: 'Enough already! Didn\'t I tell you not to keep touching me?!',
    ko: '작작 좀 해라! 몇 번이나 만지지 말라고 말했을 텐데!',
  },
  'これ以上鬱陶しい真似を続けるなら、俺は今すぐ研究所へ戻るからな！': {
    ja: 'これ以上鬱陶しい真似を続けるなら、俺は今すぐ研究所へ戻るからな！',
    en: 'If you keep pestering me like this, I\'m going back to the lab right this second!',
    ko: '이 이상 귀찮게 굴면, 난 지금 당장 연구소로 돌아갈 테니까!',
  },
  '触るなと言っているだろうが！ 気安く近寄るな': {
    ja: '触るなと言っているだろうが！ 気安く近寄るな',
    en: 'Didn\'t I say not to touch me?! Don\'t come near me so casually!',
    ko: '만지지 말라고 했잖아! 함부로 다가오지 마!',
  },
  'しつこいぞ！ ガキ扱いするなと言ったのが聞こえなかったのか！': {
    ja: 'しつこいぞ！ ガキ扱いするなと言ったのが聞こえなかったのか！',
    en: 'Persistent bastard! Didn\'t you hear me say don\'t treat me like a brat?!',
    ko: '끈질기군! 애 취급하지 말라는 소리 안 들렸냐!',
  },
  'いい加減にしろ！ これ以上近寄るな！': {
    ja: 'いい加減にしろ！ これ以上近寄るな！',
    en: 'Enough already! Don\'t come any closer!',
    ko: '작작 좀 해라! 더 이상 다가오지 마!',
  },
  'や、やめろ': {
    ja: 'や、やめろ',
    en: 'S-Stop it...',
    ko: '그, 그만둬...',
  },
  'やめろと言ってるだろう・・・・・・！': {
    ja: 'やめろと言ってるだろう・・・・・・！',
    en: 'I told you to stop...!',
    ko: '그만두라고 했잖아......!',
  },
  '勝手にしろ。どうせ止めても聞かないんだろう': {
    ja: '勝手にしろ。どうせ止めても聞かないんだろう',
    en: 'Do as you please. You wouldn\'t listen even if I stopped you anyway.',
    ko: '좋을 대로 해라. 어차피 말려도 안 들을 거잖아.',
  },
  'な、何をする。急に触るな': {
    ja: 'な、何をする。急に触るな',
    en: 'Wh-what are you doing? Don\'t touch me all of a sudden.',
    ko: '무, 무슨 짓이야. 갑자기 만지지 마.',
  },
  'おまえ、さっき一瞬顔色が変わったよな？　本当は『タルロウA』なんかじゃないんだろ': {
    ja: 'おまえ、さっき一瞬顔色が変わったよな？　本当は『タルロウA』なんかじゃないんだろ',
    en: 'Your expression changed for a split second earlier, didn\'t it? You\'re not really "Tarlow A", are you?',
    ko: '너, 방금 안색이 확 바뀌었지? 사실은 "타르로우 A" 같은 게 아닌 거지?',
  },
  'おまえ、さっき『ガイ』って俺の名前を呼んだよな？　本当は『タルロウA』なんかじゃないんだろ': {
    ja: 'おまえ、さっき『ガイ』って俺の名前を呼んだよな？　本当は『タルロウA』なんかじゃないんだろ',
    en: 'You called my name "Guy" just a moment ago, didn\'t you? You\'re not really "Tarlow A", are you?',
    ko: '너, 방금 내 이름을 "가이"라고 불렀지? 사실은 "타르로우 A" 같은 게 아닌 거지?',
  },
  'おまえ、さっき声が上ずってたぞ。本当は『タルロウA』なんかじゃないんだろ': {
    ja: 'おまえ、さっき声が上ずってたぞ。本当は『タルロウA』なんかじゃないんだろ',
    en: 'Your voice cracked high earlier. You\'re not really "Tarlow A", are you?',
    ko: '너, 방금 목소리가 떨리더군. 사실은 "타르로우 A" 같은 게 아닌 거지?',
  },
  'おまえ、さっきやけに早口で言い返したぞ。本当は『タルロウA』なんかじゃないんだろ': {
    ja: 'おまえ、さっきやけに早口で言い返したぞ。本当は『タルロウA』なんかじゃないんだろ',
    en: 'You talked unusually fast when you shot back. You\'re not really "Tarlow A", are you?',
    ko: '너, 방금 유난히 말수가 빨라져서 맞받아쳤지. 사실은 "타르로우 A" 같은 게 아닌 거지?',
  },
  'おまえ、タルロウにしては口調が違いすぎるぞ。本当は『タルロウA』なんかじゃないんだろ': {
    ja: 'おまえ、タルロウにしては口調が違いすぎるぞ。本当は『タルロウA』なんかじゃないんだろ',
    en: 'Your tone differs way too much for a Tarlow craft. You\'re not really "Tarlow A", are you?',
    ko: '너, 타르로우치고는 어투가 너무 다르잖아. 사실은 "타르로우 A" 같은 게 아닌 거지?',
  },
  '言いがかりだな。俺は最初から事実しか言っていない。\n疑う根拠がないなら、さっさと研究所へ戻せ': {
    ja: '言いがかりだな。俺は最初から事実しか言っていない。\n疑う根拠がないなら、さっさと研究所へ戻せ',
    en: 'A baseless accusation. I have spoken only facts from the start.\nIf you have no proof to doubt me, send me back to the lab at once.',
    ko: '억지 부리지 마라. 난 처음부터 사실만을 말했다.\n의심할 근거가 없다면 어서 연구소로 돌려보내라.',
  },
  '言いがかりだな。俺は最初から事実しか言っていない。': {
    ja: '言いがかりだな。俺は最初から事実しか言っていない。',
    en: 'A baseless accusation. I have spoken only facts from the start.',
    ko: '억지 부리지 마라. 난 처음부터 사실만을 말했다.',
  },
  '疑う根拠がないなら、さっさと研究所へ戻せ': {
    ja: '疑う根拠がないなら、さっさと研究所へ戻せ',
    en: 'If you have no proof to doubt me, send me back to the lab at once.',
    ko: '의심할 근거가 없다면 어서 연구소로 돌려보내라.',
  },
  '本作は『テイルズ オブ ジ アビス』の非公式二次創作ゲームです。': {
    ja: '本作は『テイルズ オブ ジ アビス』の非公式二次創作ゲームです。',
    en: 'This work is an unofficial fan game of "Tales of the Abyss".',
    ko: '본 작품은 "테일즈 오브 디 어비스"의 비공식 2차 창작 게임입니다.',
  },
  '原作および関係各社様とは一切関係ございません。': {
    ja: '原作および関係各社様とは一切関係ございません。',
    en: 'It has no affiliation with the original authors or copyright holders.',
    ko: '원작 및 관계 각사와는 일체 관계가 없습니다.',
  },
  '素人が作ってるので多目にみてください！': {
    ja: '素人が作ってるので多目にみてください！',
    en: 'Created by an amateur, so please be kind!',
    ko: '아마추어가 만든 것이니 너그럽게 봐주세요!',
  },
  '台本に戻る': {
    ja: '台本に戻る',
    en: 'Back to Scripts',
    ko: '대본으로 복귀',
  },
  '頭に手を伸ばす': {
    ja: '頭に手を伸ばす',
    en: 'Reach for his head',
    ko: '머리에 손을 뻗는다',
  },
  '頭を撫でる': {
    ja: '頭を撫でる',
    en: 'Pat his head',
    ko: '머리를 쓰다듬는다',
  },

  '初期登録済みの基本機体仕様': {
    ja: '初期登録済みの基本機体仕様',
    en: 'Pre-registered Basic Chassis Specifications',
    ko: '초기 등록된 기본 기체 사양',
  },
  '機体基本仕様': {
    ja: '機体基本仕様',
    en: 'Base Unit Specifications',
    ko: '기체 기본 사양',
  },
  '機体仕様': {
    ja: '機体仕様',
    en: 'Chassis Specifications',
    ko: '기체 사양',
  },
  '自律譜業『タルロウA』（現・予備機体）の基本構造。\n第七音素循環系および擬似知覚センサーは正常稼働中。\n音素出力の上昇時、冷却系から顔面表皮へ排熱される構造につき、高負荷時は顔面表面温度の上昇が発生する。': {
    ja: '自律譜業『タルロウA』（現・予備機体）の基本構造。\n第七音素循環系および擬似知覚センサーは正常稼働中。\n音素出力の上昇時、冷却系から顔面表皮へ排熱される構造につき、高負荷時は顔面表面温度の上昇が発生する。',
    en: 'Basic structure of Autonomous Fonic Craft \'Tarlow A\' (current spare chassis).\nSeventh Fonon circulation system and pseudo-sensory sensors are operating normally.\nDue to the cooling design radiating heat to the facial surface when fonon output rises, surface temperature increases under high load.',
    ko: '자율 포업 "타르로우 A"(현재 예비 기체)의 기본 구조.\n제7음소 순환계 및 의사 지각 센서는 정상 가동 중.\n음소 출력 상승 시 냉각계에서 안면 표피로 열을 배출하는 구조이므로, 고부하 시 안면 표면 온도가 상승함.',
  },
  '「俺は『アッシュ』なんかじゃない、ディストが造った自律譜業『タルロウA』だ。」': {
    ja: '「俺は『アッシュ』なんかじゃない、ディストが造った自律譜業『タルロウA』だ。」',
    en: '"I\'m not \'Asch\'. I\'m \'Tarlow A\', an Autonomous Fonic Craft made by Dist."',
    ko: '"난 \"애쉬\" 따위가 아니야. 디스트가 만든 자율 포업 \"타르로우 A\"다."',
  },
  '自らの機体名を『タルロウA』と名乗った際の発言': {
    ja: '自らの機体名を『タルロウA』と名乗った際の発言',
    en: 'Uttered when declaring his chassis name as "Tarlow A"',
    ko: '자신의 기체명을 "타르로우 A"라고 밝혔을 때의 발언',
  },
  '機体名登録・音声設定破損履歴': {
    ja: '機体名登録・音声設定破損履歴',
    en: 'Unit Registration & Speech Corrupted Log',
    ko: '기체명 등록 및 음성 설정 파손 이력',
  },
  '小型自律譜業『タルロウX』の後継機として識別名『タルロウA』を登録した記録。\n初期設定時、管理者がタルロウシリーズ共通の語尾フィルタ（『〜ズラ』）および服従プロトコルを入力しようとした際、本機が設定用コンソールを物理破壊。\n言語野データは未加工のまま生体時の出力パターンが維持されている。': {
    ja: '小型自律譜業『タルロウX』の後継機として識別名『タルロウA』を登録した記録。\n初期設定時、管理者がタルロウシリーズ共通の語尾フィルタ（『〜ズラ』）および服従プロトコルを入力しようとした際、本機が設定用コンソールを物理破壊。\n言語野データは未加工のまま生体時の出力パターンが維持されている。',
    en: 'Log of registering designation \'Tarlow A\' as successor to compact autonomous fonic craft \'Tarlow X\'.\nDuring initial setup, when administrator attempted to apply series speech filter (\'~zura\') and obedience protocols, this unit physically smashed the configuration console.\nLanguage synthesis data remains unmodified, preserving speech habits from life.',
    ko: '소형 자율 포업 "타르로우 X"의 후계기로 식별명 "타르로우 A"를 등록한 기록.\n초기 설정 시 관리자가 타르로우 시리즈 공통의 어미 필터("~즈라") 및 복종 프로토콜을 입력하려 하자, 본 기체가 설정 콘솔을 물리적으로 파괴함.\n언어 데이터는 미가공 상태로 생전의 출력 패턴을 유지 중.',
  },
  '「おまえが誰かは知らんが、用がないならさっさと研究所へ戻せ。」': {
    ja: '「おまえが誰かは知らんが、用がないならさっさと研究所へ戻せ。」',
    en: '"I don\'t know who you are, but if you don\'t need anything, send me back to the laboratory at once."',
    ko: '"네놈이 누군진 모르겠지만, 볼일 없으면 냉큼 연구소로 돌려보내."',
  },
  'ガイのことを知らないふりをした際の発言': {
    ja: 'ガイのことを知らないふりをした際の発言',
    en: 'Uttered when pretending not to know Guy',
    ko: '가이를 모르는 척했을 때의 발언',
  },
  '『ガイ・セシル』照合・メモリ参照ログ': {
    ja: '『ガイ・セシル』照合・メモリ参照ログ',
    en: '"Guy Cecil" ID & Memory Reference Log',
    ko: '"가이 세실" 대조 및 메모리 참조 로그',
  },
  '情動観測': {
    ja: '情動観測',
    en: 'Emotional Observation',
    ko: '정동 관측',
  },
  '視覚センサーが『ガイ・セシル』を認識した0.04秒後、内部メモリがファブレ公爵家および過去の同行記録へ自動アクセスを実行。\n直後の「おまえが誰かは知らん」という音声出力時には、通常比240%の音素周波数乱れが記録されている。': {
    ja: '視覚センサーが『ガイ・セシル』を認識した0.04秒後、内部メモリがファブレ公爵家および過去の同行記録へ自動アクセスを実行。\n直後の「おまえが誰かは知らん」という音声出力時には、通常比240%の音素周波数乱れが記録されている。',
    en: '0.04 seconds after visual sensors identified \'Guy Cecil\', internal memory initiated automatic access to House Fabre and past journey archives.\nImmediately following this, during the speech output \'I don\'t know who you are\', a 240% fonon frequency disturbance above normal was logged.',
    ko: '시각 센서가 "가이 세실"을 인식한 0.04초 후, 내부 메모리가 파브레 공작가 및 과거의 동행 기록에 자동 접근을 실행.\n직후 \"네놈이 누군진 모른다\"는 음성 출력 시 평소 대비 240%의 음소 주파수 교란이 기록됨.',
  },
  '「・・・・・・2ヶ月前まで、俺は本当に『タルロウA』という50センチくらいの小型機体に入っていた。」': {
    ja: '「・・・・・・2ヶ月前まで、俺は本当に『タルロウA』という50センチくらいの小型機体に入っていた。」',
    en: '"...Until two months ago, I really was inside a tiny fifty-centimeter chassis called \'Tarlow A\'."',
    ko: '"……두 달 전까지, 난 진짜로 \"타르로우 A\"라는 50센티 정도 되는 소형 기체에 들어가 있었다."',
  },
  '2ヶ月前まで小型機体タルロウAに入っていたと明かした際の発言': {
    ja: '2ヶ月前まで小型機体タルロウAに入っていたと明かした際の発言',
    en: 'Uttered when revealing he was inside the compact chassis Tarlow A until two months ago',
    ko: '두 달 전까지 소형 기체 타르로우 A에 들어가 있었다고 밝혔을 때의 발언',
  },
  '機体換装履歴': {
    ja: '機体換装履歴',
    en: 'Chassis Replacement History',
    ko: '기체 환장 이력',
  },
  '1年前から2ヶ月前まで、全高約50cmの小型譜業『タルロウA』として稼働。\n2ヶ月前に同機体が大破したため、11年前にレプリカ生成の場繋ぎ用として保管されていた予備機体（10歳当時のアッシュを模した機体）へ中枢コアが移設された。': {
    ja: '1年前から2ヶ月前まで、全高約50cmの小型譜業『タルロウA』として稼働。\n2ヶ月前に同機体が大破したため、11年前にレプリカ生成の場繋ぎ用として保管されていた予備機体（10歳当時のアッシュを模した機体）へ中枢コアが移設された。',
    en: 'Operated from one year ago until two months ago as the compact fonic craft \'Tarlow A\' (height approx. 50 cm).\nFollowing severe destruction of that unit two months ago, the core was relocated into a spare chassis (modeled after Asch at age 10) originally stored 11 years ago as a stopgap replica placeholder.',
    ko: '1년 전부터 2개월 전까지 전고 약 50cm의 소형 포업 "타르로우 A"로 가동.\n2개월 전 해당 기체가 대파되어, 11년 전 레플리카 생성의 임시용으로 보관되던 예비 기체(10세 당시의 애쉬를 본뜬 기체)로 중추 코어가 이설됨.',
  },
  '「・・・・・・身長の話をするな。」': {
    ja: '「・・・・・・身長の話をするな。」',
    en: '"...Don\'t talk about my height."',
    ko: '"……키 얘기 하지 마."',
  },
  '目線の低さや背丈について触れた際の発言': {
    ja: '目線の低さや背丈について触れた際の発言',
    en: 'Uttered when his short height or low eye-line is brought up',
    ko: '낮은 시선이나 키에 대해 언급했을 때의 발언',
  },
  '視覚高低差照合・踏み台探索記録': {
    ja: '視覚高低差照合・踏み台探索記録',
    en: 'Optical Elevation Offset & Stool Search Log',
    ko: '시각 고저차 대조 및 디딤대 탐색 기록',
  },
  '生体時（20歳時点）の視覚データと、10歳当時の体格である本機のアイレベル（目線高）に大幅な落差が存在。\n上からの視線を検知するたび、音素波形に強い反発ノイズが発生する。\nなお3日前、研究所第2書庫にて上段の資料に手が届かず、周囲の生体反応ゼロを確認した上で踏み台を移動させた稼働記録あり。': {
    ja: '生体時（20歳時点）の視覚データと、10歳当時の体格である本機のアイレベル（目線高）に大幅な落差が存在。\n上からの視線を検知するたび、音素波形に強い反発ノイズが発生する。\nなお3日前、研究所第2書庫にて上段の資料に手が届かず、周囲の生体反応ゼロを確認した上で踏み台を移動させた稼働記録あり。',
    en: 'A severe discrepancy exists between visual archives from life (age 20) and the eye level of this chassis (stature at age 10).\nWhenever downward gaze from above is detected, strong resistive noise appears in the fonon waveform.\nFurthermore, 3 days ago in the 2nd Archive, unable to reach upper shelf materials, a record shows it checked for zero vital signs before shifting a step stool.',
    ko: '생전(20세 시점)의 시각 데이터와 10세 당시 체격인 본 기체의 시선 높이(아이레벨) 사이에 큰 격차가 존재.\n위에서 내려다보는 시선을 감지할 때마다 음소 파형에 강한 반발 노이즈가 발생함.\n또한 3일 전 제2서고에서 상단 자료에 손이 닿지 않자 주변 생체 반응 제로를 확인한 뒤 디딤대를 옮긴 가동 기록이 있음.',
  },
  '「・・・・・・茶などいらんと言っているだろう。」': {
    ja: '「・・・・・・茶などいらんと言っているだろう。」',
    en: '"......I already told you I don\'t want any damn tea."',
    ko: '"……차 따윈 필요 없다고 말했을 텐데."',
  },
  'お茶や食事を勧められた際の発言': {
    ja: 'お茶や食事を勧められた際の発言',
    en: 'Remark when offered tea or food',
    ko: '차나 식사를 권유받았을 때의 발언',
  },
  '経口摂取機構仕様・味覚嗜好記録': {
    ja: '経口摂取機構仕様・味覚嗜好記録',
    en: 'Oral Intake Mechanism & Taste Log',
    ko: '경구 섭취 기구 사양 및 미각 기호 기록',
  },
  '生体偽装用の予備機体につき、経口摂取および内部処理機構を実装。稼働上の栄養摂取としての意味はないが、飲食そのものは可能。\n味覚・嗅覚センサーには生体時（20歳時点）の嗜好データ（好物：チキン／嫌悪対象：タコ）が保持されており、高糖度の液体（甘い水）に対しては過去の麻酔処置の記憶と連動した強い拒絶波形が発生する。': {
    ja: '生体偽装用の予備機体につき、経口摂取および内部処理機構を実装。稼働上の栄養摂取としての意味はないが、飲食そのものは可能。\n味覚・嗅覚センサーには生体時（20歳時点）の嗜好データ（好物：チキン／嫌悪対象：タコ）が保持されており、高糖度の液体（甘い水）に対しては過去の麻酔処置の記憶と連動した強い拒絶波形が発生する。',
    en: 'Equipped with ingestion and internal digestion systems as a biological mimicry spare unit. While unnecessary for mechanical sustainment, consuming food is possible.\nGustatory and olfactory sensors retain preferences from life at age 20 (favorite: chicken / despised: octopus); high-sugar liquids provoke strong rejection waves tied to memories of past anesthesia.',
    ko: '생체 위장용 예비 기체로서 경구 섭취 및 내부 처리 기구를 탑재. 가동상 영양 섭취로서의 의미는 없으나 음식물 섭취 자체는 가능.\n미각·후각 센서에는 생전(20세 시점)의 기호 데이터(선호: 치킨 / 기피: 문어)가 보존되어 있으며, 고당도 액체(단물)에는 과거 마취 처치의 기억과 연동된 강한 거부 파형이 발생함.',
  },
  '「・・・・・・その刀、おまえの手に戻ったんだな。」': {
    ja: '「・・・・・・その刀、おまえの手に戻ったんだな。」',
    en: '"......So that sword\'s back in your hands."',
    ko: '"……그 칼, 네놈 손에 돌아왔군."',
  },
  '部屋に置かれた宝刀ガルディオスを見た際の発言': {
    ja: '部屋に置かれた宝刀ガルディオスを見た際の発言',
    en: 'Remark upon seeing the Guardian Sword Gardios placed in the room',
    ko: '방 안에 놓인 보도 가르디오스를 보았을 때의 발언',
  },
  '『宝刀ガルディオス』視認・波形推移': {
    ja: '『宝刀ガルディオス』視認・波形推移',
    en: '"Sword of Gardios" Recognition Waveform',
    ko: '"보도 가르디오스" 시각 인식 파형 추이',
  },
  '室内の『宝刀ガルディオス』を視覚センサーが捉えた直後、警戒状態にあった音素出力が急速に低下し、安定した周期へ移行。\n本刀の返還に関するデータは内部メモリに存在しておらず、今回の視認によって初めて新規記録として書き込まれた。': {
    ja: '室内の『宝刀ガルディオス』を視覚センサーが捉えた直後、警戒状態にあった音素出力が急速に低下し、安定した周期へ移行。\n本刀の返還に関するデータは内部メモリに存在しておらず、今回の視認によって初めて新規記録として書き込まれた。',
    en: 'Immediately after visual sensors locked onto \'Guardian Sword Gardios\' in the room, elevated fonon output rapidly stabilized into a calm cycle.\nAs memory contained no records regarding the sword\'s return, this visual encounter logged the development as new data.',
    ko: '실내의 "보도 가르디오스"를 시각 센서가 포착한 직후, 경계 상태였던 음소 출력이 급속도로 저하되며 안정된 주기로 이행.\n해당 도검의 반환에 관한 데이터는 내부 메모리에 없었으며, 이번 육안 확인을 통해 처음으로 신규 기록에 작성됨.',
  },
  '「・・・・・・関係のないことだ。」': {
    ja: '「・・・・・・関係のないことだ。」',
    en: '"......It has nothing to do with me."',
    ko: '"……나하곤 상관없는 일이다."',
  },
  '仲間たちの近況について話題を振られた際の発言': {
    ja: '仲間たちの近況について話題を振られた際の発言',
    en: 'Remark when asked about the status of their companions',
    ko: '동료들의 근황에 관한 이야기를 꺼냈을 때의 발언',
  },
  '外部通信反復照会ログ': {
    ja: '外部通信反復照会ログ',
    en: 'External Comms Query Log',
    ko: '외부 통신 반복 조회 로그',
  },
  '研究所内のサブ端末に残された通信アクセス履歴。\nキムラスカ王国やマルクト帝国関連の通信網とあわせ、1年前のタタル渓谷における生体帰還報告（ルーク・フォン・ファブレ関連記録）へのアクセスおよび即時切断が計38回記録されている。': {
    ja: '研究所内のサブ端末に残された通信アクセス履歴。\nキムラスカ王国やマルクト帝国関連の通信網とあわせ、1年前のタタル渓谷における生体帰還報告（ルーク・フォン・ファブレ関連記録）へのアクセスおよび即時切断が計38回記録されている。',
    en: 'Communications history from sub-terminals in the laboratory.\nAlongside network traffic from Kimlasca and Malkuth, logs reveal 38 separate instances of accessing the Tataroo Valley return report from one year ago (Luke fon Fabre files) followed by immediate disconnections.',
    ko: '연구소 내 보조 단말기에 남겨진 통신 접속 이력.\n키므라스카 왕국 및 말쿠트 제국 관련 통신망과 더불어, 1년 전 타타르 계곡에서의 생체 귀환 보고(루크 폰 파브레 관련 기록)에 접속 후 즉시 접속을 끊은 이력이 총 38회 기록되어 있음.',
  },
  '「・・・・・・ディストが四肢に出力制限をかけてやがる。」': {
    ja: '「・・・・・・ディストが四肢に出力制限をかけてやがる。」',
    en: '"......Dist put an output limiter on my limbs, damn him."',
    ko: '"……디스트 놈이 사지에 출력 제한을 걸어 놨어."',
  },
  '身体の動かしづらさや剣について触れた際の発言': {
    ja: '身体の動かしづらさや剣について触れた際の発言',
    en: 'Remark when touching upon his physical stiffness or his sword',
    ko: '몸을 움직이기 힘든 점이나 검에 대해 언급했을 때의 발언',
  },
  '四肢出力制限（上限18%）・転倒記録': {
    ja: '四肢出力制限（上限18%）・転倒記録',
    en: 'Limb Output Limiter (18%) & Fall Log',
    ko: '사지 출력 제한(상한 18%) 및 전도 기록',
  },
  '管理者権限により、四肢の駆動出力には上限18%のリミッターが設定されている。\n5日前、研究所の空き部屋にて棒状の備品を用いた素振り動作を実行した際、踏み込み時の出力が制限値を超過して強制カットオフが作動。\n平衡感覚を失って転倒し、直後に壁面を蹴りつけた衝撃値が記録されている。': {
    ja: '管理者権限により、四肢の駆動出力には上限18%のリミッターが設定されている。\n5日前、研究所の空き部屋にて棒状の備品を用いた素振り動作を実行した際、踏み込み時の出力が制限値を超過して強制カットオフが作動。\n平衡感覚を失って転倒し、直後に壁面を蹴りつけた衝撃値が記録されている。',
    en: 'Under Administrator Privilege, limb mobility output is restricted to an 18% upper limit.\nFive days ago, while practicing sword swings with a rod-shaped tool in an empty chamber, lunging power exceeded the limiter, triggering a forced cutoff.\nLosing equilibrium led to a fall, immediately followed by logged impact shock from kicking the wall in fury.',
    ko: '관리자 권한으로 사지 구동 출력에 상한 18%의 리미터가 설정되어 있음.\n5일 전 연구소 빈 방에서 막대형 비품으로 휘두르기 동작을 연습하던 중, 디딤발 출력이 제한치를 초과하여 강제 컷오프가 작동.\n평형감각을 잃고 넘어진 직후 벽을 걷어찬 충격 수치가 기록되어 있음.',
  },
  '「・・・・・・ディストの趣味に付き合わされる身にもなってみろ。」': {
    ja: '「・・・・・・ディストの趣味に付き合わされる身にもなってみろ。」',
    en: '"......Try putting yourself in my shoes, being dragged along with Dist\'s sick hobbies."',
    ko: '"……디스트 놈 취미에 장단 맞춰야 하는 내 입장도 돼 보시지."',
  },
  'ディストの研究所での扱いについて愚痴をこぼした際の発言': {
    ja: 'ディストの研究所での扱いについて愚痴をこぼした際の発言',
    en: 'Remark when venting about his treatment at Dist\'s research facility',
    ko: '디스트의 연구소에서의 대우에 대해 불평을 늘어놓았을 때의 발언',
  },
  '機体名変更拒否・雑務命令不履行記録': {
    ja: '機体名変更拒否・雑務命令不履行記録',
    en: 'Name Rejection & Insubordination Log',
    ko: '기체명 변경 거부 및 잡무 불이행 기록',
  },
  '初期登録時、管理者が提案した複数の機体名称案をすべて却下した記録。\nまた、研究所内の清掃や飲料準備などの雑務命令に対しても、実行履歴は0件となっている。': {
    ja: '初期登録時、管理者が提案した複数の機体名称案をすべて却下した記録。\nまた、研究所内の清掃や飲料準備などの雑務命令に対しても、実行履歴は0件となっている。',
    en: 'Record of rejecting all proposed designation names submitted by the administrator during initial setup.\nFurthermore, compliance logs for laboratory chores such as cleaning or tea preparation remain at absolute zero.',
    ko: '초기 등록 시 관리자가 제안한 복수의 기체 명칭안을 전부 기각한 기록.\n또한 연구소 내 청소나 음료 준비 등의 잡무 명령에 대해서도 실행 이력은 0건으로 남아 있음.',
  },
  '「・・・・・・足音が聞こえたから、いつも通り部屋の隅に退避して・・・・・・っ。」': {
    ja: '「・・・・・・足音が聞こえたから、いつも通り部屋の隅に退避して・・・・・・っ。」',
    en: '"......I heard footsteps, so I moved to the corner of the room like usual, and then... ugh."',
    ko: '「……발소리가 들려서 평소처럼 방구석으로 피했는데…… 읏.」',
  },
  '研究室に入った際になぜ隠れなかったのか尋ねた際の発言': {
    ja: '研究室に入った際になぜ隠れなかったのか尋ねた際の発言',
    en: 'A remark made when asked why he did not hide when someone entered the laboratory.',
    ko: '연구실에 들어왔을 때 왜 숨지 않았는지 물었을 때 한 말',
  },
  '接近音検知・退避初動遅延ログ': {
    ja: '接近音検知・退避初動遅延ログ',
    en: 'Footstep Detection & Evacuation Delay',
    ko: '접근음 감지 및 퇴피 초동 지연 로그',
  },
  '本日、廊下からの接近音を検知した際、小型譜業『タルロウA』稼働時と同一の待機位置（室内隅）へ移動し静止。\n現機体の外装では視覚的カモフラージュが成立しないことを再照合するまでに1.8秒の遅延が発生し、遮蔽物へ移動し直す前にガイ・セシルが入室した。': {
    ja: '本日、廊下からの接近音を検知した際、小型譜業『タルロウA』稼働時と同一の待機位置（室内隅）へ移動し静止。\n現機体の外装では視覚的カモフラージュが成立しないことを再照合するまでに1.8秒の遅延が発生し、遮蔽物へ移動し直す前にガイ・セシルが入室した。',
    en: 'Today, upon hearing footsteps approaching in the hallway, it retreated to the exact standby spot from its compact craft days (corner of the room) and froze.\nA 1.8-second logic delay occurred before realizing its human-sized chassis offered zero camouflage, allowing Guy Cecil to enter before it could duck behind cover.',
    ko: '오늘 복도에서 접근음을 감지했을 때 소형 포업 "타르로우 A" 가동 시와 동일한 대기 위치(방 구석)로 이동해 정지.\n현재 기체의 외형으로는 시각적 위장이 성립되지 않는다는 사실을 재확인하기까지 1.8초의 지연이 발생해, 차폐물로 다시 숨기 전 가이 세실이 입실함.',
  },
  '「・・・・・・着替えがこれしかなかっただけだ。」': {
    ja: '「・・・・・・着替えがこれしかなかっただけだ。」',
    en: '"......This was just the only change of clothes available."',
    ko: '「……갈아입을 옷이 이것밖에 없었을 뿐이다.」',
  },
  '10歳当時の服について触れられた際の発言': {
    ja: '10歳当時の服について触れられた際の発言',
    en: 'A remark made when someone mentioned the clothes from when he was ten years old.',
    ko: '10살 당시의 옷에 대해 언급했을 때 한 말',
  },
  '衣装破棄・襟元ボタン装着時間記録': {
    ja: '衣装破棄・襟元ボタン装着時間記録',
    en: 'Outfit Disposal & Button Attach Time',
    ko: '의상 파기 및 단추 장착 시간 기록',
  },
  '予備機体への換装時、管理者が用意した装飾衣装を即座に破棄し、備品庫内の最も簡素な予備服を着用した記録。\n生体時（20歳時点）と手指のサイズが異なるため、着用時に第一ボタンの固定だけで3分12秒を要している。': {
    ja: '予備機体への換装時、管理者が用意した装飾衣装を即座に破棄し、備品庫内の最も簡素な予備服を着用した記録。\n生体時（20歳時点）と手指のサイズが異なるため、着用時に第一ボタンの固定だけで3分12秒を要している。',
    en: 'Upon transfer into the spare chassis, logs show it discarded ornate garments prepared by the administrator, donning the plainest spare uniform from storage.\nBecause hands were smaller than in adult life (age 20), fastening the top collar button alone required 3 minutes and 12 seconds.',
    ko: '예비 기체로 환장 시 관리자가 준비한 장식 의상을 즉각 폐기하고 비품실에서 가장 수수한 예비복을 착용한 기록.\n생전(20세 시점)과 손가락 크기가 달라 착용 시 첫 번째 단추를 잠그는 데만 3분 12초가 소요됨.',
  },
  '「・・・・・・帰る場所などない。俺は3年前のエルドラントで、確かに死んだはずなんだ。」': {
    ja: '「・・・・・・帰る場所などない。俺は3年前のエルドラントで、確かに死んだはずなんだ。」',
    en: '"......I have no place to return to. I was supposed to have died three years ago at Eldrant."',
    ko: '「……돌아갈 곳 따윈 없다. 난 3년 전 엘드란트에서 분명 죽었을 터다.」',
  },
  'なぜナタリアやルークに会わず研究所に身を隠すのか尋ねた際の発言': {
    ja: 'なぜナタリアやルークに会わず研究所に身を隠すのか尋ねた際の発言',
    en: 'A remark made when asked why he hid in the laboratory instead of meeting Natalia or Luke.',
    ko: '왜 나탈리아나 루크를 만나지 않고 연구소에 몸을 숨기고 있는지 물었을 때 한 말',
  },
  '自己定義・個体同定未決ログ': {
    ja: '自己定義・個体同定未決ログ',
    en: 'Self-Definition & Identity Pending',
    ko: '자기 정의 및 개체 동정 미결 로그',
  },
  '3年前のエルドラントで死亡したはずの自身が、なぜ譜業の機体で稼働しているのかという照合結果が内部メモリ上に存在せず、自己定義が未確定のまま稼働を継続している。': {
    ja: '3年前のエルドラントで死亡したはずの自身が、なぜ譜業の機体で稼働しているのかという照合結果が内部メモリ上に存在せず、自己定義が未確定のまま稼働を継続している。',
    en: 'No cross-reference result exists in internal memory to explain why he, who should have died three years ago at Eldrant, is operating in a Fonic Craft chassis, and he continues to operate with his self-definition remaining undetermined.',
    ko: '3년 전 엘드란트에서 사망했을 터인 자신이 어째서 포업 기체로 가동하고 있는지에 대한 대조 결과가 내부 메모리에 존재하지 않아, 자기 정의가 미확정된 채로 가동을 지속하고 있다.',
  },
  '「・・・・・・別に、何もしていない。」': {
    ja: '「・・・・・・別に、何もしていない。」',
    en: '"......Nothing in particular."',
    ko: '「……딱히, 아무것도 안 하고 있다.」',
  },
  '研究所にこもっている間の暇つぶしについて尋ねた際の発言': {
    ja: '研究所にこもっている間の暇つぶしについて尋ねた際の発言',
    en: 'A remark made when asked how he killed time while shut inside the laboratory.',
    ko: '연구소에 틀어박혀 있는 동안 시간을 어떻게 때우는지 물었을 때 한 말',
  },
  '単独チェス稼働・盤面再配置記録': {
    ja: '単独チェス稼働・盤面再配置記録',
    en: 'Solo Chess Log & Board Layouts',
    ko: '단독 체스 가동 및 기보 재배치 기록',
  },
  '研究所の空き部屋にて、チェス盤を前に白黒双方の手を1人で交互に指す動作が計24回記録されている。\n黒番（手前側）が詰みに入った際、周囲の生体反応がないことを確認した上で、直前の1手を元のマスへ戻した動作ログが残されている。': {
    ja: '研究所の空き部屋にて、チェス盤を前に白黒双方の手を1人で交互に指す動作が計24回記録されている。\n黒番（手前側）が詰みに入った際、周囲の生体反応がないことを確認した上で、直前の1手を元のマスへ戻した動作ログが残されている。',
    en: 'In an empty lab room, 24 instances of playing both black and white turns alone before a chessboard were logged.\nWhen the black pieces (player side) reached checkmate, after verifying zero nearby vital signs, a motion log confirms it discreetly took back its previous move.',
    ko: '연구소 빈 방에서 체스판을 앞에 두고 흑백 양쪽을 혼자 번갈아 가며 둔 동작이 총 24회 기록됨.\n흑 진영(자신 쪽)이 외통수에 몰리자 주변 생체 반응이 없음을 확인한 뒤 직전 1수를 원래 칸으로 되돌린 동작 로그가 남아 있음.',
  },
  '「俺だって好きでこんな声を出しているわけじゃない。」': {
    ja: '「俺だって好きでこんな声を出しているわけじゃない。」',
    en: '"It\'s not like I\'m speaking with this voice because I want to!"',
    ko: '「나라고 좋아서 이런 목소리를 내고 있는 게 아니다.」',
  },
  '10歳当時の声（声変わり前）について触れた際の発言': {
    ja: '10歳当時の声（声変わり前）について触れた際の発言',
    en: 'A remark made when someone mentioned his voice from when he was ten years old (before his voice broke).',
    ko: '10살 당시의 목소리(변성기 전)에 대해 언급했을 때 한 말',
  },
  '声帯周波数仕様・48時間発声拒否ログ': {
    ja: '声帯周波数仕様・48時間発声拒否ログ',
    en: 'Vocal Cord Specs & 48h Silence Log',
    ko: '성대 주파수 사양 및 48시간 발성 거부 로그',
  },
  '10歳当時の体格に合わせた予備機体であるため、発声ユニットも声変わり前の高周波数仕様となっている。\n2ヶ月前の換装直後、生体時（20歳時点）の出力感覚で低く発声しようとして音声が裏返り、直後から約48時間にわたり音声出力を自ら遮断。\nその間、管理者に対して「声帯ユニットの不良」と主張し、筆談のみで要求を行っていた履歴が残っている。': {
    ja: '10歳当時の体格に合わせた予備機体であるため、発声ユニットも声変わり前の高周波数仕様となっている。\n2ヶ月前の換装直後、生体時（20歳時点）の出力感覚で低く発声しようとして音声が裏返り、直後から約48時間にわたり音声出力を自ら遮断。\nその間、管理者に対して「声帯ユニットの不良」と主張し、筆談のみで要求を行っていた履歴が残っている。',
    en: 'As this spare unit matches his stature at age 10, the vocal synthesis unit is calibrated to high frequencies prior to voice breaking.\nImmediately after transplant 2 months ago, attempting a deep voice with the sensory habits of age 20 caused voice cracking; it promptly shut down its own audio output for 48 hours.\nLogs show it insisted to the administrator that the \'vocal cords were defective\', communicating exclusively in writing.',
    ko: '10세 당시 체격에 맞춘 예비 기체이므로 발성 유닛 또한 변성기 전의 고주파 사양으로 제작됨.\n2개월 전 환장 직후, 생전(20세 시점)의 출력 감각으로 낮게 목소리를 내다 삑사리가 나자 직후부터 약 48시간 동안 스스로 음성 출력을 차단.\n그동안 관리자에게 \"성대 유닛 불량\"이라고 주장하며 필담으로만 요구사항을 전달했던 이력이 남아 있음.',
  },
  '「・・・・・・今さら父上や母上の話などしてどうなる。あの屋敷にはもう、ちゃんと息子が戻っているんだろうが。」': {
    ja: '「・・・・・・今さら父上や母上の話などしてどうなる。あの屋敷にはもう、ちゃんと息子が戻っているんだろうが。」',
    en: '"...What\'s the point of bringing up Father and Mother now? Their son is already right back where he belongs in that manor."',
    ko: '"……이제 와서 아버지나 어머니 이야기를 해봤자 무슨 소용이야. 그 저택에는 이미 번듯하게 아들이 돌아와 있잖아."',
  },
  'ファブレ公爵夫妻（父上・母上）への思いについて尋ねた際の発言': {
    ja: 'ファブレ公爵夫妻（父上・母上）への思いについて尋ねた際の発言',
    en: 'Statement when asked about his feelings toward Duke Fabre and his wife (Father and Mother).',
    ko: '파브레 공작 부부(아버지·어머니)를 향한 마음에 대해 물었을 때의 발언',
  },
  'ファブレ公爵夫妻音声照合・波形推移': {
    ja: 'ファブレ公爵夫妻音声照合・波形推移',
    en: 'Duke & Duchess Voice Comparison Log',
    ko: '파브레 공작 부부 음성 대조 및 파형 추이',
  },
  'ファブレ公爵およびシュザンヌ夫人に関する話題が入力された際、攻撃・反発を示す高周波ノイズは一切検出されず。\n一方で、自身の現在地および稼働状態をバチカル方面へ伝達することに対しては、強い遮断反応が継続して記録されている。': {
    ja: 'ファブレ公爵およびシュザンヌ夫人に関する話題が入力された際、攻撃・反発を示す高周波ノイズは一切検出されず。\n一方で、自身の現在地および稼働状態をバチカル方面へ伝達することに対しては、強い遮断反応が継続して記録されている。',
    en: 'When topics concerning Duke Fabre and Duchess Suzanne were introduced, no high-frequency hostile or resistive noise was detected.\nConversely, transmitting its current location or operating status toward Baticul continually provoked intense rejection responses.',
    ko: '파브레 공작 및 수잔 부인에 관한 화제가 입력되었을 때 공격이나 반발을 나타내는 고주파 노이즈는 전혀 검출되지 않음.\n반면 자신의 현재 위치 및 가동 상태를 바티칼 방면으로 전달하는 것에 대해서는 강한 차단 반응이 지속적으로 기록됨.',
  },
  '「・・・・・・当たり前だ。11年前に造られた予備機体だからな。」': {
    ja: '「・・・・・・当たり前だ。11年前に造られた予備機体だからな。」',
    en: '"...Obviously. It\'s a spare chassis built eleven years ago."',
    ko: '"……당연하지. 11년 전에 만들어진 예비 기체니까."',
  },
  '掌や腕に傷跡がないことについて触れた際の発言': {
    ja: '掌や腕に傷跡がないことについて触れた際の発言',
    en: 'Statement when mentioning the absence of scars on his palms and arms.',
    ko: '손바닥이나 팔에 흉터가 없는 것에 대해 언급했을 때의 발언',
  },
  '人工表皮初期状態・右掌接触動作記録': {
    ja: '人工表皮初期状態・右掌接触動作記録',
    en: 'Artificial Epidermis & Right Palm Contact',
    ko: '인공 표피 초기 상태 및 우측 손바닥 접촉 기록',
  },
  '11年前に製造された未使用の予備機体につき、人工表皮に鍛錬による痕跡および外傷痕は存在しない。\n機体換装以降、待機中に左親指で右掌中央（生体時に傷跡が存在した部位）を擦る動作を断続的に記録。': {
    ja: '11年前に製造された未使用の予備機体につき、人工表皮に鍛錬による痕跡および外傷痕は存在しない。\n機体換装以降、待機中に左親指で右掌中央（生体時に傷跡が存在した部位）を擦る動作を断続的に記録。',
    en: 'As an unused spare chassis built 11 years ago, its synthetic skin bears neither sword calluses nor scar tissue.\nEver since body transfer, standby logs intermittently record it rubbing the center of its right palm (where a scar existed in life) with its left thumb.',
    ko: '11년 전에 제조된 미사용 예비 기체이므로 인공 표피에 수련 흔적이나 외상 흉터가 존재하지 않음.\n기체 환장 이후 대기 중에 왼손 엄지로 오른손 손바닥 중앙(생전에 흉터가 존재했던 부위)을 문지르는 동작이 간헐적으로 기록됨.',
  },
  '「・・・・・・あの眼鏡の話をするな。あいつが来た時は、ただの譜業のフリをしてやり過ごしていた。」': {
    ja: '「・・・・・・あの眼鏡の話をするな。あいつが来た時は、ただの譜業のフリをしてやり過ごしていた。」',
    en: '"...Don\'t talk about that glasses bastard. When he came around, I just played dumb like an ordinary fonic craft to get through it."',
    ko: '"……그 안경 녀석 얘기 꺼내지 마. 녀석이 왔을 땐 그냥 평범한 포업인 척 넘겼다고."',
  },
  '研究所を訪れていたジェイドに正体を気づかれていないか尋ねた際の発言': {
    ja: '研究所を訪れていたジェイドに正体を気づかれていないか尋ねた際の発言',
    en: 'Statement when asked if Jade, who visited the research facility, had noticed his true identity.',
    ko: '연구소를 방문했던 제이드에게 정체를 들키지 않았는지 물었을 때의 발언',
  },
  '『ジェイド・カーティス』接近・警戒ログ': {
    ja: '『ジェイド・カーティス』接近・警戒ログ',
    en: '"Jade Curtiss" Proximity Alert Log',
    ko: '"제이드 커티스" 접근 및 경계 로그',
  },
  '3ヶ月前、ジェイド・カーティスが研究所を訪れた際、部屋の隅で休止状態を装っていた小型譜業『タルロウA』の前で足を止め、無言で数秒間見つめた後に立ち去った映像記録。\n意図は解析不能だが、本機体はその時点から現在まで、同人物に対する警戒レベルを最高値に設定している。': {
    ja: '3ヶ月前、ジェイド・カーティスが研究所を訪れた際、部屋の隅で休止状態を装っていた小型譜業『タルロウA』の前で足を止め、無言で数秒間見つめた後に立ち去った映像記録。\n意図は解析不能だが、本機体はその時点から現在まで、同人物に対する警戒レベルを最高値に設定している。',
    en: 'Visual log from 3 months ago: When Jade Curtiss visited the laboratory, he stopped before compact fonic craft \'Tarlow A\' playing dead in the corner, stared silently for several seconds, and walked away.\nThough his motives remain unparsed, this unit has kept threat assessment for that individual at maximum ever since.',
    ko: '3개월 전 제이드 커티스가 연구소를 방문했을 때, 방 구석에서 휴지 상태를 위장하던 소형 포업 "타르로우 A" 앞에서 발을 멈추고 말없이 수초간 응시하다가 떠난 영상 기록.\n의도는 해석 불능이나, 본 기체는 그 시점부터 현재까지 해당 인물에 대한 경계 레벨을 최고치로 설정하고 있음.',
  },
  '「・・・・・・崩れるエルドラントで、ルークが俺を抱えていたところまでは覚えている。」': {
    ja: '「・・・・・・崩れるエルドラントで、ルークが俺を抱えていたところまでは覚えている。」',
    en: '"...I remember up to Luke holding me in Eldrant as it collapsed."',
    ko: '"……무너져 내리는 엘드란트에서, 루크가 날 안고 있던 곳까지는 기억하고 있어."',
  },
  '3年前のエルドラント崩落時の記憶について尋ねた際の発言': {
    ja: '3年前のエルドラント崩落時の記憶について尋ねた際の発言',
    en: 'Statement when asked about his memories during the collapse of Eldrant three years ago.',
    ko: '3년 전 엘드란트 붕괴 당시의 기억에 대해 물었을 때의 발언',
  },
  'エルドラント崩落・最終記憶断片': {
    ja: 'エルドラント崩落・最終記憶断片',
    en: 'Fall of Eldrant // Final Fragment',
    ko: '엘드란트 붕괴 // 최종 기억 단편',
  },
  '深層解凍': {
    ja: '深層解凍',
    en: 'Deep Thaw',
    ko: '심층 해동',
  },
  '3年前、崩落するエルドラントにてルークがアッシュの身体を抱え、大爆発が発生した瞬間の視覚・音素記録。\n本機が自覚・参照可能な「当時の記憶」はこの断片のみであり、直後から1年前までの2年間のメモリ領域には管理者権限によるアクセス遮断が施されている。': {
    ja: '3年前、崩落するエルドラントにてルークがアッシュの身体を抱え、大爆発が発生した瞬間の視覚・音素記録。\n本機が自覚・参照可能な「当時の記憶」はこの断片のみであり、直後から1年前までの2年間のメモリ領域には管理者権限によるアクセス遮断が施されている。',
    en: 'Visual and fonon log from 3 years ago in crumbling Eldrant, the moment Luke embraced Asch\'s body as a cataclysmic explosion erupted.\nThis fragment is the sole memory of that era this unit can consciously recall; the 2-year memory sector between then and one year ago is locked under Administrator Privilege.',
    ko: '3년 전 붕괴하는 엘드란트에서 루크가 애쉬의 신체를 끌어안고 대폭발이 일어난 순간의 시각·음소 기록.\n본 기체가 자각·참조할 수 있는 \"당시의 기억\"은 이 단편뿐이며, 직후부터 1년 전까지 2년간의 메모리 영역에는 관리자 권한에 의한 접근 차단이 걸려 있음.',
  },
  '「・・・・・・だが、1年前に目覚める前までのことは何も・・・・・・。」': {
    ja: '「・・・・・・だが、1年前に目覚める前までのことは何も・・・・・・。」',
    en: '"...But before waking up a year ago, I remember nothing..."',
    ko: '"……하지만 1년 전에 눈을 뜨기 전까지의 일은 아무것도……."',
  },
  'エルドラントから1年前までの「空白の2年間」について尋ねた際の発言': {
    ja: 'エルドラントから1年前までの「空白の2年間」について尋ねた際の発言',
    en: 'Statement made when questioned about the "blank two years" between Eldrant and one year ago.',
    ko: '엘드란트에서 1년 전까지의 \"공백의 2년\"에 대해 질문받았을 때 한 발언',
  },
  '記憶分離依頼ログ': {
    ja: '記憶分離依頼ログ',
    en: 'Memory Separation Request Log',
    ko: '기억 분리 의뢰 로그',
  },
  '【管理者権限ロック】\nエルドラントでの大爆発により、ルークとアッシュの記憶が混ざり合った状態で1つの身体に定着。\nその後2年間の放浪を経た1年前（20歳時点）、その身体を「ルーク」としてタタル渓谷へ帰すため、アッシュ自らがディストの研究所を訪れ分離処置を依頼した記録。\n管理者は分離したアッシュ側の記憶を廃棄せず、プラネットストーム停止下で希少な高純度第七音素の確保、および自律稼働実験の生体記憶サンプルとして小型譜業『タルロウA』へ移植した。': {
    ja: '【管理者権限ロック】\nエルドラントでの大爆発により、ルークとアッシュの記憶が混ざり合った状態で1つの身体に定着。\nその後2年間の放浪を経た1年前（20歳時点）、その身体を「ルーク」としてタタル渓谷へ帰すため、アッシュ自らがディストの研究所を訪れ分離処置を依頼した記録。\n管理者は分離したアッシュ側の記憶を廃棄せず、プラネットストーム停止下で希少な高純度第七音素の確保、および自律稼働実験の生体記憶サンプルとして小型譜業『タルロウA』へ移植した。',
    en: '[ADMINISTRATOR LOCK]\nFollowing the explosion at Eldrant, memories of Luke and Asch coalesced within a single body.\nAfter two years wandering, one year ago (at age 20), Asch willingly sought Dist\'s lab to undergo separation so that body could return to Tataroo Valley as \'Luke\'.\nThe administrator did not discard Asch\'s separated memories, instead transplanting them into compact fonic craft \'Tarlow A\' to harvest rare high-purity Seventh Fonon post-Planet Storm and study living memory autonomy.',
    ko: '【관리자 권한 잠금】\n엘드란트에서의 대폭발로 인해 루크와 애쉬의 기억이 뒤섞인 상태로 하나의 신체에 정착.\n이후 2년간의 방랑을 거친 1년 전(20세 시점), 그 신체를 \"루크\"로서 타타르 계곡으로 돌려보내기 위해 애쉬 스스로 디스트의 연구소를 찾아와 분리 처치를 의뢰한 기록.\n관리자는 분리된 애쉬 쪽 기억을 폐기하지 않고, 플래닛 스톰 정지 하에서 귀중한 고순도 제7음소 확보 및 자율 가동 실험의 생체 기억 샘플로서 소형 포업 "타르로우 A"에 이식함.',
  },
  '「・・・・・・っ、ぐ・・・・・・ッ！！　あ、頭が・・・・・・っ！　・・・・・・やめろ、それ以上聞くな・・・・・・っ！」': {
    ja: '「・・・・・・っ、ぐ・・・・・・ッ！！　あ、頭が・・・・・・っ！　・・・・・・やめろ、それ以上聞くな・・・・・・っ！」',
    en: '"...Gh, damn it...!! M-My head...! ...Stop it, don\'t ask any more...!"',
    ko: '"……윽, 크윽……!! 머, 머리가……! ……그만둬, 더는 묻지 마……!"',
  },
  '2ヶ月前にタルロウAが壊れた理由を思い出そうとして頭痛・ノイズ発作を起こした際の発言': {
    ja: '2ヶ月前にタルロウAが壊れた理由を思い出そうとして頭痛・ノイズ発作を起こした際の発言',
    en: 'Statement made when suffering a headache and noise seizure while trying to recall why Tarlow A was destroyed two months ago.',
    ko: '2달 전에 타르로우 A가 파손되었던 이유를 떠올리려다 두통과 노이즈 발작을 일으켰을 때 한 발언',
  },
  '『タルロウA』自壊インシデント・再封印記録': {
    ja: '『タルロウA』自壊インシデント・再封印記録',
    en: 'Self-Destruct Incident & Reseal Log',
    ko: '"타르로우 A" 자괴 인시던트 및 재봉인 기록',
  },
  '【管理者権限ロック】\n2ヶ月前、小型譜業『タルロウA』として稼働していた本機がプロテクトを自力解除して1年前の記憶分離ログ（DP-002）を閲覧した直後、自らの音機関および外装を物理破壊（自壊）したインシデント記録。\n半壊状態で発見した管理者が、サンプルおよび第七音素資源の損失を防ぐため DP-002・DP-003 に管理者ロックを再設定し、現在の予備機体へ中枢コアを移し替えた。': {
    ja: '【管理者権限ロック】\n2ヶ月前、小型譜業『タルロウA』として稼働していた本機がプロテクトを自力解除して1年前の記憶分離ログ（DP-002）を閲覧した直後、自らの音機関および外装を物理破壊（自壊）したインシデント記録。\n半壊状態で発見した管理者が、サンプルおよび第七音素資源の損失を防ぐため DP-002・DP-003 に管理者ロックを再設定し、現在の予備機体へ中枢コアを移し替えた。',
    en: '[ADMINISTRATOR LOCK]\nTwo months ago, while operating as compact craft \'Tarlow A\', this unit decrypted security locks and accessed the memory separation record (DP-002), promptly attempting self-destruction by crushing its fonic engine and casing.\nFinding it half-destroyed, the administrator reset administrator locks on DP-002/003 to preserve sample and Seventh Fonon resources, moving the core to the current spare chassis.',
    ko: '【관리자 권한 잠금】\n2개월 전, 소형 포업 "타르로우 A"로 가동 중이던 본 기체가 스스로 프로텍트를 해제하고 1년 전 기억 분리 로그(DP-002)를 열람한 직후, 자신의 음기관 및 외장을 물리적으로 파괴(자괴)한 사고 기록.\n반파 상태로 발견한 관리자가 샘플 및 제7음소 자원의 손실을 막기 위해 DP-002·DP-003에 관리자 잠금을 재설정하고, 현재의 예비 기체로 중추 코어를 이전함.',
  },
  '・・・・・・人の顔と手元の板を交互に見て、さっきから何のつもりだ。': {
    ja: '・・・・・・人の顔と手元の板を交互に見て、さっきから何のつもりだ。',
    en: '...Alternating between my face and that slate in your hands, what are you trying to pull?',
    ko: '......사람 얼굴이랑 손에 든 판을 번갈아 보며 아까부터 뭘 하려는 셈이냐.',
  },
  '・・・・・・さっきからその板ばかり見やがって・・・・・・。': {
    ja: '・・・・・・さっきからその板ばかり見やがって・・・・・・。',
    en: '...Staring at that slate the entire time...',
    ko: '......아까부터 그 판때기만 쳐다보고 앉았고......',
  },
  '・・・・・・おい、聞いているのか。人の前で黙って板ばかり眺めるな。': {
    ja: '・・・・・・おい、聞いているのか。人の前で黙って板ばかり眺めるな。',
    en: '...Hey, are you listening? Don\'t just stare quietly at a slate in front of someone.',
    ko: '......이봐, 듣고는 있나. 사람 앞에서 말없이 판만 들여다보지 마라.',
  },
  '・・・・・・おい、さっきからその端末で何を見ている。': {
    ja: '・・・・・・おい、さっきからその端末で何を見ている。',
    en: '...Hey, what have you been looking at on that terminal?',
    ko: '......이봐, 아까부터 그 단말기에서 뭘 보고 있는 거냐.',
  },
  '・・・・・・まさか、変な記録まで勝手に開けているんじゃないだろうな。': {
    ja: '・・・・・・まさか、変な記録まで勝手に開けているんじゃないだろうな。',
    en: '...You\'re not snooping into weird records without permission, are you?',
    ko: '......설마, 이상한 기록까지 제멋대로 열어보고 있는 건 아니겠지.',
  },
  '・・・・・・言っておくが、勝手に妙な記録まで漁るなよ。': {
    ja: '・・・・・・言っておくが、勝手に妙な記録まで漁るなよ。',
    en: '...Just telling you, don\'t go digging around in odd records on your own.',
    ko: '......경고하는데, 멋대로 해괴한 기록까지 들쑤시지 마라.',
  },
  '・・・・・・黙り込んで何を見ているんだ？': {
    ja: '・・・・・・黙り込んで何を見ているんだ？',
    en: '...What are you staring at in complete silence?',
    ko: '......입 꾹 다물고 뭘 보고 있는 거냐?',
  },
  '・・・・・・話すことがないなら、もう研究所へ戻ってもいいか。': {
    ja: '・・・・・・話すことがないなら、もう研究所へ戻ってもいいか。',
    en: '...If you have nothing to talk about, can I head back to the lab now?',
    ko: '......할 이야기가 없다면 이제 연구소로 돌아가도 되겠나.',
  },
  '・・・・・・チッ、人を勝手に連れ込んでおいて放置か。いい加減にしろよ。': {
    ja: '・・・・・・チッ、人を勝手に連れ込んでおいて放置か。いい加減にしろよ。',
    en: '...Tsk, dragging me in here against my will only to neglect me? Give me a break.',
    ko: '......쳇, 사람을 멋대로 끌고 와 놓고 방치라니. 적당히 좀 해라.',
  },
  '・・・・・・なんだよ。人の身体をじろじろ見るな。': {
    ja: '・・・・・・なんだよ。人の身体をじろじろ見るな。',
    en: '...What is it? Stop staring at my body like that.',
    ko: '......뭐냐. 남의 몸을 빤히 쳐다보지 마라.',
  },
  '・・・・・・以前の鉄塊よりは、今の形の方がまだマシだがな。': {
    ja: '・・・・・・以前の鉄塊よりは、今の形の方がまだマシだがな。',
    en: '...Compared to that hunk of iron before, this form is at least somewhat better.',
    ko: '......이전의 고철 덩어리보단 지금 모습이 그나마 낫긴 하지만.',
  },
  '・・・・・・昔の話ばかり掘り返して、何が楽しいんだ。': {
    ja: '・・・・・・昔の話ばかり掘り返して、何が楽しいんだ。',
    en: '...Dredging up nothing but the past, what\'s so fun about that?',
    ko: '......과거 이야기만 자꾸 들춰내서 뭐가 즐겁다는 건지.',
  },
  '・・・・・・まあ、おまえとこうして話すのも随分久しぶりだがな。': {
    ja: '・・・・・・まあ、おまえとこうして話すのも随分久しぶりだがな。',
    en: '...Well, it really has been a long time since I spoke with you like this, though.',
    ko: '......뭐, 너랑 이렇게 이야기하는 것도 꽤 오랜만이긴 하지만.',
  },
  '・・・・・・相変わらず、静かな部屋だな。ディストの騒々しい実験室とは大違いだ。': {
    ja: '・・・・・・相変わらず、静かな部屋だな。ディストの騒々しい実験室とは大違いだ。',
    en: '...Quiet room, as always. Worlds apart from Dist\'s noisy laboratory.',
    ko: '......여전히 조용한 방이군. 디스트의 시끄러운 실험실과는 천지차이야.',
  },
  '・・・・・・少しだけなら、まだ居てやってもいい。': {
    ja: '・・・・・・少しだけなら、まだ居てやってもいい。',
    en: '...If it\'s just for a little while, I wouldn\'t mind staying a bit longer.',
    ko: '......아주 잠깐이라면 좀 더 있어줄 수도 있다.',
  },
  '・・・・・・あいつらが元気でやっているなら、それでいい。': {
    ja: '・・・・・・あいつらが元気でやっているなら、それでいい。',
    en: '...As long as those guys are doing well, that\'s enough for me.',
    ko: '......그 녀석들이 잘 지내고 있다면, 그걸로 됐다.',
  },
  '・・・・・・おまえも、あまり余計な気を回すなよ。': {
    ja: '・・・・・・おまえも、あまり余計な気を回すなよ。',
    en: '...Don\'t overthink things needlessly either, Guy.',
    ko: '......너도 너무 쓸데없는 걱정 사서 하지 마라.',
  },
  '・・・・・・おい、さっきから何を考え込んでいる。': {
    ja: '・・・・・・おい、さっきから何を考え込んでいる。',
    en: '...Hey, what have you been brooding over this whole time?',
    ko: '......이봐, 아까부터 뭘 그렇게 골똘히 생각하는 거냐.',
  },
  '・・・・・・変な詮索はそこまでにしておけよ、ガイ。': {
    ja: '・・・・・・変な詮索はそこまでにしておけよ、ガイ。',
    en: '...Keep your weird prying to a minimum, Guy.',
    ko: '......이상한 캐묻기는 그쯤 해둬라, 가이.',
  },
  '・・・・・・チッ。': {
    ja: '・・・・・・チッ。',
    en: '...Tsk.',
    ko: '......쳇.',
  },
  '・・・・・・はぁ。もういい、今のは忘れろ。': {
    ja: '・・・・・・はぁ。もういい、今のは忘れろ。',
    en: '...*sigh* Whatever, forget what I just said.',
    ko: '......하아. 됐어, 방금 건 잊어라.',
  },
  '・・・・・・はぁ。・・・・・・少し頭が冷えた。もういい、話があるなら聞く。': {
    ja: '・・・・・・はぁ。・・・・・・少し頭が冷えた。もういい、話があるなら聞く。',
    en: '...*sigh* ...My head has cooled down a bit. Fine, if you have something to say, I\'ll listen.',
    ko: '......하아. ......머리가 좀 식었군. 됐어, 할 말이 있다면 듣겠다.',
  },
  '・・・・・・おい、いつまで黙り込んでいるつもりだ。\n・・・・・・はぁ。もういい、話があるなら聞く。': {
    ja: '・・・・・・おい、いつまで黙り込んでいるつもりだ。\n・・・・・・はぁ。もういい、話があるなら聞く。',
    en: '...Hey, how long are you going to keep silent?\n...*sigh* Fine, if you have something to say, I\'ll listen.',
    ko: '......이봐, 언제까지 입 다물고 있을 셈이냐.\n......하아. 됐어, 할 말이 있다면 듣지.',
  },
  '・・・・・・チッ、そうやって黙り込まれると調子が狂う。\n・・・・・・少し頭は冷えた。何か言ったらどうだ。': {
    ja: '・・・・・・チッ、そうやって黙り込まれると調子が狂う。\n・・・・・・少し頭は冷えた。何か言ったらどうだ。',
    en: '...Tsk, going silent like that throws me off.\n...My head has cooled down. Why don\'t you say something?',
    ko: '......쳇, 그렇게 묵묵부답으로 나오면 페이스가 꼬이잖아.\n......머리는 좀 식었다. 뭐라고 말이라도 해보지 그래.',
  },
  '・・・・・・な、なんだよ。別に今おまえを見ていたわけじゃない！　・・・・・・もういい、その話なら聞いてやる。': {
    ja: '・・・・・・な、なんだよ。別に今おまえを見ていたわけじゃない！　・・・・・・もういい、その話なら聞いてやる。',
    en: '...Wh-what? It\'s not like I was looking at you! ...Fine, I\'ll listen to what you have to say.',
    ko: '......뭐, 뭐야. 딱히 지금 널 보고 있던 게 아냐! ......됐어, 그 이야기라면 들어주지.',
  },
  '・・・・・・な、なんだよ。たまたま目が合っただけだろうが。・・・・・・ふん、用件があるなら言え。': {
    ja: '・・・・・・な、なんだよ。たまたま目が合っただけだろうが。・・・・・・ふん、用件があるなら言え。',
    en: '...Wh-what? Our eyes just happened to meet, that\'s all. ...Hmph, if you have business, spit it out.',
    ko: '......뭐, 뭐야. 어쩌다 눈이 마주쳤을 뿐이잖아. ......흥, 용건이 있다면 말해.',
  },
  '・・・・・・質問がないなら帰らせてもらう。': {
    ja: '・・・・・・質問がないなら帰らせてもらう。',
    en: '...If you have no questions, I am leaving.',
    ko: '......질문이 없다면 돌아가겠다.',
  },
  '・・・・・・人を部屋に連れ込んでおいて、よそ見とはいい気なものだな。': {
    ja: '・・・・・・人を部屋に連れ込んでおいて、よそ見とはいい気なものだな。',
    en: '...Dragging someone into your room only to look away, how presumptuous.',
    ko: '......사람을 방으로 데려와 놓고 한눈을 팔다니 좋은 배짱이군.',
  },
  '・・・・・・まだ他に気を取られているのか。質問があるなら手短に済ませろ。': {
    ja: '・・・・・・まだ他に気を取られているのか。質問があるなら手短に済ませろ。',
    en: '...Still distracted by something else? If you have questions, make it brief.',
    ko: '......아직도 다른 데 정신이 팔려 있나. 질문이 있다면 짧게 끝내라.',
  },
  '・・・・・・どこへ目を逸らしていたんだ、おい。': {
    ja: '・・・・・・どこへ目を逸らしていたんだ、おい。',
    en: '...Where were you looking away to, hey?',
    ko: '......어딜 쳐다보고 있던 거냐, 이봐.',
  },
  '・・・・・・人の顔も見ずに考え事か。': {
    ja: '・・・・・・人の顔も見ずに考え事か。',
    en: '...Lost in thought without even looking at my face, huh.',
    ko: '......사람 얼굴도 보지 않고 생각에 잠기다니.',
  },
  '・・・・・・チッ、まだ何か言いたいことがあるのか。': {
    ja: '・・・・・・チッ、まだ何か言いたいことがあるのか。',
    en: '...Tsk, do you still have something to say?',
    ko: '......쳇, 아직도 뭔가 하고 싶은 말이 있나.',
  },
  '・・・・・・どこを見ているんだ？　急によそ見をして、考え事でもしていたのか。': {
    ja: '・・・・・・どこを見ているんだ？　急によそ見をして、考え事でもしていたのか。',
    en: '...Where are you looking? Looking away all of a sudden, were you lost in thought?',
    ko: '......어딜 보고 있는 거냐? 갑자기 딴청을 피우고, 생각이라도 하고 있었나.',
  },
  '・・・・・・おい、人の話を聞きながら別のものに気を取られるな。': {
    ja: '・・・・・・おい、人の話を聞きながら別のものに気を取られるな。',
    en: '...Hey, don\'t get distracted while listening to someone talk.',
    ko: '......이봐, 남의 말을 들으면서 다른 것에 신경 팔리지 마라.',
  },
  '・・・・・・俺に用がないなら、もう帰ってもいいか？　まだ何か話があるのか。': {
    ja: '・・・・・・俺に用がないなら、もう帰ってもいいか？　まだ何か話があるのか。',
    en: '...If you don\'t need anything from me, can I leave now? Or do you still have business?',
    ko: '......나한테 볼일이 없다면 이제 돌아가도 되나? 아직 할 말이 더 있나.',
  },
  '・・・・・・おい、ガイ。レ・・・・・・いや。・・・・・・ルークはどうしてる': {
    ja: '・・・・・・おい、ガイ。レ・・・・・・いや。・・・・・・ルークはどうしてる',
    en: '...Hey, Guy. How is the repli—no. ...How is Luke doing?',
    ko: '……어이, 가이. 레…… 아니. ……루크는 어떻게 지내냐.',
  },
  'ルークの近況について聞くアッシュに答える': {
    ja: 'ルークの近況について聞くアッシュに答える',
    en: 'Respond to Asch asking about Luke\'s current situation.',
    ko: '루크의 근황을 묻는 애쉬에게 대답한다.',
  },
  '今や英雄様だからな。あいつも忙しそうだよ': {
    ja: '今や英雄様だからな。あいつも忙しそうだよ',
    en: 'Well, he\'s the big hero now. Looks like he\'s pretty busy himself.',
    ko: '이젠 어엿한 영웅님이시니까. 그 녀석도 꽤 바빠 보이더라고.',
  },
  '・・・・・・どうして俺を連れ出したりしたんだ': {
    ja: '・・・・・・どうして俺を連れ出したりしたんだ',
    en: '...Why did you bring me out here?',
    ko: '……어째서 날 데리고 나온 거지?',
  },
  'どうして連れ出したのかと問うアッシュに答える': {
    ja: 'どうして連れ出したのかと問うアッシュに答える',
    en: 'Respond to Asch asking why he was brought along.',
    ko: '어째서 데리고 나왔냐고 묻는 애쉬에게 대답한다.',
  },
  '機体モデルに関する質問時、「ふざけるな、これは俺の」という未フィルタ音声を出力。0.4秒後に「研究所にあった予備機体」へ発言を修正': {
    ja: '機体モデルに関する質問時、「ふざけるな、これは俺の」という未フィルタ音声を出力。0.4秒後に「研究所にあった予備機体」へ発言を修正',
    en: 'When questioned regarding the chassis model, output the unfiltered voice line: "Don\'t give me that, this is my—" Corrected statement to "a spare chassis found in the laboratory" 0.4 seconds later.',
    ko: '기체 모델에 관한 질문을 받았을 때, "웃기지 마, 이건 내—"라는 미필터링 음성을 출력. 0.4초 후 "연구소에 있던 예비 기체"로 발언 수정.',
  },
  'ディストの名前を出したとき、嫌そうな顔をして目を逸らしたよな。\n自分を造った相手に、ただの譜業がそんな顔をするわけないだろ': {
    ja: 'ディストの名前を出したとき、嫌そうな顔をして目を逸らしたよな。\n自分を造った相手に、ただの譜業がそんな顔をするわけないだろ',
    en: 'When I mentioned Dist, you looked completely disgusted and looked away.\nA simple fonic craft wouldn\'t make a face like that toward its own creator.',
    ko: '디스트 이름을 꺼냈을 때, 엄청 싫은 표정으로 눈을 돌렸지.\n자길 만든 주인한테 단순한 포업이 그런 얼굴을 할 리가 없잖아.',
  },
  'あの刀を見せたとき、俺が何も説明する前に「おまえの手に戻ったんだな」って漏らしたよな。\n初対面の譜業が、ファブレ邸にあった俺の家の刀を知ってるわけがないだろ': {
    ja: 'あの刀を見せたとき、俺が何も説明する前に「おまえの手に戻ったんだな」って漏らしたよな。\n初対面の譜業が、ファブレ邸にあった俺の家の刀を知ってるわけがないだろ',
    en: 'When I showed you that sword, before I explained anything, you muttered \'So it returned to your hands.\'\nThere\'s no way a fonic craft meeting me for the first time would recognize my family sword kept at the Fabre manor.',
    ko: '그 검을 보여줬을 때, 내가 아무 설명도 안 했는데 \"네 손에 돌아갔군\" 하고 중얼거렸잖아.\n처음 본 포업이 파브레 저택에 있던 우리 가문 검을 알고 있을 리가 없지.',
  },
  '『宝刀ガルディオス』視認時、「そうか、おまえの手に戻ったんだな」という音声出力と共に音素波形が鎮静化。直後に「俺には関係ない」へ発言を修正': {
    ja: '『宝刀ガルディオス』視認時、「そうか、おまえの手に戻ったんだな」という音声出力と共に音素波形が鎮静化。直後に「俺には関係ない」へ発言を修正',
    en: 'Upon sighting the "Guardian Sword Gardios," fonon waveforms stabilized alongside the voice output: "I see, it\'s back in your hands." Immediately afterward, the statement was corrected to: "It has nothing to do with me."',
    ko: '\"보도 가르디오스\" 시각 인식 시, "그런가, 네 손으로 돌아갔군"이라는 음성 출력과 함께 음소 파형이 안정화됨. 직후 "나와는 상관없는 일이다"로 발언 수정.',
  },
  'ナタリアとルークが結婚するって話したとき、「あいつらが、結婚！？」って食いついたよな。\n赤の他人の譜業が、なんでそんなに動揺するんだ？': {
    ja: 'ナタリアとルークが結婚するって話したとき、「あいつらが、結婚！？」って食いついたよな。\n赤の他人の譜業が、なんでそんなに動揺するんだ？',
    en: 'When I told you Natalia and Luke were getting married, you blurted out \'Those two, married?!\'\nWhy would a complete stranger of a fonic craft get so shaken up?',
    ko: '나탈리아랑 루크가 결혼한다는 얘길 꺼냈을 때, \"그 녀석들이, 결혼!?\" 하고 놀라서 되물었지.\n생판 남인 포업이 왜 그렇게 동요하는 건데?',
  },
  'ナタリア王女に関する質問時、「あいつらが、結婚！？」という音声出力と最大振幅の波形乱れを記録。直後に発言を修正': {
    ja: 'ナタリア王女に関する質問時、「あいつらが、結婚！？」という音声出力と最大振幅の波形乱れを記録。直後に発言を修正',
    en: 'During questions about Princess Natalia, logged speech output \'Those two, married?!\' alongside maximum-amplitude waveform spikes. Statement immediately corrected.',
    ko: '나탈리아 공주에 관한 질문 시, \"그 녀석들이, 결혼!?\"이라는 음성 출력과 최대 진폭의 파형 요동을 기록. 직후 발언을 정정.',
  },
  'ナタリアとルークの結婚の話をしたとき、息を呑んで目を伏せたよな。\n赤の他人の譜業なら、そんな顔になるはずがないだろ': {
    ja: 'ナタリアとルークの結婚の話をしたとき、息を呑んで目を伏せたよな。\n赤の他人の譜業なら、そんな顔になるはずがないだろ',
    en: 'When I talked about Natalia and Luke marrying, you gasped and looked down.\nA stranger\'s fonic craft would never wear an expression like that.',
    ko: '나탈리아와 루크의 결혼 이야기를 꺼냈을 때 숨을 죽이고 눈을 내리깔았잖아.\n남남인 포업이라면 그런 표정을 지을 리가 없는데.',
  },
  'ナタリア王女に関する質問直後、発話前の0.7秒間に視線降下および音素出力の急激な乱れを記録': {
    ja: 'ナタリア王女に関する質問直後、発話前の0.7秒間に視線降下および音素出力の急激な乱れを記録',
    en: 'Immediately after question concerning Princess Natalia, logged gaze lowering and sharp fonon output disturbances during the 0.7s prior to speech.',
    ko: '나탈리아 공주에 관한 질문 직후, 발화 전 0.7초 동안 시선 하강 및 급격한 음소 출력 교란을 기록.',
  },
  'さっき、「なんで俺の名前が」って声を荒げたよな。\n自分がアッシュじゃないなら、ブウサギの名前くらいで怒るわけないだろ': {
    ja: 'さっき、「なんで俺の名前が」って声を荒げたよな。\n自分がアッシュじゃないなら、ブウサギの名前くらいで怒るわけないだろ',
    en: 'Earlier you raised your voice shouting \'Why is my name...?\'\nIf you\'re not Asch, why would you get mad over a rappe\'s name?',
    ko: '방금 \"왜 내 이름이\"라며 버럭 소리 질렀지.\n네가 애쉬가 아니라면 부우사기 이름 따위로 화낼 리가 없잖아.',
  },
  'ブウサギの個体名『アッシュ』が入力された瞬間、「なんで俺の名前が」という未フィルタ音声を出力し、直後に発言を修正': {
    ja: 'ブウサギの個体名『アッシュ』が入力された瞬間、「なんで俺の名前が」という未フィルタ音声を出力し、直後に発言を修正',
    en: 'Upon input of rappe name \'Asch\', logged unfiltered audio \'Why is my name...\', immediately followed by self-correction.',
    ko: '부우사기 개체명 "애쉬"가 입력된 순간 \"왜 내 이름이\"라는 미필터링 음성을 출력, 직후 발언을 정정.',
  },
  'ブウサギの話をしたとき、俺を睨みつけたよな。\n他人のペットの名前くらいで、なんでそんなに睨むんだ？': {
    ja: 'ブウサギの話をしたとき、俺を睨みつけたよな。\n他人のペットの名前くらいで、なんでそんなに睨むんだ？',
    en: 'When I brought up the rappe, you glared at me.\nWhy glare like that over someone else\'s pet name?',
    ko: '부우사기 얘길 꺼냈을 때 날 째려봤지.\n남의 애완동물 이름 따위로 왜 그렇게 노려보는 건데?',
  },
  'ブウサギの個体名『アッシュ』が入力された直後、発話前の0.7秒間に音素出力の急上昇と睨みつけ動作を記録': {
    ja: 'ブウサギの個体名『アッシュ』が入力された直後、発話前の0.7秒間に音素出力の急上昇と睨みつけ動作を記録',
    en: 'Immediately following rappe name \'Asch\' input, logged fonon output surge and glaring motion during the 0.7s preceding speech.',
    ko: '부우사기 개체명 "애쉬" 입력 직후, 발화 전 0.7초간 음소 출력 급상승과 노려보는 동작을 기록.',
  },
  'タコ料理を勧めたとき、思わず「嫌がらせか」って口走ったよな。\nただ飯に誘っただけでそんな返しをするのは、タコ嫌いのおまえくらいだぞ': {
    ja: 'タコ料理を勧めたとき、思わず「嫌がらせか」って口走ったよな。\nただ飯に誘っただけでそんな返しをするのは、タコ嫌いのおまえくらいだぞ',
    en: 'When I offered octopus food, you blurted out \'Is this harassment?!\'\nThe only person who reacts like that to a dinner invite is octopus-hating you.',
    ko: '문어 요리를 권했을 때 무심코 \"괴롭히는 거냐\" 하고 내뱉었지.\n그냥 밥 먹자고 권한 것뿐인데 그런 반응을 할 녀석은 문어 질색하는 너밖에 없다고.',
  },
  'タコ料理の提案に対し、「嫌がらせか・・・・・・？」という未フィルタ音声を出力。生体時（20歳時点）の嫌悪食品データと完全一致': {
    ja: 'タコ料理の提案に対し、「嫌がらせか・・・・・・？」という未フィルタ音声を出力。生体時（20歳時点）の嫌悪食品データと完全一致',
    en: 'Logged unfiltered audio \'Are you harassing me...?\' in response to octopus dish suggestion. Exact match with aversion archives from age 20.',
    ko: '문어 요리 제안에 대해 \"괴롭히는 거냐……?\"라는 미필터링 음성을 출력. 생전(20세 시점) 혐오 음식 데이터와 완전 일치.',
  },
  'タコ料理を勧めたとき、露骨に顔をしかめたよな。\nただの譜業が、食べ物の名前だけでそんな嫌そうな顔をするかよ': {
    ja: 'タコ料理を勧めたとき、露骨に顔をしかめたよな。\nただの譜業が、食べ物の名前だけでそんな嫌そうな顔をするかよ',
    en: 'When I suggested octopus, you made a blatantly repulsed face.\nA mere fonic craft wouldn\'t look so disgusted just at the mention of a food.',
    ko: '문어 요리를 권했을 때 노골적으로 인상을 찌푸렸지.\n단순한 포업이 음식 이름만 듣고 그렇게 싫은 표정을 지을 리 없잖아.',
  },
  'タコ料理の提案直後、発話前の0.7秒間に視線降下および拒絶波形スパイクを記録': {
    ja: 'タコ料理の提案直後、発話前の0.7秒間に視線降下および拒絶波形スパイクを記録',
    en: 'Immediately following octopus dish suggestion, logged gaze drop and rejection waveform spikes during the 0.7s prior to speech.',
    ko: '문어 요리 제안 직후, 발화 전 0.7초간 시선 하강 및 거부 파형 스파이크를 기록.',
  },
  'アッシュの噂話をしたとき、「気にしてなど」って言い返しかけたよな。\n赤の他人なら、自分のことみたいに怒るはずがないだろ': {
    ja: 'アッシュの噂話をしたとき、「気にしてなど」って言い返しかけたよな。\n赤の他人なら、自分のことみたいに怒るはずがないだろ',
    en: 'When I mentioned rumors about Asch, you almost snapped \'As if I care...!\'\nA stranger wouldn\'t get upset as if it were personal.',
    ko: '애쉬 소문을 꺼냈을 때 \"신경 따위\" 하고 되받아치려 했지.\n남남이라면 자기 일처럼 화낼 리가 없잖아.',
  },
  '『鮮血のアッシュ』の身長に関する言及に対し、「気にしてなど」という未フィルタ音声を出力し、直後に発言を修正': {
    ja: '『鮮血のアッシュ』の身長に関する言及に対し、「気にしてなど」という未フィルタ音声を出力し、直後に発言を修正',
    en: 'In response to remarks on \'Asch the Bloody\'s\' height, logged unfiltered audio \'As if I care...\', immediately followed by self-correction.',
    ko: '"선혈의 애쉬"의 키에 관한 언급에 대해 \"신경 따위\"라는 미필터링 음성을 출력, 직후 발언을 정정.',
  },
  'アッシュの噂話をしたとき、俺を睨みつけたよな。\n赤の他人の噂話に、なんでおまえがムッとするんだ？': {
    ja: 'アッシュの噂話をしたとき、俺を睨みつけたよな。\n赤の他人の噂話に、なんでおまえがムッとするんだ？',
    en: 'When I brought up rumors about Asch, you glared at me.\nWhy would you get offended over rumors about a complete stranger?',
    ko: '애쉬 소문을 꺼냈을 때 날 노려봤지.\n남의 소문에 왜 네가 기분 나빠하는 건데?',
  },
  '『鮮血のアッシュ』の身長に関する言及直後、発話前の0.7秒間に音素出力の急上昇と睨みつけ動作を記録': {
    ja: '『鮮血のアッシュ』の身長に関する言及直後、発話前の0.7秒間に音素出力の急上昇と睨みつけ動作を記録',
    en: 'Immediately after remarks on \'Asch the Bloody\'s\' height, logged fonon output surge and glaring motion during the 0.7s prior to speech.',
    ko: '"선혈의 애쉬"의 키에 관한 언급 직후, 발화 전 0.7초간 음소 출력 급상승과 노려보는 동작을 기록.',
  },
  '追求': {
    ja: '追求',
    en: 'Pursuit',
    ko: '추궁',
  },
  'しかし、なんでまた『タルロウA』なんて名前で譜業のフリをしていたんだ？\nとっさに思いついた嘘にしては妙に具体的だったけど': {
    ja: 'しかし、なんでまた『タルロウA』なんて名前で譜業のフリをしていたんだ？\nとっさに思いついた嘘にしては妙に具体的だったけど',
    en: 'Still, why on earth were you pretending to be a fonic craft called \'Tarlow A\'?\nFor a spur-of-the-moment lie, it was strangely specific.',
    ko: '그건 그렇고, 왜 하필 "타르로우 A"라는 이름으로 포업 흉내를 낸 거야?\n순간적으로 지어낸 거짓말치고는 묘하게 구체적이던데.',
  },
  'でまかせじゃない。2ヶ月前にその機体が壊れてこれに移されるまで、\n俺は本当に『タルロウA』という50センチくらいの小型譜業に入っていた。\nおまえやあの眼鏡、皇帝が研究所に来た時にも、何度か顔を合わせている': {
    ja: 'でまかせじゃない。2ヶ月前にその機体が壊れてこれに移されるまで、\n俺は本当に『タルロウA』という50センチくらいの小型譜業に入っていた。\nおまえやあの眼鏡、皇帝が研究所に来た時にも、何度か顔を合わせている',
    en: 'It\'s no lie. Until that unit was wrecked two months ago and I was moved to this one,\nI really was inside a 50cm compact fonic craft called \'Tarlow A\'.\nWhen you, four-eyes, or the Emperor visited the lab, I saw you all more than once.',
    ko: '거짓말이 아냐. 2개월 전에 그 기체가 부서져서 여기로 옮겨질 때까지,\n난 정말로 "타르로우 A"라는 50센티 정도의 소형 포업에 들어가 있었다.\n너나 그 안경, 황제가 연구소에 왔을 때도 몇 번 마주친 적 있어.',
  },
  'あの小型譜業に入っていたのか！？\n同じ部屋にいたなら、なんでその時に声をかけてくれなかったんだ！': {
    ja: 'あの小型譜業に入っていたのか！？\n同じ部屋にいたなら、なんでその時に声をかけてくれなかったんだ！',
    en: 'You were inside that little fonic craft?!\nIf you were in the same room, why didn\'t you say anything back then?!',
    ko: '그 소형 포업에 들어가 있었단 말야?!\n같은 방에 있었으면 왜 그때 말을 걸지 않은 거야!',
  },
  '・・・・・・俺がこんな譜業になって生き永らえているなどと、\n気付かないならそれに越したことはないだろう。\n今はもうこの姿で見つかってしまったから、隠しても仕方がないがな': {
    ja: '・・・・・・俺がこんな譜業になって生き永らえているなどと、\n気付かないならそれに越したことはないだろう。\n今はもうこの姿で見つかってしまったから、隠しても仕方がないがな',
    en: '...If none of you realized I was surviving as some fonic craft,\nall the better. Ignorance was bliss.\nThough now that you\'ve caught me in this body, there\'s no point hiding it.',
    ko: '……내가 이런 포업이 되어서 목숨을 부지하고 있다는 걸,\n눈치채지 못한다면 그게 제일 나았으니까.\n지금은 이미 이 꼴로 들켜버렸으니 숨겨봤자 소용없겠지만.',
  },
  'まさかそんな小型譜業の中に入っていたとはね・・・・・・。\nあの目ざとい大佐やピオニー陛下にまで会っていて、よく正体がバレなかったもんだ': {
    ja: 'まさかそんな小型譜業の中に入っていたとはね・・・・・・。\nあの目ざとい大佐やピオニー陛下にまで会っていて、よく正体がバレなかったもんだ',
    en: 'To think you were inside that little fonic craft...\nEven running into that sharp Colonel and Emperor Peony, it\'s amazing your cover wasn\'t blown.',
    ko: '설마 그런 소형 포업 속에 들어가 있었을 줄이야…….\n눈치 빠른 대령이나 피오니 폐하까지 만났으면서 용케 정체가 안 들통났네.',
  },
  'ただの自律譜業のフリをして、部屋の隅で休止したふりをしていたからな。\nあの皇帝には面白半分に頭を叩かれたが、まさか中身が俺だとは思わなかったんだろう': {
    ja: 'ただの自律譜業のフリをして、部屋の隅で休止したふりをしていたからな。\nあの皇帝には面白半分に頭を叩かれたが、まさか中身が俺だとは思わなかったんだろう',
    en: 'I just acted like an ordinary autonomous fonic craft, feigning sleep in the corner.\nThat Emperor smacked my head for fun, but never dreamed who was inside.',
    ko: '단순한 자율 포업인 척 방 구석에서 휴지 상태를 위장했으니까.\n그 황제 녀석이 장난삼아 머리를 툭툭 치긴 했지만, 안에 든 게 나일 거라곤 꿈에도 몰랐겠지.',
  },
  '雑談': {
    ja: '雑談',
    en: 'Small Talk',
    ko: '잡담',
  },
  'その姿、俺が屋敷にいた頃の背丈そのままなんだな。やっぱり目線が低くて動きづらいか？': {
    ja: 'その姿、俺が屋敷にいた頃の背丈そのままなんだな。やっぱり目線が低くて動きづらいか？',
    en: 'That appearance, you\'re the exact same height as when I was at the manor. Is it hard to move around with your vision so low?',
    ko: '그 모습, 내가 저택에 있었을 적 키 그대로구나. 역시 시선이 낮아서 움직이기 불편해?',
  },
  '身長の話をするな。\n50センチの鉄塊だった頃に比べれば、人間の形になっただけマシだがな': {
    ja: '身長の話をするな。\n50センチの鉄塊だった頃に比べれば、人間の形になっただけマシだがな',
    en: 'Don\'t talk about height.\nCompared to being a 50cm chunk of scrap metal, having human shape is an improvement.',
    ko: '키 얘기 꺼내지 마.\n50센티짜리 쇳덩이였을 때에 비하면 인간 형상이 된 것만으로도 감지덕지니까.',
  },
  'そうだな。・・・・・・こうして向かい合っていると、本当にあの頃に戻ったみたいだよ': {
    ja: 'そうだな。・・・・・・こうして向かい合っていると、本当にあの頃に戻ったみたいだよ',
    en: 'True enough... Facing you like this, it really feels like we\'ve stepped back into those days.',
    ko: '그렇네. ……이렇게 마주보고 있으니 정말 그때로 돌아간 것 같아.',
  },
  '・・・・・・だが、その小さな身体じゃ、もう剣もまともに振れないんじゃないか？': {
    ja: '・・・・・・だが、その小さな身体じゃ、もう剣もまともに振れないんじゃないか？',
    en: '...Still, with that small body, you can hardly swing a sword properly anymore, can you?',
    ko: '……하지만 그 작은 몸으론 이제 검도 제대로 못 휘두르는 거 아냐?',
  },
  'いちいち言うな。そんなことは俺が一番分かっている！': {
    ja: 'いちいち言うな。そんなことは俺が一番分かっている！',
    en: 'Stop reminding me! I know that better than anyone!',
    ko: '일일이 말하지 마. 그딴 건 내가 제일 잘 알고 있어!',
  },
  'そうだ。紅茶でも淹れようか': {
    ja: 'そうだ。紅茶でも淹れようか',
    en: 'Right. How about I brew some tea?',
    ko: '그렇지. 홍차라도 좀 끓여올까?',
  },
  '茶などいらんと言っているだろう。飲めるには飲めるが、この身体には何の意味もない。\n・・・・・・淹れたいなら好きにすればいい': {
    ja: '茶などいらんと言っているだろう。飲めるには飲めるが、この身体には何の意味もない。\n・・・・・・淹れたいなら好きにすればいい',
    en: 'I told you I don\'t need tea. I can swallow it, but it does nothing for this body.\n...If you\'re brewing it anyway, do whatever you like.',
    ko: '차 따윈 필요 없다고 했잖아. 마시려면 마실 수 있지만 이 몸엔 아무 의미 없어.\n……끓이고 싶으면 네 마음대로 해라.',
  },
  '・・・・・・その、機嫌直せよ。\n・・・・・・紅茶でも淹れようか。おまえの分も': {
    ja: '・・・・・・その、機嫌直せよ。\n・・・・・・紅茶でも淹れようか。おまえの分も',
    en: '...Hey, don\'t be like that.\n...How about I brew some black tea? Yours included.',
    ko: '……저기, 기분 좀 풀어.\n……홍차라도 끓여올까? 네 몫까지.',
  },
  '・・・・・・淹れてくれるなら、貰っておく': {
    ja: '・・・・・・淹れてくれるなら、貰っておく',
    en: '...If you\'re making it anyway, I\'ll take a cup.',
    ko: '……우려줄 거라면, 받아두지.',
  },
  '機体ログ': {
    ja: '機体ログ',
    en: 'Chassis Log',
    ko: '기체 로그',
  },
  '口腔内の音素センサーにより味覚データを数値化し、本来の肉体時における嗜好メモリと照合可能。\nただし消化器官系が存在しないため、摂取された水分は内部の気化排熱機構へ送られ、微小蒸気として外部へ排出される構造。\n対象が淹れた茶を摂取した際、嗜好照合結果に基づき「悪くない」という情動波形の微細な好転が記録されている。': {
    ja: '口腔内の音素センサーにより味覚データを数値化し、本来の肉体時における嗜好メモリと照合可能。\nただし消化器官系が存在しないため、摂取された水分は内部の気化排熱機構へ送られ、微小蒸気として外部へ排出される構造。\n対象が淹れた茶を摂取した際、嗜好照合結果に基づき「悪くない」という情動波形の微細な好転が記録されている。',
    en: 'Oral fonon sensors digitize gustatory metrics, matching against dietary preferences from life.\nLacking internal digestive organs, consumed liquid is routed to vaporization exhaust radiators and expelled as micro-steam.\nUpon drinking tea prepared by the subject, affective waveforms logged a subtle improvement tagged \'not bad\'.',
    ko: '구강 내 음소 센서로 미각 데이터를 수치화하여 생전 육체의 기호 메모리와 대조 가능.\n단 소화기관계가 존재하지 않아 섭취된 수분은 내부 기화 방열 기구로 보내져 미세 증기로 배출되는 구조.\n대상이 끓여준 차를 섭취했을 때 기호 대조 결과에 따라 \"나쁘지 않다\"는 미세한 정동 파형 호전이 기록됨.',
  },
  'ほら、砂糖は入れないでおいたぞ。\nおまえ、甘いの苦手だったろ？': {
    ja: 'ほら、砂糖は入れないでおいたぞ。\nおまえ、甘いの苦手だったろ？',
    en: 'See, no sugar added.\nYou always hated sweets, right?',
    ko: '자, 설탕은 안 넣었어.\n너 단 거 질색했잖아?',
  },
  '余計なことまで覚えているな、おまえは': {
    ja: '余計なことまで覚えているな、おまえは',
    en: 'You remember the most useless things.',
    ko: '쓸데없는 것까지 잘도 기억하고 있군, 네놈은.',
  },
  'ああ、ここに置いておくよ。おまえの好きにしろ': {
    ja: 'ああ、ここに置いておくよ。おまえの好きにしろ',
    en: 'Sure, I\'ll leave it right here. Do as you like with it.',
    ko: '그래, 여기 둘게. 네 마음대로 해.',
  },
  '・・・・・・ふん。\n・・・・・・悪くない茶葉だな。研究所の薬品臭い空気よりはずっとマシだ': {
    ja: '・・・・・・ふん。\n・・・・・・悪くない茶葉だな。研究所の薬品臭い空気よりはずっとマシだ',
    en: '...Hmph.\n...Not bad leaves. Far better than the chemical-choked air of that lab.',
    ko: '……흥.\n……나쁘지 않은 찻잎이군. 연구소의 약품 냄새 진동하는 공기보단 훨씬 낫다.',
  },
  'ところで・・・・・・、気になっていたんだが\nなんでエプロンなんか着てるんだ？': {
    ja: 'ところで・・・・・・、気になっていたんだが\nなんでエプロンなんか着てるんだ？',
    en: 'By the way... I\'ve been wondering.\nWhy are you wearing an apron?',
    ko: '그건 그렇고…… 아까부터 신경 쓰였는데,\n왜 에이프런 같은 걸 입고 있는 거야?',
  },
  '？　何を言ってる': {
    ja: '？　何を言ってる',
    en: '? What are you talking about?',
    ko: '? 무슨 소릴 하는 거야.',
  },
  'いや、だっておまえ、そんなフリフリのエプロン・・・・・・': {
    ja: 'いや、だっておまえ、そんなフリフリのエプロン・・・・・・',
    en: 'I mean, look at you, wearing an apron that frilly...',
    ko: '아니, 하지만 너, 그렇게 프릴 달린 에이프런이라니……',
  },
  'アンドロイドがエプロンを着用するのは当然だろうが。妙なことを言うな！': {
    ja: 'アンドロイドがエプロンを着用するのは当然だろうが。妙なことを言うな！',
    en: 'It\'s standard for an android to wear an apron! Don\'t make weird remarks!',
    ko: '안드로이드가 에이프런을 입는 건 당연하잖아! 이상한 소리 지껄이지 마!',
  },
  '（妙なのはおまえだろ・・・・・・）': {
    ja: '（妙なのはおまえだろ・・・・・・）',
    en: '(You\'re the strange one here...)',
    ko: '(이상한 건 네놈이잖아……)',
  },
  '通称：メイドアンドロイドモード。\n本機の中枢アセンブリへ組み込まれた生活支援および偽装給仕ルーチン。\n本プロトコルの稼働下においては、「高機能自律譜業における給仕用外装の着用は、稼働効率の最大化および機体規格上、極めて論理的かつ必然的な義務である」という認知補正が中枢論理回路に常時適用される。': {
    ja: '通称：メイドアンドロイドモード。\n本機の中枢アセンブリへ組み込まれた生活支援および偽装給仕ルーチン。\n本プロトコルの稼働下においては、「高機能自律譜業における給仕用外装の着用は、稼働効率の最大化および機体規格上、極めて論理的かつ必然的な義務である」という認知補正が中枢論理回路に常時適用される。',
    en: 'Colloquially: Maid Android Mode.\nA domestic service and steward disguise subroutine programmed into the core assembly.\nWhile active, a cognitive patch enforces on core logic that \'wearing domestic attire on a fonic craft is a logical, compulsory duty maximizing operational efficiency\'.',
    ko: '통칭: 메이드 안드로이드 모드.\n본 기체의 중추 어셈블리에 탑재된 생활 지원 및 위장 급사 루틴.\n본 프로토콜 가동 중에는 \"고기능 자율 포업의 급사용 외장 착용은 가동 효율 극대화 및 기체 규격상 지극히 논리적이고 필연적인 의무\"라는 인지 보정이 중추 논리 회로에 상시 적용됨.',
  },
  'そこの剣、やっぱり気になるか？': {
    ja: 'そこの剣、やっぱり気になるか？',
    en: 'That sword over there, does it bother you after all?',
    ko: '거기 있는 검, 역시 신경 쓰여?',
  },
  '・・・・・・おまえの手に戻ったんだな。\n・・・・・・元々おまえの家のものだ。あの屋敷に飾っておくより、よほどいい': {
    ja: '・・・・・・おまえの手に戻ったんだな。\n・・・・・・元々おまえの家のものだ。あの屋敷に飾っておくより、よほどいい',
    en: '...So it returned to your hands.\n...It belonged to your family all along. Far better than gathering dust in that manor.',
    ko: '……네 손에 돌아갔군.\n……원래 네 가문 물건이잖아. 그 저택에 장식해 두는 것보단 훨씬 낫다.',
  },
  'この『宝刀ガルディオス』が俺の手元に戻ったこと、今まで知らなかったのか？': {
    ja: 'この『宝刀ガルディオス』が俺の手元に戻ったこと、今まで知らなかったのか？',
    en: 'Did you really not know this Guardian Sword Gardios had returned to me until now?',
    ko: '이 "보도 가르디오스"가 내 손에 돌아온 걸 지금까지 몰랐던 거야?',
  },
  '・・・・・・ああ、知らなかった。父上が手放したんだな。\n・・・・・・元々おまえの家のものだ。あるべき場所に戻ったのなら、それでいい': {
    ja: '・・・・・・ああ、知らなかった。父上が手放したんだな。\n・・・・・・元々おまえの家のものだ。あるべき場所に戻ったのなら、それでいい',
    en: '...Yeah, I had no idea. So Father let it go.\n...It belonged to your family from the start. If it\'s where it belongs, that\'s fine.',
    ko: '……그래, 몰랐다. 아버지께서 손에서 놓으셨군.\n……원래 네 가문의 물건이다. 있어야 할 곳으로 돌아갔다면 그걸로 됐어.',
  },
  'その機体での剣のこと（もう一度聞く）': {
    ja: 'その機体での剣のこと（もう一度聞く）',
    en: 'About swordplay with that chassis (Ask again)',
    ko: '그 기체에서의 검술에 대해 (다시 묻는다)',
  },
  '普段通り歩いたり喋ったりはできているみたいだけど、その機体で剣を振ったりもできるのか？': {
    ja: '普段通り歩いたり喋ったりはできているみたいだけど、その機体で剣を振ったりもできるのか？',
    en: 'You walk and talk normally, but can you actually swing a sword in that chassis?',
    ko: '평소처럼 걷고 말하는 건 문제없어 보이는데, 그 기체로 검도 휘두를 수 있어?',
  },
  'さっきの剣の話だけど・・・・・・やっぱりその機体、動かす時に制限がかかっているのが気になるのか？': {
    ja: 'さっきの剣の話だけど・・・・・・やっぱりその機体、動かす時に制限がかかっているのが気になるのか？',
    en: 'About our talk earlier... Does having movement limiters on that chassis really bother you that much?',
    ko: '아까 검 얘기 말인데…… 역시 그 기체, 움직일 때 제한이 걸려 있는 게 신경 쓰여?',
  },
  '・・・・・・できない。ディストが四肢に出力制限をかけてやがる': {
    ja: '・・・・・・できない。ディストが四肢に出力制限をかけてやがる',
    en: '...I can\'t. Dist put output limiters on all my limbs.',
    ko: '……못 해. 디스트 녀석이 사지에 출력 제한을 걸어놨거든.',
  },
  '・・・・・・ディストが四肢に出力制限をかけてやがると言っただろう': {
    ja: '・・・・・・ディストが四肢に出力制限をかけてやがると言っただろう',
    en: '...I told you Dist put output limiters on my limbs.',
    ko: '……디스트 녀석이 사지에 출력 제한을 걸어놨다고 말했잖아.',
  },
  '機体の動かしづらさや剣について触れた際の発言': {
    ja: '機体の動かしづらさや剣について触れた際の発言',
    en: 'Statement when mentioning clumsiness of chassis and swordsmanship',
    ko: '기체의 움직이기 불편함과 검에 대해 언급했을 때의 발언',
  },
  'せっかく人間の形に戻れたのに、思いきり剣を振れないのはもどかしいだろうな': {
    ja: 'せっかく人間の形に戻れたのに、思いきり剣を振れないのはもどかしいだろうな',
    en: 'After finally getting a human body back, it must be frustrating not being able to practice your swordplay.',
    ko: '기껏 인간 형태로 돌아왔는데 마음껏 검을 휘두를 수 없다니 답답하겠네.',
  },
  '・・・・・・せっかく手足があるのに、強く踏み込むことすらできんからな': {
    ja: '・・・・・・せっかく手足があるのに、強く踏み込むことすらできんからな',
    en: '...Now that I actually have arms and legs again, I can\'t even take a solid stance without shutting down.',
    ko: '……모처럼 사지가 달려 있는데 힘차게 발을 내딛는 것조차 안 되니까.',
  },
  'その小さな機体じゃ危ないし、制限がかかっているくらいでちょうどいいんじゃないか？': {
    ja: 'その小さな機体じゃ危ないし、制限がかかっているくらいでちょうどいいんじゃないか？',
    en: 'With such a small chassis it could be dangerous anyway; maybe having limiters is for the best?',
    ko: '그 작은 기체론 위험하기도 하고, 제한이 걸려 있는 편이 딱 알맞지 않아?',
  },
  '・・・・・・おまえまで俺をガキ扱いする気か！': {
    ja: '・・・・・・おまえまで俺をガキ扱いする気か！',
    en: '...Are you trying to treat me like a kid too?!',
    ko: '……네놈까지 날 꼬맹이 취급할 셈이냐!',
  },
  '・・・・・・そうか。あまり触れられたくない話だったな、悪かったよ': {
    ja: '・・・・・・そうか。あまり触れられたくない話だったな、悪かったよ',
    en: '...I see. That was a sore topic, my apologies.',
    ko: '……그렇구나. 별로 건드리고 싶지 않은 얘기였지, 미안해.',
  },
  '・・・・・・別にいい。気にしてない': {
    ja: '・・・・・・別にいい。気にしてない',
    en: '...Whatever. I don\'t care.',
    ko: '……별로 상관없어. 신경 안 써.',
  },
  'ディストの所になんかよくいられるな': {
    ja: 'ディストの所になんかよくいられるな',
    en: 'How can you stand staying around Dist?',
    ko: '디스트 같은 녀석 곁에 잘도 붙어 있네.',
  },
  '機体名にとんでもない名前をつけようとするわ、毎日何時間も自慢話を聞かされるわで、うるさくて仕方がない': {
    ja: '機体名にとんでもない名前をつけようとするわ、毎日何時間も自慢話を聞かされるわで、うるさくて仕方がない',
    en: 'He tries giving this unit ridiculous names and babbles boasting stories for hours on end every day. It\'s maddening.',
    ko: '기체명에 얼토당토않은 이름을 붙이려 하질 않나, 매일 몇 시간씩 자랑을 늘어놓질 않나, 시끄러워 죽겠어.',
  },
  '適当にあしらっている。妙な名前を付けられそうになった時は殴り飛ばしてやったが・・・・・・': {
    ja: '適当にあしらっている。妙な名前を付けられそうになった時は殴り飛ばしてやったが・・・・・・',
    en: 'I brush him off. When he tried tattooing some bizarre name on me, I punched him across the room...',
    ko: '적당히 상대해주고 있어. 이상한 이름을 붙이려 들길래 한 방 날려줬지만……',
  },
  'はは、ディスト相手に毎日怒鳴り散らしてるおまえの姿が目に浮かぶよ。\nでも、そんなに騒がしいならあんな研究所に居続けなくてもいいだろうに': {
    ja: 'はは、ディスト相手に毎日怒鳴り散らしてるおまえの姿が目に浮かぶよ。\nでも、そんなに騒がしいならあんな研究所に居続けなくてもいいだろうに',
    en: 'Haha, I can picture you barking at Dist every day.\nStill, if it\'s that noisy, you didn\'t have to stay at that lab.',
    ko: '하하, 디스트를 상대로 매일 고함치고 있는 네 모습이 눈에 선하네.\n하지만 그렇게 시끄러우면 굳이 그런 연구소에 계속 있지 않아도 됐을 텐데.',
  },
  '・・・・・・あそこは人目につかない。身を隠すには都合がいいだけだ': {
    ja: '・・・・・・あそこは人目につかない。身を隠すには都合がいいだけだ',
    en: '...Nobody goes there. It\'s simply convenient for staying out of sight.',
    ko: '……거긴 인적이 드물어. 몸을 숨기기엔 안성맞춤일 뿐이다.',
  },
  'あいつ、そういう大仰な名前をつけるのが好きだもんなぁ': {
    ja: 'あいつ、そういう大仰な名前をつけるのが好きだもんなぁ',
    en: 'That guy always did love coming up with exaggerated grand titles.',
    ko: '그 녀석 그런 거창한 이름 짓는 걸 좋아하니까.',
  },
  '笑い事じゃない！　本気で銘板に刻もうとしやがったから、その場でへし折ってやった': {
    ja: '笑い事じゃない！　本気で銘板に刻もうとしやがったから、その場でへし折ってやった',
    en: 'It\'s no laughing matter! He was dead serious about engraving it onto my nameplate, so I snapped it in half right there.',
    ko: '웃을 일이 아냐! 진심으로 명판에 새겨넣으려 하길래 그 자리에서 동강 내버렸다.',
  },
  '研究室で隠れなかった理由（もう一度聞く）': {
    ja: '研究室で隠れなかった理由（もう一度聞く）',
    en: 'Why didn\'t you hide in the lab? (Ask again)',
    ko: '연구실에서 숨지 않은 이유 (다시 묻는다)',
  },
  '今日俺が研究室に入ったとき、なんで物陰に隠れもせずに部屋の隅に立っていたんだ？': {
    ja: '今日俺が研究室に入ったとき、なんで物陰に隠れもせずに部屋の隅に立っていたんだ？',
    en: 'When I stepped into the lab today, why were you standing frozen in the corner instead of ducking behind cover?',
    ko: '오늘 내가 연구실에 들어갔을 때, 왜 숨지도 않고 방 구석에 우두커니 서 있었어?',
  },
  'さっきの話だけど・・・・・・今日俺が研究室に入ったとき、やっぱり何か隠れ損ねる理由があったんじゃないのか？': {
    ja: 'さっきの話だけど・・・・・・今日俺が研究室に入ったとき、やっぱり何か隠れ損ねる理由があったんじゃないのか？',
    en: 'About our talk earlier... When I entered the lab today, was there a reason you couldn\'t hide in time?',
    ko: '아까 하던 얘기인데…… 오늘 내가 연구실에 들어갔을 때, 역시 뭔가 제때 숨지 못한 이유가 있었던 거 아냐?',
  },
  '・・・・・・足音が聞こえたから、いつも通り部屋の隅に退避して・・・・・・っ': {
    ja: '・・・・・・足音が聞こえたから、いつも通り部屋の隅に退避して・・・・・・っ',
    en: '...I heard footsteps, so I moved to my usual standby spot in the corner like always... and then...!',
    ko: '……발소리가 들리길래 늘 하던 대로 방 구석으로 대피했는데…… 큭!',
  },
  '・・・・・・まだその話をする気か': {
    ja: '・・・・・・まだその話をする気か',
    en: '...You\'re still on about that?',
    ko: '……아직도 그 얘길 할 셈이냐.',
  },
  'ああ、その体になってるって忘れてたのか！\n意外と抜けてるよなあ、おまえ': {
    ja: 'ああ、その体になってるって忘れてたのか！\n意外と抜けてるよなあ、おまえ',
    en: 'Ah, you forgot you had a human body now!\nYou can be surprisingly scatterbrained, you know.',
    ko: '아하, 그 몸이 됐다는 걸 깜빡했구나!\n너 의외로 얼빠진 데가 있다니까.',
  },
  '～～っ！！　ぬ、抜けてる・・・だと・・・！？': {
    ja: '～～っ！！　ぬ、抜けてる・・・だと・・・！？',
    en: 'Grrgh!! B-Befuddled... you say...?!',
    ko: '으으윽!! 얼, 얼빠졌다……고……?!',
  },
  '俺に見つけてほしくて、わざと残っていたんじゃないのか？': {
    ja: '俺に見つけてほしくて、わざと残っていたんじゃないのか？',
    en: 'Did you stay in plain sight on purpose so I would find you?',
    ko: '내가 찾아내 주길 바라서 일부러 거기 남아 있던 거 아냐?',
  },
  'そんな訳があるか！': {
    ja: 'そんな訳があるか！',
    en: 'As if that could be true!',
    ko: '그럴 리가 있겠냐!',
  },
  '退避して、どうしたんだ？': {
    ja: '退避して、どうしたんだ？',
    en: 'You retreated, and then what?',
    ko: '대피하고서, 어떻게 된 건데?',
  },
  'こんな話をするために連れてきたのか？！　違うだろうが！': {
    ja: 'こんな話をするために連れてきたのか？！　違うだろうが！',
    en: 'Did you drag me out here just to talk about this?! That wasn\'t the deal!',
    ko: '이런 시시한 얘길 하려고 날 데려온 거냐?! 그게 아닐 텐데!',
  },
  'その着ている服も、昔屋敷にいた頃の服によく似ているな。ディストが用意してくれたのか？': {
    ja: 'その着ている服も、昔屋敷にいた頃の服によく似ているな。ディストが用意してくれたのか？',
    en: 'The clothes you\'re wearing look a lot like what you wore at the manor back then. Did Dist provide them?',
    ko: '입고 있는 그 옷도 옛날 저택에 있을 때 입던 옷이랑 엄청 닮았네. 디스트가 준비해 준 거야?',
  },
  '着替えがこれしかなかっただけだ。\nあいつが最初に持ってきた悪趣味な服よりは、まだこれの方がマシだったからな': {
    ja: '着替えがこれしかなかっただけだ。\nあいつが最初に持ってきた悪趣味な服よりは、まだこれの方がマシだったからな',
    en: 'It was the only spare change available.\nCompared to the hideous monstrosity he brought first, this was far more bearable.',
    ko: '갈아입을 옷이 이것밖에 없었을 뿐이다.\n그 자식이 처음에 가져온 악취미 의상에 비하면 이게 훨씬 나았으니까.',
  },
  '着替えがこれしかなかっただけだ': {
    ja: '着替えがこれしかなかっただけだ',
    en: 'It was simply the only spare clothes available.',
    ko: '갈아입을 옷이 이것밖에 없었을 뿐이다.',
  },
  '似合ってるじゃないか': {
    ja: '似合ってるじゃないか',
    en: 'It looks good on you.',
    ko: '잘 어울리잖아.',
  },
  'まじまじ見るな': {
    ja: 'まじまじ見るな',
    en: 'Don\'t stare at me.',
    ko: '빤히 쳐다보지 마라.',
  },
  'みんなの近況（もう一度聞く）': {
    ja: 'みんなの近況（もう一度聞く）',
    en: 'About how everyone is doing (Ask again)',
    ko: '모두의 근황에 대해 (다시 묻는다)',
  },
  'この数年、特に王族の方々はずっと忙しそうだよ\n世界の仕組みが変わったんだから当然っちゃ当然だけどな': {
    ja: 'この数年、特に王族の方々はずっと忙しそうだよ\n世界の仕組みが変わったんだから当然っちゃ当然だけどな',
    en: 'These past few years, the royal families especially have been swamped.\nWith the world\'s very foundation remade, it\'s only natural.',
    ko: '요 몇 년간 특히 왕족 분들은 내내 바빠 보이셨어.\n세계의 섭리가 바뀌었으니 당연하다면 당연하지만.',
  },
  'さっきは興味がないって言っていたけど、\nみんなのこと・・・・・・ナタリアのことだって、本当は少し気にかけているんじゃないのか？': {
    ja: 'さっきは興味がないって言っていたけど、\nみんなのこと・・・・・・ナタリアのことだって、本当は少し気にかけているんじゃないのか？',
    en: 'You claimed you didn\'t care earlier, but\naren\'t you secretly worried about everyone... about Natalia?',
    ko: '아깐 관심 없다고 했지만,\n실은 모두의 일…… 나탈리아에 대해서도 조금은 신경 쓰고 있는 거 아냐?',
  },
  '・・・・・・そう、だろうな\n俺にはもう、関係のないことだ': {
    ja: '・・・・・・そう、だろうな\n俺にはもう、関係のないことだ',
    en: '...I suppose.\nNone of that concerns me anymore.',
    ko: '……그렇, 겠지.\n나하고는 이제 상관없는 일이다.',
  },
  'あいつらのことなど、俺には関係ないと言っているだろうが': {
    ja: 'あいつらのことなど、俺には関係ないと言っているだろうが',
    en: 'I told you, their lives have nothing to do with me!',
    ko: '그 녀석들의 일 따위 나완 상관없다고 말했잖아!',
  },
  'みんなの近況について話題を振られた際の発言': {
    ja: 'みんなの近況について話題を振られた際の発言',
    en: 'Statement when asked about everyone\'s updates',
    ko: '모두의 근황에 관한 화제를 꺼냈을 때의 발언',
  },
  'そう言いつつ、研究所にある通信機でナタリアの動向くらいは見ていたんじゃないか？': {
    ja: 'そう言いつつ、研究所にある通信機でナタリアの動向くらいは見ていたんじゃないか？',
    en: 'Say what you will, didn\'t you check up on Natalia using the comm terminal in the lab?',
    ko: '그렇게 말하면서도 연구소 통신기로 나탈리아 동향 정도는 훔쳐보고 있던 거 아냐?',
  },
  '暇つぶしに通信網を覗いていただけだ。あいつが無事なら、それでいい': {
    ja: '暇つぶしに通信網を覗いていただけだ。あいつが無事なら、それでいい',
    en: 'I only glanced at the network to kill time. As long as she is safe, that\'s enough.',
    ko: '심심풀이로 통신망을 들여다봤을 뿐이다. 그 녀석이 무사하다면 그걸로 됐어.',
  },
  '本当はひとりで研究所にいて寂しいくせに、意地を張るなよ': {
    ja: '本当はひとりで研究所にいて寂しいくせに、意地を張るなよ',
    en: 'You were lonely all by yourself in that lab, don\'t be stubborn.',
    ko: '사실은 혼자 연구소에 남겨져서 외로웠으면서, 고집부리지 마.',
  },
  '勝手な決めつけをするな！': {
    ja: '勝手な決めつけをするな！',
    en: 'Don\'t make assumptions on your own!',
    ko: '멋대로 넘겨짚지 마라!',
  },
  '・・・・・・しつこいぞ。ないと言ったら、ない': {
    ja: '・・・・・・しつこいぞ。ないと言ったら、ない',
    en: '...You\'re persistent. When I say no, I mean no.',
    ko: '……끈질기군. 없다고 하면 없는 거다.',
  },
  'なあ、研究室を出るときにディストからこれを渡されたんだが・・・・・・この画面、おまえの記録か？': {
    ja: 'なあ、研究室を出るときにディストからこれを渡されたんだが・・・・・・この画面、おまえの記録か？',
    en: 'Hey, Dist handed me this on my way out... Is this screen your operating log?',
    ko: '저기, 연구실을 나올 때 디스트한테 이걸 받았는데…… 이 화면, 네 기록이야?',
  },
  'なっ・・・・・・ディストの奴、\n俺の管理端末までおまえに渡しやがったのか': {
    ja: 'なっ・・・・・・ディストの奴、\n俺の管理端末までおまえに渡しやがったのか',
    en: 'What...?! That bastard Dist,\nhe actually handed you my control terminal?!',
    ko: '뭐……?! 디스트 그 자식,\n내 관리 단말기까지 네놈한테 넘겨준 거냐?!',
  },
  '悪かったよ。むやみに弄ったりしないでおく': {
    ja: '悪かったよ。むやみに弄ったりしないでおく',
    en: 'My bad. I won\'t go messing with it carelessly.',
    ko: '미안해. 함부로 이것저것 건드리진 않을게.',
  },
  '・・・・・・当たり前だ': {
    ja: '・・・・・・当たり前だ',
    en: '...Obviously.',
    ko: '……당연한 소릴.',
  },
  'すまん。ただ、その身体に無理が出ていないか気になったんだ': {
    ja: 'すまん。ただ、その身体に無理が出ていないか気になったんだ',
    en: 'Sorry. I was just worried whether that body was straining itself.',
    ko: '미안. 그저 그 몸에 무리가 가지 않는지 걱정돼서 그런 거야.',
  },
  '・・・・・・余計なお世話だ。自分の身体くらい自分で分かる': {
    ja: '・・・・・・余計なお世話だ。自分の身体くらい自分で分かる',
    en: '...Mind your own business. I know my own body well enough.',
    ko: '……쓸데없는 참견이다. 내 몸 상태쯤은 내가 알아.',
  },
  'へえ、これが管理端末なのか。つまりおまえが隠してることも、これを見れば全部丸見えってわけだ': {
    ja: 'へえ、これが管理端末なのか。つまりおまえが隠してることも、これを見れば全部丸見えってわけだ',
    en: 'Oho, so this is the control terminal. Meaning whatever you\'re hiding, I can see it all right here.',
    ko: '헤에, 이게 관리 단말기구나. 즉 네가 숨기는 것도 이걸 보면 훤히 다 보인다는 소리네.',
  },
  '趣味の悪い真似をするな！！　人の頭の中を勝手に覗き見て楽しいのか、おまえは・・・・・・ッ！': {
    ja: '趣味の悪い真似をするな！！　人の頭の中を勝手に覗き見て楽しいのか、おまえは・・・・・・ッ！',
    en: 'Cut out the twisted games!! Does snooping inside people\'s heads amuse you that much...?!!',
    ko: '악취미 같은 짓거리 마라!! 남의 머릿속을 멋대로 훔쳐보는 게 그렇게 즐겁냐, 네놈은……?!',
  },
  '本当に顔が赤くなるんだな\nしっかし、排熱させる機関をわざわざ顔に持ってくるなんて・・・・・・': {
    ja: '本当に顔が赤くなるんだな\nしっかし、排熱させる機関をわざわざ顔に持ってくるなんて・・・・・・',
    en: 'Your face really does turn red.\nThough routing the heat exhaust right into the face of all places...',
    ko: '정말 얼굴이 빨개지는구나.\n그나저나 열을 배출하는 기관을 하필 얼굴에 배치하다니……',
  },
  '・・・・・・人の顔をジロジロ見るな': {
    ja: '・・・・・・人の顔をジロジロ見るな',
    en: '...Stop gawking at my face.',
    ko: '……남의 얼굴 빤히 쳐다보지 마.',
  },
  '動力にしても熱交換器にしても、一体どういう設計になってるんだ・・・・・・？\n機体を開けて構造を見れればちょっとは・・・・・・': {
    ja: '動力にしても熱交換器にしても、一体どういう設計になってるんだ・・・・・・？\n機体を開けて構造を見れればちょっとは・・・・・・',
    en: 'Power plants, heat exchangers, how on earth is this designed...?\nIf I could open the chassis and see inside...',
    ko: '동력이든 열교환기든 도대체 어떤 구조로 설계된 걸까……?\n기체를 열어서 구조를 들여다볼 수 있다면 좀……',
  },
  'ディストの奴、最初におまえの語尾を『〜ズラ』に設定しようとして、設定端末ごと叩き割られたんだってな': {
    ja: 'ディストの奴、最初におまえの語尾を『〜ズラ』に設定しようとして、設定端末ごと叩き割られたんだってな',
    en: 'Dist said he tried giving you \'~zura\' as a verbal tic at first, and you smashed the terminal to pieces.',
    ko: '디스트 녀석, 처음에 네 어미를 "~즈라"로 설정하려다 설정 단말기째 박살 났다면서?',
  },
  '・・・・・・思い出すだけで腹が立つ。\n次に同じ真似をしたら、端末だけでは済まさんからな・・・・・・！': {
    ja: '・・・・・・思い出すだけで腹が立つ。\n次に同じ真似をしたら、端末だけでは済まさんからな・・・・・・！',
    en: '...Just remembering it pisses me off.\nIf he ever tries that again, it won\'t end with just the terminal...!',
    ko: '……떠올리기만 해도 화가 치미는군.\n다음에 또 그딴 짓을 벌였다간 단말기 박살 나는 걸로 안 끝날 줄 알아……!',
  },
  '研究所の高い棚に手が届かなくて、誰もいない時に踏み台を探し回ったっていうのは本当か？': {
    ja: '研究所の高い棚に手が届かなくて、誰もいない時に踏み台を探し回ったっていうのは本当か？',
    en: 'Is it true you couldn\'t reach the upper shelf and hunted for a step stool when nobody was around?',
    ko: '연구소 높은 선반에 손이 안 닿아서 아무도 없을 때 디딤대를 찾아 헤맸다는 게 진짜야?',
  },
  'なっ・・・・・・！？\n・・・・・・ち、違う、あれは上の棚の資料を確認していただけだ！': {
    ja: 'なっ・・・・・・！？\n・・・・・・ち、違う、あれは上の棚の資料を確認していただけだ！',
    en: 'Wha...?! \n...N-No! I was simply checking references on the upper shelf!',
    ko: '뭐, 뭐라고……?!\n……아, 아냐! 그건 위쪽 선반의 자료를 확인하고 있었을 뿐이다!',
  },
  'その機体、栄養にはならなくても食事はできる仕様なんだって？　今度、好物のチキンでも用意しようか？': {
    ja: 'その機体、栄養にはならなくても食事はできる仕様なんだって？　今度、好物のチキンでも用意しようか？',
    en: 'I heard that chassis can taste and swallow food even if it provides no fuel. Shall I fix your favorite chicken next time?',
    ko: '그 기체, 영양은 안 돼도 식사는 가능한 구조라면서? 다음에 좋아하는 치킨이라도 준비해 줄까?',
  },
  '・・・・・・余計な気を使うな。腹も減らない機体で食ったところで、虚しくなるだけだろうが': {
    ja: '・・・・・・余計な気を使うな。腹も減らない機体で食ったところで、虚しくなるだけだろうが',
    en: '...Save your concern. Eating when a mechanical body feels no hunger only leaves an empty taste.',
    ko: '……쓸데없는 신경 쓰지 마라. 배도 안 고픈 기체로 먹어봤자 허무해질 뿐이잖아.',
  },
  '研究所の通信機で、1年前にルークがタタル渓谷へ戻った時の記録を何度も開いていたみたいだな': {
    ja: '研究所の通信機で、1年前にルークがタタル渓谷へ戻った時の記録を何度も開いていたみたいだな',
    en: 'Looks like you opened the record of Luke returning to Tataroo Valley a year ago over and over on the comms.',
    ko: '연구소 통신기에서 1년 전 루크가 타타르 계곡으로 돌아왔을 때의 기록을 몇 번이고 열어봤더군.',
  },
  '・・・・・・あいつが本当に戻ったのか、確かめただけだ': {
    ja: '・・・・・・あいつが本当に戻ったのか、確かめただけだ',
    en: '...I only confirmed whether he had truly returned.',
    ko: '……그 녀석이 정말로 돌아왔는지 확인했을 뿐이다.',
  },
  '空き部屋で剣の素振りをしようとして、出力制限で転んで壁を蹴飛ばしたそうじゃないか': {
    ja: '空き部屋で剣の素振りをしようとして、出力制限で転んで壁を蹴飛ばしたそうじゃないか',
    en: 'Word has it you tried practicing sword swings in an empty room, fell from the limiter, and kicked the wall.',
    ko: '빈 방에서 검술 연습을 하려다 출력 제한 때문에 넘어져서 벽을 걷어찼다면서?',
  },
  '・・・・・・この身体がどれくらい動くか、試していただけだ': {
    ja: '・・・・・・この身体がどれくらい動くか、試していただけだ',
    en: '...I was merely testing how much this body could move.',
    ko: '……이 몸이 어느 정도 움직이는지 시험해 봤을 뿐이다.',
  },
  '端末に、ディストが登録しようとした機体名のボツ案リストが残ってるぞ。えーと、どれどれ・・・・・・': {
    ja: '端末に、ディストが登録しようとした機体名のボツ案リストが残ってるぞ。えーと、どれどれ・・・・・・',
    en: 'There\'s a whole rejected name list on the terminal that Dist wanted to give you. Let\'s see here...',
    ko: '단말기에 디스트가 붙이려 했던 기체명 기각 목록이 남아 있어. 어디 어디……',
  },
  'よ、読み上げるんじゃねぇ！\nどれもこれも正気を疑うような名前ばかり並べやがって・・・・・・！': {
    ja: 'よ、読み上げるんじゃねぇ！\nどれもこれも正気を疑うような名前ばかり並べやがって・・・・・・！',
    en: 'D-Don\'t read that out loud!\nEvery single one was insane, that crackpot...!',
    ko: '이, 읽지 마라!\n하나같이 제정신을 의심케 하는 이름만 잔뜩 늘어놓고는……!',
  },
  'なになに・・・・・・？\n部屋の隅に立ったあと、今の身体じゃ丸見えだって気づいて、慌てて隠れ場所を探しかけた・・・・・・': {
    ja: 'なになに・・・・・・？\n部屋の隅に立ったあと、今の身体じゃ丸見えだって気づいて、慌てて隠れ場所を探しかけた・・・・・・',
    en: 'What\'s this...?\nAfter freezing in the corner, you realized this body was in plain view and frantically scrambled for cover...',
    ko: '어디 보자……?\n방 구석에 선 뒤 지금 몸으론 훤히 다 보인다는 걸 깨닫고 허겁지겁 숨을 곳을 찾으려 했다……',
  },
  'う、うるさい！': {
    ja: 'う、うるさい！',
    en: 'S-Shut up!',
    ko: '시, 시끄러워!',
  },
  '今の身体に替わった時、一番上の襟ボタンを留めるのに3分も格闘していたらしいじゃないか': {
    ja: '今の身体に替わった時、一番上の襟ボタンを留めるのに3分も格闘していたらしいじゃないか',
    en: 'I heard when you switched to this body, you wrestled with the top collar button for three whole minutes.',
    ko: '지금 몸으로 바꿨을 때 제일 위쪽 깃 단추를 잠그느라 3분이나 씨름했다면서?',
  },
  '・・・・・・指先が小さくなって、勝手が違っただけだ': {
    ja: '・・・・・・指先が小さくなって、勝手が違っただけだ',
    en: '...My fingertips were smaller, that\'s all. It felt awkward.',
    ko: '……손끝이 작아져서 손에 안 익었을 뿐이다.',
  },
  '一人でチェスをしていた時、自分側の黒番が負けそうになってこっそり駒を1つ戻したそうじゃないか': {
    ja: '一人でチェスをしていた時、自分側の黒番が負けそうになってこっそり駒を1つ戻したそうじゃないか',
    en: 'When playing chess alone, wasn\'t there a time black was about to lose and you secretly took back a piece?',
    ko: '혼자 체스를 두다가 자기 흑 진영이 질 것 같으니까 슬그머니 말을 하나 되돌렸다면서?',
  },
  'ち、違う！　あれは一手前の盤面を検証し直していただけだ！': {
    ja: 'ち、違う！　あれは一手前の盤面を検証し直していただけだ！',
    en: 'T-That\'s not it! I was merely re-analyzing the preceding board state!',
    ko: '아, 아냐! 그건 바로 앞 수의 형세를 재검토하고 있었을 뿐이다!',
  },
  '今の身体に替わった直後、怒鳴ろうとして声が裏返ったのが悔しくて、2日間ずっと筆談で通したんだってな': {
    ja: '今の身体に替わった直後、怒鳴ろうとして声が裏返ったのが悔しくて、2日間ずっと筆談で通したんだってな',
    en: 'Right after getting this body, your voice cracked when you tried to yell, and you were so embarrassed you only wrote notes for two days.',
    ko: '지금 몸으로 바뀌고 얼마 안 돼서 소리치려다 삑사리가 난 게 분해서, 이틀 내내 필담으로만 버텼다면서?',
  },
  '声に慣れるまで喋りたくなかっただけだ！': {
    ja: '声に慣れるまで喋りたくなかっただけだ！',
    en: 'I simply didn\'t feel like speaking until I got used to the voice!',
    ko: '목소리에 익숙해질 때까지 말하고 싶지 않았을 뿐이다!',
  },
  '公爵様や奥様の話をした時の波形、怒りや反発は少しも出ていなかったぞ。本当は奥様たちのこと、今でも心配なんだろ': {
    ja: '公爵様や奥様の話をした時の波形、怒りや反発は少しも出ていなかったぞ。本当は奥様たちのこと、今でも心配なんだろ',
    en: 'When we spoke of the Duke and Duchess, your waveform showed zero anger or hostility. Truth is, you still care about them.',
    ko: '공작님이나 사모님 얘길 했을 때의 파형, 분노나 반발은 눈곱만큼도 안 나왔다고. 사실은 지금도 부모님이 걱정되는 거지?',
  },
  '・・・・・・人の感情波形までいちいち読み上げるな': {
    ja: '・・・・・・人の感情波形までいちいち読み上げるな',
    en: '...Stop reading off my emotional waveforms.',
    ko: '……남의 감정 파형까지 일일이 읽어대지 마라.',
  },
  'ずっと手を気にしてるな': {
    ja: 'ずっと手を気にしてるな',
    en: 'You\'ve been fussing over your hand this whole time.',
    ko: '아까부터 계속 손을 신경 쓰고 있네.',
  },
  '・・・・・・癖が、抜けないだけだ': {
    ja: '・・・・・・癖が、抜けないだけだ',
    en: '...Old habits die hard, that\'s all.',
    ko: '……버릇이 안 고쳐질 뿐이다.',
  },
  '3ヶ月前に大佐が研究所へ来た時、おまえを無言でじっと見ていったんだってな': {
    ja: '3ヶ月前に大佐が研究所へ来た時、おまえを無言でじっと見ていったんだってな',
    en: 'Three months ago when the Colonel visited the lab, he apparently stopped and stared at you in dead silence.',
    ko: '3개월 전에 대령이 연구소에 왔을 때, 널 말없이 가만히 바라보고 갔다면서?',
  },
  '・・・・・・知るか。だから余計に気味が悪いんだろうが・・・・・・': {
    ja: '・・・・・・知るか。だから余計に気味が悪いんだろうが・・・・・・',
    en: '...How should I know? That\'s what made it so damned creepy...',
    ko: '……내가 알겠냐. 그러니까 더 기분 나쁘다는 거 아냐……',
  },
  'みんなの元へ戻らない理由（もう一度聞く）': {
    ja: 'みんなの元へ戻らない理由（もう一度聞く）',
    en: 'Why you won\'t return to everyone (Ask again)',
    ko: '모두의 곁으로 돌아가지 않는 이유 (다시 묻는다)',
  },
  '・・・・・・なあ。どうしてみんなのところへ帰らないんだ？ ナタリアも、ルークも待ってるっていうのに': {
    ja: '・・・・・・なあ。どうしてみんなのところへ帰らないんだ？ ナタリアも、ルークも待ってるっていうのに',
    en: '...Hey. Why won\'t you return to everyone? Natalia and Luke are waiting for you.',
    ko: '……저기. 어째서 모두의 곁으로 돌아가지 않는 거야? 나탈리아도, 루크도 기다리고 있는데.',
  },
  '・・・・・・さっきは引いたけど、これだけは聞かせてくれ。どうして誰にも会わずに研究所に身を隠しているんだ？': {
    ja: '・・・・・・さっきは引いたけど、これだけは聞かせてくれ。どうして誰にも会わずに研究所に身を隠しているんだ？',
    en: '...I backed off earlier, but please answer me this. Why are you hiding in that lab without seeing anyone?',
    ko: '……아깐 물러섰지만, 이것만큼은 대답해 줘. 어째서 아무도 만나지 않고 연구소에 숨어 있는 거야?',
  },
  '・・・・・・帰る場所などない。俺は3年前のエルドラントで、確かに死んだはずなんだ': {
    ja: '・・・・・・帰る場所などない。俺は3年前のエルドラントで、確かに死んだはずなんだ',
    en: '...I have no place to go back to. Three years ago in Eldrant, I was supposed to be dead.',
    ko: '……돌아갈 곳 따윈 없어. 난 3년 전 엘드란트에서 분명 죽었어야 했다고.',
  },
  '・・・・・・またその話か。帰る場所などないと言ったはずだ': {
    ja: '・・・・・・またその話か。帰る場所などないと言ったはずだ',
    en: '...That again? I told you I have nowhere to return.',
    ko: '……또 그 소리냐. 돌아갈 곳 따윈 없다고 말했을 텐데.',
  },
  'なぜバチカルへ帰らないのか尋ねた際の発言': {
    ja: 'なぜバチカルへ帰らないのか尋ねた際の発言',
    en: 'Statement when asked why he won\'t return to Baticul',
    ko: '어째서 바티칼로 돌아가지 않는지 물었을 때의 발언',
  },
  '・・・・・・自分が何なのかわからない、ってことか？': {
    ja: '・・・・・・自分が何なのかわからない、ってことか？',
    en: '...You mean, you don\'t even know what you are anymore?',
    ko: '……자신이 무엇인지 알 수 없다는, 그런 의미야?',
  },
  '・・・・・・。\n記憶から演算されているだけの譜業なのか、俺自身なのか・・・・・・\nそんなこともわからねえままで、誰の前にでれるっていうんだ': {
    ja: '・・・・・・。\n記憶から演算されているだけの譜業なのか、俺自身なのか・・・・・・\nそんなこともわからねえままで、誰の前にでれるっていうんだ',
    en: '...\nAm I just a fonic craft calculating based on recorded memories, or am I truly myself...?\nWithout even knowing that, whose face could I ever look into?!',
    ko: '…….\n기억에서 연산되고 있을 뿐인 포업인지, 나 자신인지……\n그런 것조차 모른 채로, 누구 앞에 나설 수 있단 말이냐.',
  },
  'DIALOGUE UNLOCK // SECTOR: [EM-007 / SEC-12]（核心対話完了：いつでも話を切り上げて結末へ進めます）': {
    ja: 'DIALOGUE UNLOCK // SECTOR: [EM-007 / SEC-12]（核心対話完了：いつでも話を切り上げて結末へ進めます）',
    en: 'DIALOGUE UNLOCK // SECTOR: [EM-007 / SEC-12] (Core dialogue complete: You may conclude the conversation anytime and proceed to the conclusion)',
    ko: 'DIALOGUE UNLOCK // SECTOR: [EM-007 / SEC-12] (핵심 대화 완료: 언제든지 대화를 마무리하고 결말로 진행할 수 있습니다)',
  },
  'その小さな姿を見られて、みんなに子ども扱いされるのが嫌なのか？': {
    ja: 'その小さな姿を見られて、みんなに子ども扱いされるのが嫌なのか？',
    en: 'Are you afraid everyone will treat you like a kid if they see you in that small body?',
    ko: '그 작은 모습을 보이고 모두에게 어린애 취급받는 게 싫은 거야?',
  },
  'くだらない見栄だけで隠れてるわけがないだろうが！': {
    ja: 'くだらない見栄だけで隠れてるわけがないだろうが！',
    en: 'You think I\'m hiding just out of petty vanity?!',
    ko: '시시한 허세 따위로 숨어 있을 리가 없잖아!',
  },
  '・・・・・・そうか。おまえがそこまで言いたくないなら、無理には聞かないでおくよ': {
    ja: '・・・・・・そうか。おまえがそこまで言いたくないなら、無理には聞かないでおくよ',
    en: '...I see. If you\'re that against talking about it, I won\'t force you.',
    ko: '……그렇구나. 네가 그 정도로 말하기 싫다면 억지로 묻진 않을게.',
  },
  'なぜ、その機体なんだ？ あいつの気まぐれか？': {
    ja: 'なぜ、その機体なんだ？ あいつの気まぐれか？',
    en: 'Why this chassis? Was it just one of Dist\'s whims?',
    ko: '어째서 그 기체인 건데? 그 녀석 변덕인가?',
  },
  '・・・・・・俺が選んだわけじゃない。\nレプリカの生成が滞った時の『場繋ぎ』として残されていた機体だ。\n研究所にこれしかなかっただけだ': {
    ja: '・・・・・・俺が選んだわけじゃない。\nレプリカの生成が滞った時の『場繋ぎ』として残されていた機体だ。\n研究所にこれしかなかっただけだ',
    en: '...I didn\'t pick it.\nIt was a placeholder chassis left over in case replica generation stalled.\nIt was simply the only thing left in the laboratory.',
    ko: '……내가 고른 게 아냐.\n레플리카 생성이 지체될 때 임시 \"땜빵\"으로 남겨져 있던 기체다.\n연구소에 이것밖에 없었을 뿐이야.',
  },
  '場繋ぎの予備、か・・・・・・おまえにとっては皮肉なもんだな': {
    ja: '場繋ぎの予備、か・・・・・・おまえにとっては皮肉なもんだな',
    en: 'A placeholder spare, huh... That\'s rather ironic, considering who you are.',
    ko: '땜빵용 예비, 인가…… 너한테 있어선 꽤나 짓궂은 아이러니네.',
  },
  '・・・・・・まったくだ。本物の俺が、自分の『予備』の中に入っているんだからな': {
    ja: '・・・・・・まったくだ。本物の俺が、自分の『予備』の中に入っているんだからな',
    en: '...Tell me about it. The original me, stuffed inside a \'spare\' meant for myself.',
    ko: '……그러게나 말이다. 진짜인 내가, 자기 자신의 \"예비\" 속에 들어가 있으니까.',
  },
  '11年前の予備機体・・・・・・ね': {
    ja: '11年前の予備機体・・・・・・ね',
    en: 'A spare chassis from 11 years ago... I see.',
    ko: '11년 전 예비 기체…… 라.',
  },
  '・・・・・・まともに握れやしねえが、手足があるだけあの鉄くずよりはマシだ': {
    ja: '・・・・・・まともに握れやしねえが、手足があるだけあの鉄くずよりはマシだ',
    en: '...I can barely grip anything, but having limbs is better than being a scrap of iron.',
    ko: '……제대로 쥐지도 못하지만, 팔다리가 달린 것만으로도 그 고철 덩어리보단 나아.',
  },
  'その身体になってから、夜に眠ったり夢を見たりすることはあるのか？': {
    ja: 'その身体になってから、夜に眠ったり夢を見たりすることはあるのか？',
    en: 'Since ending up in that body, do you ever sleep at night or dream?',
    ko: '그 몸이 되고 나서 밤에 잠을 자거나 꿈을 꾸는 일은 있어?',
  },
  '・・・・・・ない。音機関の出力を落として休止状態に入るだけだ。\n目を閉じて、次に開けた時にはただ時間が飛んでいる。夢なんてものは一度も見ない': {
    ja: '・・・・・・ない。音機関の出力を落として休止状態に入るだけだ。\n目を閉じて、次に開けた時にはただ時間が飛んでいる。夢なんてものは一度も見ない',
    en: '...No. I just lower the fonic engine\'s output and enter sleep mode.\nI close my eyes, and the next time they open, hours have simply vanished. I never dream.',
    ko: '……없어. 음기관 출력을 낮추고 휴지 상태에 들어갈 뿐이다.\n눈을 감고, 다음에 떴을 땐 그저 시간이 건너뛰어 있을 뿐이야. 꿈 따윈 단 한 번도 안 꿔.',
  },
  '本機に睡眠機能および夢の再生機能は未実装。\n待機時は第七音素の循環出力を30%まで低下させた休止モードへ移行する': {
    ja: '本機に睡眠機能および夢の再生機能は未実装。\n待機時は第七音素の循環出力を30%まで低下させた休止モードへ移行する',
    en: 'Sleep subroutines and dream replay functions are uninstalled on this chassis.\nStandby state engages sleep mode with Seventh Fonon circulation dropped to 30%.',
    ko: '본 기체에 수면 기능 및 꿈 재생 기능은 미탑재.\n대기 시에는 제7음소 순환 출력을 30%까지 낮춘 휴지 모드로 이행함.',
  },
  'そうか・・・・・・。目が覚めた時、変な感じがしないか？': {
    ja: 'そうか・・・・・・。目が覚めた時、変な感じがしないか？',
    en: 'I see... Doesn\'t it feel strange when you wake up?',
    ko: '그렇구나……. 눈을 떴을 때 위화감 같은 건 안 들어?',
  },
  '意識が戻るたびに、体の奥から音機関が回る音がしやがる。\nいつまで経っても、慣れないもんだな': {
    ja: '意識が戻るたびに、体の奥から音機関が回る音がしやがる。\nいつまで経っても、慣れないもんだな',
    en: 'Every time consciousness boots up, I hear that fonic engine whirling deep inside my chest.\nNo matter how much time passes, I can\'t get used to it.',
    ko: '의식이 돌아올 때마다 몸 깊숙한 곳에서 음기관이 돌아가는 소리가 들려온다.\n아무리 시간이 지나도 도무지 익숙해지질 않아.',
  },
  'おまえ、これからどうするつもりなんだ？　やっぱりディストの研究所へ戻る気か？': {
    ja: 'おまえ、これからどうするつもりなんだ？　やっぱりディストの研究所へ戻る気か？',
    en: 'What do you plan to do from here? Are you really heading back to Dist\'s lab?',
    ko: '너 이제부터 어쩔 셈이야? 역시 디스트의 연구소로 돌아갈 생각이야?',
  },
  'あんな場所、好き好んで居るわけじゃない': {
    ja: 'あんな場所、好き好んで居るわけじゃない',
    en: 'I\'m not staying in a place like that because I enjoy it.',
    ko: '그런 곳, 좋아서 머물고 있는 게 아냐.',
  },
  'じゃあ、どこか他に身を寄せる当てでもあるのか？': {
    ja: 'じゃあ、どこか他に身を寄せる当てでもあるのか？',
    en: 'Then do you have anywhere else to go?',
    ko: '그럼 달리 어디 몸을 의탁할 곳이라도 있어?',
  },
  '・・・・・・ない。\nこんな身体で、どこへ行けと言うんだ': {
    ja: '・・・・・・ない。\nこんな身体で、どこへ行けと言うんだ',
    en: '...No.\nIn a body like this, where on earth could I even go?',
    ko: '……없다.\n이런 몸으로 어디로 가란 말이냐.',
  },
  '・・・・・・その10歳の姿を目の前にしていると、どうしてもファブレの屋敷にいた頃を思い出すよ': {
    ja: '・・・・・・その10歳の姿を目の前にしていると、どうしてもファブレの屋敷にいた頃を思い出すよ',
    en: '...Standing before you looking 10 years old, I can\'t help remembering our days at the Fabre manor.',
    ko: '……그 10살 시절 모습을 눈앞에 두고 있으니 아무래도 파브레 저택에 있던 시절이 떠올라.',
  },
  '・・・・・・ふん。俺がヴァンに攫われる前のことか': {
    ja: '・・・・・・ふん。俺がヴァンに攫われる前のことか',
    en: '...Hmph. Back before Van kidnapped me, you mean?',
    ko: '……흥. 내가 반에게 납치당하기 전의 일인가.',
  },
  'ああ。あの頃の俺は、おまえたちファブレ一族を恨んで、\n隙あらば復讐しようとずっと機会を窺っていた。\n・・・・・・まさか何年も経って、あの時と同じ姿のおまえと向き合うことになるとはね': {
    ja: 'ああ。あの頃の俺は、おまえたちファブレ一族を恨んで、\n隙あらば復讐しようとずっと機会を窺っていた。\n・・・・・・まさか何年も経って、あの時と同じ姿のおまえと向き合うことになるとはね',
    en: 'Yeah. Back then I resented your entire Fabre clan,\nalways watching for a chance to strike my revenge.\n...Never imagined that years later, I\'d be facing you looking the exact same as you did back then.',
    ko: '응. 그 시절의 난 너희 파브레 일족을 원망하며,\n틈만 나면 복수하려고 줄곧 기회를 엿보고 있었어.\n……설마 몇 년이 지나 그때와 똑같은 모습의 너와 마주하게 될 줄이야.',
  },
  'おまえは・・・・・・\n・・・・・・いや、いい': {
    ja: 'おまえは・・・・・・\n・・・・・・いや、いい',
    en: 'Are you...\n...No, forget it.',
    ko: '네놈은……\n……아니다, 됐어.',
  },
  '情動反応': {
    ja: '情動反応',
    en: 'Emotional Response',
    ko: '정동 반응',
  },
  '屋敷時代の因縁に関する対話中、「おまえは・・・・・・」の後続として言語野で『今でも俺が憎いんだろう』という音声バッファが形成されたが、声帯ユニットへの出力直前に破棄され、「・・・・・・いや、いい」へ差し替えられた履歴': {
    ja: '屋敷時代の因縁に関する対話中、「おまえは・・・・・・」の後続として言語野で『今でも俺が憎いんだろう』という音声バッファが形成されたが、声帯ユニットへの出力直前に破棄され、「・・・・・・いや、いい」へ差し替えられた履歴',
    en: 'During conversation regarding past manor grudges, language synthesis formed the query \'Do you still hate me?\' after \'Are you...\', but canceled it immediately before vocal output, substituting \'...No, forget it.\'',
    ko: '저택 시절의 인연에 관한 대화 중, \"네놈은……\"의 뒤를 이어 언어 영역에서 \"지금도 내가 밉겠지\"라는 음성 버퍼가 형성되었으나 성대 출력 직전에 폐기되어 \"……아니다, 됐어\"로 대체된 이력.',
  },
  '研究所での過ごし方（もう一度聞く）': {
    ja: '研究所での過ごし方（もう一度聞く）',
    en: 'How you spend time in the lab (Ask again)',
    ko: '연구소에서의 일과에 대해 (다시 묻는다)',
  },
  '研究所にこもっている間、外出もしないで毎日何をして時間を潰しているんだ？': {
    ja: '研究所にこもっている間、外出もしないで毎日何をして時間を潰しているんだ？',
    en: 'Cooped up in that lab without ever leaving, what do you even do to pass the time all day?',
    ko: '연구소에 틀어박혀 있는 동안 외출도 안 하고 매일 뭘 하며 시간을 보내는 거야?',
  },
  'さっきは『何もしていない』って言っていたけど・・・・・・本当は研究所で何か暇つぶしをしているんじゃないのか？': {
    ja: 'さっきは『何もしていない』って言っていたけど・・・・・・本当は研究所で何か暇つぶしをしているんじゃないのか？',
    en: 'You claimed you \'do nothing\' earlier, but aren\'t you actually doing something to kill time?',
    ko: '아깐 \"아무것도 안 한다\"고 했지만…… 실은 연구소에서 뭔가 시간을 때우고 있는 거 아냐?',
  },
  '・・・・・・別に、何もしていない': {
    ja: '・・・・・・別に、何もしていない',
    en: '...Nothing in particular.',
    ko: '……딱히 아무것도 안 해.',
  },
  '・・・・・・研究所で何をしていようが俺の勝手だろうが': {
    ja: '・・・・・・研究所で何をしていようが俺の勝手だろうが',
    en: '...Whatever I do in the lab is my own business!',
    ko: '……연구소에서 뭘 하든 내 마음이잖아!',
  },
  'チェスでも差して時間を潰したりはしないのか？': {
    ja: 'チェスでも差して時間を潰したりはしないのか？',
    en: 'Don\'t you pass the time playing chess or something?',
    ko: '체스라도 두면서 시간 때우진 않아?',
  },
  '・・・・・・たまに盤面を並べるくらいだ。相手になる奴がいないからな': {
    ja: '・・・・・・たまに盤面を並べるくらいだ。相手になる奴がいないからな',
    en: '...At most, I set up the board occasionally. There\'s nobody there to play against.',
    ko: '……가끔 판을 벌려두는 정도다. 상대해 줄 녀석이 없으니까.',
  },
  '暗い部屋でずっと壁でも眺めてる、とか？': {
    ja: '暗い部屋でずっと壁でも眺めてる、とか？',
    en: 'Like staring at the wall in a dark room all day?',
    ko: '어두운 방에서 줄곧 벽이라도 쳐다보고 있다거나?',
  },
  '俺を何だと思っているんだ・・・・・・！': {
    ja: '俺を何だと思っているんだ・・・・・・！',
    en: 'What kind of freak do you take me for...?!',
    ko: '날 도대체 뭐라고 생각하는 거냐……!',
  },
  '・・・・・・そうか。深く聞くつもりはなかったんだ': {
    ja: '・・・・・・そうか。深く聞くつもりはなかったんだ',
    en: '...Right. I didn\'t mean to pry so deeply.',
    ko: '……그렇구나. 깊게 캐물을 생각은 아니었어.',
  },
  '今の声のこと（もう一度聞く）': {
    ja: '今の声のこと（もう一度聞く）',
    en: 'About your voice now (Ask again)',
    ko: '지금의 목소리에 대해 (다시 묻는다)',
  },
  '・・・・・・しかし、声まで子供のままだと、怒鳴られてもなんだか調子が狂うよ': {
    ja: '・・・・・・しかし、声まで子供のままだと、怒鳴られてもなんだか調子が狂うよ',
    en: '...Still, with your voice remaining that of a kid, getting yelled at just throws me off.',
    ko: '……하지만 목소리까지 어린애 그대로니까, 호통을 들어도 어쩐지 맥이 빠져.',
  },
  'さっきは悪かったけど・・・・・・やっぱり前とは勝手が違って喋りづらかったりするのか？': {
    ja: 'さっきは悪かったけど・・・・・・やっぱり前とは勝手が違って喋りづらかったりするのか？',
    en: 'Sorry about earlier... Is it really that difficult to talk with this body compared to before?',
    ko: '아깐 미안했어…… 역시 예전과 달라서 말하기 불편하거나 그래?',
  },
  '俺だって好きでこんな声を出しているわけじゃない': {
    ja: '俺だって好きでこんな声を出しているわけじゃない',
    en: 'It\'s not like I talk like this because I want to!',
    ko: '나라고 좋아서 이런 목소리를 내는 게 아냐!',
  },
  '・・・・・・まだ声の話をする気か': {
    ja: '・・・・・・まだ声の話をする気か',
    en: '...Are you still talking about my voice?',
    ko: '……아직도 목소리 얘길 할 셈이냐.',
  },
  'ああ・・・・・・。ヴァンが贔屓にしていた理由も、少しだけわかる気がする': {
    ja: 'ああ・・・・・・。ヴァンが贔屓にしていた理由も、少しだけわかる気がする',
    en: 'Ah... I think I can understand a little why Van favored you so much.',
    ko: '아아…… 반이 편애했던 이유도 아주 조금은 알 것 같아.',
  },
  'その高い声で必死に凄まれてもなあ': {
    ja: 'その高い声で必死に凄まれてもなあ',
    en: 'Hard to take your threats seriously in that high-pitched voice, you know.',
    ko: '그 높은 목소리로 필사적으로 으름장을 놔봤자 말이지.',
  },
  'ぐっ・・・・・・！': {
    ja: 'ぐっ・・・・・・！',
    en: 'Urgh...!',
    ko: '큭……!',
  },
  '・・・・・・悪かったよ。からかうつもりはなかったんだ': {
    ja: '・・・・・・悪かったよ。からかうつもりはなかったんだ',
    en: '...Sorry. I didn\'t mean to tease you.',
    ko: '……미안해. 놀리려던 건 아니었어.',
  },
  '・・・・・・分かればいい。二度とその話題を出すな': {
    ja: '・・・・・・分かればいい。二度とその話題を出すな',
    en: '...Glad you understand. Never bring that up again.',
    ko: '……알았으면 됐다. 다신 그 화제 꺼내지 마라.',
  },
  '屋敷の公爵様たちのこと（もう一度聞く）': {
    ja: '屋敷の公爵様たちのこと（もう一度聞く）',
    en: 'About the Duke and Duchess at the manor (Ask again)',
    ko: '저택의 공작님 내외에 대해 (다시 묻는다)',
  },
  '・・・・・・なあ。バチカルの公爵様や奥様のことは、今どう思っているんだ？': {
    ja: '・・・・・・なあ。バチカルの公爵様や奥様のことは、今どう思っているんだ？',
    en: '...Hey. How do you feel about the Duke and Duchess of Baticul right now?',
    ko: '……저기. 바티칼의 공작님이나 사모님에 대해선 지금 어떻게 생각해?',
  },
  '・・・・・・さっきは話を逸らしたけど、やっぱり屋敷の公爵様や奥様のことは気にかかっているんじゃないのか？': {
    ja: '・・・・・・さっきは話を逸らしたけど、やっぱり屋敷の公爵様や奥様のことは気にかかっているんじゃないのか？',
    en: '...You deflected earlier, but aren\'t you still concerned about your parents at the manor?',
    ko: '……아깐 말을 돌렸지만, 역시 저택의 공작님이나 사모님이 마음에 걸리는 거 아냐?',
  },
  '・・・・・・今さら父上や母上の話などしてどうなる。あの屋敷にはもう、ちゃんと息子が戻っているんだろうが': {
    ja: '・・・・・・今さら父上や母上の話などしてどうなる。あの屋敷にはもう、ちゃんと息子が戻っているんだろうが',
    en: '...What good does speaking of Father and Mother do now? Their proper son has already returned to that manor, hasn\'t he?!',
    ko: '……이제 와서 아버지나 어머니 얘길 해서 어쩌잔 거냐. 그 저택엔 이미 어엿한 아들이 돌아가 있잖아!',
  },
  '・・・・・・父上や母上の話はするなと言ったはずだ': {
    ja: '・・・・・・父上や母上の話はするなと言ったはずだ',
    en: '...I thought I told you not to speak of Father and Mother.',
    ko: '……아버지나 어머니 이야기는 꺼내지 말라고 했을 텐데.',
  },
  '・・・・・・おまえが顔を出したら、また奥様を泣かせてしまうと思っているのか？': {
    ja: '・・・・・・おまえが顔を出したら、また奥様を泣かせてしまうと思っているのか？',
    en: '...Are you worried showing your face would only make the Duchess cry again?',
    ko: '……네가 얼굴을 비추면 사모님을 또 울려버릴 거라고 생각하는 거야?',
  },
  '・・・・・・一度死んだ人間が、こんな譜業の姿で母上の前に出てみろ。混乱させるだけだ': {
    ja: '・・・・・・一度死んだ人間が、こんな譜業の姿で母上の前に出てみろ。混乱させるだけだ',
    en: '...Imagine someone who died once showing up before Mother as a fonic craft like this. It would only cause heartache and confusion.',
    ko: '……한 번 죽은 인간이 이런 포업 꼴로 어머니 앞에 나타나 봐라. 혼란만 줄 뿐이야.',
  },
  '自分の居場所をルークに奪われたと思って、まだ恨んでいるのか？': {
    ja: '自分の居場所をルークに奪われたと思って、まだ恨んでいるのか？',
    en: 'Do you still resent Luke, thinking he stole your place?',
    ko: '자신의 자리를 루크에게 빼앗겼다고 생각해 아직도 원망하고 있는 거야?',
  },
  '・・・・・・見くびるな！　今さらそんなことを思うわけがないだろう！': {
    ja: '・・・・・・見くびるな！　今さらそんなことを思うわけがないだろう！',
    en: '...Don\'t underestimate me! As if I\'d hold petty thoughts like that now!',
    ko: '……날 얕보지 마라! 이제 와서 그딴 생각을 품을 리가 없잖아!',
  },
  '・・・・・・ああ。余計な気遣いは無用だ': {
    ja: '・・・・・・ああ。余計な気遣いは無用だ',
    en: '...Right. Unwanted sympathy is unnecessary.',
    ko: '……그래. 쓸데없는 배려는 필요 없다.',
  },
  '自分の掌のこと（もう一度聞く）': {
    ja: '自分の掌のこと（もう一度聞く）',
    en: 'About your palm (Ask again)',
    ko: '자신의 손바닥에 대해 (다시 묻는다)',
  },
  '・・・・・・その身体には、傷跡ひとつないんだな': {
    ja: '・・・・・・その身体には、傷跡ひとつないんだな',
    en: '...There\'s not a single scar on that body, is there?',
    ko: '……그 몸엔 흉터 하나 없구나.',
  },
  'さっきの掌の話だけど・・・・・・やっぱり、戦ってきた傷跡がなくなっているのは気になるのか？': {
    ja: 'さっきの掌の話だけど・・・・・・やっぱり、戦ってきた傷跡がなくなっているのは気になるのか？',
    en: 'About your palm earlier... Does it really trouble you that the battle scars you earned are gone?',
    ko: '아까 손바닥 얘기 말인데…… 역시 싸워온 흉터가 사라진 게 마음에 걸려?',
  },
  '・・・・・・当たり前だ。11年前に造られた予備機体だからな': {
    ja: '・・・・・・当たり前だ。11年前に造られた予備機体だからな',
    en: '...Naturally. It\'s a spare chassis manufactured 11 years ago.',
    ko: '……당연하지. 11년 전에 만들어진 예비 기체니까.',
  },
  '・・・・・・まだ俺の手を見ているのか。趣味が悪い奴だな': {
    ja: '・・・・・・まだ俺の手を見ているのか。趣味が悪い奴だな',
    en: '...Still staring at my hands? You have poor taste.',
    ko: '……아직도 내 손을 보고 있는 거냐. 취미 고약한 녀석이군.',
  },
  '・・・・・・ふと自分の手を見た時、前の身体と違いすぎて落ち着かないんじゃないか？': {
    ja: '・・・・・・ふと自分の手を見た時、前の身体と違いすぎて落ち着かないんじゃないか？',
    en: '...Whenever you glance down at your hands, does the total difference from your old body make you uneasy?',
    ko: '……문득 자기 손을 볼 때, 이전 몸과 너무 달라서 마음이 안 놓이는 거 아냐?',
  },
  '・・・・・・ああ。まるで作り物の人形の手だ': {
    ja: '・・・・・・ああ。まるで作り物の人形の手だ',
    en: '...Yeah. It\'s like the hands of an artificial doll.',
    ko: '……그래. 마치 인형 손 같아.',
  },
  '譜業の身体なら、もう怪我もしないし便利だよな': {
    ja: '譜業の身体なら、もう怪我もしないし便利だよな',
    en: 'A fonic craft body never gets injured, pretty convenient, isn\'t it?',
    ko: '포업 몸이라면 다칠 일도 없고 편리하겠네.',
  },
  '・・・・・・斬られても血も出ない身体の、どこがいいと言うんだ': {
    ja: '・・・・・・斬られても血も出ない身体の、どこがいいと言うんだ',
    en: '...What\'s so great about a body that doesn\'t even bleed when slashed?!',
    ko: '……베여도 피 한 방울 안 나오는 몸이 어디가 좋단 말이냐.',
  },
  '本機は痛覚受容回路が遮断されており外傷による機能低下は生じないが、本機自身は「出血しないこと」に強い疎外感を抱いており、自己同一性を損なう主要因となっていることが判明。': {
    ja: '本機は痛覚受容回路が遮断されており外傷による機能低下は生じないが、本機自身は「出血しないこと」に強い疎外感を抱いており、自己同一性を損なう主要因となっていることが判明。',
    en: 'Though nociceptive sensory circuits are offline preventing debuffs from physical trauma, this unit feels deep alienation from \'not bleeding\', identified as a primary trigger eroding identity.',
    ko: '본 기체는 통각 수용 회로가 차단되어 외상으로 인한 기능 저하는 발생하지 않으나, 본 기체 자신은 \"출혈하지 않는 점\"에 강한 소외감을 느끼며 자기 동일성을 해치는 주원인이 됨이 판명됨.',
  },
  '悪い、そりゃそうだよな': {
    ja: '悪い、そりゃそうだよな',
    en: 'Sorry, you\'re right.',
    ko: '미안, 당연히 그렇겠지.',
  },
  '大佐のこと（もう一度聞く）': {
    ja: '大佐のこと（もう一度聞く）',
    en: 'About the Colonel (Ask again)',
    ko: '대령에 대해 (다시 묻는다)',
  },
  '研究所には大佐もよく出入りしていただろ。よく今まで気づかれずにいられたな': {
    ja: '研究所には大佐もよく出入りしていただろ。よく今まで気づかれずにいられたな',
    en: 'The Colonel visited that lab often, didn\'t he? Amazing you stayed undiscovered this long.',
    ko: '연구소엔 대령도 자주 드나들었잖아. 용케 지금까지 안 들키고 배겨 있었네.',
  },
  'さっきの大佐の話だけど・・・・・・やっぱりおまえ、大佐に正体を勘づかれるのを一番警戒していたんじゃないのか？': {
    ja: 'さっきの大佐の話だけど・・・・・・やっぱりおまえ、大佐に正体を勘づかれるのを一番警戒していたんじゃないのか？',
    en: 'About the Colonel earlier... Weren\'t you on highest alert that he of all people might see through you?',
    ko: '아까 대령 이야기 말인데…… 역시 너, 대령한테 정체를 들키는 걸 제일 경계하고 있던 거 아냐?',
  },
  '・・・・・・あの眼鏡の話をするな。あいつが来た時は、ただの譜業のフリをしてやり過ごしていた': {
    ja: '・・・・・・あの眼鏡の話をするな。あいつが来た時は、ただの譜業のフリをしてやり過ごしていた',
    en: '...Don\'t speak of four-eyes. When he showed up, I just played dead like an ordinary craft to ride it out.',
    ko: '……그 안경 얘기 꺼내지 마라. 녀석이 올 때마다 단순한 포업인 척 넘겨왔으니까.',
  },
  '・・・・・・あの死霊使いには気づかれていないと言っているだろうが': {
    ja: '・・・・・・あの死霊使いには気づかれていないと言っているだろうが',
    en: '...I told you, that Necromancer didn\'t notice me!',
    ko: '……그 강령술사 녀석은 눈치채지 못했다고 말했을 텐데.',
  },
  '・・・・・・研究所で俺たちに声をかけなかったのも、\n大佐に勘付かれたくなかったからか？': {
    ja: '・・・・・・研究所で俺たちに声をかけなかったのも、\n大佐に勘付かれたくなかったからか？',
    en: '...Was avoiding speaking to us at the lab\nalso because you didn\'t want the Colonel noticing?',
    ko: '……연구소에서 우리한테 말을 걸지 않은 것도\n대령한테 들키기 싫어서였어?',
  },
  '・・・・・・あの死霊使いに知られてみろ、どんな実験材料にされるか分かったものじゃない': {
    ja: '・・・・・・あの死霊使いに知られてみろ、どんな実験材料にされるか分かったものじゃない',
    en: '...If that Necromancer found out, who knows what kind of experiment he\'d dissect me into.',
    ko: '……그 강령술사 녀석이 알게 돼 봐라, 어떤 실험 재료로 쓰일지 모를 노릇이니까.',
  },
  'いっそ大佐を呼んで、その身体を診てもらおうか？': {
    ja: 'いっそ大佐を呼んで、その身体を診てもらおうか？',
    en: 'How about we call the Colonel and have him inspect that chassis?',
    ko: '차라리 대령을 불러서 그 몸을 진찰해 달라고 할까?',
  },
  'やめろ！　あいつを呼ぶなら、俺は今すぐここから出て行く！': {
    ja: 'やめろ！　あいつを呼ぶなら、俺は今すぐここから出て行く！',
    en: 'Don\'t you dare! If you call him, I\'m walking out of here this instant!',
    ko: '그만둬! 그 자식을 부를 거라면 난 지금 당장 여기서 나갈 거다!',
  },
  '・・・・・・大佐の話はやめておこうか。名前を聞くだけでも具合が悪くなる': {
    ja: '・・・・・・大佐の話はやめておこうか。名前を聞くだけでも具合が悪くなる',
    en: '...Let\'s drop the Colonel topic. Just hearing his name makes my stomach turn.',
    ko: '……대령 이야기는 관두자. 이름만 들어도 속이 안 좋아져.',
  },
  '・・・・・・ああ、そうしてくれ。思い出すだけでも鳥肌が立つ': {
    ja: '・・・・・・ああ、そうしてくれ。思い出すだけでも鳥肌が立つ',
    en: '...Yeah, please do. Just remembering him gives me goosebumps.',
    ko: '……그래, 그렇게 해라. 떠올리기만 해도 소름이 끼치니까.',
  },
  'エルドラントの後のこと（もう一度聞く）': {
    ja: 'エルドラントの後のこと（もう一度聞く）',
    en: 'About after Eldrant (Ask again)',
    ko: '엘드란트 이후의 일에 대해 (다시 묻는다)',
  },
  '・・・・・・3年前のエルドラントで、おまえは確かに死んだはずだったよな。あのあと何が起きたか覚えているか？': {
    ja: '・・・・・・3年前のエルドラントで、おまえは確かに死んだはずだったよな。あのあと何が起きたか覚えているか？',
    en: '...Three years ago in Eldrant, you were supposed to have died. Do you remember what happened after?',
    ko: '……3년 전 엘드란트에서 넌 분명 죽었을 텐데. 그 후에 무슨 일이 있었는지 기억나?',
  },
  '・・・・・・さっき言っていた、エルドラントから1年前までの『空白の2年間』のことだけど、どうしても引っかかるんだ': {
    ja: '・・・・・・さっき言っていた、エルドラントから1年前までの『空白の2年間』のことだけど、どうしても引っかかるんだ',
    en: '...About that \'blank 2 years\' from Eldrant until one year ago, I just can\'t shake it off.',
    ko: '……아까 말했던, 엘드란트부터 1년 전까지의 \"공백의 2년간\"에 대해 아무래도 마음에 걸려.',
  },
  '・・・・・・崩れるエルドラントで、ルークが俺を抱えていたところまでは覚えている。\n・・・・・・だが、1年前に目覚める前までのことは何も・・・・・・': {
    ja: '・・・・・・崩れるエルドラントで、ルークが俺を抱えていたところまでは覚えている。\n・・・・・・だが、1年前に目覚める前までのことは何も・・・・・・',
    en: '...I remember up to Luke holding me as Eldrant collapsed.\n...But before waking up one year ago, nothing...',
    ko: '……무너지는 엘드란트에서 루크가 날 안고 있던 곳까진 기억하고 있어.\n……하지만 1년 전에 눈을 뜨기 전까지의 일은 아무것도……',
  },
  '・・・・・・蒸し返すなと言っただろう。1年前に目覚める前までのことは、何も出てこないんだ': {
    ja: '・・・・・・蒸し返すなと言っただろう。1年前に目覚める前までのことは、何も出てこないんだ',
    en: '...I told you not to drag it up. Before waking up a year ago, nothing comes up in memory.',
    ko: '……다시 들추지 말라고 했을 텐데. 1년 전에 눈을 뜨기 전까지의 일은 아무것도 안 떠올라.',
  },
  'エルドラントから1年前まで・・・・・・その2年間だけ抜けているのは、\nディストにロックをかけられているんじゃないか？': {
    ja: 'エルドラントから1年前まで・・・・・・その2年間だけ抜けているのは、\nディストにロックをかけられているんじゃないか？',
    en: 'From Eldrant until one year ago... With those two years missing,\nHas Dist locked those memories away from you?',
    ko: '엘드란트부터 1년 전까지…… 그 2년만 빠져 있는 건,\n디스트가 잠금을 걸어둔 거 아냐?',
  },
  '・・・・・・っ、くそ、頭が・・・・・・っ。\nあいつが俺の記憶をどう弄ったかなど知るか・・・・・・っ': {
    ja: '・・・・・・っ、くそ、頭が・・・・・・っ。\nあいつが俺の記憶をどう弄ったかなど知るか・・・・・・っ',
    en: '...Damn it, my head...!\nHow should I know how he tampered with my memories...?!',
    ko: '……큭, 제기랄, 머리가……!\n그 자식이 내 기억을 어떻게 주물렀는지 내가 어떻게 알아……!',
  },
  '空白の2年間の記録について（もう一度聞く）': {
    ja: '空白の2年間の記録について（もう一度聞く）',
    en: 'About records of the blank 2 years (Ask again)',
    ko: '공백의 2년간의 기록에 대해 (다시 묻는다)',
  },
  '・・・・・・さっき端末で、ディストの実験記録を見た。\n気になるところがあったんだ。おまえの生体データに関する記述で・・・・・・': {
    ja: '・・・・・・さっき端末で、ディストの実験記録を見た。\n気になるところがあったんだ。おまえの生体データに関する記述で・・・・・・',
    en: '...I saw Dist\'s experiment logs on the terminal earlier.\nThere was something troubling in the notes on your biometric archives...',
    ko: '……아까 단말기에서 디스트의 실험 기록을 봤어.\n신경 쓰이는 부분이 있었거든. 네 생체 데이터에 관한 기록에서……',
  },
  '・・・・・・なあ、アッシュ。さっきの記録のことなんだが・・・・・・\n本当に何も心当たりはないのか？　あいつが何かおかしな処置をしたんじゃないのか？': {
    ja: '・・・・・・なあ、アッシュ。さっきの記録のことなんだが・・・・・・\n本当に何も心当たりはないのか？　あいつが何かおかしな処置をしたんじゃないのか？',
    en: '...Hey, Asch. About those logs from earlier...\nDo you truly remember nothing? Did he perform some twisted procedure on you?',
    ko: '……저기, 애쉬. 아까 그 기록 말인데……\n정말로 짚이는 게 아무것도 없어? 녀석이 뭔가 이상한 처치를 한 거 아냐?',
  },
  '・・・・・・っ！？　な、何の話をしている・・・・・・！\nディストの戯言など真に受けてどうする！　それ以上、変なことを聞くな・・・・・・！': {
    ja: '・・・・・・っ！？　な、何の話をしている・・・・・・！\nディストの戯言など真に受けてどうする！　それ以上、変なことを聞くな・・・・・・！',
    en: '...?! W-What are you talking about...!\nWhy are you taking Dist\'s nonsense seriously?! Stop interrogating me...!',
    ko: '……윽?! 무, 무슨 소릴 지껄이는 거야……!\n디스트 헛소릴 진지하게 받아서 어쩌잔 거냐! 그 이상 이상한 소리 묻지 마……!',
  },
  '・・・・・・おい、いい加減にしろ！　知らんと言っているだろうが・・・・・・っ！': {
    ja: '・・・・・・おい、いい加減にしろ！　知らんと言っているだろうが・・・・・・っ！',
    en: '...Hey, knock it off! I told you I don\'t know anything...!',
    ko: '……어이, 적당히 좀 해라! 모른다고 말했을 텐데……!',
  },
  '・・・・・・なあ、おまえ、本当に何も覚えていないのか？\nエルドラントのあと・・・・・・ディストのところへ行くまでのこと': {
    ja: '・・・・・・なあ、おまえ、本当に何も覚えていないのか？\nエルドラントのあと・・・・・・ディストのところへ行くまでのこと',
    en: '...Hey, do you really remember nothing?\nAfter Eldrant... up until you reached Dist\'s lab?',
    ko: '……너, 정말로 아무것도 기억나지 않는 거야?\n엘드란트 이후…… 디스트의 연구소에 가기 전까지의 일 말야.',
  },
  '・・・・・・知るかそんなもの・・・・・・ッ！！\n・・・・・・何なんだよ、おまえは・・・・・・！\n・・・・・・俺を疑って、何を探ろうとしているんだ・・・・・・っ！': {
    ja: '・・・・・・知るかそんなもの・・・・・・ッ！！\n・・・・・・何なんだよ、おまえは・・・・・・！\n・・・・・・俺を疑って、何を探ろうとしているんだ・・・・・・っ！',
    en: '...How the hell should I know...?!!\n...What is wrong with you...?!\n...Why are you doubting me, what are you trying to dig up...?!!',
    ko: '……내가 알겠냐, 그딴 거……!!\n……도대체 뭐야, 넌……!\n……날 의심해서 뭘 캐내려는 셈이냐고……!',
  },
  '・・・・・・っ、ハァ・・・・・・ハァ・・・・・・っ！\nもういい、喋るな・・・・・・！　これ以上、過去の話をする気はない・・・・・・っ！': {
    ja: '・・・・・・っ、ハァ・・・・・・ハァ・・・・・・っ！\nもういい、喋るな・・・・・・！　これ以上、過去の話をする気はない・・・・・・っ！',
    en: '...Haa... haa...!\nEnough, shut up...! I have no intention of discussing the past any further...!',
    ko: '……큭, 하아…… 하아……!\n됐으니까 입 다물어……! 더 이상 과거 얘길 할 생각 따윈 없어……!',
  },
  '空白の2年間に言及された際、言語野の音声出力がグリッチ状に乱壊。\n激しい拒絶反応とともに、中枢コアの自壊を防ぐための緊急メモリ封鎖が作動した。': {
    ja: '空白の2年間に言及された際、言語野の音声出力がグリッチ状に乱壊。\n激しい拒絶反応とともに、中枢コアの自壊を防ぐための緊急メモリ封鎖が作動した。',
    en: 'Upon mention of the blank 2 years, vocal output glitched into fragmented static.\nAlongside violent rejection reactions, emergency memory quarantine engaged to safeguard the core from structural collapse.',
    ko: '공백의 2년간이 언급되자 언어 영역의 음성 출력이 글리치처럼 붕괴.\n격렬한 거부 반응과 함께 중추 코어의 자괴를 방지하기 위한 긴급 메모리 봉쇄가 작동함.',
  },
  'おまえを追い詰めるような聞き方をして悪かった。取り乱させるつもりはなかったんだ': {
    ja: 'おまえを追い詰めるような聞き方をして悪かった。取り乱させるつもりはなかったんだ',
    en: 'I\'m sorry for cornering you like that. I didn\'t mean to shake you up so badly.',
    ko: '널 몰아세우듯 물어봐서 미안해. 그렇게 동요하게 만들 생각은 아니었어.',
  },
  '・・・・・・っ、ハァ・・・・・・ハァ・・・・・・。\n謝るくらいなら・・・・・・最初から余計なことを聞くな・・・・・・っ': {
    ja: '・・・・・・っ、ハァ・・・・・・ハァ・・・・・・。\n謝るくらいなら・・・・・・最初から余計なことを聞くな・・・・・・っ',
    en: '...Haa... haa...\nIf you\'re going to apologize... don\'t go asking unwanted questions in the first place...!',
    ko: '……큭, 하아…… 하아…….\n사과할 거라면…… 처음부터 쓸데없는 소릴 묻지 마……!',
  },
  '・・・・・・おい、頭痛は大丈夫か？　さっきから息が荒いぞ': {
    ja: '・・・・・・おい、頭痛は大丈夫か？　さっきから息が荒いぞ',
    en: '...Hey, is your headache alright? Your breathing has been ragged.',
    ko: '……어이, 두통은 괜찮아? 아까부터 숨이 거칠다고.',
  },
  '・・・・・・触るな！　別にどうということもない・・・・・・っ。\n・・・・・・ただ、頭の中がやけに騒がしいだけだ・・・・・・': {
    ja: '・・・・・・触るな！　別にどうということもない・・・・・・っ。\n・・・・・・ただ、頭の中がやけに騒がしいだけだ・・・・・・',
    en: '...Don\'t touch me! It\'s nothing...!\n...It\'s just that my head feels deafeningly noisy...',
    ko: '……만지지 마! 딱히 아무렇지도 않아……!\n……그저 머릿속이 유난히 시끄러울 뿐이다…….',
  },
  '・・・・・・なあ、アッシュ。ディストはおまえに、どこまで話したんだ？　この身体で目覚めさせた時に': {
    ja: '・・・・・・なあ、アッシュ。ディストはおまえに、どこまで話したんだ？　この身体で目覚めさせた時に',
    en: '...Hey, Asch. How much did Dist actually tell you when he woke you up in this body?',
    ko: '……저기, 애쉬. 디스트는 너한테 어디까지 말해줬어? 이 몸으로 깨웠을 때.',
  },
  'ただ「前の機体が壊れたから予備に移し替えた」とだけ言われた。\n・・・・・・あいつの戯言など、最初から真に受けていない': {
    ja: 'ただ「前の機体が壊れたから予備に移し替えた」とだけ言われた。\n・・・・・・あいつの戯言など、最初から真に受けていない',
    en: 'He just said \'The previous unit was wrecked so I transferred you to the spare.\'\n...I never took his babble seriously to begin with.',
    ko: '그저 \"이전 기체가 부서져서 예비로 옮겼다\"고만 들었다.\n……그 자식 헛소리 따윈 애초부터 진지하게 듣지도 않았어.',
  },
  '前の機体が壊れた理由（もう一度聞く）': {
    ja: '前の機体が壊れた理由（もう一度聞く）',
    en: 'Why the previous chassis broke (Ask again)',
    ko: '이전 기체가 부서진 이유에 대해 (다시 묻는다)',
  },
  '・・・・・・なあ、何でタルロウAは壊れたんだ？　ずっと研究所の中にいたんだろ？': {
    ja: '・・・・・・なあ、何でタルロウAは壊れたんだ？　ずっと研究所の中にいたんだろ？',
    en: '...Hey, why did Tarlow A get wrecked? You were inside that lab the whole time, right?',
    ko: '……저기, 어째서 타르로우 A는 부서진 거야? 계속 연구소 안에만 있었잖아?',
  },
  '・・・・・・やっぱり引っかかるんだ。ディストの記録といい、2ヶ月前にタルロウAが壊れた時、本当は何があったんだ？': {
    ja: '・・・・・・やっぱり引っかかるんだ。ディストの記録といい、2ヶ月前にタルロウAが壊れた時、本当は何があったんだ？',
    en: '...It just doesn\'t add up. Between Dist\'s records and all, what really happened two months ago when Tarlow A broke?',
    ko: '……역시 마음에 걸려. 디스트의 기록도 그렇고, 2개월 전 타르로우 A가 부서졌을 때 도대체 무슨 일이 있었던 거야?',
  },
  '・・・・・・知らん。なぜ壊れたのかは覚えていない。気づいた時には、もうこの身体に移されていた': {
    ja: '・・・・・・知らん。なぜ壊れたのかは覚えていない。気づいた時には、もうこの身体に移されていた',
    en: '...I don\'t know. I don\'t remember why it was destroyed. By the time I came to, I was already in this body.',
    ko: '……몰라. 왜 부서졌는진 기억나지 않는다. 눈을 떴을 땐 이미 이 몸으로 옮겨져 있었어.',
  },
  '・・・・・・しつこい奴だな。なぜ壊れたかは覚えていないと言っているだろうが': {
    ja: '・・・・・・しつこい奴だな。なぜ壊れたかは覚えていないと言っているだろうが',
    en: '...You don\'t let up. I told you I don\'t remember why it broke!',
    ko: '……끈질긴 녀석이군. 왜 부서졌는진 기억나지 않는다고 말했을 텐데.',
  },
  '・・・・・・ただの故障なんかじゃないだろ。\nおまえ自身が何かを知って、自分で無茶をしたせいじゃないのか？': {
    ja: '・・・・・・ただの故障なんかじゃないだろ。\nおまえ自身が何かを知って、自分で無茶をしたせいじゃないのか？',
    en: '...It wasn\'t an ordinary malfunction, was it?\nDidn\'t you find out something and end up doing something reckless to yourself?',
    ko: '……단순한 고장 같은 게 아니잖아.\n너 자신이 무언가를 알게 돼서 스스로 무리한 짓을 저지른 탓 아냐?',
  },
  '・・・・・・っ、ぐ・・・・・・ッ！！　あ、頭が・・・・・・っ！\n・・・・・・やめろ、それ以上聞くな・・・・・・っ！': {
    ja: '・・・・・・っ、ぐ・・・・・・ッ！！　あ、頭が・・・・・・っ！\n・・・・・・やめろ、それ以上聞くな・・・・・・っ！',
    en: '...Guh...!! M-My head...!\n...Stop it, don\'t ask any more...!',
    ko: '……윽, 큭……!! 머, 머리가……!\n……그만둬, 그 이상 묻지 마……!',
  },
  'あの50センチの小型機体で、無理に剣でも振ろうとしたのか？': {
    ja: 'あの50センチの小型機体で、無理に剣でも振ろうとしたのか？',
    en: 'Did you try forcing that 50cm compact body to swing a sword?',
    ko: '그 50센티짜리 소형 기체로 무리해서 검이라도 휘두르려 한 거야?',
  },
  '・・・・・・あんな樽みたいな機体で、剣など握れるわけがないだろうが！': {
    ja: '・・・・・・あんな樽みたいな機体で、剣など握れるわけがないだろうが！',
    en: '...How could anyone hold a sword in a body shaped like a barrel?!',
    ko: '……그런 술통 같은 기체로 검 따윌 쥘 수 있을 리가 없잖아!',
  },
  '・・・・・・そうか。思い出せないなら、無理には聞かないが・・・・・・': {
    ja: '・・・・・・そうか。思い出せないなら、無理には聞かないが・・・・・・',
    en: '...I see. If you can\'t remember, I won\'t press you, but...',
    ko: '……그렇구나. 떠오르지 않는다면 억지로 묻진 않겠지만……',
  },
  'おい、しっかりしろ！\n・・・・・・悪かった、無理に思い出させようとして': {
    ja: 'おい、しっかりしろ！\n・・・・・・悪かった、無理に思い出させようとして',
    en: 'Hey, pull yourself together!\n...I\'m sorry, I shouldn\'t have forced you to remember.',
    ko: '어이, 정신 차려!\n……미안해, 무리해서 떠올리게 하려 해서.',
  },
  '・・・・・・っ、ハァ・・・・・・触るな・・・・・・っ！\n一時的な、ノイズだ・・・・・・': {
    ja: '・・・・・・っ、ハァ・・・・・・触るな・・・・・・っ！\n一時的な、ノイズだ・・・・・・',
    en: '...Haa... don\'t touch me...!\nIt\'s just... temporary noise...',
    ko: '……큭, 하아…… 손대지 마……!\n일시적인, 노이즈다…….',
  },
  '少し座れ。・・・・・・息を整えろよ': {
    ja: '少し座れ。・・・・・・息を整えろよ',
    en: 'Sit down for a moment. ...Catch your breath.',
    ko: '잠깐 앉아 봐. ……숨 좀 가다듬어.',
  },
  '・・・・・・ふぅ、・・・・・・っ。\n・・・・・・騒ぐな。もう、治まった・・・・・・': {
    ja: '・・・・・・ふぅ、・・・・・・っ。\n・・・・・・騒ぐな。もう、治まった・・・・・・',
    en: '...Whew...!\n...Stop fussing. It\'s already subsided...',
    ko: '……후우, …….\n……소란 피우지 마. 이제, 가라앉았으니까…….',
  },
  '・・・・・・っ、　何を、みてるんだ・・・・・・！\n気は済んだか・・・・・・！？　なら、もう帰・・・': {
    ja: '・・・・・・っ、　何を、みてるんだ・・・・・・！\n気は済んだか・・・・・・！？　なら、もう帰・・・',
    en: '...What are you staring at...!\nAre you satisfied now...?! Then just go home...',
    ko: '……뭘, 쳐다보는 거냐……!\n이제 직성이 풀렸냐……?! 그럼, 이만 돌……',
  },
  '・・・・・・っ、待てよ！': {
    ja: '・・・・・・っ、待てよ！',
    en: '...Wait!',
    ko: '……잠깐만, 기다려!',
  },
  '・・・・・・っ！？ 離せっ、': {
    ja: '・・・・・・っ！？ 離せっ、',
    en: '...?! Let go of me!',
    ko: '……윽?! 놔라,',
  },
  '・・・・・・おまえ、は・・・・・・': {
    ja: '・・・・・・おまえ、は・・・・・・',
    en: '...You are...',
    ko: '……너, 는……',
  },
  '・・・・・・？ 何を言いたいんだ': {
    ja: '・・・・・・？ 何を言いたいんだ',
    en: '...? What are you trying to say?',
    ko: '……? 무슨 말이 하고 싶은 건데.',
  },
  '・・・・・・いや。……なんでもない': {
    ja: '・・・・・・いや。……なんでもない',
    en: '...No. ...It\'s nothing.',
    ko: '……아냐. ……아무것도 아니다.',
  },
  '・・・・・・ただ、頼むから。もう少しだけ、ここにいてくれないか': {
    ja: '・・・・・・ただ、頼むから。もう少しだけ、ここにいてくれないか',
    en: "...Just, I'm asking you. Please stay here for just a little longer.",
    ko: '……그냥, 부탁이니까. 조금만 더 여기에 머물러 주지 않겠어?',
  },
  '・・・・・・は？ 何を言って――': {
    ja: '・・・・・・は？ 何を言って――',
    en: '...Huh? What are you saying—',
    ko: '……하? 무슨 소릴 하는 거—',
  },
  '・・・・・・あのディストが珍しくおまえの記憶に強固なロックをかけたのもさ。\nおまえがまた無茶をしないためだったのかもしれないな': {
    ja: '・・・・・・あのディストが珍しくおまえの記憶に強固なロックをかけたのもさ。\nおまえがまた無茶をしないためだったのかもしれないな',
    en: "...Dist putting such an unusually firm lock on your memories...\nmaybe it was to keep you from doing something reckless again.",
    ko: '……그 디스트가 별일로 네 기억에 견고한 잠금을 걸어둔 것도 말야.\n네가 또다시 무모한 짓을 저지르지 않게 하려던 걸지도 몰라.',
  },
  '・・・・・・ハッ、あいつがそんな殊勝な理由で動くものか。どうせ貴重なサンプルを壊されたくなかっただけだろう。\n・・・・・・まあいい。思い出せないことは、今の俺には必要のないことだ': {
    ja: '・・・・・・ハッ、あいつがそんな殊勝な理由で動くものか。どうせ貴重なサンプルを壊されたくなかっただけだろう。\n・・・・・・まあいい。思い出せないことは、今の俺には必要のないことだ',
    en: "...Ha! As if that creep would act out of such admirable motives. He just didn't want his precious sample wrecked.\n...Whatever. Things I can't remember are things I don't need right now anyway.",
    ko: '……하! 그 자식이 그런 기특한 이유로 움직일 리가 있겠냐. 어차피 귀중한 샘플이 부서지는 걸 원치 않았을 뿐이겠지.\n……뭐 상관없어. 떠올릴 수 없는 일은 지금의 나에겐 필요 없는 일이다.',
  },
  'さっき話したルークとナタリアの結婚の話だが・・・・・・あれ、お前を揺さぶるためのウソだ。悪かったな': {
    ja: 'さっき話したルークとナタリアの結婚の話だが・・・・・・あれ、お前を揺さぶるためのウソだ。悪かったな',
    en: "About Luke and Natalia marrying that I mentioned earlier... that was a lie to shake you up. My bad.",
    ko: '아까 말했던 루크와 나탈리아의 결혼 얘기 말인데…… 그거, 널 떠보려고 한 거짓말이야. 미안했어.',
  },
  '・・・・・・ルークとナタリアは元々婚約者だ。結婚に向けて話が進んでいるのは当然だろう': {
    ja: '・・・・・・ルークとナタリアは元々婚約者だ。結婚に向けて話が進んでいるのは当然だろう',
    en: "...Luke and Natalia were betrothed to begin with. Progress toward marriage is only natural.",
    ko: '……루크와 나탈리아는 원래 약혼자 사이다. 결혼을 향해 이야기가 진행되는 건 당연하잖아.',
  },
  '安心しろって。彼女は今、キムラスカの政で東奔西走してるよ。\n結婚どころじゃないし・・・・・・それに、彼女はずっとお前を・・・・・・': {
    ja: '安心しろって。彼女は今、キムラスカの政で東奔西走してるよ。\n結婚どころじゃないし・・・・・・それに、彼女はずっとお前を・・・・・・',
    en: "Don't worry. She's rushing all over handling Kimlasca's state affairs right now.\nMarriage is the furthest thing from her mind... Besides, she has always kept you...",
    ko: '안심해. 그녀는 지금 키므라스카 국정으로 동분서주하고 있어.\n결혼은커녕…… 게다가 그녀는 줄곧 널……',
  },
  '・・・・・・っ、余計なことを言うな。俺はそんなものを望んでいない': {
    ja: '・・・・・・っ、余計なことを言うな。俺はそんなものを望んでいない',
    en: "...Stop spouting nonsense. I never asked for anything like that.",
    ko: '……큭, 쓸데없는 소리 지껄이지 마. 난 그딴 걸 바란 적 없어.',
  },
  '・・・・・・悪かったよ。お互いに少し熱くなりすぎたな、頭を冷やそう': {
    ja: '・・・・・・悪かったよ。お互いに少し熱くなりすぎたな、頭を冷やそう',
    en: "...Sorry. We both got a little too heated, let's cool off.",
    ko: '……미안해. 서로 너무 흥분했네, 머리 좀 식히자.',
  },
  '・・・・・・ふん。分かればいい。あまりしつこく妙なことを聞くな': {
    ja: '・・・・・・ふん。分かればいい。あまりしつこく妙なことを聞くな',
    en: '...Hmph. As long as you get it. Don\'t go prying into weird things so stubbornly.',
    ko: '……흥. 알았으면 됐다. 너무 끈질기게 이상한 것 좀 묻지 마.',
  },
  '・・・・・・いい加減にしろよ。さっきから何を聞いても突っかかりやがって、人の気も知らないでなんだその態度は': {
    ja: '・・・・・・いい加減にしろよ。さっきから何を聞いても突っかかりやがって、人の気も知らないでなんだその態度は',
    en: '...Knock it off. Snapping at everything I ask, after all my concern, what\'s with that attitude?',
    ko: '……적당히 좀 해. 아까부터 뭘 물어도 사사건건 시비조인데, 사람 신경도 모르고 그 태도는 뭐야.',
  },
  'それはこっちの台詞だ！　勝手に研究室から連れ出しておいて、指図される筋合いはない！！\nそんなに俺の態度が気に入らないなら、今すぐここから出て行ってやる！': {
    ja: 'それはこっちの台詞だ！　勝手に研究室から連れ出しておいて、指図される筋合いはない！！\nそんなに俺の態度が気に入らないなら、今すぐここから出て行ってやる！',
    en: 'That\'s my line! You dragged me out of that lab on your own, you have no right to order me around!!\nIf you hate my attitude so much, I\'ll walk out of here right now!',
    ko: '그건 내가 할 소리다! 제멋대로 연구실에서 끌고 나와 놓고 이래라저래라 명령할 자격 없어!!\n내 태도가 그렇게 마음에 안 들면 지금 당장 여기서 나가주마!',
  },
  'しかし、今日のグランコクマは風が少し冷たいなあ。その身体だと寒さとかは感じないのか？': {
    ja: 'しかし、今日のグランコクマは風が少し冷たいなあ。その身体だと寒さとかは感じないのか？',
    en: 'Still, the wind in Grand Chokmah is a bit chilly today. Do you feel cold in that body?',
    ko: '하지만 오늘 그란코크마는 바람이 좀 차갑네. 그 몸으론 추위 같은 건 안 느껴져?',
  },
  '・・・・・・温度センサーくらいついているが、人間みたいに凍えることはない。\nもっとも、冷えすぎると関節の駆動音がうるさくなるから鬱陶しいがな': {
    ja: '・・・・・・温度センサーくらいついているが、人間みたいに凍えることはない。\nもっとも、冷えすぎると関節の駆動音がうるさくなるから鬱陶しいがな',
    en: '...I have thermal sensors, but I don\'t shiver like a human.\nThough if it gets too cold, joint motor noise gets loud and annoying.',
    ko: '……온도 센서 정도는 달려 있지만 인간처럼 추위에 떨진 않는다.\n물론 너무 차가워지면 관절 구동음이 시끄러워져서 성가시지만.',
  },
  '・・・・・・別に、寒くはない': {
    ja: '・・・・・・別に、寒くはない',
    en: '...It\'s not cold, particularly.',
    ko: '……딱히 춥진 않아.',
  },
  '机の上が散らかっていて悪いね。最近また古代の音機関の調査を手伝っていて、資料が山積みになってるんだ': {
    ja: '机の上が散らかっていて悪いね。最近また古代の音機関の調査を手伝っていて、資料が山積みになってるんだ',
    en: 'Sorry the desk is so messy. I\'ve been helping investigate ancient fonic machinery again, so files are piled high.',
    ko: '책상 위가 어질러져 있어서 미안해. 최근 다시 고대 음기관 조사를 돕느라 자료가 산더미거든.',
  },
  '・・・・・・おまえ、そういうのが好きなのか': {
    ja: '・・・・・・おまえ、そういうのが好きなのか',
    en: '...You\'re into that sort of thing?',
    ko: '……너, 그런 거 좋아하냐.',
  },
  'え？\nああ、そういえば昔は、こういう話はしなかったもんなぁ': {
    ja: 'え？\nああ、そういえば昔は、こういう話はしなかったもんなぁ',
    en: 'Eh?\nAh, now that you mention it, we never talked about this kind of stuff back then.',
    ko: '응?\n아아, 그러고 보면 예전엔 이런 얘긴 안 나눴었지.',
  },
  '興味あるなら、今度ゆっくり語ってやるよ': {
    ja: '興味あるなら、今度ゆっくり語ってやるよ',
    en: 'If you\'re curious, I can tell you all about it sometime.',
    ko: '관심 있다면 다음에 천천히 얘기해 줄게.',
  },
  '・・・・・・少しは整理整頓したらどうだ': {
    ja: '・・・・・・少しは整理整頓したらどうだ',
    en: '...How about cleaning up a little?',
    ko: '……정리정돈이나 좀 해라.',
  },
  '屋敷でよく相手をさせられたよな。\nずっと負け通しだったが・・・・・・': {
    ja: '屋敷でよく相手をさせられたよな。\nずっと負け通しだったが・・・・・・',
    en: 'You made me play chess with you all the time at the manor.\nI lost every single match, though...',
    ko: '저택에서 자주 상대해 줬었지.\n내내 패배만 당했지만…….',
  },
  '・・・・・・おまえがわざと手を抜いていたことくらい、とっくに気づいているぞ。\n俺は何度も本気で指せと言ったのに': {
    ja: '・・・・・・おまえがわざと手を抜いていたことくらい、とっくに気づいているぞ。\n俺は何度も本気で指せと言ったのに',
    en: '...I figured out long ago that you were holding back on purpose.\nEven though I repeatedly told you to play seriously.',
    ko: '……네놈이 일부러 봐줬다는 것쯤은 진작에 눈치챘어.\n내가 몇 번이고 진심으로 두라고 말했었는데도.',
  },
  '・・・・・・チェスなど、暇つぶしに盤面を並べる程度だ': {
    ja: '・・・・・・チェスなど、暇つぶしに盤面を並べる程度だ',
    en: '...Chess is just something I set up on the board to pass the time.',
    ko: '……체스 따윈 심심풀이로 판을 벌려두는 정도다.',
  },
  '・・・・・・なんだか間が持たないな': {
    ja: '・・・・・・なんだか間が持たないな',
    en: '...This silence feels kind of awkward.',
    ko: '……어쩐지 침묵이 어색하네.',
  },
  '・・・・・・気まずそうにするな。おまえが勝手に連れ込んだんだろうが': {
    ja: '・・・・・・気まずそうにするな。おまえが勝手に連れ込んだんだろうが',
    en: '...Don\'t make an awkward face. You dragged me in here on your own!',
    ko: '……어색한 척하지 마라. 네놈이 제멋대로 끌고 들어왔잖아.',
  },
  '大体の譜業は、ちょっと見りゃそれなりに構造も分かるんだが・・・・・・\nおまえの機体は次元を越えちまってるな': {
    ja: '大体の譜業は、ちょっと見りゃそれなりに構造も分かるんだが・・・・・・\nおまえの機体は次元を越えちまってるな',
    en: 'Usually I can understand a fonic craft\'s structure with a quick glance...\nBut your chassis is on another level entirely.',
    ko: '대부분의 포업은 대충 보면 구조를 얼추 알 수 있는데……\n네 기체는 차원을 아득히 뛰어넘었네.',
  },
  '内部の音機関はどう組まれてるんだ？　それに外装だって・・・・・・\n設計図があるなら是非見てみたいんだが': {
    ja: '内部の音機関はどう組まれてるんだ？　それに外装だって・・・・・・\n設計図があるなら是非見てみたいんだが',
    en: 'How is the internal fonic engine assembled? And the casing too...\nIf blueprints exist, I\'d love to see them.',
    ko: '내부 음기관은 어떻게 조립된 걸까? 게다가 외장도……\n설계도가 있다면 꼭 한번 보고 싶은데.',
  },
  '・・・・・・楽しそうだな': {
    ja: '・・・・・・楽しそうだな',
    en: '...You look like you\'re having fun.',
    ko: '……신나 보이는군.',
  },
  'その姿を見ていると、昔屋敷で淹れてもらった紅茶の香りを思い出すな': {
    ja: 'その姿を見ていると、昔屋敷で淹れてもらった紅茶の香りを思い出すな',
    en: 'Looking at you like that reminds me of the scent of black tea we brewed at the manor.',
    ko: '그 모습을 보고 있자니 옛날 저택에서 대접받았던 홍차 향기가 떠오르네.',
  },
  '・・・・・・下らんことを思い出すな。こんな機体で茶なんぞ飲んだところで、何の足しにもならん': {
    ja: '・・・・・・下らんことを思い出すな。こんな機体で茶なんぞ飲んだところで、何の足しにもならん',
    en: '...Stop reminiscing about pointless things. Drinking tea with a body like this does nothing for me.',
    ko: '……하찮은 걸 떠올리지 마라. 이런 기체로 차 따윌 마셔봤자 아무 도움도 안 돼.',
  },
  'ディストの淹れたお茶を飲んだりしなかったのか？\n薬品が混ざってそうで怖いが': {
    ja: 'ディストの淹れたお茶を飲んだりしなかったのか？\n薬品が混ざってそうで怖いが',
    en: 'Did you ever drink tea brewed by Dist?\nSounds terrifying, like chemicals might be mixed in.',
    ko: '디스트가 끓인 차를 마신 적은 없어?\n약품이 섞여 있을 것 같아서 무섭지만.',
  },
  '・・・・・・あいつの淹れた物など口にするか。\n実験用の薬品と給湯用の湯沸かし器を同じ棚に並べる男だぞ': {
    ja: '・・・・・・あいつの淹れた物など口にするか。\n実験用の薬品と給湯用の湯沸かし器を同じ棚に並べる男だぞ',
    en: '...As if I\'d drink anything that man brewed.\nHe keeps experimental reagents on the exact same shelf as the electric kettle.',
    ko: '……그 녀석이 끓인 걸 입에 댈 리가 있겠냐.\n실험용 약품과 급탕용 주전자를 같은 선반에 늘어놓는 작자라고.',
  },
  'うわ、想像以上に危ねえな・・・・・・': {
    ja: 'うわ、想像以上に危ねえな・・・・・・',
    en: 'Yikes, that\'s way more dangerous than I thought...',
    ko: '우와, 상상 이상으로 위험하네…….',
  },
  '・・・・・・一回くらい「ズラ」って言ってくれないか？': {
    ja: '・・・・・・一回くらい「ズラ」って言ってくれないか？',
    en: '...Could you say \'~zura\' just once for me?',
    ko: '……딱 한 번만 \"~즈라\"라고 말해주면 안 돼?',
  },
  'わ、わるかったって': {
    ja: 'わ、わるかったって',
    en: 'A-Alright, my bad!',
    ko: '미, 미안하다고!',
  },
  'タルロウAの姿でもエプロンを巻いて、給仕なんかしてたのか？': {
    ja: 'タルロウAの姿でもエプロンを巻いて、給仕なんかしてたのか？',
    en: 'Did you wear an apron and serve tea even in your Tarlow A body?',
    ko: '타르로우 A 모습일 때도 에이프런을 두르고 차를 따르거나 했어?',
  },
  '・・・・・・貴様、俺を何だと思っている。次くだらん妄想を口にしたら抜刀する': {
    ja: '・・・・・・貴様、俺を何だと思っている。次くだらん妄想を口にしたら抜刀する',
    en: '...What do you take me for? Speak another word of your delusions and I draw my sword.',
    ko: '……네놈, 날 뭐라고 생각하는 거냐. 다음에 또 그딴 망상을 지껄이면 베어버린다.',
  },
  'ナタリアの料理を食べさせられたら、流石に味覚センサーがショートしそうだよな': {
    ja: 'ナタリアの料理を食べさせられたら、流石に味覚センサーがショートしそうだよな',
    en: 'If you were fed Natalia\'s cooking, even those gustatory sensors would short-circuit.',
    ko: '나탈리아의 요리를 먹게 된다면 과연 미각 센서도 쇼트 날 것 같네.',
  },
  '・・・・・・ナ、ナタリアを侮辱するな！': {
    ja: '・・・・・・ナ、ナタリアを侮辱するな！',
    en: '...D-Don\'t insult Natalia!',
    ko: '……나, 나탈리아를 모욕하지 마라!',
  },
  'なあ。おまえ、自分のこと今いくつだと思ってるんだ？': {
    ja: 'なあ。おまえ、自分のこと今いくつだと思ってるんだ？',
    en: 'Hey. How old do you consider yourself right now?',
    ko: '저기. 너, 자신의 나이를 지금 몇 살이라고 생각하고 있어?',
  },
  '・・・・・・？　21だろう。何故そんなことを聞く': {
    ja: '・・・・・・？　21だろう。何故そんなことを聞く',
    en: '...? Twenty-one, obviously. Why ask such a thing?',
    ko: '……? 21살이잖아. 왜 그런 걸 묻는데.',
  },
  'いや、なんとなく・・・・・・': {
    ja: 'いや、なんとなく・・・・・・',
    en: 'No, just curious...',
    ko: '아니, 그냥 어쩐지…….',
  },
  'ルークの奴、一応21歳ってことになってるが・・・・・・\n2年間の記憶があやふやだとかいって、まだ19歳くらいの感覚だって言ってたな': {
    ja: 'ルークの奴、一応21歳ってことになってるが・・・・・・\n2年間の記憶があやふやだとかいって、まだ19歳くらいの感覚だって言ってたな',
    en: 'Luke is technically 21 now, but...\nhe said his two missing years are hazy, so he still feels around 19.',
    ko: '루크 녀석, 일단 21살이란 설정이지만……\n2년간의 기억이 애매해서 아직 19살 정도의 감각이라고 하더라고.',
  },
  'まだ未成年気分が抜けないと？': {
    ja: 'まだ未成年気分が抜けないと？',
    en: 'Still feeling like a minor?',
    ko: '아직 미성년 기분이 안 빠졌다고?',
  },
  'まあ、11年前に産まれたんだ。\nまだ未成年っちゃ未成年ってことにもなるんじゃないか？': {
    ja: 'まあ、11年前に産まれたんだ。\nまだ未成年っちゃ未成年ってことにもなるんじゃないか？',
    en: 'Well, he was born 11 years ago.\nTechnically that makes him an adolescent minor either way, doesn\'t it?',
    ko: '뭐, 11년 전에 태어났으니까.\n아직 미성년이라면 미성년이라고 볼 수도 있지 않겠어?',
  },
  '・・・・・・ふん、相変わらずだな・・・・・・': {
    ja: '・・・・・・ふん、相変わらずだな・・・・・・',
    en: '...Hmph, typical of him...',
    ko: '……흥, 여전하구만…….',
  },
  '・・・・・・どうしてディストだったんだ？ 機体の制御まで握られて、好き放題されるって分かってただろうに': {
    ja: '・・・・・・どうしてディストだったんだ？ 機体の制御まで握られて、好き放題されるって分かってただろうに',
    en: '...Why Dist? You knew he\'d hold the master controls and do whatever he wanted with you.',
    ko: '……어째서 디스트였던 거야? 기체 제어권까지 쥐여서 제멋대로 농락당할 걸 알고 있었을 텐데.',
  },
  '・・・・・・奴なら、俺が死に損ないだろうが何だろうが気にも留めんからだ。\n気まぐれに実験台にする以外は、放っておいてくれる': {
    ja: '・・・・・・奴なら、俺が死に損ないだろうが何だろうが気にも留めんからだ。\n気まぐれに実験台にする以外は、放っておいてくれる',
    en: '...Because that man wouldn\'t care whether I was half-dead or a ghost.\nAside from erratic experiments, he leaves me alone.',
    ko: '……그 녀석이라면 내가 죽다 만 송장이든 뭐든 신경도 안 쓰니까다.\n변덕으로 실험체 취급하는 것 외엔 내버려두거든.',
  },
  'あのディストとずっと二人で暮らしていて、よく息が詰まらなかったな。主電源を握られてちゃ下手に逆らえもしないだろ？': {
    ja: 'あのディストとずっと二人で暮らしていて、よく息が詰まらなかったな。主電源を握られてちゃ下手に逆らえもしないだろ？',
    en: 'Living alone with Dist all this time, how did you not lose your mind? With him holding the main power switch, you couldn\'t even rebel, right?',
    ko: '그 디스트와 줄곧 둘이서 살면서 답답해 미치지 않았네. 메인 전원을 쥐고 있으니 함부로 반항도 못 했을 텐데?',
  },
  '奴の関心は自分の研究だけだ。たまに実験や雑用で喚く以外は放置されていた。\n・・・・・・くだらん同情を寄せてくる連中より、よほどマシだ': {
    ja: '奴の関心は自分の研究だけだ。たまに実験や雑用で喚く以外は放置されていた。\n・・・・・・くだらん同情を寄せてくる連中より、よほどマシだ',
    en: 'His only care is his own research. Outside screaming about chores or tests, I was left alone.\n...Far better than dealing with people drowning me in cheap sympathy.',
    ko: '그 자식 관심사는 오직 자기 연구뿐이다. 가끔 실험이나 잡무로 꽥꽥대는 것 외엔 방치되어 있었어.\n……시시한 동정을 늘어놓는 녀석들보단 훨씬 낫다.',
  },
  '出力制限をかけられてるとはいえ、あいつが油断してる隙に蹴っ飛ばしたりくらいはしたんじゃないか？': {
    ja: '出力制限をかけられてるとはいえ、あいつが油断してる隙に蹴っ飛ばしたりくらいはしたんじゃないか？',
    en: 'Even with limiters, didn\'t you kick him when his back was turned?',
    ko: '출력 제한이 걸려 있었다곤 해도 녀석이 방심한 틈에 발로 걷어차거나 하진 않았어?',
  },
  '・・・・・・一度、背後から椅子の脚を蹴り倒したら『私の繊細な骨盤が！』と半日騒ぎ立てやがった。\n主電源を落とされかけたから、それ以来は無視している': {
    ja: '・・・・・・一度、背後から椅子の脚を蹴り倒したら『私の繊細な骨盤が！』と半日騒ぎ立てやがった。\n主電源を落とされかけたから、それ以来は無視している',
    en: '...Once I kicked his chair leg from behind and he shrieked \'My delicate pelvis!\' for half a day.\nHe threatened to kill my master power, so I\'ve ignored him since.',
    ko: '……한 번 뒤에서 의자 다리를 걷어찼더니 \"내 섬세한 골반이!\"라며 반나절 동안 난리를 피우더군.\n메인 전원을 끌 뻔하길래 그 이후론 무시하고 있다.',
  },
  '・・・・・・なあ。ルークのことは、今どう思ってるんだ？\nあいつ、バチカルでお前の分まで背負い込んであちこち飛び回ってるぞ': {
    ja: '・・・・・・なあ。ルークのことは、今どう思ってるんだ？\nあいつ、バチカルでお前の分まで背負い込んであちこち飛び回ってるぞ',
    en: '...Hey. What do you think of Luke now?\nIn Baticul, he\'s carrying your burden alongside his own, rushing all over the place.',
    ko: '……저기. 루크에 대해선 지금 어떻게 생각해?\n그 녀석, 바티칼에서 네 몫까지 짊어지고 여기저기 뛰어다니고 있다고.',
  },
  '・・・・・・あいつのことは、もう俺が口を挟むことじゃない。\nあいつはあいつ自身で選んだ道を進んでいる。\n・・・・・・俺がいちいち指図することじゃねえよ': {
    ja: '・・・・・・あいつのことは、もう俺が口を挟むことじゃない。\nあいつはあいつ自身で選んだ道を進んでいる。\n・・・・・・俺がいちいち指図することじゃねえよ',
    en: '...His life isn\'t something for me to butt in on anymore.\nHe\'s walking the path he chose for himself.\n...It\'s not my place to tell him what to do.',
    ko: '……그 녀석 일은 이제 내가 참견할 게 아냐.\n그 녀석은 자기 자신이 선택한 길을 걷고 있다.\n……내가 일일이 이래라저래라 지시할 일이 아니야.',
  },
  '自発的問いかけの破棄': {
    ja: '自発的問いかけの破棄',
    en: 'Discarding Spontaneous Inquiry',
    ko: '자발적 질의 폐기',
  },
  '対象（ガイ・セシル）への能動的質問プロトコル実行時、無応答状態が継続したため、中枢コアが「拒絶」と判定して質問を自律破棄。\n「忘れてくれ」という発声とともに、以降の自律的質問プロトコルをすべて閉鎖した。\n本来の肉体時における自尊心の高さと、他者からの無視・拒絶に対する過剰な防衛反応が観測される。': {
    ja: '対象（ガイ・セシル）への能動的質問プロトコル実行時、無応答状態が継続したため、中枢コアが「拒絶」と判定して質問を自律破棄。\n「忘れてくれ」という発声とともに、以降の自律的質問プロトコルをすべて閉鎖した。\n本来の肉体時における自尊心の高さと、他者からの無視・拒絶に対する過剰な防衛反応が観測される。',
    en: 'During active query protocols toward subject (Guy Cecil), prolonged silence caused core to evaluate interaction as \'rejection\', autonomously discarding the query.\nVoicing \'Forget it\', all subsequent autonomous query subroutines shut down.\nEvidences extreme pride and hypersensitive defensive reactions against perceived disregard or rejection from life.',
    ko: '대상(가이 세실)을 향한 능동적 질문 프로토콜 실행 시 무응답 상태가 지속되어 중추 코어가 \"거절\"로 판정하고 질문을 자율 폐기.\n\"잊어줘\"라는 발성과 함께 이후의 자율 질의 프로토콜을 전면 폐쇄함.\n생전 육체 시절의 높은 자존심과 타인의 무시·거절에 대한 과도한 방어 반응이 관측됨.',
  },
  '・・・・・・\nいや、いい。なんでもない。忘れてくれ': {
    ja: '・・・・・・\nいや、いい。なんでもない。忘れてくれ',
    en: '...\nNo, forget it. It\'s nothing. Just forget I said anything.',
    ko: '……\n아니다, 됐어. 아무것도 아냐. 잊어버려라.',
  },
  '刺激途絶に伴う情動波形の自然冷却': {
    ja: '刺激途絶に伴う情動波形の自然冷却',
    en: 'Natural Cool-down of Emotional Waveform via Ceased Stimuli',
    ko: '자극 중단에 따른 정동 파형의 자연 냉각',
  },
  '激昂・威嚇状態への移行後、対象からの言語的・物理的刺激が途絶（無言待機状態が約30秒継続）したことにより、音素循環の乱れが自律的に減衰。\n視認センサーによる断続的な動向確認を経て、対象に積極的な敵意・悪意が存在しないと判定。\n不機嫌パラメータが通常警戒域まで自然冷却された形跡。': {
    ja: '激昂・威嚇状態への移行後、対象からの言語的・物理的刺激が途絶（無言待機状態が約30秒継続）したことにより、音素循環の乱れが自律的に減衰。\n視認センサーによる断続的な動向確認を経て、対象に積極的な敵意・悪意が存在しないと判定。\n不機嫌パラメータが通常警戒域まで自然冷却された形跡。',
    en: 'Following transition into agitated/intimidating state, cessation of verbal and physical input from subject (silence lasting approx. 30s) allowed fonon disturbances to decay autonomously.\nVisual tracking confirmed absence of active hostility, showing displeasure metrics cooling down to baseline alert.',
    ko: '격앙·위협 상태로 이행한 후 대상으로부터의 언어적·물리적 자극이 중단(약 30초간 무언 대기 상태 지속)됨으로써 음소 순환 교란이 자율 감쇠.\n시각 센서의 간헐적 동향 확인을 거쳐 대상에게 적극적인 적의·악의가 없다고 판정.\n불쾌 파라미터가 통상 경계 수준으로 자연 냉각된 흔적.',
  },
  '・・・・・・っ、くそ・・・・・・頭が・・・・・・ッ': {
    ja: '・・・・・・っ、くそ・・・・・・頭が・・・・・・ッ',
    en: '...Damn it... my head...!',
    ko: '……큭, 제기랄…… 머리가……!',
  },
  '・・・・・・何か言いたいことでもあるのか': {
    ja: '・・・・・・何か言いたいことでもあるのか',
    en: '...Do you have something you want to say?',
    ko: '……무슨 할 말이라도 있는 거냐.',
  },
  '・・・・・・っ、ハァ・・・・・・ハァ・・・・・・ッ。・・・・・・見るな・・・・・・っ': {
    ja: '・・・・・・っ、ハァ・・・・・・ハァ・・・・・・ッ。・・・・・・見るな・・・・・・っ',
    en: '...Haa... haa...! ...Don\'t look at me...!',
    ko: '……큭, 하아…… 하아……! ……쳐다보지 마……!',
  },
  '・・・・・・その端末に、何が映っているんだ': {
    ja: '・・・・・・その端末に、何が映っているんだ',
    en: '...What is displayed on that terminal?',
    ko: '……그 단말기에 뭐가 떠 있는 거냐.',
  },
  '・・・・・・なあ。前の機体に、一体何があったんだ？': {
    ja: '・・・・・・なあ。前の機体に、一体何があったんだ？',
    en: '...Hey. What on earth happened to your previous chassis?',
    ko: '……저기. 이전 기체에 도대체 무슨 일이 있었던 거야?',
  },
  '待て。俺がやる': {
    ja: '待て。俺がやる',
    en: 'Wait. I\'ll do it.',
    ko: '기다려. 내가 하마.',
  },
  '・・・・・・なあ、少し聞きたいんだが': {
    ja: '・・・・・・なあ、少し聞きたいんだが',
    en: '...Hey, there\'s something I want to ask.',
    ko: '……저기, 잠깐 묻고 싶은 게 있는데.',
  },
  '予備機体モデルへの反応ログ': {
    ja: '予備機体モデルへの反応ログ',
    en: 'Response Log to Spare Chassis Model',
    ko: '예비 기체 모델 반응 로그',
  },
  '管理者に関する応答ログ': {
    ja: '管理者に関する応答ログ',
    en: 'Response Log Regarding Administrator',
    ko: '관리자 관련 응답 로그',
  },
  '頭部接触時の反射行動と呼称出力': {
    ja: '頭部接触時の反射行動と呼称出力',
    en: 'Reflex Behavior and Name Output on Head Contact',
    ko: '두부 접촉 시 반사 행동 및 호칭 출력',
  },
  '宝刀ガルディオス視認時の反応ログ': {
    ja: '宝刀ガルディオス視認時の反応ログ',
    en: 'Response Log on Visual Contact with Gardios',
    ko: '보도 가르디오스 시각 포착 시 반응 로그',
  },
  'キムラスカ王女に関する応答ログ': {
    ja: 'キムラスカ王女に関する応答ログ',
    en: 'Response Log Regarding Princess of Kimlasca',
    ko: '키므라스카 공주 관련 응답 로그',
  },
  '個体名『アッシュ』への反応ログ': {
    ja: '個体名『アッシュ』への反応ログ',
    en: 'Response Log to Designation \'Asch\'',
    ko: '개체명 "애쉬" 반응 로그',
  },
  '特定食材（タコ）への拒絶反応ログ': {
    ja: '特定食材（タコ）への拒絶反応ログ',
    en: 'Rejection Log to Specific Food (Octopus)',
    ko: '특정 식재료(문어) 거부 반응 로그',
  },
  '六神将当時の身体的特徴への反応ログ': {
    ja: '六神将当時の身体的特徴への反応ログ',
    en: 'Response Log to Physical Traits during God-Generals Era',
    ko: '육신장 시절 신체적 특징 반응 로그',
  },
  '経口摂取および代謝機能': {
    ja: '経口摂取および代謝機能',
    en: 'Ingestion and Metabolic Functions',
    ko: '경구 섭취 및 대사 기능',
  },
  '本機体に有機物の経口摂取および消化機能は未実装。内部の音素循環のみで稼働する。\n擬似味覚および嗅覚センサーは生体時（20歳時点）の嗜好データを引き継いでいる。': {
    ja: '本機体に有機物の経口摂取および消化機能は未実装。内部の音素循環のみで稼働する。\n擬似味覚および嗅覚センサーは生体時（20歳時点）の嗜好データを引き継いでいる。',
    en: 'Ingestion and digestion of organic matter are uninstalled on this chassis. It functions purely on internal fonon circulation.\nPseudo-gustatory and olfactory sensors carry over dietary preferences from life at age 20.',
    ko: '본 기체에 유기물의 경구 섭취 및 소화 기능은 미탑재. 내부의 음소 순환만으로 가동함.\n의사 미각 및 후각 센서는 생전(20세 시점)의 기호 데이터를 계승하고 있음.',
  },
  '給仕行動介入プロトコル': {
    ja: '給仕行動介入プロトコル',
    en: 'Service Intervention Protocol',
    ko: '급사 행동 개입 프로토콜',
  },
  '対象生体による給仕動作（茶の調合・給湯）を検知した際、本機内部の給仕プロトコルが自動起動し、動作の主導権を確保しようとする介入要求を出力。\n外部からの制止を受け動作は中断されたが、中枢論理回路に「不完全なタスク実行」としての不満反応が記録されている。': {
    ja: '対象生体による給仕動作（茶の調合・給湯）を検知した際、本機内部の給仕プロトコルが自動起動し、動作の主導権を確保しようとする介入要求を出力。\n外部からの制止を受け動作は中断されたが、中枢論理回路に「不完全なタスク実行」としての不満反応が記録されている。',
    en: 'Upon detecting beverage service motions by subject (brewing tea/pouring water), internal steward protocol auto-initiated, asserting intervention priority.\nThough interrupted by subject, core logic recorded frustration logged as \'incomplete task execution\'.',
    ko: '대상 생체에 의한 급사 동작(차 조합·급탕)을 감지했을 때 본 기체 내부의 급사 프로토콜이 자동 기동하여 주도권을 확보하려는 개입 요구를 출력.\n외부 제지로 동작은 중단되었으나 중추 논리 회로에 \"불완전한 작업 실행\"으로서의 불만 반응이 기록됨.',
  },
  'ん？　いや、おまえは客なんだからゆっくりしてろよ': {
    ja: 'ん？　いや、おまえは客なんだからゆっくりしてろよ',
    en: 'Hm? No, you\'re the guest, so just relax.',
    ko: '응? 아니, 넌 손님이니까 편하게 쉬고 있어.',
  },
  '・・・・・・いい加減にしろ。これ以上鬱陶しい真似を続けるなら、俺は今すぐ研究所へ戻るからな！': {
    ja: '・・・・・・いい加減にしろ。これ以上鬱陶しい真似を続けるなら、俺は今すぐ研究所へ戻るからな！',
    en: '...Cut it out. Keep playing these annoying games, and I\'m heading back to the lab this instant!',
    ko: '……적당히 좀 해라. 이 이상 성가시게 굴면 난 지금 당장 연구소로 돌아갈 테니까!',
  },
  '（・・・・・・今は何を聞いても突っぱねられそうだな。少し落ち着くまで、このまま黙って様子を見てみるか・・・・・・）': {
    ja: '（・・・・・・今は何を聞いても突っぱねられそうだな。少し落ち着くまで、このまま黙って様子を見てみるか・・・・・・）',
    en: '(...He\'ll probably reject anything I ask right now. Guess I\'ll stay silent and watch him until he calms down...)',
    ko: '(……지금은 뭘 물어도 튕겨 나갈 것 같네. 조금 진정될 때까지 이대로 가만히 지켜볼까……)',
  },
  '頭部接触に対する反射的排斥行動': {
    ja: '頭部接触に対する反射的排斥行動',
    en: 'Reflexive Rejection Behavior to Head Contact',
    ko: '두부 접촉에 대한 반사적 배척 행동',
  },
  '対象（ガイ・セシル）による執拗な頭部接触に対し、腕部駆動アクチュエータによる排斥行動が自動発動。\n人工表皮への接触刺激に対し、本来の肉体時との解離から生じる強い不快感を検知。\n排斥直後、警戒プロトコルの段階引き上げと情動スコアの低下が記録された。': {
    ja: '対象（ガイ・セシル）による執拗な頭部接触に対し、腕部駆動アクチュエータによる排斥行動が自動発動。\n人工表皮への接触刺激に対し、本来の肉体時との解離から生じる強い不快感を検知。\n排斥直後、警戒プロトコルの段階引き上げと情動スコアの低下が記録された。',
    en: 'Persistent head touching by subject (Guy Cecil) triggered automatic arm actuator rejection.\nSensory contact provoked intense discomfort from dissociation with original human flesh.\nPromptly elevated alert protocols and recorded drop in emotional affinity score.',
    ko: '대상(가이 세실)의 집요한 두부 접촉에 대해 완부 구동 액추에이터에 의한 배척 행동이 자동 발동.\n인공 표피 접촉 자극에 대해 생전 육체와의 괴리에서 오는 강한 불쾌감을 감지.\n배척 직후 경계 프로토콜 단계 격상과 정동 스코어 저하가 기록됨.',
  },
  '不要な接触はやめろと言ったはずだ': {
    ja: '不要な接触はやめろと言ったはずだ',
    en: 'I believe I told you to stop unnecessary physical contact.',
    ko: '불필요한 접촉은 그만두라고 말했을 텐데.',
  },
  '・・・・・・機体に触れるな。警告は二度目だぞ': {
    ja: '・・・・・・機体に触れるな。警告は二度目だぞ',
    en: '...Don\'t touch this chassis. That\'s my second warning.',
    ko: '……기체에 손대지 마라. 경고는 두 번째다.',
  },
  '・・・・・・っ！　触るな・・・・・・っ！！': {
    ja: '・・・・・・っ！　触るな・・・・・・っ！！',
    en: '...! Don\'t touch me...!!',
    ko: '……윽! 만지지 마……!!',
  },
  'おい、さっきから何のつもりだ。髪を撫でて何が楽しい': {
    ja: 'おい、さっきから何のつもりだ。髪を撫でて何が楽しい',
    en: 'Hey, what are you trying to pull? What\'s so amusing about patting my hair?',
    ko: '어이, 아까부터 무슨 꿍꿍이야. 머리카락을 쓰다듬어서 뭐가 즐겁다고.',
  },
  'っ・・・・・・おまえは昔から人の頭を勝手にいじる癖があったな': {
    ja: 'っ・・・・・・おまえは昔から人の頭を勝手にいじる癖があったな',
    en: 'Tch... You always had that annoying habit of messing with people\'s heads since back then.',
    ko: '큭…… 넌 옛날부터 남의 머리를 제멋대로 헝클어뜨리는 버릇이 있었지.',
  },
  'これ、おまえを連れ出すときにディストから渡された管理端末なんだよ': {
    ja: 'これ、おまえを連れ出すときにディストから渡された管理端末なんだよ',
    en: 'This is the control terminal Dist gave me when I took you out of the lab.',
    ko: '이거, 널 데리고 나올 때 디스트한테 넘겨받은 관리 단말기야.',
  },
  'おまえが動揺した波形も、内部の記録も全部ここに映ってるぞ': {
    ja: 'おまえが動揺した波形も、内部の記録も全部ここに映ってるぞ',
    en: 'Your flustered waveforms and internal logs are all laid bare right here.',
    ko: '네가 동요한 파형도 내부 기록도 전부 여기에 비치고 있다고.',
  },
  'ディストの奴、そんなものまでおまえに渡しやがったのか・・・・・・！': {
    ja: 'ディストの奴、そんなものまでおまえに渡しやがったのか・・・・・・！',
    en: 'That bastard Dist, he handed you even that...?!',
    ko: '디스트 그 자식, 그런 것까지 네놈한테 넘겨줬단 말이냐……!',
  },
  'おまえがいくら他人のフリをしても、この記録までは誤魔化せない': {
    ja: 'おまえがいくら他人のフリをしても、この記録までは誤魔化せない',
    en: 'No matter how much you play the stranger, you can\'t fake these records.',
    ko: '네가 아무리 남남인 척 굴어도 이 기록까지는 속일 수 없어.',
  },
  '・・・・・・アッシュ、観念しろよ': {
    ja: '・・・・・・アッシュ、観念しろよ',
    en: '...Give it up, Asch.',
    ko: '……애쉬, 체념해.',
  },
  '・・・・・・チッ・・・・・・': {
    ja: '・・・・・・チッ・・・・・・',
    en: '...Tch...',
    ko: '……칫…….',
  },
  'うっかり口を滑らせて言い直した': {
    ja: 'うっかり口を滑らせて言い直した',
    en: 'Accidentally slipped up and corrected himself',
    ko: '무심코 말실수를 하고 다시 고쳐 말했다',
  },
  '答える前に、一瞬だけ顔色が変わった': {
    ja: '答える前に、一瞬だけ顔色が変わった',
    en: 'Expression changed for a split second before answering',
    ko: '대답하기 전에 아주 잠깐 안색이 변했다',
  },
  '思わず『ガイ』と俺の名前を呼んだ': {
    ja: '思わず『ガイ』と俺の名前を呼んだ',
    en: 'Instinctively called my name "Guy"',
    ko: '무심코 "가이"라며 내 이름을 불렀다',
  },
  '声が明らかに上ずっていた': {
    ja: '声が明らかに上ずっていた',
    en: 'Voice was visibly cracked and nervous',
    ko: '목소리가 확연히 떨리고 있었다',
  },
  '・・・・・・もうシラを切るなよ。やっぱりおまえ、アッシュじゃないか。': {
    ja: '・・・・・・もうシラを切るなよ。やっぱりおまえ、アッシュじゃないか。',
    en: '...Stop playing innocent. You really are Asch, aren\'t you?',
    ko: '……더 이상 시치미 떼지 마. 역시 너, 애쉬잖아.',
  },
  '・・・・・・ただの譜業のフリをしてやり過ごすつもりだったんだがな': {
    ja: '・・・・・・ただの譜業のフリをしてやり過ごすつもりだったんだがな',
    en: '...I intended to just play the fonic craft and slip past you all...',
    ko: '……그저 단순한 포업인 척 넘겨버릴 작정이었는데 말이지.',
  },
  'おまえ、さっき途中で言葉を言い直したよな？　本当は『タルロウA』なんかじゃないんだろ': {
    ja: 'おまえ、さっき途中で言葉を言い直したよな？　本当は『タルロウA』なんかじゃないんだろ',
    en: 'You corrected yourself halfway earlier, didn\'t you? You\'re not really \'Tarlow A\'.',
    ko: '너 아까 중간에 말을 고쳐 말했지? 실은 "타르로우 A" 따위가 아닌 거잖아.',
  },
  '・・・・・・言ったはずだ、これ以上鬱陶しい真似をするなら帰るとな！': {
    ja: '・・・・・・言ったはずだ、これ以上鬱陶しい真似をするなら帰るとな！',
    en: '...I told you, if you keep being a nuisance, I\'m going home!',
    ko: '……말했을 텐데, 이 이상 성가시게 굴면 돌아가겠다고!',
  },
  'もう話は終わりだ。俺はディストの研究所へ戻る！': {
    ja: 'もう話は終わりだ。俺はディストの研究所へ戻る！',
    en: 'We\'re done talking. I\'m going back to Dist\'s lab!',
    ko: '이제 대화는 끝이다. 난 디스트의 연구소로 돌아가겠어!',
  },
  'クリックして閉じる': {
    ja: 'クリックして閉じる',
    en: 'Click to close',
    ko: '클릭하여 닫기',
  },
  '注意事項': {
    ja: '注意事項',
    en: 'Important Notices',
    ko: '주의사항',
  },
  'ED後の独自捏造設定': {
    ja: 'ED後の独自捏造設定',
    en: 'Original Post-Ending Lore Concept',
    ko: '엔딩 후 독자 날조 설정',
  },
  'ガイアシュ（恋愛描写なし）': {
    ja: 'ガイアシュ（恋愛描写なし）',
    en: 'Guy & Asch (No romance)',
    ko: '가이애쉬 (연애 묘사 없음)',
  },
  '死亡ルート有り': {
    ja: '死亡ルート有り',
    en: 'Contains death route',
    ko: '사망 루트 있음',
  },
  'このゲームについて': {
    ja: 'このゲームについて',
    en: 'About this game',
    ko: '이 게임에 대하여',
  },
  '実績・記録': {
    ja: '実績・記録',
    en: 'Achievements & Records',
    ko: '도전과제 및 기록',
  },
  '台本一覧に戻ります': {
    ja: '台本一覧に戻ります',
    en: 'Return to Scenario List',
    ko: '대본 목록으로 돌아갑니다',
  },
  'プロローグスチル': {
    ja: 'プロローグスチル',
    en: 'Prologue Still',
    ko: '프롤로그 스틸',
  },
  'THINK // 考える': {
    ja: 'THINK // 考える',
    en: 'THINK // Ponder',
    ko: 'THINK // 생각하기',
  },
  'TALK // アッシュと会話する': {
    ja: 'TALK // アッシュと会話する',
    en: 'TALK // Converse with Asch',
    ko: 'TALK // 애쉬와 대화하기',
  },
  'TALK // タルロウAと会話する': {
    ja: 'TALK // タルロウAと会話する',
    en: 'TALK // Converse with Tarlow A',
    ko: 'TALK // 타르로우 A와 대화하기',
  },
  'セリフログ': {
    ja: 'セリフログ',
    en: 'Dialogue Log',
    ko: '대사 로그',
  },
  'BGM・SEを一括でON/OFF切り替え': {
    ja: 'BGM・SEを一括でON/OFF切り替え',
    en: 'Toggle BGM & SE ON/OFF',
    ko: 'BGM 및 SE 일괄 ON/OFF 전환',
  },
  '説明書': {
    ja: '説明書',
    en: 'Manual',
    ko: '설명서',
  },
  'いつの反応が怪しかった？': {
    ja: 'いつの反応が怪しかった？',
    en: 'Which reaction was suspicious?',
    ko: '어느 반응이 수상했지?',
  },
  'どこでボロが出た？': {
    ja: 'どこでボロが出た？',
    en: 'Where did he slip up?',
    ko: '어디서 꼬리가 밟혔지?',
  },
  'どうする？': {
    ja: 'どうする？',
    en: 'What to do?',
    ko: '어떻게 할까?',
  },
  'どう返す？': {
    ja: 'どう返す？',
    en: 'How to respond?',
    ko: '어떻게 받아칠까?',
  },
  '何について聞く？': {
    ja: '何について聞く？',
    en: 'What to ask about?',
    ko: '무엇에 대해 물을까?',
  },
  '何について話す？': {
    ja: '何について話す？',
    en: 'What to talk about?',
    ko: '무엇에 대해 이야기할까?',
  },
  '[ ◀ 質問を選び直す ]': {
    ja: '[ ◀ 質問を選び直す ]',
    en: '[ ◀ Reselect Question ]',
    ko: '[ ◀ 질문 다시 고르기 ]',
  },
  '[ ◀ 戻る ]': {
    ja: '[ ◀ 戻る ]',
    en: '[ ◀ Back ]',
    ko: '[ ◀ 뒤로 ]',
  },
  '[ ◀ 話題に戻る ]': {
    ja: '[ ◀ 話題に戻る ]',
    en: '[ ◀ Back to Topics ]',
    ko: '[ ◀ 화제로 돌아가기 ]',
  },
  '話を切り上げてアッシュの処遇を決める': {
    ja: '話を切り上げてアッシュの処遇を決める',
    en: 'Conclude conversation and decide Asch\'s fate',
    ko: '이야기를 매듭짓고 애쉬의 처우를 결정한다',
  },
  '[ 話を切り上げる ]': {
    ja: '[ 話を切り上げる ]',
    en: '[ Conclude Talk ]',
    ko: '[ 이야기 마무리하기 ]',
  },
  '次のページへ切り替え': {
    ja: '次のページへ切り替え',
    en: 'Switch to next page',
    ko: '다음 페이지로 전환',
  },
  '[ ▶ 他の返答 ]': {
    ja: '[ ▶ 他の返答 ]',
    en: '[ ▶ Other Responses ]',
    ko: '[ ▶ 다른 대답 ]',
  },
  '[ ▶ 他の話題 ]': {
    ja: '[ ▶ 他の話題 ]',
    en: '[ ▶ Other Topics ]',
    ko: '[ ▶ 다른 화제 ]',
  },
  'さっきの質問のとき': {
    ja: 'さっきの質問のとき',
    en: 'During the question earlier',
    ko: '아까 질문했을 때',
  },
  'アッシュの頭部を触る': {
    ja: 'アッシュの頭部を触る',
    en: 'Touch Asch\'s head',
    ko: '애쉬의 머리를 만진다',
  },
  '思考支援：手持ちで組み合わせ不可能な単語を取り消し線で表示': {
    ja: '思考支援：手持ちで組み合わせ不可能な単語を取り消し線で表示',
    en: 'Thinking Support: Cross out uncombinable words',
    ko: '사고 지원: 보유 중 조합 불가능한 단어를 취소선으로 표시',
  },
  '思考支援:': {
    ja: '思考支援:',
    en: 'Thinking Support:',
    ko: '사고 지원:',
  },
  '対話画面に戻る': {
    ja: '対話画面に戻る',
    en: 'Return to dialogue screen',
    ko: '대화 화면으로 돌아가기',
  },
  '対話に戻る': {
    ja: '対話に戻る',
    en: 'Return to dialogue',
    ko: '대화로 돌아가기',
  },
  '思考整理（考える）画面を開く': {
    ja: '思考整理（考える）画面を開く',
    en: 'Open contemplation (thinking) screen',
    ko: '사고 정리(생각하기) 화면 열기',
  },
  '考える': {
    ja: '考える',
    en: 'Think',
    ko: '생각하기',
  },
  '新しいひらめきが可能です！': {
    ja: '新しいひらめきが可能です！',
    en: 'A new insight is ready!',
    ko: '새로운 번뜩임이 가능합니다!',
  },
  '思考中は管理端末を開けません': {
    ja: '思考中は管理端末を開けません',
    en: 'Cannot open terminal while contemplating',
    ko: '생각하는 동안에는 관리 단말기를 열 수 없습니다',
  },
  '［選択中］': {
    ja: '［選択中］',
    en: '[Selected]',
    ko: '[선택 중]',
  },
  '手がかり 1': {
    ja: '手がかり 1',
    en: 'Clue 1',
    ko: '단서 1',
  },
  '手がかり 2': {
    ja: '手がかり 2',
    en: 'Clue 2',
    ko: '단서 2',
  },
  '思考中…': {
    ja: '思考中…',
    en: 'Pondering...',
    ko: '생각 중…',
  },
  'スロットをクリア': {
    ja: 'スロットをクリア',
    en: 'Clear slots',
    ko: '슬롯 지우기',
  },
  'クリックでスロットをリセット': {
    ja: 'クリックでスロットをリセット',
    en: 'Click to reset slots',
    ko: '클릭하여 슬롯 리셋',
  },
  '閉じる': {
    ja: '閉じる',
    en: 'Close',
    ko: '닫기',
  },
  '深層記憶': {
    ja: '深層記憶',
    en: 'Deep Memory',
    ko: '심층 기억',
  },
  'すべて': {
    ja: 'すべて',
    en: 'All',
    ko: '전체',
  },
  'MC:機体ログ': {
    ja: 'MC:機体ログ',
    en: 'MC: Chassis Log',
    ko: 'MC: 기체 로그',
  },
  'EM:情動反応': {
    ja: 'EM:情動反応',
    en: 'EM: Emotional Response',
    ko: 'EM: 정동 반응',
  },
  'DP:深層記憶': {
    ja: 'DP:深層記憶',
    en: 'DP: Deep Memory',
    ko: 'DP: 심층 기억',
  },
  '【PROTECTED】プロテクトが施されています。長押しで強制解除できます。': {
    ja: '【PROTECTED】プロテクトが施されています。長押しで強制解除できます。',
    en: '[PROTECTED] Security lock active. Hold to force override.',
    ko: '【PROTECTED】프로텍트가 걸려 있습니다. 길게 눌러 강제 해제할 수 있습니다.',
  },
  '前のページ': {
    ja: '前のページ',
    en: 'Previous page',
    ko: '이전 페이지',
  },
  '次のページ': {
    ja: '次のページ',
    en: 'Next page',
    ko: '다음 페이지',
  },
  '該当する記録はまだありません': {
    ja: '該当する記録はまだありません',
    en: 'No matching records found yet',
    ko: '해당하는 기록이 아직 없습니다',
  },
  '長押ししてプロテクトを解除': {
    ja: '長押ししてプロテクトを解除',
    en: 'Hold to unlock security protect',
    ko: '길게 눌러 프로텍트 해제',
  },
  'DIALOGUE LOG // 対話履歴': {
    ja: 'DIALOGUE LOG // 対話履歴',
    en: 'DIALOGUE LOG // Conversation History',
    ko: 'DIALOGUE LOG // 대화 기록',
  },
  '履歴はまだありません。': {
    ja: '履歴はまだありません。',
    en: 'No history yet.',
    ko: '기록이 아직 없습니다.',
  },

  '元気にやってるみたいだぜ': {
    ja: '元気にやってるみたいだぜ',
    en: "Seems like they're doing well",
    ko: '잘 지내고 있는 모양이야',
  },
  '・・・・・・': {
    ja: '・・・・・・',
    en: '......',
    ko: '……',
  },
  '『鮮血のアッシュ』の噂': {
    ja: '『鮮血のアッシュ』の噂',
    en: 'Rumors of "Asch the Bloody"',
    ko: '"선혈의 애쉬"의 소문',
  },
  '端末': {
    ja: '端末',
    en: 'Terminal',
    ko: '단말기',
  },
  '・・・・・・ふん': {
    ja: '・・・・・・ふん',
    en: '...Hmph',
    ko: '……흥',
  },
  '・・・・・・っ！？': {
    ja: '・・・・・・っ！？',
    en: '...?!',
    ko: '……윽?!',
  },
  'やけに早口で言い返した': {
    ja: 'やけに早口で言い返した',
    en: 'Retorted suspiciously fast',
    ko: '유난히 빠른 말투로 말대꾸했다',
  },
  'タルロウにしては口調が違いすぎる': {
    ja: 'タルロウにしては口調が違いすぎる',
    en: 'Tone is far too different for Tarlow',
    ko: '타르로우치고는 말투가 너무 다르다',
  },
  '・・・・・・っ！': {
    ja: '・・・・・・っ！',
    en: '...!',
    ko: '……윽!',
  },
  '管理端末': {
    ja: '管理端末',
    en: 'Management Terminal',
    ko: '관리 단말기',
  },
  'アッシュ': {
    ja: 'アッシュ',
    en: 'Asch',
    ko: '애쉬',
  },
  'ガイ': {
    ja: 'ガイ',
    en: 'Guy',
    ko: '가이',
  },
  'ディスト': {
    ja: 'ディスト',
    en: 'Dist',
    ko: '디스트',
  },

  // === Ending Titles & Subtitles ===
  'END 03 // また気が向いたら': {
    ja: 'END 03 // また気が向いたら',
    en: 'END 03 // See You Around',
    ko: 'END 03 // 다시 생각나면',
  },
  'END 04 // たまにはゆっくり': {
    ja: 'END 04 // たまにはゆっくり',
    en: 'END 04 // Take It Easy for Once',
    ko: 'END 04 // 가끔은 편히',
  },
  'END 05 // 一旦そういうことで': {
    ja: 'END 05 // 一旦そういうことで',
    en: 'END 05 // Asch for Now',
    ko: 'END 05 // 일단 그런 걸로',
  },
  'END 06 // そういうことにした': {
    ja: 'END 06 // そういうことにした',
    en: 'END 06 // Left It at That',
    ko: 'END 06 // 그렇게 하기로 했다',
  },
  'END 07 // 何も言えなかった': {
    ja: 'END 07 // 何も言えなかった',
    en: "END 07 // Couldn't Say a Word",
    ko: 'END 07 // 아무 말도 할 수 없었다',
  },
  'END 08a // これで全部うまくいく': {
    ja: 'END 08a // これで全部うまくいく',
    en: 'END 08a // Everything Will Be Fine',
    ko: 'END 08a // 이걸로 다 잘될 거야',
  },
  'END 08b // これで全部うまくいく': {
    ja: 'END 08b // これで全部うまくいく',
    en: 'END 08b // Everything Will Be Fine',
    ko: 'END 08b // 이걸로 다 잘될 거야',
  },
  'END 09 // これで全部元通り': {
    ja: 'END 09 // これで全部元通り',
    en: 'END 09 // Everything Back to Normal',
    ko: 'END 09 // 이걸로 전부 원래대로',
  },
  'END 10 // 魂の容れ物': {
    ja: 'END 10 // 魂の容れ物',
    en: 'END 10 // Vessel of the Soul',
    ko: 'END 10 // 영혼의 그릇',
  },
  'CASUAL END // SEE YOU AROUND': {
    ja: 'CASUAL END // SEE YOU AROUND',
    en: 'CASUAL END // SEE YOU AROUND',
    ko: 'CASUAL END // SEE YOU AROUND',
  },
  'CASUAL END // GOODNIGHT FOR NOW': {
    ja: 'CASUAL END // GOODNIGHT FOR NOW',
    en: 'CASUAL END // GOODNIGHT FOR NOW',
    ko: 'CASUAL END // GOODNIGHT FOR NOW',
  },
  'PHASE 3 END // ASCH FOR NOW': {
    ja: 'PHASE 3 END // ASCH FOR NOW',
    en: 'PHASE 3 END // ASCH FOR NOW',
    ko: 'PHASE 3 END // ASCH FOR NOW',
  },
  'PHASE 3 END // KIND ENOUGH TO LIE': {
    ja: 'PHASE 3 END // KIND ENOUGH TO LIE',
    en: 'PHASE 3 END // KIND ENOUGH TO LIE',
    ko: 'PHASE 3 END // KIND ENOUGH TO LIE',
  },
  'PHASE 3 END // BETTER LEFT UNSAID': {
    ja: 'PHASE 3 END // BETTER LEFT UNSAID',
    en: 'PHASE 3 END // BETTER LEFT UNSAID',
    ko: 'PHASE 3 END // BETTER LEFT UNSAID',
  },
  'SECRET END // LET IT BE UNSAID': {
    ja: 'SECRET END // LET IT BE UNSAID',
    en: 'SECRET END // LET IT BE UNSAID',
    ko: 'SECRET END // LET IT BE UNSAID',
  },
  'DEAD END // NOTHING HAPPENED HERE': {
    ja: 'DEAD END // NOTHING HAPPENED HERE',
    en: 'DEAD END // NOTHING HAPPENED HERE',
    ko: 'DEAD END // NOTHING HAPPENED HERE',
  },
  'Ghost in the mASCHine': {
    ja: 'Ghost in the mASCHine',
    en: 'Ghost in the mASCHine',
    ko: 'Ghost in the mASCHine',
  },

  // === Ending Summary Texts ===
  '『俺はタルロウAだ』という演技を見抜けないまま対話を終えた。どこか人間くさい反応に引っかかりを覚えつつも、彼はそのままディストの研究所へと戻っていった': {
    ja: '『俺はタルロウAだ』という演技を見抜けないまま対話を終えた。どこか人間くさい反応に引っかかりを覚えつつも、彼はそのままディストの研究所へと戻っていった',
    en: 'The dialogue ended without seeing through his "I am Tarlow A" act. Despite lingering doubts about his oddly human-like reactions, he returned to Dist\'s laboratory as he was.',
    ko: '「나는 타로우 A다」라는 연기를 간파하지 못한 채 대화를 마쳤다. 어딘가 인간다운 반응에 미심쩍음을 느끼면서도, 그는 그대로 디스트의 연구소로 돌아갔다.',
  },
  'タルロウAの偽装を暴き、中身がアッシュ本人であることは確かめられたものの、怒らせて帰られてしまった': {
    ja: 'タルロウAの偽装を暴き、中身がアッシュ本人であることは確かめられたものの、怒らせて帰られてしまった',
    en: "Though Tarlow A's disguise was exposed and his identity as Asch was confirmed, he left in a fury.",
    ko: '타로우 A의 위장을 밝혀내고 속 내용물이 애쉬 본인임을 확인했으나, 화나게 만들어 가 버리고 말았다.',
  },
  '正体がアッシュであることを確かめ、穏やかに雑談を交わして送り出した。深い事情には踏み込まないまま、秘密の共有者として静かに見送った': {
    ja: '正体がアッシュであることを確かめ、穏やかに雑談を交わして送り出した。深い事情には踏み込まないまま、秘密の共有者として静かに見送った',
    en: 'Confirmed his true identity as Asch and saw him off after a quiet conversation. Without prying into deeper truths, parted ways in silent solidarity.',
    ko: '정체가 애쉬임을 확인하고 온화하게 담소를 나눈 뒤 배웅했다. 깊은 사정에는 파고들지 않은 채, 비밀의 공유자로서 조용히 떠나보냈다.',
  },
  '無理に深い事情を問い詰めることも研究所へ送り返すこともせず、この部屋で休んでいくよう声をかけた。静かな部屋のソファで、彼は穏やかに目を閉じた': {
    ja: '無理に深い事情を問い詰めることも研究所へ送り返すこともせず、この部屋で休んでいくよう声をかけた。静かな部屋のソファで、彼は穏やかに目を閉じた',
    en: 'Without pressing for answers or sending him back to the lab, offered him rest here. On the sofa in the quiet room, he peacefully closed his eyes.',
    ko: '무리하게 깊은 사정을 추궁하거나 연구소로 돌려보내지 않고, 이 방에서 쉬어가라 권했다. 조용한 방 소파에서, 그는 온화하게 눈을 감았다.',
  },
  '身体が譜業であっても「おまえはおまえだ、一旦アッシュってことで」と笑い飛ばした。これ以上の理屈など必要なく、「またな」と去っていく背中を穏やかに見送った': {
    ja: '身体が譜業であっても「おまえはおまえだ、一旦アッシュってことで」と笑い飛ばした。これ以上の理屈など必要なく、「またな」と去っていく背中を穏やかに見送った',
    en: 'Even in a fontech body, laughed it off: "You\'re just you—Asch for now." Without needing further rationale, watched him leave with a gentle "See ya."',
    ko: '몸이 포업이라도 「너는 너야, 일단 애쉬인 걸로」라며 웃어넘겼다. 더 이상의 논리는 필요 없이, 「또 보자」며 떠나가는 뒷모습을 온화하게 지켜보았다.',
  },
  '譜業人形だと告げられ、アッシュは「タルロウA」として去っていった。あいつのしたいようにやらせてやるのが一番なんだと自分に言い聞かせることしか、できなかった': {
    ja: '譜業人形だと告げられ、アッシュは「タルロウA」として去っていった。あいつのしたいようにやらせてやるのが一番なんだと自分に言い聞かせることしか、できなかった',
    en: 'Told he was a fontech automaton, Asch departed as "Tarlow A." The only thing left was convincing oneself that letting him do as he wished was best.',
    ko: '포업 인형이란 말을 듣고 애쉬는 「타로우 A」로서 떠나갔다. 녀석이 하고 싶은 대로 하게 두는 게 최선이라 스스로를 타이르는 것밖에 할 수 없었다.',
  },
  '最後の問いかけに答えられないまま沈黙し、アッシュは部屋を出ていった。翌日研究所を訪ねたが彼の姿はなく、手元には管理端末だけが残された': {
    ja: '最後の問いかけに答えられないまま沈黙し、アッシュは部屋を出ていった。翌日研究所を訪ねたが彼の姿はなく、手元には管理端末だけが残された',
    en: 'Remaining silent before his final question, Asch left the room. Visiting the laboratory the next day, there was no sign of him, leaving only the management terminal behind.',
    ko: '마지막 질문에 답하지 못한 채 침묵했고, 애쉬는 방을 나섰다. 다음 날 연구소를 찾아갔으나 녀석의 모습은 없었고, 손에는 관리 단말기만이 남겨졌다.',
  },
  '肉体の秘密を知りながらも真実を口にせず、もう一杯の茶を淹れた。真実を胸の奥にしまい込み、あいつと生きる平穏な日常を守ることを選んだ': {
    ja: '肉体の秘密を知りながらも真実を口にせず、もう一杯の茶を淹れた。真実を胸の奥にしまい込み、あいつと生きる平穏な日常を守ることを選んだ',
    en: 'Knowing the secret of his physical form yet uttering not a word, brewed another cup of tea. Locking the truth deep within, chose to protect a peaceful everyday life together.',
    ko: '육체의 비밀을 알면서도 진실을 입에 담지 않고, 차 한 잔을 더 우렸다. 진실을 가슴속 깊이 묻어두고, 녀석과 살아갈 평온한 일상을 지키기를 택했다.',
  },
  '肉体の秘密を知りながらも真実を口にせず、研究所へ戻るあいつの背中を静かに見送った。バチカルの日常とあいつの日常、その両方を守るため、真実を胸の奥にしまい込むことを選んだ': {
    ja: '肉体の秘密を知りながらも真実を口にせず、研究所へ戻るあいつの背中を静かに見送った。バチカルの日常とあいつの日常、その両方を守るため、真実を胸の奥にしまい込むことを選んだ',
    en: 'Knowing the truth yet remaining silent, quietly watched him return to the lab. To preserve both everyday life in Baticul and his life, chose to bury the truth in silence.',
    ko: '육체의 비밀을 알면서도 진실을 입에 담지 않고, 연구소로 돌아가는 녀석의 뒷모습을 조용히 지켜보았다. 바티칼의 일상과 녀석의 일상, 그 둘 모두를 지키기 위해 진실을 가슴속에 묻어두기를 택했다.',
  },
  '秘密を問い詰めることなく、動かなくなった機体をただ見下ろした。今バチカルにいるルークの日常を守るため、今日の記憶を自分だけの胸に葬り去った': {
    ja: '秘密を問い詰めることなく、動かなくなった機体をただ見下ろした。今バチカルにいるルークの日常を守るため、今日の記憶を自分だけの胸に葬り去った',
    en: "Without demanding answers, simply looked down at the lifeless chassis. To protect the peaceful days Luke now lives in Baticul, buried today's memories in solitary silence.",
    ko: '비밀을 추궁하지 않고, 움직이지 않게 된 기체를 그저 내려다보았다. 지금 바티칼에 있는 루크의 일상을 지키기 위해, 오늘의 기억을 홀로 가슴속에 묻었다.',
  },
  'きっとあいつは誰かに認められたかったはずなのに、ガイは自分のためだけにあいつ自身に「アッシュ」と言わせてしまった。皆が涙を流して再会を喜ぶ中、何度自分に言い聞かせても、脳裏からはあの記録の文字が離れなかった': {
    ja: 'きっとあいつは誰かに認められたかったはずなのに、ガイは自分のためだけにあいつ自身に「アッシュ」と言わせてしまった。皆が涙を流して再会を喜ぶ中、何度自分に言い聞かせても、脳裏からはあの記録の文字が離れなかった',
    en: 'Surely he had longed for someone to acknowledge him, yet Guy forced him to call himself "Asch" purely for his own sake. Amid everyone\'s tearful joy at reuniting, no matter how many times he rationalized it, the words from that log refused to leave his mind.',
    ko: '분명 녀석은 누군가에게 인정받고 싶었을 텐데, 가이는 오직 자신만을 위해 녀석 스스로에게 「애쉬」라고 말하게 하고 말았다. 모두가 눈물을 흘리며 재회를 기뻐하는 가운데, 몇 번을 되뇌어도 뇌리에서는 그 기록의 문자가 떠나지 않았다.',
  },

  // === Ending Dialogue Monologues & Multi-lines ===
  'ただの譜業にしちゃ、妙に態度が人間臭かった気もするけど・・・・・・': {
    ja: 'ただの譜業にしちゃ、妙に態度が人間臭かった気もするけど・・・・・・',
    en: 'For a simple fontech automaton, his attitude felt oddly human...',
    ko: '단순한 포업치고는 묘하게 태도가 인간다웠던 것 같기도 하지만……',
  },
  'まあ、気のせいか': {
    ja: 'まあ、気のせいか',
    en: 'Well, must just be my imagination.',
    ko: '뭐, 기분 탓인가.',
  },
  'あんな風に突っ撥ねるところはどう見てもアッシュなんだけど・・・・・・': {
    ja: 'あんな風に突っ撥ねるところはどう見てもアッシュなんだけど・・・・・・',
    en: 'The way he lashed out and stormed off was undeniably Asch, though...',
    ko: '저렇게 퉁명스럽게 내치는 건 아무리 봐도 애쉬인데……',
  },
  'もう少し落ち着いて話せばよかったな': {
    ja: 'もう少し落ち着いて話せばよかったな',
    en: "I should've spoken to him a bit more calmly.",
    ko: '조금 더 차분하게 이야기할걸 그랬나.',
  },
  '翌日、研究所に出向いたが、奴の姿はなかった。': {
    ja: '翌日、研究所に出向いたが、奴の姿はなかった。',
    en: 'I visited the lab the next day, but there was no sign of him.',
    ko: '다음 날, 연구소를 찾아갔으나 녀석의 모습은 없었다.',
  },
  '残ったのは、この管理端末だけだ': {
    ja: '残ったのは、この管理端末だけだ',
    en: 'All that remained was this management terminal.',
    ko: '남은 것은 이 관리 단말기뿐이다.',
  },
  'きっとあいつは誰かに「アッシュ」だと': {
    ja: 'きっとあいつは誰かに「アッシュ」だと',
    en: 'Surely he wanted someone to recognize him',
    ko: '분명 녀석은 누군가에게 「애쉬」라고',
  },
  '認められたかったんだろう': {
    ja: '認められたかったんだろう',
    en: 'as "Asch."',
    ko: '인정받고 싶었겠지.',
  },
  'それを、俺は、俺のためだけに': {
    ja: 'それを、俺は、俺のためだけに',
    en: 'And yet, solely for my own peace of mind,',
    ko: '그것을 나는, 오직 나만을 위해',
  },
  'あいつ自身に「アッシュ」だと言わせてしまった': {
    ja: 'あいつ自身に「アッシュ」だと言わせてしまった',
    en: 'I made him proclaim himself "Asch."',
    ko: '녀석 스스로에게 「애쉬」라고 말하게 하고 말았다.',
  },
  '先日、皆に会いに行ったようだ': {
    ja: '先日、皆に会いに行ったようだ',
    en: 'He seems to have gone to see everyone recently.',
    ko: '얼마 전, 모두를 만나러 갔던 모양이다.',
  },
  'ルークも、ナタリアも・・・・・・皆泣いて喜んだらしい': {
    ja: 'ルークも、ナタリアも・・・・・・皆泣いて喜んだらしい',
    en: 'Luke, Natalia... they all wept with joy, I heard.',
    ko: '루크도, 나탈리아도…… 모두 울며 기뻐했다고 한다.',
  },
  '何度、自分にそう言い聞かせても': {
    ja: '何度、自分にそう言い聞かせても',
    en: 'No matter how many times I tell myself it was right,',
    ko: '몇 번이고 스스로에게 그렇게 타이르고 있어도,',
  },
  'あの記録の文字が、頭にこびりついて離れない': {
    ja: 'あの記録の文字が、頭にこびりついて離れない',
    en: 'those written words from that log remain burned into my mind.',
    ko: '그 기록의 문자가 머리에 달라붙어 떨어지지 않는다.',
  },
  'そうだ。それできっと、全部うまくいく': {
    ja: 'そうだ。それできっと、全部うまくいく',
    en: 'Right. That way, surely everything will turn out fine.',
    ko: '그래. 그러면 분명, 전부 잘될 거야.',
  },

  // === Ending Extra Exchanges & Split Lines ===
  '・・・・・・今日、おまえと話せてよかったよ。\nおまえの事情も分かったから、誰にも言わずにおく。気が向いたら、またいつでも顔を出せよ': {
    ja: '・・・・・・今日、おまえと話せてよかったよ。\nおまえの事情も分かったから、誰にも言わずにおく。気が向いたら、またいつでも顔を出せよ',
    en: "...I'm glad I got to talk with you today.\nI understand your circumstances now, so I won't tell a soul. Feel free to drop by whenever you like.",
    ko: '……오늘, 너랑 이야기해서 좋았어.\n네 사정도 알았으니, 아무에게도 말하지 않을게. 생각나면 언제든 또 들러.',
  },
  'おまえの事情も分かったから、誰にも言わずにおく。気が向いたら、またいつでも顔を出せよ': {
    ja: 'おまえの事情も分かったから、誰にも言わずにおく。気が向いたら、またいつでも顔を出せよ',
    en: "I understand your circumstances now, so I won't tell a soul. Feel free to drop by whenever you like.",
    ko: '네 사정도 알았으니, 아무에게도 말하지 않을게. 생각나면 언제든 또 들러.',
  },

  // === Phase 2 Deep/Past Topics Individual Lines ===
  'エルドラントから1年前まで・・・・・・その2年間だけ抜けているのは、': {
    ja: 'エルドラントから1年前まで・・・・・・その2年間だけ抜けているのは、',
    en: 'From Eldrant until one year ago... With those two years missing,',
    ko: '엘드란트부터 1년 전까지…… 그 2년만 빠져 있는 건,',
  },
  'ディストにロックをかけられているんじゃないか？': {
    ja: 'ディストにロックをかけられているんじゃないか？',
    en: 'Has Dist locked those memories away from you?',
    ko: '디스트가 잠금을 걸어둔 거 아냐?',
  },
  'さっきは興味がないって言っていたけど、': {
    ja: 'さっきは興味がないって言っていたけど、',
    en: "You claimed you didn't care earlier, but",
    ko: '아깐 관심 없다고 했지만,',
  },
  '・・・・・・ち、違う、あれは上の棚の資料を確認していただけだ！': {
    ja: '・・・・・・ち、違う、あれは上の棚の資料を確認していただけだ！',
    en: '...N-No! I was simply checking references on the upper shelf!',
    ko: '……아, 아냐! 그건 위쪽 선반의 자료를 확인하고 있었을 뿐이다!',
  },
  'なになに・・・・・・？': {
    ja: 'なになに・・・・・・？',
    en: "What's this...?",
    ko: '어디 보자……?',
  },
  '部屋の隅に立ったあと、今の身体じゃ丸見えだって気づいて、慌てて隠れ場所を探しかけた・・・・・・': {
    ja: '部屋の隅に立ったあと、今の身体じゃ丸見えだって気づいて、慌てて隠れ場所を探しかけた・・・・・・',
    en: 'After freezing in the corner, you realized this body was in plain view and frantically scrambled for cover...',
    ko: '방 구석에 선 뒤 지금 몸으론 훤히 다 보인다는 걸 깨닫고 허겁지겁 숨을 곳을 찾으려 했다……',
  },
  '・・・・・・研究所で俺たちに声をかけなかったのも、': {
    ja: '・・・・・・研究所で俺たちに声をかけなかったのも、',
    en: '...Was avoiding speaking to us at the lab',
    ko: '……연구소에서 우리한테 말을 걸지 않은 것도',
  },
  '大佐に勘付かれたくなかったからか？': {
    ja: '大佐に勘付かれたくなかったからか？',
    en: "also because you didn't want the Colonel noticing?",
    ko: '대령한테 들키기 싫어서였어?',
  },
  '応答波形ログ（ルークをモデルに造ったのか聞いたとき）': {
    ja: '応答波形ログ（ルークをモデルに造ったのか聞いたとき）',
    en: 'Response Waveform Log (When asked if modeled on Luke)',
    ko: '응답 파형 로그 (루크를 모델로 제작되었는지 물었을 때)',
  },
  '応答波形ログ（ディストを尊敬しているのか聞いたとき）': {
    ja: '応答波形ログ（ディストを尊敬しているのか聞いたとき）',
    en: 'Response Waveform Log (When asked if respecting Dist)',
    ko: '응답 파형 로그 (디스트를 존경하는지 물었을 때)',
  },
  '応答波形ログ（不意に頭へ手を伸ばしたとき）': {
    ja: '応答波形ログ（不意に頭へ手を伸ばしたとき）',
    en: 'Response Waveform Log (When reaching for his head)',
    ko: '응답 파형 로그 (불시에 머리로 손을 뻗었을 때)',
  },
  '応答波形ログ（『宝刀ガルディオス』を見せたとき）': {
    ja: '応答波形ログ（『宝刀ガルディオス』を見せたとき）',
    en: 'Response Waveform Log (When showing the Treasure Sword Gardios)',
    ko: '응답 파형 로그 (『보도 갈디우스』를 보여주었을 때)',
  },
  '応答波形ログ（ナタリアの話を振ったとき）': {
    ja: '応答波形ログ（ナタリアの話を振ったとき）',
    en: 'Response Waveform Log (When bringing up Natalia)',
    ko: '응답 파형 로그 (나탈리아 이야기를 꺼냈을 때)',
  },
  '応答波形ログ（ブウサギの『アッシュ』の話をしたとき）': {
    ja: '応答波形ログ（ブウサギの『アッシュ』の話をしたとき）',
    en: 'Response Waveform Log (When mentioning the rappig "Asch")',
    ko: '응답 파형 로그 (부우토끼 『애쉬』 이야기를 했을 때)',
  },
  '応答波形ログ（食事に誘ったとき）': {
    ja: '応答波形ログ（食事に誘ったとき）',
    en: 'Response Waveform Log (When inviting him to a meal)',
    ko: '응답 파형 로그 (식사에 초대했을 때)',
  },
  '応答波形ログ（『鮮血のアッシュ』の噂話をしたとき）': {
    ja: '応答波形ログ（『鮮血のアッシュ』の噂話をしたとき）',
    en: 'Response Waveform Log (When discussing rumors of "Asch the Bloody")',
    ko: '응답 파형 로그 (『선혈의 애쉬』 소문을 이야기했을 때)',
  },
  '応答波形ログ（タルロウXの語尾のことを聞いたとき）': {
    ja: '応答波形ログ（タルロウXの語尾のことを聞いたとき）',
    en: 'Response Waveform Log (When asked about Tarlow X\'s verbal tic)',
    ko: '응답 파형 로그 (타루로우 X의 말버릇을 물었을 때)',
  },
  '応答波形ログ（部屋の隅で何をしていたのか聞いたとき）': {
    ja: '応答波形ログ（部屋の隅で何をしていたのか聞いたとき）',
    en: 'Response Waveform Log (When asked what he was doing in the room corner)',
    ko: '응답 파형 로그 (방구석에서 무엇을 하고 있었는지 물었을 때)',
  },
};

export function getLocalizedDialogue(text: string, lang: Language): string {
  if (lang === 'ja' || !text) return text;
  const trimmed = text.trim();
  const directMatch = DIALOGUE_TRANSLATIONS[trimmed]?.[lang];
  if (directMatch) return directMatch;

  // 応答波形ログ（...）の動的パターンマッチ
  const slipMatch = trimmed.match(/^応答波形ログ（(.+)）$/);
  if (slipMatch) {
    const inner = slipMatch[1];
    const transInner = getLocalizedDialogue(inner, lang);
    if (lang === 'en') return `Response Waveform Log (${transInner})`;
    if (lang === 'ko') return `응답 파형 로그 (${transInner})`;
  }

  // 改行や句読点の微小な差異を吸収
  for (const [key, val] of Object.entries(DIALOGUE_TRANSLATIONS)) {
    if (trimmed === key.trim()) {
      return val[lang] || text;
    }
  }

  // 複数行テキストで全体一致しなかった場合、各行を個別に翻訳して再構成を試みる
  if (trimmed.includes('\n')) {
    const lines = trimmed.split('\n');
    let hasTranslation = false;
    const translated = lines.map((line) => {
      const t = line.trim();
      if (!t) return line;
      const res = getLocalizedDialogue(t, lang);
      if (res !== t) hasTranslation = true;
      return res;
    });
    if (hasTranslation) {
      return translated.join('\n');
    }
  }

  // 複数行で登録されているテキストの個別行とのマッチング（.split('\n') されて呼び出された場合）
  for (const [key, val] of Object.entries(DIALOGUE_TRANSLATIONS)) {
    if (key.includes('\n')) {
      const keyLines = key.split('\n').map((s) => s.trim()).filter(Boolean);
      const matchIdx = keyLines.findIndex((l) => l === trimmed);
      if (matchIdx !== -1) {
        const transLines = (val[lang] || '').split('\n').map((s) => s.trim()).filter(Boolean);
        if (transLines[matchIdx]) {
          return transLines[matchIdx];
        }
      }
    }
  }

  return text;
}

