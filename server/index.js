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
        sendResponse(response, code, 'Hello world !');
        break;
      case '/exemple':
        console.log('1 - Before no-blocking function');

        fs.readFile('./server/index.html', {}, (err, data) => {
          if (err) throw err;
          sendResponse(response, code, data);

          setTimeout(() => {
            console.log('5 - Async task end');
          }, 2000)
        });

        console.log('2 - After no-blocking function');
        break;
      default:
          sendResponse(response, 404, '404\nOups!');
        break;
    }

    console.log('3 - After switch case');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const sendResponse = (response, code, content) => {
  response.writeHead(code, {'Content-Type': 'text/html; charset=utf-8'});
  response.end(content);
  console.log('4 - Response send');
};