'use strict';

const path = require('path');
// const {} = require('webpack');

module.exports = {
  name: 'server',
  mode: 'development',
  target: 'node',

  entry: path.resolve(__dirname, '../server/render.js'),
  output: {
    // REQUIRED: Makes sure to expose ../server/render.js middleware on
    // module.exports so that webpackHotServerMiddleware can call it.
    libraryTarget: 'commonjs2'
  },

  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            // cacheDirectory: !production,
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
