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
      ja: '・・・・・・ちっこいな。11年前に屋敷で見た姿そのままだ',
      en: "...He's small. Looks just like he did back at the manor eleven years ago.",
      ko: '......조그맣네. 11년 전 저택에서 봤던 모습 그대로야.',
    },
  },
  kw_sword_limiter: {
    label: {
      ja: '出力制限',
      en: 'Output Limiter',
      ko: '출력 제한',
    },
    thought: {
      ja: '出力が二割に制限されてるのか・・・・・・。\nいや待てよ、二割であれだけ動けるなら、本来の性能ならどれだけ動けたんだ・・・・・・',
      en: "His output is limited to twenty percent...? Wait, if he can move like that at twenty percent, how would he move at full spec...?",
      ko: '출력이 20%로 제한되어 있는 건가......? 아니 잠깐, 20%로 저 정도로 움직인다면, 본래 성능이라면 대체 얼마나 움직였던 거지......',
    },
  },
  kw_apron: {
    label: {
      ja: 'エプロン',
      en: 'Apron',
      ko: '앞치마',
    },
    thought: {
      ja: 'こんなヒラヒラしたもん着せられて・・・・・・\nすげえ嫌そうな顔してるのが、逆にいつものあいつらしいというか・・・・・・',
      en: "Forced to wear something so frilly... The sheer disgust on his face is ironically just like him...",
      ko: '이런 팔랑거리는 걸 입혀놓고...... 엄청 싫어하는 표정을 짓고 있는 게, 역으로 녀석답다고 해야 할지......',
    },
  },
  kw_zura_speech: {
    label: {
      ja: '語尾',
      en: 'Speech Ending',
      ko: '말끝',
    },
    thought: {
      ja: 'ズラ、か・・・・・・。\n怒り狂って端末ぶっ壊すあいつの顔、目に浮かぶようだぜ',
      en: "'-zura', huh...? I can practically see him smashing the terminal in sheer fury.",
      ko: "'~즈라'라니, 참...... 분노에 차서 단말기를 때려부수는 녀석의 얼굴이 눈에 선하네.",
    },
  },
  kw_step_stool: {
    label: {
      ja: '踏み台',
      en: 'Step Stool',
      ko: '디딤대',
    },
    thought: {
      ja: '棚に手が届かなくて部屋中踏み台探して歩き回ってたのか？\nさぞ屈辱だっただろうな・・・・・・',
      en: "He couldn't reach the shelf, so he wandered the room looking for a stool? Must have been utterly humiliating for him...",
      ko: '선반에 손이 닿지 않아서 온 방 안을 디딤대 찾으러 돌아다닌 건가? 꽤나 굴욕적이었겠네......',
    },
  },
  kw_lab: {
    label: {
      ja: '研究所',
      en: 'Laboratory',
      ko: '연구소',
    },
    thought: {
      ja: 'あんな薄気味の悪い研究所で、ディストと二人で・・・・・・。\n息が詰まりそうだな',
      en: "Just him and Dist in a creepy lab like that... Sounds suffocating.",
      ko: '저런 으스스한 연구소에서 디스트와 단둘이...... 숨이 막힐 지경이겠어.',
    },
  },
  kw_chassis_swap: {
    label: {
      ja: '機体換装',
      en: 'Chassis Swap',
      ko: '기체 환장',
    },
    thought: {
      ja: '二ヶ月前の機体大破・・・・・・\n研究所にいただけのやつが、なんでそんなボロボロに壊れるんだ？',
      en: "The chassis was wrecked two months ago...? Why would someone who was just staying in a lab end up so utterly shattered?",
      ko: '두 달 전 기체 대파...... 연구소에만 있던 녀석이 대체 왜 그렇게 만신창이로 부서진 거지?',
    },
  },
  kw_blank_2years: {
    label: {
      ja: '空白の2年',
      en: 'The Blank Two Years',
      ko: '공백의 2년',
    },
    thought: {
      ja: 'エルドラント崩落後の2年間・・・・・・\nあいつ、どこで何をしてたんだ？',
      en: "The two years after Eldrant collapsed... Where was he, and what was he doing?",
      ko: '엘드란트 붕괴 후 2년 동안...... 녀석, 어디서 뭘 하고 있었던 거지?',
    },
  },
  kw_memory_separation: {
    label: {
      ja: '記憶分離',
      en: 'Memory Separation',
      ko: '기억 분리',
    },
    thought: {
      ja: 'じゃあ、今バチカルにいるルークは・・・・・・！？\n目の前にいるこいつは・・・・・・っ',
      en: "Then who is the Luke in Baticul right now...?! And who is this right in front of me...!",
      ko: '그럼 지금 바티칼에 있는 루크는......?! 눈앞에 있는 이 녀석은......윽!',
    },
  },
  kw_self_destruct: {
    label: {
      ja: '自壊の記録',
      en: 'Self-Destruct Record',
      ko: '자괴 기록',
    },
    thought: {
      ja: '無茶どころじゃない！\nあいつ、自分の身体を自分で・・・・・・！？',
      en: "This goes way beyond reckless! Did he... try to destroy his own body...?!",
      ko: '무리하는 수준이 아니잖아! 녀석, 자기 몸을 스스로......?!',
    },
  },
  kw_tatalian: {
    label: {
      ja: 'タタル渓谷',
      en: 'Tataroo Valley',
      ko: '타타르 계곡',
    },
    thought: {
      ja: 'ルークが戻ってきた時の記録を、あいつが何度も漁ってた・・・・・・？\n一体どんな気持ちで見てたんだよ・・・・・・',
      en: "He repeatedly looked through the records from when Luke returned...? What on earth was going through his head...?",
      ko: '루크가 돌아왔을 때의 기록을 녀석이 몇 번이고 뒤져봤다고......? 도대체 어떤 심정으로 보고 있었던 거야......',
    },
  },
  kw_asch_alias: {
    label: {
      ja: 'アッシュ',
      en: 'Asch',
      ko: '애쉬',
    },
    thought: {
      ja: '目の前にいるこいつは、一体誰なんだ？\n憎まれ口も目つきも以前のあいつのままだが・・・・・・',
      en: "Who on earth is this in front of me? His sharp tongue and glare are just like they used to be, but...",
      ko: '눈앞에 있는 이 녀석은 대체 누구지? 얄미운 입버릇도 눈빛도 예전 그대로이긴 하지만......',
    },
  },
  kw_luke: {
    label: {
      ja: 'ルーク',
      en: 'Luke',
      ko: '루크',
    },
    thought: {
      ja: 'バチカルのルークからは、たまに手紙が届く。あっちで元気にやってるみたいだな',
      en: "I get letters from Luke in Baticul from time to time. Sounds like he's doing well over there.",
      ko: '바티칼의 루크한테선 가끔 편지가 와. 저쪽에서 잘 지내는 모양이더군.',
    },
  },
  kw_parents: {
    label: {
      ja: 'ファブレ公爵家',
      en: 'House Fabre',
      ko: '파브레 공작가',
    },
    thought: {
      ja: 'バチカルのお屋敷に、ルークが戻って一年になるのか。\n俺があの家を離れてもう何年になるか・・・・・・懐かしささえ感じるな',
      en: "It's been a year since Luke returned to the manor in Baticul.\nHow many years has it been since I left that house...? I almost feel a bit of nostalgia.",
      ko: '바티칼 저택에 루크가 돌아온 지도 1년인가.\n내가 그 집을 떠난 지도 벌써 몇 년이 지난 건지...... 그리움마저 느껴지네.',
    },
  },
  kw_natalia: {
    label: {
      ja: 'ナタリア',
      en: 'Natalia',
      ko: '나탈리아',
    },
    thought: {
      ja: 'ナタリアは今でもおまえのことを信じて待ってるっていうのに・・・・・・\nあいつ、何でそんな頑なに拒むんだ',
      en: "Natalia still believes in you and is waiting, and yet...\nWhy does he refuse her so stubbornly?",
      ko: '나탈리아는 지금도 널 믿고 기다리고 있는데......\n녀석, 어째서 그렇게 완강하게 거부하는 거지?',
    },
  },
  kw_galdios_sword: {
    label: {
      ja: '宝刀ガルディオス',
      en: 'Gardios Sword',
      ko: '가르디오스 보도',
    },
    thought: {
      ja: '俺の剣を見るあいつの目・・・・・・\n機体はこんなになっちまっても、やっぱりあいつは剣士なんだな',
      en: "The way he looks at my sword...\nEven trapped in a chassis like this, he's still a swordsman through and through.",
      ko: '내 검을 바라보는 녀석의 눈빛......\n기체가 이렇게 되어버렸어도, 역시 녀석은 검사로군.',
    },
  },
  kw_jade_visit: {
    label: {
      ja: 'ジェイド',
      en: 'Jade',
      ko: '제이드',
    },
    thought: {
      ja: 'あの喰えない男のことだ、全部知ってて面白がってたんじゃねえだろうな',
      en: "Knowing that sly man, don't tell me he knew everything and was just amused by it all.",
      ko: '그 만만찮은 남자의 성격상, 다 알고 있으면서 재미있어했던 건 아니겠지.',
    },
  },
  kw_dist: {
    label: {
      ja: 'ディスト',
      en: 'Dist',
      ko: '디스트',
    },
    thought: {
      ja: 'よりによってディストなんかに拾われるとはな。あんなやつに生殺与奪を握られてるなんて、\nあいつにすりゃ屈辱以外の何物でもねえだろうに',
      en: "Of all people, to be picked up by Dist.\nHaving his life in the hands of someone like that must be nothing short of utter humiliation for him.",
      ko: '하필 디스트 따위에게 거둬지다니. 저런 녀석에게 생사여탈권을 쥐여 있다니,\n녀석에겐 굴욕 이외의 그 무엇도 아닐 텐데.',
    },
  },
  kw_taste: {
    label: {
      ja: '味覚',
      en: 'Taste',
      ko: '미각',
    },
    thought: {
      ja: '味覚センサーで味を数値化して、水分は気化排熱に回すって・・・・・・\n内部の配管や熱交換器、どういう構造になってんだ？',
      en: "Converting taste into numbers with sensors and routing moisture to evaporative cooling...?\nWhat kind of plumbing and heat exchangers does he have inside?",
      ko: '미각 센서로 맛을 수치화하고 수분은 기화 방열로 돌린다니......\n내부 배관이랑 열교환기는 어떤 구조로 되어 있는 거지?',
    },
  },
  kw_age: {
    label: {
      ja: '年齢',
      en: 'Age',
      ko: '나이',
    },
    thought: {
      ja: '見た目と実際の年齢に差があるが、昔から小難しい顔していたからあんまり気にならないもんだな',
      en: "There's a huge gap between his appearance and actual age, but he always made sour faces anyway, so it doesn't feel that out of place.",
      ko: '겉모습과 실제 나이에 차이가 있긴 하지만, 옛날부터 까다로운 표정을 짓고 있었으니 그리 신경 쓰이지는 않네.',
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
      ko: '루크에 대해',
    },
    epiphany: {
      ja: 'あいつ、ルークのことは気にしてるみたいだが、本当はどう思ってるんだ？',
      en: 'He seems concerned about Luke, but what does he truly think deep down?',
      ko: '녀석, 루크를 신경 쓰는 모양이지만 진짜 속마음은 어떻게 생각하고 있는 거지?',
    },
  },
  recipe_why_10yo_body: {
    label: {
      ja: 'どうしてその機体なのか',
      en: 'Why That Body',
      ko: '어째서 그 기체인가',
    },
    epiphany: {
      ja: 'あいつが何でその機体に入ってるのか・・・・・・ディストの趣味だけで片付く話じゃねえよな',
      en: "Why is he in that chassis...? There has to be more to it than just Dist's twisted hobby.",
      ko: '녀석이 왜 그 기체에 들어가 있는 건지...... 디스트의 취향만으로 치부할 문제는 아니겠지.',
    },
  },
  recipe_memory_lock: {
    label: {
      ja: 'ロックをかけられている？',
      en: 'Locked Memories?',
      ko: '잠겨 있는 건가?',
    },
    epiphany: {
      ja: '抜け落ちている・・・・・・\nまさか、意図的にロックをかけられているんじゃないか？',
      en: "It's missing...\nCould it be that a lock was placed on it intentionally?",
      ko: '누락되어 있어......\n설마, 의도적으로 락이 걸려 있는 건 아닌가?',
    },
  },
  recipe_deep_truth_confront: {
    label: {
      ja: '嘘だよな、こんな記録・・・・・・',
      en: 'This Record Must Be a Lie...',
      ko: '거짓말이지, 이런 기록......',
    },
    epiphany: {
      ja: 'だから、こいつは自壊までしなきゃいけなかった・・・・・・？\n嘘だ、そんなはずない。そんなこと、あってたまるかよ・・・・・・！！',
      en: "So that's why he had to go as far as self-destructing...?\nNo, that can't be. How could something like that happen...!!",
      ko: '그래서, 이 녀석은 자괴까지 해야만 했던 건가......?\n거짓말이야, 그럴 리 없어. 그런 일이 있어선 안 된다고......!!',
    },
  },
  recipe_parents_thought: {
    label: {
      ja: '屋敷の公爵様や奥様のこと',
      en: 'The Duke and Duchess',
      ko: '저택의 공작님과 부인',
    },
    epiphany: {
      ja: 'こんな姿で屋敷に戻ったら、奥様がどれだけ取り乱すか・・・・・・あいつ自身、誰よりも分かってるんだろうな',
      en: "If he returned to the manor looking like this, how distraught the Duchess would be... He must understand that better than anyone.",
      ko: '이런 모습으로 저택에 돌아가면 부인께서 얼마나 충격을 받으실지...... 녀석 자신이 누구보다 잘 알고 있겠지.',
    },
  },
  recipe_sword_limiter: {
    label: {
      ja: 'その機体で剣は振れるのか',
      en: 'Can He Wield a Sword?',
      ko: '그 기체로 검을 휘두를 수 있는가',
    },
    epiphany: {
      ja: 'その小さな手足じゃ、剣を握ることすらできねえんじゃねえのか？',
      en: "With those tiny hands and feet, can he even grip a sword at all?",
      ko: '그 조그만 손발로는 검을 쥐는 것조차 불가능한 것 아닌가?',
    },
  },
  recipe_hands_and_asch_alias: {
    label: {
      ja: '精巧な機体',
      en: 'Exquisite Chassis',
      ko: '정교한 기체',
    },
    epiphany: {
      ja: 'ギアや配線どころか、パーツの継ぎ目すら見当たらない・・・・・・\nこうも人間らしいと、こいつを譜業として見る方が難しいな',
      en: "No gears, no wires, not even a seam between parts...\nWhen it's this human-like, it's harder to see him as fontech.",
      ko: '기어나 배선은커녕 부품의 이음매조차 보이지 않아......\n이렇게나 인간다우면, 이 녀석을 음기관으로 보기가 더 힘들군.',
    },
  },
  recipe_tea_memory: {
    label: {
      ja: '屋敷の紅茶の香り',
      en: 'Scent of Manor Black Tea',
      ko: '저택의 홍차 향기',
    },
    epiphany: {
      ja: 'その姿を見てると、昔屋敷で飲んでた紅茶を思い出すぜ。・・・・・・あいつも覚えてるのかね',
      en: "Looking at him like that reminds me of the tea we drank at the manor. ...I wonder if he remembers too.",
      ko: '그 모습을 보고 있으니 예전 저택에서 마시던 홍차가 떠오르네. ......녀석도 기억하고 있을까.',
    },
  },
  recipe_stepstool: {
    label: {
      ja: '高い棚と『踏み台』の記録',
      en: 'High Shelf & Step Stool',
      ko: '높은 선반과 디딤대 기록',
    },
    epiphany: {
      ja: '棚に手が届かねえからって、踏み台探してウロウロしてたのか。くくっ、ちょっとからかってやるか',
      en: "Pacing around searching for a stool because he couldn't reach the shelf? Heh, maybe I'll tease him a little.",
      ko: '선반에 손이 닿지 않는다고 디딤대 찾아서 어슬렁거렸던 건가. 큭큭, 조금 놀려줘 볼까.',
    },
  },
  recipe_joke_dist_tea: {
    label: {
      ja: '研究所の薬品臭いお茶',
      en: 'Chemical-Smelling Lab Tea',
      ko: '연구소의 약품 냄새 나는 차',
    },
    epiphany: {
      ja: '研究所にいた頃、ディストの淹れたお茶を飲んだりしたのか？ 薬品臭くて飲めたもんじゃなさそうだが',
      en: "When he was at the lab, did he ever drink tea Dist brewed? Sounds like it'd reek of chemicals and be undrinkable.",
      ko: '연구소에 있던 시절, 디스트가 끓인 차를 마시기도 한 걸까? 약품 냄새가 진동해서 마실 게 못 됐을 텐데.',
    },
  },
  recipe_joke_ask_zura: {
    label: {
      ja: '一度でいいから',
      en: 'Just Once',
      ko: '한 번만이라도',
    },
    epiphany: {
      ja: '怒られるのは百も承知だが、一回くらい『ズラ』って言わせてみてえよな',
      en: "I know he'll chew me out, but I'd love to make him say '-zura' just once.",
      ko: '혼날 건 뻔히 알지만, 한 번쯤은 "~즈라"라고 말하게 해보고 싶단 말이지.',
    },
  },
  recipe_joke_tarlow_apron: {
    label: {
      ja: 'エプロンを着たタルロウ',
      en: 'Tarlow in an Apron',
      ko: '앞치마를 두른 타르로우',
    },
    epiphany: {
      ja: 'あの掃除機みたいなタルロウにエプロン巻いて給仕してたのか・・・・・・？',
      en: "Did that vacuum cleaner-looking Tarlow wear an apron to serve meals...?",
      ko: '그 청소기 같은 타르로우에 앞치마를 두르고 시중을 들었던 건가......?',
    },
  },
  recipe_joke_cup_break: {
    label: {
      ja: 'ナタリアの料理',
      en: "Natalia's Cooking",
      ko: '나탈리아의 요리',
    },
    epiphany: {
      ja: 'この機体にも味覚センサーがあるらしいが、\nナタリアの手料理を食わされたらどうなるんだろう',
      en: "Apparently this chassis has taste sensors too...\nWhat would happen if he were fed Natalia's home cooking?",
      ko: '이 기체에도 미각 센서가 있다던데,\n나탈리아의 손요리를 먹게 되면 어떻게 될까.',
    },
  },
  recipe_joke_asch_age: {
    label: {
      ja: 'アッシュの年齢',
      en: "Asch's Age",
      ko: '애쉬의 나이',
    },
    epiphany: {
      ja: '見た目は10歳、生きてりゃもう21歳か。・・・・・・あいつ自身、自分のこと今何歳だと思ってるんだ？',
      en: "Looks 10, but if he were alive he'd be 21 now... I wonder how old he considers himself to be?",
      ko: '겉모습은 10살, 살아있다면 벌써 21살인가. ......녀석 자신은 스스로를 몇 살이라고 생각하고 있을까?',
    },
  },
  recipe_joke_luke_age: {
    label: {
      ja: 'ルークの年齢',
      en: "Luke's Age",
      ko: '루크의 나이',
    },
    epiphany: {
      ja: 'そういえばルークの奴、まだ19歳の感覚だとか言ってたな',
      en: "Come to think of it, Luke mentioned he still felt like he was 19.",
      ko: '그러고 보니 루크 녀석, 아직 19살 같은 느낌이라고 말했었지.',
    },
  },
  recipe_why_dist: {
    label: {
      ja: 'ディストを頼った理由',
      en: 'Reason for Relying on Dist',
      ko: '디스트를 의지한 이유',
    },
    epiphany: {
      ja: 'そもそも、あいつはなんでディストのところへ行ったんだ？ ろくなことにならないくらい、あいつだって分かってただろうに',
      en: "In the first place, why did he go to Dist? He must have known nothing good would come of it.",
      ko: '애초에 녀석은 왜 디스트에게 간 거지? 제대로 된 꼴이 못 될 거란 건 녀석도 알고 있었을 텐데.',
    },
  },
  recipe_dist_life: {
    label: {
      ja: 'ディストとの二人暮らし',
      en: 'Living with Dist',
      ko: '디스트와의 단둘 생활',
    },
    epiphany: {
      ja: 'あのディストと二人きりじゃ、鬱陶しいこと山ほどあっただろうな。・・・・・・少し聞いてやるか',
      en: "Being alone with that Dist, there must have been endless annoyances. ...Maybe I'll hear him out a bit.",
      ko: '그 디스트와 단둘이라니 귀찮고 짜증 나는 일이 산더미였겠지. ......조금 들어줘 볼까.',
    },
  },
  recipe_dist_rebellion: {
    label: {
      ja: 'ディストへの小さな反抗',
      en: 'Minor Rebellion against Dist',
      ko: '디스트를 향한 소소한 반항',
    },
    epiphany: {
      ja: '出力制限かけられてたって、あいつの気性ならディストの隙を見て一発くらい蹴り飛ばしてそうだな',
      en: "Even with the limiter on, with his temper, he probably took a shot at kicking Dist the moment his back was turned.",
      ko: '출력 제한이 걸려 있었다 해도, 녀석 성격이라면 디스트의 빈틈을 노려 한 대쯤 걷어찼을 것 같네.',
    },
  },
  recipe_jade_suspicion: {
    label: {
      ja: '研究所に来ていた大佐のこと',
      en: 'About the Colonel at the Lab',
      ko: '연구소에 들렀던 대령에 대해',
    },
    epiphany: {
      ja: 'あのジェイドが気付いてないなんてこと、あるのか・・・・・・？\nわざと見逃されてるってことか？',
      en: "Is it even possible that Jade didn't notice...?\nDoes that mean he intentionally turned a blind eye?",
      ko: '그 제이드가 눈치채지 못했을 리가 있나......?\n일부러 모른 척 넘어가 준 건가?',
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

