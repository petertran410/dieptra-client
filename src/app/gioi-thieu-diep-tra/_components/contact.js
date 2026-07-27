'use client';

import { Box, Button, Flex, Grid, Input, Text, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutateContact } from '../../../services/contact.service';
import { PX_ALL } from '../../../utils/const';
import { showToast } from '../../../utils/helper';

const Contact = () => {
  const { mutateAsync: sendContactMutate, isPending } = useMutateContact();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (values) => {
    const { email = "", phoneNumber, note, fullName } = values;
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
      })
      .catch(() => {
        showToast({
          status: 'error',
          content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau'
        });
      });
  };

  return (
    <Box
      as="section"
      id="contact"
      py={{ base: '32px', lg: '73px' }}
      px={PX_ALL}
      bgGradient="linear(to-b, #ffffff 0%, #f7fafc 100%)"
      overflow="hidden"
    >
      <Box
        maxW="1440px"
        w="full"
        mx="auto"
        p="8px"
        bg="rgba(0, 90, 159, 0.02)"
        borderRadius="36px"
        border="1px solid"
        borderColor="rgba(0, 90, 159, 0.06)"
        boxShadow="0 18px 45px rgba(22, 45, 60, 0.08)"
        transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
        _hover={{ transform: 'translateY(-4px)' }}
      >
        <Box
          w="full"
          p={{ base: '24px', md: '42px' }}
          borderRadius="28px"
          bg="#ffffff"
          boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
        >
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1.1fr' }} gap="34px" alignItems="start">
            {/* Info Side */}
            <Flex direction="column" justify="start">
              {/* Eyebrow Tag */}
              <Box
                alignSelf="flex-start"
                px="12px"
                py="4px"
                borderRadius="full"
                border="1px solid"
                borderColor="rgba(11, 126, 174, 0.2)"
                bg="rgba(11, 126, 174, 0.05)"
                color="#0b7eae"
                fontSize="10px"
                fontWeight={800}
                letterSpacing="0.2em"
                textTransform="uppercase"
                mb="16px"
              >
                Liên hệ với chúng tôi
              </Box>
              <Text
                as="h2"
                color="#005a9f"
                fontSize={{ base: '22px', md: '32px' }}
                fontWeight={900}
                lineHeight={1.2}
                mb="18px"
              >
                Cần chọn nguyên liệu cho menu hoặc mô hình kinh doanh?
              </Text>
              <Text color="#4d6878" fontSize="15px" lineHeight={1.7} display={{ base: 'none', md: 'block' }}>
                Để lại thông tin, đội ngũ Diệp Trà sẽ hỗ trợ tư vấn nhóm sản phẩm phù hợp với nhu cầu thực tế của bạn.
              </Text>
            </Flex>

            {/* Form Side */}
            <form style={{ display: 'block', width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" gap="14px">
                {/* Row 1: Name & Phone */}
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="14px">
                  <Flex direction="column" gap="8px">
                    <Text fontSize="13.5px" fontWeight={800} color="#005a9f">
                      Họ và tên
                    </Text>
                    <Input
                      {...register('fullName')}
                      placeholder="Nhập họ và tên"
                      h="48px"
                      borderRadius="14px"
                      fontWeight={500}
                      fontSize="14px"
                      bg="#fcfdfe"
                      _placeholder={{ color: '#8ba2b0' }}
                      border="1px solid"
                      borderColor={errors.fullName ? '#EF4444' : '#cfe1ed'}
                      _hover={{ borderColor: '#0b7eae' }}
                      _focus={{ borderColor: '#0b7eae', boxShadow: '0 0 0 3px rgba(11, 126, 174, 0.15)', bg: '#fff' }}
                    />
                    {errors.fullName && <Text color="red.400" fontSize="12px">{errors.fullName.message}</Text>}
                  </Flex>

                  <Flex direction="column" gap="8px">
                    <Text fontSize="13.5px" fontWeight={800} color="#005a9f">
                      Số điện thoại <span style={{ color: 'red' }}>*</span>
                    </Text>
                    <Input
                      {...register('phoneNumber', {
                        required: 'Vui lòng nhập số điện thoại',
                        pattern: {
                          value: /^(03|05|07|08|09)\d{7,10}$/,
                          message: 'Số điện thoại không đúng định dạng'
                        }
                      })}
                      placeholder="Nhập số điện thoại"
                      h="48px"
                      borderRadius="14px"
                      fontWeight={500}
                      fontSize="14px"
                      bg="#fcfdfe"
                      _placeholder={{ color: '#8ba2b0' }}
                      border="1px solid"
                      borderColor={errors.phoneNumber ? '#EF4444' : '#cfe1ed'}
                      _hover={{ borderColor: '#0b7eae' }}
                      _focus={{ borderColor: '#0b7eae', boxShadow: '0 0 0 3px rgba(11, 126, 174, 0.15)', bg: '#fff' }}
                    />
                    {errors.phoneNumber && <Text color="red.400" fontSize="12px">{errors.phoneNumber.message}</Text>}
                  </Flex>
                </Grid>

                {/* Row 3: Product / Topic */}
                <Flex direction="column" gap="8px">
                  <Text fontSize="13.5px" fontWeight={800} color="#005a9f">
                    Sản phẩm / vấn đề đang quan tâm <span style={{ color: 'red' }}>*</span>
                  </Text>
                  <Textarea
                    {...register('note', { required: 'Vui lòng nhập nội dung' })}
                    placeholder="Ví dụ: cần tư vấn trà pha chế, mứt LerMao, siro hoặc setup menu"
                    borderRadius="14px"
                    fontWeight={500}
                    fontSize="14px"
                    minH="118px"
                    bg="#fcfdfe"
                    _placeholder={{ color: '#8ba2b0' }}
                    border="1px solid"
                    borderColor={errors.note ? '#EF4444' : '#cfe1ed'}
                    _hover={{ borderColor: '#0b7eae' }}
                    _focus={{ borderColor: '#0b7eae', boxShadow: '0 0 0 3px rgba(11, 126, 174, 0.15)', bg: '#fff' }}
                    maxLength={200}
                  />
                  {errors.note && <Text color="red.400" fontSize="12px">{errors.note.message}</Text>}
                </Flex>

                {/* Submit Button */}
                <Button
                  type="submit"
                  isLoading={isPending}
                  w="fit-content"
                  alignSelf="center"
                  minH="48px"
                  px="40px"
                  borderRadius="full"
                  fontWeight={800}
                  bg="#005a9f"
                  color="white"
                  boxShadow="0 10px 22px rgba(0, 90, 159, 0.15)"
                  transition="all 0.4s ease"
                  _hover={{
                    bg: '#0b7eae',
                    transform: 'translateY(-1px)'
                  }}
                >
                  Gửi thông tin
                </Button>
              </Flex>
            </form>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
