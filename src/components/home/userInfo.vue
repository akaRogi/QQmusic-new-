<template>
  <div class="userInfo">
    <div class="icon">
      <div class="iconBox">
        <i class="iconfont icon-gengduo-2" @click="value = true"></i>
      </div>
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
            <group>
              <div class="title vux-1px-b">
                <cell
                  :title="'我的歌单'"
                  is-link
                  :border-intent="false"
                  :arrow-direction="showContent001 ? 'up' : 'down'"
                  @click.native="showContent001 = !showContent001"
                ></cell>
                <div class="slide" :class="showContent001?'animate':''">
                  <!--<cell-->
                    <!--v-if="user.Account"-->
                    <!--title="新建歌单"-->
                    <!--link="/SongListPush"-->
                    <!--is-link-->
                  <!--&gt;</cell>-->
                  <!--<cell-->
                    <!--v-if="user.Account"-->
                    <!--title="排序歌单"-->
                    <!--is-link-->
                  <!--&gt;</cell>-->
                  <div class="fig" v-if="user.Account">
                    <router-link
                      tag="div"
                      to="/SongListPush"
                    >新建歌单</router-link>
                    <div
                      @click="paixu = !paixu"
                    >排序歌单</div>
                  </div>
                  <SlickList
                    :lockToContainerEdges="true"
                    axis="y"
                    lockAxis="y"
                    helperClass="show"
                    v-model="user.songList"
                    class="SortableList"
                    @input="getChangeLists"
                    v-show="paixu"
                  >
                    <SlickItem v-for="(item, index) in user.songList" class="SortableItem" :index="index" :key="index">
                      <cell
                        :title="item.title"
                        :value="item.list.length + '首'"
                        :link="'/LocalhostSon/' + item.id"
                        is-link
                        class="post"
                      >
                        <slick-list
                          :lockToContainerEdges="true"
                          axis="y"
                          lockAxis="y"
                          v-model="user.songList"
                          class="SortableList2"
                        ></slick-list>
                      </cell>
                    </SlickItem>
                  </SlickList>
                  <div
                    v-show="!paixu"
                    @click="value = true"
                  >
                    <cell
                      v-for="(item, index) in user.songList"
                      :key="index"
                      :title="item.title"
                      :value="item.list.length + '首'"
                      :link="'/LocalhostSon/' + item.id"
                      is-link
                      class="post"
                    >
                    </cell>
                  </div>
                </div>
              </div>
              <div class="title vux-1px-b">
                <cell
                  :title="'我的收藏'"
                  is-link
                  :border-intent="false"
                  :arrow-direction="showContent002 ? 'up' : 'down'"
                  @click.native="showContent002 = !showContent002"
                ></cell>
                <div class="slide" :class="showContent002?'animate':''">
                  <cell
                    v-for="(item, index) in userCollection"
                    :key="index"
                    :title="item.dissname"
                    :value="item.nickname"
                    :link="'/sonSortMain/' + item.disstid"
                    is-link></cell>
                </div>
              </div>
            </group>
          </div>
          <div class="btn">
            <div>
              <x-button>切换用户</x-button>
            </div>
            <div @click="usetOut">
              <x-button>退出当前账户</x-button>
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'
import { Group, Popup, Cell, XButton } from 'vux'
export default {
  name: 'userInfo',
  components: {
    Group,
    Popup,
    Cell,
    XButton,
    SlickList,
    SlickItem
  },
  data () {
    return {
      value: false,
      value2: false,
      showContent001: false,
      showContent002: false,
      flag: true,
      paixu: false,
      userCollection: []
    }
  },
  methods: {
    usetOut () {
      this.$store.commit('userOut')
    },
    getChangeList (val) {
      console.log(val, 'val')
    },
    ff () {
      alert(2)
    },
    getChangeLists (vals) {
      let user = this.user
      user.songList = vals
      this.$store.commit('userSongPudate', user)
      // console.log(user)
      // console.log(vals, 'vals')
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    value (to) {
      let id = this.user.Collection.join(',')
      let This = this
      let RecommendSong = `/qqCMusic/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=${id}&g_tk=1176666473&loginUin=1737481208&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`
      this.axios.get(RecommendSong)
        .then(function (res) {
          This.userCollection = res.data.cdlist
          console.log(res.data)
        })
    }
  }
}
</script>

<style scoped>
  .icon{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 501;
  }
  .Box{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .iconBox{
    position: absolute;
    top: 20px;
    left: 10px;
  }
  .iconBox i{
    font-size: 40px;
    color: #fff;
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
  .SortableItem{
    height: 78px;
    position: relative;
  }
  .SongList{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99999999999;
    background: #fff;
  }
  .sub-item {
    color: #888;
  }
  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
  .slide li{
    padding-left: 25px;
    margin-bottom: 10px;
  }
  .slide{
    padding: 0;
  }
  .slide >>> .weui-cell{
    padding-left: 35px;
  }
  .show{
    z-index: 9999999999;
  }
  .SortableList2{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .fig{
    display: flex;
    padding: 0 10px;
    text-align: center;
  }
  .fig div{
    width: 100%;
    padding: 10px 0;
  }
  .userInfo >>> .slide{
    height: 700px;
    overflow-y: auto;
  }
</style>
