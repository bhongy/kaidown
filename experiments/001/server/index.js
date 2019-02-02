'use strict';

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackClientConfig = require('../webpack/client.dev');
const webpackServerConfig = require('../webpack/server.dev');

const compiler = webpack([webpackClientConfig, webpackServerConfig]);
const app = express();

compiler.hooks.done.tap('debug stats', multiStats => {
  const { stats, hash } = multiStats;
  const [clientStats, serverStats] = stats;
  console.log('============ done ===========');
});

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackClientConfig.output.publicPath,
    stats: { colors: true },
    writeToDisk: true,
  })
);

app.use(webpackHotServerMiddleware(compiler));

app.listen(3000, () => {
  console.log('DevServer is listening on port: 3000');
});
