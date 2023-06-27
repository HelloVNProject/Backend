var routerNodes = require('koa-router')();
const db = require('../models');
const Nodes = db.nodes;
const PlayersQTEs = db.playersQTEs;

async function getAllNodes(ctx,next) {
    var nodes;
    try{
        nodes = await Nodes.findAll();

    }catch(e){
        ctx.body = {
            "code": 101
        }
        return;
    }
    ctx.body = {
        "code": 100,
        "data": {
            "nodes": nodes
        }
    }
}

async function completeQTEs(ctx,next) {
    const QTEList = ctx.request.body;
    const header = ctx.request.header;
    const length = QTEList.length;

    var falseCount = 0;
    var results = {};
    var code;
    for(var i=0;i<length;i++){
        var alreadyCompleted = await PlayersQTEs.findAll({
            where: {
                device_id: header['player-device-id'],
                node_id: QTEList[i].nodeId
            }
        })

        if(alreadyCompleted.length == 0){
            var qte = await PlayersQTEs.create({
                device_id: header['player-device-id'],
                node_id: QTEList[i].nodeId,
                choice: QTEList[i].choice,
                details: QTEList[i].details
            })
            results[QTEList[i].nodeId] = true;
        }
        else {
            results[QTEList[i].nodeId] = false;
            falseCount++;
        }
    }

    if(falseCount == 0)code = 102;
    else if(falseCount == length)code = 104;
    else code = 103;

    ctx.body = {
        "code": code,
        "data": {
            "nodes": results
        }
    }

}

routerNodes.get('/v1/nodes', getAllNodes);
routerNodes.post('/v1/nodes/qtes', completeQTEs);

export default routerNodes;