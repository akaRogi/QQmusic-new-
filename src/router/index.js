import Vue from 'vue'
import Router from 'vue-router'
import demo from '@/components/HelloWorld'
import home from '@/components/home'
import userInfo from '@/components/home/userInfo'
import search from '@/components/Search'
import rank from '@/components/rank'
import songSort from '@/components/songSort'
import newSon from '@/components/newSong'
import MvSort from '@/components/MvList/index'
import Mv from '@/components/Mv'
import ranklist from '@/components/rank/ranklist'
import sonSortMain from '@/components/home/SongListShow'
import registered from '@/components/user/registered'
import login from '@/components/user/login'
import UserSong from '@/components/user/SongList'
import SongListPush from '@/components/user/SongListPush'
import LocalhostSon from '@/components/user/LocalhostSon'
import Songer from '@/components/songEr'
import SongerShow from '@/components/songEr/SongErShow'
import BottomMusic from '@/components/music/BottomMusic'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: home,
        user: userInfo,
        BottomMusic: BottomMusic
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
    },
    {
      path: '/UserSong',
      name: 'UserSong',
      component: UserSong
    },
    {
      path: '/SongListPush',
      name: 'SongListPush',
      component: SongListPush
    },
    {
      path: '/LocalhostSon/:id?',
      name: 'LocalhostSon',
      component: LocalhostSon
    },
    {
      path: '/newSon',
      name: 'newSon',
      component: newSon
    },
    {
      path: '/Songer',
      name: 'Songer',
      component: Songer
    },
    {
      path: '/SongerShow/:id?',
      name: 'SongerShow',
      component: SongerShow
    },
    {
      path: '/newDie',
      name: 'demo',
      component: demo
    }
  ]
})
export default router
router.beforeEach((to, from, next) => {
  if (
    to.name === 'registered' ||
    to.name === 'login'
  ) {
    if (!JSON.parse(localStorage.getItem('QQUserLogin')) || JSON.parse(localStorage.getItem('QQUserLogin')) === {}) {
      console.log(JSON.parse(localStorage.getItem('QQUserLogin')))
      next()
    }
  } else {
    next()
  }
})
