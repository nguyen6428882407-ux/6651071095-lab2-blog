import React, { createContext, useContext, useState } from 'react';
import type { Language } from '../types';
interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  vi: {
    blogTitle: 'DevBlog - Nguyễn Nhất Vũ',
    home: 'Trang chủ',
    allPosts: 'Tất cả bài viết',
    compare: 'So sánh bài viết',
    selectToCompare: 'Chọn so sánh',
    selected: 'Đã chọn',
    compareNow: 'So sánh ngay',
    clearCompare: 'Xóa chọn',
    readMore: 'Đọc tiếp',
    author: 'Tác giả',
    date: 'Ngày đăng',
    category: 'Chủ đề',
    readTime: 'Thời lượng đọc',
    views: 'Lượt xem',
    likes: 'Lượt thích',
    backToList: '← Quay lại danh sách',
    compareModalTitle: 'Bảng đối chiếu thông số bài viết',
    close: 'Đóng',
    minTwoPosts: 'Vui lòng chọn ít nhất 2 bài viết để so sánh.',
    maxThreePosts: 'Bạn chỉ có thể so sánh tối đa 3 bài viết cùng lúc.',
    metric: 'Chỉ số',
    article: 'Bài viết'
  },
  en: {
    blogTitle: 'DevBlog - Nhat Vu Nguyen',
    home: 'Home',
    allPosts: 'All Posts',
    compare: 'Compare Posts',
    selectToCompare: 'Select to compare',
    selected: 'Selected',
    compareNow: 'Compare Now',
    clearCompare: 'Clear selection',
    readMore: 'Read More',
    author: 'Author',
    date: 'Published Date',
    category: 'Category',
    readTime: 'Read Time',
    views: 'Views',
    likes: 'Likes',
    backToList: '← Back to posts',
    compareModalTitle: 'Articles Comparison Metrics',
    close: 'Close',
    minTwoPosts: 'Please select at least 2 articles to compare.',
    maxThreePosts: 'You can compare at most 3 articles at a time.',
    metric: 'Metric',
    article: 'Article'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('vi');

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
