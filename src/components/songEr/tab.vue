<template>
  <ul>
    <li
      v-for="(item, index) in data"
      :key="index"
      v-if="index > 0"
      @click="puad(item)"
    >{{item.name}}</li>
  </ul>
</template>

<script>
export default {
  name: 'tab',
  props: ['data'],
  methods: {
    puad (data) {
      this.$emit('puadId', data)
    }
  }
}
</script>

<style scoped>
  ul{
    display: flex;
    width: 50px;
    height: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    background: #31c27c;
  }
  li{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  li.show{
    color: #31c27c;
  }
</style>
