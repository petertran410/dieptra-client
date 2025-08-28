import { Suspense } from 'react';
import ProductDetailWrapper from './product-detail-wrapper';

export async function generateMetadata({ params }) {
  const { productSlug } = params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/product/client/find-by-slug/${productSlug}`,
      { cache: 'force-cache' }
    );

    if (response.ok) {
      const data = await response.json();
      if (data?.title) {
        return {
          title: `${data.title} | Diệp Trà`,
          description: data.general_description || `${data.title} - Sản phẩm chất lượng cao từ Diệp Trà`,
          openGraph: {
            title: `${data.title} | Diệp Trà`,
            description: data.general_description || `${data.title} - Sản phẩm chất lượng cao từ Diệp Trà`,
            images: data.imagesUrl?.[0] ? [data.imagesUrl[0]] : []
          }
        };
      }
    }
  } catch (error) {
    console.error('Product metadata error:', error);
  }

  return {
    title: 'Sản Phẩm | Diệp Trà',
    description: 'Khám phá sản phẩm chất lượng cao từ Diệp Trà'
  };
}

const ProductDetailPage = ({ params }) => {
  return (
    <Suspense fallback={<div>Đang tải thông tin sản phẩm...</div>}>
      <ProductDetailWrapper params={params} />
    </Suspense>
  );
};

export default ProductDetailPage;
