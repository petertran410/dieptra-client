import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

const AboutUs = () => {
  return (
    <Flex
      mt={{ xs: '30px', lg: '148px' }}
      mb={{ xs: '40px', lg: '130px' }}
      px={PX_ALL}
      gap="24px"
      direction={{ xs: 'column', lg: 'row' }}
    >
      <Flex flex={1} direction="column" gap="16px">
        <Text as="h2" fontSize={24} fontWeight={600} color="#1E96BC">
          Về Diệp Trà
        </Text>
        <Text fontSize={16}>
          Là thương hiệu thuộc Công ty TNHH Xuất Nhập Khẩu Hi Sweetie Việt Nam, được ra đời vào năm 2018 dưới tên Diệp
          Trà, cùng sứ mệnh tiên phong, đi đầu trong ngành đồ uống tại Việt Nam. Chúng tôi chuyên phục vụ các mặt hàng
          nguyên liệu pha chế nhập khẩu từ Đài Loan (Trung Quốc) và Trung Quốc, tập trung vào chiến lược{' '}
          <Text as="span" fontSize={16} fontWeight={600}>
            “Hợp tác chiến lược Toàn Diện và Độc Quyền”
          </Text>{' '}
          với các đối tác uy tín số 1 trên thế giới để mang đến những sản phẩm tốt nhất, xu hướng nhất với giá thành hợp
          lý đến thị trường Việt Nam.
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
            fontSize={16}
            borderRadius={8}
            fontWeight={500}
            transitionDuration="250ms"
            _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
          >
            Xem chi tiết
          </Flex>
        </Link>
      </Flex>
      <Flex flex={1}>
        <Image src="/images/image-about-home.webp" w="full" h="235px" fit="cover" alt={IMG_ALT} borderRadius={16} />
      </Flex>
    </Flex>
  );
};

export default AboutUs;
