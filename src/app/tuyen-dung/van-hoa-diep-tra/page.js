import Breadcrumb from '@/components/breadcrumb';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { AspectRatio, Box, Flex, Image, Text } from '@chakra-ui/react';
import Banner from '../_components/banner';

const Culture = () => {
  return (
    <Box>
      <Banner />
      <Flex
        px={PX_ALL}
        mt={{ xs: '24px', lg: '48px' }}
        gap={{ xs: '50px', lg: '24px' }}
        pb="50px"
        direction={{ xs: 'column', lg: 'row' }}
      >
        <Flex w="full" direction="column">
          <Breadcrumb
            data={[
              { title: 'Tuyển dụng', href: '/tuyen-dung' },
              { title: 'Văn hoá Diệp Trà', href: '/tuyen-dung/van-hoa-diep-tra', isActive: true }
            ]}
          />

          <Text as="h1" fontSize={24} fontWeight={600} mt="20px" lineHeight="30px">
            {`Văn hóa việc làm Diệp Trà: "Cùng Chia Sẻ, Cùng Phát Triển"`}
          </Text>
          <AspectRatio ratio={16 / 9} w="full" mt="20px">
            <Image src="/images/culture-banner.jpg" w="full" h="full" alt={IMG_ALT} />
          </AspectRatio>

          <Box mt={{ xs: '24px', lg: '48px' }}>
            <Text as="h1" fontSize={24} fontWeight={600} lineHeight="30px">
              1. Tầm nhìn về văn hóa việc làm
            </Text>
            <Text mt="20px" fontWeight={500} fontSize={16} lineHeight="19px">
              Diệp Trà không chỉ là nơi làm việc, mà còn là một môi trường để phát triển cá nhân và cống hiến giá trị.
              Chúng tôi xây dựng một môi trường nơi nhân sự không ngừng học hỏi, cập nhật và sáng tạo, đồng thời lan tỏa
              giá trị đến cộng đồng F&B và ngành đồ uống.
            </Text>

            {/* <AspectRatio ratio={16 / 9} w="full" mt="20px">
              <Image src="/images/culture-banner.jpg" w="full" h="full" alt={IMG_ALT} />
            </AspectRatio> */}
          </Box>

          <Box mt={{ xs: '24px', lg: '48px' }}>
            <Text as="h1" fontSize={24} fontWeight={600} lineHeight="30px">
              2. Giá trị cốt lõi trong văn hóa việc làm
            </Text>

            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              2.1. Tập trung vào sự phát triển cá nhân và đội nhóm
            </Text>
            {/* <AspectRatio ratio={16 / 9} w="full" mt="20px">
              <Image src="/images/culture-banner.jpg" w="full" h="full" alt={IMG_ALT} />
            </AspectRatio> */}

            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              <Text as="span" fontWeight={500} fontSize={16}>
                - Chương trình đào tạo và học tập liên tục:
              </Text>{' '}
              Diệp Trà tạo điều kiện để nhân viên tham gia các khóa học, hội thảo chuyên môn cả trong nước và quốc tế.
              Từ đó, nhân sự không chỉ phát triển kỹ năng công việc mà còn mở rộng tư duy sáng tạo và hiểu biết ngành.
            </Text>
            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={16} lineHeight="19px">
                + Hỗ trợ một phần chi phí cho nhân viên tham gia các khóa học, chứng chỉ chuyên môn trong các lĩnh vực
                như marketing, bán hàng, quản lý chuỗi cung ứng, và công nghệ.
                <br />
                + Tổ chức các buổi đào tạo nội bộ định kỳ theo tháng với sự tham gia của các chuyên gia ngành hàng đầu
                trong nước và quốc tế.
                <br />+ Tạo điều kiện cho nhân viên tham gia hội thảo, triển lãm chuyên ngành để cập nhật xu hướng và
                học hỏi từ các thương hiệu lớn và thị trường lớn trên thế giới.
              </Text>
            </Flex>

            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              <Text as="span" fontWeight={500} fontSize={16}>
                - Đánh giá sự tiến bộ cá nhân:
              </Text>{' '}
              Thành công của nhân viên không chỉ dựa trên kết quả công việc mà còn được đo lường qua sự tiến bộ cá nhân,
              khả năng vượt qua thử thách, và cách họ hỗ trợ đồng đội.
            </Text>
            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={16} lineHeight="19px">
                + Đặt các tiêu chí đánh giá hiệu suất không chỉ dựa trên doanh số hay kết quả công việc, mà còn qua cách
                nhân viên học hỏi, phát triển kỹ năng mới, và đóng góp cho đồng đội.
                <br />
                + Áp dụng hệ thống mentoring (hướng dẫn) trong nội bộ, nơi các nhân viên giàu kinh nghiệm hỗ trợ, dẫn
                dắt các nhân viên mới hoặc trẻ hơn.
                <br />+ Xây dựng lộ trình phát triển nghề nghiệp rõ ràng cho từng vị trí, giúp nhân viên định hình hướng
                đi trong sự nghiệp.
              </Text>
            </Flex>

            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              2.2. Tôn trọng sự khác biệt và đoàn kết
            </Text>
            <AspectRatio ratio={16 / 9} w="full" mt="20px">
              <Image src="/images/culture-2-2.jpg" w="full" h="full" alt={IMG_ALT} />
            </AspectRatio>

            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              <Text as="span" fontWeight={500} fontSize={16}>
                - Đội ngũ đa dạng và tôn trọng lẫn nhau:
              </Text>{' '}
              Diệp Trà tự hào sở hữu một đội ngũ nhân sự đa dạng về kinh nghiệm, góc nhìn, và văn hóa. Nhân viên được
              khuyến khích học hỏi từ nhau để phát triển cả về cá nhân lẫn tập thể.
            </Text>
            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={16} lineHeight="19px">
                + Tập trung thúc đẩy, đề cao tính sáng tạo trong công việc của mỗi cá nhân, từ đó tạo ra sự đa dạng,
                nhiều sắc màu trong văn hóa công ty, văn hóa đội nhóm.
                <br />+ Phối hợp liên phòng ban, đoàn kết vì mục tiêu và sứ mệnh chung của công ty.
              </Text>
            </Flex>

            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              <Text as="span" fontWeight={500} fontSize={16}>
                - Tôn vinh mọi ý tưởng:
              </Text>{' '}
              Mọi thành viên, dù ở bất kỳ vị trí nào, đều được khuyến khích chia sẻ ý tưởng. Diệp Trà lắng nghe và đánh
              giá cao những đóng góp này như một phần của quá trình cải tiến.
            </Text>

            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              2.3. Học hỏi không ngừng
            </Text>
            {/* <AspectRatio ratio={16 / 9} w="full" mt="20px">
              <Image src="/images/culture-banner.jpg" w="full" h="full" alt={IMG_ALT} />
            </AspectRatio> */}

            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              <Text as="span" fontWeight={500} fontSize={16}>
                - {`Văn hóa "learning mindset":`}
              </Text>{' '}
              Tại Diệp Trà, việc không ngừng học hỏi được xem là giá trị cốt lõi giúp công ty đổi mới và dẫn đầu thị
              trường. Mọi nhân viên đều được khuyến khích cập nhật kiến thức chuyên môn, công nghệ mới, và các xu hướng
              thị trường để nâng cao hiệu quả công việc.
            </Text>
            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={16} lineHeight="19px">
                + Mỗi nhân viên được yêu cầu dành ít nhất 10% thời gian làm việc để học hỏi kiến thức mới, từ các tài
                liệu ngành, khóa học trực tuyến, hoặc buổi chia sẻ nội bộ.
                <br />+ Áp dụng KPI khuyến khích học tập như “10 sách hay nhất của năm,” nơi nhân viên cùng đọc và thảo
                luận để mở rộng tư duy.
              </Text>
            </Flex>

            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              <Text as="span" fontWeight={500} fontSize={16}>
                - Chương trình động viên học tập:
              </Text>{' '}
              Công ty xây dựng các chính sách thưởng khuyến khích việc học tập như hỗ trợ chi phí khóa học, tạo cơ hội
              thực hành tại chỗ, và tổ chức các buổi chia sẻ kinh nghiệm.
            </Text>

            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              <Text as="span" fontWeight={500} fontSize={16}>
                - Cập nhật xu hướng công nghệ và thị trường:
              </Text>{' '}
            </Text>
            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={16} lineHeight="19px">
                + Đưa nhân sự tiếp cận các công cụ công nghệ mới, tiết kiệm thời gian trong công việc và nâng cao hiệu
                quất.
                <br />+ Hàng quý, tổ chức các buổi hội thảo cập nhật xu hướng thị trường đồ uống, giúp nhân viên hiểu rõ
                nhu cầu và thị hiếu khách hàng.
              </Text>
            </Flex>

            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              2.4. Tôn vinh sự sáng tạo
            </Text>
            <AspectRatio ratio={16 / 9} w="full" mt="20px">
              <Image src="/images/culture-2-4.jpg" w="full" h="full" alt={IMG_ALT} />
            </AspectRatio>

            <Text fontWeight={400} fontSize={16} mt="12px">
              Khuyến khích nhân sự đề xuất ý tưởng mới cho sản phẩm, quy trình và hoạt động nội bộ.
            </Text>

            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              <Text as="span" fontWeight={500} fontSize={16}>
                - Không gian cho ý tưởng:
              </Text>{' '}
              Diệp Trà khuyến khích nhân sự đề xuất ý tưởng mới, từ sản phẩm đến quy trình làm việc hay các hoạt động
              nội bộ. Mọi ý tưởng đều được xem xét, thảo luận và triển khai nếu phù hợp.
            </Text>
            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={16} lineHeight="19px">
                + Mỗi nhân viên được yêu cầu dành ít nhất 10% thời gian làm việc để học hỏi kiến thức mới, từ các tài
                liệu ngành, khóa học trực tuyến, hoặc buổi chia sẻ nội bộ.
                <br />+ Áp dụng KPI khuyến khích học tập như “10 sách hay nhất của năm,” nơi nhân viên cùng đọc và thảo
                luận để mở rộng tư duy.
              </Text>
            </Flex>

            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              <Text as="span" fontWeight={500} fontSize={16}>
                - Khuyến khích đổi mới trong sản phẩm và quy trình:
              </Text>
            </Text>
            <Flex pl={{ xs: '20px', lg: '40px' }} mt="8px">
              <Text fontWeight={400} fontSize={16} lineHeight="19px">
                + Giải thưởng sáng tạo: Công ty tổ chức các cuộc thi nội bộ nhằm khích lệ sự sáng tạo, với các phần
                thưởng hấp dẫn cho những ý tưởng được ứng dụng thực tiễn.
                <br />+ Không gian sáng tạo: Cung cấp không gian làm việc mở, linh hoạt, với bảng ý tưởng và khu vực
                trao đổi để nhân viên có thể thảo luận và sáng tạo bất cứ lúc nào. Hỗ trợ ngân sách để nhân viên thực
                hiện các dự án cá nhân có tiềm năng áp dụng vào công việc.
              </Text>
            </Flex>

            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              2.5. Chia sẻ giá trị và trách nhiệm xã hội
            </Text>
            {/* <AspectRatio ratio={16 / 9} w="full" mt="20px">
              <Image src="/images/culture-2-5.jpg" w="full" h="full" alt={IMG_ALT} />
            </AspectRatio> */}
            <Text fontWeight={400} fontSize={16} mt="12px">
              Xây dựng các chương trình kết nối với khách hàng, cộng đồng, góp phần nâng cao chất lượng ngành đồ uống.
            </Text>

            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              <Text as="span" fontWeight={500} fontSize={16}>
                - Kết nối cộng đồng:
              </Text>{' '}
              Diệp Trà tổ chức các chương trình hỗ trợ khách hàng và cộng đồng, như hội thảo chia sẻ kiến thức ngành đồ
              uống, chiến dịch nâng cao nhận thức về nguyên liệu chất lượng, và các sự kiện từ thiện.
            </Text>

            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              <Text as="span" fontWeight={500} fontSize={16}>
                - Chương trình kết nối cộng đồng:
              </Text>{' '}
              Phối hợp với các quán cà phê, trà sữa và doanh nghiệp nhỏ để tổ chức các hội thảo, workshop hàng tuần,
              hàng tháng nâng cao chất lượng đồ uống, đồng thời giới thiệu sản phẩm của Diệp Trà.
            </Text>

            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              <Text as="span" fontWeight={500} fontSize={16}>
                - Trách nhiệm xã hội:
              </Text>{' '}
              Công ty không chỉ tập trung vào kinh doanh mà còn cam kết đóng góp vào sự phát triển bền vững của xã hội
              thông qua các hoạt động thiện nguyện và các sáng kiến bảo vệ môi trường.
            </Text>

            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              2.6. Tổ chức team building dành cho CBNV Diệp Trà
            </Text>
            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              Sự kiện team building dành cho CBNV Diệp Trà là một hoạt động thường niên đầy ý nghĩa, luôn mang lại những
              trải nghiệm tuyệt vời và gắn kết mạnh mẽ các thành viên trong công ty. Hàng năm, Diệp Trà tổ chức team
              building tại những địa điểm mới, với những hoạt động ngoài trời đầy thử thách, từ các trò chơi vận động
              đến các bài tập nhóm sáng tạo, nhằm nâng cao tinh thần đồng đội và sự gắn kết giữa các CBNV.
              <br />
              <br />
              Năm 2023, sự kiện team building dành cho CBNV Diệp Trà tại Hạ Long thành công tốt đẹp, mang lại những trải
              nghiệm tuyệt vời và ý nghĩa. Các thành viên trong công ty đã cùng nhau tham gia vào các hoạt động ngoài
              trời đầy thử thách, từ những trò chơi vận động đến các bài tập nhóm, giúp tăng cường sự gắn kết và tinh
              thần đồng đội. Mỗi thử thách đều là cơ hội để các CBNV phát huy khả năng làm việc nhóm, cải thiện kỹ năng
              giao tiếp và giải quyết vấn đề. Sự kiện không chỉ giúp các thành viên thư giãn, giảm stress mà còn tạo ra
              những kỷ niệm đáng nhớ và củng cố thêm tình đoàn kết trong công ty.
              <br />
              <br />
              Hy vọng sau sự kiện, tất cả mọi người đều cảm thấy hứng khởi và tràn đầy năng lượng để tiếp tục công việc
              và cống hiến cho sự phát triển của Diệp Trà.
            </Text>
            <AspectRatio ratio={16 / 9} w="full" mt="20px">
              <Image src="/images/image-recruitment-1.png" w="full" h="full" alt={IMG_ALT} />
            </AspectRatio>

            <Text mt="20px" fontWeight={600} fontSize={18} lineHeight="19px">
              2.7. CBNV tham gia Triển lãm Quốc tế Vietfood & Beverage - Propack 2024
            </Text>
            <Text fontWeight={400} fontSize={16} lineHeight="19px" mt="12px">
              Cán bộ nhân viên Diệp Trà tham gia Triển lãm Quốc tế Vietfood & Beverage - Propack 2024, một sự kiện lớn
              trong ngành thực phẩm và đồ uống. Đây là cơ hội tuyệt vời để đội ngũ Diệp Trà không chỉ khám phá các sản
              phẩm, công nghệ mới mà còn giao lưu, học hỏi từ các thương hiệu lớn trong và ngoài nước. Các hoạt động tại
              triển lãm đã giúp các thành viên trong công ty mở rộng kiến thức, trau dồi kỹ năng và cập nhật những xu
              hướng mới nhất của ngành. Tham quan các gian hàng, trao đổi với đối tác và chuyên gia, đội ngũ Diệp Trà đã
              thu về những ý tưởng sáng tạo và chiến lược phát triển mới, sẵn sàng áp dụng vào công việc để nâng cao
              chất lượng và hiệu quả công ty trong thời gian tới. Sự kiện này không chỉ là cơ hội để học hỏi mà còn là
              bước đệm quan trọng trong quá trình phát triển nghề nghiệp của từng cá nhân.
            </Text>
            {/* <AspectRatio ratio={16 / 9} w="full" mt="20px">
              <Image src="/images/image-recruitment-1.png" w="full" h="full" alt={IMG_ALT} />
            </AspectRatio> */}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Culture;
