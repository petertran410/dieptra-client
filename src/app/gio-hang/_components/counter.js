'use client';

import { cartAtom } from '../../../states/common';
import { IMG_ALT } from '../../../utils/const';
import { Flex, Image, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const Counter = ({ productId }) => {
  const [count, setCount] = useState(1);
  const [cart, setCart] = useRecoilState(cartAtom);

  const setCountCart = (countData) => {
    setCart(cart.map((i) => (Number(i.id) === Number(productId) ? { ...i, quantity: countData } : i)));
  };

  useEffect(() => {
    const currentCartItem = cart.find((i) => Number(i.id) === Number(productId));
    if (currentCartItem) {
      setCount(currentCartItem.quantity);
    }
  }, [cart, productId]);

  return (
    <Flex align="center" gap="16px" display={{ xs: 'none', lg: 'flex' }}>
      <button
        type="button"
        onClick={() => {
          if (count === 1) {
            return;
          }
          setCount(count - 1);
          setCountCart(count - 1);
        }}
      >
        <Image src="/images/minus.png" w="24px" h="24px" alt={IMG_ALT} />
      </button>

      <Input
        textAlign="center"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        type="number"
        w="48px"
        h="36px"
        fontSize={16}
        fontWeight={500}
        borderRadius={8}
        borderColor="#E4E4E7"
      />

      <button
        type="button"
        onClick={() => {
          setCount(count + 1);
          setCountCart(count + 1);
        }}
      >
        <Image src="/images/add.png" w="24px" h="24px" alt={IMG_ALT} />
      </button>
    </Flex>
  );
};

export default Counter;
