'use client';

import { IMG_ALT, PX_ALL } from '../../../utils/const';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartHeader from './_components/cart-header';
import CartHeaderMobile from './_components/cart-header-mobile';

const Header = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);
  const isTransparent = pathname === '/' || pathname === '/lien-he';

  const MENU_LIST = [
    {
      title: 'Trang chủ',
      href: '/'
    },
    {
      title: 'Giới thiệu',
      href: '/gioi-thieu-diep-tra'
    },
    {
      title: 'Sản phẩm',
      href: '/san-pham'
    },
    {
      title: 'Tin tức',
      href: '/tin-tuc'
    },
    // {
    //   title: 'Khách hàng',
    //   href: '/khach-hang'
    // },
    {
      title: 'Tuyển dụng',
      href: '/tuyen-dung'
    }
    // {
    //   title: 'Liên hệ',
    //   href: '/lien-he'
    // }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box>
      <Flex
        display={{ xs: 'none', lg: 'flex' }}
        zIndex={1000}
        as="header"
        align="center"
        h="114px"
        px="48px"
        pt="24px"
        gap="62px"
        justify="space-between"
        bgColor={!isTransparent || isScrolled ? '#FFF' : 'transparent'}
        pos="fixed"
        top={0}
        left={0}
        w="full"
        boxShadow={isScrolled ? 'xs' : 'none'}
      >
        <Image src={'/images/logo-black.webp'} alt={IMG_ALT} w="120px" h="auto" />
        <Flex align="center" flex={1} h="full" justify="center">
          {MENU_LIST.map((item) => {
            const { title, href } = item;
            let isActive = false;
            if (pathname === '/') {
              isActive = pathname === href;
            } else if (href !== '/') {
              isActive = pathname.includes(href);
            }

            return (
              <Link href={href} key={title}>
                <Flex
                  justify="center"
                  px="16px"
                  py="10px"
                  w={{ xs: '144px', lg: '120px', xl: '120px', '2xl': '144px' }}
                  borderBottom="2px solid"
                  borderColor={isActive ? (!isTransparent || isScrolled ? 'main.1' : '#0F2C3D') : 'transparent'}
                  data-group
                >
                  <Text
                    fontWeight={500}
                    fontSize={16}
                    textAlign="center"
                    color={isActive ? (!isTransparent || isScrolled ? 'main.1' : '#0F2C3D') : '#0F2C3D'}
                    _groupHover={{ color: '#0F2C3D' }}
                    transitionDuration="250ms"
                  >
                    {title}
                  </Text>
                </Flex>
              </Link>
            );
          })}
        </Flex>

        <CartHeader isScrolled={isScrolled} isTransparent={isTransparent} />
      </Flex>

      <Flex
        display={{ xs: 'flex', lg: 'none' }}
        zIndex={1000}
        as="header"
        align="center"
        h="48px"
        px={PX_ALL}
        gap="20px"
        justify="space-between"
        bgColor={!isTransparent || isScrolled ? '#FFF' : 'transparent'}
        boxShadow={isScrolled ? 'xs' : 'none'}
        pos="fixed"
        top={0}
        left={0}
        w="full"
      >
        <button onClick={onOpen}>
          <Image src={'/images/menu-mobile.webp'} alt={IMG_ALT} w="24px" h="auto" fit="cover" />
        </button>

        <Link href="/">
          <Image src={'/images/logo-black.webp'} alt={IMG_ALT} h="24px" w="auto" fit="cover" />
        </Link>

        <CartHeaderMobile isScrolled={isScrolled} isTransparent={isTransparent} />
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} autoFocus={false}>
        <DrawerOverlay />
        <DrawerContent bgColor="#0f2c3d" p="16px">
          <DrawerHeader p="0px">
            <Flex align="center" gap="8px">
              <button type="button" onClick={onClose}>
                <Image src="/images/close-main.webp" alt={IMG_ALT} w="24px" h="auto" fit="cover" />
              </button>
              <Image src="/images/logo.webp" alt={IMG_ALT} w="auto" h="24px" fit="cover" />
            </Flex>
          </DrawerHeader>

          <DrawerBody p="0px" mt="8px">
            <Flex direction="column">
              {MENU_LIST.map((item) => {
                const { title, href } = item;
                const isActive = pathname === href;

                return (
                  <Link href={href} key={title} onClick={onClose}>
                    <Box px="16px" py="11px" data-group>
                      <Text
                        fontWeight={500}
                        fontSize={16}
                        color={isActive ? 'main.1' : '#FFF'}
                        _groupHover={{ color: 'main.1' }}
                        transitionDuration="250ms"
                      >
                        {title}
                      </Text>
                    </Box>
                  </Link>
                );
              })}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
