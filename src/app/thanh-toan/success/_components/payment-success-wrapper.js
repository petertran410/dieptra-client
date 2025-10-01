'use client';

import { useQueryPaymentStatus } from '../../../../services/payment.service';
import { cartAtom } from '../../../../states/common';
import { PX_ALL } from '../../../../utils/const';
import { showToast } from '../../../../utils/helper';
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Image,
  Divider,
  Badge,
  Card,
  CardBody,
  CardHeader
} from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { useRecoilState } from 'recoil';

const PaymentSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cart, setCart] = useRecoilState(cartAtom);

  const orderId = searchParams.get('orderId');
  const transactionId = searchParams.get('transactionId');
  const transactionDate = searchParams.get('transactionDate');
  const accountNumber = searchParams.get('accountNumber');
  const content = searchParams.get('content');
  const status = searchParams.get('status');

  const [isClient, setIsClient] = useState(false);
  const [cartCleared, setCartCleared] = useState(false);

  const { data: paymentStatus, isLoading, refetch } = useQueryPaymentStatus(orderId, !!orderId);

  useEffect(() => {
    if (paymentStatus?.status === 'SUCCESS' && !cartCleared) {
      setCart([]);
      setCartCleared(true);
      showToast({
        status: 'success',
        content: 'Thanh toán thành công! Giỏ hàng đã được xóa.'
      });
    }
  }, [paymentStatus, cart, setCart, cartCleared]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !orderId) {
      showToast({
        status: 'error',
        content: 'Không tìm thấy thông tin đơn hàng. Chuyển về trang chủ...'
      });
      setTimeout(() => router.push('/'), 3000);
    }
  }, [isClient, orderId, router]);

  if (!isClient) {
    return null;
  }

  if (!orderId) {
    return (
      <Flex justify="center" align="center" minH="60vh" direction="column">
        <Alert status="error" borderRadius="md" maxW="500px">
          <AlertIcon />
          <Box>
            <AlertTitle>Lỗi!</AlertTitle>
            <AlertDescription>Không tìm thấy thông tin đơn hàng. Đang chuyển về trang chủ...</AlertDescription>
          </Box>
        </Alert>
      </Flex>
    );
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="60vh" direction="column">
        <Spinner size="xl" color="blue.500" mb="4" />
        <Text>Đang kiểm tra trạng thái thanh toán...</Text>
      </Flex>
    );
  }

  const isSuccess = paymentStatus?.status === 'SUCCESS' || status === 'success';

  return (
    <Flex direction="column" px={PX_ALL} pt={{ xs: '70px', lg: '162px' }} pb="50px">
      <VStack spacing="8" align="stretch" maxW="800px" mx="auto">
        {/* Status Card */}
        <Card>
          <CardHeader>
            <VStack spacing="4">
              <Box
                w="80px"
                h="80px"
                borderRadius="full"
                bg={isSuccess ? 'green.100' : 'red.100'}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {isSuccess ? <Text fontSize="4xl">✓</Text> : <Text fontSize="4xl">✗</Text>}
              </Box>
              <Heading size="lg" color={isSuccess ? 'green.600' : 'red.600'}>
                {isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại'}
              </Heading>
              <Text color="gray.600" textAlign="center">
                {isSuccess
                  ? 'Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.'
                  : 'Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.'}
              </Text>
            </VStack>
          </CardHeader>

          <CardBody>
            <VStack spacing="4" align="stretch">
              <Divider />

              {/* Order Information */}
              <Box>
                <Text fontWeight="semibold" mb="3">
                  Thông tin đơn hàng
                </Text>
                <VStack spacing="2" align="stretch">
                  {paymentStatus?.orderKiotCode && (
                    <HStack justify="space-between">
                      <Text color="gray.600">Mã đơn hàng:</Text>
                      <Badge colorScheme="blue" fontSize="md" px="3" py="1">
                        {paymentStatus.orderKiotCode}
                      </Badge>
                    </HStack>
                  )}

                  {transactionId && (
                    <HStack justify="space-between">
                      <Text color="gray.600">Mã giao dịch:</Text>
                      <Text fontWeight="medium">{transactionId}</Text>
                    </HStack>
                  )}

                  {paymentStatus?.amount && (
                    <HStack justify="space-between">
                      <Text color="gray.600">Số tiền:</Text>
                      <Text fontWeight="medium" color="green.600">
                        {paymentStatus.amount.toLocaleString('vi-VN')}đ
                      </Text>
                    </HStack>
                  )}

                  {transactionDate && (
                    <HStack justify="space-between">
                      <Text color="gray.600">Thời gian:</Text>
                      <Text fontWeight="medium">{new Date(transactionDate).toLocaleString('vi-VN')}</Text>
                    </HStack>
                  )}
                </VStack>
              </Box>

              <Divider />

              {/* Action Buttons */}
              <HStack spacing="4" pt="4">
                <Button flex="1" colorScheme="blue" onClick={() => router.push('/san-pham')}>
                  Tiếp tục mua hàng
                </Button>
                <Button flex="1" variant="outline" colorScheme="blue" onClick={() => router.push('/')}>
                  Về trang chủ
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Flex>
  );
};

const PaymentSuccessLoading = () => (
  <Flex justify="center" align="center" minH="60vh" direction="column">
    <Spinner size="lg" color="blue.500" mb="4" />
    <Text>Đang tải thông tin thanh toán...</Text>
  </Flex>
);

const PaymentSuccessWrapper = () => {
  return (
    <Suspense fallback={<PaymentSuccessLoading />}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessWrapper;
