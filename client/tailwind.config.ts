import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@ant-design/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {},
        secondary: {
          main: "rgb(18, 32, 35)",
          button: "rgb(85, 173, 155)",
          input: "rgb(239, 239, 239)",
          card: "rgb(217, 217, 217)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
