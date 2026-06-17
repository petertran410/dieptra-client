'use client';

import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, Grid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';
import { useTranslation } from '../../../hooks/useTranslation';

const MotionBox = motion(Box);

const FAQS = [
  { q: 'home.faq.1.q', a: 'home.faq.1.a' },
  { q: 'home.faq.2.q', a: 'home.faq.2.a' },
  { q: 'home.faq.3.q', a: 'home.faq.3.a' },
  { q: 'home.faq.4.q', a: 'home.faq.4.a' },
  { q: 'home.faq.5.q', a: 'home.faq.5.a' },
  { q: 'home.faq.6.q', a: 'home.faq.6.a' }
];

const WhyFaq = () => {
  const { t } = useTranslation();

  return (
    <Box as="section" id="why" bg={HC.bgSoft} px={HOME_PX} py={{ base: '56px', lg: '96px' }}>
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1.05fr' }} gap={{ base: '34px', lg: '52px' }} alignItems="start">
        {/* visual */}
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          bg={HC.cyanBg}
          borderRadius="24px"
          p={{ base: '24px', lg: '36px' }}
        >
          <Box sx={{ aspectRatio: '3 / 4' }} borderRadius="16px" overflow="hidden">
            <Image
              src="/images/home-v2/why-bia-tra.png"
              alt={t('home.why.title')}
              width={600}
              height={800}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Flex justify="center" mt="22px">
            <Box
              as={Link}
              href="#categories"
              display="inline-flex"
              alignItems="center"
              gap="9px"
              fontFamily={FONT_DISPLAY}
              fontWeight={700}
              fontSize="15px"
              borderRadius="12px"
              px="30px"
              py="14px"
              bg={HC.accent}
              color="#FFF"
              boxShadow="0 8px 20px rgba(255,122,26,.32)"
              transition="all .2s"
              _hover={{ bg: HC.accentDeep }}
            >
              {t('home.why.cta')}
            </Box>
          </Flex>
        </MotionBox>

        {/* faq */}
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Text
            as="span"
            fontFamily={FONT_DISPLAY}
            fontWeight={700}
            fontSize="13px"
            letterSpacing=".14em"
            textTransform="uppercase"
            color={HC.primary}
            mb="14px"
            display="inline-block"
          >
            {t('home.why.eyebrow')}
          </Text>
          <Text as="h2" fontFamily={FONT_DISPLAY} fontSize={{ base: '26px', lg: '36px' }} fontWeight={800} mb="24px" color={HC.textPrimary}>
            {t('home.why.title')}
          </Text>

          <Accordion defaultIndex={[0]} allowToggle>
            {FAQS.map((f) => (
              <AccordionItem key={f.q} border="none" borderBottom={`1px solid ${HC.border}`}>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      px="4px"
                      py="22px"
                      _hover={{ bg: 'transparent' }}
                      sx={{ gap: '16px' }}
                    >
                      <Box
                        flex="1"
                        textAlign="left"
                        fontFamily={FONT_DISPLAY}
                        fontWeight={700}
                        fontSize="16.5px"
                        color={HC.primaryDark}
                      >
                        {t(f.q)}
                      </Box>
                      <Flex
                        flex="none"
                        w="26px"
                        h="26px"
                        borderRadius="50%"
                        align="center"
                        justify="center"
                        fontSize="18px"
                        border={`1.5px solid ${HC.primary}`}
                        color={isExpanded ? '#FFF' : HC.primary}
                        bg={isExpanded ? HC.primary : 'transparent'}
                        transform={isExpanded ? 'rotate(45deg)' : 'none'}
                        transition="transform .25s"
                      >
                        +
                      </Flex>
                    </AccordionButton>
                    <AccordionPanel px="4px" pb="22px" pt="0">
                      <Text color={HC.textSecondary} fontSize="15px" lineHeight="1.7">
                        {t(f.a)}
                      </Text>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </MotionBox>
      </Grid>
    </Box>
  );
};

export default WhyFaq;
