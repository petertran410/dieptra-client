'use client';

import { Box, Text, Heading } from '@chakra-ui/react';
import { useTranslation } from '../../../hooks/useTranslation';

const PolicyContent = ({ pageData, isLoading }) => {
  const { t, getLocalizedText } = useTranslation();

  if (isLoading) {
    return (
      <Box p="20px" textAlign="center">
        <Text color="gray.500" fontSize="16px">
          {t('policy.loading')}
        </Text>
      </Box>
    );
  }

  if (!pageData) {
    return (
      <Box p="20px" textAlign="center">
        <Text color="gray.500" fontSize="16px">
          {t('policy.content.not.found')}
        </Text>
      </Box>
    );
  }

  const { title, title_en, content, content_en } = pageData;

  return (
    <Box
      bg="white"
      borderRadius="16px"
      border="1px solid"
      borderColor="gray.200"
      p={{ xs: '20px', lg: '32px' }}
      shadow="sm"
    >
      <Heading
        as="h1"
        fontSize={{ xs: '24px', lg: '28px' }}
        fontWeight="700"
        color="#003366"
        mb={{ xs: '20px', lg: '32px' }}
        lineHeight="1.3"
        textAlign={{ xs: 'center', lg: 'left' }}
      >
        {getLocalizedText(title, title_en)}
      </Heading>

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
          <div dangerouslySetInnerHTML={{ __html: getLocalizedText(content, content_en) }} />
        ) : (
          <Text color="gray.500" fontSize="16px" textAlign="center" py="40px">
            {t('policy.content.updating')}
          </Text>
        )}
      </Box>

      <Box mt="40px" pt="20px" borderTop="1px solid" borderColor="gray.200">
        <Text fontSize="13px" color="gray.500" textAlign="center">
          {t('policy.question.contact')}
          <Text as="span" color="#003366" fontWeight="500">
            {' '}
            sales@hisweetievietnam.com.vn {''}
          </Text>
          {t('policy.hotline')}
          <Text as="span" color="#003366" fontWeight="500">
            {' '}
            0973 123 230
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default PolicyContent;
