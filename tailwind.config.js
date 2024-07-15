/** @type {import('tailwindcss').Config} */

// reference: https://tailwindcss.com/docs/screens

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: {
          max: '576px'
        },
        md: { max: '768px' },
        lg: { max: '992p' },
        xl: { max: '1280px' },
        '2xl': {
          max: '1536px'
        }
      }
    }
  },
  plugins: []
};
