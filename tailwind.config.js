/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react")
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'dark-yellow': '#EDB307',
        'success': '#80AA50',
        'background': '#D9D9D9',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(),
  ],
    
}

