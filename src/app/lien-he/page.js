import { IMG_ALT, PX_ALL } from '../../utils/const';
import { getMetadata } from '../../utils/helper-server';
import { Box, Flex, Grid, GridItem, Image, Link, Text } from '@chakra-ui/react';
import HomeContact from '../(home)/_components/contact';
import ContactHCM from './_component/contact-hcm';
import ContactHN from './_component/contact-hn';

export const metadata = getMetadata({ title: 'Liên hệ | Diệp Trà' });

const Contact = () => {
  return (
    <Flex
      direction="column"
      pt={{ xs: '60px', md: '100px', lg: '128px' }}
      bgGradient="linear(to-b, #a2dbf3 0%, #FFF 60%, #FFF 100%)"
      pos="relative"
    >
      <Image
        src="/images/cloud-contact.webp"
        alt={IMG_ALT}
        w="85%"
        h="auto"
        pos="absolute"
        top="6%"
        left={0}
        right={0}
        mx="auto"
        zIndex={1}
      />

      <ContactHN />
      {/* <ContactHCM /> */}

      <Grid
        templateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        my={{ xs: '24px', lg: '48px' }}
        pos="relative"
        px={PX_ALL}
        gap="24px"
      >
        <GridItem>
          <Flex
            pos="relative"
            zIndex={5}
            w="full"
            direction="column"
            align="center"
            borderRadius={16}
            p={{ xs: '24px', lg: '48px' }}
            gap="16px"
            bgGradient="linear(to-b, #C7EDF8 0%, #FFF 100%)"
            boxShadow="lg"
          >
            <Text fontSize={24} fontWeight={600} textAlign="center">
              Công ty TNHH XNK Hi Sweetie Việt Nam
            </Text>
            <Flex direction="column" gap="4px" w="full">
              <Text fontSize={16} fontWeight={500}>
                Địa chỉ:
              </Text>
              <Text fontSize={16} lineHeight="19px">
                - Trụ sở chính: B-TT10-4 Him Lam Vạn Phúc, Tố Hữu, Hà Đông, Hà Nội.
              </Text>
              <Text fontSize={16} lineHeight="19px">
                - Văn phòng miền Nam: P1.2.24 Diamond Alnata, Block A3, Celadon City, Tân Phú, TP.HCM.
              </Text>
              <Text fontSize={16} lineHeight="19px">
                - Cửa hàng: 42 Đường số 7, P.10, Q. Tân Bình, TP.HCM.
              </Text>
            </Flex>

            <Flex align="center" w="full" gap="4px">
              <Flex align="left" w="full" gap="4px" flexDirection="column">
                <Flex align="center" w="full" gap="4px">
                  <Text fontSize={16} fontWeight={500}>
                    Website:
                  </Text>
                  <Link
                    href="https://dieptra.com"
                    _hover={{ textDecor: 'none' }}
                    fontSize={16}
                    lineHeight="19px"
                    target="_blank"
                  >
                    https://dieptra.com
                  </Link>
                </Flex>
                <Flex align="center" w="full" gap="4px">
                  <Text fontSize={16} fontWeight={500}>
                    Email:
                  </Text>
                  <Link
                    href="mailto:sales@hisweetievietnam.com"
                    _hover={{ textDecor: 'none' }}
                    fontSize={16}
                    lineHeight="19px"
                    target="_blank"
                  >
                    sales@hisweetievietnam.com
                  </Link>
                </Flex>
                <Flex align="center" w="full" gap="4px">
                  <Text fontSize={16} fontWeight={500}>
                    Hotline:
                  </Text>
                  <Link href="tel:0788339379" _hover={{ textDecor: 'none' }} fontSize={16} lineHeight="19px">
                    0788339379
                  </Link>
                </Flex>
                <Flex direction="column" gap="4px" w="full">
                  <Text fontSize={16} fontWeight={500}>
                    Fanpage:
                  </Text>
                  <Link
                    href="https://www.facebook.com/dieptra.0788339379"
                    target="_blank"
                    fontSize={16}
                    lineHeight="19px"
                    textDecor="underline"
                  >
                    Diệp Trà
                  </Link>

                  <Link
                    href="https://www.facebook.com/lermao.sanhannhugau"
                    target="_blank"
                    fontSize={16}
                    lineHeight="19px"
                    textDecor="underline"
                  >
                    Lermao - Sành ăn như gấu
                  </Link>

                  <Link
                    href="https://www.facebook.com/profile.php?id=61560842225802"
                    target="_blank"
                    fontSize={16}
                    lineHeight="19px"
                    textDecor="underline"
                  >
                    Trà Phượng Hoàng - Hương vị hoàn hảo
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem>
          <Box h={{ xs: '165px', lg: 'full' }} borderRadius={16} overflow="hidden" w="full" boxShadow="lg">
            <iframe
              src="https://www.google.com/maps/d/u/1/embed?mid=1cyGxR3l_Ish6RWow47UekKIe000hpdM&ehbc=2E312F"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </GridItem>
      </Grid>
      <HomeContact />
    </Flex>
  );
};

export default Contact;
