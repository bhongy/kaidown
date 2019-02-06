'use strict';

const path = require('path');
// const {} = require('webpack');

module.exports = {
  name: 'server',
  mode: 'development',
  target: 'node',
  // add sourcemap support to debug in IDE (e.g. vscode)
  devtool: 'cheap-module-eval-source-map',

  entry: path.resolve(__dirname, '../server/render.js'),
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    // expose the returned factory from render.js (bundled) via module.exports
    // so that index.js (currently, webpackHotServerMiddleware) can "require" it
    libraryTarget: 'commonjs2',
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
            presets: [
              ['@babel/preset-env', { targets: { node: '8' } }],
              '@babel/preset-react',
            ],
            plugins: ['@babel/plugin-syntax-dynamic-import'],
          },
        },
      },
    ],
  },
};
