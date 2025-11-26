'use client';

import Carousel from '../../../components/carousel';
import CarouselMobile from '../../../components/carousel/carousel-mobile';
import SectionBlockH3 from '../../../components/section-block/section-block-h3';
import { useTranslation } from '../../../hooks/useTranslation';
import { IMG_ALT } from '../../../utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const Feedback = () => {
  const { t } = useTranslation();

  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  const FEEDBACK_LIST = [
    {
      customer: t('home.feedback.customer1'),
      position: t('home.feedback.position1'),
      content: t('home.feedback.content1'),
      image: '/images/feedback-1.webp'
    },
    {
      customer: t('home.feedback.customer3'),
      position: t('home.feedback.position3'),
      content: t('home.feedback.content3'),
      image: '/images/feedback-2.webp'
    },
    {
      customer: t('home.feedback.customer2'),
      position: t('home.feedback.position2'),
      content: t('home.feedback.content2'),
      image: '/images/feedback-3.webp'
    },
    {
      customer: t('home.feedback.customer4'),
      position: t('home.feedback.position4'),
      content: t('home.feedback.content4'),
      image: '/images/feedback-4.webp'
    }
  ];

  return (
    <Flex
      px={{ xs: '0px', md: '30px', lg: '160px', xl: '200px', '2xl': '250px' }}
      direction="column"
      align="center"
      w="full"
      py={{ xs: '36px', lg: '75px' }}
    >
      <SectionBlockH3 title={t('home.feedback.title')} />

      <Box
        w={{
          xs: 'full',
          md: 'calc(100vw - 80px)',
          lg: 'calc(100vw - 320px)',
          xl: 'calc(100vw - 400px)',
          '2xl': 'calc(100vw - 500px)'
        }}
        mt="64px"
      >
        <Box w={{ xs: 'full', lg: '105%', xl: '105%', '2xl': '105%' }} ml={{ xs: 0, lg: '-2.5%' }}>
          <Box display={{ xs: 'none', lg: 'block' }}>
            <Carousel breakpoints={breakpoints} spaceBetween={24}>
              {FEEDBACK_LIST.map((item) => {
                return (
                  <Flex direction="column" key={item.customer} pt="50px">
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      borderRadius={16}
                      px="12px"
                      py="50px"
                      pos="relative"
                      bgColor="#f4f4f5"
                      h="500px"
                    >
                      <Text
                        fontSize={{ lg: '30px', xl: '30px', '2xl': '30px' }}
                        fontWeight={500}
                        textAlign="center"
                        mt={{ lg: '120px', xl: '120px', '2xl': '100px' }}
                      >
                        {item.customer}
                      </Text>
                      <Text color="#71717A" textAlign="center" fontSize={{ lg: '14px', xl: '14px', '2xl': '15px' }}>
                        {item.position}
                      </Text>
                      <Text mt="4px" textAlign="justify" fontSize={{ lg: '20px', xl: '20px', '2xl': '20px' }}>
                        {item.content}
                      </Text>
                      <Image
                        src={item.image}
                        pos="absolute"
                        left={0}
                        right={0}
                        mx="auto"
                        fit="cover"
                        top="5px"
                        w={{ lg: '140px', xl: '150px', '2xl': '150px' }}
                        h={{ lg: '140px', xl: '150px', '2xl': '150px' }}
                        borderRadius="full"
                        alt={IMG_ALT}
                        border="6px solid #FFF"
                      />
                    </Flex>
                  </Flex>
                );
              })}
            </Carousel>
          </Box>

          <Box display={{ xs: 'block', lg: 'none' }} className="home-feedback">
            <CarouselMobile spaceBetween={24} showPagination>
              {FEEDBACK_LIST.map((item) => {
                return (
                  <Flex direction="column" key={item.customer} pt="32px">
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      borderRadius={16}
                      px="12px"
                      py="50px"
                      pos="relative"
                      bgColor="#f4f4f5"
                    >
                      <Text fontSize={24} fontWeight={500} textAlign="center" mt="100px">
                        {item.customer}
                      </Text>
                      <Text color="#71717A" textAlign="center" fontSize={14}>
                        {item.position}
                      </Text>
                      <Text mt="8px" textAlign="justify" fontSize={18}>
                        {item.content}
                      </Text>
                      <Image
                        src={item.image}
                        pos="absolute"
                        left={0}
                        right={0}
                        mx="auto"
                        fit="cover"
                        top="5px"
                        w="140px"
                        h="140px"
                        borderRadius="full"
                        alt={IMG_ALT}
                        border="6px solid #FFF"
                      />
                    </Flex>
                  </Flex>
                );
              })}
            </CarouselMobile>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Feedback;
