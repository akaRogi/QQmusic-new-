<template>
  <div class="Soner">
    <Title title="歌手"></Title>
    <div class="RightBtn">
      <Tag :data="tags" @puadId="puadId"></Tag>
    </div>
    <div class="Main" :style="heipx" ref="wrapper">
      <div class="Box">
        <Main :data="data.singerlist"></Main>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from './tab'
import Main from './Main'
import BScroll from 'better-scroll'
export default {
  name: 'index',
  components: {
    Tag,
    Main
  },
  data () {
    return {
      data: {},
      tags: {},
      heipx: '',
      id: 1
    }
  },
  methods: {
    hei () {
      let Box = document.getElementsByClassName('Main')[0].offsetTop
      let scrollTop = document.documentElement.clientHeight
      this.heipx = 'height:' + (scrollTop - Box) + 'px'
      // console.log(this.heipx)
    },
    request () {
      let This = this
      let id = this.id
      this.axios.get(`/qqUMusic/cgi-bin/musicu.fcg?-=getUCGI4039464723237225&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A-100%2C%22sex%22%3A-100%2C%22genre%22%3A-100%2C%22index%22%3A${id}%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D`)
        .then(function (response) {
          This.data = response.data.singerList.data
          This.tags = response.data.singerList.data.tags.index
          This.hei()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    puadId (data) {
      this.id = data.id
      this.request()
    }
  },
  created () {
    this.request()
  },
  mounted () {
    this.$nextTick(() => {
      // $refs绑定元素
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          // 开启点击事件 默认为false
          click: true
        })
        // console.log(this.scroll)
      } else if (!this.$refs.wrapper) {
      } else {
        this.scroll.refresh()
      }
    })
  }
}
</script>

<style scoped>
  .RightBtn{
    position: fixed;
    top: 90px;
    right: 0;
    height: 100%;
    z-index: 9999999;
  }
  .Main{
    overflow: hidden;
  }
</style>
