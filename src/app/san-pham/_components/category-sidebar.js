'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, VStack, Text, Button, Divider, Flex, Icon, Collapse } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useQueryCategoryHierarchy } from '../../../services/category.service';

const CategoryItem = ({
  category,
  level,
  selectedSubCategory,
  onSubCategorySelect,
  isExpanded,
  onToggleExpand,
  isSlugBasedRouting = false,
  expandedCategories
}) => {
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedSubCategory === category.id.toString();

  const handleClick = () => {
    if (isSlugBasedRouting && category.slug) {
      onSubCategorySelect(category.slug, category.id, 'slug');
    } else {
      onSubCategorySelect(category.id.toString());
    }
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggleExpand(category.id);
    }
  };

  return (
    <Box>
      <Flex
        align="center"
        p={3}
        pl={level * 4 + 12}
        cursor="pointer"
        bg={isSelected ? '#f7fafc' : 'transparent'}
        color={isSelected ? '#065FD4' : '#4a5568'}
        fontWeight={isSelected ? '600' : '400'}
        _hover={{ bg: '#f7fafc', color: '#065FD4' }}
        onClick={handleClick}
      >
        <Text flex={1} fontSize="sm">
          {category.name}
        </Text>

        {hasChildren && (
          <Icon as={isExpanded ? ChevronDownIcon : ChevronRightIcon} w={4} h={4} onClick={handleToggle} />
        )}
      </Flex>

      {hasChildren && (
        <Collapse in={isExpanded}>
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
              selectedSubCategory={selectedSubCategory}
              onSubCategorySelect={onSubCategorySelect}
              isExpanded={expandedCategories.has(child.id)}
              onToggleExpand={onToggleExpand}
              isSlugBasedRouting={isSlugBasedRouting}
            />
          ))}
        </Collapse>
      )}
    </Box>
  );
};

const CategorySidebar = ({
  selectedCategory,
  selectedSubCategory,
  onSubCategorySelect,
  isSlugBasedRouting = false
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const { data: categoryHierarchy, isLoading, error } = useQueryCategoryHierarchy(selectedCategory);

  const handleToggleExpand = (categoryId) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleSubCategorySelect = (identifier, categoryId, type = 'id') => {
    if (type === 'slug' && isSlugBasedRouting) {
      // NEW: Navigate using slug
      router.push(`/san-pham/${identifier}`, { scroll: false });
    } else {
      // FALLBACK: Use existing query param logic
      const params = new URLSearchParams(searchParams);

      if (identifier === selectedCategory) {
        params.delete('subCategoryId');
      } else {
        params.set('subCategoryId', identifier);
      }
      params.set('page', '1');

      const newURL = `/san-pham?${params.toString()}`;
      router.push(newURL, { scroll: false });
    }

    if (onSubCategorySelect) {
      onSubCategorySelect(identifier);
    }
  };

  // Rest of component logic stays the same...
  if (!selectedCategory || selectedCategory === 'all') {
    return null;
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
      borderRadius="xl"
      maxH="600px"
      overflowY="auto"
      position="sticky"
      top="20px"
    >
      <Box p={4} borderBottom="1px solid #E2E8F0">
        <Text fontSize="xl" fontWeight="600" color="#003366">
          Danh mục
        </Text>
        <Text fontSize="xl" color="gray.600" mt={1}>
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
              selectedSubCategory={selectedSubCategory}
              onSubCategorySelect={handleSubCategorySelect}
              isExpanded={expandedCategories.has(child.id)}
              onToggleExpand={handleToggleExpand}
              isSlugBasedRouting={isSlugBasedRouting}
              expandedCategories={expandedCategories} // ← ADD THIS
            />
          ))}
      </VStack>

      {selectedSubCategory && selectedSubCategory !== selectedCategory && (
        <Box p={4} borderTop="1px solid #E2E8F0">
          <Button
            size="xl"
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
