'use client';

import { formatCurrency } from '../../utils/helper-server';
import { IMG_ALT } from '../../utils/const';
import { AspectRatio, Box, Flex, Image, Text, Tag } from '@chakra-ui/react';
import Link from 'next/link';

const ProductItemHome = ({ item }) => {
  const { id, title, kiotviet_name, kiotviet_price, imagesUrl, slug, kiotviet_images, price } = item || {};

  const productSlug = slug;

  const showName = title ? title : kiotviet_name;

  const getProductImage = () => {
    if (Array.isArray(imagesUrl) && imagesUrl.length > 0) {
      return imagesUrl[0]?.replace('http://', 'https://');
    }
    if (Array.isArray(kiotviet_images) && kiotviet_images.length > 0) {
      return kiotviet_images[0]?.replace('http://', 'https://');
    }
    return '/images/tra-phuong-hoang.webp';
  };

  return (
    <Box
      w="100%"
      maxW="320px"
      mx="auto"
      h="100%"
      borderRadius={16}
      bgColor="#FFF"
      overflow="hidden"
      cursor="pointer"
      transitionDuration="250ms"
      border="1px solid #f1f3f4"
      _hover={{
        transform: 'translateY(-2px)',
        // boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        boxShadow: '0 4px 12px rgba(13,102,191,0.5)'
        // bgColor: '#0D66BF'
      }}
      position="relative"
    >
      <Link href={`/san-pham/diep-tra/${productSlug}`}>
        {/* <Box
          position="absolute"
          top="8px"
          left="8px"
          // bgColor={getCategoryColor()}
          color="black"
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
        </Box> */}

        <AspectRatio ratio={1 / 1} w="full">
          <Box
            w="full"
            h="full"
            bgColor="#FFF"
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            <Image
              // src={
              //   Array.isArray(imagesUrl) && imagesUrl.length > 0
              //     ? imagesUrl.replace('http://', 'https://') || '/images/tra-phuong-hoang.webp'
              //     : kiotviet_images[0]?.replace('http://', 'https://') || '/images/tra-phuong-hoang.webp'
              // }
              src={getProductImage()}
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
            fontSize="17px"
            fontWeight={600}
            color="#333"
            lineHeight="1"
            minH="32px"
            display="-webkit-box"
            style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
            align="center"
          >
            {showName}
          </Text>

          <Flex justify="center" align="center" mt="6px">
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
          <Flex
            mt="6px"
            bgColor="#53C1E7"
            color="white"
            py="6px"
            borderRadius="6px"
            justify="center"
            align="center"
            _hover={{ bgColor: '#3366ff' }}
            transitionDuration="200ms"
          >
            <Text fontSize="16px" fontWeight="600" color="white">
              Mua hàng
            </Text>
          </Flex>
        </Flex>
      </Link>
    </Box>
  );
};

export default ProductItemHome;
