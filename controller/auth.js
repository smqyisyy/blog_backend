const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '..', 'config.json');
const config = require(configPath);

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

async function changePassword(ctx) {
    const { oldPassword, newPassword } = ctx.request.body;
    if (!oldPassword || !newPassword) {
        ctx.status = 400;
        ctx.body = { message: '请输入旧密码和新密码' };
        return;
    }
    if (newPassword.length < 6) {
        ctx.status = 400;
        ctx.body = { message: '新密码至少6位' };
        return;
    }
    if (oldPassword !== config.adminPassword) {
        ctx.status = 401;
        ctx.body = { message: '旧密码错误' };
        return;
    }
    try {
        const raw = fs.readFileSync(configPath, 'utf-8');
        const cfg = JSON.parse(raw);
        cfg.adminPassword = newPassword;
        fs.writeFileSync(configPath, JSON.stringify(cfg, null, 4), 'utf-8');
        config.adminPassword = newPassword;
        ctx.body = { message: '密码修改成功' };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { message: '修改失败' };
    }
}

module.exports = { login, changePassword };