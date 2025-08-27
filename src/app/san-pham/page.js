import { Suspense } from 'react';
import { getMetadata } from '../../utils/helper-server';
import ProductList from './_components/product-list';

export const metadata = getMetadata({
  title: 'Sản Phẩm | Diệp Trà',
  description: 'Khám phá bộ sưu tập nguyên liệu pha chế cao cấp từ Diệp Trà...'
});

const ProductPage = () => {
  return (
    <Suspense fallback={<div>Đang tải sản phẩm...</div>}>
      <ProductList />
    </Suspense>
  );
};

export default ProductPage;
