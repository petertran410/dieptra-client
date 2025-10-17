'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Spinner,
  Button,
  Divider,
  Image,
  Card,
  CardBody,
  useToast
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { profileService } from '../../../../services/profile.service';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const router = useRouter();
  const toast = useToast();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await profileService.getOrderDetail(orderId);
        setOrder(response);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 15000);
    return () => clearInterval(interval);
  }, [orderId]);

  const handleConfirmReceived = async () => {
    if (!window.confirm('Xác nhận bạn đã nhận được hàng?')) {
      return;
    }

    try {
      setConfirming(true);
      await profileService.confirmOrderReceived(orderId);

      setOrder((prev) => ({ ...prev, status: 'CUSTOMER_RECEIVED' }));

      toast({
        title: 'Thành công',
        description: 'Đã xác nhận nhận hàng',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      console.error('Error confirming order:', error);
      toast({
        title: 'Lỗi',
        description: error.response?.data?.message || 'Không thể xác nhận nhận hàng',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <Container maxW="container.lg" py={10}>
        <Box display="flex" justifyContent="center">
          <Spinner size="xl" color="blue.500" />
        </Box>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container maxW="container.lg" py={10}>
        <Text textAlign="center">Không tìm thấy đơn hàng</Text>
      </Container>
    );
  }

  const ORDER_STATUS = {
    PENDING: { label: 'Chờ xác nhận', color: 'yellow' },
    CONFIRMED: { label: 'Đã xác nhận', color: 'blue' },
    SHIPPING: { label: 'Đang giao', color: 'purple' },
    DELIVERED: { label: 'Đã giao', color: 'green' },
    CUSTOMER_RECEIVED: { label: 'Khách đã nhận', color: 'teal' },
    CANCELLED: { label: 'Đã hủy', color: 'red' }
  };

  const steps = [
    { label: 'Đã tạo đơn', status: 'PENDING', active: true },
    {
      label: 'Đã nhận đơn',
      status: 'CONFIRMED',
      active: ['CONFIRMED', 'SHIPPING', 'DELIVERED', 'CUSTOMER_RECEIVED', 'CANCELLED'].includes(order.status)
    },
    {
      label: order.status === 'CANCELLED' ? 'Đã hủy' : 'Đang giao hàng',
      status: order.status === 'CANCELLED' ? 'CANCELLED' : 'SHIPPING',
      active: ['SHIPPING', 'DELIVERED', 'CUSTOMER_RECEIVED', 'CANCELLED'].includes(order.status)
    },
    {
      label: order.status === 'CUSTOMER_RECEIVED' ? 'Khách đã nhận hàng' : 'Đã giao hàng',
      status: order.status === 'CUSTOMER_RECEIVED' ? 'CUSTOMER_RECEIVED' : 'DELIVERED',
      active: ['DELIVERED', 'CUSTOMER_RECEIVED'].includes(order.status)
    }
  ];

  const canConfirmReceived = order.status === 'DELIVERED';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Container maxW="container.lg" py={125}>
      <VStack spacing={6} align="stretch">
        <Button leftIcon={<ArrowBackIcon />} variant="ghost" onClick={() => router.back()} w="fit-content">
          Quay lại
        </Button>

        <Card>
          <CardBody>
            <VStack align="stretch" spacing={6}>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="#003366">
                  {order.orderCode}
                </Text>
                <Text fontSize="2xl" color="gray.500">
                  {new Date(order.createdDate).toLocaleString('vi-VN')}
                </Text>
              </Box>

              <Box>
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                  Trạng thái đơn hàng
                </Text>
                <HStack spacing={0} justify="space-between" position="relative" w="full">
                  {steps.map((step, index) => (
                    <Box
                      key={index}
                      flex={1}
                      position="relative"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      {index < steps.length - 1 && (
                        <Box
                          position="absolute"
                          left="calc(+50% + 20px)"
                          right="calc(-50% + 20px)"
                          top="20px"
                          h="3px"
                          bg={steps[index + 1].active ? 'green.500' : 'gray.300'}
                          transform="translateY(-50%)"
                          zIndex={1}
                        />
                      )}

                      {/* Circle */}
                      <Box
                        w={10}
                        h={10}
                        borderRadius="full"
                        bg={step.active ? 'green.500' : 'gray.300'}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontWeight="bold"
                        position="relative"
                        zIndex={2}
                        fontSize="2xl"
                      >
                        {index + 1}
                      </Box>

                      {/* Label */}
                      <Text
                        mt={2}
                        fontSize="2xl"
                        fontWeight={step.active ? 'bold' : 'normal'}
                        color={step.active ? 'green.500' : 'gray.500'}
                        textAlign="center"
                      >
                        {step.label}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </Box>

              <Divider />

              <Box>
                <Text fontSize="2xl" fontWeight="bold" mb={3}>
                  Thông tin đơn hàng
                </Text>
                <VStack align="stretch" spacing={2}>
                  <HStack justify="space-between">
                    <Text fontSize="2xl" color="gray.600">
                      Người nhận:
                    </Text>
                    <Text fontSize="2xl" fontWeight="medium">
                      {order.fullName}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="2xl" color="gray.600">
                      Số điện thoại:
                    </Text>
                    <Text fontSize="2xl" fontWeight="medium">
                      {order.phone}
                    </Text>
                  </HStack>
                  <HStack justify="space-between" align="start">
                    <Text fontSize="2xl" color="gray.600">
                      Địa chỉ:
                    </Text>
                    <Text fontSize="2xl" fontWeight="medium" textAlign="right" maxW="60%">
                      {order.address}
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              <Divider />

              <Box>
                <Text fontSize="2xl" fontWeight="bold" mb={3}>
                  Sản phẩm
                </Text>
                <VStack spacing={3}>
                  {order.items.map((item, index) => {
                    console.log(item);
                    return (
                      <HStack key={index} w="full" p={3} bg="gray.50" borderRadius="md">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.productName}
                            boxSize="130px"
                            objectFit="cover"
                            borderRadius="md"
                          />
                        )}
                        <VStack align="start" flex={1} spacing={1}>
                          <Text fontSize="2xl" fontWeight="medium">
                            {item.productName}
                          </Text>
                          <Text fontSize="2xl" color="gray.600">
                            SL: {item.quantity}
                          </Text>
                        </VStack>
                        <Text fontSize="2xl" fontWeight="bold">
                          {formatPrice(item.price)}
                        </Text>
                      </HStack>
                    );
                  })}
                </VStack>
              </Box>

              <Divider />

              <HStack justify="space-between">
                <Text fontSize="2xl" fontWeight="bold">
                  Tổng tiền:
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="red.500">
                  {formatPrice(order.total)}
                </Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default OrderTrackingPage;
