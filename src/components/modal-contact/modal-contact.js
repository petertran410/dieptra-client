'use client';

import { useMutateContact, useMutateOrder } from '../../services/contact.service';
import { cartAtom } from '../../states/common';
import { getInlineHTML, showToast } from '../../utils/helper';
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import SectionBlock from '../section-block';

const ModalContact = (props) => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const { open, onCloseModal, defaultNote, onSuccess, isOrder, cartData } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync: sendContactMutate, isPending } = useMutateContact();
  const { mutateAsync: sendOrderMutate, isPending: isPendingOrder } = useMutateOrder();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  useEffect(() => {
    if (defaultNote) {
      setValue('note', defaultNote);
    }
  }, [defaultNote, setValue]);

  const onSubmit = (values) => {
    const { email, phoneNumber, note, fullName } = values;

    if (isOrder) {
      const newCartData = cartData.map((i) => {
        const currentCartItem = cart.find((c) => Number(i.id) === Number(c.id));

        if (i.id !== currentCartItem.id) {
          return i;
        }

        return { ...i, quantity: currentCartItem.quantity };
      });

      const data = {
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        note: note.trim(),
        receiverFullName: fullName.trim(),
        products: newCartData?.map((i) => ({ productId: i.id, quantity: 1 })),
        htmlContent: getInlineHTML(newCartData)
      };

      sendOrderMutate(data)
        .then(() => {
          reset();
          showToast({
            status: 'success',
            content: 'Thông tin của bạn đã được gửi đi',
            icon: '/images/send-contact.webp'
          });
          setCart([]);
          onClose();
          onCloseModal();
          onSuccess && onSuccess();
        })
        .catch((e) => {
          showToast({
            status: 'error',
            content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau'
          });
        });

      return;
    }

    const data = {
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      note: note.trim(),
      receiverFullName: fullName.trim()
    };

    sendContactMutate(data)
      .then(() => {
        reset();
        showToast({
          status: 'success',
          content: 'Thông tin của bạn đã được gửi đi',
          icon: '/images/send-contact.webp'
        });
        onClose();
        onCloseModal();
        onSuccess && onSuccess();
      })
      .catch((e) => {
        showToast({
          status: 'error',
          content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau'
        });
      });
  };

  useEffect(() => {
    if (open) {
      onOpen();
    }
  }, [onOpen, open]);

  return (
    <Modal
      size={{ xs: 'md', md: '3xl', lg: '6xl' }}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        onCloseModal();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex my="25px" id="contact-form" direction="column" pos="relative" zIndex={10}>
            <SectionBlock title="Liên hệ tư vấn" />

            <Box mt="16px" borderRadius={16} py="24px">
              <form style={{ display: 'block' }} onSubmit={handleSubmit(onSubmit)}>
                <Flex flex={1} direction="column" gap="8px">
                  <Text fontSize={16}>Họ và tên</Text>
                  <Input
                    {...register('fullName')}
                    placeholder="Nhập họ và tên"
                    h="56px"
                    borderRadius={8}
                    fontWeight={500}
                    fontSize={18}
                    _placeholder={{ color: '#A1A1AA' }}
                    border="2px solid"
                    borderColor={!!errors.fullName ? '#EF4444' : '#E4E4E7'}
                    _hover={{
                      borderColor: '#1E96BC'
                    }}
                    _focus={{
                      bgColor: '#eefbfd',
                      boxShadow: 'none'
                    }}
                  />
                  {!!errors.fullName && <Text color="red.400">{errors.fullName.message}</Text>}
                </Flex>

                <Flex gap="24px" direction={{ xs: 'column', md: 'row' }} mt="16px">
                  <Flex flex={1} direction="column" gap="8px">
                    <Text fontSize={16}>
                      Số điện thoại{' '}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </Text>
                    <Input
                      {...register('phoneNumber', {
                        required: 'Vui lòng nhập số điện thoại',
                        pattern: {
                          value: /^(03|05|07|08|09)\d{7,10}$/,
                          message: 'Số điện thoại không hợp lệ'
                        }
                      })}
                      placeholder="Nhập số điện thoại"
                      h="56px"
                      borderRadius={8}
                      fontWeight={500}
                      fontSize={18}
                      _placeholder={{ color: '#A1A1AA' }}
                      border="2px solid"
                      borderColor={!!errors.phoneNumber ? '#EF4444' : '#E4E4E7'}
                      _hover={{
                        borderColor: '#1E96BC'
                      }}
                      _focus={{
                        bgColor: '#eefbfd',
                        boxShadow: 'none'
                      }}
                    />
                    {!!errors.phoneNumber && <Text color="red.400">{errors.phoneNumber.message}</Text>}
                  </Flex>
                  <Flex flex={1} direction="column" gap="8px">
                    <Text fontSize={16}>
                      Email{' '}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </Text>
                    <Input
                      {...register('email', {
                        required: 'Vui lòng nhập email',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Email không hợp lệ'
                        }
                      })}
                      placeholder="Nhập email"
                      h="56px"
                      borderRadius={8}
                      fontWeight={500}
                      fontSize={18}
                      _placeholder={{ color: '#A1A1AA' }}
                      border="2px solid"
                      borderColor={!!errors.phoneNumber ? '#EF4444' : '#E4E4E7'}
                      _hover={{
                        borderColor: '#1E96BC'
                      }}
                      _focus={{
                        bgColor: '#eefbfd',
                        boxShadow: 'none'
                      }}
                    />
                    {!!errors.email && <Text color="red.400">{errors.email.message}</Text>}
                  </Flex>
                </Flex>

                <Flex direction="column" gap="8px" mt="16px">
                  <Text fontSize={16}>
                    Sản phẩm / Vấn đề mà bạn đang quan tâm{' '}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </Text>
                  <Textarea
                    {...register('note', { required: 'Vui lòng nhập nội dung' })}
                    rows={3}
                    p="12px"
                    placeholder="Điền thông tin"
                    borderRadius={8}
                    fontWeight={500}
                    fontSize={18}
                    _placeholder={{ color: '#A1A1AA' }}
                    border="2px solid"
                    borderColor={!!errors.phoneNumber ? '#EF4444' : '#E4E4E7'}
                    _hover={{
                      borderColor: '#1E96BC'
                    }}
                    _focus={{
                      bgColor: '#eefbfd',
                      boxShadow: 'none'
                    }}
                  />
                  {!!errors.note && <Text color="red.400">{errors.note.message}</Text>}
                  <Text fontSize={16} color="#71717A" textAlign="right">
                    Tối đa 200 ký tự
                  </Text>
                </Flex>

                <Flex mt="24px" justify="center">
                  <Button
                    type="submit"
                    bgColor="#065FD4"
                    color="#FFF"
                    w="500px"
                    h="40px"
                    fontSize={16}
                    fontWeight={500}
                    borderRadius={8}
                    _hover={{ bgColor: '#5d97e3' }}
                    _active={{ bgColor: '#5d97e3' }}
                    isLoading={isPending || isPendingOrder}
                  >
                    Gửi thông tin
                  </Button>
                </Flex>
              </form>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalContact;
