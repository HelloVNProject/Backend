var routerVersion = require('koa-router')();
import getObjectLinks from '../utils/getObjectLinks'
import compareVersion from '../utils/compareVersion'

async function getLatestVersion(ctx,next) {
    const userVersion = ctx.request.query.userVersion;
    if(userVersion == undefined){
        ctx.body = {
            'code': 301
        };
        return;
    }

    const versionList = await getObjectLinks("649420e0ec32d58d9c95727d");
    const latest = versionList[0];
    var _id = latest.data._id, note = latest.data.note, latestVersion = latest.data.content;

    const latestVersionInfo = await getObjectLinks(_id);

    ctx.body = {
        'code': 300,
        'data':{
            "hasNewVersion": compareVersion(userVersion, latestVersion),
            "version": latestVersion,
            "downloadUrl": latestVersionInfo[0].data.downloadUrl,
            "note": note
        }
    };
}

routerVersion.get('/v1/versions/teambition/latest', getLatestVersion);

export default routerVersion