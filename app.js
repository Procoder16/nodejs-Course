const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.headers, req.method);
});

server.listen(5000);