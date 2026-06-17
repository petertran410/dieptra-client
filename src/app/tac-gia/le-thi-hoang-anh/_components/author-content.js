'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import HomeTheme, { HC, FONT_DISPLAY, HOME_PX } from '../../../(home)/_components/home-theme';

const MotionBox = motion(Box);

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
};

const SecHead = ({ eyebrow, title, desc, light }) => (
  <MotionBox {...reveal} textAlign="center" maxW="720px" mx="auto" mb={{ base: '40px', lg: '56px' }}>
    <Text
      as="span"
      display="inline-block"
      fontFamily={FONT_DISPLAY}
      fontWeight={700}
      fontSize="13px"
      letterSpacing=".14em"
      textTransform="uppercase"
      color={light ? HC.cyanSoft : HC.primary}
      mb="14px"
    >
      {eyebrow}
    </Text>
    <Text as="h2" fontFamily={FONT_DISPLAY} fontWeight={800} fontSize={{ base: '28px', lg: '40px' }} mb="14px" color={light ? '#fff' : HC.textPrimary}>
      {title}
    </Text>
    {desc && (
      <Text color={light ? HC.cyanSoft : HC.textSecondary} fontSize="18px">
        {desc}
      </Text>
    )}
  </MotionBox>
);

const Btn = ({ href, children, variant = 'primary' }) => {
  const styles =
    variant === 'primary'
      ? { bg: HC.accent, color: '#fff', borderColor: 'transparent', boxShadow: '0 8px 20px rgba(255,122,26,.32)', _hover: { bg: HC.accentDeep } }
      : { bg: 'transparent', color: HC.primary, borderColor: HC.primary, _hover: { bg: HC.primaryDark, borderColor: HC.primaryDark, color: '#fff' } };
  return (
    <Box
      as={Link}
      href={href}
      display="inline-flex"
      alignItems="center"
      gap="9px"
      fontFamily={FONT_DISPLAY}
      fontWeight={700}
      borderRadius="12px"
      px="30px"
      py="14px"
      fontSize="15px"
      border="1.5px solid"
      transition="all .2s"
      {...styles}
    >
      {children}
    </Box>
  );
};

const EXPERIENCE = [
  { n: '01', h: 'Vận hành thương hiệu nguyên liệu', p: 'Có kinh nghiệm xây dựng và vận hành thương hiệu nguyên liệu pha chế, từ lựa chọn sản phẩm, định vị phân khúc, xây dựng thông điệp bán hàng đến hỗ trợ đại lý và khách hàng B2B.' },
  { n: '02', h: 'Tư vấn menu & công thức đồ uống', p: 'Đồng hành cùng quán trong việc lên menu trà sữa, trà trái cây, trà kem, đồ uống topping, đồ uống theo mùa và các công thức phù hợp với khẩu vị khách hàng Việt Nam.' },
  { n: '03', h: 'Nghiên cứu topping & ứng dụng sản phẩm', p: 'Trực tiếp nghiên cứu các dòng topping như trân châu, mochi, thạch, hạt nổ, tàu hũ, khoai môn nghiền và các giải pháp topping đông lạnh dùng trong pha chế hiện đại.' },
  { n: '04', h: 'Làm việc với quán trà sữa & chuỗi F&B', p: 'Hiểu các vấn đề thực tế của quán: giá vốn, tốc độ ra món, tính ổn định nguyên liệu, khẩu vị khách hàng, đào tạo nhân sự và cách triển khai món mới hiệu quả.' },
  { n: '05', h: 'Phân phối nguyên liệu & hỗ trợ đại lý', p: 'Có kinh nghiệm phân phối nguyên liệu pha chế, làm việc với khách hàng sỉ, đại lý, đối tác vùng và các mô hình cần giải pháp nguồn hàng ổn định, dễ bán, dễ ứng dụng.' },
  { n: '06', h: 'Cập nhật xu hướng đồ uống', p: 'Theo dõi xu hướng đồ uống tại Việt Nam, Trung Quốc và các thị trường nguyên liệu lớn, từ đó chọn lọc ý tưởng phù hợp để đưa vào công thức, workshop và tài liệu tư vấn.' }
];

