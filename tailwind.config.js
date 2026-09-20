/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deheiyya: {
          black: '#000000',
          red: '#A50100',
          cream: '#EDEBDE',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Montserrat', 'sans-serif'],
        wordmark: ['AdvertisingBold', 'serif'],
        'arabic-display': ['Noto Naskh Arabic', 'sans-serif'],
        'arabic-body': ['Noto Kufi Arabic', 'sans-serif'],
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
