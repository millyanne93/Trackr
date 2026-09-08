/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ✅ Existing colors (keep these)
        primaryGreen: '#4CAF50',
        darkGreen: '#388E3C',
        lightGreen: '#C8E6C9',
        white: '#FFFFFF',
        gray: '#757575',
        glitterGold: 'rgba(255, 215, 0, 0.7)',
        glitterPink: 'rgba(255, 105, 180, 0.7)',
        glitterCyan: 'rgba(0, 255, 255, 0.7)',
        glitterRed: 'rgba(255, 20, 147, 0.7)',

        // ✅ NEW: Forest color palette
        forest: {
          50: '#EEF5F0',   // section backgrounds
          100: '#DCEAE0',  // hover fills, muted badges
          300: '#9CC4AA',  // borders
          600: '#1E6B45',  // primary buttons, links, active state
          700: '#164F34',  // hover/emphasis, CTA band background
        },

        // ✅ NEW: Ink color palette
        ink: {
          DEFAULT: '#14231C',   // body text — near-black with a green undertone
          muted: '#4B5B53',     // secondary/supporting text
        },
      },
      backgroundImage: {
        'custom-background': "url('./assets/images/background.webp')",
      },
      spacing: {
        'footer-padding': '1rem 0',
      },
      animation: {
        glitter: 'glitter 2s infinite linear',
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
