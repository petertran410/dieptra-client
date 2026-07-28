import { getMetadata } from '../../utils/helper-server';
import ProductListPage from './_components/product-list-page';

export const revalidate = 300;

export const metadata = getMetadata({
  title: 'Sản Phẩm Diệp Trà',
  description:
    'Khám phá bộ sưu tập nguyên liệu pha chế cao cấp từ Diệp Trà - Siro, mứt, bột kem và nhiều sản phẩm chất lượng khác.',
  url: `${process.env.NEXT_PUBLIC_DOMAIN}/san-pham`
});

export default async function ProductPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  return <ProductListPage slugPath={[]} pageNumber={1} searchParams={resolvedSearchParams || {}} />;
}
