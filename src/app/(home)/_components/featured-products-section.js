'use client';

import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import ProductItemHome from '../../../components/product-item/product-item-home';
import Image from 'next/image';

const MotionFlex = motion(Flex);

const FeaturedProductsSection = ({ categoryName, products, categoryImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return totalPages - 1;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => {
      if (prev >= totalPages - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  if (products.length === 0) return null;

  const startIndex = currentIndex * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayProducts = products.slice(startIndex, endIndex);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9
    })
  };

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

      <Flex align="stretch" gap={{ base: '12px', lg: '20px' }}>
        <Box
          w={{ base: '30%', lg: '24%' }}
          flexShrink={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          borderRadius="8px"
        >
          <Image
            src={categoryImage}
            alt={categoryName}
            width={500}
            height={500}
            style={{ objectFit: 'fill', width: '100%', height: '100%', borderRadius: '8px' }}
            loading="lazy"
            onError={(e) => {
              e.target.src = '/images/tra-phuong-hoang.webp';
            }}
          />
        </Box>

        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Previous products"
          flexShrink={0}
          bg="white"
          border="2px solid #003366"
          borderRadius="full"
          boxShadow="md"
          color="#003366"
          alignSelf="center"
          _hover={{ bg: '#003366', color: 'white' }}
          onClick={handlePrev}
          size={{ base: 'xs', lg: 'xs' }}
        />

        <Box w={{ base: '60%', lg: '64%' }} flexShrink={0} position="relative" overflow="hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <MotionFlex
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              gap={{ base: '12px', lg: '16px' }}
              justify="center"
              align="stretch"
              w="100%"
              h="100%"
            >
              {displayProducts.map((product) => (
                <Box
                  key={product.id}
                  flex="1"
                  minW={{ base: 'calc(33.33% - 8px)', lg: 'calc(33.33% - 11px)' }}
                  maxW={{ base: 'calc(33.33% - 8px)', lg: 'calc(33.33% - 11px)' }}
                  h="100%"
                >
                  <ProductItemHome item={product} />
                </Box>
              ))}
            </MotionFlex>
          </AnimatePresence>
        </Box>

        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Next products"
          flexShrink={0}
          bg="white"
          border="2px solid #003366"
          borderRadius="full"
          boxShadow="md"
          color="#003366"
          alignSelf="center"
          _hover={{ bg: '#003366', color: 'white' }}
          onClick={handleNext}
          size={{ base: 'xs', lg: 'xs' }}
        />
      </Flex>

      {totalPages > 1 && (
        <Flex justify="center" gap={2} mt={6}>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <Box
              key={idx}
              w="10px"
              h="10px"
              borderRadius="full"
              bg={idx === currentIndex ? '#003366' : '#d1d5db'}
              cursor="pointer"
              transition="all 0.3s"
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              _hover={{ bg: '#003366' }}
            />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default FeaturedProductsSection;
