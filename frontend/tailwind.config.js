export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // DaisyUI plugin
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', /* For Internet Explorer */
          'scrollbar-width': 'none',    /* For Firefox */
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none', /* For Chrome, Safari, Opera */
        },
      })
    },
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ffffff", // Set primary background color
          "base-100": "#ffffff", // Ensure the base color is white
        },
      },
    ],
  },
};
