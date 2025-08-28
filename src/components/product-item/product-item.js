'use client';

import { convertSlugURL, formatCurrency } from '../../utils/helper-server';
import { IMG_ALT } from '../../utils/const';
import { AspectRatio, Box, Flex, Image, Text, Tag } from '@chakra-ui/react';
import Link from 'next/link';
import { generateProductDetailUrl } from '../../utils/product-url.helper';

const ProductItem = ({ item }) => {
  const { id, title, kiotviet_name, kiotviet_price, ofCategories, kiotviet_images } = item || {};

  // SAFE URL generation
  const getProductUrl = () => {
    // Ensure we have a title
    const productTitle = title || kiotviet_name || 'san-pham';

    if (!item || !id) {
      return '/san-pham'; // Fallback
    }

    try {
      return generateProductDetailUrl(item);
    } catch (error) {
      console.error('Error generating product URL:', error);
      // Fallback to old pattern
      return `/san-pham/${convertSlugURL(productTitle)}.${id}`;
    }
  };

  const productUrl = getProductUrl();

  const getCategoryName = () => {
    if (!Array.isArray(ofCategories) || ofCategories.length === 0) {
      return 'SẢN PHẨM';
    }
    return ofCategories[0]?.name?.toUpperCase() || 'SẢN PHẨM';
  };

  const showName = title || kiotviet_name || 'Sản phẩm';

  const getCategoryColor = () => {
    const categoryName = getCategoryName();
    if (categoryName.includes('TRÀ') || categoryName.includes('PHƯỢNG')) {
      return '#4dabf7';
    } else if (categoryName.includes('MỨT') || categoryName.includes('LERMAO')) {
      return '#ff6b6b';
    }
    return '#51cf66';
  };

  // Don't render if no valid URL
  if (!productUrl || productUrl === '/san-pham') {
    return null;
  }

  return (
    <Link href={productUrl}>
      <Box
        w="100%"
        maxW="320px"
        mx="auto"
        borderRadius={16}
        bgColor="#FFF"
        overflow="hidden"
        cursor="pointer"
        transitionDuration="250ms"
        border="1px solid #f1f3f4"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
        position="relative"
      >
        {/* REMOVE THE SECOND LINK - chỉ giữ Box */}
        <Box
          position="absolute"
          top="8px"
          left="8px"
          bgColor={getCategoryColor()}
          color="white"
          fontSize="9px"
          fontWeight="bold"
          px="6px"
          py="3px"
          borderRadius="8px"
          zIndex={2}
          textTransform="uppercase"
          letterSpacing="0.5px"
        >
          {getCategoryName()}
        </Box>

        <AspectRatio ratio={1 / 1} w="full">
          <Box
            w="full"
            h="full"
            bgColor="#F8F9FA"
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            <Image
              src={
                Array.isArray(kiotviet_images) && kiotviet_images.length > 0
                  ? kiotviet_images[0]?.replace('http://', 'https://') || '/images/preview.webp'
                  : '/images/preview.webp'
              }
              alt={IMG_ALT}
              w="full"
              h="full"
              objectFit="cover"
              fallbackSrc="/images/preview.webp"
            />
          </Box>
        </AspectRatio>

        <Flex direction="column" p="16px" gap="8px">
          <Text fontSize="16px" fontWeight={600} lineHeight="20px" color="#1a1a1a" noOfLines={2} minH="40px">
            {showName}
          </Text>

          <Flex justify="space-between" align="center">
            <Text fontSize="18px" fontWeight={700} color="#E53E3E">
              {formatCurrency(kiotviet_price || 0)}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default ProductItem;
