'use client';

import { useState } from 'react';
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

const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN;

const LoginWrapper = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [formData, setFormData] = useState({
    emailOrPhone: '',
    pass_word: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email hoặc số điện thoại không được để trống';
    }

    if (!formData.pass_word) {
      newErrors.pass_word = 'Mật khẩu không được để trống';
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
        content: 'Đăng nhập thành công!'
      });

      window.location.href = redirectTo;
    } catch (error) {
      showToast({
        status: 'error',
        content: 'Email hoặc mật khẩu không chính xác'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/api/client-auth/google`;
  };

  const handleFacebookLogin = () => {
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
          <Text fontSize="24px" fontWeight={600} textAlign="center">
            Đăng nhập tài khoản
          </Text>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing="16px">
              <FormControl isInvalid={!!errors.emailOrPhone}>
                <FormLabel>Email hoặc số điện thoại</FormLabel>
                <Input
                  placeholder="Nhập email hoặc số điện thoại"
                  value={formData.emailOrPhone}
                  onChange={(e) => handleChange('emailOrPhone', e.target.value)}
                />
                <FormErrorMessage>{errors.emailOrPhone}</FormErrorMessage>
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

              <Flex justify="flex-end" w="full">
                <Link href="/quen-mat-khau">
                  <ChakraLink color="#065FD4" fontSize="14px" fontWeight={500}>
                    Quên mật khẩu?
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
                Đăng nhập
              </Button>
            </VStack>
          </form>

          <HStack w="full" spacing="16px">
            <Divider />
            <Text fontSize="14px" color="gray.500" whiteSpace="nowrap">
              hoặc đăng nhập với
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
              Đăng nhập với Google
            </Button>

            <Button
              w="full"
              h="48px"
              variant="outline"
              leftIcon={<FaFacebook size={20} color="#1877F2" />}
              onClick={handleFacebookLogin}
              _hover={{ bg: 'gray.50' }}
            >
              Đăng nhập với Facebook
            </Button>
          </VStack>

          <Text textAlign="center">
            Chưa có tài khoản?{' '}
            <Link href="/dang-ky">
              <ChakraLink color="#065FD4" fontWeight={500}>
                Đăng ký ngay
              </ChakraLink>
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginWrapper;
