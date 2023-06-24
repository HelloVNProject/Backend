var router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

import routerVersion from './version'

router.use(routerVersion.routes()).use(routerVersion.allowedMethods());


export default router