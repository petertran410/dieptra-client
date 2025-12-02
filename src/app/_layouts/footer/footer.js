'use client';

import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { Box, Link as ChakraLink, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import Script from 'next/script';
import { useTranslation } from '../../../hooks/useTranslation';

const Footer = () => {
  const { t, getLocalizedText } = useTranslation();

  const MENU_LINKS_1 = [
    {
      title: 'Chính Sách Diệp Trà',
      title_en: 'Diep Tra Policy',
      href: '/chinh-sach-diep-tra',
      children: [
        {
          title: 'Giới Thiệu Diệp Trà',
          title_en: 'Introducing Diep Tra',
          href: '/gioi-thieu-diep-tra'
        },
        {
          title: 'Liên Hệ',
          title_en: 'Contact',
          href: '/lien-he'
        },
        {
          title: 'Sản Phẩm',
          title_en: 'Product',
          href: '/san-pham'
        },
        {
          title: 'Chính Sách Bảo Mật',
          title_en: 'Privacy Policy',
          href: '/chinh-sach-diep-tra/chinh-sach-bao-mat'
        },
        {
          title: 'Chính Sách Mua Hàng',
          title_en: 'Purchase Policy',
          href: '/chinh-sach-diep-tra/chinh-sach-mua-hang'
        },
        {
          title: 'Chính Sách Thanh Toán',
          title_en: 'Payment Policy',
          href: '/chinh-sach-diep-tra/chinh-sach-thanh-toan'
        },
        {
          title: 'Chính Sách Vận Chuyển Và Giao Nhận',
          title_en: 'Shipping and Delivery Policy',
          href: '/chinh-sach-diep-tra/chinh-sach-van-chuyen-va-giao-nhan'
        },
        {
          title: 'Chính Sách Bảo Hành',
          title_en: 'Warranty Policy',
          href: '/chinh-sach-diep-tra/chinh-sach-bao-hanh'
        },
        {
          title: 'Chính Sách Đổi/Trả Hàng',
          title_en: 'Return/Exchange Policy',
          href: '/chinh-sach-diep-tra/chinh-sach-doi-hang-tra-hang'
        },
        {
          title: 'Điều Khoản Sử Dụng',
          title_en: 'Terms of Use',
          href: '/chinh-sach-diep-tra/dieu-khoan-su-dung'
        },
        {
          title: 'Hướng Dẫn Tạo Tài Khoản',
          title_en: 'Account Creation Guide',
          href: '/chinh-sach-diep-tra/huong-dan-tao-tai-khoan'
        },
        {
          title: 'Chính Sách Kiểm Hàng',
          title_en: 'Inspection Policy',
          href: '/chinh-sach-diep-tra/chinh-sach-kiem-hang'
        },
        {
          title: 'Chính Sách Mẫu Thử',
          title_en: 'Sample Policy',
          href: '/chinh-sach-diep-tra/chinh-sach-mau-thu'
        }
        // { title: 'Chính Sách Giao Hàng Đông Lạnh', href: '/chinh-sach-diep-tra/chinh-sach-giao-hang-dong-lanh' }
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

  return (
    <Flex
      bgImage={{ xs: `url(/images/bg-footer-mobile.webp)`, lg: `url(/images/bg-footer.webp)` }}
      bgSize="cover"
      bgRepeat="no-repeat"
      px={PX_ALL}
      pt={{ xs: '80px', md: '100px', lg: '200px', xl: '200px' }}
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
            {t('footer.title')}
          </Text>

          <Flex direction="column" mt="8px" gap="8px">
            <Flex align="flex-start" gap="8px">
              <Image src="/images/certification.webp" alt={IMG_ALT} w="24px" h="24px" />
              <Box>
                <Text fontWeight={400} lineHeight="21px">
                  {t('footer.license.business')}
                </Text>
              </Box>
            </Flex>
            <Flex align="flex-start" gap="8px">
              <Image src="/images/location.webp" alt={IMG_ALT} w="24px" h="24px" />
              <Box>
                <Text fontWeight={400} lineHeight="21px">
                  {t('footer.header.quarters.bac')}
                </Text>
              </Box>
            </Flex>
            <Flex align="flex-start" gap="8px">
              <Image src="/images/location.webp" alt={IMG_ALT} w="24px" h="24px" />
              <Box>
                <Text fontWeight={400} lineHeight="21px">
                  {t('footer.header.quarters.nam')}
                </Text>
              </Box>
            </Flex>
            <Flex align="flex-start" gap="8px">
              <Image src="/images/location.webp" alt={IMG_ALT} w="24px" h="24px" />
              <Box>
                <Text fontWeight={400} lineHeight="21px">
                  {t('footer.shop')}
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
                +84 973 123 230
              </ChakraLink>
            </Flex>
            <Text fontSize={18} fontWeight={500}>
              {t('footer.workingtime')}{' '}
              <Text fontSize={18} fontWeight={500}>
                T2 - T7: 8h30 - 17h30
              </Text>
            </Text>
            <Flex align="center" gap="16px" mt="8px">
              <Link href="http://online.gov.vn/Home/WebDetails/137384" target="_blank">
                <Image src="/images/bo-cong-thuong.webp" w="120px" h="auto" alt="Bộ Công Thương" />
              </Link>

              <Link
                href="//www.dmca.com/Protection/Status.aspx?ID=3901c960-5f50-4f68-9991-0f3b096e7d45"
                target="_blank"
              >
                <Image
                  src="https://images.dmca.com/Badges/dmca_protected_sml_120b.png?ID=3901c960-5f50-4f68-9991-0f3b096e7d45"
                  alt="DMCA.com Protection Status"
                  w="120px"
                  h="auto"
                />
              </Link>
            </Flex>

            <Script
              src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"
              strategy="lazyOnload"
              id="dmca-badge-helper"
            />
          </Flex>
        </Flex>

        <Flex flex={{ xs: 'none', lg: 1 / 3 }} w={{ xs: 'full', lg: 'auto' }} justify="space-between">
          <Flex direction="column" flex={1} align={{ xs: 'flex-start', lg: 'center' }}>
            <Flex direction="column" gap="6px" px={{ xs: '12px', lg: 'center' }}>
              {MENU_LINKS_1.map((item) => {
                const { title, title_en, href, children } = item;
                return (
                  <Fragment key={title}>
                    <Link href={href}>
                      <Text fontWeight={500} fontSize={18} py="6px" h="32px">
                        {getLocalizedText(title, title_en)}
                      </Text>
                    </Link>

                    {!!children && (
                      <Flex display={{ xs: 'none', lg: 'flex' }} direction="column">
                        {children.map((child) => {
                          return (
                            <Link href={child.href} key={child.title}>
                              <Text py="4px">{getLocalizedText(child.title, child.title_en)}</Text>
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
            <Link href="https://zalo.me/4415290839928975010" target="_blank">
              <Image src="/images/zalo-black.webp" w="24px" h="24px" alt={IMG_ALT} />
            </Link>
            <Link href="https://www.youtube.com/@Dieptra_Official" target="_blank">
              <Image src="/images/Youtube.webp" w="24px" h="24px" alt={IMG_ALT} />
            </Link>
          </Flex>

          <Flex direction="column" gap="24px" w="full">
            <Flex direction="column" gap="8px">
              <Text fontSize={16} fontWeight={500}>
                Diệp Trà - Hà Nội
              </Text>
              <Box h="165px" overflow="hidden" w="full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2849207322743!2d105.76739007934567!3d20.981213000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453c729c85a77%3A0xa04589e6754e1c77!2zRGnhu4dwIFRyw6Ag4oCTIENodXnDqm4gQ3VuZyBD4bqlcCBOZ3V5w6puIExp4buHdSBQaGEgQ2jhur8!5e0!3m2!1sen!2s!4v1756185273251!5m2!1sen!2s"
                  width="80%"
                  height="100%"
                  style={{ borderRadius: 25 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Flex>

            <Flex direction="column" gap="8px">
              <Text fontSize={16} fontWeight={500}>
                Diệp Trà - Sài Gòn
              </Text>
              <Box h="165px" overflow="hidden" w="full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62705.602970401866!2d106.53985024863282!3d10.803638400000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b0003493a3d%3A0x47bdaef97eedf553!2zTmjDoCBDdW5nIEPhuqVwIE5ndXnDqm4gTGnhu4d1IFBoYSBDaOG6vyAtIERp4buHcCBUcsOgIFPDoGkgR8Oybg!5e0!3m2!1svi!2s!4v1760524572440!5m2!1svi!2s"
                  width="80%"
                  height="100%"
                  style={{ borderRadius: 25 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Text my="24px">{t('footer.copyright')}</Text>
    </Flex>
  );
};

export default Footer;
