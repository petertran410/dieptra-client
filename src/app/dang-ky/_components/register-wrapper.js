'use client';

import { useState, useEffect } from 'react';
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
  PinInputField,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import Link from 'next/link';
import { authService } from '../../../services/auth.service';
import { showToast } from '../../../utils/helper';
import { PX_ALL } from '../../../utils/const';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

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
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  const formatCountdown = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
      setCountdown(600);
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
      const errorMessage = error?.message || '';

      let toastContent = 'Mã OTP không hợp lệ. Vui lòng thử lại.';

      if (errorMessage.includes('expired') || errorMessage.includes('hết hạn')) {
        toastContent = 'Mã xác thực đã hết hạn. Vui lòng gửi lại mã mới.';
      } else if (errorMessage.includes('Invalid verification code') || errorMessage.includes('không hợp lệ')) {
        toastContent = 'Mã xác thực không đúng. Vui lòng kiểm tra lại.';
      }
      // else if (errorMessage.includes('No pending registration') || errorMessage.includes('không tìm thấy')) {
      //   toastContent = 'Không tìm thấy yêu cầu đăng ký. Vui lòng đăng ký lại.';
      // }

      showToast({
        status: 'error',
        content: toastContent
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
      setCountdown(600);
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
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.pass_word}
                        onChange={(e) => handleChange('pass_word', e.target.value)}
                        placeholder="Nhập mật khẩu"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowPassword(!showPassword)}
                          variant="ghost"
                          size="sm"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.pass_word}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.confirmPassword}>
                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                    <InputGroup>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                          icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          variant="ghost"
                          size="sm"
                        />
                      </InputRightElement>
                    </InputGroup>
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

                <Button
                  variant="ghost"
                  color="#065FD4"
                  onClick={handleResendOtp}
                  isDisabled={countdown > 0 || isLoading}
                  opacity={countdown > 0 ? 0.4 : 1}
                  cursor={countdown > 0 ? 'not-allowed' : 'pointer'}
                  _hover={countdown > 0 ? {} : { bg: 'gray.100' }}
                >
                  {countdown > 0 ? `Gửi lại mã (${formatCountdown(countdown)})` : 'Gửi lại mã'}
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
