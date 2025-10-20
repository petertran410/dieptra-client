'use client';

import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text
} from '@chakra-ui/react';
import { showToast } from '../../../../utils/helper';

const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN;

export default function PhoneModal({ token, onSuccess }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePhone = (value) => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    return phoneRegex.test(value);
  };

  const handleSubmit = async () => {
    if (!phone.trim()) {
      setError('Số điện thoại không được để trống');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Số điện thoại không hợp lệ');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/client-auth/update-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ phone })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Cập nhật số điện thoại thất bại');
      }

      showToast({
        status: 'success',
        content: 'Cập nhật số điện thoại thành công!'
      });

      onSuccess();
    } catch (err) {
      showToast({
        status: 'error',
        content: err.message || 'Có lỗi xảy ra, vui lòng thử lại'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={() => {}} closeOnOverlayClick={false} isCentered>
      <ModalOverlay />
      <ModalContent mx="16px">
        <ModalHeader>Cập nhật số điện thoại</ModalHeader>
        <ModalBody>
          <Text mb="16px" fontSize="14px" color="gray.600">
            Vui lòng nhập số điện thoại để hoàn tất đăng ký
          </Text>
          <FormControl isInvalid={!!error}>
            <FormLabel>Số điện thoại</FormLabel>
            <Input
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError('');
              }}
              maxLength={10}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" w="full" onClick={handleSubmit} isLoading={isLoading}>
            Xác nhận
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
