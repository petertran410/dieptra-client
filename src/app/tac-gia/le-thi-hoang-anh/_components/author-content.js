'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HomeTheme, { FONT_DISPLAY, HOME_PX } from '../../../(home)/_components/home-theme';

// ── Palette token (Cyan / Deep / Yellow) — redesign layer, không đổi HC contract ──
const T = {
  // Cyan
  c50: '#F1FBFF',
  c100: '#DDF6FF',
  c200: '#B9EDFE',
  c300: '#8FE0FC',
  c500: '#5DD2F9',
  c600: '#35BDEB',
  c700: '#159CCF',
  c800: '#0B7EAE',
  c900: '#005A9F',
  // Deep
  d50: '#EEF3F6',
  d100: '#D7E2E8',
  d300: '#8BA2B0',
  d500: '#4D6878',
  d700: '#2C4656',
  d900: '#162D3C',
  // Yellow (Harvest Gold)
  y50: '#FFF8E8',
  y100: '#FCE9B8',
  y300: '#F2C45B',
  y500: '#D79609',
  y700: '#A96F00',
  y900: '#6F4700'
};

// Semantic map (legacy → new palette)
const C = {
  // Primary ramps
  primary: T.c500,        // HC.primary — LerMao primary
  primaryBright: T.c600,  // HC.primaryBright — active / stronger
  primaryMid: T.c700,     // HC.primaryMid — link hover
  primaryDeep: T.c800,    // HC.primaryDeep — darker UI
  primaryDark: T.c900,    // HC.primaryDark — Baltic deep anchor
  // Surfaces / bg
  cyanSoft: T.d300,       // HC.cyanSoft — secondary muted text on dark
  cyanPale: T.c200,       // HC.cyanPale — light blue block
  cyanBg: T.c100,         // HC.cyanBg — soft card bg
  bgSoft: T.d50,          // HC.bgSoft — light cool background
  sky: T.c50,             // HC.sky — very light page bg
  // Text
  textPrimary: T.d900,    // HC.textPrimary — primary text
  textSecondary: T.d700,  // HC.textSecondary — supporting text
  textMuted: T.d500,      // HC.textMuted — secondary muted
  // Border
  border: T.d100,         // HC.border — divider / soft border
  borderStrong: T.d300,   // HC.borderStrong — strong border
  // Yellow accent (Harvest Gold)
  accent: T.y500,         // HC.accent — main Harvest Gold
  accentBright: T.y300,   // HC.accentBright — decorative accent
  accentDeep: T.y700,     // HC.accentDeep — dark yellow
  accentSoft: T.y100,     // HC.accentSoft — soft yellow block
  // Legacy gold (giữ contract)
  gold: T.y500,
  goldLight: T.y300,
  // Greens (giữ hue gốc để không phá visual brand của "F&B")
  green: '#3FA63A',
  greenDeep: '#2E7D32',
  greenSoft: '#E8F5E4',
  // Shadow chuẩn soft-diffused (haptic depth)
  shadowCard: '0 14px 40px -8px rgba(11,126,174,.18), 0 4px 12px -2px rgba(11,126,174,.08)',
  shadowElevated: '0 28px 64px -12px rgba(11,126,174,.22), 0 8px 24px -4px rgba(11,126,174,.10)',
  shadowCta: '0 24px 56px -10px rgba(93,210,249,.35), 0 6px 16px -2px rgba(11,126,174,.18)'
};

// Custom cubic-bezier cho transitions (fluid dynamics)
const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

const MotionBox = motion(Box);

// Thẻ ngắt dòng chỉ hiển thị trên màn hình Desktop (lg), ẩn trên Mobile (base) để tối ưu hiển thị văn bản tiếng Việt
const DesktopBr = () => <Box as="br" display={{ base: 'none', lg: 'block' }} />;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const SecHead = ({ eyebrow, title, desc, light }) => (
  <MotionBox {...reveal} textAlign="center" maxW={{ base: '720px', lg: '960px' }} mx="auto" mb={{ base: '52px', lg: '80px' }}>
    <Text
      as="span"
      display="inline-block"
      fontFamily={FONT_DISPLAY}
      fontWeight={700}
      fontSize="11px"
      letterSpacing=".22em"
      textTransform="uppercase"
      color={light ? T.c200 : C.primaryDeep}
      mb="18px"
      px="14px"
      py="6px"
      borderRadius="full"
      bg={light ? 'rgba(255,255,255,.08)' : T.c50}
      border="1px solid"
      borderColor={light ? 'rgba(255,255,255,.18)' : C.primary}
    >
      {eyebrow}
    </Text>
    <Text
      as="h2"
      fontFamily={FONT_DISPLAY}
      fontWeight={800}
      fontSize={{ base: '26px', lg: '40px' }}
      mb="20px"
      lineHeight={1.12}
      letterSpacing="-.025em"
      color={light ? '#fff !important' : C.textPrimary}
    >
      {title}
    </Text>
    {desc && (
      <Text
        color={light ? T.c200 : C.textSecondary}
        fontSize={{ base: '16px', lg: '18px' }}
        maxW={{ base: '100%', lg: '860px' }}
        mx="auto"
        lineHeight={1.65}
      >
        {desc}
      </Text>
    )}
  </MotionBox>
);

