// src/app/bai-viet/trend-pha-che/page.js - TRANG 3
import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import { getMetadata } from '../../../utils/helper-server';
import Head from 'next/head';

export const metadata = getMetadata({
  title: 'Trend Pha Chế | Diệp Trà'
});

const TrendPhaChe = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/trend-pha-che`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.TREND_PHA_CHE}
        title="Trend Pha Chế"
        breadcrumbLabel="Trend Pha Chế"
        description="Cập nhật những xu hướng mới nhất trong ngành pha chế đồ uống. Từ các công thức hot trend đến kỹ thuật pha chế sáng tạo đang được yêu thích."
      />
    </>
  );
};

export default TrendPhaChe;
