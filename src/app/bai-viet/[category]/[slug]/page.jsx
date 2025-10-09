import { getArticleTypeBySlug } from '../../../../utils/article-types';
import { META_DESCRIPTION, META_KEYWORDS } from '../../../../utils/helper-server';
import { notFound } from 'next/navigation';
import ArticleDetailClient from './article-detail-client';

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { category, slug } = params;

  const categoryData = getArticleTypeBySlug(category);
  if (!categoryData) {
    return {
      title: 'Không tìm thấy trang',
      description: META_DESCRIPTION
    };
  }

  try {
    const idResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/news/client/find-id-by-slug?slug=${slug}&type=${categoryData.type}`,
      { cache: 'no-store' }
    );

    if (!idResponse.ok) {
      throw new Error('ID not found');
    }

    const idData = await idResponse.json();

    if (!idData?.id) {
      throw new Error('Article ID not found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/news/client/${idData.id}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Article not found');
    }

    const data = await response.json();
    console.log(data);

    const { title: titleData, title_meta, imagesUrl, description } = data || {};
    const imageUrl = imagesUrl?.[0]?.replace('http://', 'https://') || '/images/preview.webp';
    const metaTitle = title_meta || titleData;

    return {
      title: metaTitle,
      description: description || META_DESCRIPTION,
      keywords: META_KEYWORDS,
      openGraph: {
        title: metaTitle,
        description: description || META_DESCRIPTION,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: titleData
          }
        ],
        type: 'article',
        siteName: 'Diệp Trà'
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: description || META_DESCRIPTION,
        images: [imageUrl]
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/${category}/${slug}`
      }
    };
  } catch (error) {
    console.error('Metadata generation error:', error);
    return {
      title: 'Bài viết',
      description: META_DESCRIPTION
    };
  }
}

const ArticleDetailPage = ({ params }) => {
  const { category, slug } = params;

  const categoryData = getArticleTypeBySlug(category);
  if (!categoryData) {
    notFound();
  }

  return <ArticleDetailClient params={params} categoryData={categoryData} />;
};

export default ArticleDetailPage;
