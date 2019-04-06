<template>
  <div class="mv_info">
    <div class="mv_info__hd">
      <h1 class="mv_tit">
        <span>{{data.name}}</span>
      </h1>
      <div class="mv_author">
        <img src="" alt="">
        <span class="c_txt2" v-for="Songer in data.singers" :key="Songer.name">{{Songer.name}}</span>
      </div>
      <div class="mv_rank_posBox">
        <span class="c_txt3">{{data.playcnt + '次播放'}}</span>
        <span class="c_txt2" v-if="data.date">{{data.date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  props: ['data']
}
</script>

<style scoped>
  .mv_info{
    margin-bottom: 20px;
  }
  .mv_info__hd {
    position: relative;
    padding: 0 16px;
    overflow: hidden;
  }
  .mv_tit {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.4;
    margin: 24px 40px 0px 0;
    overflow: hidden;
    font-size: 28px;
    font-weight: 700;
    color: #32c27c;
  }
  .mv_tit img {
    display: inline-block;
    width: 45px;
    height: 25px;
    margin-right: 10px;
  }
  .mv_rank_posBox span{
    margin-right: 32px;
    font-size: 24px;
  }
  .mv_rank_posBox{
    margin-bottom: 10px;
  }
  .c_txt2 {
    color: grey;
    font-size: 24px;
  }
  .c_txt3{
    color: #777;
  }
  .tj{
    margin-bottom: 10px;
    font-size: 30px;
  }
  .MainBox{
    overflow: hidden;
  }
</style>
