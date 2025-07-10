'use client';

import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import Head from 'next/head';

const KienThucVeTra = () => {
  return (
    <>
      <Head>
        <title>Kiến Thức Về Trà | Diệp Trà</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/kien-thuc-ve-tra`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.KIEN_THUC_TRA}
        title="Kiến Thức Về Trà"
        breadcrumbLabel="Kiến Thức Về Trà"
        description="Tìm hiểu sâu về thế giới trà từ các loại trà truyền thống đến các blend hiện đại. Học cách pha trà đúng cách để có được hương vị hoàn hảo."
        categorySlug="kien-thuc-ve-tra"
      />
    </>
  );
};

export default KienThucVeTra;
