<template>
  <router-link
    tag="div"
    class="Box"
    :to="'/ranklist/' + data.id"
  >
    <div class="item">
      <div class="imgBox">
        <img :src="data.picUrl">
      </div>
      <div class="info">
        <div>
          <!--<h3>{{data.topTitle}}</h3>-->
          <p v-for="(name,index) in data.songList" :key="name.songname">{{index+1}}<span>{{name.songname}}</span>-{{name.singername}}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Box',
  props: ['data']
}
</script>

<style scoped>
  .Box {
    margin-bottom: 20px;
    overflow: hidden;
  }
  .Box .item {
    display: -webkit-box;
  }
  .Box .imgBox{
    position: relative;
    width: 200px;
    height: 200px;
  }
  .Box .info {
    position: relative;
    -webkit-box-flex: 1;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    /*border-bottom: 1px solid #6e6d72;*/
    margin-left: 16px;
  }
  .Box .imgBox img {
    width: 100%;
  }
  .Box .info div {
    -webkit-box-flex: 1;
    margin: 0 20px 0 0;
  }
  .Box .info div h3 {
    font-size: 32px;
    color: #6e6d72;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .Box .info div h3, .Box .info div p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .Box .info div p{
    font-size: 28px;
    line-height: 2;
    color: #6e6d72;
  }
  .Box .info div p span {
    color: #6e6d72;
    margin-left: 16px;
    margin-right: 10px;
  }
</style>
