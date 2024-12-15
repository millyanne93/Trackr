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
        glitterGold: 'rgba(255, 215, 0, 0.7)', // Glitter gold color
        glitterPink: 'rgba(255, 105, 180, 0.7)', // Glitter pink color
        glitterCyan: 'rgba(0, 255, 255, 0.7)', // Glitter cyan color
        glitterRed: 'rgba(255, 20, 147, 0.7)', // Glitter red color
      },
      backgroundImage: {
        'custom-background': "url('./assets/images/background.webp')",
      },
      spacing: {
        'footer-padding': '1rem 0',
      },
      // Adding animation and keyframes here for glitter effect
      animation: {
        glitter: 'glitter 2s infinite linear', // Apply the glitter animation
      },
      keyframes: {
        glitter: {
          '0%': { borderColor: 'rgba(255, 215, 0, 0)', boxShadow: '0 0 10px rgba(255, 215, 0, 0.4)' },
          '50%': { borderColor: 'rgba(255, 215, 0, 1)', boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)' },
          '100%': { borderColor: 'rgba(255, 215, 0, 0)', boxShadow: '0 0 10px rgba(255, 215, 0, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};