const Btn = ({ href, children, variant = 'primary' }) => {
  const styles =
    variant === 'primary'
      ? {
        bg: C.primaryDark,
        color: '#fff',
        borderColor: 'transparent',
        boxShadow: C.shadowCta,
        _hover: { bg: C.primaryDeep, transform: 'translateY(-1px)' }
      }
      : {
        bg: 'rgba(255,255,255,.6)',
        color: C.primaryDeep,
        borderColor: C.primary,
        _hover: { bg: C.primary, borderColor: C.primary, color: '#fff' }
      };
  return (
    <Box
      as={Link}
      href={href}
      display="inline-flex"
      alignItems="center"
      gap="10px"
      fontFamily={FONT_DISPLAY}
      fontWeight={700}
      borderRadius="full"
      px="32px"
      py="15px"
      fontSize="15px"
      border="1.5px solid"
      backdropFilter="blur(6px)"
      transition={`all .45s ${EASE}`}
      {...styles}
    >
      {children}
    </Box>
  );
};

const EXPERIENCE = [
  {
    n: '01',
    h: 'Vận hành thương hiệu nguyên liệu',
    p: 'Thiết lập hệ sinh thái sản phẩm, định vị phân khúc và phát triển chiến lược bán hàng nhằm hỗ trợ tối đa cho đại lý cùng khách hàng B2B.'
  },
  {
    n: '02',
    h: 'Tư vấn menu & công thức',
    p: 'Thiết kế menu đa dạng (trà sữa, trà trái cây, đồ uống theo mùa) với các công thức được tinh chỉnh phù hợp với khẩu vị thị trường Việt Nam.'
  },
  {
    n: '03',
    h: 'Nghiên cứu và ứng dụng topping',
    p: 'Phát triển và ứng dụng đa dạng các dòng topping (trân châu, thạch, mochi...) cùng những giải pháp đông lạnh cho ngành pha chế hiện đại.'
  },
  {
    n: '04',
    h: 'Hợp tác quán & chuỗi F&B',
    p: 'Thấu hiểu và giải quyết bài toán thực tế về giá vốn, tốc độ ra món, tính ổn định, đào tạo nhân sự và chiến lược triển khai món mới hiệu quả.'
  },
  {
    n: '05',
    h: 'Phân phối & Hỗ trợ đại lý',
    p: 'Cung cấp giải pháp nguồn hàng đa dạng, dễ bán, dễ ứng dụng cho mạng lưới khách hàng sỉ, đối tác vùng và các mô hình kinh doanh.'
  },
  {
    n: '06',
    h: 'Cập nhật xu hướng đồ uống',
    p: 'Phân tích thị trường trong nước và quốc tế để chắt lọc những ý tưởng đột phá, đưa vào công thức, workshop và tài liệu tư vấn.'
  }
];

const ACHIEVEMENTS = [
  <>
    Đã tư vấn và cung cấp giải pháp nguyên liệu cho hơn <strong>1.000+</strong> khách hàng, quán trà sữa, mô hình đồ
    uống và đối tác F&B.
  </>,
  <>
    Sở hữu và phát triển các thương hiệu/ngành hàng nguyên liệu như{' '}
    <strong>Diệp Trà, Gấu LerMao, Trà Phượng Hoàng.</strong>
  </>,
  <>
    Đã tổ chức hơn <strong>50 workshop</strong>, buổi đào tạo, demo sản phẩm và chương trình chia sẻ công thức cho khách
    hàng ngành đồ uống.
  </>,
  <>
    Xây dựng hệ thống nội dung trên nhiều kênh social: Facebook, TikTok, YouTube, website và tài liệu đào tạo nội bộ.
  </>,
  <>
    Trực tiếp tham gia khảo sát sản phẩm, làm việc với nhà máy, đối tác nguyên liệu và đội ngũ R&D để phát triển giải
    pháp phù hợp thị trường.
  </>
];

const JOURNEY = [
  {
    img: '/images/01_kien_thuc_nguyen_lieu.webp',
    num: '01',
    tag: 'Giai đoạn 1',
    h: 'Xây nền tảng về nguyên liệu pha chế',
    p: 'Tìm hiểu sâu về trà, mứt, topping và các nhóm nguyên liệu cốt lõi trong vận hành quán đồ uống.'
  },
  {
    img: '/images/02_cong_thuc_ung_dung.webp',
    num: '02',
    tag: 'Giai đoạn 2',
    h: 'Phát triển menu, công thức và ứng dụng sản phẩm',
    p: 'Thử nghiệm công thức, đánh giá hương vị, giá vốn và khả năng triển khai thực tế tại quán.'
  },
  {
    img: '/images/03_tu_van_mo_hinh_fb.webp',
    num: '03',
    tag: 'Giai đoạn 3',
    h: 'Tư vấn cho khách hàng, đại lý và mô hình F&B',
    p: 'Đồng hành cùng khách hàng trong lựa chọn nguyên liệu, ra món mới và tối ưu danh mục sản phẩm.'
  },
  {
    img: '/images/04_he_sinh_thai_noi_dung.webp',
    num: '04',
    tag: 'Hiện tại',
    h: 'Xây dựng hệ sinh thái nội\u00a0dung chuyên môn Diệp Trà',
    p: 'Phát triển bài viết, công thức, video hướng dẫn và nội dung tư vấn để chia sẻ kiến thức thực tế cho ngành đồ uống.'
  }
];

