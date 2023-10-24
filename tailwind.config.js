/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
          xs: '320px',
          sm: '425px',
          md: '768px',
          lg: '976px',
          xl: '1440px',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        neue: ['Oswald' , 'sans-serif'],
      },
    },
    },
  plugins: [],
}