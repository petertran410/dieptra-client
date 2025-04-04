import SectionBlock from '@/components/section-block';
import { PX_ALL } from '@/utils/const';
import { getMetadata } from '@/utils/helper-server';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { Suspense } from 'react';
import HomeContact from '../(home)/_components/contact';
import Statistic from '../gioi-thieu/_components/statistic';
import CustomerItem from './_components/customer-item';
import VideoList from './_components/video-list';

export const metadata = getMetadata({ title: 'Khách hàng | Diệp Trà' });

const Customer = () => {
  const FEEDBACK_LIST = [
    {
      customer: 'Chị Kim Dung',
      position: 'Đại diện Nguyên liệu pha chế Hưng Sao Hà Đông',
      content:
        'Tôi vô cùng ấn tượng với sản phẩm Khoai Môn tươi Nghiền thuộc Dòng Sản phẩm Đông lạnh của Thương hiệu Gấu LerMao. Với vị ngọt, béo, ngậy, mình cảm thấy rất phù hợp với các món trà sữa, và tôi tin sẽ trở thành xu hướng mới trong mùa thu đông năm nay',
      image: '/images/feedback-1.png'
    },
    {
      customer: 'Chị Thùy Linh',
      position: 'Đại diện Nguyên liệu Pha chế Đức Linh Hà Đông',
      content:
        'Sản phẩm của thương hiệu Gấu LerMao vô cùng đa dạng, với các khẩu vị vô cùng mới lạ, tươi ngon, đặc biệt hấp dẫn”. Hiện nay thị trường Việt Nam có rất nhiều sản phẩm, tuy nhiên để được đa dạng và chất lượng như sản phẩm của công ty HI SWEETIE VIỆT NAM hiếm bên nào có thể làm được',
      image: '/images/feedback-2.png'
    },
    {
      customer: 'Anh Quyết',
      position: 'Founder Chuỗi Trà sữa Son La - Vùng di sản Trà Ô Long',
      content:
        'Sản phẩm có gần như 9 trên 10 mẫu mã mà doanh nghiệp em có thể ứng dụng được để cân nhắc thay thế các loại nguyên liệu đang dùng bây giờ. Sản phẩm thuộc thương hiệu Gấu LerMao của công ty hoàn toàn đáp ứng được mọi nhu cầu và xu hướng hot hiện nay',
      image: '/images/feedback-3.png'
    },
    {
      customer: 'Anh Đông',
      position: 'Đại diện BID Cần Thơ',
      content:
        'Khách hàng đều phản hồi rất tích cực về sản phẩm Lermao và trà Phượng Hoàng. Khi khách hàng hài lòng, BID cũng cảm thấy hoàn toàn tin tưởng vào chất lượng sản phẩm. Cảm ơn Diệp Trà đã mang đến những hương vị thơm ngon, chất lượng cho người tiêu dùng Việt Nam. Hy vọng trong năm 2025, Diệp Trà sẽ tiếp tục ra mắt nhiều sản phẩm mứt và trà mới, góp phần làm phong phú thêm thị trường',
      image: '/images/feedback-4.jpg'
    }
  ];

  return (
    <Flex direction="column" pt={{ xs: '70px', lg: '162px' }}>
      <Statistic mt={0} />

      <Suspense>
        <VideoList />
      </Suspense>
      <Flex direction="column" gap="24px" mt={{ xs: '32px', lg: '48px' }} px={PX_ALL}>
        <SectionBlock title="Phản hồi của khách hàng" />

        <Grid
          templateColumns={{ xs: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={{ xs: '16px', lg: '24px' }}
        >
          {FEEDBACK_LIST.map((item, index) => {
            return (
              <GridItem key={index}>
                <CustomerItem item={item} />
              </GridItem>
            );
          })}
        </Grid>
      </Flex>

      <Box mt="48px">
        <HomeContact />
      </Box>
    </Flex>
  );
};

export default Customer;
