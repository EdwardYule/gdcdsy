const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const notFoundHandler = (req, res) => {
    res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    res.write('<html><body><h1>404 页面未找到</h1></body></html>');
    res.end();
}

const serverErrorHandler = (req, res) => {
    res.writeHead(500, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    res.write('<html><body><h1>500 服务器错误</h1></body></html>');
    res.end();
}

const getNewImagePath = (filePath) => {
    return filePath.replace(/\.jpg_(\d+)xaf\.jpg/, '.jpg');
}

const readDirectory = (filePath, req, res) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (readErr, data) => {
        if (readErr) {
            reject(readErr);
            return;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.write(data);
        res.end();
        resolve(data);
    });
  });
}

const readFile = (filePath, req, res) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
            reject(readErr);
            return;
        }
        const extname = path.extname(filePath);
        res.writeHead(200, {
            'Content-Type': getContentType(extname)
        });
        res.write(data);
        res.end();
        resolve(data);
    });
  });
}

const getContentType = (extname) => {
  const contentTypeMap = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      // 可以根据需要继续添加更多文件类型对应的Content-Type
  };
  const contentType = contentTypeMap[extname] || 'application/octet-stream';
  return contentType;
}

const reGetFile = (filePath, req, res) => {
  // if (extname === '.jpg') {
  // // 如果jpg图片找不到，可能是请求了带尺寸的图片，把名字里面关于尺寸的信息去掉，直接返回原图
  //   const originalPath = getNewImagePath(filePath)
  //   fs.stat(originalPath, (originalErr, originalStats) => {
  //       if (originalErr) {
  //           notFoundHandler(req, res);
  //           return;
  //       }
  //       serverErrorHandler(req, res);
  //       return;
  //       fs.readFile(originalPath, (readErr, data) => {
  //           console.log(readErr, data);
  //           if (readErr) {
  //               serverErrorHandler(req, res);
  //               return;
  //           }
  //           res.write(data);
  //           res.end();
  //       });
  //   });
  // }
}

const getFile = (filePath, req, res) => {
  fs.stat(filePath, (err, stats) => {
      if (err) {
          notFoundHandler(req, res);
          return;
      }
      if (stats.isDirectory()) {
          const indexPath = path.join(filePath, 'index.html');
          readDirectory(indexPath, req, res).catch(() => {
            notFoundHandler(req, res);
          })
      }else{
          readFile(filePath, req, res).catch(() => {
            serverErrorHandler(req, res);
            return;
          })
      }
  })
}

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
