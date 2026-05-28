const { addBlog, updateBlog, deleteBlog, getBlogInfoByTitle, getAllBlogsSimple } = require('../database/index.js');
const { addBlogTag, updateBlogTag, deleteBlogTag } = require('../database/blogTag.js');
const { getMysqlConnection, closeConnection } = require('../database/index.js');

async function createBlog(ctx) {
    const data = ctx.request.body;
    if (!data.blogTitle) {
        ctx.status = 400;
        ctx.body = { message: '缺少标题' };
        return;
    }
    try {
        await addBlog(data);
        await addBlogTag(data);
        ctx.body = { message: '创建成功', blogTitle: data.blogTitle };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { message: '创建失败', error: e.message };
    }
}

async function updateBlogByTitle(ctx) {
    const data = ctx.request.body;
    if (!data.blogTitle) {
        ctx.status = 400;
        ctx.body = { message: '缺少标题' };
        return;
    }
    try {
        const originalTitle = data.originalTitle || data.blogTitle;
        const updateData = { ...data };
        delete updateData.originalTitle;
        // updateBlog 的 WHERE 用 blogTitle，需要传原始标题
        await updateBlog({ ...updateData, blogTitle: originalTitle });
        // 如果标题改了，标签表也要跟着改
        if (originalTitle !== data.blogTitle) {
            await deleteBlogTag(originalTitle);
            await addBlogTag(data);
        } else {
            await updateBlogTag(data);
        }
        ctx.body = { message: '更新成功' };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { message: '更新失败', error: e.message };
    }
}

async function deleteBlogByTitle(ctx) {
    const blogTitle = ctx.params.blogTitle;
    if (!blogTitle) {
        ctx.status = 400;
        ctx.body = { message: '缺少标题' };
        return;
    }
    try {
        await deleteBlog(blogTitle);
        await deleteBlogTag(blogTitle);
        ctx.body = { message: '删除成功' };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { message: '删除失败', error: e.message };
    }
}

async function getBlogByTitle(ctx) {
    const blogTitle = ctx.query.blogTitle;
    if (!blogTitle) {
        ctx.status = 400;
        ctx.body = { message: '缺少标题' };
        return;
    }
    const data = await getBlogInfoByTitle(blogTitle);
    if (!data) {
        ctx.status = 404;
        ctx.body = { message: '博客不存在' };
        return;
    }
    ctx.body = { data };
}

async function listBlogs(ctx) {
    const data = await getAllBlogsSimple();
    ctx.body = { data };
}

async function getDashboardStats(ctx) {
    const conn = await getMysqlConnection();
    try {
        const [blogRows] = await conn.execute('SELECT COUNT(*) as count FROM blog_info');
        const [commentRows] = await conn.execute('SELECT COUNT(*) as count FROM blog_comment');
        const [categoryRows] = await conn.execute('SELECT COUNT(DISTINCT category) as count FROM blog_info');
        const [tagRows] = await conn.execute('SELECT COUNT(DISTINCT tag) as count FROM blog_tag');
        closeConnection(conn);
        ctx.body = {
            blogs: blogRows[0].count,
            comments: commentRows[0].count,
            categories: categoryRows[0].count,
            tags: tagRows[0].count
        };
    } catch (e) {
        closeConnection(conn);
        ctx.status = 500;
        ctx.body = { message: '获取统计失败' };
    }
}

module.exports = {
    createBlog,
    updateBlogByTitle,
    deleteBlogByTitle,
    getBlogByTitle,
    listBlogs,
    getDashboardStats
};