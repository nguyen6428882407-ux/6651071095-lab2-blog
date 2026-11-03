import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import rawPosts from '../data/posts.json';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, User, Eye, Heart, Tag } from 'lucide-react';

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = (rawPosts as BlogPost[]).find((p) => p.id === id);
      setPost(found || null);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="h-72 bg-gray-200 rounded-xl w-full" />
        <div className="h-6 bg-gray-200 rounded w-full" />
        <div className="h-6 bg-gray-200 rounded w-5/6" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bài viết không tồn tại</h2>
        <Link to="/" className="text-emerald-600 font-semibold hover:underline">
          {t('backToList')}
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 mb-6"
      >
        {t('backToList')}
      </Link>

      <div className="flex items-center gap-2 mb-3">
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md flex items-center gap-1">
          <Tag className="w-3.5 h-3.5" />
          {post.category}
        </span>
        <span className="text-xs text-gray-500">• {post.readTime}</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
        {lang === 'vi' ? post.title_vi : post.title_en}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600 pb-6 border-b border-gray-100 mb-6">
        <span className="flex items-center gap-1 font-medium text-gray-800">
          <User className="w-4 h-4 text-emerald-600" />
          {post.author}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-gray-400" />
          {post.date}
        </span>
        <span className="flex items-center gap-1">
          <Eye className="w-4 h-4 text-gray-400" />
          {post.views} {t('views')}
        </span>
        <span className="flex items-center gap-1 text-rose-500 font-medium">
          <Heart className="w-4 h-4" />
          {post.likes} {t('likes')}
        </span>
      </div>

      <img
        src={post.imageUrl}
        alt={lang === 'vi' ? post.title_vi : post.title_en}
        className="w-full h-72 sm:h-96 object-cover rounded-2xl shadow-sm mb-8"
      />

      <div className="prose max-w-none text-gray-700 text-base sm:text-lg leading-relaxed space-y-4">
        <p className="font-semibold text-gray-800 text-lg">
          {lang === 'vi' ? post.excerpt_vi : post.excerpt_en}
        </p>
        <p>{lang === 'vi' ? post.content_vi : post.content_en}</p>
      </div>
    </article>
  );
};