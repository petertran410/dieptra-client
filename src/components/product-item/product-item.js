// src/components/product-item.js - Updated to show category information like CMS
'use client';

import { convertSlugURL, formatCurrency } from '../../utils/helper-server';
import { IMG_ALT } from '../../utils/const';
import { AspectRatio, Box, Flex, Image, Text, Tag, Tooltip } from '@chakra-ui/react';
import Link from 'next/link';

const ProductItem = ({ item, showCategoryTags = false }) => {
  const { id, title, price, imagesUrl, generalDescription, ofCategories, isFeatured, quantity } = item || {};

  // Create product URL slug
  const productSlug = `${convertSlugURL(title)}.${id}`;

  // Render category tags similar to CMS
  const renderCategoryTags = () => {
    if (!showCategoryTags || !Array.isArray(ofCategories) || ofCategories.length === 0) {
      return null;
    }

    // Define category colors based on parent context
    const getCategoryColor = (category) => {
      if (category.isParentCategory) {
        return category.parentContext.includes('Lermao') ? 'blue' : 'purple';
      }

      // Subcategory colors
      if (category.parentContext === 'Lermao') {
        const subcategoryColors = {
          Bột: 'blue',
          Topping: 'green',
          'Mứt Sốt': 'orange',
          Siro: 'purple',
          'hàng sản xuất': 'cyan'
        };
        return subcategoryColors[category.name] || 'blue';
      } else if (category.parentContext === 'Trà Phượng Hoàng') {
        const subcategoryColors = {
          OEM: 'magenta',
          SHANCHA: 'red'
        };
        return subcategoryColors[category.name] || 'magenta';
      }

      return 'gray';
    };

    return (
      <Flex wrap="wrap" gap="4px" mt="8px">
        {ofCategories.map((category, index) => {
          const color = getCategoryColor(category);
          const isParent = category.isParentCategory;

          return (
            <Tooltip
              key={index}
              label={isParent ? `Danh mục cha: ${category.parentContext}` : `Thuộc ${category.parentContext}`}
            >
              <Tag size="sm" colorScheme={color} variant={isParent ? 'solid' : 'outline'} cursor="help">
                {category.displayName}
                {isParent && (
                  <Text as="span" fontSize="10px" ml="4px" opacity={0.8}>
                    (Cha)
                  </Text>
                )}
              </Tag>
            </Tooltip>
          );
        })}
      </Flex>
    );
  };

  // Render price with status
  const renderPrice = () => {
    if (!price || price === 0) {
      return (
        <Tag colorScheme="orange" size="sm">
          Liên hệ
        </Tag>
      );
    }

    return (
      <Text color="main.1" fontSize={{ xs: '16px', lg: '18px' }} fontWeight={600}>
        {formatCurrency(price)}
      </Text>
    );
  };

  // Render stock status
  const renderStockStatus = () => {
    const stockQuantity = Number(quantity) || 0;

    if (stockQuantity === 0) {
      return (
        <Tag colorScheme="red" size="sm">
          Hết hàng
        </Tag>
      );
    } else if (stockQuantity < 10) {
      return (
        <Tag colorScheme="orange" size="sm">
          Sắp hết
        </Tag>
      );
    } else {
      return (
        <Tag colorScheme="green" size="sm">
          Còn hàng
        </Tag>
      );
    }
  };

  return (
    <Box
      borderRadius={16}
      bgColor="#FFF"
      overflow="hidden"
      cursor="pointer"
      transitionDuration="250ms"
      border="2px solid transparent"
      _hover={{
        borderColor: 'main.1',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
      position="relative"
    >
      <Link href={`/san-pham/${productSlug}`}>
        {/* Featured Badge */}
        {isFeatured && (
          <Box
            position="absolute"
            top="8px"
            right="8px"
            bgColor="red.500"
            color="white"
            fontSize="10px"
            fontWeight="bold"
            px="6px"
            py="2px"
            borderRadius="4px"
            zIndex={2}
          >
            Nổi bật
          </Box>
        )}

        {/* Product Image */}
        <AspectRatio ratio={1 / 1} w="full">
          <Flex align="center" justify="center" bgColor="#F8F9FA">
            <Image
              src={
                Array.isArray(imagesUrl) && imagesUrl.length > 0
                  ? imagesUrl[0]?.replace('https://', 'http://') || '/images/tra-phuong-hoang.png'
                  : '/images/tra-phuong-hoang.png'
              }
              alt={title || IMG_ALT}
              w="85%"
              h="85%"
              objectFit="contain"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/images/tra-phuong-hoang.png';
              }}
            />
          </Flex>
        </AspectRatio>

        {/* Product Details */}
        <Flex direction="column" p={{ xs: '12px', lg: '16px' }} gap="8px">
          {/* Product Title */}
          <Text
            fontSize={{ xs: '14px', lg: '16px' }}
            fontWeight={600}
            color="text.1"
            lineHeight="1.4"
            minH={{ xs: '40px', lg: '44px' }}
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

          {/* Category Tags */}
          {renderCategoryTags()}

          {/* Price and Stock Status */}
          <Flex justify="space-between" align="center" mt="8px">
            {renderPrice()}
            {renderStockStatus()}
          </Flex>
        </Flex>
      </Link>
    </Box>
  );
};

export default ProductItem;
