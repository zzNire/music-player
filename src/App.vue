<template>
  <div id="app">
    <myheader></myheader>
  </div>
</template>

<script>
import myheader from './components/header.vue'
export default {
  name: 'App',
  components:{
    myheader,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
}
</style>
