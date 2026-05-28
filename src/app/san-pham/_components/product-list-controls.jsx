'use client';

import { Button, Flex, HStack, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';

export default function ProductListControls({ topCategories = [], selectedCategoryId, currentSort, currentKeyword }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t, getLocalizedText } = useTranslation();
  const [keyword, setKeyword] = useState(currentKeyword || '');

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = () => updateParam('keyword', keyword.trim());
  const handleSortChange = (e) => updateParam('sort', e.target.value);

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    if (id === 'all') {
      router.push('/san-pham');
      return;
    }
    const cat = topCategories.find((c) => c.id.toString() === id);
    if (cat?.slug) router.push(`/san-pham/${cat.slug}`);
  };

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      gap={4}
      w="full"
      align={{ base: 'stretch', md: 'center' }}
      justify="space-between"
    >
      <HStack spacing={4} flex={1}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder={t('product.searching.placeholder')}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            bg="white"
            border="1px solid #E2E8F0"
          />
        </InputGroup>
        <Button onClick={handleSearch} bg="#3366ff" color="white" _hover={{ bg: '#3366ff' }} fontSize="18px">
          {t('product.searching.name')}
        </Button>
      </HStack>

      <HStack spacing={4}>
        <Select
          value={selectedCategoryId || 'all'}
          onChange={handleCategoryChange}
          maxW="300px"
          bg="white"
          fontSize="xl"
          border="1px solid #E2E8F0"
        >
          <option value="all">{t('product.all.product')}</option>
          {topCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {getLocalizedText(c.name, c.name_en)}
            </option>
          ))}
        </Select>

        <Select
          value={currentSort || 'name'}
          onChange={handleSortChange}
          maxW="160px"
          fontSize="xl"
          bg="white"
          border="1px solid #E2E8F0"
        >
          <option value="name">{t('product.sorting.name')}</option>
          <option value="price-low">{t('product.sorting.price.low')}</option>
          <option value="price-high">{t('product.sorting.price.high')}</option>
        </Select>
      </HStack>
    </Flex>
  );
}
