/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: "#1e1e1e",
          sidebar: "#333333",
          header: "#252526",
          blue: "#007acc",
          border: "#444444"
        }
      }
    },
  },
  plugins: [],
}
