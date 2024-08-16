/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#4CAF50',
        darkGreen: '#388E3C',
        lightGreen: '#C8E6C9',
        white: '#FFFFFF',
        gray: '#757575',
      },
    },
  },
  plugins: [],
};
