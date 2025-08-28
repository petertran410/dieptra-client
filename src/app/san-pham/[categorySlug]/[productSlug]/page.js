import { notFound } from 'next/navigation';
import ProductDetailClient from './product-detail-client';

export default async function ProductDetailPage({ params }) {
  const { categorySlug, productSlug } = params;

  return <ProductDetailClient params={{ categorySlug, productSlug }} />;
}

export async function generateMetadata({ params }) {
  const { categorySlug, productSlug } = params;

  try {
    // Fetch product data for metadata
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/product/client/find-id-by-slug?slug=${productSlug}&categorySlug=${categorySlug}`
    );
    const productData = await response.json();

    return {
      title: `${productData.title} | ${productData.category.name} | Diệp Trà`,
      description: `Tìm hiểu về ${productData.title} trong danh mục ${productData.category.name}`
    };
  } catch {
    return {
      title: 'Sản phẩm không tìm thấy | Diệp Trà'
    };
  }
}
