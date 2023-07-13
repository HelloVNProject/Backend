import {error, respond} from "../utils/respond"
var routerPlayers = require('koa-router')();
const db = require('../models');
const Players = db.players;
const PlayersDevicesId = db.playersDevicesId;
const twoFactor = require("node-2fa");

async function checkDeviceId(deviceId) {
    const result = await PlayersDevicesId.findOne({
        where: {
            device_id: deviceId
        }
    })
    if(result == null){
        return true;
    }
    return false;
}

async function checkEmail(email) {
    const result = await Players.findOne({
        where: {
            email: email
        }
    })
    if(result == null){
        return true;
    }
    return false;
}

async function register(ctx, next) {
    const body = ctx.request.body;
    var code=200;
    var playerInfo;
    var data;

    var isDeviceIdUnique = await checkDeviceId(body.deviceId)
    if(isDeviceIdUnique == false){
        error(202);
    }
    var isEmailUnique = await checkEmail(body.email)
    if(isEmailUnique == false){
        error(203);
    }
    const emailReg = new RegExp("([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+");
    const isEmailLegal = emailReg.test(body.email);
    if(!isEmailLegal){
        error(204);
    }

    const newSecret = twoFactor.generateSecret({name:`Hello VN (${body.email})`, account: ""})
    newSecret.qr = "https://www.olzz.com/qr/?text=" + newSecret.uri; //替换原本GoogleAPI为国内二维码API
    if(body.twoFa == true){
        playerInfo = {
            email: body.email,
            "2fa": body.twoFa,
            "2fa_password": newSecret.secret,
            subscribe:body.subscribe,
            save_data: body.saveData,
            setting_data: body.settingData
        };
        data = {
            "twoFaImageURL": newSecret.qr,
            "twoFaCodes": newSecret.secret,
            "dataSaved": true
        }
    }
    else{
        playerInfo = {
            email: body.email,
            "2fa": body.twoFa,
            "2fa_password": "",
            subscribe:body.subscribe
        };
        data = {
            "twoFaImageURL": null,
            "twoFaCodes": null,
            "dataSaved": false
        }
    }

    try{
        await Players.create(playerInfo);
        await PlayersDevicesId.create({
            device_id: body.deviceId,
            email: body.email
        })
    }catch(e){
        error(201);
    }
    
    respond(ctx, code, data);
}

routerPlayers.post('/v1/players', register)

export default routerPlayers
