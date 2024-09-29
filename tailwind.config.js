/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        characterP: '45ch',
      },
      screens: {
        mobile: '480px',
        tablet: '768px',
        desktop: '1024px',
      },
    },
  },
  plugins: [],
}