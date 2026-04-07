/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ff5c61",
        "primary-container": "#ff5c611a",
        "on-surface": "#0f172a",
        "background-light": "#f8f5f5",
        "background-dark": "#230f0f",
        background: "#f8f5f5",
        tertiary: "#006c4a",
        "tertiary-container": "#00a976",
        "surface-container-high": "#ebe7e7",
        "surface-container-highest": "#e5e1e1",
        "surface-variant": "#f1eeee",
        outline: "#e2e8f0",
        "surface-container-low": "#f8f5f5",
        secondary: "#0f172a",
        surface: "#ffffff",
        "surface-container": "#f1eeee",
        "on-surface-variant": "#475569",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
    },
  },
};
