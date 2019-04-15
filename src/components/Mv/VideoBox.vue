<template>
  <div class="VideoBox">
    <div class="video">
      <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
      ></video-player>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoBox',
  data () {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        autoplay: false,
        muted: false,
        loop: false,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        sources: [{
          type: 'video/mp4',
          src: ''
        }],
        poster: '',
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true
        }
      }
    }
  },
  created () {
    let id = this.$store.state.MvId
    let This = this
    let url = `/qqUMusic/cgi-bin/musicu.fcg?g_tk=5381&uin=0&ct=23&cv=0&format=json&data=%7B%22getMVInfo%22%3A%7B%22module%22%3A%22video.VideoDataServer%22%2C%22method%22%3A%22get_video_info_batch%22%2C%22param%22%3A%7B%22vidlist%22%3A%5B%22${id}%22%5D%2C%22required%22%3A%5B%22vid%22%2C%22sid%22%2C%22gmid%22%2C%22type%22%2C%22name%22%2C%22cover_pic%22%2C%22video_switch%22%2C%22msg%22%5D%7D%7D%2C%22getMVUrl%22%3A%7B%22module%22%3A%22gosrf.Stream.MvUrlProxy%22%2C%22method%22%3A%22GetMvUrls%22%2C%22param%22%3A%7B%22vids%22%3A%5B%22${id}%22%5D%7D%2C%22request_typet%22%3A10001%7D%2C%22getVideoUrl%22%3A%7B%22module%22%3A%22Base.VideoFeedsUrlServer%22%2C%22method%22%3A%22GetVideoFeedsUrl%22%2C%22param%22%3A%7B%22uin%22%3A0%2C%22vecfileid%22%3A%5B%5D%7D%7D%7D&_=1541666215857`
    this.axios.get(url)
      .then(function (res) {
        for (var k in res.data.getMVUrl.data) {
          This.playerOptions.poster = res.data.getMVInfo.data[k].cover_pic
          // console.log()
          for (var i = 0; i < res.data.getMVUrl.data[k].mp4.length; i++) {
            // console.log(data.getMVUrl.data[k].mp4[i].freeflow_url)
            if (res.data.getMVUrl.data[k].mp4[i].freeflow_url.length !== 0) {
              // console.log(data.getMVUrl.data[k].mp4[i].freeflow_url)
              // console.log(This.playerOptions.sources[0].src)
              This.playerOptions.sources[0].src = res.data.getMVUrl.data[k].mp4[i].freeflow_url[0]
            }
          }
        }
        // console.log(res.data)
      })
  }
}
</script>

<style scoped>
</style>
