/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Albert Sans', 'sans-serif'],
      },
      colors: {
        'primary': {
          DEFAULT: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
          light: 'rgb(var(--color-primary-rgb) / 0.1)',
          medium: 'rgb(var(--color-primary-rgb) / 0.5)',
          dark: 'rgb(var(--color-primary-rgb) / 0.9)',
        },
        'secondary': {
          DEFAULT: 'rgb(var(--color-secondary-rgb) / <alpha-value>)',
          light: 'rgb(var(--color-secondary-rgb) / 0.1)',
          medium: 'rgb(var(--color-secondary-rgb) / 0.5)',
          dark: 'rgb(var(--color-secondary-rgb) / 0.9)',
        },
        'accent': {
          DEFAULT: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
          light: 'rgb(var(--color-accent-rgb) / 0.1)',
          medium: 'rgb(var(--color-accent-rgb) / 0.5)',
          dark: 'rgb(var(--color-accent-rgb) / 0.9)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'),],
} satisfies Config
