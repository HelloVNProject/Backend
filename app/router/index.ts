var router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

import routerVersion from './version'
import routerNodes from './nodes'

router.use(routerVersion.routes()).use(routerVersion.allowedMethods());
router.use(routerNodes.routes()).use(routerNodes.allowedMethods());



export default router