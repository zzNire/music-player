<template>
  <div  class='lyric'>
    <scroll :data="lyrics" ref="lyricScroll" class="lyric-scroll">
      <ul class='lyric-ul'>
        <li class='lyric-li' v-for="(lyric,index) in lyrics" ref="lyricLi" :class="{'current-lyric-line':currentLyricLine === index}">
          <p class='lyric-text' v-html="lyric.txt"></p>
        </li>
      </ul>
    </scroll>
   
  </div> 
 

</template>


<script>
  import Scroll from '../scroll/scroll.vue'
  export default {
    props: {
      lyrics: {
        type: Array,
        default: [],
      },
      currentLyricLine: {
        type: Number,
        default: 0,
      }
    },
    components: {
      Scroll,
    },
    methods:{
      disable(){
        this.$refs.lyricScroll.disable();
      },
      enable(){
        //console.log('lyric enable');
        this.$refs.lyricScroll.enable();
      }
    },
    watch: {
      currentLyricLine(newNum) {
        //console.log(newNum);
        if (newNum > 7) {
          let currentEl = this.$refs.lyricLi[newNum - 7];
          this.$refs.lyricScroll.scrollToElement(currentEl, 1000);
        } else {
          this.$refs.lyricScroll.scrollTo(0, 0, 1000);
        }
      },
      lyrics() {
        this.$refs.lyricScroll.refresh();
        console.log('refresh')
      }

    }
  }

</script>

<style lang="stylus" scoped>
  .lyric {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

.lyric-scroll{
  height :100%;}
  .lyric-text {
    white-space: normal;
  }

  .current-lyric-line {
    color: white;
  }
  .default-wrapper{
      position :relative;
      top:50%;
      transform :translateY(-50%);
  }
  .default{
      width:100%;
      text-align :center;
      top:50%;

  }

</style>
