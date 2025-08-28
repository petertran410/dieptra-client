import { notFound } from 'next/navigation';
import ProductCategoryClient from './product-category-client';

export default async function ProductCategoryPage({ params }) {
  const { categorySlug } = params;

  return <ProductCategoryClient categorySlug={categorySlug} />;
}
