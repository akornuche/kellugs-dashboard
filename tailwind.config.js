/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#6C4CF5',
          dark: '#5636D8',
          light: '#EDE9FE',
        },
        ink: {
          DEFAULT: '#111114',
          soft: '#26262b',
        },
        gray: {
          900: '#18181b',
          700: '#52525b',
          500: '#8b8b93',
          300: '#e4e4e9',
          100: '#f2f2f5',
        },
      },
    },
  },
  plugins: [],
}
