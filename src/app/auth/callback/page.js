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
  const [tempToken, setTempToken] = useState('');
  const [tempKey, setTempKey] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const tokenParam = searchParams.get('token');
        const userParam = searchParams.get('user');
        const needsPhone = searchParams.get('needs_phone');
        const isTemp = searchParams.get('is_temp');
        const tempKeyParam = searchParams.get('temp_key');

        if (!tokenParam || !userParam) {
          router.push('/dang-nhap');
          return;
        }

        const user = JSON.parse(decodeURIComponent(userParam));

        if (needsPhone === 'true' && isTemp === 'true' && tempKeyParam) {
          setTempToken(tokenParam);
          setTempKey(tempKeyParam);
          setShowPhoneModal(true);
        } else {
          Cookies.set(CK_CLIENT_TOKEN, tokenParam, { expires: 7 });
          Cookies.set(CK_CLIENT_USER, JSON.stringify(user), { expires: 7 });

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
    return <PhoneModal tempToken={tempToken} tempKey={tempKey} onSuccess={handlePhoneSubmitted} />;
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
