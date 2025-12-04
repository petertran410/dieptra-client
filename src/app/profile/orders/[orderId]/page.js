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
import { useTranslation } from '../../../../hooks/useTranslation';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, getLocalizedText } = useTranslation();

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
    const interval = setInterval(fetchOrder, 5000);
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
        <Text textAlign="center">{t('profile.order.not.found')}</Text>
      </Container>
    );
  }

  const steps = [
    { label: 'Đã tạo đơn', label_en: 'Order Created', status: 'PENDING', active: true },
    {
      label: 'Đã nhận đơn',
      label_en: 'Order Confirmed',
      status: 'CONFIRMED',
      active: ['CONFIRMED', 'SHIPPING', 'DELIVERED', 'CUSTOMER_RECEIVED', 'CANCELLED'].includes(order.status)
    },
    {
      label: order.status === 'CANCELLED' ? 'Đã hủy' : 'Đang giao hàng',
      label_en: order.status === 'CANCELLED' ? 'Order Cancelled' : 'Order Delivering',
      status: order.status === 'CANCELLED' ? 'CANCELLED' : 'SHIPPING',
      active: ['SHIPPING', 'DELIVERED', 'CUSTOMER_RECEIVED', 'CANCELLED'].includes(order.status)
    },
    {
      label: order.status === 'CUSTOMER_RECEIVED' ? 'Khách đã nhận hàng' : 'Đã giao hàng',
      label_en: order.status === 'CUSTOMER_RECEIVED' ? 'Customer Received Order' : 'Delivered',
      status: order.status === 'CUSTOMER_RECEIVED' ? 'CUSTOMER_RECEIVED' : 'DELIVERED',
      active: ['DELIVERED', 'CUSTOMER_RECEIVED'].includes(order.status)
    }
  ];

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
          {t('profile.go.back.button')}
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
                  {t('profile.order.status')}
                </Text>
                <Box
                  overflowX="auto"
                  w="100%"
                  sx={{
                    '&::-webkit-scrollbar': {
                      height: '6px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#CBD5E0',
                      borderRadius: '3px'
                    }
                  }}
                >
                  <HStack
                    spacing={0}
                    justify="space-between"
                    position="relative"
                    w={{ lg: 'full', md: 'full', s: 'full', xs: '350px' }}
                  >
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
                            left={{ lg: 'calc(+50% + 20px)', xs: 'calc(+50% + 20px)' }}
                            right={{ lg: 'calc(-50% + 20px)', xs: 'calc(-50% + 20px)' }}
                            top={{ lg: '20px', xs: '15px' }}
                            h="3px"
                            bg={steps[index + 1].active ? 'green.500' : 'gray.300'}
                            transform="translateY(-50%)"
                            zIndex={1}
                          />
                        )}

                        <Box
                          w={{ lg: '10', xs: '8' }}
                          h={{ lg: '10', xs: '8' }}
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

                        <Text
                          mt={2}
                          fontSize={{ lg: '2xl', s: 'lg', xs: 'md' }}
                          fontWeight={step.active ? 'bold' : 'normal'}
                          color={step.active ? 'green.500' : 'gray.500'}
                          textAlign="center"
                        >
                          {getLocalizedText(step.label, step.label_en)}
                        </Text>
                      </Box>
                    ))}
                  </HStack>
                </Box>
              </Box>

              <Divider />

              <Box>
                <Text fontSize="2xl" fontWeight="bold" mb={3}>
                  {t('profile.order.information')}
                </Text>
                <VStack align="stretch" spacing={2}>
                  <HStack justify="space-between">
                    <Text fontSize="2xl" color="gray.600">
                      {t('profile.receiver')}
                    </Text>
                    <Text fontSize="2xl" fontWeight="medium">
                      {order.fullName}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="2xl" color="gray.600">
                      {t('profile.receiver.phone')}
                    </Text>
                    <Text fontSize="2xl" fontWeight="medium">
                      {order.phone}
                    </Text>
                  </HStack>
                  <HStack justify="space-between" align="start">
                    <Text fontSize="2xl" color="gray.600">
                      {t('profile.recevier.address')}
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
                  {t('profile.product')}
                </Text>
                <VStack spacing={3}>
                  {order.items.map((item, index) => (
                    <Box key={index} w="full" p={3} bg="gray.50" borderRadius="md">
                      <VStack spacing={3} align="stretch" display={{ base: 'flex', md: 'none' }}>
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.productName}
                            w="full"
                            maxW="200px"
                            mx="auto"
                            objectFit="cover"
                            borderRadius="md"
                          />
                        )}
                        <VStack align="start" spacing={1} w="full">
                          <Text fontSize="2xl" fontWeight="medium">
                            {getLocalizedText(item.productName, item.productNameEn)}
                          </Text>
                          <Text fontSize="2xl" color="gray.600">
                            {t('profile.quantity')} {item.quantity}
                          </Text>
                          <Text fontSize="2xl" fontWeight="bold" color="red.500">
                            {formatPrice(item.price)}
                          </Text>
                        </VStack>
                      </VStack>

                      <HStack spacing={3} display={{ base: 'none', md: 'flex' }}>
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
                            {getLocalizedText(item.productName, item.productNameEn)}
                          </Text>
                          <Text fontSize="2xl" color="gray.600">
                            {t('profile.quantity')} {item.quantity}
                          </Text>
                        </VStack>
                        <Text fontSize="2xl" fontWeight="bold">
                          {formatPrice(item.price)}
                        </Text>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Box>

              <Divider />

              <HStack justify="space-between">
                <Text fontSize="2xl" fontWeight="bold">
                  {t('profile.total.price')}
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
