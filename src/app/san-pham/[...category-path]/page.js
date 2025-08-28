import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProductList from '../_components/product-list';
import { ProductSlugResolver } from '../_components/slug-resolver';

export async function generateMetadata({ params }) {
  const { 'category-path': categoryPath = [] } = params;

  if (!categoryPath.length) return { title: 'Sản Phẩm | Diệp Trà' };

  const resolvedData = await ProductSlugResolver.resolveCategoryPath(categoryPath);
  if (!resolvedData) return { title: 'Sản Phẩm | Diệp Trà' };

  const { finalCategory } = resolvedData;
  return {
    title: `${finalCategory.name} | Diệp Trà`,
    description: finalCategory.description || `Sản phẩm ${finalCategory.name} chất lượng từ Diệp Trà`
  };
}

export default async function CategoryPathPage({ params, searchParams }) {
  const { 'category-path': categoryPath = [] } = params;

  const resolvedData = await ProductSlugResolver.resolveCategoryPath(categoryPath);

  if (!resolvedData) {
    notFound();
  }

  const { categoryHierarchy, finalCategory, breadcrumbPath } = resolvedData;

  return (
    <Suspense fallback={<div>Đang tải sản phẩm...</div>}>
      <ProductList
        initialCategoryData={{
          categoryHierarchy,
          finalCategory,
          breadcrumbPath,
          categoryPath
        }}
        searchParams={searchParams}
      />
    </Suspense>
  );
}
