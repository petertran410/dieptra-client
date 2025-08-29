'use client';

import { convertSlugURL, formatCurrency } from '../../utils/helper-server';
import { IMG_ALT } from '../../utils/const';
import { AspectRatio, Box, Flex, Image, Text, Tag } from '@chakra-ui/react';
import Link from 'next/link';

const ProductItem = ({ item }) => {
  const { id, title, kiotviet_name, kiotviet_price, ofCategories, kiotviet_images, slug } = item || {};

  const productSlug = `${slug}.${id}`;

  const getCategoryName = () => {
    if (!Array.isArray(ofCategories) || ofCategories.length === 0) {
      return 'SẢN PHẨM';
    }
    return ofCategories[0]?.name?.toUpperCase() || 'SẢN PHẨM';
  };

  const showName = title ? title : kiotviet_name;

  const getCategoryColor = () => {
    const categoryName = getCategoryName();
    if (categoryName.includes('TRÀ') || categoryName.includes('PHƯỢNG')) {
      return '#4dabf7';
    } else if (categoryName.includes('MỨT') || categoryName.includes('LERMAO')) {
      return '#ff6b6b';
    }
    return '#51cf66';
  };

  return (
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
      <Link href={`/san-pham/diep-tra/${productSlug}`}>
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
                  ? kiotviet_images[0]?.replace('http://', 'https://') || '/images/tra-phuong-hoang.webp'
                  : '/images/tra-phuong-hoang.webp'
              }
              alt={title || IMG_ALT}
              maxW="full"
              maxH="full"
              objectFit="contain"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/images/tra-phuong-hoang.webp';
              }}
            />
          </Box>
        </AspectRatio>

        <Flex direction="column" p="12px" gap="6px">
          <Text
            fontSize="13px"
            fontWeight={600}
            color="#333"
            lineHeight="1.3"
            minH="32px"
            display="-webkit-box"
            style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {showName}
          </Text>

          {/* {generate_description && (
            <Text
              fontSize="11px"
              color="gray.600"
              lineHeight="1.3"
              display="-webkit-box"
              style={{
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {generate_description}
            </Text>
          )} */}
          <Flex justify="center" align="center" mt="6px">
            {!kiotviet_price || kiotviet_price === 0 ? (
              <Tag colorScheme="blue" size="sm" fontWeight="600">
                Liên hệ
              </Tag>
            ) : (
              <Text color="#1E96BC" fontSize="14px" fontWeight={700}>
                {formatCurrency(kiotviet_price)}
              </Text>
            )}
          </Flex>
          <Flex
            mt="6px"
            bgColor="#065FD4"
            color="white"
            py="6px"
            borderRadius="6px"
            justify="center"
            align="center"
            _hover={{ bgColor: '#0052CC' }}
            transitionDuration="200ms"
          >
            <Text fontSize="12px" fontWeight="600">
              Mua hàng
            </Text>
          </Flex>
        </Flex>
      </Link>
    </Box>
  );
};

export default ProductItem;
