'use client';

import { ARTICLE_SECTIONS } from '../../../utils/article-types';
import { useProductCategories } from '../../../hooks/useProductCategories';
import { useRecoilState } from 'recoil';
import { cartAtom } from '../../../states/common';
import { cartService } from '../../../services/cart.service';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartHeader from './_components/cart-header';
import CartHeaderMobile from './_components/cart-header-mobile';
import { authService } from '../../../services/auth.service';
import { showToast } from '../../../utils/helper';

const UserIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
    />
  </Icon>
);

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useRecoilState(cartAtom);
  const isTransparent = pathname === '/' || pathname === '/lien-he';

  const { categories: productCategories } = useProductCategories();

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
      href: '/san-pham',
      hasDropdown: true,
      dropdownItems: productCategories
    },
    {
      title: 'Bài Viết',
      href: '/bai-viet',
      hasDropdown: true,
      dropdownItems: ARTICLE_SECTIONS
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

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser.user);

        try {
          const serverCart = await cartService.getCart();
          const formattedCart = serverCart.items.map((item) => ({
            slug: item.slug,
            id: item.productId,
            quantity: item.quantity
          }));
          setCart(formattedCart);
        } catch (error) {
          console.error('Failed to load cart:', error);
        }
      } else {
        const authCheck = await authService.checkAuth();
        if (authCheck.isAuthenticated) {
          setUser(authCheck.user);

          // Sync cart từ server
          try {
            const serverCart = await cartService.getCart();
            const formattedCart = serverCart.items.map((item) => ({
              slug: item.slug,
              id: item.productId,
              quantity: item.quantity
            }));
            setCart(formattedCart);
          } catch (error) {
            console.error('Failed to load cart:', error);
          }
        }
      }
    };

    checkAuth();
  }, [pathname, setCart]);

  const handleLogout = async () => {
    try {
      await cartService.clearCart();
    } catch (error) {
      console.error('Failed to clear cart on server:', error);
    }

    await authService.logout();
    setUser(null);
    setCart([]);

    const protectedPages = ['/thanh-toan', '/tai-khoan', '/lich-su-don-hang', '/profile'];
    const currentPath = window.location.pathname;
    const isOnProtectedPage = protectedPages.some((page) => currentPath.startsWith(page));

    if (isOnProtectedPage) {
      showToast({
        status: 'info',
        content: 'Đã đăng xuất thành công.'
      });
      router.push('/');
    } else {
      showToast({
        status: 'info',
        content: 'Đã đăng xuất thành công.'
      });
      router.refresh();
    }
  };

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
        {/* LOGO */}
        <Link href="/">
          <Image src={'/images/logo-black.webp'} alt={IMG_ALT} w="120px" h="auto" />
        </Link>

        {/* NAVIGATION MENU */}
        <Flex align="center" flex={1} h="full" justify="center">
          {MENU_LIST.map((item, index) => {
            const { title, href, hasDropdown, dropdownItems } = item;
            let isActive = false;
            if (pathname === '/') {
              isActive = pathname === href;
            } else if (href !== '/') {
              isActive = pathname.includes(href);
            }

            // Menu item with dropdown (only for "Bài Viết")
            if (hasDropdown && dropdownItems) {
              return (
                <Box
                  key={title}
                  position="relative"
                  onMouseEnter={() => setShowDropdown(index)}
                  onMouseLeave={() => setShowDropdown(null)}
                >
                  {/* Menu Button */}
                  <Link href={href}>
                    <Flex
                      justify="center"
                      px="16px"
                      py="10px"
                      w={{ xs: '144px', lg: '120px', xl: '120px', '2xl': '144px' }}
                      borderBottom="2px solid"
                      borderColor={isActive ? (!isTransparent || isScrolled ? '#333' : '#333') : 'transparent'}
                      cursor="pointer"
                    >
                      <Text
                        fontSize={{ xs: '18px', lg: '18px' }}
                        fontWeight={600}
                        color={isActive ? (!isTransparent || isScrolled ? '#333' : '#333') : '#333'}
                        _hover={{
                          color: '#333',
                          borderColor: '#003366',
                          transform: 'translateY(-2px)'
                        }}
                        transition="color 0.2s ease"
                      >
                        {title}
                      </Text>
                    </Flex>
                  </Link>

                  {/* Dropdown Menu */}
                  {showDropdown === index && (
                    <Box
                      position="absolute"
                      top="100%"
                      left="0"
                      bg="white"
                      border="1px solid #e2e8f0"
                      borderRadius="8px"
                      boxShadow="0 10px 25px rgba(0,0,0,0.15)"
                      py={2}
                      minW="280px"
                      maxH="400px"
                      overflowY="auto"
                      zIndex={1001}
                    >
                      {dropdownItems.map((dropdownItem, itemIndex) => (
                        <Link key={itemIndex} href={dropdownItem.href}>
                          <Box
                            px={4}
                            py={3}
                            fontSize={18}
                            fontWeight={400}
                            color="gray.700"
                            cursor="pointer"
                            _hover={{
                              bg: 'gray.200',
                              color: 'black'
                            }}
                            transition="all 0.2s ease"
                          >
                            {dropdownItem.label || dropdownItem.name}
                          </Box>
                        </Link>
                      ))}
                    </Box>
                  )}
                </Box>
              );
            }

            // Regular menu item
            return (
              <Link href={href} key={title}>
                <Flex
                  justify="center"
                  px="16px"
                  py="10px"
                  w={{ xs: '144px', lg: '120px', xl: '120px', '2xl': '144px' }}
                  borderBottom="2px solid"
                  borderColor={isActive ? (!isTransparent || isScrolled ? '#003366' : '#333') : 'transparent'}
                  cursor="pointer"
                >
                  <Text
                    fontSize={{ xs: '18px', lg: '18px' }}
                    fontWeight={600}
                    color={isActive ? (!isTransparent || isScrolled ? '#333' : '#333') : '#333'}
                    _hover={{
                      color: '#333',
                      borderColor: '#003366',
                      transform: 'translateY(-2px)'
                    }}
                    transition="color 0.2s ease"
                  >
                    {title}
                  </Text>
                </Flex>
              </Link>
            );
          })}
        </Flex>

        {/* RIGHT SECTION - Cart + Auth */}
        <Flex align="center" gap="16px">
          <CartHeader />

          {/* Auth Section */}
          {user ? (
            <Menu>
              <MenuButton>
                <Flex align="center" gap="8px" cursor="pointer" p="8px" borderRadius="8px" _hover={{ bg: 'gray.50' }}>
                  <UserIcon w="20px" h="20px" color="#065FD4" />
                  <Text fontSize="14px" fontWeight={500} color="#333">
                    {user.full_name || user.fullName}
                  </Text>
                </Flex>
              </MenuButton>
              <MenuList>
                <Link href="/profile">
                  <MenuItem>Thông tin</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link href="/dang-nhap">
              <Flex align="center" gap="8px" cursor="pointer" p="8px" borderRadius="8px" _hover={{ bg: 'gray.50' }}>
                <UserIcon w="20px" h="20px" color="#065FD4" />
                <Text fontSize="14px" fontWeight={500} color="#333">
                  Đăng nhập
                </Text>
              </Flex>
            </Link>
          )}
        </Flex>
      </Flex>

      <Flex
        display={{ xs: 'flex', lg: 'none' }}
        zIndex={1000}
        as="header"
        align="center"
        h="70px"
        px="20px"
        justify="space-between"
        bgColor="#FFF"
        pos="fixed"
        top={0}
        left={0}
        w="full"
        boxShadow="xs"
      >
        <Link href="/">
          <Image src={'/images/logo-black.webp'} alt={IMG_ALT} w="120px" h="auto" />
        </Link>

        <Flex align="center" gap="16px">
          <CartHeaderMobile />

          {user ? (
            <Link href="/profile">
              <UserIcon w="24px" h="24px" color="#065FD4" cursor="pointer" />
            </Link>
          ) : (
            <Link href="/dang-nhap">
              <UserIcon w="24px" h="24px" color="#065FD4" cursor="pointer" />
            </Link>
          )}

          <Box onClick={onOpen} cursor="pointer">
            <Box w="24px" h="2px" bg="#333" mb="6px" />
            <Box w="24px" h="2px" bg="#333" mb="6px" />
            <Box w="24px" h="2px" bg="#333" />
          </Box>
        </Flex>
      </Flex>

      {/* MOBILE DRAWER */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Flex justify="space-between" align="center">
              <Text fontSize={18} fontWeight={600}>
                Menu
              </Text>
              <Box onClick={onClose} cursor="pointer" fontSize={24}>
                ×
              </Box>
            </Flex>
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack spacing={0} align="stretch">
              {user && (
                <Box borderBottom="1px solid #e2e8f0" bg="#f7fafc">
                  <Flex px={6} py={4} align="center" gap="12px">
                    <UserIcon w="24px" h="24px" color="#065FD4" />
                    <Text fontSize={18} fontWeight={600} color="#333">
                      {user.full_name || user.fullName}
                    </Text>
                  </Flex>
                  <VStack spacing={0} align="stretch">
                    <Link href="/profile" onClick={onClose}>
                      <Box
                        px={8}
                        py={3}
                        fontSize={15}
                        color="#666"
                        _hover={{ bg: '#e2e8f0', color: '#065FD4' }}
                        borderBottom="1px solid #e2e8f0"
                      >
                        Thông tin
                      </Box>
                    </Link>
                    <Box
                      px={8}
                      py={3}
                      fontSize={15}
                      color="#666"
                      _hover={{ bg: '#e2e8f0', color: '#065FD4' }}
                      borderBottom="1px solid #e2e8f0"
                      cursor="pointer"
                      onClick={() => {
                        handleLogout();
                        onClose();
                      }}
                    >
                      Đăng xuất
                    </Box>
                  </VStack>
                </Box>
              )}

              {!user && (
                <Link href="/dang-nhap" onClick={onClose}>
                  <Box
                    px={6}
                    py={4}
                    fontSize={18}
                    fontWeight={500}
                    color="#065FD4"
                    bg="#f7fafc"
                    borderBottom="1px solid #e2e8f0"
                  >
                    <Flex align="center" gap="12px">
                      <UserIcon w="24px" h="24px" />
                      <Text>Đăng nhập</Text>
                    </Flex>
                  </Box>
                </Link>
              )}

              {MENU_LIST.map((menu, index) => {
                const { title, href, hasDropdown, dropdownItems } = menu;
                const isActive = pathname === href || pathname.startsWith(href);

                return (
                  <Box key={index}>
                    <Link href={href} onClick={onClose}>
                      <Box
                        px={6}
                        py={4}
                        fontSize={18}
                        fontWeight={500}
                        color={isActive ? '#065FD4' : '#333'}
                        bg={isActive ? '#f7fafc' : 'transparent'}
                        _hover={{ bg: '#f7fafc', color: '#065FD4' }}
                        borderBottom="1px solid #e2e8f0"
                      >
                        {title}
                      </Box>
                    </Link>

                    {hasDropdown && dropdownItems && (
                      <VStack spacing={0} align="stretch" bg="#f9f9f9">
                        {dropdownItems.map((item, itemIndex) => (
                          <Link key={itemIndex} href={item.href} onClick={onClose}>
                            <Box
                              px={8}
                              py={3}
                              fontSize={15}
                              color="#666"
                              _hover={{ bg: '#e2e8f0', color: '#065FD4' }}
                              borderBottom="1px solid #e2e8f0"
                            >
                              {item.label}
                            </Box>
                          </Link>
                        ))}
                      </VStack>
                    )}
                  </Box>
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
