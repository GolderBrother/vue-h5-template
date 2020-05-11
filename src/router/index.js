import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'
import componentsRouter from './modules/components'

Vue.use(VueRouter)

export const routes = [{
    path: '/redirect',
    component: Layout,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/pages/redirect/index')
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      component: () => import('@/pages/home/index'),
      name: 'Home',
      // keepAlive: 区分页面是否需要缓存
      // auth: 是否需要登录
      meta: {
        title: '首页',
        keepAlive: true,
        auth: false
      },
    }]
  },
  {
    path: '/test',
    component: Layout,
    children: [{
        path: 'create',
        component: () => import('@/pages/test/index'),
        name: 'CreateTest',
        meta: {
          title: '添加地址'
        }
      },
      {
        path: 'edit/:id',
        component: () => import('@/pages/test/index'),
        name: 'EditTest',
        meta: {
          title: '修改地址',
          keepAlive: true
        }
      }
    ]
  },
  // Skeleton
  {

    path: '/skeleton',
    component: Layout,
    children: [{
      path: 'skeleton1',
      component: () => import('@/common/Skeleton/Skeleton1'),
      name: 'Skeleton1',
      // keepAlive: 区分页面是否需要缓存
      // auth: 是否需要登录
      meta: {
        title: 'Skeleton1',
        keepAlive: false,
        auth: false
      },
    }, {
      path: 'skeleton2',
      component: () => import('@/common/Skeleton/Skeleton2'),
      name: 'Skeleton2',
      // keepAlive: 区分页面是否需要缓存
      // auth: 是否需要登录
      meta: {
        title: 'Skeleton2',
        keepAlive: false,
        auth: false
      },
    }]
  },
  componentsRouter
]

const createRouter = () => new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})

const router = createRouter()

router.beforeEach((to, from, next) => {
  // 由于单页面应用只有一个 html，所有页面的 title 默认是不会改变的，但是我们可以才路由配置中加入相关属性，再在路由守卫中通过 js 改变页面的 title
  document.title = to.meta.title
  const userInfo = sessionStorage.getItem('userInfo') || null
  // 在路由首页进行判断。当to.meta.auth为true(需要登录)，且不存在登录信息缓存时，需要重定向去登录页面
  if (!userInfo && to.meta.auth) {
    next('/login')
  } else {
    next()
  }
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
