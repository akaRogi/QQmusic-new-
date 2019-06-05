<template>
  <div class="Mv" v-if='hackReset'>
    <video-box></video-box>
    <main class="TabMain">
      <tab :line-width=2 active-color='#fc378c' v-model="i">
        <tab-item
          class="vux-center"
          :selected="tab === item"
          v-for="(item, index) in tab"
          @click="tab = item"
          :key="index">{{item}}</tab-item>
      </tab>
      <swiper
        v-model="i"
        :threshold="120"
        :min-moving-distance="60"
        :show-dots="false"
        ref="cateSwiper"
        @on-get-height="Gethei"
        class="swierBox"
      >
        <swiper-item>
          <div class="tab-swiper vux-center t1">
            <info-box
              :index="tab[i]"
            ></info-box>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="tab-swiper vux-center t1">
            <comment-box
              :index="tab[i]"
            ></comment-box>
          </div>
        </swiper-item>
      </swiper>
    </main>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import VideoBox from './VideoBox'
import InfoBox from './InfoBox'
import CommentBox from './CommentBox'
export default {
  name: 'index',
  components: {
    VideoBox,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    InfoBox,
    CommentBox
  },
  data () {
    return {
      i: 0,
      tab: ['详情', '评论'],
      t1Hei: '100px',
      hackReset: true
    }
  },
  methods: {
    Gethei () {
      let Box = document.getElementsByClassName('t1')[this.i].offsetTop
      let scrollTop = document.documentElement.clientHeight
      console.log(scrollTop - Box)
      this.$nextTick(() => {
        this.$refs.cateSwiper.xheight = '-webkit-fill-available'
      })
      // let main = document.getElementsByClassName('t1')[this.i].offsetHeight
      // console.log(main)
      // this.$nextTick(() => {
      //   this.$refs.cateSwiper.xheight = main + 'px'
      // })
    },
    off () {
      // 销毁Dom
      this.hackReset = false
      // 监控Dom是否发生变化（由于上面执行的销毁步骤,所以Dom发生的变化）
      this.$nextTick(() => {
        // 重新让Dom显示（由于用的是v-if，而不是v-show，所以在销毁的时候带子组件的内存一并清空
        // 所以子组件里面的动作将会重新走一遍（包括axios请求、以及获取一些页面数据）
        this.hackReset = true
      })
    }
  },
  watch: {
    i (to) {
      this.Gethei()
    },
    $route (to) {
      let id = to.params.id
      this.$store.commit('GetMvId', id)
      this.off()
      console.log(id)
    }
  },
  mounted () {
    this.Gethei()
  },
  created () {
    this.$store.commit('updateLoading', true)
    let id = this.$route.params.id
    this.$store.commit('GetMvId', id)
  }
}
</script>

<style scoped>
  .t1{
    /* height: -webkit-fill-available; */
    /* overflow-y: auto; */
  }
  .Mv >>> .vux-swiper {
    /* overflow-y: auto; */
  }
  .vux-slider .vux-swiper .vux-swiper-item{
    height: auto;
  }
</style>
