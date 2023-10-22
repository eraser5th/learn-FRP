const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.ts',
    ex1: './src/ex1/index.ts',
    ex2: './src/ex2/index.ts',
    ex3: './src/ex3/index.ts',
    ex4: './src/ex4/index.ts',
    airline: './src/airline/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true,
    },
  },
};
