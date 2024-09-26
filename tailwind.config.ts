import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          100: "hsl(var(--clr-neutral-100))",
          200: "hsl(var(--clr-neutral-200))",
          400: "hsl(var(--clr-neutral-400))",
          600: "hsl(var(--clr-neutral-600))",
          800: "hsl(var(--clr-neutral-800))",
          900: "hsl(var(--clr-neutral-900))",
        },
        primary: {
          100: "hsl(var(--clr-primary-100))",
          500: "hsl(var(--clr-primary-500))",
          600: "hsl(var(--clr-primary-600))",
          700: "hsl(var(--clr-primary-700))",
          800: "hsl(var(--clr-primary-800))",
          900: "hsl(var(--clr-primary-900))",
        },
        secondary: {
          500: "hsl(var(--clr-secondary-500))",
          600: "hsl(var(--clr-secondary-600))",
          700: "hsl(var(--clr-secondary-700))",
          800: "hsl(var(--clr-secondary-800))",
          900: "hsl(var(--clr-secondary-900))",
        },
        accent: {
          500: "hsl(var(--clr-accent-500))",
          600: "hsl(var(--clr-accent-600))",
          700: "hsl(var(--clr-accent-700))",
          800: "hsl(var(--clr-accent-800))",
          900: "hsl(var(--clr-accent-900))",
        },
        success: {
          500: "hsl(var(--clr-success-500))",
          600: "hsl(var(--clr-success-600))",
        },
        error: {
          500: "hsl(var(--clr-error-500))",
          600: "hsl(var(--clr-error-600))",
        },
        darkPurple: "hsl(var(--clr-darkPurple))",
      },
    },
  },
};
export default config;
