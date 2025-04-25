/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./layouts/**/*.html", "./content/**/*.md"],
  safelist: [
      // Indigo
      'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'focus:ring-indigo-500',
      // White
      'bg-white', 'hover:bg-gray-50', 'text-gray-800', 'border', 'border-gray-300',
      // Base
      'focus:ring-2', 'focus:ring-offset-2'
    ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
