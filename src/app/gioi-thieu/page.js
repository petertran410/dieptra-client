import { IMG_ALT, PX_ALL } from '../../utils/const';
import { getMetadata } from '../../utils/helper-server';
import { Box, Flex, Image } from '@chakra-ui/react';
import HomeContact from '../(home)/_components/contact';
import AboutUs from './_components/about-us';
import Culture from './_components/culture';
import Process from './_components/process';
import Statistic from './_components/statistic';
import Strength from './_components/strength';

export const metadata = getMetadata({ title: 'Giới thiệu | Diệp Trà' });

const IntroPage = () => {
  return (
    <Flex direction="column" bgColor="#FFF">
      <Box px={PX_ALL} bgColor="#eefbfd" pt={{ xs: '70px', lg: '162px' }}>
        <Image src="/images/image-about-home.webp" w="full" h="216px" fit="cover" alt={IMG_ALT} borderRadius={16} />
      </Box>
      <AboutUs />
      <Process />
      <Culture />
      <Strength />
      <Statistic />
      <HomeContact />
    </Flex>
  );
};

export default IntroPage;
