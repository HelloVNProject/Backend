const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

import { isNumberObject } from 'util/types';
import router from './app/router'

app.use(async (ctx, next) => {
  // ctx.body = 'Hello World';
  try{
    await next();
  }catch(e){
    if(isNumberObject(e.message) == true){
      ctx.body = {
        "code": e.message
      }
    }
    else{
      console.error(`err: ${e.message}`)
      ctx.body = {
        "code": 0
      }
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