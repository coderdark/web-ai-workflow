/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body':         '#cbd5e1',
            '--tw-prose-headings':     '#f1f5f9',
            '--tw-prose-lead':         '#94a3b8',
            '--tw-prose-links':        '#818cf8',
            '--tw-prose-bold':         '#f1f5f9',
            '--tw-prose-counters':     '#94a3b8',
            '--tw-prose-bullets':      '#64748b',
            '--tw-prose-hr':           '#334155',
            '--tw-prose-quotes':       '#cbd5e1',
            '--tw-prose-quote-borders':'#4f46e5',
            '--tw-prose-captions':     '#94a3b8',
            '--tw-prose-code':         '#a5b4fc',
            '--tw-prose-pre-code':     '#cbd5e1',
            '--tw-prose-pre-bg':       '#0f172a',
            '--tw-prose-th-borders':   '#334155',
            '--tw-prose-td-borders':   '#1e293b',
            lineHeight: '1.85',
            p:  { marginTop: '1.25em', marginBottom: '1.25em' },
            li: { marginTop: '0.4em',  marginBottom: '0.4em' },
            'h2,h3,h4': { letterSpacing: '-0.01em' },
            table: { fontSize: '0.9em' },
            code: { fontWeight: '500' },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
          },
        },
      },
    },
  },
  plugins: [typography],
};
