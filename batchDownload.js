const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 存储多个HTML文件URL的数组，可根据实际情况添加更多地址
const htmlUrls = [
  "http://www.gdcdsy.com/product/700.html",
  "http://www.gdcdsy.com/product/699.html",
  "http://www.gdcdsy.com/product/698.html",
  "http://www.gdcdsy.com/product/697.html",
  "http://www.gdcdsy.com/product/696.html",
  "http://www.gdcdsy.com/product/695.html",
  "http://www.gdcdsy.com/product/694.html",
  "http://www.gdcdsy.com/product/693.html",
  "http://www.gdcdsy.com/product/692.html",
  "http://www.gdcdsy.com/product/691.html",
  "http://www.gdcdsy.com/product/690.html",
  "http://www.gdcdsy.com/product/689.html",
  "http://www.gdcdsy.com/product/688.html",
  "http://www.gdcdsy.com/product/687.html",
  "http://www.gdcdsy.com/product/686.html",
  "http://www.gdcdsy.com/product/685.html",
  "http://www.gdcdsy.com/product/684.html",
  "http://www.gdcdsy.com/product/683.html",
  "http://www.gdcdsy.com/product/682.html",
  "http://www.gdcdsy.com/product/681.html",
  "http://www.gdcdsy.com/product/680.html",
  "http://www.gdcdsy.com/product/679.html",
  "http://www.gdcdsy.com/product/678.html",
  "http://www.gdcdsy.com/product/677.html",
  "http://www.gdcdsy.com/product/676.html",
  "http://www.gdcdsy.com/product/675.html",
  "http://www.gdcdsy.com/product/674.html",
  "http://www.gdcdsy.com/product/721.html",
  "http://www.gdcdsy.com/product/718.html",
  "http://www.gdcdsy.com/product/719.html",
  "http://www.gdcdsy.com/product/716.html",
  "http://www.gdcdsy.com/product/717.html",
  "http://www.gdcdsy.com/product/713.html",
  "http://www.gdcdsy.com/product/715.html",
  "http://www.gdcdsy.com/product/714.html",
  "http://www.gdcdsy.com/product/702.html",
  "http://www.gdcdsy.com/product/712.html",
  "http://www.gdcdsy.com/product/711.html",
  "http://www.gdcdsy.com/product/724.html",
  "http://www.gdcdsy.com/product/704.html",
  "http://www.gdcdsy.com/product/703.html",
  "http://www.gdcdsy.com/product/705.html",
  "http://www.gdcdsy.com/product/706.html",
  "http://www.gdcdsy.com/product/707.html",
  "http://www.gdcdsy.com/product/708.html",
  "http://www.gdcdsy.com/product/709.html",
  "http://www.gdcdsy.com/product/710.html",
  "http://www.gdcdsy.com/news/5/",
  "http://www.gdcdsy.com/news/6/",
  "http://www.gdcdsy.com/news/39.html",
  "http://www.gdcdsy.com/news/41.html",
  "http://www.gdcdsy.com/news/38.html",
  "http://www.gdcdsy.com/news/37.html",
  "http://www.gdcdsy.com/news/36.html",
  "http://www.gdcdsy.com/news/35.html",
  "http://www.gdcdsy.com/news/33.html",
  "http://www.gdcdsy.com/news/32.html",
  "http://www.gdcdsy.com/news/31.html",
  "http://www.gdcdsy.com/news/30.html",
  "http://www.gdcdsy.com/news/29.html",
  "http://www.gdcdsy.com/news/34.html",
  "http://www.gdcdsy.com/news/26.html",
  "http://www.gdcdsy.com/news/27.html",
  "http://www.gdcdsy.com/news/28.html"
];

// 本地保存HTML文件的基础路径，文件名会根据实际HTML页面命名，可按需修改
const htmlBaseSavePath = './downloaded_pages';

// 创建保存的文件夹（如果不存在的话）
if (!fs.existsSync(htmlBaseSavePath)) {
  fs.mkdirSync(htmlBaseSavePath);
}

// 循环处理每个HTML地址
htmlUrls.forEach((htmlUrl) => {
  // 从URL中提取页面名称用于本地保存HTML文件命名（可根据实际情况调整）
  const htmlSavePath = path.join(htmlBaseSavePath, htmlUrl.replace('http://www.gdcdsy.com', ''));

  // 下载HTML文件
  axios({
    method: 'get',
    url: htmlUrl,
    responseType: 'stream'
  })
    .then((response) => {
      const writer = fs.createWriteStream(htmlSavePath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    })
    .catch((error) => {
      console.error(`下载HTML文件（${htmlUrl}）时出错：`, error);
    });
});