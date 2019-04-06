<template>
  <div class="songBox">
    <div class="title">
      {{title}}
    </div>
    <div class="main">
      <ul>
        <li
          v-for="(item, index) in data"
          :key="index"
          v-if="index < 6"
          @click="IdShow(item)"
        >
          <div class="ImgBox">
            <img :src="imgFn(item)" alt="">
          </div>
          <div class="Text">
            <p class="one-txt-cut">{{titleFn(item)}}</p>
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
  name: 'SongList',
  props: ['title', 'data'],
  methods: {
    imgFn (data) {
      let img = null
      if (data.cover) {
        img = data.cover
      } else if (data.data.albummid) {
        img = this.$store.state.img.sonT + data.data.albummid + this.$store.state.img.sonH
      }
      return img
    },
    titleFn (data) {
      let title = null
      if (data.title) {
        title = data.title
      } else if (data.data.songname) {
        title = data.data.songname
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
    IdShow (data) {
      this.$emit('IdShow', data)
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
    width: 32%;
    margin-right: 2%;
    float: left;
    margin-bottom: 50px;
  }
  .main li:nth-child(3n){
    margin-right: 0px;
  }
  .main li img{
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
</style>
