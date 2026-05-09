/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        enterprise: "0 22px 70px rgba(15, 23, 42, 0.08)",
        glass: "0 28px 90px rgba(0, 0, 0, 0.24)"
      }
    }
  },
  plugins: []
};
