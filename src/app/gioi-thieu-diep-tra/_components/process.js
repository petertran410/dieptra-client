'use client';

import CarouselMobile from '../../../components/carousel/carousel-mobile';
import SectionBlockH2 from '../../../components/section-block/section-block-h2';
import { useTranslation } from '../../../hooks/useTranslation';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { AspectRatio, Box, Flex, Grid, Image } from '@chakra-ui/react';

const Process = () => {
  const { t } = useTranslation();

  const PROCESS_ALL = [
    {
      type: 'block',
      title: '2018',
      description: `Thành lập Công ty TNHH Xuất Nhập Khẩu HI SWEETIE VIỆT NAM
Tiêu chí hoạt động: Học hỏi, Áp dụng, Thích Nghi theo thực tiễn thị trường Việt Nam`,
      image_url: '/images/2018-DIEP-TRA.webp'
    },
    {
      type: 'block',
      title: '2020',
      description: 'Mở Chi nhánh tại Miền Nam',
      image_url: '/images/2020-chi-nhanh-mien-nam.webp'
    },
    {
      type: 'block',
      title: '2022',
      description: `Triển khai Thương hiệu TRÀ PHƯỢNG HOÀNG`,
      image_url: '/images/2022-tra-phuong-hoang.webp'
    },
    {
      type: 'block',
      title: '2023',
      description: `Triển khai Thương hiệu Gấu LerMao
Triển khai các mã hàng lạnh đầu tiên`,
      image_url: '/images/2023-gau-lermao.webp'
    },
    {
      type: 'block',
      title: '2024',
      description: `Xây dựng Hệ thống Kho lạnh ở cả 2 miền Nam - Bắc`,
      image_url: '/images/2024-kho-lanh-2-mien.webp'
    }
  ];

  const getImageByTitle = (title) => {
    const item = PROCESS_ALL.find((item) => item.title === title);
    return item ? item.image_url : '/images/default-image.webp';
  };

  const PROCESS_TOP = [
    { type: 'empty' },
    { type: 'block', title: '2020' },
    { type: 'empty' },
    { type: 'block', title: '2023' },
    { type: 'empty' }
  ];

  const PROCESS_BOTTOM = [
    { type: 'block', title: '2018' },
    { type: 'empty' },
    { type: 'block', title: '2022' },
    { type: 'empty' },
    { type: 'block', title: '2024' }
  ];

  return (
    <Flex direction="column" align="center" mt={{ xs: '16px', lg: '48px' }} gap="24px" px={PX_ALL}>
      <SectionBlockH2 title={t('process.title')} isNormal isActiveMobile />

      {/* Desktop Layout - Top Row */}
      <Grid
        templateColumns={'repeat(5, 1fr)'}
        gap={{ xs: '0px', lg: '24px' }}
        w="full"
        display={{ xs: 'none', lg: 'grid', md: 'none' }}
      >
        {PROCESS_TOP.map((item, index) => {
          const { title, type } = item;
          if (type === 'empty') {
            return (
              <Box key={index} pos="relative">
                <AspectRatio ratio={1 / 1} w="full" bgColor="transparent">
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
                  src="/images/ripple-down.webp"
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
              <AspectRatio ratio={1 / 1} w="full" borderRadius={16} overflow="hidden">
                <Image src={getImageByTitle(title)} alt={`Diệp Trà ${title}`} w="full" h="full" objectFit="cover" />
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
                src="/images/ripple-down.webp"
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

      {/* Desktop Layout - Bottom Row */}
      <Grid
        templateColumns={'repeat(5, 1fr)'}
        gap={{ xs: '0px', lg: '24px' }}
        w="full"
        mt="20px"
        display={{ xs: 'none', lg: 'grid', md: 'none' }}
      >
        {PROCESS_BOTTOM.map((item, index) => {
          const { title, type } = item;
          if (type === 'empty') {
            return (
              <Box key={index} pos="relative">
                <AspectRatio ratio={1 / 1} w="full" bgColor="transparent">
                  <Flex />
                </AspectRatio>
              </Box>
            );
          }

          return (
            <Box key={index} pos="relative">
              <AspectRatio ratio={1 / 1} w="full" borderRadius={16} overflow="hidden">
                <Image src={getImageByTitle(title)} alt={`Diệp Trà ${title}`} w="full" h="full" objectFit="cover" />
              </AspectRatio>
            </Box>
          );
        })}
      </Grid>

      {/* Mobile Layout - Carousel */}
      <Box display={{ xs: 'block', lg: 'none' }} className="intro-process" w="full">
        <CarouselMobile spaceBetween={24} showPagination={false}>
          {PROCESS_ALL.map((item) => {
            return (
              <Box key={item.title} w="full" borderRadius={16} overflow="hidden" h="200px">
                <Image src={item.image_url} alt={`Diệp Trà ${item.title}`} w="full" h="full" objectFit="fit" />
              </Box>
            );
          })}
        </CarouselMobile>
      </Box>
    </Flex>
  );
};

export default Process;
