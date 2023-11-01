// 本文件主要展示与blog_info表相关的数据接口
const { getBlogNum, getBlogInfo, getBlogInfoById, getBlogByCategory, getCategories, getBlogNumByCategory } = require('../database/index.js');
async function showBlogInfo(ctx) {
    const { totalBlog } = await getBlogNum()
    let pageSize = 6
    let pageNum = 1
    if (parseInt(ctx.request.query.pageSize)) {
        pageSize = parseInt(ctx.request.query.pageSize)
    }
    if (parseInt(ctx.request.query.pageNum)) {
        pageNum = parseInt(ctx.request.query.pageNum)
    }
    const blogInfo = await getBlogInfo(pageNum, pageSize)
    ctx.body = {
        data: blogInfo,
        totalBlog,
        pageNum,
        pageSize
    }
}
async function showBlogInfoById(ctx) {
    const blogInfo = await getBlogInfoById(ctx.request.query.id)
    ctx.body = {
        data: blogInfo
    }
}
async function showBlogByCategory(ctx) {
    const { totalBlog } = await getBlogNumByCategory(ctx.request.query.category)
    let pageSize = 6
    let pageNum = 1
    if (parseInt(ctx.request.query.pageSize)) {
        pageSize = parseInt(ctx.request.query.pageSize)
    }
    if (parseInt(ctx.request.query.pageNum)) {
        pageNum = parseInt(ctx.request.query.pageNum)
    }
    const data = await getBlogByCategory(ctx.request.query.category, pageNum, pageSize)
    ctx.body = {
        data,
        totalBlog,
        pageNum,
        pageSize
    }
}
async function showCategories(ctx) {
    const data = await getCategories()
    ctx.body = {
        data
    }
}
module.exports = {
    showBlogInfo,
    showBlogInfoById,
    showBlogByCategory,
    showCategories
}