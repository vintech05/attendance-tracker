/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
        xs: '320px',
        sm: '425px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
    },
    // colors: {
    //   'bg-white': '#F5F5F5',
    //   'clr-white': 'ffffff',
    // },
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}