import Vue from 'vue'
import Router from 'vue-router'
import demo from '@/components/HelloWorld'
import home from '@/components/home'
import rank from '@/components/rank'
import songSort from '@/components/songSort'
import Mv from '@/components/Mv'
import ranklist from '@/components/rank/ranklist'
import sonSortMain from '@/components/home/SongListShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/songSort',
      name: 'songSort',
      component: songSort
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
