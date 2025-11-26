'use client';

import SectionBlockH2 from '../../../components/section-block/section-block-h2';
import { useTranslation } from '../../../hooks/useTranslation';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';

const Culture = () => {
  const { t } = useTranslation();

  return (
    <Flex
      direction="column"
      align="center"
      gap="16px"
      mt="64px"
      py={{ xs: '16px', lg: '56px' }}
      px={PX_ALL}
      bgImage="url(/images/bg-culture-intro.webp)"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <SectionBlockH2 title={t('culture.big_title')} isNormal />
      <Text textAlign="center" fontSize={18}>
        {t('culture.big.desc')}
      </Text>

      <Grid templateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }} gap="24px">
        <GridItem h={{ xs: '200px', lg: 'auto' }}>
          <Image src="/images/image-culture-intro.webp" w="full" h="full" fit="cover" borderRadius={16} alt={IMG_ALT} />
        </GridItem>
        <GridItem flex={1} direction="column" gap="24px" h="full">
          <Flex direction="column" h="full" gap="24px">
            <Flex
              flex={1}
              direction="column"
              borderRadius={16}
              bgColor="#FFFFFF66"
              gap="8px"
              p="16px"
              backdropFilter="blur(4px)"
            >
              <Image src="/images/intro-eye.webp" w="40px" h="40px" alt={IMG_ALT} />
              <h3 style={{ fontSize: '20px', fontWeight: '500', color: '#1E96BC' }}>{t('culture.title1')}</h3>
              <Text fontSize={18} lineHeight="20px" textAlign="justify">
                - <b style={{ fontSize: '18px' }}>{t('culture.title1.desc1')}</b> {t('culture.title1.desc2')}
                <br />
                <br />- {t('culture.title1.desc3')} <b style={{ fontSize: '18px' }}>{t('culture.title1.desc4')}</b>,{' '}
                {t('culture.title1.desc5')}
              </Text>
            </Flex>

            <Flex
              flex={1}
              direction="column"
              borderRadius={16}
              bgColor="#FFFFFF66"
              gap="8px"
              p="16px"
              backdropFilter="blur(4px)"
            >
              <Image src="/images/intro-star.webp" w="40px" h="40px" alt={IMG_ALT} />
              <h3 style={{ fontSize: '20px', fontWeight: '500', color: '#1E96BC' }}>{t('culture.title2')}</h3>
              <Text fontSize={18} lineHeight="20px" textAlign="justify">
                - <b style={{ fontSize: '18px' }}>{t('culture.title2.desc1')}</b>, {t('culture.title2.desc2')}
                <br />
                <br />- {t('culture.title2.desc3')} <b style={{ fontSize: '18px' }}>{t('culture.title2.desc4')}</b>.{' '}
                {t('culture.title2.desc5')}
              </Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem flex={1} direction="column" borderRadius={16} bgColor="#FFFFFF66" p="16px" backdropFilter="blur(4px)">
          <Flex h="full" direction="column" gap="8px">
            <Image src="/images/intro-key.webp" w="40px" h="40px" alt={IMG_ALT} />
            <h3 style={{ fontSize: '20px', fontWeight: '500', color: '#1E96BC' }}>{t('culture.title3')}</h3>
            <Text fontSize={18} lineHeight="20px" textAlign="justify">
              <Text as="span" fontSize={18} fontWeight={500}>
                {t('culture.title3.desc1')}
              </Text>
              <br />
              {t('culture.title3.desc2')}
              <br />
              <br />
              <Text as="span" fontSize={18} fontWeight={500}>
                {t('culture.title3.desc3')}
              </Text>
              <br />
              {t('culture.title3.desc4')}
              <br />
              <br />
              <Text as="span" fontSize={18} fontWeight={500}>
                {t('culture.title3.desc5')}
              </Text>
              <br />
              {t('culture.title3.desc6')}
              <br />
              <br />
              <Text as="span" fontSize={18} fontWeight={500}>
                {t('culture.title3.desc7')}
              </Text>
              <br />
              {t('culture.title3.desc8')}
              <br />
              <br />
              <Text as="span" fontSize={18} fontWeight={500}>
                {t('culture.title3.desc9')}
              </Text>
              <br />
              {t('culture.title3.desc10')}
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Culture;
