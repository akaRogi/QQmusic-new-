<template>
  <div class="box">
    <main-box :data="data"></main-box>
  </div>
</template>

<script>
import MainBox from '../public/SongListShow'
export default {
  name: 'SongList',
  components: {
    MainBox
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    let This = this
    let id = this.$route.params.id
    console.log(id)
    let RecommendSong = `/qqCMusic/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=${id}&format=json&g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
    this.axios.get(RecommendSong)
      .then(function (res) {
        This.data = res.data.cdlist[0]
        console.log(res.data.cdlist[0])
      })
  }
}
</script>

<style scoped>

</style>
