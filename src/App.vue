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
    <transition name='confirm'>
    <confirm  class='confirm-component' v-if='showConfirm'
    :title='showParam.title'
    :positive='showParam.positive'
    :negative='showParam.negative'
    @positiveSelect='selectPosotive'
    @negativeSelect='selectNegative'></confirm>
    </transition>
  </div>
</template>

<script>
  import myheader from './components/header.vue'
  import tab from './components/tab/tab.vue'
  import singerDetial from './components/singer-detial/singer-detial.vue'
  import Player from './components/player/player.vue'
  import Disc from './components/disc/disc.vue'
  import TopList from './components/toplist/toplist.vue'
   import AddSong from './base/play-list/add-song.vue'
  import Confirm from './base/confirm/confirm.vue'
  import Vue from 'vue'
  import Bus from './commom/js/bus.js'
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
      Disc,
      TopList,
      Confirm,
      AddSong
    },
    data() {
      return {
        tabs: [{
          name: 'singer-detial',
          component: singerDetial,
        },
        {
          name:'disc',
          component: Disc,
        },
        {
          name:'top-lisy',
          component:TopList,
        },
        {
          name :'add-song',
          component :AddSong,
        }
        ],
       
      }
    },
    computed: {
      ...mapGetters([
        'contentName',
        'showConfirm',
        'showParam',
      ])
    },
    methods:{
      selectPosotive(){
        console.log(this.showConfirm.componentName);
         Bus.$emit('ConfirmPositive',this.showParam.componentName);
      },
      selectNegative(){
        console.log(this.showConfirm.componentName);
          Bus.$emit('ConfirmNegative',this.showParam.componentName);
      }
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

  .slideTo-enter-active,
  .slideTo-leave-active {
    transition: all 0.5s;
  }

  .confirm-enter
  {
    transform: scale(1.2);
    opacity: 0;
  }

.confirm-leave-to{
   opacity: 0;
}
  .confirm-enter-active,
  .confirm-leave-active {
    transition: all 0.2s;
  }

.player{
  position: relative;
  z-index:20;
}

.confirm-component{
  z-index:25;
}

@keyframes rotate{
  0%{
    transform: scale()
  }
  60%{

  }
  100%{

  }
}

</style>
