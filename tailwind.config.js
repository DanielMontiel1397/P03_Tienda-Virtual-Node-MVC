import forms from '@tailwindcss/forms'
import flowbite from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug', "./node_modules/flowbite/**/*.js"],
  
  theme: {
    extend: {},
  },
  plugins: [
    flowbite,
  ],
}

