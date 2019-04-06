<template>
  <div class="banner">
    <swiper
      loop
      auto
      :list="list"
      :show-desc-mask="false"
      dots-position="center"
    ></swiper>
  </div>
</template>

<script>
import { Swiper } from 'vux'
export default {
  name: 'BannerBox',
  props: ['data'],
  components: {
    Swiper
  },
  computed: {
    list () {
      let list = this.data
      list.forEach((val) => {
        if (!val.img) {
          if (val.pic_info) {
            val.img = val.pic_info.url
          }
        }
      })
      // console.log(list)
      return list
    }
  }
}
</script>

<style scoped>

</style>
