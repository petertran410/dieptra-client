// ✅ TẠO FILE MỚI: src/app/san-pham/_components/category-sidebar.js
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, VStack, Text, Button, Collapse, HStack, Badge, Divider, useDisclosure } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useQueryCategoryHierarchy } from '../../../services/category.service';

const CategoryItem = ({
  category,
  level = 0,
  selectedSubCategory,
  onSubCategorySelect,
  isExpanded,
  onToggleExpand
}) => {
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedSubCategory === category.id.toString();

  const handleClick = () => {
    onSubCategorySelect(category.id.toString());
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggleExpand(category.id);
  };

  return (
    <Box>
      <HStack
        p={2}
        pl={level * 4 + 2}
        cursor="pointer"
        _hover={{ bg: 'gray.50' }}
        bg={isSelected ? 'blue.50' : 'transparent'}
        borderLeft={level > 0 ? '2px solid #E2E8F0' : 'none'}
        onClick={handleClick}
        justify="space-between"
        w="full"
      >
        <HStack flex={1} spacing={2}>
          {hasChildren && (
            <Button
              size="xs"
              variant="ghost"
              p={0}
              minW="auto"
              h="auto"
              onClick={handleToggle}
              _hover={{ bg: 'transparent' }}
            >
              {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </Button>
          )}

          <Text
            fontSize="sm"
            fontWeight={isSelected ? '600' : '400'}
            color={isSelected ? '#003366' : 'gray.700'}
            flex={1}
          >
            {category.name}
          </Text>

          {category.productCount > 0 && (
            <Badge size="sm" colorScheme={isSelected ? 'blue' : 'gray'} variant="subtle">
              {category.productCount}
            </Badge>
          )}
        </HStack>
      </HStack>

      {hasChildren && (
        <Collapse in={isExpanded} animateOpacity>
          <VStack spacing={0} align="stretch">
            {category.children.map((child) => (
              <CategoryItem
                key={child.id}
                category={child}
                level={level + 1}
                selectedSubCategory={selectedSubCategory}
                onSubCategorySelect={onSubCategorySelect}
                isExpanded={isExpanded} // Tự động expand children
                onToggleExpand={onToggleExpand}
              />
            ))}
          </VStack>
        </Collapse>
      )}
    </Box>
  );
};

const CategorySidebar = ({ selectedCategory, onSubCategorySelect }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSubCategory = searchParams.get('subCategoryId');

  const [expandedCategories, setExpandedCategories] = useState(new Set());

  // Fetch category hierarchy
  const { data: categoryHierarchy, isLoading, error } = useQueryCategoryHierarchy(selectedCategory);

  const handleToggleExpand = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleSubCategorySelect = (subCategoryId) => {
    const params = new URLSearchParams(searchParams);

    if (subCategoryId === selectedCategory) {
      // If clicking on parent category, remove subcategory filter
      params.delete('subCategoryId');
    } else {
      params.set('subCategoryId', subCategoryId);
    }
    params.set('page', '1'); // Reset to first page

    const newURL = `/san-pham?${params.toString()}`;
    router.push(newURL, { scroll: false });

    if (onSubCategorySelect) {
      onSubCategorySelect(subCategoryId);
    }
  };

  if (!selectedCategory || selectedCategory === 'all') {
    return null; // Don't show sidebar when "all categories" is selected
  }

  if (isLoading) {
    return (
      <Box w="280px" bg="white" border="1px solid #E2E8F0" borderRadius="md" p={4}>
        <Text fontSize="sm" color="gray.500">
          Đang tải danh mục...
        </Text>
      </Box>
    );
  }

  if (error || !categoryHierarchy) {
    return (
      <Box w="280px" bg="white" border="1px solid #E2E8F0" borderRadius="md" p={4}>
        <Text fontSize="sm" color="red.500">
          Không thể tải danh mục con
        </Text>
      </Box>
    );
  }

  return (
    <Box
      w="280px"
      bg="white"
      border="1px solid #E2E8F0"
      borderRadius="md"
      maxH="600px"
      overflowY="auto"
      position="sticky"
      top="20px"
    >
      <Box p={4} borderBottom="1px solid #E2E8F0">
        <Text fontSize="md" fontWeight="600" color="#003366">
          Danh mục con
        </Text>
        <Text fontSize="sm" color="gray.600" mt={1}>
          {categoryHierarchy.name}
        </Text>
      </Box>

      <VStack spacing={0} align="stretch">
        {/* Parent category option */}
        <CategoryItem
          category={categoryHierarchy}
          level={0}
          selectedSubCategory={selectedSubCategory}
          onSubCategorySelect={handleSubCategorySelect}
          isExpanded={true}
          onToggleExpand={handleToggleExpand}
        />

        {/* Separator */}
        {categoryHierarchy.children && categoryHierarchy.children.length > 0 && <Divider />}

        {/* Child categories */}
        {categoryHierarchy.children &&
          categoryHierarchy.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={0}
              selectedSubCategory={selectedSubCategory}
              onSubCategorySelect={handleSubCategorySelect}
              isExpanded={expandedCategories.has(child.id)}
              onToggleExpand={handleToggleExpand}
            />
          ))}
      </VStack>

      {/* Clear filter button */}
      {selectedSubCategory && selectedSubCategory !== selectedCategory && (
        <Box p={4} borderTop="1px solid #E2E8F0">
          <Button
            size="sm"
            variant="outline"
            w="full"
            onClick={() => handleSubCategorySelect(selectedCategory)}
            borderColor="#003366"
            color="#003366"
            _hover={{ bg: '#003366', color: 'white' }}
          >
            Hiển thị tất cả
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CategorySidebar;
