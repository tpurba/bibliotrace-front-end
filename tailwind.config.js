/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      darkBlue: "#110057",
      lightBlue: "#649cff",
      white: "#ffffff",
      orange: "#fa8804",
      skyBlue: "#669bff",
      black: "#000000",
      purple: "#4a00e2",
      rubyRed: "#e12502",
    },
    extend: {
      fontFamily: {
        rector: ['Rector Sans', 'sans-serif'],
        abc: ['ABC Social', 'cursive'],
      },
      screens: {
        'h-sm': { 'raw': '(min-height: 640px)' },
        'h-md': { 'raw': '(min-height: 768px)' },
        'h-lg': { 'raw': '(min-height: 1024px)' },
        'h-xl': { 'raw': '(min-height: 1280px)' },
        'h-2xl': { 'raw': '(min-height: 1536px)' },
        'h-3xl': { 'raw': '(min-height: 1792px)' },
      }
    },
  },
  plugins: [],
};
