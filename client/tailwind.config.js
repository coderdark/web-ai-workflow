/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f3d9a8',
          300: '#eabe6e',
          400: '#e0a040',
          500: '#c47f22',
          600: '#a8651a',
          700: '#8a4e16',
          800: '#6e3c12',
          900: '#542d0e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
