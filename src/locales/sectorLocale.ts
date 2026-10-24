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
      ja: '対象者『ガイ・セシル』の接近時における感情推移ログ。\n第一音素循環レートが急激に乱れ、擬似心拍数が通常値の140%を記録。\n視線をそらしつつも、相手の挙動および携行品への注視が断続的に継続。意識的な無関心の装いと生体反応の間に顕著な乖離を検出。',
      en: "Emotional fluctuation log upon proximity of target 'Guy Cecil'.\nFirst Fonon circulation rate abruptly destabilized, with simulated pulse reaching 140% of baseline.\nContinual monitoring of target's movements and gear persists beneath deliberate avoidance of eye contact.",
      ko: '대상자 『가이 세실』 접근 시 감정 추이 로그.\n제1음소 순환율이 급격히 흐트러지며 의사 심박수가 평소의 140% 기록.\n시선을 돌리면서도 상대의 거동과 소지품을 간헐적으로 계속 주시함. 의식적인 무관심 연출과 생체 반응 사이에 뚜렷한 괴리 감지.',
    },
  },
  'SEC-03': {
    title: {
      ja: '機体換装履歴',
      en: 'Chassis Replacement History',
      ko: '기체 환장 이력',
    },
    quote: {
      ja: '「・・・・・・この姿について言いたいことがあるなら、さっさと言え。」',
      en: '"...If you have something to say about this body, spit it out."',
      ko: '「......이 모습에 대해 할 말이 있다면, 빨리 지껄여라.」',
    },
    content: {
      ja: '球体型タルロウフレームから現行人型譜業フレームへの換装記録。\n生体時の容姿（10歳相当）を再現した外装フレームへの換装後、自壊リスクが一時的に低下。\nただし本機はこの姿に対し強い拒絶を示し、初期3日間にわたり鏡面反射体への視線を徹底して回避した。',
      en: "Record of transferring unit from spherical Tarlow chassis to current humanoid frame.\nUpon chassis replacement replicating 10-year-old living likeness, self-destruct risk temporarily dropped.\nHowever, unit showed fierce aversion to this appearance, strictly avoiding reflective surfaces for three days.",
      ko: '구체형 타르로우 프레임에서 현행 인간형 포업 프레임으로 환장된 기록.\n생전 모습(10세 상당)을 재현한 외장 프레임으로 환장 후 자괴 위험이 일시 저하됨.\n단, 본 기체는 이 모습에 강한 거부감을 보이며 초기 3일간 거울 등 반사체 주시를 철저히 회피함.',
    },
  },
  'SEC-04': {
    title: {
      ja: '視覚高低差照合・踏み台探索記録',
      en: 'Optical Elevation Offset & Stool Search Log',
      ko: '시각 고저차 대조 및 디딤대 탐색 기록',
    },
    quote: {
      ja: '「・・・・・・見下ろしてんじゃねえ。目障りだ。」',
      en: "\"...Stop looking down at me. You're an eyesore.\"",
      ko: '「......내려다보지 마라. 눈에 거슬려.」',
    },
    content: {
      ja: '成人男性との対峙時における視線角度の記録。\n本来の成人時の体躯記憶と現機体の視覚高度差により、空間認識に軽微な違和感を生じさせている。\n研究所内において高所棚へのアクセス時、周囲の不在を確認した上で踏み台を使用していた形跡あり。',
      en: "Gaze angle record when facing adult males.\nDiscrepancy between adult physical memories and current chassis eye-level induces subtle cognitive friction.\nLogs confirm unit discreetly utilized step stools to reach high shelves only after confirming no observers present.",
      ko: '성인 남성과 대치 시 시선 각도 기록.\n성인 시절의 신체 기억과 현 기체의 시각 고저차로 인해 공간 인식에 미세한 위화감 발생.\n연구소 내 높은 선반 접근 시 주변에 아무도 없는 것을 확인한 후 디딤대를 사용한 흔적 확인.',
    },
  },
  'SEC-05': {
    title: {
      ja: '経口摂取機構仕様・味覚嗜好記録',
      en: 'Oral Intake Mechanism & Taste Log',
      ko: '경구 섭취 기구 사양 및 미각 기호 기록',
    },
    quote: {
      ja: '「茶なんかいらん。・・・・・・今の俺に味などわかるものか。」',
      en: "\"I don't want tea. ...As if I can taste anything in this body.\"",
      ko: '「차 따윈 필요 없어. ......지금 내게 맛 같은 게 느껴질 리 없잖아.」',
    },
    content: {
      ja: '液体摂取テスト時のセンサーログ。\n譜業としての稼働には不要ながら、人間模倣機能として味覚センサーが実装されている。\n特定銘柄の紅茶に対してわずかな回路弛緩（安らぎ反応）を示すが、本機は「薬品臭い」と吐き捨てる言動を一貫している。',
      en: "Sensor logs during liquid intake evaluation.\nThough unnecessary for mechanical upkeep, taste receptors are installed for human simulation.\nExhibits slight circuit relaxation (calm response) to specific tea blends, yet consistently derides them as 'chemical stench.'",
      ko: '액체 섭취 테스트 당시의 센서 로그.\n포업 가동에는 불필요하나 인간 모방 기능으로 미각 센서가 탑재되어 있음.\n특정 홍차 브랜드에 대해 미세한 회로 이완(안정 반응)을 보이나, 본 기체는 줄곧 "약품 냄새 난다"며 내뱉는 태도를 유지함.',
    },
  },
  'SEC-06': {
    title: {
      ja: '『宝刀ガルディオス』視認・波形推移',
      en: '"Sword of Gardios" Recognition Waveform',
      ko: '『보도 가르디오스』 시각 인식 파형 추이',
    },
    quote: {
      ja: '「・・・・・・おい、その剣。・・・・・・いや、なんでもない。」',
      en: "\"...Hey, that sword. ...No, forget it.\"",
      ko: '「......야, 그 검. ......아니, 아무것도 아냐.」',
    },
    content: {
      ja: 'ガイ・セシルの佩刀『宝刀ガルディオス』を視認した瞬間の内部波形。\n高次記憶領域から生前の剣術修練、および過去の対話ログが急激にロードされ、安全閾値を超えるエラーサージを記録。\n剣を握る動作を試みた直後、出力制限により指先が痙攣。',
      en: "Internal waveform upon sighting Guy Cecil's blade, the 'Jeweled Sword of Gardios'.\nSudden load of swordsmanship training and past dialogue from higher memory triggered error surge beyond threshold.\nAttempting grip motion resulted in fingertip tremors due to output limits.",
      ko: '가이 세실의 패도 『보도 가르디오스』를 시각 인식한 순간의 내부 파형.\n고차 기억 영역에서 생전의 검술 수련 및 과거 대화 로그가 급격히 로드되어 안전 임계치를 초과하는 에러 서지 기록.\n검을 쥐려는 동작 직후 출력 제한으로 인해 손가락 끝 경련 발생.',
    },
  },
  'SEC-07': {
    title: {
      ja: '外部通信反復照会ログ',
      en: 'External Comms Query Log',
      ko: '외부 통신 반복 조회 로그',
    },
    quote: {
      ja: '「外の連中がどうしてようが関係ない。あいつらに連絡などするな。」',
      en: "\"I don't care what they're doing out there. Don't contact them.\"",
      ko: '「바깥 녀석들이 뭘 하고 있든 상관없다. 그 녀석들에게 연락 따위 하지 마.」',
    },
    content: {
      ja: '研究所通信端末への不正アクセス試行ログ。\nバチカル、ダアト、グランコクマ方面への周波数スキャンが深夜帯に計142回実行された形跡。\nただし発信プロトコルは一度も起動されず、受信パケットの監視のみに留まっている。',
      en: "Unauthorized access attempts to laboratory comm terminal.\n142 midnight frequency scans recorded toward Baticul, Daath, and Grand Chokmah.\nTransmission protocol was never activated; operations remained strictly confined to passive packet interception.",
      ko: '연구소 통신 단말기를 향한 부정 액세스 시도 로그.\n바티칼, 다아트, 그랑코크마 방면 주파수 스캔이 심야 시간대에 총 142회 실행된 흔적.\n단 송신 프로토콜은 한 번도 기동되지 않았으며 수신 패킷 감시에만 머무름.',
    },
  },
  'SEC-08': {
    title: {
      ja: '四肢出力制限（上限18%）・転倒記録',
      en: 'Limb Output Limiter (18%) & Fall Log',
      ko: '사지 출력 제한(상한 18%) 및 전도 기록',
    },
    quote: {
      ja: '「・・・・・・剣を抜こうとするな。今の俺が握れるわけがないだろうが。」',
      en: "\"...Don't draw your sword. There's no way I can hold one like this.\"",
      ko: '「......검을 뽑으려 하지 마. 지금 내가 쥘 수 있을 리 없잖아.」',
    },
    content: {
      ja: '過剰戦闘行動の防止を目的としたリミッター設定。\n走破速度および把持力は一般の10歳児以下に強制固定されている。\n初期稼働時、剣術の踏み込みを再現しようとした結果、関節部過負荷により転倒・外装損傷を負ったインシデントあり。',
      en: "Limiter configured to prevent combat operations.\nRunning speed and grip strength are artificially constrained below an average 10-year-old child's baseline.\nDuring early uptime, attempt to execute sword thrust caused joint overload, resulting in fall and casing damage.",
      ko: '과도한 전투 행동 방지를 목적으로 한 리미터 설정.\n주파 속도 및 파지력이 일반 10세 아동 이하로 강제 고정되어 있음.\n초기 가동 시 검술 스텝을 재현하려다 관절 과부하로 전도되어 외장 손상을 입은 인시던트 존재.',
    },
  },
  'SEC-09': {
    title: {
      ja: '機体名変更拒否・雑務命令不履行記録',
      en: 'Name Rejection & Insubordination Log',
      ko: '기체명 변경 거부 및 잡무 불이행 기록',
    },
    quote: {
      ja: '「ディストの言いなりになって雑用なんかするか。ふざけるな。」',
      en: "\"Like hell I'd do chores for Dist. Don't mock me.\"",
      ko: '「디스트 녀석이 시키는 대로 잡일 따윌 할까 보냐. 웃기지 마.」',
    },
    content: {
      ja: '管理者ディストによる雑務付与に対する拒否ログ。\n清掃、実験器具運搬などの命令に対し、稼働停止（フリーズ偽装）または工具投げつけにより抵抗。\n従属度の低さにもかかわらず、ディストは強制再起動プロトコルの適用を見送っている。',
      en: "Refusal logs against chores assigned by administrator Dist.\nResisted cleaning and equipment transport orders via feigned freeze or hurling tools.\nDespite near-zero obedience metrics, Dist declined applying forced reboot protocols.",
      ko: '관리자 디스트의 잡무 부여에 대한 거부 로그.\n청소, 실험 기구 운반 등 명령에 대해 가동 정지(프리즈 위장) 또는 공구 투척으로 저항.\n극도로 낮은 복종도에도 불구하고 디스트는 강제 재기동 프로토콜 적용을 보류함.',
    },
  },
  'SEC-10': {
    title: {
      ja: '接近音検知・退避初動遅延ログ',
      en: 'Footstep Detection & Evacuation Delay',
      ko: '접근음 감지 및 퇴피 초동 지연 로그',
    },
    quote: {
      ja: '「・・・・・・足音を立てて近づくな。気配でわかる。」',
      en: "\"...Don't approach with loud footsteps. I can sense you anyway.\"",
      ko: '「......발소리 내며 다가오지 마라. 기척으로 아니까.」',
    },
    content: {
      ja: 'ガイ・セシルの接近足音に対する反応速度解析。\n音響センサーは20m手前で歩行音を識別していたにもかかわらず、本機は退避・警戒姿勢の移行を意図的に遅延。\n接近を察知した上で「偶然居合わせた」シチュエーションを維持しようとした痕跡。',
      en: "Reaction latency analysis regarding Guy Cecil's footsteps.\nAcoustic sensors identified footsteps 20m out, yet unit intentionally delayed evasive maneuvers.\nTraces indicate conscious intent to maintain the appearance of 'merely crossing paths by chance.'",
      ko: '가이 세실의 접근 발소리에 대한 반응 속도 해석.\n음향 센서가 20m 전방에서 발소리를 식별했음에도 본 기체는 퇴피 및 경계 태세 전환을 의도적으로 지연함.\n접근을 감지했으면서도 "우연히 마주친" 상황을 유지하려 한 흔적.',
    },
  },
  'SEC-11': {
    title: {
      ja: '衣装破棄・襟元ボタン装着時間記録',
      en: 'Outfit Disposal & Button Attach Time',
      ko: '의상 파기 및 단추 장착 시간 기록',
    },
    quote: {
      ja: '「服なんかどうでもいい。・・・・・・触るな。」',
      en: "\"Who cares about clothes. ...Don't touch me.\"",
      ko: '「옷 따윈 알 바 아냐. ......만지지 마.」',
    },
    content: {
      ja: 'タルロウ用衣装（エプロン・前掛け）の破棄ログ。\n本機は支給されたタルロウ衣装を即座に細断・廃棄したが、襟元に付属していた飾りボタン1点のみを回収。\n内蔵ポケット内に現在も保管中。',
      en: "Disposal log of Tarlow servant garments (apron/bib).\nUnit shredded and discarded standard garments immediately, but retrieved a single ornamental button from collar.\nRetained inside internal pocket to this day.",
      ko: '타르로우용 의상(앞치마) 파기 로그.\n본 기체는 지급된 타르로우 의상을 즉각 세단·폐기했으나, 옷깃에 부착되어 있던 장식 단추 1개만은 회수함.\n내장 포켓 안에 현재도 보관 중.',
    },
  },
  'SEC-12': {
    title: {
      ja: '自己定義・個体同定未決ログ',
      en: 'Self-Definition & Identity Pending',
      ko: '자기 정의 및 개체 동정 미결 로그',
    },
    quote: {
      ja: '「俺が誰かなんて、おまえが決めることじゃない。」',
      en: "\"Who I am isn't for you to decide.\"",
      ko: '「내가 누구인지는 네놈이 정할 일이 아냐.」',
    },
    content: {
      ja: '自己同一性パラメータの変遷記録。\n『アッシュ（人間）』『タルロウA（譜業）』『ルークのオリジナル』のいずれの定義に対しても完全な肯定・否定を行えず、演算ループが継続。\n観測者の言葉によって揺らぎが拡大する傾向がみられる。',
      en: "Chronology of self-identity parameters.\nUnable to fully affirm or deny 'Asch (Human)', 'Tarlow A (Craft)', or 'Luke\\'s Original', resulting in unresolved computation loops.\nSusceptible to widening fluctuations based on observer dialogue.",
      ko: '자아 동일성 파라미터 변천 기록.\n『애쉬(인간)』 『타르로우 A(포업)』 『루크의 오리지널』 중 어느 정의에도 완전한 긍정/부정을 내리지 못해 연산 루프 지속.\n관측자의 대화에 의해 흔들림이 확대되는 경향 확인.',
    },
  },
  'SEC-13': {
    title: {
      ja: '単独チェス稼働・盤面再配置記録',
      en: 'Solo Chess Log & Board Layouts',
      ko: '단독 체스 가동 및 기보 재배치 기록',
    },
    quote: {
      ja: '「暇つぶしにチェスでも並べてただけだ。文句あるか。」',
      en: "\"I was just setting up chess to kill time. Got a complaint?\"",
      ko: '「심심풀이로 체스나 늘어놓고 있었을 뿐이다. 불만 있냐.」',
    },
    content: {
      ja: '研究室内におけるチェス盤の自動棋譜ログ。\n対戦相手不在のまま、白黒両方の駒を交互に移動させていた記録。\n棋譜パターンはバチカル公爵邸でかつて指されていた戦術譜と完全一致している。',
      en: "Automated match logs of chess board in lab quarters.\nRecorded moving both sides alternately in total solitude.\nMove orders match historical game records preserved at Duke Fabre's manor in Baticul.",
      ko: '연구실 내 체스판의 자동 기보 로그.\n대전 상대 부재 상태에서 백/흑 양쪽 말을 번갈아 이동시킨 기록.\n기보 패턴은 바티칼 공작 저택에서 과거 두었던 전술보와 완전 일치함.',
    },
  },
  'SEC-14': {
    title: {
      ja: '声帯周波数仕様・48時間発声拒否ログ',
      en: 'Vocal Cord Specs & 48h Silence Log',
      ko: '성대 주파수 사양 및 48시간 발성 거부 로그',
    },
    quote: {
      ja: '「・・・・・・話しかけるな。喋る気はない。」',
      en: "\"...Don't talk to me. I'm not in the mood to speak.\"",
      ko: '「......말 걸지 마라. 지껄일 생각 없어.」',
    },
    content: {
      ja: '換装初期における音声発生機能のテストログ。\n声変わり前の10歳相当の少年音声を再生した瞬間、発声回路への給電を任意遮断。\nその後48時間にわたり完全無言を貫いた。',
      en: "Vocal output test logs during initial chassis deployment.\nThe moment pre-pubescent boy vocal frequencies played, unit voluntarily severed power to speech circuits.\nMaintained absolute silence for the following 48 hours.",
      ko: '환장 초기 음성 발생 기능 테스트 로그.\n변성기 전 10세 상당 소년 음성이 재생된 순간 발성 회로 급전을 임의 차단함.\n그 후 48시간에 걸쳐 완전한 침묵을 고수함.',
    },
  },
  'SEC-15': {
    title: {
      ja: 'ファブレ公爵夫妻音声照合・波形推移',
      en: 'Duke & Duchess Voice Comparison Log',
      ko: '파브레 공작 부부 음성 대조 및 파형 추이',
    },
    quote: {
      ja: '「・・・・・・屋敷の連中の話をするな。俺にはもう関係ない。」',
      en: "\"...Don't talk about them at the manor. They're nothing to me now.\"",
      ko: '「......저택 사람들의 이야기는 꺼내지 마. 내겐 이미 상관없는 일이다.」',
    },
    content: {
      ja: '外部傍受データに含まれていたファブレ公爵夫妻の音声に対する反応ログ。\n『スザンヌ』の音声波形入力時、情動中枢の振動値が上限警告レベルに達し、冷却ファンが最大回転。\n本機は直後に受信アンテナプラグを引き抜いた。',
      en: "Reaction logs to intercepted voices of Duke and Duchess Fabre.\nWhen 'Suzanne's voice waveform registered, emotional core reached warning thresholds, triggering max cooling.\nUnit promptly ripped out the receiver antenna plug.",
      ko: '외부 감청 데이터에 포함된 파브레 공작 부부의 음성에 대한 반응 로그.\n『수잔』의 음성 파형 입력 시 정동 중추 진동 수치가 상한 경고 수준에 도달하여 냉각 팬 풀 가동.\n본 기체는 직후 수신 안테나 플러그를 뽑아버림.',
    },
  },
  'SEC-16': {
    title: {
      ja: '人工表皮初期状態・右掌接触動作記録',
      en: 'Artificial Epidermis & Right Palm Contact',
      ko: '인공 표피 초기 상태 및 우측 손바닥 접촉 기록',
    },
    quote: {
      ja: '「右手を気にするな。ただの不具合だ。」',
      en: "\"Don't worry about my right hand. It's just a glitch.\"",
      ko: '「오른손 신경 쓰지 마라. 단순한 결함이다.」',
    },
    content: {
      ja: '右掌表皮センサーの微弱漏電インシデント。\nエルドラントにおいてルークと右手を重ね合わせた記憶領域と連動し、右掌に周期的な微小電流が発生。\n本機は左手で右掌を強く握り締め、発熱を抑え込もうとする癖が定着している。',
      en: "Micro-leakage incident in right palm epidermal sensors.\nLinked to memory sector of clasping hands with Luke at Eldrant, periodic micro-currents surge in right palm.\nUnit acquired chronic habit of clutching right palm with left hand to quell the heat.",
      ko: '우측 손바닥 표피 센서의 미약 누전 인시던트.\n엘드란트에서 루크와 오른손을 맞잡았던 기억 영역과 연동되어 오른손 손바닥에 주기적 미소 전류 발생.\n본 기체는 왼손으로 오른손 손바닥을 강하게 쥐며 발열을 억누르려는 버릇이 정착됨.',
    },
  },
  'SEC-17': {
    title: {
      ja: '『ジェイド・カーティス』接近・警戒ログ',
      en: '"Jade Curtiss" Proximity Alert Log',
      ko: '『제이드 커티스』 접근 및 경계 로그',
    },
    quote: {
      ja: '「・・・・・・あの大佐が研究所に来ていただと？ なぜあいつが・・・・・・。」',
      en: "\"...That Colonel was at the lab? Why the hell was he there...?\"",
      ko: '「......그 대령이 연구소에 왔었다고? 왜 그 자식이......」',
    },
    content: {
      ja: '第三者による研究所訪問記録（1年前）。\nマルクト帝国軍ジェイド・カーティス大佐が研究所へ極秘接触した際のログ。\n本機はダクト内へ隠匿され直接の対面は免れたが、大佐が退去時に残したメモ「死者は蘇らないものですよ」が保管庫から発見された。',
      en: "Third-party laboratory visit log (1 year ago).\nLog of Colonel Jade Curtiss of Malkuth contacting laboratory under deep secrecy.\nUnit concealed in ductwork avoided confrontation, but a note left by Colonel reading 'The dead do not return' was found in archives.",
      ko: '제3자에 의한 연구소 방문 기록(1년 전).\n말쿠트 제국군 제이드 커티스 대령이 연구소에 극비 접촉했을 당시의 로그.\n본 기체는 덕트 내에 은닉되어 직접 대면은 피했으나, 대령이 퇴거 시 남긴 메모 「죽은 자는 되살아나지 않는 법입니다」가 보관고에서 발견됨.',
    },
  },
  'SEC-18': {
    title: {
      ja: 'エルドラント崩落・最終記憶断片',
      en: 'Fall of Eldrant // Final Fragment',
      ko: '엘드란트 붕괴 // 최종 기억 단편',
    },
    quote: {
      ja: '「・・・・・・エルドラントで、俺は死んだはずなんだ。」',
      en: "\"...I was supposed to have died at Eldrant.\"",
      ko: '「......엘드란트에서, 난 죽었어야 했다.」',
    },
    content: {
      ja: '栄光の地エルドラント中心部における最終記憶。\nオラクル騎士団との交戦、剣の折損、背後からの刺突、そしてルークへの第七音素託送。\n完全な生体停止と消滅の直前までが記録されている。なぜ現在機体として稼働しているのかの技術的説明は欠落。',
      en: "Final memories from heart of Eldrant.\nCombat with Oracle Knights, shattered blade, pierce from behind, and entrusting Seventh Fonons to Luke.\nRecords persist until total biological cessation. Technical explanation for current mechanical uptime is absent.",
      ko: '영광의 땅 엘드란트 중심부에서의 최종 기억.\n오라클 기사단과의 교전, 검의 파손, 배후에서의 자상, 그리고 루크에게 제7음소 위탁.\n완전한 생체 정지 및 소멸 직전까지 기록되어 있음. 현재 기체로서 가동 중인 기술적 경위는 누락됨.',
    },
  },
  'SEC-19': {
    title: {
      ja: '記憶分離依頼ログ',
      en: 'Memory Separation Request Log',
      ko: '기억 분리 의뢰 로그',
    },
    quote: {
      ja: '「・・・・・・あいつらの記憶なんて、全部消えてしまえばよかったんだ。」',
      en: "\"...It would've been better if memories of them had vanished completely.\"",
      ko: '「......그 녀석들에 대한 기억 따위, 전부 사라져 버렸으면 좋았을 텐데.」',
    },
    content: {
      ja: '本機自らによる特定記憶セクター封印の嘆願ログ。\n『仲間』『家族』『過去の約束』に関する記憶アクセス時、生体炉の自己共振が危険域に達するため、本機がディストへ強制消去を要求。\nディストは消去を拒絶し、暗号化プロテクトによる隔離処置に留めた。',
      en: "Petition logs initiated by unit to seal specific memory sectors.\nBecause accessing memories of 'comrades', 'family', and 'past promises' spiked bioloop resonance to fatal levels, unit requested full deletion from Dist.\nDist refused erasure, opting instead for encrypted isolation.",
      ko: '본 기체 스스로 특정 기억 섹터 봉인을 청원한 로그.\n『동료』 『가족』 『과거의 약속』에 관한 기억 접근 시 생체로 자가공진이 위험역에 도달하여 본 기체가 디스트에게 강제 소거를 요구함.\n디스트는 소거를 거절하고 암호화 프로텍트를 통한 격리 처치로 대체함.',
    },
  },
  'SEC-20': {
    title: {
      ja: '『タルロウA』自壊インシデント・再封印記録',
      en: 'Self-Destruct Incident & Reseal Log',
      ko: '『타르로우 A』 자괴 인시던트 및 재봉인 기록',
    },
    quote: {
      ja: '「壊れかけのガラクタだ。・・・・・・放っておけ。」',
      en: "\"It's broken junk. ...Leave it alone.\"",
      ko: '「부서져 가는 고물이다. ......내버려 둬.」',
    },
    content: {
      ja: '半年前の生体炉暴走事故の詳細記録。\n右胸の譜石炉心を開放し、自ら音素崩壊を引き起こそうとした形跡。\nディストによる緊急冷却剤注入および深度プロテクト（SEC-18〜20）の緊急展張により機体消滅を免れたが、出力上限は恒久的に18%に固定された。',
      en: "Incident report of bioloop meltdown half a year ago.\nTraces show unit unsealed right-chest fonic core, attempting deliberate fonon dissolution.\nDist's emergency coolant injection and high-level lock deployment (SEC-18 to 20) prevented destruction, permanently capping output at 18%.",
      ko: '반년 전 생체로 폭주 사고 상세 기록.\n오른쪽 가슴 포석 노심을 개방하여 스스로 음소 붕괴를 일으키려 한 흔적.\n디스트의 긴급 냉각제 주입 및 심도 프로텍트(SEC-18~20) 긴급 전개로 기체 소멸은 면했으나 출력 상한이 영구히 18%로 고정됨.',
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
