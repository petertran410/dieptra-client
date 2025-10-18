'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { CK_CLIENT_TOKEN, CK_CLIENT_USER } from '../../../utils/const';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');

        if (!token || !userParam) {
          router.push('/dang-nhap');
          return;
        }

        const user = JSON.parse(decodeURIComponent(userParam));

        Cookies.set(CK_CLIENT_TOKEN, token, { expires: 7 });
        Cookies.set(CK_CLIENT_USER, JSON.stringify(user), { expires: 7 });

        await new Promise((resolve) => setTimeout(resolve, 100));

        router.push('/');
      } catch (error) {
        console.error('OAuth callback error:', error);
        router.push('/dang-nhap');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (isProcessing) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Đang xử lý đăng nhập...
      </div>
    );
  }

  return null;
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
