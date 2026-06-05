import { redirect } from 'next/navigation';

// ====== ĐÃ TẠM ẨN CHỨC NĂNG THANH TOÁN ======
// Toàn bộ logic thanh toán được giữ lại (comment) để có thể khôi phục sau.
// Hiện tại route này tự động chuyển hướng về trang chủ.
//
// import { getMetadata } from '../../utils/helper-server';
// import PaymentWrapper from './_components/payment-wrapper';
//
// export const metadata = getMetadata({ title: 'Thanh toán' });
//
// const Payment = () => {
//   return <PaymentWrapper />;
// };
//
// export default Payment;

const Payment = () => {
  redirect('/');
};

export default Payment;
