<template>
  <div class="songBox">
    {{off}}
    <div class="title">
      {{title}}
    </div>
    <div class="main">
      <ul>
        <li
          v-for="(item, index) in data"
          :key="index"
          @click="show(item)"
        >
          <div class="ImgBox">
            <img :src="imgFn(item)" alt="">
          </div>
          <span class="bf">{{bf(item)}}</span>
          <div class="Text">
            <p class="one-txt-cut">{{titleFn(item)}}</p>
            <p>{{name(item)}}</p>
            <p class="one-txt-cut"><span
              v-for="(soner, j) in songer(item)"
              :key="j"
            >{{soner.name}}</span></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sonTowList',
  props: ['title', 'data', 'off'],
  methods: {
    imgFn (data) {
      let img = null
      if (data.cover) {
        img = data.cover
      } else if (data.data) {
        if (data.data.albummid) {
          img = this.$store.state.img.sonT + data.data.albummid + this.$store.state.img.sonH
        }
      } else if (data.imgurl) {
        img = data.imgurl
      }
      return img
    },
    titleFn (data) {
      let title = null
      if (data.title) {
        title = data.title
      } else if (data.data) {
        if (data.data.songname) {
          title = data.data.songname
        }
      } else if (data.dissname) {
        title = data.dissname
      }
      return title
    },
    songer (data) {
      let er
      // console.log(data)
      if (data.data) {
        er = data.data.singer
      }
      return er
    },
    name (data) {
      let er = ''
      if (data.creator) {
        if (data.creator.name) {
          er = data.creator.name
        }
      }
      // console.log(data.creator)
      return er
    },
    bf (data) {
      let bf
      if (data.listennum) {
        bf = data.listennum
        if (bf >= 10000) {
          bf = (bf / 10000).toFixed(1) + '万'
        }
      }
      return bf
    },
    show (data) {
      this.$emit('idShow', data)
      // alert(222)
    }
  }
}
</script>

<style scoped>
  .songBox{
    margin: 10px 0 10px 0;
  }
  .title{
    padding-left: 16px;
    margin-bottom: 20px;
    font-size: 40px;
    font-weight: bold;
  }
  .main ul{
    overflow: hidden;
    padding: 0 16px;
    box-sizing: border-box;
  }
  .main li{
    width: 49%;
    position: relative;
    margin-right: 2%;
    float: left;
    margin-bottom: 50px;
  }
  .main li:nth-child(even){
    margin-right: 0px;
  }
  .ImgBox{
    position: relative;
    padding-top: 100%;
    margin-bottom: 20px;
  }
  .main li img{
    position: absolute;
    top: 0;
    width: 100%;
  }
  .main li p{
    font-size: 28px;
    color: #9a999e;
  }
  .main li p span{
    margin-right: 10px;
    font-size: 24px;
  }
  .bf{
    position: absolute;
    top: 10px;
    right: 10px;
    color: #9a999e;
  }
</style>
