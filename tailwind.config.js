module.exports = {
  purge: [],
  theme: {
    aspectRatio: {
      a4: [210, 297],
    },
    extend: {},
  },
  variants: { bgColor: ["group-hover"] },
  plugins: [require("tailwindcss-aspect-ratio")],
};
