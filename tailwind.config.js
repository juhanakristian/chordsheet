module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    aspectRatio: {
      a4: [210, 297],
      square: [1, 1],
    },
    extend: {
      boxShadow: {
        button: "0 5px 0 rgba(1, 0, 0, 1)",
      },
      // gridColumn: {
      //   "span-xs": ""
      // }
    },
    fontSize: {
      xxs: "0.5rem",
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
  },
  // variants: {
  //   extend: {
  //     backgroundColor: ["group-hover", "active", "hover"],
  //     textColor: ["group-hover"],
  //     fontSize: ["hover", "active"],
  //     padding: ["active"],
  //   },
  // },
  plugins: [require("tailwindcss-aspect-ratio")],
};
