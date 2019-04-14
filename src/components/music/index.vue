<template>
  <div class="music">
    <div class="top">
      <div class="ret" @click="$emit('update:musicShow', false)">
        <x-icon type="ios-arrow-left" size="30"></x-icon>
      </div>
      <div>
        <h4>{{title(song)}}</h4>
      </div>
    </div>
    <div class="bg">
      <img :src="imgFn(song)" alt="">
    </div>
    <div class="imgShow">
      <img :src="imgFn(song)" alt="">
    </div>
    <div class="bottom">
      <div class="jdt">
        <div
          class="jdtBox"
          @touchend="ff"
        >
          <range
            decimal
            v-model="jdtData"
            :rangeBarHeight="2"
            ref="jtd"
            minHTML=" "
            maxHTML=" "
            :step="0.1"
            @ouseup="ff"
          ></range>
        </div>
      </div>
      <div class="btnBox">
        <div class="btn" @click="songPuda(-1)">
          <x-icon type="ios-arrow-left" size="30"></x-icon>
        </div>
        <div class="btn">
          <x-icon type="ios-ionic-outline" size="30"></x-icon>
        </div>
        <div class="btn" @click="songPuda(1)">
          <x-icon type="ios-arrow-right" size="30"></x-icon>
        </div>
      </div>
    </div>
    <audio crossOrigin="anonymous" :src="url" autoplay="autoplay" id="music"></audio>
  </div>
</template>

<script>
import { Range } from 'vux'
export default {
  name: 'index',
  components: {
    Range
  },
  data () {
    return {
      jdtData: 0,
      song: {},
      url: '',
      SongLeng: 0,
      Time: ''
    }
  },
  methods: {
    ff () {
      var md = document.getElementById('music')
      md.currentTime = this.SongLeng * (this.jdtData / 100)
    },
    title (data) {
      let title
      if (data.albumname) {
        title = data.albumname
      }
      return title
    },
    imgFn (data) {
      let img
      let T = this.$store.state.img.songShowT
      let H = this.$store.state.img.sonH
      if (data.albummid) {
        img = data.albummid
      }
      return T + img + H
    },
    songRequest (data) {
      let url
      // let T = 'http://ws.stream.qqmusic.qq.com/'
      // let T = 'http://dl.stream.qqmusic.qq.com/'
      console.log(3, this.song.songmid)
      let T = '/songShow/'
      let H = '?fromtag=0&guid=126548448&vkey='
      if (this.song.songmid) {
        url = this.song.songmid
        console.log(4, url)
      }
      let This = this
      let RecommendSong = `/qqCMusic/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=${url}&filename=C400${url}.m4a&guid=126548448`
      this.axios.get(RecommendSong)
        .then(function (res) {
          let id = res.data.data.items[0].filename
          let key = res.data.data.items[0].vkey
          This.url = T + id + H + key
          console.log(T + id + H + key)
        })
    },
    songPuda (num) {
      // 1下一首，-1上一首
      if (this.Time === '') {
        clearInterval(this.Time)
      }
      this.jdtData = 0
      this.$store.commit('songIndexFn', num)
    }
  },
  computed: {
    songList () {
      return this.$store.state.songList
    },
    songThis () {
      return this.$store.state.songIndex
    }
  },
  mounted () {
    let This = this
    setTimeout(() => {
      let btn = this.$refs.jtd.$el.getElementsByClassName('range-handle')[0]
      btn.style.top = ''
    }, 50)
    let music = document.getElementById('music')
    music.addEventListener('ended', function () {
      clearInterval(This.Time)
      // 播放完毕，下一首
      This.$store.commit('songIndexFn', 1)
      // if (This.songList[This.$store.state.songIndex - 1]) {
      //   This.song = This.songList[This.$store.state.songIndex - 1]
      //   This.songRequest()
      // } else {
      //   // 如果下一首没了，则把所以回调到上一首，但是不播放
      // }
      // console.log(This.$store.state.songIndex)
    })
    music.addEventListener('canplay', function () {
      This.SongLeng = music.duration
      if (This.Time === '') {
        This.Time = setInterval(() => {
          This.jdtData = music.currentTime / music.duration * 100
          console.log(music.currentTime / music.duration * 100)
          // console.log(222222222)
          // console.log(md.currentTime)
        }, 1000)
      }
    })
    // setInterval(() => {
    //
    // }, 1000)
  },
  watch: {
    songList (to) {
      // this.song = to[this.$store.state.songIndex - 1]
      // this.songRequest()
      // console.log(1, to[this.$store.state.songIndex - 1])
      // console.log(2, this.song)
    },
    songThis (to) {
      if (this.songList[to - 1]) {
        console.log(1, this.songList[to - 1])
        this.song = this.songList[to - 1]
        console.log(2, this.song)
        this.songRequest()
      } else {
        // this.$store.commit('songIndexFn', -1)
        alert('列表播放完毕')
      }
    }
  }
}
</script>

<style scoped>
  .music{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ebebeb;
    z-index: 999;
  }
  .bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-filter: blur(20px); /* Chrome, Opera */
    -moz-filter: blur(20px);
    -ms-filter: blur(20px);
    filter: blur(20px);
  }
  .bg img{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100%;
    transform: scale(1.5)
  }
  .top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ebebeb;
    z-index: 999;
    box-shadow: 0 0 25px 2px rgba(0,0,0,.7);
  }
  .top .ret{
    position: absolute;
    left: 0;
  }
  .top h4{
    font-size: 40px;
    font-weight: 400;
    color: #555555;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: #ebebeb;
    z-index: 999;
    box-shadow: 0 0 25px 2px rgba(0,0,0,.7);
  }
  .jdt{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  .jdtBox{
    display: block;
    width: 100%;
    margin-right: 40px;
  }
  .btnBox{
    display: flex;
    justify-content: center;
  }
  .btnBox div{
    margin: 0 30px;
  }
  .imgShow{
    position: absolute;
    width: 90%;
    height: fit-content;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    box-shadow: 0 0 15px 0 rgba(235, 235, 235, 0.63);
    /*border: 2px solid #ebebeb;*/
  }
</style>
