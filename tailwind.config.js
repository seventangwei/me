/** @type {import('tailwindcss').Config} */

console.log("=======")
export default {
  corePlugins: {
    preflight: false,
  },
  // content: ['./src/**/*.{js,jsx,ts,tsx}'],
  content: ['./docs/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
};
