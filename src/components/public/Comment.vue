<template>
  <div class="MvComment" :style="heipx" ref="wrapper">
    <div>
      <div class="MvCommentHot" v-if="data.hot_comment.commentlist">
        <h2>热评<span>{{commentLength(data.hot_comment.commentlist)}}</span></h2>
        <ul>
          <li v-for="(item, index) in data.hot_comment.commentlist" :key="item.rootcommentcontent + index">
            <div class="MvCommentTx">
              <img :src="item.avatarurl" alt="用户头像">
            </div>
            <div class="MvCommentMain">
              <div class="comment_list__heading">
                <div class="MvHeaderBox">
                  <h3>{{item.nick}}</h3>
                  <div class="MvDate">
                  </div>
                </div>
                <div class="js_cmt_click">
                  <p v-html="plMain(item.rootcommentcontent)"></p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="MvCommentHot" v-if="data.comment.commentlist">
        <h2>全部评论<span>{{commentLength(data.comment.commentlist)}}</span></h2>
        <ul>
          <li v-for="(item, index) in data.comment.commentlist" :key="index">
            <div class="MvCommentTx">
              <img :src="item.avatarurl" alt="用户头像">
            </div>
            <div class="MvCommentMain">
              <div class="comment_list__heading">
                <div class="MvHeaderBox">
                  <h3>{{item.nick}}</h3>
                  <div class="MvDate">
                  </div>
                </div>
                <div class="js_cmt_click">
                  <p v-html="plMain(item.rootcommentcontent)"></p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div class="push" v-if="pushTis">{{tis}}</div>
      </div>
      <div class="noComment" v-if="!data.comment.commentlist && !data.hot_comment.commentlist">
        这首MV还没有评论哦~
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'comment',
  props: ['data'],
  data () {
    return {
      heipx: 0,
      pushTis: true,
      tis: '32'
    }
  },
  methods: {
    commentLength (data) {
      return data.length
    },
    plMain (str) {
      return str.split('\\n').join('<br>')
    },
    hei () {
      let Box = document.getElementsByClassName('MvComment')[0]
      let offsetTop = 0
      let top = 0
      while (Box && Box.tagName !== 'BODY') {
        if (offsetTop.tagName !== 'BODY') {
          top = Box.offsetTop
        }
        offsetTop += Box.offsetTop
        Box = Box.offsetParent
      }
      let scrollTop = document.documentElement.clientHeight
      this.heipx = 'height:' + (scrollTop - top) + 'px'
      // console.log(this.heipx)
    }
  },
  mounted () {
    this.hei()
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, { // 初始化better-scroll
        probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true, // 是否派发click事件
        pullUpLoad: {
          threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
        }
      })
      this.scroll.on('pullingUp', () => {
        this.tis = '松手进行加载'
        // console.log(2)
        // this.$store.commit('puadloading', true)
        this.scroll.finishPullUp()
      })
      // 滑动结束松开事件
      this.scroll.on('touchEnd', (pos) => { // 上拉刷新
        if (pos.y > 30) {
          // console.log('222222222222')
        } else if (pos.y < (this.scroll.maxScrollY - 50)) {
          this.p++
          // this.$store.dispatch('commentRequest', {id: id, p: this.p})
          this.tis = '载入中'
          this.$emit('pushList')
        } else {
          this.tis = '往上拉进行加载'
          // this.$store.commit('puadloading', false)
        }
      })
    })
  }
}
</script>

<style scoped>
  .MvComment{
    z-index: -1;
    overflow: hidden;
  }
  .MvCommentHot{
    margin: 0 14px 0 10px;
    box-sizing: border-box;
    z-index: -1;
  }
  .MvCommentHot h2{
    margin: 0;
    padding: 10px 0;
    font-size: 28px;
    font-weight: 300;
    margin-bottom: 10px;
  }
  .MvCommentHot h2 span{
    margin-left: 10px;
    font-size: 30px;
    color: grey;
  }
  .MvComment li{
    position: relative;
    display: -webkit-box;
    margin-bottom: 10px;
    padding-top: 6px;
    border-bottom: 1px solid rgba(0,0,0,.05);
    padding-bottom: 10px;
  }
  .MvCommentTx{
    position: relative;
    width: 60px;
    height: 60px;
    margin-right: 20px;
    border-radius: 100%;
    background-color: rgba(203,203,203,.2);
    -webkit-user-select: none;
  }
  .MvCommentTx img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
    pointer-events: none;
  }
  .MvCommentMain{
    position: relative;
    -webkit-box-flex: 1;
    padding-bottom: .1rem;
  }
  .MvHeaderBox{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    min-height: .35rem;
    margin-bottom: 6px;
  }
  .comment_list__heading {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    min-height: .35rem;
  }
  .comment_list__heading h3{
    display: -webkit-box;
    -webkit-box-align: center;
    margin: -.04rem 0 -.02rem;
    font-size: 26px;
    font-weight: 300;
    color: grey;
  }
  .MvDate{
    display: -webkit-box;
    -webkit-box-align: center;
    font-size: .1rem;
    color: grey;
  }
  .js_cmt_click{
    position: relative;
    font-size: 24px;
  }
  .js_cmt_click p {
    margin: 0;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    text-align: justify;
    line-height: 1.6;
  }
  .load{
    text-align: center;
    font-size: 24px;
  }
  .noComment{
    font-size: 30px;
    margin-top: 20px;
    margin-left: 10px;
  }
  .push{
    text-align: center;
  }
</style>
