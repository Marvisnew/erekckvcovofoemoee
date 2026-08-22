/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#faf6f0", 100: "#f2e8db", 200: "#e4cfb4", 300: "#d3b088",
          400: "#c19365", 500: "#a9743f", 600: "#8f5d31", 700: "#71482a",
          800: "#5c3c27", 900: "#4c3222"
        }
      }
    }
  },
  plugins: []
};
