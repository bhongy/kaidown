import * as path from 'path';
// import { promisify } from 'util';
import * as webpack from 'webpack';

const ROOT_DIR = path.resolve(__dirname, '..');
const APP_DIR = path.resolve(ROOT_DIR, 'app');

const webpackConfig = {
  mode: 'development',
  entry: path.resolve(APP_DIR, 'Homepage.js'),
  output: {
    path: path.resolve(ROOT_DIR, 'dist'),
    filename: 'client.js',
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
};

type WebpackCompilationStats = {
  startTime: number,
  endTime: number,
};

const compiler = webpack(webpackConfig);
// const compile = promisify(compiler.run.bind(compiler));
const compile = async (): Promise<WebpackCompilationStats> => {
  return new Promise((resolve, reject) => {
    compiler.run((err: Error, stats: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
};

export default compile;
