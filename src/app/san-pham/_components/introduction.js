'use client';

import SectionBlock from '../../../components/section-block';
import { useQueryCategoryList } from '../../../services/category.service';
import { useGetParamsURL } from '../../../utils/hooks';
import { Flex, Text } from '@chakra-ui/react';

const Introduction = () => {
  const { data = [] } = useQueryCategoryList();
  const paramsURL = useGetParamsURL();
  const { categoryId } = paramsURL || {};
  const currentCategory = data?.find((i) => `${i.id}` === categoryId);

  return (
    <Flex direction="column" align="center" mt="24px" gap="16px">
      <SectionBlock title="Giới thiệu" />
      <Text fontSize={18} lineHeight="22px" textAlign={{ xs: 'justify', lg: 'left' }}>
        {currentCategory?.description}
      </Text>
    </Flex>
  );
};

export default Introduction;
