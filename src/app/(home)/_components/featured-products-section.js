'use client';

import { Box, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ProductItem from '../../../components/product-item/product-item';
import { PX_ALL } from '../../../utils/const';

const FeaturedProductsSection = ({ categoryName, products }) => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || products.length === 0) return;

    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed;

        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [products, isPaused]);

  if (products.length === 0) return null;

  const duplicatedProducts = [...products, ...products];

  return (
    <Box py={{ base: '24px', lg: '40px' }}>
      <Heading
        as="h2"
        fontSize={{ base: '24px', lg: '32px' }}
        fontWeight="700"
        color="#003366"
        mb={{ base: '16px', lg: '24px' }}
        textAlign="center"
      >
        {categoryName}
      </Heading>

      <Box
        ref={scrollRef}
        overflow="hidden"
        position="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        sx={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none'
        }}
      >
        <Flex gap="24px" w="max-content">
          {duplicatedProducts.map((product, index) => (
            <Box key={`${product.id}-${index}`} minW="280px" maxW="280px">
              <ProductItem item={product} />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default FeaturedProductsSection;
