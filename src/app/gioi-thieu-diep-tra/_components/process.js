'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { PX_ALL } from '../../../utils/const';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const Process = () => {
  const TIMELINE_EVENTS = [
    {
      year: '2018',
      title: 'Khởi đầu từ nguyên liệu pha chế',
      description: 'Diệp Trà hình thành với định hướng cung cấp nguyên liệu pha chế ổn định, phù hợp nhu cầu thực tế của quán đồ uống tại Việt Nam.',
      image: '/images/about-v2/diep-tra-thanh-lap-nam-2018-voi-dinh-huong-cung-cap-nguyen-lieu-pha-che.webp'
    },
    {
      year: '2020',
      title: 'Mở rộng danh mục và thị trường',
      description: 'Diệp Trà phát triển thêm các nhóm trà, topping và nguyên liệu ứng dụng nhanh, hỗ trợ quán trà sữa, trà trái cây và cà phê mở rộng menu.',
      image: '/images/about-v2/diep-tra-mo-rong-chi-nhanh-mien-nam-va-danh-muc-nguyen-lieu-pha-che.webp'
    },
    {
      year: '2022',
      title: 'Phát triển thương hiệu Trà Phượng Hoàng',
      description: 'Trà Phượng Hoàng được triển khai nhằm bổ sung các dòng trà pha chế có hương vị đặc trưng, đáp ứng nhu cầu xây dựng menu chuyên nghiệp.',
      image: '/images/about-v2/tra-phuong-hoang-phat-trien-trong-he-sinh-thai-nguyen-lieu-pha-che-diep.webp'
    },
    {
      year: '2023',
      title: 'Đẩy mạnh hệ sinh thái LerMao',
      description: 'Diệp Trà phát triển các dòng sản phẩm LerMao như mứt, siro và topping, giúp quán F&B dễ ứng dụng trong nhiều công thức đồ uống.',
      image: '/images/about-v2/lermao-phat-trien-cac-dong-mut-siro-topping-pha-che-cho-quan-f-b.webp'
    },
    {
      year: '2024',
      title: 'Nâng cấp năng lực kho vận',
      description: 'Hệ thống kho lạnh và năng lực phân phối được mở rộng, giúp Diệp Trà phục vụ ổn định hơn cho đại lý, quán và chuỗi thương hiệu trên toàn quốc.',
      image: '/images/about-v2/he-thong-kho-lanh-diep-tra-phuc-vu-phan-phoi-nguyen-lieu-pha-che-toan-qu.webp'
    },
    {
      year: 'Tầm nhìn',
      title: 'Tầm nhìn phát triển bền vững',
      description: 'Diệp Trà hướng tới trở thành đơn vị nhập khẩu và phân phối nguyên liệu pha chế toàn diện, uy tín, đồng hành dài hạn cùng ngành F&B Việt Nam.',
      image: '/images/about-v2/tam-nhin-diep-tra-phat-trien-ben-vung-trong-nganh-nguyen-lieu-pha-che.webp'
    }
  ];

  return (
    <Box
      as="section"
      py={{ base: '32px', lg: '70px' }}
      px={PX_ALL}
      bg="#FFF"
      overflow="hidden"
    >
      <Box maxW="1300px" w="full" mx="auto">
        {/* Section Heading */}
        <Flex direction="column" align="center" textAlign="center" mb={{ base: '32px', lg: '42px' }} maxW="1040px" mx="auto">
          {/* Eyebrow Tag */}
          <Box
            alignSelf="center"
            px="12px"
            py="4px"
            borderRadius="full"
            border="1px solid"
            borderColor="rgba(11, 126, 174, 0.2)"
            bg="rgba(11, 126, 174, 0.05)"
            color="#0b7eae"
            fontSize="10px"
            fontWeight={800}
            letterSpacing="0.2em"
            textTransform="uppercase"
            mb="16px"
          >
            Quá trình phát triển
          </Box>
          <Text
            as="h2"
            color="#005a9f"
            fontSize={{ base: '22px', md: '32px', lg: '38px' }}
            fontWeight={900}
            mb="14px"
          >
            Hành trình xây dựng từ sản phẩm đến giải pháp
          </Text>
          <Text color="#4d6878" fontSize="16px" lineHeight={1.7} display={{ base: 'none', md: 'block' }}>
            Từng giai đoạn phát triển thể hiện cách Diệp Trà mở rộng năng lực sản phẩm, thương hiệu và hệ thống phục vụ khách hàng F&B.
          </Text>
        </Flex>

        {/* Timeline Grid - Double-Bezel (Desktop & Tablet) */}
        <Grid
          display={{ base: 'none', md: 'grid' }}
          templateColumns={{
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          }}
          gap="18px"
          alignItems="stretch"
        >
          {TIMELINE_EVENTS.map((event, idx) => (
            <Box
              key={idx}
              p="8px"
              bg="rgba(0, 90, 159, 0.02)"
              borderRadius="32px"
              border="1px solid"
              borderColor="rgba(0, 90, 159, 0.06)"
              boxShadow="0 18px 45px rgba(22, 45, 60, 0.08)"
              transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
              _hover={{
                transform: 'translateY(-4px)',
                '& img': { transform: 'scale(1.045)' }
              }}
              display="flex"
              flexDirection="column"
              h="full"
            >
              <Flex
                direction="column"
                p="18px"
                borderRadius="24px"
                bg="#ffffff"
                boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
                h="full"
                flex="1"
              >
                {/* Event Image */}
                <Box
                  borderRadius="18px"
                  overflow="hidden"
                  mb="18px"
                  bg="#eef8ff"
                  border="1px solid"
                  borderColor="rgba(219, 234, 243, 0.9)"
                  aspectRatio="1/1"
                  position="relative"
                >
                  <Image
                    src={event.image}
                    alt={event.title}
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

                {/* Title & Description */}
                <Flex direction="column" flex={1}>
                  <Text
                    as="p"
                    color="#005a9f"
                    fontSize={{ base: '18px', md: '15px', lg: '14px', xl: '16.5px' }}
                    fontWeight={800}
                    mb="10px"
                    lineHeight={1.22}
                    whiteSpace={{ base: 'normal', md: 'nowrap' }}
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {event.title}
                  </Text>
                  <Text color="#4d6878" fontSize="13.5px" lineHeight={1.55}>
                    {event.description}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Grid>

        {/* Mobile Swiper Layout */}
        <Box
          display={{ base: 'block', md: 'none' }}
          pos="relative"
          mb="56px"
        >
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-btn-prev-process',
              nextEl: '.swiper-btn-next-process'
            }}
            style={{ overflow: 'visible' }}
          >
            {TIMELINE_EVENTS.map((event, idx) => (
              <SwiperSlide key={idx} style={{ overflow: 'visible', paddingBottom: '8px' }}>
                <Box px="4px">
                  <Box
                    p="8px"
                    bg="rgba(0, 90, 159, 0.02)"
                    borderRadius="32px"
                    border="1px solid"
                    borderColor="rgba(0, 90, 159, 0.06)"
                    boxShadow="0 18px 45px rgba(22, 45, 60, 0.08)"
                  >
                    <Flex
                      direction="column"
                      p="18px"
                      borderRadius="24px"
                      bg="#ffffff"
                      boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
                      h="full"
                    >
                      {/* Event Image */}
                      <Box
                        borderRadius="18px"
                        overflow="hidden"
                        mb="18px"
                        bg="#eef8ff"
                        border="1px solid"
                        borderColor="rgba(219, 234, 243, 0.9)"
                        aspectRatio="1/1"
                        position="relative"
                      >
                        <Image
                          src={event.image}
                          alt={event.title}
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

                      {/* Title & Description */}
                      <Flex direction="column" flex={1}>
                        <Text
                          as="p"
                          color="#005a9f"
                          fontSize={{ base: '17px', md: '15px' }}
                          fontWeight={800}
                          mb="10px"
                          lineHeight={1.22}
                        >
                          {event.title}
                        </Text>
                        <Text color="#4d6878" fontSize="13.5px" lineHeight={1.55}>
                          {event.description}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons for Mobile Swiper */}
          <Flex
            position="absolute"
            bottom="-48px"
            left="50%"
            transform="translateX(-50%)"
            gap="12px"
            zIndex={10}
          >
            <Flex
              className="swiper-btn-prev-process"
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
              className="swiper-btn-next-process"
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
  );
};

export default Process;
