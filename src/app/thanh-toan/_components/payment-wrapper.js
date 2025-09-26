'use client';

import { useQueryProductBySlugs } from '../../../services/product.service';
import { useMutateCreatePayment, useQueryPaymentStatus } from '../../../services/payment.service';
import { cartAtom } from '../../../states/common';
import { PX_ALL, IMG_ALT } from '../../../utils/const';
import { showToast } from '../../../utils/helper';
import { authService } from '../../../services/auth.service';
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
  Stack,
  Select
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useRecoilState } from 'recoil';

const PaymentWrapper = () => {
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartAtom);
  const cartSlugs = useMemo(() => cart?.map((i) => i.slug).filter(Boolean) || [], [cart]);
  const { data: cartData = [], isLoading: loadingProducts } = useQueryProductBySlugs(cartSlugs);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const customerInfoRef = useRef({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    note: ''
  });

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [wards, setWards] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState('sepay_bank');
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const [debugInfo, setDebugInfo] = useState([]);
  const [pollCount, setPollCount] = useState(0);
  const pollCountRef = useRef(0);
  const [lastStatusCheck, setLastStatusCheck] = useState(null);

  const { mutateAsync: createPayment, isPending: creatingPayment } = useMutateCreatePayment();

  const {
    data: paymentStatus,
    isLoading: checkingStatus,
    error: statusError
  } = useQueryPaymentStatus(currentOrderId, !!currentOrderId);

  const { isOpen: isPaymentModalOpen, onOpen: onOpenPaymentModal, onClose: onClosePaymentModal } = useDisclosure();

  const addDebugLog = useCallback((message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      timestamp,
      message,
      data,
      id: Date.now()
    };
    setDebugInfo((prev) => [...prev.slice(-10), logEntry]);
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      setAuthLoading(true);

      const currentUser = authService.getCurrentUser();
      if (currentUser && currentUser.token) {
        setIsAuthenticated(true);
      } else {
        try {
          const authCheck = await authService.checkAuth();
          if (authCheck.isAuthenticated) {
            setIsAuthenticated(true);
          } else {
            router.replace('/dang-nhap?redirect=/thanh-toan');
            return;
          }
        } catch (error) {
          router.replace('/dang-nhap?redirect=/thanh-toan');
          return;
        }
      }

      setAuthLoading(false);
    };

    checkAuthentication();
  }, [router]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'CK_CLIENT_TOKEN' && !e.newValue) {
        showToast({
          status: 'warning',
          content: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
        });
        router.replace('/dang-nhap?redirect=/thanh-toan');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [router]);

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/giaodienblog/provinces/refs/heads/main/district.json'
        );
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu tỉnh/thành:', error);
      }
    };
    loadProvinces();
  }, []);

  useEffect(() => {
    if (paymentStatus && isAuthenticated) {
      pollCountRef.current += 1;
      setPollCount(pollCountRef.current);
      setLastStatusCheck(new Date().toLocaleTimeString());

      addDebugLog(`Poll #${pollCountRef.current} - Status Check`, {
        orderId: currentOrderId,
        status: paymentStatus.status,
        amount: paymentStatus.amount,
        success: paymentStatus.success
      });

      if (paymentStatus.status === 'SUCCESS' || paymentStatus.status === 'PAID') {
        addDebugLog('🎉 PAYMENT SUCCESSFUL!', paymentStatus);

        onClosePaymentModal();
        setCart([]);

        const successParams = new URLSearchParams({
          orderId: currentOrderId,
          status: 'success'
        });

        if (paymentStatus.transactionId) {
          successParams.append('transactionId', paymentStatus.transactionId);
        }
        if (paymentStatus.gateway) {
          successParams.append('gateway', paymentStatus.gateway);
        }
        if (paymentStatus.transactionDate) {
          successParams.append('transactionDate', paymentStatus.transactionDate);
        }
        if (paymentStatus.referenceCode) {
          successParams.append('referenceCode', paymentStatus.referenceCode);
        }
        if (paymentStatus.accountNumber) {
          successParams.append('accountNumber', paymentStatus.accountNumber);
        }
        if (paymentStatus.content) {
          successParams.append('content', paymentStatus.content);
        }

        const successUrl = `/thanh-toan/success?${successParams.toString()}`;
        router.push(successUrl);

        showToast({
          status: 'success',
          content: 'Thanh toán thành công! Cảm ơn bạn đã mua hàng.'
        });
      } else if (paymentStatus.status === 'FAILED' || paymentStatus.status === 'CANCELLED') {
        addDebugLog('❌ PAYMENT FAILED', paymentStatus);

        onClosePaymentModal();
        router.push(`/thanh-toan/success?orderId=${currentOrderId}&status=failed`);

        showToast({
          status: 'error',
          content: 'Thanh toán thất bại. Vui lòng thử lại.'
        });
      }
    }

    if (statusError) {
      addDebugLog('❌ Status Check Error', statusError);
    }
  }, [paymentStatus, statusError, setCart, onClosePaymentModal, router, currentOrderId, isAuthenticated]);

  const handleProvinceChange = useCallback(
    (provinceCode) => {
      const code = parseInt(provinceCode);
      setSelectedProvince(code);
      setSelectedDistrict('');
      setSelectedWard('');
      setDistricts([]);
      setWards([]);

      const province = provinces.find((p) => p.code === code);
      if (province && province.districts) {
        setDistricts(province.districts);
      }
    },
    [provinces]
  );

  const handleDistrictChange = useCallback(
    (districtCode) => {
      const code = parseInt(districtCode);
      setSelectedDistrict(code);
      setSelectedWard('');
      setWards([]);

      const province = provinces.find((p) => p.code === selectedProvince);
      if (province && province.districts) {
        const district = province.districts.find((d) => d.code === code);
        if (district && district.wards) {
          setWards(district.wards);
        }
      }
    },
    [provinces, selectedProvince]
  );

  const calculateSubtotal = () => {
    return cartData.reduce((total, product) => {
      const cartItem = cart.find((item) => item.slug === product.slug);
      const quantity = cartItem ? cartItem.quantity : 1;
      return total + product.price * quantity;
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 0 ? 0 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleInputChange = useCallback(
    (field) => (e) => {
      const value = e.target.value;
      customerInfoRef.current[field] = value;
    },
    []
  );

  const validateForm = () => {
    const { fullName, email, phone, address } = customerInfoRef.current;

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
    if (!selectedProvince) {
      showToast({ status: 'error', content: 'Vui lòng chọn tỉnh/thành phố' });
      return false;
    }
    if (!selectedDistrict) {
      showToast({ status: 'error', content: 'Vui lòng chọn quận/huyện' });
      return false;
    }
    if (!selectedWard) {
      showToast({ status: 'error', content: 'Vui lòng chọn phường/xã' });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast({ status: 'error', content: 'Email không hợp lệ' });
      return false;
    }

    return true;
  };

  const handleCreatePayment = async () => {
    if (!validateForm()) return;

    if (cart.length === 0) {
      showToast({ status: 'error', content: 'Giỏ hàng trống' });
      return;
    }

    try {
      addDebugLog('Starting payment creation...');

      const cartItems = cart
        .map((item) => {
          const product = cartData.find((p) => p.slug === item.slug);

          if (!product) {
            console.warn(`Product not found for slug: ${item.slug}`);
            return null;
          }

          return {
            productId: Number(product.id),
            quantity: Number(item.quantity) || 1,
            price: Number(product.price) || 0,
            title: product.title || product.kiotviet_name || `Sản phẩm #${product.id}`
          };
        })
        .filter(Boolean);

      if (cartItems.length === 0) {
        showToast({
          status: 'error',
          content: 'Không có sản phẩm hợp lệ trong giỏ hàng'
        });
        return;
      }

      const invalidItems = cartItems.filter((item) => !item.productId || isNaN(item.productId));
      if (invalidItems.length > 0) {
        showToast({
          status: 'error',
          content: 'Một số sản phẩm không có mã sản phẩm hợp lệ'
        });
        return;
      }

      addDebugLog('📦 Valid cart items:', cartItems);

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

      const province = provinces.find((p) => p.code === selectedProvince);
      const district = districts.find((d) => d.code === selectedDistrict);
      const ward = wards.find((w) => w.code === selectedWard);

      const provinceName = province ? province.name : '';
      const districtName = district ? district.name : '';
      const wardName = ward ? ward.name : '';

      const finalCustomerInfo = {
        fullName: customerInfoRef.current.fullName || '',
        email: customerInfoRef.current.email || '',
        phone: customerInfoRef.current.phone || '',
        address: customerInfoRef.current.address || '',
        detailedAddress: customerInfoRef.current.address || '',
        province: provinceName,
        district: districtName,
        ward: wardName,
        note: customerInfoRef.current.note || ''
      };

      const paymentData = {
        customerInfo: finalCustomerInfo,
        cartItems,
        paymentMethod,
        amounts: {
          subtotal: calculateSubtotal(),
          shipping: calculateShipping(),
          total: calculateTotal()
        }
      };

      addDebugLog('📤 Sending payment data', paymentData);

      const response = await createPayment(paymentData);

      addDebugLog('📥 Payment creation response', response);

      if (response.success) {
        setCurrentOrderId(response.orderId);
        setPaymentUrl(response.paymentUrl || '');
        setQrCodeUrl(response.qrCodeUrl || '');

        setPollCount(0);
        pollCountRef.current = 0;
        setDebugInfo([]);

        addDebugLog('✅ Payment order created', {
          orderId: response.orderId,
          qrCodeUrl: response.qrCodeUrl,
          paymentMethod
        });

        showToast({
          status: 'success',
          content: 'Đơn hàng đã được tạo thành công!'
        });

        if (paymentMethod === 'sepay_bank' && response.qrCodeUrl) {
          onOpenPaymentModal();
        } else if (paymentMethod === 'cod') {
          router.push(`/thanh-toan/success?orderId=${response.orderId}&status=pending`);
        }
      }
    } catch (error) {
      console.error('Payment creation error:', error);
      addDebugLog('❌ Payment creation failed', error);
      showToast({
        status: 'error',
        content: error.message || 'Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!'
      });
    }
  };

  if (loadingProducts) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" color="blue.500" />
        <Text ml="4" fontSize="lg">
          Đang tải thông tin sản phẩm...
        </Text>
      </Flex>
    );
  }

  if (cart.length === 0) {
    return (
      <Flex justify="center" align="center" minH="60vh" direction="column">
        <Text fontSize="xl" mb="4">
          Giỏ hàng của bạn đang trống
        </Text>
        <Button colorScheme="blue" onClick={() => router.push('/san-pham')}>
          Tiếp tục mua hàng
        </Button>
      </Flex>
    );
  }

  if (authLoading) {
    return (
      <Flex justify="center" align="center" minH="60vh" direction="column">
        <Spinner size="lg" color="blue.500" mb="4" />
        <Text>Đang kiểm tra đăng nhập...</Text>
      </Flex>
    );
  }

  if (!isAuthenticated) {
    return null;
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
          <Box flex="1" bg="white" p="6" borderRadius="lg" border="1px" borderColor="gray.200">
            <Text fontSize="lg" fontWeight="semibold" mb="4">
              Thông tin khách hàng
            </Text>

            <VStack spacing="4">
              <FormControl isRequired>
                <FormLabel>Họ và tên</FormLabel>
                <Input onChange={handleInputChange('fullName')} placeholder="Nhập họ và tên" autoComplete="off" />
              </FormControl>

              <HStack width="100%" spacing="4">
                <FormControl isRequired flex="1">
                  <FormLabel>Số điện thoại</FormLabel>
                  <Input
                    onChange={handleInputChange('phone')}
                    placeholder="Nhập số điện thoại"
                    type="tel"
                    autoComplete="off"
                  />
                </FormControl>

                <FormControl isRequired flex="1">
                  <FormLabel>Email</FormLabel>
                  <Input
                    onChange={handleInputChange('email')}
                    placeholder="Nhập email"
                    type="email"
                    autoComplete="off"
                  />
                </FormControl>
              </HStack>

              <HStack width="100%" spacing="4">
                <FormControl isRequired flex="1">
                  <FormLabel>Tỉnh/Thành phố</FormLabel>
                  <Select
                    value={selectedProvince}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    placeholder="-- Chọn tỉnh/thành --"
                  >
                    {provinces.map((province) => {
                      return (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl isRequired flex="1">
                  <FormLabel>Quận/Huyện</FormLabel>
                  <Select
                    value={selectedDistrict}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    placeholder="-- Chọn quận/huyện --"
                    disabled={!selectedProvince}
                  >
                    {districts.map((district) => {
                      return (
                        <option key={district.code} value={district.code}>
                          {district.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
              </HStack>

              <FormControl isRequired>
                <FormLabel>Phường/Xã</FormLabel>
                <Select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(parseInt(e.target.value))}
                  placeholder="-- Chọn phường/xã --"
                  disabled={!selectedDistrict}
                >
                  {wards.map((ward) => {
                    return (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Địa chỉ chi tiết</FormLabel>
                <Textarea
                  onChange={handleInputChange('address')}
                  placeholder="Số nhà, tên đường, ngõ/hẻm..."
                  rows="3"
                  autoComplete="off"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Ghi chú đơn hàng</FormLabel>
                <Textarea
                  onChange={handleInputChange('note')}
                  placeholder="Ghi chú đặc biệt (không bắt buộc)"
                  rows="2"
                  autoComplete="off"
                />
              </FormControl>
            </VStack>

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
                </Stack>
              </RadioGroup>
            </Box>
          </Box>

          <Box w={{ base: '100%', lg: '400px' }} bg="gray.50" p="6" borderRadius="lg" h="fit-content">
            <Text fontSize="lg" fontWeight="semibold" mb="4">
              Thông tin đơn hàng
            </Text>

            <VStack spacing="4" align="stretch">
              {cartData.map((product) => {
                const cartItem = cart.find((item) => Number(item.id) === Number(product.id));
                const { kiotViet } = product;
                const quantity = cartItem ? cartItem.quantity : 1;
                const itemTotal = product.price * quantity;
                const image_url = kiotViet.images?.[0]?.replace('http://', 'https://');

                return (
                  <HStack key={product.id} spacing="3" align="start">
                    <Image
                      src={image_url || '/images/placeholder.jpg'}
                      alt={product.title || IMG_ALT}
                      boxSize="50px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <VStack align="start" spacing="1" flex="1">
                      <Text fontSize="sm" fontWeight="medium" noOfLines={2}>
                        {product.title}
                      </Text>
                      <HStack>
                        <Text fontSize="xs" color="gray.600">
                          SL: {quantity}
                        </Text>
                        <Text fontSize="sm" fontWeight="semibold" color="blue.600">
                          {formatCurrency(itemTotal)}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                );
              })}
            </VStack>

            <Divider my="4" />

            <VStack spacing="3" align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">
                  Tạm tính:
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  {formatCurrency(calculateSubtotal())}
                </Text>
              </HStack>

              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">
                  Phí vận chuyển:
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="green.600">
                  {calculateShipping() === 0 ? 'Miễn phí' : formatCurrency(calculateShipping())}
                </Text>
              </HStack>

              <Divider />

              <HStack justify="space-between">
                <Text fontSize="md" fontWeight="bold">
                  Tổng cộng:
                </Text>
                <Text fontSize="md" fontWeight="bold" color="blue.600">
                  {formatCurrency(calculateTotal())}
                </Text>
              </HStack>
            </VStack>

            <Flex justify="space-evenly" gap={4}>
              <Button
                colorScheme="blue"
                size="lg"
                width="100%"
                mt="6"
                onClick={handleCreatePayment}
                isLoading={creatingPayment}
                loadingText="Đang xử lý..."
              >
                {paymentMethod === 'cod' ? 'Đặt hàng COD' : 'Thanh toán ngay'}
              </Button>
              <Button variant="outline" size="lg" width="100%" mt="6" onClick={() => router.push('/gio-hang')}>
                Quay lại giỏ hàng
              </Button>
            </Flex>
          </Box>
        </Flex>
      </VStack>

      <Modal isOpen={isPaymentModalOpen} onClose={onClosePaymentModal} size="2xl" closeOnOverlayClick={false}>
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
                  <AlertDescription>Vui lòng thực hiện thanh toán để hoàn tất đơn hàng.</AlertDescription>
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
