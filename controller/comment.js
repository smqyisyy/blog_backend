const { getCommentsByBlogId, addComment, deleteComment } = require('../database/comment.js');

async function listComments(ctx) {
    const blogId = parseInt(ctx.query.blogId);
    if (!blogId) {
        ctx.status = 400;
        ctx.body = { message: '缺少博客ID' };
        return;
    }
    const data = await getCommentsByBlogId(blogId);
    ctx.body = { data };
}

async function addCommentFn(ctx) {
    const { blogId, nickname, content } = ctx.request.body;
    if (!blogId || !nickname || !content) {
        ctx.status = 400;
        ctx.body = { message: '缺少必要参数' };
        return;
    }
    if (nickname.length > 50) {
        ctx.status = 400;
        ctx.body = { message: '昵称过长' };
        return;
    }
    if (content.length > 1000) {
        ctx.status = 400;
        ctx.body = { message: '评论内容过长' };
        return;
    }
    await addComment({ blogId, nickname, content });
    ctx.body = { message: '评论成功' };
}

async function deleteCommentFn(ctx) {
    const id = parseInt(ctx.params.id);
    if (!id) {
        ctx.status = 400;
        ctx.body = { message: '缺少评论ID' };
        return;
    }
    await deleteComment(id);
    ctx.body = { message: '删除成功' };
}

module.exports = { listComments, addComment: addCommentFn, deleteComment: deleteCommentFn };