<template>
  <div class="songSort">
    <x-header
      title="歌单分类"
    ></x-header>
    <main>
      <tab :line-width=2 active-color='#fff' v-model="i">
        <tab-item
          class="vux-center"
          :selected="demo2 === item.categoryName"
          v-for="(item, index) in list"
          @click="demo2 = item.categoryName"
          :key="index">
          {{item.categoryName}}
        </tab-item>
      </tab>
      <swiper v-model="i" :height="height" :show-dots="false" class="bsaBox" :threshold="XZshow" :min-moving-distance="Xz">
        <swiper-item v-for="(item, index) in list" :key="index" :min-moving-distance="Xz">
          <div class="tab-swiper vux-center">
            <!--<div class="Box" :style="'height:' + height">-->
            <tow-song-list :id="id" :p="item.categoryId" @XShow="XShow"></tow-song-list>
            <!--</div>-->
          </div>
        </swiper-item>
      </swiper>
    </main>
  </div>
</template>

<script>
import { XHeader, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import towSongList from './Box'
export default {
  name: 'index',
  components: {
    XHeader,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    towSongList
  },
  data () {
    return {
      list: [],
      i: 0,
      demo2: '伤感',
      id: 52,
      //  better-scroll高度
      height: '',
      Xz: 100,
      XZshow: 150
    }
  },
  methods: {
    hei () {
      let Box = document.getElementsByClassName('bsaBox')[0].offsetTop
      let scrollTop = document.documentElement.clientHeight
      this.height = (scrollTop - Box) + 'px'
      // console.log(this.height)
    },
    XShow (data) {
      this.Xz = data.num
      this.XZshow = data.num
      // console.log(this.Xz)
      // console.log(this.XZshow)
    }
  },
  created () {
    let This = this
    let url = '/qqCMusic/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg?g_tk=1981813800&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
    this.axios.get(url)
      .then(function (res) {
        This.list = res.data.data.categories[4].items
        This.demo2 = res.data.data.categories[4].items[0].categoryName
        // console.log(res.data.data.categories[4])
      })
  },
  mounted () {
    this.hei()
  },
  watch: {
    i (to) {
      this.id = this.list[this.i].categoryId
      // console.log(this.id)
    }
  }
}
</script>

<style scoped>
  .bsaBox{
    overflow: hidden;
  }
  .songSort >>> .vux-tab{
    background: #32c27c;
    padding-bottom: 20px;
    color: #fff;
  }
  .songSort >>> .vux-tab-item.vux-tab-selected{
    font-size: 30px;
    font-weight: 700;
  }
  .songSort >>> .vux-tab-item {
    color: #fff;
    font-size: 24px;
  }
  .songSort >>> .vux-tab-wrap{
    padding-top: 70px;
  }
  .songSort >>> .vux-tab-container{
    padding-bottom: 20px;
  }
  .songSort >>> .vux-tab-ink-bar{
    bottom: 10px;
  }
  .songSort >>> .vux-header-left{
    top: calc(50% - 10px);
  }
  .songSort >>> .vux-header {
    background: #32c27c;
    padding: 25px 0;
    color: #fff;
  }
  .songSort >>> .vux-header-title span{
    font-weight: 700;
    font-size: 30px;
  }
  .songSort >>> .vux-header .vux-header-back{
    color: #fff;
    font-size: 24px;
  }
  .songSort >>> .vux-header .vux-header-left .left-arrow:before{
    border-color: #fff;
  }
</style>
