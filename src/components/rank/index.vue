<template>
  <div id="rank">
    <!--<Title title="排行榜"></Title>-->
    <div class="Main" ref="wrapper" :style="heipx">
      <div class="bsecc">
        <Box
          v-for="(item, index) in data"
          :key="index"
          :data="item"
        ></Box>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Box from './Box'
export default {
  name: 'index',
  components: {
    Box
  },
  data () {
    return {
      data: [],
      heipx: ''
    }
  },
  methods: {
    hei () {
      let Box = document.getElementsByClassName('Main')[0].offsetTop
      let scrollTop = document.documentElement.clientHeight
      this.heipx = 'height:' + (scrollTop - Box) + 'px'
      console.log(this.heipx)
    }
  },
  created () {
    let This = this
    let url = '/qqCMusic' + this.$store.state.url.rankUrl
    this.axios.get(url)
      .then(function (response) {
        This.hei()
        This.data = response.data.data.topList
        console.log(response.data.data.topList)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  mounted () {
    // this.hei()
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, { // 初始化better-scroll
        probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true // 是否派发click事件
      })
    })
  }
  // computed () {
  //   this.hei()
  // }
}
</script>

<style scoped>
  .Main{
    margin: 0 16px;
    overflow: hidden;
  }
  .bsecc{
    padding-top: 20px;
  }
</style>
