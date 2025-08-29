'use client';

import OtherProduct from '../../san-pham/diep-tra/[slug]/_components/other-product';
import ModalContact from '../../../components/modal-contact';
import SectionBlock from '../../../components/section-block';
import { useQueryProductByIds, useQueryProductListOther } from '../../../services/product.service';
import { cartAtom } from '../../../states/common';
import { PX_ALL } from '../../../utils/const';
import { showToast } from '../../../utils/helper';
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

  // Calculate total price
  const calculateTotal = () => {
    if (!cartData || cartData.length === 0) return 0;

    return cartData.reduce((total, product) => {
      const cartItem = cart.find((item) => Number(item.id) === Number(product.id));
      const quantity = cartItem ? cartItem.quantity : 1;
      return total + product.price * quantity;
    }, 0);
  };

  // Calculate shipping cost
  const calculateShipping = () => {
    const subtotal = calculateTotal();
    // return subtotal > 500000 ? 0 : 30000;
    return subtotal > 0 ? 0 : 0;
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    return calculateTotal() + calculateShipping();
  };

  // Handle payment navigation
  const handlePayment = () => {
    if (cart.length === 0) {
      showToast({
        status: 'error',
        content: 'Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.',
        icon: '/images/cart.webp'
      });
      return;
    }

    // Validate products still exist and have prices
    const invalidProducts = cartData.filter((product) => !product.price || product.price === 0);
    if (invalidProducts.length > 0) {
      showToast({
        status: 'error',
        content: 'Một số sản phẩm trong giỏ hàng cần liên hệ để báo giá. Vui lòng liên hệ trực tiếp.',
        icon: '/images/cart.webp'
      });
      return;
    }
    const missingProducts = cart.filter(
      (cartItem) => !cartData.find((product) => Number(product.id) === Number(cartItem.id))
    );

    if (missingProducts.length > 0) {
      showToast({
        status: 'error',
        content: 'Một số sản phẩm trong giỏ hàng không còn tồn tại. Vui lòng kiểm tra lại.',
        icon: '/images/cart.webp'
      });
      return;
    }

    // Show loading toast
    showToast({
      status: 'info',
      content: 'Chuyển đến trang thanh toán...',
      icon: '/images/cart.webp'
    });

    // Navigate to payment page
    router.push('/thanh-toan');
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Text>Đang tải giỏ hàng...</Text>
      </Flex>
    );
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
                icon: '/images/trash-green.webp'
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

      {/* Enhanced Order Summary and Payment Section */}
      {!!cart.length && (
        <Flex
          justify="right"
          align="center"
          mt="24px"
          mb="100px"
          direction={{ xs: 'column', lg: 'row' }}
          gap={{ xs: '16px', lg: '24px' }}
        >
          {/* Order Summary */}
          <Box bg="gray.50" p="6" borderRadius="lg" w={{ xs: 'full', lg: '350px' }} border="1px" borderColor="gray.200">
            <Text fontSize="lg" fontWeight="semibold" mb="4">
              Tóm tắt đơn hàng
            </Text>

            <Flex direction="column" gap="3">
              <Flex justify="space-between">
                <Text>Tạm tính ({cart.length} sản phẩm):</Text>
                <Text fontWeight="medium">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotal())}
                </Text>
              </Flex>

              <Flex justify="space-between">
                <Text>Phí vận chuyển:</Text>
                <Text fontWeight="medium" color={calculateShipping() === 0 ? 'green.500' : 'inherit'}>
                  {calculateShipping() === 0
                    ? 'Miễn phí'
                    : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        calculateShipping()
                      )}
                </Text>
              </Flex>

              {calculateShipping() === 0 && (
                <Text fontSize="xs" color="green.600" fontStyle="italic">
                  🎉 Miễn phí vận chuyển cho đơn hàng trên 500.000đ
                </Text>
              )}

              <Divider />

              <Flex justify="space-between" fontSize="lg" fontWeight="bold">
                <Text>Tổng cộng:</Text>
                <Text color="blue.600">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateGrandTotal())}
                </Text>
              </Flex>
            </Flex>
          </Box>

          {/* Payment Button */}
          <Flex direction="column" gap="3" w={{ xs: 'full', lg: '200px' }}>
            <Button
              colorScheme="green"
              size="lg"
              onClick={handlePayment}
              isDisabled={!cart.length}
              h="60px"
              fontSize="18px"
              fontWeight="600"
              leftIcon={<Image src="/images/cart.webp" width={24} height={24} alt="Cart" />}
            >
              Thanh toán ngay
            </Button>

            <Text fontSize="xs" color="gray.600" textAlign="center">
              Bảo mật thanh toán với SePay
            </Text>
          </Flex>
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
