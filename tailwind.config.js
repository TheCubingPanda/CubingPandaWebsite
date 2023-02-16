/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./node_modules/flowbite/**/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { "50": "#45a64e", "100": "#45a64e", "200": "#45a64e", "300": "#45a64e", "400": "#45a64e", "500": "#45a64e", "600": "#45a64e", "700": "#45a64e", "800": "#45a64e", "900": "#45a64e" }
      }
    },
  },
  plugins: [require('flowbite/plugin')],
};