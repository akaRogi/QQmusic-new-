<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <div class="musicDiv" @click="musicShow = true">
      音乐
    </div>

    <div
      class="MusicBox"
      :class="{show : musicShow}"
    >
      <music-box
        :musicShow.sync="musicShow"
      ></music-box>
    </div>
  </div>
</template>

<script>
import MusicBox from './components/music'
export default {
  name: 'App',
  components: {
    MusicBox
  },
  data () {
    return {
      musicShow: false
    }
  },
  created () {
    // let This = this
    setInterval(() => {
      // console.log(This.$store.state.songList)
    }, 1000)
  }
}
</script>

<style>
  .musicDiv{
    position: fixed;
    top: 0;
    right: 0;
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
    z-index: 99999;
  }
</style>
