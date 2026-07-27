'use client';

import { Box, Flex, Grid, GridItem, Text, Link as ChakraLink } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { PX_ALL } from '../../../utils/const';
import Statistic from './statistic';
import StatsInteractive from './stats-interactive';

const AboutUs = () => {
  return (
    <Flex direction="column" w="full" bg="#ffffff" overflow="hidden">
      {/* Hero Section */}
      <Box
        as="section"
        position="relative"
        pt={{ base: '110px', lg: '160px' }}
        pb={{ base: '56px', lg: '100px' }}
        px={PX_ALL}
        bgGradient="linear(to-b, #f7fafc 0%, #ffffff 100%)"
        overflow="hidden"
      >
        {/* Breadcrumb */}
        <Flex
          as="nav"
          aria-label="Breadcrumb"
          maxW="1300px"
          w="full"
          mx="auto"
          mb="28px"
          align="center"
          wrap="wrap"
          gap="8px"
          fontSize="11px"
          fontWeight={800}
          letterSpacing="0.08em"
          textTransform="uppercase"
          color="#8ba2b0"
        >
          <Link href="/" passHref legacyBehavior>
            <ChakraLink color="#0b7eae" _hover={{ color: '#d79609', textDecoration: 'none' }} transition="color 0.4s ease">
              Trang chủ
            </ChakraLink>
          </Link>
          <Text as="span" color="rgba(102, 121, 133, 0.5)">
            ›
          </Text>
          <Text as="span" color="#8ba2b0">
            Giới thiệu Diệp Trà
          </Text>
        </Flex>

        {/* Hero Grid - Editorial Split Layout */}
        <Grid
          maxW="1300px"
          w="full"
          mx="auto"
          templateColumns={{ base: '1fr', lg: '0.9fr 1.1fr' }}
          gap={{ base: '40px', lg: '56px' }}
          alignItems="center"
        >
          {/* Content */}
          <Flex direction="column" justify="center">
            <Text
              as="h1"
              color="#005a9f"
              fontSize={{ base: '24px', md: '38px', lg: '44px', xl: '50px' }}
              fontWeight={900}
              lineHeight={1.08}
              letterSpacing="-0.045em"
              mb="22px"
            >
              <Text
                as="span"
                display="block"
                fontSize={{ base: '15px', md: '22px', lg: '26px', xl: '30px' }}
                color="#0b7eae"
                fontWeight={800}
                letterSpacing="0.05em"
                mb="8px"
              >
                Giới Thiệu Diệp Trà
              </Text>
              Nguyên Liệu Pha Chế
              <br />
              Cho Quán F&B
            </Text>
            <Text
              color="#4d6878"
              fontSize={{ base: '15px', lg: '17px' }}
              lineHeight={1.72}
              mb="32px"
              fontWeight={500}
              textAlign="justify"
            >
              Diệp Trà là thương hiệu thuộc Công ty TNHH XNK Hi Sweetie Việt Nam, tập trung cung cấp trà pha chế,
              mứt trái cây, siro, topping và giải pháp nguyên liệu cho quán trà sữa, trà trái cây, cà phê, đại lý và chuỗi F&B.
            </Text>

            {/* CTA Actions */}
            <Flex direction="column" gap="26px">
              <Flex wrap="wrap" gap="14px">
                <Link href="/san-pham/nguyen-lieu-pha-che" passHref legacyBehavior>
                  <ChakraLink
                    role="group"
                    aria-label="Xem danh sách sản phẩm nguyên liệu pha chế Diệp Trà"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="space-between"
                    minH="54px"
                    pl="28px"
                    pr="8px"
                    borderRadius="full"
                    fontWeight={800}
                    bgGradient="linear(to-r, #0b7eae, #005a9f)"
                    color="white"
                    boxShadow="0 14px 30px rgba(0, 90, 159, 0.18)"
                    transition="all 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
                    _hover={{
                      transform: 'scale(0.98)',
                      boxShadow: '0 18px 38px rgba(0, 90, 159, 0.26)',
                      textDecoration: 'none',
                      color: 'white'
                    }}
                  >
                    <Text as="span" mr="20px" fontSize="14px" color="white">Xem danh sách sản phẩm</Text>
                    <Flex
                      align="center"
                      justify="center"
                      w="38px"
                      h="38px"
                      borderRadius="full"
                      bg="rgba(255, 255, 255, 0.18)"
                      fontSize="16px"
                      transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1), background 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
                      _groupHover={{
                        transform: 'translate(2px, -2px) scale(1.05)',
                        bg: 'rgba(255, 255, 255, 0.28)'
                      }}
                    >
                      ↗
                    </Flex>
                  </ChakraLink>
                </Link>
                <ChakraLink
                  href="https://zalo.me/4415290839928975010"
                  isExternal
                  aria-label="Liên hệ Zalo tư vấn nguyên liệu và công thức pha chế"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  minH="54px"
                  px="28px"
                  borderRadius="full"
                  fontWeight={800}
                  bg="#fff"
                  color="#005a9f"
                  border="1px solid"
                  borderColor="rgba(0, 90, 159, 0.18)"
                  boxShadow="0 10px 22px rgba(22, 45, 60, 0.04)"
                  transition="all 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
                  _hover={{
                    transform: 'scale(0.98)',
                    bg: '#005a9f',
                    color: '#fff',
                    borderColor: '#005a9f',
                    boxShadow: '0 18px 38px rgba(0, 90, 159, 0.22)',
                    textDecoration: 'none'
                  }}
                >
                  Liên hệ tư vấn
                </ChakraLink>
              </Flex>

              {/* Trust Row */}
              <Flex direction="column" gap="10px">
                <Flex gap="10px" wrap="wrap">
                  {['Nhập khẩu & phân phối', 'Hỗ trợ công thức'].map((text, idx) => (
                    <Flex
                      key={idx}
                      align="center"
                      gap="6px"
                      px="13px"
                      py="8px"
                      border="1px solid"
                      borderColor="rgba(215, 226, 232, 0.8)"
                      borderRadius="full"
                      bg="rgba(255, 255, 255, 0.7)"
                      color="#2c4656"
                      fontSize="12.5px"
                      fontWeight={700}
                      boxShadow="0 8px 18px rgba(15, 44, 61, 0.02)"
                    >
                      <Box w="6px" h="6px" borderRadius="full" bg="#159ccf" />
                      <Text fontSize="12.5px">{text}</Text>
                    </Flex>
                  ))}
                </Flex>
                <Flex gap="10px" wrap="wrap">
                  {['Giao hàng toàn quốc', 'Workshop xu hướng'].map((text, idx) => (
                    <Flex
                      key={idx}
                      align="center"
                      gap="6px"
                      px="13px"
                      py="8px"
                      border="1px solid"
                      borderColor="rgba(215, 226, 232, 0.8)"
                      borderRadius="full"
                      bg="rgba(255, 255, 255, 0.7)"
                      color="#2c4656"
                      fontSize="12.5px"
                      fontWeight={700}
                      boxShadow="0 8px 18px rgba(15, 44, 61, 0.02)"
                    >
                      <Box w="6px" h="6px" borderRadius="full" bg="#159ccf" />
                      <Text fontSize="12.5px">{text}</Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex justify={{ base: 'center', lg: 'flex-end' }} w="full">
            <Box
              p="8px"
              bg="rgba(0, 90, 159, 0.03)"
              borderRadius="32px"
              border="1px solid"
              borderColor="rgba(0, 90, 159, 0.07)"
              w="full"
              maxW={{ base: '680px', lg: 'full' }}
              transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
              _hover={{
                transform: 'translateY(-4px)',
                '& img': { transform: 'scale(1.035)' }
              }}
            >
              <Box
                p="6px"
                bg="#ffffff"
                borderRadius="24px"
                boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 16px 36px rgba(15, 44, 61, 0.05)"
                w="full"
              >
                <StatsInteractive />
              </Box>
            </Box>
          </Flex>
        </Grid>
      </Box>

      {/* Statistic Section */}
      <Statistic />

      {/* Manifesto Section */}
      <Box
        as="section"
        py={{ base: '56px', lg: '90px' }}
        px={PX_ALL}
        bgGradient="linear(to-b, #ffffff 0%, #f7fafc 100%)"
        overflow="hidden"
      >
        <Grid
          maxW="1300px"
          w="full"
          mx="auto"
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={{ base: '40px', lg: '64px' }}
          alignItems="stretch"
        >
          {/* Copy */}
          <Flex direction="column" justify="flex-start" gap="20px" pt="10px">
            <Flex direction="column">
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
                mb="18px"
              >
                Về chúng tôi
              </Box>
              <Text
                as="h2"
                color="#005a9f"
                fontSize={{ base: '18px', md: '26px', lg: '30px' }}
                fontWeight={900}
                lineHeight={1.16}
                letterSpacing="-0.035em"
                mb="18px"
              >
                Không chỉ bán nguyên liệu,
                <br />
                Diệp Trà xây dựng hệ sinh thái giúp quán phát triển menu bền vững
              </Text>
              {/* Line indicator */}
              <Box
                w="80px"
                h="3px"
                borderRadius="full"
                bgGradient="linear(to-r, #d79609, #159ccf)"
              />
            </Flex>
            <Text
              color="#4d6878"
              fontSize="16px"
              lineHeight={1.7}
              fontWeight={500}
              textAlign="justify"
            >
              Từ nguồn hàng, công thức, vận hành đến trải nghiệm khách hàng. Diệp Trà đồng hành để mỗi sản phẩm được chọn đúng mục tiêu menu và dễ ứng dụng vào vận hành thực tế.
            </Text>
          </Flex>

          {/* Philosophy Card - Double-Bezel Nested Architecture */}
          <Box
            p="8px"
            bg="rgba(0, 90, 159, 0.02)"
            borderRadius="32px"
            border="1px solid"
            borderColor="rgba(0, 90, 159, 0.06)"
            w="full"
            display="flex"
            flexDirection="column"
            transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
            _hover={{ transform: 'translateY(-4px)' }}
          >
            <Box
              p={{ base: '20px', md: '32px' }}
              bg="#ffffff"
              borderRadius="24px"
              boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 16px 36px rgba(15, 44, 61, 0.04)"
              position="relative"
              overflow="hidden"
              flex="1"
              display="flex"
              flexDirection="column"
            >
              <Flex direction="column" gap="20px" flex="1" justify="space-between">
                <Flex direction="column" gap="12px">
                  <Box
                    alignSelf="flex-start"
                    px="12px"
                    py="5px"
                    borderRadius="full"
                    bg="#fff8e8"
                    color="#d79609"
                    fontSize="12px"
                    fontWeight={850}
                    letterSpacing="0.05em"
                  >
                    Triết lý phát triển
                  </Box>
                  <Text
                    as="strong"
                    color="#005a9f"
                    fontSize={{ base: '20px', md: '26px' }}
                    fontWeight={900}
                    lineHeight={1.25}
                    letterSpacing="-0.025em"
                    whiteSpace={{ base: 'normal', lg: 'nowrap' }}
                  >
                    Menu ổn định bắt đầu từ hệ nguyên liệu đúng
                  </Text>
                </Flex>
                <Flex direction="column" gap="16px" color="#4d6878" fontSize="14.5px" lineHeight="1.68">
                  <Text fontSize="14.5px" textAlign="justify">
                    Từ những ngày đầu, Diệp Trà lựa chọn đi theo hướng tập trung vào chất lượng sản phẩm, khả năng ứng dụng thực tế
                    và sự ổn định trong vận hành. Chúng tôi hiểu rằng mỗi ly đồ uống ngon không chỉ đến từ một nguyên liệu riêng lẻ,
                    mà là sự phối hợp giữa hương vị, công thức, tốc độ phục vụ, cost và trải nghiệm khách hàng.
                  </Text>
                  <Text fontSize="14.5px" textAlign="justify">
                    Vì vậy, Diệp Trà phát triển danh mục nguyên liệu theo hướng toàn diện, giúp chủ quán dễ chọn sản phẩm,
                    dễ đào tạo nhân sự và dễ xây dựng menu có dấu ấn riêng.
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Flex>
  );
};

export default AboutUs;
