import { IMG_ALT, PX_ALL } from '../../../../utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { EB_Garamond } from 'next/font/google';

const HomeIntro = () => {
  return (
    <Flex
      // px={{ xs: '15px', md: '30px', lg: '160px', xl: '200px', '2xl': '250px' }}
      // gap={{ xs: '36px', lg: '80px' }}
      // align="center"
      // pt={{ xs: '200px', md: '450px', lg: '360px', xl: '650px' }}
      // pb={{ xs: '40px', lg: '100px' }}
      // pos="relative"
      // justify="space-between"
      bgGradient="linear(to-b, #a3dcf3 0%, #FFF 50%, #FFF 100%)"
    >
      <Image
        src="/images/dieptra-main.webp"
        alt={IMG_ALT}
        w="full"
        h="auto"
        pt={{ xs: '70px', md: '0' }}
        objectFit="contain"
        objectPosition="bottom"
        // pos="absolute"
        // bottom={0}
        // left={0}
      />
    </Flex>
  );
};

export default HomeIntro;
