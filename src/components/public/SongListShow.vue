<template>
  <div id="wrap">
    <div class="header">
      <div class="info_box">
        <div class="gn">
          <div class="img" style="width:125px;height:125px;margin-right: 10px;">
            <img :src="img(data)" />
          </div>
          <div class="album">
            <h3 class="son_h3">{{title(data)}}</h3>
            <div class="use">
              <img :src="userImg(data).img" alt="" v-if="userImg(data).off"><span>{{name(data)}}</span>
            </div>
            <p>{{pudaTime(data)}}</p>
          </div>
        </div>
        <div class="bf">
          <div class="palylen" @click="th(data)">播放全部</div>
        </div>
      </div>
      <div class="ImgBg">
        <div class="mark"></div>
        <img class="lj" :src="img(data)" />
      </div>
    </div>

    <div class="main">
      <div class="count">
        {{list(data).leng}}
        <span @click="userCollection()" v-if="Collection(data)">收藏</span>
        <!--!data.user-->
        <!--{{data.topinfo}}-->
      </div>
      <div class="UlBox wrapper" ref="wrapper" :style="heipx">
        <ul class="ul_box content">
          <li
            v-for="(item, index) in list(data).list"
            :key="index"
            @click="oneSong(item)"
          >
            <div class="SongShowBox">
              <div class="icon" @click.stop="shoucanShow(item)" v-if="!off">
                <x-icon type="ios-heart-outline" size="30" class="vux-x-icon"></x-icon>
              </div>
              <div class="Num">
                <span>{{index + 1}}</span>
              </div>
              <div class="li_list">
                <div>
                  <h3>{{sontitle(item).title}}</h3>
                  <span v-for="(SongName, j) in sontitle(item).songer" :key="j">{{SongName.name}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'sonList',
  props: ['data', 'off'],
  data () {
    return {
      heipx: '',
      timeOutEvent: 0,
      show2: false,
      showContent002: false,
      titleTxt: '',
      song: {}
    }
  },
  methods: {
    th (data) {
      let list = {list: [], leng: ''}
      // 区分数据来自排行榜还是来自别的地方
      if (data.topinfo) {
        list = {list: data.songlist, leng: '排行榜 共' + data.songlist.length + '首'}
      } else if (data.songlist) {
        list = {list: data.songlist, leng: '歌单 共' + data.songlist.length + '首'}
      } else if (data.list) {
        list = {list: data.list, leng: '歌单 共' + data.list.length + '首'}
      }
      this.$store.commit('musicTh', list.list)
    },
    hei () {
      let Box = document.getElementsByClassName('UlBox')[0].offsetTop
      let scrollTop = document.documentElement.clientHeight
      this.heipx = 'height:' + (scrollTop - Box) + 'px'
      console.log(this.heipx)
    },
    img (data) {
      let img
      // 判断数据是否来自排行榜
      if (data.topinfo) {
        img = data.topinfo.pic_v12
      } else if (data.logo) {
        img = data.logo
      } else if (data.mid) {
        img = this.$store.state.img.DieT + data.mid + this.$store.state.img.sonH
      } else {
        img = 'https://y.gtimg.cn/mediastyle/global/img/singer_150.png?max_age=2592000'
      }
      return img
    },
    title (data) {
      let title
      // 判断数据是否来自排行榜
      if (data.topinfo) {
        title = data.topinfo.ListName
      } else if (data.dissname) {
        title = data.dissname
      } else if (data.singer_name) {
        title = data.singer_name
      } else if (data.title) {
        title = data.title
      } else if (data.name) {
        title = data.name
      }
      return title
    },
    name (data) {
      let name
      // 判断数据是否来自排行榜,且求他们的更新时间 天
      if (data.day_of_year) {
        name = '第' + data.day_of_year + '天'
      } else if (data.date) {
        // 周
        let date = data.date.indexOf('_')
        name = '第' + data.date.substring(date + 1) + '周'
      } else if (data.nickname) {
        name = data.nickname
      } else if (data.user) {
        name = data.user
      } else if (data.singername) {
        name = data.singername
      }
      return name
    },
    pudaTime (data) {
      let time
      // 判断数据是否来自排行榜
      if (data.update_time) {
        time = data.update_time + '更新'
      } else if (data.visitnum) {
        time = data.visitnum
        if (time >= 10000) {
          time = '播放量：' + (time / 10000).toFixed(1) + '万'
        }
      } else if (data.aDate) {
        time = '发行时间：' + data.aDate
      }
      return time
    },
    list (data) {
      let list = {list: [], leng: ''}
      // 区分数据来自排行榜还是来自别的地方
      if (data.topinfo) {
        list = {list: data.songlist, leng: '排行榜 共' + data.songlist.length + '首'}
      } else if (data.songlist) {
        list = {list: data.songlist, leng: '歌单 共' + data.songlist.length + '首'}
      } else if (data.list) {
        list = {list: data.list, leng: '歌单 共' + data.list.length + '首'}
      }
      return list
    },
    sontitle (data) {
      let title = {title: '', songer: []}
      if (data.data) {
        if (data.data.songname) {
          title.title = data.data.songname
          title.songer = data.data.singer
        }
      } else if (data.name) {
        if (data.singer) {
          title.title = data.name
          title.songer = data.singer
        }
      } else if (data.musicData) {
        title.title = data.musicData.songname
        title.songer = data.musicData.singer
      } else if (data.songname) {
        title.title = data.songname
        title.songer = data.singer
      }
      return title
    },
    userImg (data) {
      let user = {img: '', off: false}
      if (data.headurl) {
        user = {img: data.headurl, off: true}
      } else if (data.singermid) {
        user = {
          img: this.$store.state.img.userImgT + data.singermid + this.$store.state.img.sonH,
          off: true
        }
      }
      // console.log(user)
      return user
    },
    userCollection () {
      console.log(this.data)
      this.$store.commit('userCollection', this.data.disstid)
    },
    songShow (data) {
      let music = this.$store.state.music
      let musicThis = this.$store.state.musicThis
      let off = false
      if (music[musicThis]) {
        if (data.mid) {
          if (data.mid === music[musicThis].mid) {
            off = true
          }
        } else if (data.strMediaMid) {
          if (data.strMediaMid === music[musicThis].strMediaMid) {
            off = true
          }
        }
      }
      return off
    },
    oneSong (data) {
      // console.log(data)
      this.$store.commit('songPush', data)
      this.$store.commit('songIndexFn', 1)
    },
    shoucanShow (data) {
      this.$store.state.loveOff = true
      this.$store.state.song = data
      // this.song = data
    },
    Collection (data) {
      let off = true
      if (data.user) {
        off = false
      } else if (data.topinfo) {
        off = false
      }
      return off
    }
  },
  mounted () {
    this.hei()
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, { // 初始化better-scroll
        probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true // 是否派发click事件
      })
    })
  },
  created () {
    // this.$store.commit('userLogin')
  }
}
</script>

