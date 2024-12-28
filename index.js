const express = require('express');
const path = require('path');

// 创建Express应用实例
const app = express();

// 设置静态资源目录，这里假设静态资源都放在名为'public'的文件夹下，你可以按需修改
const staticPath = path.join(__dirname, 'data');
app.use(express.static(staticPath));

// 监听端口，这里使用3000端口，可根据实际需求修改
const port = 80;
app.listen(port, () => {
    console.log(`静态资源服务器正在监听 ${port} 端口`);
});