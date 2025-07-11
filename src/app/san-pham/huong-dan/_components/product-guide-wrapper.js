'use client';

import { PX_ALL } from '../../../../utils/const';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Link,
  Text
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const ProductGuide = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const GUIDE_LIST = [
    {
      title: 'Hướng dẫn mua hàng',
      type: 'guide-buy',
      content: (
        <Box fontSize={16}>
          Quý khách hàng của DIỆP TRÀ có thể hoàn toàn mua hàng một cách nhanh chóng thông qua ít nhất 4 lựa chọn sau:
          <Text fontWeight={500} fontSize={16}>
            1. Website
          </Text>
          <Box pl="10px" fontSize={16}>
            Để mua hàng trên website, quý khách hàng vui lòng làm theo các bước sau:
            <Text fontWeight={500} fontSize={16}>
              • Bước 1: Truy cập vào website:{' '}
              <Link href="https://dieptra.com" target="_blank" fontSize={16}>
                https://dieptra.com
              </Link>
            </Text>
            <Text fontWeight={500} fontSize={16}>
              • Bước 2: Lựa Chọn Sản Phẩm:{' '}
              <Text fontSize={16} fontWeight={400} as="span">
                Truy cập vào danh mục sản phẩm trên website và lựa chọn sản phẩm bạn quan tâm.
              </Text>
            </Text>
            <Text fontWeight={500} fontSize={16}>
              • Bước 3: Thêm Vào Giỏ Hàng:{' '}
              <Text fontSize={16} fontWeight={400} as="span">
                Sau khi lựa chọn sản phẩm, nhấn vào nút {`"Thêm vào giỏ hàng"`} để tiến hành đặt hàng. Bạn có thể điều
                chỉnh số lượng theo nhu cầu.
              </Text>
            </Text>
            <Text fontWeight={500} fontSize={16}>
              • Bước 4: Kiểm Tra Giỏ Hàng:{' '}
              <Text fontSize={16} fontWeight={400} as="span">
                Vào giỏ hàng để kiểm tra danh sách sản phẩm đã chọn. Tại đây, bạn có thể thay đổi số lượng hoặc xóa sản
                phẩm nếu cần thiết.
              </Text>
            </Text>
            <Text fontWeight={500} fontSize={16}>
              • Bước 5: Tiến Hành Đặt Hàng:{' '}
              <Text fontSize={16} fontWeight={400} as="span">
                Nhấn vào nút {`"Thanh toán"`} để bắt đầu quá trình đặt hàng. Điền thông tin giao hàng và chọn phương
                thức giao nhận phù hợp.
              </Text>
            </Text>
          </Box>
          <Text fontWeight={500} fontSize={16}>
            2. Liên hệ Hotline
          </Text>
          <Box pl="10px" fontSize={16}>
            Quý Khách hàng/ Đối tác có thể liên hệ chúng tôi theo Hotline dưới đây để được phục vụ tận tình và chu đáo:
            <br />
            <Text fontWeight={500} fontSize={16}>
              Công ty TNHH XNK Hi Sweetie Việt Nam
            </Text>
            <Text fontWeight={500} fontSize={16}>
              Địa chỉ:
            </Text>
            • Hà Nội: BTT10-4 thuộc dự án Him Lam Vạn Phúc, đường Tố Hữu, Phường Vạn Phúc, Quận Hà Đông, Thành phố Hà
            Nội. <br />
            • TP HCM: Số 42 Đường số 7, Phường 10, Quận Tân Bình, Thành phố Hồ Chí Minh <br />
            <Text fontWeight={500} fontSize={16}>
              Hotline/Zalo: 0788339379
            </Text>
          </Box>
          <Text fontWeight={500} fontSize={16}>
            3. Liên hệ qua Mạng xã hội
          </Text>
          <Box pl="10px" fontSize={16}>
            <Text fontWeight={500} fontSize={16}>
              Facebook:
            </Text>
            <Link fontSize={16} target="_blank" href="https://www.facebook.com/dieptra.0788339379">
              https://www.facebook.com/dieptra.0788339379
            </Link>
            <br />
            <Link fontSize={16} target="_blank" href="https://www.facebook.com/lermao.sanhannhugau">
              https://www.facebook.com/lermao.sanhannhugau
            </Link>
            <br />
            <Link fontSize={16} target="_blank" href="https://www.facebook.com/profile.php?id=61560842225802">
              https://www.facebook.com/profile.php?id=61560842225802
            </Link>
            <br />
            <Text fontWeight={500} fontSize={16}>
              Mini App Zalo:
            </Text>{' '}
            Gấu LerMao - Giải pháp toàn diện số 1 Việt Nam <br />
            <Link fontSize={16} target="_blank" href="https://zalo.me/s/1428308065058357450">
              https://zalo.me/s/1428308065058357450
            </Link>
          </Box>
        </Box>
      )
    },
    {
      title: 'Hướng dẫn thanh toán',
      type: 'guide-payment',
      content: (
        <Box fontSize={16}>
          <Text fontWeight={500} fontSize={16}>
            Phương Thức Thanh Toán:{' '}
            <Text as="span" fontSize={16}>
              Diệp Trà hỗ trợ nhiều phương thức thanh toán linh hoạt, bao gồm:
            </Text>
          </Text>{' '}
          <Text fontWeight={500} fontSize={16}>
            • Thanh Toán Chuyển Khoản:{' '}
          </Text>
          Bạn có thể chuyển khoản trực tiếp vào tài khoản ngân hàng của Diệp Trà. Thông tin tài khoản sẽ được cung cấp
          trong quá trình thanh toán.
          <Text fontWeight={500} fontSize={16}>
            • Thanh Toán COD (Cash On Delivery):
          </Text>{' '}
          Thanh toán khi nhận hàng, áp dụng cho các khu vực nội thành, ngoại thành với đơn hàng nhỏ hơn 1.000.000 VND.
          <Text fontWeight={500} fontSize={16}>
            Xác Nhận Đơn Hàng:{' '}
            <Text as="span" fontSize={16}>
              Sau khi hoàn tất quá trình thanh toán, bạn sẽ nhận được email hoặc tin nhắn xác nhận đơn hàng từ Diệp Trà.
              Đơn hàng sẽ được xử lý và giao hàng theo thông tin bạn đã cung cấp.
            </Text>
          </Text>
        </Box>
      )
    },
    {
      title: 'Chính sách giao hàng',
      type: 'guide-shipping',
      content: (
        <Box fontSize={16}>
          <Text fontWeight={500} fontSize={16}>
            Thời Gian Giao Hàng:{' '}
            <Text as="span" fontSize={16}>
              Thời gian giao hàng từ 2-5 ngày làm việc, tùy thuộc vào địa điểm giao nhận.
            </Text>
          </Text>
          <Text fontWeight={500} fontSize={16}>
            Phí Vận Chuyển:{' '}
            <Text as="span" fontSize={16}>
              Phí vận chuyển sẽ được tính toán và hiển thị trong quá trình đặt hàng, tùy thuộc vào khoảng cách và phương
              thức giao nhận.
            </Text>
          </Text>

          <Text fontWeight={500} fontSize={16}>
            Hỗ Trợ Khách Hàng
          </Text>
          <Text fontWeight={500} fontSize={16}>
            Liên Hệ Hỗ Trợ:{' '}
            <Text as="span" fontSize={16}>
              Nếu bạn gặp bất kỳ vấn đề gì trong quá trình mua hàng hoặc thanh toán, vui lòng liên hệ với bộ phận chăm
              sóc khách hàng của Diệp Trà qua số điện thoại hoặc email được cung cấp trên website, ưu tiên hỗ trợ kênh
              trực tiếp. Thông tin liên hệ chi tiết{' '}
              <Link
                href="https://www.facebook.com/dieptra.0788339379"
                target="_blank"
                color="main.1"
                fontWeight={500}
                fontSize={16}
              >
                tại đây
              </Link>
              .
            </Text>
          </Text>
        </Box>
      )
    },
    {
      title: 'Quy trình đổi trả & bảo hành',
      type: 'guide-return',
      content: (
        <Box fontSize={16}>
          <Text fontWeight={500} fontSize={16}>
            1. Mục Đích:{' '}
          </Text>
          <Text fontSize={16} pl="10px">
            Chính sách này nhằm bảo đảm quyền lợi của khách hàng khi nhận hàng hóa bị lỗi và tạo điều kiện thuận lợi cho
            việc hoàn trả hoặc thay thế sản phẩm không đạt tiêu chuẩn chất lượng.{' '}
          </Text>
          <Text fontWeight={500} fontSize={16}>
            2. Điều Kiện Hoàn Hàng:
          </Text>
          <Box pl="10px" fontSize={16}>
            <Text fontWeight={500} fontSize={16}>
              • Thời Gian Yêu Cầu Hoàn Hàng:{' '}
            </Text>
            Khách hàng có quyền yêu cầu hoàn hàng trong vòng 30 ngày kể từ ngày nhận hàng.
            <Text fontWeight={500} fontSize={16}>
              • Tình Trạng Sản Phẩm:{' '}
            </Text>
            Sản phẩm phải được yêu cầu trả lại do sai sót sản xuất hoặc hư hỏng trong quá trình vận chuyển. Sản phẩm
            phải còn nguyên bao bì, tem mác và chưa qua sử dụng.{' '}
            <Text fontWeight={500} fontSize={16}>
              • Hạn Sử Dụng:{' '}
            </Text>
            Sản phẩm phải còn ít nhất một nửa hạn sử dụng từ thời điểm yêu cầu hoàn trả. Sản phẩm còn hạn sử dụng ít hơn
            thời gian trên sẽ không được chấp nhận hoàn trả.{' '}
          </Box>
          <Text fontWeight={500} fontSize={16}>
            3. Quy Trình Hoàn Hàng:{' '}
          </Text>
          <Box pl="10px" fontSize={16}>
            <Text fontWeight={500} fontSize={16}>
              • Bước 1: Thông Báo Lỗi
            </Text>{' '}
            Khách hàng thông báo lỗi qua Zalo, email hoặc điện thoại trong vòng 7 ngày kể từ ngày nhận hàng tại đây.
            Cung cấp thông tin đơn hàng, hình ảnh sản phẩm lỗi và mô tả chi tiết về vấn đề gặp phải.{' '}
            <Text fontWeight={500} fontSize={16}>
              • Bước 2: Xác Nhận Yêu Cầu
            </Text>{' '}
            Công ty sẽ xác nhận yêu cầu hoàn trả và gửi hướng dẫn chi tiết để khách hàng gửi lại sản phẩm lỗi.{' '}
            <Text fontWeight={500} fontSize={16}>
              • Bước 3: Gửi Sản Phẩm Hoàn Trả{' '}
            </Text>
            Khách hàng gửi lại sản phẩm lỗi theo hướng dẫn. Chi phí vận chuyển cho việc gửi lại sản phẩm lỗi sẽ do công
            ty chi trả.{' '}
            <Text fontWeight={500} fontSize={16}>
              • Bước 4: Kiểm Tra Sản Phẩm
            </Text>{' '}
            Công ty sẽ kiểm tra sản phẩm lỗi khi nhận lại. Nếu sản phẩm lỗi được xác nhận, công ty sẽ thực hiện việc
            hoàn tiền hoặc thay thế sản phẩm theo yêu cầu của khách hàng.{' '}
          </Box>
          <Text fontWeight={500} fontSize={16}>
            4. Hoàn Tiền Hoặc Thay Thế:{' '}
          </Text>
          <Box pl="10px" fontSize={16}>
            <Text fontWeight={500} fontSize={16}>
              Hoàn Tiền:{' '}
            </Text>
            Nếu khách hàng yêu cầu hoàn tiền, công ty sẽ thực hiện hoàn tiền trong vòng 7-10 ngày làm việc sau khi sản
            phẩm lỗi được xác nhận. <Text fontWeight={500} fontSize={16}></Text>Thay Thế Sản Phẩm: Nếu khách hàng yêu
            cầu thay thế sản phẩm, công ty sẽ gửi sản phẩm thay thế miễn phí trong vòng 7-10 ngày làm việc. Chi phí vận
            chuyển cho sản phẩm thay thế cũng sẽ do công ty chi trả.{' '}
          </Box>
          <Text fontWeight={500} fontSize={16}>
            5. Các Điều Khoản Không Đủ Điều Kiện Hoàn Hàng:{' '}
          </Text>
          <Box pl="10px" fontSize={16}>
            Sản phẩm không đủ điều kiện: Sản phẩm đã qua sử dụng, không còn bao bì hoặc tem mác, sản phẩm hết hạn sử
            dụng không được chấp nhận hoàn trả. Chi phí vận chuyển: Trường hợp sản phẩm hoàn trả không thuộc trường hợp
            lỗi hoặc vi phạm chính sách, khách hàng sẽ phải chịu chi phí vận chuyển.{' '}
          </Box>
          <Box pl="10px" fontSize={16}>
            <Text fontWeight={500} fontSize={16}>
              6. Liên Hệ:{' '}
            </Text>
            <Text fontWeight={500} fontSize={16}>
              Hỗ Trợ Khách Hàng:{' '}
            </Text>
            Số điện thoại: Ms Thanh 0788339379 Email: hisweetievietnam@gmail.com Nếu khách hàng có thắc mắc liên quan
            đến việc đổi trả, họ có thể liên hệ với bộ phận kinh doanh của công ty để được hỗ trợ thêm thông tin về
            chính sách hoàn hàng và quy trình thực hiện.
          </Box>
        </Box>
      )
    }
  ];

  const defaultIndex = GUIDE_LIST.findIndex((i) => i.type === type);

  return (
    <Flex direction="column" px={PX_ALL} pt={{ xs: '70px', lg: '162px' }} gap="24px">
      <Text as="h1" textAlign="center" textTransform="uppercase" fontSize={24} fontWeight={500}>
        Hướng dẫn chung
      </Text>

      <Box>
        <Accordion allowMultiple defaultIndex={typeof defaultIndex !== 'undefined' ? [defaultIndex] : undefined}>
          {GUIDE_LIST.map((item, index) => {
            return (
              <AccordionItem borderTop={0} borderBottom="1px solid #F4F4F5" key={index}>
                <h2>
                  <AccordionButton
                    mt="16px"
                    pl={0}
                    pr="16px"
                    py={0}
                    h="56px"
                    _hover={{ bgColor: 'transparent' }}
                    _active={{ bgColor: 'transparent' }}
                  >
                    <Box fontSize={16} fontWeight={500} as="span" flex="1" textAlign="left">
                      {item.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel p={0} pr={{ xs: '8px', lg: '32px' }} pb="8px" fontSize={16}>
                  {item.content}
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
    </Flex>
  );
};

const ProductGuideWrap = () => {
  return (
    <Suspense>
      <ProductGuide />
    </Suspense>
  );
};

export default ProductGuideWrap;
