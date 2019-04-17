<template>
  <div class="SongList">
    <group>
      <cell
        :title="'我的收藏'"
        is-link
        :border-intent="false"
        :arrow-direction="showContent1 ? 'up' : 'down'"
        @click.native="showContent1 = !showContent1"></cell>
      <p class="slide" :class="showContent1?'animate':''">blablabla...<br/>blablabla...<br/>blablabla...<br/>blablabla...</p>
      <cell
        :title="'我的歌单'"
        is-link
        :border-intent="false"
        :arrow-direction="showContent2 ? 'up' : 'down'"
        @click.native="showContent2 = !showContent2"></cell>
      <p class="slide" :class="showContent2?'animate':''">blablabla...<br/>blablabla...<br/>blablabla...<br/>blablabla...</p>
    </group>
    321321
  </div>
</template>

<script>
import {Group, Cell} from 'vux'
export default {
  name: 'SongList',
  components: {
    Group,
    Cell
  },
  data () {
    return {
      showContent1: false,
      showContent2: false
    }
  },
  created () {
    console.log(this.$store.state.user)
  }
}
</script>

<style scoped>
  .SongList{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99999999999;
    background: #fff;
  }
  .sub-item {
    color: #888;
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
</style>
