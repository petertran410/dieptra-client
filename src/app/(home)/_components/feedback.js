'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SecHead from './sec-head';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';

import 'swiper/css';
import 'swiper/css/navigation';

const Feedback = () => {
  const LIST = [
    {
      image: '/images/feedback-1.webp',
      name: 'Chị Kim Dung',
      role: 'Đại diện Hưng Sao Hà Đông',
      content:
        'Tôi vô cùng ấn tượng với sản phẩm khoai môn tươi nghiền thuộc dòng sản phẩm nấu nhanh của thương hiệu Gấu LerMao. Với hương vị ngọt, béo và bùi đặc trưng, sản phẩm rất phù hợp để sử dụng trong các món trà sữa. Tôi tin rằng đây sẽ là một trong những xu hướng được yêu thích trong mùa thu đông năm nay.'
    },
    {
      image: '/images/feedback-3.webp',
      name: 'Anh Quyết',
      role: 'Founder Trà sữa Son La',
      content:
        'Sản phẩm có gần như 9/10 mẫu mã mà doanh nghiệp của em có thể ứng dụng để cân nhắc thay thế các loại nguyên liệu đang sử dụng hiện nay. Các sản phẩm của nhà cung cấp Diệp Trà hoàn toàn đáp ứng tốt nhu cầu sử dụng cũng như các xu hướng đang được ưa chuộng trên thị trường.'
    },
    {
      image: '/images/feedback-2.webp',
      name: 'Chị Thùy Linh',
      role: 'Đại diện Đức Linh Hà Đông',
      content:
        'Sản phẩm của thương hiệu Gấu LerMao rất đa dạng, với nhiều hương vị mới lạ, tươi ngon và hấp dẫn. Mặc dù thị trường Việt Nam hiện nay có nhiều đơn vị cung cấp nguyên liệu pha chế, nhưng để có danh mục sản phẩm phong phú cùng chất lượng đồng đều như ở Diệp Trà thì không nhiều nhà cung cấp làm được.'
    },
    {
      image: '/images/feedback-4.webp',
      name: 'Anh Đông',
      role: 'Đại diện BID Cần Thơ',
      content:
        'Khách hàng đều phản hồi rất tích cực về các sản phẩm LerMao và trà Phượng Hoàng. Khi khách hàng hài lòng, BID cũng càng tin tưởng hơn vào chất lượng sản phẩm. Cảm ơn Diệp Trà đã mang đến những hương vị thơm ngon, chất lượng và góp phần tạo nên những thức uống hấp dẫn dành cho người tiêu dùng Việt Nam.'
    },
    {
      image: '/images/feedback-5.webp',
      name: 'Anh Khởi',
      role: 'Nguyên Liệu Pha Chế Và Làm Bánh\nKhởi Minh - Long Xuyên',
      content:
        'Workshop thể hiện tinh thần cởi mở và chuyên nghiệp của thương hiệu — mang đến cho khách hàng trải nghiệm thực tế, đa dạng sản phẩm và sự đồng hành tận tâm từ đội ngũ LerMao & Trà Phượng Hoàng.'
    },
    {
      image: '/images/feedback-6.webp',
      name: 'Đại Diện Khách Hàng',
      role: 'Đại lý tham gia Workshop - Phan Rang',
      content:
        'Các loại topping và mứt của LerMao giúp quán tiết kiệm thời gian chuẩn bị, hương vị lại tươi tự nhiên chứ không bị đọng vị syrup như sản phẩm thông thường — tạo nên sự khác biệt rõ rệt trên thị trường.'
    },
    {
      image: '/images/feedback-7.webp',
      name: 'Chị Thảo',
      role: 'Nguyên Liệu Pha Chế Khánh Gia',
      content:
        'Diệp Trà và Gấu LerMao đã mang đến một workshop chuyên nghiệp, đa dạng sản phẩm và thật sự hữu ích cho khách hàng — không chỉ giới thiệu nguyên liệu mà còn là giải pháp pha chế toàn diện giúp các quán phát triển và cùng nhau thành công.'
    },
    {
      image: '/images/feedback-8.webp',
      name: 'Đại Diện Thương Hiệu',
      role: 'Nguyên Liệu Pha Chế Thanh Diệu\nBình Dương',
      content:
        'Buổi workshop thành công khi mang đến nhiều trải nghiệm và sản phẩm mới, giúp khách hàng hiểu rõ hơn về nguồn gốc và xu hướng đồ uống — đồng thời lan tỏa hình ảnh Gấu LerMao như một giải pháp pha chế toàn diện đồng hành cùng đối tác phát triển thị trường.'
    }
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

        {/* Responsive Swiper for Desktop & Mobile */}
        <Box pos="relative" mt="10px">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-btn-prev-feedback',
              nextEl: '.swiper-btn-next-feedback'
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 24
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 24
              }
            }}
            style={{
              overflow: 'hidden',
              paddingTop: '10px',
              paddingBottom: '16px'
            }}
          >
            {LIST.map((item, index) => (
              <SwiperSlide key={index} style={{ height: 'auto', display: 'flex' }}>
                <Box w="100%" px={{ base: '6px', sm: '8px', lg: '0' }} display="flex" flexDirection="column">
                  <Box
                    pos="relative"
                    bg="#FFF"
                    border="1px solid"
                    borderColor={HC.border}
                    borderRadius="24px"
                    p="110px 24px 26px"
                    mt="90px"
                    mb="8px"
                    textAlign="center"
                    h="calc(100% - 98px)"
                    minH="350px"
                    boxShadow="0 4px 20px rgba(0, 183, 204, 0.05)"
                    transition="all .25s"
                    _hover={{
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 26px rgba(0, 183, 204, 0.12)'
                    }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    {/* Avatar Circle */}
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
                        onError={(e) => {
                          e.currentTarget.src = '/images/feedback-1.webp';
                        }}
                      />
                    </Box>

                    {/* Content Section (aligned from top) */}
                    <Box flex={1}>
                      <Text
                        fontSize="13.5px"
                        color={HC.textSecondary}
                        lineHeight={1.65}
                        mb="14px"
                        textAlign="justify"
                      >
                        {item.content}
                      </Text>
                    </Box>

                    {/* Footer Section */}
                    <Box mt="auto" pt="12px" borderTop="1px solid" borderColor={HC.border}>
                      <Text
                        fontFamily={FONT_DISPLAY}
                        fontWeight={800}
                        fontSize="16px"
                        color={HC.primaryDark}
                        noOfLines={1}
                        title={item.name}
                      >
                        {item.name}
                      </Text>
                      <Box minH="38px" display="flex" alignItems="center" justifyContent="center" mt="2px">
                        <Text
                          fontSize="12px"
                          color="#71717A"
                          lineHeight={1.4}
                          noOfLines={2}
                          title={item.role}
                          textAlign="center"
                          whiteSpace="pre-line"
                        >
                          {item.role}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls (Prev / Next Buttons) */}
          <Flex justify="center" align="center" gap="16px" mt={{ base: '28px', lg: '36px' }} zIndex={5}>
            <Flex
              className="swiper-btn-prev-feedback"
              w="42px"
              h="42px"
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
              _hover={{ bg: HC.primary, color: '#FFF', borderColor: HC.primary, transform: 'scale(1.06)' }}
              _active={{ transform: 'scale(0.95)' }}
              sx={{
                '&.swiper-button-disabled': {
                  opacity: 0.3,
                  cursor: 'not-allowed',
                  pointerEvents: 'none',
                  boxShadow: 'none',
                  borderColor: HC.border
                }
              }}
              role="button"
              aria-label="Xem khách hàng trước"
            >
              <Text fontSize="22px" fontWeight="bold" transform="translateX(-1px)">
                ‹
              </Text>
            </Flex>

            <Flex
              className="swiper-btn-next-feedback"
              w="42px"
              h="42px"
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
              _hover={{ bg: HC.primary, color: '#FFF', borderColor: HC.primary, transform: 'scale(1.06)' }}
              _active={{ transform: 'scale(0.95)' }}
              sx={{
                '&.swiper-button-disabled': {
                  opacity: 0.3,
                  cursor: 'not-allowed',
                  pointerEvents: 'none',
                  boxShadow: 'none',
                  borderColor: HC.border
                }
              }}
              role="button"
              aria-label="Xem khách hàng tiếp theo"
            >
              <Text fontSize="22px" fontWeight="bold" transform="translateX(1px)">
                ›
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Feedback;
