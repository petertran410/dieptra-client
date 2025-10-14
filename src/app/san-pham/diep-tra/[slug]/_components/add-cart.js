'use client';

import Link from 'next/link';
import ModalContact from '../../../../../components/modal-contact';
import { cartAtom } from '../../../../../states/common';
import { showToast } from '../../../../../utils/helper';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authService } from '../../../../../services/auth.service';
import { useRouter } from 'next/navigation';

const AddCart = ({ price, productId, title, productSlug, quantity = 1 }) => {
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartAtom);
  const [showContact, setShowContact] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onAddCart = async () => {
    setIsLoading(true);

    try {
      const currentUser = authService.getCurrentUser();

      if (!currentUser || !currentUser.token) {
        const authCheck = await authService.checkAuth();
        if (!authCheck.isAuthenticated) {
          showToast({
            status: 'warning',
            content: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.'
          });
          router.push(`/dang-nhap?redirect=/san-pham/diep-tra/${productSlug}`);
          setIsLoading(false);
          return;
        }
      }

      const isExists = cart.find((item) => item.slug === productSlug);

      if (!isExists) {
        setCart([
          ...cart,
          {
            slug: productSlug,
            id: Number(productId),
            quantity: quantity
          }
        ]);
      } else {
        setCart(
          cart.map((item) => (item.slug === productSlug ? { ...item, quantity: item.quantity + quantity } : item))
        );
      }

      showToast({
        status: 'success',
        content: 'Đã thêm vào giỏ hàng'
      });
    } catch (error) {
      showToast({
        status: 'error',
        content: 'Có lỗi xảy ra khi thêm vào giỏ hàng'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        size="lg"
        w="full"
        bg="#065FD4"
        variant="outline"
        bgColor="#FAE57C"
        color="#003366"
        _hover={{ bg: '#FAE57C', color: '#003366' }}
        fontWeight="600"
        _active={{ bg: '#5d97e3' }}
        isLoading={isLoading}
        loadingText="Đang thêm..."
        onClick={price ? onAddCart : () => setShowContact(true)}
      >
        {price ? 'Thêm vào giỏ hàng' : 'Liên hệ'}
      </Button>

      <ModalContact open={showContact} onCloseModal={() => setShowContact(false)} defaultNote={title} />
    </>
  );
};

export default AddCart;
