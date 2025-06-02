// src/components/product-item.js - CLEANED UP VERSION like CMS
'use client';

import { convertSlugURL, formatCurrency } from '../../utils/helper-server';
import { IMG_ALT } from '../../utils/const';
import { AspectRatio, Box, Flex, Image, Text, Tag } from '@chakra-ui/react';
import Link from 'next/link';

const ProductItem = ({ item }) => {
  const { id, title, price, imagesUrl, generalDescription, ofCategories } = item || {};

  // Create product URL slug
  const productSlug = `${convertSlugURL(title)}.${id}`;

  // Get category name for display (simple version)
  const getCategoryName = () => {
    if (!Array.isArray(ofCategories) || ofCategories.length === 0) {
      return 'SẢN PHẨM';
    }
    // Just return the first category name in uppercase
    return ofCategories[0]?.name?.toUpperCase() || 'SẢN PHẨM';
  };

  // Get category color based on category name
  const getCategoryColor = () => {
    const categoryName = getCategoryName();
    if (categoryName.includes('MỨT') || categoryName.includes('LERMAO')) {
      return '#ff6b6b'; // Red for Mứt
    } else if (categoryName.includes('TRÀ') || categoryName.includes('PHƯỢNG')) {
      return '#4dabf7'; // Blue for Trà
    }
    return '#51cf66'; // Green default
  };

  return (
    <Box
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
      <Link href={`/san-pham/${productSlug}`}>
        {/* Category Label */}
        <Box
          position="absolute"
          top="12px"
          left="12px"
          bgColor={getCategoryColor()}
          color="white"
          fontSize="10px"
          fontWeight="bold"
          px="8px"
          py="4px"
          borderRadius="12px"
          zIndex={2}
          textTransform="uppercase"
          letterSpacing="0.5px"
        >
          {getCategoryName()}
        </Box>

        {/* Product Image */}
        <AspectRatio ratio={1 / 1} w="full">
          <Flex align="center" justify="center" bgColor="#F8F9FA">
            <Image
              src={
                Array.isArray(imagesUrl) && imagesUrl.length > 0
                  ? imagesUrl[0]?.replace('http://', 'https://') || '/images/tra-phuong-hoang.png'
                  : '/images/tra-phuong-hoang.png'
              }
              alt={title || IMG_ALT}
              w="80%"
              h="80%"
              objectFit="contain"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/images/tra-phuong-hoang.png';
              }}
            />
          </Flex>
        </AspectRatio>

        {/* Product Details */}
        <Flex direction="column" p="16px" gap="8px">
          {/* Product Title */}
          <Text
            fontSize="14px"
            fontWeight={600}
            color="#333"
            lineHeight="1.4"
            minH="40px"
            display="-webkit-box"
            style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {title}
          </Text>

          {/* General Description */}
          {generalDescription && (
            <Text
              fontSize="12px"
              color="gray.600"
              lineHeight="1.3"
              display="-webkit-box"
              style={{
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {generalDescription}
            </Text>
          )}

          {/* Price */}
          <Flex justify="center" align="center" mt="8px">
            {!price || price === 0 ? (
              <Tag colorScheme="blue" size="sm" fontWeight="600">
                Liên hệ
              </Tag>
            ) : (
              <Text color="#1E96BC" fontSize="16px" fontWeight={700}>
                {formatCurrency(price)}
              </Text>
            )}
          </Flex>

          {/* Buy Button */}
          <Flex
            mt="8px"
            bgColor="#065FD4"
            color="white"
            py="8px"
            borderRadius="8px"
            justify="center"
            align="center"
            _hover={{ bgColor: '#0052CC' }}
            transitionDuration="200ms"
          >
            <Text fontSize="14px" fontWeight="600">
              Mua hàng
            </Text>
          </Flex>
        </Flex>
      </Link>
    </Box>
  );
};

export default ProductItem;
