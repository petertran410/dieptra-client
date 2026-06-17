'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';
import SecHead from './sec-head';
import { useTranslation } from '../../../hooks/useTranslation';

const MotionBox = motion(Box);

const GUIDES = [
  {
    img: '/images/home-v2/guide-cong-thuc.png',
    href: '/bai-viet/cong-thuc-pha-che',
    titleKey: 'home.guide.1.title',
    lis: ['home.guide.1.li1', 'home.guide.1.li2', 'home.guide.1.li3'],
    ctaKey: 'home.guide.1.cta'
  },
  {
    img: '/images/home-v2/guide-nguyen-lieu.png',
    href: '/bai-viet/kien-thuc-nguyen-lieu-pha-che',
    titleKey: 'home.guide.2.title',
    lis: ['home.guide.2.li1', 'home.guide.2.li2', 'home.guide.2.li3'],
    ctaKey: 'home.guide.2.cta'
  },
  {
    img: '/images/home-v2/guide-kinh-doanh.png',
    href: '/bai-viet/kien-thuc-ve-tra',
    titleKey: 'home.guide.3.title',
    lis: ['home.guide.3.li1', 'home.guide.3.li2', 'home.guide.3.li3'],
    ctaKey: 'home.guide.3.cta'
  }
];

const GuideCards = () => {
  const { t } = useTranslation();

  return (
    <Box as="section" id="guide" px={HOME_PX} py={{ base: '56px', lg: '96px' }}>
      <SecHead eyebrow={t('home.guide.eyebrow')} title={t('home.guide.title')} />

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={{ base: '20px', lg: '26px' }}>
        {GUIDES.map((g, i) => (
          <MotionBox
            key={g.href}
            as={Link}
            href={g.href}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
            bg="#FFF"
            border={`1px solid ${HC.border}`}
            borderRadius="18px"
            overflow="hidden"
            display="block"
            transition-property="transform, box-shadow"
            sx={{ transition: 'transform .25s, box-shadow .25s', '&:hover': { transform: 'translateY(-6px)', boxShadow: HC.shadowCard }, '&:hover .guide-img': { transform: 'scale(1.05)' } }}
          >
            <Box sx={{ aspectRatio: '16 / 10' }} overflow="hidden">
              <Image
                className="guide-img"
                src={g.img}
                alt={t(g.titleKey)}
                width={520}
                height={325}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }}
              />
            </Box>
            <Box p="26px">
              <Text as="h3" fontFamily={FONT_DISPLAY} fontSize="20px" fontWeight={800} mb="14px" color={HC.textPrimary}>
                {t(g.titleKey)}
              </Text>
              <Flex direction="column" gap="9px" mb="20px">
                {g.lis.map((li) => (
                  <Flex key={li} gap="9px" fontSize="14.5px" color={HC.textSecondary}>
                    <Text as="span" color={HC.primary} fontWeight={900}>
                      ›
                    </Text>
                    {t(li)}
                  </Flex>
                ))}
              </Flex>
              <Box
                display="inline-flex"
                alignItems="center"
                gap="8px"
                fontFamily={FONT_DISPLAY}
                fontWeight={700}
                fontSize="15px"
                borderRadius="12px"
                px="22px"
                py="11px"
                border={`1.5px solid ${HC.primary}`}
                color={HC.primary}
                transition="all .2s"
                _hover={{ bg: HC.primaryDark, borderColor: HC.primaryDark, color: '#FFF' }}
              >
                {t(g.ctaKey)}
              </Box>
            </Box>
          </MotionBox>
        ))}
      </Grid>
    </Box>
  );
};

export default GuideCards;
