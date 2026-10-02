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
      },
      fontSize: {
        '2xs': ['0.75rem', { lineHeight: '1.1rem' }],   // 12px for micro tags
        'xs':  ['0.875rem', { lineHeight: '1.35rem' }],  // 14px (was 12px)
        'sm':  ['0.975rem', { lineHeight: '1.45rem' }],  // 15.6px (was 14px)
        'base':['1.08rem', { lineHeight: '1.65rem' }],   // ~17.3px (was 16px)
        'lg':  ['1.25rem', { lineHeight: '1.8rem' }],    // 20px (was 18px)
        'xl':  ['1.45rem', { lineHeight: '2rem' }],     // 23.2px (was 20px)
        '2xl': ['1.8rem', { lineHeight: '2.3rem' }],     // 28.8px (was 24px)
        '3xl': ['2.25rem', { lineHeight: '2.7rem' }],    // 36px (was 30px)
        '4xl': ['2.85rem', { lineHeight: '3.2rem' }],    // ~45.6px (was 36px)
        '5xl': ['3.5rem', { lineHeight: '3.8rem' }],     // 56px
      }
    },
  },
  plugins: [],
}
