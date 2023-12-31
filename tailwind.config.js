module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.5rem'
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}