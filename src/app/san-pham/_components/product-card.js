'use client';

import { Box, Image, Text, Button, VStack, HStack, Badge, useToast, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAddingToCart(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast({
        title: 'Đã thêm vào giỏ hàng',
        description: `${product.name} đã được thêm vào giỏ hàng`,
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể thêm sản phẩm vào giỏ hàng',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleProductClick = () => {
    router.push(`/san-pham/${product.slug}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Box
      bg="white"
      borderRadius="lg"
      overflow="hidden"
      shadow="sm"
      transition="all 0.3s ease"
      cursor="pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
      _hover={{
        shadow: 'lg',
        transform: 'translateY(-4px)'
      }}
      position="relative"
    >
      <Box position="relative" overflow="hidden">
        <Image
          src={product.image}
          alt={product.name}
          w="full"
          h="240px"
          objectFit="cover"
          transition="transform 0.3s ease"
          transform={isHovered ? 'scale(1.05)' : 'scale(1)'}
        />

        <VStack spacing={2} position="absolute" top={3} left={3}>
          {product.isNew && (
            <Badge colorScheme="green" variant="solid" borderRadius="full" px={3}>
              Mới
            </Badge>
          )}
          {product.isOnSale && (
            <Badge colorScheme="red" variant="solid" borderRadius="full" px={3}>
              Giảm giá
            </Badge>
          )}
        </VStack>

        {isHovered && (
          <HStack
            position="absolute"
            top={3}
            right={3}
            spacing={2}
            opacity={isHovered ? 1 : 0}
            transition="opacity 0.3s ease"
          >
            <Button
              size="sm"
              colorScheme="whiteAlpha"
              variant="solid"
              borderRadius="full"
              p={2}
              minW="auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon as={FiHeart} />
            </Button>
            <Button
              size="sm"
              colorScheme="whiteAlpha"
              variant="solid"
              borderRadius="full"
              p={2}
              minW="auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon as={FiEye} />
            </Button>
          </HStack>
        )}
      </Box>

      <VStack align="start" p={4} spacing={3}>
        <Text fontSize="md" fontWeight="600" color="#003366" lineHeight="1.3" noOfLines={2} minH="48px">
          {product.name}
        </Text>

        <Text fontSize="sm" color="gray.600" noOfLines={2} lineHeight="1.4">
          {product.description}
        </Text>

        <HStack spacing={2} w="full">
          <Text fontSize="lg" fontWeight="700" color="#d63384">
            {formatPrice(product.price)}
          </Text>
          {product.originalPrice && product.originalPrice > product.price && (
            <Text fontSize="sm" color="gray.500" textDecoration="line-through">
              {formatPrice(product.originalPrice)}
            </Text>
          )}
        </HStack>

        <HStack justify="space-between" w="full">
          <Text fontSize="xs" color={product.inStock ? 'green.500' : 'red.500'}>
            {product.inStock ? 'Còn hàng' : 'Hết hàng'}
          </Text>
          <Text fontSize="xs" color="gray.500">
            Đã bán: {product.sold || 0}
          </Text>
        </HStack>

        <Button
          colorScheme="blue"
          size="sm"
          w="full"
          leftIcon={<Icon as={FiShoppingCart} />}
          isLoading={isAddingToCart}
          loadingText="Đang thêm..."
          isDisabled={!product.inStock}
          onClick={handleAddToCart}
          _hover={{
            transform: 'translateY(-1px)',
            shadow: 'md'
          }}
        >
          {product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductCard;
