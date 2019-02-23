'use strict';

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackClientConfig = require('../webpack/client.dev');
const webpackServerConfig = require('../webpack/server.dev');

const multiCompiler = webpack([webpackClientConfig, webpackServerConfig]);
const app = express();

multiCompiler.hooks.done.tap('debug stats', multiStats => {
  const { stats, hash } = multiStats;
  const [clientStats, serverStats] = stats;
  console.log('============ done ===========');
});

app.use(
  webpackDevMiddleware(multiCompiler, {
    stats: { colors: true },
    writeToDisk: true,
  })
);

// const [clientCompiler] = multiCompiler.compilers;
// app.use(webpackHotMiddleware(clientCompiler));

// needs to be mounted immediately after webpack-dev-middleware
// and webpack-hot-middleware < so client hmr requests are handled correctly
app.use(webpackHotServerMiddleware(multiCompiler));

app.listen(3000, () => {
  console.log('DevServer is listening on port: 3000');
});
