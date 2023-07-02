export function error(ctx,code){
    ctx.body = {
        "code": code
    }
}

export function respond(ctx, code, data){
    ctx.body = {
        "code": code,
        "data": data
    }
}