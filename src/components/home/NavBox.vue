<template>
  <nav>
    <ul>
      <router-link
        tag="li"
        v-for="(item, index) in list"
        :key="index"
        :to="item.url"
      >
        <div><i class="iconfont" :class="item.icon"></i></div>
        <p>{{item.name}}</p>
      </router-link>
    </ul>
    <div class="tiao"></div>
  </nav>
</template>

<script>
export default {
  name: 'NavBox',
  data () {
    return {
      list: [
        {name: '歌手', icon: 'icon-ai-user', url: '/soner'},
        {name: '排行', icon: 'icon-paihangbang', url: '/rank'},
        {name: '分类歌单', icon: 'icon-fenlei1', url: '/songSort'},
        {name: '视频', icon: 'icon-shipin', url: '/Mv'}
      ]
    }
  }
}
</script>

<style scoped>
  nav{
    margin-bottom: 50px;
  }
  nav ul{
    overflow: hidden;
    width: 100%;
    padding: 0 25px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
  }
  nav li{
    text-align: center;
    margin: 50px 0;
  }
  nav li i{
    color: #fff;
  }
  nav li div{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    margin: 0 auto 15px auto;
    background: #32c27c;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    box-shadow: 0 0 10px 5px #32c27c;
  }
  nav li i{
    font-size: 40px;
  }
  nav li p{
    width: 100%;
    font-size: 30px;
  }
  .tiao{
    width: 100%;
    height: 2px;
    background: rgba(0,0,0,.07);
    border-top: 1px solid rgba(0,0,0,.05);
    border-bottom: 1px solid rgba(0,0,0,.05);
    /*box-shadow: 0 0 1px 1px rgba(0,0,0,.1);*/
  }
</style>
