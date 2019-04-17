<template>
  <div class="user">
    <x-header
      title="注册"
    ></x-header>
    <Group>
      <x-input title="账号" placeholder="必填" v-model="user.Account"></x-input>
      <x-input title="密码" placeholder="必填" v-model="user.passWord"></x-input>
    </Group>
    <div class="btn">
      <div @click="login">
        <x-button>登录</x-button>
      </div>
      <div>
        <x-button link="/registered">注册</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, XInput, XButton } from 'vux'
export default {
  name: 'login',
  components: {
    XHeader,
    Group,
    XInput,
    XButton
  },
  data () {
    return {
      user: {
        Account: '',
        passWord: ''
      }
    }
  },
  methods: {
    login () {
      let list = this.$store.state.userList
      let This = this
      list.forEach(el => {
        if (el.Account === this.user.Account && el.passWord === this.user.passWord) {
          el.login = true
          // console.log(el)
          This.$store.commit('userListFn', list)
          This.$router.replace('/')
        }
      })
    }
  }
}
</script>

<style scoped>
  .user{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99999999;
    background: #fff;
    font-size: 28px;
  }
  .user >>> label, .user >>> input{
    font-size: 28px;
  }
  .user >>> .weui-cells{
    margin-top: 0;
  }
  .user >>> .vux-header{
    padding: 20px 10px;
  }
  .user >>> .vux-header-title{
    font-size: 28px;
  }
  .user >>> .vux-header-left{
    font-size: 28px;
    top: calc(50% - 10px);
    color: #fff;
  }
  .user >>> .vux-header-left a,.user >>> .vux-header .vux-header-left .left-arrow:before{
    color: #fff;
    border-color: #fff;
  }
  .user >>> .vux-header{
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
