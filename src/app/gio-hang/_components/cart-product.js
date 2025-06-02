'use client';

import { useQueryProductByIds } from '../../../services/product.service';
import { cartAtom } from '../../../states/common';
import { IMG_ALT } from '../../../utils/const';
import { showToast } from '../../../utils/helper';
import { formatCurrency } from '../../../utils/helper-server';
import { Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import Counter from './counter';

const CartProduct = () => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const { data: cartQuery = [] } = useQueryProductByIds(cart?.map((i) => i.id));
  const cartData = cartQuery.filter((cQ) => cart.map((i) => Number(i.id)).includes(Number(cQ.id)));

  return (
    <Flex direction="column" gap="24px">
      {cartData?.map((item) => {
        const { title, id, price, imagesUrl, ofCategories } = item;
        const image = imagesUrl?.[0]?.replace('https://', 'http://');

        return (
          <Flex align="center" key={id} justify="space-between" pos="relative">
            <Flex align={{ xs: 'flex-start', lg: 'center' }} gap={{ xs: '16px', lg: '24px' }} flex={1}>
              <Link href="/" target="_blank">
                <Flex
                  w={{ xs: '80px', md: '100px', lg: '150px' }}
                  h={{ xs: '80px', md: '100px', lg: '150px' }}
                  bgColor="#F4F4F5"
                  align="center"
                  justify="center"
                  borderRadius={16}
                >
                  <Image h="90%" w="auto" fit="cover" alt={IMG_ALT} src={image || '/images/tra-phuong-hoang.png'} />
                </Flex>
              </Link>
              <Flex direction="column" flex={1}>
                <Flex direction="column" gap="4px">
                  <Text fontWeight={500} fontSize={18}>
                    {title}
                  </Text>
                  <Text fontWeight={500} fontSize={18} color="#A1A1AA" textTransform="uppercase">
                    {ofCategories?.[0]?.name}
                  </Text>
                </Flex>

                <Flex
                  display={{ xs: 'flex', lg: 'none' }}
                  justify="space-between"
                  align="center"
                  gap={{ xs: '20px', lg: '80px' }}
                >
                  <Text fontSize={24} textAlign="center">
                    {formatCurrency(price)}
                  </Text>
                  <Counter productId={id} />
                </Flex>
              </Flex>
            </Flex>

            <Flex
              display={{ xs: 'none', lg: 'flex' }}
              align="center"
              gap={{ xs: '20px', lg: '80px' }}
              direction={{ xs: 'column', lg: 'row' }}
            >
              <Text fontSize={24} textAlign="center">
                {formatCurrency(price)}
              </Text>
              <Counter productId={id} />
              <button
                type="button"
                onClick={() => {
                  setCart(cart.filter((i) => Number(i.id) !== Number(id)));
                  showToast({
                    status: 'success',
                    content: 'Đã xoá 01 sản phẩm khỏi giỏ hàng',
                    icon: '/images/trash-green.png'
                  });
                }}
              >
                <Image
                  src="/images/trash.png"
                  w="32px"
                  h="32px"
                  alt={IMG_ALT}
                  transitionDuration="250ms"
                  _hover={{ opacity: 0.8 }}
                />
              </button>
            </Flex>

            <Flex display={{ xs: 'flex', lg: 'none' }} pos="absolute" top={0} right={0}>
              <button
                type="button"
                onClick={() => {
                  setCart(cart.filter((i) => Number(i.id) !== Number(id)));
                  showToast({
                    status: 'success',
                    content: 'Đã xoá 01 sản phẩm khỏi giỏ hàng',
                    icon: '/images/trash-green.png'
                  });
                }}
              >
                <Image
                  src="/images/trash.png"
                  w="32px"
                  h="32px"
                  alt={IMG_ALT}
                  transitionDuration="250ms"
                  _hover={{ opacity: 0.8 }}
                />
              </button>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default CartProduct;
