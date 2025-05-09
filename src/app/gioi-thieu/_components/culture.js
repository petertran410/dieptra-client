import SectionBlock from '../../../components/section-block';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';

const Culture = () => {
  return (
    <Flex
      direction="column"
      align="center"
      gap="16px"
      mt="64px"
      py={{ xs: '16px', lg: '56px' }}
      px={PX_ALL}
      bgImage="url(/images/bg-culture-intro.png)"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <SectionBlock title="Văn hoá diệp trà" isNormal />
      <Text textAlign="center" fontSize={16}>
        Chúng tôi xây dựng một thương hiệu mang bản sắc riêng
      </Text>

      <Grid templateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }} gap="24px">
        <GridItem h={{ xs: '200px', lg: 'auto' }}>
          <Image src="/images/image-culture-intro.png" w="full" h="full" fit="cover" borderRadius={16} alt={IMG_ALT} />
        </GridItem>
        <GridItem flex={1} direction="column" gap="24px" h="full">
          <Flex direction="column" h="full" gap="24px">
            <Flex
              flex={1}
              direction="column"
              borderRadius={16}
              bgColor="#FFFFFF66"
              gap="8px"
              p="16px"
              backdropFilter="blur(4px)"
            >
              <Image src="/images/intro-eye.png" w="40px" h="40px" alt={IMG_ALT} />
              <Text fontSize={18} fontWeight={500} color="#1E96BC">
                Tầm nhìn
              </Text>
              <Text fontSize={16} lineHeight="20px" textAlign="justify">
                Năm 2030, Diệp Trà trở thành 1 trong 10 Nhà Nhập Khẩu Nguyên Liệu Pha chế Toàn Diện và có nhiều Khách
                hàng thành công nhất trong ngành Đồ uống tại Việt Nam.
              </Text>
            </Flex>

            <Flex
              flex={1}
              direction="column"
              borderRadius={16}
              bgColor="#FFFFFF66"
              gap="8px"
              p="16px"
              backdropFilter="blur(4px)"
            >
              <Image src="/images/intro-star.png" w="40px" h="40px" alt={IMG_ALT} />
              <Text fontSize={18} fontWeight={500} color="#1E96BC">
                Sứ mệnh
              </Text>
              <Text fontSize={16} lineHeight="20px" textAlign="justify">
                Với vị thế là nhà nhập khẩu hàng đầu tại Việt Nam, Diệp Trà liên tục nâng cao tiêu chuẩn chất lượng
                nguyên liệu và cập nhật xu thế mới nhất từ thị trường Đồ uống Quốc tế, nhằm mang đến Giải Pháp Toàn
                Diện, giúp chủ doanh nghiệp xây dựng mô hình kinh doanh phát triển vững mạnh.
              </Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem flex={1} direction="column" borderRadius={16} bgColor="#FFFFFF66" p="16px" backdropFilter="blur(4px)">
          <Flex h="full" direction="column" gap="8px">
            <Image src="/images/intro-key.png" w="40px" h="40px" alt={IMG_ALT} />
            <Text fontSize={18} fontWeight={500} color="#1E96BC">
              Giá trị cốt lõi
            </Text>
            <Text fontSize={16} lineHeight="20px" textAlign="justify">
              <Text as="span" fontSize={16} fontWeight={500}>
                1. Tập trung vào trải nghiệm khách hàng
              </Text>
              <br />
              Diệp Trà đặt khách hàng làm trọng tâm, luôn lắng nghe và đáp ứng để mang lại giá trị cao nhất qua từng sản
              phẩm và dịch vụ.
              <br />
              <Text as="span" fontSize={16} fontWeight={500}>
                2. Hợp tác cùng phát triển
              </Text>
              <br />
              {`"Thành công của khách hàng là tương lai của chúng tôi." Diệp Trà đồng hành và không ngừng tạo dựng niềm tin qua sự phát triển bền vững.`}
              <br />
              <Text as="span" fontSize={16} fontWeight={500}>
                3. Học hỏi, sáng tạo và đổi mới
              </Text>
              <br />
              Luôn đổi mới, luôn cải tiến – Diệp Trà mang đến những giải pháp toàn diện, đón đầu xu hướng, vì lợi ích
              tối đa của khách hàng.
              <br />
              <Text as="span" fontSize={16} fontWeight={500}>
                4. Đoàn kết và tôn trọng con người
              </Text>
              <br />
              Chúng tôi xây dựng một môi trường đoàn kết, nơi mọi cá nhân được tôn trọng, cùng gắn bó và phát triển vì
              mục tiêu chung.
              <br />
              <Text as="span" fontSize={16} fontWeight={500}>
                5. Kỷ luật và cam kết
              </Text>
              <br />
              Diệp Trà giữ vững kỷ luật và cam kết, hoàn thành mọi việc với trách nhiệm và tinh thần đáng tin cậy, xứng
              đáng với niềm tin của khách hàng và nỗ lực của đội ngũ nhân sự công ty trên hành trình xây dựng doanh
              nghiệp.
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Culture;
