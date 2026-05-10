/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        apex: {
          bg: '#f3f7f8',
          accent: '#0f8b8d',
          text: '#123038'
        }
      }
    }
  },
  plugins: []
}
