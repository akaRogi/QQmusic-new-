<template>
  <div class="music">
    <div class="top">
      <div class="ret" @click="$store.state.musicShow = false">
        <x-icon type="ios-arrow-left" size="30"></x-icon>
      </div>
      <div class="titleBox">
        <h4 class="one-txt-cut">{{title(song)}}</h4>
      </div>
    </div>
    <div class="bg">
      <img :src="imgFn(song)" alt="">
    </div>
      <transition name="fade">
        <div class="imgShow" v-show="!lrc">
          <img :src="imgFn(song)" alt="" @click="lrcShow">
        </div>
      </transition>
    <div class="bottom">
      <div class="jdt">
        <div
          class="jdtBox"
          @touchend="ff"
          @touchmove="timeStome"
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
        <div class="btn" @click="songFn">
          <x-icon type="ios-ionic-outline" size="30" v-show="stopOff"></x-icon>
          <x-icon type="ios-circle-filled" size="30" v-show="!stopOff"></x-icon>
        </div>
        <div class="btn" @click="songPuda(1)">
          <x-icon type="ios-arrow-right" size="30"></x-icon>
        </div>
        <div class="BtnType">
          <i class="iconfont icon-xunhuanbofang" v-if="typeIcon === 'all'" @click="typeShow('loop')"></i>
          <i class="iconfont icon-danquxunhuan" v-else-if="typeIcon === 'loop'" @click="typeShow('')"></i>
          <i class="iconfont icon-suijibofang" v-else @click="typeShow('all')"></i>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="lrcBox" v-show="lrc" @mousedown="down">
        <lrc :lrc="currentLyric" :lrfOff.sync="lrc"></lrc>
      </div>
    </transition>
    <div class="mark" v-show="lrc"></div>
    <audio
      :src="url"
      autoplay="autoplay"
      id="music"
      controls
      :loop="loop"
      hidden="true"
    ></audio>
  </div>
</template>

