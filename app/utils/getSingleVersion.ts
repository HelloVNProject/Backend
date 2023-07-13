import fetch from 'node-fetch';
const config = require('../config/config')
async function getSingleVersion() {
    const response = await fetch(
        'https://www.teambition.com/api/v2/projects/64858fb538fc39ba5c02b4de/tasks?filter=_stageId%3D64941d2a6fc4cc356b625cd3%20AND%20_tasklistId%3D64858fb577355b2c82af2b8a%20AND%20(taskLayer%20IN%20(0)%20OR%20isTopInProject%20%3D%20true)%20ORDER%20BY%20created%20DESC%20',
        {
            headers:{
                'Cookie': config.cookie
            }
        });
    const data = await response.json();
    return data;
}

export default getSingleVersion;
