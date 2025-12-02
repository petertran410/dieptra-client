'use client';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { AspectRatio, Box, Flex, Image, Text } from '@chakra-ui/react';
import Banner from '../_components/banner';
import { useTranslation } from '../../../hooks/useTranslation';

const VanHoaTuyenDung = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Banner />
      <Flex
        px={PX_ALL}
        mt={{ xs: '24px', lg: '48px' }}
        gap={{ xs: '50px', lg: '24px' }}
        pb="50px"
        direction={{ xs: 'column', lg: 'row' }}
      >
        <Flex w="full" direction="column">
          <Breadcrumb
            data={[
              { title: t('recruit.recruit'), href: '/tuyen-dung' },
              { title: t('recruit.culture'), href: '/tuyen-dung/van-hoa-diep-tra', isActive: true }
            ]}
          />

          <Text as="h1" fontSize={24} fontWeight={600} mt="20px" lineHeight="30px">
            {t('recruit.culture.slogan')}
          </Text>

          <AspectRatio ratio={16 / 9} w="full" mt="20px">
            <Image src="/images/culture-banner.webp" w="full" h="full" alt={IMG_ALT} />
          </AspectRatio>

          {/* --- SECTION 1 --- */}
          <Box mt={{ xs: '24px', lg: '48px' }}>
            <Text as="h1" fontSize={24} fontWeight={600} lineHeight="30px">
              {t('recruit.culture.1')}
            </Text>
            <Text mt="20px" fontWeight={500} fontSize={18} lineHeight="19px">
              {t('recruit.culture.2')}
            </Text>
          </Box>

          {/* --- SECTION 2 --- */}
          <Box mt={{ xs: '24px', lg: '48px' }}>
            <Text as="h1" fontSize={24} fontWeight={600} lineHeight="30px">
              {t('recruit.culture.3')}
            </Text>

            {/* 2.1 */}
            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              {t('recruit.culture.4')}
            </Text>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.5')} {t('recruit.culture.6')}
            </Text>

            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={18} lineHeight="19px">
                {t('recruit.culture.7')}
                <br />
                {t('recruit.culture.8')}
                <br />
                {t('recruit.culture.9')}
              </Text>
            </Flex>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.10')} {t('recruit.culture.11')}
            </Text>

            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={18} lineHeight="19px">
                {t('recruit.culture.12')}
                <br />
                {t('recruit.culture.13')}
                <br />
                {t('recruit.culture.14')}
              </Text>
            </Flex>

            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              {t('recruit.culture.15')}
            </Text>

            <AspectRatio ratio={16 / 9} w="full" mt="20px">
              <Image src="/images/culture-2-2.webp" w="full" h="full" alt={IMG_ALT} />
            </AspectRatio>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.16')} {t('recruit.culture.17')}
            </Text>

            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={18} lineHeight="19px">
                {t('recruit.culture.18')}
                <br />
                {t('recruit.culture.19')}
              </Text>
            </Flex>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.20')} {t('recruit.culture.21')}
            </Text>

            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              {t('recruit.culture.22')}
            </Text>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.23')} {t('recruit.culture.24')}
            </Text>

            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={18} lineHeight="19px">
                {t('recruit.culture.25')}
                <br />
                {t('recruit.culture.26')}
              </Text>
            </Flex>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.27')} {t('recruit.culture.28')}
            </Text>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.29')}
            </Text>

            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={18} lineHeight="19px">
                {t('recruit.culture.30')}
                <br />
                {t('recruit.culture.31')}
              </Text>
            </Flex>

            {/* 2.4 */}
            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              {t('recruit.culture.32')}
            </Text>

            <AspectRatio ratio={16 / 9} w="full" mt="20px">
              <Image src="/images/culture-2-4.webp" w="full" h="full" alt={IMG_ALT} />
            </AspectRatio>

            <Text fontWeight={400} fontSize={18} mt="12px">
              {t('recruit.culture.33')}
            </Text>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.34')} {t('recruit.culture.35')}
            </Text>

            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={18} lineHeight="19px">
                {t('recruit.culture.36')}
                <br />
                {t('recruit.culture.37')}
              </Text>
            </Flex>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.38')}
            </Text>

            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={18} lineHeight="19px">
                {t('recruit.culture.39')}
                <br />
                {t('recruit.culture.40')}
              </Text>
            </Flex>

            {/* 2.5 */}
            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              {t('recruit.culture.41')}
            </Text>

            <Text fontWeight={400} fontSize={18} mt="12px">
              {t('recruit.culture.42')}
            </Text>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.43')} {t('recruit.culture.44')}
            </Text>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.45')} {t('recruit.culture.46')}
            </Text>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.47')} {t('recruit.culture.48')}
            </Text>

            {/* 2.6 */}
            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              {t('recruit.culture.49')}
            </Text>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.50')}
              <br />
              <br />
              {t('recruit.culture.51')}
              <br />
              <br />
              {t('recruit.culture.52')}
            </Text>

            <AspectRatio ratio={16 / 9} w="full" mt="20px">
              <Image src="/images/image-recruitment-1.webp" w="full" h="full" alt={IMG_ALT} />
            </AspectRatio>

            {/* 2.7 */}
            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              {t('recruit.culture.53')}
            </Text>

            <Text fontWeight={400} fontSize={18} lineHeight="19px" mt="12px">
              {t('recruit.culture.54')}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default VanHoaTuyenDung;
