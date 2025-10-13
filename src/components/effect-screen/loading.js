import { Flex, Spinner, Text } from '@chakra-ui/react';

const LoadingScreen = () => {
  return (
    <Flex direction="column" justify="center" align="center" gap={5}>
      <Spinner color="#60bad2" size="md" />
      <Text fontSize={18}>Đang tải dữ liệu...</Text>
    </Flex>
  );
};

export default LoadingScreen;
