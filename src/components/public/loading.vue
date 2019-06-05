<template>
    <div class="loading">
      <div class="loadingBox">
        <div class="loadImg">
          <img src="../../assets/img/load.gif" alt="">
        </div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.loading{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 999999999999999999;
  }
  .loadingBox{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .loadImg{
    position: absolute;
    width: 80%;
    height: max-content;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto
  }
  .loadImg img{
    width: 100%
  }
</style>
