'use client';

import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import Head from 'next/head';
import { useTranslation } from '../../../hooks/useTranslation';

const KienThucVeTra = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Kiến Thức Về Trà</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/kien-thuc-ve-tra`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.KIEN_THUC_TRA}
        title={t('kien_thuc_ve_tra.title')}
        breadcrumbLabel={t('kien_thuc_ve_tra.title')}
        description={t('kien_thuc_ve_tra.desc')}
        categorySlug="kien-thuc-ve-tra"
      />
    </>
  );
};

export default KienThucVeTra;
