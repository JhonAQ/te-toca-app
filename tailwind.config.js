/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0426",
        backgroundLight: "#1F0D5C",
        primary: "#321695",
        text: "#7379DD",
        lightGray: "#E6E6E6",
      }
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
}