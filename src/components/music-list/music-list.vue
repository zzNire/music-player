<template>
  <div class="music-list">
    <div class='back' @click="backToSinger">
      <i class="icon-prev"></i>
    </div>
    <div class="singer-picture" ref="bgImage" >
      <div class='black' ref="black"></div>
      <img class="picture" :src="bgImage" ref="bgIcon" />
    </div>
    <div class="play-all-buttom" ref="playBtm" @click="playAll">
      <i class='icon-play'></i><span class='play-btm-title'>播放全部<span class="songs-count">（共{{songs.length}}首）</span></span>
    </div>
    <div class="bg-layer" ref="bgLayer">
     
    </div>
    <p class="title" ref="title">{{title}}</p>
    <scroll :data="songs" :probe-type="probeType" :click="click" :listen-scroll="listenScroll" @scroll='bglayerScroll'
      class="scroll-list" ref="list">
      <div class="songs-list">
        <song-list :songs="songs" @songSelect='songSelect'></song-list>
      </div>
      
    </scroll>
  <loading class='loading' v-if="!songs.length"></loading>
  </div>
</template>


<script>
  import SongList from '../../base/song-list/song-list.vue'
  import Scroll from '../../base/scroll/scroll.vue'
  import Loading from '../../base/loading/loading.vue'
  import {mapMutations,mapActions} from 'vuex'
  import {
    prefixStyle
  } from '../../commom/js/dom.js'
  const filter = prefixStyle('filter')
  const transform = prefixStyle('transform')
  const MIN_HEIGHT = 48; //顶部高度
  const RESERVED_HEIGHT = 38; //播放全部的高度
  const UPPER = 10;
  export default {
    props: {
      bgImage: {
        type: String,
        default: '',
      },
      songs: {
        type: Array,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },

    },
    components: {
      SongList,
      Scroll,
      Loading,
    },
    data() {
      return {
        ScrollY: -1,
      }
    },
    created() {
      this.probeType = 3;
      this.listenScroll = true;
      this.click = true;
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight;
      //this.listTop = -this.imageHeight + RESERVED_HEIGHT;//
      console.log('this.minTransalteY' + this.minTransalteY);
      this.$refs.list.$el.style.top = `${this.imageHeight+RESERVED_HEIGHT-UPPER}px`;
       this.$refs.list.$el.style.bottom = 0;
      console.log(this.$refs.list.$el);
      console.log('this.$refs.list.$el.style.top', this.imageHeight + RESERVED_HEIGHT);
      this.minTransalteY = -this.imageHeight + MIN_HEIGHT; //向上滚动最大高度
      console.log('this.minTransalteY' + this.minTransalteY);
      this.$refs.title.style.top = this.imageHeight - MIN_HEIGHT  + 'px';
      this.$refs.black.style.height = this.imageHeight+'px';
    },
    methods: {
      bglayerScroll(pos) {
        this.ScrollY = pos.y;
        //console.log(this.ScrollY);
      },
      backToSinger() {
        this.showContent('');
        this.$router.back();
      },
      ...mapMutations({
        showContent:'SHOW_CONTENT',
        setFullScreen:'SET_FULL_SCREEN',
      }),
      ...mapActions([
        'selectPlay',
      ]),

      songSelect(song,index){
        console.log(song,index);
        this.selectPlay({
          list:this.songs,
          index:index});
      },
      playAll(){
         this.selectPlay({
          list:this.songs,
          index:0});
      }
    },
    watch: {
      ScrollY(newY) {

        //this.imageHeight = this.$refs.bgImage.clientHeight;
        // console.log(newY);
        if (newY < this.minTransalteY) {
          newY = this.minTransalteY;
          this.$refs.playBtm.style['border-bottom']='1px solid rgba(240,240,240,1)';
          this.$refs.playBtm.lastChild.style['border-bottom']='0 solid rgba(240,240,240,1)';
          //return ;
        }else{
          this.$refs.playBtm.style['border-bottom']='0 solid rgba(240,240,240,1)';
           this.$refs.playBtm.lastChild.style['border-bottom']='1px solid rgba(240,240,240,1)';

        }
        // let translateY = this.$refs.bgImage.clientHeight
        let image = this.$refs.bgIcon;
        image.style[filter] = `blur(${-newY/this.imageHeight*10}px)`;
        // image.style['weblitFilter'] = `blur(${-newY/this.imageHeight*10}px)`;
        let bgLayer = this.$refs.bgLayer;
        bgLayer.style[transform] = `translate3d(0,${newY}px,0)`;
        //bgLayer.style.webkitTransform = `translate3d(0,${newY}px,0)`;
        let bgImage = this.$refs.bgImage;
        bgImage.style[transform] = `translate3d(0,${newY}px,0)`;
        //bgImage.style.webkitTransform = `translate3d(0,${newY}px,0)`;
        let scale = Math.abs(newY / this.imageHeight) + 1;
        let title = this.$refs.title;
        title.style[transform] = `translate3d(-50%,${newY}px,0) `;
        this.$refs.playBtm.style[transform] = `translate3d(0,${newY}px,0)`;
        
        //title.style.webkitTransform = `translate3d(-50%,${newY}px,0) `;
        //scale = scale/0.7;
        if (newY > 0) {
          //bgImage.style.height = this.imageHeight+'px';
          //bgImage.style.padding = 0;
          //image.style.transform = `scale(${scale})`; 
          bgImage.style[transform] = `scale(${scale})`;
          //bgImage.style.webkitTransform = `scale(${scale})`; 
          // console.log("image"+bgImage.clientHeight);

          // title.style.transform = '';
        }

      }
    }


  }

