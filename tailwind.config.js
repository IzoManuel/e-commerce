/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        'bodoni': ['LTCBodoni', 'sans-serif'],
        'walsheim': ['GTWalsheim', 'sans-serif']
      }
    },
  },
  plugins: [],
}

