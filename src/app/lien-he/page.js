import { Box, Flex, Grid, GridItem, Image, Link, Text } from '@chakra-ui/react';
import ContactHCM from './_component/contact-hcm';
import ContactHN from './_component/contact-hn';
import { IMG_ALT, PX_ALL } from '../../utils/const';
import { getMetadata } from '../../utils/helper-server';

export const metadata = getMetadata({
  title: 'Liên Hệ Diệp Trà',
  description:
    'Liên hệ Diệp Trà - Công ty TNHH Xuất Nhập Khẩu Hi Sweetie Việt Nam. Văn phòng Hà Nội, văn phòng và cửa hàng TP.HCM. Hotline 0973 123 230.',
  url: `${process.env.NEXT_PUBLIC_DOMAIN}/lien-he`
});

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${baseUrl}/lien-he`,
  name: 'Liên Hệ Diệp Trà',
  inLanguage: 'vi-VN'
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: baseUrl },
    { '@type': 'ListItem', position: 2, name: 'Liên hệ', item: `${baseUrl}/lien-he` }
  ]
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Flex
        as="main"
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
        <ContactHCM />

        <Grid
          templateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
          mb={{ xs: '24px', lg: '48px' }}
          pos="relative"
          px={PX_ALL}
          gap="24px"
        >
          <GridItem>
            <Flex
              pos="relative"
              zIndex={5}
              direction="column"
              align="center"
              borderRadius={16}
              p={{ xs: '24px', lg: '48px' }}
              gap="16px"
              bgGradient="linear(to-b, #C7EDF8 0%, #FFF 100%)"
              boxShadow="lg"
            >
              <Text as="h2" fontSize={24} fontWeight={600} textAlign="center">
                Diệp Trà - Văn phòng miền Bắc
              </Text>
              <Text fontSize={18} fontWeight={500} w="full">
                B-TT10-4 Him Lam Vạn Phúc, Tố Hữu, Hà Đông, Hà Nội
              </Text>

              <Box w="full">
                <Flex gap="4px" align="center">
                  <Text fontWeight={500}>Website:</Text>
                  <Link href="https://www.dieptra.com/" target="_blank">
                    https://www.dieptra.com
                  </Link>
                </Flex>
                <Flex gap="4px" align="center">
                  <Text fontWeight={500}>Email:</Text>
                  <Link href="mailto:sales@hisweetievietnam.com">sales@hisweetievietnam.com</Link>
                </Flex>
                <Flex gap="4px" align="center">
                  <Text fontWeight={500}>Hotline:</Text>
                  <Link href="tel:0973123230">0973123230</Link>
                </Flex>
                <Text fontWeight={500} mt="8px">
                  Fanpage:
                </Text>
                <Link
                  href="https://www.facebook.com/dieptra.0973123230"
                  target="_blank"
                  rel="nofollow"
                  textDecor="underline"
                  display="block"
                >
                  Facebook Diệp Trà
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=61560842225802"
                  target="_blank"
                  rel="nofollow"
                  textDecor="underline"
                  display="block"
                >
                  Facebook Lermao Việt Nam
                </Link>
              </Box>
            </Flex>
          </GridItem>

          <GridItem>
            <Box h={{ xs: '165px', lg: 'full' }} borderRadius={16} overflow="hidden" w="full" boxShadow="lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2849207322743!2d105.76739007934567!3d20.981213000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453c729c85a77%3A0xa04589e6754e1c77!2zRGnhu4dwIFRyw6Ag4oCTIENodXnDqm4gQ3VuZyBD4bqlcCBOZ3V5w6puIExp4buHdSBQaGEgQ2jhur8!5e0!3m2!1sen!2s!4v1756185273251!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ Diệp Trà Hà Nội"
              />
            </Box>
          </GridItem>

          <GridItem>
            <Flex
              pos="relative"
              zIndex={5}
              direction="column"
              align="center"
              borderRadius={16}
              p={{ xs: '24px', lg: '48px' }}
              gap="16px"
              bgGradient="linear(to-b, #C7EDF8 0%, #FFF 100%)"
              boxShadow="lg"
            >
              <Text as="h2" fontSize={24} fontWeight={600} textAlign="center">
                Diệp Trà - Văn phòng miền Nam
              </Text>
              <Box w="full">
                <Text fontSize={18} fontWeight={500}>
                  P1.2.24 Diamond Alnata, Block A3, Celadon City, Tân Phú, TP.HCM
                </Text>
                <Text fontSize={18} fontWeight={500} mt="4px">
                  Cửa hàng: Số 42 Đường số 7, Phường 10, Quận Tân Bình, TP.HCM
                </Text>
              </Box>
              <Box w="full">
                <Flex gap="4px" align="center">
                  <Text fontWeight={500}>Website:</Text>
                  <Text>https://www.dieptra.com</Text>
                </Flex>
                <Flex gap="4px" align="center">
                  <Text fontWeight={500}>Email:</Text>
                  <Link href="mailto:sales@hisweetievietnam.com">sales@hisweetievietnam.com</Link>
                </Flex>
                <Flex gap="4px" align="center">
                  <Text fontWeight={500}>Hotline:</Text>
                  <Link href="tel:0973123230">0973123230</Link>
                </Flex>
                <Text fontWeight={500} mt="8px">
                  Fanpage:
                </Text>
                <Link
                  href="https://www.facebook.com/lermao.sanhannhugau"
                  target="_blank"
                  rel="nofollow"
                  textDecor="underline"
                  display="block"
                >
                  Lermao Sành ăn như gấu
                </Link>
              </Box>
            </Flex>
          </GridItem>

          <GridItem>
            <Box h={{ xs: '165px', lg: 'full' }} borderRadius={16} overflow="hidden" w="full" boxShadow="lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62705.602970401866!2d106.53985024863282!3d10.803638400000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b0003493a3d%3A0x47bdaef97eedf553!2zTmjDoCBDdW5nIEPhuqVwIE5ndXnDqm4gTGnhu4d1IFBoYSBDaOG6vyAtIERp4buHcCBUcsOgIFPDoGkgR8Oybg!5e0!3m2!1svi!2s!4v1760524572440!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ Diệp Trà TP.HCM"
              />
            </Box>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
}
