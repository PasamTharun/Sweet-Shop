/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        purple: {
          50: '#f8fafc',
          100: '#f1f5f9',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        pink: {
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        }
      },
      boxShadow: {
        'glass': '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
