/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        rath: {
          ink: "#07130f",
          forest: "#0A5C3D",
          emerald: "#069668",
          mist: "#F5F7F4",
          line: "#DDE7DF"
        }
      },
      boxShadow: {
        enterprise: "0 24px 70px rgba(15, 23, 42, 0.08)",
        lift: "0 18px 48px rgba(15, 23, 42, 0.12)",
        glass: "0 28px 90px rgba(0, 0, 0, 0.24)"
      }
    }
  },
  plugins: []
};
