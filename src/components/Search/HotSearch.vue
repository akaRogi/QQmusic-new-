<template>
  <div class="search_hot">
    <h3>热门搜索</h3>
    <ul class="hot_ul">
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="show(item.k)"
      >
        <a href="Javascript:;;">{{item.k}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HotSearch',
  data () {
    return {
      list: []
    }
  },
  methods: {
    show (item) {
      this.$emit('ret', item)
    }
  },
  created () {
    let This = this
    let url = '/qqCMusic' + this.$store.state.url.hotSearchUrl
    this.axios.get(url)
      .then(function (res) {
        This.list = res.data.data.hotkey
        // console.log(res.data.data.hotkey)
      })
  }
}
</script>

<style scoped>
  .search_hot{
    padding: 30px;
  }
  .search_hot h3{
    margin-bottom: 20px;
  }
  .search_hot .hot_ul{
    overflow: hidden;
  }
  .search_hot .hot_ul li {
    float: left;
    padding: 8px 20px;
    font-size: 28px;
    border: 2px solid #9a999e;
    border-radius: 99px;
    margin-bottom: 20px;
    margin-right: 28px;
  }
  .search_hot li a {
    color: #9a999e;
  }
</style>
