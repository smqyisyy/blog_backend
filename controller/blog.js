const { getBlogNum, getBlogInfo, getBlogInfoById } = require('../database/index.js');
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
module.exports = {
    showBlogInfo,
    showBlogInfoById

}