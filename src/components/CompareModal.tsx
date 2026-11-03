import React, { useEffect } from 'react';
import type { BlogPost } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { X } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose, posts }) => {
  const { lang, t } = useLanguage();

  // Đóng modal bằng phím ESC theo yêu cầu Accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900">{t('compareModalTitle')}</h2>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {posts.length < 2 ? (
          <p className="text-gray-500 text-center py-8">{t('minTwoPosts')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-sm font-semibold text-gray-600">{t('metric')}</th>
                  {posts.map((post) => (
                    <th key={post.id} className="p-3 text-sm font-semibold text-emerald-700 min-w-[200px]">
                      {lang === 'vi' ? post.title_vi : post.title_en}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                <tr>
                  <td className="p-3 font-medium text-gray-500">{t('author')}</td>
                  {posts.map((post) => (
                    <td key={post.id} className="p-3 font-semibold text-gray-800">{post.author}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-500">{t('category')}</td>
                  {posts.map((post) => (
                    <td key={post.id} className="p-3">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-medium">
                        {post.category}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-500">{t('date')}</td>
                  {posts.map((post) => (
                    <td key={post.id} className="p-3 text-gray-600">{post.date}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-500">{t('readTime')}</td>
                  {posts.map((post) => (
                    <td key={post.id} className="p-3 text-gray-600">{post.readTime}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-500">{t('views')}</td>
                  {posts.map((post) => (
                    <td key={post.id} className="p-3 font-bold text-gray-800">{post.views.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-500">{t('likes')}</td>
                  {posts.map((post) => (
                    <td key={post.id} className="p-3 font-bold text-emerald-600">{post.likes.toLocaleString()}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};