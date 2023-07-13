var routerVersion = require('koa-router')();
import getObjectLinks from '../utils/getObjectLinks'
import compareVersion from '../utils/compareVersion'
import { error, respond } from '../utils/respond';

async function getLatestVersion(ctx,next) {
    const userVersion = ctx.request.query.userVersion;
    if(userVersion == undefined){
        error(ctx, 301);
        return;
    }

    const versionList = await getObjectLinks("649420e0ec32d58d9c95727d");
    var latest;
    try {
        latest = versionList[0];
        var test = latest.data;
    }catch(e){
        error(ctx ,301);
        return;
    }
    if(latest == undefined){
        error(ctx, 301);
        return;
    }
    var _id = latest.data._id, note = latest.data.note, latestVersion = latest.data.content;

    const latestVersionInfo = await getObjectLinks(_id);

    try {
        var test = latestVersionInfo[0].data;
    }catch(e){
        error(ctx, 301);
        return;
    }
    respond(ctx, 300, {
        "hasNewVersion": compareVersion(userVersion, latestVersion),
        "version": latestVersion,
        "downloadUrl": latestVersionInfo[0].data.downloadUrl,
        "note": note
    });
}

routerVersion.get('/v1/versions/teambition/latest', getLatestVersion);

export default routerVersion
