/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../utils/i18n';

export interface LocalizedAchievement {
  title: string;
  description: string;
}

export const ACHIEVEMENTS_I18N: Record<string, Record<Language, LocalizedAchievement>> = {
  ach_01: {
    ja: { title: 'プライバシー保護', description: '一度も管理端末を開かずにエンディングまで到達した' },
    en: { title: 'Privacy Guard', description: 'Reached an ending without opening the terminal once' },
    ko: { title: '사생활 보호', description: '관리 단말기를 한 번도 열지 않고 엔딩에 도달했다' },
  },
  ach_02: {
    ja: { title: 'なにをみてる？', description: '管理端末を何度も覗き込んで、怪しまれた' },
    en: { title: 'What Are You Looking At?', description: 'Peeking repeatedly at the terminal made him suspicious' },
    ko: { title: '뭘 보고 있어?', description: '관리 단말기를 여러 번 들여다보아 의심을 샀다' },
  },
  ach_03: {
    ja: { title: 'のぞき見厳禁', description: '端末の正体を明かしたあと、再び端末を開閉して牽制された' },
    en: { title: 'No Peeking Allowed', description: 'After revealing the terminal, reopening it prompted a warning' },
    ko: { title: '엿보기 엄금', description: '단말기의 정체를 밝힌 뒤, 다시 단말기를 여닫아 견제를 받았다' },
  },
  ach_04: {
    ja: { title: '話上手', description: '累計ですべての追加話題をひらめいた' },
    en: { title: 'Skilled Conversationalist', description: 'Unlocked all additional topics across all playthroughs' },
    ko: { title: '능숙한 화술', description: '누적으로 모든 추가 화제를 떠올렸다' },
  },
  ach_05: {
    ja: { title: 'やぶへび', description: 'ディストの管理者権限ロックを両方こじ開けた' },
    en: { title: 'Waking the Sleeping Dog', description: "Forced open both of Dist's admin security locks" },
    ko: { title: '긁어 부스럼', description: '디스트의 관리자 권한 락을 둘 다 강제로 해제했다' },
  },
  ach_06: {
    ja: { title: 'ご機嫌取り', description: '1回のプレイ中にアッシュの機嫌を最高にした' },
    en: { title: 'Mood Booster', description: "Maxed out Asch's mood during a single playthrough" },
    ko: { title: '비위 맞추기', description: '한 번의 플레이 중 애쉬의 기분을 최고로 끌어올렸다' },
  },
  ach_07: {
    ja: { title: '隠す気ある？', description: 'フェーズ1で三回以内の質問でボロを見抜いて正体を認めさせた' },
    en: { title: 'Even Trying to Hide It?', description: 'Saw through his slip in 3 questions or fewer in Phase 1' },
    ko: { title: '숨길 생각은 있어?', description: '페이즈 1에서 3회 이내의 질문으로 꼬투리를 잡아 정체를 인정하게 했다' },
  },
  ach_08: {
    ja: { title: '勘違いだったらしい', description: 'フェーズ1で的外れな指摘をして、あしらわれた' },
    en: { title: 'Must Have Been Mistaken', description: 'Made an off-base accusation in Phase 1 and got brushed off' },
    ko: { title: '착각이었나 봐', description: '페이즈 1에서 엉뚱한 지적을 하여 가볍게 넘겨졌다' },
  },
  ach_09: {
    ja: { title: 'カンニング', description: 'フェーズ1で手元の端末の画面を本人に見せて正体を認めさせた' },
    en: { title: 'Open Book Test', description: 'Showed him the terminal screen in Phase 1 to force a confession' },
    ko: { title: '커닝', description: '페이즈 1에서 단말기 화면을 직접 보여주어 정체를 인정하게 했다' },
  },
  ach_10: {
    ja: { title: '目と目が合う', description: '機嫌が悪いアッシュに目が合った瞬間話しかけた' },
    en: { title: 'Eye to Eye', description: 'Spoke to Asch the exact moment your eyes met while he was grumpy' },
    ko: { title: '눈이 마주치다', description: '기분이 언짢은 애쉬와 눈이 마주친 순간 말을 걸었다' },
  },
  ach_11: {
    ja: { title: 'なでなでマスター', description: 'アッシュの頭をいっぱい撫でた' },
    en: { title: 'Headpat Master', description: "Patted Asch's head plenty of times" },
    ko: { title: '쓰담쓰담 마스터', description: '애쉬의 머리를 잔뜩 쓰다듬었다' },
  },
  ach_12: {
    ja: { title: 'ひとり反省会', description: '怒っているアッシュをそっとしておき、自分で落ち着く反応を見た' },
    en: { title: 'Cooling Off Alone', description: 'Left angry Asch alone until he calmed himself down' },
    ko: { title: '혼자만의 반성회', description: '화난 애쉬를 내버려 두어, 스스로 진정하는 모습을 지켜보았다' },
  },
  ach_13: {
    ja: { title: 'なんでもない', description: 'アッシュからの逆質問に答えず黙り続けて、質問を取り下げられた' },
    en: { title: 'Never Mind', description: 'Stayed silent when Asch asked a question until he dropped it' },
    ko: { title: '아무것도 아니야', description: '애쉬의 역질문에 대답하지 않고 침묵하여 질문을 거두게 했다' },
  },
  ach_14: {
    ja: { title: '片手間', description: 'プレイ中に別タブ・別ウィンドウへ移動し、画面に戻ったときの反応を見た' },
    en: { title: 'Distracted', description: 'Switched tabs during play and watched his reaction when returning' },
    ko: { title: '딴짓하기', description: '플레이 도중 다른 탭/창으로 이동했다가 복귀했을 때의 반응을 보았다' },
  },
  ach_15: {
    ja: { title: 'なんて言おうか', description: '1回のプレイ中に選択の迷い（長考や話題の一巡）が5回以上になった' },
    en: { title: 'Lost for Words', description: 'Hesitated (prolonged thought or cycling topics) 5+ times in one run' },
    ko: { title: '뭐라고 말할까', description: '한 번의 플레이 중 망설임(장고 또는 화제 순회)이 5회 이상 발생했다' },
  },
  ach_16: {
    ja: { title: '食い気味', description: '1回のプレイ中に2秒以内の即答を10回以上行った' },
    en: { title: 'Lightning Response', description: 'Replied within 2 seconds 10+ times in a single playthrough' },
    ko: { title: '번개같은 맞장구', description: '한 번의 플레이 중 2초 이내의 즉답을 10회 이상 했다' },
  },
  ach_17: {
    ja: { title: '百面相', description: '累計でアッシュのすべての表情差分を見た' },
    en: { title: 'Man of Many Faces', description: "Viewed every single one of Asch's facial expression variants" },
    ko: { title: '천의 얼굴', description: '누적으로 애쉬의 모든 표정 차분을 보았다' },
  },
  ach_18: {
    ja: { title: 'もう寝よう', description: '全10種類のエンディング鑑賞と、実績17までの全解除を達成した' },
    en: { title: 'Time to Sleep', description: 'Viewed all 10 endings and unlocked achievements 1 through 17' },
    ko: { title: '이제 자자', description: '전 10종류의 엔딩 감상과 업적 17까지의 모든 해금을 달성했다' },
  },
};

