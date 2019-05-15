<template>
  <div class="searchList">
    <swipeout class="vux-1px-tb list_search">
      <swipeout-item
        transition-mode="follow"
        v-for="(item, index) in data"
        :key="index"
      >
        <div class="right-menu" slot="right-menu">
          <swipeout-button
            type="primary"
            @click.native="songInfo(item)"
          >收藏</swipeout-button>
          <!--<swipeout-button type="primary">111</swipeout-button>-->
          <!--<swipeout-button type="warn">2222</swipeout-button>-->
        </div>
        <div @click="pushSong(item)" slot="content" class="demo-content vux-1px-t">
          <h6>{{item.name || item.title}}</h6>
          <p><span
            v-for="(SongName, j) in item.singer"
            :key="j"
          >
        {{SongName.name}}
        </span></p>
          <!--<div class="icon" @click="songInfo(item)">-->
            <!--<x-icon class="cell-x-icon" type="ios-heart-outline" size="30"></x-icon>-->
          <!--</div>-->
        </div>
      </swipeout-item>
    </swipeout>
    <!--<ul class="list_search">-->
      <!--<li-->
        <!--v-for="(item, index) in data"-->
        <!--:key="index"-->
        <!--@click="pushSong(item)"-->
      <!--&gt;-->
        <!--<h6>{{item.name || item.title}}</h6>-->

        <!--<p><span-->
          <!--v-for="(SongName, j) in item.singer"-->
          <!--:key="j"-->
        <!--&gt;-->
        <!--{{SongName.name}}-->
        <!--</span></p>-->
        <!--<div class="icon" @click="songInfo(item)">-->
          <!--<x-icon class="cell-x-icon" type="ios-heart-outline" size="30"></x-icon>-->
        <!--</div>-->
      <!--</li>-->
    <!--</ul>-->
  </div>
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
export default {
  name: 'searchList',
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  props: ['data'],
  methods: {
    pushSong (data) {
      this.$store.commit('songIndexFn', 1)
      this.$store.commit('songPush', data)
    },
    songInfo (data) {
      this.$store.state.song = data
      this.$store.state.loveOff = true
      console.log(data)
    }
  }
}
</script>

<style scoped>
  .searchList{
    padding: 15px;
  }
  .demo-content {
    position: relative;
    margin-top: 26px;
    height: 100px;
    padding-left: 112px;
    background-repeat: no-repeat;
    background-size: 52px;
    background-position: 10px 20px;
    background-image: url("../../assets/img/search_sprite.png");
  }
  .demo-content h6 {
    padding-top: 12px;
    margin-bottom: 5px;
    line-height: 36px;
    font-size: 32px;
    font-weight: normal;
    color: #9a999e;
  }
  .demo-content p {
    color: #808080;
  }
  .demo-content span:nth-child(n+1) {
    margin-right: 20px;
  }
  .icon{
    position: absolute;
    top: calc(50% - 35px);
    right: 10px;
  }
  .cell-x-icon {
    display: block;
    fill: #9a999e;
  }
</style>
