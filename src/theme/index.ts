const DARK_COLORS = {
  background: '#0A0A0A',
  backgroundSecondary: '#111111',
  backgroundCard: '#161616',
  surface: '#1A1A1A',
  surfaceLight: '#222222',
  border: '#2A2A2A',
  borderGold: '#C9A84C',
  gold: '#C9A84C',
  goldLight: '#E2C97E',
  goldDark: '#A07830',
  text: '#F0EDE6',
  textSecondary: '#9A9082',
  textMuted: '#5A5450',
  white: '#FFFFFF',
  danger: '#C0392B',
  overlay: 'rgba(0,0,0,0.6)',
  overlayDark: 'rgba(0,0,0,0.85)',
};

const LIGHT_COLORS = {
  background: '#F5F0E8',
  backgroundSecondary: '#EDE8DE',
  backgroundCard: '#E8E2D8',
  surface: '#DDD7CC',
  surfaceLight: '#D2CCBF',
  border: '#C8C0B0',
  borderGold: '#C9A84C',
  gold: '#A07830',
  goldLight: '#C9A84C',
  goldDark: '#7A5A20',
  text: '#1A1612',
  textSecondary: '#5A5040',
  textMuted: '#9A9080',
  white: '#FFFFFF',
  danger: '#C0392B',
  overlay: 'rgba(0,0,0,0.3)',
  overlayDark: 'rgba(0,0,0,0.6)',
};

// Read preference at module load time so all imports pick the right palette.
// On toggle, we write to localStorage and reload — no context needed.
const _isLight = (() => {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('messmer_theme') === 'light';
    }
  } catch {}
  return false;
})();

export const Colors = _isLight ? LIGHT_COLORS : DARK_COLORS;

export const isLightMode = _isLight;

export const Typography = {
  fontSerif: 'Georgia',
  fontSans: 'System',
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 28,
    xxxl: 38,
    display: 52,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  full: 999,
};
