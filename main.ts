const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

import router from './app/router'

app.use(bodyParser())
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async ctx => {
  ctx.body = 'Hello World';
});

let server = app.listen(3000);

module.exports = server;