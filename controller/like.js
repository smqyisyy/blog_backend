const { getLikeInfo, toggleLike } = require('../database/like.js');

async function getLike(ctx) {
    const blogId = parseInt(ctx.query.blogId);
    if (!blogId) {
        ctx.status = 400;
        ctx.body = { message: '缺少博客ID' };
        return;
    }
    const ip = ctx.ip || ctx.request.ip;
    const data = await getLikeInfo(blogId, ip);
    ctx.body = data;
}

async function like(ctx) {
    const { blogId } = ctx.request.body;
    if (!blogId) {
        ctx.status = 400;
        ctx.body = { message: '缺少博客ID' };
        return;
    }
    const ip = ctx.ip || ctx.request.ip;
    const result = await toggleLike(blogId, ip);
    if (!result) {
        ctx.status = 500;
        ctx.body = { message: '操作失败' };
        return;
    }
    const info = await getLikeInfo(blogId, ip);
    ctx.body = info;
}

module.exports = { getLike, like }
