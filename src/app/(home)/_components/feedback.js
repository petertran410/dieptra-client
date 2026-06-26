'use client';

import { Box, Text } from '@chakra-ui/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SecHead from './sec-head';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';

const Feedback = () => {

  const LIST = [
    { image: '/images/feedback-1.webp', name: 'Chị Kim Dung', role: 'Đại diện Nguyên liệu pha chế Hưng Sao Hà Đông', content: 'Tôi vô cùng ấn tượng với sản phẩm Khoai Môn tươi Nghiền thuộc Dòng Sản phẩm Đông lạnh của Thương hiệu Gấu LerMao. Với vị ngọt, béo, ngậy, mình cảm thấy rất phù hợp với các món trà sữa, và tôi tin sẽ trở thành xu hướng mới trong mùa thu đông năm nay.' },
    { image: '/images/feedback-2.webp', name: 'Anh Quyết', role: 'Founder Chuỗi Trà sữa Son La - Vùng di sản Trà Ô Long', content: 'Sản phẩm có gần như 9 trên 10 mẫu mã mà doanh nghiệp em có thể ứng dụng được để cân nhắc thay thế các loại nguyên liệu đang dùng bây giờ. Sản phẩm thuộc thương hiệu Gấu LerMao của công ty hoàn toàn đáp ứng được mọi nhu cầu và xu hướng hot hiện nay.' },
    { image: '/images/feedback-3.webp', name: 'Chị Thùy Linh', role: 'Đại diện Nguyên liệu Pha chế Đức Linh Hà Đông', content: 'Sản phẩm của thương hiệu Gấu LerMao vô cùng đa dạng, với các khẩu vị vô cùng mới lạ, tươi ngon, đặc biệt hấp dẫn. Hiện nay thị trường Việt Nam có rất nhiều sản phẩm, tuy nhiên để được đa dạng và chất lượng như sản phẩm của công ty HI SWEETIE VIỆT NAM hiếm bên nào có thể làm được.' },
    { image: '/images/feedback-4.webp', name: 'Anh Đông', role: 'Đại diện BID Cần Thơ', content: 'Khách hàng đều phản hồi rất tích cực về sản phẩm Lermao và trà Phượng Hoàng. Khi khách hàng hài lòng, BID cũng cảm thấy hoàn toàn tin tưởng vào chất lượng sản phẩm. Cảm ơn Diệp Trà đã mang đến những hương vị thơm ngon, chất lượng cho người tiêu dùng Việt Nam.' }
  ];

  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  return (
    <Box as="section" px={HOME_PX} py={{ base: '56px', lg: '96px' }} bg={HC.cyanBg}>
      <Box maxW="1200px" mx="auto">
        <SecHead eyebrow={'Cảm nhận khách hàng'} title={'Khách hàng nói gì về Diệp Trà'} />

        <Box className="home-feedback-swiper" pt="70px">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            breakpoints={breakpoints}
            spaceBetween={24}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
          >
            {LIST.map((item) => (
              <SwiperSlide key={item.name} style={{ height: 'auto' }}>
                <Box
                  pos="relative"
                  bg="#f4f4f5"
                  border="1px solid #e4e7e9"
                  borderRadius="16px"
                  p="84px 26px 30px"
                  mt="60px"
                  mb="20px"
                  textAlign="center"
                  h="calc(100% - 80px)"
                >
                  <Box
                    pos="absolute"
                    top="-60px"
                    left="50%"
                    transform="translateX(-50%)"
                    w="120px"
                    h="120px"
                    borderRadius="18px"
                    border="5px solid #fff"
                    overflow="hidden"
                    boxShadow="0 8px 20px rgba(13,59,66,.2)"
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
                  <Text color={HC.gold} fontSize="14px" letterSpacing="2px" mb="10px">
                    ★★★★★
                  </Text>
                  <Text fontSize="14px" color={HC.textSecondary} lineHeight={1.6} mb="16px" textAlign="justify">
                    {item.content}
                  </Text>
                  <Text fontFamily={FONT_DISPLAY} fontWeight={800} fontSize="16px" color={HC.primaryDark}>
                    {item.name}
                  </Text>
                  <Text fontSize="12.5px" color="#71717A" mt="2px">
                    {item.role}
                  </Text>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
};

export default Feedback;
