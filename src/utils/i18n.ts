/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';

export type Language = 'ja' | 'en' | 'ko';

export const LANGUAGE_LABELS: Record<Language, { label: string; full: string }> = {
  ja: { label: 'JA', full: '日本語' },
  en: { label: 'EN', full: 'English' },
  ko: { label: 'KO', full: '한국어' },
};

const STORAGE_KEY = 'gim_app_lang';
const LANG_CHANGE_EVENT = 'gim_language_changed';

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'ja';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'ko' || saved === 'ja') {
      return saved;
    }
  } catch {
    // ignore
  }
  return 'ja';
}

function syncDocumentLanguage(lang: Language) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.lang = lang;
  }
}

// 初期実行
if (typeof window !== 'undefined') {
  syncDocumentLanguage(getStoredLanguage());
}

export function setStoredLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore
  }
  syncDocumentLanguage(lang);
  window.dispatchEvent(new CustomEvent(LANG_CHANGE_EVENT, { detail: lang }));
}

export function useLanguage(): [Language, (lang: Language) => void] {
  const [lang, setLang] = useState<Language>(getStoredLanguage);

  useEffect(() => {
    syncDocumentLanguage(lang);
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      if (customEvent.detail) {
        setLang(customEvent.detail);
        syncDocumentLanguage(customEvent.detail);
      }
    };
    window.addEventListener(LANG_CHANGE_EVENT, handleLangChange);
    return () => window.removeEventListener(LANG_CHANGE_EVENT, handleLangChange);
  }, [lang]);

  const changeLanguage = useCallback((newLang: Language) => {
    setStoredLanguage(newLang);
    setLang(newLang);
  }, []);

  return [lang, changeLanguage];
}

