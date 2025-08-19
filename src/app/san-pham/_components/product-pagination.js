// src/app/san-pham/_components/product-pagination.jsx
'use client';

import { HStack, Button, Text, Icon, Box } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProductPagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <HStack spacing={2}>
        {/* Previous Button */}
        <Button
          leftIcon={<Icon as={FiChevronLeft} />}
          variant="outline"
          size="sm"
          isDisabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Trước
        </Button>

        {/* First page */}
        {getPageNumbers()[0] > 1 && (
          <>
            <Button size="sm" variant="outline" onClick={() => onPageChange(1)}>
              1
            </Button>
            {getPageNumbers()[0] > 2 && (
              <Text color="gray.500" px={2}>
                ...
              </Text>
            )}
          </>
        )}

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <Button
            key={page}
            size="sm"
            variant={currentPage === page ? 'solid' : 'outline'}
            colorScheme={currentPage === page ? 'blue' : 'gray'}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        {/* Last page */}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
              <Text color="gray.500" px={2}>
                ...
              </Text>
            )}
            <Button size="sm" variant="outline" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </Button>
          </>
        )}

        {/* Next Button */}
        <Button
          rightIcon={<Icon as={FiChevronRight} />}
          variant="outline"
          size="sm"
          isDisabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Sau
        </Button>
      </HStack>
    </Box>
  );
};

export default ProductPagination;
