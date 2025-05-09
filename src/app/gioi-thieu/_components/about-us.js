import SectionBlock from '../../../components/section-block';
import { PX_ALL } from '../../../utils/const';
import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

const AboutUs = () => {
  return (
    <Flex
      direction="column"
      align="center"
      gap="16px"
      pt="24px"
      pb={{ xs: '16px', lg: '48px' }}
      px={PX_ALL}
      bgColor={{ xs: '#FFF', lg: '#eefbfd' }}
    >
      <SectionBlock title="Về chúng tôi" isNormal />
      <Text fontSize={16}>
        <Text fontSize={16} as="span" fontWeight={500}>
          Diệp Trà - Giải Pháp Pha Chế Toàn Diện Từ Nhà Nhập Khẩu Hàng Đầu Việt Nam
        </Text>
        <br />
        <br />
        Là thương hiệu thuộc Công ty TNHH Xuất Nhập Khẩu Hi Sweetie Việt Nam, được ra đời vào năm 2018 dưới tên Diệp Trà
        với tầm nhìn tiên phong, đi đầu trong ngành Đồ uống tại Việt Nam. Chúng tôi chuyên cung cấp nguyên liệu pha chế
        nhập khẩu từ Đài Loan (Trung Quốc) và Trung Quốc, tập trung vào chiến lược phát triển{' '}
        <Text as="span" fontSize={16} fontWeight={500} color="#1E96BC">
          “Hợp tác chiến lược Toàn Diện và Độc Quyền”
        </Text>{' '}
        với các đối tác uy tín số 1 trên thế giới để mang đến một{' '}
        <Text as="span" fontSize={16} fontWeight={500} color="#1E96BC">
          hệ sinh thái toàn diện, từ những sản phẩm có chất lượng tốt nhất, độc đáo theo xu hướng với chi phí tối ưu đến
          cách phát triển menu đa dạng, cập nhật từ các chuyên gia hàng đầu tại xứ sở Trà sữa.
        </Text>
        <br />
        <br />
        Thấu hiểu được những khó khăn của khách hàng khi xây dựng thương hiệu, chúng tôi đã đi sâu nghiên cứu và cung
        cấp một chuỗi các giá trị nhằm mang đến Giải Pháp Toàn Diện về nguyên liệu pha chế, trở thành đối tác tin cậy
        hàng đầu của các chủ doanh nghiệp. Diệp Trà cẩn trọng đánh giá và chọn lựa đối tác sản xuất dựa trên 6 tiêu
        chuẩn nghiêm ngặt:{' '}
        <Text as="span" fontSize={16} fontWeight={500} color="#1E96BC">
          Chất lượng tốt nhất, Công nghệ tiên tiến, Thời gian giao nhận, Khả năng cung ứng liên tục, Chính sách bảo hành
          và Giá thành cạnh tranh.
        </Text>
        <br />
        <br />
        Vị thế là nhà nhập khẩu hàng đầu tại Việt Nam, chúng tôi đã không ngừng bứt phá mạnh mẽ, khai phá tiềm năng thị
        trường và nâng cao tiêu chuẩn chất lượng đề mang đến giải pháp toàn diện, đáp ứng tối đa kỳ vọng của khách hàng.
        Theo đuổi tôn chỉ luôn lắng nghe và không ngừng cải tiến, Diệp Trà đã nhận được sự tin tưởng đồng hành của khách
        hàng trong việc nâng tầm menu và hành trình tạo dựng những thương hiệu thành công.
        <br />
        <br />
        Những nỗ lực ấy giúp Diệp Trà vững vàng ở vị trí dẫn đầu, trở thành đối tác tin cậy và nguồn cảm hứng sáng tạo
        cho ngành pha chế tại Việt Nam, giúp thị trường Đồ uống tại Việt Nam tiệm cận nhanh nhất với Quốc tế. Hệ sinh
        thái của chúng tôi – chính là sức mạnh để bạn dẫn đầu xu thế.
      </Text>
      <Flex justify="center" mt="8px">
        <Link href="/san-pham">
          <Flex
            align="center"
            justify="center"
            bgColor="transparent"
            border="1px solid"
            borderColor="#065FD4"
            color="#065FD4"
            w="195px"
            h="40px"
            gap="4px"
            fontSize={16}
            borderRadius={8}
            fontWeight={500}
            transitionDuration="250ms"
            _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
          >
            Xem danh sách sản phẩm
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

export default AboutUs;
