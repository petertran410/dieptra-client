'use client';

import { IMG_ALT } from '../../../utils/const';
import { showToast } from '../../../utils/helper';
import { formatCurrency } from '../../../utils/helper-server';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { cartAtom } from '../../../states/common';
import { cartService } from '../../../services/cart.service';
import { useState } from 'react';
import Counter from './counter';

const CartProduct = ({ cartData = [] }) => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const [loadingItems, setLoadingItems] = useState({});

  const handleRemoveItem = async (item) => {
    const cartItem = cart.find((i) => i.slug === item.slug);
    if (!cartItem) return;

    // Nếu không có cartId, sync trước
    if (!cartItem.cartId) {
      try {
        await cartService.addToCart(cartItem.id, cartItem.quantity);
        const serverCart = await cartService.getCart();
        const syncedItem = serverCart.items.find((serverItem) => serverItem.slug === item.slug);

        if (syncedItem) {
          // Update cart state với cartId mới
          setCart((prev) => prev.map((i) => (i.slug === item.slug ? { ...i, cartId: syncedItem.id } : i)));

          // Sau đó remove
          await cartService.removeFromCart(syncedItem.id);
        }
      } catch (error) {
        showToast({
          status: 'error',
          content: 'Không thể đồng bộ giỏ hàng. Vui lòng thử lại'
        });
        return;
      }
    } else {
      // Logic cũ
      try {
        await cartService.removeFromCart(cartItem.cartId);
      } catch (error) {
        showToast({
          status: 'error',
          content: 'Không thể xoá sản phẩm. Vui lòng thử lại'
        });
        return;
      }
    }

    // Update UI
    setLoadingItems((prev) => ({ ...prev, [item.slug]: true }));
    const optimisticCart = cart.filter((i) => i.slug !== item.slug);
    setCart(optimisticCart);

    showToast({
      status: 'success',
      content: 'Đã xoá sản phẩm khỏi giỏ hàng',
      icon: '/images/trash-green.webp'
    });

    setLoadingItems((prev) => ({ ...prev, [item.slug]: false }));
  };

  const handleIncreaseQuantity = async (item) => {
    const cartItem = cart.find((i) => i.slug === item.slug);
    if (!cartItem) return;

    setLoadingItems((prev) => ({ ...prev, [item.slug]: true }));
    const newQuantity = cartItem.quantity + 1;

    if (!cartItem.cartId) {
      try {
        await cartService.addToCart(cartItem.id, cartItem.quantity);
        const serverCart = await cartService.getCart();
        const syncedItem = serverCart.items.find((serverItem) => serverItem.slug === item.slug);

        if (syncedItem) {
          setCart((prev) =>
            prev.map((i) =>
              i.slug === item.slug
                ? {
                    ...i,
                    cartId: syncedItem.id,
                    quantity: newQuantity
                  }
                : i
            )
          );

          await cartService.updateCartItem(syncedItem.id, newQuantity);
        }
      } catch (error) {
        setCart(cart);
        showToast({
          status: 'error',
          content: 'Không thể cập nhật số lượng. Vui lòng thử lại'
        });
      }
    } else {
      const optimisticCart = cart.map((i) => (i.slug === item.slug ? { ...i, quantity: newQuantity } : i));
      setCart(optimisticCart);

      try {
        await cartService.updateCartItem(cartItem.cartId, newQuantity);
      } catch (error) {
        setCart(cart);
        showToast({
          status: 'error',
          content: 'Không thể cập nhật số lượng. Vui lòng thử lại'
        });
      }
    }

    setLoadingItems((prev) => ({ ...prev, [item.slug]: false }));
  };

  const handleDecreaseQuantity = async (item) => {
    const cartItem = cart.find((i) => i.slug === item.slug);
    if (!cartItem || cartItem.quantity <= 1) return;

    setLoadingItems((prev) => ({ ...prev, [item.slug]: true }));
    const newQuantity = cartItem.quantity - 1;

    if (!cartItem.cartId) {
      try {
        await cartService.addToCart(cartItem.id, cartItem.quantity);
        const serverCart = await cartService.getCart();
        const syncedItem = serverCart.items.find((serverItem) => serverItem.slug === item.slug);

        if (syncedItem) {
          setCart((prev) =>
            prev.map((i) =>
              i.slug === item.slug
                ? {
                    ...i,
                    cartId: syncedItem.id,
                    quantity: newQuantity
                  }
                : i
            )
          );

          await cartService.updateCartItem(syncedItem.id, newQuantity);
        }
      } catch (error) {
        setCart(cart);
        showToast({
          status: 'error',
          content: 'Không thể cập nhật số lượng. Vui lòng thử lại'
        });
      }
    } else {
      const optimisticCart = cart.map((i) => (i.slug === item.slug ? { ...i, quantity: newQuantity } : i));
      setCart(optimisticCart);

      try {
        await cartService.updateCartItem(cartItem.cartId, newQuantity);
      } catch (error) {
        setCart(cart);
        showToast({
          status: 'error',
          content: 'Không thể cập nhật số lượng. Vui lòng thử lại'
        });
      }
    }

    setLoadingItems((prev) => ({ ...prev, [item.slug]: false }));
  };

  return (
    <Flex direction="column" gap={{ base: 4, lg: 6 }} w="full">
      {cartData.map((item) => {
        const price = item?.price || 0;
        const cartItem = cart.find((i) => i.slug === item.slug);
        const isLoading = loadingItems[item.slug];

        const getProductImage = () => {
          if (Array.isArray(item.imagesUrl) && item.imagesUrl.length > 0) {
            return item.imagesUrl[0]?.replace('http://', 'https://');
          }
          if (Array.isArray(item.kiotviet_images) && item.kiotviet_images.length > 0) {
            return item.kiotviet_images[0]?.replace('http://', 'https://');
          }
          return '/images/tra-phuong-hoang.webp';
        };

        return (
          <Flex
            key={item.slug}
            direction={{ base: 'column', lg: 'row' }}
            align={{ base: 'flex-start', lg: 'center' }}
            justify="space-between"
            p={{ base: 4, lg: 6 }}
            borderRadius="12px"
            bg="white"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
            pos="relative"
            opacity={isLoading ? 0.6 : 1}
            pointerEvents={isLoading ? 'none' : 'auto'}
            transition="opacity 0.2s"
          >
            <Flex gap={{ base: 3, lg: 4 }} align="center" flex="1" w={{ base: 'full', lg: 'auto' }}>
              <Image
                src={getProductImage()}
                w={{ base: '80px', lg: '100px' }}
                h={{ base: '80px', lg: '100px' }}
                objectFit="cover"
                borderRadius="8px"
                alt={IMG_ALT}
              />
              <Flex direction="column" gap={2} flex="1">
                <Text fontSize={{ base: '16px', lg: '18px' }} fontWeight="500" noOfLines={2}>
                  {item?.title ? item.title : item.kiotViet?.name}
                </Text>
                <Text
                  fontSize={{ base: '18px', lg: '20px' }}
                  fontWeight="600"
                  color="#065FD4"
                  display={{ base: 'block', lg: 'none' }}
                >
                  {formatCurrency(price)}
                </Text>
              </Flex>

              <Flex display={{ base: 'flex', lg: 'none' }} pos="absolute" top={4} right={2}>
                <button type="button" onClick={() => handleRemoveItem(item)} disabled={isLoading}>
                  <Image src="/images/trash.webp" w="24px" h="24px" alt={IMG_ALT} _hover={{ opacity: 0.8 }} />
                </button>
              </Flex>
            </Flex>

            <Flex display={{ base: 'none', lg: 'flex' }} align="center" gap="80px">
              <Text fontSize="20px" fontWeight="600" minW="120px" textAlign="right">
                {formatCurrency(price)}
              </Text>
              <Counter productSlug={item.slug} />
              <button type="button" onClick={() => handleRemoveItem(item)} disabled={isLoading}>
                <Image
                  src="/images/trash.webp"
                  w="32px"
                  h="32px"
                  alt={IMG_ALT}
                  _hover={{ opacity: 0.8 }}
                  transition="all 0.2s"
                />
              </button>
            </Flex>

            <Flex display={{ base: 'flex', lg: 'none' }} justify="center" mt={4} pb={2}>
              <Flex align="center" gap="16px">
                <button type="button" onClick={() => handleDecreaseQuantity(item)} disabled={isLoading}>
                  <Image src="/images/minus.webp" w="24px" h="24px" alt={IMG_ALT} />
                </button>

                <Text fontSize="18px" fontWeight="500" minW="40px" textAlign="center">
                  {cartItem?.quantity || 1}
                </Text>

                <button type="button" onClick={() => handleIncreaseQuantity(item)} disabled={isLoading}>
                  <Image src="/images/add.webp" w="24px" h="24px" alt={IMG_ALT} />
                </button>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default CartProduct;
