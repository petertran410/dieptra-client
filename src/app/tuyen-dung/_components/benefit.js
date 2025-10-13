import { IMG_ALT, PX_ALL } from '@/utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const Benefit = () => {
  return (
    <Box mt={{ xs: '40px', lg: '48px' }}>
      <Text px={PX_ALL} fontWeight={500} fontSize={24} textAlign="center">
        CÁC HOẠT ĐỘNG NỔI BẬT
      </Text>
      <Flex mt={{ xs: '16px', lg: '24px' }} direction={{ xs: 'column', lg: 'row' }} gap={{ xs: '16px', lg: 0 }}>
        <Flex w={{ xs: 'full', lg: '50%' }} h={{ xs: '200px', lg: 'auto' }}>
          <Image fit="cover" w="full" h="full" src="/images/image-recruitment-1.webp" alt={IMG_ALT} />
        </Flex>
        <Flex
          w={{ xs: 'full', lg: '50%' }}
          direction="column"
          gap="12px"
          pl={{ xs: '16px', md: '25px', lg: '64px' }}
          pr={{ xs: '16px', md: '25px', lg: '120px' }}
          justify="center"
        >
          <Text textTransform="uppercase" fontWeight={600} fontSize={24} lineHeight="30px">
            TỔ CHỨC TEAM BUILDING DÀNH CHO CBNV{' '}
            <Text as="span" textTransform="uppercase" fontWeight={600} fontSize={24} color="#1E96BC">
              Diệp Trà
            </Text>
          </Text>
          <Text fontSize={18} lineHeight="20px">
            Sự kiện team building dành cho CBNV Diệp Trà là một hoạt động thường niên đầy ý nghĩa, luôn mang lại những
            trải nghiệm tuyệt vời và gắn kết mạnh mẽ các thành viên trong công ty. Hàng năm, Diệp Trà tổ chức team
            building tại những địa điểm mới, với những hoạt động ngoài trời đầy thử thách, từ các trò chơi vận động đến
            các bài tập nhóm sáng tạo, nhằm nâng cao tinh thần đồng đội và sự gắn kết giữa các CBNV.
            <br />
            <br />
            Năm 2023, sự kiện team building dành cho CBNV Diệp Trà tại Hạ Long thành công tốt đẹp, mang lại những trải
            nghiệm tuyệt vời và ý nghĩa. Các thành viên trong công ty đã cùng nhau tham gia vào các hoạt động ngoài trời
            đầy thử thách, từ những trò chơi vận động đến các bài tập nhóm, giúp tăng cường sự gắn kết và tinh thần đồng
            đội. Mỗi thử thách đều là cơ hội để các CBNV phát huy khả năng làm việc nhóm, cải thiện kỹ năng giao tiếp và
            giải quyết vấn đề. Sự kiện không chỉ giúp các thành viên thư giãn, giảm stress mà còn tạo ra những kỷ niệm
            đáng nhớ và củng cố thêm tình đoàn kết trong công ty.  Hy vọng sau sự kiện, tất cả mọi người đều cảm thấy
            hứng khởi và tràn đầy năng lượng để tiếp tục công việc và cống hiến cho sự phát triển của Diệp Trà.
          </Text>
        </Flex>
      </Flex>
      <Flex mt={{ xs: '16px', lg: '24px' }} direction={{ xs: 'column', lg: 'row' }} gap={{ xs: '16px', lg: 0 }}>
        <Flex
          w={{ xs: 'full', lg: '50%' }}
          direction="column"
          gap="12px"
          pr={{ xs: '16px', md: '25px', lg: '64px' }}
          pl={{ xs: '16px', md: '25px', lg: '120px' }}
          justify="center"
        >
          <Text fontWeight={600} lineHeight="30px" fontSize={24}>
            CBNV tham gia Triển lãm Quốc tế Vietfood & Beverage - Propack 2024
          </Text>
          <Text fontSize={18} lineHeight="20px">
            Cán bộ nhân viên Diệp Trà tham gia Triển lãm Quốc tế Vietfood & Beverage - Propack 2024, một sự kiện lớn
            trong ngành thực phẩm và đồ uống. Đây là cơ hội tuyệt vời để đội ngũ Diệp Trà không chỉ khám phá các sản
            phẩm, công nghệ mới mà còn giao lưu, học hỏi từ các thương hiệu lớn trong và ngoài nước. Các hoạt động tại
            triển lãm đã giúp các thành viên trong công ty mở rộng kiến thức, trau dồi kỹ năng và cập nhật những xu
            hướng mới nhất của ngành. Tham quan các gian hàng, trao đổi với đối tác và chuyên gia, đội ngũ Diệp Trà đã
            thu về những ý tưởng sáng tạo và chiến lược phát triển mới, sẵn sàng áp dụng vào công việc để nâng cao chất
            lượng và hiệu quả công ty trong thời gian tới. Sự kiện này không chỉ là cơ hội để học hỏi mà còn là bước đệm
            quan trọng trong quá trình phát triển nghề nghiệp của từng cá nhân.
          </Text>
        </Flex>
        <Flex w={{ xs: 'full', lg: '50%' }} h={{ xs: '200px', lg: 'auto' }}>
          <Image fit="cover" w="full" h="full" src="/images/image-recruitment-1.webp" alt={IMG_ALT} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Benefit;
