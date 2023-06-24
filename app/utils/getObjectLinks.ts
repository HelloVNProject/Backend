import fetch from 'node-fetch';
async function getObjectLinks(id: String) {
    const response = await fetch(
        'https://www.teambition.com/api/v2/tasks/'+id+'/objectlinks',
        {
            headers:{
                'Cookie': 'TEAMBITION_SESSIONID=eyJhdXRoVXBkYXRlZCI6MTYzNjA4Nzk5MzM4MiwibG9naW5Gcm9tIjoidGVhbWJpdGlvbiIsInVpZCI6IjVmNThlMjcwYjBkMmVlMzMyMDRiZDIwNSIsInVzZXIiOnsiX2lkIjoiNWY1OGUyNzBiMGQyZWUzMzIwNGJkMjA1IiwibmFtZSI6IlJvbWlud29sZiIsImVtYWlsIjoiaW1Ad3NtLmluayIsImF2YXRhclVybCI6Imh0dHBzOi8vdGNzLnRlYW1iaXRpb24ubmV0L3RodW1ibmFpbC8xMTJjMDQ3MmRjODJlYzk1NmFmZDUyNzM3YmMxMzQxMTU3OTgvdy8yMDAvaC8yMDAiLCJyZWdpb24iOiJjbiIsImxhbmciOiIiLCJpc1JvYm90IjpmYWxzZSwib3BlbklkIjoiIiwicGhvbmVGb3JMb2dpbiI6IjE3NjMzMDY1MjI5In19; TEAMBITION_SESSIONID.sig=vXLWmNVjrOCovOQx4Wt4PuyFj0M;'
            }
        });
    const data = await response.json();
    return data;
}

export default getObjectLinks;