import SectionBlock from '../../../components/section-block';
import SectionBlockH2 from '../../../components/section-block/section-block-h2';
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
      bgImage="url(/images/bg-culture-intro.webp)"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <SectionBlockH2 title="Văn hoá diệp trà" isNormal />
      <Text textAlign="center" fontSize={16}>
        Diệp Trà là thương hiệu nhập khẩu & phân phối nguyên liệu pha chế cao cấp, hướng đến xây dựng hệ sinh thái đồ
        uống chất lượng và bền vững tại Việt Nam.
      </Text>

      <Grid templateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }} gap="24px">
        <GridItem h={{ xs: '200px', lg: 'auto' }}>
          <Image src="/images/image-culture-intro.webp" w="full" h="full" fit="cover" borderRadius={16} alt={IMG_ALT} />
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
              <Image src="/images/intro-eye.webp" w="40px" h="40px" alt={IMG_ALT} />
              <Text fontSize={18} fontWeight={500} color="#1E96BC">
                Tầm nhìn
              </Text>
              <Text fontSize={16} lineHeight="20px" textAlign="justify">
                <li>
                  <b>
                    Đến năm 2030, Diệp Trà đặt mục tiêu trở thành một trong 10 nhà nhập khẩu và phân phối nguyên liệu
                    pha chế toàn diện hàng đầu tại Việt Nam,
                  </b>{' '}
                  không chỉ về quy mô mà còn về chất lượng sản phẩm, độ uy tín thương hiệu và năng lực phục vụ khách
                  hàng
                </li>
                <li>
                  Diệp Trà hướng tới xây dựng <b>hệ sinh thái nguyên liệu pha chế chuẩn quốc tế</b>, với danh mục sản
                  phẩm đa dạng, có nguồn gốc rõ ràng, đáp ứng mọi nhu cầu từ quán nhỏ khởi nghiệp đến chuỗi thương hiệu
                  lớn.
                </li>
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
              <Image src="/images/intro-star.webp" w="40px" h="40px" alt={IMG_ALT} />
              <Text fontSize={18} fontWeight={500} color="#1E96BC">
                Sứ mệnh
              </Text>
              <Text fontSize={16} lineHeight="20px" textAlign="justify">
                <li>
                  <b>Với vai trò là một trong những nhà nhập khẩu nguyên liệu pha chế hàng đầu tại Việt Nam</b>, Diệp
                  Trà không ngừng nâng cao tiêu chuẩn chất lượng, lựa chọn những sản phẩm có nguồn gốc rõ ràng, hương vị
                  đặc sắc và đảm bảo an toàn thực phẩm. Chúng tôi luôn chủ động kết nối với các đối tác quốc tế để cập
                  nhật xu hướng đồ uống mới nhất, mang về thị trường trong nước những dòng nguyên liệu đón đầu trào lưu.
                </li>
                <li>
                  Không chỉ cung cấp nguyên liệu, Diệp Trà còn hướng tới việc trở thành{' '}
                  <b>đối tác chiến lược toàn diện cho các chủ quán, nhà sáng lập thương hiệu đồ uống</b>. Chúng tôi mang
                  đến giải pháp trọn gói – từ tư vấn sản phẩm, định hướng menu, cho đến hỗ trợ kỹ thuật và hậu mãi –
                  giúp khách hàng tối ưu chi phí, phát triển mô hình kinh doanh bền vững và cạnh tranh hiệu quả trên thị
                  trường.
                </li>
              </Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem flex={1} direction="column" borderRadius={16} bgColor="#FFFFFF66" p="16px" backdropFilter="blur(4px)">
          <Flex h="full" direction="column" gap="8px">
            <Image src="/images/intro-key.webp" w="40px" h="40px" alt={IMG_ALT} />
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
