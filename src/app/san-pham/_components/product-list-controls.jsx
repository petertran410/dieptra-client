'use client';

import { Button, Flex, HStack, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ProductListControls({
  topCategories = [],
  selectedCategoryId,
  currentSort,
  currentKeyword,
  basePath = '/san-pham'
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(currentKeyword || '');

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === 'sort' && value === 'name') {
      params.delete(key);
    } else if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
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
            placeholder={'Tìm kiếm sản phẩm...'}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            bg="white"
            border="1px solid #E2E8F0"
          />
        </InputGroup>
        <Button onClick={handleSearch} bg="#3366ff" color="white" _hover={{ bg: '#3366ff' }} fontSize="18px">
          {'Tìm'}
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
          <option value="all">{'Tất cả danh mục'}</option>
          {topCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
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
          <option value="name">{'Tên A-Z'}</option>
          <option value="price-low">{'Giá thấp → cao'}</option>
          <option value="price-high">{'Giá cao → thấp'}</option>
        </Select>
      </HStack>
    </Flex>
  );
}
