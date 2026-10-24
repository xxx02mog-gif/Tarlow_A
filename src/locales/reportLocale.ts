/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../utils/i18n';

export const REPORT_LABELS = {
  headerTitle: {
    ja: '対話観測記録',
    en: 'Dialogue Observation Report',
    ko: '대화 관측 기록',
  },
  dialogueRecord: {
    ja: '対話の記録',
    en: 'Dialogue Record',
    ko: '대화 기록',
  },
  reachedEnding: {
    ja: '到達エンディング',
    en: 'Reached Ending',
    ko: '도달한 엔딩',
  },
  completedTopics: {
    ja: '完了トピック',
    en: 'Completed Topics',
    ko: '완료된 화제',
  },
  choicesCount: (count: number, lang: Language) => {
    if (lang === 'en') return `(${count} choices)`;
    if (lang === 'ko') return `(선택 ${count}회)`;
    return `（選択 ${count}回）`;
  },
  terminalDisclosure: {
    ja: '端末データ開示',
    en: 'Terminal Data Disclosure',
    ko: '단말기 데이터 개방',
  },
  terminalDisclosureCounts: (natural: number, forced: number, locked: number, lang: Language) => {
    if (lang === 'en') return `Natural ${natural} / Override ${forced} / Locked ${locked}`;
    if (lang === 'ko') return `자연 ${natural} ／ 강제 ${forced} ／ 미개방 ${locked}`;
    return `自然 ${natural} ／ 強制 ${forced} ／ 未 ${locked}`;
  },
  responsePatterns: {
    ja: '返答の様子（思考傾向）',
    en: 'Response Patterns (Thinking Trends)',
    ko: '응답 양상 (사고 성향)',
  },
  avgThinkingTime: {
    ja: '平均思考時間',
    en: 'Avg. Thinking Time',
    ko: '평균 사고 시간',
  },
  secondsUnit: (sec: string, lang: Language) => {
    if (lang === 'en') return `${sec}s`;
    if (lang === 'ko') return `${sec}초`;
    return `${sec}秒`;
  },
  quickReply: {
    ja: '即答（2秒以内）',
    en: 'Quick Replies (≤2s)',
    ko: '즉답 (2초 이내)',
  },
  timesUnit: (count: number, lang: Language) => {
    if (lang === 'en') return `${count} times`;
    if (lang === 'ko') return `${count}회`;
    return `${count}回`;
  },
  choiceHesitation: {
    ja: '選択の迷い',
    en: 'Hesitation Count',
    ko: '선택의 망설임',
  },
  silenceCount: {
    ja: '沈黙・無言',
    en: 'Silence / Timeouts',
    ko: '침묵 / 무언',
  },
  behaviorDetection: {
    ja: '行動検知',
    en: 'Behavior Detection',
    ko: '행동 감지',
  },
  terminalViews: {
    ja: '管理端末の閲覧',
    en: 'Terminal Checked',
    ko: '관리 단말기 열람',
  },
  terminalViewsCount: (count: number, sec: string, lang: Language) => {
    if (lang === 'en') return `${count} times (Total ${sec}s)`;
    if (lang === 'ko') return `${count}회 (총 ${sec}초)`;
    return `${count}回（計 ${sec}秒）`;
  },
  tabSwitches: {
    ja: 'よそ見（別タブ移動）',
    en: 'Looking Away (Tab Switch)',
    ko: '딴청 (탭 전환)',
  },
  tabEndings: {
    ja: 'エンディング',
    en: 'Endings',
    ko: '엔딩',
  },
  tabAchievements: {
    ja: '実績',
    en: 'Achievements',
    ko: '업적',
  },
  clickHint: {
    ja: '※クリックでヒント表示',
    en: '※ Click to show hint',
    ko: '※ 클릭 시 힌트 표시',
  },
  btnCredits: {
    ja: 'クレジット',
    en: 'Credits',
    ko: '크레딧',
  },
  btnRestart: {
    ja: '最初からやり直す',
    en: 'Restart Game',
    ko: '처음부터 다시하기',
  },
  btnClose: {
    ja: '閉じる',
    en: 'Close',
    ko: '닫기',
  },
  dispositionKeep: {
    ja: 'このまま自分の部屋に置く',
    en: 'Keep him in my room as he is',
    ko: '이대로 내 방에 머물게 한다',
  },
  dispositionReturn: {
    ja: 'ディストの研究所へ送り返す',
    en: "Send him back to Dist's lab",
    ko: '디스트의 연구소로 돌려보낸다',
  },
  dispositionDestroy: {
    ja: '機能停止（破壊）',
    en: 'Deactivate (Destroy)',
    ko: '기능 정지 (파괴)',
  },
  creditCircleName: {
    ja: 'サークル名',
    en: 'Circle',
    ko: '서클명',
  },
  creditAuthor: {
    ja: '制作・シナリオ・イラスト',
    en: 'Production / Scenario / Art',
    ko: '제작·시나리오·일러스트',
  },
  creditBgm: {
    ja: 'BGM素材',
    en: 'BGM Assets',
    ko: 'BGM 소재',
  },
  creditBgmSource: {
    ja: 'イワシロ音楽素材（『魂の煮付け』）',
    en: 'Iwashiro Music ("Tamashii no Nitsuke")',
    ko: '이와시로 음악 소재 (『영혼의 조림』)',
  },
  creditAiAssistance: {
    ja: 'プログラミング補助・テキスト入力補助',
    en: 'Programming & Text Input Support',
    ko: '프로그래밍 보조·텍스트 입력 보조',
  },
  creditOriginalWork: {
    ja: '原作：『テイルズ オブ ジ アビス』',
    en: 'Original: "Tales of the Abyss"',
    ko: '원작: 『테일즈 오브 디 어비스』',
  },
  creditDisclaimer: {
    ja: '※本作は非公式の個人二次創作ゲームであり、原作および関係各社様とは一切関係ございません。',
    en: '* This is an unofficial fan-made derivative work, not affiliated with the original creators or copyright holders.',
    ko: '※ 본 작품은 비공식 개인 2차 창작 게임이며, 원작 및 관계 각사와는 일절 관계가 없습니다.',
  },
};
