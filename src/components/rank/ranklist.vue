<template>
  <div class="ranklist">
    <Main :data="data"></Main>
  </div>
</template>

<script>
import Main from '../public/SongListShow'
export default {
  name: 'ranklist',
  components: {
    Main
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.$store.commit('updateLoading', true)
    let This = this
    let id = this.$route.params.id
    console.log(id)
    let RecommendSong = `/qqCMusic/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8%C2%ACice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=${id}&_=1520777874472`
    this.axios.get(RecommendSong)
      .then(function (res) {
        This.data = res.data
        This.$store.commit('updateLoading', false)
        console.log(res.data)
      })
  }
}
</script>

<style scoped>

</style>
