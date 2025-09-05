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
      // console.log('🎯 Target category found:', targetCategory.name);
      return getMetadata({
        title: `${targetCategory.title_meta || targetCategory.name}`,
        description: targetCategory.description || 'Khám phá nguyên liệu pha chế chất lượng cao từ Diệp Trà'
      });
    } else {
      console.log('❌ Target category not found for path:', categorySlug);
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

  // console.log('🔍 Finding category for path:', slugPath);
  // console.log(
  //   '📂 Available categories:',
  //   categories.map((c) => ({
  //     id: c.id,
  //     name: c.name,
  //     slug: c.slug,
  //     parent_id: c.parent_id
  //   }))
  // );

  const targetSlug = slugPath[slugPath.length - 1];

  const found = categories.find((cat) => cat.slug === targetSlug);

  if (found) {
    // console.log('✅ Found category:', found.name);
    return found;
  } else {
    console.log('❌ Category not found for slug:', targetSlug);
    console.log(
      'Available slugs:',
      categories.map((c) => c.slug)
    );
    return null;
  }
}

const CategoryProductsPage = ({ params }) => {
  return <ProductList categorySlug={params.categorySlug} />;
};

export default CategoryProductsPage;
