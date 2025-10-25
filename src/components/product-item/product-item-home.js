'use client';

import { formatCurrency } from '../../utils/helper-server';
import { IMG_ALT } from '../../utils/const';
import { AspectRatio, Box, Flex, Image, Text, Tag } from '@chakra-ui/react';
import Link from 'next/link';

const ProductItemHome = ({ item }) => {
  const { id, title, kiotviet_name, kiotviet_price, imagesUrl, slug, kiotviet_images, price, category } = item || {};

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
      borderRadius="16px"
      bgColor="#FFF"
      overflow="hidden"
      cursor="pointer"
      transitionDuration="250ms"
      border="1px solid #f1f3f4"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(13,102,191,0.5)'
      }}
      position="relative"
      h={{ md: '300px', lg: '300px', xl: '330px', '2xl': '400px' }}
      w={{ md: '190px', lg: '200px', xl: '220px', '2xl': '270px' }}
    >
      <Link href={`/san-pham/diep-tra/${productSlug}`}>
        <Box display="flex" overflow="hidden" bgColor="#FFF" mb={{ md: '8px', lg: '8px', xl: '10px', '2xl': '25px' }}>
          <Image
            src={getProductImage()}
            alt={title || IMG_ALT}
            h={{ md: '170px', lg: '170px', xl: '200px', '2xl': '250px' }}
            w="100%"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/images/tra-phuong-hoang.webp';
            }}
          />
        </Box>

        <Flex direction="column" gap="6px">
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

          <Flex
            justify="center"
            align="center"
            // mt="6px"
          >
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
            w="90%"
            py="6px"
            borderRadius="6px"
            justify="center"
            alignSelf="center"
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
