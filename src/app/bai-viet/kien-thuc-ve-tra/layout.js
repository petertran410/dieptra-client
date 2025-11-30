import { getMetadata } from '../../../utils/helper-server';

export const metadata = getMetadata({
  title: 'Kiến Thức Về Trà',
  description:
    'Tổng hợp Kiến thức về trà: các loại trà phổ biến, cách ủ và kết hợp trà trong pha chế đồ uống ngon và chuẩn vị. Hữu ích cho những người mới và chủ quán chuyên nghiệp.'
});

export default function KienThucVeTraLayout({ children }) {
  return children;
}
