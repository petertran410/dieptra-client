'use client';

import { Box } from '@chakra-ui/react';
import { Montserrat, Be_Vietnam_Pro } from 'next/font/google';

// Fonts scoped cho trang chủ V2 — không đụng font Afacad global
const display = Montserrat({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-home-display',
  display: 'swap'
});

const body = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-home-body',
  display: 'swap'
});

// Token màu lấy từ design index.html
export const HC = {
  primary: '#00B7CC',
  primaryBright: '#00A5B5',
  primaryMid: '#2E8B8F',
  primaryDeep: '#1A5F6A',
  primaryDark: '#0D3B42',
  cyanSoft: '#A8D8E0',
  cyanPale: '#C5E4E8',
  cyanBg: '#E8F4F5',
  gold: '#C9A84C',
  goldLight: '#E8C96A',
  accent: '#FF7A1A',
  accentBright: '#FF8F3D',
  accentDeep: '#E8650A',
  accentSoft: '#FFE6D2',
  green: '#3FA63A',
  greenDeep: '#2E7D32',
  greenSoft: '#E8F5E4',
  sky: '#DCF0F5',
  textPrimary: '#0D3B42',
  textSecondary: '#3A6B74',
  textMuted: '#5A8A92',
  bgSoft: '#F5FAFB',
  border: '#D0E5E8',
  borderStrong: '#7AA5A8',
  shadowCard: '0 12px 32px rgba(0,183,204,.12)'
};

export const FONT_DISPLAY = 'var(--font-home-display), Montserrat, sans-serif';
export const FONT_BODY = 'var(--font-home-body), "Be Vietnam Pro", system-ui, sans-serif';

// PX container giống PX_ALL nhưng dành cho home V2
export const HOME_PX = { base: '20px', md: '40px', lg: '64px', xl: '80px', '2xl': '120px' };

const HomeTheme = ({ children }) => {
  return (
    <Box
      className={`${display.variable} ${body.variable}`}
      sx={{
        fontFamily: FONT_BODY,
        color: HC.textPrimary,
        bg: '#FFF',
        'h1, h2, h3, h4': { fontFamily: FONT_DISPLAY, color: HC.textPrimary, lineHeight: 1.2, fontWeight: 800 }
      }}
    >
      {children}
    </Box>
  );
};

export default HomeTheme;
