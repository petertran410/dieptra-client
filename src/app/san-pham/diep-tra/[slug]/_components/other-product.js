'use client';

import { Box, Grid, GridItem, Heading, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState, useRef } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import ProductItem from '../../../../../components/product-item/product-item';

const OtherProduct = ({ productList, productId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredProducts = productId ? productList?.filter((item) => item.id !== Number(productId)) : productList;

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const itemsPerPage = useBreakpointValue({ base: 2, lg: 4 }) || 4;
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage) || 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const currentProducts = filteredProducts?.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage) || [];

  return (
    <Box>
      <Heading as="h3" fontSize="24px" fontWeight="600" mb={6} textAlign="center" color="#003366">
        Sản Phẩm Liên Quan
      </Heading>

      <Box position="relative" px={{ base: '20px', lg: 0 }}>
        <IconButton
          aria-label="Previous products"
          icon={<ChevronLeftIcon />}
          position="absolute"
          left={{ base: '-10px', lg: '-50px' }}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          bg="white"
          border="1px solid #E2E8F0"
          borderRadius="full"
          boxShadow="md"
          _hover={{ bg: 'gray.50' }}
          onClick={handlePrev}
          isDisabled={filteredProducts?.length <= itemsPerPage}
          display={{ base: 'flex', lg: 'flex' }}
          w={{ base: '32px', lg: '40px' }}
          h={{ base: '32px', lg: '40px' }}
          minW="unset"
        />

        <IconButton
          aria-label="Next products"
          icon={<ChevronRightIcon />}
          position="absolute"
          right={{ base: '-10px', lg: '-50px' }}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          bg="white"
          border="1px solid #E2E8F0"
          borderRadius="full"
          boxShadow="md"
          _hover={{ bg: 'gray.50' }}
          onClick={handleNext}
          isDisabled={filteredProducts?.length <= itemsPerPage}
          display={{ base: 'flex', lg: 'flex' }}
          w={{ base: '32px', lg: '40px' }}
          h={{ base: '32px', lg: '40px' }}
          minW="unset"
        />

        <Box
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          overflow="hidden"
          display={{ base: 'block', lg: 'none' }}
        >
          <Box
            display="flex"
            transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            transform={`translateX(-${currentIndex * 100}%)`}
            alignItems="stretch"
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <Box key={pageIndex} minW="100%" flexShrink={0}>
                <Grid templateColumns="repeat(2, 1fr)" gap={4} alignItems="stretch">
                  {filteredProducts?.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((item) => (
                    <GridItem key={item.id} display="flex">
                      <Box w="100%">
                        <ProductItem item={item} />
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            ))}
          </Box>
        </Box>

        <Box display={{ base: 'none', lg: 'block' }} overflow="hidden" px={4}>
          <Box
            display="flex"
            transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            transform={`translateX(-${currentIndex * 100}%)`}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <Box key={pageIndex} minW="100%" flexShrink={0}>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                  {filteredProducts?.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((item) => (
                    <GridItem key={item.id}>
                      <ProductItem item={item} />
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OtherProduct;
