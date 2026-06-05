import { redirect } from 'next/navigation';

// ====== ĐÃ TẠM ẨN CHỨC NĂNG QUÊN MẬT KHẨU ======
// Toàn bộ logic quên mật khẩu được giữ lại (comment) để có thể khôi phục sau.
// Hiện tại route này tự động chuyển hướng về trang chủ.
//
// import { Suspense } from 'react';
// import { getMetadata } from '../../utils/helper-server';
// import ForgotPasswordWrapper from './_components/forgot-password-wrapper';
//
// export const metadata = getMetadata({ title: 'Quên mật khẩu' });
//
// const ForgotPassword = () => {
//   return (
//     <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
//       <ForgotPasswordWrapper />
//     </Suspense>
//   );
// };
//
// export default ForgotPassword;

const ForgotPassword = () => {
  redirect('/');
};

export default ForgotPassword;
