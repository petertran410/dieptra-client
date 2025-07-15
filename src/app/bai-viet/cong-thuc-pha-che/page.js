import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import Head from 'next/head';
import { getMetadata } from '../../../utils/helper-server';

export const metadata = getMetadata({
  title: 'Công Thức Pha Chế',
  description:
    'Tổng hợp Công thức pha chế: trà sữa, café, trà trái cây, đá xay dễ làm – dễ bán. Phù hợp cho người mới, quán nhỏ và chủ F&B cần sáng tạo thực đơn. Cập nhật kiến thức cần thiết trong lĩnh vực.'
});

const CongThucPhaChe = () => {
  return (
    <>
      <Head>
        <title>Công Thức Pha Chế | Diệp Trà</title>
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
