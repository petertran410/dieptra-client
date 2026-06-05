import { redirect } from 'next/navigation';

// ====== ĐÃ TẠM ẨN CHỨC NĂNG ĐĂNG NHẬP ======
// Toàn bộ logic đăng nhập được giữ lại (comment) để có thể khôi phục sau.
// Hiện tại route này tự động chuyển hướng về trang chủ.
//
// import { Suspense } from 'react';
// import { getMetadata } from '../../utils/helper-server';
// import LoginWrapper from './_components/login-wrapper';
//
// export const metadata = getMetadata({ title: 'Đăng nhập tài khoản' });
//
// const Login = () => {
//   return (
//     <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
//       <LoginWrapper />
//     </Suspense>
//   );
// };
//
// export default Login;

const Login = () => {
  redirect('/');
};

export default Login;
