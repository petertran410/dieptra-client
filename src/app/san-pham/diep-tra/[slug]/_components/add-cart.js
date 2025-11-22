'use client';

import ModalContact from '../../../../../components/modal-contact';
import { cartAtom } from '../../../../../states/common';
import { showToast } from '../../../../../utils/helper';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authService } from '../../../../../services/auth.service';
import { cartService } from '../../../../../services/cart.service';
import { useRouter } from 'next/navigation';

const AddCart = ({ price, productId, title, productSlug, quantity = 1 }) => {
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartAtom);
  const [showContact, setShowContact] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onAddCart = async () => {
    setIsLoading(true);

    try {
      // Kiểm tra authentication trước
      let authCheck = await authService.checkAuth();

      if (!authCheck.isAuthenticated) {
        showToast({
          status: 'warning',
          content: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.'
        });
        router.push(`/dang-nhap?redirect=/san-pham/diep-tra/${productSlug}`);
        return;
      }

      // Cập nhật token nếu có
      if (authCheck.access_token) {
        authService.setCurrentToken(authCheck.access_token);
      }

      // Retry mechanism cho cart add
      let retryCount = 0;
      const maxRetries = 2;

      while (retryCount <= maxRetries) {
        try {
          await cartService.addToCart(Number(productId), quantity);
          break; // Thành công thì thoát loop
        } catch (cartError) {
          console.log(`🔄 Add to cart attempt ${retryCount + 1} failed:`, cartError.message);

          if (retryCount === maxRetries) {
            // Lần cuối vẫn fail
            if (
              cartError.message.includes('Service temporarily unavailable') ||
              cartError.message.includes('authentication') ||
              cartError.message.includes('401')
            ) {
              // Thử refresh token một lần nữa
              const refreshResult = await authService.refreshToken();
              if (refreshResult && refreshResult.access_token) {
                authService.setCurrentToken(refreshResult.access_token);

                // Thử add cart một lần nữa với token mới
                try {
                  await cartService.addToCart(Number(productId), quantity);
                  break;
                } catch (finalError) {
                  showToast({
                    status: 'warning',
                    content: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
                  });
                  router.push(`/dang-nhap?redirect=/san-pham/diep-tra/${productSlug}`);
                  return;
                }
              } else {
                showToast({
                  status: 'warning',
                  content: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
                });
                router.push(`/dang-nhap?redirect=/san-pham/diep-tra/${productSlug}`);
                return;
              }
            } else {
              throw cartError;
            }
          }

          retryCount++;
          // Đợi một chút trước khi retry
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      // Load lại cart sau khi add thành công
      try {
        const serverCart = await cartService.getCart();
        const formattedCart = serverCart.items.map((item) => ({
          slug: item.slug,
          id: Number(item.productId),
          quantity: item.quantity,
          cartId: item.id
        }));
        setCart(formattedCart);
      } catch (getCartError) {
        console.log('⚠️ Could not reload cart after add, but item was added');
      }

      showToast({
        status: 'success',
        content: 'Đã thêm vào giỏ hàng'
      });
    } catch (error) {
      console.error('Add to cart error:', error);
      showToast({
        status: 'error',
        content: 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.'
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
        Thêm vào giỏ hàng
      </Button>

      <ModalContact open={showContact} onCloseModal={() => setShowContact(false)} defaultNote={title} />
    </>
  );
};

export default AddCart;
