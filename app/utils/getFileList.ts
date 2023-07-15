import {fetch, Headers} from 'node-fetch';

async function getFileList(mode, version){
    var urlencoded = new URLSearchParams();
    urlencoded.append("path", `/HelloVN/${mode}/${version}`);
    var headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Cookie", "file_pwd=32d493ef778082c2f10a2f3b5f06a999:new%20HelloVN()->getDevPwd()%3B");
    
    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: urlencoded
     };
    const response = await fetch("https://space.wsm.ink/api/v3/public/index", requestOptions)
    
    const data = await response.json();
    return data;
}

export default getFileList