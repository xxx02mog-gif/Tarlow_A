/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language, useLanguage } from '../utils/i18n';
import { soundEngine } from '../utils/chiptuneAudio';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'modal' | 'title';
}

const LANGUAGES: { id: Language; label: string; full: string }[] = [
  { id: 'ja', label: 'JA', full: '日本語' },
  { id: 'en', label: 'EN', full: 'English' },
  { id: 'ko', label: 'KO', full: '한국어' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  variant = 'modal',
}) => {
  const [lang, setLang] = useLanguage();

  const handleSelect = (nextLang: Language, e: React.MouseEvent) => {
    e.stopPropagation();
    if (nextLang === lang) return;
    try {
      soundEngine.unlockOnUserInteraction();
      soundEngine.playTerminalTab();
    } catch {
      // ignore
    }
    setLang(nextLang);
  };

  if (variant === 'title') {
    return (
      <div
        className={`flex items-center gap-1 bg-black border border-zinc-700 px-1.5 py-0.5 text-[10px] tracking-wider font-mono text-zinc-300 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-zinc-500 mr-0.5">LANG:</span>
        {LANGUAGES.map((item, idx) => (
          <React.Fragment key={item.id}>
            {idx > 0 && <span className="text-zinc-700">|</span>}
            <button
              type="button"
              onClick={(e) => handleSelect(item.id, e)}
              className={`px-1 py-0.2 cursor-pointer transition-colors ${
                lang === item.id
                  ? 'text-black font-bold bg-zinc-200'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          </React.Fragment>
        ))}
      </div>
    );
  }

  // variant === 'modal' (説明書モーダル用)
  return (
    <div
      className={`flex items-center gap-1.5 bg-black border border-zinc-700 px-2 py-0.5 text-[11px] font-mono select-none ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-zinc-400 text-[10px] tracking-wider uppercase mr-1">
        LANGUAGE:
      </span>
      {LANGUAGES.map((item, idx) => (
        <React.Fragment key={item.id}>
          {idx > 0 && <span className="text-zinc-700">/</span>}
          <button
            type="button"
            onClick={(e) => handleSelect(item.id, e)}
            className={`px-1.5 py-0.5 cursor-pointer transition-colors text-[10.5px] ${
              lang === item.id
                ? 'bg-zinc-200 text-black font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};
