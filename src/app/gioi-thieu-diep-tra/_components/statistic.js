'use client';

import { Box, Grid, Text } from '@chakra-ui/react';
import { PX_ALL } from '../../../utils/const';

const Statistic = () => {
  const STATS = [
    {
      value: '60+',
      label: 'Tỉnh thành phủ sóng',
      desc: (
        <>
          Giao nhận toàn quốc, hỗ trợ đại lý
          <br />
          và chủ quán F&B.
        </>
      )
    },
    {
      value: '30.000+',
      label: 'Đối tác đồng hành',
      desc: (
        <>
          Quán, chuỗi F&B, đại lý và
          <br />
          nhà phân phối nguyên liệu.
        </>
      )
    },
    {
      value: '500+',
      label: 'Danh mục đa dạng',
      desc: (
        <>
          Từ trà, mứt, siro, bột pha chế
          <br />
          đến topping.
        </>
      )
    },
    {
      value: '2018',
      label: 'Hành trình bắt đầu',
      desc: (
        <>
          Tập trung phát triển nguyên liệu
          <br />
          pha chế cho thị trường Việt Nam.
        </>
      )
    }
  ];

  return (
    <Box as="section" position="relative" zIndex={4} mt="-52px" px={PX_ALL} w="full">
      <Box
        maxW="1300px"
        w="full"
        mx="auto"
        p="8px"
        bg="rgba(0, 90, 159, 0.02)"
        borderRadius="32px"
        border="1px solid"
        borderColor="rgba(0, 90, 159, 0.06)"
        boxShadow="0 18px 45px rgba(22, 45, 60, 0.08)"
        transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
        _hover={{ transform: 'translateY(-4px)' }}
      >
        <Grid
          w="full"
          templateColumns={{
            base: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)'
          }}
          bg="#fff"
          borderRadius="24px"
          overflow="hidden"
          boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
        >
          {STATS.map((stat, idx) => (
            <Box
              key={idx}
              p={{ base: '24px 14px', lg: '34px 24px' }}
              textAlign="center"
              borderRight={{
                base: idx % 2 === 0 ? '1px solid rgba(215, 226, 232, 0.6)' : 'none',
                lg: idx === STATS.length - 1 ? 'none' : '1px solid rgba(215, 226, 232, 0.6)'
              }}
              borderBottom={{
                base: idx < 2 ? '1px solid rgba(215, 226, 232, 0.6)' : 'none',
                lg: 'none'
              }}
              transition="background 0.4s ease"
              _hover={{ bg: '#fcfdfe' }}
            >
              <Text
                as="strong"
                display="block"
                color="#d79609"
                fontSize={{ base: '26px', lg: '32px' }}
                fontWeight={900}
                lineHeight={1}
              >
                {stat.value}
              </Text>
              <Text
                as="span"
                display="block"
                color="#005a9f"
                fontSize={{ base: '11px', lg: '13.5px' }}
                fontWeight={850}
                lineHeight={1.35}
                textTransform="uppercase"
                letterSpacing="0.05em"
                mt="14px"
                mb="8px"
              >
                {stat.label}
              </Text>
              <Text color="#4d6878" fontSize={{ base: '12px', lg: '13px' }} lineHeight={1.58}>
                {stat.desc}
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Statistic;
