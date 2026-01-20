/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Estrella", "sans-serif"],
        body: ["Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        background: "#FFFFFF",
        primary: "#5C5C5C",
        muted: "#807e7e",
        black: "#0D0D0D",
      },
      fontSize: {
        // HEADINGS
        hero: [
          "clamp(3rem, 5vw, 5rem)",
          { lineHeight: "1.1", letterSpacing: "0.18em" },
        ],
        h1: [
          "clamp(2.5rem, 4vw, 3.5rem)",
          { lineHeight: "1.15", letterSpacing: "0.18em" },
        ],
        h2: [
          "clamp(2rem, 3vw, 2.5rem)",
          { lineHeight: "1.2", letterSpacing: "0.18em" },
        ],
        h3: [
          "clamp(1.5rem, 2.2vw, 1.875rem)",
          { lineHeight: "1.25", letterSpacing: "0.18em" },
        ],

        // NAVIGATION & MENU
        nav: [
          "clamp(0.9375rem, 1vw, 1rem)",
          { lineHeight: "1.5", letterSpacing: "0.18em" },
        ],
        menu: [
          "clamp(0.875rem, 0.9vw, 0.9375rem)",
          { lineHeight: "1.4", letterSpacing: "0.18em" },
        ],

        // PARAGRAPHS (keep normal spacing for readability)
        paragraph: [
          "clamp(1rem, 1.2vw, 1.125rem)",
          { lineHeight: "1.7", letterSpacing: "0rem" },
        ],
        small: [
          "clamp(0.875rem, 1vw, 0.9375rem)",
          { lineHeight: "1.45", letterSpacing: "0.18em" },
        ],
        // BUTTONS
        button: [
          "clamp(0.9375rem, 1vw, 1rem)",
          { lineHeight: "1.25", letterSpacing: "0.18em" },
        ],
      },
    },
  },
  plugins: [],
};