const ACHIEVEMENTS = [
  <>Đã tư vấn và cung cấp giải pháp nguyên liệu cho hơn <strong>1.000+</strong> khách hàng, quán trà sữa, mô hình đồ uống và đối tác F&B.</>,
  <>Sở hữu và phát triển các thương hiệu/ngành hàng nguyên liệu như <strong>Diệp Trà, Gấu LerMao, Trà Phượng Hoàng.</strong></>,
  <>Đã tổ chức hơn <strong>50 workshop</strong>, buổi đào tạo, demo sản phẩm và chương trình chia sẻ công thức cho khách hàng ngành đồ uống.</>,
  <>Xây dựng hệ thống nội dung trên nhiều kênh social: Facebook, TikTok, YouTube, website và tài liệu đào tạo nội bộ.</>,
  <>Trực tiếp tham gia khảo sát sản phẩm, làm việc với nhà máy, đối tác nguyên liệu và đội ngũ R&D để phát triển giải pháp phù hợp thị trường.</>
];

const JOURNEY = [
  { img: '/images/thumbnail-kien-thuc-nguyen-lieu-pha-che.webp', num: '01', tag: 'Giai đoạn 1', h: 'Xây nền tảng về nguyên liệu pha chế', p: 'Tìm hiểu sâu về trà, mứt, topping và các nhóm nguyên liệu cốt lõi trong vận hành quán đồ uống.' },
  { img: '/images/thumbnail-cong-thuc-pha-che.webp', num: '02', tag: 'Giai đoạn 2', h: 'Phát triển menu, công thức và ứng dụng sản phẩm', p: 'Thử nghiệm công thức, đánh giá hương vị, giá vốn và khả năng triển khai thực tế tại quán.' },
  { img: '/images/thumbnail-danh-gia.webp', num: '03', tag: 'Giai đoạn 3', h: 'Tư vấn cho khách hàng, đại lý và mô hình F&B', p: 'Đồng hành cùng khách hàng trong lựa chọn nguyên liệu, ra món mới và tối ưu danh mục sản phẩm.' },
  { img: '/images/thumbnail-kien-thuc-ve-tra.webp', num: '04', tag: 'Hiện tại', h: 'Xây dựng hệ sinh thái nội dung chuyên môn Diệp Trà', p: 'Phát triển bài viết, công thức, video hướng dẫn và nội dung tư vấn để chia sẻ kiến thức thực tế cho ngành đồ uống.' }
];

