'use client';

import { useState } from 'react';
import { Box, Flex, Text, Collapse } from '@chakra-ui/react';
import { PX_ALL } from '../../../utils/const';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const FAQS = [
    {
      q: 'Diệp Trà phù hợp với nhóm khách hàng nào?',
      a: 'Diệp Trà phục vụ chủ quán đồ uống, chuỗi F&B, đại lý, nhà phân phối và các đơn vị cần nguồn nguyên liệu pha chế ổn định.'
    },
    {
      q: 'Diệp Trà có hỗ trợ công thức và ứng dụng sản phẩm không?',
      a: 'Có. Ngoài cung cấp nguyên liệu, Diệp Trà định hướng hỗ trợ khách hàng lựa chọn sản phẩm, gợi ý menu và ứng dụng nguyên liệu vào vận hành thực tế.'
    },
    {
      q: 'Diệp Trà có những nhóm sản phẩm chính nào?',
      a: 'Các nhóm chính gồm trà pha chế, mứt pha chế, siro, topping, bột pha chế và các dòng sản phẩm thương hiệu LerMao, Trà Phượng Hoàng.'
    },
    {
      q: 'Vì sao nên chọn Diệp Trà thay vì chỉ tìm nhà cung cấp giá rẻ?',
      a: 'Vì một menu bền vững không chỉ cần giá tốt, mà còn cần chất lượng ổn định, nguồn hàng đều, công thức ứng dụng rõ và hỗ trợ sau bán.'
    }
  ];

  return (
    <Box
      as="section"
      py={{ base: '32px', lg: '70px' }}
      px={PX_ALL}
      bgGradient="linear(to-b, #ffffff 0%, #f1fbff 100%)"
      overflow="hidden"
    >
      <GridContainer>
        <Grid
          maxW="1180px"
          w="full"
          mx="auto"
          templateColumns={{ base: '1fr', lg: '0.85fr 1.15fr' }}
          gap="48px"
          alignItems="start"
        >
          {/* Header */}
          <Flex direction="column" justify="start">
            {/* Eyebrow Tag */}
            <Box
              alignSelf="flex-start"
              px="12px"
              py="4px"
              borderRadius="full"
              border="1px solid"
              borderColor="rgba(11, 126, 174, 0.2)"
              bg="rgba(11, 126, 174, 0.05)"
              color="#0b7eae"
              fontSize="10px"
              fontWeight={800}
              letterSpacing="0.2em"
              textTransform="uppercase"
              mb="16px"
            >
              Tại sao nên chọn Diệp Trà?
            </Box>
            <Text
              as="h2"
              color="#005a9f"
              fontSize={{ base: '22px', md: '32px', lg: '38px' }}
              fontWeight={900}
              lineHeight={1.2}
              letterSpacing="-0.035em"
              mb="18px"
            >
              Những câu hỏi giúp khách hàng hiểu rõ hơn về Diệp Trà
            </Text>
            <Text color="#4d6878" fontSize="15px" lineHeight={1.7} textAlign="justify" display={{ base: 'none', md: 'block' }}>
              Các câu hỏi bên cạnh giúp khách hàng mới hiểu rõ vai trò của Diệp Trà trong hệ sinh thái nguyên liệu pha chế. Nội dung được trình bày ngắn gọn, tập trung vào nhóm sản phẩm, cách hỗ trợ và lý do nên chọn nhà cung cấp đồng hành dài hạn.
            </Text>
          </Flex>

          {/* Accordion List - Manual Control */}
          <Flex direction="column" gap="14px" w="full">
            {FAQS.map((faq, idx) => {
              const isExpanded = activeIndex === idx;
              return (
                <Box
                  key={idx}
                  p="6px"
                  bg="rgba(0, 90, 159, 0.02)"
                  borderRadius="24px"
                  border="1px solid"
                  borderColor="rgba(0, 90, 159, 0.06)"
                  boxShadow="0 12px 30px rgba(15, 44, 61, 0.04)"
                  transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
                  _hover={{ transform: 'translateY(-3px)' }}
                >
                  <Box
                    bg={isExpanded ? 'linear-gradient(135deg, #ffffff 0%, #f1fbff 100%)' : '#ffffff'}
                    borderRadius="18px"
                    overflow="hidden"
                    boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
                    transition="background 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
                  >
                    <Flex
                      as="button"
                      w="full"
                      p="18px 22px"
                      justifyContent="space-between"
                      alignItems="center"
                      onClick={() => setActiveIndex(isExpanded ? null : idx)}
                      _hover={{ bg: 'transparent' }}
                      _focus={{ outline: 'none' }}
                      background="transparent"
                      border="none"
                      cursor="pointer"
                    >
                      <Text
                        as="span"
                        flex="1"
                        textAlign="left"
                        color="#005a9f"
                        fontWeight={800}
                        fontSize="16.5px"
                      >
                        {faq.q}
                      </Text>
                      <Flex
                        align="center"
                        justify="center"
                        w="28px"
                        h="28px"
                        borderRadius="full"
                        bg={isExpanded ? '#fff8e8' : '#f1fbff'}
                        color={isExpanded ? '#d79609' : '#0b7eae'}
                        fontSize="18px"
                        fontWeight={900}
                        transform={isExpanded ? 'rotate(180deg)' : 'none'}
                        transition="all 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
                        lineHeight={1}
                        flexShrink={0}
                      >
                        {isExpanded ? '–' : '+'}
                      </Flex>
                    </Flex>
                    <Collapse in={isExpanded} animateOpacity>
                      <Box p="0 22px 20px" color="#4d6878" fontSize="14.5px" lineHeight={1.68}>
                        {faq.a}
                      </Box>
                    </Collapse>
                  </Box>
                </Box>
              );
            })}
          </Flex>
        </Grid>
      </GridContainer>
    </Box>
  );
};

// Help helper for Grid layout
import { Grid } from '@chakra-ui/react';
const GridContainer = ({ children }) => <Box w="full">{children}</Box>;

export default Faq;
