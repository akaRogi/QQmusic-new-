import Vue from 'vue'
import Router from 'vue-router'
import demo from '@/components/HelloWorld'
import home from '@/components/home'
import search from '@/components/Search'
import rank from '@/components/rank'
import songSort from '@/components/songSort'
import MvSort from '@/components/MvList/index'
import Mv from '@/components/Mv'
import ranklist from '@/components/rank/ranklist'
import sonSortMain from '@/components/home/SongListShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
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
      component: songSort
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
    }
  ]
})
