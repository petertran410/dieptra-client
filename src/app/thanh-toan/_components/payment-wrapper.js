'use client';

import { useQueryProductBySlugs } from '../../../services/product.service';
import {
  useMutateCreatePayment,
  useQueryPaymentStatus,
  useMutateCreateCODOrder
} from '../../../services/payment.service';
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
  Select,
  Badge,
  Icon,
  Container,
  Heading,
  Checkbox
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { authService } from '../../../services/auth.service';
import { profileService } from '../../../services/profile.service';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCreditCard,
  FiShoppingCart,
  FiCheckCircle,
  FiPackage,
  FiTruck
} from 'react-icons/fi';
import { BsBank } from 'react-icons/bs';

const PaymentWrapper = () => {
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartAtom);
  const cartSlugs = useMemo(() => cart?.map((i) => i.slug).filter(Boolean) || [], [cart]);
  const { data: cartData = [], isLoading: loadingProducts } = useQueryProductBySlugs(cartSlugs);
  const { mutateAsync: createCODOrder, isPending: creatingCODOrder } = useMutateCreateCODOrder();

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

  const [isCOD, setIsCOD] = useState(false);

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
  } = useQueryPaymentStatus(currentOrderId, !currentOrderId);

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

  useEffect(() => {
    const loadProfile = async () => {
      if (!isAuthenticated || provinces.length === 0) return;

      try {
        const profileData = await profileService.getProfile();
        const userData = profileData.user;

        customerInfoRef.current = {
          fullName: userData.full_name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.detailed_address || '',
          note: ''
        };

        if (userData.province && provinces.length > 0) {
          const province = provinces.find((p) => p.name === userData.province);
          if (province) {
            setSelectedProvince(province.code);
            if (province.districts) {
              setDistricts(province.districts);

              if (userData.district) {
                const district = province.districts.find((d) => d.name === userData.district);
                if (district) {
                  setSelectedDistrict(district.code);
                  if (district.wards) {
                    setWards(district.wards);

                    if (userData.ward) {
                      const ward = district.wards.find((w) => w.name === userData.ward);
                      if (ward) {
                        setSelectedWard(ward.code);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Lỗi khi tải thông tin profile:', error);
      }
    };

    loadProfile();
  }, [isAuthenticated, provinces]);

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

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      showToast({ status: 'error', content: 'Số điện thoại không hợp lệ (10 chữ số)' });
      return false;
    }

    return true;
  };

  const cannotPay = async () =>
    showToast({
      status: 'error',
      content: 'Chức Năng Còn Phát Triển'
    });

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    try {
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

  const handleCODPayment = async () => {
    if (!validateForm()) {
      return;
    }

    try {
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
        paymentMethod: 'cod',
        amounts: {
          subtotal: calculateSubtotal(),
          shipping: calculateShipping(),
          total: calculateTotal()
        }
      };

      addDebugLog('📤 Sending COD order data', paymentData);

      const response = await createCODOrder(paymentData);

      addDebugLog('📥 COD order creation response', response);

      if (response.success) {
        addDebugLog('✅ COD order created', {
          orderId: response.orderId,
          paymentMethod: 'cod'
        });

        showToast({
          status: 'success',
          content: 'Đơn hàng COD đã được tạo thành công!'
        });

        setCart([]);
        router.push(`/thanh-toan/cod-success?orderId=${response.orderId}`);
      }
    } catch (error) {
      console.error('COD order creation error:', error);
      addDebugLog('❌ COD order creation failed', error);
      showToast({
        status: 'error',
        content: error.message || 'Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!'
      });
    }
  };

  if (loadingProducts) {
    return (
      <Flex justify="center" align="center" minH="60vh" bgGradient="linear(to-br, blue.50, purple.50)">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" thickness="4px" />
          <Text fontSize="lg" fontWeight="medium" color="gray.700">
            Đang tải thông tin sản phẩm...
          </Text>
        </VStack>
      </Flex>
    );
  }

  if (cart.length === 0) {
    return (
      <Flex
        justify="center"
        align="center"
        minH="60vh"
        direction="column"
        bgGradient="linear(to-br, blue.50, purple.50)"
      >
        <Box bg="white" p={8} borderRadius="xl" boxShadow="xl" textAlign="center" maxW="400px">
          <Icon as={FiShoppingCart} boxSize={16} color="gray.400" mb={4} />
          <Text fontSize="2xl" fontWeight="bold" mb={2} color="gray.700">
            Giỏ hàng trống
          </Text>
          <Text color="gray.600" mb={6}>
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </Text>
          <Button colorScheme="blue" size="lg" onClick={() => router.push('/san-pham')} leftIcon={<FiPackage />}>
            Khám phá sản phẩm
          </Button>
        </Box>
      </Flex>
    );
  }

  if (authLoading) {
    return (
      <Flex
        justify="center"
        align="center"
        minH="60vh"
        direction="column"
        bgGradient="linear(to-br, blue.50, purple.50)"
      >
        <VStack spacing={4}>
          <Spinner size="lg" color="blue.500" thickness="4px" />
          <Text color="gray.700">Đang kiểm tra đăng nhập...</Text>
        </VStack>
      </Flex>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, blue.50, purple.50, pink.50)"
      pt={{ base: '70px', lg: '162px', xs: '85px' }}
      pb="50px"
    >
      <Container maxW="full" px={PX_ALL}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="xl" bgGradient="linear(to-r, blue.600, purple.600)" bgClip="text" mb={2}>
              Hoàn tất đơn hàng
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Vui lòng kiểm tra thông tin
            </Text>
          </Box>

          <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
            <Box
              flex="1"
              bg="white"
              p={8}
              borderRadius="xl"
              boxShadow="lg"
              transition="all 0.3s"
              _hover={{ boxShadow: 'xl' }}
            >
              <HStack mb={6} spacing={3}>
                <Icon as={FiUser} boxSize={6} color="blue.500" />
                <Heading size="md" color="gray.800">
                  Thông tin khách hàng
                </Heading>
              </HStack>

              <VStack spacing={5}>
                <FormControl>
                  <FormLabel fontWeight="medium" color="gray.700">
                    <HStack spacing={2}>
                      <Icon as={FiUser} />
                      <Text>Họ và tên</Text>
                    </HStack>
                  </FormLabel>
                  <Input
                    value={customerInfoRef.current.fullName}
                    placeholder="Nhập họ và tên"
                    onChange={handleInputChange('fullName')}
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="blue.400"
                    _hover={{ borderColor: 'blue.300' }}
                    autoComplete="off"
                    cursor="not-allowed"
                    isReadOnly
                    isDisabled
                    _disabled={{
                      opacity: 1,
                      cursor: 'not-allowed'
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="medium" color="gray.700">
                    <HStack spacing={2}>
                      <Icon as={FiMail} />
                      <Text>Email</Text>
                    </HStack>
                  </FormLabel>
                  <Input
                    value={customerInfoRef.current.email}
                    placeholder="Nhập email"
                    onChange={handleInputChange('email')}
                    type="email"
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="blue.400"
                    _hover={{ borderColor: 'blue.300' }}
                    autoComplete="off"
                    cursor="not-allowed"
                    isReadOnly
                    isDisabled
                    _disabled={{
                      opacity: 1,
                      cursor: 'not-allowed'
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="medium" color="gray.700">
                    <HStack spacing={2}>
                      <Icon as={FiPhone} />
                      <Text>Số điện thoại</Text>
                    </HStack>
                  </FormLabel>
                  <Input
                    value={customerInfoRef.current.phone}
                    placeholder="Nhập số điện thoại"
                    onChange={handleInputChange('phone')}
                    type="tel"
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="blue.400"
                    _hover={{ borderColor: 'blue.300' }}
                    autoComplete="off"
                    cursor="not-allowed"
                    isReadOnly
                    isDisabled
                    _disabled={{
                      opacity: 1,
                      cursor: 'not-allowed'
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="medium" color="gray.700">
                    <HStack spacing={2}>
                      <Icon as={FiMapPin} />
                      <Text>Tỉnh/Thành phố</Text>
                    </HStack>
                  </FormLabel>
                  <Select
                    placeholder="Chọn tỉnh/thành phố"
                    value={selectedProvince}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="blue.400"
                    _hover={{ borderColor: 'blue.300' }}
                    cursor="not-allowed"
                    isReadOnly
                    isDisabled
                    _disabled={{
                      opacity: 1,
                      cursor: 'not-allowed'
                    }}
                  >
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="medium" color="gray.700">
                    <HStack spacing={2}>
                      <Icon as={FiMapPin} />
                      <Text>Quận/Huyện</Text>
                    </HStack>
                  </FormLabel>
                  <Select
                    placeholder="Chọn quận/huyện"
                    value={selectedDistrict}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="blue.400"
                    _hover={{ borderColor: 'blue.300' }}
                    cursor="not-allowed"
                    isReadOnly
                    isDisabled
                    _disabled={{
                      opacity: 1,
                      cursor: 'not-allowed'
                    }}
                  >
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="medium" color="gray.700">
                    <HStack spacing={2}>
                      <Icon as={FiMapPin} />
                      <Text>Phường/Xã</Text>
                    </HStack>
                  </FormLabel>
                  <Select
                    placeholder="Chọn phường/xã"
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(parseInt(e.target.value))}
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="blue.400"
                    _hover={{ borderColor: 'blue.300' }}
                    cursor="not-allowed"
                    isReadOnly
                    isDisabled
                    _disabled={{
                      opacity: 1,
                      cursor: 'not-allowed'
                    }}
                  >
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="medium" color="gray.700">
                    <HStack spacing={2}>
                      <Icon as={FiMapPin} />
                      <Text>Địa chỉ cụ thể</Text>
                    </HStack>
                  </FormLabel>
                  <Input
                    value={customerInfoRef.current.address}
                    placeholder="Nhập địa chỉ cụ thể"
                    onChange={handleInputChange('address')}
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="blue.400"
                    _hover={{ borderColor: 'blue.300' }}
                    autoComplete="off"
                    cursor="not-allowed"
                    isReadOnly
                    isDisabled
                    _disabled={{
                      opacity: 1,
                      cursor: 'not-allowed'
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="medium" color="gray.700">
                    Ghi chú
                  </FormLabel>
                  <Textarea
                    onChange={handleInputChange('note')}
                    placeholder="Ghi chú đặc biệt (không bắt buộc)"
                    rows="2"
                    borderRadius="lg"
                    focusBorderColor="blue.400"
                    _hover={{ borderColor: 'blue.300' }}
                    autoComplete="off"
                  />
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    Bạn có thể thêm ghi chú cho đơn hàng tại đây
                  </Text>
                </FormControl>
              </VStack>

              <Box mt={8}>
                <HStack mb={5} spacing={3}>
                  <Icon as={FiCreditCard} boxSize={6} color="purple.500" />
                  <Heading size="md" color="gray.800">
                    Phương thức thanh toán
                  </Heading>
                </HStack>

                <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                  <Stack spacing={4}>
                    <Box
                      p={4}
                      border="2px"
                      borderColor={paymentMethod === 'sepay_bank' ? 'blue.500' : 'gray.200'}
                      borderRadius="lg"
                      cursor="pointer"
                      transition="all 0.3s"
                      _hover={{
                        borderColor: 'blue.400',
                        transform: 'translateY(-2px)',
                        boxShadow: 'md'
                      }}
                      bg={paymentMethod === 'sepay_bank' ? 'blue.50' : 'white'}
                    >
                      <Radio value="sepay_bank" colorScheme="blue" size="lg">
                        <HStack spacing={3} ml={2}>
                          <Icon as={BsBank} boxSize={6} color="blue.600" />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="semibold" fontSize="lg">
                              Chuyển khoản ngân hàng
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              Thanh toán qua QR Code hoặc tạo đơn COD
                            </Text>
                          </VStack>
                        </HStack>
                      </Radio>
                    </Box>
                  </Stack>
                </RadioGroup>
              </Box>
            </Box>

            <Box
              flex="1"
              bg="white"
              p={8}
              borderRadius="xl"
              boxShadow="lg"
              h="fit-content"
              position="sticky"
              top="100px"
              transition="all 0.3s"
              _hover={{ boxShadow: 'xl' }}
            >
              <HStack mb={6} spacing={3}>
                <Icon as={FiShoppingCart} boxSize={6} color="purple.500" />
                <Heading size="md" color="gray.800">
                  Thông tin đơn hàng
                </Heading>
              </HStack>

              <VStack spacing={4} align="stretch" mb={6}>
                {cartData.map((product) => {
                  const cartItem = cart.find((item) => Number(item.id) === Number(product.id));
                  const { kiotViet } = product;
                  const quantity = cartItem ? cartItem.quantity : 1;
                  const itemTotal = product.price * quantity;
                  const image_url = kiotViet.images?.[0] || '';

                  return (
                    <Box
                      key={product.id}
                      p={4}
                      bg="gray.50"
                      borderRadius="lg"
                      transition="all 0.3s"
                      _hover={{ bg: 'gray.100' }}
                    >
                      <HStack spacing={4}>
                        <Image
                          src={image_url}
                          alt={product.title || IMG_ALT}
                          boxSize="120px"
                          objectFit="contain"
                          borderRadius="md"
                          boxShadow="sm"
                        />
                        <VStack align="start" flex={1} spacing={1}>
                          <Text fontWeight="semibold" fontSize="lg">
                            {product.title}
                          </Text>
                          <HStack justify="space-between" w="full">
                            <Badge colorScheme="blue" fontSize="md">
                              x{quantity}
                            </Badge>
                            <Text fontWeight="bold" color="blue.600" fontSize="2xl">
                              {formatCurrency(itemTotal)}
                            </Text>
                          </HStack>
                        </VStack>
                      </HStack>
                    </Box>
                  );
                })}
              </VStack>

              <Divider my={6} />

              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text color="gray.600" fontSize="lg">
                    Tạm tính:
                  </Text>
                  <Text fontWeight="bold" fontSize="lg" bgGradient="linear(to-r, blue.600, purple.600)" bgClip="text">
                    {formatCurrency(calculateSubtotal())}
                  </Text>
                </HStack>

                <HStack justify="space-between" fontSize="lg">
                  <HStack>
                    <Icon as={FiTruck} color="green.500" fontSize="lg" />
                    <Text color="gray.600" fontSize="lg">
                      Đơn vị vận chuyển:
                    </Text>
                  </HStack>
                  <Badge fontSize="md" px={3} py={1}>
                    Giao hàng nhanh
                  </Badge>
                </HStack>

                <Divider />

                <HStack justify="space-between">
                  <Text color="gray.600" fontSize="2xl">
                    Tổng cộng:
                  </Text>
                  <Text fontWeight="bold" bgGradient="linear(to-r, blue.600, purple.600)" bgClip="text" fontSize="2xl">
                    {formatCurrency(calculateTotal())}
                  </Text>
                </HStack>

                {/* Checkbox COD */}
                <Box
                  p={4}
                  borderWidth="2px"
                  borderRadius="lg"
                  borderColor={isCOD ? 'green.500' : 'gray.200'}
                  bg={isCOD ? 'green.50' : 'transparent'}
                  transition="all 0.3s"
                  _hover={{ borderColor: isCOD ? 'green.600' : 'gray.300', bg: isCOD ? 'green.100' : 'gray.50' }}
                >
                  <HStack spacing={3}>
                    <Checkbox
                      isChecked={isCOD}
                      onChange={(e) => setIsCOD(e.target.checked)}
                      colorScheme="green"
                      size="lg"
                    />
                    <VStack align="start" spacing={0} flex="1" cursor="pointer" onClick={() => setIsCOD(!isCOD)}>
                      <HStack>
                        <Icon as={FiTruck} color="green.500" boxSize={5} />
                        <Text fontWeight="semibold" fontSize="md">
                          Thanh toán khi nhận hàng (COD)
                        </Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">
                        Thanh toán bằng tiền mặt khi nhận hàng
                      </Text>
                    </VStack>
                  </HStack>
                </Box>

                <Flex justify={{ base: 'stretch', lg: 'flex-end' }} mt={4}>
                  <Stack direction={{ base: 'column', lg: 'row' }} spacing={3} w={{ base: 'full', lg: 'auto' }}>
                    <Button
                      colorScheme="green"
                      w={{ base: 'full', lg: '180px' }}
                      h="60px"
                      fontSize="18px"
                      fontWeight="600"
                      // onClick={isCOD ? handleCODPayment : handlePayment}
                      onClick={isCOD ? handleCODPayment : cannotPay}
                      // isLoading={isCOD ? creatingCODOrder : creatingPayment}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'xl'
                      }}
                      leftIcon={<Icon as={isCOD ? FiPackage : FiCheckCircle} boxSize={6} />}
                      transition="all 0.3s"
                    >
                      {isCOD ? 'Tạo đơn hàng' : 'Thanh toán ngay'}
                    </Button>

                    <Button
                      colorScheme="blue"
                      color="#FFF"
                      w={{ base: 'full', lg: '180px' }}
                      h="60px"
                      fontSize="18px"
                      fontWeight="600"
                      onClick={() => router.push('/gio-hang')}
                      leftIcon={<Icon as={FiShoppingCart} boxSize={6} />}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'xl'
                      }}
                      _active={{ bgColor: '#5d97e3' }}
                      transition="all 0.3s"
                    >
                      Quay lại giỏ hàng
                    </Button>
                  </Stack>
                </Flex>
              </VStack>

              {/* <VStack spacing={4} mt={8}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  width="100%"
                  height="60px"
                  fontSize="lg"
                  onClick={handlePayment}
                  isLoading={creatingPayment}
                  bgGradient="linear(to-r, blue.500, purple.500)"
                  _hover={{
                    bgGradient: 'linear(to-r, blue.600, purple.600)',
                    transform: 'translateY(-2px)',
                    boxShadow: 'xl'
                  }}
                  leftIcon={<Icon as={FiCheckCircle} boxSize={6} />}
                  transition="all 0.3s"
                >
                  {paymentMethod === 'cod' ? 'Đặt hàng COD' : 'Thanh toán ngay'}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  width="100%"
                  height="50px"
                  onClick={() => router.push('/gio-hang')}
                  leftIcon={<FiShoppingCart />}
                  _hover={{
                    bg: 'gray.50',
                    transform: 'translateY(-2px)'
                  }}
                  transition="all 0.3s"
                >
                  Quay lại giỏ hàng
                </Button>
              </VStack> */}

              {/* <Alert status="info" mt={6} borderRadius="lg" bg="blue.50" border="1px" borderColor="blue.200">
                <AlertIcon color="blue.500" />
                <Box fontSize="sm">
                  <Text fontWeight="semibold" color="blue.800">
                    Thanh toán an toàn & bảo mật
                  </Text>
                  <Text color="blue.700" fontSize="xs">
                    Thông tin của bạn được mã hóa và bảo vệ
                  </Text>
                </Box>
              </Alert> */}
            </Box>
          </Flex>
        </VStack>
      </Container>

      <Modal isOpen={isPaymentModalOpen} onClose={onClosePaymentModal} size="xl" closeOnOverlayClick={false} isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent borderRadius="2xl" overflow="hidden">
          <Box bgGradient="linear(to-r, blue.500, purple.500)" p={6}>
            <ModalHeader color="white" fontSize="2xl" p={0}>
              <HStack spacing={3}>
                <Icon as={BsBank} boxSize={8} />
                <Text>Thanh toán đơn hàng</Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton color="white" size="lg" />
          </Box>

          <ModalBody p={8}>
            <VStack spacing={6}>
              <Alert status="info" borderRadius="lg" bg="blue.50" border="2px" borderColor="blue.200">
                <AlertIcon color="blue.500" boxSize={6} />
                <Box>
                  <AlertTitle fontSize="lg">Đang chờ thanh toán!</AlertTitle>
                  <AlertDescription fontSize="md">Vui lòng thực hiện thanh toán để hoàn tất đơn hàng.</AlertDescription>
                </Box>
              </Alert>

              {qrCodeUrl && (
                <Box textAlign="center" p={6} bg="gray.50" borderRadius="xl" w="full">
                  <Text fontSize="xl" fontWeight="bold" mb={4} color="gray.800">
                    Quét mã QR để thanh toán
                  </Text>
                  <Box p={4} bg="white" borderRadius="lg" display="inline-block" boxShadow="lg">
                    <Image src={qrCodeUrl} alt="QR Code thanh toán" maxW="280px" mx="auto" />
                  </Box>
                  <HStack justify="center" mt={4} spacing={2} p={3} bg="green.50" borderRadius="lg">
                    <Text fontSize="md" color="gray.700">
                      Tổng tiền:
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="green.600">
                      {formatCurrency(calculateTotal())}
                    </Text>
                  </HStack>
                </Box>
              )}

              {paymentUrl && !qrCodeUrl && (
                <Box textAlign="center" w="full">
                  <Text fontSize="xl" fontWeight="bold" mb={4} color="gray.800">
                    Nhấn vào liên kết để thanh toán
                  </Text>
                  <Button
                    as="a"
                    href={paymentUrl}
                    target="_blank"
                    colorScheme="blue"
                    size="lg"
                    w="full"
                    height="60px"
                    fontSize="lg"
                    bgGradient="linear(to-r, blue.500, purple.500)"
                    _hover={{
                      bgGradient: 'linear(to-r, blue.600, purple.600)',
                      transform: 'translateY(-2px)'
                    }}
                  >
                    Mở trang thanh toán
                  </Button>
                </Box>
              )}

              <Alert status="warning" borderRadius="lg" bg="orange.50" border="1px" borderColor="orange.200">
                <AlertIcon color="orange.500" />
                <AlertDescription fontSize="sm" color="orange.900">
                  Vui lòng không tắt trang này cho đến khi thanh toán hoàn tất. Hệ thống sẽ tự động cập nhật khi thanh
                  toán thành công.
                </AlertDescription>
              </Alert>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PaymentWrapper;
