import { IMG_ALT, PX_ALL, ABOUT_US } from '../../../utils/const';
import { Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useTranslation } from '../../../hooks/useTranslation';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <Flex
      mt={{ xs: '30px', lg: '50px' }}
      mb={{ xs: '40px', lg: '50px' }}
      px={{ xs: '20px', lg: '400px', md: '200px' }}
      gap="24px"
      direction={{ xs: 'column', lg: 'row' }}
    >
      <Flex flex={1.1} direction="column" gap="16px">
        <Text as="h1" fontSize={26} fontWeight={600} color="#1E96BC">
          {t('home.about.title')}
        </Text>
        <Text fontSize={18} textAlign="justify">
          {t('home.about.desc1')}
        </Text>
        <Text fontSize={18} textAlign="justify">
          {t('home.about.desc2')}
        </Text>

        <Link href="/gioi-thieu-diep-tra" target="_blank">
          <Flex
            align="center"
            justify="center"
            bgColor="#FFF"
            border="1px solid"
            borderColor="#065FD4"
            color="#065FD4"
            w="108px"
            h="40px"
            gap="4px"
            fontSize={18}
            borderRadius={8}
            fontWeight={500}
            transitionDuration="250ms"
            _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
          >
            Xem chi tiết
          </Flex>
        </Link>
      </Flex>
      <Flex flex={0.9}>
        <Image
          src="/images/about-us-2.webp"
          w={{ lg: 'full', xs: 'full', md: 'full' }}
          h="full"
          fit="cover"
          alt={IMG_ALT}
          borderRadius={16}
        />
      </Flex>
    </Flex>
  );
};

export default AboutUs;
