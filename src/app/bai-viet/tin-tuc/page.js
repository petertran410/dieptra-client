'use client';

import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import Head from 'next/head';
import { getMetadata } from '../../../utils/helper-server';
import { useTranslation } from '../../../hooks/useTranslation';

export const metadata = getMetadata({
  title: 'Tin Tức Diệp Trà',
  description:
    'Cập nhật Tin tức mới nhất từ Diệp Trà: Sản phẩm mới, chương trình khuyến mãi, sự kiện ngành pha chế và hoạt động thương hiệu nổi bật. Thông tin workshop các khu vực.'
});

const TinTuc = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('tin_tuc.title')}</title>
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
