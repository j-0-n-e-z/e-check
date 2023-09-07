/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-whity': '#e6e6e6',
        whity: '#f2f2f2',
        dark: '#141414',
        danger: {
          0: { DEFAULT: colors.green[100], hover: colors.green[200] },
          1: { DEFAULT: colors.green[300], hover: colors.green[400] },
          2: { DEFAULT: colors.yellow[200], hover: colors.yellow[400] },
          3: { DEFAULT: colors.orange[200], hover: colors.orange[400] },
          4: { DEFAULT: colors.red[400], hover: colors.red[500] },
          5: { DEFAULT: colors.red[600], hover: colors.red[700] }
        }
      },
      backgroundImage: {
        header: 'linear-gradient(45deg,#202020,#3a3a3a)'
      },
      boxShadow: {
        searchResults: '0 1px 3px rgba(0,0,0,0.1)'
      },
      screens: {
        'hover-hover': {
          raw: '(hover:hover) and (pointer: fine)'
        }
      },
      fontFamily: {
        Manrope: ['Manrope', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}
