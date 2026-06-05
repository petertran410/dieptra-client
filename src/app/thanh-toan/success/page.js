import { redirect } from 'next/navigation';

// ====== ĐÃ TẠM ẨN CHỨC NĂNG THANH TOÁN THÀNH CÔNG ======
// Toàn bộ logic được giữ lại (comment) để có thể khôi phục sau.
// Hiện tại route này tự động chuyển hướng về trang chủ.
//
// import { getMetadata } from '../../../utils/helper-server';
// import PaymentSuccessWrapper from './_components/payment-success-wrapper';
//
// export const metadata = getMetadata({ title: 'Thanh toán thành công' });
//
// const PaymentSuccess = () => {
//   return <PaymentSuccessWrapper />;
// };
//
// export default PaymentSuccess;

const PaymentSuccess = () => {
  redirect('/');
};

export default PaymentSuccess;
