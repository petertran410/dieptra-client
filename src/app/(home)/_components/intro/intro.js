import { IMG_ALT } from '../../../../utils/const';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';

const HomeIntro = () => {
  return (
    <Box
      bgGradient="linear(to-b, #a3dcf3 0%, #FFF 50%, #FFF 100%)"
      pt={{ xs: '70px', md: '45px', lg: '0' }}
      position="relative"
      width="100%"
    >
      <Image
        src="/images/hinh-trang-chu.webp"
        alt={IMG_ALT}
        width={1920}
        height={1080}
        priority
        sizes="100vw"
        style={{ width: '100%', height: 'auto', objectFit: 'contain', objectPosition: 'bottom' }}
      />
    </Box>
  );
};

export default HomeIntro;
