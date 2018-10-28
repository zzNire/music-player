<template>
  <div id="app">
    <div class="main" >
      <myheader class="myheader"></myheader>
      <tab class='tab'></tab>
    </div>
    <transition name="slideTo">
      <component :is="contentName" class="singer-content"></component>

    </transition>
    <player class="player"></player>

  </div>
</template>

<script>
  import myheader from './components/header.vue'
  import tab from './components/tab/tab.vue'
  import singerDetial from './components/singer-detial/singer-detial.vue'
  import Player from './components/player/player.vue'
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'App',
    components: {
      myheader,
      tab,
      singerDetial,
      Player,
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

    
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }

  .main {
    width: 100%;
    position: fixed;
    top:0;
    bottom: 45px;
    z-index: 0;
  }

  .singer-content {
    position: fixed;
    top:0px;
    bottom: 45px;
    width: 100%;
   
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

.player{
  position: relative;
  z-index:20;
}
</style>
