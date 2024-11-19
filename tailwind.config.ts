import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "min-h-52",
    "min-h-56",
    "min-h-60",
    "min-h-64",
    "min-h-72",
    "min-h-80",
  ],
  theme: {
    extend: {},
  },

  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
