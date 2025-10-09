'use client';

import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';
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
          display={{ base: 'block', lg: 'none' }}
          overflow="hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          px={4}
        >
          <Flex
            gap={6}
            transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            transform={`translateX(-${currentIndex * 50}%)`}
            style={{ transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 24}px))` }}
          >
            {filteredProducts?.map((item) => (
              <Box key={item.id} minW="calc(50% - 12px)" maxW="calc(50% - 12px)" flexShrink={0} h="100%">
                <Box h="100%" display="flex" flexDirection="column">
                  <ProductItem item={item} />
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>

        <Box display={{ base: 'none', lg: 'block' }} overflow="hidden" px={4}>
          <Flex
            gap={6}
            transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            style={{ transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 24}px))` }}
          >
            {filteredProducts?.map((item) => (
              <Box key={item.id} minW="calc(25% - 18px)" maxW="calc(25% - 18px)" flexShrink={0} h="100%">
                <Box h="100%" display="flex" flexDirection="column">
                  <ProductItem item={item} />
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default OtherProduct;
