import { Button, Flex, HStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function ProductPagination({ currentPage, totalPages, basePath, searchParams = {} }) {
  if (totalPages <= 1) return null;

  const pages = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else if (currentPage <= 3) {
    for (let i = 1; i <= 5; i++) pages.push(i);
  } else if (currentPage >= totalPages - 2) {
    for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
  } else {
    for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
  }

  const buildHref = (page) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== 'page') params.set(k, String(v));
    });
    if (page > 1) params.set('page', String(page));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <Flex justify="center" mt={10} mb={10}>
      <HStack spacing={2}>
        {currentPage > 1 && (
          <Link href={buildHref(currentPage - 1)}>
            <Button variant="outline" size="md" borderColor="#003366" color="#003366">
              ‹ Trước
            </Button>
          </Link>
        )}
        {pages.map((p) => (
          <Link key={p} href={buildHref(p)}>
            <Button
              size="md"
              variant={currentPage === p ? 'solid' : 'outline'}
              bg={currentPage === p ? '#003366' : 'white'}
              borderColor="#003366"
              color={currentPage === p ? 'white' : '#003366'}
            >
              {p}
            </Button>
          </Link>
        ))}
        {currentPage < totalPages && (
          <Link href={buildHref(currentPage + 1)}>
            <Button variant="outline" size="md" borderColor="#003366" color="#003366">
              Tiếp ›
            </Button>
          </Link>
        )}
      </HStack>
    </Flex>
  );
}
