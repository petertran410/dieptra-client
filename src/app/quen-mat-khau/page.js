import { Suspense } from 'react';
import { getMetadata } from '../../utils/helper-server';
import ForgotPasswordWrapper from './_components/forgot-password-wrapper';

export const metadata = getMetadata({ title: 'Quên mật khẩu' });

const ForgotPassword = () => {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <ForgotPasswordWrapper />
    </Suspense>
  );
};

export default ForgotPassword;
