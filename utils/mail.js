const nodemailer = require('nodemailer');
const config = require('../config.json');
const logger = require('./logger');

let transporter = null;

function getTransporter() {
    if (!config.email || !config.email.user || !config.email.pass) {
        return null;
    }
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: 'smtp.qq.com',
            port: 465,
            secure: true,
            auth: {
                user: config.email.user,
                pass: config.email.pass
            }
        });
    }
    return transporter;
}

async function sendCommentNotification({ blogId, blogTitle, nickname, content }) {
    const mailer = getTransporter();
    if (!mailer) {
        logger.warn('邮件未配置，跳过评论通知');
        return;
    }
    try {
        await mailer.sendMail({
            from: `"博客通知" <${config.email.user}>`,
            to: config.email.to,
            subject: `新评论 - ${blogTitle || '未知文章'}`,
            html: `
                <h3>你的博客收到新评论</h3>
                <p><strong>文章：</strong>${blogTitle || `ID: ${blogId}`}</p>
                <p><strong>昵称：</strong>${nickname}</p>
                <p><strong>内容：</strong></p>
                <blockquote style="border-left: 3px solid #ccc; padding-left: 10px; color: #666;">${content}</blockquote>
            `
        });
        logger.info('评论通知邮件已发送');
    } catch (e) {
        logger.error({ err: e }, '发送评论通知邮件失败');
    }
}

module.exports = { sendCommentNotification };
