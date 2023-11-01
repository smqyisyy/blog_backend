const Router = require('@koa/router');
const router = new Router();
const { showBlogInfo, showBlogInfoById, showBlogByCategory, showCategories } = require('../controller/blog.js');
const { showBlogByTag, showTags } = require('../controller/blogTag.js');
router.get('/api/blog/info', showBlogInfo);
router.get('/api/blog/infoById', showBlogInfoById)
router.get('/api/categories/infoByCategory', showBlogByCategory)
router.get('/api/categories/info', showCategories)
router.get('/api/tags/info', showTags)
router.get('/api/tags/infoByTag', showBlogByTag)
module.exports = router

