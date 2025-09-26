import { getMetadata } from '../../utils/helper-server';
import ProfileWrapper from './_components/profile-wrapper';
import { PX_ALL } from '../../utils/const';
import { Box, Flex } from '@chakra-ui/react';

export const metadata = getMetadata({
  title: 'Thông tin cá nhân',
  description: 'Quản lý thông tin tài khoản và địa chỉ giao hàng của bạn'
});

const ProfilePage = () => {
  return (
    <Flex direction="column" bgColor="#FFF" minH="100vh">
      <Box px={PX_ALL} py={{ xs: '80px', lg: '120px' }}>
        <ProfileWrapper />
      </Box>
    </Flex>
  );
};

export default ProfilePage;
