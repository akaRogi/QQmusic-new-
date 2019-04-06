<template>
  <div class="Mv">
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
      t1Hei: '100px'
    }
  },
  methods: {
    Gethei () {
      let main = document.getElementsByClassName('t1')[this.i].offsetHeight
      this.$nextTick(() => {
        this.$refs.cateSwiper.xheight = main + 'px'
      })
    }
  },
  watch: {
    i (to) {
      this.Gethei()
    }
  },
  mounted () {
    this.Gethei()
  },
  created () {
    let id = this.$route.params.id
    this.$store.commit('GetMvId', id)
  }
}
</script>

<style scoped>

</style>
