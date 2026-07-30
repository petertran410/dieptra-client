'use client';

import { Box, Flex, Grid, GridItem, Text, Link as ChakraLink } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { PX_ALL } from '../../../utils/const';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const Ecosystem = () => {
  const categories = [
    {
      area: 'jam',
      title: 'Mứt Trái Cây Pha Chế',
      desc: 'Mứt trái cây đa dạng hương vị, ứng dụng cho trà trái cây, trà sữa.',
      image: '/images/about-v2/mut-trai-cay-pha-che-diep-tra.webp',
      url: '/san-pham/nguyen-lieu-pha-che/mut-trai-cay'
    },
    {
      area: 'pearl',
      title: 'Trân Châu Nấu 1 Phút',
      desc: 'Nhóm trân châu tiện lợi, hỗ trợ rút ngắn thời gian chuẩn bị tại quầy.',
      image: '/images/about-v2/topping-nau-nhanh-1-phut.webp',
      url: '/san-pham/nguyen-lieu-pha-che/topping-tra-sua/tran-chau-dong-lanh'
    },
    {
      area: 'tea',
      title: 'Thế Giới Trà Hương Hoa',
      desc: 'Các dòng trà hương hoa giúp tạo tầng hương đặc trưng cho menu đồ uống.',
      image: '/images/about-v2/the-gioi-tra-huong-hoa.webp',
      url: '/san-pham/nguyen-lieu-pha-che/tra-pha-che/tra-huong-hoa'
    },
    {
      area: 'powder',
      title: 'Bột Vị Sáng Tạo',
      desc: 'Nhóm bột vị hỗ trợ mở rộng menu, tạo màu sắc và hương vị mới cho quầy pha chế.',
      image: '/images/about-v2/the-gioi-bot-pha-che.webp',
      url: '/san-pham/nguyen-lieu-pha-che/bot-pha-che'
    }
  ];

  return (
    <Box
      as="section"
      id="products"
      py={{ base: '32px', lg: '70px' }}
      px={PX_ALL}
      bgGradient="linear(to-b, #ffffff 0%, #f1fbff 100%)"
      overflow="hidden"
    >
      <Box maxW="1180px" w="full" mx="auto">
        {/* Section Heading */}
        <Flex direction="column" align="center" textAlign="center" mb="36px" maxW="760px" mx="auto">
          <Text
            as="p"
            color="#0b7eae"
            fontSize="14px"
            fontWeight={800}
            letterSpacing="0.08em"
            textTransform="uppercase"
            mb="12px"
          >
            Danh mục chủ lực
          </Text>
          <Text
            as="h2"
            color="#005a9f"
            fontSize={{ base: '22px', md: '32px', lg: '38px' }}
            fontWeight={900}
            mb="14px"
          >
            Hệ sinh thái nguyên liệu Diệp Trà
          </Text>
          <Text color="#4d6878" fontSize="16px" lineHeight={1.7} display={{ base: 'none', md: 'block' }}>
            Từ mứt trái cây, trân châu, trà hương hoa đến bột vị sáng tạo, Diệp Trà kết nối các nhóm
            <br />
            nguyên liệu thành giải pháp đồng bộ cho menu đồ uống.
          </Text>
        </Flex>

        {/* Bento Grid (Desktop & Tablet) */}
        <Grid
          display={{ base: 'none', md: 'grid' }}
          templateAreas={{
            md: `
              "hub hub"
              "jam pearl"
              "tea powder"
            `,
            lg: `
              "hub jam pearl"
              "hub tea powder"
            `
          }}
          gridTemplateColumns={{
            md: 'repeat(2, 1fr)',
            lg: '1.8fr 1fr 1fr'
          }}
          gap={{ base: '14px', lg: '18px' }}
          alignItems="stretch"
        >
          {/* Central Poster Card (Hub) - Double-Bezel */}
          <GridItem gridArea="hub">
            <Box
              p="8px"
              bg="rgba(0, 90, 159, 0.02)"
              borderRadius="32px"
              border="1px solid"
              borderColor="rgba(0, 90, 159, 0.06)"
              boxShadow="0 18px 45px rgba(22, 45, 60, 0.08)"
              h="full"
              transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
              _hover={{
                transform: 'translateY(-4px)',
                '& img': { transform: 'scale(1.035)' }
              }}
            >
              <ChakraLink
                as={Link}
                href="/san-pham/nguyen-lieu-pha-che"
                role="group"
                aria-label="Xem toàn bộ hệ sinh thái nguyên liệu pha chế Diệp Trà"
                display="block"
                w="full"
                h="full"
                minH={{ base: '250px', md: '280px', lg: '100%' }}
                borderRadius="24px"
                boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
                overflow="hidden"
              >
                  <Image
                    src="/images/about-v2/he-sinh-thai-nguyen-lieu-pha-che.webp"
                    alt="Hệ Sinh Thái Nguyên Liệu Pha Chế"
                    width={900}
                    height={1292}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.8s cubic-bezier(0.32, 0.72, 0, 1)'
                    }}
                  />
              </ChakraLink>
            </Box>
          </GridItem>

          {/* Categories - Double-Bezel */}
          {categories.map((cat, idx) => (
            <GridItem key={idx} gridArea={cat.area}>
              <Box
                p="8px"
                bg="rgba(0, 90, 159, 0.02)"
                borderRadius="32px"
                border="1px solid"
                borderColor="rgba(0, 90, 159, 0.06)"
                boxShadow="0 18px 45px rgba(22, 45, 60, 0.08)"
                h="full"
                transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
                _hover={{
                  transform: 'translateY(-4px)',
                  '& img': { transform: 'scale(1.045)' }
                }}
              >
                <ChakraLink
                  as={Link}
                  href={cat.url}
                  role="group"
                  aria-label={`Xem danh mục ${cat.title}`}
                  display="flex"
                  flexDirection="column"
                  p="12px"
                  borderRadius="24px"
                  bgGradient="linear(to-b, #ffffff 0%, rgba(241, 251, 255, 0.72) 100%)"
                  boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
                  h="full"
                  textDecoration="none !important"
                >
                    <Box
                      borderRadius="16px"
                      overflow="hidden"
                      bgGradient="linear(135deg, #f1fbff, #ffffff)"
                      border="1px solid rgba(255, 255, 255, 0.96)"
                      mb="10px"
                      aspectRatio="1/1"
                      position="relative"
                    >
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        width={400}
                        height={400}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.8s cubic-bezier(0.32, 0.72, 0, 1)'
                        }}
                      />
                    </Box>
                    <Text
                      as="h3"
                      color="#005a9f"
                      fontSize={{ base: '16px', lg: '17px' }}
                      fontWeight={800}
                      lineHeight={1.22}
                      mt="4px"
                      mb="6px"
                    >
                      {cat.title}
                    </Text>
                    <Text color="#4d6878" fontSize="13px" lineHeight={1.5}>
                      {cat.desc}
                    </Text>
                </ChakraLink>
              </Box>
            </GridItem>
          ))}
        </Grid>

        {/* Mobile Layout */}
        <Box display={{ base: 'block', md: 'none' }}>
          {/* Central Poster Card (Hub) - Mobile version */}
          <Box
            p="8px"
            bg="rgba(0, 90, 159, 0.02)"
            borderRadius="32px"
            border="1px solid"
            borderColor="rgba(0, 90, 159, 0.06)"
            boxShadow="0 18px 45px rgba(22, 45, 60, 0.08)"
            mb="24px"
          >
            <ChakraLink
              as={Link}
              href="/san-pham/nguyen-lieu-pha-che"
              role="group"
              aria-label="Xem toàn bộ hệ sinh thái nguyên liệu pha chế Diệp Trà"
              display="block"
              w="full"
              borderRadius="24px"
              boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
              overflow="hidden"
            >
                <Image
                  src="/images/about-v2/he-sinh-thai-nguyen-lieu-pha-che.webp"
                  alt="Hệ Sinh Thái Nguyên Liệu Pha Chế"
                  width={900}
                  height={1292}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
            </ChakraLink>
          </Box>

          {/* Categories Carousel Slider */}
          <Box pos="relative" mb="56px">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-btn-prev-ecosystem',
                nextEl: '.swiper-btn-next-ecosystem'
              }}
              style={{ overflow: 'visible' }}
            >
              {categories.map((cat, idx) => (
                <SwiperSlide key={idx} style={{ overflow: 'visible', paddingBottom: '8px' }}>
                  <Box px="4px">
                    <Box
                      p="8px"
                      bg="rgba(0, 90, 159, 0.02)"
                      borderRadius="32px"
                      border="1px solid"
                      borderColor="rgba(0, 90, 159, 0.06)"
                      boxShadow="0 18px 45px rgba(22, 45, 60, 0.08)"
                      h="full"
                    >
                        <ChakraLink
                          as={Link}
                          href={cat.url}
                          role="group"
                          aria-label={`Xem danh mục ${cat.title}`}
                          display="flex"
                          flexDirection="column"
                          p="12px"
                          borderRadius="24px"
                          bgGradient="linear(to-b, #ffffff 0%, rgba(241, 251, 255, 0.72) 100%)"
                          boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
                          h="full"
                          textDecoration="none !important"
                        >
                          <Box
                            borderRadius="16px"
                            overflow="hidden"
                            bgGradient="linear(135deg, #f1fbff, #ffffff)"
                            border="1px solid rgba(255, 255, 255, 0.96)"
                            mb="10px"
                            aspectRatio="1/1"
                            position="relative"
                          >
                            <Image
                              src={cat.image}
                              alt={cat.title}
                              width={400}
                              height={400}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block'
                              }}
                            />
                          </Box>
                          <Text
                            as="h3"
                            color="#005a9f"
                            fontSize="16px"
                            fontWeight={800}
                            lineHeight={1.22}
                            mt="4px"
                            mb="6px"
                          >
                            {cat.title}
                          </Text>
                          <Text color="#4d6878" fontSize="13px" lineHeight={1.5}>
                            {cat.desc}
                          </Text>
                        </ChakraLink>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons for Mobile Categories Swiper */}
            <Flex
              position="absolute"
              bottom="-48px"
              left="50%"
              transform="translateX(-50%)"
              gap="12px"
              zIndex={10}
            >
              <Flex
                className="swiper-btn-prev-ecosystem"
                w="38px"
                h="38px"
                bg="#FFF"
                borderRadius="50%"
                border="1px solid"
                borderColor="rgba(215, 226, 232, 0.6)"
                color="#0b7eae"
                boxShadow="0 4px 14px rgba(11, 126, 174, 0.1)"
                cursor="pointer"
                align="center"
                justify="center"
                userSelect="none"
                transition="all .2s"
                _hover={{ bg: '#0b7eae', color: '#FFF', borderColor: '#0b7eae' }}
                _active={{ transform: 'scale(0.95)' }}
                sx={{
                  '&.swiper-button-disabled': {
                    opacity: 0.35,
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                    boxShadow: 'none'
                  }
                }}
              >
                <Text fontSize="18px" fontWeight="bold" transform="translateX(-1px)">‹</Text>
              </Flex>

              <Flex
                className="swiper-btn-next-ecosystem"
                w="38px"
                h="38px"
                bg="#FFF"
                borderRadius="50%"
                border="1px solid"
                borderColor="rgba(215, 226, 232, 0.6)"
                color="#0b7eae"
                boxShadow="0 4px 14px rgba(11, 126, 174, 0.1)"
                cursor="pointer"
                align="center"
                justify="center"
                userSelect="none"
                transition="all .2s"
                _hover={{ bg: '#0b7eae', color: '#FFF', borderColor: '#0b7eae' }}
                _active={{ transform: 'scale(0.95)' }}
                sx={{
                  '&.swiper-button-disabled': {
                    opacity: 0.35,
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                    boxShadow: 'none'
                  }
                }}
              >
                <Text fontSize="18px" fontWeight="bold" transform="translateX(1px)">›</Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Ecosystem;
