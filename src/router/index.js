import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)
export const ConstantRoutes = [{
  path: '/',
  component: Layout,
  redirect: '/plugins'
},
{
  path: '/',
  component: Layout,
  redirect: '/plugins',
  children: [{
    path: 'plugins',
    name: 'Plugins',
    component: () => import('@/views/dashboard/plugins'),
    meta: { title: '概况', icon: 'home' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/status',
  children: [{
    path: 'status',
    name: 'Status',
    component: () => import('@/views/dashboard/status'),
    meta: { title: '全局统计', icon: 'chart-bar' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/headers',
  children: [{
    path: 'headers',
    name: 'Headers',
    component: () => import('@/views/plug/headers'),
    meta: { title: 'Headers 修改', icon: 'edit' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/monitor',
  children: [{
    path: 'monitor',
    name: 'Monitor',
    component: () => import('@/views/plug/headers'),
    meta: { title: '自定义监控', icon: 'desktop' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/redirect',
  children: [{
    path: 'redirect',
    name: 'redirect',
    component: () => import('@/views/plug/headers'),
    meta: { title: 'URL重定向', icon: 'random' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/basic_auth',
  children: [{
    path: 'basic_auth',
    name: 'Basic_auth',
    component: () => import('@/views/plug/headers'),
    meta: { title: 'Basic Auth', icon: 'ban' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/key_auth',
  children: [{
    path: 'key_auth',
    name: 'Key_auth',
    component: () => import('@/views/plug/headers'),
    meta: { title: 'Key Auth', icon: 'key' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/jwt_auth',
  children: [{
    path: 'jwt_auth',
    name: 'Jwt_auth',
    component: () => import('@/views/plug/headers'),
    meta: { title: 'Jwt Auth', icon: 'map-signs' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/hmac_auth',
  children: [{
    path: 'hmac_auth',
    name: 'Hmac_auth',
    component: () => import('@/views/plug/headers'),
    meta: { title: 'Hmac Auth', icon: 'lock' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/signature_auth',
  children: [{
    path: 'signature_auth',
    name: 'Signature_auth',
    component: () => import('@/views/plug/headers'),
    meta: { title: 'Signature Auth', icon: 'minus-circle' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/rate_limiting',
  children: [{
    path: 'rate_limiting',
    name: 'Rate_limiting',
    component: () => import('@/views/plug/headers'),
    meta: { title: 'Rate Limiting', icon: 'filter' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/property_rate_limiting',
  children: [{
    path: 'property_rate_limiting',
    name: 'Property_rate_limiting',
    component: () => import('@/views/plug/headers'),
    meta: { title: 'Property Rate Limiting', icon: 'filter' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/waf',
  children: [{
    path: 'waf',
    name: 'Waf',
    component: () => import('@/views/plug/headers'),
    meta: { title: 'WAF', icon: 'exclamation-triangle' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/divide',
  children: [{
    path: 'divide',
    name: 'Divide',
    component: () => import('@/views/plug/headers'),
    meta: { title: '代理&分流', icon: 'arrows-alt' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/kvstore',
  children: [{
    path: 'kvstore',
    name: 'Kvstore',
    component: () => import('@/views/plug/headers'),
    meta: { title: 'KVStore', icon: 'th' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/help',
  children: [{
    path: 'help',
    name: 'Help',
    component: () => import('@/views/other/help'),
    meta: { title: '帮助', icon: 'futbol' }
  }]
}]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: ConstantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
