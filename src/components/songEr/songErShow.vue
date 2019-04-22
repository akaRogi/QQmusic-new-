<template>
  <div>
    <song-er-main :data="data"></song-er-main>
  </div>
</template>

<script>
import SongErMain from '../public/SongListShow'
export default {
  name: 'songErShow',
  components: {SongErMain},
  data () {
    return {
      data: {}
    }
  },
  created () {
    // console.log(222)
    let This = this
    let id = this.$route.params.id
    this.axios.get(`/qqCMusic/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&ct=24&singermid=${id}&order=listen&begin=0&num=10`)
      .then(function (response) {
        This.data = response.data.data
        // console.log(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
