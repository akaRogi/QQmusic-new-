<template>
  <div class="Box wrap">
    <ul class="Main">
      <router-link
        tag="li"
        v-for="(item, index) in data"
        :key="index"
        :to="'/Mv/' + item.vid"
        class="One"
        replace
      >
        <div class="imgBox">
          <img :src="item.picurl || item.cover_pic" alt="">
        </div>
        <div class="Text">
          <p>{{item.title || item.name}}</p>
          <p>
          <span v-for="(songer, j) in item.singers"
                :key="j"
          >{{songer.name}}</span>
          </p>
          <p v-if="item.uploader_nick">{{'来自：' + item.uploader_nick}}</p>
          <p>{{playcnt(item.playcnt)}}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MvEcommend',
  props: ['data'],
  data () {
    return {
      heipx: 0
    }
  },
  methods: {
    playcnt (num) {
      let playNum = num
      if (playNum >= 10000) {
        // console.log((playNum / 10000).toFixed(1))
        playNum = (playNum / 10000).toFixed(1)
        if (playNum.charAt(playNum.length - 1) === '0') {
          playNum = (num / 10000).toFixed(0)
        }
        playNum = playNum + '万'
      }
      return playNum
    }
  }
}
</script>

<style scoped>
  .Box{
    overflow: hidden;
  }
  .Main{
    overflow: hidden;
  }
  .Main li{
    width: calc(50% - 5px);
    margin-bottom: 20px;
    float: left;
  }
  .Main li.One{
    width: 100%;
    display: flex;
  }
  .Main li.One .imgBox{
    width: 30%;
  }
  .Main li.One .Text{
    width: calc(70% - 20px);
    margin-left: 20px;
  }
  .Main li:nth-child(odd){
    margin-right: 10px;
  }
  .Main li img{
    width: 100%;
  }
  .imgBox{
    margin-bottom: 10px;
  }
  .Main li p{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    line-height: 1.8;
  }
  .Main li.One{
    width: 100%;
    display: flex;
  }
  .Main li.One .imgBox{
    width: 30%;
  }
  .Main li.One .Text{
    width: calc(70% - 20px);
    margin-left: 20px;
  }
</style>
