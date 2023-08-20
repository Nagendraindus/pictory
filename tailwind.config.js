/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        squarePeg:["'Tektur', cursive"]
      },
      colors:{
        primary: {
          main:"#4477CE",
          light:"#982176",
          veryLight:"#9BABB8",
          dark:"#3E001F",
          contrastText:"#FFE5AD",
        }
      }
    },
  },
  plugins: [],
}
