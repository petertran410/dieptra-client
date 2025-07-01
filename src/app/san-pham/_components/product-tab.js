'use client';

import { useQueryCategoryList } from '../../../services/category.service';
import { useParamsURL } from '../../../utils/hooks';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const ProductTab = () => {
  const { data = [] } = useQueryCategoryList();
  const [paramsURL, setParamsURL] = useParamsURL();
  const { categoryId } = paramsURL || {};
  const defaultCategoryId = data?.[0]?.id;
  const TABS = data?.map((item) => ({ label: item.name, value: item.id }))?.slice(0, 3);
  const [currentTab, setCurrentTab] = useState(categoryId || defaultCategoryId);

  useEffect(() => {
    const timeoutSetDefault = setTimeout(() => {
      if (typeof categoryId === 'undefined') {
        setParamsURL({ categoryId: defaultCategoryId });
      }
    }, 300);

    return () => clearTimeout(timeoutSetDefault);
  }, [categoryId, defaultCategoryId, setParamsURL]);

  useEffect(() => {
    if (typeof categoryId !== 'undefined') {
      setCurrentTab(categoryId);
    }
  }, [categoryId]);

  return (
    <Flex borderRadius={12} bgColor="#F4F4F5" p="3px">
      {TABS.map((item) => {
        const { label, value } = item;
        const isActive = currentTab === `${value}`;

        return (
          <Button
            key={value}
            flex={1}
            bgColor={isActive ? 'main.1' : 'transparent'}
            borderRadius={8}
            _hover={{ bgColor: isActive ? 'main.1' : 'transparent' }}
            _active={{ bgColor: isActive ? 'main.1' : 'transparent' }}
            onClick={() => {
              setCurrentTab(value);
              setParamsURL({ categoryId: value, subCategoryId: undefined });
            }}
          >
            <Text fontSize={16} fontWeight={500} color={isActive ? '#FFF' : undefined}>
              {label}
            </Text>
          </Button>
        );
      })}
    </Flex>
  );
};

export default ProductTab;
