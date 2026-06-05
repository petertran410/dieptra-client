import { redirect } from 'next/navigation';

// ====== ĐÃ TẠM ẨN CHỨC NĂNG CALLBACK ĐĂNG NHẬP ======
// Toàn bộ logic xử lý OAuth callback được giữ lại (comment) để có thể khôi phục sau.
// Hiện tại route này tự động chuyển hướng về trang chủ.
//
// 'use client';
//
// import { useEffect, useState, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import PhoneModal from './_components/phone-modal';
//
// function AuthCallbackContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [showPhoneModal, setShowPhoneModal] = useState(false);
//   const [tempToken, setTempToken] = useState('');
//   const [tempKey, setTempKey] = useState('');
//
//   useEffect(() => {
//     const handleCallback = async () => {
//       try {
//         const tokenParam = searchParams.get('token');
//         const userParam = searchParams.get('user');
//         const needsPhone = searchParams.get('needs_phone');
//         const isTemp = searchParams.get('is_temp');
//         const tempKeyParam = searchParams.get('temp_key');
//
//         if (!tokenParam || !userParam) {
//           router.push('/dang-nhap');
//           return;
//         }
//
//         ... (phần xử lý token/cookie/redirect giữ nguyên trong lịch sử git)
//       } catch (error) {
//         console.error('OAuth callback error:', error);
//         router.push('/dang-nhap');
//       }
//     };
//
//     handleCallback();
//   }, [searchParams, router]);
//
//   ... (phần render PhoneModal giữ nguyên trong lịch sử git)
// }
//
// export default function AuthCallback() {
//   return (
//     <Suspense fallback={<div>Đang xử lý đăng nhập...</div>}>
//       <AuthCallbackContent />
//     </Suspense>
//   );
// }

export default function AuthCallback() {
  redirect('/');
}
