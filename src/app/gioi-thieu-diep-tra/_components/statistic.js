import { Flex, Text } from '@chakra-ui/react';
import { Inter } from 'next/font/google';

const fontInter = Inter({ subsets: ['latin', 'vietnamese'] });

const Statistic = ({ mt = { xs: '20px', lg: '20px' } }) => {
  return (
    <Flex
      h={{ xs: '78px', lg: '250px' }}
      w="full"
      bgImage="url(/images/bg-statistic-intro.webp)"
      bgSize="cover"
      bgRepeat="no-repeat"
      justify="center"
      align="center"
      gap={{ xs: '50px', lg: '128px' }}
      mt={mt}
      mb={{ xs: '0px', lg: 0 }}
    >
      <Flex direction="column" gap={{ xs: '12px', lg: '16px' }} align="center">
        <Text color="#065FD4" fontSize={{ xs: 32, lg: 100 }} fontWeight={900} className={fontInter.className}>
          60+
        </Text>
        <Text
          color="#065FD4"
          mt={{ xs: '-20px', lg: 0 }}
          fontSize={{ xs: 14, lg: 24 }}
          fontWeight={500}
          textTransform="uppercase"
        >
          tỉnh thành
        </Text>
      </Flex>
      <Flex direction="column" gap={{ xs: '12px', lg: '16px' }} align="center">
        <Text color="#065FD4" fontSize={{ xs: 32, lg: 100 }} fontWeight={900} className={fontInter.className}>
          30,000+
        </Text>
        <Text
          color="#065FD4"
          mt={{ xs: '-20px', lg: 0 }}
          fontSize={{ xs: 14, lg: 24 }}
          fontWeight={500}
          textTransform="uppercase"
        >
          đối tác đồng hành
        </Text>
      </Flex>
    </Flex>
  );
};

export default Statistic;
