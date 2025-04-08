module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
    plugins: [
      require('tailwind-scrollbar-hide'),
    ],
  }
  