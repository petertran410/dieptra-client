// src/app/chinh-sach-diep-tra/_components/policy-content.js
'use client';

import { Box, Text, Heading } from '@chakra-ui/react';

const PolicyContent = ({ pageData, isLoading }) => {
  if (isLoading) {
    return (
      <Box p="20px" textAlign="center">
        <Text color="gray.500" fontSize="16px">
          Đang tải nội dung...
        </Text>
      </Box>
    );
  }

  if (!pageData) {
    return (
      <Box p="20px" textAlign="center">
        <Text color="gray.500" fontSize="16px">
          Không tìm thấy nội dung.
        </Text>
      </Box>
    );
  }

  const { meta_title, title, content } = pageData;

  return (
    <Box
      bg="white"
      borderRadius="16px"
      border="1px solid"
      borderColor="gray.200"
      p={{ xs: '20px', lg: '32px' }}
      shadow="sm"
    >
      {/* Title as H1 */}
      <Heading
        as="h1"
        fontSize={{ xs: '24px', lg: '32px' }}
        fontWeight="700"
        color="#003366"
        mb={{ xs: '20px', lg: '32px' }}
        lineHeight="1.3"
        textAlign={{ xs: 'center', lg: 'left' }}
      >
        {title}
      </Heading>

      {/* Content */}
      <Box
        fontSize={{ xs: '16px', lg: '18px' }}
        lineHeight="1.7"
        color="gray.700"
        sx={{
          '& h2': {
            fontSize: { xs: '18px', lg: '20px' },
            fontWeight: '600',
            color: '#003366',
            marginTop: '24px',
            marginBottom: '16px',
            lineHeight: '1.4'
          },
          '& h3': {
            fontSize: { xs: '16px', lg: '18px' },
            fontWeight: '600',
            color: 'gray.800',
            marginTop: '20px',
            marginBottom: '12px',
            lineHeight: '1.4'
          },
          '& p': {
            marginBottom: '16px',
            textAlign: 'justify',
            fontSize: { xs: '16px', lg: '17px' }
          },
          '& ul': {
            marginBottom: '16px',
            paddingLeft: '20px',
            fontSize: { xs: '16px', lg: '17px' }
          },
          '& ol': {
            marginBottom: '16px',
            paddingLeft: '20px',
            fontSize: { xs: '16px', lg: '17px' }
          },
          '& li': {
            marginBottom: '8px',
            lineHeight: '1.6',
            fontSize: { xs: '16px', lg: '17px' }
          },
          '& table': {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
            border: '1px solid #e2e8f0'
          },
          '& th': {
            backgroundColor: '#f7fafc',
            padding: '12px 16px',
            textAlign: 'left',
            fontWeight: '600',
            fontSize: { xs: '14px', lg: '15px' },
            border: '1px solid #e2e8f0'
          },
          '& td': {
            padding: '12px 16px',
            border: '1px solid #e2e8f0',
            fontSize: { xs: '14px', lg: '15px' }
          },
          '& strong': {
            fontWeight: '600',
            color: 'gray.800',
            fontSize: { xs: '16px', lg: '17px' }
          },
          '& em': {
            fontStyle: 'italic',
            color: 'gray.600',
            fontSize: { xs: '16px', lg: '17px' }
          },
          '& a': {
            color: '#003366',
            textDecoration: 'underline',
            fontWeight: '500',
            _hover: {
              color: '#001a33'
            },
            fontSize: { xs: '16px', lg: '17px' }
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
          <Text as="span" color="#003366" fontWeight="500">
            {' '}
            dieptra.sg@gmail.com {''}
          </Text>
          hoặc hotline:
          <Text as="span" color="#003366" fontWeight="500">
            {' '}
            0906 300 204
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default PolicyContent;
