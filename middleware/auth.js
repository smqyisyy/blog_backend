const jwt = require('jsonwebtoken');
const config = require('../config.json');

function authMiddleware(ctx, next) {
    const authHeader = ctx.header.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        ctx.status = 401;
        ctx.body = { message: '未登录' };
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        ctx.state.user = decoded;
        return next();
    } catch (e) {
        ctx.status = 401;
        ctx.body = { message: 'token无效或已过期' };
    }
}

module.exports = authMiddleware;