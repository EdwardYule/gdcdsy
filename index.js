const http = require('http');
const path = require('path');
const url = require('url');
const {
  getFile,
} = require('./tools.js');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const filePath = path.join(__dirname, 'data', pathname);
    getFile(filePath, req, res);
});

const port = 80;
server.listen(port, () => {
    console.log(`静态资源服务器正在监听 ${port} 端口`);
});
