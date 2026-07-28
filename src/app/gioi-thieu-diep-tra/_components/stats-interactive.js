'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Ease curves
const EASE_OUT_BACK = [0.34, 1.56, 0.64, 1];

// ─── STAT NUMBER (single + superscript, Bebas Neue block style) ───────────────
const StatNumber = ({ num }) => {
  const formattedNum =
    num === '30000' ? '30.000' : num === '100' ? '100' : num === '60' ? '60' : num;

  return (
    <Flex align="flex-start" justify="center" lineHeight={1}>
      <Text
        as="span"
        color="#FFFFFF"
        fontSize={{ base: '48px', sm: '58px', md: '36px', lg: '52px', xl: '72px' }}
        fontWeight={400}
        lineHeight={0.88}
        letterSpacing="0.02em"
        style={{
          fontFamily: 'var(--font-bebas), Impact, "Arial Black", sans-serif',
          textShadow: `
            2px 2px 0px rgba(0,100,160,0.55),
            4px 4px 0px rgba(0,80,130,0.35),
            6px 6px 8px rgba(0,0,0,0.18)
          `,
          filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.25))'
        }}
      >
        {formattedNum}
      </Text>
      <Text
        as="span"
        color="#FFFFFF"
        fontSize={{ base: '22px', sm: '28px', md: '18px', lg: '26px', xl: '36px' }}
        fontWeight={400}
        lineHeight={1}
        ml="1px"
        mt={{ base: '3px', md: '3px', lg: '5px', xl: '7px' }}
        style={{
          fontFamily: 'var(--font-bebas), Impact, "Arial Black", sans-serif',
          textShadow: `2px 2px 0px rgba(0,100,160,0.5), 4px 4px 6px rgba(0,0,0,0.15)`
        }}
      >
        +
      </Text>
    </Flex>
  );
};


// ─── IDLE GLOW PULSE (runs after 2.8s) ────────────────────────────────────────
const idleGlow = {
  hidden: {},
  pulse: {
    filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
    scale: [1, 1.04, 1],
    transition: {
      delay: 2.8,
      duration: 1.8,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 1.2
    }
  }
};

// ─── BUILD PHOTO KEYFRAME ANIMATION ───────────────────────────────────────────
// Entry slide-in → then physical shake on landing (reactive to number crash)
const buildPhotoAnim = (fromX, fromY, finalRotate) => ({
  hidden: { opacity: 0, x: fromX, y: fromY, rotate: 0 },
  visible: {
    opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    x:       [fromX, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    y:       [fromY, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // shake after landing: offset from finalRotate
    rotate: [
      0,
      finalRotate,        // lands
      finalRotate - 11,   // reactive jolt
      finalRotate + 8,
      finalRotate - 5,
      finalRotate + 3,
      finalRotate - 2,
      finalRotate + 1,
      finalRotate,
      finalRotate
    ]
  }
});

const photoTimes = [0, 0.42, 0.52, 0.62, 0.71, 0.79, 0.86, 0.91, 0.96, 1.0];

// ─── CRASH-IN TRANSITION for number blocks ─────────────────────────────────────
// High-speed spring from far away — feels like it "punches" through the screen
const crashTransition = (delay) => ({
  type: 'spring',
  stiffness: 500,
  damping: 22,
  mass: 0.8,
  delay
});

// ─── PHOTO CARD WRAPPER ────────────────────────────────────────────────────────
const PhotoCard = ({ src, alt, fromX, fromY, finalRotate = 0, delay, kenDelay, priority = false }) => {
  const photoAnim = buildPhotoAnim(fromX, fromY, finalRotate);
  return (
    <MotionBox
      variants={photoAnim}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.0, delay, times: photoTimes, ease: 'easeOut' }}
      borderRadius="12px"
      bg="white"
      p={{ base: '3px', md: '4px' }}
      boxShadow="0 5px 18px rgba(0,0,0,0.10)"
      position="relative"
      whileHover={{
        scale: 1.06,
        rotate: 0,
        zIndex: 20,
        boxShadow: '0 18px 38px rgba(0,0,0,0.18)',
        transition: { type: 'spring', stiffness: 240, damping: 14 }
      }}
    >
      <MotionBox
        w="full" h="full"
        borderRadius="9px"
        overflow="hidden"
        aspectRatio="1/1"
        position="relative"
        initial={{ scale: 1 }}
        animate={{ scale: 1.02 }}
        transition={{ delay: kenDelay ?? 3.0, duration: 3.2, ease: 'linear' }}
      >
        <Image src={src} alt={alt} fill sizes="25vw" style={{ objectFit: 'cover' }} priority={priority} />
      </MotionBox>
    </MotionBox>
  );
};

