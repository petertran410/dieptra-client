import SectionBlock from '../../../components/section-block';
import { IMG_ALT } from '../../../utils/const';
import { Flex, Image, Text } from '@chakra-ui/react';

const Strength = () => {
  const STRENGTH_LIST = [
    {
      title: 'Sản Phẩm Đa Dạng và Toàn Diện',
      description:
        'Chúng tôi cung cấp danh mục sản phẩm vô cùng đa dạng, bao gồm các nguyên liệu pha chế từ trà, mứt trái cây, các loại bột, và nhiều loại topping mới lạ, độc đáo. Bộ sản phẩm còn có giá trị  đón đầu xu hướng, giúp khách hàng tự tin sáng tạo những sản phẩm nổi bật, chinh phục thị trường đồ uống và tạo dựng dấu ấn riêng biệt.'
    },
    {
      title: 'Nguồn Nguyên Liệu Chất Lượng Cao',
      description:
        'Nguyên liệu của Diệp Trà được chọn lọc kỹ lưỡng từ các nhà cung cấp uy tín. Chất lượng là ưu tiên hàng đầu trong mọi sản phẩm mà chúng tôi cung cấp.'
    },
    {
      title: 'Giá Thành Tối Ưu',
      description:
        'Là doanh nghiệp nhập khẩu trực tiếp, Diệp Trà mang đến sản phẩm chất lượng với mức giá cạnh tranh, giúp các doanh nghiệp đồ uống tối ưu chi phí mà vẫn đảm bảo chất lượng vượt trội.'
    },
    {
      title: 'Dịch Vụ Hỗ Trợ Tuyệt Vời',
      description:
        'Diệp Trà tự hào với dịch vụ hỗ trợ khách hàng tận tâm và chuyên nghiệp. Hành trình phát triển công ty và mạng lưới phân phối trên cả nước là minh chứng đẹp đẽ cho hành trình xây dựng dịch vụ công ty chúng tôi.'
    },
    {
      title: 'Luôn Đổi Mới và Bắt Kịp Xu Hướng',
      description:
        'Chúng tôi luôn tư duy cải tiến – biến việc “học hỏi, sáng tạo và đổi mới” trở thành văn hóa của doanh nghiệp. Từ đó, tập trung tối ưu, cải thiện, nâng tầm mọi sản phẩm thức uống, giúp khách hành cạnh tranh trong thị trường đồ uống đầy tiềm năng và không ngừng phát triển.'
    }
  ];

  return (
    <Flex
      direction="column"
      align="center"
      gap="16px"
      mt="64px"
      px={{ xs: '20px', md: '30px', lg: '160px', xl: '340px', '2xl': '460px' }}
    >
      <SectionBlock title="Các thế mạnh về sản phẩm" />

      {STRENGTH_LIST.map((item, index) => {
        const { title, description } = item;

        return (
          <Flex
            key={index}
            borderRadius={64}
            borderEndStartRadius={0}
            bgColor="#F4F4F5"
            px="24px"
            pt={{ xs: 0, lg: '36px' }}
            pb={{ xs: '24px', lg: '36px' }}
            gap="16px"
            h={{ xs: 'auto', lg: '176px' }}
            w="full"
            pos="relative"
            direction={{ xs: 'column', lg: 'row' }}
          >
            <Flex display={{ xs: 'block', lg: 'none' }} direction="column" align="center" justify="center">
              <Image src="/images/strength-leaves.webp" alt={IMG_ALT} w="50px" h="25px" mx="auto" />
              <Image
                src={`/images/strength-${index + 1}.webp`}
                alt={IMG_ALT}
                w="106px"
                h="106px"
                borderRadius="full"
                mx="auto"
              />
            </Flex>

            <Flex direction="column" gap="4px" flex={1}>
              <Text
                fontSize={14}
                fontWeight={500}
                textTransform="uppercase"
                color="#73C16B"
                textAlign={{ xs: 'center', lg: 'left' }}
              >
                {title}
              </Text>
              <Text fontSize={16} lineHeight="20px" textAlign="justify">
                {description}
              </Text>
            </Flex>

            <Image
              display={{ xs: 'none', lg: 'block' }}
              src={`/images/strength-${index + 1}.webp`}
              alt={IMG_ALT}
              w="106px"
              h="106px"
              borderRadius="full"
            />

            <Image
              display={{ xs: 'none', lg: 'block' }}
              src="/images/strength-leaves.webp"
              alt={IMG_ALT}
              w="106px"
              h="54px"
              pos="absolute"
              bottom="-15px"
              left="-35px"
            />
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Strength;
