import * as path from 'path';
import * as webpack from 'webpack';

const ROOT_DIR = path.resolve(__dirname, '..');
const APP_DIR = path.resolve(ROOT_DIR, 'app');
const webpackConfig = (page: string): webpack.Configuration => ({
  name: 'client',
  mode: 'development',
  entry: path.resolve(APP_DIR, page),
  output: {
    path: path.resolve(ROOT_DIR, 'dist'),
    filename: `${page}-client.js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // this is explicit of what babel config to use
          // rather than implicit presence of .babelrc
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
});

type WebpackCompilationStats = {
  startTime: number;
  endTime: number;
};

const compile = async (page: string): Promise<WebpackCompilationStats> => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig(page), (err: Error, stats: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
};

export default compile;
