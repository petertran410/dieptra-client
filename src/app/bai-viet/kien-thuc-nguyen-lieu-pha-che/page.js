'use client';

import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import Head from 'next/head';
import { useTranslation } from '../../../hooks/useTranslation';

const KienThucNguyenLieuPhaChe = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Kiến Thức Nguyên Liệu Pha Chế</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/kien-thuc-nguyen-lieu-pha-che`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.KIEN_THUC_NGUYEN_LIEU}
        title={t('kien_thuc_nguyen_lieu.title')}
        breadcrumbLabel={t('kien_thuc_nguyen_lieu.title')}
        description={t('kien_thuc_nguyen_lieu.desc')}
        categorySlug="kien-thuc-nguyen-lieu-pha-che"
      />
    </>
  );
};

export default KienThucNguyenLieuPhaChe;
