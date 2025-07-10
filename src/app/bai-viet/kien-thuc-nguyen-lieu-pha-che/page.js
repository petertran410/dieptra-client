// src/app/bai-viet/kien-thuc-nguyen-lieu-pha-che/page.js - TRANG 1
import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import { getMetadata } from '../../../utils/helper-server';
import Head from 'next/head';

export const metadata = getMetadata({
  title: 'Kiến Thức Nguyên Liệu Pha Chế | Diệp Trà'
});

const KienThucNguyenLieuPhaChe = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/kien-thuc-nguyen-lieu-pha-che`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.KIEN_THUC_NGUYEN_LIEU}
        title="Kiến Thức Nguyên Liệu Pha Chế"
        breadcrumbLabel="Kiến Thức Nguyên Liệu Pha Chế"
        description="Khám phá những kiến thức bổ ích về nguyên liệu pha chế đồ uống. Từ cách chọn lựa, bảo quản đến ứng dụng trong các công thức pha chế độc đáo."
        categorySlug="kien-thuc-nguyen-lieu-pha-che"
      />
    </>
  );
};

export default KienThucNguyenLieuPhaChe;
