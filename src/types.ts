export interface BlogPost {
  id: string;
  title_vi: string;
  title_en: string;
  excerpt_vi: string;
  excerpt_en: string;
  content_vi: string;
  content_en: string;
  author: string;
  category: string;
  date: string;
  readTime: string;
  views: number;
  likes: number;
  imageUrl: string;
}

export type Language = 'vi' | 'en';