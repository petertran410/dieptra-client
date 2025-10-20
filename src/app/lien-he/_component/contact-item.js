import { Flex, Image, Text } from '@chakra-ui/react';

const ContactItem = ({ item }) => {
  const { fullName, image, position, phone, email } = item;

  return (
    <Flex direction="column" align="center">
      <Image
        src={image}
        w="full"
        h={{ xs: '400px', lg: '400px', '2xl': '500px' }}
        alt={fullName}
        fit="cover"
        borderRadius={16}
      />
      <Text mt="16px" color="#09090B" textAlign="center" fontSize="xl" fontWeight={500}>
        {fullName}
      </Text>
      <Text
        mt="3px"
        color="#09090B"
        textAlign="center"
        fontWeight={500}
        fontSize="xl"
        px="8px"
        py="1.5px"
        borderRadius="full"
        bgColor="#D4F1F9"
      >
        {position}
      </Text>
      <Text mt="3px" color="#09090B" fontSize="xl" textAlign="center">
        SĐT: {phone}
      </Text>
      <Text mt="0px" fontSize="xl" color="#09090B" textAlign="center">
        Email: {email}
      </Text>
    </Flex>
  );
};

export default ContactItem;