export const ENDING_HINTS_I18N: Record<string, Record<Language, string>> = {
  END_PHASE1_TARLOW: {
    ja: '拙い嘘に騙されてあげよう',
    en: 'Let yourself be fooled by his clumsy lie',
    ko: '서툰 거짓말에 속아 넘어가 주자',
  },
  END_PHASE2_INCOMPLETE: {
    ja: '機嫌を損ねるムーブを繰り返したら・・・',
    en: 'If you keep doing things that upset him...',
    ko: '기분을 상하게 하는 행동을 반복하면...',
  },
  END_PHASE2_NORMAL_RETURN: {
    ja: '詮索せずに、軽く雑談をしてから帰すと・・・',
    en: 'Without prying, make light small talk and send him home...',
    ko: '캐묻지 않고 가벼운 잡담을 나눈 뒤 돌려보내면...',
  },
  END_PHASE2_STAY_REST: {
    ja: 'もう少し休んでいかないかと聞いてみよう',
    en: 'Ask him if he would like to rest a little longer',
    ko: '조금 더 쉬었다 가지 않겠냐고 물어보자',
  },
  END_PHASE2_ASCH: {
    ja: 'どうしてここに残っているのか聞き出し、彼の名前を呼ぶ',
    en: 'Find out why he remains here, and call his true name',
    ko: '왜 여기에 남아있는지 알아내고, 그의 이름을 부른다',
  },
  END_PHASE3_MACHINE: {
    ja: '彼の問いに、あえて突き放そう',
    en: 'Answer his existential question by pushing him away',
    ko: '그의 물음에 애써 차갑게 밀어내자',
  },
  END_PHASE3_SILENCE: {
    ja: '彼の問いに、言葉を見つけられずにいると・・・',
    en: 'If you fail to find words for his question...',
    ko: '그의 물음에 할 말을 찾지 못하고 있으면...',
  },
  END_PHASE3_TOMORROW: {
    ja: '秘密を知っても追及せず、この部屋で休ませる (a) ／ 静かに見送る (b)',
    en: 'Keep his secret without probing: rest here (a) / see off quietly (b)',
    ko: '비밀을 알고도 추궁하지 않고, 이 방에서 쉬게 한다 (a) ／ 조용히 배웅한다 (b)',
  },
  END_PHASE3_TOMORROW_sub_a: {
    ja: 'a: この部屋で休ませる',
    en: 'a: Let him rest in this room',
    ko: 'a: 이 방에서 쉬게 한다',
  },
  END_PHASE3_TOMORROW_sub_b: {
    ja: 'b: 静かに見送る',
    en: 'b: Quietly see him off',
    ko: 'b: 조용히 배웅한다',
  },
  END_PHASE3_MERCY_DESTROY: {
    ja: '■■する',
    en: '■■',
    ko: '■■한다',
  },
  END_PHASE3_SWAMPMAN: {
    ja: '秘密を突きつけ、全てを明らかにしよう',
    en: 'Confront him with the truth and lay everything bare',
    ko: '비밀을 들이대며 모든 것을 명백히 밝혀내자',
  },
};

