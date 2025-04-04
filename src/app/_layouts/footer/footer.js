import { IMG_ALT, PX_ALL } from '@/utils/const';
import { Box, Link as ChakraLink, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Fragment } from 'react';

const Footer = () => {
  const MENU_LINKS_1 = [
    {
      title: 'Trang chủ',
      href: '/'
    },
    {
      title: 'Giới thiệu',
      href: '/gioi-thieu'
    },
    {
      title: 'Sản phẩm',
      href: '/san-pham',
      children: [
        {
          title: 'Bột vị',
          href: '/san-pham?categoryId=1'
        },
        {
          title: 'Topping',
          href: '/san-pham?categoryId=2'
        },
        {
          title: 'Mứt hoa quả',
          href: '/san-pham?categoryId=3'
        }
      ]
    }
  ];

  const MENU_LINKS_2 = [
    {
      title: 'Tin tức',
      href: '/tin-tuc'
    },
    {
      title: 'Đối tác',
      href: '/khach-hang'
    },
    {
      title: 'Tuyển dụng',
      href: '/tuyen-dung'
    }
  ];

  return (
    <Flex
      bgImage={{ xs: `url(/images/bg-footer-mobile.png)`, lg: `url(/images/bg-footer.png)` }}
      bgSize="cover"
      bgRepeat="no-repeat"
      px={PX_ALL}
      pt={{ xs: '80px', md: '100px', lg: '150px', xl: '120px' }}
      direction="column"
      mt={{ xs: '0px', md: '0px', lg: '-50px', xl: '0px' }}
    >
      <Flex direction={{ xs: 'column', lg: 'row' }} align="flex-start" pos="relative" gap={{ xs: '12px', lg: '24px' }}>
        <Flex align="center" display={{ xs: 'flex', lg: 'none' }}>
          <Text fontSize={16}>Fanpage:</Text>
          <Link href="/" target="_blank">
            <Image src="/images/facebook-black.png" w="24px" h="24px" alt={IMG_ALT} />
          </Link>
          <Link href="/" target="_blank">
            <Image src="/images/zalo-black.png" w="24px" h="24px" alt={IMG_ALT} />
          </Link>
        </Flex>

        <Flex flex={{ xs: 'none', lg: 1 / 3 }} direction="column">
          <Text fontSize={16} fontWeight={600}>
            Công ty TNHH XNK Hi Sweetie Việt Nam
          </Text>

          <Flex direction="column" mt="8px" gap="8px">
            <Flex align="flex-start" gap="8px">
              <Image src="/images/location.png" alt={IMG_ALT} w="24px" h="24px" />
              <Box>
                <Text fontWeight={400} lineHeight="21px">
                  Cửa hàng tại HCM: Số 42 Đường số 7, Phường 10, Quận Tân Bình, Thành phố Hồ Chí Minh
                </Text>
                <Text fontWeight={400} mt="8px" lineHeight="21px">
                  Cửa hàng tại HN: B-TT10-4 thuộc dự án Him Lam Vạn Phúc, đường Tố Hữu, Phường Vạn Phúc, Quận Hà Đông,
                  Thành phố Hà Nội, Việt Nam
                </Text>
              </Box>
            </Flex>

            <Flex align="flex-start" gap="8px">
              <Image src="/images/email.png" alt={IMG_ALT} w="24px" h="24px" />
              <ChakraLink href="mailto:hisweetievietnam@gmail.com" fontWeight={400} _hover={{ textDecor: 'none' }}>
                hisweetievietnam@gmail.com
              </ChakraLink>
            </Flex>

            <Flex align="flex-start" gap="8px">
              <Image src="/images/phone.png" alt={IMG_ALT} w="24px" h="24px" />
              <ChakraLink href="tel:+84931566676" fontWeight={400} _hover={{ textDecor: 'none' }}>
                +84 931 566 676
              </ChakraLink>
            </Flex>
          </Flex>
        </Flex>

        <Flex flex={{ xs: 'none', lg: 1 / 3 }} w={{ xs: 'full', lg: 'auto' }} justify="space-between">
          <Flex direction="column" flex={1} align={{ xs: 'flex-start', lg: 'center' }}>
            <Flex direction="column" align={{ xs: 'flex-start', lg: 'center' }} gap="6px" px={{ xs: '12px', lg: 0 }}>
              {MENU_LINKS_1.map((item) => {
                const { title, href, children } = item;
                return (
                  <Fragment key={title}>
                    <Link href={href}>
                      <Text as="span" fontWeight={500} fontSize={16} py="6px" textAlign="center" h="32px">
                        {title}
                      </Text>
                    </Link>

                    {!!children && (
                      <Flex display={{ xs: 'none', lg: 'flex' }} direction="column" pl={{ xs: '20px', lg: '56px' }}>
                        {children.map((child) => {
                          return (
                            <Link href={child.href} key={child.title}>
                              <Text py="4px">{child.title}</Text>
                            </Link>
                          );
                        })}
                      </Flex>
                    )}
                  </Fragment>
                );
              })}
            </Flex>
          </Flex>

          <Flex direction="column" flex={1} align={{ xs: 'flex-start', lg: 'center' }}>
            <Flex direction="column" align={{ xs: 'flex-start', lg: 'center' }} gap="6px">
              {MENU_LINKS_2.map((item) => {
                const { title, href } = item;
                return (
                  <Link href={href} key={title}>
                    <Text as="span" fontWeight={500} fontSize={16} py="6px" textAlign="center" h="32px">
                      {title}
                    </Text>
                  </Link>
                );
              })}
            </Flex>
          </Flex>
        </Flex>

        <Flex flex={{ xs: 'none', lg: 1 / 3 }} direction="column" gap="24px" w="full">
          <Flex align="center" display={{ xs: 'none', lg: 'flex' }}>
            <Text fontSize={16}>Fanpage:</Text>
            <Link href="/" target="_blank">
              <Image src="/images/facebook-black.png" w="24px" h="24px" alt={IMG_ALT} />
            </Link>
            <Link href="/" target="_blank">
              <Image src="/images/zalo-black.png" w="24px" h="24px" alt={IMG_ALT} />
            </Link>
          </Flex>

          <Box h="165px" borderRadius={16} overflow="hidden" w="full">
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=13iQDJRjGYBAiV0V8u9L3Gw2_YF701TY&ehbc=2E312F"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Flex>
      </Flex>

      <Text my="24px">Copyright © 2024 Công ty TNHH Xuất Nhập Khẩu HI SWEETIE Việt Nam. All rights reserved.</Text>
    </Flex>
  );
};

export default Footer;
