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
  IconButton
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { authService } from '../../../services/auth.service';
import { showToast } from '../../../utils/helper';
import { PX_ALL } from '../../../utils/const';

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
