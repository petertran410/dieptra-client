import { getMetadata } from '../../../utils/helper-server';

export const metadata = getMetadata({
  title: 'Tin Tức Diệp Trà',
  description:
    'Đón đầu xu hướng F&B! Xem ngay tin tức thị trường pha chế, phân tích chuyên sâu và lịch Workshop sắp tới của Diệp Trà để nâng cao kiến thức kinh doanh, tiếp cận nguồn nguyên liệu mới.'
});

export default function TinTucLayout({ children }) {
  return children;
}
