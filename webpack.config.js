const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.ts",
    ex1: "./src/applications/ex1/index.ts",
    ex2: "./src/applications/ex2/index.ts",
    airline: "./src/applications/airline/index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      watch: true,
    },
  },
};
