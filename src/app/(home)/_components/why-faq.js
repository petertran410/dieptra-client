'use client';

import { useState } from 'react';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box as="section" id="why" bg={HC.bgSoft} px={HOME_PX} py={{ base: '56px', lg: '96px' }}>
      <Grid templateColumns={{ base: '1fr', lg: '0.8fr 1.2fr' }} gap={{ base: '34px', lg: '52px' }} alignItems={{ base: 'start', lg: 'stretch' }}>
        {/* visual */}
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          w="full"
          maxW={{ base: '500px', lg: '100%' }}
          mx="auto"
          display="flex"
          flexDirection="column"
          h={{ base: 'auto', lg: '100%' }}
        >
          <Box
            position="relative"
            w="full"
            flex={{ base: 'none', lg: 1 }}
            minH="0"
            sx={{ aspectRatio: { base: '1 / 1', lg: 'auto' } }}
            borderRadius="24px"
            border="8px solid #fff"
            boxShadow="0 15px 35px rgba(0,0,0,0.12)"
            overflow="hidden"
          >
            <Image
              src="/images/home-v2/why-partner.webp"
              alt={'Đồng hành cùng quán trên hành trình phát triển'}
              fill
              sizes="(max-width: 992px) 100vw, 600px"
              style={{ objectFit: 'cover' }}
            />
          </Box>
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
          <Text 
            as="h2" 
            fontFamily={FONT_DISPLAY} 
            fontSize={{ base: '20px', md: '24px', lg: '26px', xl: '32px' }} 
            fontWeight={800} 
            mb="16px" 
            color={HC.textPrimary}
            lineHeight={1.3}
          >
            {'Cùng quán vững bước trên hành trình phát triển,'}
            <br />
            {'không chỉ đơn thuần là nhà cung cấp nguyên liệu'}
          </Text>
          <Text
            color={HC.textSecondary}
            fontSize={{ base: '13.5px', md: '15px', lg: '16px' }}
            lineHeight={1.6}
            fontWeight={500}
            mb="28px"
          >
            {'Hỗ trợ từ lựa chọn sản phẩm, xây dựng công thức đến tối ưu chi phí và vận hành.'}
          </Text>

          <Box>
            {FAQS.map((f, idx) => {
              const isExpanded = activeIndex === idx;
              return (
                <Box key={f.q} borderBottom={`1px solid ${HC.border}`}>
                  <Flex
                    as="button"
                    w="100%"
                    px="4px"
                    py="22px"
                    align="center"
                    onClick={() => setActiveIndex(isExpanded ? -1 : idx)}
                    _hover={{
                      bg: 'transparent',
                      '& .faq-title': { color: HC.primary },
                      '& .faq-icon': {
                        bg: isExpanded ? HC.primary : 'rgba(0, 183, 204, 0.08)',
                        transform: isExpanded ? 'scale(1.08) rotate(45deg)' : 'scale(1.08)'
                      }
                    }}
                    sx={{ gap: '16px' }}
                  >
                    <Box
                      className="faq-title"
                      flex="1"
                      textAlign="left"
                      fontFamily={FONT_DISPLAY}
                      fontWeight={700}
                      fontSize="16.5px"
                      color={HC.primaryDark}
                      transition="color 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      {f.q}
                    </Box>
                    <Flex
                      className="faq-icon"
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
                      transition="all .2s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      +
                    </Flex>
                  </Flex>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <MotionBox
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        overflow="hidden"
                      >
                        <Box px="4px" pb="22px" pt="0">
                          <Text color={HC.textSecondary} fontSize="15px" lineHeight="1.7">
                            {f.a}
                          </Text>
                        </Box>
                      </MotionBox>
                    )}
                  </AnimatePresence>
                </Box>
              );
            })}
          </Box>
        </MotionBox>
      </Grid>
    </Box>
  );
};

export default WhyFaq;
