const Koa = require('koa');
const router = require("./router")
const app = new Koa();

app.use(router.routes())

app.listen(3000, () => {
    console.log("server listen on http://localhost:3000");
});