export const ARCHIVE_MODAL_LABELS = {
  headerTitle: {
    ja: '実績・記録',
    en: 'Archives & Records',
    ko: '업적·기록',
  },
  btnClose: {
    ja: '✕ 閉じる',
    en: '✕ Close',
    ko: '✕ 닫기',
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
  tabData: {
    ja: '引き継ぎ・初期化',
    en: 'Backup / Reset',
    ko: '데이터 인계·초기화',
  },
  clickHint: {
    ja: '※クリックでヒント表示',
    en: '※ Click to view hints',
    ko: '※ 클릭 시 힌트 표시',
  },
  exportTitle: {
    ja: '引き継ぎコードの書き出し（エクスポート）',
    en: 'Export Backup Code',
    ko: '인계 코드 내보내기 (Export)',
  },
  btnCopy: {
    ja: 'コピー',
    en: 'Copy',
    ko: '복사',
  },
  importTitle: {
    ja: '引き継ぎコードの読み込み（インポート）',
    en: 'Import Backup Code',
    ko: '인계 코드 불러오기 (Import)',
  },
  btnImport: {
    ja: '読み込む',
    en: 'Import',
    ko: '불러오기',
  },
  importPlaceholder: {
    ja: 'GITM1:... のコードをここに貼り付け',
    en: 'Paste GITM1:... code here',
    ko: 'GITM1:... 코드를 여기에 붙여넣기',
  },
  resetTitle: {
    ja: '実績・回収記録の初期化',
    en: 'Reset Archives & Records',
    ko: '업적·회수 기록 초기화',
  },
  btnResetData: {
    ja: 'データをリセット',
    en: 'Reset Data',
    ko: '데이터 리셋',
  },
  confirmReset: {
    ja: '本当に消去しますか？',
    en: 'Are you sure you want to erase?',
    ko: '정말 삭제하시겠습니까?',
  },
  btnConfirmExecute: {
    ja: '消去する',
    en: 'Erase',
    ko: '삭제',
  },
  btnCancel: {
    ja: 'やめる',
    en: 'Cancel',
    ko: '취소',
  },
  msgCopied: {
    ja: '引き継ぎコードをコピーしました。',
    en: 'Backup code copied to clipboard.',
    ko: '인계 코드가 클립보드에 복사되었습니다.',
  },
  msgCopyFallback: {
    ja: '下の欄から引き継ぎコードをコピーしてください。',
    en: 'Please copy the backup code from the box below.',
    ko: '아래 입력란에서 인계 코드를 복사해 주세요.',
  },
  msgEnterCode: {
    ja: '引き継ぎコードを入力してください。',
    en: 'Please enter a backup code.',
    ko: '인계 코드를 입력해 주세요.',
  },
  msgInvalidCode: {
    ja: '引き継ぎコードの形式が正しくありません。',
    en: 'Invalid backup code format.',
    ko: '인계 코드 형식이 올바르지 않습니다.',
  },
  msgImportSuccess: {
    ja: '実績・回収記録データを読み込みました！',
    en: 'Loaded achievement & archive data successfully!',
    ko: '업적·회수 기록 데이터를 성공적으로 불러왔습니다!',
  },
  msgResetSuccess: {
    ja: '実績・回収記録データを初期化しました。',
    en: 'Achievement & archive data has been reset.',
    ko: '업적·회수 기록 데이터가 초기화되었습니다.',
  },
  btnExpressionViewer: {
    ja: '表情鑑賞',
    en: 'Expressions',
    ko: '표정 감상',
  },
  tipExpressionViewer: {
    ja: '実績17解放ご褒美：アッシュの表情パーツを自由に組み合わせて鑑賞できます',
    en: "Achievement 17 Reward: Freely mix and match Asch's facial expression parts",
    ko: '업적 17 해금 보상: 애쉬의 표정 파츠를 자유롭게 조합하여 감상할 수 있습니다',
  },
  btnScenarioInspector: {
    ja: 'シナリオ台本',
    en: 'Scenario Script',
    ko: '시나리오 대본',
  },
  tipScenarioInspector: {
    ja: '実績18解放ご褒美：全シナリオ・分岐セリフ・演出の実機プレビューと台本',
    en: 'Achievement 18 Reward: Live preview and script reader for all scenarios, branching lines, and scenes',
    ko: '업적 18 해금 보상: 전 시나리오·분기 대사·연출의 기기 프리뷰 및 대본',
  },
  btnMaidMode: {
    ja: 'メイドも～ど:',
    en: 'Maid Mode:',
    ko: '메이드 모드:',
  },
  tipMaidMode: {
    ja: '実績11（なでなでマスター）解放ご褒美：立ち絵のベース素体をメイド姿（base2.png）に切り替えます',
    en: 'Achievement 11 Reward: Switches standing sprite base model to maid outfit (base2.png)',
    ko: '업적 11 (쓰담쓰담 마스터) 해금 보상: 스탠딩 일러스트 베이스를 메이드복(base2.png)으로 전환합니다',
  },
};

export function getLocalizedAchievement(id: string, lang: Language): LocalizedAchievement | null {
  const item = ACHIEVEMENTS_I18N[id];
  if (!item) return null;
  return item[lang] || item.ja;
}

export function getLocalizedEndingHint(key: string, lang: Language): string {
  const item = ENDING_HINTS_I18N[key];
  if (!item) return '';
  return item[lang] || item.ja || '';
}
