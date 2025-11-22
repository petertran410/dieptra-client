'use client';

import { cartAtom } from '../../../states/common';
import { IMG_ALT } from '../../../utils/const';
import { showToast } from '../../../utils/helper';
import { Flex, Image, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartService } from '../../../services/cart.service';

const Counter = ({ productSlug }) => {
  const [count, setCount] = useState(1);
  const [cart, setCart] = useRecoilState(cartAtom);
  const [isUpdating, setIsUpdating] = useState(false);

  const cartItem = cart.find((i) => i.slug === productSlug);

  useEffect(() => {
    if (cartItem) {
      setCount(cartItem.quantity);
    }
  }, [cartItem]);

  const updateQuantity = async (newQuantity) => {
    if (newQuantity < 1 || !cartItem || isUpdating) return;

    setIsUpdating(true);
    const previousCart = [...cart];

    // Nếu không có cartId, sync trước
    if (!cartItem.cartId) {
      try {
        await cartService.addToCart(cartItem.id, newQuantity);
        const serverCart = await cartService.getCart();
        const syncedItem = serverCart.items.find((serverItem) => serverItem.slug === productSlug);

        if (syncedItem) {
          setCount(syncedItem.quantity);
          setCart(
            cart.map((i) =>
              i.slug === productSlug
                ? {
                    ...i,
                    cartId: syncedItem.id,
                    quantity: syncedItem.quantity
                  }
                : i
            )
          );
        }
      } catch (error) {
        setCart(previousCart);
        setCount(cartItem.quantity);
        showToast({
          status: 'error',
          content: 'Không thể đồng bộ giỏ hàng. Vui lòng thử lại'
        });
      }
    } else {
      setCount(newQuantity);
      setCart(cart.map((i) => (i.slug === productSlug ? { ...i, quantity: newQuantity } : i)));

      try {
        await cartService.updateCartItem(cartItem.cartId, newQuantity);
      } catch (error) {
        setCart(previousCart);
        setCount(cartItem.quantity);
        showToast({
          status: 'error',
          content: 'Không thể cập nhật số lượng. Vui lòng thử lại'
        });
      }
    }

    setIsUpdating(false);
  };

  const handleDecrease = () => {
    if (count > 1) {
      updateQuantity(count - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(count + 1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    const validValue = Math.max(1, value);
    updateQuantity(validValue);
  };

  return (
    <Flex align="center" gap="16px" display={{ xs: 'none', lg: 'flex' }}>
      <button type="button" onClick={handleDecrease} disabled={count === 1 || isUpdating}>
        <Image
          src="/images/minus.webp"
          w="24px"
          h="24px"
          alt={IMG_ALT}
          opacity={count === 1 || isUpdating ? 0.5 : 1}
          cursor={count === 1 || isUpdating ? 'not-allowed' : 'pointer'}
        />
      </button>

      <Input
        textAlign="center"
        value={count}
        onChange={handleInputChange}
        type="number"
        w="48px"
        h="36px"
        fontSize={18}
        fontWeight={500}
        borderRadius={8}
        borderColor="#E4E4E7"
        disabled={isUpdating}
        opacity={isUpdating ? 0.6 : 1}
      />

      <button type="button" onClick={handleIncrease} disabled={isUpdating}>
        <Image
          src="/images/add.webp"
          w="24px"
          h="24px"
          alt={IMG_ALT}
          opacity={isUpdating ? 0.5 : 1}
          cursor={isUpdating ? 'not-allowed' : 'pointer'}
        />
      </button>
    </Flex>
  );
};

export default Counter;
