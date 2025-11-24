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
import { authService } from '../../../../services/auth.service';
import { showToast } from '../../../../utils/helper';

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
      const result = await authService.completeOAuthRegistration(tempKey, phone.trim());

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
      } else if (error.message.includes('already registered')) {
        errorMessage = 'Số điện thoại đã được đăng ký. Vui lòng sử dụng số khác.';
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
      <ModalContent>
        <ModalHeader>Hoàn tất đăng ký</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text mb={4} color="gray.600">
            Để hoàn tất quá trình đăng ký, vui lòng cung cấp số điện thoại của bạn.
          </Text>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!error}>
                <FormLabel>Số điện thoại *</FormLabel>
                <Input
                  type="tel"
                  placeholder="Nhập số điện thoại (VD: 0931566676)"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={isLoading}
                />
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
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
