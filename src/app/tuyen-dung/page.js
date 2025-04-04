import { PX_ALL } from '@/utils/const';
import { getMetadata } from '@/utils/helper-server';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Suspense } from 'react';
import Activity from './_components/activity';
import Banner from './_components/banner';
import Culture from './_components/culture';
import JobList from './_components/job-list';
import Search from './_components/search';

export const metadata = getMetadata({ title: 'Tuyển dụng | Diệp Trà' });

const Recruitment = () => {
  return (
    <Suspense>
      <Flex direction="column" pb="40px">
        <Banner />
        {/* <Buttons /> */}
        <Culture />
        <Activity />
        {/* <Activity /> */}
        <Box px={PX_ALL} mt={{ xs: '40px', lg: '48px' }} id="recruitment-list">
          <Text as="h1" textAlign="center" fontSize={24} fontWeight={500} textTransform="uppercase">
            danh sách tuyển dụng
          </Text>
          <Search />
          <JobList />
        </Box>
      </Flex>
    </Suspense>
  );
};

export default Recruitment;
