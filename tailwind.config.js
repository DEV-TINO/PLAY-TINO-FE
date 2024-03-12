/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,vue}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1C0F38',
        'timer-bg': '#FDDCDC', 
        'timer-stop': '#FF8484',
        'timer-start': '#58AFF9',
        'timer-number': '#E4C7C7',
        'quiz-theme' : '#F113DC',
        'quiz-box' : '#D875FF',
        'progress-bar-dark' : '#6A3ED1',
      }
    },
  },
  plugins: [
  ],
}