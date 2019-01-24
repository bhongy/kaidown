'use strict';

const path = require('path');
const {} = require('webpack');

module.exports = {
  name: 'client',
  mode: 'development',
  target: 'web',

  entry: path.resolve(__dirname, '../src/clientEntry.js'),
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    // required for webpackDevServer to serve the bundles from
    publicPath: '/static/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            // allows babel to transpile `import()` syntax
            // primarily use for webpack code splitting
            plugins: ['@babel/plugin-syntax-dynamic-import'],
          },
        },
      },
    ],
  },
};
