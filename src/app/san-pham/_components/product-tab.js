'use client';

import { useQueryCategoryList } from '../../../services/category.service';
import { useParamsURL } from '../../../utils/hooks';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const ProductTab = () => {
  const { data = [] } = useQueryCategoryList();
  const [paramsURL, setParamsURL] = useParamsURL();
  const { categoryId } = paramsURL || {};

  // FIXED: Use hardcoded mapping for the specific categories we need
  const TABS = [
    {
      label: 'Trà Phượng Hoàng',
      value: '2205374', // Direct KiotViet category ID
      parentCategoryId: 2205374
    },
    {
      label: 'Lermao',
      value: ['2205420', '2205421', '2205422', '2205423', '2205425'], // Direct KiotViet category ID
      parentCategoryId: 2205381
    }
  ];

  // FIXED: Default to Trà Phượng Hoàng instead of first from database
  const defaultCategoryId = '2205374';
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
        const isActive = currentTab === value;

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
              // FIXED: Clear subCategoryId when switching main tabs and set the correct categoryId
              setParamsURL({
                categoryId: value,
                subCategoryId: undefined,
                page: undefined // Reset to first page
              });
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
