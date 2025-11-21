'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { authService } from '../../../services/auth.service';
import { showToast } from '../../../utils/helper';
import { PX_ALL } from '../../../utils/const';

const ForgotPasswordWrapper = () => {
  const router = useRouter();
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showNewPassword, setShowNewPassword] = useState(false);
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

  const validateEmail = () => {
    if (!email.trim()) {
      return 'Email không được để trống';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Email không hợp lệ';
    }
    return '';
  };

  const validatePassword = () => {
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = 'Mật khẩu mới không được để trống';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword = 'Mật khẩu phải có ít nhất 1 chữ cái in hoa';
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
      newErrors.newPassword = 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt';
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    return newErrors;
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    const emailError = validateEmail();
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setIsLoading(true);
    try {
      await authService.forgotPasswordRequest(email);
      showToast({
        status: 'success',
        content: 'Mã OTP đã được gửi đến email của bạn!'
      });
      setStep('verify');
      setCountdown(600);
      setErrors({});
    } catch (error) {
      showToast({
        status: 'error',
        content: 'Email không tồn tại' || error?.message
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
      await authService.verifyForgotPasswordOtp(email, otp);
      showToast({
        status: 'success',
        content: 'Xác thực thành công!'
      });
      setStep('reset');
      setErrors({});
    } catch (error) {
      const errorMessage = error?.message || '';
      let toastContent = 'Mã OTP không hợp lệ. Vui lòng thử lại.';

      if (errorMessage.includes('expired') || errorMessage.includes('hết hạn')) {
        toastContent = 'Mã xác thực đã hết hạn. Vui lòng gửi lại mã mới.';
      } else if (errorMessage.includes('Invalid') || errorMessage.includes('không đúng')) {
        toastContent = 'Mã xác thực không đúng. Vui lòng kiểm tra lại.';
      }

      showToast({
        status: 'error',
        content: toastContent
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newErrors = validatePassword();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword(email, otp, newPassword);
      showToast({
        status: 'success',
        content: 'Đặt lại mật khẩu thành công!'
      });
      setTimeout(() => {
        router.push('/dang-nhap');
      }, 1500);
    } catch (error) {
      showToast({
        status: 'error',
        content: error?.message || 'Đặt lại mật khẩu thất bại. Vui lòng thử lại.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await authService.forgotPasswordRequest(email);
      showToast({
        status: 'success',
        content: 'Mã OTP mới đã được gửi đến email của bạn!'
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
          {step === 'email' && (
            <>
              <Text fontSize="24px" fontWeight={600} textAlign="center">
                Quên mật khẩu
              </Text>
              <Text textAlign="center" color="gray.600" fontSize="14px">
                Nhập email đã đăng ký để nhận mã xác thực
              </Text>

              <form onSubmit={handleRequestOtp} style={{ width: '100%' }}>
                <VStack spacing="16px">
                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({});
                      }}
                      placeholder="Nhập email"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
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
                    Gửi mã xác thực
                  </Button>
                </VStack>
              </form>

              <Text textAlign="center">
                Đã nhớ mật khẩu?{' '}
                <Link href="/dang-nhap">
                  <ChakraLink color="#065FD4" fontWeight={500}>
                    Đăng nhập
                  </ChakraLink>
                </Link>
              </Text>
            </>
          )}

          {step === 'verify' && (
            <>
              <Text fontSize="24px" fontWeight={600} textAlign="center">
                Xác thực OTP
              </Text>

              <VStack spacing="16px" w="full">
                <Text textAlign="center" color="gray.600">
                  Mã xác thực đã được gửi đến
                </Text>
                <Text fontWeight={600} color="#065FD4">
                  {email}
                </Text>

                <VStack spacing="8px" w="full">
                  <Text textAlign="center" fontSize="14px" color="gray.700" fontWeight={500}>
                    Nhập mã OTP (6 số)
                  </Text>
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
                </VStack>

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

                <Button variant="ghost" onClick={() => setStep('email')} isDisabled={isLoading}>
                  Quay lại
                </Button>
              </VStack>
            </>
          )}

          {step === 'reset' && (
            <>
              <Text fontSize="24px" fontWeight={600} textAlign="center">
                Đặt lại mật khẩu
              </Text>

              <form onSubmit={handleResetPassword} style={{ width: '100%' }}>
                <VStack spacing="16px">
                  <FormControl isInvalid={!!errors.newPassword}>
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <InputGroup>
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: '' }));
                        }}
                        placeholder="Nhập mật khẩu mới"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={showNewPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                          icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          variant="ghost"
                          size="sm"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.confirmPassword}>
                    <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                    <InputGroup>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                        }}
                        placeholder="Nhập lại mật khẩu mới"
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
                    Đặt lại mật khẩu
                  </Button>
                </VStack>
              </form>
            </>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default ForgotPasswordWrapper;
