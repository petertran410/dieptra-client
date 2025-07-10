// src/app/bai-viet/cong-thuc-pha-che/page.js - TRANG 5
import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import { getMetadata } from '../../../utils/helper-server';
import Head from 'next/head';

export const metadata = getMetadata({
  title: 'Công Thức Pha Chế | Diệp Trà'
});

const CongThucPhaChe = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/cong-thuc-pha-che`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.CONG_THUC_PHA_CHE}
        title="Công Thức Pha Chế"
        breadcrumbLabel="Công Thức Pha Chế"
        description="Khám phá kho tàng công thức pha chế đa dạng từ các món đồ uống cổ điển đến những sáng tạo mới lạ. Hướng dẫn chi tiết từng bước thực hiện."
        categorySlug="cong-thuc-pha-che"
      />
    </>
  );
};

export default CongThucPhaChe;
