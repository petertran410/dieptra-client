import { Suspense } from 'react';
import { getMetadata } from '../../utils/helper-server';
import LoginWrapper from './_components/login-wrapper';

export const metadata = getMetadata({ title: 'Đăng nhập tài khoản' });

const Login = () => {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <LoginWrapper />
    </Suspense>
  );
};

export default Login;
