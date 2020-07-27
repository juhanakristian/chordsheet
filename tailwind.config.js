module.exports = {
  purge: [],
  theme: {
    aspectRatio: {
      a4: [210, 297],
      square: [1, 1],
    },
    extend: {
      // gridColumn: {
      //   "span-xs": ""
      // }
    },
  },
  variants: { bgColor: ["group-hover"] },
  plugins: [require("tailwindcss-aspect-ratio")],
};
