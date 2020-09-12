import request from '@/utils/request'

export function getSelectors(params) {
  return request({
    url: '/headers/selectors',
    method: 'GET',
    params
  })
}

export async function addSelectors(params) {
  return request({
    url: '/headers/selectors',
    method: 'POST',
    data: 'selector=' + params
  })
}

export function fetchConfig(params) {
  return request({
    url: '/headers/fetch_config',
    method: 'GET',
    params
  })
}

export function enablePlug(params) {
  return request({
    url: '/headers/enable',
    method: 'POST',
    params
  })
}

export async function syncPlugData() {
  return request({
    url: '/headers/sync',
    method: 'POST'
  })
}
