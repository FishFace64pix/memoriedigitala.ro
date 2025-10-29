'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { currentLang, setCurrentLang } = useLanguage();

  return (
    <div className="flex gap-1 md:gap-2 border border-gray-300 rounded-full p-1 min-h-[36px]">
      <button
        onClick={() => setCurrentLang('en')}
        className={`px-2 md:px-3 py-1.5 md:py-1 rounded-full text-xs md:text-sm font-medium transition-all min-w-[36px] min-h-[32px] ${
          currentLang === 'en'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
            : 'text-gray-700 hover:text-blue-600'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setCurrentLang('ro')}
        className={`px-2 md:px-3 py-1.5 md:py-1 rounded-full text-xs md:text-sm font-medium transition-all min-w-[36px] min-h-[32px] ${
          currentLang === 'ro'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
            : 'text-gray-700 hover:text-blue-600'
        }`}
      >
        RO
      </button>
    </div>
  );
}



