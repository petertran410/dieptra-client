import { getMetadata } from '../../../utils/helper-server';

export const metadata = getMetadata({
  title: 'Review - Đánh Giá Sản Phẩm',
  description:
    'Khách hàng Review, đánh giá sản phẩm thực tế về các nguyên liệu pha chế: syrup, topping, mứt, trà… Giúp bạn lựa chọn đúng sản phẩm ngon, dễ dùng, đáng mua. Có được trải nghiệm tốt.'
});

export default function ReviewDanhGiaSanPhamLayout({ children }) {
  return children;
}
