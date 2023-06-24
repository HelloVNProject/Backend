var routerNodes = require('koa-router')();
const db = require('../models');
const Nodes = db.nodes;



async function getAllNodes(ctx,next) {
    var nodes = await Nodes.findAll();
    console.log(nodes);
    ctx.body = nodes;
}

routerNodes.get('/v1/nodes', getAllNodes);

export default routerNodes;