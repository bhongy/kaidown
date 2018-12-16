import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const ROOT_DIR = path.resolve(__dirname, '..');
const STATIC_DIR = path.resolve(ROOT_DIR, 'static');
const HOMEPAGE_HTML = path.resolve(STATIC_DIR, 'homepage.html');

const Homepage = {
  path: '/',
  bodyStream() {
    return fs.createReadStream(HOMEPAGE_HTML);
  },
};

const app = http.createServer(function handleRequest(req, res) {
  const { url } = req;
  console.log(`[handle request] path: ${url}`);

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
