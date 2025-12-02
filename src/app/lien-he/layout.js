import { getMetadata } from '../../utils/helper-server';

export const metadata = getMetadata({
  title: 'Nhận Tư Vấn Chuyên Sâu | Liên Hệ Ngay Diệp Trà',
  description:
    'Hãy liên hệ ngay với chúng tôi để nhận được giải pháp tối ưu, phù hợp nhất với nhu cầu của bạn. Với đội ngũ chuyên viên giàu kinh nghiệm, tận tâm và am hiểu sâu sắc thị trường, chúng tôi cam kết mang đến cho bạn sự hỗ trợ chuyên nghiệp, hiệu quả nhất.'
});

export default function ContactLayout({ children }) {
  return children;
}
