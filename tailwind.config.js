/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'sans': ['M PLUS Rounded 1c', 'sans-serif'],
      },
      spacing: {
        '15': '3.75rem', // 60pxに相当（1rem = 16pxと仮定）
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}