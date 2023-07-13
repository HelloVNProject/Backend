const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

import router from './app/router'

app.use(async (ctx, next) => {
  // ctx.body = 'Hello World';
  try{
    await next();
  }catch(e){
    ctx.body = {
      "code": e.message
    }
  }
});

app.use(bodyParser())
app.use(router.routes());
app.use(router.allowedMethods());



let server = app.listen(14514);

const db = require('./app/models');
db.sequelize.sync();

module.exports = server;