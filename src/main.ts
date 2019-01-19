import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

import compile from './compiler';

const ROOT_DIR = path.resolve(__dirname, '..');
const STATIC_DIR = path.resolve(ROOT_DIR, 'static');
const HOMEPAGE_HTML = path.resolve(STATIC_DIR, 'homepage.html');
const APP_DIR = path.resolve(ROOT_DIR, 'app');

const Homepage = {
  path: '/',
  entry: path.resolve(APP_DIR, 'Homepage.js'),
  bodyStream() {
    return fs.createReadStream(HOMEPAGE_HTML);
  },
};

const app = http.createServer(async function handleRequest(req, res) {
  const { url = '' } = req;
  console.log(`[handle request] path: ${url}`);

  if (url.endsWith('client.js')) {
    const CLIENT_FILENAME = path.resolve(ROOT_DIR, 'dist', 'Homepage-client.js');
    try {
      const { startTime, endTime } = await compile('Homepage');
      const dur = endTime - startTime;
      console.log(`compilation successful (${dur}ms)`);
      fs.createReadStream(CLIENT_FILENAME).pipe(res);
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.end();
    }
    return undefined;
  }

  if (url !== Homepage.path) {
    res.writeHead(302, { Location: Homepage.path });
    res.end();
    return undefined;
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  Homepage.bodyStream().pipe(res);
  // res.write(Homepage.body)
  // res.end();
  return undefined;
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
