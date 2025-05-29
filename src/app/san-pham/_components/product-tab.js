// src/app/san-pham/_components/product-tab.js - Updated to show Lermao and Trà Phượng Hoàng
'use client';

import { useQueryCategoryList } from '../../../services/category.service';
import { useParamsURL } from '../../../utils/hooks';
import { Button, Flex, Text, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const ProductTab = () => {
  const { data = [] } = useQueryCategoryList();
  const [paramsURL, setParamsURL] = useParamsURL();
  const { categoryId } = paramsURL || {};

  // Filter to show only Lermao and Trà Phượng Hoàng categories
  const targetCategories = data.filter(
    (cat) => cat.name === 'Lermao' || cat.name === 'Trà Phượng Hoàng' || cat.id === 2205381 || cat.id === 2205374
  );

  const defaultCategoryId = targetCategories?.[0]?.id;
  const TABS = targetCategories?.map((item) => ({
    label: item.name,
    value: item.id,
    id: item.id
  }));

  const [currentTab, setCurrentTab] = useState(categoryId || defaultCategoryId);

  useEffect(() => {
    const timeoutSetDefault = setTimeout(() => {
      if (typeof categoryId === 'undefined' && defaultCategoryId) {
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

  // If no target categories found, show info message
  if (!TABS || TABS.length === 0) {
    return (
      <Box p="16px" bgColor="#f8f9fa" borderRadius="8px" textAlign="center">
        <Text color="gray.600">Đang tải danh mục Lermao và Trà Phượng Hoàng...</Text>
      </Box>
    );
  }

  return (
    <Flex direction="column" gap="12px">
      {/* Category Tabs */}
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

      {/* Category Information */}
      <Box p="12px" bgColor="#eff9fd" borderRadius="8px">
        <Text fontSize="14px" color="#1E96BC" fontWeight={500} mb="4px">
          Hiển thị sản phẩm từ danh mục đã chọn
        </Text>
        <Text fontSize="12px" color="gray.600">
          Bao gồm sản phẩm thuộc danh mục cha và tất cả danh mục con
        </Text>

        {TABS.length > 0 && (
          <Flex gap="8px" mt="8px" wrap="wrap">
            {TABS.map((tab) => (
              <Text
                key={tab.id}
                fontSize="11px"
                bgColor={currentTab === `${tab.value}` ? '#1E96BC' : 'gray.200'}
                color={currentTab === `${tab.value}` ? 'white' : 'gray.600'}
                px="8px"
                py="2px"
                borderRadius="4px"
              >
                {tab.label} (ID: {tab.id})
              </Text>
            ))}
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default ProductTab;
