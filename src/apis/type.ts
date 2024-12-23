import httpRequest from "@/utils/http";

export function getTypeList() {
    return httpRequest({
        url: '/type/list',
        method: 'get',
    })
}