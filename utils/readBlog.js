const fs = require('fs/promises');
const chokidar = require('chokidar');
const path = require('path');
const mdPath = path.join(__dirname, "../testBlogs")
const matter = require('gray-matter'); // 使用 gray-matter 包来解析 YAML 前置信息块
// 获取目录下全部文件
async function getFileNames(dirPath) {
    let filenames = await fs.readdir(dirPath)
    return filenames.map(filenames => {
        console.log(path.join(dirPath, path.basename(filenames)));
        return path.join(dirPath, filenames)
    })

}
// 获取文件全部内容
async function getFileContent(filename) {
    // 使用 gray-matter 解析 YAML 前置信息块
    const data = await fs.readFile(filename, 'utf-8')
    const frontMatter = matter(data);
    // 提取元数据
    const title = frontMatter.data.title;
    const author = frontMatter.data.author;
    const tags = frontMatter.data.tags;
    const date = frontMatter.data.date;
    console.log('标题:', title);
    console.log('作者:', author);
    console.log('标签:', tags);
    console.log('日期:', date);
    console.log('内容:', frontMatter.content);
}

// 监视目录是否添加或减少了文件
function watchDir(dirPath) {
    // 初始化监视器
    const watcher = chokidar.watch(dirPath, {
        persistent: true, // 是否持续监听
        ignoreInitial: true, // 忽略初始状态的文件变化,避免处理目录中已经存在的文件，只关注后续的变化。
    });
    // 监听文件新增、删除、修改事件
    watcher
        .on('add', (filePath) => {
            console.log(`文件 ${filePath} 被添加`);
            // 在这里执行文件新增时的操作
        })
        .on('change', (filePath) => {
            console.log(`文件 ${filePath} 被修改`);
            // 在这里执行文件修改时的操作
        })
        .on('unlink', (filePath) => {
            console.log(`文件 ${filePath} 被删除`);
            // 在这里执行文件删除时的操作
        });

    watcher.on('error', (error) => {
        console.error(`发生错误: ${error}`);
    });

    console.log(`正在监听目录: ${dirPath}`);
}


getFileContent(path.join(mdPath, 'Linux基础.md'));