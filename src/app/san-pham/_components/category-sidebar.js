'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, VStack, Text, Button, Collapse, HStack, Divider } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useQueryCategoryHierarchy } from '../../../services/category.service';
import { useQuery } from '@tanstack/react-query';
import { API } from '../../../utils/API';

const CategoryItem = ({
  category,
  level = 0,
  selectedSubCategory,
  onSubCategorySelect,
  expandedCategories,
  onToggleExpand
}) => {
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedSubCategory === category.id.toString();
  const isExpanded = expandedCategories.has(category.id);

  const handleClick = () => {
    onSubCategorySelect(category.id); // ← Gọi callback với categoryId
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
                expandedCategories={expandedCategories}
                onToggleExpand={onToggleExpand}
              />
            ))}
          </VStack>
        </Collapse>
      )}
    </Box>
  );
};

const CategorySidebar = ({ selectedCategory, onSubCategorySelect, subCategoryId }) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  // Fetch full categories để build slug path
  const { data: fullCategories = [], isLoading: fullCategoriesLoading } = useQuery({
    queryKey: ['GET_FULL_CATEGORIES'],
    queryFn: async () => {
      const response = await API.request({
        url: '/api/category/for-cms',
        method: 'GET'
      });
      return response?.data || [];
    },
    staleTime: 10 * 60 * 1000
  });

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

  // BUILD SLUG PATH và navigate
  const handleSubCategorySelect = (categoryId) => {
    console.log('CategorySidebar: handleSubCategorySelect called with:', categoryId);

    // Build full slug path từ root đến target category
    const buildCategorySlugPath = (categories, targetId) => {
      const category = categories.find((cat) => cat.id === targetId);
      if (!category) return [];

      if (category.parent_id) {
        const parentPath = buildCategorySlugPath(categories, category.parent_id);
        return [...parentPath, category.slug];
      }
      return [category.slug];
    };

    const slugPath = buildCategorySlugPath(fullCategories, categoryId);
    console.log('Built slug path:', slugPath);

    if (slugPath.length > 0) {
      const url = `/san-pham/${slugPath.join('/')}`;
      console.log('Navigating to:', url);

      // Gọi callback để parent component handle
      if (onSubCategorySelect) {
        onSubCategorySelect(url);
      }
    }
  };

  if (!selectedCategory || selectedCategory === 'all') {
    return null;
  }

  if (isLoading || fullCategoriesLoading) {
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
      borderRadius="xl"
      maxH="600px"
      overflowY="auto"
      position="sticky"
      top="20px"
    >
      <Box p={4} borderBottom="1px solid #E2E8F0">
        <Text fontSize="lg" fontWeight="600" color="#003366">
          Danh mục
        </Text>
        <Text fontSize="sm" color="gray.600" mt={1}>
          {categoryHierarchy.name}
        </Text>
      </Box>

      <VStack spacing={0} align="stretch">
        {categoryHierarchy.children &&
          categoryHierarchy.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={0}
              selectedSubCategory={subCategoryId}
              onSubCategorySelect={handleSubCategorySelect}
              expandedCategories={expandedCategories}
              onToggleExpand={handleToggleExpand}
            />
          ))}
      </VStack>
    </Box>
  );
};

export default CategorySidebar;
