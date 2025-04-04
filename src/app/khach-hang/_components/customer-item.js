'use client';

import { IMG_ALT } from '@/utils/const';
import {
  AspectRatio,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';

const CustomerItem = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { customer, position, content, image } = item;

  return (
    <Flex direction="column" gap="8px">
      <AspectRatio ratio={1 / 1} w="full">
        <Image src={image} alt={IMG_ALT} w="full" h="full" borderRadius={16} />
      </AspectRatio>
      <Text fontSize={18} fontWeight={600} noOfLines={3}>
        {customer}
      </Text>
      <Text fontSize={16} color="#27272A" lineHeight="20px" noOfLines={4}>
        {content}
      </Text>

      <Flex justify="flex-end">
        <Button
          bgColor="transparent"
          color="#065FD4"
          fontWeight={500}
          fontSize={16}
          w="98px"
          h="32px"
          _hover={{ color: '#0F2C3D', bgColor: 'transparent' }}
          _active={{ color: '#0F2C3D', bgColor: 'transparent' }}
          onClick={onOpen}
        >
          Xem thêm
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false} size={{ xs: 'md', lg: '6xl' }}>
        <ModalOverlay />
        <ModalContent p="24px" borderRadius={28}>
          <ModalBody p={0}>
            <Flex align="flex-start" gap="24px" direction={{ xs: 'column', lg: 'row' }}>
              <Image
                src={image}
                alt={IMG_ALT}
                w={{ xs: 'full', lg: '286px' }}
                h={{ xs: 'auto', md: '300px', lg: '286px' }}
                fit="cover"
                borderRadius={16}
              />
              <Flex
                direction="column"
                h={{ xs: 'auto', lg: '286px' }}
                gap="8px"
                flex={1}
                justify={{ xs: 'flex-start', lg: 'space-between' }}
              >
                <Flex direction="column" gap="8px">
                  <Text fontSize={18} fontWeight={500}>
                    {customer}
                  </Text>
                  <Text fontSize={16} lineHeight="20px">
                    {content}
                  </Text>
                </Flex>
                <Flex justify="flex-end">
                  <Button
                    bgColor="#FFF"
                    border="1px solid"
                    borderColor="main.1"
                    color="main.1"
                    w="68px"
                    h="40px"
                    gap="4px"
                    fontSize={16}
                    borderRadius={8}
                    fontWeight={500}
                    transitionDuration="250ms"
                    _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d' }}
                    onClick={onClose}
                  >
                    Đóng
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default CustomerItem;
