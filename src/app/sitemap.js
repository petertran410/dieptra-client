// src/app/sitemap.js - UPDATED với các URL bài viết mới
import { headers } from 'next/headers';

export default function sitemap() {
  const host = headers().get('host');
  const protocol = host?.startsWith('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;

  return [
    // Trang chính
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${domain}/gioi-thieu-diep-tra`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${domain}/san-pham`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${domain}/tuyen-dung`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${domain}/lien-he`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },

    // Trang chính sách
    {
      url: `${domain}/chinh-sach-diep-tra`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    },

    // ===========================================
    // BÀI VIẾT - TRANG CHÍNH VÀ CÁC TRANG CON
    // ===========================================

    // Trang Bài Viết chính
    {
      url: `${domain}/bai-viet`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },

    // Các trang con Bài Viết
    {
      url: `${domain}/bai-viet/kien-thuc-nguyen-lieu-pha-che`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/bai-viet/kien-thuc-ve-tra`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/bai-viet/trend-pha-che`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/bai-viet/review-danh-gia-san-pham`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/bai-viet/cong-thuc-pha-che`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/bai-viet/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    }
  ];
}

// THÊM MỚI: Helper function để generate dynamic sitemap cho bài viết
export async function generateArticleSitemap() {
  const host = headers().get('host');
  const protocol = host?.startsWith('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;

  try {
    // Lấy danh sách bài viết từ API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/news/client/get-all?pageSize=1000`);
    const data = await response.json();
    const { content: articles = [] } = data || {};

    // Generate URLs cho từng bài viết
    const articleUrls = articles.map((article) => {
      const slug = `${article.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')}.${article.id}`;

      return {
        url: `${domain}/bai-viet/${slug}`,
        lastModified: new Date(article.updatedDate || article.createdDate),
        changeFrequency: 'monthly',
        priority: 0.6
      };
    });

    return articleUrls;
  } catch (error) {
    console.error('Error generating article sitemap:', error);
    return [];
  }
}
