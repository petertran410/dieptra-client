'use client';

import ModalContact from '../../../../components/modal-contact';
import { cartAtom } from '../../../../states/common';
import { showToast } from '../../../../utils/helper';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const AddCart = (props) => {
  const { price, productId, title } = props;
  const [cart, setCart] = useRecoilState(cartAtom);
  const [showContact, setShowContact] = useState(false);

  const onAddCart = () => {
    const isExists = cart.find((i) => Number(i.id) === Number(productId));
    if (!isExists) {
      setCart([...cart, { id: Number(productId), quantity: 1 }]);
    }
    showToast({
      status: 'success',
      content: 'Đã thêm vào giỏ hàng'
    });
  };

  return (
    <>
      <Button
        align="center"
        justify="center"
        bgColor="#065FD4"
        color="#FFF"
        w="full"
        h="40px"
        gap="4px"
        fontSize={16}
        borderRadius={8}
        fontWeight={500}
        transitionDuration="250ms"
        _hover={{ bgColor: '#5d97e3' }}
        _active={{ bgColor: '#5d97e3' }}
        onClick={!!price ? onAddCart : () => setShowContact(true)}
      >
        {!!price ? 'Thêm vào giỏ hàng' : 'Liên hệ'}
      </Button>

      <ModalContact open={showContact} onCloseModal={() => setShowContact(false)} defaultNote={title} />
    </>
  );
};

export default AddCart;
