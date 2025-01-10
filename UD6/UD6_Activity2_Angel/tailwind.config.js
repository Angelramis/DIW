/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: { /* Elementos especificos generales reutilizables */
      colors: {
        "colour_black": "#0e0e0e",
        "colour_orange_dark": "#b96a00",
        "colour_white": "#f0f0f0",
        "colour_yellow": "#FFE602"
      },
      fontSize: {
        "14": "14px",
        "15": "15px",
        "1": "1rem",
        "1.2": "1.2rem",
        "20": "20px",
        "30": "30px",
      },
      borderWidth: {
        "1": "1px",
      },
      boxShadow: {
        "standard": "0 0 3px 0 #0e0e0e",
      },
      fontFamily: {
        "standard": "Arial",
      },
      maxWidth: {
        "70vW": "70vw",
        "90vW": "90vw",
        "700": "700px",
      },
      backgroundImage: {
        "paper": 'url("../../assets/paper.jpg")',
      },
      borderRadius: {
        "10": "10px",
      },

    },
  },
  plugins: [],
}

