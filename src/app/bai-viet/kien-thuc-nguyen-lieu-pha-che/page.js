// src/app/bai-viet/kien-thuc-nguyen-lieu-pha-che/page.js - TRANG 1
import ArticleSubcategoryTemplate from '../_components/article-subcategory-template';
import { ARTICLE_TYPES } from '../../../utils/article-types';
import { getMetadata } from '../../../utils/helper-server';
import Head from 'next/head';

export const metadata = getMetadata({
  title: 'Kiến Thức Nguyên Liệu Pha Chế | Diệp Trà'
});

const KienThucNguyenLieuPhaChe = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/kien-thuc-nguyen-lieu-pha-che`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <ArticleSubcategoryTemplate
        articleType={ARTICLE_TYPES.KIEN_THUC_NGUYEN_LIEU}
        title="Kiến Thức Nguyên Liệu Pha Chế"
        breadcrumbLabel="Kiến Thức Nguyên Liệu Pha Chế"
        description="Kiến thức nguyên liệu pha chế là chuyên mục dành riêng cho những ai yêu thích và hoạt động trong lĩnh vực đồ uống, từ chủ quán café – trà sữa đến các bartender chuyên nghiệp. Tại đây, Diệp Trà sẽ cập nhật thông tin chi tiết và hữu ích về các loại nguyên liệu phổ biến như syrup, topping, mứt trái cây, bột nền, trà nguyên chất..."
      />
    </>
  );
};

export default KienThucNguyenLieuPhaChe;
