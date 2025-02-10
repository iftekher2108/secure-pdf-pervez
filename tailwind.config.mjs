/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#005cff",

          "secondary": "#f9a500",

          "accent": "#00d5fb",

          "neutral": "#00090c",

          "base-100": "#1e2237",

          "info": "#0065ff",

          "success": "#00cc75",

          "warning": "#c43b00",

          "error": "#ff828e",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
    require("@tailwindcss/typography"),
  ],
};
