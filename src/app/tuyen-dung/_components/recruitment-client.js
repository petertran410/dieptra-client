'use client';

import { PX_ALL } from '../../../utils/const';
import { Box, Flex, Text } from '@chakra-ui/react';
import Activity from './activity';
import Banner from './banner';
import Culture from './culture';
import JobList from './job-list';
import Search from './search';
import { useTranslation } from '../../../hooks/useTranslation';

const RecruitmentClient = () => {
  const { t } = useTranslation();

  return (
    <Flex direction="column" pb="40px">
      <Banner />
      <Culture />
      <Activity />
      <Box px={PX_ALL} mt={{ xs: '40px', lg: '48px' }} id="recruitment-list">
        <Text as="h1" textAlign="center" fontSize={24} fontWeight={500} textTransform="uppercase">
          {t('recruit.list')}
        </Text>
        <Search />
        <JobList />
      </Box>
    </Flex>
  );
};

export default RecruitmentClient;
