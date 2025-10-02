import { Suspense } from 'react';
import { getMetadata } from '../../../utils/helper-server';
import ProductGuideWrapper from './_components/product-guide-wrapper';

export const metadata = getMetadata({ title: 'Hướng dẫn' });

const ProductGuide = () => {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <ProductGuideWrapper />
    </Suspense>
  );
};

export default ProductGuide;
