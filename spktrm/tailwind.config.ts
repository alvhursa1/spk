import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        broone: ['Broone', 'sans-serif'],
        marcellus: ['Marcellus', 'serif'],
        'satoshi-light': ['Satoshi-Light', 'sans-serif'],
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out',
        slideRight: 'slideRight 0.5s ease-out',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['group-hover'],
      scale: ['group-hover'],
    },
  },
  plugins: [],
}

export default config;