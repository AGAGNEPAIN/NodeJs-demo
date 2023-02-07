const http = require('http');
const fs   = require('fs');

const hostname = '127.0.0.1';
const port     = 3000;

const server = http.createServer();

server.on('request', async (request, response) => {
  if (request.method === 'GET') {
    let code    = 200;
    let content = '';

    switch (request.url) {
      case '/hello':
        content = 'Hello world !';
        break;
      case '/exemple':

        content = fs.readFileSync('./server/index.html', {}, (err, data) => {
          if (err) throw err;
        });
        break;
      default:
        code    = 404;
        content = '404\nOups!';
        break;
    }

    console.log(code, content);
    response.writeHead(code, {'Content-Type': 'text/html; charset=utf-8'});
    response.end(content);
  }
});

const app = server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
