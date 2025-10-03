'use client';

import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link as ChakraLink,
  PinInput,
  PinInputField
} from '@chakra-ui/react';
import Link from 'next/link';
import { authService } from '../../../services/auth.service';
import { showToast } from '../../../utils/helper';
import { PX_ALL } from '../../../utils/const';

const RegisterWrapper = () => {
  const [step, setStep] = useState('register');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pass_word: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ tên không được để trống';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10-11 số)';
    }

    if (!formData.pass_word) {
      newErrors.pass_word = 'Mật khẩu không được để trống';
    } else if (formData.pass_word.length < 6) {
      newErrors.pass_word = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (formData.pass_word !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await authService.register(registerData);

      showToast({
        status: 'success',
        content: 'Mã xác thực đã được gửi đến email của bạn!'
      });

      setStep('verify');
    } catch (error) {
      showToast({
        status: 'error',
        content: error?.message || 'Đăng ký thất bại. Vui lòng thử lại.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      showToast({
        status: 'error',
        content: 'Vui lòng nhập đủ 6 số mã OTP'
      });
      return;
    }

    setIsLoading(true);
    try {
      await authService.verifyEmail(formData.email, otp);

      showToast({
        status: 'success',
        content: 'Đăng ký thành công!'
      });

      window.location.href = '/';
    } catch (error) {
      showToast({
        status: 'error',
        content: error?.message || 'Mã OTP không hợp lệ hoặc đã hết hạn'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await authService.register(registerData);

      showToast({
        status: 'success',
        content: 'Mã xác thực mới đã được gửi đến email của bạn!'
      });
      setOtp('');
    } catch (error) {
      showToast({
        status: 'error',
        content: 'Không thể gửi lại mã. Vui lòng thử lại.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      direction="column"
      px={PX_ALL}
      pt={{ xs: '100px', lg: '180px' }}
      pb="50px"
      justify="center"
      align="center"
      minH="100vh"
    >
      <Box w={{ xs: 'full', md: '400px' }} p="32px" borderRadius="16px" border="1px solid #E4E4E7" bg="white">
        <VStack spacing="24px">
          {step === 'register' ? (
            <>
              <Text fontSize="24px" fontWeight={600} textAlign="center">
                Đăng ký tài khoản
              </Text>

              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <VStack spacing="16px">
                  <FormControl isInvalid={!!errors.fullName}>
                    <FormLabel>Họ tên</FormLabel>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="Nhập họ tên"
                    />
                    <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="Nhập email"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.phone}>
                    <FormLabel>Số điện thoại</FormLabel>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="Nhập số điện thoại"
                    />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.pass_word}>
                    <FormLabel>Mật khẩu</FormLabel>
                    <Input
                      type="password"
                      value={formData.pass_word}
                      onChange={(e) => handleChange('pass_word', e.target.value)}
                      placeholder="Nhập mật khẩu"
                    />
                    <FormErrorMessage>{errors.pass_word}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.confirmPassword}>
                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                    />
                    <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                  </FormControl>

                  <Button
                    type="submit"
                    w="full"
                    h="48px"
                    bg="#065FD4"
                    color="white"
                    fontWeight={600}
                    isLoading={isLoading}
                    _hover={{ bg: '#0052B8' }}
                  >
                    Đăng ký
                  </Button>
                </VStack>
              </form>

              <Text textAlign="center">
                Đã có tài khoản?{' '}
                <Link href="/dang-nhap">
                  <ChakraLink color="#065FD4" fontWeight={500}>
                    Đăng nhập
                  </ChakraLink>
                </Link>
              </Text>
            </>
          ) : (
            <>
              <Text fontSize="24px" fontWeight={600} textAlign="center">
                Xác thực email
              </Text>

              <VStack spacing="16px" w="full">
                <Text textAlign="center" color="gray.600">
                  Mã xác thực đã được gửi đến
                </Text>
                <Text fontWeight={600} color="#065FD4">
                  {formData.email}
                </Text>

                <FormControl>
                  <FormLabel textAlign="center">Nhập mã OTP (6 số)</FormLabel>
                  <HStack justify="center">
                    <PinInput value={otp} onChange={setOtp} otp size="lg" manageFocus>
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </FormControl>

                <Button
                  w="full"
                  h="48px"
                  bg="#065FD4"
                  color="white"
                  fontWeight={600}
                  isLoading={isLoading}
                  onClick={handleVerifyOtp}
                  _hover={{ bg: '#0052B8' }}
                >
                  Xác nhận
                </Button>

                <Button variant="ghost" color="#065FD4" onClick={handleResendOtp} isDisabled={isLoading}>
                  Gửi lại mã
                </Button>

                <Button variant="ghost" onClick={() => setStep('register')} isDisabled={isLoading}>
                  Quay lại
                </Button>
              </VStack>
            </>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default RegisterWrapper;
