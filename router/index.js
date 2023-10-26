const Router = require('@koa/router');
const router = new Router();
const { showBlogInfo, showBlogInfoById } = require('../controller/blog.js');
router.get('/api/blog/info', showBlogInfo);
router.get('/api/blog/infoById', showBlogInfoById)
module.exports = router

