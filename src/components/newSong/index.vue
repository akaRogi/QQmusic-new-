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
          {{item.lan}}
        </tab-item>
      </tab>
      <swiper v-model="i" :height="height" :show-dots="false" class="bsaBox" :threshold="XZshow" :min-moving-distance="Xz">
        <swiper-item v-for="(item, index) in list" :key="index" :min-moving-distance="Xz">
          <div class="tab-swiper vux-center">
            <!--<div class="Box" :style="'height:' + height">-->
            <tow-song-list :id="id" :p="item.type" @XShow="XShow"></tow-song-list>
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
      id: 5,
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
      this.height = (scrollTop - Box - 45) + 'px'
      // console.log(this.height)
    },
    XShow (data) {
      this.Xz = data.num
      this.XZshow = data.num
    }
  },
  created () {
    let This = this
    let id = this.id
    let url = `/qqUMusic/cgi-bin/musicu.fcg? &g_tk=1981813800&loginUin=1737481208&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22newsong.NewSongServer%22%2C%22method%22%3A%22get_new_song_info%22%2C%22param%22%3A%7B%22type%22%3A${id}%7D%7D%7D`
    this.axios.get(url)
      .then(function (res) {
        if (This.list.length === 0) {
          This.list = res.data.new_song.data.lanlist
        }
      })
  },
  mounted () {
    this.hei()
  },
  watch: {
    i (to) {
      this.id = this.list[this.i].type
      console.log(this.id)
      // console.log(this.id)
    }
  }
}
</script>

<style scoped>
  main{
    position: relative;
    z-index: 9999999;
  }
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
