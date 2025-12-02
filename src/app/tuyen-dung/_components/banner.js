'use client';

import { IMG_ALT } from '../../../utils/const';
import { Box, Button, Image, Text } from '@chakra-ui/react';
import { Be_Vietnam_Pro } from 'next/font/google';
import { useTranslation } from '../../../hooks/useTranslation';

const fontFamily = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const Banner = () => {
  const { t } = useTranslation();

  return (
    <Box pos="relative">
      <Image
        pt={{ xs: '40px', lg: '100px' }}
        fit="cover"
        w="full"
        h={{ xs: '300px', md: '400px', lg: '800px' }}
        src="/images/banner-recruitment.webp"
        alt={IMG_ALT}
      />

      <Text
        className={fontFamily.className}
        fontSize={{ xs: 24, lg: 86 }}
        textAlign="center"
        fontWeight={{ xs: 500, lg: 800 }}
        color="#EEFBFD"
        pos="absolute"
        top={{ xs: '120px', lg: '300px' }}
        lineHeight={{ xs: '29px', lg: '103px' }}
        left={0}
        right={0}
        mx="auto"
      >
        {t('recruit.decan.title.1')}
        <br />
        {t('recruit.decan.title.2')}
      </Text>

      <Button
        pos="absolute"
        bottom={{ xs: '24px', lg: '170px' }}
        left={0}
        right={0}
        mx="auto"
        color="#EEFBFD"
        border="1.5px solid #EEFBFD"
        textTransform="uppercase"
        borderRadius={8}
        w={{ xs: '158px', lg: '174px' }}
        h={{ xs: '40px', lg: '56px' }}
        fontSize={{ xs: 16, lg: 18 }}
        fontWeight={500}
        bgColor="transparent"
        _hover={{
          bgColor: '#0F2C3D',
          borderColor: '#0F2C3D'
        }}
        _active={{
          bgColor: '#0F2C3D',
          borderColor: '#0F2C3D'
        }}
        onClick={() => {
          const element = document.getElementById('recruitment-list');
          if (element) {
            const offsetTop = element.offsetTop - 70;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }}
      >
        {t('recruit.button')}
      </Button>
    </Box>
  );
};

export default Banner;