export const UI_I18N = {
  title: {
    badge: {
      ja: 'UNOFFICIAL FAN MADE GAME',
      en: 'UNOFFICIAL FAN-MADE GAME',
      ko: 'UNOFFICIAL FAN-MADE GAME',
    },
    version: {
      ja: 'VERSION 2.2.0',
      en: 'VERSION 2.2.0',
      ko: 'VERSION 2.2.0',
    },
    genre: {
      ja: 'OBSERVATION DIALOGUE ADV',
      en: 'OBSERVATION DIALOGUE ADV',
      ko: 'OBSERVATION DIALOGUE ADV',
    },
    clickToStart: {
      ja: '― CLICK TO START ―',
      en: '― CLICK TO START ―',
      ko: '― CLICK TO START ―',
    },
    noticeTitle: {
      ja: '注意事項',
      en: 'Notice',
      ko: '주의사항',
    },
    noticeSetting: {
      ja: 'ED後の独自捏造設定',
      en: 'Post-ED original fan fiction',
      ko: 'ED 후의 독자적인 2차 창작 설정',
    },
    noticePairing: {
      ja: 'ガイアシュ（恋愛描写なし）',
      en: 'Guy & Asch (No romance)',
      ko: '가이&애쉬 (연애 묘사 없음)',
    },
    noticeDeath: {
      ja: '死亡ルート有り',
      en: 'Contains death routes',
      ko: '사망 루트 포함',
    },
    aboutTitle: {
      ja: 'このゲームについて',
      en: 'About This Game',
      ko: '이 게임에 대하여',
    },
    aboutText1: {
      ja: '本作は『テイルズ オブ ジ アビス』の非公式二次創作ゲームです。',
      en: 'This is an unofficial fan game based on "Tales of the Abyss".',
      ko: '본 작품은 『테일즈 오브 디 어비스』의 비공식 2차 창작 게임입니다.',
    },
    aboutText2: {
      ja: '原作および関係各社様とは一切関係ございません。',
      en: 'It has no affiliation with the original creators or related companies.',
      ko: '원작 및 관련 기업과는 일절 관계가 없습니다.',
    },
    aboutText3: {
      ja: '素人が作ってるので多目にみてください！',
      en: 'Created by a fan—thank you for your understanding!',
      ko: '아마추어가 제작한 작품이니 너그럽게 봐주세요!',
    },
  },
  header: {
    log: {
      ja: 'LOG',
      en: 'LOG',
      ko: 'LOG',
    },
    soundOn: {
      ja: 'BGM/SE: ON',
      en: 'BGM/SE: ON',
      ko: 'BGM/SE: ON',
    },
    soundOff: {
      ja: 'BGM/SE: OFF',
      en: 'BGM/SE: OFF',
      ko: 'BGM/SE: OFF',
    },
    soundTitle: {
      ja: 'BGM・SEを一括でON/OFF切り替え',
      en: 'Toggle BGM and sound effects',
      ko: 'BGM 및 효과음 일괄 ON/OFF',
    },
    manual: {
      ja: '説明書',
      en: 'Manual',
      ko: '설명서',
    },
    autoOn: {
      ja: 'AUTO: ON',
      en: 'AUTO: ON',
      ko: 'AUTO: ON',
    },
    autoOff: {
      ja: 'AUTO: OFF',
      en: 'AUTO: OFF',
      ko: 'AUTO: OFF',
    },
  },
  footer: {
    terminal: {
      ja: '情報端末',
      en: 'Terminal',
      ko: '정보 단말기',
    },
    thinking: {
      ja: '思考',
      en: 'Thinking',
      ko: '사고',
    },
    disposition: {
      ja: '処分決定',
      en: 'Disposition',
      ko: '처분 결정',
    },
    nextTopic: {
      ja: '他の話題',
      en: 'Other topics',
      ko: '다른 화제',
    },
    silence: {
      ja: '沈黙を保つ',
      en: 'Stay silent',
      ko: '침묵을 지킨다',
    },
  },
  dispositionModal: {
    title: {
      ja: '機体最終処分の決定',
      en: 'Final Unit Disposition',
      ko: '기체 최종 처분 결정',
    },
    subtitle: {
      ja: '機体の処遇を選択してください。決定後の取り消しはできません。',
      en: 'Select the fate of this unit. This decision cannot be undone.',
      ko: '기체의 처우를 선택하십시오. 결정 후에는 취소할 수 없습니다.',
    },
    keep: {
      ja: '【保護】機体を保管し、隠匿を継続する',
      en: '[PROTECT] Retain unit and continue concealment',
      ko: '[보호] 기체를 보관하고 은닉을 지속한다',
    },
    return: {
      ja: '【返還】ディストに引き渡し、真意を問う',
      en: '[RETURN] Hand over to Dist and question true intentions',
      ko: '[반환] 디스트에게 인도하고 진의를 묻는다',
    },
    destroy: {
      ja: '【破棄】生体炉を停止し、機体を完全消去する',
      en: '[DESTROY] Halt bioloop and decommission unit',
      ko: '[파기] 생체로를 정지하고 기체를 완전 소거한다',
    },
    cancel: {
      ja: 'キャンセル',
      en: 'Cancel',
      ko: '취소',
    },
  },
  dialogueLogModal: {
    title: {
      ja: '対話ログ',
      en: 'Dialogue Log',
      ko: '대화 로그',
    },
    empty: {
      ja: 'まだ対話ログがありません。',
      en: 'No dialogue logs recorded yet.',
      ko: '아직 대화 로그가 없습니다.',
    },
    close: {
      ja: '閉じる',
      en: 'Close',
      ko: '닫기',
    },
  },
  manualModal: {
    headerTitle: {
      ja: 'MANUAL / 操作・対話の手引き',
      en: 'MANUAL / Operation & Dialogue Guide',
      ko: 'MANUAL / 조작 및 대화 가이드',
    },
    close: {
      ja: '閉じる',
      en: 'Close',
      ko: '닫기',
    },
    intro1: {
      ja: 'ディストの研究所で見つけた「かつてのアッシュ」の姿をした譜業。',
      en: 'A fonic craft in the form of "the former Asch", found in Dist\'s laboratory.',
      ko: '디스트의 연구소에서 발견된 「과거의 애쉬」의 형상을 한 포업.',
    },
    intro2: {
      ja: '言葉をかわしたり、端末の情報を見て、彼を「何」とするか決めるゲームです。',
      en: 'Converse with him, inspect the terminal data, and decide what he truly is.',
      ko: '말을 건네고 단말기의 정보를 살펴보며, 그를 「무엇」으로 규정할지 결정하는 게임입니다.',
    },
    col1Title: {
      ja: '■ 会話の進め方',
      en: '■ Dialogue Navigation',
      ko: '■ 대화 진행 방법',
    },
    talkTitle: {
      ja: '・話しかける',
      en: '• Speaking',
      ko: '• 말 걸기',
    },
    talkDesc: {
      ja: '左下の選択肢から言葉を選びます。[ ▶ 他の話題 ] で別の候補に切り替えられます。',
      en: 'Choose an option from the bottom-left. Switch candidates with [ ▶ Other topics ].',
      ko: '왼쪽 아래 선택지에서 말을 고릅니다. [ ▶ 다른 화제 ] 로 다른 후보를 전환할 수 있습니다.',
    },
    silenceTitle: {
      ja: '・沈黙を保つ',
      en: '• Staying Silent',
      ko: '• 침묵 유지',
    },
    silenceDesc: {
      ja: 'あえて何も言わないことで、相手の様子を窺うことができます。',
      en: 'By remaining silent, you can observe his spontaneous reaction.',
      ko: '일부러 아무 말도 하지 않음으로써 상대의 반응을 살필 수 있습니다.',
    },
    moodTitle: {
      ja: '・機嫌と反応',
      en: '• Mood & Reactions',
      ko: '• 기분과 반응',
    },
    moodDesc: {
      ja: '話題や態度によって機嫌が変化し、返答や表情が変わります。',
      en: 'His mood shifts depending on topics and attitudes, changing his expressions and replies.',
      ko: '화제나 태도에 따라 기분이 변하며, 대답과 표정이 달라집니다.',
    },
    col2Title: {
      ja: '■ 端末の見方',
      en: '■ Terminal Guide',
      ko: '■ 단말기 보는 법',
    },
    monitorTitle: {
      ja: '・生体モニター（1ページ目）',
      en: '• Vital Monitor (Page 1)',
      ko: '• 생체 모니터 (1페이지)',
    },
    monitorDesc: {
      ja: '機嫌や感情グラフ、稼働ログが表示されます。顔アイコンクリックで拡大します。',
      en: 'Shows mood, emotion graphs, and operational logs. Click the portrait to enlarge.',
      ko: '기분과 감정 그래프, 가동 로그가 표시됩니다. 얼굴 아이콘을 누르면 확대됩니다.',
    },
    infoTitle: {
      ja: '・情報タブ（2ページ目）',
      en: '• Information Tab (Page 2)',
      ko: '• 정보 탭 (2페이지)',
    },
    infoDesc: {
      ja: '対話や記憶解除で判明したデータが記録されます。プロテクト箇所は強制解除も可能です。',
      en: 'Stores intel uncovered from dialogue. Protected sectors can also be forcefully overridden.',
      ko: '대화나 기억 해제로 밝혀진 데이터가 기록됩니다. 프로텍트 구역은 강제 해제도 가능합니다.',
    },
    dispositionTitle: {
      ja: '・処分決定',
      en: '• Final Disposition',
      ko: '• 처분 결정',
    },
    dispositionDesc: {
      ja: '十分な情報を集めた後、右下の処分決定ボタンからエンディングを選択できます。',
      en: 'After gathering enough information, choose an ending via the Disposition button on the bottom-right.',
      ko: '충분한 정보를 모은 후, 오른쪽 아래 처분 결정 버튼에서 엔딩을 선택할 수 있습니다.',
    },
    hintTitle: {
      ja: '■ 探索のヒント',
      en: '■ Exploration Hints',
      ko: '■ 탐색 힌트',
    },
    hint1: {
      ja: '・アッシュの言葉に違和感や引っ掛かりを感じたら、端末のプロテクトを確認してみましょう。',
      en: '• If you sense hesitation or inconsistency in Asch\'s words, inspect the protected sectors in the terminal.',
      ko: '• 애쉬의 말에서 위화감이나 망설임이 느껴진다면, 단말기의 프로텍트 구역을 확인해 보세요.',
    },
    hint2: {
      ja: '・無理に聞き出そうとすると機嫌を損ねることもあります。時には沈黙も有効です。',
      en: '• Pushing too hard can upset him. At times, patient silence is more effective.',
      ko: '• 억지로 캐물으려 하면 기분을 상하게 할 수 있습니다. 때로는 침묵도 효과적입니다.',
    },
  },
  dataTerminal: {
    page1Label: {
      ja: 'MONITOR',
      en: 'MONITOR',
      ko: 'MONITOR',
    },
    page2Label: {
      ja: 'INFO',
      en: 'INFO',
      ko: 'INFO',
    },
    moodLabel: {
      ja: '機嫌',
      en: 'Mood',
      ko: '기분',
    },
    trustLabel: {
      ja: '信頼',
      en: 'Trust',
      ko: '신뢰',
    },
    errorLabel: {
      ja: '負荷',
      en: 'Error',
      ko: '부하',
    },
    vitalStatus: {
      ja: '生体稼働状態',
      en: 'VITAL STATUS',
      ko: '생체 가동 상태',
    },
    protectedWarning: {
      ja: '深層防壁検知',
      en: 'SEC-LOCK DETECTED',
      ko: '심층 방벽 감지',
    },
    overrideButton: {
      ja: '強制解除',
      en: 'OVERRIDE',
      ko: '강제해제',
    },
    noProtected: {
      ja: 'ロック中のセクターはありません',
      en: 'No locked sectors detected',
      ko: '잠긴 섹터가 없습니다',
    },
  },
  thinking: {
    title: {
      ja: 'ガイの思考推論',
      en: 'Guy\'s Deduction',
      ko: '가이의 사고 추론',
    },
    keywordsTitle: {
      ja: '思考の断片（キーワード）',
      en: 'Thought Fragments (Keywords)',
      ko: '사고의 단편 (키워드)',
    },
    recipesTitle: {
      ja: '連想推論（スロット）',
      en: 'Deduction Synthesis (Slots)',
      ko: '연상 추론 (슬롯)',
    },
    synthesizeBtn: {
      ja: '思考を結びつける',
      en: 'Synthesize Thoughts',
      ko: '생각을 결합한다',
    },
    clearBtn: {
      ja: 'クリア',
      en: 'Clear',
      ko: '초기화',
    },
    closeBtn: {
      ja: '思考を終える',
      en: 'End Thinking',
      ko: '사고를 마친다',
    },
  },
  common: {
    close: {
      ja: '閉じる',
      en: 'Close',
      ko: '닫기',
    },
    cancel: {
      ja: 'キャンセル',
      en: 'Cancel',
      ko: '취소',
    },
    asch: {
      ja: 'アッシュ',
      en: 'Asch',
      ko: '애쉬',
    },
    guy: {
      ja: 'ガイ',
      en: 'Guy',
      ko: '가이',
    },
    dist: {
      ja: 'ディスト',
      en: 'Dist',
      ko: '디스트',
    },
  },
} as const;
