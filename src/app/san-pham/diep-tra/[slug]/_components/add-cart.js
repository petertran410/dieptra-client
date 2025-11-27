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
import { useTranslation } from '../../../../../hooks/useTranslation';

const AddCart = ({ price, productId, title, productSlug, quantity = 1 }) => {
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartAtom);
  const [showContact, setShowContact] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t, getLocalizedText } = useTranslation();

  const onAddCart = async () => {
    setIsLoading(true);

    try {
      let authCheck = await authService.checkAuth();

      if (!authCheck.isAuthenticated) {
        showToast({
          status: 'warning',
          content: t('cart.login')
        });
        router.push(`/dang-nhap?redirect=/san-pham/diep-tra/${productSlug}`);
        return;
      }

      if (authCheck.access_token) {
        authService.getCurrentToken(authCheck.access_token);
      }

      let retryCount = 0;
      const maxRetries = 2;

      while (retryCount <= maxRetries) {
        try {
          await cartService.addToCart(Number(productId), quantity);
          break;
        } catch (cartError) {
          if (retryCount === maxRetries) {
            if (
              cartError.message.includes('Service temporarily unavailable') ||
              cartError.message.includes('authentication') ||
              cartError.message.includes('401')
            ) {
              const refreshResult = await authService.refreshToken();
              if (refreshResult && refreshResult.access_token) {
                authService.getCurrentToken(refreshResult.access_token);

                try {
                  await cartService.addToCart(Number(productId), quantity);
                  break;
                } catch (finalError) {
                  showToast({
                    status: 'warning',
                    content: t('cart.expire.session')
                  });
                  router.push(`/dang-nhap?redirect=/san-pham/diep-tra/${productSlug}`);
                  return;
                }
              } else {
                showToast({
                  status: 'warning',
                  content: t('cart.expire.session')
                });
                router.push(`/dang-nhap?redirect=/san-pham/diep-tra/${productSlug}`);
                return;
              }
            } else {
              throw cartError;
            }
          }

          retryCount++;
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

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
        content: t('cart.added')
      });
    } catch (error) {
      console.error('Add to cart error:', error);
      showToast({
        status: 'error',
        content: t('cart.error')
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
        {t('cart.add')}
      </Button>

      <ModalContact open={showContact} onCloseModal={() => setShowContact(false)} defaultNote={title} />
    </>
  );
};

export default AddCart;
