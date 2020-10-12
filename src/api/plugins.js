import request from '@/utils/request'

export function getPlugins() {
  return request({
    url: '/plugins',
    method: 'get'
  })
}
