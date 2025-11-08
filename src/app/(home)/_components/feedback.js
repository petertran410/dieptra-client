import Carousel from '../../../components/carousel';
import CarouselMobile from '../../../components/carousel/carousel-mobile';
import SectionBlockH3 from '../../../components/section-block/section-block-h3';
import { IMG_ALT } from '../../../utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const Feedback = () => {
  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  const FEEDBACK_LIST = [
    {
      customer: 'Chị Kim Dung',
      position: 'Đại diện Nguyên liệu pha chế Hưng Sao Hà Đông',
      content:
        'Tôi vô cùng ấn tượng với sản phẩm Khoai Môn tươi Nghiền thuộc Dòng Sản phẩm Đông lạnh của Thương hiệu Gấu LerMao. Với vị ngọt, béo, ngậy, mình cảm thấy rất phù hợp với các món trà sữa, và tôi tin sẽ trở thành xu hướng mới trong mùa thu đông năm nay.',
      image: '/images/feedback-1.webp'
    },
    {
      customer: 'Chị Thùy Linh',
      position: 'Đại diện Nguyên liệu Pha chế Đức Linh Hà Đông',
      content:
        'Sản phẩm của thương hiệu Gấu LerMao vô cùng đa dạng, với các khẩu vị vô cùng mới lạ, tươi ngon, đặc biệt hấp dẫn. Hiện nay thị trường Việt Nam có rất nhiều sản phẩm, tuy nhiên để được đa dạng và chất lượng như sản phẩm của công ty HI SWEETIE VIỆT NAM hiếm bên nào có thể làm được.',
      image: '/images/feedback-2.webp'
    },
    {
      customer: 'Anh Quyết',
      position: 'Founder Chuỗi Trà sữa Son La - Vùng di sản Trà Ô Long',
      content:
        'Sản phẩm có gần như 9 trên 10 mẫu mã mà doanh nghiệp em có thể ứng dụng được để cân nhắc thay thế các loại nguyên liệu đang dùng bây giờ. Sản phẩm thuộc thương hiệu Gấu LerMao của công ty hoàn toàn đáp ứng được mọi nhu cầu và xu hướng hot hiện nay.',
      image: '/images/feedback-3.webp'
    },
    {
      customer: 'Anh Đông',
      position: 'Đại diện BID Cần Thơ',
      content:
        'Khách hàng đều phản hồi rất tích cực về sản phẩm Lermao và trà Phượng Hoàng. Khi khách hàng hài lòng, BID cũng cảm thấy hoàn toàn tin tưởng vào chất lượng sản phẩm. Cảm ơn Diệp Trà đã mang đến những hương vị thơm ngon, chất lượng cho người tiêu dùng Việt Nam.',
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
      <SectionBlockH3 title="Khách hàng nói gì về Diệp Trà" />

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
