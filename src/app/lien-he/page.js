'use client';

import { IMG_ALT, PX_ALL } from '../../utils/const';
import { Box, Flex, Grid, GridItem, Image, Link, Text } from '@chakra-ui/react';
import ContactHCM from './_component/contact-hcm';
import ContactHN from './_component/contact-hn';
import { useTranslation } from '../../hooks/useTranslation';

const Contact = () => {
  const { t } = useTranslation();

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
              {t('contact.company.name.bac')}
            </Text>
            <Flex direction="column" gap="4px" w="full">
              <Text fontSize={18} fontWeight={500}>
                {t('contact.head.quarter.bac')}
              </Text>
            </Flex>

            <Flex align="center" w="full" gap="4px">
              <Flex align="left" w="full" gap="4px" flexDirection="column">
                <Flex align="center" w="full" gap="4px">
                  <Text fontSize={18} fontWeight={500}>
                    Website:
                  </Text>
                  <Link
                    href="https://www.dieptra.com/"
                    _hover={{ textDecor: 'none' }}
                    fontSize={18}
                    lineHeight="19px"
                    target="_blank"
                  >
                    https://www.dieptra.com
                  </Link>
                </Flex>
                <Flex align="center" w="full" gap="4px">
                  <Text fontSize={18} fontWeight={500}>
                    Email:
                  </Text>
                  <Link
                    href="mailto:sales@hisweetievietnam.com"
                    _hover={{ textDecor: 'none' }}
                    fontSize={18}
                    lineHeight="19px"
                    target="_blank"
                  >
                    sales@hisweetievietnam.com
                  </Link>
                </Flex>
                <Flex align="center" w="full" gap="4px">
                  <Text fontSize={18} fontWeight={500}>
                    Hotline:
                  </Text>
                  <Link href="tel:0973123230" _hover={{ textDecor: 'none' }} fontSize={18} lineHeight="19px">
                    0973123230
                  </Link>
                </Flex>
                <Flex direction="column" gap="4px" w="full">
                  <Text fontSize={18} fontWeight={500}>
                    Fanpage:
                  </Text>
                  <Link
                    href="https://www.facebook.com/dieptra.0973123230"
                    target="_blank"
                    fontSize={18}
                    lineHeight="19px"
                    textDecor="underline"
                    rel="nofollow"
                  >
                    {t('contact.fanpage.1')}
                  </Link>

                  <Link
                    href="https://www.facebook.com/profile.php?id=61560842225802"
                    target="_blank"
                    fontSize={18}
                    lineHeight="19px"
                    textDecor="underline"
                    rel="nofollow"
                  >
                    {t('contact.fanpage.2')}
                  </Link>
                </Flex>
              </Flex>
            </Flex>
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
            ></iframe>
          </Box>
        </GridItem>

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
              {t('contact.company.name.nam')}
            </Text>
            <Flex direction="column" gap="4px" w="full">
              <Text fontSize={18} fontWeight={500}>
                {t('contact.head.quarter.nam')}
              </Text>
              <Text fontSize={18} fontWeight={500}>
                {t('contact.shop')}
              </Text>
            </Flex>

            <Flex align="center" w="full" gap="4px">
              <Flex align="left" w="full" gap="4px" flexDirection="column">
                <Flex align="center" w="full" gap="4px">
                  <Text fontSize={18} fontWeight={500}>
                    Website:
                  </Text>
                  <Text fontSize={18} lineHeight="19px">
                    https://www.dieptra.com
                  </Text>
                </Flex>
                <Flex align="center" w="full" gap="4px">
                  <Text fontSize={18} fontWeight={500}>
                    Email:
                  </Text>
                  <Link
                    href="mailto:sales@hisweetievietnam.com"
                    _hover={{ textDecor: 'none' }}
                    fontSize={18}
                    lineHeight="19px"
                    target="_blank"
                  >
                    sales@hisweetievietnam.com
                  </Link>
                </Flex>
                <Flex align="center" w="full" gap="4px">
                  <Text fontSize={18} fontWeight={500}>
                    Hotline:
                  </Text>
                  <Link href="tel:0973123230" _hover={{ textDecor: 'none' }} fontSize={18} lineHeight="19px">
                    0973123230
                  </Link>
                </Flex>
                <Flex direction="column" gap="4px" w="full">
                  <Text fontSize={18} fontWeight={500}>
                    Fanpage:
                  </Text>

                  <Link
                    href="https://www.facebook.com/lermao.sanhannhugau"
                    target="_blank"
                    fontSize={18}
                    lineHeight="19px"
                    textDecor="underline"
                    rel="nofollow"
                  >
                    {t('contact.fanpage.3')}
                  </Link>
                </Flex>
              </Flex>
            </Flex>
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
            ></iframe>
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Contact;
