/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../utils/i18n';

export interface KeywordTranslation {
  label: Record<Language, string>;
  thought: Record<Language, string>;
}

export interface RecipeTranslation {
  label: Record<Language, string>;
  epiphany: Record<Language, string>;
}

export const KEYWORD_TRANSLATIONS: Record<string, KeywordTranslation> = {
  kw_tarlow_a: {
    label: {
      ja: 'タルロウA',
      en: 'Tarlow A',
      ko: '타르로우 A',
    },
    thought: {
      ja: 'あれが、あいつだったのか・・・・・・？\n何度も見かけたはずだが、全然気づかなかったな',
      en: 'That was him all along...? I must have passed by dozens of times without realizing.',
      ko: '저게, 그 녀석이었던 건가......?\n몇 번이고 마주쳤을 텐데 전혀 눈치채지 못했어.',
    },
  },
  kw_height_10yo: {
    label: {
      ja: '今の機体',
      en: 'Current Unit',
      ko: '현재 기체',
    },
    thought: {
      ja: 'どう見ても10歳前後の背丈だ・・・・・・。\nあいつが誘拐された、あの頃と同じ姿をしてる',
      en: "No matter how you look at it, he has the build of a 10-year-old... Just like the day he was kidnapped.",
      ko: '어딜 봐도 10살 안팎의 체구야...... 납치당했던 그 시절 모습 그대로야.',
    },
  },
  kw_sword_limiter: {
    label: {
      ja: '出力制限',
      en: 'Output Limiter',
      ko: '출력 제한',
    },
    thought: {
      ja: '四肢の出力が18%に抑えられてる・・・・・・。\nこれじゃあ剣を握るどころか、まともに走ることすらできねえな',
      en: "His limb output is capped at 18%... At this rate, he can't even run properly, let alone hold a sword.",
      ko: '사지 출력이 18%로 억제되어 있어...... 이래선 검을 쥐기는커녕 제대로 달릴 수도 없겠어.',
    },
  },
  kw_apron: {
    label: {
      ja: 'エプロン',
      en: 'Apron',
      ko: '앞치마',
    },
    thought: {
      ja: 'タルロウ用のお手伝いエプロン・・・・・・。\nあいつ、まさか本当にこれを着せられてたのか？',
      en: "A helper apron for a Tarlow unit... Did Dist seriously make him wear this?",
      ko: '타르로우용 도우미 앞치마...... 설마 그 녀석, 진짜 이걸 입었던 건가?',
    },
  },
  kw_zura_speech: {
    label: {
      ja: '語尾',
      en: 'Verbal Tic',
      ko: '말끝 어미',
    },
    thought: {
      ja: 'タルロウ共通の『〜ズラ』って語尾設定・・・・・・。\n入力しようとしたディストを、コンソールごとぶん殴ったらしいな',
      en: "The standard '~zura' speech filter for Tarlow models... Sounds like he smashed the console when Dist tried to install it.",
      ko: '타르로우 공통의 『~즈라』 어미 설정...... 설치하려던 디스트를 콘솔째 때려눕힌 모양이군.',
    },
  },
  kw_step_stool: {
    label: {
      ja: '踏み台',
      en: 'Step Stool',
      ko: '디딤대',
    },
    thought: {
      ja: '高い棚の本に手が届かなくて、踏み台を探してた記録がある。\n不便そうにしてるあいつの姿が、妙に目に浮かぶぜ',
      en: "There's a log of him looking for a step stool to reach high shelves. I can vividly picture him struggling with it.",
      ko: '높은 선반에 손이 닿지 않아 디딤대를 찾던 기록이 있어. 끙끙대던 그 녀석 모습이 눈에 선하네.',
    },
  },
  kw_lab: {
    label: {
      ja: '研究所',
      en: 'Laboratory',
      ko: '연구소',
    },
    thought: {
      ja: 'ディストの研究施設・・・・・・。\n外の世界から隔絶された場所で、あいつは何を思って過ごしてたんだ？',
      en: "Dist's research lab... Isolated from the outside world, what was going through his mind all that time?",
      ko: '디스트의 연구시설...... 바깥세상과 단절된 곳에서, 녀석은 무슨 생각을 하며 지냈을까?',
    },
  },
  kw_chassis_swap: {
    label: {
      ja: '機体換装',
      en: 'Chassis Swap',
      ko: '기체 환장',
    },
    thought: {
      ja: '最初は丸っこいタルロウの姿だったのが、今の機体に移されたのか。\nディストなりの配慮・・・・・・いや、執着の結果か',
      en: "He started inside a round little Tarlow chassis before being moved to this one... Dist's twisted consideration, or pure obsession?",
      ko: '처음엔 둥글넙적한 타르로우 모습이었다가 지금의 기체로 옮겨진 건가. 디스트 나름의 배려였을까, 아니면 집착의 결과였을까.',
    },
  },
  kw_blank_2years: {
    label: {
      ja: '空白の2年',
      en: 'Blank 2 Years',
      ko: '공백의 2년',
    },
    thought: {
      ja: 'あいつがエルドラントで消えてから、研究所で目覚めるまでの2年間。\n記録がぷっつりと途切れてる・・・・・・何があったんだ？',
      en: "Two years between his disappearance at Eldrant and waking up in the lab. The logs cut off completely... What happened?",
      ko: '엘드란트에서 사라진 뒤 연구소에서 눈을 뜨기까지의 2년. 기록이 완전히 끊겨 있어...... 대체 무슨 일이 있었던 거지?',
    },
  },
  kw_memory_separation: {
    label: {
      ja: '記憶分離',
      en: 'Memory Separation',
      ko: '기억 분리',
    },
    thought: {
      ja: '記憶のプロテクト・・・・・・いや、意図的な分離か。\n痛切すぎる記憶を、自ら切り離そうとした形跡がある',
      en: "Protected sectors... or intentional memory separation. Traces show he deliberately tried to sever agonizing memories.",
      ko: '기억의 프로텍트...... 아니, 의도적인 분리인가. 너무나 고통스러운 기억을 스스로 잘라내려 한 흔적이 있어.',
    },
  },
  kw_self_destruct: {
    label: {
      ja: '自壊の記録',
      en: 'Self-Destruct Log',
      ko: '자괴 기록',
    },
    thought: {
      ja: '生体炉の臨界暴走インシデント・・・・・・。\nあいつ、自ら命を絶とうとしたんじゃないだろうな',
      en: "Bioloop critical overload incident... Don't tell me he tried to end his own existence.",
      ko: '생체로의 임계 폭주 인시던트...... 설마 스스로 목숨을 끊으려 했던 건 아니겠지.',
    },
  },
  kw_tatalian: {
    label: {
      ja: 'タタル渓谷',
      en: 'Tataroo Valley',
      ko: '타타르 계곡',
    },
    thought: {
      ja: 'ルークと俺たちが旅を始めた場所、そしてあいつが第七音素を集めていた場所だ',
      en: "Where Luke and I began our journey... and where Asch was collecting Seventh Fonons.",
      ko: '루크와 우리가 여행을 시작했던 곳이자, 애쉬가 제7음소를 모으던 장소야.',
    },
  },
  kw_asch_alias: {
    label: {
      ja: 'アッシュ',
      en: 'Asch',
      ko: '애쉬',
    },
    thought: {
      ja: '『灰燼』を意味する名前・・・・・・。\n奪われた本名を捨ててまで、あいつが背負い続けた呪いのような呼び名だ',
      en: "A name meaning 'ashes'... A cursed moniker he carried after abandoning his stolen true name.",
      ko: '『재』를 뜻하는 이름...... 빼앗긴 본명을 버리면서까지 그 녀석이 짊어졌던 저주 같은 호칭이야.',
    },
  },
  kw_luke: {
    label: {
      ja: 'ルーク',
      en: 'Luke',
      ko: '루크',
    },
    thought: {
      ja: '俺の可愛いお坊ちゃまで、あいつのレプリカ。\nあいつも、ずっとルークのことを気にかけ続けてたはずだ',
      en: "My dear young master, and Asch's replica. Asch never stopped watching over him deep down.",
      ko: '나의 소중한 도련님이자, 애쉬의 레플리카. 애쉬도 줄곧 루크를 마음속 깊이 신경 쓰고 있었을 거야.',
    },
  },
  kw_parents: {
    label: {
      ja: 'ファブレ公爵家',
      en: 'House Fabre',
      ko: '파브레 공작가',
    },
    thought: {
      ja: '公爵様と奥様・・・・・・あいつの本当の両親だ。\n誘拐されたあの日から、家族の歯車は狂いっぱなしだった',
      en: "The Duke and Duchess... his true parents. The gears of their family have been broken ever since that kidnapping.",
      ko: '공작님과 사모님...... 녀석의 진짜 부모님이지. 유괴당했던 그날부터 가족의 톱니바퀴는 어긋나기만 했어.',
    },
  },
  kw_natalia: {
    label: {
      ja: 'ナタリア',
      en: 'Natalia',
      ko: '나탈리아',
    },
    thought: {
      ja: 'あいつの幼馴染で、かつての婚約者。\nナタリアはずっと、あいつの帰りを待ち望んでるんだが・・・・・・',
      en: "His childhood friend and former fiancée. Natalia has been waiting for his return all along...",
      ko: '녀석의 소꿉친구이자 과거의 약혼녀. 나탈리아는 줄곧 녀석이 돌아오기만을 기다리고 있는데......',
    },
  },
  kw_galdios_sword: {
    label: {
      ja: '宝刀ガルディオス',
      en: 'Jeweled Sword of Gardios',
      ko: '보도 가르디오스',
    },
    thought: {
      ja: '俺の生家、ガルディオス伯爵家に代々伝わる宝刀だ。\nあいつもこの刀にはただならぬ視線を向けてたな',
      en: "The heirloom sword of House Gardios, my birthplace. Asch always cast an intense gaze at this blade.",
      ko: '내 생가인 가르디오스 백작가에 대대로 전해지는 가보지. 녀석도 이 검엔 남다른 시선을 보내더군.',
    },
  },
  kw_jade_visit: {
    label: {
      ja: 'ジェイド',
      en: 'Jade',
      ko: '제이드',
    },
    thought: {
      ja: 'ジェイド・カーティス大佐。\nあの大佐がディストの研究所に立ち寄っていた形跡がある・・・・・・気づいてたのか？',
      en: "Colonel Jade Curtiss. There are traces of him visiting Dist's lab... Did he know?",
      ko: '제이드 커티스 대령. 그 대령이 디스트의 연구소에 들렀던 흔적이 있어...... 눈치채고 있었던 건가?',
    },
  },
  kw_dist: {
    label: {
      ja: 'ディスト',
      en: 'Dist',
      ko: '디스트',
    },
    thought: {
      ja: '神託の盾六神将の死神ディスト。\nあんな奴だが、アッシュに対してだけは常軌を逸した執着を見せてるぜ',
      en: "Dist the Reaper of the God-Generals. Eccentric as he is, his obsession with Asch bordered on madness.",
      ko: '신탁의 방패 6신장, 사신 디스트. 얼토당토않은 자식이지만, 애쉬에게만큼은 상식을 벗어난 집착을 보였어.',
    },
  },
  kw_taste: {
    label: {
      ja: '味覚',
      en: 'Taste',
      ko: '미각',
    },
    thought: {
      ja: '今の機体でも味覚センサーはあるらしいが・・・・・・。\nあいつ、紅茶の味すら遠い昔のことみたいに呟いてたな',
      en: "His current body has taste sensors, yet he spoke of tea as if it belonged to a distant lifetime.",
      ko: '지금 기체에도 미각 센서는 있는 모양이지만...... 홍차 맛조차 까마득한 옛일처럼 중얼거리더군.',
    },
  },
  kw_age: {
    label: {
      ja: '年齢',
      en: 'Age',
      ko: '연령',
    },
    thought: {
      ja: '外見は10歳、肉体の実年齢は20歳、そして譜業としての稼働年数。\n今のあいつの『年齢』は、一体どれなんだ？',
      en: "Physical appearance of a 10-year-old, actual age 20, plus uptime as a fonic craft... What is his true 'age' now?",
      ko: '외견은 10살, 육체의 실연령은 20살, 그리고 포업으로서의 가동 연수. 지금 녀석의 진짜 『나이』는 어느 쪽일까?',
    },
  },
};

