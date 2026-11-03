import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Globe } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-emerald-600 font-bold text-xl tracking-tight">
          <BookOpen className="w-6 h-6" />
          <span>{t('blogTitle')}</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-100 p-1 rounded-lg">
            <Globe className="w-4 h-4 text-gray-500 ml-1.5 mr-1" />
            <button
              type="button"
              onClick={() => setLang('vi')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                lang === 'vi' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              VI
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                lang === 'en' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};