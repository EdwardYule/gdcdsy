const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const filePath = path.join(__dirname, 'data', pathname);

    // 根据请求的路径去查找对应的文件是否存在
    fs.stat(filePath, (err, stats) => {
        if (err) {
            // 文件不存在，返回404状态码及相应提示信息
            res.writeHead(404, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.write('<html><body><h1>404 页面未找到</h1></body></html>');
            res.end();
            return;
        }

        if (stats.isDirectory()) {
            // 如果是目录，默认查找目录下的index.html文件（可根据实际情况调整）
            const indexPath = path.join(filePath, 'index.html');
            fs.readFile(indexPath, 'utf8', (readErr, data) => {
                if (readErr) {
                    // 如果index.html不存在，返回404状态码及相应提示信息
                    res.writeHead(404, {
                        'Content-Type': 'text/html; charset=utf-8'
                    });
                    res.write('<html><body><h1>404 页面未找到</h1></body></html>');
                    res.end();
                    return;
                }
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8'
                });
                res.write(data);
                res.end();
            });
        } else {
            const extname = path.extname(filePath);
            const contentTypeMap = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'text/javascript',
                '.jpg': 'image/jpeg',
                '.png': 'image/png',
                // 可以根据需要继续添加更多文件类型对应的Content-Type
            };
            const contentType = contentTypeMap[extname] || 'application/octet-stream';
            res.writeHead(200, {
                'Content-Type': contentType
            });

            // 读取文件内容并返回给客户端
            fs.readFile(filePath, (readErr, data) => {
                if (readErr) {
                    res.writeHead(500, {
                        'Content-Type': 'text/html; charset=utf-8'
                    });
                    res.write('<html><body><h1>500 服务器内部错误</h1></body></html>');
                    res.end();
                    return;
                }
                res.write(data);
                res.end();
            });
        }
    });
});

const port = 80;
server.listen(port, () => {
    console.log(`静态资源服务器正在监听 ${port} 端口`);
});