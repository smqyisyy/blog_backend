const Router = require('@koa/router');
const router = new Router();
const authMiddleware = require('../middleware/auth');

// 公开路由
const { showBlogInfo, showBlogInfoById, showBlogByCategory, showCategories } = require('../controller/blog');
const { showBlogByTag, showTags, adminShowTags, renameTag: renameTagFn, deleteTag: deleteTagFn } = require('../controller/blogTag');
const { search } = require('../controller/search');
const { listComments, addComment, listAllComments } = require('../controller/comment');
router.get('/api/blog/info', showBlogInfo);
router.get('/api/blog/infoById', showBlogInfoById);
router.get('/api/blog/search', search);
router.get('/api/categories/infoByCategory', showBlogByCategory);
router.get('/api/categories/info', showCategories);
router.get('/api/tags/info', showTags);
router.get('/api/tags/infoByTag', showBlogByTag);
router.get('/api/comment/list', listComments);
router.post('/api/comment/add', addComment);

// 点赞
const { getLike, like } = require('../controller/like');
router.get('/api/like', getLike);
router.post('/api/like', like);

// 登录
const { login, changePassword } = require('../controller/auth');
router.post('/api/admin/login', login);
router.put('/api/admin/password', authMiddleware, changePassword);

// admin 路由
const { createBlog, updateBlogByTitle, deleteBlogByTitle, getBlogByTitle, listBlogs, getDashboardStats } = require('../controller/admin');
const { uploadImage, uploadMd, imageUpload, mdUpload } = require('../controller/upload');
const { deleteComment } = require('../controller/comment');

router.post('/api/admin/blog', authMiddleware, createBlog);
router.put('/api/admin/blog', authMiddleware, updateBlogByTitle);
router.del('/api/admin/blog/:blogTitle', authMiddleware, deleteBlogByTitle);
router.get('/api/admin/blog/byTitle', authMiddleware, getBlogByTitle);
router.get('/api/admin/blogs', authMiddleware, listBlogs);
router.get('/api/admin/dashboard', authMiddleware, getDashboardStats);
router.post('/api/admin/upload/image', authMiddleware, imageUpload.single('file'), uploadImage);
router.post('/api/admin/upload/md', authMiddleware, mdUpload.single('file'), uploadMd);
router.del('/api/admin/comment/:id', authMiddleware, deleteComment);
router.get('/api/admin/comments', authMiddleware, listAllComments);
router.get('/api/admin/tags', authMiddleware, adminShowTags);
router.put('/api/admin/tag', authMiddleware, renameTagFn);
router.del('/api/admin/tag/:tag', authMiddleware, deleteTagFn);

module.exports = router;