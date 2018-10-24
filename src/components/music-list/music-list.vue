<template>
  <div class="music-list">
   
    <div class="singer-picture" ref="bgImage">
      <img class="picture" :src="bgImage" ref="bgIcon"/>
     
    </div>
    <div class="bg-layer" ref="bgLayer"></div>
    <p class="title" ref="title">{{title}}</p>
    <scroll :data="songs" 
    :probe-type="probeType"
    :click="click"
    :listen-scroll="listenScroll"
    @scroll = 'bglayerScroll'
    class="scroll-list" ref="list">
      <div class="songs-list">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>

  </div>
</template>


<script>
  import SongList from '../../base/song-list/song-list.vue'
  import Scroll from '../../base/scroll/scroll.vue'
  const MIN_HEIGHT = 38;
  const RESERVED_HEIGHT = 0;
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
    },
    data(){
        return {
            ScrollY:-1,
        }
    },
    created(){
        this.probeType = 3;
        this.listenScroll = true;
        this.click = true;
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight;
      //this.listTop = -this.imageHeight + RESERVED_HEIGHT;//
        console.log('this.minTransalteY'+this.minTransalteY);
      this.$refs.list.$el.style.top = `${this.imageHeight+RESERVED_HEIGHT}px`;
      console.log('this.$refs.list.$el.style.top',this.imageHeight+RESERVED_HEIGHT);
        this.minTransalteY = -this.imageHeight + MIN_HEIGHT;//向上滚动最大高度
        console.log('this.minTransalteY'+this.minTransalteY);
        this.$refs.title.style.top = this.imageHeight-MIN_HEIGHT+'px';
    },
    methods:{
        bglayerScroll(pos){
            this.ScrollY = pos.y;
            //console.log(this.ScrollY);
        }
    },
    watch:{
        ScrollY(newY){
           
            //this.imageHeight = this.$refs.bgImage.clientHeight;
            console.log(newY);
            if(newY < this.minTransalteY)
            {
                //let image = this.$refs.bgImage;
                //image.style.height = this.imageHeight+'px';
                //image.style.paddingTop = 0;
                //image.style.zIndex="10";
                return ;
            }
           // let translateY = this.$refs.bgImage.clientHeight
           let image = this.$refs.bgIcon;
           image.style.filter = `blur(${-newY/this.imageHeight*10}px)`;
            let bgLayer = this.$refs.bgLayer;
            bgLayer.style.transform = `translate3d(0,${newY}px,0)`;
            let bgImage = this.$refs.bgImage;
            bgImage.style.transform = `translate3d(0,${newY}px,0)`;
            let scale = Math.abs(newY/this.imageHeight)*2+1;
           let title = this.$refs.title;
           title.style.transform = `translate3d(-50%,${newY}px,0) `;
            //scale = scale/0.7;
            if(newY>0)
            {
                bgImage.style.height = this.imageHeight+'px';
                bgImage.style.padding = 0;
                //image.style.transform = `scale(${scale})`; 
                bgImage.style.transform = `scale(${scale})`; 
                console.log("image"+bgImage.clientHeight);
               
              
                
               // title.style.transform = '';
            }
           
        }
    }
   
    
  }

</script>


<style lang="stylus" scoped>
.header{
    position :relative;
    width :100%;
    height :100%;
    
   
}
.bg-layer{
    position :absolute;
    width :100%;
    height :100%;
   z-index:5;
   
}
  .singer-picture {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    overflow: hidden;
    z-index :10;
  

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
    
    line-height :38px;
    left: 50%;
    transform: translateX(-50%);
    z-index:15;
  }

.scroll-list{
   
    position :absolute;
    z-index:5;
    bottom :0px;
}

.songs-list{
    position :relative;
    z-index:5;
}

</style>