</script>


<style lang="stylus" scoped>
  @import '../../commom/stylus/variable.styl';
  @import '../../commom/stylus/style.css';
.music-list{
   width: 100%;
    height: 100%;
  color:black;
   background :$color-background;
  }


  .back {
    position: absolute;
    height: 18px;
    top: 0px;
    left: 0px;
    z-index: 20;
    padding: 10px;
  }

  .icon-prev {

    font-size: 18px;
    color: white;
  }

.icon-prev:before {
  content: "\e909";
}

  .play-all-buttom {
    position :absolute;
    top:-10px;
    display :flex;
    height: 38px;
    width: 100%;
    background: $color-background;
    position: relative;
    z-index: 10;
   border-radius :10px 10px 0 0; 
  }

.icon-play{
  text-align :center;
  flex:38px 0 0 ;
  padding:11px 0;
  display :inline-block;
  vertical-align :middle;
  font-size :25px;
  line-height :16px;
  color:$color-sub-theme;
  
}
  .icon-play:before {
    content: "\e908";
  }

  .play-btm-title {
    flex:1;
    display :inline-block;
    
    font-size :16px;
    line-height :38px;
    vertical-align :top;
    border-bottom :1px solid rgba(240,240,240,1);
    
  }

.songs-count{
  font-size :14px;
  color :gray;
  
  line-height :38px;
  }

  .bg-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
  background :$color-background;

  }

  .black{
    position :absolute;
    top:0px;
    width :100%;
    background-color :rgba(0,0,0,0.4);
    z-index:15;
  }

  .singer-picture {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    overflow: hidden;
    z-index: 10;
    transform-origin: top;
  

  }

  .picture {
    position: absolute;
    width: 100%;
    top: 0px;
  }

  .title {
    color: white;
    font-size: 18px;
    position: absolute;

    line-height: 38px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 15;
    white-space:nowrap;
    overflow :hidden;
    

  }

  .scroll-list {

    position: absolute;
    z-index: 5;
    
    bottom: 0px;
    background :$color-background;
  }

  .songs-list {
    position: relative;
    z-index: 5;
  }

.loading{
  width :100%;
   position :relative;
   
   top:28px;
  z-index:30;
  
  }
</style>
