'use client';

import SectionBlock from '../../../components/section-block';
import { useTranslation } from '../../../hooks/useTranslation';
import { PX_ALL } from '../../../utils/const';
import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <Flex
      direction="column"
      align="center"
      // gap="16px"
      pt="24px"
      pb={{ xs: '16px', lg: '48px' }}
      px={PX_ALL}
      bgColor={{ xs: '#FFF', lg: '#eefbfd' }}
    >
      <SectionBlock title={t('about_us.title')} isNormal />
      <Text fontSize={18}>
        <Text fontSize={25} as="span" fontWeight={500}>
          {t('about_us.meta')}
        </Text>
        <br />
        <br />
        <Text fontSize={18}>
          {t('about_us.des1')}{' '}
          <Text as="span" fontSize={18} fontWeight={500} color="#1E96BC">
            {t('about_us.des2')}
          </Text>{' '}
          {t('about_us.des3')}{' '}
          <Text as="span" fontSize={18} fontWeight={500} color="#1E96BC">
            {t('about_us.des4')}
          </Text>
        </Text>
        <br />
        <br />
        <Text fontSize={18}>
          {t('about_us.des5')}{' '}
          <Text as="span" fontSize={18} fontWeight={500} color="#1E96BC">
            {t('about_us.des6')}
          </Text>
          <br />
          <br />
          {t('about_us.des7')}
        </Text>
        <br />
        <br />
        {t('about_us.des8')}
      </Text>
      <Flex justify="center" mt="8px">
        <Link href="/san-pham">
          <Flex
            align="center"
            justify="center"
            bgColor="transparent"
            border="1px solid"
            borderColor="#065FD4"
            color="#065FD4"
            w="195px"
            h="40px"
            gap="4px"
            fontSize={18}
            borderRadius={8}
            fontWeight={500}
            transitionDuration="250ms"
            _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
          >
            {t('about_us.product.detail')}
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

export default AboutUs;
