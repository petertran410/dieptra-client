import { Box, Flex, Text } from '@chakra-ui/react';

const SectionBlockH3 = (props) => {
  const { title, className, id, isNormal, isActiveMobile } = props;

  return (
    <Flex direction="column" align="center" gap="4px" className={className} id={id}>
      <Text
        as="h3"
        textAlign="center"
        fontWeight={500}
        color={{
          xs: isNormal && !isActiveMobile ? '#0F2C3D' : '#065FD4',
          lg: isNormal ? '#0F2C3D' : '#065FD4'
        }}
        fontSize={24}
        textTransform="uppercase"
      >
        {title}
      </Text>
      <Box
        h="4px"
        w="40px"
        bgColor={{
          xs: isNormal && !isActiveMobile ? '#0F2C3D' : '#065FD4',
          lg: isNormal ? '#0F2C3D' : '#065FD4'
        }}
        borderRadius="full"
      />
    </Flex>
  );
};

export default SectionBlockH3;
