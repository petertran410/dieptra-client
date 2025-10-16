'use client';

import { Box, VStack, HStack, Text, Badge, Image, Divider, Spinner, Button, Select } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { profileService } from '../../../services/profile.service';
import { showToast } from '../../../utils/helper';

const ORDER_STATUS = {
  PENDING: { label: 'Chờ xác nhận', color: 'yellow' },
  CONFIRMED: { label: 'Đã xác nhận', color: 'blue' },
  SHIPPING: { label: 'Đang giao', color: 'purple' },
  DELIVERED: { label: 'Đã giao', color: 'green' },
  CUSTOMER_RECEIVED: { label: 'Khách đã nhận', color: 'teal' },
  CANCELLED: { label: 'Đã hủy', color: 'red' }
};

const PAYMENT_STATUS = {
  PENDING: { label: 'Chưa thanh toán', color: 'orange' },
  PAID: { label: 'Đã thanh toán', color: 'green' },
  FAILED: { label: 'Thất bại', color: 'red' }
};

const OrderList = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await profileService.getMyOrders(page, 10, statusFilter);
      setOrders(response.orders || []);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error loading orders:', error);
      showToast({ status: 'error', content: 'Không thể tải đơn hàng' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [page, statusFilter]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      return;
    }

    try {
      setCancellingOrderId(orderId);
      await profileService.cancelOrder(orderId);

      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'CANCELLED' } : order)));

      showToast({ status: 'success', content: 'Hủy đơn hàng thành công' });
    } catch (error) {
      console.error('Error cancelling order:', error);
      showToast({
        status: 'error',
        content: error.response?.data?.message || 'Không thể hủy đơn hàng'
      });
    } finally {
      setCancellingOrderId(null);
    }
  };

  const canCancelOrder = (order) => {
    return order.status !== 'CANCELLED' && order.status !== 'DELIVERED';
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
          {statusFilter ? 'Không có đơn hàng nào' : 'Bạn chưa có đơn hàng nào'}
        </Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between" mb={2}>
        <Text fontSize="xl" fontWeight="medium" color="gray.700">
          Tổng: {orders.length} đơn hàng
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
            {order.items.map((item, index) => (
              <HStack key={index} spacing={3}>
                {item.image && (
                  <Image src={item.image} alt={item.productName} boxSize="60px" objectFit="cover" borderRadius="md" />
                )}
                <VStack align="start" flex={1} spacing={0}>
                  <Text fontWeight="medium" fontSize="xl">
                    {item.productName}
                  </Text>
                  <Text fontSize="xl" color="gray.600">
                    {formatPrice(item.price)} x {item.quantity}
                  </Text>
                </VStack>
                <Text fontWeight="semibold" color="#003366" fontSize="xl">
                  {formatPrice(item.price * item.quantity)}
                </Text>
              </HStack>
            ))}
          </VStack>

          <Divider my={3} />

          <HStack spacing={3} mt={3}>
            <Button size="md" colorScheme="blue" onClick={() => router.push(`/profile/orders/${order.id}`)}>
              Chi tiết
            </Button>

            {canCancelOrder(order) ? (
              <Button
                size="md"
                colorScheme="red"
                onClick={() => handleCancelOrder(order.id)}
                isLoading={cancellingOrderId === order.id}
                loadingText="Đang hủy..."
              >
                Hủy đơn hàng
              </Button>
            ) : order.status === 'CANCELLED' ? (
              <Badge colorScheme="red" fontSize="md" px={3} py={2} borderRadius="4px">
                Đã hủy đơn
              </Badge>
            ) : null}
          </HStack>

          <HStack justify="space-between" mt={3}>
            <Text fontSize="lg" fontWeight="bold">
              Tổng tiền:
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
