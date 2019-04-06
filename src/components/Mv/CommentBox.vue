<template>
  <comment :data="data" @pushList="pushList"></comment>
</template>

<script>
import Comment from '../public/Comment'
export default {
  name: 'CommentBox',
  components: {
    Comment
  },
  data () {
    return {
      data: {
        hot_comment: {},
        comment: {}
      },
      pagenum: -1,
      requser: true
    }
  },
  methods: {
    requerList (off) {
      if (this.requser) {
        this.pagenum++
        let This = this
        This.off = false
        let id = this.$store.state.MvId
        let url = `/qqCMusic/base/fcgi-bin/fcg_global_comment_h5.fcg?g_tk=1981813800&hostUin=0&format=json&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq.json&needNewCode=0&cid=205360772&reqtype=2&biztype=5&topid=${id}&cmd=8&needmusiccrit=0&pagenum=${this.pagenum}&pagesize=25&lasthotcommentid=&domain=qq.com&ct=24&cv=10101010`
        this.axios.get(url)
          .then(function (res) {
            if (off) {
              This.data.comment.commentlist.push(...res.data.comment.commentlist)
              // console.log(res.data.comment.commentlist)
            } else {
              This.data = res.data
            }
            This.requser = true
            // console.log(res.data)
          })
        this.requser = false
      }
    },
    pushList () {
      this.requerList(true)
    }
  },
  created () {
    this.requerList()
  }
}
</script>

<style scoped>

</style>
