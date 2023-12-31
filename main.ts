const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

import router from './app/router'
import { isNumber } from './app/utils/isNumber';

app.use(async (ctx, next) => {
  // ctx.body = 'Hello World';
  try{
    await next();
  }catch(e){
    if(isNumber(e.message)){
      ctx.body = {
        "code": parseInt(e.message)
      }
    }
    else{
      console.error(`err: ${e.message} (in ${e.fileName} line ${e.lineNumber}:${e.columnNumber})`)
      console.error(e.stack)
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