const fs = require('fs');
const path = require('path');

// 目标文件夹路径，可根据实际情况修改
const folderPath = './data/repository/image';

function copyAndRenameSelectedFiles(folder) {
    fs.readdir(folder, (err, files) => {
        if (err) {
            console.error('读取文件夹出错：', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(folder, file);
            const fileExtension = path.extname(file);
            // 这里可以修改条件来筛选你想要的文件，比如根据扩展名等
            if (fileExtension === '.jpg') {
                const fileNameWithoutExtension = path.basename(file, fileExtension);
                const nameArr = fileNameWithoutExtension.split('-');
                const name = nameArr.length > 1 ? nameArr.slice(0, -1).join('-') : fileNameWithoutExtension
                const newFileName = name + fileExtension;
                const newFilePath = path.join(folder, newFileName);

                // 读取源文件内容
                fs.readFile(filePath, (readErr, data) => {
                    if (readErr) {
                        console.error(`读取文件 ${filePath} 出错：`, readErr);
                        return;
                    }

                    // 将内容写入新文件，实现复制并改名
                    fs.writeFile(newFilePath, data, (writeErr) => {
                        if (writeErr) {
                            console.error(`写入文件 ${newFilePath} 出错：`, writeErr);
                        } else {
                            console.log(`已成功复制并重新命名文件 ${filePath} 为 ${newFilePath}`);
                        }
                    });
                });
            }
        });
    });
}

copyAndRenameSelectedFiles(folderPath);