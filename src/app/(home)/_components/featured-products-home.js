'use client';

import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useQueryFeaturedByCategories } from '../../../services/product.service';
import { PX_ALL } from '../../../utils/const';
import FeaturedProductsSection from './featured-products-section';

const FeaturedProductsHome = () => {
  const { data: categoriesData, isLoading } = useQueryFeaturedByCategories();

  if (isLoading) {
    return (
      <Flex justify="center" align="center" py="40px">
        <Spinner size="xl" color="#003366" />
      </Flex>
    );
  }

  if (!categoriesData || categoriesData.length === 0) return null;

  return (
    <Box bgColor="#f8f9fa" px={PX_ALL} py={{ base: '20px', lg: '40px' }}>
      {categoriesData.map((category) => {
        return (
          <FeaturedProductsSection
            key={category.categoryId}
            categoryName={category.categoryName}
            categoryImage={category.categoryImage}
            categorySlugPath={category.categorySlugPath}
            products={category.products}
          />
        );
      })}
    </Box>
  );
};

export default FeaturedProductsHome;
