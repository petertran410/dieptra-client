import { notFound } from 'next/navigation';
import { getArticleTypeBySlug } from '../../../../utils/article-types';
import { META_DESCRIPTION, META_KEYWORDS, convertSlugURL } from '../../../../utils/helper-server';
import { serverFetch } from '../../../../utils/server-fetch';
import ArticleDetailClient from './article-detail-client';

export const revalidate = 300;

async function fetchArticleId(slug, type) {
  const res = await serverFetch(`/api/news/client/find-id-by-slug?slug=${slug}&type=${type}`, {
    next: { revalidate: 300 }
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.id || null;
}

async function fetchArticle(id) {
  const res = await serverFetch(`/api/news/client/${id}`, { next: { revalidate: 300 } });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const { category, slug } = params;
  const categoryData = getArticleTypeBySlug(category);
  if (!categoryData) return { title: 'Không tìm thấy trang', description: META_DESCRIPTION };

  try {
    const id = await fetchArticleId(slug, categoryData.type);
    if (!id) throw new Error('article not found');
    const data = await fetchArticle(id);
    if (!data) throw new Error('article not found');

    const { title, titleMeta, imagesUrl, description } = data;
    const imageUrl = imagesUrl?.[0]?.replace('http://', 'https://') || '/images/preview.webp';
    const metaTitle = titleMeta || title;
    const canonical = `${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/${category}/${slug}`;

    return {
      title: metaTitle,
      description: description || META_DESCRIPTION,
      keywords: META_KEYWORDS,
      alternates: { canonical },
      openGraph: {
        title: metaTitle,
        description: description || META_DESCRIPTION,
        images: [{ url: imageUrl, width: 800, height: 600, alt: title }],
        type: 'article',
        siteName: 'Diệp Trà'
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: description || META_DESCRIPTION,
        images: [imageUrl]
      }
    };
  } catch (e) {
    console.error('generateMetadata error', e);
    return { title: 'Bài viết', description: META_DESCRIPTION };
  }
}

async function fetchLatest(type, currentId) {
  try {
    const res = await serverFetch(`/api/news/client/get-all?pageSize=7&pageNumber=0&type=${type}`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.content || []).filter((a) => a.id !== currentId).slice(0, 6);
  } catch (e) {
    return [];
  }
}

export default async function ArticleDetailPage({ params }) {
  const { category, slug } = params;
  const categoryData = getArticleTypeBySlug(category);
  if (!categoryData) notFound();

  const articleId = await fetchArticleId(slug, categoryData.type);
  if (!articleId) notFound();
  const newsDetail = await fetchArticle(articleId);
  if (!newsDetail || newsDetail.type !== categoryData.type) notFound();

  const latest = await fetchLatest(categoryData.type, articleId);
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
  const url = `${baseUrl}/bai-viet/${category}/${slug}`;
  const imageUrl = newsDetail.imagesUrl?.[0]?.replace('http://', 'https://') || `${baseUrl}/images/preview.webp`;

  // BlogPosting schema, gọn và đúng chuẩn
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: newsDetail.title,
    description: newsDetail.description || '',
    image: [imageUrl],
    datePublished: newsDetail.createdDate || new Date().toISOString(),
    dateModified: newsDetail.updatedDate || newsDetail.createdDate || new Date().toISOString(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: 'Diệp Trà', url: baseUrl },
    publisher: {
      '@type': 'Organization',
      name: 'Diệp Trà',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/images/logo.png` }
    },
    inLanguage: 'vi-VN'
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Bài viết', item: `${baseUrl}/bai-viet` },
      { '@type': 'ListItem', position: 3, name: categoryData.name, item: `${baseUrl}/bai-viet/${category}` },
      { '@type': 'ListItem', position: 4, name: newsDetail.title, item: url }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ArticleDetailClient
        params={params}
        categoryData={categoryData}
        newsDetail={newsDetail}
        articleId={articleId}
        latestArticles={latest}
      />
    </>
  );
}
