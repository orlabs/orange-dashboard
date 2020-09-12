import request from '@/utils/request'

export function getStatus(params) {
  return request({
    url: '/stat/status',
    method: 'get',
    params
  })
}
