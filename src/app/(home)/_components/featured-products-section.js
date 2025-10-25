'use client';

import { Box, Flex, Heading, IconButton, Button, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import ProductItemHome from '../../../components/product-item/product-item-home';
import Image from 'next/image';
import Link from 'next/link';

const MotionFlex = motion(Flex);

const FeaturedProductsSection = ({ categoryName, products, categoryImage, categorySlugPath }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const itemsPerPage = useBreakpointValue({ xs: 2, md: 2, lg: 2, xl: 3 }) || 3;
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

  const imageSrc = categoryImage || '/images/tra-phuong-hoang.webp';

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
    <Box
      py={{ base: '24px', lg: '40px' }}
      w={{ xs: '100%', s: '100%', md: '800px', lg: '900px', xl: '1100px', '2xl': '1400px' }}
      align="center"
    >
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

      <Flex
        direction={{ xs: 'column', s: 'column', md: 'row', lg: 'row', xl: 'row', '2xl': 'row' }}
        align="stretch"
        gap={{ base: '16px', lg: '20px' }}
      >
        <Box
          w={{ xs: '100%', s: '100%', md: '250px', lg: '250px', xl: '250px', '2xl': '350px' }}
          h={{ xs: '120px', s: '250px', md: '300px', lg: '300px', xl: '330px', '2xl': '400px' }}
          flexShrink={0}
          display="flex"
          alignItems="center"
          alignSelf={{ xs: 'center', md: 'center', lg: 'stretch' }}
          justifyContent="center"
          overflow="hidden"
          borderRadius="8px"
        >
          <Image
            src={imageSrc}
            alt={categoryName}
            width={250}
            height={250}
            style={{ objectFit: 'fill', width: '100%', height: '100%', borderRadius: '8px' }}
            loading="lazy"
            onError={(e) => {
              e.target.src = '/images/tra-phuong-hoang.webp';
            }}
          />
        </Box>

        <Flex
          alignItems="center"
          gap={{ base: '8px', lg: '10px', xl: '20px' }}
          flex={1}
          overflow="hidden"
          h={{ xs: '343px', lg: '300px', xl: '330px', '2xl': '400px' }}
        >
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
            size="xs"
            minW={{ base: '24px', lg: '32px' }}
            h={{ base: '24px', lg: '32px' }}
          />

          <Box flex={1} position="relative" overflow="hidden">
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
                gap={{ base: '8px', lg: '20px' }}
                justify="center"
                align="stretch"
              >
                {displayProducts.map((product) => (
                  <Box key={product.id} flex="1">
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
            size="xs"
            minW={{ base: '24px', lg: '32px' }}
            h={{ base: '24px', lg: '32px' }}
          />
        </Flex>
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
      {categorySlugPath && (
        <Flex justify="center" mt={6}>
          <Link href={`/san-pham/${categorySlugPath}`}>
            <Button
              bgColor="transparent"
              border="1px solid"
              borderColor="#065FD4"
              color="#065FD4"
              w="120px"
              h="40px"
              fontSize={18}
              borderRadius={8}
              fontWeight={500}
              transitionDuration="250ms"
              _hover={{ bgColor: '#003366', borderColor: '#003366', color: '#FFF' }}
            >
              Xem thêm
            </Button>
          </Link>
        </Flex>
      )}
    </Box>
  );
};

export default FeaturedProductsSection;
