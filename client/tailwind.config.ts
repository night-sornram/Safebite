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
        primary: {
          purple: "rgb(66, 103, 178)",
        },
        secondary: {
          main: "rgb(18, 32, 35)",
          button: "rgb(85, 173, 155)",
          input: "rgb(239, 239, 239)",
          card: "rgb(217, 217, 217)",
        },
      },
      backgroundImage: {
        chat: "url('/images/ask-chat.svg')",
        suggest: "url('/images/suggest.svg')",
        tracking: "url('/images/tracking.svg')",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },

      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
