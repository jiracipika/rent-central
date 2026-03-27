// ── Rent Central Design System ──
// Apple-inspired design tokens for consistent UI

export const colors = {
  // Brand
  primary: '#007AFF',
  primaryLight: '#E3F2FF',
  primaryDark: '#0056CC',
  
  // Semantic
  accent: '#34C759',
  accentLight: '#E8F9ED',
  error: '#FF3B30',
  errorLight: '#FFE5E3',
  warning: '#FF9500',
  warningLight: '#FFF4E0',
  success: '#34C759',
  successLight: '#E8F9ED',
  info: '#5AC8FA',
  infoLight: '#E5F6FF',

  // Backgrounds (Apple HIG)
  background: '#F2F2F7',
  card: '#FFFFFF',
  cardElevated: '#FFFFFF',
  groupedBackground: '#F2F2F7',
  groupedSecondary: '#FFFFFF',

  // Text
  text: '#000000',
  textPrimary: '#000000',
  textSecondary: '#3C3C43',
  textTertiary: '#8E8E93',
  textPlaceholder: '#C7C7CC',
  textQuaternary: '#D1D1D6',
  
  // Legacy aliases
  textMuted: '#8E8E93',

  // Borders & Separators
  border: '#C6C6C8',
  borderLight: '#E5E5EA',
  separator: 'rgba(60,60,67,0.29)',
  separatorOpaque: '#C6C6C8',
  
  // Fills (Apple system fills)
  fill: 'rgba(120,120,128,0.2)',
  fillSecondary: 'rgba(120,120,128,0.16)',
  fillTertiary: 'rgba(118,118,128,0.12)',
  
  // Labels
  label: '#000000',
  labelSecondary: 'rgba(60,60,67,0.6)',
  labelTertiary: 'rgba(60,60,67,0.3)',
  
  // Tab bar
  tabBar: 'rgba(249,249,249,0.94)',
  tabBarInactive: '#8E8E93',
  
  // Glass
  glass: 'rgba(255,255,255,0.72)',
  glassDark: 'rgba(255,255,255,0.85)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const radius = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 9999,
};

export const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
};

// Apple HIG Typography Scale
export const typography = {
  largeTitle: { fontSize: 34, fontWeight: '700' as const, letterSpacing: 0.37, lineHeight: 41 },
  title1: { fontSize: 28, fontWeight: '700' as const, letterSpacing: 0.36, lineHeight: 34 },
  title2: { fontSize: 22, fontWeight: '700' as const, letterSpacing: 0.35, lineHeight: 28 },
  title3: { fontSize: 20, fontWeight: '600' as const, letterSpacing: 0.38, lineHeight: 25 },
  headline: { fontSize: 17, fontWeight: '600' as const, letterSpacing: -0.41, lineHeight: 22 },
  body: { fontSize: 17, fontWeight: '400' as const, letterSpacing: -0.41, lineHeight: 22 },
  callout: { fontSize: 16, fontWeight: '400' as const, letterSpacing: -0.32, lineHeight: 21 },
  subheadline: { fontSize: 15, fontWeight: '400' as const, letterSpacing: -0.24, lineHeight: 20 },
  footnote: { fontSize: 13, fontWeight: '400' as const, letterSpacing: -0.08, lineHeight: 18 },
  caption1: { fontSize: 12, fontWeight: '400' as const, letterSpacing: 0, lineHeight: 16 },
  caption2: { fontSize: 11, fontWeight: '400' as const, letterSpacing: 0.07, lineHeight: 13 },
};

// Animation presets
export const animation = {
  spring: { damping: 20, stiffness: 300, mass: 0.8 },
  springGentle: { damping: 25, stiffness: 200, mass: 1 },
  timing: { duration: 250 },
  timingSlow: { duration: 400 },
};
