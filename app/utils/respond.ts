export function error(code){
    throw new Error(code);
}

export function respond(ctx, code, data){
    ctx.body = {
        "code": code,
        "data": data
    }
}