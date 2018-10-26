<template>
  <div id="app">
    <div class="main" >
      <myheader class="myheader"></myheader>
      <tab class='tab'></tab>
    </div>
    <transition name="slideTo">
      <component :is="contentName" class="singer-content"></component>

    </transition>


  </div>
</template>

<script>
  import myheader from './components/header.vue'
  import tab from './components/tab/tab.vue'
  import singerDetial from './components/singer-detial/singer-detial.vue'
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'App',
    components: {
      myheader,
      tab,
      singerDetial
    },
    data() {
      return {
        tabs: [{
          name: 'singer-detial',
          component: singerDetial,
        }]
      }
    },
    computed: {
      ...mapGetters([
        'contentName'
      ])
    }
  }

</script>

<style>
  #app {

    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }

  .main {
    position: relative;
    z-index: 0;
  }

  .singer-content {
    position: absolute;
    top:0px;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .slideTo-enter,
  .slideTo-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .slideTo-enter-to,
  .slideTo-leave {}

  .slideTo-enter-active,
  .slideTo-leave-active {
    transition: all 0.5s;
  }

</style>
