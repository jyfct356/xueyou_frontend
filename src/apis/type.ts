import httpInstance from "@/utils/http";

export default function getTypeList() {
    httpInstance({
        url: '/type/list',
        
    })
}