<template>
  <div class="Box wrap" :style="heipx" ref="wrapper">
    <ul class="Main">
      <router-link
        tag="li"
        v-for="(item, index) in data"
        :key="index"
        :to="'/Mv/' + item.vid"
        class="One"
      >
        <div class="imgBox">
          <img :src="item.picurl || item.cover_pic" alt="">
        </div>
        <div class="Text">
          <p>{{item.title || item.name}}</p>
          <p>
          <span v-for="(songer, j) in item.singers"
                :key="j"
          >{{songer.name}}</span>
          </p>
          <p v-if="item.uploader_nick">{{'来自：' + item.uploader_nick}}</p>
          <p>{{playcnt(item.playcnt)}}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'MvEcommend',
  props: ['data'],
  data () {
    return {
      heipx: 0
    }
  },
  methods: {
    playcnt (num) {
      let playNum = num
      if (playNum >= 10000) {
        // console.log((playNum / 10000).toFixed(1))
        playNum = (playNum / 10000).toFixed(1)
        if (playNum.charAt(playNum.length - 1) === '0') {
          playNum = (num / 10000).toFixed(0)
        }
        playNum = playNum + '万'
      }
      return playNum
    },
    hei () {
      let Box = document.getElementsByClassName('wrap')[0]
      let offsetTop = 0
      let top = 0
      while (Box && Box.tagName !== 'BODY') {
        if (offsetTop.tagName !== 'BODY') {
          top = Box.offsetTop
        }
        offsetTop += Box.offsetTop
        Box = Box.offsetParent
      }
      // console.log(top)
      let scrollTop = document.documentElement.clientHeight
      // console.log(Box)
      this.heipx = 'height:' + (scrollTop - top - 46) + 'px'
      // console.log(this.heipx)
    }
  },
  mounted () {
    this.hei()
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, { // 初始化better-scroll
        probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true // 是否派发click事件
      })
    })
  }
}
</script>

<style scoped>
  .Box{
    overflow: hidden;
  }
  .Main{
    overflow: hidden;
  }
  .Main li{
    width: calc(50% - 5px);
    margin-bottom: 20px;
    float: left;
  }
  .Main li.One{
    width: 100%;
    display: flex;
  }
  .Main li.One .imgBox{
    width: 30%;
  }
  .Main li.One .Text{
    width: calc(70% - 20px);
    margin-left: 20px;
  }
  .Main li:nth-child(odd){
    margin-right: 10px;
  }
  .Main li img{
    width: 100%;
  }
  .imgBox{
    margin-bottom: 10px;
  }
  .Main li p{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    line-height: 1.8;
  }
  .Main li.One{
    width: 100%;
    display: flex;
  }
  .Main li.One .imgBox{
    width: 30%;
  }
  .Main li.One .Text{
    width: calc(70% - 20px);
    margin-left: 20px;
  }
</style>
