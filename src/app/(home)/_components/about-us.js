import { IMG_ALT, PX_ALL, ABOUT_US } from '../../../utils/const';
import { Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

const AboutUs = () => {
  return (
    <Flex
      mt={{ xs: '30px', lg: '50px' }}
      mb={{ xs: '40px', lg: '50px' }}
      px={{ xs: '20px', lg: '400px', md: '200px' }}
      gap="24px"
      direction={{ xs: 'column', lg: 'row' }}
    >
      <Flex flex={1.1} direction="column" gap="16px">
        <Text as="h2" fontSize={26} fontWeight={600} color="#1E96BC">
          Về Diệp Trà
        </Text>
        <Text fontSize={18} textAlign="justify">
          Diệp Trà - Thương hiệu trực thuộc Công ty TNHH Xuất Nhập Khẩu Hi Sweetie Việt Nam, ra đời năm 2018 với sứ mệnh
          tiên phong trong ngành đồ uống tại Việt Nam. Chúng tôi chuyên cung cấp nguyên liệu pha chế nhập khẩu từ Đài
          Loan (Trung Quốc) và Trung Quốc, đáp ứng nhu cầu đa dạng của thị trường.
        </Text>
        <Text fontSize={18} textAlign="justify">
          Với chiến lược “Hợp tác chiến lược Toàn diện và Độc quyền” cùng các đối tác uy tín hàng đầu thế giới, Diệp Trà
          cam kết mang đến những sản phẩm chất lượng cao, đón đầu xu hướng, cùng mức giá hợp lý cho khách hàng tại Việt
          Nam.
        </Text>

        <Link href="/gioi-thieu-diep-tra" target="_blank">
          <Flex
            align="center"
            justify="center"
            bgColor="#FFF"
            border="1px solid"
            borderColor="#065FD4"
            color="#065FD4"
            w="108px"
            h="40px"
            gap="4px"
            fontSize={18}
            borderRadius={8}
            fontWeight={500}
            transitionDuration="250ms"
            _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
          >
            Xem chi tiết
          </Flex>
        </Link>
      </Flex>
      <Flex flex={0.9}>
        <Image
          src="/images/about-us-2.webp"
          w={{ lg: 'full', xs: 'full', md: '45%' }}
          h="full"
          fit="cover"
          alt={IMG_ALT}
          borderRadius={16}
        />
      </Flex>
    </Flex>
  );
};

export default AboutUs;
