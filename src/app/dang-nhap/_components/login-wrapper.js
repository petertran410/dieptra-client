'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link as ChakraLink,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  HStack
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Link from 'next/link';
import { authService } from '../../../services/auth.service';
import { showToast } from '../../../utils/helper';
import { PX_ALL } from '../../../utils/const';
import { useTranslation } from '../../../hooks/useTranslation';

const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN;

const LoginWrapper = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    emailOrPhone: '',
    pass_word: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'cancelled') {
      showToast({
        status: 'error',
        content: t('login.cancel.login')
      });
      window.history.replaceState({}, '', '/dang-nhap');
    }
  }, [searchParams]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = t('login.email.phone.no.empty');
    }

    if (!formData.pass_word) {
      newErrors.pass_word = t('login.password.no.empty');
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
      await authService.login(formData);

      showToast({
        status: 'success',
        content: t('login.success')
      });

      window.location.href = redirectTo;
    } catch (error) {
      showToast({
        status: 'error',
        content: t('login.email.phone.not.correct')
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const state = encodeURIComponent(redirectTo);
    console.log('🔍 redirectTo:', redirectTo);
    console.log('🔍 state:', state);
    console.log('🔍 Full URL:', `${API_URL}/api/client-auth/google?state=${state}`);
    window.location.href = `${API_URL}/api/client-auth/google?state=${state}`;
  };

  const handleFacebookLogin = () => {
    const state = encodeURIComponent(redirectTo);
    window.location.href = `${API_URL}/api/client-auth/facebook?state=${state}`;
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
          <Text fontSize="24px" fontWeight={600} textAlign="center">
            {t('login.account.login')}
          </Text>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing="16px">
              <FormControl isInvalid={!!errors.emailOrPhone}>
                <FormLabel>{t('login.email.or.phone')}</FormLabel>
                <Input
                  placeholder={t('login.input.email.or.phone')}
                  value={formData.emailOrPhone}
                  onChange={(e) => handleChange('emailOrPhone', e.target.value)}
                />
                <FormErrorMessage>{errors.emailOrPhone}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.pass_word}>
                <FormLabel>{t('login.password')}</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.pass_word}
                    onChange={(e) => handleChange('pass_word', e.target.value)}
                    placeholder={t('login.input.password')}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? t('login.hide.password') : t('login.open.password')}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      size="sm"
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.pass_word}</FormErrorMessage>
              </FormControl>

              <Flex justify="flex-end" w="full">
                <Link href="/quen-mat-khau">
                  <ChakraLink color="#065FD4" fontSize="14px" fontWeight={500}>
                    {t('login.forget.password')}
                  </ChakraLink>
                </Link>
              </Flex>

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
                {t('login.login')}
              </Button>
            </VStack>
          </form>

          <HStack w="full" spacing="16px">
            <Divider />
            <Text fontSize="14px" color="gray.500" whiteSpace="nowrap">
              {t('login.or.login.with')}
            </Text>
            <Divider />
          </HStack>

          <VStack w="full" spacing="12px">
            <Button
              w="full"
              h="48px"
              variant="outline"
              leftIcon={<FcGoogle size={20} />}
              onClick={handleGoogleLogin}
              _hover={{ bg: 'gray.50' }}
            >
              {t('login.with.google')}
            </Button>

            <Button
              w="full"
              h="48px"
              variant="outline"
              leftIcon={<FaFacebook size={20} color="#1877F2" />}
              onClick={handleFacebookLogin}
              _hover={{ bg: 'gray.50' }}
            >
              {t('login.with.facebook')}
            </Button>
          </VStack>

          <Text textAlign="center">
            {t('login.no.account')}{' '}
            <Link href="/dang-ky">
              <ChakraLink color="#065FD4" fontWeight={500}>
                {t('login.now')}
              </ChakraLink>
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginWrapper;
