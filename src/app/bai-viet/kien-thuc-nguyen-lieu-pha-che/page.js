import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import Head from 'next/head';
import { getMetadata } from '../../../utils/helper-server';

export const metadata = getMetadata({
  title: 'Kiến Thức Nguyên Liệu Pha Chế',
  description:
    'Kiến thức nguyên liệu pha chế là chuyên mục dành riêng cho những ai yêu thích và hoạt động trong lĩnh vực đồ uống, chủ quán café – trà sữa chuyên nghiệp. Diệp Trà sẽ cập nhật thông tin chi tiết và hữu ích về các loại nguyên liệu phổ biến như: Syrup, topping, mứt trái cây, bột, trà nguyên chất...'
});

const KienThucNguyenLieuPhaChe = () => {
  return (
    <>
      <Head>
        <title>Kiến Thức Nguyên Liệu Pha Chế | Diệp Trà</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/kien-thuc-nguyen-lieu-pha-che`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.KIEN_THUC_NGUYEN_LIEU}
        title="Kiến Thức Nguyên Liệu Pha Chế"
        breadcrumbLabel="Kiến Thức Nguyên Liệu Pha Chế"
        description="Khám phá những kiến thức bổ ích về nguyên liệu pha chế đồ uống. Từ cách chọn lựa, bảo quản đến ứng dụng trong các công thức pha chế độc đáo."
        categorySlug="kien-thuc-nguyen-lieu-pha-che"
      />
    </>
  );
};

export default KienThucNguyenLieuPhaChe;
