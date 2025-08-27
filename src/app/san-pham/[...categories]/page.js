// src/app/san-pham/[...categories]/page.js
import { notFound } from 'next/navigation';
import ProductCategoryPage from './_components/product-category-page';

// Helper function để resolve category path
async function resolveCategoryPath(categorySlugArray) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/categories/resolve-by-slugs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slugs: categorySlugArray }),
      next: { revalidate: 3600 } // Cache 1 hour
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error resolving category path:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { categories } = params;

  const categoryData = await resolveCategoryPath(categories);

  if (!categoryData) {
    return {
      title: 'Không tìm thấy danh mục | Diệp Trà',
      description: 'Danh mục không tồn tại'
    };
  }

  const finalCategory = categoryData[categoryData.length - 1];

  return {
    title: `${finalCategory.name} | Diệp Trà`,
    description: finalCategory.description || `Sản phẩm ${finalCategory.name}`,
    openGraph: {
      title: `${finalCategory.name} | Diệp Trà`,
      description: finalCategory.description || `Sản phẩm ${finalCategory.name}`
    }
  };
}

const ProductCategoryPageWrapper = async ({ params }) => {
  const { categories } = params;

  const categoryData = await resolveCategoryPath(categories);

  if (!categoryData) {
    notFound();
  }

  return <ProductCategoryPage categoryData={categoryData} />;
};

export default ProductCategoryPageWrapper;
