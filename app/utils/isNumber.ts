export function isNumber(obj: string){
    const parsed = parseInt(obj);
    console.log(obj);
    console.log(parsed);
    if(isNaN(parsed))return false;
    return true;
}