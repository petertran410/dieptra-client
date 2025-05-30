// src/app/san-pham/_components/product-tab.js - FIXED to not select default category
'use client';

import { useQueryCategoryList } from '../../../services/category.service';
import { useParamsURL } from '../../../utils/hooks';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const ProductTab = () => {
  const { data = [] } = useQueryCategoryList();
  const [paramsURL, setParamsURL] = useParamsURL();
  const { categoryId } = paramsURL || {};

  // Filter to show only Lermao and Trà Phượng Hoàng categories
  const targetCategories = data.filter(
    (cat) => cat.name === 'Lermao' || cat.name === 'Trà Phượng Hoàng' || cat.id === 2205381 || cat.id === 2205374
  );

  // CRITICAL FIX: Don't select default category - let user choose
  const TABS = targetCategories?.map((item) => ({
    label: item.name,
    value: item.id,
    id: item.id
  }));

  const [currentTab, setCurrentTab] = useState(categoryId);

  // REMOVED: Auto-selection of default category
  // This allows the page to show ALL products by default

  useEffect(() => {
    if (typeof categoryId !== 'undefined') {
      setCurrentTab(categoryId);
    }
  }, [categoryId]);

  // If no target categories found, don't render anything
  if (!TABS || TABS.length === 0) {
    return null;
  }

  return (
    <Flex borderRadius={12} bgColor="#F4F4F5" p="3px">
      {TABS.map((item) => {
        const { label, value, id } = item;
        const isActive = currentTab === `${value}`;

        return (
          <Button
            key={value}
            flex={1}
            bgColor={isActive ? 'main.1' : 'transparent'}
            borderRadius={8}
            _hover={{ bgColor: isActive ? 'main.1' : 'rgba(30, 150, 188, 0.1)' }}
            _active={{ bgColor: isActive ? 'main.1' : 'transparent' }}
            onClick={() => {
              setCurrentTab(value);
              // CRITICAL FIX: Reset subCategoryId when changing main category
              setParamsURL({
                categoryId: value,
                subCategoryId: undefined,
                page: 1 // Reset to first page
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
