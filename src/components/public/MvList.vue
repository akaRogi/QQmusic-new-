<template>
  <div class="mv">
    <div class="title">
      {{title}}
    </div>
    <ul class="MvUl">
      <li
        v-for="(item,index) in data"
        :key="index"
        v-if="index <= p"
        @click="play(item)"
      >
        <div class="imgBox">
          <img :src="img(item)" alt="">
        </div>
        <div class="TextBox">
          <p>{{titleFn(item)}}</p>
          <p><span
            v-for="(soner, j) in soner(item)"
            :key="j"
          >soner{{soner.name}}</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MvList',
  props: ['title', 'data', 'p'],
  methods: {
    titleFn (data) {
      let title = null
      if (data.mvtitle) {
        title = data.mvtitle
      }
      return title
    },
    img (data) {
      let img = null
      if (data.picurl) {
        img = data.picurl
      }
      return img
    },
    soner (data) {
      let list = null
      if (data.singers) {
        list = data.singers
      }
      return list
    },
    play (data) {
      this.$emit('IdShow', data)
    }
  }
}
</script>

<style scoped>
  .mv{
    padding: 0 16px;
    margin: 10px 0 10px 0;
  }
  .title{
    padding-left: 16px;
    margin-bottom: 20px;
    font-size: 40px;
    font-weight: bold;
  }
  .MvUl{
    overflow: hidden;
    margin-bottom: 50px;;
  }
  .MvUl li{
    width: calc(50% - 10px);
    float: left;
    margin-bottom: 20px;
  }
  .MvUl li .imgBox{
    overflow: hidden;
  }
  .MvUl li .imgBox img{
    width: 100%;
  }
  .MvUl li:nth-child(odd){
    margin-right: 20px;
  }
  .TextBox{
    padding-left: 6px;
    box-sizing: border-box;
  }
  .MvUl li p{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .MvUl li p:nth-child(1){
    font-size: 24px;
    margin: 12px 0 6px 0;
  }
  .MvUl li p:nth-child(2){
    font-size: 22px;
    color: #666;
  }
  .MvUl .MvUl li{
    width: calc(50% - 2px);
  }
  .MvUl .MvUl li .imgBox{
    height: auto;
  }
</style>
