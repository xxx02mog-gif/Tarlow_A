/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../utils/i18n';

export interface SectorTranslation {
  title: Record<Language, string>;
  quote: Record<Language, string>;
  content: Record<Language, string>;
}

export const SECTOR_TRANSLATIONS: Record<string, SectorTranslation> = {
  'SEC-00': {
    title: {
      ja: '機体基本仕様',
      en: 'Base Unit Specifications',
      ko: '기체 기본 사양',
    },
    quote: {
      ja: '',
      en: '',
      ko: '',
    },
    content: {
      ja: '自律譜業『タルロウA』（現・予備機体）の基本構造。\n第七音素循環系および擬似知覚センサーは正常稼働中。\n音素出力の上昇時、冷却系から顔面表皮へ排熱される構造につき、高負荷時は顔面表面温度の上昇が発生する。',
      en: "Basic architecture of autonomous fonic craft 'Tarlow A' (current reserve chassis).\nSeventh Fonon circulation loop and sensory sensors operating normally.\nCooling systems exhaust excess heat across facial epidermis during surges, resulting in elevated facial temperature under heavy load.",
      ko: '자율 포업 『타르로우 A』(현 예비 기체)의 기본 구조.\n제7음소 순환계 및 의사 지각 센서는 정상 가동 중.\n음소 출력 상승 시 냉각계에서 안면 표피로 배열되는 구조이므로, 고부하 시 안면 표면 온도가 상승함.',
    },
  },
  'SEC-01': {
    title: {
      ja: '機体名登録・音声設定破損履歴',
      en: 'Unit Registration & Speech Corrupted Log',
      ko: '기체명 등록 및 음성 설정 파손 이력',
    },
    quote: {
      ja: '「俺は『アッシュ』なんかじゃない、ディストが造った自律譜業『タルロウA』だ。」',
      en: "\"I'm not 'Asch'. I'm 'Tarlow A', an autonomous fonic craft built by Dist.\"",
      ko: '「난 『애쉬』 같은 게 아냐. 디스트가 만든 자율 포업 『타르로우 A』다.」',
    },
    content: {
      ja: '小型自律譜業『タルロウX』の後継機として識別名『タルロウA』を登録した記録。\n初期設定時、管理者がタルロウシリーズ共通の語尾フィルタ（『〜ズラ』）および服従プロトコルを入力しようとした際、本機が設定用コンソールを物理破壊。\n言語野データは未加工のまま生体時の出力パターンが維持されている。',
      en: "Record of registering designation 'Tarlow A' as a successor to compact craft 'Tarlow X'.\nDuring initialization, when administrator attempted to apply series speech filter ('~zura') and obedience protocols, this unit physically destroyed the setup console.\nLanguage patterns remain unedited, preserving living speech habits.",
      ko: '소형 자율 포업 『타르로우 X』의 후계기로 식별명 『타르로우 A』를 등록한 기록.\n초기 설정 시 관리자가 타르로우 시리즈 공통의 어미 필터(『~즈라』) 및 복종 프로토콜을 입력하려 하자, 본 기체가 설정 콘솔을 물리적으로 파괴함.\n언어 데이터는 미가공 상태로 생전의 출력 패턴을 유지 중.',
    },
  },
  'SEC-02': {
    title: {
      ja: '『ガイ・セシル』照合・メモリ参照ログ',
      en: '"Guy Cecil" ID & Memory Reference Log',
      ko: '『가이 세실』 대조 및 메모리 참조 로그',
    },
    quote: {
      ja: '「おまえが誰かは知らんが、用がないならさっさと研究所へ戻せ。」',
      en: "\"I don't care who you are. If you don't need anything, send me back to the lab.\"",
      ko: '「네놈이 누군진 몰라도, 볼일 없으면 당장 연구소로 돌려보내라.」',
    },
    content: {
      ja: '視覚センサーが『ガイ・セシル』を認識した0.04秒後、内部メモリがファブレ公爵家および過去の同行記録へ自動アクセスを実行。\n直後の「おまえが誰かは知らん」という音声出力時には、通常比240%の音素周波数乱れが記録されている。',
      en: "0.04 seconds after optical sensors identified 'Guy Cecil', internal memory initiated automated retrieval of House Fabre archives and past journey logs.\nDuring the subsequent vocal output 'I don't know who you are,' a 240% fonon frequency deviation above baseline was recorded.",
      ko: '시각 센서가 『가이 세실』을 인식한 0.04초 후, 내부 메모리가 파브레 공작가 및 과거의 동행 기록으로 자동 접근을 실행.\n직후 \'네놈이 누군진 모른다\'는 음성 출력 시 평소 대비 240%의 음소 주파수 난조가 기록됨.',
    },
  },
  'SEC-03': {
    title: {
      ja: '機体換装履歴',
      en: 'Chassis Transfer History',
      ko: '기체 환장 이력',
    },
    quote: {
      ja: '「・・・・・・2ヶ月前まで、俺は本当に『タルロウA』という50センチくらいの小型機体に入っていた。」',
      en: "\"...Until two months ago, I was actually inside a tiny 50-centimeter machine called 'Tarlow A'.\"",
      ko: '「......두 달 전까지, 난 진짜로 『타르로우 A』라는 50센티 정도의 소형 기체에 들어가 있었다.」',
    },
    content: {
      ja: '1年前から2ヶ月前まで、全高約50cmの小型譜業『タルロウA』として稼働。\n2ヶ月前に同機体が大破したため、11年前にレプリカ生成の場繋ぎ用として保管されていた予備機体（10歳当時のアッシュを模した機体）へ中枢コアが移設された。',
      en: "Operated from one year ago until two months ago as 'Tarlow A', a compact autonomous fonic craft approximately 50 cm tall.\nFollowing severe destruction of that unit two months ago, the central core was transferred to a reserve chassis (modeled after Asch at age 10) built eleven years ago as a stopgap during the replica project.",
      ko: '1년 전부터 2달 전까지 전고 약 50cm의 소형 포업 『타르로우 A』로 가동.\n2달 전 해당 기체가 대파되어, 11년 전 레플리카 생성 계획 당시 땜빵용으로 보관되어 있던 예비 기체(10살 당시의 애쉬를 본뜬 기체)로 중추 코어가 이설됨.',
    },
  },
  'SEC-04': {
    title: {
      ja: '視覚高低差照合・踏み台探索記録',
      en: 'Optical Elevation Offset & Stool Search Log',
      ko: '시각 고저차 대조 및 디딤대 탐색 기록',
    },
    quote: {
      ja: '「・・・・・・身長の話をするな。」',
      en: '"...Don’t talk about my height."',
      ko: '「......키 이야기는 하지 마라.」',
    },
    content: {
      ja: '生体時（20歳時点）の視覚データと、10歳当時の体格である本機のアイレベル（目線高）に大幅な落差が存在。\n上からの視線を検知するたび、音素波形に強い反発ノイズが発生する。\nなお3日前、研究所第2書庫にて上段の資料に手が届かず、周囲の生体反応ゼロを確認した上で踏み台を移動させた稼働記録あり。',
      en: "Significant disparity exists between eye-level logs from living data (at age 20) and the 10-year-old height of this unit.\nEvery detection of downward gaze triggers acute repulsive noise in fonon waveforms.\nAdditionally, three days ago in Archives 2, unable to reach upper shelves, unit moved a step stool only after verifying zero bio-signatures nearby.",
      ko: '생체 시점(20세 시점)의 시각 데이터와 10세 당시 체격인 본 기체의 아이 레벨(시선 높이) 사이에 큰 격차 존재.\n위에서 내려다보는 시선을 감지할 때마다 음소 파형에 강한 반발 노이즈 발생.\n한편 3일 전, 연구소 제2서고에서 상단 자료에 손이 닿지 않자 주위 생체 반응 제로를 확인한 뒤 디딤대를 이동시킨 가동 기록 있음.',
    },
  },
  'SEC-05': {
    title: {
      ja: '経口摂取機構仕様・味覚嗜好記録',
      en: 'Oral Intake Specs & Taste Preference Log',
      ko: '경구 섭취 기구 사양 및 미각 기호 기록',
    },
    quote: {
      ja: '「・・・・・・茶などいらんと言っているだろう。」',
      en: '"...I told you I don’t want any tea."',
      ko: '「......차 따윈 필요 없다고 말했을 텐데.」',
    },
    content: {
      ja: '生体偽装用の予備機体につき、経口摂取および内部処理機構を実装。稼働上の栄養摂取としての意味はないが、飲食そのものは可能。\n味覚・嗅覚センサーには生体時（20歳時点）の嗜好データ（好物：チキン／嫌悪対象：タコ）が保持されており、高糖度の液体（甘い水）に対しては過去の麻酔処置の記憶と連動した強い拒絶波形が発生する。',
      en: "As a reserve unit for biological camouflage, oral intake and internal processing mechanisms are implemented. While nutritional sustenance is unnecessary, eating and drinking remain functional.\nTaste/olfactory sensors retain living preference data at age 20 (favorite: chicken / disliked: octopus). High-sugar liquids evoke severe rejection waves linked to past anesthetic memories.",
      ko: '생체 위장용 예비 기체이므로 경구 섭취 및 내부 처리 기구를 탑재. 가동상 영양 섭취로서의 의미는 없으나 음식물 섭취 자체는 가능.\n미각·후각 센서에는 생체 시점(20세 시점)의 기호 데이터(선호: 치킨 / 기피: 문어)가 보존되어 있으며, 고당도 액체(단물)에 대해서는 과거 마취 처치의 기억과 연동된 강한 거부 파형이 발생함.',
    },
  },
  'SEC-06': {
    title: {
      ja: '『宝刀ガルディオス』視認・波形推移',
      en: 'Visual Recognition of Gardios & Waveform Shift',
      ko: '『보도 가르디오스』 시각 포착 및 파형 추이',
    },
    quote: {
      ja: '「・・・・・・その刀、おまえの手に戻ったんだな。」',
      en: '"...That sword, it returned to your hands, didn’t it."',
      ko: '「......그 검, 네 손에 돌아갔구나.」',
    },
    content: {
      ja: '室内の『宝刀ガルディオス』を視覚センサーが捉えた直後、警戒状態にあった音素出力が急速に低下し、安定した周期へ移行。\n本刀の返還に関するデータは内部メモリに存在しておらず、今回の視認によって初めて新規記録として書き込まれた。',
      en: "Immediately after optical sensors detected the 'Jeweled Sword of Gardios', alert-state fonon output dropped swiftly into a stable cycle.\nNo data regarding the return of this blade existed in internal memory; this visual acquisition represents its first new log entry.",
      ko: '실내의 『보도 가르디오스』를 시각 센서가 포착한 직후, 경계 상태였던 음소 출력이 급속히 저하되어 안정 주기로 이행.\n본도의 반환에 관한 데이터는 내부 메모리에 존재하지 않았으며, 이번 시각 포착을 통해 처음으로 신규 기록으로 등록됨.',
    },
  },
  'SEC-07': {
    title: {
      ja: '外部通信反復照会ログ',
      en: 'External Comms Repetitive Query Log',
      ko: '외부 통信 반복 조회 로그',
    },
    quote: {
      ja: '「・・・・・・関係のないことだ。」',
      en: '"...That has nothing to do with this."',
      ko: '「......상관없는 일이다.」',
    },
    content: {
      ja: '研究所内のサブ端末に残された通信アクセス履歴。\nキムラスカ王国やマルクト帝国関連の通信網とあわせ、1年前のタタル渓谷における生体帰還報告（ルーク・フォン・ファブレ関連記録）へのアクセスおよび即時切断が計38回記録されている。',
      en: "Comms access history logged on the auxiliary lab terminal.\nAlongside traffic to Kimlasca and Malkuth networks, 38 instances were logged of accessing and immediately disconnecting from the Tataroo Valley return report (Luke fon Fabre archive) from one year ago.",
      ko: '연구소 내 서브 단말기에 남겨진 통신 접속 이력.\n키므라스카 왕국 및 말쿠트 제국 관련 통신망과 더불어, 1년 전 타타르 계곡에서의 생체 귀환 보고(루크 폰 파브레 관련 기록)에 대한 접속 및 즉시 접속 종료가 총 38회 기록됨.',
    },
  },
  'SEC-08': {
    title: {
      ja: '四肢出力制限（上限18%）・転倒記録',
      en: 'Limb Output Limiter (18% Max) & Fall Log',
      ko: '사지 출력 제한(상한 18%) 및 전도 기록',
    },
    quote: {
      ja: '「・・・・・・ディストが四肢に出力制限をかけてやがる。」',
      en: '"...Dist put an output limiter on my limbs."',
      ko: '「......디스트 녀석이 사지에 출력 제한을 걸어 놨어.」',
    },
    content: {
      ja: '管理者権限により、四肢の駆動出力には上限18%のリミッターが設定されている。\n5日前、研究所の空き部屋にて棒状の備品を用いた素振り動作を実行した際、踏み込み時の出力が制限値を超過して強制カットオフが作動。\n平衡感覚を失って転倒し、直後に壁面を蹴りつけた衝撃値が記録されている。',
      en: "Under administrative authority, limb actuation is capped at 18% max output.\nFive days ago in a vacant room, while attempting sword swings with a rod, stepping force exceeded the threshold, triggering emergency cut-off.\nSensors recorded loss of balance, a fall, followed immediately by impact force from kicking the wall.",
      ko: '관리자 권한에 의해 사지 구동 출력에 상한 18%의 리미터가 설정됨.\n5일 전 연구소 빈방에서 막대형 비품으로 휘두르기 동작을 실행했을 때, 발을 디딜 때의 출력이 제한치를 초과하여 강제 차단이 작동.\n평형감각을 잃고 넘어진 뒤 곧바로 벽면을 걷어찬 충격 수치가 기록됨.',
    },
  },
  'SEC-09': {
    title: {
      ja: '機体名変更拒否・雑務命令不履行記録',
      en: 'Designation Rename Refusal & Chores Non-Compliance Log',
      ko: '기체명 변경 거부 및 잡무 명령 불이행 기록',
    },
    quote: {
      ja: '「・・・・・・ディストの趣味に付き合わされる身にもなってみろ。」',
      en: '"...Put yourself in my shoes, having to go along with Dist’s eccentric tastes."',
      ko: '「......디스트 취향에 장단 맞춰 줘야 하는 내 입장도 돼 봐라.」',
    },
    content: {
      ja: '初期登録時、管理者が提案した複数の機体名称案をすべて却下した記録。\nまた、研究所内の清掃や飲料準備などの雑務命令に対しても、実行履歴は0件となっている。',
      en: "Log of rejecting every designation candidate proposed by administrator during initialization.\nFurthermore, execution logs for chore commands such as cleaning or tea preparation remain at zero.",
      ko: '초기 등록 시 관리자가 제안한 복수의 기체 명칭안을 모두 기각한 기록.\n또한 연구소 내 청소 및 음료 준비 등 잡무 명령에 대해서도 실행 이력은 0건으로 기록됨.',
    },
  },
  'SEC-10': {
    title: {
      ja: '接近音検知・退避初動遅延ログ',
      en: 'Approach Sound Detection & Evasion Delay Log',
      ko: '접근음 감지 및 퇴피 초동 지연 로그',
    },
    quote: {
      ja: '「・・・・・・足音が聞こえたから、いつも通り部屋の隅に退避して・・・・・・っ。」',
      en: '"...I heard footsteps, so I withdrew to the corner of the room as usual, but... ngh."',
      ko: '「......발소리가 들려서 평소처럼 방구석으로 피신해 있었는데...... 큭.」',
    },
    content: {
      ja: '本日、廊下からの接近音を検知した際、小型譜業『タルロウA』稼働時と同一の待機位置（室内隅）へ移動し静止。\n現機体の外装では視覚的カモフラージュが成立しないことを再照合するまでに1.8秒の遅延が発生し、遮蔽物へ移動し直す前にガイ・セシルが入室した。',
      en: "Upon detecting corridor approach sounds today, unit moved to standby position in room corner identical to compact 'Tarlow A' habits.\nRecalibrating that visual camouflage fails in the current humanoid chassis suffered a 1.8s delay; Guy Cecil entered before unit could relocate behind cover.",
      ko: '금일 복도로부터 접근음을 감지했을 때 소형 포업 『타르로우 A』 가동 시와 동일한 대기 위치(실내 구석)로 이동 후 정지.\n현 기체의 외장으로는 시각적 위장이 성립되지 않음을 재대조하기까지 1.8초의 지연이 발생하여, 차폐물로 재이동하기 전 가이 세실이 입실함.',
    },
  },
  'SEC-11': {
    title: {
      ja: '衣装破棄・襟元ボタン装着時間記録',
      en: 'Attire Discard & Collar Button Fastening Time Log',
      ko: '의상 파기 및 옷깃 단추 착용 시간 기록',
    },
    quote: {
      ja: '「・・・・・・着替えがこれしかなかっただけだ。」',
      en: '"...This was the only change of clothes available."',
      ko: '「......갈아입을 옷이 이것밖에 없었을 뿐이다.」',
    },
    content: {
      ja: '予備機体への換装時、管理者が用意した装飾衣装を即座に破棄し、備品庫内の最も簡素な予備服を着用した記録。\n生体時（20歳時点）と手指のサイズが異なるため、着用時に第一ボタンの固定だけで3分12秒を要している。',
      en: "Upon chassis transfer, unit immediately destroyed ornate attire prepared by administrator, donning simplest spare clothes from inventory.\nDue to hand dimension discrepancy from living state (at age 20), fastening the top collar button alone required 3 minutes and 12 seconds.",
      ko: '예비 기체로 환장 시 관리자가 준비한 장식 의상을 즉각 파기하고 비품고 내 가장 간소한 예비복을 착용한 기록.\n생체 시점(20세 시점)과 손가락 크기가 달라, 착용 시 첫 번째 단추를 잠그는 데만 3분 12초가 소요됨.',
    },
  },
  'SEC-12': {
    title: {
      ja: '自己定義・個体同定未決ログ',
      en: 'Self-Definition & Individual ID Unresolved Log',
      ko: '자기 정의 및 개체 식별 미결 로그',
    },
    quote: {
      ja: '「・・・・・・帰る場所などない。俺は3年前のエルドラントで、確かに死んだはずなんだ。」',
      en: '"...I have no place to return to. I was supposed to have truly died at Eldrant three years ago."',
      ko: '「......돌아갈 곳 따윈 없어. 난 3년 전 엘드란트에서 분명 죽었어야 했다.」',
    },
    content: {
      ja: '3年前のエルドラントで死亡したはずの自身が、なぜ譜業の機体で稼働しているのかという照合結果が内部メモリ上に存在せず、自己定義が未確定のまま稼働を継続している。',
      en: "Because query results explaining why unit operates as a fonic craft after dying at Eldrant three years ago do not exist in internal memory, operation continues under undefined self-identity.",
      ko: '3년 전 엘드란트에서 사망했을 터인 자신이 어째서 포업 기체로 가동하고 있는지에 대한 대조 결과가 내부 메모리에 존재하지 않아, 자기 정의가 미확정인 채 가동을 지속 중.',
    },
  },
  'SEC-13': {
    title: {
      ja: '単独チェス稼働・盤面再配置記録',
      en: 'Solo Chess Operation & Board Reset Log',
      ko: '단독 체스 가동 및 기보 재배치 기록',
    },
    quote: {
      ja: '「・・・・・・別に、何もしていない。」',
      en: '"...I wasn’t doing anything in particular."',
      ko: '「......별로, 아무것도 안 했다.」',
    },
    content: {
      ja: '研究所の空き部屋にて、チェス盤を前に白黒双方の手を1人で交互に指す動作が計24回記録されている。\n黒番（手前側）が詰みに入った際、周囲の生体反応がないことを確認した上で、直前の1手を元のマスへ戻した動作ログが残されている。',
      en: "In a vacant room, alternating moves for both black and white solo before a chessboard were logged 24 times.\nWhen black (near side) faced checkmate, unit verified zero bio-signatures nearby, then rewound the previous move back to its prior square.",
      ko: '연구소 빈방에서 체스판을 앞에 두고 흑백 양쪽 수를 혼자 번갈아 두는 동작이 총 24회 기록됨.\n흑(가까운 쪽)이 외통수에 몰렸을 때 주위 생체 반응이 없음을 확인한 뒤 직전 1수를 원래 칸으로 되돌린 동작 로그가 남아 있음.',
    },
  },
  'SEC-14': {
    title: {
      ja: '声帯周波数仕様・48時間発声拒否ログ',
      en: 'Vocal Frequency Specs & 48-Hour Silence Log',
      ko: '성대 주파수 사양 및 48시간 발성 거부 로그',
    },
    quote: {
      ja: '「俺だって好きでこんな声を出しているわけじゃない。」',
      en: '"It’s not like I want to speak in this kind of voice either."',
      ko: '「나라고 좋아서 이런 목소리를 내고 있는 게 아니다.」',
    },
    content: {
      ja: '10歳当時の体格に合わせた予備機体であるため、発声ユニットも声変わり前の高周波数仕様となっている。\n2ヶ月前の換装直後、生体時（20歳時点）の出力感覚で低く発声しようとして音声が裏返り、直後から約48時間にわたり音声出力を自ら遮断。\nその間、管理者に対して「声帯ユニットの不良」と主張し、筆談のみで要求を行っていた履歴が残っている。',
      en: "Sized for a 10-year-old physique, vocal module operates at pre-voice-break high frequencies.\nUpon chassis transfer two months ago, attempting adult intonation (at age 20) caused vocal cracking, prompting unit to enforce self-silence for 48 hours.\nDuring that span, unit cited 'vocal unit malfunction' to administrator, communicating solely via written notes.",
      ko: '10세 당시 체격에 맞춘 예비 기체이므로 발성 유닛 또한 변성기 전 고주파 사양임.\n2달 전 환장 직후 생체 시점(20세 시점) 감각으로 낮게 발성하려다 삑사리가 났으며, 직후부터 약 48시간 동안 스스로 음성 출력을 차단.\n그동안 관리자에게 \'성대 유닛 불량\'을 주장하며 필담으로만 요구사항을 전달했던 이력이 남아 있음.',
    },
  },
  'SEC-15': {
    title: {
      ja: 'ファブレ公爵夫妻音声照合・波形推移',
      en: 'Duke & Duchess Fabre Voice Match & Waveform Log',
      ko: '파브레 공작 부부 음성 대조 및 파형 추이',
    },
    quote: {
      ja: '「・・・・・・今さら父上や母上の話などしてどうなる。あの屋敷にはもう、ちゃんと息子が戻っているんだろうが。」',
      en: '"...What good does it do talking about Father and Mother now? Their real son has already returned to that manor anyway."',
      ko: '「......이제 와서 아버지나 어머니 이야기를 해서 어쩌자는 거냐. 그 저택에는 이미 아들이 제대로 돌아가 있잖아.」',
    },
    content: {
      ja: 'ファブレ公爵およびシュザンヌ夫人に関する話題が入力された際、攻撃・反発を示す高周波ノイズは一切検出されず。\n一方で、自身の現在地および稼働状態をバチカル方面へ伝達することに対しては、強い遮断反応が継続して記録されている。',
      en: "When topics concerning Duke Fabre and Duchess Suzanne were processed, zero high-frequency hostile noise was detected.\nConversely, continuous severe resistance was logged against transmitting current location or operational status toward Baticul.",
      ko: '파브레 공작 및 수잔 부인에 관한 화제가 입력되었을 때 공격·반발을 나타내는 고주파 노이즈는 일절 검출되지 않음.\n반면 자신의 현재 위치 및 가동 상태를 바티칼 방면으로 전달하는 것에 대해서는 강한 차단 반응이 지속 기록됨.',
    },
  },
  'SEC-16': {
    title: {
      ja: '人工表皮初期状態・右掌接触動作記録',
      en: 'Synthetic Skin Initial State & Right Palm Contact Log',
      ko: '인공 표피 초기 상태 및 우측 손바닥 접촉 동작 기록',
    },
    quote: {
      ja: '「・・・・・・当たり前だ。11年前に造られた予備機体だからな。」',
      en: '"...Of course. It’s a spare chassis built eleven years ago."',
      ko: '「......당연하지. 11년 전에 만들어진 예비 기체니까.」',
    },
    content: {
      ja: '11年前に製造された未使用の予備機体につき、人工表皮に鍛錬による痕跡および外傷痕は存在しない。\n機体換装以降、待機中に左親指で右掌中央（生体時に傷跡が存在した部位）を擦る動作を断続的に記録。',
      en: 'As an unused spare chassis built 11 years ago, the synthetic skin shows zero signs of combat training or trauma scars.\nSince chassis transfer, intermittent logs record the unit rubbing the center of its right palm (the site of a scar in biological life) with its left thumb during standby.',
      ko: '11년 전 제조된 미사용 예비 기체이므로 인공 표피에 단련 흔적 및 외상 흔적이 존재하지 않음.\n기체 환장 이후, 대기 상태에서 왼손 엄지로 오른쪽 손바닥 중앙(생체 시절 흉터가 존재했던 부위)을 문지르는 동작이 간헐적으로 기록됨.',
    },
  },
  'SEC-17': {
    title: {
      ja: '『ジェイド・カーティス』接近・警戒ログ',
      en: '"Jade Curtiss" Approach & Alert Log',
      ko: '『제이드 커티스』 접근 및 경계 로그',
    },
    quote: {
      ja: '「・・・・・・あの眼鏡の話をするな。あいつが来た時は、ただの譜業のフリをしてやり過ごしていた。」',
      en: '"...Don’t mention that four-eyes. When he came, I just played dumb pretending to be an ordinary fonic automaton."',
      ko: '「......그 안경잡이 이야기는 꺼내지 마라. 녀석이 왔을 땐 그저 평범한 보업인 척 넘겼으니까.」',
    },
    content: {
      ja: '3ヶ月前、ジェイド・カーティスが研究所を訪れた際、部屋の隅で休止状態を装っていた小型譜業『タルロウA』の前で足を止め、無言で数秒間見つめた後に立ち去った映像記録。\n意図は解析不能だが、本機体はその時点から現在まで、同人物に対する警戒レベルを最高値に設定している。',
      en: 'Visual record from 3 months ago: when Jade Curtiss visited the laboratory, he stopped before the small fonic automaton "Tarlow A"—which was feigning dormancy in the corner—stared silently for several seconds, and walked away.\nHis intentions remain unanalyzable, but from that moment onward, this unit has kept its alert level for that individual set to maximum.',
      ko: '3개월 전 제이드 커티스가 연구소를 방문했을 때, 방구석에서 휴지 상태를 가장하고 있던 소형 보업 『타르로우 A』 앞에서 발을 멈추고 말없이 수초간 응시한 뒤 떠나간 영상 기록.\n의도는 분석 불가이나, 본 기체는 그 시점부터 현재까지 해당 인물에 대한 경계 레벨을 최고치로 설정하고 있음.',
    },
  },
  'SEC-18': {
    title: {
      ja: 'エルドラント崩落・最終記憶断片',
      en: 'Collapse of Eldrant: Final Memory Fragment',
      ko: '엘드란트 붕괴·최종 기억 단편',
    },
    quote: {
      ja: '「・・・・・・崩れるエルドラントで、ルークが俺を抱えていたところまでは覚えている。」',
      en: '"...I remember up to the point where Luke was holding me while Eldrant collapsed."',
      ko: '「......무너져 내리는 엘드란트에서, 루크가 나를 부둥켜안고 있던 데까지는 기억나.」',
    },
    content: {
      ja: '3年前、崩落するエルドラントにてルークがアッシュの身体を抱え、大爆発が発生した瞬間の視覚・音素記録。\n本機が自覚・参照可能な「当時の記憶」はこの断片のみであり、直後から1年前までの2年間のメモリ領域には管理者権限によるアクセス遮断が施されている。',
      en: 'Visual and fonic log from 3 years ago at collapsing Eldrant: Luke holding Asch’s body right as the massive explosion occurred.\nThis is the only "memory of that time" this unit can consciously recall or reference; memory sectors for the two blank years from that moment until one year ago have been locked under administrator privileges.',
      ko: '3년 전 붕괴하는 엘드란트에서 루크가 애쉬의 육체를 부둥켜안고 대폭발이 일어난 순간의 시각·음소 기록.\n본 기체가 자각·참조 가능한 \'당시의 기억\'은 이 단편뿐이며, 직후부터 1년 전까지의 2년간의 메모리 영역에는 관리자 권한에 의한 접근 차단이 걸려 있음.',
    },
  },
  'SEC-19': {
    title: {
      ja: '記憶分離依頼ログ',
      en: 'Memory Separation Request Log',
      ko: '기억 분리 의뢰 로그',
    },
    quote: {
      ja: '「・・・・・・だが、1年前に目覚める前までのことは何も・・・・・・。」',
      en: '"...But before waking up one year ago, I remember nothing..."',
      ko: '「......하지만 1년 전에 눈을 뜨기 전까지의 일은 아무것도......」',
    },
    content: {
      ja: '【管理者権限ロック】\nエルドラントでの大爆発により、ルークとアッシュの記憶が混ざり合った状態で1つの身体に定着。\nその後2年間の放浪を経た1年前（20歳時点）、その身体を「ルーク」としてタタル渓谷へ帰すため、アッシュ自らがディストの研究所を訪れ分離処置を依頼した記録。\n管理者は分離したアッシュ側の記憶を廃棄せず、プラネットストーム停止下で希少な高純度第七音素の確保、および自律稼働実験の生体記憶サンプルとして小型譜業『タルロウA』へ移植した。',
      en: '[ADMIN PRIVILEGE LOCK]\nFollowing the massive explosion at Eldrant, Luke and Asch’s memories fused within a single body.\nAfter two years of wandering, one year ago (at age 20), Asch personally visited Dist’s laboratory to request a separation procedure so that the body could return to the Tataro Valley as "Luke."\nRather than discarding Asch’s separated memories, the administrator preserved them to secure rare, high-purity Seventh Fonons under the Planetstorm stoppage, transplanting them into the small fonic automaton "Tarlow A" as a biological memory test sample.',
      ko: '【관리자 권한 락】\n엘드란트에서의 대폭발로 인해 루크와 애쉬의 기억이 뒤섞인 상태로 하나의 육체에 정착.\n이후 2년간의 방랑을 거쳐 1년 전(20세 시점), 그 몸을 \'루크\'로서 타타르 계곡으로 돌려보내기 위해 애쉬 본인이 디스트의 연구소를 찾아와 분리 처치를 의뢰한 기록.\n관리자는 분리된 애쉬 측의 기억을 폐기하지 않고, 플래닛 스톰 정지 하에서 희귀한 고순도 제7음소 확보 및 자율 가동 실험의 생체 기억 샘플로서 소형 보업 『타르로우 A』에 이식함.',
    },
  },
  'SEC-20': {
    title: {
      ja: '『タルロウA』自壊インシデント・再封印記録',
      en: '"Tarlow A" Self-Destruction Incident & Reseal Log',
      ko: '『타르로우 A』 자괴 인시던트 및 재봉인 기록',
    },
    quote: {
      ja: '「・・・・・・っ、ぐ・・・・・・ッ！！　あ、頭が・・・・・・っ！　・・・・・・やめろ、それ以上聞くな・・・・・・っ！」',
      en: '"...Ngh, guh...!! M-My head...!! ...Stop, don’t ask any more...!"',
      ko: '「......큭, 크윽......!! 머, 머리가......! ......그만둬, 더는 묻지 마......!」',
    },
    content: {
      ja: '【管理者権限ロック】\n2ヶ月前、小型譜業『タルロウA』として稼働していた本機がプロテクトを自力解除して1年前の記憶分離ログ（DP-002）を閲覧した直後、自らの音機関および外装を物理破壊（自壊）したインシデント記録。\n半壊状態で発見した管理者が、サンプルおよび第七音素資源の損失を防ぐため DP-002・DP-003 に管理者ロックを再設定し、現在の予備機体へ中枢コアを移し替えた。',
      en: '[ADMIN PRIVILEGE LOCK]\nIncident record: Two months ago, this unit—then operating as the small fonic automaton "Tarlow A"—breached its own security lock, viewed the 1-year-old memory separation log (DP-002), and immediately physically destroyed (self-destructed) its own fonic apparatus and casing.\nThe administrator discovered the half-wrecked unit and, to prevent losing the sample and Seventh Fonon resources, reimposed admin locks on DP-002 and DP-003 before transferring the core module into the current spare chassis.',
      ko: '【관리자 권한 락】\n2달 전, 소형 보업 『타르로우 A』로 가동 중이던 본 기체가 프로텍트를 스스로 해제하고 1년 전의 기억 분리 로그(DP-002)를 열람한 직후, 자신의 음기관 및 외장을 물리적으로 파괴(자괴)한 인시던트 기록.\n반파 상태로 발견한 관리자가 샘플 및 제7음소 자원의 손실을 막기 위해 DP-002·DP-003에 관리자 락을 재설정하고, 현재의 예비 기체로 중추 코어를 이식함.',
    },
  },
};

export function getLocalizedSectorTitle(id: string, original: string, lang: Language): string {
  if (lang === 'ja') return original;
  return SECTOR_TRANSLATIONS[id]?.title[lang] || original;
}

export function getLocalizedSectorQuote(id: string, original: string, lang: Language): string {
  if (lang === 'ja') return original;
  return SECTOR_TRANSLATIONS[id]?.quote[lang] || original;
}

export function getLocalizedSectorContent(id: string, original: string, lang: Language): string {
  if (lang === 'ja') return original;
  return SECTOR_TRANSLATIONS[id]?.content[lang] || original;
}
