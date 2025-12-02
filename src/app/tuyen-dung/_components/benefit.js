'use client';

import { useTranslation } from '../../../hooks/useTranslation';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const Benefit = () => {
  const { t } = useTranslation();

  return (
    <Box mt={{ xs: '40px', lg: '48px' }}>
      <Text px={PX_ALL} fontWeight={500} fontSize={24} textAlign="center">
        {t('recruit.popular.activity')}
      </Text>
      <Flex mt={{ xs: '16px', lg: '24px' }} direction={{ xs: 'column', lg: 'row' }} gap={{ xs: '16px', lg: 0 }}>
        <Flex w={{ xs: 'full', lg: '50%' }} h={{ xs: '200px', lg: 'auto' }}>
          <Image fit="cover" w="full" h="full" src="/images/image-recruitment-1.webp" alt={IMG_ALT} />
        </Flex>
        <Flex
          w={{ xs: 'full', lg: '50%' }}
          direction="column"
          gap="12px"
          pl={{ xs: '16px', md: '25px', lg: '64px' }}
          pr={{ xs: '16px', md: '25px', lg: '120px' }}
          justify="center"
        >
          <Text textTransform="uppercase" fontWeight={600} fontSize={24} lineHeight="30px">
            {t('recruit.section.1')}{' '}
            <Text as="span" textTransform="uppercase" fontWeight={600} fontSize={24} color="#1E96BC">
              {t('recruit.company.name')}
            </Text>
          </Text>
          <Text fontSize={18} lineHeight="20px">
            {t('recruit.section.1.desc.1')}
            <br />
            <br />
            {t('recruit.section.1.desc.2')}
          </Text>
        </Flex>
      </Flex>
      <Flex mt={{ xs: '16px', lg: '24px' }} direction={{ xs: 'column', lg: 'row' }} gap={{ xs: '16px', lg: 0 }}>
        <Flex
          w={{ xs: 'full', lg: '50%' }}
          direction="column"
          gap="12px"
          pr={{ xs: '16px', md: '25px', lg: '64px' }}
          pl={{ xs: '16px', md: '25px', lg: '120px' }}
          justify="center"
        >
          <Text fontWeight={600} lineHeight="30px" fontSize={24}>
            {t('recruit.section.2')}
          </Text>
          <Text fontSize={18} lineHeight="20px">
            {t('recruit.section.2.desc.1')}
          </Text>
        </Flex>
        <Flex w={{ xs: 'full', lg: '50%' }} h={{ xs: '200px', lg: 'auto' }}>
          <Image fit="cover" w="full" h="full" src="/images/image-recruitment-1.webp" alt={IMG_ALT} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Benefit;
