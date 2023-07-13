var routerVersion = require('koa-router')();
const db = require('../models');
const Versions = db.versions;
import getFileList from '../utils/getFileList';
import compareVersion from '../utils/compareVersion'
import { error, respond } from '../utils/respond';

async function getLatestVersion(ctx, next, isDev = false) {
    const userVersion = ctx.request.query.userVersion;
    if(userVersion == undefined){
        error(ctx, 301);
        return;
    }

    const versionList = await Versions.findAll({
        where:{
            is_latest: true,
            is_dev: isDev
        },
        order: [['updatedAt', 'DESC']]
    })
    const latest = versionList[0];
    if(latest == undefined){
        error(ctx, 302);
        return;
    }
    const hasNewVersion = compareVersion(userVersion, latest.version);

    var mode = isDev?"Development":"Production";

    var response: any = {};
    response.hasNewVersion = hasNewVersion;
    if(hasNewVersion){
        
        const fileList = await getFileList(mode, latest.version);
        const latestFile = fileList.data.content[0];
        if(latestFile == undefined){
            error(ctx, 302);
            return;
        }
        response = {
            ...response,
            isDev: isDev,
            version: latest.version,
            downloadUrl: latestFile.download_url,
            body: latest.body,
            fileSize: latestFile.file_size,
            createdAt: latest.createdAt
        }
    }

    respond(ctx, 300, response);
}

async function getLatestDevVersion(ctx, next) {
    await getLatestVersion(ctx, next, true);
}

routerVersion.get('/v1/versions/latest', getLatestVersion);
routerVersion.get('/v1/versions/latest/dev', getLatestDevVersion);

export default routerVersion