/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kash: {
          bg: '#000000',
          surface: '#0B0A0C',
          card: '#131015',
          wine: '#24131C',
          burgundy: '#3A1724',
          ivory: '#FFF8E7',
          champagne: '#F5E6C8',
          sand: '#D9C5A0',
          violet: '#7C3AED',
          cyan: '#06B6D4',
          muted: '#8A7A6E',
        },
        brand: {
          maroon: '#380D12',
          noir: '#0D0D0D',
          cherry: '#8B0E1A',
          cream: '#F7F1E8',
          grey: '#8A7A6E',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        body: ['Inter', 'Geist', 'Manrope', 'sans-serif'],
        arabic: ['IBM Plex Sans Arabic', 'Noto Kufi Arabic', 'sans-serif'],
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
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
