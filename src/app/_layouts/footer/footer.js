import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { Box, Link as ChakraLink, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Fragment } from 'react';

const Footer = () => {
  const MENU_LINKS_1 = [
    {
      title: 'Chính Sách Diệp Trà',
      href: '/chinh-sach-diep-tra',
      children: [
        {
          title: 'Giới Thiệu Diệp Trà',
          href: '/gioi-thieu-diep-tra'
        },
        {
          title: 'Liên Hệ',
          href: '/lien-he'
        },
        {
          title: 'Sản Phẩm',
          href: '/san-pham'
        },
        {
          title: 'Chính Sách Bảo Mật',
          href: '/chinh-sach-diep-tra/chinh-sach-bao-mat'
        },
        {
          title: 'Chính Sách Mua Hàng',
          href: '/chinh-sach-diep-tra/chinh-sach-mua-hang'
        },
        {
          title: 'Chính Sách Thanh Toán',
          href: '/chinh-sach-diep-tra/chinh-sach-thanh-toan'
        },
        {
          title: 'Chính Sách Giao Hàng',
          href: '/chinh-sach-diep-tra/chinh-sach-giao-hang'
        },
        {
          title: 'Chính Sách Bảo Hành',
          href: '/chinh-sach-diep-tra/chinh-sach-bao-hanh'
        },
        {
          title: 'Chính Sách Đổi/Trả Hàng',
          href: '/chinh-sach-diep-tra/chinh-sach-doi-hang-tra-hang'
        },
        {
          title: 'Điều Khoản Sử Dụng',
          href: '/chinh-sach-diep-tra/dieu-khoan-su-dung'
        }
      ]
    }
  ];

  const MENU_LINKS_2 = [
    // {
    //   title: 'Tin tức',
    //   href: '/tin-tuc'
    // },
    // {
    //   title: 'Đối tác',
    //   href: '/khach-hang'
    // },
    // {
    //   title: 'Tuyển dụng',
    //   href: '/tuyen-dung'
    // }
  ];

  const MENU_LINK_3 = [
    {
      title: 'Chính Sách Diệp Trà',
      href: '/chinh-sach-diep-tra'
    },
    {
      title: ''
    }
  ];

  return (
    <Flex
      bgImage={{ xs: `url(/images/bg-footer-mobile.webp)`, lg: `url(/images/bg-footer.webp)` }}
      bgSize="cover"
      bgRepeat="no-repeat"
      px={PX_ALL}
      pt={{ xs: '80px', md: '100px', lg: '150px', xl: '120px' }}
      direction="column"
      mt={{ xs: '0px', md: '0px', lg: '-50px', xl: '0px' }}
    >
      <Flex direction={{ xs: 'column', lg: 'row' }} align="flex-start" pos="relative" gap={{ xs: '12px', lg: '24px' }}>
        <Flex align="center" display={{ xs: 'flex', lg: 'none' }}>
          <Text fontSize={18}>Fanpage:</Text>
          <Link href="/" target="_blank">
            <Image src="/images/facebook-black.webp" w="24px" h="24px" alt={IMG_ALT} />
          </Link>
          <Link href="/" target="_blank">
            <Image src="/images/zalo-black.webp" w="24px" h="24px" alt={IMG_ALT} />
          </Link>
          <Link href="https://www.youtube.com/@Dieptra_Official" target="_blank">
            <Image src="/images/Youtube.webp" w="24px" h="24px" alt={IMG_ALT} />
          </Link>
        </Flex>

        <Flex flex={{ xs: 'none', lg: 1 / 3 }} direction="column">
          <Text fontSize={18} fontWeight={600}>
            Công ty TNHH XNK Hi Sweetie Việt Nam
          </Text>

          <Flex direction="column" mt="8px" gap="8px">
            <Flex align="flex-start" gap="8px">
              <Image src="/images/certification.webp" alt={IMG_ALT} w="24px" h="24px" />
              <Box>
                <Text fontWeight={400} lineHeight="21px">
                  Giấy phép Đăng kí kinh doanh số 0110211839 do Phòng Đăng ký kinh doanh – Sở Tài Chính cấp lần đầu ngày
                  20/12/2022, đăng ký thay đổi lần thứ 1, ngày 19/11/12024.
                </Text>
              </Box>
            </Flex>

            <Flex align="flex-start" gap="8px">
              <Image src="/images/location.webp" alt={IMG_ALT} w="24px" h="24px" />
              <Box>
                <Text fontWeight={400} lineHeight="21px">
                  Trụ sở chính: B-TT10-4 Him Lam Vạn Phúc, Tố Hữu, Hà Đông, Hà Nội.
                </Text>
              </Box>
            </Flex>

            <Flex align="flex-start" gap="8px">
              <Image src="/images/location.webp" alt={IMG_ALT} w="24px" h="24px" />
              <Box>
                <Text fontWeight={400} lineHeight="21px">
                  Văn phòng miền Nam: P1.2.24 Diamond Alnata, Block A3, Celadon City, Tân Phú, TP.HCM.
                </Text>
              </Box>
            </Flex>

            <Flex align="flex-start" gap="8px">
              <Image src="/images/location.webp" alt={IMG_ALT} w="24px" h="24px" />
              <Box>
                <Text fontWeight={400} lineHeight="21px">
                  Cửa hàng tại HCM: Số 42 Đường số 7, Phường 10, Quận Tân Bình, Thành phố Hồ Chí Minh
                </Text>
              </Box>
            </Flex>

            <Flex align="flex-start" gap="8px">
              <Image src="/images/email.webp" alt={IMG_ALT} w="24px" h="24px" />
              <Flex>
                <Text mr={1}>Website:</Text>
                <ChakraLink
                  href="https://www.dieptra.com/"
                  fontWeight={400}
                  target="_blank"
                  _hover={{ textDecor: 'none' }}
                >
                  dieptra.com
                </ChakraLink>
              </Flex>
            </Flex>

            <Flex align="flex-start" gap="8px">
              <Image src="/images/email.webp" alt={IMG_ALT} w="24px" h="24px" />
              <ChakraLink href="mailto:sales@hisweetievietnam.com.vn" fontWeight={400} _hover={{ textDecor: 'none' }}>
                sales@hisweetievietnam.com.vn
              </ChakraLink>
            </Flex>

            <Flex align="flex-start" gap="8px">
              <Image src="/images/phone.webp" alt={IMG_ALT} w="24px" h="24px" />
              <ChakraLink href="tel:+84788339379" fontWeight={400} _hover={{ textDecor: 'none' }}>
                +84 78 833 9379
              </ChakraLink>
            </Flex>

            <Text fontSize={18} fontWeight={500}>
              Giờ làm việc:{' '}
              <Text fontSize={18} fontWeight={500}>
                T2 - T7: 8h30 - 17h30
              </Text>
            </Text>
          </Flex>
        </Flex>

        <Flex flex={{ xs: 'none', lg: 1 / 3 }} w={{ xs: 'full', lg: 'auto' }} justify="space-between">
          <Flex direction="column" flex={1} align={{ xs: 'flex-start', lg: 'center' }}>
            <Flex
              direction="column"
              align={{ xs: 'flex-start', lg: 'center' }}
              gap="6px"
              px={{ xs: '12px', lg: 'center' }}
            >
              {MENU_LINKS_1.map((item) => {
                const { title, href, children } = item;
                return (
                  <Fragment key={title}>
                    <Link href={href}>
                      <Text as="span" fontWeight={500} fontSize={18} py="6px" textAlign="center" h="32px">
                        {title}
                      </Text>
                    </Link>

                    {!!children && (
                      <Flex display={{ xs: 'none', lg: 'flex' }} direction="column" pl={{ xs: '20px', lg: 'center' }}>
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
                    <Text as="span" fontWeight={500} fontSize={18} py="6px" textAlign="center" h="32px">
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
            <Text fontSize={18}>Fanpage:</Text>
            <Link href="https://www.facebook.com/dieptra.0788339379" target="_blank">
              <Image src="/images/facebook-black.webp" w="24px" h="24px" alt={IMG_ALT} />
            </Link>
            <Link href="https://zalo.me/s/1428308065058357450/" target="_blank">
              <Image src="/images/zalo-black.webp" w="24px" h="24px" alt={IMG_ALT} />
            </Link>
            <Link href="https://www.youtube.com/@Dieptra_Official" target="_blank">
              <Image src="/images/Youtube.webp" w="24px" h="24px" alt={IMG_ALT} />
            </Link>
          </Flex>

          <Box h="165px" borderRadius={16} overflow="hidden" w="full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2849207322743!2d105.76739007934567!3d20.981213000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453c729c85a77%3A0xa04589e6754e1c77!2zRGnhu4dwIFRyw6Ag4oCTIENodXnDqm4gQ3VuZyBD4bqlcCBOZ3V5w6puIExp4buHdSBQaGEgQ2jhur8!5e0!3m2!1sen!2s!4v1756185273251!5m2!1sen!2s"
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