<style scoped>
  .header{
    background: rgba(0,0,0,.5);
  }
  .main li.is_show{
    color: #31c27c;
  }
  .main li.is_show .li_list span{
    color: #31c27c;
  }
  li{
    position: relative;
  }
  li.show{
    color: #31c27c;
  }
  li.show .li_list h3{
    color: #31c27c;
  }
  li:nth-child( -n+3 ) .Num{
    color: #FF400B
  }
  .bm{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    width: 90px;
    margin-right: -32px;
  }
  .header .info_box .gn{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 34px;
    padding: 0 32px;
    overflow: hidden;
  }
  .album{
    line-height: 2;
  }
  .album p,.album span{
    font-size: 26px;
  }
  .ImgBg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }
  .mark{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    z-index: 1;
  }
  .header .lj{
    /*position: absolute;*/
    /*top: 0;*/
    object-fit: cover;
    -webkit-transform: scale(1.4) translateZ(0);
    -webkit-filter: blur(32px);
    z-index: -1;
  }
  .album{
    color: #fff;
  }
  .son_h3{
    font-size: 32px;
    font-weight: 400;
  }
  .header{
    position: absolute;
    width:100%;
    height: 452px;
    z-index:100;
    overflow:hidden;
  }
  .bf{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 180px;
  }
  .palylen{
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    min-width: 260px;
    padding: 0 40px;
    height: 90px;
    overflow: hidden;
    text-align: center;
    font-size: 32px;
    color: #fff;
    border-radius: 40px;
    background: #31c27c;
  }
  .main{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    padding-top:452px;
    overflow: hidden;
    will-change: transform;
    -webkit-transform: translateZ(0);
    background: #fff;
  }
  .UlBox{
    height: 790px;
    overflow: hidden;
  }
  @media (max-width: 321px){
    .bf {
      height: auto;
      margin-top: 20px;
    }
  }
  .count{
    height: 108px;
    position: relative;
    display: -webkit-box;
    -webkit-box-align: center;
    padding: 0 20px;
    font-size: 28px;
    color: #777;
    -webkit-border-radius: 20px 20px 0 0;
    -moz-border-radius: 20px 20px 0 0;
    border-radius: 40px 0 0 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .count span{
    position: absolute;
    display: block;
    background: #31c27c;
    width: 200px;
    height: 80%;
    top: 10px;
    right: 0;
    text-align: center;
    line-height: 2.8;
    /*font-size: 50px;*/
    color: #fff;
    border-radius: 40px 0 0 0;
  }
  .SongShowBox{
    display: flex;
  }
  .Num{
    display: flex;
    width: 90px;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
  .li_list{
    font-size: 30px;
    width: 700px;
    padding: 20px 30px 20px 0;
    overflow: hidden;
  }
  .li_list h3{
    font-size: 28px;
    font-weight: 400;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: #777;
  }
  .li_list span{
    font-size: 20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .loading{
    position:absolute;
    background-color:#f4f4f4;
    background-repeat: no-repeat;
    background-position: center;
    width:100%;
    height:100%;
    z-index:11111;
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:1.5rem;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.4px;
    -moz-osx-font-smoothing: grayscale;
  }
  .use{
    overflow: hidden;
    margin: 20px 0;
  }
  .use img{
    width: 50px;
    height: 50px;
    float: left;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-right: 10px;
  }
  .use span{
    float: left;
  }
  .icon {
    position: absolute;
    right: 10px;
    top: calc(50% - 30px);
  }
  .vux-x-icon {
    fill: #31c27c;
  }
  /*vux-tap-active weui-cell_access vux-cell-no-border-intent*/
</style>
