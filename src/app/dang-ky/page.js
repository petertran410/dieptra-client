import { redirect } from 'next/navigation';

// ====== ĐÃ TẠM ẨN CHỨC NĂNG ĐĂNG KÝ ======
// Toàn bộ logic đăng ký được giữ lại (comment) để có thể khôi phục sau.
// Hiện tại route này tự động chuyển hướng về trang chủ.
//
// import { Suspense } from 'react';
// import { getMetadata } from '../../utils/helper-server';
// import RegisterWrapper from './_components/register-wrapper';
//
// export const metadata = getMetadata({ title: 'Đăng ký tài khoản' });
//
// const Register = () => {
//   return (
//     <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
//       <RegisterWrapper />
//     </Suspense>
//   );
// };
//
// export default Register;

const Register = () => {
  redirect('/');
};

export default Register;
