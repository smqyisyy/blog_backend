const Router = require('@koa/router');
const router = new Router();
const { showBlogInfo } = require('../controller/blog.js');
router.get('/api/blog/info', showBlogInfo);

module.exports = router

