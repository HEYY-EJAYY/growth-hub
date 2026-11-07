/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#059669',
          600: '#047857',
          700: '#065f46',
          800: '#064e3b',
          900: '#03120d',
          950: '#020a07',
        },
        ink: {
          DEFAULT: '#10231b',
          soft: '#1f3a30',
          muted: '#4b6357',
        },
        surface: {
          DEFAULT: '#f4f6f5',
          warm: '#eef2f0',
          line: '#dde5e1',
        },
        dark: {
          DEFAULT: '#064e3b',
          deep: '#03120d',
          mid: '#0a3a2c',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Manrope"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        body: ['1.125rem', { lineHeight: '1.6' }],
      },
      maxWidth: {
        measure: '75ch',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flowDash: {
          to: { strokeDashoffset: '-20' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease-out both',
        flowDash: 'flowDash 1.2s linear infinite',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
