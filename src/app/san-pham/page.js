import { Suspense } from 'react';
import ProductList from './_components/product-list';
import { API } from '../../utils/API';

export async function generateMetadata({ searchParams }) {
  const categoryId = searchParams?.categoryId;
  const subCategoryId = searchParams?.subCategoryId;

  const defaultMetadata = {
    title: 'Sản Phẩm | Diệp Trà',
    description:
      'Khám phá bộ sưu tập nguyên liệu pha chế cao cấp từ Diệp Trà - Siro, mứt, bột kem và nhiều sản phẩm chất lượng khác.'
  };

  try {
    if (!categoryId || categoryId === 'all') {
      return {
        ...defaultMetadata,
        title: 'Sản Phẩm | Diệp Trà'
      };
    }

    const categoryResponse = await API.request({
      url: '/api/category/for-cms',
      method: 'GET'
    });

    const allCategories = categoryResponse?.data || [];

    if (subCategoryId) {
      const subCategory = allCategories.find((cat) => cat.id.toString() === subCategoryId.toString());

      if (subCategory) {
        return {
          title: `${subCategory.title_meta || subCategory.name} | Diệp Trà`,
          description: subCategory.description || defaultMetadata.description,
          openGraph: {
            title: `${subCategory.title_meta || subCategory.name} | Diệp Trà`,
            description: subCategory.description || defaultMetadata.description
          }
        };
      }
    }

    const parentCategory = allCategories.find((cat) => cat.id.toString() === categoryId.toString());

    if (parentCategory) {
      return {
        title: `${parentCategory.title_meta || parentCategory.name} | Diệp Trà`,
        description: parentCategory.description || defaultMetadata.description,
        openGraph: {
          title: `${parentCategory.title_meta || parentCategory.name} | Diệp Trà`,
          description: parentCategory.description || defaultMetadata.description
        }
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return defaultMetadata;
}

const ProductPage = () => {
  return (
    <Suspense fallback={<div>Đang tải sản phẩm...</div>}>
      <ProductList />
    </Suspense>
  );
};

export default ProductPage;
