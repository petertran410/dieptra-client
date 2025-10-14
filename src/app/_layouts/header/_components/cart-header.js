import { cartAtom } from '../../../../states/common';
import { IMG_ALT } from '../../../../utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authService } from '../../../../services/auth.service';
import { showToast } from '../../../../utils/helper';

const CartHeader = ({ isScrolled, isTransparent }) => {
  const router = useRouter();
  const cart = useRecoilValue(cartAtom);
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkAuth = async () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser && currentUser.token) {
        setIsAuthenticated(true);
      } else {
        const authCheck = await authService.checkAuth();
        setIsAuthenticated(authCheck.isAuthenticated);
      }
    };
    checkAuth();
  }, []);

  const handleCartClick = async (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      showToast({
        status: 'warning',
        content: 'Vui lòng đăng nhập để xem giỏ hàng.'
      });
      router.push('/dang-nhap?redirect=/gio-hang');
    }
  };

  if (!isClient) {
    return <Box w="142px" />;
  }

  return (
    <Flex align="center" gap="24px">
      <Link href="/gio-hang" title="Giỏ hàng" onClick={handleCartClick}>
        <Box pos="relative" transitionDuration="250ms" _hover={{ opacity: 0.8 }}>
          <Image src={'/images/cart-black.webp'} w="24px" h="24px" alt={IMG_ALT} />
          {isAuthenticated && !!cart?.length && (
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

      <Link href="/san-pham">
        <Flex
          align="center"
          justify="center"
          borderRadius={8}
          w="94px"
          h="40px"
          bgColor={'#0F2C3D'}
          _hover={{ opacity: 0.7 }}
          transitionDuration="250ms"
        >
          <Text fontSize={18} fontWeight={500} color="#FFF">
            Mua hàng
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export default CartHeader;
