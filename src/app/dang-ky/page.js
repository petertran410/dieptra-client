import { Suspense } from 'react';
import { getMetadata } from '../../utils/helper-server';
import RegisterWrapper from './_components/register-wrapper';

export const metadata = getMetadata({ title: 'Đăng ký tài khoản' });

const Register = () => {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <RegisterWrapper />
    </Suspense>
  );
};

export default Register;
