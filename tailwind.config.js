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
          50:  '#EAF2FA',
          100: '#D5E6F5',
          200: '#ABCCEA',
          300: '#81B2DF',
          400: '#5798D4',
          500: '#2E86C1',
          600: '#1A5276',
          700: '#154261',
          800: '#0F314A',
          900: '#0A2033',
        },
        accent: {
          50:  '#FEF9EC',
          100: '#FDF3D0',
          200: '#FAE299',
          300: '#F7CE62',
          400: '#F4BB2B',
          500: '#F39C12',
          600: '#D4890F',
          700: '#B5760D',
          800: '#96630A',
          900: '#775007',
        },
        success: {
          50:  '#E9F7EF',
          500: '#1E8449',
          700: '#196038',
        },
        gov: {
          blue:   '#1A5276',
          saffron:'#F39C12',
          green:  '#1E8449',
          white:  '#FFFFFF',
          light:  '#F8F9FA',
          border: '#DEE2E6',
          muted:  '#6C757D',
          text:   '#212529',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px 0 rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px 0 rgba(0,0,0,0.12)',
        panel: '0 2px 8px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl2: '1rem',
      }
    },
  },
  plugins: [],
}
