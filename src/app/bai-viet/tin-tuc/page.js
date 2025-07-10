'use client';

import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import Head from 'next/head';

const TinTuc = () => {
  return (
    <>
      <Head>
        <title>Tin Tức | Diệp Trà</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/tin-tuc`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.NEWS}
        title="Tin Tức"
        breadcrumbLabel="Tin Tức"
        description="Cập nhật những tin tức mới nhất về ngành F&B, hoạt động của Diệp Trà và các sự kiện quan trọng trong cộng đồng pha chế."
        categorySlug="tin-tuc"
      />
    </>
  );
};

export default TinTuc;
