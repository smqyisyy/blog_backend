const Router = require('@koa/router');
const router = new Router();
const { showBlogInfo, showBlogInfoById, showBlogByCategory, showCategories } = require('../controller/blog.js');
router.get('/api/blog/info', showBlogInfo);
router.get('/api/blog/infoById', showBlogInfoById)
router.get('/api/categories/infoByCategory', showBlogByCategory)
router.get('/api/categories/info', showCategories)
module.exports = router

