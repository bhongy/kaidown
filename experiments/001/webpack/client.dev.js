'use strict';

const path = require('path');
const {} = require('webpack');

module.exports = {
  name: 'client',
  mode: 'development',
  target: 'web',
  // add sourcemap support to debug in IDE (e.g. vscode)
  devtool: 'cheap-module-eval-source-map',

  entry: path.resolve(__dirname, '../src/clientEntry.js'),
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name]-[contenthash].js',
    chunkFilename: '[name]-[contenthash].js',
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

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      // by default: webpack splitChunks only enabled for on-demand (code-splitted) chunks
      // because it will affect the list of output scripts (and their names)
      // we can enable it if our server can generate html that is based on the output stats
      // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693#defaults
      chunks: 'all',
      // cache group
      // by default:
      // - all modules from `node_modules` are assigned to a cache group called `vendors`
      // - all modules duplicated in at least 2 chunks to a cache group called `default`
      // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693#cache-groups

      cacheGroups: {
        // this is how you disable default cacheGroup
        default: false,
        // Create a `common` chunk, which includes all code shared between entrypoints.
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
};
