/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,vue}",
    "./node_modules/flowbite/**/*.js"
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
        'favorite-title': '#6A3ED2',
        'quiz-theme' : '#F113DC',
        'quiz-box' : '#D875FF',
        'progress-bar-dark' : '#6A3ED1',
        'progress-bar-light' : '#EAE1FF',
        'light-purple' : '#8F73CF',
        'modal-background' : '#00000080',
        'correct-modal' : '#58AFF9',
        'wrong-modal' : '#F113DC',
        'favorite-theme': '#6A3ED2',
        'correct-modal' : '#58AFF9',
        'second-prize' : '#E854ED',
        'sort-type' : '#ECBDFF',
      },
      width: {
        'favorite-content-width' : '540px'
      },
      height: {
        'favorite-content-height' : '540px'
      },
    },
    borderWidth: {
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '5': '5px',
      '8': '8px',
      '16': '16px',
      '24': '24px'
    },
    fontSize: {
      'xs': '0.75rem',
      'sm': '0.8rem',
      'base': '1rem',
      'xl': '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
      'favortire-default-title': '0.625rem'
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}