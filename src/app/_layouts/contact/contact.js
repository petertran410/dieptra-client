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
    <Box
      pos="fixed"
      top={{ xs: '75%', md: '80%', lg: '80%', xl: '70%', '2xl': '70%' }}
      right={{ xs: '20px', md: '44px' }}
      zIndex={1000}
    >
      <Flex
        direction="column"
        border="1px solid #E4E4E7"
        borderRadius="full"
        h={{ xs: '180px', lg: '180px' }}
        w="64px"
        align="center"
        justify="center"
        gap="15px"
        bgColor="#FFF"
        pos="relative"
        // display={{ xs: 'none', md: 'block' }}
      >
        {!!showScrollTop && (
          <Button
            title="Lên đầu trang"
            pos="absolute"
            top="-66px"
            left="4px"
            borderRadius="full"
            bgColor="#FFF"
            border="1px solid #E4E4E7"
            alignItems="center"
            justifyContent="center"
            w="56px"
            h="56px"
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
            <Image src="/images/arrow-up-black.webp" alt={IMG_ALT} w="24px" h="24px" />
          </Button>
        )}

        <Link href="https://zalo.me/4415290839928975010" target="_blank" _hover={{ textDecor: 'none' }}>
          <Image
            src="/images/zalo-contact.webp"
            alt={IMG_ALT}
            w="40px"
            h="40px"
            transitionDuration="250ms"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Link>
        <Link href="https://www.facebook.com/dieptra.0788339379" target="_blank" _hover={{ textDecor: 'none' }}>
          <Image
            src="/images/facebook-contact.webp"
            alt={IMG_ALT}
            w="40px"
            h="40px"
            transitionDuration="250ms"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Link>
        <Link href="tel:+84799861862" _hover={{ textDecor: 'none' }} display={{ xs: 'block', lg: 'block' }}>
          <Image
            src="/images/phone-contact.webp"
            alt={IMG_ALT}
            w="40px"
            h="40px"
            transitionDuration="250ms"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Link>
      </Flex>
    </Box>
  );
};

export default Contact;
