// src/app/chinh-sach-diep-tra/_components/policy-content.js
'use client';

import { Box, Text, Spinner, Flex } from '@chakra-ui/react';
import { IMG_ALT } from '../../../utils/const';

const PolicyContent = ({ pageData, isLoading }) => {
  if (isLoading) {
    return (
      <Flex align="center" justify="center" minH="400px">
        <Spinner size="lg" color="main.1" />
      </Flex>
    );
  }

  if (!pageData) {
    return (
      <Box
        bg="white"
        borderRadius="16px"
        border="1px solid"
        borderColor="gray.200"
        p={{ xs: '20px', lg: '40px' }}
        shadow="sm"
        minH="400px"
      >
        <Text textAlign="center" color="gray.500" fontSize="16px">
          Không tìm thấy nội dung trang.
        </Text>
      </Box>
    );
  }

  const { title, content } = pageData;

  return (
    <Box
      bg="white"
      borderRadius="16px"
      border="1px solid"
      borderColor="gray.200"
      p={{ xs: '20px', lg: '40px' }}
      shadow="sm"
      minH="400px"
    >
      {/* Title */}
      <Text
        fontSize={{ xs: '24px', lg: '32px' }}
        fontWeight="700"
        color="main.1"
        mb={{ xs: '20px', lg: '30px' }}
        lineHeight="1.3"
      >
        {title}
      </Text>

      {/* Content */}
      <Box
        className="policy-content"
        sx={{
          '& h1': {
            fontSize: { xs: '20px', lg: '24px' },
            fontWeight: '600',
            color: 'main.1',
            mb: '16px',
            mt: '24px',
            '&:first-of-type': {
              mt: 0
            }
          },
          '& h2': {
            fontSize: { xs: '18px', lg: '20px' },
            fontWeight: '600',
            color: 'gray.800',
            mb: '12px',
            mt: '20px',
            '&:first-of-type': {
              mt: 0
            }
          },
          '& h3': {
            fontSize: { xs: '16px', lg: '18px' },
            fontWeight: '600',
            color: 'gray.700',
            mb: '10px',
            mt: '16px'
          },
          '& p': {
            fontSize: { xs: '14px', lg: '16px' },
            lineHeight: '1.7',
            color: 'gray.700',
            mb: '16px',
            textAlign: 'justify'
          },
          '& ul, & ol': {
            pl: '20px',
            mb: '16px'
          },
          '& li': {
            fontSize: { xs: '14px', lg: '16px' },
            lineHeight: '1.7',
            color: 'gray.700',
            mb: '8px'
          },
          '& strong': {
            fontWeight: '600',
            color: 'gray.800'
          },
          '& em': {
            fontStyle: 'italic',
            color: 'gray.600'
          },
          '& a': {
            color: 'main.1',
            textDecoration: 'underline',
            '&:hover': {
              color: 'main.2'
            }
          },
          '& blockquote': {
            borderLeft: '4px solid',
            borderColor: 'main.1',
            pl: '16px',
            py: '8px',
            bg: 'gray.50',
            my: '16px',
            borderRadius: '0 8px 8px 0'
          },
          '& table': {
            w: 'full',
            borderCollapse: 'collapse',
            mb: '16px',
            border: '1px solid',
            borderColor: 'gray.200'
          },
          '& th, & td': {
            border: '1px solid',
            borderColor: 'gray.200',
            p: '8px 12px',
            textAlign: 'left'
          },
          '& th': {
            bg: 'gray.50',
            fontWeight: '600'
          },
          '& code': {
            bg: 'gray.100',
            px: '4px',
            py: '2px',
            borderRadius: '4px',
            fontSize: 'sm',
            fontFamily: 'monospace'
          },
          '& pre': {
            bg: 'gray.100',
            p: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            mb: '16px'
          },
          '& hr': {
            border: 'none',
            borderTop: '1px solid',
            borderColor: 'gray.200',
            my: '24px'
          }
        }}
      >
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <Text color="gray.500" fontSize="16px" textAlign="center" py="40px">
            Nội dung đang được cập nhật.
          </Text>
        )}
      </Box>

      {/* Footer info */}
      <Box mt="40px" pt="20px" borderTop="1px solid" borderColor="gray.200">
        <Text fontSize="13px" color="gray.500" textAlign="center">
          Nếu bạn có thắc mắc về nội dung này, vui lòng liên hệ với chúng tôi qua email:
          <Text as="span" color="main.1" fontWeight="500">
            {' '}
            info@dieptra.com
          </Text>
          hoặc hotline:
          <Text as="span" color="main.1" fontWeight="500">
            {' '}
            1900 xxxx
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default PolicyContent;
