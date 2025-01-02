// [...new Set(Array.prototype.map.call(document.querySelectorAll('a'), e => e.href))].filter(e => e.includes('www.gdcdsy.com')).map(e => e.split('www.gdcdsy.com')[1])
// const links = [...new Set(Array.prototype.map.call(document.querySelectorAll('a'), e => e.href))]
//     .filter(e => e.includes('www.gdcdsy.com'))
//     .forEach(e => {
//         window.open(e, '_blank');
//     })
// 全局替换 //static201.yun300.cn 为 空
const fs = require('fs');
const path = require('path');
const url = require('url');

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

const _getFile = (filePath, req, res) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
        if (err) return reject(err)
        if (stats.isDirectory()) {
            const indexPath = path.join(filePath, 'index.html');
            readDirectory(indexPath, req, res).catch(reject)
        }else{
            readFile(filePath, req, res).catch(reject)
        }
    })
  });
}

const getFile = (filePath, req, res) => {
  _getFile(filePath, req, res).catch(() => {
    const extname = path.extname(filePath);
    if (extname === '.jpg') {
      // 如果jpg图片找不到，可能是请求了带尺寸的图片，把名字里面关于尺寸的信息去掉，直接返回原图
      const originalPath = getNewImagePath(filePath)
      _getFile(originalPath, req, res).catch(() => {
        notFoundHandler(req, res);
      })
    }else{
      notFoundHandler(req, res);
    }
  })
}

module.exports = {
  getContentType,
  readDirectory,
  readFile,
  notFoundHandler,
  serverErrorHandler,
  getNewImagePath,
  getFile,
};
