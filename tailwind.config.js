/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#C3B4B1',
        secondary: '#A53D1B',
        accent: '#A04C2F',
        dark: '#424149',
        darker: '#2B262B',
        light: '#AFCDE1',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        fadeZoomUp: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95) translateY(40px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
      },
      animation: {
        fadeZoomUp: 'fadeZoomUp 1s ease-out forwards',
      },
      
    },
  },
  plugins: [],
};
