'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { currentLang, setCurrentLang } = useLanguage();

  return (
    <div className="hidden md:flex gap-2 border border-gray-300 rounded-full p-1">
      <button
        onClick={() => setCurrentLang('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          currentLang === 'en'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
            : 'text-gray-700 hover:text-blue-600'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setCurrentLang('ro')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
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


