'use client';

import SectionBlockH2 from '../../../components/section-block/section-block-h2';
import { useTranslation } from '../../../hooks/useTranslation';
import { IMG_ALT } from '../../../utils/const';
import { Flex, Image, Text } from '@chakra-ui/react';

const Strength = () => {
  const { t } = useTranslation();

  const STRENGTH_LIST = [
    {
      title: t('strength.title1'),
      description: t('strength.desc1')
    },
    {
      title: t('strength.title2'),
      description: t('strength.desc2')
    },
    {
      title: t('strength.title3'),
      description: t('strength.desc3')
    },
    {
      title: t('strength.title4'),
      description: t('strength.desc4')
    },
    {
      title: t('strength.title5'),
      description: t('strength.desc5')
    }
  ];

  return (
    <Flex
      direction="column"
      align="center"
      gap="16px"
      mt="64px"
      px={{ xs: '20px', md: '30px', lg: '160px', xl: '340px', '2xl': '460px' }}
    >
      <SectionBlockH2 title={t('strength.title')} />

      {STRENGTH_LIST.map((item, index) => {
        const { title, description } = item;

        return (
          <Flex
            key={index}
            borderRadius={64}
            borderEndStartRadius={0}
            bgColor="#F4F4F5"
            px="24px"
            pt={{ xs: 0, lg: '36px' }}
            pb={{ xs: '24px', lg: '36px' }}
            gap="16px"
            h={{ xs: 'auto', lg: '176px' }}
            w="full"
            pos="relative"
            direction={{ xs: 'column', lg: 'row' }}
          >
            <Flex display={{ xs: 'block', lg: 'none' }} direction="column" align="center" justify="center">
              <Image src="/images/strength-leaves.webp" alt={IMG_ALT} w="50px" h="25px" mx="auto" />
              <Image
                src={`/images/strength-${index + 1}.webp`}
                alt={IMG_ALT}
                w="106px"
                h="106px"
                borderRadius="full"
                mx="auto"
              />
            </Flex>

            <Flex direction="column" gap="4px" flex={1}>
              <Text
                fontSize={14}
                fontWeight={500}
                textTransform="uppercase"
                color="#73C16B"
                textAlign={{ xs: 'center', lg: 'left' }}
              >
                {title}
              </Text>
              <Text fontSize={18} lineHeight="20px" textAlign="justify">
                {description}
              </Text>
            </Flex>

            <Image
              display={{ xs: 'none', lg: 'block' }}
              src={`/images/strength-${index + 1}.webp`}
              alt={IMG_ALT}
              w="106px"
              h="106px"
              borderRadius="full"
            />

            <Image
              display={{ xs: 'none', lg: 'block' }}
              src="/images/strength-leaves.webp"
              alt={IMG_ALT}
              w="106px"
              h="54px"
              pos="absolute"
              bottom="-15px"
              left="-35px"
            />
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Strength;
