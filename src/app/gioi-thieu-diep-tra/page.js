import { IMG_ALT, PX_ALL } from '../../utils/const';
import { getMetadata } from '../../utils/helper-server';
import { Box, Flex, Image } from '@chakra-ui/react';
import HomeContact from '../(home)/_components/contact';
import AboutUs from './_components/about-us';
import Culture from './_components/culture';
import Process from './_components/process';
import Statistic from './_components/statistic';
import Strength from './_components/strength';

export const metadata = getMetadata({
  title: 'Giới thiệu | Diệp Trà',
  description:
    'Diệp Trà là thương hiệu nhập khẩu & phân phối nguyên liệu pha chế cao cấp, hướng đến xây dựng hệ sinh thái đồ uống chất lượng và bền vững tại Việt Nam.'
});

const IntroPage = () => {
  return (
    <Flex direction="column" bgColor="#FFF">
      <Box px={PX_ALL} bgColor="#eefbfd" pt={{ xs: '70px', lg: '162px' }}>
        <Image src="/images/gioi-thieu-diep-tra.webp" w="full" h="full" fit="fit" alt={IMG_ALT} borderRadius={16} />
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
