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
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const PaymentSuccessWrapper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cart, setCart] = useRecoilState(cartAtom);

  // Get URL parameters
  const orderId = searchParams.get('orderId');
  const transactionId = searchParams.get('transactionId');
  const status = searchParams.get('status');

  const [isClient, setIsClient] = useState(false);
  const [cartCleared, setCartCleared] = useState(false);

  // Query payment status
  const { data: paymentStatus, isLoading, refetch } = useQueryPaymentStatus(orderId, !!orderId);

  // Clear cart on successful payment
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

  // Auto redirect if no order ID
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
        <Spinner size="lg" color="blue.500" mb="4" />
        <Text>Đang kiểm tra trạng thái thanh toán...</Text>
      </Flex>
    );
  }

  const isSuccess = paymentStatus?.status === 'SUCCESS' || status === 'success';
  const isPending = paymentStatus?.status === 'PENDING' || paymentStatus?.status === 'PROCESSING';
  const isFailed = paymentStatus?.status === 'FAILED' || paymentStatus?.status === 'CANCELLED' || status === 'failed';

  return (
    <Flex direction="column" px={PX_ALL} pt={{ xs: '70px', lg: '162px' }} pb="100px">
      <VStack spacing="8" maxW="800px" mx="auto">
        {/* Success Status */}
        {isSuccess && (
          <Card w="full" variant="elevated">
            <CardHeader textAlign="center" pb="4">
              <VStack spacing="4">
                <Box fontSize="6xl">🎉</Box>
                <Text fontSize="2xl" fontWeight="bold" color="green.600">
                  Thanh toán thành công!
                </Text>
              </VStack>
            </CardHeader>
            <CardBody pt="0">
              <VStack spacing="6">
                <Alert status="success" borderRadius="md">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Đơn hàng đã được xác nhận!</AlertTitle>
                    <AlertDescription>
                      Cảm ơn bạn đã mua hàng tại Diệp Trà. Chúng tôi sẽ liên hệ với bạn để xác nhận và giao hàng sớm
                      nhất.
                    </AlertDescription>
                  </Box>
                </Alert>

                {/* Order Details */}
                <Box w="full" bg="gray.50" p="6" borderRadius="md">
                  <Text fontSize="lg" fontWeight="semibold" mb="4">
                    Thông tin đơn hàng
                  </Text>
                  <VStack align="stretch" spacing="3">
                    <HStack justify="space-between">
                      <Text color="gray.600">Mã đơn hàng:</Text>
                      <Badge colorScheme="blue" fontSize="sm">
                        {orderId}
                      </Badge>
                    </HStack>
                    {transactionId && (
                      <HStack justify="space-between">
                        <Text color="gray.600">Mã giao dịch:</Text>
                        <Text fontWeight="medium">{transactionId}</Text>
                      </HStack>
                    )}
                    {paymentStatus?.amount && (
                      <HStack justify="space-between">
                        <Text color="gray.600">Tổng tiền:</Text>
                        <Text fontWeight="bold" color="green.600">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                            paymentStatus.amount
                          )}
                        </Text>
                      </HStack>
                    )}
                    <HStack justify="space-between">
                      <Text color="gray.600">Trạng thái:</Text>
                      <Badge colorScheme="green">Đã thanh toán</Badge>
                    </HStack>
                  </VStack>
                </Box>

                {/* Next Steps */}
                <Box w="full" bg="blue.50" p="4" borderRadius="md" border="1px" borderColor="blue.200">
                  <Text fontWeight="semibold" color="blue.800" mb="2">
                    Bước tiếp theo:
                  </Text>
                  <VStack align="start" spacing="1" color="blue.700" fontSize="sm">
                    <Text>• Chúng tôi sẽ gọi điện xác nhận đơn hàng trong 24h</Text>
                    <Text>• Đơn hàng sẽ được chuẩn bị và giao trong 2-5 ngày</Text>
                    <Text>• Bạn sẽ nhận được thông báo khi hàng được giao</Text>
                  </VStack>
                </Box>

                <Divider />

                {/* Action Buttons */}
                <HStack spacing="4" w="full" justify="center">
                  <Button colorScheme="blue" onClick={() => router.push('/')} size="lg">
                    Về trang chủ
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/san-pham')} size="lg">
                    Tiếp tục mua sắm
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Pending Status */}
        {isPending && (
          <Card w="full" variant="elevated">
            <CardHeader textAlign="center" pb="4">
              <VStack spacing="4">
                <Spinner size="xl" color="orange.500" />
                <Text fontSize="2xl" fontWeight="bold" color="orange.600">
                  Đang xử lý thanh toán...
                </Text>
              </VStack>
            </CardHeader>
            <CardBody pt="0">
              <VStack spacing="6">
                <Alert status="warning" borderRadius="md">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Thanh toán đang được xử lý</AlertTitle>
                    <AlertDescription>
                      Đơn hàng của bạn đang được xử lý. Vui lòng đợi trong giây lát...
                    </AlertDescription>
                  </Box>
                </Alert>

                {orderId && (
                  <Box w="full" bg="gray.50" p="6" borderRadius="md">
                    <Text fontSize="lg" fontWeight="semibold" mb="4">
                      Thông tin đơn hàng
                    </Text>
                    <VStack align="stretch" spacing="3">
                      <HStack justify="space-between">
                        <Text color="gray.600">Mã đơn hàng:</Text>
                        <Badge colorScheme="orange" fontSize="sm">
                          {orderId}
                        </Badge>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="gray.600">Trạng thái:</Text>
                        <Badge colorScheme="orange">Đang xử lý</Badge>
                      </HStack>
                    </VStack>
                  </Box>
                )}

                <HStack spacing="4">
                  <Button
                    colorScheme="orange"
                    onClick={() => refetch()}
                    isLoading={isLoading}
                    loadingText="Đang kiểm tra..."
                  >
                    Kiểm tra lại
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/')}>
                    Về trang chủ
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Failed Status */}
        {isFailed && (
          <Card w="full" variant="elevated">
            <CardHeader textAlign="center" pb="4">
              <VStack spacing="4">
                <Box fontSize="6xl">❌</Box>
                <Text fontSize="2xl" fontWeight="bold" color="red.600">
                  Thanh toán thất bại
                </Text>
              </VStack>
            </CardHeader>
            <CardBody pt="0">
              <VStack spacing="6">
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Thanh toán không thành công!</AlertTitle>
                    <AlertDescription>
                      Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ
                      trợ.
                    </AlertDescription>
                  </Box>
                </Alert>

                {orderId && (
                  <Box w="full" bg="gray.50" p="6" borderRadius="md">
                    <Text fontSize="lg" fontWeight="semibold" mb="4">
                      Thông tin đơn hàng
                    </Text>
                    <VStack align="stretch" spacing="3">
                      <HStack justify="space-between">
                        <Text color="gray.600">Mã đơn hàng:</Text>
                        <Badge colorScheme="red" fontSize="sm">
                          {orderId}
                        </Badge>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="gray.600">Trạng thái:</Text>
                        <Badge colorScheme="red">Thất bại</Badge>
                      </HStack>
                    </VStack>
                  </Box>
                )}

                <Box w="full" bg="red.50" p="4" borderRadius="md" border="1px" borderColor="red.200">
                  <Text fontWeight="semibold" color="red.800" mb="2">
                    Bạn có thể:
                  </Text>
                  <VStack align="start" spacing="1" color="red.700" fontSize="sm">
                    <Text>• Thử thanh toán lại với phương thức khác</Text>
                    <Text>• Liên hệ hotline: 0788339379 để được hỗ trợ</Text>
                    <Text>• Hoặc đặt hàng bằng cách gọi điện trực tiếp</Text>
                  </VStack>
                </Box>

                <HStack spacing="4" w="full" justify="center">
                  <Button colorScheme="red" onClick={() => router.push('/gio-hang')} size="lg">
                    Thử lại
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/')} size="lg">
                    Về trang chủ
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Customer Support */}
        <Box w="full" bg="blue.50" p="6" borderRadius="md" textAlign="center">
          <Text fontSize="lg" fontWeight="semibold" mb="3" color="blue.800">
            Cần hỗ trợ?
          </Text>
          <Text color="blue.700" mb="4">
            Nếu bạn có bất kỳ thắc mắc nào về đơn hàng, vui lòng liên hệ với chúng tôi:
          </Text>
          <VStack spacing="2">
            <HStack spacing="2" justify="center">
              <Text fontWeight="medium">Hotline:</Text>
              <Text color="blue.600" fontWeight="bold">
                0788339379
              </Text>
            </HStack>
            <HStack spacing="2" justify="center">
              <Text fontWeight="medium">Email:</Text>
              <Text color="blue.600">hisweetievietnam@gmail.com</Text>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Flex>
  );
};

export default PaymentSuccessWrapper;
