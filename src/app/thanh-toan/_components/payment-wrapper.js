// src/app/thanh-toan/_components/payment-wrapper.js
'use client';

import { useQueryProductBySlugs } from '../../../services/product.service';
import { useMutateCreatePayment } from '../../../services/payment.service';
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

  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    note: ''
  });

  const [inputValues, setInputValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    note: ''
  });

  const debounceTimeouts = useRef({});

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [wards, setWards] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState('sepay_bank');
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const { mutateAsync: createPayment, isPending: creatingPayment } = useMutateCreatePayment();
  const { isOpen: isPaymentModalOpen, onOpen: onOpenPaymentModal, onClose: onClosePaymentModal } = useDisclosure();

  const debouncedUpdateCustomerInfo = useCallback((field, value) => {
    if (debounceTimeouts.current[field]) {
      clearTimeout(debounceTimeouts.current[field]);
    }

    debounceTimeouts.current[field] = setTimeout(() => {
      setCustomerInfo((prev) => ({
        ...prev,
        [field]: value
      }));
    }, 1800);
  }, []);

  const handleInputChange = useCallback(
    (field, value) => {
      setInputValues((prev) => ({
        ...prev,
        [field]: value
      }));

      debouncedUpdateCustomerInfo(field, value);
    },
    [debouncedUpdateCustomerInfo]
  );

  useEffect(() => {
    return () => {
      Object.values(debounceTimeouts.current).forEach((timeout) => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const response = await fetch('https://cdn.jsdelivr.net/gh/giaodienblog/cdn@master/provinces-database.json');
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu tỉnh/thành:', error);
      }
    };
    loadProvinces();
  }, []);

  const handleProvinceChange = useCallback(
    (provinceCode) => {
      setSelectedProvince(provinceCode);
      setSelectedWard('');
      setWards([]);

      const province = provinces.find((p) => (p.Code || p.code) === provinceCode);
      if (province && province.Wards) {
        setWards(province.Wards);
      }
    },
    [provinces]
  );

  const calculatedValues = useMemo(() => {
    const subtotal = cartData.reduce((total, product) => {
      const cartItem = cart.find((item) => item.slug === product.slug);
      const quantity = cartItem ? cartItem.quantity : 1;
      return total + product.price * quantity;
    }, 0);

    const shipping = subtotal > 0 ? 0 : 0;
    const total = subtotal + shipping;

    return { subtotal, shipping, total };
  }, [cartData, cart]);

  const calculateSubtotal = () => calculatedValues.subtotal;
  const calculateShipping = () => calculatedValues.shipping;
  const calculateTotal = () => calculatedValues.total;

  const validateForm = useCallback(() => {
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
    if (!selectedProvince) {
      showToast({ status: 'error', content: 'Vui lòng chọn tỉnh/thành phố' });
      return false;
    }
    if (!selectedWard) {
      showToast({ status: 'error', content: 'Vui lòng chọn phường/xã' });
      return false;
    }
    if (!address.trim()) {
      showToast({ status: 'error', content: 'Vui lòng nhập địa chỉ chi tiết' });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast({ status: 'error', content: 'Email không hợp lệ' });
      return false;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      showToast({ status: 'error', content: 'Số điện thoại không hợp lệ' });
      return false;
    }

    return true;
  }, [customerInfo, selectedProvince, selectedWard]);

  const handleCreatePayment = async () => {
    if (!validateForm()) return;

    if (cart.length === 0) {
      showToast({ status: 'error', content: 'Giỏ hàng trống' });
      return;
    }

    try {
      const cartItems = cart.map((item) => {
        const product = cartData.find((p) => p.slug === item.slug);
        return {
          productId: Number(item.id),
          quantity: item.quantity,
          price: product?.price || 0,
          title: product?.title || ''
        };
      });

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

      const selectedProvinceName =
        provinces.find((p) => (p.Code || p.code) === selectedProvince)?.Name || selectedProvince;
      const selectedWardName = wards.find((w) => (w.Code || w.code) === selectedWard)?.Name || selectedWard;

      const paymentData = {
        customerInfo: {
          ...customerInfo,
          province: selectedProvinceName,
          ward: selectedWardName
        },
        cartItems,
        paymentMethod,
        amounts: {
          subtotal: calculateSubtotal(),
          shipping: calculateShipping(),
          total: calculateTotal()
        }
      };

      const result = await createPayment(paymentData);

      if (result.success) {
        setCurrentOrderId(result.orderId);

        if (paymentMethod === 'sepay_bank' && result.paymentUrl) {
          setPaymentUrl(result.paymentUrl);
          setQrCodeUrl(result.qrCodeUrl);
          onOpenPaymentModal();
        } else if (paymentMethod === 'cod') {
          showToast({
            status: 'success',
            content: 'Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng.'
          });
          router.push(`/thanh-toan/success?orderId=${result.orderId}&status=pending`);
        }
      }
    } catch (error) {
      console.error('Payment creation error:', error);
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

  return (
    <Flex direction="column" px={PX_ALL} pt={{ xs: '70px', lg: '162px' }} pb="50px">
      <VStack spacing="8" align="stretch">
        <Box textAlign="center">
          <Text as="h1" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" mb="2" color="gray.800">
            Thanh toán đơn hàng
          </Text>
          <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
            Vui lòng kiểm tra thông tin và hoàn tất thanh toán
          </Text>
        </Box>

        <Flex direction={{ base: 'column', lg: 'row' }} gap="8">
          <Box flex="1" bg="white" p="6" borderRadius="xl" border="1px" borderColor="gray.200" shadow="sm">
            <Text fontSize="lg" fontWeight="semibold" mb="6" color="gray.800">
              📋 Thông tin khách hàng
            </Text>

            <VStack spacing="5">
              <FormControl isRequired>
                <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
                  Họ và tên
                </FormLabel>
                <Input
                  value={inputValues.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Nhập họ và tên đầy đủ"
                  autoComplete="name"
                  size="lg"
                  borderColor="gray.300"
                  _hover={{ borderColor: 'gray.400' }}
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                  bg="gray.50"
                />
              </FormControl>

              <HStack width="100%" spacing="4">
                <FormControl isRequired flex="1">
                  <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
                    Số điện thoại
                  </FormLabel>
                  <Input
                    value={inputValues.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Nhập số điện thoại"
                    type="tel"
                    autoComplete="tel"
                    size="lg"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'gray.400' }}
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    bg="gray.50"
                  />
                </FormControl>

                <FormControl isRequired flex="1">
                  <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
                    Email
                  </FormLabel>
                  <Input
                    value={inputValues.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Nhập email"
                    type="email"
                    autoComplete="email"
                    size="lg"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'gray.400' }}
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    bg="gray.50"
                  />
                </FormControl>
              </HStack>

              <HStack width="100%" spacing="4">
                <FormControl isRequired flex="1">
                  <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
                    Tỉnh/Thành phố
                  </FormLabel>
                  <Select
                    value={selectedProvince}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    placeholder="-- Chọn tỉnh/thành --"
                    size="lg"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'gray.400' }}
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    bg="gray.50"
                  >
                    {provinces.map((province) => {
                      const code = province.Code || province.code;
                      const name = province.Name || province.FullName || province.name;
                      const MUNICIPALITIES = ['Hà Nội', 'Hồ Chí Minh', 'Hải Phòng', 'Đà Nẵng', 'Cần Thơ', 'Huế'];
                      const isCity = MUNICIPALITIES.some((c) => name.toLowerCase().includes(c.toLowerCase()));
                      const shortName = name.replace(/^(Thành phố|Tỉnh)\s+/i, '');
                      const displayName = isCity ? `${shortName} ${name}` : name;

                      return (
                        <option key={code} value={code}>
                          {displayName}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl isRequired flex="1">
                  <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
                    Phường/Xã
                  </FormLabel>
                  <Select
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                    placeholder="-- Chọn phường/xã --"
                    disabled={!selectedProvince}
                    size="lg"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'gray.400' }}
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    bg="gray.50"
                  >
                    {wards.map((ward) => {
                      const code = ward.Code || ward.code;
                      const name = ward.Name || ward.FullName || ward.name;
                      return (
                        <option key={code} value={code}>
                          {name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
                  Địa chỉ chi tiết
                </FormLabel>
                <Textarea
                  value={inputValues.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Số nhà, tên đường, ngõ/hẻm..."
                  rows="3"
                  autoComplete="street-address"
                  borderColor="gray.300"
                  _hover={{ borderColor: 'gray.400' }}
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                  bg="gray.50"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
                  Ghi chú đơn hàng
                </FormLabel>
                <Textarea
                  value={inputValues.note}
                  onChange={(e) => handleInputChange('note', e.target.value)}
                  placeholder="Ghi chú đặc biệt cho đơn hàng (không bắt buộc)"
                  rows="2"
                  borderColor="gray.300"
                  _hover={{ borderColor: 'gray.400' }}
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                  bg="gray.50"
                />
              </FormControl>
            </VStack>

            <Box mt="8">
              <Text fontSize="lg" fontWeight="semibold" mb="4" color="gray.800">
                💳 Phương thức thanh toán
              </Text>

              <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                <Stack spacing="4">
                  <Radio value="sepay_bank" colorScheme="blue" size="lg">
                    <HStack>
                      <Box
                        w="8"
                        h="8"
                        bg="blue.500"
                        borderRadius="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text color="white" fontSize="sm" fontWeight="bold">
                          ₫
                        </Text>
                      </Box>
                      <VStack align="start" spacing="0">
                        <Text fontWeight="medium">Chuyển khoản ngân hàng (SePay)</Text>
                        <Text fontSize="sm" color="gray.600">
                          Thanh toán qua QR Code hoặc chuyển khoản
                        </Text>
                      </VStack>
                    </HStack>
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Box>

          {/* Order Summary */}
          <Box
            w={{ base: '100%', lg: '400px' }}
            bg="gradient-to-br from-blue-50 to-indigo-50"
            p="6"
            borderRadius="xl"
            h="fit-content"
            shadow="sm"
          >
            <Text fontSize="lg" fontWeight="semibold" mb="6" color="gray.800">
              🛒 Thông tin đơn hàng
            </Text>

            <VStack spacing="4" align="stretch">
              {cartData.map((product) => {
                const cartItem = cart.find((item) => Number(item.id) === Number(product.id));
                const quantity = cartItem ? cartItem.quantity : 1;
                const itemTotal = product.price * quantity;

                return (
                  <HStack key={product.id} spacing="4" align="start" p="3" bg="white" borderRadius="lg">
                    <Image
                      src={product.imagesUrl?.[0] || '/images/placeholder.jpg'}
                      alt={product.title || IMG_ALT}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="md"
                      border="1px"
                      borderColor="gray.200"
                    />
                    <VStack align="start" spacing="1" flex="1">
                      <Text fontSize="sm" fontWeight="medium" color="gray.800" noOfLines={2}>
                        {product.title}
                      </Text>
                      <HStack>
                        <Text fontSize="sm" color="gray.600">
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

            <Divider my="6" />

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
                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                  Tổng cộng:
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="blue.600">
                  {formatCurrency(calculateTotal())}
                </Text>
              </HStack>
            </VStack>

            <Button
              colorScheme="blue"
              size="lg"
              width="100%"
              mt="6"
              onClick={handleCreatePayment}
              isLoading={creatingPayment}
              loadingText="Đang xử lý..."
              _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              transition="all 0.2s"
            >
              Đặt hàng ngay
            </Button>
          </Box>
        </Flex>
      </VStack>

      {/* Payment Modal */}
      <Modal isOpen={isPaymentModalOpen} onClose={onClosePaymentModal} isCentered size="md">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent>
          <ModalHeader textAlign="center">Thanh toán đơn hàng</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="6">
            <VStack spacing="4">
              {qrCodeUrl && (
                <Box textAlign="center">
                  <Image src={qrCodeUrl} alt="QR Code thanh toán" maxW="250px" mx="auto" borderRadius="md" />
                  <Text fontSize="sm" color="gray.600" mt="2">
                    Quét mã QR để thanh toán
                  </Text>
                </Box>
              )}

              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <Box>
                  <AlertTitle fontSize="sm">Hướng dẫn thanh toán!</AlertTitle>
                  <AlertDescription fontSize="sm">
                    Quét mã QR bằng ứng dụng ngân hàng hoặc ví điện tử để thanh toán. Đơn hàng sẽ được xử lý ngay sau
                    khi nhận được thanh toán.
                  </AlertDescription>
                </Box>
              </Alert>

              {paymentUrl && (
                <Button colorScheme="blue" width="100%" onClick={() => window.open(paymentUrl, '_blank')}>
                  Mở trang thanh toán
                </Button>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default PaymentWrapper;
