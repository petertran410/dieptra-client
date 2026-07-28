'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SecHead from './sec-head';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';

import 'swiper/css';
import 'swiper/css/navigation';

const Feedback = () => {

  const LIST = [
    { image: '/images/feedback-1.webp', name: 'Chị Kim Dung', role: 'Đại diện Hưng Sao Hà Đông', content: 'Tôi vô cùng ấn tượng với sản phẩm khoai môn tươi nghiền thuộc dòng sản phẩm nấu nhanh của thương hiệu Gấu LerMao. Với hương vị ngọt, béo và bùi đặc trưng, sản phẩm rất phù hợp để sử dụng trong các món trà sữa. Tôi tin rằng đây sẽ là một trong những xu hướng được yêu thích trong mùa thu đông năm nay.' },
    { image: '/images/feedback-3.webp', name: 'Anh Quyết', role: 'Founder Trà sữa Son La', content: 'Sản phẩm có gần như 9/10 mẫu mã mà doanh nghiệp của em có thể ứng dụng để cân nhắc thay thế các loại nguyên liệu đang sử dụng hiện nay. Các sản phẩm của nhà cung cấp Diệp Trà hoàn toàn đáp ứng tốt nhu cầu sử dụng cũng như các xu hướng đang được ưa chuộng trên thị trường.' },
    { image: '/images/feedback-2.webp', name: 'Chị Thùy Linh', role: 'Đại diện Đức Linh Hà Đông', content: 'Sản phẩm của thương hiệu Gấu LerMao rất đa dạng, với nhiều hương vị mới lạ, tươi ngon và hấp dẫn. Mặc dù thị trường Việt Nam hiện nay có nhiều đơn vị cung cấp nguyên liệu pha chế, nhưng để có danh mục sản phẩm phong phú cùng chất lượng đồng đều như ở Diệp Trà thì không nhiều nhà cung cấp làm được.' },
    { image: '/images/feedback-4.webp', name: 'Anh Đông', role: 'Đại diện BID Cần Thơ', content: 'Khách hàng đều phản hồi rất tích cực về các sản phẩm LerMao và trà Phượng Hoàng. Khi khách hàng hài lòng, BID cũng càng tin tưởng hơn vào chất lượng sản phẩm. Cảm ơn Diệp Trà đã mang đến những hương vị thơm ngon, chất lượng và góp phần tạo nên những thức uống hấp dẫn dành cho người tiêu dùng Việt Nam.' }
  ];

  return (
    <Box as="section" px={HOME_PX} py={{ base: '56px', lg: '96px' }} bg={HC.cyanBg}>
      <Box maxW="1200px" mx="auto">
        <SecHead
          eyebrow={'KHÁCH HÀNG NÓI GÌ'}
          title={
            <>
              {'Đại lý chia sẻ '}
              <br />
              {'sau khi dùng thực tế'}
            </>
          }
          desc={
            <>
              {'Chia sẻ chân thực từ các đại lý đã trực tiếp sử dụng sản phẩm. '}
              <br />
              {'Góc nhìn thực tế về chất lượng, độ ổn định và khả năng ứng dụng.'}
            </>
          }
        />

        {/* Desktop grid layout */}
        <Grid
          display={{ base: 'none', lg: 'grid' }}
          templateColumns="repeat(4, 1fr)"
          gap="24px"
          pt="0"
          mt="-16px"
        >
          {LIST.map((item) => (
            <Box key={item.name}>
              <Box
                pos="relative"
                bg="#FFF"
                border="1px solid"
                borderColor={HC.border}
                borderRadius="24px"
                p="110px 26px 30px"
                mt="90px"
                mb="20px"
                textAlign="center"
                h="calc(100% - 110px)"
                boxShadow="0 4px 20px rgba(0, 183, 204, 0.05)"
                transition="transform .25s"
                _hover={{ transform: 'translateY(-4px)' }}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box
                  pos="absolute"
                  top="-90px"
                  left="50%"
                  transform="translateX(-50%)"
                  w="180px"
                  h="180px"
                  borderRadius="50%"
                  border="4px solid #fff"
                  overflow="hidden"
                  boxShadow="0 10px 25px rgba(0, 183, 204, 0.16)"
                >
                  <Box
                    as="img"
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                </Box>
                <Box flex={1}>
                  <Text fontSize="14px" color={HC.textSecondary} lineHeight={1.6} mb="16px" textAlign="justify">
                    {item.content}
                  </Text>
                </Box>
                <Box mt="auto" pt="12px" borderTop="1px solid" borderColor={HC.border}>
                  <Text fontFamily={FONT_DISPLAY} fontWeight={800} fontSize="16px" color={HC.primaryDark}>
                    {item.name}
                  </Text>
                  <Text fontSize="12.5px" color="#71717A" mt="2px" noOfLines={1}>
                    {item.role}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>

        {/* Mobile Swiper Layout */}
        <Box
          display={{ base: 'block', lg: 'none' }}
          className="mobile-feedback-swiper"
          pos="relative"
          mb="56px"
        >
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-btn-prev-feedback',
              nextEl: '.swiper-btn-next-feedback'
            }}
            style={{ overflow: 'visible' }}
          >
            {LIST.map((item, idx) => (
              <SwiperSlide key={idx} style={{ overflow: 'visible', paddingBottom: '8px' }}>
                <Box px="12px">
                  <Box
                    pos="relative"
                    bg="#FFF"
                    border="1px solid"
                    borderColor={HC.border}
                    borderRadius="24px"
                    p="110px 26px 30px"
                    mt="90px"
                    mb="20px"
                    textAlign="center"
                    boxShadow="0 4px 20px rgba(0, 183, 204, 0.05)"
                  >
                    <Box
                      pos="absolute"
                      top="-90px"
                      left="50%"
                      transform="translateX(-50%)"
                      w="180px"
                      h="180px"
                      borderRadius="50%"
                      border="4px solid #fff"
                      overflow="hidden"
                      boxShadow="0 10px 25px rgba(0, 183, 204, 0.16)"
                    >
                      <Box
                        as="img"
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      />
                    </Box>
                    <Text fontSize="14px" color={HC.textSecondary} lineHeight={1.6} mb="16px" textAlign="justify">
                      {item.content}
                    </Text>
                    <Text fontFamily={FONT_DISPLAY} fontWeight={800} fontSize="16px" color={HC.primaryDark}>
                      {item.name}
                    </Text>
                    <Text fontSize="12.5px" color="#71717A" mt="2px" noOfLines={1}>
                      {item.role}
                    </Text>
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
              className="swiper-btn-prev-feedback"
              w="38px"
              h="38px"
              bg="#FFF"
              borderRadius="50%"
              border="1px solid"
              borderColor={HC.border}
              color={HC.primary}
              boxShadow="0 4px 14px rgba(0, 183, 204, 0.12)"
              cursor="pointer"
              align="center"
              justify="center"
              userSelect="none"
              transition="all .2s"
              _hover={{ bg: HC.primary, color: '#FFF', borderColor: HC.primary }}
              _active={{ transform: 'scale(0.95)' }}
              sx={{
                '&.swiper-button-disabled': {
                  opacity: 0.35,
                  cursor: 'not-allowed',
                  pointerEvents: 'none',
                  boxShadow: 'none',
                  borderColor: HC.border
                }
              }}
            >
              <Text fontSize="18px" fontWeight="bold" transform="translateX(-1px)">‹</Text>
            </Flex>

            <Flex
              className="swiper-btn-next-feedback"
              w="38px"
              h="38px"
              bg="#FFF"
              borderRadius="50%"
              border="1px solid"
              borderColor={HC.border}
              color={HC.primary}
              boxShadow="0 4px 14px rgba(0, 183, 204, 0.12)"
              cursor="pointer"
              align="center"
              justify="center"
              userSelect="none"
              transition="all .2s"
              _hover={{ bg: HC.primary, color: '#FFF', borderColor: HC.primary }}
              _active={{ transform: 'scale(0.95)' }}
              sx={{
                '&.swiper-button-disabled': {
                  opacity: 0.35,
                  cursor: 'not-allowed',
                  pointerEvents: 'none',
                  boxShadow: 'none',
                  borderColor: HC.border
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

export default Feedback;
