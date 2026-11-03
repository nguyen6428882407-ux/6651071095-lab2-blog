import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import rawPosts from '../data/posts.json';
import { useLanguage } from '../context/LanguageContext';
import { SkeletonCard } from '../components/SkeletonCard';
import { CompareModal } from '../components/CompareModal';
import { Eye, Heart, Check, Layers } from 'lucide-react';

export const ListPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Giảm độ trễ giả lập xuống 150ms để tối ưu điểm Lighthouse Performance
    const timer = setTimeout(() => {
      setPosts(rawPosts as BlogPost[]);
      setLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleCompare = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length >= 3) {
        alert(t('maxThreePosts'));
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedPosts = posts.filter((p) => selectedIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner giới thiệu */}
      <div className="mb-8 p-6 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl text-white shadow-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
          {lang === 'vi' ? 'Chào mừng đến với Blog Công nghệ' : 'Welcome to the Tech Blog'}
        </h1>
        <p className="text-emerald-100 text-sm sm:text-base">
          {lang === 'vi'
            ? 'Khám phá các bài viết lập trình, cấu trúc dữ liệu, và kiến trúc máy tính.'
            : 'Explore posts on software engineering, data structures, and computer architecture.'}
        </p>
      </div>

      {/* Grid danh sách bài viết: Mobile 1 cột, Tablet 2 cột, Desktop 3 cột */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
          : posts.map((post) => {
              const isSelected = selectedIds.includes(post.id);
              return (
                <article
                  key={post.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={post.imageUrl}
                      alt={lang === 'vi' ? post.title_vi : post.title_en}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                      width="400"
                      height="200"
                      decoding="async"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-emerald-700">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 mb-2 hover:text-emerald-600 transition">
                        <Link to={`/post/${post.id}`}>
                          {lang === 'vi' ? post.title_vi : post.title_en}
                        </Link>
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {lang === 'vi' ? post.excerpt_vi : post.excerpt_en}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          {post.likes}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Nút chọn so sánh */}
                        <button
                          type="button"
                          onClick={() => handleToggleCompare(post.id)}
                          className={`px-2.5 py-1 text-xs rounded-lg font-medium transition flex items-center gap-1 ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          {t('selectToCompare')}
                        </button>
                        {/* Nút đọc tiếp */}
                        <Link
                          to={`/post/${post.id}`}
                          className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition"
                        >
                          {t('readMore')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
      </div>

      {/* Floating Bar: Thanh nổi khi có bài được chọn so sánh */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-gray-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>
              {t('selected')}: {selectedIds.length}/3
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            disabled={selectedIds.length < 2}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition ${
              selectedIds.length >= 2
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {t('compareNow')}
          </button>

          <button
            type="button"
            onClick={() => setSelectedIds([])}
            className="text-xs text-gray-400 hover:text-white"
          >
            {t('clearCompare')}
          </button>
        </div>
      )}

      {/* Modal so sánh bài viết */}
      <CompareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        posts={selectedPosts}
      />
    </div>
  );
};