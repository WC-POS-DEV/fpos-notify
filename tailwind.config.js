module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
        "diamond-sm": "3.125rem",
        "diamond-lg": "6.25rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")({ strategy: "class" })],
};
