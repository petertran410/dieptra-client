'use client';

import { useApplyJob } from '../../../../services/job.service';
import { API } from '../../../../utils/API';
import { IMG_ALT, PX_ALL } from '../../../../utils/const';
import { showToast } from '../../../../utils/helper';
import { Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

const FormApply = ({ jobId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm();
  const fileCV = watch('file');
  const { mutateAsync: applyMutate, isPending } = useApplyJob(jobId);
  const [errorMessage, setErrorMessage] = useState('');

  const onDropAccepted = useCallback(
    (acceptedFiles) => {
      if (isPending) {
        return;
      }
      setValue('file', acceptedFiles || undefined);
    },
    [isPending, setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDropAccepted });

  const onSubmit = (values) => {
    setErrorMessage('');
    const { file: fileValue, email, name, phoneNumber } = values;
    const file = fileValue?.[0];
    const validExtensions = ['.pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    const isValidExtension = validExtensions.includes(fileExtension);
    const isValidSize = file.size <= maxSize;

    if (!isValidExtension) {
      setErrorMessage('Định dạng file CV không hợp lệ');
      return;
    }

    if (!isValidSize) {
      setErrorMessage('Kích thước file CV tối đa là 10 MB');
      return;
    }

    API.upload({ file, internalUrl: '/api/upload' })
      .then((resumeUrl) => {
        const data = { resumeUrl, email, name, phoneNumber, jobId: Number(jobId) };
        applyMutate(data)
          .then(() => {
            showToast({
              status: 'success',
              content: 'Gửi hồ sơ ứng tuyển thành công. Chúng tôi sẽ sớm liên hệ với bạn.'
            });
            reset();
          })
          .catch((e) => {
            showToast({
              status: 'error',
              content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau'
            });
          });
      })
      .catch((e) => {
        showToast({
          status: 'error',
          content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau'
        });
      });
  };

  return (
    <Flex justify="center" mt="58px" pos="relative" px={PX_ALL}>
      <form style={{ display: 'flex', width: '100%', justifyContent: 'center' }} onSubmit={handleSubmit(onSubmit)}>
        <Flex
          pos="relative"
          zIndex={5}
          w={{ xs: 'full', md: '70%', lg: '50%' }}
          direction="column"
          align="center"
          borderRadius={16}
          p={{ xs: '16px', lg: '24px' }}
          gap="20px"
          bgGradient="linear(to-b, #C7EDF8 0%, #FFF 100%)"
          boxShadow="lg"
        >
          <Text fontSize={24} fontWeight={500} color="#1E96BC" textAlign="center" textTransform="uppercase">
            Ứng tuyển ngay tại đây
          </Text>
          <Flex direction="column" gap="8px" w="full">
            <Text fontSize={16}>Họ và tên</Text>
            <Input
              {...register('name', { required: 'Vui lòng nhập họ và tên' })}
              isDisabled={isPending}
              bgColor="#FFF"
              h="56px"
              borderRadius={8}
              px="16px"
              placeholder="Nhập họ và tên"
              fontSize={18}
              fontWeight={500}
              _placeholder={{ color: '#A1A1AA' }}
              border="2px solid"
              borderColor={!!errors.note ? '#EF4444' : '#E4E4E7'}
              _hover={{
                borderColor: '#1E96BC'
              }}
              _focus={{
                bgColor: '#eefbfd',
                boxShadow: 'none'
              }}
            />
            {!!errors.name && <Text color="red.400">{errors.name.message}</Text>}
          </Flex>
          <Flex direction="column" gap="8px" w="full">
            <Text fontSize={16}>Email</Text>
            <Input
              {...register('email', {
                required: 'Vui lòng nhập email',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email không hợp lệ'
                }
              })}
              isDisabled={isPending}
              bgColor="#FFF"
              h="56px"
              borderRadius={8}
              px="16px"
              placeholder="Nhập email"
              fontSize={18}
              fontWeight={500}
              _placeholder={{ color: '#A1A1AA' }}
              border="2px solid"
              borderColor={!!errors.note ? '#EF4444' : '#E4E4E7'}
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
          <Flex direction="column" gap="8px" w="full">
            <Text fontSize={16}>Số điện thoại</Text>
            <Input
              {...register('phoneNumber', {
                required: 'Vui lòng nhập số điện thoại',
                pattern: {
                  value: /^(03|05|07|08|09)\d{7,10}$/,
                  message: 'Số điện thoại không hợp lệ'
                }
              })}
              isDisabled={isPending}
              bgColor="#FFF"
              h="56px"
              borderRadius={8}
              px="16px"
              placeholder="Nhập số điện thoại"
              fontSize={18}
              fontWeight={500}
              _placeholder={{ color: '#A1A1AA' }}
              border="2px solid"
              borderColor={!!errors.note ? '#EF4444' : '#E4E4E7'}
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

          <Flex direction="column" gap="8px" w="full">
            <Text fontSize={16}>Tải lên CV</Text>

            <Flex
              align="center"
              justify="center"
              border="1px dashed #AFE5F2"
              borderRadius={8}
              p="12px"
              h="56px"
              pos="relative"
            >
              {!!fileCV?.length && (
                <Image
                  src="/images/close-circle.webp"
                  alt={IMG_ALT}
                  w="24px"
                  h="24px"
                  cursor="pointer"
                  pos="absolute"
                  top="-12px"
                  right="-12px"
                  onClick={() => setValue('file', undefined)}
                />
              )}

              {fileCV?.length ? (
                <Text cursor="default" color="#2563EB" textDecor="underline" fontWeight={500}>
                  {fileCV?.[0]?.name}
                </Text>
              ) : (
                <label style={{ display: 'block', width: '100%' }}>
                  <Flex {...getRootProps()} align="center" justify="center" gap="16px" cursor="default">
                    <Image src="/images/arrow-up-circle.webp" alt={IMG_ALT} w="32px" h="32px" />
                    <Text fontSize={16}>Kéo thả tệp tại đây hoặc</Text>
                    <Flex
                      align="center"
                      justify="center"
                      bgColor="#FFF"
                      border="1px solid"
                      borderColor="#065FD4"
                      color="#065FD4"
                      w="74px"
                      h="32px"
                      gap="4px"
                      fontSize={16}
                      borderRadius={8}
                      fontWeight={500}
                      transitionDuration="250ms"
                      _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
                    >
                      Tải lên
                    </Flex>
                    <Input
                      {...getInputProps()}
                      {...register('file', {
                        required: 'Vui lòng thêm CV'
                      })}
                      isDisabled={isPending}
                      type="file"
                      accept=".pdf"
                      style={{ display: 'none' }}
                    />
                  </Flex>
                </label>
              )}
            </Flex>
            <Text color="#71717A" fontSize={16}>
              Định dạng file: .pdf (tối đa 10 MB)
            </Text>
            {!!errors.file && <Text color="red.400">{errors.file.message}</Text>}
          </Flex>

          {!!errorMessage && (
            <Text color="red.400" fontSize={15} textAlign="center">
              {errorMessage}
            </Text>
          )}

          <Button
            type="submit"
            bgColor="#065FD4"
            color="#FFF"
            w="full"
            h="40px"
            gap="4px"
            fontSize={16}
            borderRadius={8}
            fontWeight={500}
            transitionDuration="250ms"
            _hover={{ bgColor: '#5d97e3' }}
            _active={{ bgColor: '#5d97e3' }}
            isLoading={isPending}
          >
            Ứng tuyển
          </Button>
        </Flex>
      </form>

      <Image
        src="/images/bg-apply.webp"
        alt={IMG_ALT}
        zIndex={0}
        pos="absolute"
        bottom={0}
        left={0}
        w="full"
        h="180px"
        fit="cover"
      />
    </Flex>
  );
};

export default FormApply;
