import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-brown": "#5c4033",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#4b6c56",
          "primary-focus": "#48604f",
          "primary-content": "#ffffff",

          secondary: "#8ea57e",
          "secondary-focus": "#759263",
          "secondary-content": "#24321a",

          accent: "#7aae9c",
          "accent-focus": "#6a9586",
          "accent-content": "#322020",

          neutral: "#5c5757",
          "neutral-focus": "#272525",
          "neutral-content": "#e9e7e7",

          "base-100": "#e8dac5",
          "base-200": "#d1cccc",
          "base-300": "#b9b1b1",
          "base-content": "#100f0f",

          info: "#0e5b9a",
          success: "#009485",
          warning: "#ce9746",
          error: "#da5d5d",

          "--rounded-box": "1rem",
          "--rounded-btn": ".5rem",
          "--rounded-badge": "1.9rem",

          "--animation-btn": ".25s",
          "--animation-input": ".2s",

          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
};
export default config;
