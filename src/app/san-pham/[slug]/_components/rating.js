'use client';
import { useMutateRating, useQueryRatingList } from '../../../../services/product.service';
import { IMG_ALT } from '../../../../utils/const';
import { showToast } from '../../../../utils/helper';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const RatingForm = ({ productId, setHasContent }) => {
  const { mutateAsync: sendRatingMutate, isPending } = useMutateRating();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [star, setStar] = useState(5);
  const queryClient = useQueryClient();

  const onSubmit = () => {
    const data = { name: name.trim(), comment: content.trim(), rate: star, productId: Number(productId) };
    sendRatingMutate(data)
      .then(() => {
        setContent('');
        setName('');
        setStar(5);
        showToast({
          status: 'success',
          content: 'Đánh giá của bạn đã được gửi đi'
        });
        queryClient.resetQueries({ queryKey: ['GET_RATING_LIST_CLIENT'] });
      })
      .catch((e) => {
        showToast({
          status: 'error',
          content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau'
        });
      });
  };

  useEffect(() => {
    if (name.trim() || content.trim()) {
      setHasContent(true);
    } else {
      setHasContent(false);
    }
  }, [content, name, setHasContent]);

  return (
    <Flex
      mt="16px"
      w={{ xs: 'full', md: '70%', lg: '60%' }}
      mx="auto"
      direction="column"
      align="center"
      bgColor="#fafafa"
      border="1px solid #f4f4f5"
      p={{ xs: '24px', lg: '32px' }}
      pt={{ xs: '16px', lg: '32px' }}
      borderRadius={16}
    >
      <Text fontSize={18} fontWeight={500}>
        Viết đánh giá của bạn
      </Text>
      <Text mt="24px" fontSize={16} color="#71717A">
        Chất lượng sản phẩm
      </Text>
      <Flex align="center" gap="4px">
        {Array.from(Array(star).keys()).map((i) => (
          <Image
            key={i}
            src="/images/star.webp"
            cursor="pointer"
            w="32px"
            h="32px"
            alt={IMG_ALT}
            onClick={() => setStar(i + 1)}
          />
        ))}
        {Array.from(Array(5 - star).keys()).map((i) => (
          <Image
            key={i}
            src="/images/star-inactive.webp"
            cursor="pointer"
            w="32px"
            h="32px"
            alt={IMG_ALT}
            onClick={() => setStar(star + i + 1)}
          />
        ))}
      </Flex>

      <Box mt="16px" borderRadius={16} w="full">
        <Flex gap="24px" direction="column" w="full">
          <Flex direction="column" gap="8px" w="full">
            <Text fontSize={16}>Họ và tên</Text>
            <Input
              placeholder="Họ và tên"
              h="56px"
              borderRadius={8}
              fontWeight={500}
              fontSize={18}
              _placeholder={{ color: '#A1A1AA' }}
              border="2px solid"
              bgColor="#FFF"
              borderColor={'#E4E4E7'}
              _hover={{
                borderColor: '#1E96BC'
              }}
              _focus={{
                bgColor: '#eefbfd',
                boxShadow: 'none'
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Flex>
          <Flex direction="column" gap="8px" w="full">
            <Text fontSize={16}>Thêm đánh giá</Text>
            <Input
              placeholder="Nhập nội dung"
              h="56px"
              borderRadius={8}
              fontWeight={500}
              fontSize={18}
              bgColor="#FFF"
              _placeholder={{ color: '#A1A1AA' }}
              border="2px solid"
              borderColor={'#E4E4E7'}
              _hover={{
                borderColor: '#1E96BC'
              }}
              _focus={{
                bgColor: '#eefbfd',
                boxShadow: 'none'
              }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Flex>
        </Flex>

        <Flex mt="24px" justify="center" w="full">
          <Button
            type="submit"
            bgColor="#065FD4"
            color="#FFF"
            w="full"
            h="40px"
            fontSize={16}
            fontWeight={500}
            borderRadius={8}
            _hover={{ bgColor: '#5d97e3' }}
            _active={{ bgColor: '#5d97e3' }}
            _disabled={{ bgColor: '#d4d4d8' }}
            isLoading={isPending}
            isDisabled={!name || !content}
            onClick={onSubmit}
          >
            Gửi đánh giá
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

const ModalConfirmClose = ({ open, onCloseModal, onCloseRating }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (open) {
      onOpen();
    }
  }, [onOpen, open]);

  return (
    <AlertDialog
      isOpen={isOpen}
      autoFocus={false}
      isCentered
      onClose={() => {
        onClose();
        onCloseModal();
      }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize={18} fontWeight={700}>
            Xác nhận huỷ đánh giá
          </AlertDialogHeader>

          <AlertDialogBody fontSize={16}>Bạn có chắc chắn muốn huỷ đánh giá này?</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              color="#065FD4"
              bgColor="transparent"
              _hover={{ bgColor: 'transparent' }}
              _active={{ bgColor: 'transparent' }}
              onClick={() => {
                onClose();
                onCloseModal();
              }}
            >
              Đóng
            </Button>
            <Button
              bgColor="#065FD4"
              color="#FFF"
              _hover={{ bgColor: '#5d97e3' }}
              _active={{ bgColor: '#5d97e3' }}
              onClick={() => {
                onClose();
                onCloseRating();
                onCloseModal();
              }}
              ml={3}
            >
              Huỷ đánh giá
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

const Rating = ({ productId, rate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: ratingQuery } = useQueryRatingList(Number(productId));
  const { content: ratingList = [] } = ratingQuery || {};
  const [openConfirmClose, setOpenConfirmClose] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const onCloseModal = () => {
    if (hasContent) {
      setOpenConfirmClose(true);
      return;
    }
    onClose();
  };

  return (
    <>
      <Flex align="center" flexWrap="wrap" mt="6px" gap="8px">
        {!!rate && rate > 0 && (
          <Flex align="center" gap="1px">
            <Text fontWeight={500} fontSize={16}>
              {rate}
            </Text>
            <Image src="/images/star.webp" alt={IMG_ALT} w="16px" h="16px" mt="-2px" />
          </Flex>
        )}
        <Box mt="-3px" cursor="pointer" onClick={onOpen} _hover={{ opacity: 0.8 }} transitionDuration="250ms">
          <Text fontWeight={500} fontSize={14}>
            CHI TIẾT ĐÁNH GIÁ
          </Text>
          <Box bgColor="#09090B" w="full" h="1px" mt="-4px" />
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onCloseModal} autoFocus={false} size={{ xs: 'md', md: '4xl', lg: '5xl' }}>
        <ModalOverlay />
        <ModalContent borderRadius={28} p={{ xs: '16px', lg: '48px' }} pt={{ xs: '16px', lg: '40px' }}>
          <ModalHeader textAlign="center" textTransform="uppercase" fontWeight={500} fontSize={24} p={0}>
            Chi tiết đánh giá
          </ModalHeader>
          <ModalCloseButton mt={{ xs: '12px', lg: '40px' }} mr={{ xs: '6px', lg: '24px' }} />
          <ModalBody p={0}>
            <RatingForm productId={productId} setHasContent={setHasContent} />

            <Divider bgColor="#F4F4F5" my="24px" />

            <Flex direction="column" gap="24px">
              <Flex direction="column" border="2px solid #D4F1F9" bgColor="#eefbfd" px="24px" py="16px">
                <Text fontSize={24} fontWeight={600} color="#1E96BC">
                  Đánh giá sản phẩm {!!ratingList?.length && `(${ratingList.length})`}
                </Text>

                <Flex align="center" gap="4px">
                  <Text fontSize={18} fontWeight={600} mt="1px">
                    4.9/5.0
                  </Text>
                  <Flex align="center" gap="4px">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Image key={i} src="/images/star.webp" w="16px" h="16px" alt={IMG_ALT} />
                    ))}
                  </Flex>
                </Flex>
              </Flex>
              {ratingList?.length ? (
                <Flex direction="column" gap="24px" maxH="340px" overflowY="auto" className="small-scrollbar">
                  {ratingList?.map((item) => {
                    return (
                      <Flex key={item} direction="column" gap="8px" borderBottom="1px solid #F4F4F5" pb="16px">
                        <Text fontSize={16} fontWeight={500}>
                          Nguyễn Văn A
                        </Text>
                        <Flex align="center" gap="4px">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Image key={i} src="/images/star.webp" w="16px" h="16px" alt={IMG_ALT} />
                          ))}
                        </Flex>
                        <Text fontSize={16}>Giao hàng nhanh, sản phẩm đóng gói cẩn thận, chất lượng tốt</Text>
                      </Flex>
                    );
                  })}
                </Flex>
              ) : (
                <Text fontSize={16} fontWeight={500} pb="30px">
                  Chưa có đánh giá.
                </Text>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <ModalConfirmClose
        open={openConfirmClose}
        onCloseModal={() => setOpenConfirmClose(false)}
        onCloseRating={onClose}
      />
    </>
  );
};

export default Rating;
