<template>
  <div class="search">
    <div class="searchBox">
      <router-link
        class="retun"
        to="/"
      >
        <x-icon type="ios-arrow-left" size="30"></x-icon>
      </router-link>
      <search
        v-model="value"
        cancel-text=" "
        @on-clear="blue"
        @on-focus="show1 = false"
        ref="search"
      ></search>
      <!--@on-blur="show1 = true"-->
    </div>
    <div
      class="BScroll"
      :style="heipx"
      ref="wrapper"
      v-show="!show1"
    >
      <div>
        <search-list
          :data="songList"
        ></search-list>
        <div>{{tis}}</div>
      </div>
    </div>
    <toast v-model="showPositionValue" type="text" :time="800" text="载入成功" :position="position"></toast>
    <hoe-search v-show="show1" @ret="ret"></hoe-search>
  </div>
</template>

<script>
import { Search, Toast } from 'vux'
import hoeSearch from './HotSearch'
import searchList from './searchList'
import BScroll from 'better-scroll'
export default {
  name: 'index',
  components: {
    Search,
    Toast,
    hoeSearch,
    searchList
  },
  data () {
    return {
      value: '',
      songList: [],
      show1: true,
      showPositionValue: false,
      position: 'default',
      heipx: '',
      tis: '',
      p: 0,
      requestOff: true
    }
  },
  methods: {
    blue () {
      this.show1 = true
      this.$refs.search.setBlur()
    },
    showPosition (position) {
      this.position = position
      this.showPositionValue = true
    },
    ret (data) {
      this.value = data
    },
    hei () {
      let Box = document.getElementsByClassName('BScroll')[0].offsetTop
      let scrollTop = document.documentElement.clientHeight
      this.heipx = 'height:' + (scrollTop - Box + 40) + 'px'
    },
    requer (off) {
      let This = this
      this.show1 = false
      if (this.requestOff) {
        this.p++
        let url = `/qqCMusic/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=56131004943587742&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${this.p}&n=30&w=${this.value}&g_tk=1981813800&loginUin=1737481208&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`
        this.axios.get(url)
          .then(function (res) {
            if (off) {
              This.songList.push(...res.data.data.song.list)
            } else {
              This.songList = res.data.data.song.list
            }
            This.tis = '上拉加载'
            This.showPosition('top')
            This.requestOff = true
          })
        this.requestOff = false
      }
    }
  },
  watch: {
    value (to) {
      this.p = 0
      this.requer()
      if (to === '') {
        this.show1 = true
      }
    }
  },
  mounted () {
    this.hei()
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true, // 是否派发click事件
        pullUpLoad: {
          threshold: -100 // 当上拉距离超过30px时触发 pullingUp 事件
        }
      })
      this.scroll.on('pullingUp', () => {
        this.tis = '松手进行加载'
        console.log(111)
        this.scroll.finishPullUp()
      })
      // 滑动结束松开事件
      this.scroll.on('touchEnd', (pos) => { // 上拉刷新
        if (pos.y > 30) {
          console.log('222222222222')
        } else if (pos.y < (this.scroll.maxScrollY - 100)) {
          // this.p += 20
          this.tis = '加载中...'
          console.log(222)
          this.requer(true)
          // this.request()
        } else {
          console.log(333)
          // this.$store.commit('puadloading', false)
        }
      })
    })
  }
}
</script>

<style scoped>
  .searchBox{
    display: flex;
    height: 100px;;
  }
  .retun{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    background: #32c27c;
    height: 107px;
    z-index: 9;
  }
  .searchBox >>> .vux-search-box{
    width: calc(100% - 50px);
    right: 0;
    left: initial;
  }
  .searchBox >>> .weui-search-bar{
    padding: 20px 20px 20px 0;
    background: #32c27c;
    z-index: 10;
  }
  .searchBox >>> input{
    height: 60px;
    padding-left: 50px;
    font-size: 38px;
    color: #fff;
  }
  .BScroll{
    overflow: hidden;
  }
  .searchBox >>> .weui-icon-search{
    top: calc(50% - 10px);
    font-size: 42px;
    color: #fff;
  }
  .searchBox >>> .weui-icon-clear{
    top: calc(50% - 12px);
    font-size: 30px;
    color: #fff;
  }
  .searchBox >>> .weui-search-bar__form{
    background: #2caa6d;
  }
  .searchBox >>> .weui-search-bar__form::after{
    background: initial;
    border: 0;
  }
  .searchBox >>> .weui-search-bar__box{
    background: #2caa6d;
  }
  .searchBox >>> .weui-search-bar__cancel-btn{
    width: 0px
  }
</style>
