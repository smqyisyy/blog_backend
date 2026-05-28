// 本文件主要展示与blog_tag表相关的数据接口
const { getBlogByTag, getTags, getBlogNumByTag, renameTag: renameTagDb, deleteTag: deleteTagDb } = require('../database/blogTag.js');
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
async function adminShowTags(ctx) {
    const data = await getTags()
    ctx.body = { data }
}

async function renameTag(ctx) {
    const { oldTag, newTag } = ctx.request.body
    if (!oldTag || !newTag) {
        ctx.status = 400
        ctx.body = { message: '缺少必要参数' }
        return
    }
    try {
        await renameTagDb(oldTag, newTag)
        ctx.body = { message: '重命名成功' }
    } catch (e) {
        ctx.status = 500
        ctx.body = { message: '重命名失败', error: e.message }
    }
}

async function deleteTag(ctx) {
    const tag = decodeURIComponent(ctx.params.tag)
    if (!tag) {
        ctx.status = 400
        ctx.body = { message: '缺少标签名' }
        return
    }
    try {
        await deleteTagDb(tag)
        ctx.body = { message: '删除成功' }
    } catch (e) {
        ctx.status = 500
        ctx.body = { message: '删除失败', error: e.message }
    }
}

module.exports = {
    showBlogByTag,
    showTags,
    adminShowTags,
    renameTag,
    deleteTag
}