const SOCIALS = [
  {
    ico: '♪',
    name: 'TikTok',
    desc: 'Video ngắn về công thức, topping và xu hướng đồ uống',
    href: 'https://www.tiktok.com/@founder.dieptra'
  },
  {
    ico: 'f',
    name: 'Facebook',
    desc: 'Cập nhật sản phẩm, workshop và phản hồi khách hàng',
    href: 'https://facebook.com/dieptra.0788339379'
  },
  {
    ico: '▶',
    name: 'YouTube',
    desc: 'Video hướng dẫn, demo sản phẩm và chia sẻ chuyên môn',
    href: 'https://youtube.com/@Dieptra_Official'
  },
  { ico: '🌐', name: 'Website', desc: 'Bài viết chuyên môn, công thức và thông tin nguyên liệu', href: '/' }
];

const USP = [
  { num: '8+', lbl: 'Năm kinh nghiệm', desc: 'Trong ngành nguyên liệu pha chế và đồ uống' },
  { num: '1.000+', lbl: 'Khách hàng & đối tác', desc: 'Quán trà sữa và đối tác F&B đã tư vấn' },
  { num: '50+', lbl: 'Workshop & đào tạo', desc: 'Buổi chia sẻ chuyên môn pha chế' },
  { num: '3', lbl: 'Thương hiệu trọng tâm', desc: 'Diệp Trà · LerMao · Trà Phượng Hoàng' }
];

