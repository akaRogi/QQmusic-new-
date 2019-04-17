<template>
  <div class="Radio">
    <router-link
      tag="div"
      class="RadioBox"
      to="/newDie"
    >
      <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003dh9LW2nlWdF.jpg?max_age=2592000">
      <div class="DieTitle">
        <span></span>
      </div>
    </router-link>
    <div class="GdBox">
      <router-link
        tag="div"
        class="otherBox"
        to="/newSon"
      >
        <div class="NewSong">
          <div class="Text">
            <p>新歌首发</p>
            <p><span>{{list[0].album.title}}</span></p>
          </div>
          <div class="ImgBox">
            <!--bug待解决：在页面刷新的时候，这个图片一开始不存在，要等api请求过后才能最新图片-->
            <img :src="list[0].album.mid " alt="">
          </div>
        </div>
      </router-link>
      <router-link
        tag="div"
        class="otherBox"
        to="/newSon"
      >
        <div class="NewSong">
          <swiper auto height="120px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
            <swiper-item
              v-for="(item, index) in list"
              :key="index"
            >
              <div class="Text">
                <p>{{item.album.title}}</p>
                <p><span
                  v-for="(songer, j) in item.singer"
                  :key="j"
                >{{songer.name}}</span></p>
              </div>
              <div class="ImgBox">
                <!--bug待解决：在页面刷新的时候，这个图片一开始不存在，要等api请求过后才能最新图片-->
                <img :src="item.album.mid " alt="">
              </div>
            </swiper-item>
          </swiper>
        </div>
        <!--<div class="NewSong">-->
          <!--<div class="Text">-->
            <!--<p>新歌首发</p>-->
            <!--<p><span>321321</span></p>-->
          <!--</div>-->
          <!--<div class="ImgBox">-->
            <!--&lt;!&ndash;bug待解决：在页面刷新的时候，这个图片一开始不存在，要等api请求过后才能最新图片&ndash;&gt;-->
            <!--<img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003dh9LW2nlWdF.jpg?max_age=2592000" alt="">-->
          <!--</div>-->
        <!--</div>-->
      </router-link>
    </div>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'vux'
export default {
  name: 'radio',
  props: ['data'],
  components: {
    Swiper,
    SwiperItem
  },
  computed: {
    list () {
      let list = this.data
      list.forEach(el => {
        el.album.mid = 'https://y.gtimg.cn/music/photo_new/T002R90x90M000' + el.album.mid + '.jpg?max_age=2592000'
      })
      return list
    }
  }
}
</script>

<style scoped>
  .Radio{
    display: flex;
    height: 262px;
    margin: 0 16px 50px 16px;
  }
  .RadioBox {
    position: relative;
    width: 262px;
    height: 262px;
    background: antiquewhite;
    margin-right: 13px;
  }
  .RadioBox div{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*background: #454547;*/
    color: #fff;
    font-size: 40px;
  }
  .RadioBox div span{
    position: absolute;
    width: 100%;
    bottom: 20px;
    text-align: center;
  }
  .otherBox{
    width: 442px;
    display: flex;
    flex-direction: column;
    align-content: center;
  }
  .GdBox{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
  }
  .otherBox .NewSong,.otherBox .NumSong{
    width: 100%;
    height: 120px;
    background: #f5f5f5;
    color: #a3a2a7;
  }
  .otherBox .NewSong{
    /*margin-bottom: 22px;*/
  }
  .ImgBox{
    width: 120px;
    height: 120px;
    overflow: hidden;
    float: right;
    line-height: 0;
  }
  .ImgBox img{
    width: 100%;
  }
  .Text{
    width: 270px;
    padding-left: 30px;
    box-sizing: border-box;
    overflow: hidden;
    float: left;
  }
  .Text p{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .Text p:nth-child(1){
    font-size: 30px;
    margin-top: 10px;
    line-height: 2;
  }
  .Text p:nth-child(2){
    font-size: 18px;
    color: #a3a2a7;
  }
  .LbBox{
    height: 120px;
    overflow: hidden;
  }
  .LbBox .swiper-container{
    height: 100%;
  }
  .LbBox .swiper-slide{
    height: 120px;
  }
  .LbBox .swiper-slide div{
    box-sizing: border-box;
    height: 100%;
  }
</style>
