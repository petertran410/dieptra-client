'use client';

import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import Head from 'next/head';
import { useTranslation } from '../../../hooks/useTranslation';

const TinTuc = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Tin Tức</title>
        <meta
          name="description"
          content="Cập nhật Tin tức mới nhất từ Diệp Trà: Sản phẩm mới, chương trình khuyến mãi, sự kiện ngành pha chế và hoạt động thương hiệu nổi bật. Thông tin workshop các khu vực."
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/tin-tuc`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.NEWS}
        title={t('tin_tuc.title')}
        breadcrumbLabel={t('tin_tuc.title')}
        description={t('tin_tuc.desc')}
        categorySlug="tin-tuc"
      />
    </>
  );
};

export default TinTuc;
