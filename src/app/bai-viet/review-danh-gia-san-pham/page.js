import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import Head from 'next/head';
import { getMetadata } from '../../../utils/helper-server';

export const metadata = getMetadata({
  title: 'Review - Đánh Giá Sản Phẩm',
  description:
    'Khách hàng Review, đánh giá sản phẩm thực tế về các nguyên liệu pha chế: syrup, topping, mứt, trà… Giúp bạn lựa chọn đúng sản phẩm ngon, dễ dùng, đáng mua. Có được trải nghiệm tốt.'
});

const ReviewDanhGiaSanPham = () => {
  return (
    <>
      <Head>
        <title>Review - Đánh Giá Sản Phẩm | Diệp Trà</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/review-danh-gia-san-pham`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.REVIEW_SAN_PHAM}
        title="Review - Đánh Giá Sản Phẩm"
        breadcrumbLabel="Review - Đánh Giá Sản Phẩm"
        description="Đánh giá chi tiết các sản phẩm nguyên liệu pha chế, máy móc thiết bị và các thương hiệu uy tín trong ngành F&B."
        categorySlug="review-danh-gia-san-pham"
      />
    </>
  );
};

export default ReviewDanhGiaSanPham;
