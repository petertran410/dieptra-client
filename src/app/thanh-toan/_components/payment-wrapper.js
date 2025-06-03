'use client';

import { useQueryProductByIds } from '../../../services/product.service';
import { useMutateCreatePayment, useQueryPaymentStatus } from '../../../services/payment.service';
import { cartAtom } from '../../../states/common';
import { PX_ALL, IMG_ALT } from '../../../utils/const';
import { showToast } from '../../../utils/helper';
import { formatCurrency } from '../../../utils/helper-server';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  VStack,
  HStack,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const PaymentWrapper = () => {
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartAtom);
  const { data: cartData = [], isLoading: loadingProducts } = useQueryProductByIds(cart?.map((i) => i.id));

  // Payment states
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    note: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('sepay_bank');
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // API hooks
  const { mutateAsync: createPayment, isPending: creatingPayment } = useMutateCreatePayment();
  const { data: paymentStatus, isLoading: checkingStatus } = useQueryPaymentStatus(currentOrderId, !!currentOrderId);

  // Modal controls
  const { isOpen: isPaymentModalOpen, onOpen: onOpenPaymentModal, onClose: onClosePaymentModal } = useDisclosure();
  const { isOpen: isSuccessModalOpen, onOpen: onOpenSuccessModal, onClose: onCloseSuccessModal } = useDisclosure();

  // Calculate totals
  const calculateSubtotal = () => {
    return cartData.reduce((total, product) => {
      const cartItem = cart.find((item) => Number(item.id) === Number(product.id));
      const quantity = cartItem ? cartItem.quantity : 1;
      return total + product.price * quantity;
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    // return subtotal > 500000 ? 0 : 30000;
    return subtotal > 0 ? 0 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    const { fullName, email, phone, address } = customerInfo;

    if (!fullName.trim()) {
      showToast({ status: 'error', content: 'Vui lòng nhập họ tên' });
      return false;
    }
    if (!phone.trim()) {
      showToast({ status: 'error', content: 'Vui lòng nhập số điện thoại' });
      return false;
    }
    if (!email.trim()) {
      showToast({ status: 'error', content: 'Vui lòng nhập email' });
      return false;
    }
    if (!address.trim()) {
      showToast({ status: 'error', content: 'Vui lòng nhập địa chỉ' });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast({ status: 'error', content: 'Email không hợp lệ' });
      return false;
    }

    // Validate phone format (Vietnamese phone numbers)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      showToast({ status: 'error', content: 'Số điện thoại không hợp lệ' });
      return false;
    }

    return true;
  };

  // Handle payment creation
  const handleCreatePayment = async () => {
    if (!validateForm()) return;

    if (cart.length === 0) {
      showToast({ status: 'error', content: 'Giỏ hàng trống' });
      return;
    }

    try {
      // Prepare cart items with correct structure
      const cartItems = cart.map((item) => {
        const product = cartData.find((p) => Number(p.id) === Number(item.id));
        return {
          productId: Number(item.id),
          quantity: item.quantity,
          price: product?.price || 0,
          title: product?.title || ''
        };
      });

      // Validate that all products have prices (except for COD)
      if (paymentMethod !== 'cod') {
        const invalidProducts = cartItems.filter((item) => !item.price || item.price === 0);
        if (invalidProducts.length > 0) {
          showToast({
            status: 'error',
            content: 'Một số sản phẩm cần liên hệ để báo giá. Vui lòng chọn thanh toán COD hoặc liên hệ trực tiếp.'
          });
          return;
        }
      }

      const paymentData = {
        customerInfo,
        cartItems,
        paymentMethod,
        amounts: {
          subtotal: calculateSubtotal(),
          shipping: calculateShipping(),
          total: calculateTotal()
        }
      };

      console.log('Sending payment data:', paymentData);

      const response = await createPayment(paymentData);

      console.log('Payment response:', response);

      if (response.success) {
        setCurrentOrderId(response.orderId);
        setPaymentUrl(response.paymentUrl || '');
        setQrCodeUrl(response.qrCodeUrl || '');

        showToast({
          status: 'success',
          content: 'Đơn hàng đã được tạo thành công!'
        });

        // For COD orders, redirect to success page immediately
        if (paymentMethod === 'cod') {
          router.push(`/thanh-toan/success?orderId=${response.orderId}&status=success&method=cod`);
        } else {
          onOpenPaymentModal();
        }
      } else {
        throw new Error(response.message || 'Không thể tạo đơn hàng');
      }
    } catch (error) {
      console.error('Payment creation error:', error);
      showToast({
        status: 'error',
        content: `Lỗi tạo đơn hàng: ${error.message}`
      });
    }
  };

  // Handle successful payment
  useEffect(() => {
    if (paymentStatus?.status === 'SUCCESS' || paymentStatus?.status === 'PAID') {
      onClosePaymentModal();

      // Clear cart and redirect to success page
      setCart([]);
      router.push(
        `/thanh-toan/success?orderId=${currentOrderId}&transactionId=${paymentStatus.transactionId}&status=success`
      );

      showToast({
        status: 'success',
        content: 'Thanh toán thành công! Cảm ơn bạn đã mua hàng.'
      });
    } else if (paymentStatus?.status === 'FAILED' || paymentStatus?.status === 'CANCELLED') {
      onClosePaymentModal();
      router.push(`/thanh-toan/success?orderId=${currentOrderId}&status=failed`);

      showToast({
        status: 'error',
        content: 'Thanh toán thất bại. Vui lòng thử lại.'
      });
    }
  }, [paymentStatus, setCart, onClosePaymentModal, router, currentOrderId]);

  // Redirect if cart is empty
  useEffect(() => {
    if (!loadingProducts && cart.length === 0) {
      showToast({
        status: 'info',
        content: 'Giỏ hàng trống. Chuyển hướng về trang sản phẩm...'
      });
      setTimeout(() => router.push('/san-pham'), 2000);
    }
  }, [cart.length, loadingProducts, router]);

  if (loadingProducts) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="lg" color="blue.500" />
        <Text ml="4">Đang tải...</Text>
      </Flex>
    );
  }

  if (cart.length === 0) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Text fontSize="lg">Giỏ hàng trống. Đang chuyển hướng...</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" px={PX_ALL} pt={{ xs: '70px', lg: '162px' }} pb="50px">
      {/* Header */}
      <VStack spacing="8" align="stretch">
        <Box>
          <Text as="h1" fontSize="2xl" fontWeight="bold" mb="2">
            Thanh toán đơn hàng
          </Text>
          <Text color="gray.600">Vui lòng kiểm tra thông tin và hoàn tất thanh toán</Text>
        </Box>

        <Flex direction={{ base: 'column', lg: 'row' }} gap="8">
          {/* Customer Information Form */}
          <Box flex="1" bg="white" p="6" borderRadius="lg" border="1px" borderColor="gray.200">
            <Text fontSize="lg" fontWeight="semibold" mb="4">
              Thông tin khách hàng
            </Text>

            <VStack spacing="4">
              <FormControl isRequired>
                <FormLabel>Họ và tên</FormLabel>
                <Input
                  value={customerInfo.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Nhập họ và tên"
                />
              </FormControl>

              <HStack width="100%" spacing="4">
                <FormControl isRequired flex="1">
                  <FormLabel>Số điện thoại</FormLabel>
                  <Input
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Nhập số điện thoại"
                    type="tel"
                  />
                </FormControl>

                <FormControl isRequired flex="1">
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Nhập email"
                    type="email"
                  />
                </FormControl>
              </HStack>

              <FormControl isRequired>
                <FormLabel>Địa chỉ giao hàng</FormLabel>
                <Textarea
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Nhập địa chỉ chi tiết"
                  rows="3"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Ghi chú đơn hàng</FormLabel>
                <Textarea
                  value={customerInfo.note}
                  onChange={(e) => handleInputChange('note', e.target.value)}
                  placeholder="Ghi chú đặc biệt (không bắt buộc)"
                  rows="2"
                />
              </FormControl>
            </VStack>

            {/* Payment Method Selection */}
            <Box mt="6">
              <Text fontSize="lg" fontWeight="semibold" mb="4">
                Phương thức thanh toán
              </Text>

              <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                <Stack spacing="3">
                  <Radio value="sepay_bank" colorScheme="blue">
                    <HStack>
                      <Box w="6" h="6" bg="blue.500" borderRadius="md" />
                      <VStack align="start" spacing="0">
                        <Text>Chuyển khoản ngân hàng (SePay)</Text>
                        <Text fontSize="xs" color="gray.600">
                          Thanh toán qua QR Code hoặc chuyển khoản
                        </Text>
                      </VStack>
                    </HStack>
                  </Radio>
                  <Radio value="sepay_momo" colorScheme="pink">
                    <HStack>
                      <Box w="6" h="6" bg="pink.500" borderRadius="md" />
                      <VStack align="start" spacing="0">
                        <Text>Ví MoMo (SePay)</Text>
                        <Text fontSize="xs" color="gray.600">
                          Thanh toán qua ví điện tử MoMo
                        </Text>
                      </VStack>
                    </HStack>
                  </Radio>
                  <Radio value="cod" colorScheme="green">
                    <HStack>
                      <Box w="6" h="6" bg="green.500" borderRadius="md" />
                      <VStack align="start" spacing="0">
                        <Text>Thanh toán khi nhận hàng (COD)</Text>
                        <Text fontSize="xs" color="gray.600">
                          Thanh toán bằng tiền mặt khi nhận hàng
                        </Text>
                      </VStack>
                    </HStack>
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Box>

          {/* Order Summary */}
          <Box w={{ base: '100%', lg: '400px' }} bg="gray.50" p="6" borderRadius="lg" h="fit-content">
            <Text fontSize="lg" fontWeight="semibold" mb="4">
              Thông tin đơn hàng
            </Text>

            <VStack spacing="4" align="stretch">
              {/* Product List */}
              {cartData.map((product) => {
                const cartItem = cart.find((item) => Number(item.id) === Number(product.id));
                const quantity = cartItem ? cartItem.quantity : 1;
                const itemTotal = product.price * quantity;

                return (
                  <HStack key={product.id} spacing="3" align="start">
                    <Image
                      src={product.imagesUrl?.[0]?.replace('https://', 'http://') || '/images/tra-phuong-hoang.png'}
                      alt={product.title}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="md"
                      bg="gray.100"
                    />
                    <VStack flex="1" align="start" spacing="1">
                      <Text fontSize="sm" fontWeight="medium" noOfLines="2">
                        {product.title}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        Số lượng: {quantity}
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold" color="blue.600">
                        {formatCurrency(itemTotal)}
                      </Text>
                    </VStack>
                  </HStack>
                );
              })}

              <Divider />

              {/* Pricing Breakdown */}
              <VStack spacing="2" align="stretch">
                <HStack justify="space-between">
                  <Text>Tạm tính:</Text>
                  <Text>{formatCurrency(calculateSubtotal())}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text>Phí vận chuyển:</Text>
                  <Text color={calculateShipping() === 0 ? 'green.500' : 'inherit'}>
                    {calculateShipping() === 0 ? 'Miễn phí' : formatCurrency(calculateShipping())}
                  </Text>
                </HStack>

                <Divider />

                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="bold">
                    Tổng cộng:
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="blue.600">
                    {formatCurrency(calculateTotal())}
                  </Text>
                </HStack>
              </VStack>

              {/* Checkout Button */}
              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleCreatePayment}
                isLoading={creatingPayment}
                loadingText="Đang xử lý..."
                w="full"
                mt="4"
              >
                {paymentMethod === 'cod' ? 'Đặt hàng COD' : 'Thanh toán ngay'}
              </Button>

              <Button variant="outline" size="md" onClick={() => router.push('/gio-hang')} w="full">
                Quay lại giỏ hàng
              </Button>
            </VStack>
          </Box>
        </Flex>
      </VStack>

      {/* Payment Modal */}
      <Modal isOpen={isPaymentModalOpen} onClose={onClosePaymentModal} size="lg" closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thanh toán đơn hàng</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="6">
            <VStack spacing="6">
              <Alert status="info">
                <AlertIcon />
                <Box>
                  <AlertTitle>Đang chờ thanh toán!</AlertTitle>
                  <AlertDescription>
                    Mã đơn hàng: <strong>{currentOrderId}</strong>
                    <br />
                    Vui lòng thực hiện thanh toán để hoàn tất đơn hàng.
                  </AlertDescription>
                </Box>
              </Alert>

              {/* QR Code Display */}
              {qrCodeUrl && (
                <Box textAlign="center">
                  <Text fontSize="lg" fontWeight="semibold" mb="4">
                    Quét mã QR để thanh toán
                  </Text>
                  <Image
                    src={qrCodeUrl}
                    alt="QR Code thanh toán"
                    maxW="300px"
                    mx="auto"
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                  />
                  <Text fontSize="sm" color="gray.600" mt="2">
                    Tổng tiền: <strong>{formatCurrency(calculateTotal())}</strong>
                  </Text>
                </Box>
              )}

              {/* Payment URL */}
              {paymentUrl && !qrCodeUrl && (
                <Box textAlign="center">
                  <Text fontSize="lg" fontWeight="semibold" mb="4">
                    Nhấn vào liên kết để thanh toán
                  </Text>
                  <Button as="a" href={paymentUrl} target="_blank" colorScheme="blue" size="lg">
                    Mở trang thanh toán
                  </Button>
                </Box>
              )}

              {/* Status Checking */}
              <HStack spacing="2">
                <Spinner size="sm" />
                <Text fontSize="sm" color="gray.600">
                  Đang kiểm tra trạng thái thanh toán...
                </Text>
              </HStack>

              <Alert status="warning">
                <AlertIcon />
                <AlertDescription fontSize="sm">
                  Vui lòng không tắt trang này cho đến khi thanh toán hoàn tất. Hệ thống sẽ tự động cập nhật khi thanh
                  toán thành công.
                </AlertDescription>
              </Alert>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default PaymentWrapper;
