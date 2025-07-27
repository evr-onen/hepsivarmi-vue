/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./domains/**/components/**/*.{js,vue,ts}",
    "./domains/**/layouts/**/*.vue",
    "./domains/**/pages/**/*.vue",
    "./domains/**/plugins/**/*.{js,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}