import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // Primary - Warm Gold/Saffron (Islamic Cultural)
      primary: {
        50: '#fffbf0',
        100: '#fff7e6',
        200: '#ffecc0',
        300: '#ffe0a0',
        400: '#ffd966',
        500: '#ffc933',
        600: '#e6b300',
        700: '#cc9900',
        800: '#997300',
        900: '#664d00',
      },
      // Neutral - Warm Grays
      neutral: {
        50: '#fafaf9',
        100: '#f5f5f3',
        200: '#ede8e3',
        300: '#ddd4cc',
        400: '#c4b5a0',
        500: '#a8957f',
        600: '#8b7666',
        700: '#6d5e52',
        800: '#4a3f39',
        900: '#2d2620',
      },
      // Success - Emerald
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#145231',
      },
      // Warning - Amber
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      // Error - Rose
      error: {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda29b',
        400: '#f97066',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be185d',
        800: '#9d174d',
        900: '#831843',
      },
      // Standard colors
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      '2xl': '32px',
      '3xl': '48px',
      '4xl': '64px',
    },
    borderRadius: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
      full: '9999px',
    },
    boxShadow: {
      xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    transitionDuration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
    },
    animation: {
      fadeIn: 'fadeIn 200ms ease-in-out',
      slideDown: 'slideDown 300ms ease-out',
    },
    keyframes: {
      fadeIn: {
        from: { opacity: '0' },
        to: { opacity: '1' },
      },
      slideDown: {
        from: {
          opacity: '0',
          transform: 'translateY(-10px)',
        },
        to: {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
