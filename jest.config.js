module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["node_modules/(?!(vexchords)/)"],
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy",
    "\\.css$": require.resolve("./test/style-mock.js"),
    "^electron$": "<rootDir>/__mocks__/electron.ts",
  },
};
