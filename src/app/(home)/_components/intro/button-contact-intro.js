'use client';

import { Button } from '@chakra-ui/react';
import Link from 'next/link';

const ButtonContactIntro = () => {
  // const scrollToDiv = () => {
  //   const element = document.getElementById('contact-form');
  //   if (element) {
  //     const offsetTop = element.offsetTop - 70;
  //     window.scrollTo({
  //       top: offsetTop,
  //       behavior: 'smooth'
  //     });
  //   }
  // };

  return (
    <Link href={'/lien-he'} target="_blank">
      <Button
        align="center"
        justify="center"
        bgColor="#065FD4"
        color="#FFF"
        w={{ xs: '170px', lg: '242px' }}
        h={{ xs: '36px', lg: '56px' }}
        gap="4px"
        fontSize={{ xs: 16, lg: 18 }}
        borderRadius={8}
        fontWeight={500}
        transitionDuration="250ms"
        _hover={{ bgColor: '#5d97e3' }}
        _active={{ bgColor: '#5d97e3' }}
      >
        Liên hệ tư vấn
      </Button>
    </Link>
  );
};

export default ButtonContactIntro;
