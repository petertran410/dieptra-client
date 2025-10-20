'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { CK_CLIENT_TOKEN, CK_CLIENT_USER } from '../../../utils/const';
import PhoneModal from './_components/phone-modal';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const tokenParam = searchParams.get('token');
        const userParam = searchParams.get('user');
        const needsPhone = searchParams.get('needs_phone');

        if (!tokenParam || !userParam) {
          router.push('/dang-nhap');
          return;
        }

        const user = JSON.parse(decodeURIComponent(userParam));

        Cookies.set(CK_CLIENT_TOKEN, tokenParam, { expires: 7 });
        Cookies.set(CK_CLIENT_USER, JSON.stringify(user), { expires: 7 });

        if (needsPhone === 'true') {
          setToken(tokenParam);
          setShowPhoneModal(true);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 100));
          router.push('/');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        router.push('/dang-nhap');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  const handlePhoneSubmitted = () => {
    setShowPhoneModal(false);
    router.push('/');
  };

  if (showPhoneModal) {
    return <PhoneModal token={token} onSuccess={handlePhoneSubmitted} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Đang xử lý đăng nhập...
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Đang xử lý đăng nhập...
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
