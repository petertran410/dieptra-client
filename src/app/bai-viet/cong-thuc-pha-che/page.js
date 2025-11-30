'use client';

import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import Head from 'next/head';
import { useTranslation } from '../../../hooks/useTranslation';

const CongThucPhaChe = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Công Thức Pha Chế</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/cong-thuc-pha-che`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.CONG_THUC_PHA_CHE}
        title={t('cong_thuc_pha_che.title')}
        breadcrumbLabel={t('cong_thuc_pha_che.title')}
        description={t('cong_thuc_pha_che.desc')}
        categorySlug="cong-thuc-pha-che"
      />
    </>
  );
};

export default CongThucPhaChe;
