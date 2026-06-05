import { redirect } from 'next/navigation';

// ====== ĐÃ TẠM ẨN CHỨC NĂNG XÁC NHẬN ĐƠN COD ======
// Toàn bộ logic được giữ lại (comment) để có thể khôi phục sau.
// Hiện tại route này tự động chuyển hướng về trang chủ.
//
// import { Metadata } from 'next';
// import CODSuccessWrapper from './_components/cod-success-wrapper';
//
// export const metadata = {
//   title: 'Đơn hàng đã được tạo - Diệp Trà',
//   description: 'Xác nhận đơn hàng COD'
// };
//
// export default function CODSuccessPage() {
//   return <CODSuccessWrapper />;
// }

export default function CODSuccessPage() {
  redirect('/');
}
