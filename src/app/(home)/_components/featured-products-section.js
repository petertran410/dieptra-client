'use client';

import { Box, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ProductItemHome from '../../../components/product-item/product-item-home';

const FeaturedProductsSection = ({ categoryName, products }) => {
  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || products.length === 0) return;

    const scrollSpeed = 0.7;
    const itemWidth = 280 + 24;
    const totalWidth = products.length * itemWidth;

    const animate = () => {
      if (!isPaused) {
        scrollPositionRef.current += scrollSpeed;

        if (scrollPositionRef.current >= totalWidth) {
          scrollPositionRef.current = 0;
        }

        if (container.firstChild) {
          container.firstChild.style.transform = `translateX(-${scrollPositionRef.current}px)`;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [products, isPaused]);

  if (products.length === 0) return null;

  const tripleProducts = [...products, ...products, ...products];

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
        ref={containerRef}
        overflow="hidden"
        position="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Flex gap="24px" w="max-content" transition="none" style={{ willChange: 'transform' }}>
          {tripleProducts.map((product, index) => {
            console.log(product);
            return (
              <Box key={`${product.id}-${index}`} minW="280px" maxW="280px" flexShrink={0}>
                <ProductItemHome item={product} />
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
};

export default FeaturedProductsSection;
