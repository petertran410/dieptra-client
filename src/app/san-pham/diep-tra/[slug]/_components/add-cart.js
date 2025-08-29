'use client';

import ModalContact from '../../../../../components/modal-contact';
import { cartAtom } from '../../../../../states/common';
import { showToast } from '../../../../../utils/helper';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const AddCart = ({ price, productId, title }) => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const [showContact, setShowContact] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onAddCart = async () => {
    setIsLoading(true);

    try {
      const isExists = cart.find((item) => Number(item.id) === Number(productId));

      if (!isExists) {
        setCart([...cart, { id: Number(productId), quantity: 1 }]);
      } else {
        setCart(
          cart.map((item) => (Number(item.id) === Number(productId) ? { ...item, quantity: item.quantity + 1 } : item))
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
        color="white"
        fontWeight="600"
        _hover={{ bg: '#5d97e3' }}
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
