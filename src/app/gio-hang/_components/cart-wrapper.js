'use client';

import OtherProduct from '../../san-pham/diep-tra/[slug]/_components/other-product';
import ModalContact from '../../../components/modal-contact';
import SectionBlock from '../../../components/section-block';
import { useQueryProductBySlugs, useQueryProductListOther } from '../../../services/product.service';
import { cartAtom } from '../../../states/common';
import { PX_ALL } from '../../../utils/const';
import { showToast } from '../../../utils/helper';
import { Box, Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import CartProduct from './cart-product';
import Image from 'next/image';
import { authService } from '../../../services/auth.service';
import { profileService } from '../../../services/profile.service';
import { cartService } from '../../../services/cart.service';

const CartWrapper = () => {
  const [showContact, setShowContact] = useState(false);
  const [cart, setCart] = useRecoilState(cartAtom);
  const cartSlugs = useMemo(() => cart?.map((i) => i.slug).filter(Boolean) || [], [cart]);
  const { data: cartData = [], isLoading } = useQueryProductBySlugs(cartSlugs);
  const { data: productQuery } = useQueryProductListOther();
  const { content: productList = [] } = productQuery || {};
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const checkAuthAndLoadCart = async () => {
      const currentUser = authService.getCurrentUser();

      if (!currentUser || !currentUser.token) {
        const authCheck = await authService.checkAuth();
        if (!authCheck.isAuthenticated) {
          showToast({
            status: 'warning',
            content: 'Vui lòng đăng nhập để xem giỏ hàng.'
          });
          router.push('/dang-nhap?redirect=/gio-hang');
          return;
        }
      }

      loadCartFromServer();
    };

    if (isClient) {
      checkAuthAndLoadCart();
    }
  }, [isClient, router]);

  const loadCartFromServer = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser || !currentUser.token) return;

      const serverCart = await cartService.getCart();
      const formattedCart = serverCart.items.map((item) => ({
        slug: item.slug,
        id: Number(item.productId),
        quantity: item.quantity,
        cartId: item.id
      }));
      setCart(formattedCart);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await cartService.clearCart();
      setCart([]);
      showToast({
        status: 'success',
        content: 'Đã xoá tất cả sản phẩm khỏi giỏ hàng',
        icon: '/images/trash-green.webp'
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      showToast({
        status: 'error',
        content: 'Không thể xoá giỏ hàng. Vui lòng thử lại'
      });
    }
  };

  const calculateTotal = () => {
    if (!cartData || cartData.length === 0) return 0;

    return cartData.reduce((total, product) => {
      const cartItem = cart.find((item) => item.slug === product.slug);
      const quantity = cartItem ? cartItem.quantity : 1;
      return total + product.price * quantity;
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateTotal();
    return subtotal > 0 ? 0 : 0;
  };

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateShipping();
  };

  const handlePayment = async () => {
    if (cart.length === 0) {
      showToast({
        status: 'error',
        content: 'Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.'
      });
      return;
    }

    const missingProducts = cart.filter((cartItem) => !cartData.find((product) => product.slug === cartItem.slug));

    if (missingProducts.length > 0) {
      showToast({
        status: 'error',
        content: 'Một số sản phẩm trong giỏ hàng không còn tồn tại.'
      });
      return;
    }

    const currentUser = authService.getCurrentUser();

    if (!currentUser || !currentUser.token) {
      try {
        const authCheck = await authService.checkAuth();
        if (!authCheck.isAuthenticated) {
          showToast({
            status: 'warning',
            content: 'Vui lòng đăng nhập để tiếp tục thanh toán.'
          });
          router.push('/dang-nhap?redirect=/gio-hang');
          return;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        showToast({
          status: 'warning',
          content: 'Vui lòng đăng nhập để tiếp tục thanh toán.'
        });
        router.push('/dang-nhap?redirect=/gio-hang');
        return;
      }
    }

    try {
      const profileData = await profileService.getProfile();
      const userData = profileData.user;

      if (!userData.detailed_address || !userData.ward || !userData.province) {
        showToast({
          status: 'warning',
          content: 'Vui lòng cập nhật đầy đủ địa chỉ giao hàng trước khi thanh toán.'
        });
        router.push('/profile?redirect=/gio-hang&required=address');
        return;
      }

      router.push('/thanh-toan');
    } catch (error) {
      console.error('Failed to get profile:', error);
      showToast({
        status: 'error',
        content: 'Không thể kiểm tra thông tin cá nhân. Vui lòng thử lại.'
      });
    }
  };

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
            fontSize={18}
            borderRadius={8}
            fontWeight={500}
            transitionDuration="250ms"
            _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
          >
            Thêm sản phẩm
          </Flex>
        </Link>

        {!!cart.length && (
          <button type="button" onClick={handleClearCart}>
            <Text fontSize={18} fontWeight={500} color="#EF4444">
              Xoá tất cả
            </Text>
          </button>
        )}
      </Flex>

      <Box my="24px" h="1px" w="full" bgColor="#F4F4F5" />

      <CartProduct cartData={cartData} />

      {!!cart.length && (
        <Flex
          justify="right"
          align="flex-end"
          mt="24px"
          mb="100px"
          direction={{ xs: 'column', lg: 'column' }}
          gap={{ xs: '16px', lg: '24px' }}
        >
          <Box bg="gray.50" p="6" borderRadius="lg" w={{ xs: 'full', lg: '350px' }} border="1px" borderColor="gray.200">
            <Text fontSize="2xl" fontWeight="semibold" mb="4">
              Tóm tắt đơn hàng
            </Text>

            <Flex direction="column" gap="3">
              <Flex justify="space-between">
                <Text fontSize="2xl">Tạm tính:</Text>
                <Text fontWeight="medium" fontSize="2xl">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotal())}
                </Text>
              </Flex>

              <Divider />

              <Flex justify="space-between" fontSize="lg" fontWeight="bold">
                <Text fontSize="2xl">Tổng cộng:</Text>
                <Text color="blue.600" fontSize="2xl">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateGrandTotal())}
                </Text>
              </Flex>
            </Flex>
          </Box>

          <Stack direction={{ base: 'column', lg: 'row' }} spacing={4} w={{ base: 'full', lg: '350px' }}>
            <Button
              colorScheme="green"
              size="lg"
              onClick={handlePayment}
              isDisabled={!cart.length}
              h="60px"
              fontSize="18px"
              fontWeight="600"
              w="full"
              leftIcon={<Image src="/images/cart.webp" width={24} height={24} alt="Cart" />}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'xl'
              }}
            >
              Thanh toán ngay
            </Button>

            <Button
              bgColor="#065FD4"
              color="#FFF"
              h="60px"
              fontSize="18px"
              fontWeight="600"
              borderRadius={8}
              w="full"
              _hover={{
                bgColor: '#5d97e3',
                transform: 'translateY(-2px)',
                boxShadow: 'xl'
              }}
              _active={{ bgColor: '#5d97e3' }}
              isDisabled={!cart.length}
              onClick={() => setShowContact(true)}
            >
              Liên hệ tư vấn
            </Button>
          </Stack>
        </Flex>
      )}

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
