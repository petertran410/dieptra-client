import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProductList from '../_components/product-list';
import { ProductSlugResolver } from '../_components/slug-resolver';

async function resolveCategoryPath(categoryPath) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/category/resolve-path`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slugPath: categoryPath }),
      next: { revalidate: 3600 }
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error resolving category path:', error);
    return null;
  }
}

export default async function CategoryPathPage({ params, searchParams }) {
  const { 'category-path': categoryPath = [] } = params;

  const resolvedData = await resolveCategoryPath(categoryPath);
  if (!resolvedData) notFound();

  return (
    <Suspense fallback={<div>Đang tải sản phẩm...</div>}>
      <ProductList resolvedCategoryData={resolvedData} searchParams={searchParams} />
    </Suspense>
  );
}
