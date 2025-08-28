// src/app/san-pham/[categorySlug]/page.js
import { notFound } from 'next/navigation';
import CategoryProductClient from './category-product-client';

export async function generateMetadata({ params }) {
  const { categorySlug } = params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/category/client/find-by-slug/${categorySlug}`
    );
    const categoryData = await response.json();

    return {
      title: `${categoryData.name} | Sản Phẩm | Diệp Trà`,
      description: categoryData.description || `Khám phá các sản phẩm trong danh mục ${categoryData.name}`
    };
  } catch {
    return {
      title: 'Danh mục sản phẩm | Diệp Trà'
    };
  }
}

export default function CategoryPage({ params }) {
  return <CategoryProductClient categorySlug={params.categorySlug} />;
}
