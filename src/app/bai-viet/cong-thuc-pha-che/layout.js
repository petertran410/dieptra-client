import { getMetadata } from '../../../utils/helper-server';

export const metadata = getMetadata({
  title: 'Công Thức Pha Chế',
  description:
    'Tổng hợp Công thức pha chế: trà sữa, café, trà trái cây, đá xay dễ làm – dễ bán. Phù hợp cho người mới, quán nhỏ và chủ F&B cần sáng tạo thực đơn. Cập nhật kiến thức cần thiết trong lĩnh vực.'
});

export default function CongThucPhaCheLayout({ children }) {
  return children;
}
