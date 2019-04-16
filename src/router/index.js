import Vue from 'vue'
import Router from 'vue-router'
import demo from '@/components/HelloWorld'
import home from '@/components/home'
import userInfo from '@/components/home/userInfo'
import search from '@/components/Search'
import rank from '@/components/rank'
import songSort from '@/components/songSort'
import MvSort from '@/components/MvList/index'
import Mv from '@/components/Mv'
import ranklist from '@/components/rank/ranklist'
import sonSortMain from '@/components/home/SongListShow'
import registered from '@/components/user/registered'
import login from '@/components/user/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: home,
        user: userInfo
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/songSort',
      name: 'songSort',
      component: songSort,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/MvSort',
      name: 'MvSort',
      component: MvSort
    },
    {
      path: '/Mv/:id?',
      name: 'Mv',
      component: Mv
    },
    {
      path: '/ranklist/:id?',
      name: 'ranklist',
      component: ranklist
    },
    {
      path: '/sonSortMain/:id?',
      name: 'sonSortMain',
      component: sonSortMain
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/registered',
      name: 'registered',
      component: registered
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
