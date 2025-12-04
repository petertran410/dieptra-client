'use client';

import { Box, VStack, HStack, Text, Badge, Image, Divider, Spinner, Button, Select } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { profileService } from '../../../services/profile.service';
import { showToast } from '../../../utils/helper';
import { useTranslation } from '../../../hooks/useTranslation';

const OrderList = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const { t, getLocalizedText } = useTranslation();

  console.log(orders);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await profileService.getMyOrders(page, 10, statusFilter);
      setOrders(response.orders || []);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error loading orders:', error);
      showToast({ status: 'error', content: t('profile.cannot.load.order') });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [page, statusFilter]);

  const handleCancelOrder = async (orderId, orderStatus) => {
    if (orderStatus === 'SHIPPING') {
      showToast({
        status: 'warning',
        content: t('profile.cancel.contact')
      });
      return;
    }

    if (!window.confirm(t('profile.question.cancel'))) {
      return;
    }

    try {
      setCancellingOrderId(orderId);
      await profileService.cancelOrder(orderId);

      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'CANCELLED' } : order)));

      showToast({ status: 'success', content: t('profile.cancel.success') });
    } catch (error) {
      console.error('Error cancelling order:', error);
      showToast({
        status: 'error',
        content: error.response?.data?.message || t('profile.cancel.error')
      });
    } finally {
      setCancellingOrderId(null);
    }
  };

  const canCancelOrder = (order) => {
    return order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && order.status !== 'CUSTOMER_RECEIVED';
  };

  const renderActionButton = (order) => {
    if (order.status === 'CUSTOMER_RECEIVED') {
      return (
        <Badge colorScheme="green" fontSize="md" px={3} py={2} borderRadius="4px">
          {t('profile.delivered')}
        </Badge>
      );
    }

    if (order.status === 'CANCELLED') {
      return (
        <Badge colorScheme="red" fontSize="md" px={3} py={2} borderRadius="4px">
          {t('profile.canceled.order')}
        </Badge>
      );
    }

    if (canCancelOrder(order)) {
      return (
        <Button
          size="md"
          colorScheme="red"
          onClick={() => handleCancelOrder(order.id, order.status)}
          isLoading={cancellingOrderId === order.id}
          loadingText={t('profile.loading.cancel')}
        >
          {t('profile.canceling.order')}
        </Button>
      );
    }

    return null;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" color="gray.500">
          {statusFilter ? t('profile.no.order') : t('profile.you.no.order')}
        </Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between" mb={2}>
        <Text fontSize="xl" fontWeight="medium" color="gray.700">
          {t('profile.total')} {orders.length} {t('profile.order.lowercase')}
        </Text>
      </HStack>

      {orders.map((order) => (
        <Box
          key={order.id}
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
          shadow="sm"
          _hover={{ shadow: 'md' }}
          transition="all 0.2s"
        >
          <HStack justify="space-between" mb={3}>
            <VStack align="start" spacing={1}>
              <Text fontWeight="bold" fontSize="xl" color="#003366">
                {order.orderCode}
              </Text>
              <Text fontSize="xl" color="gray.500">
                {formatDate(order.createdDate)}
              </Text>
            </VStack>
          </HStack>

          <Divider my={3} />

          <VStack align="stretch" spacing={3}>
            {order.items.map((item, index) => {
              return (
                <HStack key={index} spacing={3}>
                  {item.image && (
                    <Image src={item.image} alt={item.productName} boxSize="60px" objectFit="cover" borderRadius="md" />
                  )}
                  <VStack align="start" flex={1} spacing={0}>
                    <Text fontWeight="medium" fontSize="xl">
                      {getLocalizedText(item.productName, item.productNameEn)}
                    </Text>
                    <Text fontSize="xl" color="gray.600">
                      {formatPrice(item.price)} x {item.quantity}
                    </Text>
                  </VStack>
                  <Text fontWeight="semibold" color="#003366" fontSize="xl">
                    {formatPrice(item.price * item.quantity)}
                  </Text>
                </HStack>
              );
            })}
          </VStack>

          <Divider my={3} />

          <HStack spacing={3} mt={3}>
            <Button size="md" colorScheme="blue" onClick={() => router.push(`/profile/orders/${order.id}`)}>
              {t('profile.detail.button')}
            </Button>

            {renderActionButton(order)}
          </HStack>

          <HStack justify="space-between" mt={3}>
            <Text fontSize="lg" fontWeight="bold">
              {t('profile.total.price')}
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="red.500">
              {formatPrice(order.total)}
            </Text>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

export default OrderList;
