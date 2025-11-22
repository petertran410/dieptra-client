import { getMetadata } from '../../../utils/helper-server';
import ProductList from './product-list';

export async function generateMetadata({ params }) {
  const { categorySlug } = params;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;
    const response = await fetch(`${apiUrl}/api/category/for-cms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error(`API response not ok: ${response.status}`);
    }

    const data = await response.json();

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
    } else {
      return;
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

  const found = categories.find((cat) => cat.slug === targetSlug);

  if (found) {
    return found;
  } else {
    return null;
  }
}

const CategoryProductsPage = ({ params }) => {
  return <ProductList categorySlug={params.categorySlug} />;
};

export default CategoryProductsPage;
