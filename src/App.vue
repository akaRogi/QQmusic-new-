<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" name="user"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <!--音乐播放页面按钮-->
    <div class="musicDiv" @click="$store.state.musicShow = true" v-show="music">
      音乐
    </div>
    <!--音乐播放组件-->
    <div
      class="MusicBox"
      :class="{show : musicShow}"
    >
      <music-box></music-box>
    </div>
    <!--个人中心-->
    <actionsheet
      v-model="show2"
      show-cancel
      class="tkBox"
      @on-after-hide="$store.state.loveOff = false"
    >
      <p slot="header">{{$store.getters.songTitle}}</p>
      <group slot="header">
        <div class="maBox">
          <cell
            class="title"
            :title="'我的歌单'"
            is-link
            :border-intent="false"
            :arrow-direction="showContent002 ? 'up' : 'down'"
            @click.native.stop="songlistShow"
          ></cell>
          <div class="slide" :class="showContent002?'animate':''">
            <div
              v-for="(item, index) in userFn.songList"
              :key="index"
              @click="songPush(item)"
            >
              <cell
                :title="item.title"
                value="收藏"
                is-link
              ></cell>
            </div>
          </div>
        </div>
      </group>
    </actionsheet>
    <!--触发成功提示-->
    <toast v-model="tis" :time="1000" @on-hide="$store.state.tis = false">成功</toast>
  </div>
</template>

<script>
import { Toast, Actionsheet, Group, Cell } from 'vux'
import MusicBox from './components/music'
export default {
  name: 'App',
  components: {
    MusicBox,
    Toast,
    Actionsheet,
    Group,
    Cell
  },
  data () {
    return {
      musicShow: false,
      tis: false,
      show2: false,
      titleTxt: '',
      showContent002: false,
      music: true
    }
  },
  methods: {
    hidTis () {
      this.$store.state.tis = false
    },
    songlistShow () {
      let user = this.userFn
      if (user.songList.length) {
        this.showContent002 = !this.showContent002
      } else {
        alert('你还没有创建的歌单呢')
      }
    },
    songPush (data) {
      let user = this.userFn
      console.log(data)
      let store = this.$store.state
      // 让歌单的图片变成这首歌的封面
      let id = ''
      user.songList.forEach(el => {
        if (el.id === data.id) {
          if (this.$store.state.song.albummid) {
            id = this.$store.state.song.albummid
          } else if (this.$store.state.song.album) {
            if (this.$store.state.song.album.mid) {
              id = this.$store.state.song.album.mid
            }
          }
          el.logo = store.img.songShowT + id + store.img.sonH
          el.list.unshift(this.$store.state.song)
        }
      })
      this.$store.commit('userSongPudate', user)
      this.show2 = false
      this.$store.state.tis = true
    }
  },
  computed: {
    userFn () {
      return this.$store.state.user
    },
    tisFn () {
      return this.$store.state.tis
    },
    loveOffFn () {
      return this.$store.state.loveOff
    },
    musicShowFn () {
      return this.$store.state.musicShow
    }
  },
  created () {
    let user = JSON.parse(localStorage.getItem('QQmusicUser')) || []
    this.$store.commit('userListFn', user)
    if (this.$route.name === 'home') {
      this.music = true
    } else {
      this.music = false
    }
  },
  mounted () {
    var audio = document.getElementById('music')
    let This = this
    document.addEventListener('DOMContentLoaded', function () {
      function audioAutoPlay () {
        audio.play()
        document.addEventListener('WeixinJSBridgeReady', function () {
          if (This.$store.state.songtj) {
            This.$store.state.songtj = false
            alert(1)
            audio.play()
            console.log(222)
          }
        }, false)
      }
      audioAutoPlay()
    })
    document.addEventListener('touchstart', function () {
      function audioAutoPlay () {
        if (This.$store.state.songtj) {
          This.$store.state.songtj = false
          // alert(2)
          audio.play()
          console.log(33)
        }
      }
      audioAutoPlay()
    })
  },
  watch: {
    tisFn (to) {
      this.tis = to
    },
    loveOffFn (to) {
      this.show2 = to
    },
    musicShowFn (to) {
      this.musicShow = to
    },
    $route (to) {
      if (to.name === 'home') {
        this.music = true
      } else {
        this.music = false
      }
    }
  }
}
</script>

<style scoped>
  .musicDiv{
    position: fixed;
    top: 20px;
    right: 10px;
    z-index: 999;
  }
  .MusicBox{
    position: fixed;
    top: 0;
    left: 0;
    z-index: -10;
    width: 100%;
    height: 100%;
  }
  .MusicBox.show{
    z-index: 999999999999;
  }
  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
  .slide li{
    padding-left: 25px;
    margin-bottom: 10px;
  }
  .maBox >>> .weui-cell{
    padding: 40px 50px;
    text-align: center;
  }
  .maBox .title >>> .vux-cell-bd{
    text-align: center;
  }
  .maBox >>> .slide{
    padding: 0;
  }
  .maBox >>> .vux-cell-bd{
    text-align: left;
    font-size: 26px;
  }
  .tkBox >>> .weui-actionsheet__action div.weui-actionsheet__cell{
    padding-bottom: 10px;
  }
  .tkBox >>> .weui-actionsheet__cell{
    font-size: 30px;
    padding-bottom: 0;
  }
</style>
