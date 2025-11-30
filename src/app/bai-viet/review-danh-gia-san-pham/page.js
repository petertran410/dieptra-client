'use client';

import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import Head from 'next/head';
import { useTranslation } from '../../../hooks/useTranslation';

const ReviewDanhGiaSanPham = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Review - Đánh Giá Sản Phẩm</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/review-danh-gia-san-pham`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.REVIEW_SAN_PHAM}
        title={t('review_danh_gia_san_pham.title')}
        breadcrumbLabel={t('review_danh_gia_san_pham.title')}
        description={t('review_danh_gia_san_pham.desc')}
        categorySlug="review-danh-gia-san-pham"
      />
    </>
  );
};

export default ReviewDanhGiaSanPham;
