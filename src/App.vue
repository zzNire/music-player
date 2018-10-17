<template>
  <div id="app">
    <myheader></myheader>
    <tab></tab>
  </div>
</template>

<script>
import myheader from './components/header.vue'
import tab from './components/tab/tab.vue'
export default {
  name: 'App',
  components:{
    myheader,
    tab
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
