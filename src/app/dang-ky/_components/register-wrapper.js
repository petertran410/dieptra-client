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
  IconButton,
  Divider
} from '@chakra-ui/react';
import Link from 'next/link';
import { authService } from '../../../services/auth.service';
import { showToast } from '../../../utils/helper';
import { PX_ALL } from '../../../utils/const';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import { CK_CLIENT_USER } from '../../../utils/const';
import Cookies from 'js-cookie';
import { useTranslation } from '../../../hooks/useTranslation';

const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN;

const RegisterWrapper = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
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
  const { t } = useTranslation();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'cancelled') {
      showToast({
        status: 'error',
        content: t('register.cancel.facebook')
      });
      window.history.replaceState({}, '', '/dang-nhap');
    }
  }, [searchParams]);

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
      newErrors.fullName = t('register.no.empty.name');
    } else if (!/\D+/.test(formData.fullName)) {
      newErrors.fullName = t('register.invalid.name');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('register.no.empty.email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('register.invalid.email');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('register.no.empty.phone');
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t('register.invalid.phone');
    }

    if (!formData.pass_word) {
      newErrors.pass_word = t('register.no.empty.password');
    } else if (formData.pass_word.length < 6) {
      newErrors.pass_word = t('register.require.password.6char');
    } else if (!/[A-Z]/.test(formData.pass_word)) {
      newErrors.pass_word = t('register.require.password.1uppercase');
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.pass_word)) {
      newErrors.pass_word = t('register.require.password.1spec');
    }

    if (formData.pass_word !== formData.confirmPassword) {
      newErrors.confirmPassword = t('register.password.no.match');
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
        content: t('register.code.verify.sent.mail')
      });

      window.location.href = redirectTo;
      setStep('verify');
      setCountdown(600);
    } catch (error) {
      showToast({
        status: 'error',
        content: error?.message || t('register.verification.error')
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const result = await authService.verifyEmail(formData.email, otp);

      if (result.access_token) {
        Cookies.set(CK_CLIENT_USER, result.access_token, { expires: 7 });
      }

      if (result.user) {
        Cookies.set(CK_CLIENT_USER, JSON.stringify(result.user), { expires: 7 });
      }

      showToast({
        status: 'success',
        content: t('register.register.success')
      });

      window.location.href = '/';
    } catch (error) {
      const errorMessage = error?.message || '';

      let toastContent = t('register.OTP.incorrect');

      if (errorMessage.includes('expired') || errorMessage.includes('hết hạn')) {
        toastContent = t('register.OTP.expire');
      } else if (errorMessage.includes('Invalid verification code') || errorMessage.includes('không hợp lệ')) {
        toastContent = t('register.OTP.error');
      }

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
        content: t('register.new.OTP.sent.mail')
      });
      setOtp('');
      setCountdown(600);
    } catch (error) {
      showToast({
        status: 'error',
        content: t('register.cannot.resent')
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = `${API_URL}/api/client-auth/google`;
  };

  const handleFacebookRegister = () => {
    window.location.href = `${API_URL}/api/client-auth/facebook`;
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
                {t('register.register.account')}
              </Text>

              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <VStack spacing="16px">
                  <FormControl isInvalid={!!errors.fullName}>
                    <FormLabel>{t('register.name')}</FormLabel>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder={t('register.input.name')}
                    />
                    <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder={t('register.input.mail')}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.phone}>
                    <FormLabel>{t('register.phone')}</FormLabel>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder={t('register.input.phone')}
                    />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.pass_word}>
                    <FormLabel>{t('register.password')}</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.pass_word}
                        onChange={(e) => handleChange('pass_word', e.target.value)}
                        placeholder={t('register.input.password')}
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={showPassword ? t('register.hide.password') : t('register.open.password')}
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
                    <FormLabel>{t('register.confirm.password')}</FormLabel>
                    <InputGroup>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        placeholder={t('register.input.password.again')}
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={
                            showConfirmPassword ? t('register.hide.password.again') : t('register.open.password.again')
                          }
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
                    {t('register.butto')}
                  </Button>
                </VStack>
              </form>

              <HStack w="full" spacing="16px">
                <Divider />
                <Text fontSize="14px" color="gray.500" whiteSpace="nowrap">
                  {t('register.register.with')}
                </Text>
                <Divider />
              </HStack>

              <VStack w="full" spacing="12px">
                <Button
                  w="full"
                  h="48px"
                  variant="outline"
                  leftIcon={<FcGoogle size={20} />}
                  onClick={handleGoogleRegister}
                  _hover={{ bg: 'gray.50' }}
                >
                  {t('register.with.google')}
                </Button>

                <Button
                  w="full"
                  h="48px"
                  variant="outline"
                  leftIcon={<FaFacebook size={20} color="#1877F2" />}
                  onClick={handleFacebookRegister}
                  _hover={{ bg: 'gray.50' }}
                >
                  {t('register.with.facebook')}
                </Button>
              </VStack>

              <Text textAlign="center">
                {t('register.account.existed')}{' '}
                <Link href="/dang-nhap">
                  <ChakraLink color="#065FD4" fontWeight={500}>
                    {t('register.login')}
                  </ChakraLink>
                </Link>
              </Text>
            </>
          ) : (
            <>
              <Text fontSize="24px" fontWeight={600} textAlign="center">
                {t('register.verify.email')}
              </Text>

              <VStack spacing="16px" w="full">
                <Text textAlign="center" color="gray.600">
                  {t('register.OTP.sent.to.you')}
                </Text>
                <Text fontWeight={600} color="#065FD4">
                  {formData.email}
                </Text>

                <VStack spacing="8px" w="full">
                  <Text textAlign="center" fontSize="14px" color="gray.700" fontWeight={500}>
                    {t('register.input.6')}
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
                  {t('register.OTP.confirm')}
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
                  {countdown > 0
                    ? `${t('register.resent.OTP.again')} (${formatCountdown(countdown)})`
                    : t('register.resent.OTP.again')}
                </Button>

                <Button variant="ghost" onClick={() => setStep('register')} isDisabled={isLoading}>
                  {t('register.go.back')}
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
