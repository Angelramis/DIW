/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: { /* Elementos especificos generales reutilizables */
      colors: {
        "action_color": "#fde953"
      },
    },
  },
  plugins: [],
}

