'use client';

import { ARTICLE_SECTIONS } from '../../../utils/article-types';
import { useProductCategories } from '../../../hooks/useProductCategories';
// ====== ĐÃ TẠM ẨN GIỎ HÀNG & ĐĂNG NHẬP ======
// import { useRecoilState } from 'recoil';
// import { cartAtom } from '../../../states/common';
// import { cartService } from '../../../services/cart.service';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  // Icon,
  Image,
  // Menu,
  // MenuButton,
  // MenuItem,
  // MenuList,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
// import CartHeader from './_components/cart-header';
// import CartHeaderMobile from './_components/cart-header-mobile';
// import { authService } from '../../../services/auth.service';
// import { showToast } from '../../../utils/helper';
// import { useAuth } from '../../../contexts/auth-context';
import { useTranslation } from '../../../hooks/useTranslation';
// ====== ĐÃ TẠM ẨN CHUYỂN ĐỔI NGÔN NGỮ ======
// import LanguageSwitcher from '../../../components/language-switcher';

// const UserIcon = (props) => (
//   <Icon viewBox="0 0 24 24" {...props}>
//     <path
//       fill="currentColor"
//       d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
//     />
//   </Icon>
// );

const Header = () => {
  const { t, getLocalizedText } = useTranslation();
  const pathname = usePathname();
  // const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  // Key item cấp 1 đang hover để hiện submenu cấp 2 (flyout).
  const [showSubmenu, setShowSubmenu] = useState(null);
  // ====== ĐÃ TẠM ẨN GIỎ HÀNG & ĐĂNG NHẬP ======
  // const [cart, setCart] = useRecoilState(cartAtom);
  const isTransparent = pathname === '/' || pathname === '/lien-he' || pathname.startsWith('/tac-gia');

  const { categories: productCategories, menuConfig } = useProductCategories();

  // const { user, isAuthenticated, isChecking, isFullyReady, logout } = useAuth();

  const MENU_LIST = [
    {
      title: t('nav.home'),
      href: '/'
    },
    {
      title: t('nav.about'),
      href: '/gioi-thieu-diep-tra'
    },
    {
      // Khi CMS đã cấu hình: dùng tên + href danh mục cha cố định.
      // Chưa cấu hình (menuConfig=null): giữ hành vi cũ "Sản Phẩm" -> /san-pham.
      title: menuConfig?.name || t('nav.products'),
      href: menuConfig?.href || '/san-pham',
      hasDropdown: true,
      dropdownItems: productCategories
    },
    {
      title: t('nav.articles'),
      href: '/bai-viet',
      hasDropdown: true,
      dropdownItems: ARTICLE_SECTIONS
    },
    {
      title: t('nav.contact'),
      href: '/lien-he'
    },
    {
      title: t('nav.recruitment'),
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

  // ====== ĐÃ TẠM ẨN ĐỒNG BỘ GIỎ HÀNG & ĐĂNG XUẤT ======
  // useEffect(() => {
  //   const loadCart = async () => {
  //     if (isFullyReady && isAuthenticated && user) {
  //       try {
  //         const authCheck = await authService.checkAuth();
  //         if (authCheck.isAuthenticated && authCheck.access_token) {
  //           authService.getCurrentToken(authCheck.access_token);
  //         }
  //
  //         const serverCart = await cartService.getCart();
  //         const formattedCart = serverCart.items.map((item) => ({
  //           slug: item.slug,
  //           id: item.productId,
  //           quantity: item.quantity
  //         }));
  //         setCart(formattedCart);
  //       } catch (error) {
  //         setCart([]);
  //       }
  //     } else if (!isChecking && !isAuthenticated) {
  //       setCart([]);
  //     }
  //   };
  //
  //   loadCart();
  // }, [isFullyReady, isAuthenticated, user, setCart, isChecking]);
  //
  // const handleLogout = async () => {
  //   await logout();
  //   setCart([]);
  //
  //   const protectedPages = ['/thanh-toan', '/tai-khoan', '/lich-su-don-hang', '/profile', '/gio-hang'];
  //   const currentPath = window.location.pathname;
  //   const isOnProtectedPage = protectedPages.some((page) => currentPath.startsWith(page));
  //
  //   if (isOnProtectedPage) {
  //     showToast({
  //       status: 'info',
  //       content: t('nav.logout.success')
  //     });
  //     router.push('/');
  //   } else {
  //     showToast({
  //       status: 'info',
  //       content: t('nav.logout.success')
  //     });
  //     router.refresh();
  //   }
  // };

  return (
    <Box>
      <Flex
        display={{ xs: 'none', lg: 'flex' }}
        zIndex={1000}
        as="header"
        align="center"
        h="114px"
        px={{ lg: '24px', xl: '40px', '2xl': '48px' }}
        pt="24px"
        gap={{ lg: '16px', xl: '40px', '2xl': '62px' }}
        justify="space-between"
        bgColor={!isTransparent || isScrolled ? '#FFF' : 'transparent'}
        pos="fixed"
        top={0}
        left={0}
        w="full"
        boxShadow={isScrolled ? 'xs' : 'none'}
      >
        {/* LOGO */}
        <Link href="/" style={{ flexShrink: 0 }}>
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
                      px={{ lg: '8px', xl: '12px' }}
                      py="10px"
                      minW={{ lg: '92px', xl: '108px', '2xl': '128px' }}
                      borderBottom="2px solid"
                      borderColor={isActive ? (!isTransparent || isScrolled ? '#333' : '#333') : 'transparent'}
                      cursor="pointer"
                    >
                      <Text
                        fontSize={{ lg: '15px', xl: '16px', '2xl': '20px' }}
                        fontWeight={600}
                        whiteSpace="nowrap"
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
                      zIndex={1001}
                    >
                      {dropdownItems.map((dropdownItem, itemIndex) => {
                        const subItems = dropdownItem.children || [];
                        const hasSub = subItems.length > 0;
                        const submenuKey = `${index}-${itemIndex}`;

                        return (
                          <Box
                            key={itemIndex}
                            position="relative"
                            onMouseEnter={() => setShowSubmenu(hasSub ? submenuKey : null)}
                            onMouseLeave={() => setShowSubmenu(null)}
                          >
                            <Link href={dropdownItem.href}>
                              <Flex
                                align="center"
                                justify="space-between"
                                px={4}
                                py={3}
                                fontSize={{ lg: '15px', xl: '16px', '2xl': '20px' }}
                                fontWeight={400}
                                color="gray.700"
                                cursor="pointer"
                                _hover={{
                                  bg: 'gray.200',
                                  color: 'black'
                                }}
                                transition="all 0.2s ease"
                              >
                                <Text as="span" fontSize={{ lg: '15px', xl: '16px', '2xl': '18px' }}>
                                  {getLocalizedText(dropdownItem.name, dropdownItem.name_en)}
                                </Text>
                                {hasSub && (
                                  <Text as="span" ml={2} fontSize={14} color="gray.500">
                                    ›
                                  </Text>
                                )}
                              </Flex>
                            </Link>

                            {/* Submenu cấp 2 (flyout sang phải) */}
                            {hasSub && showSubmenu === submenuKey && (
                              <Box
                                position="absolute"
                                top="0"
                                left="100%"
                                bg="white"
                                border="1px solid #e2e8f0"
                                borderRadius="8px"
                                boxShadow="0 10px 25px rgba(0,0,0,0.15)"
                                py={2}
                                minW="260px"
                                maxH="400px"
                                overflowY="auto"
                                zIndex={1002}
                              >
                                {subItems.map((subItem, subIndex) => (
                                  <Link key={subIndex} href={subItem.href}>
                                    <Box
                                      px={4}
                                      py={3}
                                      fontSize={16}
                                      fontWeight={400}
                                      color="gray.700"
                                      cursor="pointer"
                                      _hover={{
                                        bg: 'gray.200',
                                        color: 'black'
                                      }}
                                      transition="all 0.2s ease"
                                    >
                                      {getLocalizedText(subItem.name, subItem.name_en)}
                                    </Box>
                                  </Link>
                                ))}
                              </Box>
                            )}
                          </Box>
                        );
                      })}
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
                  px={{ lg: '8px', xl: '12px' }}
                  py="10px"
                  w={{ lg: '92px', xl: '108px', '2xl': '128px' }}
                  borderBottom="2px solid"
                  borderColor={isActive ? (!isTransparent || isScrolled ? '#003366' : '#333') : 'transparent'}
                  cursor="pointer"
                >
                  <Text
                    fontSize={{ lg: '15px', xl: '16px', '2xl': '20px' }}
                    fontWeight={600}
                    whiteSpace="nowrap"
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

        {/* RIGHT SECTION - Liên hệ + Ngôn ngữ */}
        <Flex align="center" gap="16px" flexShrink={0}>
          {/* ====== ĐÃ TẠM ẨN GIỎ HÀNG & ĐĂNG NHẬP ====== */}
          {/* <CartHeader /> */}
          {/* ====== ĐÃ TẠM ẨN CHUYỂN ĐỔI NGÔN NGỮ ====== */}
          {/* <LanguageSwitcher /> */}

          <Link href="https://zalo.me/4415290839928975010" target="_blank" _hover={{ textDecor: 'none' }}>
            <Flex
              align="center"
              justify="center"
              borderRadius={8}
              px={{ lg: '16px', xl: '20px' }}
              h="40px"
              bgColor="transparent"
              _hover={{ opacity: 0.8 }}
              transitionDuration="250ms"
            >
              <Text fontSize="18px" fontWeight={700} color="#0F2C3D" whiteSpace="nowrap">
                📞 0973 123 230
              </Text>
            </Flex>
          </Link>

          {/* Auth Section */}
          {/* {isChecking ? (
            <Box w="142px" />
          ) : user ? (
            <Menu>
              <MenuButton>
                <Flex align="center" gap="8px" cursor="pointer" p="8px" borderRadius="8px" _hover={{ bg: 'gray.50' }}>
                  <UserIcon w="20px" h="20px" color="#065FD4" />
                  <Text fontSize="16px" fontWeight={500} color="#333">
                    {user.full_name || user.fullName}
                  </Text>
                </Flex>
              </MenuButton>
              <MenuList>
                <Link href="/profile">
                  <MenuItem fontSize="17px">{t('nav.products-information')}</MenuItem>
                </Link>
                <MenuItem fontSize="17px" onClick={handleLogout}>
                  {t('nav.logout')}
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link href="/dang-nhap">
              <Flex align="center" gap="8px" cursor="pointer" p="8px" borderRadius="8px" _hover={{ bg: 'gray.50' }}>
                <UserIcon w="20px" h="20px" color="#065FD4" />
                <Text fontSize="17px" fontWeight={500} color="#333">
                  {t('nav.login')}
                </Text>
              </Flex>
            </Link>
          )} */}
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
        bgColor={!isTransparent || isScrolled ? '#FFF' : 'transparent'}
        pos="fixed"
        top={0}
        left={0}
        w="full"
        boxShadow={!isTransparent || isScrolled ? 'xs' : 'none'}
      >
        <Link href="/">
          <Image src={'/images/logo-black.webp'} alt={IMG_ALT} w="120px" h="auto" />
        </Link>

        <Flex align="center" gap="16px">
          {/* ====== ĐÃ TẠM ẨN GIỎ HÀNG & ĐĂNG NHẬP ====== */}
          {/* <CartHeaderMobile /> */}
          {/* ====== ĐÃ TẠM ẨN CHUYỂN ĐỔI NGÔN NGỮ ====== */}
          {/* <LanguageSwitcher /> */}

          {/* {isChecking ? (
            <Box w="24px" />
          ) : user ? (
            <Menu>
              <MenuButton>
                <UserIcon w="24px" h="24px" color="#065FD4" />
              </MenuButton>
              <MenuList>
                <Link href="/profile">
                  <MenuItem fontSize="17px">{t('nav.products-information')}</MenuItem>
                </Link>
                <MenuItem fontSize="17px" onClick={handleLogout}>
                  {t('nav.logout')}
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link href="/dang-nhap">
              <UserIcon w="24px" h="24px" color="#065FD4" />
            </Link>
          )} */}

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
              <Text fontSize={20} fontWeight={600}>
                Menu
              </Text>
              <Box onClick={onClose} cursor="pointer" fontSize={24}>
                ×
              </Box>
            </Flex>
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack spacing={0} align="stretch">
              {/* {isChecking ? (
                <Box h="70px" />
              ) : user ? (
                <Box
                  px={6}
                  py={4}
                  fontSize={18}
                  fontWeight={500}
                  color="#065FD4"
                  bg="#f7fafc"
                  borderBottom="1px solid #e2e8f0"
                >
                  <VStack align="start" spacing={2}>
                    <Flex align="center" gap="12px">
                      <UserIcon w="24px" h="24px" />
                      <Text>{user.full_name || user.fullName}</Text>
                    </Flex>
                    <Link href="/profile">{t('nav.products-information')}</Link>
                    <Box
                      w="full"
                      mt={2}
                      pt={2}
                      borderTop="1px solid #e2e8f0"
                      fontSize={15}
                      color="#666"
                      cursor="pointer"
                      onClick={handleLogout}
                    >
                      {t('nav.home.mobile.logout')}
                    </Box>
                  </VStack>
                </Box>
              ) : (
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
                      <Text>{t('nav.login')}</Text>
                    </Flex>
                  </Box>
                </Link>
              )} */}

              {/* {!user && (
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
                      <Text>{t('nav.login')}</Text>
                    </Flex>
                  </Box>
                </Link>
              )} */}

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
                          <Box key={itemIndex}>
                            <Link href={item.href} onClick={onClose}>
                              <Box
                                px={8}
                                py={3}
                                fontSize={15}
                                color="#666"
                                _hover={{ bg: '#e2e8f0', color: '#065FD4' }}
                                borderBottom="1px solid #e2e8f0"
                              >
                                {getLocalizedText(item.name, item.name_en)}
                              </Box>
                            </Link>

                            {/* Cấp 2: thụt lề sâu hơn */}
                            {(item.children || []).map((sub, subIndex) => (
                              <Link key={subIndex} href={sub.href} onClick={onClose}>
                                <Box
                                  px={12}
                                  py={2.5}
                                  fontSize={14}
                                  color="#888"
                                  _hover={{ bg: '#e2e8f0', color: '#065FD4' }}
                                  borderBottom="1px solid #e2e8f0"
                                >
                                  {getLocalizedText(sub.name, sub.name_en)}
                                </Box>
                              </Link>
                            ))}
                          </Box>
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
