'use client';

import SectionBlockH3 from '../../../components/section-block/section-block-h3';
import { useTranslation } from '../../../hooks/useTranslation';
import { useMutateContact } from '../../../services/contact.service';
import { PX_ALL } from '../../../utils/const';
import { showToast } from '../../../utils/helper';
import { Box, Button, Flex, Input, Text, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const HomeContact = (props) => {
  const { t } = useTranslation();
  const { mutateAsync: sendContactMutate, isPending } = useMutateContact();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (values) => {
    const { email, phoneNumber, note, fullName } = values;
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
          content: t('home.contact.success'),
          icon: '/images/send-contact.webp'
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
    <Flex
      id="contact-form"
      direction="column"
      px={PX_ALL}
      py={{ xs: '24px', '2xl': '120px' }}
      pos="relative"
      zIndex={10}
      bgImage={{ xs: 'url(/images/bg-contact-home-mobile.webp)', lg: 'url(/images/bg-contact-home.webp)' }}
      bgSize={{ xs: 'contain', '2xl': 'cover' }}
      bgRepeat="no-repeat"
      bgColor="transparent"
    >
      <SectionBlockH3 title={t('home.contact.title')} />

      <Box mt="16px" borderRadius={16} py="24px">
        <form style={{ display: 'block' }} onSubmit={handleSubmit(onSubmit)}>
          <Flex flex={1} direction="column" gap="8px">
            <Text fontSize={18}>{t('home.contact.fullName')}</Text>
            <Input
              {...register('fullName')}
              placeholder={t('home.contact.fullName.input')}
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
              <Text fontSize={18}>
                {t('home.contact.phone')}{' '}
                <Text as="span" color="red">
                  *
                </Text>
              </Text>
              <Input
                {...register('phoneNumber', {
                  required: t('home.contact.phone.input'),
                  pattern: {
                    value: /^(03|05|07|08|09)\d{7,10}$/,
                    message: t('home.contact.phone.wrong')
                  }
                })}
                placeholder={t('home.contact.phone.input')}
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
              <Text fontSize={18}>
                Email{' '}
                <Text as="span" color="red">
                  *
                </Text>
              </Text>
              <Input
                {...register('email', {
                  required: t('home.contact.email.input'),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t('home.contact.email.wrong')
                  }
                })}
                placeholder={t('home.contact.email.input')}
                h="56px"
                borderRadius={8}
                fontWeight={500}
                fontSize={18}
                _placeholder={{ color: '#A1A1AA' }}
                border="2px solid"
                borderColor={!!errors.email ? '#EF4444' : '#E4E4E7'}
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
            <Text fontSize={18}>
              {t('home.contact.problem')}{' '}
              <Text as="span" color="red">
                *
              </Text>
            </Text>
            <Textarea
              {...register('note', { required: 'Vui lòng nhập nội dung' })}
              rows={3}
              p="12px"
              placeholder={t('home.contact.problem.input')}
              borderRadius={8}
              fontWeight={500}
              fontSize={18}
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
            {!!errors.note && <Text color="red.400">{errors.note.message}</Text>}
            <Text fontSize={18} color="#71717A" textAlign="right">
              {t('home.contact.maximum.word')}
            </Text>
          </Flex>

          <Flex mt="24px" justify="center">
            <Button
              type="submit"
              bgColor="#065FD4"
              color="#FFF"
              w="500px"
              h="40px"
              fontSize={18}
              fontWeight={500}
              borderRadius={8}
              _hover={{ bgColor: '#5d97e3' }}
              _active={{ bgColor: '#5d97e3' }}
              isLoading={isPending}
            >
              {t('home.contact.submit')}
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default HomeContact;
