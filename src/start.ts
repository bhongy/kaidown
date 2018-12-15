import * as http from 'http';

const app = http.createServer(function handleRequest(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello World</h1>');
  res.end();
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
