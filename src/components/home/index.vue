<template>
  <div class="home">
      <div class="search">
        <header-search></header-search>
      </div>
      <div class="BScroll" :style="height" ref="wrapper">
        <div>
          <banner-box :data="banner"></banner-box>
          <nav-box></nav-box>
          <radio-box :data="newSong"></radio-box>
          <main>
            <song-list @IdShow="SongShow" :title="'推荐歌单'" :data="songlist"></song-list>
            <song-list @IdShow="pushSong" :title="'推荐歌曲'" :data="RecommendSong"></song-list>
            <mv-list @IdShow="MvShow" :title="'推荐Mv'" :data="RecommendMv" p="5"></mv-list>
          </main>
        </div>
      </div>
  </div>
</template>

<script>
import HeaderSearch from '../public/HeaderSearch'
import BannerBox from './BannerBox'
import NavBox from './NavBox'
import RadioBox from './RadioBox'
import SongList from '../public/SongList'
import MvList from '../public/MvList'
import BScroll from 'better-scroll'
export default {
  name: 'index',
  components: {
    HeaderSearch,
    BannerBox,
    NavBox,
    RadioBox,
    SongList,
    MvList
  },
  data () {
    return {
      // Banner图
      banner: [],
      // 推荐歌单
      songlist: [],
      // 推荐歌曲
      RecommendSong: [],
      // 推荐Mv
      RecommendMv: [],
      //  better-scroll高度
      height: '',
      // 新歌
      newSong: [{album: {}}]
    }
  },
  methods: {
    hei () {
      let Box = document.getElementsByClassName('BScroll')[0].offsetTop
      let scrollTop = document.documentElement.clientHeight
      this.height = 'height:' + (scrollTop - Box - 60) + 'px'
      // console.log(111, )
    },
    // 歌单展示
    SongShow (data) {
      this.$router.push('/sonSortMain/' + data.content_id)
      // console.log(data)
    },
    // 添加点击的歌曲
    pushSong (data) {
      this.$store.commit('songPush', data.data)
      this.$store.commit('songIndexFn', 1)
    },
    MvShow (data) {
      this.$router.push('/Mv/' + data.vid)
      // console.log(data.vid)
    }
  },
  mounted () {
    this.hei()
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, { // 初始化better-scroll
        probeType: 2, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true // 是否派发click事件
      })
      // 滑动过程中事件
      this.scroll.on('scroll', (pos) => {
        if (pos.y > 60) {
          // this.$store.commit('puadloading', true)
          console.log('松开刷新')
        }
      })
      // 滑动结束松开事件
      this.scroll.on('touchEnd', (pos) => { // 上拉刷新
        if (pos.y > 60) {
          // this.$store.dispatch('HomeRequest')
          console.log('已松开')
        } else {
          // this.$store.commit('puadloading', false)
        }
      })
    })
  },
  created () {
    this.$store.commit('updateLoading', true)
    let This = this
    let url = '/qqUMusic' + this.$store.state.url.home
    this.axios.get(url)
      .then(function (res) {
        This.$store.commit('updateLoading', false)
        This.banner = res.data.focus.data.content
        This.songlist = res.data.recomPlaylist.data.v_hot
        This.newSong = res.data.new_song.data.songlist
        This.scroll.refresh()
        // console.log(res.data.new_song.data.songlist)
      })
    // https://c.y.qq.com
    let RecommendSong = '/qqCMusic' + this.$store.state.url.homeRecommendSong
    this.axios.get(RecommendSong)
      .then(function (res) {
        This.RecommendSong = res.data.songlist
        This.scroll.refresh()
        // console.log(res.data.songlist)
      })
    let RecommendMv = '/qqCMusic' + this.$store.state.url.homeGetMv
    this.axios.get(RecommendMv)
      .then(function (res) {
        This.RecommendMv = res.data.data.mvlist
        This.scroll.refresh()
        // console.log(res.data.data.mvlist)
      })
  }
}
</script>

<style scoped>
  .home{
    overflow: hidden;
  }
  .search{
    position: relative;
    z-index: 99;
  }
  .home >>> .vux-popup-mask{
     background: rgba(0, 0, 0, .2);
   }
</style>
