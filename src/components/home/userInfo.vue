<template>
  <div class="userInfo">
    <div class="icon">
      <i class="iconfont icon-gengduo-2" @click="value = true"></i>
      <popup
        v-model="value"
        position="left"
        width="230px"
        show-mask
      >
        <div class="Box">
          <div class="userImg">
            <div class="info">
              <div
                class="Tx"
                style="background-image: url(https://img.52z.com/upload/news/image/20180129/20180129092453_13901.jpg)"
                v-if="user.login"
              ></div>
              <router-link
                tag="div"
                class="Tx"
                to="/login"
                v-if="!user.login"
              >
                登录/注册
              </router-link>
              <div class="name">{{user.Account}}</div>
            </div>
          </div>
          <div class="userSongList">
            <div class="title vux-1px-b">
              <cell
                :title="'我的歌单'"
                is-link
                :border-intent="false"
                :arrow-direction="showContent004 ? 'up' : 'down'"
                @click.native="showContent004 = !showContent004"
              ></cell>
            </div>
            <div class="title vux-1px-b">
              <cell
                :title="'我的歌单'"
                is-link
                :border-intent="false"
                :arrow-direction="showContent004 ? 'up' : 'down'"
                @click.native="showContent004 = !showContent004"
              ></cell>
            </div>
          </div>
          <div class="btn">
            <div>
              <x-button>切换用户</x-button>
            </div>
            <div>
              <x-button>退出当前账户</x-button>
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { Popup, Cell, XButton } from 'vux'
export default {
  name: 'userInfo',
  components: {
    Popup,
    Cell,
    XButton
  },
  data () {
    return {
      value: false,
      showContent004: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>
  .icon{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999999;
  }
  .Box{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .userImg{
    width: 100%;
    height: 350px;
    background: #32c27c;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }
  .Tx{
    width: 150px;
    height: 150px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background: #222222;
    margin-bottom: 20px;
    -webkit-background-size: contain;
    background-size: contain;
    line-height: 6;
    font-size: 24px;
  }
  .userSongList{
  }
  .userInfo >>> .vux-label{
    font-size: 28px;
  }
  .userInfo >>> .weui-cell{
    padding: 20px 15px;
  }
  .btn{
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .btn div{
    float: left;
    width: 50%;
  }
  .btn div:nth-child(1){
    position: relative;
  }
  .btn div:nth-child(1):after{
    content: "";
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 2px;
    background: rgba(0, 0, 0, 0.27);
  }
  .btn div:nth-child(1) >>> button:after{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .btn div:nth-child(2) >>> button:after{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
</style>
