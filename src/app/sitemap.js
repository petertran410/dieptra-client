import { headers } from 'next/headers';
import { serverFetch } from '../utils/server-fetch';
import { ARTICLE_SECTIONS } from '../utils/article-types';
import { convertSlugURL } from '../utils/helper-server';

export const revalidate = 3600; // 1 hour

const STATIC_ROUTES = [
  { path: '', priority: 1, changeFrequency: 'daily' },
  { path: '/gioi-thieu-diep-tra', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/san-pham', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/bai-viet', priority: 0.9, changeFrequency: 'daily' },
  { path: '/khach-hang', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/tuyen-dung', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/lien-he', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/chinh-sach-diep-tra', priority: 0.5, changeFrequency: 'monthly' }
];

const safeFetchJson = async (path) => {
  try {
    const res = await serverFetch(path, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error('sitemap fetch failed', path, e);
    return null;
  }
};

export default async function sitemap() {
  const host = headers().get('host');
  const protocol = host?.startsWith('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;
  const now = new Date();

  // 1. static
  const staticUrls = STATIC_ROUTES.map((r) => ({
    url: `${domain}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority
  }));

  // 2. article categories
  const articleCategoryUrls = ARTICLE_SECTIONS.map((s) => ({
    url: `${domain}/bai-viet/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  // 3. article details
  const articleUrls = [];
  const articleData = await safeFetchJson('/api/news/client/get-all?pageSize=1000&pageNumber=0');
  const articles = articleData?.content || [];
  for (const article of articles) {
    const section = ARTICLE_SECTIONS.find((s) => s.type === article.type);
    if (!section) continue;
    articleUrls.push({
      url: `${domain}/bai-viet/${section.slug}/${convertSlugURL(article.title)}`,
      lastModified: new Date(article.updatedDate || article.createdDate || now),
      changeFrequency: 'monthly',
      priority: 0.6
    });
  }

  // 4. product categories + details
  const productUrls = [];
  const categoryData = await safeFetchJson('/api/category/for-cms');
  const categories = categoryData?.data || [];
  for (const cat of categories) {
    if (cat.slug) {
      productUrls.push({
        url: `${domain}/san-pham/${cat.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7
      });
    }
  }

  const productData = await safeFetchJson('/api/product/client/get-all?pageSize=1000&pageNumber=0&is_visible=true');
  const products = productData?.content || [];
  for (const p of products) {
    if (!p.slug) continue;
    productUrls.push({
      url: `${domain}/san-pham/diep-tra/${p.slug}`,
      lastModified: new Date(p.updatedDate || p.createdDate || now),
      changeFrequency: 'weekly',
      priority: 0.7
    });
  }

  return [...staticUrls, ...articleCategoryUrls, ...articleUrls, ...productUrls];
}