export const RECIPE_TRANSLATIONS: Record<string, RecipeTranslation> = {
  recipe_why_hide_truth: {
    label: {
      ja: 'みんなの元へ戻らない理由',
      en: "Reason for Not Returning",
      ko: '모두의 곁으로 돌아가지 않는 이유',
    },
    epiphany: {
      ja: 'あいつがナタリアたちのことを突っぱねる理由・・・・・・\nこんな機体じゃ、顔を合わせられねえってことなのか？',
      en: "The reason he pushes Natalia and the others away...\nCould it be that in this body, he can't bear to face them?",
      ko: '녀석이 나탈리아 일행을 밀어내는 이유......\n이런 모습으론 차마 얼굴을 마주할 수 없다는 건가?',
    },
  },
  recipe_natalia_rumor_resolve: {
    label: {
      ja: 'ルークとナタリアの結婚の話',
      en: "About Luke & Natalia's Wedding",
      ko: '루크와 나탈리아의 결혼 이야기',
    },
    epiphany: {
      ja: 'そういえば・・・・・・さっきのカマかけ、ルークとナタリアが結婚するって話、あいつ本気にしてねえだろうな',
      en: "Come to think of it... That bluff about Luke and Natalia getting married, he didn't actually buy it, did he?",
      ko: '그러고 보니...... 아까 떠보려고 했던 루크와 나탈리아의 결혼 이야기, 녀석 진짜로 믿어버린 건 아니겠지.',
    },
  },
  recipe_asch_and_luke: {
    label: {
      ja: 'ルークのこと',
      en: 'About Luke',
      ko: '루크에 대하여',
    },
    epiphany: {
      ja: 'あいつ、口では邪険にしつつもルークの行く末を気にかけてやがったな',
      en: 'Harsh as he sounded, he always kept an eye on Luke’s path.',
      ko: '말로는 모질게 굴면서도, 은근히 루크의 앞날을 걱정하고 있었단 말이지.',
    },
  },
  recipe_why_10yo_body: {
    label: {
      ja: 'どうしてその機体なのか',
      en: 'Why This Specific Chassis',
      ko: '어째서 그 기체인 건가',
    },
    epiphany: {
      ja: '10歳の姿・・・・・・ディストがこの機体を選んだ理由と、あいつがこれを受け入れた理由があるはずだ',
      en: "A 10-year-old form... There must be a reason Dist chose this frame, and a reason Asch accepted it.",
      ko: '10살 때의 모습...... 디스트가 이 기체를 택한 이유와, 녀석이 이를 수긍한 이유가 분명히 있을 거야.',
    },
  },
  recipe_memory_lock: {
    label: {
      ja: 'ロックをかけられている？',
      en: 'Locked Away by Design?',
      ko: '잠겨 있는 건가?',
    },
    epiphany: {
      ja: '端末の深層記憶・・・・・・ディストが勝手に封印したのか、それともあいつが拒んだのか',
      en: "The deep memories in the terminal... Did Dist seal them unilaterally, or did Asch reject them?",
      ko: '단말기의 심층 기억...... 디스트가 제멋대로 봉인한 걸까, 아니면 녀석이 거부한 걸까.',
    },
  },
  recipe_deep_truth_confront: {
    label: {
      ja: '嘘だよな、こんな記録・・・・・・',
      en: "This Record Must Be a Lie...",
      ko: '거짓말이지, 이런 기록은......',
    },
    epiphany: {
      ja: '自壊の記録と記憶分離・・・・・・あいつ、自分が何なのか分からなくなって壊れそうになってたのか？',
      en: "Self-destruct logs and severed memories... Was he about to shatter, completely lost as to who he was?",
      ko: '자괴 기록과 기억 분리...... 녀석, 자기가 대체 누구인지 알 수 없게 되어 부서져 가고 있었던 건가?',
    },
  },
  recipe_parents_thought: {
    label: {
      ja: '屋敷の公爵様や奥様のこと',
      en: 'About the Duke & Duchess',
      ko: '저택의 공작님과 사모님에 대해',
    },
    epiphany: {
      ja: '本当の親父とお袋さんのこと・・・・・・あいつ、一度だって忘れたことはなかったはずだ',
      en: "His real mother and father... There's no way he ever forgot them, not even for a day.",
      ko: '진짜 아버지와 어머니에 대한 것...... 녀석, 단 한 번도 잊은 적 없었을 거야.',
    },
  },
  recipe_sword_limiter: {
    label: {
      ja: 'その機体で剣は振れるのか',
      en: 'Can You Swing a Sword in That Body?',
      ko: '그 기체로 검을 휘두를 수 있나',
    },
    epiphany: {
      ja: '18%の出力制限・・・・・・剣士として生きてきたあいつにとって、これはどれほど屈辱的な縛りなんだ？',
      en: "An 18% limiter... For someone who lived by the blade, how humiliating must this shackle feel?",
      ko: '18%의 출력 제한...... 검사로 살아온 녀석에게, 이건 얼마나 굴욕적인 족쇄일까.',
    },
  },
  recipe_hands_and_asch_alias: {
    label: {
      ja: '精巧な機体',
      en: 'An Exquisite Craft',
      ko: '정교한 기체',
    },
    epiphany: {
      ja: '遠目には人間と見分けがつかない皮膚と指先。ディストの技術力の異様さが際立つぜ',
      en: "Skin and fingertips indistinguishable from a human at a glance. Dist's skill is chillingly abnormal.",
      ko: '얼핏 보면 인간과 분간이 안 가는 피부와 손가락 끝. 디스트의 비정상적인 기술력이 돋보이네.',
    },
  },
  recipe_tea_memory: {
    label: {
      ja: '屋敷の紅茶の香り',
      en: 'Aroma of Manor Black Tea',
      ko: '저택의 홍차 향기',
    },
    epiphany: {
      ja: '屋敷で飲んでいた紅茶の香り・・・・・・今の機体の味覚センサーでも、思い出せるもんなのか？',
      en: "The scent of black tea from the manor... Can sensors in this chassis even recall that taste?",
      ko: '저택에서 마시던 홍차 향기...... 지금 기체의 미각 센서로도 떠올릴 수 있는 걸까?',
    },
  },
  recipe_stepstool: {
    label: {
      ja: '高い棚と『踏み台』の記録',
      en: 'High Shelves & Step Stool Log',
      ko: '높은 선반과 『디딤대』의 기록',
    },
    epiphany: {
      ja: '届かない棚に悪戦苦闘して踏み台を持ち出すアッシュ・・・・・・ちょっと見てみたかったな',
      en: "Asch wrestling with high shelves and dragging out a step stool... Part of me wishes I'd seen that.",
      ko: '손이 닿지 않는 선반과 씨름하며 디딤대를 끌고 오는 애쉬...... 솔직히 조금 보고 싶었네.',
    },
  },
  recipe_joke_dist_tea: {
    label: {
      ja: '研究所の薬品臭いお茶',
      en: "The Lab's Chemical-Smelling Tea",
      ko: '연구소의 약품 냄새 나는 차',
    },
    epiphany: {
      ja: 'ディストが淹れたお茶なんて、絶対に怪しい試薬が混ざってただろうな',
      en: "Tea brewed by Dist? I bet my life there were dubious reagents mixed into that cup.",
      ko: '디스트가 끓인 차라니, 수상쩍은 시약이 잔뜩 섞여 있었을 게 뻔하잖아.',
    },
  },
  recipe_joke_ask_zura: {
    label: {
      ja: '一度でいいから',
      en: 'Just Once',
      ko: '한 번만이라도',
    },
    epiphany: {
      ja: 'あいつが『〜ズラ』って喋るところ、一度くらい聞いてみたい気もするが・・・・・・殺されるな',
      en: "Part of me wants to hear him say '~zura' just once... but he'd definitely murder me.",
      ko: '녀석이 『~즈라』 하고 말하는 거, 딱 한 번쯤 들어보고 싶긴 한데...... 죽도록 맞겠지.',
    },
  },
  recipe_joke_tarlow_apron: {
    label: {
      ja: 'エプロンを着たタルロウ',
      en: 'Tarlow in an Apron',
      ko: '앞치마를 두른 타르로우',
    },
    epiphany: {
      ja: 'あのぶっきらぼうな顔でエプロン着けて雑用・・・・・・想像しただけで笑いが止まらねえ',
      en: "Doing chores in an apron with that sullen scowl... Just picturing it is killing me.",
      ko: '그 뾰로통한 얼굴로 앞치마를 두르고 심부름이라니...... 상상만 해도 웃음이 안 멈추네.',
    },
  },
  recipe_joke_cup_break: {
    label: {
      ja: 'ナタリアの料理',
      en: "Natalia's Cooking",
      ko: '나탈리아의 요리',
    },
    epiphany: {
      ja: 'ナタリアの手料理の話・・・・・・あいつ、昔本気で気絶しかけたことあったよな',
      en: "Natalia's cooking... He genuinely almost passed out from it back in the day.",
      ko: '나탈리아의 손요리 이야기...... 옛날에 그 녀석 진짜로 기절할 뻔했었지.',
    },
  },
  recipe_joke_asch_age: {
    label: {
      ja: 'アッシュの年齢',
      en: "Asch's Age",
      ko: '애쉬의 나이',
    },
    epiphany: {
      ja: '見た目は10歳、実年齢は20歳・・・・・・おまえ、結局いくつなんだよってツッコミ待ちか？',
      en: "Looks 10, aged 20... Are you waiting for me to ask how old you actually are?",
      ko: '겉모습은 10살, 실제 나이는 20살...... 너 결국 몇 살인 거냐고 딴죽이라도 걸어달라는 건가?',
    },
  },
  recipe_joke_luke_age: {
    label: {
      ja: 'ルークの年齢',
      en: "Luke's Age",
      ko: '루크의 나이',
    },
    epiphany: {
      ja: 'ルークは生まれてから7年・・・・・・あいつから見れば、とんでもない年下弟分だな',
      en: "Luke has only lived 7 years... To Asch, he really must seem like a tiny younger brother.",
      ko: '루크는 태어난 지 고작 7년...... 애쉬 입장에선 까마득히 어린 남동생이겠네.',
    },
  },
  recipe_why_dist: {
    label: {
      ja: 'ディストを頼った理由',
      en: 'Reason for Trusting Dist',
      ko: '디스트를 의지한 이유',
    },
    epiphany: {
      ja: 'あいつが唯一コンタクトを取ったのがディストだった理由・・・・・・他に行き場がなかったのか',
      en: "Why Dist was the only one he contacted... Did he truly have nowhere else to turn?",
      ko: '유일하게 연락을 취한 상대가 디스트였던 이유...... 갈 곳이 그곳밖에 없었던 걸까.',
    },
  },
  recipe_dist_life: {
    label: {
      ja: 'ディストとの二人暮らし',
      en: 'Living with Dist',
      ko: '디스트와의 단둘 생활',
    },
    epiphany: {
      ja: 'ディストと二人きりの研究所生活・・・・・・考えただけで胃が痛くなりそうだぜ',
      en: "Living alone with Dist in that lab... My stomach hurts just thinking about it.",
      ko: '디스트와 단둘이 연구소 생활이라니...... 생각만 해도 위장이 쓰려오네.',
    },
  },
  recipe_dist_rebellion: {
    label: {
      ja: 'ディストへの小さな反抗',
      en: "Petty Defiance Against Dist",
      ko: '디스트를 향한 소소한 반항',
    },
    epiphany: {
      ja: '命令を無視したり嫌がらせしたり・・・・・・あいつなりに意地を張ってたんだな',
      en: "Ignoring orders, being stubborn... In his own way, he was clinging to his pride.",
      ko: '명령을 씹고 곯려주고...... 녀석 나름대로 필사적으로 자존심을 지켰던 거군.',
    },
  },
  recipe_jade_suspicion: {
    label: {
      ja: '研究所に来ていた大佐のこと',
      en: 'About the Colonel at the Lab',
      ko: '연구소에 찾아왔던 대령에 대해',
    },
    epiphany: {
      ja: 'ジェイドが研究所に来ていた・・・・・・あいつに気付かれないように立ち去ったのか？',
      en: "Jade was at the lab... Did he slip away before Asch even noticed him?",
      ko: '제이드가 연구소에 왔었다니...... 녀석에게 들키지 않도록 조용히 물러난 걸까?',
    },
  },
};

