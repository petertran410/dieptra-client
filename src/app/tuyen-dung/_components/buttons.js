'use client';

import { useTranslation } from '../../../hooks/useTranslation';
import { PX_ALL } from '@/utils/const';
import { Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';

const Buttons = () => {
  const scrollToDiv = () => {
    const element = document.getElementById('recruitment-list');
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const { t } = useTranslation();

  return (
    <Flex px={PX_ALL} mt={{ xs: '40px', lg: '48px' }} gap="24px" justify="center" align="center">
      <Link href="/tuyen-dung/van-hoa-diep-tra">
        <Flex
          align="center"
          justify="center"
          bgColor="transparent"
          border="1px solid"
          borderColor="#065FD4"
          color="#065FD4"
          w={{ xs: '154px', lg: '170px' }}
          h={{ xs: '40px', lg: '56px' }}
          gap="4px"
          fontSize={{ xs: 16, lg: 18 }}
          borderRadius={8}
          fontWeight={500}
          transitionDuration="250ms"
          textTransform="uppercase"
          _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
        >
          {t('recruit.culture')}
        </Flex>
      </Link>
      <Button
        bgColor="transparent"
        border="1px solid"
        borderColor="#065FD4"
        color="#065FD4"
        w={{ xs: '154px', lg: '170px' }}
        h={{ xs: '40px', lg: '56px' }}
        gap="4px"
        fontSize={{ xs: 16, lg: 18 }}
        borderRadius={8}
        fontWeight={500}
        transitionDuration="250ms"
        textTransform="uppercase"
        _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
        onClick={scrollToDiv}
      >
        {t('recruit.position')}
      </Button>
    </Flex>
  );
};

export default Buttons;
