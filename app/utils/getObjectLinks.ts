import fetch from 'node-fetch';
const config = require('../config/config')
async function getObjectLinks(id: String) {
    const response = await fetch(
        'https://www.teambition.com/api/v2/tasks/'+id+'/objectlinks',
        {
            headers:{
                'Cookie': config.cookie
            }
        });
    const data = await response.json();
    return data;
}

export default getObjectLinks;
