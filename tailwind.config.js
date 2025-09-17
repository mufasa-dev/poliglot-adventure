/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,svelte,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
        },
        text: {
          primary: "var(--text-primary)",
        },
        accent: "var(--accent)",
        btn: {
          primary: "var(--btn-primary-bg)",
          "primary-text": "var(--btn-primary-text)",
          "primary-hover": "var(--btn-primary-hover)",
          secondary: "var(--btn-secondary-bg)",
          "secondary-text": "var(--btn-secondary-text)",
          "secondary-hover": "var(--btn-secondary-hover)",
        },
      },
    },
  },
  plugins: [],
};
