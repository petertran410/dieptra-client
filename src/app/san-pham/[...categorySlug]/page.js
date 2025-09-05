import { getMetadata } from '../../../utils/helper-server';
import ProductList from './product-list';

export async function generateMetadata({ params }) {
  const { categorySlug } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/category/for-cms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();

  const categories = data.data;
  const targetCategory = findCategoryBySlugPath(categories, categorySlug);
  console.log(targetCategory.title_meta);

  return getMetadata({
    title: targetCategory.title_meta || targetCategory.name,
    description:
      targetCategory.description || `Khám phá ${targetCategory.name} - Nguyên liệu pha chế chất lượng cao từ Diệp Trà`
  });
}

function findCategoryBySlugPath(categories, slugPath) {
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
