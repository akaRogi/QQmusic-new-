<template>
  <div class="BottomMusic" @click="$store.state.musicShow = true">
    <div class="Box vux-1px-t">
      <div class="ImgBox">
        <img :src="imgFn(song)" alt="">
      </div>
      <div class="info">
        <h4>{{title(song)}}</h4>
        <p><span v-for="(item, index) of songer(song)" :key="index">{{item.name}}</span></p>
      </div>
      <div class="btn">
        <div @click.stop="songFn" style="line-height: 0">
          <x-icon type="ios-ionic-outline" size="30" v-show="stopOff"></x-icon>
          <x-icon type="ios-circle-filled" size="30" v-show="!stopOff"></x-icon>
        </div>
        <x-icon type="ios-arrow-right" size="30" @click.stop="songLata"></x-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomMusic',
  data () {
    return {
      song: {
        title: '音乐',
        singer: [{name: '享受每一首歌'}]
      },
      stopOff: true
    }
  },
  methods: {
    songLata () {
      this.$store.commit('songIndexFn', 1)
    },
    songFn () {
      let music = document.getElementById('music')
      let volume = 1
      let Time
      if (music.paused) {
        this.stopOff = true
        this.$store.state.songtj = true
        music.play()
        volume = 0
        Time = setInterval(() => {
          // console.log(volume)
          volume = volume + 0.2
          music.volume = volume
        }, 100)
        setTimeout(() => {
          clearInterval(Time)
        }, 500)
      } else {
        this.stopOff = false
        this.$store.state.songtj = false

        Time = setInterval(() => {
          volume = volume - 0.1
          music.volume = volume
        }, 100)
        setTimeout(() => {
          clearInterval(Time)
          music.pause()
        }, 1000)
      }
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
    songer (data) {
      let songer
      if (data.singer) {
        songer = data.singer
      }
      return songer
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
      if (img) {
        img = T + img + H
      } else {
        img = 'https://y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000'
      }
      return img
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
  watch: {
    songThis (to) {
      this.song = this.songList[to - 1]
      console.log(this.song)
      // this.url = ''
      // this.jdtData = 0
      // if (this.Time === '') {
      //   clearInterval(this.Time)
      // }
      // if (this.songList.length < to) {
      //   this.$store.state.songIndex = 1
      // } else {
      //   // console.log(1, this.songList[to - 1])
      //   if (to === 0) {
      //     this.$store.state.songIndex = this.songList.length
      //   }
      //   this.song = this.songList[to - 1]
      //   // console.log(2, this.song)
      //   this.songRequest()
      //   // this.$store.commit('songIndexFn', -1)
      //   // alert('列表播放完毕')
      // }
    }
  }
}
</script>

<style scoped>
  .BottomMusic{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 120px;
    background: #fff;
  }
  .Box{
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
  .Box::before{
    content: "";
    position: absolute;
    top: -3px;
    left: 0;
    display: block;
    width: 100%;
    height: 2px;
    background: #9a999e;
  }
  .ImgBox{
    width: 120px;
    height: 100%;
    overflow: hidden;
    margin-right: 25px;
  }
  .ImgBox img{
    width: 100%;
  }
  .info{
    height: 100%;
    line-height: 1.9;
    color: #9a999e;
  }
  .info h4{
    font-size: 30px;
    font-weight: 400;
  }
  .info p{
    font-size: 24px;
  }
  .btn{
    position: absolute;
    display: flex;
    align-items: center;
    right: 20px;
    height: calc(100% - 10px);
  }
</style>