// ─── CRASH STAT BLOCK ──────────────────────────────────────────────────────────
const CrashStat = ({ num, label, crashFrom, delay }) => {
  const initial = {
    opacity: 0,
    x: crashFrom?.x ?? 0,
    y: crashFrom?.y ?? 0,
    scale: 1.25,
    rotate: crashFrom?.rotate ?? 0
  };
  const animate = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 };

  return (
    <MotionBox
      initial={initial}
      animate={animate}
      transition={crashTransition(delay)}
      display="flex" alignItems="center" justifyContent="center"
      h="full" w="full"
    >
      <MotionFlex
        direction="column" align="center" justify="center"
        textAlign="center" gap="4px"
        variants={idleGlow}
        initial="hidden"
        animate="pulse"
        h="full" w="full"
      >
        <StatNumber num={num} />
        <Text
          color="white"
          fontSize={{ base: '10px', md: '9.5px', lg: '11.5px', xl: '13.5px' }}
          fontWeight={900}
          textTransform="uppercase"
          letterSpacing="0.07em"
          lineHeight={1.2}
        >
          {label}
        </Text>
      </MotionFlex>
    </MotionBox>
  );
};

// ─── MAIN CONTENT ─────────────────────────────────────────────────────────────
const StatsInteractiveContent = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <Box
      ref={containerRef}
      w="full"
      borderRadius="18px"
      bgGradient="linear(to-br, #46c6ea, #2ba5ca)"
      p={{ base: '16px 12px', sm: '22px 18px', md: '28px 22px', lg: '34px 26px' }}
      position="relative"
      overflow="hidden"
    >
      {/* Inner border */}
      <Box
        position="absolute" top="6px" bottom="6px" left="6px" right="6px"
        borderRadius="14px" border="1px solid rgba(255,255,255,0.32)"
        pointerEvents="none" zIndex={1}
      />

      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="stretch"
        gap={{ base: '20px', md: '22px', lg: '26px' }}
        position="relative" zIndex={2} h="full"
      >
        {/* ── LEFT: Vertical title ── */}
        <Flex w={{ base: 'full', md: '9%' }} justify="center" align="center" flexShrink={0}>
          {/* Desktop */}
          <MotionBox
            display={{ base: 'none', md: 'flex' }}
            alignItems="center" justifyContent="center" h="full"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
          >
            <Text
              color="white"
              fontSize={{ md: '13px', lg: '16px', xl: '19px' }}
              fontWeight={900} letterSpacing="0.1em" lineHeight={1.15}
              textAlign="center"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              NHỮNG CON SỐ ĐÁNG TỰ HÀO
            </Text>
          </MotionBox>

          {/* Mobile */}
          <MotionBox
            display={{ base: 'block', md: 'none' }}
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          >
            <Text
              color="white" fontSize="17px" fontWeight={900}
              letterSpacing="0.06em" textAlign="center"
            >
              NHỮNG CON SỐ ĐÁNG TỰ HÀO
            </Text>
          </MotionBox>
        </Flex>

        {/* ── RIGHT: Grid ── */}
        {isInView && (
          <Grid
            flex={1}
            templateColumns="repeat(4, 1fr)"
            templateRows="repeat(3, 1fr)"
            gap={{ base: '8px', md: '10px', lg: '12px', xl: '14px' }}
            aspectRatio={{ base: 'auto', md: '1.6' }}
            overflow="visible"
          >
            {/* ROW 1 */}
            {/* IMG 1 – top-left, slides from top-left, shake */}
            <Box gridColumn="1" gridRow="1">
              <PhotoCard
                src="/images/about-v2/stat-img-1.webp"
                alt="Mascot Gấu Lermao và nhân viên"
                fromX={-180} fromY={-140} finalRotate={-1.5}
                delay={0.65} kenDelay={3.0} priority
              />
            </Box>

            {/* IMG 2 – top-center, slides from top, shake */}
            <Box gridColumn="2" gridRow="1">
              <PhotoCard
                src="/images/about-v2/stat-img-2.webp"
                alt="Mascot Lermao và múa lân"
                fromX={0} fromY={-160} finalRotate={1.5}
                delay={0.80} kenDelay={3.15} priority
              />
            </Box>

            {/* IMG 3 – (col 3, row 1) slides from right, shake */}
            <Box gridColumn="3" gridRow="1">
              <PhotoCard
                src="/images/about-v2/stat-img-3.webp"
                alt="Lễ trao nhận chứng nhận"
                fromX={180} fromY={-80} finalRotate={-2}
                delay={1.35} kenDelay={3.1}
              />
            </Box>

            {/* STAT: 60+ TỈNH THÀNH — CRASHES from top-right */}
            <Box gridColumn="4" gridRow="1" display="flex" alignItems="center" justifyContent="center">
              <CrashStat
                num="60" label="Tỉnh thành"
                crashFrom={{ x: 300, y: -200, rotate: 12 }}
                delay={1.2}
              />
            </Box>

            {/* ROW 2 */}
            {/* STAT: 100+ THƯƠNG HIỆU LỚN — CRASHES from left (punches photos aside) */}
            <Box gridColumn="span 2" gridRow="2" display="flex" alignItems="center" justifyContent="center">
              <CrashStat
                num="100" label="Thương hiệu lớn"
                crashFrom={{ x: -380, y: 0, rotate: -8 }}
                delay={0.5}
              />
            </Box>

            {/* IMG 4 – center-right, reacts after 100+ crashes — slides from right, big shake */}
            <Box gridColumn="3" gridRow="2">
              <PhotoCard
                src="/images/about-v2/stat-img-4.webp"
                alt="Tập thể đối tác trước cửa hàng"
                fromX={160} fromY={0} finalRotate={2.5}
                delay={0.80} kenDelay={3.2} priority
              />
            </Box>

            {/* IMG 5 – (col 4, row 2) slides from right */}
            <Box gridColumn="4" gridRow="2">
              <PhotoCard
                src="/images/about-v2/stat-img-7.webp"
                alt="Quầy trưng bày sản phẩm"
                fromX={200} fromY={80} finalRotate={-1.5}
                delay={1.50} kenDelay={3.3}
              />
            </Box>

            {/* ROW 3 */}
            {/* IMG 6 – sân khấu, slides from bottom */}
            <Box gridColumn="1" gridRow="3">
              <PhotoCard
                src="/images/about-v2/stat-img-5.webp"
                alt="Sự kiện sân khấu hội nghị"
                fromX={-80} fromY={160} finalRotate={-2}
                delay={2.15} kenDelay={3.4}
              />
            </Box>

            {/* IMG 7 – khách hàng ngồi, slides from bottom */}
            <Box gridColumn="2" gridRow="3">
              <PhotoCard
                src="/images/about-v2/stat-img-6.webp"
                alt="Khách hàng tham dự hội nghị"
                fromX={60} fromY={180} finalRotate={1.5}
                delay={2.30} kenDelay={3.5}
              />
            </Box>

            {/* STAT: 30.000+ KHÁCH HÀNG — CRASHES from bottom-right */}
            <Box gridColumn="span 2" gridRow="3" display="flex" alignItems="center" justifyContent="center">
              <CrashStat
                num="30000" label="Khách hàng thành công"
                crashFrom={{ x: 320, y: 220, rotate: 10 }}
                delay={2.0}
              />
            </Box>
          </Grid>
        )}
      </Flex>
    </Box>
  );
};

// ─── LOOP WRAPPER ──────────────────────────────────────────────────────────────
const StatsInteractive = () => {
  const [key, setKey] = useState(0);

  // 6s animation + 5s pause = 11s cycle
  useEffect(() => {
    const timer = setInterval(() => setKey((k) => k + 1), 11000);
    return () => clearInterval(timer);
  }, []);

  return <StatsInteractiveContent key={key} />;
};

export default StatsInteractive;
