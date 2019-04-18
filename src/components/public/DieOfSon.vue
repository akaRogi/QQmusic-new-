<template>
  <ul>
    <li
      :class="data.class"
      v-for="(item, index) in data"
      :key="index"
      @click="DieShow(item)"
    >
      <i></i>
      <div class="imgBox">
        <!--<x-img :src="img(item)"></x-img>-->
        <img :src="img(item)" alt="">
      </div>
      <div class="TextBox">
        <p>{{Title(item)}}</p>
        <p><span
          v-for="(son, j) in soner(item)"
          :key="j"
        >{{er(son)}}</span></p>
      </div>
    </li>
  </ul>
</template>

<script>
import { XImg } from 'vux'
export default {
  name: 'newSon',
  props: ['data'],
  components: {
    XImg
  },
  methods: {
    img (data) {
      let img
      let T = this.$store.state.img.sonT
      let H = this.$store.state.img.sonH
      if (data.album) {
        if (data.album.mid) {
          img = T + data.album.mid + H
        }
      } else if (data.album_mid) {
        img = T + data.album_mid + H
      }
      return img
    },
    Title (data) {
      let title
      if (data.title) {
        title = data.title
      } else if (data.album_name) {
        title = data.album_name
      }
      return title
    },
    soner (data) {
      let soner
      if (data.singer) {
        soner = data.singer
      } else if (data.singers) {
        soner = data.singers
      }
      return soner
    },
    er (data) {
      let er
      if (data.name) {
        er = data.name
      } else if (data.singer_name) {
        er = data.singer_name
      }
      return er
    },
    DieShow (data) {
      if (this.data.class) {
        this.$router.push('/DieMain/' + data.album_mid)
        console.log(data)
      } else {
        this.$store.commit('musicPuda', data)
        // console.log(data)
      }
    }
  }
}
</script>

<style scoped>
  p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p span{
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  ul{
    margin: 0 10px;
    overflow: hidden;
    padding-bottom: 50px;
  }
  li{
    width: 100%;
    display: flex;
    line-height: 3;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
  }
  li.show{

  }
  li img{
    width: 100%;
  }
  .imgBox{
    width: 180px;
    height: 180px;
  }
  li.show i{
    position: absolute;
    top: 0;
    width: 160px;
    height: 140px;
    background-image: url("../../assets/img/die.png");
    background-size: 100% 100%;
    background-position: 0 0;
    background-repeat: no-repeat;
  }
  .TextBox{
    width: 100%;
    padding-left: 15px;
    overflow: hidden;
  }
  li.show .TextBox{
    padding-left: 50px;
  }
</style>
