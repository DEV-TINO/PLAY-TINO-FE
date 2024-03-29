/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,vue}"
  ],
  theme: {
    extend: {
      colors: {
        'priamry': '#1C0F38',
        'timer-bg': '#FDDCDC', 
        'timer-stop': '#FF8484',
        'timer-start': '#58AFF9',
        'timer-number': '#E4C7C7',
        'lightPurple': '#8F73CF',
        'favorite-title': '#6A3ED2'
      },
      inset: {
        '47%' : '47%',
        '55%': '55%'
      }
    },
  },
  plugins: [
  ],
}