export const FAIL_MONOLOGUES_I18N: Record<number, Record<Language, string>> = {
  0: {
    ja: '・・・・・・ん？ いや、これは関係ねえか',
    en: "...Hm? No, that doesn't add up.",
    ko: '......음? 아니, 이건 상관없나.',
  },
  1: {
    ja: 'さすがにこいつとこいつは繋がらねえな',
    en: "Even I can tell these two don't connect.",
    ko: '아무리 그래도 얘랑 얘는 안 이어지지.',
  },
  2: {
    ja: '・・・・・・違うな。別の線から考えてみるか',
    en: "...No. Let me try a different angle.",
    ko: '......아니야. 다른 방향에서 생각해 볼까.',
  },
  3: {
    ja: '焦っても仕方ねえ。他の手がかりを洗ってみるか',
    en: "Rushing won't help. Let's look through other clues.",
    ko: '조급해할 것 없어. 다른 단서를 뒤져볼까.',
  },
  4: {
    ja: 'いくらなんでも、そりゃ突拍子もなさすぎるぜ',
    en: "Come on now, that's way too far-fetched.",
    ko: '아무리 그래도, 그건 너무 엉뚱하잖아.',
  },
};

export function getLocalizedKeywordLabel(id: string, original: string, lang: Language): string {
  if (lang === 'ja') return original;
  return KEYWORD_TRANSLATIONS[id]?.label[lang] || original;
}

