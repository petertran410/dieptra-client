import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import Head from 'next/head';
import { getMetadata } from '../../../utils/helper-server';

export const metadata = getMetadata({
  title: 'Trend Pha Chế',
  description:
    'Cập nhật các Trend pha chế mới nhất: đồ uống viral, topping độc đáo, nguyên liệu theo mùa… Giúp chủ quán thu hút khách và bắt kịp xu hướng F&B đón đầu thị trường.'
});

const TrendPhaChe = () => {
  return (
    <>
      <Head>
        <title>Trend Pha Chế | Diệp Trà</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/trend-pha-che`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.TREND_PHA_CHE}
        title="Trend Pha Chế"
        breadcrumbLabel="Trend Pha Chế"
        description="Cập nhật những xu hướng mới nhất trong ngành pha chế đồ uống. Từ các công thức hot trend đến kỹ thuật pha chế sáng tạo đang được yêu thích."
        categorySlug="trend-pha-che"
      />
    </>
  );
};

export default TrendPhaChe;
