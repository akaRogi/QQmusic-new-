<template>
  <div class="Box" :style="height">
    <div class="bscroll" :style="height" ref="wrapper">
      <div>
        <tow-song-list
          :data="list"
          @idShow="idShow"
        ></tow-song-list>
      </div>
      <toast
        v-model="showPositionValue"
        type="text"
        :time="1500"
        :is-show-mask="false"
        text="成功~!"
        :position="position"
      ></toast>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vux'
import towSongList from '../public/towSongList'
import BScroll from 'better-scroll'
export default {
  name: 'Box',
  props: ['id', 'p'],
  components: {
    towSongList,
    Toast
  },
  data () {
    return {
      off: true,
      list: [],
      height: 0,
      sin: -30,
      ein: -1,
      requenstIng: true,
      position: 'default',
      showPositionValue: false,
      pY: 0
    }
  },
  methods: {
    hei () {
      let Box = document.getElementsByClassName('bsaBox')[0].offsetTop
      let scrollTop = document.documentElement.clientHeight
      this.height = 'height:' + (scrollTop - Box) + 'px'
      console.log(this.height)
    },
    requestFn (off) {
      if (this.id === this.p) {
        let This = this
        this.off = false
        if (this.requenstIng) {
          this.sin += 30
          this.ein += 30
          let url = `/qqCMusic/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&rnd=0.8945830067983296&g_tk=1981813800&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&categoryId=${this.p}&sortId=5&sin=${this.sin}&ein=${this.ein}`
          this.axios.get(url)
            .then(function (res) {
              if (off) {
                This.list.push(...res.data.data.list)
              } else {
                This.list = res.data.data.list
              }
              This.requenstIng = true
              This.scroll.refresh()
              This.showPosition('top')
              This.scroll.refresh()
              // This.showPosition()
              console.log(res.data.data.list)
            })
            .catch(function (error) {
              alert('载入失败')
              This.requenstIng = true
              console.log(error)
            })
        }
        this.requenstIng = false
      }
    },
    showPosition (position) {
      this.position = position
      this.showPositionValue = true
    },
    idShow (data) {
      this.$router.push('/sonSortMain/' + data.dissid)
      // console.log(data.dissid)
    }
  },
  created () {
    this.requestFn()
  },
  updated () {
  },
  mounted () {
    this.hei()
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, { // 初始化better-scroll
        probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true // 是否派发click事件
      })
      // 滑动过程中事件
      this.scroll.on('scroll', (pos) => {
        if (pos.y > 60) {
          console.log('松开刷新')
        }
      })
      // 滑动结束松开事件
      this.scroll.on('touchEnd', (pos) => {
        if (pos.y > 60) {
          // this.$store.dispatch('HomeRequest')
          console.log('已松开')
        } else if (pos.y < (this.scroll.maxScrollY - 80)) {
          this.requestFn(true)
        }
      })
    })
  },
  watch: {
    id (to) {
      this.scroll.refresh()
      if (this.off) {
        this.requestFn()
      }
    }
  }
}
</script>

<style scoped>
  .Box{
  }
  /*.Box >>> .weui-mask_transparent{*/
    /*top: 50%;*/
    /*position: fixed;*/
    /*z-index: 99;*/
  /*}*/
  /*.Box .vux-toast{*/
    /*position: fixed;*/
    /*top: 10%;*/
  /*}*/
  /*.Box >>> .weui-toast.vux-toast-top{*/
    /*position: fixed;*/
    /*top: 10%;*/
  /*}*/
</style>
