import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store = new Vuex.Store({
// 定义数据
  state: {
    user: {},
    userList: [],
    url: {
      // 首页内容
      home: '/cgi-bin/musicu.fcg?-=recom023915247485282398&g_tk=1981813800&loginUin=1737481208&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22category%22%3A%7B%22method%22%3A%22get_hot_category%22%2C%22param%22%3A%7B%22qq%22%3A%22%22%7D%2C%22module%22%3A%22music.web_category_svr%22%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A8%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A8%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%2C%22new_song%22%3A%7B%22module%22%3A%22newsong.NewSongServer%22%2C%22method%22%3A%22get_new_song_info%22%2C%22param%22%3A%7B%22type%22%3A5%7D%7D%2C%22new_album%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_info%22%2C%22param%22%3A%7B%22area%22%3A1%2C%22sin%22%3A0%2C%22num%22%3A10%7D%7D%2C%22new_album_tag%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_area%22%2C%22param%22%3A%7B%7D%7D%2C%22toplist%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetAll%22%2C%22param%22%3A%7B%7D%7D%2C%22focus%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetFocus%22%2C%22param%22%3A%7B%7D%7D%7D',
      // 首页推荐歌曲（由排行榜rap，并非真的推荐）
      homeRecommendSong: '/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8%C2%ACice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=58&_=1520777874472',
      // 首页推荐Mv
      homeGetMv: '/mv/fcgi-bin/getmv_by_tag?g_tk=1981813800&loginUin=1737481208&hostUin=0&format=json&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq.json&needNewCode=0&cmd=shoubo&lan=all',
      // 排行榜
      rankUrl: '/v8/fcg-bin/fcg_myqq_toplist.fcg?_=1554455002211&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1',
      // 搜索热搜
      hotSearchUrl: '/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1981813800&loginUin=1737481208&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
    },
    // 图片的前缀、后缀
    img: {
      sonT: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000',
      sonH: '.jpg?max_age=2592000',
      sonPcT: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000',
      songShowT: 'https://y.gtimg.cn/music/photo_new/T002R500x500M000',
      DieT: 'https://y.gtimg.cn/music/photo_new/T002R150x150M000',
      userImgT: 'https://y.gtimg.cn/music/photo_new/T001R150x150M000'
    },
    MvId: '',
    songList: [],
    songIndex: 0,
    tis: false,
    loveOff: false,
    song: {},
    songtj: true
  },
  mutations: {
    // 定义的方法，参数一: 行参，填入任何字母都可以。  参数二: 传参。
    // 获取MV的ID值，用于其他组件请求数据
    GetMvId (state, upadte) {
      state.MvId = upadte
    },
    songPush (state, data) {
      state.songList.splice(state.songIndex, 0, data)
      // console.log(state.songList)
    },
    songIndexFn (state, data) {
      state.songIndex = state.songIndex + data
      // console.log(state.songIndex)
    },
    userFn (state, data) {
      state.user = data
      console.log(data)
      // console.log(state.user)
    },
    userListFn (state, data) {
      state.userList = data
      // console.log(state.userList)
      this.commit('userFn', this.getters.userListLogin)
      localStorage.setItem('QQmusicUser', JSON.stringify(state.userList))
    },
    userListPush (state, data) {
      // 新用户注册
      //  1、把所有之前注册的账户退出
      state.userList.forEach(el => {
        el.login = false
      })
      // 2、由于数据引入的是同一个地址以及内存的值，vue会劫持相关数据
      // 导致如果一个列表里都是相同的内存以及地址的数据
      // 这个列表的所有数据，都会变成，最新push进来的数据

      // 原理
      // vue会劫持相关数据，如果是同一个地址就会添加同样的双向绑定
      // 给劫持的数据数据都加上getter和setter，也就是双向绑定
      // 所以导致 一旦有同内存的值push进来，列表相同的也会跟随着push进来的值改变

      // 解决
      // 用Object.assign进行拷贝，但是这份拷贝的，是没有去掉 双向绑定的
      // 然后拷贝完之后,把这份拷贝出来的进行json转换成字符串，这步可以去掉双休绑定
      // 转换完毕之后，再将这份字符串转换成json
      // 然后push
      state.userList.push(Object.assign({}, JSON.parse(JSON.stringify(data))))
      this.commit('userFn', this.getters.userListLogin)
      localStorage.setItem('QQmusicUser', JSON.stringify(state.userList))
      // console.log(state.userList)
    },
    userOut (state) {
      // 用户退出，将列表所有的用户退出
      state.userList.forEach(el => {
        el.login = false
      })
      // 刷新当前登录的状态
      this.commit('userFn', this.getters.userListLogin)
      // 保存当前账户列表
      localStorage.setItem('QQmusicUser', JSON.stringify(state.userList))
      // 退出当前保存的账号
      localStorage.removeItem('QQUserLogin')
      // localStorage.setItem('QQUserLogin', JSON.stringify())
    },
    userSongPudate (state, data) {
      state.userList.forEach(el => {
        if (el.Account === data.Account) {
          el = data
          this.commit('userFn', el)
          localStorage.setItem('QQmusicUser', JSON.stringify(state.userList))
        }
      })
    },
    tisFn (state, data) {
      state.tis = data
    }
  },
  // 类似于计算属性
  getters: {
    userListLogin (state) {
      let user
      state.userList.forEach(el => {
        if (el.login) {
          user = el
          localStorage.setItem('QQUserLogin', JSON.stringify(el))
        }
      })
      return user || {}
    },
    songTitle (state) {
      let Title
      console.log(1, state.song)
      if (state.song.data) {
        if (state.song.data.songname) {
          Title = state.song.data.songname
        }
      } else if (state.song.name) {
        if (state.song.singer) {
          Title = state.song.name
        }
      } else if (state.song.musicData) {
        Title = state.song.musicData.songname
      } else if (state.song.songname) {
        Title = state.song.songname
      }
      return Title
    }
  },
  // 异步操作，数据请求和定时器必须放在这里执行
  // 在单页面调用：this.$store.dispatch('updateActions', 10)
  actions: {
    updateActions (state, upadte) {
      setTimeout(() => {
        // 触发在vuex定义的方法
        state.commit('updateP', upadte)
      }, 1000)
    }
  }
})
// 把vuex暴露出去
export default store
