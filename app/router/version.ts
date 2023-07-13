var routerVersion = require('koa-router')();
const db = require('../models');
const Versions = db.versions;
import getFileList from '../utils/getFileList';
import compareVersion from '../utils/compareVersion'
import { error, respond } from '../utils/respond';

async function getLatestVersion(ctx, next) {
    const userVersion = ctx.request.query.userVersion;
    if(userVersion == undefined){
        error(ctx, 301);
        return;
    }

    const versionList = await Versions.findAll({
        where:{
            is_latest: true
        },
        order: [['updatedAt', 'DESC']]
    })
    const latest = versionList[0];
    const hasNewVersion = compareVersion(userVersion, latest.version);

    
    var response: any = {};
    response.hasNewVersion = hasNewVersion;
    if(hasNewVersion){
        const fileList = await getFileList("Production", latest.version);
        console.log(fileList.data.content);
        const latestFile = fileList.data.content[0]
        response = {
            ...response,
            isDev: false,
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
    
}

routerVersion.get('/v1/versions/latest', getLatestVersion);
routerVersion.get('/v1/versions/latest/dev', getLatestDevVersion);

export default routerVersion