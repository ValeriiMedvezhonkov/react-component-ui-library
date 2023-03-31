/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          dark: 'rgb(var(--color-green-dark))',
          base: 'rgb(var(--color-green-base))',
          'base-35': 'rgb(var(--color-green-base-35))',
          light: 'rgb(var(--color-green-light))',
        },
        red: {
          dark: 'rgb(var(--color-red-dark))',
          base: 'rgb(var(--color-red-base))',
          'base-35': 'rgb(var(--color-red-base-35))',
          light: 'rgb(var(--color-red-light))',
        },
        yellow: {
          dark: 'rgb(var(--color-yellow-dark))',
          base: 'rgb(var(--color-yellow-base))',
          'base-35': 'rgb(var(--color-yellow-base-35))',
          light: 'rgb(var(--color-yellow-light))',
        },
        blue: {
          dark: 'rgb(var(--color-blue-dark))',
          base: 'rgb(var(--color-blue-base))',
          'base-35': 'rgb(var(--color-blue-base-35))',
          light: 'rgb(var(--color-blue-light))',
        },
      },
    },
  },
  plugins: [],
}
