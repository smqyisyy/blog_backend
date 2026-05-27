const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');
const path = require('path');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const router = require("./router")
const logger = require('./utils/logger');
const app = new Koa();
const { watchDir, mdPath } = require('./utils/readBlog');

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        logger.error({ err, method: ctx.method, url: ctx.url }, 'request error');
        ctx.status = err.status || 500;
        ctx.body = { message: 'Internal Server Error' };
    }
});
app.use(cors());
app.use(compress({ threshold: 1024 }));
app.use(bodyParser({ enableTypes: ['json', 'form'] }));
app.use(mount('/images', serve(path.join(__dirname, 'images'), { maxage: 86400000 })));
app.use(router.routes())

app.listen(3000, '0.0.0.0', () => {
    logger.info("server listen on http://localhost:3000");
});
watchDir(mdPath);