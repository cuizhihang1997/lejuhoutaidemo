import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  
  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    meta: { title: '订单管理', icon: 'dashboard' },

    children: [
      {
      path: 'order',
      name: 'order',
      component: () => import('@/views/order/index'),
      meta: { title: '订单管理', icon: 'dashboard' }
    },

    {
      path: 'detail/:orderId',
      name: 'orderDetail',
      component: () => import('@/views/order/detil/index'),
      meta: { title: '订单详情', icon: 'table' },
      hidden: true
    },
    {
      path: 'orderBack',
      name: 'orderBack',
      component: () => import('@/views/order/orderBack/index'),
      meta: { title: '退单管理', icon: 'tree' }
    },
    {
      path: 'orderBack/:backId',
      name: 'orderBackDetail',
      component: () => import('@/views/order/orderBack/detail/index'),
      meta: { title: '退单明细', icon: 'tree' },
      hidden: true
    }    
    
   
  
  ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article',
    meta: { title: '文章管理', icon: 'dashboard' },
  
    children: [
      {
      path: 'article',
      name: 'article',
      component: () => import('@/views/article/index'),
      meta: { title: '文章管理', icon: 'dashboard' }
    },
    {
      path: 'article/detil',
      name: 'article/detil',
      component: () => import('@/views/article/detil/index'),
      meta: { title: '新增文章', icon: 'dashboard' },
      hidden:true,
    },
    {
      path: 'article/detil/:id',
      name: 'article/detilz',
      component: () => import('@/views/article/detil/index'),
      meta: { title: '文章详情(修改)', icon: 'dashboard' },
      hidden:true,
    }
  ]
  
  },
  {
    path: '/home',
    component: Layout,
   
    meta: { title: '首页管理', icon: 'dashboard' },
  
    children: [
      {
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页管理', icon: 'dashboard' }
    },
   
  ]
  
  },
  {
    path: '/user',
    component: Layout,
   
    meta: { title: '用户管理', icon: 'dashboard' },
  
    children: [
      {
      path: 'user',
      name: 'user',
      component: () => import('@/views/user/index'),
      meta: { title: '用户管理', icon: 'dashboard' }
    },
   
  ]
  
  },

  {
    path: '/product',
    component: Layout,
    redirect: '/example/product',
    name: 'Example',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/product/index'),
        meta: { title: '商品管理', icon: 'table' }
      },
      {
        path: 'kind',
        name: 'kind',
        component: () => import('@/views/kind/index'),
        meta: { title: '分类管理', icon: 'table' }
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/brand/index'),
        meta: { title: '品牌管理', icon: 'table' }
      },
      {
        path: 'sku',
        name: 'sku',
        component: () => import('@/views/sku/index'),
        meta: { title: '库存管理', icon: 'table' }
      },
      {
        path: '/add',
        name: 'add',
        component: () => import('@/views/product/add/index'),
        meta: { title: '新增商品', icon: 'table' },
        hidden: true

      },
      {
        path: '/add:id',
        name: 'addz',
        component: () => import('@/views/product/add/index'),
        meta: { title: '更新商品', icon: 'table' },
        hidden: true

      },
      {
        path: '/series',
        name: 'series',
        component: () => import('@/views/series/index'),
        meta: { title: '系列管理', icon: 'table' },
      
      },
      {
        path: '/material',
        name: 'material',
        component: () => import('@/views/material/index'),
        meta: { title: '素材管理', icon: 'table' },
      
      },

      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
