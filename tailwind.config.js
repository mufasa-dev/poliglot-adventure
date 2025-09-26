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
        input: {
          bg: "var(--input-bg)",
          border: "var(--input-border)",
          text: "var(--input-text)",
          placeholder: "var(--input-placeholder)",
          focus: "var(--input-focus)",
        },
        accent: "var(--accent)",
        btn: {
          primary: "var(--btn-primary-bg)",
          "primary-text": "var(--btn-primary-text)",
          "primary-hover": "var(--btn-primary-hover)",
          secondary: "var(--btn-secondary-bg)",
          "secondary-text": "var(--btn-secondary-text)",
          "secondary-hover": "var(--btn-secondary-hover)",
          success: "var(--btn-success)",
          "success-text": "var(--btn-success-text)",
          "success-hover": "var(--btn-success-hover)",
          warning: "var(--btn-warning)",
          "warning-text": "var(--btn-warning-text)",
          "warning-hover": "var(--btn-warning-hover)",
        },
      },
    },
  },
  plugins: [],
};
