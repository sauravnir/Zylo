/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Estrella", "sans-serif"],
        body: ["Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        background: "#e1e1e1",
        muted: "#9b9b9b",
        main: "#2b2b2b",
        border: "#E5E5E5",
        card: "#fafbfc",
        primary: "#0c0c0c",
        secondary: "#2E5BFF",
      },
      fontSize: {
        nav: [
          "0.75rem",
          {
            letterSpacing: "0.18em",
          },
        ],
        menu: [
          "0.8125rem",
          {
            letterSpacing: "0.18em",
          },
        ],
        button: [
          "0.75rem",
          {
            letterSpacing: "0.18em",
          },
        ],
        h1: [
          "clamp(2.5rem, 4vw, 3.25rem)",
          {
            letterSpacing: "0.18em",
          },
        ],
        h2: [
          "clamp(2rem, 3vw, 2.5rem)",
          {
            letterSpacing: "0.18em",
          },
        ],
        h3: [
          "clamp(1.5rem, 2vw, 1.875rem)",
          {
            letterSpacing: "0.18em",
            lineHeight: "2rem",
          },
        ],
        paragraph: [
          "clamp(1rem, 1.2vw, 1.125rem)",
          {
            letterSpacing: "0em",
            lineHeight: "1.1",
          },
        ],
        tiny: [
          "0.625rem",
          {
            letterSpacing: "0.2em",
            fontWeight: "500",
          },
        ],
        xs: [
          "0.6875rem",
          {
            letterSpacing: "0.15em",
          },
        ],
        base: [
          "1rem",
          {
            lineHeight: "1.5",
          },
        ],
        "modal-title": [
          "clamp(1.4rem, 2.5vw, 1.5rem)",
          {
            letterSpacing: "-0.04em",
            lineHeight: "1.1",
          },
        ],
        display: [
          "clamp(4rem, 10vw, 8rem)",
          {
            letterSpacing: "-0.02em",
            lineHeight: "0.9",
          },
        ],
        "display-spaced": [
          "clamp(3rem, 7vw, 5rem)",
          {
            letterSpacing: "0.3em",
            lineHeight: "1.1",
          },
        ],
        "product-title": [
          "0.875rem",
          {
            letterSpacing: "0.18em",
            fontWeight: "500",
          },
        ],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
