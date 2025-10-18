'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { CK_CLIENT_TOKEN, CK_CLIENT_USER } from '@/utils/const';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const user = searchParams.get('user');

    if (token && user) {
      Cookies.set(CK_CLIENT_TOKEN, token, { expires: 7 });
      Cookies.set(CK_CLIENT_USER, user, { expires: 7 });
      router.push('/');
    } else {
      router.push('/dang-nhap');
    }
  }, [searchParams, router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Đang xử lý đăng nhập...
    </div>
  );
}
