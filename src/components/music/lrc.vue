<template>
  <div class="lrc" ref="box" @click="ff">
    <div class="BScroll" :style="height" ref="wrapper">
      <ul>
        <li
          v-for="item of lrc.lines"
          :key="item.time"
          :data-time="item.time"
          ref="lyricLine"
        >{{item.txt}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'lrc',
  props: ['lrc', 'lrfOff'],
  data () {
    return {
      height: '',
      currentLineNum: '',
      lrcShow: true,
      lrcTimeShow: ''
    }
  },
  methods: {
    ff () {
      this.$emit('update:lrfOff', false)
    },
    hei () {
      let Box = document.getElementsByClassName('BScroll')[0].offsetTop
      let scrollTop = document.documentElement.clientHeight
      this.height = 'height:' + (scrollTop - Box - 145) + 'px'
      // console.log(this.height)
    }
  },
  computed: {
    SongTime () {
      return this.$store.state.SongTime
    }
  },
  mounted () {
    let scrollTop = document.documentElement.clientHeight
    this.$refs.box.style.height = scrollTop + 'px'
    this.hei()
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, { // 初始化better-scroll
        probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true // 是否派发click事件
      })
      this.scroll.on('scroll', (pos) => {
        this.lrcShow = false
        clearTimeout(this.lrcTimeShow)
      })
      // 滑动结束松开事件
      this.scroll.on('touchEnd', (pos) => { // 上拉刷新
        this.lrcTimeShow = setTimeout(() => {
          this.lrcShow = true
        }, 2000)
      })
      this.scroll.on('beforeScrollStart ', (post) => {
        this.lrcShow = false
        clearTimeout(this.lrcTimeShow)
      })
    })
  },
  watch: {
    SongTime (to) {
      let num = 0
      this.lrc.lines.forEach((el, index) => {
        if (Number(to) >= el.time) {
          num++
        }
      })
      // this.currentLineNum = lineNum
      // 等歌曲播放到10条的时候，才开始滚动
      if (num) {
        // lineEl是当前播放的时候，减10，用于滚动
        let lineEl = this.$refs.lyricLine[num - 10]
        // 用于情况歌词的样式
        let elem = this.$refs.lyricLine
        // 这条才是当前播放的歌词
        let elemShow = this.$refs.lyricLine[num - 1]
        elem.forEach(el => {
          el.className = ''
        })
        elemShow.className = 'show'
        // console.log(this.$refs.wrapper)
        // console.log(elemShow)
        if (this.lrcShow) {
          this.scroll.scrollToElement(lineEl, 1000)
        } else {
          console.log(2222222)
          this.scroll.scrollToElement(0, 1000)
        }
      } else {
        let This = this
        setTimeout(() => {
          This.scroll.scrollToElement(this.$refs.lyricLine[0], 1000)
        }, 100)
      }
      // this.playingLyric = txt
      // console.log(Number(to))
    }
  }
}
</script>

<style scoped>
  .lrc{
    padding: 120px 0 200px 0;
    box-sizing: border-box;
    overflow: hidden;
  }
  .BScroll li{
    font-size: 30px;
    text-align: center;
    color: #fff;
    line-height: 1.7;
  }
  .BScroll li.show{
    color: red;
    font-weight: 600;
  }
</style>
