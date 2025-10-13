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
  CardBody
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { profileService } from '../../../../services/profile.service';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const steps = [
    { label: 'Đã tạo đơn', status: 'PENDING', active: true },
    {
      label: 'Đã nhận đơn',
      status: 'CONFIRMED',
      active: ['CONFIRMED', 'SHIPPING', 'DELIVERED', 'CANCELLED'].includes(order.status)
    },
    {
      label: order.status === 'CANCELLED' ? 'Đã hủy' : 'Đang giao hàng',
      status: order.status === 'CANCELLED' ? 'CANCELLED' : 'SHIPPING',
      active: ['SHIPPING', 'DELIVERED', 'CANCELLED'].includes(order.status),
      isFinal: true
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Container maxW="container.lg" py={10}>
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
                <Text color="gray.500">{new Date(order.createdDate).toLocaleString('vi-VN')}</Text>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                  Trạng thái đơn hàng
                </Text>
                <HStack spacing={0} position="relative">
                  {steps.map((step, index) => (
                    <Box key={index} flex={1} position="relative">
                      <HStack>
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
                          zIndex={2}
                        >
                          {index + 1}
                        </Box>
                        {index < steps.length - 1 && (
                          <Box flex={1} h="2px" bg={steps[index + 1].active ? 'green.500' : 'gray.300'} />
                        )}
                      </HStack>
                      <Text
                        mt={2}
                        fontSize="sm"
                        fontWeight={step.active ? 'bold' : 'normal'}
                        color={step.active ? 'green.500' : 'gray.500'}
                      >
                        {step.label}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </Box>

              <Divider />

              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={3}>
                  Thông tin đơn hàng
                </Text>
                <VStack align="stretch" spacing={2}>
                  <HStack justify="space-between">
                    <Text color="gray.600">Người nhận:</Text>
                    <Text fontWeight="medium">{order.fullName}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="gray.600">Số điện thoại:</Text>
                    <Text fontWeight="medium">{order.phone}</Text>
                  </HStack>
                  <HStack justify="space-between" align="start">
                    <Text color="gray.600">Địa chỉ:</Text>
                    <Text fontWeight="medium" textAlign="right" maxW="60%">
                      {order.address}
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              <Divider />

              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={3}>
                  Sản phẩm
                </Text>
                <VStack spacing={3}>
                  {order.items.map((item, index) => (
                    <HStack key={index} w="full" p={3} bg="gray.50" borderRadius="md">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.productName}
                          boxSize="60px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      )}
                      <VStack align="start" flex={1} spacing={1}>
                        <Text fontWeight="medium">{item.productName}</Text>
                        <Text fontSize="sm" color="gray.600">
                          SL: {item.quantity}
                        </Text>
                      </VStack>
                      <Text fontWeight="bold">{formatPrice(item.price)}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              <Divider />

              <HStack justify="space-between">
                <Text fontSize="xl" fontWeight="bold">
                  Tổng tiền:
                </Text>
                <Text fontSize="xl" fontWeight="bold" color="red.500">
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
