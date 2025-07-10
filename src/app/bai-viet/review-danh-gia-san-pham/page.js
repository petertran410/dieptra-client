// src/app/bai-viet/review-danh-gia-san-pham/page.js - TRANG 4
import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import { getMetadata } from '../../../utils/helper-server';
import Head from 'next/head';

export const metadata = getMetadata({
  title: 'Review - Đánh Giá Sản Phẩm | Diệp Trà'
});

const ReviewDanhGiaSanPham = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/review-danh-gia-san-pham`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.REVIEW_SAN_PHAM}
        title="Review - Đánh Giá Sản Phẩm"
        breadcrumbLabel="Review - Đánh Giá Sản Phẩm"
        description="Đánh giá chi tiết các sản phẩm nguyên liệu pha chế, máy móc thiết bị và các thương hiệu uy tín trong ngành F&B."
      />
    </>
  );
};

export default ReviewDanhGiaSanPham;
