var router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

import routerVersion from './version'
import routerNodes from './nodes'
import routerPlayers from './players';

router.use(routerVersion.routes()).use(routerVersion.allowedMethods());
router.use(routerNodes.routes()).use(routerNodes.allowedMethods());
router.use(routerPlayers.routes()).use(routerPlayers.allowedMethods());


export default router