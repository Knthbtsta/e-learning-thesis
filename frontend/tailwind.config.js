/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/html/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
    screens: {
      sm: "640px", // Mobile devices
      md: "768px", // Tablets and small desktops
      lg: "1024px", // Desktops
      xl: "1280px", // Large desktops
      "2xl": "1536px", // Extra large desktops
    },
  },

  plugins: [require("preline/plugin"), require("flowbite/plugin")],
});
