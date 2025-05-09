'use client';

import CarouselMobile from '../../../components/carousel/carousel-mobile';
import SectionBlock from '../../../components/section-block';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { AspectRatio, Box, Flex, Grid, Image, Text } from '@chakra-ui/react';

const Process = () => {
  const PROCESS_TOP = [
    {
      type: 'empty'
    },
    {
      type: 'block',
      title: '2020',
      description: 'Mở Chi nhánh tại Miền Nam'
    },
    {
      type: 'empty'
    },
    {
      type: 'block',
      title: '2023',
      description: `Triển khai Thương hiệu Gấu LerMao
Triển khai các mã hàng lạnh đầu tiên`
    },
    {
      type: 'empty'
    }
  ];

  const PROCESS_BOTTOM = [
    {
      type: 'block',
      title: '2018',
      description: `THÀNH LẬP
Tiêu chí hoạt động: Học hỏi, Áp dụng, Thích Nghi theo thực tiễn thị trường Việt Nam`
    },
    {
      type: 'empty'
    },
    {
      type: 'block',
      title: '2022',
      description: `Triển khai Thương hiệu TRÀ PHƯỢNG HOÀNG`
    },
    {
      type: 'empty'
    },
    {
      type: 'block',
      title: '2024',
      description: `Xây dựng Hệ thống Kho lạnh ở cả 2 miền Nam - Bắc`
    }
  ];

  const PROCESS_ALL = [
    {
      type: 'block',
      title: '2018',
      description: `Thành lập Công ty TNHH Xuất Nhập Khẩu HI SWEETIE VIỆT NAM
Tiêu chí hoạt động: Học hỏi, Áp dụng, Thích Nghi theo thực tiễn thị trường Việt Nam`
    },
    {
      type: 'block',
      title: '2020',
      description: 'Mở Chi nhánh tại Miền Nam'
    },
    {
      type: 'block',
      title: '2022',
      description: `Triển khai Thương hiệu TRÀ PHƯỢNG HOÀNG`
    },
    {
      type: 'block',
      title: '2023',
      description: `Triển khai Thương hiệu Gấu LerMao
Triển khai các mã hàng lạnh đầu tiên`
    },
    {
      type: 'block',
      title: '2024',
      description: `Xây dựng Hệ thống Kho lạnh ở cả 2 miền Nam - Bắc`
    }
  ];

  return (
    <Flex direction="column" align="center" mt={{ xs: '16px', lg: '48px' }} gap="24px" px={PX_ALL}>
      <SectionBlock title="Quá trình phát triển" isNormal isActiveMobile />
      <Grid
        templateColumns={'repeat(5, 1fr)'}
        gap={{ xs: '0px', lg: '24px' }}
        w="full"
        display={{ xs: 'none', md: 'grid' }}
      >
        {PROCESS_TOP.map((item, index) => {
          const { title, description, type } = item;
          if (type === 'empty') {
            return (
              <Box key={index} pos="relative">
                <AspectRatio ratio={1 / 1} w="full" bgColor="#FFF">
                  <Flex />
                </AspectRatio>
                <Box w="full" h="44px" />

                <Box
                  w={index === 0 || index === PROCESS_TOP.length - 1 ? '100%' : '150%'}
                  left={index === 0 || index === PROCESS_TOP.length - 1 ? 0 : '-30px'}
                  h="2px"
                  bgColor="main.1"
                  bottom={0}
                  pos="absolute"
                />
                <Image
                  src="/images/ripple-down.png"
                  w="24px"
                  h="32px"
                  alt={IMG_ALT}
                  pos="absolute"
                  left={0}
                  right={0}
                  mx="auto"
                  bottom="-12px"
                />
              </Box>
            );
          }

          return (
            <Box key={index} pos="relative">
              <AspectRatio
                ratio={{ xs: 5 / 6, lg: 1 / 1 }}
                w="full"
                bgColor="#FFF"
                borderRadius={16}
                bgImage="url(/images/bg-process-intro.png)"
                bgRepeat="no-repeat"
                bgSize="cover"
              >
                <Box p={{ xs: '8px', lg: '12px' }}>
                  <Flex direction="column" gap={{ xs: '0px', lg: '8px' }} justify="flex-start" h="full" w="full">
                    <Text fontSize={18} textAlign="center" fontWeight={600} color="#065FD4">
                      {title}
                    </Text>
                    <Text whiteSpace="pre-line" lineHeight={{ xs: '18px', lg: '21px' }}>
                      {description}
                    </Text>
                  </Flex>
                </Box>
              </AspectRatio>
              <Box w="full" h="44px" />

              <Box
                w={index === 0 || index === PROCESS_TOP.length - 1 ? '100%' : '150%'}
                left={index === 0 || index === PROCESS_TOP.length - 1 ? 0 : '-30px'}
                h="2px"
                bgColor="main.1"
                bottom={0}
                pos="absolute"
              />
              <Image
                src="/images/ripple-up.png"
                w="24px"
                h="32px"
                alt={IMG_ALT}
                pos="absolute"
                left={0}
                right={0}
                mx="auto"
                bottom="-12px"
              />
            </Box>
          );
        })}
      </Grid>

      <Grid
        templateColumns={'repeat(5, 1fr)'}
        gap={{ xs: '0px', lg: '24px' }}
        w="full"
        mt="20px"
        display={{ xs: 'none', md: 'grid' }}
      >
        {PROCESS_BOTTOM.map((item, index) => {
          const { title, description, type } = item;
          if (type === 'empty') {
            return (
              <Box key={index} pos="relative">
                <AspectRatio ratio={1 / 1} w="full" bgColor="#FFF">
                  <Flex />
                </AspectRatio>
              </Box>
            );
          }

          return (
            <Box key={index} pos="relative">
              <AspectRatio
                ratio={{ xs: 5 / 6, lg: 1 / 1 }}
                w="full"
                bgColor="#FFF"
                borderRadius={16}
                bgImage="url(/images/bg-process-intro.png)"
                bgRepeat="no-repeat"
                bgSize="cover"
              >
                <Box>
                  <Flex
                    direction="column"
                    gap={{ xs: '0px', lg: '8px' }}
                    p={{ xs: '8px', lg: '12px' }}
                    justify="flex-start"
                    h="full"
                  >
                    <Text fontSize={18} textAlign="center" fontWeight={600} color="#065FD4">
                      {title}
                    </Text>
                    <Text whiteSpace="pre-line" lineHeight={{ xs: '18px', lg: '21px' }}>
                      {description}
                    </Text>
                  </Flex>
                </Box>
              </AspectRatio>
            </Box>
          );
        })}
      </Grid>

      <Box display={{ xs: 'block', lg: 'none' }} className="intro-process">
        <CarouselMobile spaceBetween={24} showPagination={false}>
          {PROCESS_ALL.map((item) => {
            return (
              <Box
                key={item.title}
                w="full"
                bgColor="#FFF"
                borderRadius={16}
                bgImage="url(/images/bg-process-intro.png)"
                bgRepeat="no-repeat"
                bgPosition="center"
                bgSize="cover"
                h="200px"
              >
                <Flex direction="column" gap="8px" p="12px" justify="flex-start" align="center" h="full">
                  <Text fontSize={18} fontWeight={600} textAlign="center" color="#065FD4">
                    {item.title}
                  </Text>
                  <Text fontSize={16} whiteSpace="pre-line">
                    {item.description}
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </CarouselMobile>
      </Box>

      {/* <Flex display={{ xs: 'flex', md: 'none' }} direction="column" w="full">
        <Box pos="relative" w="full">
          <Box
            w="full"
            bgColor="#FFF"
            borderRadius={16}
            bgImage="url(/images/bg-process-intro.png)"
            bgRepeat="no-repeat"
            bgPosition="center"
            bgSize="cover"
            h="112px"
          >
            <Flex direction="column" gap="8px" p="12px" justify="center" align="center" h="full">
              <Text fontSize={16} whiteSpace="pre-line">
                {PROCESS_ALL[currentIndex].description}
              </Text>
            </Flex>
          </Box>
          <Box w="full" h="32px" />

          <Box w="100%" left={0} h="2px" bgColor="main.1" bottom={0} pos="absolute" />
          <Image
            src="/images/ripple-up.png"
            w="24px"
            h="32px"
            alt={IMG_ALT}
            pos="absolute"
            left={0}
            right={0}
            mx="auto"
            bottom="-12px"
          />
        </Box>
        <Flex align="center" gap="24px" mt="14px">
          <Image
            src="/images/chevron-left-circle.png"
            alt={IMG_ALT}
            w="40px"
            h="40px"
            onClick={() => {
              if (currentIndex === 0) {
                return;
              }
              setCurrentIndex((prev) => prev - 1);
            }}
          />
          <Flex flex={1} justify="center">
            <Text textAlign="center" fontSize={20} fontWeight={600}>
              {PROCESS_ALL[currentIndex].title}
            </Text>
          </Flex>
          <Image
            src="/images/chevron-right-circle.png"
            alt={IMG_ALT}
            w="40px"
            h="40px"
            onClick={() => {
              if (currentIndex === PROCESS_ALL.length - 1) {
                return;
              }
              setCurrentIndex((prev) => prev + 1);
            }}
          />
        </Flex>
      </Flex> */}
    </Flex>
  );
};

export default Process;
