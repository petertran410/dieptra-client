'use client';

import { Box, Flex, Grid, GridItem, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { PX_ALL } from '../../../utils/const';

const Culture = () => {
  const CORE_VALUES = [
    {
      title: 'Tập trung vào trải nghiệm khách hàng',
      desc: 'Ưu tiên giải pháp phù hợp với nhu cầu vận hành thực tế của từng mô hình quán.'
    },
    {
      title: 'Hợp tác cùng phát triển',
      desc: 'Xây dựng mối quan hệ dài hạn với khách hàng, đại lý và đối tác trong hệ sinh thái F&B.'
    },
    {
      title: 'Học hỏi, sáng tạo và đổi mới',
      desc: 'Không ngừng cập nhật xu hướng, công thức và cách ứng dụng sản phẩm vào menu.'
    },
    {
      title: (
        <>
          Đoàn kết và tôn trọng{' '}
          <Box as="br" display={{ base: 'none', md: 'block' }} />
          con người
        </>
      ),
      desc: 'Tạo nền tảng hợp tác tích cực giữa đội ngũ nội bộ, khách hàng và đối tác đồng hành.'
    },
    {
      title: (
        <>
          Kỷ luật, trách nhiệm và{' '}
          <Box as="br" display={{ base: 'none', md: 'block' }} />
          cam kết
        </>
      ),
      desc: 'Theo đuổi sự chỉn chu trong sản phẩm, dịch vụ và trách nhiệm trong từng lần đồng hành.'
    },
    {
      title: 'Minh bạch trong nguồn hàng',
      desc: 'Rõ ràng về sản phẩm, nguồn gốc và cách ứng dụng để khách hàng dễ kiểm soát chất lượng.'
    }
  ];

  return (
    <Box
      as="section"
      py={{ base: '16px', lg: '70px' }}
      px={PX_ALL}
      bgGradient="linear(to-b, #ffffff 0%, #f7fafc 100%)"
      overflow="hidden"
    >
      <Box maxW="1180px" w="full" mx="auto">
        {/* Culture Top Grid */}
        <Grid
          templateColumns={{ base: '1fr', lg: '0.86fr 1.14fr' }}
          gap="20px"
          alignItems="stretch"
          mb="24px"
        >
          {/* Culture Copy (Left Side) - Double-Bezel */}
          <GridItem display="flex" flexDirection="column">
            <Box
              p="8px"
              bg="rgba(0, 90, 159, 0.02)"
              borderRadius="32px"
              border="1px solid"
              borderColor="rgba(0, 90, 159, 0.06)"
              boxShadow="0 18px 45px rgba(22, 45, 60, 0.08)"
              flex="1"
              display="flex"
              flexDirection="column"
              transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
              _hover={{ transform: 'translateY(-4px)' }}
            >
              <Flex
                direction="column"
                justify="space-between"
                p={{ base: '24px 24px', lg: '32px 34px' }}
                borderRadius="24px"
                bg="#ffffff"
                boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
                flex="1"
                gap="24px"
              >
                <Flex direction="column" gap="12px">
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
                  >
                    Văn hóa Diệp Trà
                  </Box>
                  <Text
                    as="h2"
                    color="#005a9f"
                    fontSize="21.5px"
                    fontWeight={800}
                    lineHeight={1.3}
                    letterSpacing="-0.02em"
                  >
                    Chỉn chu trong sản phẩm
                    <br />
                    Trách nhiệm trong đồng hành
                  </Text>
                  <Text color="#4d6878" fontSize="15.5px" lineHeight={1.6}>
                    Diệp Trà xây dựng văn hóa vận hành dựa trên <span style={{ whiteSpace: 'nowrap' }}>chất lượng</span>, minh bạch và sự đồng hành thực tế với <span style={{ whiteSpace: 'nowrap' }}>khách hàng F&B</span>.
                  </Text>

                  {/* Proof List */}
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)', lg: '1fr' }} gap="9px" mt="8px">
                    {['Chất lượng ổn định', 'Nguồn hàng minh bạch', 'Đồng hành thực tế'].map((proof, idx) => (
                      <Flex
                        key={idx}
                        align="center"
                        gap="8px"
                        minH="48px"
                        p="10px 14px"
                        borderRadius="16px"
                        border="1px solid"
                        borderColor="rgba(201, 220, 229, 0.6)"
                        bg="rgba(255, 255, 255, 0.74)"
                        color="#005a9f"
                        fontSize="14.8px"
                        fontWeight={850}
                        lineHeight={1.28}
                        boxShadow="0 10px 22px rgba(15, 44, 61, 0.02)"
                      >
                        <Flex
                          align="center"
                          justify="center"
                          w="22px"
                          h="22px"
                          borderRadius="full"
                          bg="#fff8e8"
                          color="#d79609"
                          fontSize="13px"
                          fontWeight={900}
                          flexShrink={0}
                        >
                          ✓
                        </Flex>
                        <Text fontSize="14.8px">{proof}</Text>
                      </Flex>
                    ))}
                  </Grid>
                </Flex>

                <Text
                  className="dt-culture-note"
                  borderTop="3px solid"
                  borderColor="rgba(217, 154, 0, 0.9)"
                  pt="14px"
                  color="#2c4656"
                  fontSize="13.5px"
                  lineHeight={1.6}
                  fontWeight={700}
                  mt="8px"
                >
                  Mỗi sản phẩm không chỉ phục vụ một ly đồ uống ngon, mà còn hỗ trợ quán tối ưu menu, đào tạo nhân sự và vận hành bền vững hơn.
                </Text>
              </Flex>
            </Box>
          </GridItem>

          {/* Vision & Mission Cards (Right Side) - Double-Bezel */}
          <GridItem display="flex" flexDirection="column">
            <Flex direction="column" gap="16px" flex="1" justify="space-between">
              {/* Vision Card */}
              <Box
                p="8px"
                bg="rgba(0, 90, 159, 0.02)"
                borderRadius="28px"
                border="1px solid"
                borderColor="rgba(0, 90, 159, 0.06)"
                boxShadow="0 18px 45px rgba(22, 45, 60, 0.08)"
                transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
                _hover={{
                  transform: 'translateY(-4px)',
                  '& .culture-chk': {
                    transform: 'scale(1.08) rotate(-4deg)',
                    bg: '#fff8e8',
                    color: '#d79609'
                  }
                }}
              >
                <Flex
                  direction="column"
                  p={{ base: '18px 16px', md: '21px 24px' }}
                  borderRadius="20px"
                  bg="#ffffff"
                  boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
                >
                  <Flex align="center" gap="10px" mb="8px">
                    <Flex
                      className="culture-chk"
                      align="center"
                      justify="center"
                      w="28px"
                      h="28px"
                      borderRadius="full"
                      bg="#f1fbff"
                      color="#0b7eae"
                      fontSize="15px"
                      fontWeight={900}
                      flexShrink={0}
                      transition="all 0.4s cubic-bezier(0.32, 0.72, 0, 1)"
                    >
                      ✓
                    </Flex>
                    <Text as="p" color="#005a9f" fontSize="21.5px" fontWeight={800}>
                      Tầm nhìn
                    </Text>
                  </Flex>
                  <Flex direction="column" gap="10px" color="#4d6878" fontSize="15.8px" lineHeight={1.68}>
                    <Text fontSize="15.8px" textAlign="justify">
                      Đến năm 2030, Diệp Trà đặt mục tiêu trở thành một trong 10 nhà nhập khẩu và phân phối nguyên liệu pha chế toàn diện hàng đầu tại Việt Nam, nổi bật về chất lượng sản phẩm, uy tín thương hiệu và năng lực phục vụ khách hàng.
                    </Text>
                    <Text fontSize="15.8px" textAlign="justify">
                      Diệp Trà hướng tới hệ sinh thái nguyên liệu chuẩn quốc tế, đa dạng danh mục, nguồn gốc rõ ràng, đáp ứng nhu cầu từ quán khởi nghiệp đến chuỗi thương hiệu lớn.
                    </Text>
                  </Flex>
                </Flex>
              </Box>

              {/* Mission Card */}
              <Box
                p="8px"
                bg="rgba(0, 90, 159, 0.02)"
                borderRadius="28px"
                border="1px solid"
                borderColor="rgba(0, 90, 159, 0.06)"
                boxShadow="0 18px 45px rgba(22, 45, 60, 0.08)"
                transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
                _hover={{
                  transform: 'translateY(-4px)',
                  '& .culture-chk': {
                    transform: 'scale(1.08) rotate(-4deg)',
                    bg: '#fff8e8',
                    color: '#d79609'
                  }
                }}
              >
                <Flex
                  direction="column"
                  p={{ base: '18px 16px', md: '21px 24px' }}
                  borderRadius="20px"
                  bg="#ffffff"
                  boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
                >
                  <Flex align="center" gap="10px" mb="8px">
                    <Flex
                      className="culture-chk"
                      align="center"
                      justify="center"
                      w="28px"
                      h="28px"
                      borderRadius="full"
                      bg="#f1fbff"
                      color="#0b7eae"
                      fontSize="15px"
                      fontWeight={900}
                      flexShrink={0}
                      transition="all 0.4s cubic-bezier(0.32, 0.72, 0, 1)"
                    >
                      ✓
                    </Flex>
                    <Text as="p" color="#005a9f" fontSize="21.5px" fontWeight={800}>
                      Sứ mệnh
                    </Text>
                  </Flex>
                  <Flex direction="column" gap="10px" color="#4d6878" fontSize="15.8px" lineHeight={1.68}>
                    <Text fontSize="15.8px" textAlign="justify">
                      Diệp Trà không ngừng nâng cao tiêu chuẩn chất lượng, lựa chọn sản phẩm có nguồn gốc rõ ràng, hương vị đặc sắc và đảm bảo an toàn thực phẩm; đồng thời kết nối đối tác quốc tế để cập nhật xu hướng đồ uống mới.
                    </Text>
                    <Text fontSize="15.8px" textAlign="justify">
                      Chúng tôi hướng tới vai trò đối tác chiến lược toàn diện cho chủ quán và nhà sáng lập thương hiệu: tư vấn sản phẩm, định hướng menu, hỗ trợ kỹ thuật và hậu mãi để khách hàng tối ưu chi phí, phát triển bền vững.
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </GridItem>
        </Grid>

        {/* Founder note - Double-Bezel */}
        <Box
          p="6px"
          bgGradient="linear(to-r, rgba(11, 126, 174, 0.05), rgba(0, 90, 159, 0.05))"
          borderRadius="22px"
          border="1px solid"
          borderColor="rgba(11, 126, 174, 0.25)"
          mb="26px"
          w="full"
          boxShadow="0 8px 30px rgba(11, 126, 174, 0.06)"
          transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
          _hover={{ transform: 'translateY(-2px)', boxShadow: '0 12px 36px rgba(11, 126, 174, 0.1)' }}
        >
          <Box
            p="16px 24px"
            borderRadius="16px"
            bg="linear-gradient(135deg, #ffffff 0%, #f4fbff 100%)"
            boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
            color="#4d6878"
            fontSize="15.6px"
            lineHeight={1.58}
            textAlign="center"
          >
            Định hướng văn hóa và tiêu chuẩn đồng hành của Diệp Trà được xây dựng dưới sự dẫn dắt của{' '}
            <br />
<<<<<<< HEAD
            <Link href="/tac-gia/le-thi-hoang-anh" passHref legacyBehavior>
              <ChakraLink color="#005a9f" fontWeight={900} _hover={{ color: '#0b7eae' }} borderBottom="2px solid rgba(0, 90, 159, 0.4)" pb="1px">
                Lê Thị Hoàng Anh - Founder Diệp Trà
              </ChakraLink>
            </Link>
=======
            <ChakraLink as={Link} href="/tac-gia/le-thi-hoang-anh" color="#005a9f" fontWeight={900} _hover={{ color: '#0b7eae' }} borderBottom="2px solid rgba(0, 90, 159, 0.4)" pb="1px">
              Lê Thị Hoàng Anh - Founder Diệp Trà
            </ChakraLink>
>>>>>>> main
            .
          </Box>
        </Box>

        {/* Core Values Wrap - Double-Bezel */}
        <Box
          p="8px"
          bg="rgba(0, 90, 159, 0.02)"
          borderRadius="32px"
          border="1px solid"
          borderColor="rgba(0, 90, 159, 0.06)"
          boxShadow="0 18px 45px rgba(22, 45, 60, 0.08)"
          w="full"
          transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
          _hover={{ transform: 'translateY(-4px)' }}
        >
          <Box
            p="28px"
            borderRadius="24px"
            bg="#ffffff"
            boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
            w="full"
          >
            {/* Header */}
            <Flex direction="column" mb="22px">
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
                mb="12px"
              >
                Giá trị cốt lõi
              </Box>
              <Text
                as="p"
                color="#005a9f"
                fontSize={{ base: '22px', md: '28px' }}
                fontWeight={800}
                lineHeight={1.2}
              >
                Nguyên tắc vận hành &amp; đồng hành
              </Text>
            </Flex>

            {/* Grid */}
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)'
              }}
              gap="14px"
              w="full"
            >
              {CORE_VALUES.map((val, idx) => (
                <Box
                  key={idx}
                  p="6px"
                  bg="rgba(0, 90, 159, 0.01)"
                  borderRadius="22px"
                  border="1px solid"
                  borderColor="rgba(0, 90, 159, 0.04)"
                  transition="transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
                  _hover={{
                    transform: 'translateY(-4px)',
                    '& .val-chk': {
                      transform: 'scale(1.08) rotate(-4deg)',
                      bg: '#fff8e8',
                      color: '#d79609'
                    }
                  }}
                >
                  <Flex
                    p="16px"
                    borderRadius="16px"
                    bg="#ffffff"
                    boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.9)"
                    gap="12px"
                    align="start"
                    h="full"
                  >
                    <Flex
                      className="val-chk"
                      align="center"
                      justify="center"
                      w="28px"
                      h="28px"
                      borderRadius="full"
                      bg="#f1fbff"
                      color="#0b7eae"
                      fontSize="15px"
                      fontWeight={900}
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
                        lineHeight={1.35}
                        mb="6px"
                        minH={{ base: 'auto', md: '48px' }}
                      >
                        {val.title}
                      </Text>
                      <Text color="#4d6878" fontSize="15px" lineHeight={1.6} display={{ base: 'none', md: 'block' }}>
                        {val.desc}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Culture;
