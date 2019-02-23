/**
 * Server Entry point to server-render React app
 * As it is the entry point, from this module on, all modules are bundled by
 * webpack and traspiled by babel.
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/components/App.js';

// `clientStats` is already the `.toJson`ed version
export default ({ clientStats }) => {
  // console.log(clientStats);
  const { publicPath } = clientStats
  // https://github.com/webpack/webpack/issues/6598#issuecomment-368849553
  const { assets } = clientStats.entrypoints.main;
  const assetsScripts = assets.map(name => `<script src="${publicPath}${name}"></script>`);
  // render is different for each compilation (different stats)
  // in dev this changes anytime we rebuild client bundle
  // in prod this change per build and we create the closure only once at runtime
  return function render(req, res) {
    console.log(`render request: ${req.url}`);
    res.statusCode = 200;
    res.write(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>App</title>
      </head>
      <body>
        <div id="root">${renderToString(<App />)}</div>
        ${assetsScripts.join('')}
      </body>
      </html>`
    );
    res.end();
  };
};
