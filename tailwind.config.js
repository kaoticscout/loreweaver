/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'DEFAULT': '0 2px 4px rgba(0,0,0,0.1)',
        'lg': '0 2px 6px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0,0,0,0.2)',
        },
        '.text-shadow-lg': {
          'text-shadow': '0 2px 6px rgba(0,0,0,0.4)',
        },
      });
    },
  ],
} 