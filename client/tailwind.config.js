/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')



module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "amber": colors.amber,
        "emerald": colors.emerald,
        "red":colors.red,
        "blue":colors.blue,
        "green":colors.green,
        "pink":colors.pink,
        "sky":colors.sky,
        "purple":colors.purple,

      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
