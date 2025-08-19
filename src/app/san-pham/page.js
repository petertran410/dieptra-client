import { getMetadata } from '../../utils/helper-server';
import ProductList from './_components/product-list';

export const metadata = getMetadata({
  title: 'Sản Phẩm | Diệp Trà',
  description:
    'Khám phá bộ sưu tập nguyên liệu pha chế cao cấp từ Diệp Trà - Siro, mứt, bột kem và nhiều sản phẩm chất lượng khác.'
});

const ProductPage = () => {
  return <ProductList />;
};

export default ProductPage;