const AuthorContent = () => {
  return (
    <HomeTheme>
      {/* HERO */}
      <Box
        as="section"
        position="relative"
        overflow="hidden"
        pt={{ base: '128px', lg: '160px' }}
        pb={{ base: '72px', lg: '96px' }}
        bgGradient={`linear(170deg, ${T.c50} 0%, ${T.c100} 38%, ${T.c50} 72%, ${T.d50} 100%)`}
        sx={{
          maskImage: {
            base: 'linear-gradient(to bottom, black calc(100% - 40px), transparent)',
            lg: 'linear-gradient(to bottom, black calc(100% - 80px), transparent)'
          },
          WebkitMaskImage: {
            base: 'linear-gradient(to bottom, black calc(100% - 40px), transparent)',
            lg: 'linear-gradient(to bottom, black calc(100% - 80px), transparent)'
          }
        }}
      >
        <Box
          pos="absolute"
          top="-200px"
          right="-180px"
          w="600px"
          h="600px"
          borderRadius="50%"
          bg={`radial-gradient(circle, ${T.c300}66, ${T.c300}00 70%)`}
          pointerEvents="none"
          filter="blur(8px)"
        />
        <Box
          pos="absolute"
          bottom="-220px"
          left="-160px"
          w="480px"
          h="480px"
          borderRadius="50%"
          bg={`radial-gradient(circle, ${T.y100}B3, ${T.y100}00 70%)`}
          pointerEvents="none"
          filter="blur(10px)"
        />
        <Box
          pos="absolute"
          top="40%"
          left="50%"
          w="320px"
          h="320px"
          borderRadius="50%"
          bg={`radial-gradient(circle, ${T.c200}55, transparent 70%)`}
          pointerEvents="none"
          transform="translate(-50%, -50%)"
        />

        <Box px={HOME_PX} pos="relative" zIndex={1}>
          <Grid
            templateColumns={{ base: '1fr', lg: 'minmax(0,1.15fr) minmax(360px,440px)' }}
            gap={{ base: '40px', lg: '72px' }}
            alignItems="center"
            maxW="1240px"
            mx="auto"
          >
            <MotionBox {...reveal} minW={0}>
              <Text
                as="span"
                display="inline-flex"
                alignItems="center"
                gap="10px"
                fontFamily={FONT_DISPLAY}
                fontWeight={700}
                fontSize="12px"
                letterSpacing=".22em"
                textTransform="uppercase"
                color={C.primaryDeep}
                mb="22px"
                px="16px"
                py="8px"
                borderRadius="full"
                bg={T.c50}
                border="1px solid"
                borderColor={C.primary}
              >
                <Box w="7px" h="7px" borderRadius="50%" bg={C.primary} boxShadow={`0 0 0 4px ${T.c100}`} />
                Tác giả nội dung chuyên môn tại Diệp Trà
              </Text>
              <Text
                as="h1"
                fontFamily={FONT_DISPLAY}
                fontWeight={900}
                color={C.primaryDark}
                fontSize={{ base: '40px', lg: '72px' }}
                lineHeight={1.02}
                letterSpacing="-.028em"
                mb={{ base: '16px', lg: '22px' }}
              >
                Lê Thị Hoàng Anh
              </Text>
              <Text
                fontFamily={FONT_DISPLAY}
                fontSize={{ base: '18px', lg: '22px' }}
                color={C.primaryDeep}
                fontWeight={700}
                mb={{ base: '24px', lg: '32px' }}
                lineHeight={1.4}
                letterSpacing="-.005em"
              >
                Founder Diệp Trà <br></br> Chuyên gia tư vấn nguyên liệu & menu đồ uống
              </Text>
              <Text fontSize="17px" color={C.textSecondary} maxW="640px" mb="18px" fontWeight={500} lineHeight={1.7} textAlign="justify">
                Với kinh nghiệm thực chiến trong ngành nguyên liệu pha chế, Lê Thị Hoàng Anh đồng hành cùng các quán trà
                sữa, mô hình đồ uống và đối tác F&B trong việc lựa chọn nguyên liệu, xây dựng menu, phát triển công
                thức, nghiên cứu topping và tối ưu giải pháp vận hành cho từng mô hình kinh doanh.
              </Text>
              <Text fontSize="17px" color={C.textSecondary} maxW="640px" mb={{ base: '28px', lg: '32px' }} fontWeight={500} lineHeight={1.7} textAlign="justify">
                Các nội dung chuyên môn trên website Diệp Trà được xây dựng theo hướng dễ hiểu, ứng dụng được ngay và
                bám sát nhu cầu thực tế của chủ quán, đại lý và đội ngũ phát triển sản phẩm trong
                ngành đồ uống.
              </Text>
              <Flex gap="14px" flexWrap="wrap">
                <Btn href="/lien-he">Liên hệ tư vấn nguyên liệu →</Btn>
                <Btn href="/bai-viet" variant="outline">
                  Xem công thức đồ uống
                </Btn>
              </Flex>
            </MotionBox>

            {/* Double-Bezel avatar card */}
            <MotionBox
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.15 }}
              as="aside"
              w="full"
              maxW="440px"
              justifySelf={{ base: 'center', lg: 'end' }}
              p="6px"
              borderRadius="32px"
              bg={T.c100}
              border="1px solid"
              borderColor={T.c200}
              boxShadow={C.shadowElevated}
              display="flex"
              flexDirection="column"
              gap="14px"
            >
              <Box
                borderRadius="26px"
                overflow="hidden"
                bg={T.c50}
                border="1px solid"
                borderColor="#fff"
                sx={{ aspectRatio: '1 / 1', boxShadow: `inset 0 1px 1px rgba(255,255,255,.6)` }}
              >
                <Box
                  as="img"
                  src="/images/home-v2/author-avatar.webp"
                  alt="Ảnh đại diện tác giả Lê Thị Hoàng Anh - Founder Diệp Trà"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  objectPosition="center top"
                />
              </Box>
              <Box
                display="grid"
                gap="4px"
                p="18px"
                bg="#fff"
                borderRadius="20px"
                border="1px solid"
                borderColor={T.c100}
                fontSize="14px"
                lineHeight={1.6}
              >
                <Box>
                  <Text as="strong" color={C.primaryDark} fontFamily={FONT_DISPLAY} fontWeight={700}>
                    Họ tên:
                  </Text>{' '}
                  Lê Thị Hoàng Anh
                </Box>
                <Box>
                  <Text as="strong" color={C.primaryDark} fontFamily={FONT_DISPLAY} fontWeight={700}>
                    Chức danh:
                  </Text>{' '}
                  Founder Diệp Trà / Chuyên gia tư vấn nguyên liệu & menu đồ uống
                </Box>
                <Box>
                  <Text as="strong" color={C.primaryDark} fontFamily={FONT_DISPLAY} fontWeight={700}>
                    Lĩnh vực:
                  </Text>{' '}
                  Nguyên liệu pha chế, trà sữa, topping, mứt trái cây, R&D đồ uống
                </Box>
              </Box>
            </MotionBox>
          </Grid>
        </Box>
      </Box>

      {/* USP STATS */}
      <Box as="section" px={HOME_PX} mt={{ base: '-36px', lg: '-56px' }} position="relative" zIndex={5}>
        <MotionBox
          {...reveal}
          maxW="1320px"
          mx="auto"
          p="8px"
          borderRadius="28px"
          bg={T.c50}
          border="1px solid"
          borderColor={T.c100}
          boxShadow={C.shadowElevated}
        >
          <MotionBox
            display="grid"
            gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap="0"
            bg="#fff"
            border="1px solid"
            borderColor="#fff"
            borderRadius="22px"
            p={{ base: '24px 8px', lg: '36px 16px' }}
            sx={{ boxShadow: `inset 0 1px 1px rgba(255,255,255,.6)` }}
          >
            {USP.map((it, i) => (
              <Box
                key={i}
                textAlign="center"
                px={{ base: '10px', lg: '12px', xl: '20px' }}
                py="12px"
                borderRight={{ lg: i === USP.length - 1 ? 'none' : `1px solid` }}
                borderColor={{ lg: C.border }}
                position="relative"
              >
                <Text
                  fontFamily={FONT_DISPLAY}
                  fontSize={{ base: '32px', lg: '40px' }}
                  fontWeight={900}
                  color={C.accent}
                  lineHeight={1}
                  letterSpacing="-.02em"
                >
                  {it.num}
                </Text>
                <Text
                  fontFamily={FONT_DISPLAY}
                  fontWeight={700}
                  fontSize={{ base: '13.5px', lg: '15px' }}
                  color={C.primaryDark}
                  mt="14px"
                  mb="6px"
                >
                  {it.lbl}
                </Text>
                <Text fontSize="12.5px" color={C.textMuted} lineHeight={1.55}>
                  {it.desc}
                </Text>
              </Box>
            ))}
          </MotionBox>
        </MotionBox>
      </Box>

      {/* EXPERIENCE */}
      <Box as="section" px={HOME_PX} py={{ base: '80px', lg: '128px' }}>
        <Box maxW="1320px" mx="auto">
          <SecHead
            eyebrow="Kinh nghiệm chuyên môn"
            title={
              <>
                Kinh nghiệm đến từ vận hành thật,
                <DesktopBr /> sản phẩm thật và nhu cầu thật của thị trường
              </>
            }
            desc={
              <>
                Những chia sẻ này được đúc kết từ quá trình làm việc thực tế với khách hàng,
                <DesktopBr /> thử nghiệm công thức và phát triển các giải pháp nguyên liệu phù hợp cho từng mô hình quán.
              </>
            }
          />
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={{ base: '20px', lg: '24px' }}>
            {EXPERIENCE.map((c, i) => (
              <MotionBox
                key={c.n}
                {...reveal}
                transition={{ ...reveal.transition, delay: (i % 3) * 0.08 }}
                as="article"
                p="6px"
                bg="#fff"
                border="1px solid"
                borderColor={T.c100}
                borderRadius="24px"
                sx={{
                  transition: `transform .5s ${EASE}, box-shadow .5s ${EASE}, border-color .5s ${EASE}`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: C.shadowCard,
                    borderColor: T.c200
                  }
                }}
              >
                <Box
                  bg="#fff"
                  borderRadius="20px"
                  p={{ base: '26px', lg: '32px 22px' }}
                  sx={{ boxShadow: `inset 0 1px 1px rgba(255,255,255,.5)` }}
                >
                  <Flex
                    w="56px"
                    h="56px"
                    align="center"
                    justify="center"
                    borderRadius="16px"
                    bg={T.y50}
                    color={C.accentDeep}
                    fontFamily={FONT_DISPLAY}
                    fontSize="20px"
                    fontWeight={900}
                    mb="22px"
                    border="1px solid"
                    borderColor={T.y100}
                  >
                    {c.n}
                  </Flex>
                  <Text
                    as="h3"
                    color={`${C.primaryDark} !important`}
                    fontFamily={FONT_DISPLAY}
                    fontWeight={800}
                    fontSize={{ base: '18px', lg: '20px' }}
                    letterSpacing="-.018em"
                    lineHeight={1.3}
                    mb="14px"
                  >
                    {c.h}
                  </Text>
                  <Text color={C.textSecondary} fontSize="14.5px" lineHeight={1.7} textAlign="justify">
                    {c.p}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* ACHIEVEMENT */}
      <Box
        as="section"
        position="relative"
        overflow="hidden"
        color="#fff"
        px={HOME_PX}
        py={{ base: '80px', lg: '128px' }}
        bgGradient={`linear(160deg, ${C.primaryDeep} 0%, ${C.primaryDark} 60%, ${T.d900} 100%)`}
        sx={{
          maskImage: {
            base: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 10px, rgba(0,0,0,0.3) 20px, rgba(0,0,0,0.7) 30px, black 40px, black calc(100% - 40px), rgba(0,0,0,0.7) calc(100% - 30px), rgba(0,0,0,0.3) calc(100% - 20px), rgba(0,0,0,0.08) calc(100% - 10px), transparent 100%)',
            lg: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 20px, rgba(0,0,0,0.3) 40px, rgba(0,0,0,0.7) 60px, black 80px, black calc(100% - 80px), rgba(0,0,0,0.7) calc(100% - 60px), rgba(0,0,0,0.3) calc(100% - 40px), rgba(0,0,0,0.08) calc(100% - 20px), transparent 100%)'
          },
          WebkitMaskImage: {
            base: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 10px, rgba(0,0,0,0.3) 20px, rgba(0,0,0,0.7) 30px, black 40px, black calc(100% - 40px), rgba(0,0,0,0.7) calc(100% - 30px), rgba(0,0,0,0.3) calc(100% - 20px), rgba(0,0,0,0.08) calc(100% - 10px), transparent 100%)',
            lg: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 20px, rgba(0,0,0,0.3) 40px, rgba(0,0,0,0.7) 60px, black 80px, black calc(100% - 80px), rgba(0,0,0,0.7) calc(100% - 60px), rgba(0,0,0,0.3) calc(100% - 40px), rgba(0,0,0,0.08) calc(100% - 20px), transparent 100%)'
          }
        }}
      >
        <Box
          pos="absolute"
          right="-120px"
          top="-140px"
          w="520px"
          h="520px"
          borderRadius="50%"
          bg={`radial-gradient(circle, ${T.y500}33, transparent 70%)`}
          filter="blur(20px)"
        />
        <Box
          pos="absolute"
          left="-160px"
          bottom="-160px"
          w="480px"
          h="480px"
          borderRadius="50%"
          bg={`radial-gradient(circle, ${T.c600}44, transparent 70%)`}
          filter="blur(24px)"
        />
        <Box
          pos="absolute"
          top="20%"
          right="35%"
          w="280px"
          h="280px"
          borderRadius="50%"
          bg={`radial-gradient(circle, ${T.c300}26, transparent 70%)`}
        />
        <Box maxW="1240px" mx="auto" pos="relative" zIndex={2}>
          <SecHead
            light
            eyebrow="Thành tựu nổi bật"
            title={
              <>
                Dấu ấn chuyên môn trong ngành
                <DesktopBr /> nguyên liệu đồ uống
              </>
            }
            desc="Những kết quả thực tế từ quá trình vận hành thương hiệu và đồng hành cùng đối tác F&B."
          />
          <Grid
            templateColumns={{ base: '1fr', lg: 'clamp(340px,32vw,480px) minmax(0,1fr)' }}
            gap="40px"
            alignItems="stretch"
          >
            <MotionBox
              {...reveal}
              pos="relative"
              w={{ base: '100%', lg: 'clamp(340px,32vw,480px)' }}
              sx={{ aspectRatio: '1 / 1' }}
              borderRadius="28px"
              overflow="hidden"
              border="1px solid rgba(255,255,255,.22)"
              boxShadow={`0 30px 64px -12px rgba(0,23,42,.55), 0 0 0 1px rgba(255,255,255,.06)`}
            >
              <Box
                as="img"
                src="/images/author/le-thi-hoang-anh-achievement.webp"
                alt="Thành tựu nổi bật của Lê Thị Hoàng Anh và Diệp Trà"
                w="100%"
                h="100%"
                objectFit="cover"
                objectPosition="center"
              />
              <Box
                pos="absolute"
                inset="0"
                bgGradient={`linear(180deg, transparent 50%, ${T.d900}B3 100%)`}
                pointerEvents="none"
              />
            </MotionBox>
            <MotionBox {...reveal} display="flex" flexDirection="column" gap="14px">
              {ACHIEVEMENTS.map((a, i) => (
                <Flex
                  key={i}
                  flex={1}
                  gap="16px"
                  align="center"
                  p="18px 22px"
                  borderRadius="18px"
                  bg="rgba(255,255,255,.06)"
                  border="1px solid rgba(255,255,255,.14)"
                  backdropFilter="blur(10px)"
                  sx={{
                    transition: `background .5s ${EASE}, border-color .5s ${EASE}, transform .5s ${EASE}`,
                    '&:hover': {
                      bg: 'rgba(255,255,255,.12)',
                      borderColor: 'rgba(255,255,255,.28)',
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <Flex
                    flex="none"
                    w="40px"
                    h="40px"
                    align="center"
                    justify="center"
                    borderRadius="50%"
                    bg={C.accent}
                    color="#fff"
                    fontWeight={900}
                    fontSize="18px"
                    boxShadow={`0 6px 18px ${T.y500}66`}
                  >
                    ✓
                  </Flex>
                  <Text
                    color="#fff"
                    fontSize="15px"
                    lineHeight={1.6}
                    fontWeight={500}
                    sx={{ '& strong': { fontFamily: FONT_DISPLAY, fontWeight: 800, color: '#fff' } }}
                  >
                    {a}
                  </Text>
                </Flex>
              ))}
            </MotionBox>
          </Grid>
        </Box>
      </Box>

      {/* JOURNEY */}
      <Box
        as="section"
        px={HOME_PX}
        py={{ base: '80px', lg: '128px' }}
        bg={C.bgSoft}
        sx={{
          maskImage: {
            base: 'linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)',
            lg: 'linear-gradient(to bottom, transparent, black 80px, black calc(100% - 80px), transparent)'
          },
          WebkitMaskImage: {
            base: 'linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)',
            lg: 'linear-gradient(to bottom, transparent, black 80px, black calc(100% - 80px), transparent)'
          }
        }}
      >
        <Box maxW="1460px" mx="auto">
          <SecHead
            eyebrow="Hành trình chuyên môn"
            title={
              <>
                Từ sản phẩm nguyên liệu
                <DesktopBr /> đến giải pháp vận hành cho quán đồ uống
              </>
            }
            desc={
              <>
                Đây là nơi người đọc có thể hiểu rõ hơn về kinh nghiệm, góc nhìn chuyên môn và nền tảng thực tế
                <DesktopBr /> đứng sau các nội dung tư vấn, công thức, phân tích sản phẩm và định hướng kinh doanh.
              </>
            }
          />
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap="20px">
            {JOURNEY.map((j, i) => (
              <MotionBox
                key={j.num}
                {...reveal}
                transition={{ ...reveal.transition, delay: (i % 4) * 0.08 }}
                as="article"
                overflow="hidden"
                p="6px"
                bg="#fff"
                border="1px solid"
                borderColor={T.d100}
                borderRadius="24px"
                sx={{
                  transition: `transform .5s ${EASE}, box-shadow .5s ${EASE}, border-color .5s ${EASE}`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: C.shadowCard,
                    borderColor: T.c200
                  },
                  '&:hover .j-img': { transform: 'scale(1.06)' }
                }}
              >
                <Box
                  borderRadius="20px"
                  overflow="hidden"
                  sx={{ boxShadow: `inset 0 1px 1px rgba(255,255,255,.5)` }}
                >
                  <Box pos="relative" sx={{ aspectRatio: '1 / 1' }} overflow="hidden" bg={C.cyanBg}>
                    <Box
                      as="img"
                      className="j-img"
                      src={j.img}
                      alt={j.h}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      sx={{ transition: `transform .8s ${EASE}` }}
                    />
                  </Box>
                  <Box p={{ base: '22px 20px 26px', lg: '22px 16px 26px' }}>
                    <Text
                      as="h3"
                      color={`${C.primaryDark} !important`}
                      fontFamily={FONT_DISPLAY}
                      fontWeight={800}
                      fontSize={{ base: '17px', lg: '17px', xl: '18px' }}
                      lineHeight={1.32}
                      mb="12px"
                      letterSpacing="-.012em"
                    >
                      {j.h}
                    </Text>
                    <Text color={C.textSecondary} fontSize="14px" lineHeight={1.65} textAlign="justify">
                      {j.p}
                    </Text>
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* QUOTE */}
      <Box as="section" px={HOME_PX} py={{ base: '80px', lg: '128px' }}>
        <MotionBox
          {...reveal}
          maxW="1080px"
          mx="auto"
          p="8px"
          borderRadius="32px"
          bg={T.c50}
          border="1px solid"
          borderColor={T.c100}
          boxShadow={C.shadowElevated}
        >
          <MotionBox
            bg="#fff"
            borderRadius="26px"
            border="1px solid"
            borderColor="#fff"
            p={{ base: '34px', lg: '56px' }}
            display="grid"
            gridTemplateColumns={{ base: '1fr', md: '80px 1fr' }}
            gap={{ base: '22px', md: '32px' }}
            alignItems="start"
            sx={{ boxShadow: `inset 0 1px 1px rgba(255,255,255,.6)` }}
          >
            <Flex
              w="80px"
              h="80px"
              align="center"
              justify="center"
              borderRadius="22px"
              bg={T.c50}
              color={C.primary}
              fontFamily={FONT_DISPLAY}
              fontSize="56px"
              fontWeight={900}
              lineHeight={1}
              boxShadow={`inset 0 1px 1px rgba(255,255,255,.6), 0 12px 26px ${T.c200}55`}
              border="1px solid"
              borderColor={T.c100}
            >
              “
            </Flex>
            <Box>
              <Text
                as="blockquote"
                fontFamily={FONT_DISPLAY}
                fontSize={{ base: '20px', lg: '30px' }}
                lineHeight={1.32}
                color={C.primaryDark}
                fontWeight={800}
                letterSpacing="-.018em"
                textAlign="justify"
              >
                Một nguyên liệu tốt không chỉ nằm ở hương vị, mà còn phải giúp quán dễ vận hành, dễ đào tạo nhân sự và tạo
                ra món đồ uống có khả năng bán lặp lại.
              </Text>
              <Flex align="center" gap="14px" mt="24px">
                <Box w="32px" h="1.5px" bg={C.accent} borderRadius="full" />
                <Text
                  as="cite"
                  color={C.textMuted}
                  fontStyle="normal"
                  fontWeight={700}
                  fontSize="14.5px"
                  letterSpacing=".04em"
                  textTransform="uppercase"
                  fontFamily={FONT_DISPLAY}
                >
                  Lê Thị Hoàng Anh, Founder Diệp Trà
                </Text>
              </Flex>
            </Box>
          </MotionBox>
        </MotionBox>
      </Box>

      {/* SOCIAL */}
      <Box
        as="section"
        px={HOME_PX}
        py={{ base: '80px', lg: '128px' }}
        bg={C.bgSoft}
        sx={{
          maskImage: {
            base: 'linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)',
            lg: 'linear-gradient(to bottom, transparent, black 80px, black calc(100% - 80px), transparent)'
          },
          WebkitMaskImage: {
            base: 'linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)',
            lg: 'linear-gradient(to bottom, transparent, black 80px, black calc(100% - 80px), transparent)'
          }
        }}
      >
        <Box maxW="1240px" mx="auto">
          <SecHead
            eyebrow="Kênh nội dung & cộng đồng"
            title={
              <>
                Theo dõi thêm các nội dung công thức,
                <DesktopBr /> workshop và cập nhật sản phẩm mới
              </>
            }
            desc={
              <>
                Kết nối với Diệp Trà và LerMao trên các kênh social để
                <DesktopBr /> cập nhật công thức, xu hướng và sản phẩm mới.
              </>
            }
          />
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap="20px">
            {SOCIALS.map((s, i) => (
              <MotionBox
                key={s.name}
                {...reveal}
                transition={{ ...reveal.transition, delay: (i % 4) * 0.08 }}
                as={Link}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                aria-label={`${s.name} Diệp Trà`}
                p="6px"
                borderRadius="24px"
                bg={T.c50}
                border="1px solid"
                borderColor={T.c100}
                display="block"
                sx={{
                  transition: `transform .5s ${EASE}, box-shadow .5s ${EASE}, border-color .5s ${EASE}`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: C.shadowCard,
                    borderColor: T.c200
                  }
                }}
              >
                <Box
                  bg="#fff"
                  borderRadius="20px"
                  p="26px"
                  sx={{ boxShadow: `inset 0 1px 1px rgba(255,255,255,.5)` }}
                  h="100%"
                >
                  <Flex
                    w="52px"
                    h="52px"
                    align="center"
                    justify="center"
                    borderRadius="14px"
                    bg={T.c100}
                    color={C.primaryDeep}
                    fontFamily={FONT_DISPLAY}
                    fontWeight={900}
                    fontSize="19px"
                    mb="18px"
                    border="1px solid"
                    borderColor={T.c200}
                  >
                    {s.ico}
                  </Flex>
                  <Text
                    as="strong"
                    display="block"
                    color={C.primaryDark}
                    fontFamily={FONT_DISPLAY}
                    fontSize="17px"
                    mb="6px"
                    fontWeight={800}
                  >
                    {s.name}
                  </Text>
                  <Text as="span" display="block" color={C.textMuted} fontSize="13.5px" lineHeight={1.6}>
                    {s.desc}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* CTA */}
      <Box
        as="section"
        px={HOME_PX}
        py={{ base: '80px', lg: '128px' }}
        sx={{
          maskImage: {
            base: 'linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)',
            lg: 'linear-gradient(to bottom, transparent, black 80px, black calc(100% - 80px), transparent)'
          },
          WebkitMaskImage: {
            base: 'linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)',
            lg: 'linear-gradient(to bottom, transparent, black 80px, black calc(100% - 80px), transparent)'
          }
        }}
      >
        <MotionBox
          {...reveal}
          maxW="1320px"
          mx="auto"
          bgGradient={`linear(135deg, ${C.primary} 0%, ${C.primaryDeep} 55%, ${C.primaryDark} 100%)`}
          color="#fff"
          borderRadius="32px"
          p={{ base: '40px', lg: '72px' }}
          display="grid"
          gridTemplateColumns={{ base: '1fr', lg: '1.4fr .6fr' }}
          gap="40px"
          alignItems="center"
          position="relative"
          overflow="hidden"
          boxShadow={C.shadowCta}
          border="1px solid"
          borderColor="rgba(255,255,255,.18)"
          sx={{
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 25% 110%, ${T.y500}40, transparent 55%)`,
              pointerEvents: 'none'
            }
          }}
        >
          <Box
            pos="absolute"
            w="380px"
            h="380px"
            borderRadius="50%"
            bg={`radial-gradient(circle, ${T.c300}40, transparent 65%)`}
            right="-110px"
            top="-110px"
            filter="blur(10px)"
          />
          <Box
            pos="absolute"
            w="260px"
            h="260px"
            borderRadius="50%"
            bg={`radial-gradient(circle, ${T.y500}30, transparent 70%)`}
            left="-80px"
            bottom="-100px"
          />
          <Box pos="relative" zIndex={1}>
            <Text
              as="span"
              display="inline-flex"
              alignItems="center"
              gap="10px"
              fontFamily={FONT_DISPLAY}
              fontWeight={700}
              fontSize="12px"
              letterSpacing=".22em"
              textTransform="uppercase"
              color={C.primaryDeep}
              mb="20px"
              px="16px"
              py="8px"
              borderRadius="full"
              bg={T.c50}
              border="1px solid"
              borderColor={C.primary}
            >
              <Box w="7px" h="7px" borderRadius="50%" bg={C.primary} boxShadow={`0 0 0 4px ${T.c100}`} />
              Tư vấn miễn phí
            </Text>
            <Text
              as="h2"
              color="#fff !important"
              fontFamily={FONT_DISPLAY}
              fontWeight={800}
              fontSize={{ base: '28px', lg: '44px' }}
              lineHeight={1.12}
              letterSpacing="-.022em"
              mb="16px"
            >
              Cần tư vấn nguyên liệu, menu hoặc công thức cho quán?
            </Text>
            <Text color={T.c200} fontSize="16.5px" lineHeight={1.65} maxW="560px">
              Diệp Trà có thể hỗ trợ lựa chọn nguyên liệu, đề xuất món phù hợp với mô hình, tối ưu giá vốn và gửi thêm
              hình ảnh/video ứng dụng sản phẩm thực tế.
            </Text>
          </Box>
          <Flex justify={{ base: 'flex-start', lg: 'flex-end' }} gap="14px" flexWrap="wrap" pos="relative" zIndex={1}>
            <Box
              as={Link}
              href="/lien-he"
              display="inline-flex"
              alignItems="center"
              gap="10px"
              fontFamily={FONT_DISPLAY}
              fontWeight={700}
              borderRadius="full"
              px="32px"
              py="16px"
              fontSize="15px"
              border="1.5px solid #fff"
              bg="#fff"
              color={C.primaryDeep}
              backdropFilter="blur(6px)"
              transition={`all .45s ${EASE}`}
              _hover={{ bg: C.accent, color: '#fff', borderColor: C.accent, transform: 'translateY(-1px)', boxShadow: `0 12px 28px ${T.y500}55` }}
            >
              Liên hệ Diệp Trà
              <Flex
                w="26px"
                h="26px"
                align="center"
                justify="center"
                borderRadius="full"
                bg={T.c50}
                color={C.primaryDeep}
                fontSize="14px"
                fontWeight={900}
                sx={{ transition: `transform .45s ${EASE}, background .45s ${EASE}` }}
              >
                →
              </Flex>
            </Box>
            <Box
              as={Link}
              href="/san-pham/nguyen-lieu-pha-che"
              display="inline-flex"
              alignItems="center"
              gap="10px"
              fontFamily={FONT_DISPLAY}
              fontWeight={700}
              borderRadius="full"
              px="32px"
              py="16px"
              fontSize="15px"
              border="1.5px solid rgba(255,255,255,.5)"
              bg="rgba(255,255,255,.06)"
              color="#fff"
              backdropFilter="blur(10px)"
              transition={`all .45s ${EASE}`}
              _hover={{ bg: 'rgba(255,255,255,.16)', borderColor: '#fff', transform: 'translateY(-1px)' }}
            >
              Xem nguyên liệu
            </Box>
          </Flex>
        </MotionBox>
      </Box>
    </HomeTheme>
  );
};

export default AuthorContent;
