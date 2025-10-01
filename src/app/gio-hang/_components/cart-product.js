'use client';

import { useQueryProductBySlugs } from '../../../services/product.service';
import { cartAtom } from '../../../states/common';
import { IMG_ALT } from '../../../utils/const';
import { showToast } from '../../../utils/helper';
import { formatCurrency } from '../../../utils/helper-server';
import { Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import Counter from './counter';
import { useMemo } from 'react';

const CartProduct = () => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const cartSlugs = useMemo(() => cart?.map((i) => i.slug).filter(Boolean) || [], [cart]);
  const { data: cartQuery = [] } = useQueryProductBySlugs(cartSlugs);
  const cartData = cartQuery.filter((cQ) => cart.map((i) => i.slug).includes(cQ.slug));

  return (
    <Flex direction="column" gap="24px">
      {cartData?.map((item) => {
        const cartItem = cart.find((c) => c.slug === item.slug);
        const { title, id, price, ofCategories, kiotViet } = item;

        const image_url = kiotViet.images?.[0]?.replace('http://', 'https://');

        return (
          <Flex
            key={id}
            direction={{ base: 'column', lg: 'row' }}
            align={{ base: 'stretch', lg: 'center' }}
            justify="space-between"
            pos="relative"
            p={{ base: 4, lg: 0 }}
            border={{ base: '1px solid #E4E4E7', lg: 'none' }}
            borderRadius={{ base: '12px', lg: '0' }}
          >
            {/* Left side: Image + Info */}
            <Flex align="center" gap={{ base: '12px', lg: '24px' }} flex={1}>
              <Link href={`/san-pham/diep-tra/${cartItem.slug}`} target="_blank">
                <Flex
                  w={{ base: '80px', lg: '150px' }}
                  h={{ base: '80px', lg: '150px' }}
                  bgColor="#F4F4F5"
                  align="center"
                  justify="center"
                  borderRadius={12}
                  flexShrink={0}
                >
                  <Image
                    h="90%"
                    w="auto"
                    fit="cover"
                    alt={IMG_ALT}
                    src={image_url || '/images/tra-phuong-hoang.webp'}
                  />
                </Flex>
              </Link>

              <Flex direction="column" gap="8px" flex={1}>
                <Text fontWeight={500} fontSize={{ base: '16px', lg: '18px' }} noOfLines={2}>
                  {title}
                </Text>
                <Text
                  fontWeight={500}
                  fontSize={{ base: '14px', lg: '16px' }}
                  color="#A1A1AA"
                  textTransform="uppercase"
                >
                  {ofCategories?.[0]?.name}
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

              {/* Delete button mobile */}
              <Flex display={{ base: 'flex', lg: 'none' }} pos="absolute" top={4} right={2}>
                <button
                  type="button"
                  onClick={() => {
                    setCart(cart.filter((i) => i.slug !== item.slug));
                    showToast({
                      status: 'success',
                      content: 'Đã xoá 01 sản phẩm khỏi giỏ hàng',
                      icon: '/images/trash-green.webp'
                    });
                  }}
                >
                  <Image src="/images/trash.webp" w="24px" h="24px" alt={IMG_ALT} _hover={{ opacity: 0.8 }} />
                </button>
              </Flex>
            </Flex>

            {/* Right side: Price + Counter + Delete (Desktop) */}
            <Flex display={{ base: 'none', lg: 'flex' }} align="center" gap="80px">
              <Text fontSize="20px" fontWeight="600" minW="120px" textAlign="right">
                {formatCurrency(price)}
              </Text>
              <Counter productSlug={item.slug} />
              <button
                type="button"
                onClick={() => {
                  setCart(cart.filter((i) => i.slug !== item.slug));
                  showToast({
                    status: 'success',
                    content: 'Đã xoá 01 sản phẩm khỏi giỏ hàng',
                    icon: '/images/trash-green.webp'
                  });
                }}
              >
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

            {/* Counter for mobile */}
            <Flex display={{ base: 'flex', lg: 'none' }} justify="center" mt={4} pb={2}>
              <Flex align="center" gap="16px">
                <button
                  type="button"
                  onClick={() => {
                    const currentItem = cart.find((i) => i.slug === item.slug);
                    if (currentItem.quantity === 1) return;
                    setCart(cart.map((i) => (i.slug === item.slug ? { ...i, quantity: i.quantity - 1 } : i)));
                  }}
                >
                  <Image src="/images/minus.webp" w="24px" h="24px" alt={IMG_ALT} />
                </button>

                <Text fontSize="18px" fontWeight="500" minW="40px" textAlign="center">
                  {cartItem?.quantity || 1}
                </Text>

                <button
                  type="button"
                  onClick={() => {
                    setCart(cart.map((i) => (i.slug === item.slug ? { ...i, quantity: i.quantity + 1 } : i)));
                  }}
                >
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
