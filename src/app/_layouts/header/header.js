// src/app/_layouts/header/header.js - FIXED dropdown hover & font size
'use client';

import { ARTICLE_SECTIONS } from '../../../utils/article-types';
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
  useDisclosure,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
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
      title: 'Bài Viết',
      href: '/bai-viet',
      hasDropdown: true, // THÊM FLAG DROPDOWN
      dropdownItems: ARTICLE_SECTIONS // THÊM DROPDOWN ITEMS
    },
    {
      title: 'Tuyển dụng',
      href: '/tuyen-dung'
    }
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
      {/* DESKTOP HEADER */}
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
            const { title, href, hasDropdown, dropdownItems } = item;
            let isActive = false;
            if (pathname === '/') {
              isActive = pathname === href;
            } else if (href !== '/') {
              isActive = pathname.includes(href);
            }

            // RENDER DROPDOWN MENU CHO BÀI VIẾT
            if (hasDropdown && dropdownItems) {
              return (
                <Menu key={title} trigger="hover" placement="bottom-start">
                  <MenuButton as={Box} cursor="pointer">
                    <Flex
                      align="center"
                      justify="center"
                      px="16px"
                      py="10px"
                      w={{ xs: '144px', lg: '120px', xl: '120px', '2xl': '144px' }}
                      borderBottom="2px solid"
                      borderColor={isActive ? (!isTransparent || isScrolled ? 'main.1' : 'white') : 'transparent'}
                      color={!isTransparent || isScrolled ? 'black' : 'white'}
                      fontSize="16px" // TĂNG FONT SIZE LÊN 16PX
                      fontWeight="500"
                      transitionDuration="250ms"
                      _hover={{
                        color: !isTransparent || isScrolled ? 'main.1' : 'white',
                        borderColor: !isTransparent || isScrolled ? 'main.1' : 'white',
                        transform: 'translateY(-2px)'
                      }}
                      onClick={() => (window.location.href = href)} // CLICK VÀO CHUYỂN TRANG
                    >
                      {title}
                    </Flex>
                  </MenuButton>
                  <MenuList
                    bg="white"
                    border="1px solid #e2e8f0"
                    borderRadius="8px"
                    boxShadow="lg"
                    py="8px"
                    minW="280px"
                    zIndex={1001}
                  >
                    {dropdownItems.map((dropdownItem) => (
                      <MenuItem
                        key={dropdownItem.slug}
                        as={Link}
                        href={dropdownItem.href}
                        py="12px"
                        px="16px"
                        fontSize="14px"
                        fontWeight="400"
                        color="gray.700"
                        _hover={{
                          bg: 'gray.50',
                          color: 'main.1'
                        }}
                        _focus={{
                          bg: 'gray.50'
                        }}
                      >
                        {dropdownItem.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              );
            }

            // RENDER MENU ITEM THÔNG THƯỜNG
            return (
              <Link href={href} key={title}>
                <Flex
                  justify="center"
                  px="16px"
                  py="10px"
                  w={{ xs: '144px', lg: '120px', xl: '120px', '2xl': '144px' }}
                  borderBottom="2px solid"
                  borderColor={isActive ? (!isTransparent || isScrolled ? 'main.1' : 'white') : 'transparent'}
                  color={!isTransparent || isScrolled ? 'black' : 'white'}
                  fontSize="16px"
                  fontWeight="500"
                  transitionDuration="250ms"
                  _hover={{
                    color: !isTransparent || isScrolled ? 'main.1' : 'white',
                    borderColor: !isTransparent || isScrolled ? 'main.1' : 'white',
                    transform: 'translateY(-2px)'
                  }}
                >
                  {title}
                </Flex>
              </Link>
            );
          })}
        </Flex>
        <CartHeader />
      </Flex>

      {/* MOBILE HEADER */}
      <Flex
        display={{ xs: 'flex', lg: 'none' }}
        as="header"
        align="center"
        h="70px"
        px={PX_ALL}
        justify="space-between"
        bgColor="#FFF"
        pos="fixed"
        top={0}
        left={0}
        w="full"
        zIndex={1000}
        boxShadow="xs"
      >
        {/* MENU BUTTON */}
        <Flex align="center" justify="center" w="24px" h="24px" cursor="pointer" onClick={onOpen}>
          {/* HAMBURGER ICON với SVG thay vì image */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Flex>

        <Image src={'/images/logo-black.webp'} alt={IMG_ALT} w="80px" h="auto" />
        <CartHeaderMobile />
      </Flex>

      {/* MOBILE DRAWER */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="280px">
          <DrawerHeader borderBottomWidth="1px" p="20px">
            <Image src={'/images/logo-black.webp'} alt={IMG_ALT} w="100px" h="auto" />
          </DrawerHeader>
          <DrawerBody p="0">
            <VStack spacing="0" align="stretch">
              {MENU_LIST.map((item) => {
                const { title, href, hasDropdown, dropdownItems } = item;

                return (
                  <VStack key={title} spacing="0" align="stretch">
                    {/* MAIN MENU ITEM */}
                    <Link href={href} onClick={onClose}>
                      <Box
                        p="16px 20px"
                        borderBottom="1px solid #f1f1f1"
                        fontSize="16px"
                        fontWeight="500"
                        color="black"
                        _hover={{ bg: 'gray.50', color: 'main.1' }}
                        transition="all 0.2s"
                      >
                        {title}
                      </Box>
                    </Link>

                    {/* DROPDOWN ITEMS FOR MOBILE */}
                    {hasDropdown && dropdownItems && (
                      <VStack spacing="0" align="stretch" bg="gray.50">
                        {dropdownItems.map((dropdownItem) => (
                          <Link key={dropdownItem.slug} href={dropdownItem.href} onClick={onClose}>
                            <Box
                              p="12px 20px 12px 40px"
                              borderBottom="1px solid #e2e8f0"
                              fontSize="14px"
                              fontWeight="400"
                              color="gray.600"
                              _hover={{ bg: 'gray.100', color: 'main.1' }}
                              transition="all 0.2s"
                            >
                              {dropdownItem.label}
                            </Box>
                          </Link>
                        ))}
                      </VStack>
                    )}
                  </VStack>
                );
              })}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
