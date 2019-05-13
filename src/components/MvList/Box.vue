<template>
  <div class="Box" :style="height">
    <div class="bscroll" :style="height" ref="wrapper">
      <div>
        <mv-list @IdShow="MvShow" :data="list" p="1000"></mv-list>
        <div>松手刷新</div>
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
import MvList from '../public/MvList'
import BScroll from 'better-scroll'
export default {
  name: 'Box',
  props: ['id', 'p'],
  components: {
    Toast,
    MvList
  },
  data () {
    return {
      msg: '松手刷新',
      off: true,
      requenstIng: true,
      list: [],
      height: 0,
      sin: -20,
      showPositionValue: false,
      position: 'default'
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
          this.sin += 20
          let url = `/qqUMusic/cgi-bin/musicu.fcg?g_tk=1981813800&loginUin=1737481208&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22mv_list%22%3A%7B%22module%22%3A%22MvService.MvInfoProServer%22%2C%22method%22%3A%22GetAllocMvInfo%22%2C%22param%22%3A%7B%22start%22%3A${this.sin}%2C%22size%22%3A20%2C%22version_id%22%3A7%2C%22area_id%22%3A${this.id}%2C%22order%22%3A1%7D%7D%7D`
          this.axios.get(url)
            .then(function (res) {
              if (off) {
                This.list.push(...res.data.mv_list.data.list)
              } else {
                This.list = res.data.mv_list.data.list
              }
              This.requenstIng = true
              // This.showPosition()
              console.log(res.data.mv_list.data.list)
              This.showPosition('top')
              This.scroll.refresh()
              This.msg = '载入成功'
            })
            .catch(function (error) {
              alert('载入失败')
              This.off = true
              This.requenstIng = true
              This.sin -= 20
              console.log(error)
            })
        }
        this.requenstIng = false
      }
    },
    MvShow (data) {
      this.$router.push('/Mv/' + data.vid)
      console.log(data)
    },
    showPosition (position) {
      this.position = position
      this.showPositionValue = true
    }
  },
  created () {
    if (this.off) {
      this.requestFn()
    }
  },
  mounted () {
    this.hei()
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, { // 初始化better-scroll
        probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true, // 是否派发click事件
        pullUpLoad: {
          threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
        }
      })
      this.scroll.on('pullingUp', () => {
        console.log(1111)
        this.scroll.finishPullUp()
        this.scroll.refresh()
      })

      // 滑动过程中事件
      this.scroll.on('scroll', (pos) => {
        if (pos.y > 60) {
          console.log('松开刷新')
          this.msg = '松开刷新'
        }
      })
      // 滑动结束松开事件
      this.scroll.on('touchEnd', (pos) => {
        if (pos.y > 60) {
          // this.$store.dispatch('HomeRequest')
          console.log('已松开')
        } else if (pos.y < (this.scroll.maxScrollY - 80)) {
          this.requestFn(true)
          this.refresh()
        } else {
        }
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
