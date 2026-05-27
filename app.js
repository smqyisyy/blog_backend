const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require("./router")
const app = new Koa();
const { watchDir, mdPath } = require('./utils/readBlog');

app.use(cors());
app.use(bodyParser({ enableTypes: ['json', 'form'] }));
app.use(serve(path.join(__dirname, 'images')));
app.use(router.routes())

app.listen(3000, '0.0.0.0', () => {
    console.log("server listen on http://localhost:3000");
});
watchDir(mdPath);
