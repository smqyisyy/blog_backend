// 本文件主要展示与blog_tag表相关的数据接口
const { getBlogByTag, getTags,getBlogNumByTag } = require('../database/blogTag.js');
async function showBlogByTag(ctx) {
    const { totalBlog } = await getBlogNumByTag(ctx.request.query.tag)
    let pageSize = 6
    let pageNum = 1
    if (parseInt(ctx.request.query.pageSize)) {
        pageSize = parseInt(ctx.request.query.pageSize)
    }
    if (parseInt(ctx.request.query.pageNum)) {
        pageNum = parseInt(ctx.request.query.pageNum)
    }
    const data = await getBlogByTag(ctx.request.query.tag, pageNum, pageSize)
    ctx.body = {
        data,
        totalBlog,
        pageNum,
        pageSize
    }
}
async function showTags(ctx) {
    const data = await getTags()
    ctx.body = {
        data
    }
}
module.exports = {
    showBlogByTag,
    showTags
}