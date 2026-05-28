// import { headers } from 'next/headers';
// import { serverFetch } from '../utils/server-fetch';
// import { ARTICLE_SECTIONS } from '../utils/article-types';
// import { convertSlugURL } from '../utils/helper-server';

// export const revalidate = 3600; // 1 hour

// const STATIC_ROUTES = [
//   { path: '', priority: 1, changeFrequency: 'daily' },
//   { path: '/gioi-thieu-diep-tra', priority: 0.8, changeFrequency: 'monthly' },
//   { path: '/san-pham', priority: 0.9, changeFrequency: 'weekly' },
//   { path: '/bai-viet', priority: 0.9, changeFrequency: 'daily' },
//   { path: '/khach-hang', priority: 0.7, changeFrequency: 'monthly' },
//   { path: '/tuyen-dung', priority: 0.7, changeFrequency: 'weekly' },
//   { path: '/lien-he', priority: 0.6, changeFrequency: 'monthly' },
//   { path: '/chinh-sach-diep-tra', priority: 0.5, changeFrequency: 'monthly' }
// ];

// const safeFetchJson = async (path) => {
//   try {
//     const res = await serverFetch(path, { next: { revalidate: 3600 } });
//     if (!res.ok) return null;
//     return await res.json();
//   } catch (e) {
//     console.error('sitemap fetch failed', path, e);
//     return null;
//   }
// };

// export default async function sitemap() {
//   const host = headers().get('host');
//   const protocol = host?.startsWith('localhost') ? 'http' : 'https';
//   const domain = `${protocol}://${host}`;
//   const now = new Date();

//   // 1. static
//   const staticUrls = STATIC_ROUTES.map((r) => ({
//     url: `${domain}${r.path}`,
//     lastModified: now,
//     changeFrequency: r.changeFrequency,
//     priority: r.priority
//   }));

//   // 2. article categories
//   const articleCategoryUrls = ARTICLE_SECTIONS.map((s) => ({
//     url: `${domain}/bai-viet/${s.slug}`,
//     lastModified: now,
//     changeFrequency: 'weekly',
//     priority: 0.8
//   }));

//   // 3. article details
//   const articleUrls = [];
//   const articleData = await safeFetchJson('/api/news/client/get-all?pageSize=1000&pageNumber=0');
//   const articles = articleData?.content || [];
//   for (const article of articles) {
//     const section = ARTICLE_SECTIONS.find((s) => s.type === article.type);
//     if (!section) continue;
//     articleUrls.push({
//       url: `${domain}/bai-viet/${section.slug}/${convertSlugURL(article.title)}`,
//       lastModified: new Date(article.updatedDate || article.createdDate || now),
//       changeFrequency: 'monthly',
//       priority: 0.6
//     });
//   }

//   // 4. product categories + details
//   const productUrls = [];
//   const categoryData = await safeFetchJson('/api/category/for-cms');
//   const categories = categoryData?.data || [];
//   for (const cat of categories) {
//     if (cat.slug) {
//       productUrls.push({
//         url: `${domain}/san-pham/${cat.slug}`,
//         lastModified: now,
//         changeFrequency: 'weekly',
//         priority: 0.7
//       });
//     }
//   }

//   const productData = await safeFetchJson('/api/product/client/get-all?pageSize=1000&pageNumber=0&is_visible=true');
//   const products = productData?.content || [];
//   for (const p of products) {
//     if (!p.slug) continue;
//     productUrls.push({
//       url: `${domain}/san-pham/diep-tra/${p.slug}`,
//       lastModified: new Date(p.updatedDate || p.createdDate || now),
//       changeFrequency: 'weekly',
//       priority: 0.7
//     });
//   }

//   return [...staticUrls, ...articleCategoryUrls, ...articleUrls, ...productUrls];
// }

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
      url: `${domain}/san-pham/nguyen-lieu-pha-che-lermao`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/san-pham/nguyen-lieu-pha-che-lermao/mut-pha-che-lermao`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/san-pham/nguyen-lieu-pha-che-lermao/cac-loai-topping-tra-sua`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/san-pham/nguyen-lieu-pha-che-/cac-loai-topping-tra-sua/tran-chau-dong-lanh`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/san-pham/nguyen-lieu-pha-che-/cac-loai-topping-tra-sua/tran-chau-kho`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/san-pham/nguyen-lieu-pha-che-/cac-loai-topping-tra-sua/hat-no-thach-no`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/san-pham/nguyen-lieu-pha-che-lermao/cac-loai-topping-tra-sua/topping-dong-san`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/san-pham/nguyen-lieu-pha-che-lermao/cac-loai-bot-pha-che`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${domain}/san-pham/nguyen-lieu-pha-che-lermao/cac-loai-bot-pha-che/bot-sua`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${domain}/san-pham/nguyen-lieu-pha-che-/cac-loai-bot-pha-che/bot-kem-bot-foam`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${domain}/san-pham/nguyen-lieu-pha-che-/cac-loai-bot-pha-che/bot-lam-thach`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${domain}/san-pham/nguyen-lieu-pha-che-lermao/sua-pha-che`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${domain}/san-pham/nguyen-lieu-pha-che-lermao/siro-pha-che-lermao`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${domain}/san-pham/tra-phuong-hoang`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/san-pham/tra-phuong-hoang/tra-o-long-phuong-hoang`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${domain}/san-pham/tra-phuong-hoang/hong-tra-phuong-hoang`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6
    },
    {
      url: `${domain}/san-pham/tra-phuong-hoang/tra-tui-loc-phuong-hoang`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6
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