<script>
import Lyric from 'lyric-parser'
import { Range } from 'vux'
import lrc from './lrc'
export default {
  name: 'index',
  components: {
    Range,
    lrc
  },
  data () {
    return {
      jdtData: 0,
      song: {},
      url: '',
      SongLeng: 0,
      Time: '',
      stopOff: false,
      currentLyric: {},
      lrc: false,
      loop: false,
      typeIcon: 'all'
    }
  },
  methods: {
    typeShow (data) {
      if (data === 'loop') {
        this.loop = true
      } else {
        this.loop = false
      }
      this.typeIcon = data
      console.log(data)
    },
    down () {
      console.log(222)
    },
    lrcShow () {
      this.lrc = true
    },
    ff () {
      clearInterval(this.Time)
      this.Time = ''
      var md = document.getElementById('music')
      md.currentTime = this.SongLeng * (this.jdtData / 100)
    },
    timeStome () {
      clearInterval(this.Time)
    },
    title (data) {
      let title
      if (data.songname) {
        title = data.songname
      } else if (data.title) {
        title = data.title
      }
      return title
    },
    imgFn (data) {
      let img
      let T = this.$store.state.img.songShowT
      let H = this.$store.state.img.sonH
      if (data.albummid) {
        img = data.albummid
      } else if (data.album) {
        if (data.album.mid) {
          img = data.album.mid
        }
      }
      return T + img + H
    },
    songRequest (data) {
      let url
      // let T = 'http://ws.stream.qqmusic.qq.com/'
      // let T = 'http://dl.stream.qqmusic.qq.com/'
      // console.log(3, this.song.songmid)
      let T = '/songShow/'
      let H = '?fromtag=0&guid=126548448&vkey='
      if (this.song.songmid) {
        url = this.song.songmid
      } else if (this.song.mid) {
        url = this.song.mid
      }
      console.log(this.song)
      let This = this
      let RecommendSong = `/qqCMusic/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=${url}&filename=C400${url}.m4a&guid=126548448`
      this.axios.get(RecommendSong)
        .then(function (res) {
          console.log(res.data)
          let id = res.data.data.items[0].filename
          let key = res.data.data.items[0].vkey
          if (key) {
            // 原来可用，但是学校屏蔽了请求
            This.url = T + id + H + key
          } else {
            if (!This.loop) {
              This.$store.commit('songIndexFn', 1)
            } else if (This.typeIcon === '') {
              let num = Math.round(Math.random() * This.songList.length)
              if (This.$store.state.songIndex === Math.round(Math.random() * This.songList.length)) {
                This.$store.state.songIndex = Math.round(Math.random() * This.songList.length + 1)
              } else {
                This.$store.state.songIndex = num
              }
            }
          }
          // 虾米代替
          // This.url = 'http://localhost/酒僧.m4a'
          // console.log (T + id + H + key)
        })
      let id
      if (this.song.songid) {
        id = this.song.songid
      } else if (this.song.id) {
        id = this.song.id
      }
      console.log(13, this.song)
      this.axios.get(`/qqCMusic/lyric/fcgi-bin/fcg_query_lyric.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&nobase64=1&musicid=${id}&songtype=0&_=1513437581324`)
        .then(function (res) {
          console.log(res.data)
          let num1 = res.data.indexOf('(')
          let num2 = res.data.indexOf(')')
          let resultData = JSON.parse(res.data.substring(num1 + 1, num2))
          console.log(resultData.lyric)
          let lrc = resultData.lyric
          lrc = lrc.replace(/&#(\d+);/g, (str, match) => String.fromCharCode(match))
          console.info(lrc)
          This.currentLyric = new Lyric(lrc, This.handleLyric)
          console.log(This.currentLyric)
        })
    },
    songPuda (data) {
      // 1下一首，-1上一首
      if (this.typeIcon === '') {
        let num = Math.round(Math.random() * this.songList.length)
        if (this.$store.state.songIndex === Math.round(Math.random() * this.songList.length)) {
          this.$store.state.songIndex = Math.round(Math.random() * this.songList.length + 1)
        } else {
          this.$store.state.songIndex = num
        }
      } else {
        this.$store.commit('songIndexFn', data)
      }
      // if (this.songList.length !== 1) {
      //   if (this.songList.length !== this.songThis) {
      //     if (this.songThis !== 1) {
      //       this.$store.commit('songIndexFn', num)
      //     } else if (num === 1) {
      //       this.$store.commit('songIndexFn', num)
      //     }
      //   } else if (num === -1) {
      //     this.$store.commit('songIndexFn', num)
      //   }
      // } else {
      //   alert('没有可播放的歌曲')
      // }
      // if (num === -1) {
      //   if (this.songThis > 1) {
      //     this.$store.commit('songIndexFn', num)
      //   }
      // }
    },
    songFn () {
      let music = document.getElementById('music')
      if (music.paused) {
        this.stopOff = true
        this.$store.state.songtj = true
        music.play()
      } else {
        this.stopOff = false
        this.$store.state.songtj = false
        music.pause()
      }
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
      // clearInterval(This.Time)
      if (!this.loop) {
        // 播放完毕，判断下一首是否还存在歌曲
        This.$store.commit('songIndexFn', 1)
        This.jdtData = 100
        This.stopOff = false
      } else if (this.typeIcon === '') {
        let num = Math.round(Math.random() * this.songList.length)
        if (this.$store.state.songIndex === Math.round(Math.random() * this.songList.length)) {
          this.$store.state.songIndex = Math.round(Math.random() * this.songList.lengththis.songList.length + 1)
        } else {
          this.$store.state.songIndex = num
        }
      }
    })
    music.addEventListener('canplay', function () {
      This.SongLeng = music.duration
      This.stopOff = true
      This.$store.state.songtj = true
      if (This.Time === '') {
        This.Time = setInterval(() => {
          This.jdtData = music.currentTime / music.duration * 100
          // console.log(music.currentTime / music.duration * 100)
          This.$store.state.SongTime = (music.currentTime * 1000).toFixed(0)
          // console.log(222222222)
          // console.log(md.currentTime)
        }, 200)
      }
    })
    // setInterval(() => {
    //
    // }, 1000)
  },
  watch: {
    url () {
      let music = document.getElementById('music')
      music.play()
    },
    songList (to) {
      // this.song = to[this.$store.state.songIndex - 1]
      // this.songRequest()
      // console.log(1, to[this.$store.state.songIndex - 1])
      // console.log(2, this.song)
    },
    songThis (to) {
      this.url = ''
      this.jdtData = 0
      if (this.Time === '') {
        clearInterval(this.Time)
      }
      if (this.songList.length < to) {
        this.$store.state.songIndex = 1
      } else {
        // console.log(1, this.songList[to - 1])
        this.song = this.songList[to - 1]
        // console.log(2, this.song)
        this.songRequest()
        // this.$store.commit('songIndexFn', -1)
        // alert('列表播放完毕')
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
  .titleBox{
    width: 80%;
    overflow: hidden;
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
    position: relative;
    justify-content: center;
  }
  .BtnType{
    position: absolute;
    display: flex;
    align-items: center;
    height: 100%;
    top: 0;
    left: 0;
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .lrcBox{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 11;
  }
  .mark{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 10;
    background: rgba(0,0,0,.2);
  }
</style>
