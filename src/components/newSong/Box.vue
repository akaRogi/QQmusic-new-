<template>
  <div class="Box" :style="height">
    <div class="bscroll" :style="height" ref="wrapper">
      <div>
        <list-box :data="list"></list-box>
      </div>
    </div>
  </div>
</template>

<script>
import ListBox from '../public/DieOfSon'
import BScroll from 'better-scroll'
export default {
  name: 'Box',
  props: ['id', 'p'],
  components: {
    ListBox
  },
  data () {
    return {
      off: true,
      list: [],
      height: ''
    }
  },
  methods: {
    hei () {
      let Box = document.getElementsByClassName('bsaBox')[0].offsetTop
      let scrollTop = document.documentElement.clientHeight
      this.height = 'height:' + (scrollTop - Box) + 'px'
      console.log(this.height)
    },
    requestFn () {
      if (this.id === this.p) {
        let This = this
        let id = this.id
        let url = `/qqUMusic/cgi-bin/musicu.fcg? &g_tk=1981813800&loginUin=1737481208&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22newsong.NewSongServer%22%2C%22method%22%3A%22get_new_song_info%22%2C%22param%22%3A%7B%22type%22%3A${id}%7D%7D%7D`
        this.axios.get(url)
          .then(function (res) {
            This.off = false
            This.list = res.data.new_song.data.songlist
            console.log(res.data.new_song.data.songlist)
          })
          .catch(function (error) {
            This.off = true
            console.log(error)
          })
      }
    }
  },
  created () {
    this.requestFn()
  },
  mounted () {
    this.hei()
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, { // 初始化better-scroll
        probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true // 是否派发click事件
      })
    })
  },
  watch: {
    id (to) {
      // this.scroll.refresh()
      if (this.off) {
        this.requestFn()
      }
    }
  }
}
</script>

<style scoped>

</style>
