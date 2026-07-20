'use client';

import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { PX_ALL } from '../../../utils/const';

const Strength = () => {
  const STRENGTH_LIST = [
    {
      title: 'Nguồn hàng chọn lọc',
      description: 'Ưu tiên sản phẩm có nguồn gốc rõ ràng, chất lượng ổn định và phù hợp khẩu vị thị trường Việt Nam.'
    },
    {
      title: 'Ứng dụng thực tế cho menu',
      description: 'Không chỉ bán nguyên liệu, Diệp Trà hỗ trợ khách hàng hiểu cách ứng dụng sản phẩm vào đồ uống.'
    },
    {
      title: 'Tối ưu chi phí vận hành',
      description: 'Danh mục sản phẩm được lựa chọn theo hướng dễ dùng, dễ đào tạo nhân sự và kiểm soát cost.'
    },
    {
      title: 'Cập nhật xu hướng F&B',
      description: 'Liên tục theo dõi xu hướng trà, mứt, topping và đồ uống mới để gợi ý giải pháp phù hợp.'
    }
  ];

  return (
    <Box
      as="section"
      py={{ base: '56px', lg: '70px' }}
      px={PX_ALL}
      bgGradient="linear(to-b, #f1fbff 0%, #ffffff 100%)"
      overflow="hidden"
    >
      <Grid
        maxW="1180px"
        w="full"
        mx="auto"
        templateAreas={{
          base: `
            "media"
            "content"
            "list"
          `,
          lg: `
            "media content"
            "list list"
          `
        }}
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        columnGap="34px"
        rowGap="24px"
        alignItems="stretch"
      >
        {/* Media (16:9 image frame) - Double-Bezel */}
        <GridItem gridArea="media" w="full" h="full">
          <Box
            p="8px"
            bg="rgba(0, 90, 159, 0.02)"
            borderRadius="32px"
            border="1px solid"
            borderColor="rgba(0, 90, 159, 0.06)"
            boxShadow="0 14px 34px rgba(15, 44, 61, 0.07)"
            w="full"
            h="full"
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
              boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
              overflow="hidden"
              w="full"
              h="full"
            >
              <Box borderRadius="18px" overflow="hidden" position="relative" w="full" h="full" bg="#0c9bdf">
                {/* Ambient Blurred Background copy of the same image */}
                <Image
                  src="/images/about-v2/nang-luc-van-hanh-va-dong-hanh-cua-diep-tra.webp"
                  alt=""
                  role="presentation"
                  width={992}
                  height={600}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'blur(16px) brightness(0.85)',
                    opacity: 0.55,
                    transform: 'scale(1.15)',
                    pointerEvents: 'none'
                  }}
                />
                {/* Main sharp image with contain aspect ratio */}
                <Image
                  src="/images/about-v2/nang-luc-van-hanh-va-dong-hanh-cua-diep-tra.webp"
                  alt="Năng lực vận hành và đồng hành của Diệp Trà"
                  width={992}
                  height={600}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    transition: 'transform 0.8s cubic-bezier(0.32, 0.72, 0, 1)'
                  }}
                />
              </Box>
            </Box>
          </Box>
        </GridItem>

        {/* Content Section */}
        <GridItem gridArea="content" w="full">
          <Flex direction="column" justify="center">
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
              Năng lực của Diệp Trà
            </Box>
            <Text
              as="h2"
              color="#005a9f"
              fontSize={{ base: '18px', md: '26px', lg: '30px' }}
              fontWeight={900}
              lineHeight={1.12}
              letterSpacing="-0.035em"
              mb="18px"
            >
              Tập trung vào điều chủ quán cần:
              <br />
              Nguyên liệu ổn định, dễ ứng dụng
            </Text>
            <Flex
              direction="column"
              gap="14px"
              color="#4d6878"
              fontSize="14px"
              lineHeight={1.72}
              fontWeight={500}
              textAlign="justify"
              display={{ base: 'none', md: 'flex' }}
            >
              <Text>
                Diệp Trà không chỉ cung cấp sản phẩm, mà còn xây dựng hệ hỗ trợ giúp chủ quán chọn đúng nguồn nguyên liệu, ứng dụng công thức thực tế, kiểm soát chi phí và phát triển menu phù hợp từng mô hình vận hành.
              </Text>
              <Text>
                Với kinh nghiệm làm việc cùng quán nhỏ, đại lý và chuỗi F&B, chúng tôi hiểu rằng một nguyên liệu tốt cần đi kèm cách dùng rõ ràng, nguồn hàng ổn định và khả năng triển khai nhanh tại quầy.
              </Text>
              <Text>
                Vì vậy, mỗi nhóm sản phẩm đều được định hướng theo tính ứng dụng: dễ test món, dễ đào tạo nhân sự, dễ tính cost và dễ điều chỉnh theo khẩu vị thị trường. Diệp Trà cũng liên tục cập nhật xu hướng trà, mứt, topping, bột vị và mô hình đồ uống mới để gợi ý giải pháp phù hợp hơn cho khách hàng. Mục tiêu là giúp chủ quán không chỉ mua đúng sản phẩm, mà còn tự tin xây dựng menu có dấu ấn riêng, vận hành bền vững và cạnh tranh hiệu quả.
              </Text>
            </Flex>
          </Flex>
        </GridItem>

        {/* List Section - Double-Bezel Item Cards */}
        <GridItem gridArea="list" w="full" mt="12px">
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap="18px 34px"
            w="full"
          >
            {STRENGTH_LIST.map((item, idx) => (
              <Box
                key={idx}
                p="8px"
                bg="rgba(0, 90, 159, 0.02)"
                borderRadius="28px"
                border="1px solid"
                borderColor="rgba(0, 90, 159, 0.06)"
                boxShadow="0 18px 45px rgba(22, 45, 60, 0.08)"
                transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
                _hover={{
                  transform: 'translateY(-4px)',
                  '& .strength-chk': {
                    transform: 'scale(1.08) rotate(-4deg)',
                    bg: '#fff8e8',
                    color: '#d79609'
                  }
                }}
              >
                <Flex
                  p="20px 24px"
                  borderRadius="20px"
                  bg="#ffffff"
                  boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
                  gap="16px"
                  align="start"
                  h="full"
                >
                  <Flex
                    className="strength-chk"
                    align="center"
                    justify="center"
                    w="34px"
                    h="34px"
                    borderRadius="full"
                    bg="#fff8e8"
                    color="#d79609"
                    fontSize="16px"
                    fontWeight={950}
                    lineHeight={1}
                    flexShrink={0}
                    transition="all 0.4s cubic-bezier(0.32, 0.72, 0, 1)"
                  >
                    ✓
                  </Flex>
                  <Box>
                    <Text
                      as="p"
                      color="#005a9f"
                      fontSize="17.5px"
                      fontWeight={800}
                      lineHeight={1.28}
                      mb="6px"
                    >
                      {item.title}
                    </Text>
                    <Text color="#4d6878" fontSize="13.5px" lineHeight={1.58}>
                      {item.description}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Strength;
