'use client';

import { cartAtom } from '../../../../states/common';
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
  Divider,
  Badge,
  Card,
  CardBody,
  CardHeader
} from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { useSetRecoilState } from 'recoil';
import { API } from '../../../../utils/API';
import { PX_ALL } from '../../../../utils/const';

const CODSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setCart = useSetRecoilState(cartAtom);

  const orderId = searchParams.get('orderId');

  const [isClient, setIsClient] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;

      try {
        const response = await API.request({
          url: `/api/payment/order-details/${orderId}`,
          method: 'GET'
        });

        if (response.success) {
          setOrderDetails(response.order);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    setCart([]);
  }, [setCart]);

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
            <AlertDescription>Không tìm thấy thông tin đơn hàng.</AlertDescription>
          </Box>
        </Alert>
      </Flex>
    );
  }

  if (loadingDetails) {
    return (
      <Flex justify="center" align="center" minH="60vh" direction="column">
        <Spinner size="lg" color="blue.500" mb="4" />
        <Text>Đang tải thông tin đơn hàng...</Text>
      </Flex>
    );
  }

  return (
    <Flex
      justify="center"
      align="center"
      minH="60vh"
      py="8"
      direction="column"
      px={PX_ALL}
      pt={{ xs: '100px', lg: '162px' }}
      pb="50px"
    >
      <VStack spacing="6" w="full" maxW="600px" px="4">
        <Card w="full" shadow="lg">
          <CardHeader bg="green.50" borderTopRadius="md">
            <VStack spacing="3">
              <Box
                w="80px"
                h="80px"
                borderRadius="full"
                bg="green.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="4xl">✓</Text>
              </Box>
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                Tạo đơn hàng thành công!
              </Text>
              <Text color="gray.600" textAlign="center">
                Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng.
              </Text>
            </VStack>
          </CardHeader>

          <CardBody>
            <VStack spacing="4" align="stretch">
              <Divider />

              <Box>
                <Text fontWeight="semibold" mb="3" fontSize="2xl" align="center">
                  Thông tin đơn hàng
                </Text>
                <VStack spacing="3" align="stretch">
                  {orderDetails?.fullName && (
                    <HStack justify="space-between">
                      <Text color="gray.600" fontSize="lg">
                        Tên khách hàng:
                      </Text>
                      <Text fontWeight="medium" fontSize="lg">
                        {orderDetails.fullName}
                      </Text>
                    </HStack>
                  )}

                  {orderId && (
                    <HStack justify="space-between">
                      <Text color="gray.600" fontSize="lg">
                        Đơn Hàng:
                      </Text>
                      <Badge colorScheme="blue" px="3" py="1" fontSize="lg">
                        {orderId}
                      </Badge>
                    </HStack>
                  )}

                  {orderDetails?.orderKiotCode && (
                    <HStack justify="space-between">
                      <Text color="gray.600" fontSize="lg">
                        Mã đơn hàng:
                      </Text>
                      <Badge colorScheme="blue" fontSize="lg" px="3" py="1">
                        {orderDetails.orderKiotCode}
                      </Badge>
                    </HStack>
                  )}

                  {orderDetails?.total && (
                    <HStack justify="space-between">
                      <Text color="gray.600" fontSize="lg">
                        Số tiền:
                      </Text>
                      <Text fontWeight="medium" color="green.600" fontSize="lg">
                        {Number(orderDetails.total).toLocaleString('vi-VN')}đ
                      </Text>
                    </HStack>
                  )}

                  {orderDetails?.createdDate && (
                    <HStack justify="space-between">
                      <Text color="gray.600" fontSize="lg">
                        Ngày mua hàng:
                      </Text>
                      <Text fontWeight="medium" fontSize="lg">
                        {new Date(orderDetails.createdDate).toLocaleString('vi-VN')}
                      </Text>
                    </HStack>
                  )}
                </VStack>
              </Box>

              <Divider />

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

const CODSuccessLoading = () => (
  <Flex justify="center" align="center" minH="60vh" direction="column">
    <Spinner size="lg" color="blue.500" mb="4" />
    <Text>Đang tải thông tin đơn hàng...</Text>
  </Flex>
);

const CODSuccessWrapper = () => {
  return (
    <Suspense fallback={<CODSuccessLoading />}>
      <CODSuccessContent />
    </Suspense>
  );
};

export default CODSuccessWrapper;
