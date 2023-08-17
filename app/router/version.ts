var routerVersion = require('koa-router')();
const db = require('../models');
const Versions = db.versions;
import getFileList from '../utils/getFileList';
import compareVersion from '../utils/compareVersion'
import { error, respond } from '../utils/respond';

async function getLatestVersion(ctx, next, isDev = false) {
    const userVersion = ctx.request.query.userVersion;
    if(userVersion == undefined){
        error(301);
    }

    var whereClauses;
    if(isDev){
        whereClauses = {
            is_dev: true
        }
    }
    else{
        whereClauses = {
            is_latest: true
        }
    }

    const versionList = await Versions.findAll({
        where: whereClauses,
        order: [['createdAt', 'DESC']]
    })
    const latest = versionList[0];
    if(latest == undefined){
        error(302);
    }
    const hasNewVersion = compareVersion(userVersion, latest.version);

    var mode = isDev?"Development":"Production";

    var response: any = {};
    response.hasNewVersion = hasNewVersion;
    if(hasNewVersion){
        const fileList = await getFileList(mode, latest.version);
        const latestFile = fileList.data.content.filter(e => e.file_type=='pck')[0]; //筛选文件类型为pck的文件
        const latestFileApk = fileList.data.content.filter(e => e.file_type=='apk')[0]; //筛选文件类型为pck的文件
        if(latestFile == undefined){
            error(302);
        }
        response = {
            ...response,
            isDev: isDev,
            version: latest.version,
            downloadUrl: latestFile.download_url,
            downloadUrlApk: latestFileApk.download_url,
            body: latest.body,
            fileSize: latestFile.file_size,
            fileSizeApk: latestFileApk.file_size,
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