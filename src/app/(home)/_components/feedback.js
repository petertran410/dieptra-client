import Carousel from '../../../components/carousel';
import CarouselMobile from '../../../components/carousel/carousel-mobile';
import SectionBlock from '../../../components/section-block';
import { IMG_ALT } from '../../../utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const Feedback = () => {
  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 4 }
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
        'Khách hàng đều phản hồi rất tích cực về sản phẩm Lermao và trà Phượng Hoàng. Khi khách hàng hài lòng, BID cũng cảm thấy hoàn toàn tin tưởng vào chất lượng sản phẩm. Cảm ơn Diệp Trà đã mang đến những hương vị thơm ngon, chất lượng cho người tiêu dùng Việt Nam. Hy vọng trong năm 2025, Diệp Trà sẽ tiếp tục ra mắt nhiều sản phẩm mứt và trà mới, góp phần làm phong phú thêm thị trường.',
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
      <SectionBlock title="Khách hàng nói gì về chúng tôi" />

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
        <Box w={{ xs: 'full', lg: '105%' }} ml={{ xs: 0, lg: '-2.5%' }}>
          <Box display={{ xs: 'none', lg: 'block' }}>
            <Carousel breakpoints={breakpoints} spaceBetween={24}>
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
                      h="388px"
                    >
                      <Text fontSize={18} fontWeight={500} textAlign="center">
                        {item.customer}
                      </Text>
                      <Text color="#71717A" textAlign="center">
                        {item.position}
                      </Text>
                      <Text mt="4px" textAlign="center" fontSize={16}>
                        {item.content}
                      </Text>
                      <Image
                        src={item.image}
                        pos="absolute"
                        left={0}
                        right={0}
                        mx="auto"
                        fit="cover"
                        top="-32px"
                        w="70px"
                        h="70px"
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
                      h="400px"
                    >
                      <Text fontSize={18} fontWeight={500} textAlign="center">
                        {item.customer}
                      </Text>
                      <Text color="#71717A" textAlign="center">
                        {item.position}
                      </Text>
                      <Text mt="20px" textAlign="center" fontSize={16}>
                        {item.content}
                      </Text>
                      <Image
                        src={item.image}
                        pos="absolute"
                        left={0}
                        right={0}
                        mx="auto"
                        fit="cover"
                        top="-32px"
                        w="70px"
                        h="70px"
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
