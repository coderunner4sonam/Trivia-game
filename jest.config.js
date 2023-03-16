module.exports = {
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
      "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: ["**/*.test.(js|jsx|ts|tsx)"],
    testEnvironment: "node",
    preset: "ts-jest",
    moduleNameMapper: {
      "^axios$": "<rootDir>/node_modules/axios/dist/axios.min.js",
    },
  };





  