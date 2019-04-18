<template>
  <div class="SongListPush">
    <x-header
      title="添加歌单"
    ></x-header>
    <Group>
      <x-input title="歌单标题" placeholder="必填" v-model="title"></x-input>
    </Group>
    <div class="btn">
      <div @click="listPush">
        <x-button>添加</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, XInput, XButton } from 'vux'
export default {
  name: 'SongListPush',
  data () {
    return {
      title: ''
    }
  },
  methods: {
    listPush () {
      let user = this.$store.state.user
      user.songList.push(
        {title: this.title,
          list: [],
          id: Math.round(Math.random() * 9999999 + 100000),
          logo: 'http://120.78.175.25/material/img/musicImg.jpeg',
          headurl: 'http://120.78.175.25/material/img/userImg.jpeg',
          user: this.$store.state.user.Account
        }
      )
      this.$store.commit('userSongPudate', user)
    }
  },
  components: {
    XHeader,
    Group,
    XInput,
    XButton
  }
}
</script>

<style scoped>
  .SongListPush{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .SongListPush >>> .weui-cells{
    margin-top: 0;
  }
  .SongListPush >>> .vux-header{
    padding: 20px 10px;
  }
  .SongListPush >>> .vux-header-title{
    font-size: 28px;
  }
  .SongListPush >>> .vux-header-left{
    font-size: 28px;
    top: calc(50% - 10px);
    color: #fff;
  }
  .SongListPush >>> .vux-header-left a,.SongListPush >>> .vux-header .vux-header-left .left-arrow:before{
    color: #fff;
    border-color: #fff;
  }
  .SongListPush >>> .vux-header{
    background-color: #32c27c;
  }
  .btn{
    display: flex;
    justify-content: space-between;
  }
  .btn div{
    margin: 50px auto 0;
    width: 200px;
  }
  .btn button{
    background-color: #32c27c;
    color: #fff;
  }
</style>
