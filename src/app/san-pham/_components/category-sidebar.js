import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

function CategoryItem({ category, level = 0, allCategories, activeCategoryId, slugPath }) {
  const children = allCategories.filter((c) => c.parent_id === category.id);
  const hasChildren = children.length > 0;
  const isActive = activeCategoryId === category.id;

  // Build slug path để link
  const buildSlugPath = (id) => {
    const c = allCategories.find((x) => x.id === id);
    if (!c) return '';
    if (!c.parent_id) return c.slug;
    return `${buildSlugPath(c.parent_id)}/${c.slug}`;
  };
  const href = `/san-pham/${buildSlugPath(category.id)}`;

  return (
    <Box>
      <Link href={href}>
        <HStack
          p={2}
          pl={level * 4 + 2}
          _hover={{ bg: 'gray.50' }}
          bg={isActive ? 'blue.50' : 'transparent'}
          borderLeft={level > 0 ? '2px solid #E2E8F0' : 'none'}
        >
          <Text fontSize="lg" fontWeight={isActive ? '600' : '400'} color={isActive ? '#003366' : 'gray.700'}>
            {category.name}
          </Text>
        </HStack>
      </Link>

      {hasChildren && (
        <VStack spacing={0} align="stretch">
          {children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
              allCategories={allCategories}
              activeCategoryId={activeCategoryId}
              slugPath={slugPath}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default function CategorySidebar({ rootCategory, allCategories, activeCategoryId, slugPath }) {
  if (!rootCategory) return null;
  const children = allCategories.filter((c) => c.parent_id === rootCategory.id);

  return (
    <Box
      w={{ base: '100%', md: '280px' }}
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
        <Text fontSize="lg" color="gray.600" mt={1}>
          {rootCategory.name}
        </Text>
      </Box>
      <VStack spacing={0} align="stretch">
        {children.map((c) => (
          <CategoryItem
            key={c.id}
            category={c}
            allCategories={allCategories}
            activeCategoryId={activeCategoryId}
            slugPath={slugPath}
          />
        ))}
      </VStack>
    </Box>
  );
}
