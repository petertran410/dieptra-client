import { redirect } from 'next/navigation';

// ====== ĐÃ TẠM ẨN CHỨC NĂNG THEO DÕI ĐƠN HÀNG ======
// Toàn bộ logic theo dõi đơn hàng được giữ lại (comment) để có thể khôi phục sau.
// Hiện tại route này tự động chuyển hướng về trang chủ.
//
// 'use client';
//
// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import {
//   Box,
//   Container,
//   VStack,
//   HStack,
//   Text,
//   Spinner,
//   Button,
//   Divider,
//   Image,
//   Card,
//   CardBody
// } from '@chakra-ui/react';
// import { ArrowBackIcon } from '@chakra-ui/icons';
// import { profileService } from '../../../../services/profile.service';
// import { useTranslation } from '../../../../hooks/useTranslation';
//
// const OrderTrackingPage = () => {
//   const { orderId } = useParams();
//   const router = useRouter();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { t, getLocalizedText } = useTranslation();
//
//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await profileService.getOrderDetail(orderId);
//         setOrder(response);
//       } catch (error) {
//         console.error('Error fetching order:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchOrder();
//     const interval = setInterval(fetchOrder, 5000);
//     return () => clearInterval(interval);
//   }, [orderId]);
//
//   ... (phần render giữ nguyên trong lịch sử git)
// };
//
// export default OrderTrackingPage;

const OrderTrackingPage = () => {
  redirect('/');
};

export default OrderTrackingPage;
