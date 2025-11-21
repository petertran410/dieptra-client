'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel as ChakraFormLabel,
  Input,
  Select,
  Stack,
  Text as ChakraText,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Center,
  Alert,
  AlertIcon
} from '@chakra-ui/react';

import OrderList from './order-list';
import { profileService } from '../../../services/profile.service';
import { showToast } from '../../../utils/helper';
import { useAuth } from '../../../contexts/auth-context';
import { PX_ALL } from '../../../utils/const';

const ProfileWrapper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const { user: authUser, isAuthenticated, isChecking, isFullyReady } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [user, setUser] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const formRef = useRef({
    full_name: '',
    email: '',
    phone: '',
    detailed_address: ''
  });

  useEffect(() => {
    if (!isChecking) {
      if (!isAuthenticated) {
        router.replace('/dang-nhap?redirect=/profile');
        return;
      }
    }
  }, [isAuthenticated, isChecking, router]);

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/giaodienblog/provinces/refs/heads/main/district.json'
        );
        if (response.ok) {
          const data = await response.json();
          setProvinces(data);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu tỉnh/thành:', error);
      }
    };
    loadProvinces();
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      if (!isFullyReady || !isAuthenticated) {
        return;
      }

      try {
        setIsLoading(true);
        console.log('Loading profile...');

        const profileData = await profileService.getProfile();
        const userData = profileData.user;

        setUser(userData);
        formRef.current = {
          full_name: userData.full_name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          detailed_address: userData.detailed_address || ''
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
        console.error('Error loading profile:', error);
        showToast({
          status: 'error',
          content: 'Không thể tải thông tin cá nhân. Vui lòng thử lại.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (provinces.length > 0) {
      loadProfile();
    }
  }, [isFullyReady, isAuthenticated, provinces]);

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

  const handleInputChange = useCallback(
    (field) => (e) => {
      formRef.current[field] = e.target.value;
    },
    []
  );

  const validateForm = () => {
    const { full_name, email, phone } = formRef.current;

    if (!full_name.trim()) {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast({ status: 'error', content: 'Email không hợp lệ' });
      return false;
    }

    return true;
  };

  const handleUpdateProfile = async () => {
    if (!validateForm()) return;

    setIsUpdating(true);
    try {
      const province = provinces.find((p) => p.code === selectedProvince);
      const district = districts.find((d) => d.code === selectedDistrict);
      const ward = wards.find((w) => w.code === selectedWard);

      const updateData = {
        full_name: formRef.current.full_name,
        email: formRef.current.email,
        phone: formRef.current.phone,
        detailed_address: formRef.current.detailed_address,
        province: province ? province.name : '',
        district: district ? district.name : '',
        ward: ward ? ward.name : ''
      };

      const response = await profileService.updateProfile(updateData);

      if (response.success !== false) {
        const updatedUser = { ...user, ...updateData };
        setUser(updatedUser);

        showToast({
          status: 'success',
          content: 'Cập nhật thông tin thành công!'
        });

        if (redirectUrl) {
          router.push(redirectUrl);
        }
      } else {
        throw new Error(response.message || 'Cập nhật thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật profile:', error);
      showToast({
        status: 'error',
        content: error.message || 'Có lỗi xảy ra khi cập nhật thông tin'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isChecking || isLoading) {
    return (
      <Center minH="50vh">
        <VStack spacing={4}>
          <Spinner size="lg" color="#065FD4" />
          <ChakraText>Đang tải thông tin...</ChakraText>
        </VStack>
      </Center>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!user) {
    return (
      <Alert status="error">
        <AlertIcon />
        Không thể tải thông tin người dùng
      </Alert>
    );
  }

  return (
    <Box px={PX_ALL} py="40px">
      <VStack spacing={8} align="stretch" maxW="800px" mx="auto">
        <ChakraText fontSize="28px" fontWeight="700" color="#333" textAlign="center">
          Thông tin cá nhân
        </ChakraText>

        <Tabs isFitted variant="enclosed" colorScheme="blue">
          <TabList mb="1em">
            <Tab fontSize="20px">Thông tin tài khoản</Tab>
            <Tab fontSize="20px">Lịch sử đơn hàng</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box bg="white" p={8} borderRadius="12px" boxShadow="sm" border="1px solid #E2E8F0">
                <Stack spacing={6}>
                  <FormControl>
                    <ChakraFormLabel color="#333" fontSize="20px" fontWeight="600">
                      Họ và tên *
                    </ChakraFormLabel>
                    <Input
                      defaultValue={user?.full_name || ''}
                      placeholder="Nhập họ và tên"
                      bg="#F7FAFC"
                      border="1px solid #E2E8F0"
                      fontSize="18px"
                      _focus={{ borderColor: '#065FD4', bg: 'white' }}
                      onChange={handleInputChange('full_name')}
                    />
                  </FormControl>

                  <FormControl>
                    <ChakraFormLabel color="#333" fontSize="20px" fontWeight="600">
                      Email *
                    </ChakraFormLabel>
                    <Input
                      defaultValue={user?.email || ''}
                      placeholder="Nhập email"
                      fontSize="18px"
                      bg="#F7FAFC"
                      border="1px solid #E2E8F0"
                      _focus={{ borderColor: '#065FD4', bg: 'white' }}
                      onChange={handleInputChange('email')}
                    />
                  </FormControl>

                  <FormControl>
                    <ChakraFormLabel color="#333" fontSize="20px" fontWeight="600">
                      Số điện thoại *
                    </ChakraFormLabel>
                    <Input
                      defaultValue={user?.phone || ''}
                      placeholder="Nhập số điện thoại"
                      bg="#F7FAFC"
                      fontSize="18px"
                      border="1px solid #E2E8F0"
                      _focus={{ borderColor: '#065FD4', bg: 'white' }}
                      onChange={handleInputChange('phone')}
                    />
                  </FormControl>

                  <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormControl flex={1}>
                      <ChakraFormLabel color="#333" fontSize="20px" fontWeight="600">
                        Tỉnh/Thành phố
                      </ChakraFormLabel>
                      <Select
                        value={selectedProvince}
                        onChange={(e) => handleProvinceChange(e.target.value)}
                        placeholder="Chọn tỉnh/thành phố"
                        bg="#F7FAFC"
                        fontSize="18px"
                        border="1px solid #E2E8F0"
                        _focus={{ borderColor: '#065FD4', bg: 'white' }}
                      >
                        {provinces.map((province) => (
                          <option key={province.code} value={province.code}>
                            {province.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl flex={1}>
                      <ChakraFormLabel color="#333" fontSize="20px" fontWeight="600">
                        Quận/Huyện
                      </ChakraFormLabel>
                      <Select
                        value={selectedDistrict}
                        onChange={(e) => handleDistrictChange(e.target.value)}
                        placeholder="Chọn quận/huyện"
                        bg="#F7FAFC"
                        fontSize="18px"
                        border="1px solid #E2E8F0"
                        _focus={{ borderColor: '#065FD4', bg: 'white' }}
                        disabled={!selectedProvince}
                      >
                        {districts.map((district) => (
                          <option key={district.code} value={district.code}>
                            {district.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Flex>

                  <FormControl>
                    <ChakraFormLabel color="#333" fontSize="20px" fontWeight="600">
                      Phường/Xã
                    </ChakraFormLabel>
                    <Select
                      value={selectedWard}
                      onChange={(e) => setSelectedWard(parseInt(e.target.value))}
                      fontSize="18px"
                      placeholder="Chọn phường/xã"
                      bg="#F7FAFC"
                      border="1px solid #E2E8F0"
                      _focus={{ borderColor: '#065FD4', bg: 'white' }}
                      disabled={!selectedDistrict}
                    >
                      {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                          {ward.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <ChakraFormLabel color="#333" fontSize="20px" fontWeight="600">
                      Địa chỉ cụ thể
                    </ChakraFormLabel>
                    <Input
                      defaultValue={user?.detailed_address || ''}
                      placeholder="Số nhà, tên đường..."
                      bg="#F7FAFC"
                      fontSize="18px"
                      border="1px solid #E2E8F0"
                      _focus={{ borderColor: '#065FD4', bg: 'white' }}
                      onChange={handleInputChange('detailed_address')}
                    />
                  </FormControl>

                  <Button
                    onClick={handleUpdateProfile}
                    isLoading={isUpdating}
                    loadingText="Đang cập nhật..."
                    bg="#065FD4"
                    color="white"
                    size="lg"
                    _hover={{ bg: '#0052CC' }}
                    _active={{ bg: '#003D99' }}
                  >
                    Cập nhật thông tin
                  </Button>
                </Stack>
              </Box>
            </TabPanel>
            <TabPanel>
              <OrderList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default ProfileWrapper;
