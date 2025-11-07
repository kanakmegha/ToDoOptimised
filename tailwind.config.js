/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { // No 'extend'
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray, // Explicitly included
      red: colors.red,
      green: colors.green,
      primary: { // My custom color
        DEFAULT: '#2563EB',
        // ... other shades 50-950
        600: '#2563EB',
        700: '#1D4ED8',
      },
      secondary: { /* ... custom secondary color ... */ },
    },
     ringOffsetColor: {
        DEFAULT: '#ffffff',
     },
  },
  plugins: [],
};