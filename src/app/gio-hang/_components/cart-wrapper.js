'use client';

import OtherProduct from '@/app/san-pham/[slug]/_components/other-product';
import ModalContact from '@/components/modal-contact';
import SectionBlock from '@/components/section-block';
import { useQueryProductByIds, useQueryProductListOther } from '@/services/product.service';
import { cartAtom } from '@/states/common';
import { PX_ALL } from '@/utils/const';
import { showToast } from '@/utils/helper';
import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import CartProduct from './cart-product';
import Image from 'next/image';

const CartWrapper = () => {
  const [showContact, setShowContact] = useState(false);
  const [cart, setCart] = useRecoilState(cartAtom);
  const { data: cartData = [], isLoading } = useQueryProductByIds(cart?.map((i) => i.id));
  const { data: productQuery } = useQueryProductListOther();
  const { content: productList = [] } = productQuery || {};
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Tính tổng tiền giỏ hàng
  const calculateTotal = () => {
    if (!cartData || cartData.length === 0) return 0;

    return cartData.reduce((total, product) => {
      const cartItem = cart.find((item) => Number(item.id) === Number(product.id));
      const quantity = cartItem ? cartItem.quantity : 1;
      return total + product.price * quantity;
    }, 0);
  };

  // Xử lý sự kiện thanh toán
  const handlePayment = () => {
    // Hiển thị thông báo đang xử lý thanh toán
    showToast({
      status: 'info',
      content: 'Đang xử lý thanh toán...',
      icon: '/images/cart.png'
    });

    // Chuyển hướng tới trang thanh toán (thay đổi '/thanh-toan' nếu cần)
    router.push('/thanh-toan');
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <Flex direction="column" px={PX_ALL} pt={{ xs: '70px', lg: '162px' }} pb="50px">
      <Box mb={{ xs: '8px', lg: '16px' }}>
        <SectionBlock title="Giỏ hàng" />
      </Box>
      <Text textAlign="center">{cart.length || 0} sản phẩm</Text>

      <Flex align="center" justify="space-between" mt="24px">
        <Link href="/san-pham">
          <Flex
            align="center"
            justify="center"
            bgColor="#FFF"
            border="1px solid"
            borderColor="#065FD4"
            color="#065FD4"
            w="134px"
            h="32px"
            gap="4px"
            fontSize={16}
            borderRadius={8}
            fontWeight={500}
            transitionDuration="250ms"
            _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
          >
            Thêm sản phẩm
          </Flex>
        </Link>

        {!!cart.length && (
          <button
            type="button"
            onClick={() => {
              setCart([]);
              showToast({
                status: 'success',
                content: 'Đã xoá tất cả sản phẩm khỏi giỏ hàng',
                icon: '/images/trash-green.png'
              });
            }}
          >
            <Text fontSize={16} fontWeight={500} color="#EF4444">
              Xoá tất cả
            </Text>
          </button>
        )}
      </Flex>

      <Box my="24px" h="1px" w="full" bgColor="#F4F4F5" />

      <CartProduct />

      {/* Hiển thị tổng tiền và nút thanh toán */}
      {!!cart.length && (
        <Flex
          justify="right"
          align="center"
          mt="24px"
          mb="100px"
          direction={{ xs: 'column', lg: 'row' }}
          gap={{ xs: '16px', lg: '0' }}
        >
          {/* Tổng tiền bên trái */}
          <Flex direction="column" align={{ xs: 'center', lg: 'flex-end' }} gap="8px" mr="50px">
            <Text fontSize={16} fontWeight={500}>
              Tổng giá tiền:
            </Text>
            <Text fontSize={24} fontWeight={700} color="#065FD4">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotal())}
            </Text>
          </Flex>

          {/* Nút thanh toán bên phải */}
          <Button
            align="center"
            justify="center"
            bgColor="#27AE60"
            w={{ xs: 'full', lg: '150px' }}
            h={{ xs: '40px', lg: '50px' }}
            fontSize={18}
            borderRadius={8}
            fontWeight={600}
            _hover={{ bgColor: '#219653', color: '#FFF' }}
            _active={{ bgColor: '#219653' }}
            isDisabled={!cart.length}
            onClick={handlePayment}
          >
            <Image src="/images/cart.png" width={24} height={24} alt="Cart" />
            <Flex ml={2} fontSize={18}>
              Thanh toán
            </Flex>
          </Button>
        </Flex>
      )}

      <Flex justify="center" mt={{ xs: '16px', lg: '24px' }}>
        <Button
          align="center"
          justify="center"
          bgColor="#065FD4"
          color="#FFF"
          w={{ xs: 'full', lg: '500px' }}
          h={{ xs: '32px', lg: '40px' }}
          gap="4px"
          fontSize={16}
          borderRadius={8}
          fontWeight={500}
          _hover={{ bgColor: '#5d97e3' }}
          _active={{ bgColor: '#5d97e3' }}
          isDisabled={!cart.length}
          onClick={() => setShowContact(true)}
        >
          Liên hệ tư vấn
        </Button>
      </Flex>

      <Divider display={{ xs: 'block', lg: 'none' }} mt="24px" />

      <Box mt={{ xs: '24px', lg: '64px' }}>
        <OtherProduct productList={productList} />
      </Box>

      <ModalContact
        isOrder
        open={showContact}
        onCloseModal={() => setShowContact(false)}
        defaultNote={cartData?.map((i) => i.title)?.join(', ')}
        cartData={cartData}
        onSuccess={() => router.push('/')}
      />
    </Flex>
  );
};

export default CartWrapper;
