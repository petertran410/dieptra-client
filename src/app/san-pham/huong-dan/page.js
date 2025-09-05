import { getMetadata } from '../../../utils/helper-server';
import ProductGuideWrapper from './_components/product-guide-wrapper';

export const metadata = getMetadata({ title: 'Hướng dẫn' });

const ProductGuide = () => {
  return <ProductGuideWrapper />;
};

export default ProductGuide;
