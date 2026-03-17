import { getMetadata } from '../../../utils/helper-server';
import ProductList from './product-list';
import { serverFetchJSON } from '../../../utils/server-fetch';

export async function generateMetadata({ params }) {
  const { categorySlug } = params;

  try {
    const data = await serverFetchJSON('/api/category/for-cms', {
      next: { revalidate: 300 }
    });

    if (!data?.success || !data?.data) {
      throw new Error('Invalid API response structure');
    }

    const categories = data.data;
    const targetCategory = findCategoryBySlugPath(categories, categorySlug);

    if (targetCategory) {
      return getMetadata({
        title: `${targetCategory.title_meta || targetCategory.name}`,
        description: targetCategory.description || 'Khám phá nguyên liệu pha chế chất lượng cao từ Diệp Trà'
      });
    }
  } catch (error) {
    console.error('Meta generation error:', error);
  }

  return getMetadata({
    title: 'Danh Mục Sản Phẩm',
    description: 'Khám phá các danh mục sản phẩm nguyên liệu pha chế từ Diệp Trà'
  });
}

function findCategoryBySlugPath(categories, slugPath) {
  if (!categories || !Array.isArray(categories) || !slugPath || slugPath.length === 0) {
    return null;
  }
  const targetSlug = slugPath[slugPath.length - 1];
  return categories.find((cat) => cat.slug === targetSlug) || null;
}

const CategoryProductsPage = ({ params }) => {
  return <ProductList categorySlug={params.categorySlug} />;
};

export default CategoryProductsPage;
