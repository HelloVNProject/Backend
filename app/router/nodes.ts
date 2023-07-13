import { error, respond } from "../utils/respond";
const { Op } = require("sequelize");
var routerNodes = require('koa-router')();
const db = require('../models');
const Nodes = db.nodes;
const PlayersQTEs = db.playersQTEs;

async function getAllNodes(ctx,next) {
    const chapter = ctx.request.query.chapter;
    var nodes;
    try{
        if(chapter == undefined){
            nodes = await Nodes.findAll();
        }
        else{
            nodes = await Nodes.findAll({
                where: {
                    chapter: {
                        [Op.lte]: chapter
                    }
                }
            });
        }
    }catch(e){
        error(101);
    }
    var length = nodes.length;
    for(var i=0;i<length;i++){
        if(nodes[i].type == 1){//Timeline
            nodes[i].dataValues.qteTitle = undefined;
            nodes[i].dataValues.qteChoices = undefined;
        }
        if(nodes[i].type == 2){//QTE
            nodes[i].dataValues.timelineEventTime = undefined;
            nodes[i].dataValues.timelineLevel = undefined;
            nodes[i].dataValues.timelineContent = undefined;
            const qteAmountAllPlayers = await PlayersQTEs.count({
                where: {
                    node_id: nodes[i].id
                }
            })
            var qteAmountChoices : Array<Number> = [];
            for(var choice = 1; choice <= nodes[i].qteChoices; choice++){
                qteAmountChoices[choice-1] = await PlayersQTEs.count({
                    where: {
                        node_id: nodes[i].id,
                        choice: choice
                    }
                })
            }
            nodes[i].dataValues.qteAmountAllPlayers = qteAmountAllPlayers;
            nodes[i].dataValues.qteAmountChoices = qteAmountChoices;
        }
    }
    respond(ctx, 100, {
        "nodes": nodes
    });
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

    respond(ctx, code, {
        "nodes": results
    })
}

routerNodes.get('/v1/nodes', getAllNodes);
routerNodes.post('/v1/nodes/qtes', completeQTEs);

export default routerNodes;