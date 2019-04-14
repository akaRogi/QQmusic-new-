import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store = new Vuex.Store({
// 定义数据
  state: {
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
    songIndex: 0
  },
  mutations: {
    // 定义的方法，参数一: 行参，填入任何字母都可以。  参数二: 传参。
    // 获取MV的ID值，用于其他组件请求数据
    GetMvId (state, upadte) {
      state.MvId = upadte
    },
    songPush (state, data) {
      state.songList.splice(state.songIndex, 0, data)
      console.log(state.songList)
    },
    songIndexFn (state, data) {
      state.songIndex = state.songIndex + data
      console.log(state.songIndex)
    }
  },
  // 类似于计算属性
  getters: {
    totals (state) {
      return state.p
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
