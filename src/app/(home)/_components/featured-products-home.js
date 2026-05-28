import { Box } from '@chakra-ui/react';
import { PX_ALL } from '../../../utils/const';
import FeaturedProductsSection from './featured-products-section';

export default function FeaturedProductsHome({ data = [] }) {
  if (!data || data.length === 0) return null;

  return (
    <Box bgColor="#f8f9fa" px={PX_ALL} py={{ base: '20px', lg: '40px' }}>
      {data.map((category) => (
        <FeaturedProductsSection
          key={category.categoryId}
          categoryName={category.categoryName}
          categoryImage={category.categoryImage}
          categorySlugPath={category.categorySlugPath}
          products={category.products}
        />
      ))}
    </Box>
  );
}
