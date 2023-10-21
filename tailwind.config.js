/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#570DF8",

          "secondary": "rgb(255, 145, 0)",

        },
      },]
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],

}