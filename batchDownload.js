const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// 存储多个HTML文件URL的数组，可根据实际情况添加更多地址
const htmlUrls = [
    'http://www.gdcdsy.com/product/707.html',
    // 'https://example.com/page2.html',
    // 可以继续添加更多HTML地址
];

// 本地保存HTML文件的基础路径，文件名会根据实际HTML页面命名，可按需修改
const htmlBaseSavePath = './downloaded_pages';
// 本地保存图片文件的文件夹路径，可按需修改
const imageSaveFolder = './downloaded_images';

// 创建保存图片的文件夹（如果不存在的话）
if (!fs.existsSync(imageSaveFolder)) {
    fs.mkdirSync(imageSaveFolder);
}

// 循环处理每个HTML地址
htmlUrls.forEach((htmlUrl) => {
    // 从URL中提取页面名称用于本地保存HTML文件命名（可根据实际情况调整）
    const pageName = path.basename(htmlUrl).split('.')[0];
    const htmlSavePath = path.join(htmlBaseSavePath, `${pageName}.html`);

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
   .then(() => {
        // 读取下载好的HTML文件内容并解析
        fs.readFile(htmlSavePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`读取HTML文件（${htmlUrl}）出错：`, err);
                return;
            }
            

            const $ = cheerio.load(data);
            const imgSrcs = [];

            // 从HTML中提取img标签的src属性值
            $('img').each((index, element) => {
                const src = $(element).attr('src');
                if (src) {
                    imgSrcs.push(src);
                }
            });

            // 下载图片文件
            imgSrcs.forEach((src) => {
                let imageUrl = src;
                if (!imageUrl.startsWith('http')) {
                    // 如果src是相对路径，拼接成完整URL（需根据实际情况调整）
                    imageUrl = new URL(src, htmlUrl).href;
                }

                const imageFileName = path.basename(imageUrl);
                const imageSavePath = path.join(imageSaveFolder, imageFileName);

                axios({
                    method: 'get',
                    url: imageUrl + '?tenantId=199931&viewType=1&k=' + Date.now(),
                    responseType: 'stream',
                    headers: {
                        Referer: 'http://www.gdcdsy.com/',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                        Host: 'img201.yun300.cn',
                        Dnt: '1'
                    }
                })
               .then((response) => {
                    const writer = fs.createWriteStream(imageSavePath);
                    response.data.pipe(writer);

                    return new Promise((resolve, reject) => {
                        writer.on('finish', resolve);
                        writer.on('error', reject);
                    });
                })
               .then(() => {
                    console.log(`图片 ${imageUrl} 已成功下载到 ${imageSavePath}`);
                })
               .catch((error) => {
                    // console.error(`下载图片 ${imageUrl} 出错：`, error);
                    console.error(`下载图片 ${imageUrl} 出错：`);
                });
            });
        });
    })
   .catch((error) => {
        console.error(`下载HTML文件（${htmlUrl}）时出错：`, error);
    });
});