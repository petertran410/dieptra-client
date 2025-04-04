import { cartAtom } from '@/states/common';
import { IMG_ALT } from '@/utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const CartHeaderMobile = ({ isTransparent, isScrolled }) => {
  const cart = useRecoilValue(cartAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Link href="/gio-hang" title="Giỏ hàng">
      <Box pos="relative" transitionDuration="250ms" _hover={{ opacity: 0.8 }}>
        <Image src={'/images/cart-black.png'} w="24px" h="24px" alt={IMG_ALT} />
        {!!cart?.length && (
          <Flex
            align="center"
            justify="center"
            px="4px"
            bgColor="#EF4444"
            borderRadius="full"
            py={0}
            h="14px"
            pos="absolute"
            top={-2}
            right={-3}
          >
            <Text color="#FFF" fontSize={12} fontWeight={500}>
              {cart.length}
            </Text>
          </Flex>
        )}
      </Box>
    </Link>
  );
};

export default CartHeaderMobile;
