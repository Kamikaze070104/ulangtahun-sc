/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff90e8', // Pink
          50: '#fff0f9',
          100: '#ffd6f5',
          200: '#ffb3ef',
          300: '#ff90e8',
          400: '#ff5cde',
          500: '#ff2ed4',
          600: '#eb00bc',
          700: '#c20098',
          800: '#a30080',
          900: '#850069',
        },
        secondary: {
          DEFAULT: '#ffc900', // Yellow
          50: '#fffce5',
          100: '#fff5b2',
          200: '#ffef7f',
          300: '#ffe84c',
          400: '#ffe21a',
          500: '#ffc900',
          600: '#cc9e00',
          700: '#997400',
          800: '#664d00',
          900: '#332700',
        },
        accent: {
          DEFAULT: '#00e5ff', // Cyan
          50: '#e5fdff',
          100: '#b2f9ff',
          200: '#7ff6ff',
          300: '#4cf2ff',
          400: '#1aeeff',
          500: '#00e5ff',
          600: '#00b6cc',
          700: '#008999',
          800: '#005b66',
          900: '#002e33',
        },
        dark: '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px rgba(0,0,0,1)',
        'neo-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'neo-xl': '12px 12px 0px 0px rgba(0,0,0,1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-neo': 'bounceNeo 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceNeo: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
