const path = require('path');
const fs = require('fs/promises');
const multer = require('@koa/multer');
const matter = require('gray-matter');
const { addBlog } = require('../database/index.js');
const { addBlogTag } = require('../database/blogTag.js');

const imageStorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename(ctx, file, cb) {
        const ext = path.extname(file.originalname);
        const name = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + ext;
        cb(null, name);
    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(ctx, file, cb) {
        const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('只允许上传图片文件'), false);
        }
    }
});

const mdStorage = multer.diskStorage({
    destination: path.join(__dirname, '../testBlogs'),
    filename(ctx, file, cb) {
        cb(null, file.originalname);
    }
});

const mdUpload = multer({
    storage: mdStorage,
    fileFilter(ctx, file, cb) {
        if (path.extname(file.originalname).toLowerCase() === '.md') {
            cb(null, true);
        } else {
            cb(new Error('只允许上传 .md 文件'), false);
        }
    }
});

async function uploadImage(ctx) {
    const file = ctx.file;
    if (!file) {
        ctx.status = 400;
        ctx.body = { message: '未收到文件' };
        return;
    }
    ctx.body = { url: `/images/${file.filename}` };
}

async function uploadMd(ctx) {
    const file = ctx.file;
    if (!file) {
        ctx.status = 400;
        ctx.body = { message: '未收到文件' };
        return;
    }
    // 解析 md 文件内容并写入数据库
    try {
        const content = await fs.readFile(file.path, 'utf-8');
        const frontMatter = matter(content);
        const blogTitle = path.basename(file.originalname, '.md');
        const blogData = {
            blogTitle,
            blogAuthor: frontMatter.data.blogAuthor || "无名",
            category: frontMatter.data.category || "无分类",
            releaseDate: frontMatter.data.releaseDate || new Date().toLocaleDateString(),
            imgUrl: frontMatter.data.imgUrl || "/images/default-cover.jpg",
            description: frontMatter.data.description || "",
            tags: frontMatter.data.tags || [],
            blogContent: frontMatter.content || "无内容"
        };
        await addBlog(blogData);
        await addBlogTag(blogData);
        ctx.body = { message: '上传成功', blogTitle };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { message: '解析文件失败', error: e.message };
    }
}

module.exports = {
    uploadImage,
    uploadMd,
    imageUpload,
    mdUpload
};