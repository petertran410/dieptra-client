import { getArticleTypeBySlug } from '../../../../utils/article-types';
import { META_DESCRIPTION, META_KEYWORDS } from '../../../../utils/helper-server';
import { notFound } from 'next/navigation';
import ArticleDetailClient from './article-detail-client';

export async function generateMetadata({ params }) {
  const { category, slug } = params;

  // Validate category
  const categoryData = getArticleTypeBySlug(category);
  if (!categoryData) {
    return {
      title: 'Không tìm thấy trang',
      description: META_DESCRIPTION
    };
  }

  try {
    // Tìm ID từ slug và type
    const idResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/news/client/find-id-by-slug?slug=${slug}&type=${categoryData.type}`
    );

    if (!idResponse.ok) {
      throw new Error('ID not found');
    }

    const idData = await idResponse.json();

    if (!idData?.id) {
      throw new Error('Article ID not found');
    }

    // Lấy detail bằng ID
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/news/client/${idData.id}`);

    if (!response.ok) {
      throw new Error('Article not found');
    }

    const data = await response.json();

    const { title: titleData, imagesUrl, description } = data || {};
    const imageUrl = imagesUrl?.[0]?.replace('http://', 'https://') || '/images/preview.webp';
    const title = `${titleData}`;

    return {
      title,
      description: description || META_DESCRIPTION,
      keywords: META_KEYWORDS,
      openGraph: {
        title,
        description: description || META_DESCRIPTION,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: title
          }
        ],
        type: 'article',
        siteName: 'Diệp Trà'
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
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
      title: 'Bài viết ',
      description: META_DESCRIPTION
    };
  }
}

// MAIN COMPONENT - Server component chỉ validate và pass props
const ArticleDetailPage = ({ params }) => {
  const { category, slug } = params;

  // Validate category
  const categoryData = getArticleTypeBySlug(category);
  if (!categoryData) {
    notFound();
  }

  // Pass props to client component
  return <ArticleDetailClient params={params} categoryData={categoryData} />;
};

export default ArticleDetailPage;
