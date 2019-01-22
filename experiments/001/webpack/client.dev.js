'use strict';

const path = require('path');
const {} = require('webpack');

module.exports = {
  name: 'client',
  mode: 'development',
  target: 'web',

  entry: path.resolve(__dirname, '../src/clientEntry.js'),
  output: {
    // REQUIRED: file and chunk names should match
    filename: '[name].js',
    chunkFilename: '[name].js',
    // REQUIRED: where to write files to
    path: path.resolve(__dirname, '../dist/client'),
    // REQUIRED: where files will be served from
    publicPath: '/static/'
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
