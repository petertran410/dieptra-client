import { getMetadata } from '../../../utils/helper-server';

export const metadata = getMetadata({
  title: 'Kiến Thức Nguyên Liệu Pha Chế',
  description:
    'Kiến thức nguyên liệu pha chế là chuyên mục dành riêng cho những ai yêu thích và hoạt động trong lĩnh vực đồ uống, chủ quán café – trà sữa chuyên nghiệp. Diệp Trà sẽ cập nhật thông tin chi tiết và hữu ích về các loại nguyên liệu phổ biến như: Syrup, topping, mứt trái cây, bột, trà nguyên chất...'
});

export default function KienThucPhaCheLayout({ children }) {
  return children;
}
