<template>
  <div class="LocalhostSon">
    <main-box :data="data" :off="true"></main-box>
  </div>
</template>

<script>
import MainBox from '../public/SongListShow'
export default {
  name: 'LocalhostSon',
  components: {
    MainBox
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    let user = this.$store.state.user
    let id = Number(this.$route.params.id)
    this.data = user.songList.find(item => item.id === id)
    // let id = Number(this.$route.params.id)
    // this.data = user.userList.find(item => item.id === id)
  }
}
</script>

<style scoped>
.LocalhostSon{
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 9999999999;
}
</style>
