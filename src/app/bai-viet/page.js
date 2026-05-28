import { getMetadata, convertSlugURL } from '../../utils/helper-server';
import { ARTICLE_SECTIONS } from '../../utils/article-types';
import { serverFetch } from '../../utils/server-fetch';
import ArticleMainWrapper from './_components/article-main-wrapper';

export const revalidate = 300;

export const metadata = getMetadata({
  title: 'Bài Viết',
  description:
    'Khám phá kho kiến thức phong phú về pha chế, nguyên liệu, xu hướng và những câu chuyện thú vị trong thế giới đồ uống tại Diệp Trà.'
});

async function fetchSections() {
  try {
    const res = await serverFetch('/api/news/client/article-sections', { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error('fetchSections error', e);
    return [];
  }
}

export default async function ArticleMain() {
  const sectionsData = await fetchSections();
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

  // gộp tất cả articles để build ItemList schema
  const allArticles = (sectionsData || [])
    .flatMap((s) => (s.articles || []).map((a) => ({ ...a, _type: s.type })))
    .slice(0, 30);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: allArticles.map((a, i) => {
      const sec = ARTICLE_SECTIONS.find((s) => s.type === a._type);
      const url = sec ? `${baseUrl}/bai-viet/${sec.slug}/${convertSlugURL(a.title)}` : `${baseUrl}/bai-viet`;
      return { '@type': 'ListItem', position: i + 1, name: a.title, url };
    })
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Bài viết', item: `${baseUrl}/bai-viet` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ArticleMainWrapper sectionsData={sectionsData} />
    </>
  );
}
