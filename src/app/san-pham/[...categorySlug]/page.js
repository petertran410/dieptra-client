// src/app/san-pham/[...categorySlug]/page.js
import { getMetadata } from '../../../utils/helper-server';
import ProductList from './product-list';

export async function generateMetadata({ params }) {
  const { categorySlug } = params;

  try {
    // Fetch categories để tìm category name
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/category/for-cms`);
    const data = await response.json();

    if (data.success) {
      const categories = data.data;
      const targetCategory = findCategoryBySlugPath(categories, categorySlug);

      if (targetCategory) {
        return getMetadata({
          title: `${targetCategory.name} | Diệp Trà`,
          description:
            targetCategory.description ||
            `Khám phá ${targetCategory.name} - Nguyên liệu pha chế chất lượng cao từ Diệp Trà`
        });
      }
    }
  } catch (error) {
    console.error('Metadata generation error:', error);
  }

  return getMetadata({
    title: 'Danh Mục Sản Phẩm | Diệp Trà',
    description: 'Khám phá các danh mục sản phẩm nguyên liệu pha chế từ Diệp Trà'
  });
}

// Helper function để tìm category theo slug path
function findCategoryBySlugPath(categories, slugPath) {
  // Build category tree
  const categoryMap = {};
  const rootCategories = [];

  categories.forEach((cat) => {
    categoryMap[cat.id] = { ...cat, children: [] };
  });

  categories.forEach((cat) => {
    if (cat.parent_id) {
      categoryMap[cat.parent_id]?.children.push(categoryMap[cat.id]);
    } else {
      rootCategories.push(categoryMap[cat.id]);
    }
  });

  // Traverse theo slug path
  let current = rootCategories;
  let targetCategory = null;

  for (const slug of slugPath) {
    targetCategory = current.find((cat) => cat.slug === slug);
    if (!targetCategory) return null;
    current = targetCategory.children;
  }

  return targetCategory;
}

const CategoryProductsPage = ({ params }) => {
  return <ProductList categorySlug={params.categorySlug} />;
};

export default CategoryProductsPage;
