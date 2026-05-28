const { getCommentsByBlogId, addComment, deleteComment, getAllComments } = require('../database/comment.js');
const { getBlogInfoById } = require('../database/index.js');
const { sendCommentNotification } = require('../utils/mail');

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
    const { blogId, nickname, email, content } = ctx.request.body;
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
    const parentId = ctx.request.body.parentId || null;
    await addComment({ blogId, nickname, email, content, parentId });
    ctx.body = { message: '评论成功' };

    // 异步发送邮件通知，不阻塞响应
    getBlogInfoById(blogId).then(blogInfo => {
        const blogTitle = blogInfo && blogInfo.length > 0 ? blogInfo[0].blogTitle : null;
        sendCommentNotification({ blogId, blogTitle, nickname, content });
    }).catch(() => {});
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

async function listAllComments(ctx) {
    const data = await getAllComments();
    ctx.body = { data };
}

module.exports = { listComments, addComment: addCommentFn, deleteComment: deleteCommentFn, listAllComments };