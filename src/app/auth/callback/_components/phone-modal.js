'use client';

import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormErrorMessage,
  Text
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { CK_CLIENT_TOKEN, CK_CLIENT_USER } from '../../../../utils/const';
import { showToast } from '../../../../utils/helper';

const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN;

export default function PhoneModal({ tempToken, tempKey, onSuccess }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePhone = (value) => {
    if (!value.trim()) {
      return 'Số điện thoại không được để trống';
    }
    if (!/^0[0-9]{9}$/.test(value.replace(/\s/g, ''))) {
      return 'Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validatePhone(phone);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/client-auth/complete-oauth-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          tempKey: tempKey,
          phone: phone.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Không thể cập nhật số điện thoại');
      }

      Cookies.set(CK_CLIENT_TOKEN, data.access_token, { expires: 7 });
      Cookies.set(CK_CLIENT_USER, JSON.stringify(data.user), { expires: 7 });

      showToast({
        status: 'success',
        content: 'Đăng ký thành công!'
      });

      onSuccess();
    } catch (error) {
      console.error('Phone submission error:', error);

      let errorMessage = 'Số điện thoại đã tồn tại.';

      if (error.message.includes('đã được sử dụng')) {
        errorMessage = 'Số điện thoại này đã được đăng ký. Vui lòng sử dụng số khác.';
      } else if (error.message.includes('KiotViet')) {
        errorMessage = 'Số điện thoại đã tồn tại trên hệ thống. Vui lòng sử dụng số khác.';
      } else if (error.message.includes('hết hạn')) {
        errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
      }

      setError(errorMessage);
      showToast({
        status: 'error',
        content: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={() => {}} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent mx="16px">
        <ModalHeader>Hoàn tất đăng ký</ModalHeader>
        <ModalCloseButton isDisabled={isLoading} />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Text fontSize="sm" color="gray.600">
                Để hoàn tất đăng ký, vui lòng nhập số điện thoại của bạn
              </Text>

              <FormControl isInvalid={!!error}>
                <FormLabel>Số điện thoại</FormLabel>
                <Input
                  type="tel"
                  placeholder="Nhập số điện thoại (VD: 0931566676)"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError('');
                  }}
                  isDisabled={isLoading}
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>

              <Button type="submit" colorScheme="blue" width="full" isLoading={isLoading} loadingText="Đang xử lý...">
                Hoàn tất đăng ký
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
