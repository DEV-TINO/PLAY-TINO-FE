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
        'light-purple' : '#8F73CF',
        'favorite-title': '#6A3ED2'
      },
      inset: {
        'favorite-vs-right' : '47%',
        '50%' : '50%',
        '55%': '55%',
        'favorite-vs-top': '31.5rem'
      },
      height: {
        'quiz-theme' : '#F113DC',
        'quiz-box' : '#D875FF',
        'progress-bar-dark' : '#6A3ED1',
        'progress-bar-light' : '#EAE1FF',
        'light-purple' : '#8F73CF',
        'modal-background' : '#00000080',
        'correct-modal' : '#58AFF9',
        'wrong-modal' : '#D875FF',
      }
    },
  },
  plugins: [
  ],
}