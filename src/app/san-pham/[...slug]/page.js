// CREATE src/app/san-pham/[...slug]/page.js

import { Suspense } from 'react';
import CategoryProductsWrapper from './category-products-wrapper';

export async function generateMetadata({ params }) {
  const { slug } = params;

  if (!slug?.length) {
    return {
      title: 'Sản Phẩm | Diệp Trà',
      description: 'Khám phá bộ sưu tập nguyên liệu pha chế cao cấp từ Diệp Trà'
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/product/client/by-category-slug/${slug.join(',')}`,
      { cache: 'force-cache' }
    );

    if (response.ok) {
      const result = await response.json();
      const category = result?.data?.category;

      if (category) {
        return {
          title: `${category.name} | Diệp Trà`,
          description: category.description || `Khám phá ${category.name} chất lượng cao từ Diệp Trà`,
          openGraph: {
            title: `${category.name} | Diệp Trà`,
            description: category.description || `Khám phá ${category.name} chất lượng cao từ Diệp Trà`
          }
        };
      }
    }
  } catch (error) {
    console.error('Metadata generation error:', error);
  }

  return {
    title: 'Danh Mục Sản Phẩm | Diệp Trà',
    description: 'Khám phá bộ sưu tập nguyên liệu pha chế cao cấp từ Diệp Trà'
  };
}

const CategoryProductsPage = ({ params }) => {
  return (
    <Suspense fallback={<div>Đang tải sản phẩm...</div>}>
      <CategoryProductsWrapper params={params} />
    </Suspense>
  );
};

export default CategoryProductsPage;
