'use client';

import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, Grid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';

const MotionBox = motion(Box);

const FAQS = [
  {
    q: 'Chất lượng nguyên liệu của Diệp Trà có gì khác biệt?',
    a: 'Toàn bộ nguyên liệu được nhập khẩu trực tiếp từ các đối tác độc quyền tại Đài Loan, Trung Quốc và kiểm soát qua 6 tiêu chuẩn nghiêm ngặt, đảm bảo hương vị đồng nhất giữa các đợt hàng.'
  },
  {
    q: 'Tôi là người mới bắt đầu, Diệp Trà hỗ trợ công thức không?',
    a: 'Có. Đội ngũ R&D cung cấp công thức chuẩn, tư vấn xây dựng menu và cập nhật xu hướng đồ uống mới giúp quán vận hành ngay từ ngày đầu.'
  },
  {
    q: 'Sản phẩm của Diệp Trà có giúp tối ưu chi phí vận hành không?',
    a: 'Danh mục đa phân khúc giá và khả năng nhập trọn gói tại một nơi giúp giảm chi phí logistics, tồn kho và thời gian quản lý nhà cung cấp.'
  },
  {
    q: 'Diệp Trà có cập nhật xu hướng thị trường thường xuyên không?',
    a: 'Chúng tôi liên tục ra mắt sản phẩm theo trend và chia sẻ công thức độc quyền qua cẩm nang pha chế để đối tác luôn dẫn đầu thị trường.'
  },
  {
    q: 'Chính sách hỗ trợ và giao hàng của thương hiệu như thế nào?',
    a: 'Hệ thống kho lạnh hai miền và mạng lưới giao nhận phủ 60+ tỉnh thành đảm bảo giao hàng nhanh, đúng hẹn, kèm chính sách hỗ trợ đại lý linh hoạt.'
  },
  {
    q: 'Tại sao nói Diệp Trà là đối tác đồng hành thay vì chỉ là nhà cung cấp?',
    a: '"Thành công của khách hàng là tương lai của chúng tôi" — chúng tôi đồng hành từ nguyên liệu, công thức đến chiến lược menu, gắn bó dài hạn cùng sự phát triển của quán.'
  }
];

const WhyFaq = () => {
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
              alt={'Đối tác đồng hành, không chỉ là nhà cung cấp'}
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
              {'Khám phá nguyên liệu'}
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
            {'Tại sao chọn Diệp Trà?'}
          </Text>
          <Text as="h2" fontFamily={FONT_DISPLAY} fontSize={{ base: '26px', lg: '36px' }} fontWeight={800} mb="24px" color={HC.textPrimary}>
            {'Đối tác đồng hành, không chỉ là nhà cung cấp'}
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
                        {f.q}
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
                        {f.a}
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
