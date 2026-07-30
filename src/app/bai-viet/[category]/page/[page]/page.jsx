import { notFound } from 'next/navigation';
import { getArticleTypeBySlug } from '../../../../../utils/article-types';
import { getMetadata, convertSlugURL, getBaseUrl } from '../../../../../utils/helper-server';
import { serverFetch } from '../../../../../utils/server-fetch';
import ArticleCategoryView from '../../_components/article-category-view';

export const revalidate = 300;

const PAGE_SIZE = 10;

export async function generateMetadata({ params }) {
  const { category } = await params;
  const section = getArticleTypeBySlug(category);
  if (!section) return { title: 'Bài viết' };
  return getMetadata({
    title: section.name,
    description: `${section.name} - Diệp Trà chia sẻ kiến thức, tin tức, công thức và review nguyên liệu pha chế.`,
    url: `${getBaseUrl()}/bai-viet/${section.slug}`
  });
}

async function fetchArticles(type, page) {
  try {
    const url = `/api/news/client/get-all?pageSize=${PAGE_SIZE}&pageNumber=${page}&type=${type}`;
    const res = await serverFetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return { content: [], totalElements: 0 };
    return await res.json();
  } catch (e) {
    console.error('fetchArticles error', e);
    return { content: [], totalElements: 0 };
  }
}

export default async function ArticleCategoryPagedPage({ params }) {
  const { category, page } = await params;
  const section = getArticleTypeBySlug(category);
  if (!section) notFound();

  const pageNum = parseInt(page, 10);
  if (!pageNum || pageNum < 1) notFound();

  // page=1 → redirect về URL canonical /bai-viet/<slug>
  // hoặc đơn giản render page 1 với canonical về base
  const data = await fetchArticles(section.type, pageNum - 1);
  const articles = data?.content || [];
  const totalPages = Math.ceil((data?.totalElements || 0) / PAGE_SIZE);

  if (pageNum > totalPages && totalPages > 0) notFound();

  const baseUrl = getBaseUrl();
  const basePath = `/bai-viet/${section.slug}`;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: articles.map((a, i) => ({
      '@type': 'ListItem',
      position: (pageNum - 1) * PAGE_SIZE + i + 1,
      url: `${baseUrl}/bai-viet/${section.slug}/${convertSlugURL(a.title)}`,
      name: a.title
    }))
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Bài viết', item: `${baseUrl}/bai-viet` },
      { '@type': 'ListItem', position: 3, name: section.name, item: `${baseUrl}/bai-viet/${section.slug}` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ArticleCategoryView
        section={section}
        articles={articles}
        currentPage={pageNum}
        totalPages={totalPages}
        basePath={basePath}
      />
    </>
  );
}
