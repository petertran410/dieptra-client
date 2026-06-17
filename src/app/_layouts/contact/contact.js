'use client';

import { IMG_ALT } from '../../../utils/const';
import { Box, Button, Flex, Image, Link } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Contact = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box pos="fixed" bottom={{ xs: '90px', md: '100px' }} right={{ xs: '14px', md: '20px' }} zIndex={1000}>
      <Flex
        direction="column"
        border="1px solid #E4E4E7"
        borderRadius="full"
        h={{ xs: '132px', md: '180px' }}
        w={{ xs: '48px', md: '64px' }}
        align="center"
        justify="center"
        gap={{ xs: '11px', md: '15px' }}
        bgColor="#FFF"
        pos="relative"
        opacity={{ xs: 0.6, md: 1 }}
      >
        {!!showScrollTop && (
          <Button
            title="Lên đầu trang"
            pos="absolute"
            top={{ xs: '-50px', md: '-66px' }}
            left={{ xs: '3px', md: '4px' }}
            borderRadius="full"
            bgColor="#FFF"
            border="1px solid #E4E4E7"
            alignItems="center"
            justifyContent="center"
            minW="unset"
            w={{ xs: '42px', md: '56px' }}
            h={{ xs: '42px', md: '56px' }}
            opacity={{ xs: 0.6, md: 1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            _hover={{
              bgColor: '#FFF',
              opacity: 0.8
            }}
            _active={{
              bgColor: '#FFF',
              opacity: 0.8
            }}
          >
            <Image src="/images/arrow-up-black.webp" alt={IMG_ALT} w={{ xs: '18px', md: '24px' }} h={{ xs: '18px', md: '24px' }} />
          </Button>
        )}

        <Link href="https://zalo.me/4415290839928975010" target="_blank" _hover={{ textDecor: 'none' }}>
          <Image
            src="/images/zalo-contact.webp"
            alt={IMG_ALT}
            w={{ xs: '30px', md: '40px' }}
            h={{ xs: '30px', md: '40px' }}
            transitionDuration="250ms"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Link>
        <Link href="https://www.facebook.com/dieptra.0788339379" target="_blank" _hover={{ textDecor: 'none' }}>
          <Image
            src="/images/facebook-contact.webp"
            alt={IMG_ALT}
            w={{ xs: '30px', md: '40px' }}
            h={{ xs: '30px', md: '40px' }}
            transitionDuration="250ms"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Link>
        <Link href="tel:+84973123230" _hover={{ textDecor: 'none' }}>
          <Image
            src="/images/phone-contact.webp"
            alt={IMG_ALT}
            w={{ xs: '30px', md: '40px' }}
            h={{ xs: '30px', md: '40px' }}
            transitionDuration="250ms"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Link>
      </Flex>
    </Box>
  );
};

export default Contact;
