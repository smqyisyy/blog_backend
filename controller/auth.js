const jwt = require('jsonwebtoken');
const config = require('../config.json');

async function login(ctx) {
    const { password } = ctx.request.body;
    if (!password) {
        ctx.status = 400;
        ctx.body = { message: '请输入密码' };
        return;
    }
    if (password === config.adminPassword) {
        const token = jwt.sign({ role: 'admin' }, config.jwtSecret, { expiresIn: '7d' });
        ctx.body = { token };
    } else {
        ctx.status = 401;
        ctx.body = { message: '密码错误' };
    }
}

module.exports = { login };