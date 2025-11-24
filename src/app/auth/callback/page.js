'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
          // Use the new auth service instead of direct cookie setting
          if (tokenParam) {
            // Set access token in memory
            const { setAccessToken } = await import('../../../services/auth.service');
            setAccessToken(tokenParam);
          }

          // Set user info in cookie using auth service method
          if (user) {
            const sanitizedUser = {
              client_id: user.client_id,
              full_name: (user.full_name || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
              email: (user.email || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
              phone: (user.phone || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
              detailed_address: (user.detailed_address || '').replace(
                /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                ''
              ),
              province: (user.province || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
              district: (user.district || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
              ward: (user.ward || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            };

            const Cookies = (await import('js-cookie')).default;
            const { CK_CLIENT_USER } = await import('../../../utils/const');

            Cookies.set(CK_CLIENT_USER, JSON.stringify(sanitizedUser), {
              expires: 7,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict'
            });
          }

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
