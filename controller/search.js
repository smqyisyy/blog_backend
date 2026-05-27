const { searchBlog, searchBlogCount } = require('../database/search.js');

async function search(ctx) {
    const keyword = ctx.query.keyword;
    const pageNum = parseInt(ctx.query.pageNum) || 1;
    const pageSize = 6;
    if (!keyword) {
        ctx.status = 400;
        ctx.body = { message: '缺少搜索关键词' };
        return;
    }
    const data = await searchBlog(keyword, pageNum, pageSize);
    const countResult = await searchBlogCount(keyword);
    ctx.body = {
        data,
        totalBlog: countResult.totalBlog,
        pageSize,
        pageNum
    };
}

module.exports = { search };