import { IMG_ALT, PX_ALL } from '../../../../utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { EB_Garamond } from 'next/font/google';
import Link from 'next/link';
import ButtonContactIntro from './button-contact-intro';

const fontGaramond = EB_Garamond({ subsets: ['latin', 'vietnamese'] });

const HomeIntro = () => {
  return (
    <Flex
      px={PX_ALL}
      gap={{ xs: '36px', lg: '80px' }}
      align="center"
      pt={{ xs: '50px', lg: '300px' }}
      pb={{ xs: '40px', lg: '350px' }}
      pos="relative"
      justify="space-between"
      bgGradient="linear(to-b, #a3dcf3 0%, #FFF 50%, #FFF 100%)"
    >
      <Flex flex={1 / 2} direction="column" pos="relative" zIndex={10} pl={{ xs: '10px', lg: 0 }}>
        <Text
          as="h1"
          className={fontGaramond.className}
          fontWeight={500}
          lineHeight={{ xs: '33px', lg: '60px', xl: '100px' }}
          fontSize={{ xs: 28, lg: 30, lg: 60, xl: 84 }}
          color="#20516A"
        >
          Giải Pháp Pha Chế Toàn Diện Số 1 Việt Nam
        </Text>

        <Text display={{ xs: 'none', lg: 'block' }} mt="24px" fontSize={18} lineHeight="22px" textAlign="justify">
          Trà Việt Nam, với hương vị đặc trưng và phong phú, là một phần quan trọng trong văn hóa ẩm thực của đất nước.
          Nổi bật nhất là trà xanh, trà ô long và trà đen, mỗi loại đều mang đến những trải nghiệm khác nhau.
        </Text>

        <Flex
          direction={{ xs: 'column', lg: 'row' }}
          justify={{ xs: 'center', lg: 'flex-start' }}
          mt="24px"
          gap={{ xs: '12px', lg: '24px' }}
          align="center"
        >
          <ButtonContactIntro />

          <Link href="/san-pham">
            <Flex
              align="center"
              justify="center"
              bgColor="transparent"
              border="1px solid"
              borderColor="#065FD4"
              color="#065FD4"
              w={{ xs: '170px', lg: '242px' }}
              h={{ xs: '36px', lg: '56px' }}
              gap="4px"
              fontSize={{ xs: 16, lg: 18 }}
              borderRadius={8}
              fontWeight={500}
              transitionDuration="250ms"
              _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
            >
              Trải nghiệm sản phẩm
            </Flex>
          </Link>
        </Flex>
      </Flex>

      <Flex flex={1 / 2} justify="flex-end" pos="relative" zIndex={10}>
        <Flex
          direction="column"
          pos="relative"
          mt={{ xs: '32px', lg: 0 }}
          w={{ xs: '200px', lg: '400px', '2xl': '450px' }}
          h={{ xs: '200px', lg: '400px', '2xl': '450px' }}
        >
          <Image
            src="/images/tra-phuong-hoang.webp"
            alt={IMG_ALT}
            w="auto"
            h={{ xs: '170px', lg: '500px' }}
            borderRadius="full"
            pos="absolute"
            top={0}
            left={0}
            fit="cover"
            zIndex={5}
          />

          <Image
            src="/images/leaf-home-1.webp"
            alt={IMG_ALT}
            w={{ xs: '50px', lg: '130px' }}
            h="auto"
            fit="cover"
            pos="absolute"
            top={{ xs: '0%', md: '0%' }}
            left={{ xs: '1%', lg: '-10%' }}
            zIndex={1}
          />

          <Image
            src="/images/leaf-home-2.webp"
            alt={IMG_ALT}
            w={{ xs: '35px', lg: '85px' }}
            h="auto"
            fit="cover"
            pos="absolute"
            top={{ xs: '40%', md: '60%' }}
            left={{ xs: '1%', lg: '-2%' }}
            zIndex={1}
          />

          <Image
            src="/images/leaf-home-3.webp"
            alt={IMG_ALT}
            w={{ xs: '30px', lg: '100px' }}
            h="auto"
            fit="cover"
            pos="absolute"
            top={{ xs: '18%', md: '20%' }}
            left={{ xs: '64%', lg: '85%' }}
            zIndex={1}
          />
        </Flex>
      </Flex>

      <Image
        src="/images/bg-intro-home.webp"
        alt={IMG_ALT}
        w="full"
        h="auto"
        fit="cover"
        pos="absolute"
        bottom={0}
        left={0}
      />

      <Flex display={{ xs: 'none', lg: 'flex' }} align="center" pos="absolute" bottom="45px" right="40px" gap="12px">
        <Box w="100px" h="1px" bgColor="#1F445A" />
        <Text color="#1F445A" fontSize={16} fontWeight={500}>
          Thành lập từ 2018
        </Text>
      </Flex>

      <Flex
        display={{ xs: 'none', lg: 'flex' }}
        direction="column"
        justify="center"
        align="center"
        gap="12px"
        bottom="40px"
        left="40px"
        pos="absolute"
      >
        <Text
          color="#1F445A"
          fontSize={16}
          fontWeight={500}
          sx={{
            writingMode: 'vertical-lr'
            // textOrientation: 'dowright'
          }}
          transform="rotate(180deg)"
        >
          Công ty TNHH Xuất nhập khẩu HI SWEETIE Việt Nam
        </Text>
        <Box h="100px" w="1px" bgColor="#1F445A" />
        <Link href="/" target="_blank">
          <Image
            src="/images/facebook-black.webp"
            alt={IMG_ALT}
            w="24px"
            h="24px"
            fit="cover"
            transitionDuration="250ms"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Link>
        <Link href="/" target="_blank">
          <Image
            src="/images/messenger-black.webp"
            alt={IMG_ALT}
            w="24px"
            h="24px"
            fit="cover"
            transitionDuration="250ms"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Link>
        <Link href="/" target="_blank">
          <Image
            src="/images/zalo-black.webp"
            alt={IMG_ALT}
            w="24px"
            h="24px"
            fit="cover"
            transitionDuration="250ms"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Link>
      </Flex>
    </Flex>
  );
};

export default HomeIntro;
