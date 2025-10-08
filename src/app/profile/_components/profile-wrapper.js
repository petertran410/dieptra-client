'use client';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Flex
} from '@chakra-ui/react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../../services/auth.service';
import { profileService } from '../../../services/profile.service';
import { showToast } from '../../../utils/helper';

const ProfileWrapper = () => {
  const router = useRouter();
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
    const loadProvinces = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/giaodienblog/provinces/refs/heads/main/district.json'
        );
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu tỉnh/thành:', error);
        showToast({ status: 'error', content: 'Lỗi khi tải dữ liệu địa chỉ' });
      }
    };
    loadProvinces();
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || !currentUser.token) {
          router.replace('/dang-nhap?redirect=/profile');
          return;
        }

        const profileData = await profileService.getProfile();
        const userData = profileData.user;

        setUser(userData);
        formRef.current = {
          full_name: userData.full_name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          detailed_address: userData.detailed_address || ''
        };

        // Set address data if available
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
        showToast({ status: 'error', content: 'Lỗi khi tải thông tin cá nhân' });
      } finally {
        setIsLoading(false);
      }
    };

    if (provinces.length > 0) {
      loadProfile();
    }
  }, [router, provinces]);

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
        // Update local user data
        const updatedUser = { ...user, ...updateData };
        setUser(updatedUser);

        showToast({
          status: 'success',
          content: 'Cập nhật thông tin thành công!'
        });
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

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
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
    <Box maxW="800px" mx="auto">
      <Card>
        <Flex align="center" justify="center">
          <CardHeader>
            <Heading size="lg" color="#003366" textAlign="center">
              Thông tin cá nhân
            </Heading>
            <Text color="gray.600" mt={2} fontSize="md" textAlign="center">
              Quản lý thông tin tài khoản và địa chỉ giao hàng của bạn
            </Text>
          </CardHeader>
        </Flex>

        <CardBody>
          <VStack spacing={6} align="stretch">
            {/* Basic Info */}
            <FormControl isRequired>
              <FormLabel>Họ và tên</FormLabel>
              <Input
                defaultValue={user.full_name}
                onChange={handleInputChange('full_name')}
                placeholder="Nhập họ và tên"
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl isRequired flex={1}>
                <FormLabel>Số điện thoại</FormLabel>
                <Input
                  defaultValue={user.phone}
                  onChange={handleInputChange('phone')}
                  placeholder="Nhập số điện thoại"
                  type="tel"
                />
              </FormControl>

              <FormControl isRequired flex={1}>
                <FormLabel>Email</FormLabel>
                <Input
                  defaultValue={user.email}
                  onChange={handleInputChange('email')}
                  placeholder="Nhập email"
                  type="email"
                />
              </FormControl>
            </HStack>

            <Divider />

            {/* Address Section */}
            <Heading size="md" color="#003366">
              Địa chỉ giao hàng
            </Heading>

            <HStack spacing={4}>
              <FormControl flex={1}>
                <FormLabel>Tỉnh/Thành phố</FormLabel>
                <Select
                  value={selectedProvince}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  placeholder="-- Chọn tỉnh/thành --"
                >
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl flex={1}>
                <FormLabel>Quận/Huyện</FormLabel>
                <Select
                  value={selectedDistrict}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  placeholder="-- Chọn quận/huyện --"
                  disabled={!selectedProvince}
                >
                  {districts.map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Phường/Xã</FormLabel>
              <Select
                value={selectedWard}
                onChange={(e) => setSelectedWard(parseInt(e.target.value))}
                placeholder="-- Chọn phường/xã --"
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
              <FormLabel>Địa chỉ chi tiết</FormLabel>
              <Textarea
                defaultValue={user.detailed_address}
                onChange={handleInputChange('detailed_address')}
                placeholder="Số nhà, tên đường, ngõ/hẻm..."
                rows={3}
              />
            </FormControl>

            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleUpdateProfile}
              isLoading={isUpdating}
              loadingText="Đang cập nhật..."
            >
              Cập nhật thông tin
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ProfileWrapper;
