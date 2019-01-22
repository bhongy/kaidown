/**
 * Server Entry point to server-render React app
 * As it is the entry point, from this module on, all modules are bundled by
 * webpack and traspiled by babel.
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/components/App.js';

function render(req, res) {
  res.statusCode = 200;
  res.write(
    `<!DOCTYPE html>
    <html>
    <head>
      <title>App</title>
    </head>
    <body>
      <div id="root">${renderToString(<App />)}</div>
      <script src="/static/main.js"></script>
    </body>
    </html>`
  );
  res.end();
}

export default ({ clientStats }) => {
  // debugger;
  return render;
};
