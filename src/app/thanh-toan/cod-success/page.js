import { Metadata } from 'next';
import CODSuccessWrapper from './_components/cod-success-wrapper';

export const metadata = {
  title: 'Đơn hàng đã được tạo - Diệp Trà',
  description: 'Xác nhận đơn hàng COD'
};

export default function CODSuccessPage() {
  return <CODSuccessWrapper />;
}
