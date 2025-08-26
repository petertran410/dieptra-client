// src/app/san-pham/[slug]/_components/other-product.js - WITH NAVIGATION
'use client';

import { useState } from 'react';
import { Box, Flex, Grid, GridItem, IconButton, Heading } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import ProductItem from '../../../../components/product-item/product-item';

const OtherProduct = ({ productList, productId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredProducts = productId ? productList?.filter((item) => item.id !== Number(productId)) : productList;

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage) || 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentProducts = filteredProducts?.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage) || [];

  return (
    <Box>
      <Heading as="h2" fontSize="24px" fontWeight="600" mb={6} textAlign="center" color="#003366">
        Sản Phẩm Liên Quan
      </Heading>

      <Box position="relative">
        {/* Navigation Arrows */}
        <IconButton
          aria-label="Previous products"
          icon={<ChevronLeftIcon />}
          position="absolute"
          left="-50px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          bg="white"
          border="1px solid #E2E8F0"
          _hover={{ bg: 'gray.50' }}
          onClick={handlePrev}
          isDisabled={filteredProducts?.length <= itemsPerPage}
        />

        <IconButton
          aria-label="Next products"
          icon={<ChevronRightIcon />}
          position="absolute"
          right="-50px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          bg="white"
          border="1px solid #E2E8F0"
          _hover={{ bg: 'gray.50' }}
          onClick={handleNext}
          isDisabled={filteredProducts?.length <= itemsPerPage}
        />

        {/* Products Grid */}
        <Grid templateColumns="repeat(4, 1fr)" gap={6} px={4}>
          {currentProducts.map((item) => (
            <GridItem key={item.id}>
              <ProductItem item={item} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default OtherProduct;