export function getLocalizedKeywordThought(id: string, original: string, lang: Language): string {
  if (lang === 'ja') return original;
  return KEYWORD_TRANSLATIONS[id]?.thought[lang] || original;
}

export function getLocalizedRecipeLabel(id: string, original: string, lang: Language): string {
  if (lang === 'ja') return original;
  return RECIPE_TRANSLATIONS[id]?.label[lang] || original;
}

export function getLocalizedRecipeEpiphany(id: string, original: string, lang: Language): string {
  if (lang === 'ja') return original;
  return RECIPE_TRANSLATIONS[id]?.epiphany[lang] || original;
}

export const THINKING_UI_LABELS = {
  cluesCount: (count: number, lang: Language) => {
    if (lang === 'en') return `Thinking Clues (${count})`;
    if (lang === 'ko') return `사고의 단서 (${count}개)`;
    return `思考の手がかり（${count}件）`;
  },
  recordsCount: (discovered: number, total: number, showList: boolean, lang: Language) => {
    if (lang === 'en') return `Inspiration Log (${discovered}/${total}) ${showList ? '▲ Clues' : '▼ Table'}`;
    if (lang === 'ko') return `착상 기록 (${discovered}/${total}) ${showList ? '▲ 단서' : '▼ 목록'}`;
    return `ひらめき記録（${discovered}/${total}） ${showList ? '▲ 手がかり' : '▼ 一覧表'}`;
  },
  thTopic: {
    ja: '話題',
    en: 'Topic',
    ko: '화제',
  },
  thCombination: {
    ja: '組み合わせ',
    en: 'Combination',
    ko: '조합',
  },
  hasOthers: {
    ja: '(※他あり)',
    en: '(*Others)',
    ko: '(※기타 있음)',
  },
  otherCombinations: {
    ja: '他の組み合わせ:',
    en: 'Other combinations:',
    ko: '기타 조합:',
  },
  noCluesYet: {
    ja: '（まだ思考の手がかりがありません。会話や端末の記録を確認してみよう）',
    en: '(No clues gathered yet. Try conversing or reviewing the terminal records.)',
    ko: '(아직 사고의 단서가 없습니다. 대화나 단말기 기록을 확인해 보세요.)',
  },
  lockedDeepTip: {
    ja: '（今は、この記録（真相）について考えるしかない・・・・・・）',
    en: '(Right now, I have to focus on this record [the truth]...)',
    ko: '(지금은, 이 기록[진상]에 대해 집중해서 생각할 수밖에 없어......)',
  },
  greyedOutTip: {
    ja: '（思考支援：組み合わせ不可）',
    en: '(Hint: No valid combination)',
    ko: '(사고 지원: 조합 불가)',
  },
  targetPartnerTip: {
    ja: '（思考支援：この単語と組み合わせ可能）',
    en: '(Hint: Can combine with this word)',
    ko: '(사고 지원: 이 단어와 조합 가능)',
  },
  inSlotTip: {
    ja: '（スロット投入中）',
    en: '(Currently in slot)',
    ko: '(슬롯에 투입 중)',
  },
  keywordActionTip: (label: string, lang: Language) => {
    if (lang === 'en') return `${label} (Click to inspect thought, drag to slot)`;
    if (lang === 'ko') return `${label} (클릭하여 생각 확인, 드래그하여 슬롯에 투입)`;
    return `${label}（クリックで思考確認、ドラッグでスロットへ投入）`;
  },
  releaseSlotTip: {
    ja: 'クリックで解除',
    en: 'Click to clear',
    ko: '클릭하여 해제',
  },
  slotSelectTip: {
    ja: 'クリックして選択後、上の単語をクリックで投入（またはドラッグ投入）',
    en: 'Click to select slot, then click a word above or drag to insert',
    ko: '클릭하여 선택 후, 위의 단어를 클릭하여 투입 (또는 드래그하여 투입)',
  },
};

