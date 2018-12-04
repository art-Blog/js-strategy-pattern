module.exports = function(wallaby) {
  // npm install @babel/core
  return {
    files: ["src/**/*.js"],
    tests: ["test/**/*.test.js"],
    compilers: {
      "**/*.js": wallaby.compilers.babel({ babel: require("@babel/core") })
    },
    testframework: "mocha",
    env: {
      type: "node"
    }
  };
};
