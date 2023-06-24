function compareVersion (current, latest){
    var currentVer = current.split('.').map(function (e) {
        return parseInt(e);
    });;
    
    var latestVer = latest.split('.').map(function (e) {
        return parseInt(e);
    });;

    var maxLength = Math.max(currentVer.length, latestVer.length);

    for(var i=0; i<maxLength; i++){
        if(latestVer[i]>currentVer[i] || currentVer[i] == undefined){
            return true;
        }
    }
    return false;
}

export default compareVersion