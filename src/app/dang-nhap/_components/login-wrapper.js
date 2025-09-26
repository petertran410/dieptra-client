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
  Link as ChakraLink
} from '@chakra-ui/react';
import Link from 'next/link';
import { authService } from '../../../services/auth.service';
import { showToast } from '../../../utils/helper';
import { PX_ALL } from '../../../utils/const';

const LoginWrapper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [formData, setFormData] = useState({
    email: '',
    pass_word: ''
  });
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
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

      router.push(redirectTo);
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
