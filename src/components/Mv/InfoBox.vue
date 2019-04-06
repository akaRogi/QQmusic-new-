<template>
  <div class="InfoBox">
    <in-fo :data="info"></in-fo>
    <mv-ecommend :data="ecommend"></mv-ecommend>
  </div>
</template>

<script>
import InFo from './info'
import MvEcommend from '../public/MvEcommend'
export default {
  name: 'InfoBox',
  props: ['index'],
  components: {
    InFo,
    MvEcommend
  },
  data () {
    return {
      info: {},
      ecommend: [],
      off: true
    }
  },
  methods: {
    requestData () {
      let This = this
      This.off = false
      let id = this.$store.state.MvId
      let url = `/qqUMusic/cgi-bin/musicu.fcg?-=getUCGI027207680499687692&g_tk=1981813800&loginUin=1737481208&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B"comm"%3A%7B"ct"%3A24%2C"cv"%3A4747474%7D%2C"mvinfo"%3A%7B"module"%3A"video.VideoDataServer"%2C"method"%3A"get_video_info_batch"%2C"param"%3A%7B"vidlist"%3A%5B"${id}"%5D%2C"required"%3A%5B"vid"%2C"type"%2C"sid"%2C"cover_pic"%2C"duration"%2C"singers"%2C"video_switch"%2C"msg"%2C"name"%2C"desc"%2C"playcnt"%2C"pubdate"%2C"isfav"%2C"gmid"%5D%7D%7D%2C"other"%3A%7B"module"%3A"video.VideoLogicServer"%2C"method"%3A"rec_video_byvid"%2C"param"%3A%7B"vid"%3A"${id}"%2C"required"%3A%5B"vid"%2C"type"%2C"sid"%2C"cover_pic"%2C"duration"%2C"singers"%2C"video_switch"%2C"msg"%2C"name"%2C"desc"%2C"playcnt"%2C"pubdate"%2C"isfav"%2C"gmid"%2C"uploader_headurl"%2C"uploader_nick"%2C"uploader_encuin"%2C"uploader_uin"%2C"uploader_hasfollow"%2C"uploader_follower_num"%5D%2C"support"%3A1%7D%7D%7D`
      this.axios.get(url)
        .then(function (res) {
          for (var k in res.data.mvinfo.data) {
            This.info = res.data.mvinfo.data[k]
          }
          This.ecommend = res.data.other.data.list
          // console.log(res.data.other.data.list)
          // console.log(res.data)
        })
    }
  },
  watch: {
    index (to) {
      if (this.off) {
        this.requestData()
      }
    }
  },
  created () {
    if (this.off) {
      this.requestData()
    }
    // console.log(this.index)
  }
}
</script>

<style scoped>

</style>
