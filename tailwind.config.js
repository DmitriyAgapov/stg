/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      "2xl": '2rem',
      "3xl": '3rem',
      "4xl": '4rem',
      "5xl": '5rem',
      "6xl": '6rem',
      "7xl": '7rem',
    },
    extend: {
        colors: {
          base: "#191919",
          gray: {
            900: "#434445",
            800: "#374151",
            700: "#4B5563",
            600: "#6B7280",
            500: "#9CA3AF",
            400: "#D1D5DB",
            300: "#F3F4F6",
          },
          white: "#fff"
        }
    },
  },
  plugins: [
      plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.4xl'), fontWeight: 600, textTransform: "uppercase", letterSpacing: '-0.01em' },
        'h2': { fontSize: theme('fontSize.2xl'), fontWeight: 600, textTransform: "uppercase", letterSpacing: '-0.01em' },
        'h3': { fontSize: theme('fontSize.lg'), fontWeight: 600, textTransform: "uppercase", letterSpacing: '-0.01em' },
        'p': { marginTop: "1rem", marginBottom: "1rem"},
        'ul': { marginTop: "1rem", marginBottom: "1rem", paddingLeft: "1.25rem", listStyle: "disc"},
        'li': { marginTop: ".75rem", marginBottom: ".75rem"},
      })
  }),
    nextui({
    prefix: "stg",
    layout: {
      spacingUnit: 4, // in px
      disabledOpacity: ".5", // this value is applied as opacity-[value] when the component is disabled
      dividerWeight: "1px", // h-divider the default height applied to the divider component
      fontSize: {
        tiny: "0.75rem", // text-tiny
        small: "0.875rem", // text-small
        medium: "1rem", // text-medium
        large: "1.125rem", // text-large
        xlarge: "1.5rem", // text-large
        "2xl": "2rem", // text-large
        "3xl": "3rem", // text-large
        "4xl": "4rem", // text-large
        "5xl": "5rem", // text-large
      },
      lineHeight: {
        tiny: "1rem", // text-tiny
        small: "1.25rem", // text-small
        medium: "1.5rem", // text-medium
        large: "1.75rem", // text-large
      },
      radius: {
        small: "8px", // rounded-small
        medium: "12px", // rounded-medium
        large: "14px", // rounded-large
      },
      borderWidth: {
        small: "1px", // border-small
        medium: "2px", // border-medium (default)
        large: "3px", // border-large
      },
    },
    themes: {
      light: {
        // ...
        colors: {
          background: "#FFFFFF", // or DEFAULT
          foreground: "#11181C", // or 50 to 900 DEFAULT
          primary: {
            //... 50 to 900
            foreground: "#FFFFFF",
            DEFAULT: "hsla(216, 85%, 31%, 1)"
          },
          secondary: {
            //... 50 to 900
            foreground: "#FFFFFF",
            DEFAULT: "hsla(224, 18%, 21%, 1)"
          },
          secondary2: "hsla(215, 80%, 37%, 1)",
          secondary3: "hsla(223, 23%, 88%, 1)",
          secondary4: "hsla(2, 100%, 56%, 1)",
          info: "#A0C3FF",
          success: "#42AD2D",
          warning: "#FBC756",
          error: "#E30505",
        },

        fontSize: {
          xs: "0.8125rem",
          sm: "0.875rem",
          base: "1rem",
          lg: "1.125rem",
          xl: "1.5rem",
          '2xl': "2rem",
          '3xl': "3rem",
          '4xl': "4rem"
        },
        "fontFamily": {
          "inter": "Inter"
        },
      },
      dark: {
        colors: {

        }
      }
    }}),
  ],
}
