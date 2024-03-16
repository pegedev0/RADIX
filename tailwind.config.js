/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom1': {
          100: '#f2efe5',
          200: '#e3e1d9',
          300: '#c7c8cc'
      },
      fontFamily: {
        'Jomolhari': ['Jomolhari', 'sans-serif']
      }
    }
  },
  plugins: [],
}
}