const SOCIALS = [
  { ico: 'f', name: 'Facebook', desc: 'Cập nhật sản phẩm, workshop, phản hồi khách hàng', href: 'https://facebook.com/dieptra.0788339379' },
  { ico: '♪', name: 'TikTok', desc: 'Video ngắn về công thức, topping và xu hướng đồ uống', href: 'https://www.tiktok.com/@founder.dieptra' },
  { ico: '▶', name: 'YouTube', desc: 'Video hướng dẫn, demo sản phẩm và chia sẻ chuyên môn', href: 'https://youtube.com/@Dieptra_Official' },
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
        pt={{ base: '120px', lg: '140px' }}
        pb={{ base: '56px', lg: '64px' }}
        bgGradient="linear(170deg, #DCF0F5 0%, #C5E4E8 40%, #E8F5E4 100%)"
      >
        <Box pos="absolute" top="-180px" right="-160px" w="520px" h="520px" borderRadius="50%" bg="radial-gradient(circle, rgba(0,183,204,.18), rgba(0,183,204,0))" pointerEvents="none" />
        <Box pos="absolute" bottom="-200px" left="-140px" w="420px" h="420px" borderRadius="50%" bg="radial-gradient(circle, rgba(255,122,26,.12), rgba(255,122,26,0))" pointerEvents="none" />

        <Box px={HOME_PX} pos="relative" zIndex={1}>
          <Grid templateColumns={{ base: '1fr', lg: 'minmax(0,1.12fr) minmax(340px,420px)' }} gap={{ base: '30px', lg: '48px' }} alignItems="center" maxW="1200px" mx="auto">
            <MotionBox {...reveal} minW={0}>
              <Text as="span" display="inline-block" fontFamily={FONT_DISPLAY} fontWeight={700} fontSize="13px" letterSpacing=".14em" textTransform="uppercase" color={HC.primary} mb="6px">
                Tác giả nội dung chuyên môn tại Diệp Trà
              </Text>
              <Text as="h1" fontFamily={FONT_DISPLAY} fontWeight={900} color={HC.primaryDark} fontSize={{ base: '36px', lg: '62px' }} lineHeight={1.04} letterSpacing="-.02em" my="12px">
                Lê Thị Hoàng Anh
              </Text>
              <Text fontFamily={FONT_DISPLAY} fontSize={{ base: '18px', lg: '24px' }} color={HC.primaryBright} fontWeight={800} mb="22px">
                Founder Diệp Trà · Chuyên gia tư vấn nguyên liệu & menu đồ uống
              </Text>
              <Text fontSize="17px" color={HC.textSecondary} maxW="640px" mb="18px" fontWeight={500}>
                Với kinh nghiệm thực chiến trong ngành nguyên liệu pha chế, Lê Thị Hoàng Anh đồng hành cùng các quán trà sữa, mô hình đồ uống và đối tác F&B trong việc lựa chọn nguyên liệu, xây dựng menu, phát triển công thức, nghiên cứu topping và tối ưu giải pháp vận hành cho từng mô hình kinh doanh.
              </Text>
              <Text fontSize="17px" color={HC.textSecondary} maxW="640px" mb="18px" fontWeight={500}>
                Các nội dung chuyên môn trên website Diệp Trà được xây dựng theo hướng dễ hiểu, ứng dụng được ngay và bám sát nhu cầu thực tế của chủ quán, barista, đại lý nguyên liệu và đội ngũ phát triển sản phẩm trong ngành đồ uống.
              </Text>
              <Flex gap="14px" flexWrap="wrap" mt="24px">
                <Btn href="/lien-he">Liên hệ tư vấn nguyên liệu →</Btn>
                <Btn href="/bai-viet" variant="outline">Xem công thức đồ uống</Btn>
              </Flex>
            </MotionBox>

            <MotionBox
              {...reveal}
              as="aside"
              w="full"
              maxW="420px"
              justifySelf={{ base: 'center', lg: 'end' }}
              bg="#fff"
              border="1px solid"
              borderColor={HC.border}
              borderRadius="26px"
              p="18px"
              boxShadow="0 24px 60px rgba(13,59,66,.14)"
              display="flex"
              flexDirection="column"
              gap="16px"
            >
              <Box borderRadius="20px" overflow="hidden" bg={HC.cyanBg} border="1px solid" borderColor={HC.border} sx={{ aspectRatio: '1 / 1' }}>
                <Box as="img" src="/images/home-v2/author-avatar.webp" alt="Ảnh đại diện tác giả Lê Thị Hoàng Anh - Founder Diệp Trà" w="100%" h="100%" objectFit="cover" objectPosition="center top" />
              </Box>
              <Box display="grid" gap="8px" p="16px" bg={HC.bgSoft} borderRadius="16px" border="1px solid" borderColor={HC.border} fontSize="14px" lineHeight={1.55}>
                <Box><Text as="strong" color={HC.primaryDark} fontFamily={FONT_DISPLAY} fontWeight={700}>Họ tên:</Text> Lê Thị Hoàng Anh</Box>
                <Box><Text as="strong" color={HC.primaryDark} fontFamily={FONT_DISPLAY} fontWeight={700}>Chức danh:</Text> Founder Diệp Trà / Chuyên gia tư vấn nguyên liệu & menu đồ uống</Box>
                <Box><Text as="strong" color={HC.primaryDark} fontFamily={FONT_DISPLAY} fontWeight={700}>Lĩnh vực:</Text> Nguyên liệu pha chế, trà sữa, topping, mứt trái cây, R&D đồ uống</Box>
              </Box>
            </MotionBox>
          </Grid>
        </Box>
      </Box>

      {/* USP STATS */}
      <Box as="section" px={HOME_PX} mt={{ base: '-30px', lg: '-44px' }} position="relative" zIndex={5}>
        <MotionBox
          {...reveal}
          maxW="1200px"
          mx="auto"
          display="grid"
          gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap="18px"
          bg="#fff"
          border="1px solid"
          borderColor={HC.border}
          borderRadius="20px"
          p="30px"
          boxShadow="0 18px 50px rgba(13,59,66,.08)"
        >
          {USP.map((it, i) => (
            <Box key={i} textAlign="center" px="12px" py="8px" borderRight={{ lg: i === USP.length - 1 ? 'none' : '1px solid' }} borderColor={{ lg: HC.border }}>
              <Text fontFamily={FONT_DISPLAY} fontSize="34px" fontWeight={900} color={HC.accent} lineHeight={1}>{it.num}</Text>
              <Text fontFamily={FONT_DISPLAY} fontWeight={700} fontSize="14.5px" color={HC.primaryDark} mt="10px" mb="5px">{it.lbl}</Text>
              <Text fontSize="12.5px" color={HC.textMuted} lineHeight={1.5}>{it.desc}</Text>
            </Box>
          ))}
        </MotionBox>
      </Box>

      {/* EXPERIENCE */}
      <Box as="section" px={HOME_PX} py={{ base: '56px', lg: '96px' }}>
        <Box maxW="1200px" mx="auto">
          <SecHead
            eyebrow="Kinh nghiệm chuyên môn"
            title="Kinh nghiệm đến từ vận hành thật, sản phẩm thật và nhu cầu thật của thị trường"
            desc="Tác giả không chỉ viết nội dung giới thiệu sản phẩm, mà còn trực tiếp quan sát thị trường, làm việc với khách hàng, thử nghiệm công thức và phát triển giải pháp nguyên liệu cho quán."
          />
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="24px">
            {EXPERIENCE.map((c, i) => (
              <MotionBox key={c.n} {...reveal} transition={{ ...reveal.transition, delay: (i % 3) * 0.06 }} as="article" bg="#fff" border="1px solid" borderColor={HC.border} borderRadius="18px" p="30px" sx={{ transition: 'transform .25s, box-shadow .25s' }} _hover={{ transform: 'translateY(-6px)', boxShadow: HC.shadowCard }}>
                <Flex w="50px" h="50px" align="center" justify="center" borderRadius="14px" bg={HC.cyanBg} color={HC.primary} fontFamily={FONT_DISPLAY} fontSize="20px" fontWeight={900} mb="18px">{c.n}</Flex>
                <Text as="h3" color={HC.primaryDark} fontFamily={FONT_DISPLAY} fontWeight={800} fontSize="20px" lineHeight={1.28} mb="10px">{c.h}</Text>
                <Text color={HC.textSecondary} fontSize="14.5px">{c.p}</Text>
              </MotionBox>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* ACHIEVEMENT */}
      <Box as="section" position="relative" overflow="hidden" color="#fff" px={HOME_PX} py={{ base: '56px', lg: '96px' }} bgGradient={`linear(160deg, ${HC.primaryDeep}, ${HC.primaryDark})`}>
        <Box pos="absolute" right="-100px" top="-100px" w="400px" h="400px" borderRadius="50%" bg="rgba(255,122,26,.16)" />
        <Box pos="absolute" left="-120px" bottom="-120px" w="360px" h="360px" borderRadius="50%" bg="rgba(0,183,204,.2)" />
        <Box maxW="1200px" mx="auto" pos="relative" zIndex={2}>
          <SecHead light eyebrow="Thành tựu nổi bật" title="Dấu ấn chuyên môn trong ngành nguyên liệu đồ uống" desc="Những kết quả thực tế từ quá trình vận hành thương hiệu và đồng hành cùng đối tác F&B." />
          <Grid templateColumns={{ base: '1fr', lg: 'clamp(340px,32vw,480px) minmax(0,1fr)' }} gap="28px" alignItems="stretch">
            <MotionBox {...reveal} pos="relative" w={{ base: '100%', lg: 'clamp(340px,32vw,480px)' }} sx={{ aspectRatio: '1 / 1' }} borderRadius="24px" overflow="hidden" border="1px solid rgba(255,255,255,.2)" boxShadow="0 22px 48px rgba(0,23,42,.3)">
              <Box as="img" src="/images/home-v2/author-avatar.webp" alt="Thành tựu nổi bật của Lê Thị Hoàng Anh và Diệp Trà" w="100%" h="100%" objectFit="cover" objectPosition="center" />
              <Box pos="absolute" left="18px" right="18px" bottom="18px" p="14px 16px" borderRadius="16px" bg="rgba(255,255,255,.94)" boxShadow="0 14px 32px rgba(0,23,42,.18)">
                <Text color={HC.textSecondary} fontSize="13px" fontWeight={600}>Thành tựu nổi bật</Text>
                <Text mt="3px" color={HC.primaryDark} fontFamily={FONT_DISPLAY} fontSize="19px" fontWeight={900}>Founder Diệp Trà</Text>
              </Box>
            </MotionBox>
            <MotionBox {...reveal} display="flex" flexDirection="column" gap="14px">
              {ACHIEVEMENTS.map((a, i) => (
                <Flex key={i} flex={1} gap="14px" align="center" p="16px 20px" borderRadius="16px" bg="rgba(255,255,255,.1)" border="1px solid rgba(255,255,255,.18)">
                  <Flex flex="none" w="38px" h="38px" align="center" justify="center" borderRadius="50%" bg={HC.accent} color="#fff" fontWeight={900} fontSize="18px">✓</Flex>
                  <Text color="#fff" fontSize="14.5px" lineHeight={1.55} fontWeight={500} sx={{ '& strong': { fontFamily: FONT_DISPLAY, fontWeight: 800, color: '#fff' } }}>{a}</Text>
                </Flex>
              ))}
            </MotionBox>
          </Grid>
        </Box>
      </Box>

      {/* JOURNEY */}
      <Box as="section" px={HOME_PX} py={{ base: '56px', lg: '96px' }} bg={HC.bgSoft}>
        <Box maxW="1200px" mx="auto">
          <SecHead
            eyebrow="Hành trình chuyên môn"
            title="Từ sản phẩm nguyên liệu đến giải pháp vận hành cho quán đồ uống"
            desc="Trang tác giả giúp người đọc hiểu rõ ai là người đứng sau các nội dung tư vấn, từ đó tăng sự tin tưởng khi đọc công thức, bài phân tích sản phẩm và hướng dẫn kinh doanh."
          />
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap="22px">
            {JOURNEY.map((j, i) => (
              <MotionBox key={j.num} {...reveal} transition={{ ...reveal.transition, delay: (i % 4) * 0.06 }} as="article" overflow="hidden" borderRadius="18px" bg="#fff" border="1px solid" borderColor={HC.border} sx={{ transition: 'transform .25s, box-shadow .25s', '&:hover': { transform: 'translateY(-6px)', boxShadow: HC.shadowCard }, '&:hover .j-img': { transform: 'scale(1.05)' } }}>
                <Box pos="relative" sx={{ aspectRatio: '1 / 1' }} overflow="hidden" bg={HC.cyanBg}>
                  <Box as="img" className="j-img" src={j.img} alt={j.h} w="100%" h="100%" objectFit="cover" sx={{ transition: 'transform .4s' }} />
                  <Flex pos="absolute" left="14px" top="14px" minW="44px" h="36px" px="12px" align="center" justify="center" borderRadius="999px" bg="rgba(13,59,66,.86)" color="#fff" fontFamily={FONT_DISPLAY} fontSize="15px" fontWeight={900}>{j.num}</Flex>
                </Box>
                <Box p="22px">
                  <Flex display="inline-flex" align="center" mb="12px" px="12px" py="6px" borderRadius="999px" bg={HC.cyanBg} color={HC.primary} fontFamily={FONT_DISPLAY} fontSize="12px" fontWeight={800} letterSpacing=".02em">{j.tag}</Flex>
                  <Text as="h3" color={HC.primaryDark} fontFamily={FONT_DISPLAY} fontWeight={800} fontSize="18px" lineHeight={1.3} mb="10px">{j.h}</Text>
                  <Text color={HC.textSecondary} fontSize="14px" lineHeight={1.6}>{j.p}</Text>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* QUOTE */}
      <Box as="section" px={HOME_PX} py={{ base: '56px', lg: '96px' }}>
        <MotionBox {...reveal} maxW="920px" mx="auto" bg={HC.cyanBg} border="1px solid" borderColor={HC.border} borderRadius="26px" p={{ base: '30px', lg: '44px' }} display="grid" gridTemplateColumns={{ base: '1fr', md: '72px 1fr' }} gap="24px" alignItems="start">
          <Flex w="72px" h="72px" align="center" justify="center" borderRadius="20px" bg="#fff" color={HC.primary} fontFamily={FONT_DISPLAY} fontSize="48px" fontWeight={900} lineHeight={1} boxShadow="0 12px 26px rgba(13,59,66,.1)">“</Flex>
          <Box>
            <Text as="blockquote" fontFamily={FONT_DISPLAY} fontSize={{ base: '20px', lg: '28px' }} lineHeight={1.35} color={HC.primaryDark} fontWeight={800} letterSpacing="-.01em">
              Một nguyên liệu tốt không chỉ nằm ở hương vị, mà còn phải giúp quán dễ vận hành, dễ đào tạo nhân sự và tạo ra món đồ uống có khả năng bán lặp lại.
            </Text>
            <Text as="cite" display="block" mt="16px" color={HC.textMuted} fontStyle="normal" fontWeight={700} fontSize="15px">— Lê Thị Hoàng Anh, Founder Diệp Trà</Text>
          </Box>
        </MotionBox>
      </Box>

      {/* SOCIAL */}
      <Box as="section" px={HOME_PX} py={{ base: '56px', lg: '96px' }} bg={HC.bgSoft}>
        <Box maxW="1200px" mx="auto">
          <SecHead
            eyebrow="Kênh nội dung & cộng đồng"
            title="Theo dõi thêm các nội dung công thức, workshop và cập nhật sản phẩm mới"
            desc="Kết nối với Diệp Trà và LerMao trên các kênh social để cập nhật công thức, xu hướng và sản phẩm mới."
          />
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap="20px">
            {SOCIALS.map((s, i) => (
              <MotionBox key={s.name} {...reveal} transition={{ ...reveal.transition, delay: (i % 4) * 0.06 }} as={Link} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} aria-label={`${s.name} Diệp Trà`} p="26px" borderRadius="18px" bg="#fff" border="1px solid" borderColor={HC.border} display="block" sx={{ transition: 'transform .25s, box-shadow .25s' }} _hover={{ transform: 'translateY(-6px)', boxShadow: HC.shadowCard }}>
                <Flex w="46px" h="46px" align="center" justify="center" borderRadius="12px" bg={HC.cyanBg} color={HC.primary} fontFamily={FONT_DISPLAY} fontWeight={900} fontSize="18px" mb="14px">{s.ico}</Flex>
                <Text as="strong" display="block" color={HC.primaryDark} fontFamily={FONT_DISPLAY} fontSize="17px" mb="6px">{s.name}</Text>
                <Text as="span" display="block" color={HC.textMuted} fontSize="13.5px" lineHeight={1.55}>{s.desc}</Text>
              </MotionBox>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* CTA */}
      <Box as="section" px={HOME_PX} py={{ base: '56px', lg: '96px' }} bg={HC.bgSoft}>
        <MotionBox
          {...reveal}
          maxW="1200px"
          mx="auto"
          bgGradient={`linear(135deg, ${HC.primary}, ${HC.primaryDeep})`}
          color="#fff"
          borderRadius="28px"
          p={{ base: '34px', lg: '58px' }}
          display="grid"
          gridTemplateColumns={{ base: '1fr', lg: '1.15fr .85fr' }}
          gap="30px"
          alignItems="center"
          position="relative"
          overflow="hidden"
          boxShadow="0 24px 60px rgba(0,183,204,.22)"
        >
          <Box pos="absolute" w="300px" h="300px" borderRadius="50%" bg="rgba(255,255,255,.1)" right="-90px" top="-90px" />
          <Box pos="relative" zIndex={1}>
            <Text as="h2" color="#fff" fontFamily={FONT_DISPLAY} fontWeight={800} fontSize={{ base: '26px', lg: '38px' }} lineHeight={1.15} mb="12px">Cần tư vấn nguyên liệu, menu hoặc công thức cho quán?</Text>
            <Text color={HC.cyanSoft} fontSize="16.5px">Diệp Trà có thể hỗ trợ lựa chọn nguyên liệu, đề xuất món phù hợp với mô hình, tối ưu giá vốn và gửi thêm hình ảnh/video ứng dụng sản phẩm thực tế.</Text>
          </Box>
          <Flex justify={{ base: 'flex-start', lg: 'flex-end' }} gap="12px" flexWrap="wrap" pos="relative" zIndex={1}>
            <Box as={Link} href="/lien-he" display="inline-flex" alignItems="center" gap="9px" fontFamily={FONT_DISPLAY} fontWeight={700} borderRadius="12px" px="30px" py="14px" fontSize="15px" border="1.5px solid #fff" bg="#fff" color={HC.primaryDeep} transition="all .2s" _hover={{ bg: HC.accent, color: '#fff', borderColor: HC.accent }}>Liên hệ Diệp Trà →</Box>
            <Box as={Link} href="/san-pham" display="inline-flex" alignItems="center" gap="9px" fontFamily={FONT_DISPLAY} fontWeight={700} borderRadius="12px" px="30px" py="14px" fontSize="15px" border="1.5px solid #fff" bg="#fff" color={HC.primaryDeep} transition="all .2s" _hover={{ bg: HC.accent, color: '#fff', borderColor: HC.accent }}>Xem nguyên liệu</Box>
          </Flex>
        </MotionBox>
      </Box>
    </HomeTheme>
  );
};

export default AuthorContent;
