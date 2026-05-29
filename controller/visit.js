const {
    logVisit,
    getTotalVisits,
    getUniqueVisitors,
    getTodayVisits,
    getDailyVisits,
    getTopArticles,
    getArticleViews,
    getRegionDistribution,
    getCityDistribution
} = require('../database/visit');

// 记录访问（公开API，前端调用）
async function trackVisit(ctx) {
    const { blogId, path } = ctx.request.body;
    const ip = ctx.ip || ctx.request.ip;
    await logVisit({ blogId, ip, path: path || '/' });
    ctx.body = { message: 'ok' };
}

// 获取文章阅读量（公开API）
async function getViews(ctx) {
    const blogId = parseInt(ctx.query.blogId);
    if (!blogId) {
        ctx.status = 400;
        ctx.body = { message: '缺少博客ID' };
        return;
    }
    const views = await getArticleViews(blogId);
    ctx.body = { views };
}

// 获取后台统计数据（管理员API）
async function getVisitStats(ctx) {
    const days = parseInt(ctx.query.days) || 7;
    const [totalVisits, uniqueVisitors, todayVisits, dailyVisits, topArticles, regions, cities] = await Promise.all([
        getTotalVisits(),
        getUniqueVisitors(),
        getTodayVisits(),
        getDailyVisits(days),
        getTopArticles(10),
        getRegionDistribution(15),
        getCityDistribution(15)
    ]);
    ctx.body = {
        totalVisits,
        uniqueVisitors,
        todayVisits,
        dailyVisits,
        topArticles,
        regions,
        cities
    };
}

module.exports = {
    trackVisit,
    getViews,
    getVisitStats
}
