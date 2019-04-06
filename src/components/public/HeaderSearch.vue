<template>
  <header>
    <nav>
      <ul>
        <li>
          音乐馆
        </li>
      </ul>
    </nav>
    <div class="search">
      <!--<Search @searchHid="searchHid" v-if="searchOff"></Search>-->
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderSearch'
}
</script>

<style scoped>
  header{
    padding: 0 16px 16px 16px;
    box-sizing: border-box;
    background: #32c27c;
  }
  nav{
    height: 100px;
    padding: 0 40px;
    box-sizing: border-box;
  }
  nav ul{
    display: flex;
    height: 100%;
    justify-content: space-around;
    align-items: center;
  }
  nav ul li{
    color: #fff;
    font-size: 38px;
    font-weight: 700;
  }
  nav ul li.show {
    font-size: 36px;
  }
  .search{
    height: 64px;
    background: #2caa6d;
  }
</style>
