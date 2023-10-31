const fs = require('fs/promises');
const chokidar = require('chokidar');
const path = require('path');
const mdPath = path.join(__dirname, "../testBlogs")
const matter = require('gray-matter'); // 使用 gray-matter 包来解析 YAML 前置信息块
// 操作数据库
const { addBlog, updateBlog, deleteBlog } = require('../database/index.js');
// 获取文件全部内容
async function getFileContent(filename) {
    const blogTitle = path.basename(filename, '.md');
    // 使用 gray-matter 解析 YAML 前置信息块
    const data = await fs.readFile(filename, 'utf-8')
    const frontMatter = matter(data);
    // 提取元数据
    const blogAuthor = frontMatter.data.blogAuthor;
    const category = frontMatter.data.category;
    const releaseDate = frontMatter.data.releaseDate;
    const description = frontMatter.data.description;
    const imgUrl = frontMatter.data.imgUrl;
    const blogContent = frontMatter.content;
    return {
        blogTitle, // 文章标题
        blogAuthor, // 文章作者
        category, // 文章分类
        releaseDate, // 文章发布时间
        description, // 文章描述
        imgUrl, // 文章封面图片
        blogContent // 文章内容
    }
}

// 监视目录是否添加或减少了文件
function watchDir(dirPath) {
    // 初始化监视器
    const watcher = chokidar.watch(dirPath, {
        persistent: true, // 是否持续监听
        ignoreInitial: true, // true为忽略初始状态的文件变化,避免处理目录中已经存在的文件，只关注后续的变化。
    });
    // 监听文件新增、删除、修改事件
    watcher
        .on('add', async (filePath) => {
            if (path.extname(filePath) === '.md') {
                // 在这里执行文件新增时的操作
                const fileInfo = await getFileContent(filePath)
                addBlog(fileInfo)
            }
        })
        .on('change', async (filePath) => {
            if (path.extname(filePath) === '.md') {
                const fileInfo = await getFileContent(filePath)
                updateBlog(fileInfo)
                // 在这里执行文件修改时的操作
            }
        })
        .on('unlink', (filePath) => {
            if (path.extname(filePath) === '.md') {
                deleteBlog(path.basename(filePath, ".md"))

                // 在这里执行文件删除时的操作
            }
        });
    watcher.on('error', (error) => {
        console.error(`发生错误: ${error}`);
    });

    console.log(`正在监听目录: ${dirPath}`);
}

module.exports = {
    watchDir,
    mdPath
}
