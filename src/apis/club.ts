import httpRequest from "@/utils/http";

export function getClubPage(params: object) {
    return httpRequest({
        url: '/club/page',
        method: 'get',
        params: params,
    })
}

export function countClub() {
  return httpRequest({
      url: '/club/count',
      method: 'get',
  })
}