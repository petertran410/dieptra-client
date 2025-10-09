import { getMetadata } from '../../utils/helper-server';
import ProfileWrapper from './_components/profile-wrapper';
import { PX_ALL } from '../../utils/const';
import { Box, Flex } from '@chakra-ui/react';
import { Suspense } from 'react';

export const metadata = getMetadata({
  title: 'Thông tin cá nhân',
  description: 'Quản lý thông tin tài khoản và địa chỉ giao hàng của bạn'
});

const ProfilePage = () => {
  return (
    <Flex direction="column" bgColor="#FFF" minH="100vh">
      <Box px={PX_ALL} py={{ xs: '80px', lg: '120px' }}>
        <Suspense fallback={<Box>Loading...</Box>}>
          <ProfileWrapper />
        </Suspense>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
