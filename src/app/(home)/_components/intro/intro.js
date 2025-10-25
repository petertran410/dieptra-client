import { IMG_ALT } from '../../../../utils/const';
import { Flex, Image } from '@chakra-ui/react';

const HomeIntro = () => {
  return (
    <Flex bgGradient="linear(to-b, #a3dcf3 0%, #FFF 50%, #FFF 100%)">
      <Image
        src="/images/127248.webp"
        alt={IMG_ALT}
        w="full"
        h="auto"
        pt={{ xs: '70px', md: '45px', lg: '0' }}
        objectFit="contain"
        objectPosition="bottom"
      />
    </Flex>
  );
};

export default HomeIntro;
