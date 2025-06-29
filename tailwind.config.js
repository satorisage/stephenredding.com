/** @type {import('tailwindcss').Config} */
const safelist = require('./tailwind-safelist.json');

module.exports = {
  content: ["./layouts/**/*.html", "./content/**/*.md"],
  safelist,
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
