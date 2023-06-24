import fetch from 'node-fetch';
async function getSingleVersion() {
    const response = await fetch(
        'https://www.teambition.com/api/v2/projects/64858fb538fc39ba5c02b4de/tasks?filter=_stageId%3D64941d2a6fc4cc356b625cd3%20AND%20_tasklistId%3D64858fb577355b2c82af2b8a%20AND%20(taskLayer%20IN%20(0)%20OR%20isTopInProject%20%3D%20true)%20ORDER%20BY%20created%20DESC%20',
        {
            headers:{
                'Cookie': 'TEAMBITION_SESSIONID=eyJhdXRoVXBkYXRlZCI6MTYzNjA4Nzk5MzM4MiwibG9naW5Gcm9tIjoidGVhbWJpdGlvbiIsInVpZCI6IjVmNThlMjcwYjBkMmVlMzMyMDRiZDIwNSIsInVzZXIiOnsiX2lkIjoiNWY1OGUyNzBiMGQyZWUzMzIwNGJkMjA1IiwibmFtZSI6IlJvbWlud29sZiIsImVtYWlsIjoiaW1Ad3NtLmluayIsImF2YXRhclVybCI6Imh0dHBzOi8vdGNzLnRlYW1iaXRpb24ubmV0L3RodW1ibmFpbC8xMTJjMDQ3MmRjODJlYzk1NmFmZDUyNzM3YmMxMzQxMTU3OTgvdy8yMDAvaC8yMDAiLCJyZWdpb24iOiJjbiIsImxhbmciOiIiLCJpc1JvYm90IjpmYWxzZSwib3BlbklkIjoiIiwicGhvbmVGb3JMb2dpbiI6IjE3NjMzMDY1MjI5In19; TEAMBITION_SESSIONID.sig=vXLWmNVjrOCovOQx4Wt4PuyFj0M;'
            }
        });
    const data = await response.json();
    return data;
}

export default getSingleVersion;