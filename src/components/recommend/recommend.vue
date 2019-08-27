<template>
  <div class="recommend-content">
    <scroll class='recommend-scroll' :data="recommends.songList" :probe-type="3" @changeLocation='changeXY' @isAllowSwipe="isAllowSwiper" ref="scroll">
      <div class="scroll-content">
  
        <div class="recommend">
          <div v-if="recommends.slider.length" class="swiper-contianer">
            <div class="background-block" ref="backBlock"></div>
            <slider class="slider" ref="slider">
              <div class="slider-div" v-for="recommend in recommends.slider">
                <a class="slider-a" :href="recommend.linkUrl">
                  <img @load="loadImage" class="slider-img" :src="recommend.picUrl">
                </a>
              </div>
            </slider>
          </div>
          <div class="recommend-song">
            <p class="recommend-title">推荐歌单 ></p>
            <div class="recommend-flex">
              <div class="recommend-item" v-for="item in recommends.songList" @click="selectDisc(item)">
                <a class="recommend-a">
                  <div class="img-div">
                    <img class="icon" v-lazy="item.picUrl">
                  </div>
                  <p class="name" v-html="item.songListDesc">{{item.songListDesc}}</p>
  
                  <p class="play-num"><i class="icon-play-mini"></i>{{item.accessnum |translateNum}}</p>
                </a>
              </div>
            </div>
  
          </div>
           <div class="recommend-song">
            <p class="recommend-title">推荐歌单 ></p>
            <div class="recommend-flex">
              <div class="recommend-item" v-for="item in recommends.songList" @click="selectDisc(item)">
                <a class="recommend-a">
                  <div class="img-div">
                    <img class="icon" v-lazy="item.picUrl">
                  </div>
                  <p class="name" v-html="item.songListDesc">{{item.songListDesc}}</p>
  
                  <p class="play-num"><i class="icon-play-mini"></i>{{item.accessnum |translateNum}}</p>
                </a>
              </div>
            </div>
  
          </div>
  
        </div>
      </div>
      <div class="loading-contain" v-show="!recommends.slider.length">
        <my-loading class="loading"></my-loading>
      </div>
    </scroll>
  
  </div>
</template>


<script>
  const ERR_OK = 0;
  import {
    getRecommend,
    getDiscList
  } from '../../api/recommend.js'
  import {
    mapMutations
  } from 'vuex'
  import Slider from '../../base/slider/slider.vue'
  import Scroll from '../../base/scroll/scroll.vue'
  import myLoading from '../../base/loading/loading.vue'
  import {filterRecoment} from '../../commom/js/recomentd'
  
  export default {
    components: {
      Slider,
      Scroll,
      myLoading,
  
    },
    data() {
      return {
        recommends: {
          slider: [],
          allowSwiper: true,
  
        },
        showSonglist: false,
      }
    },
    created() {
      this._getRecommend();
      //  this._getDescList();
     
    },
    mounted() {
  
  
    },
    methods: {
  
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data);
            this.recommends = filterRecoment(res.data);
            console.log(this.recommends);
          }
        });
      },
      _getDescList() {
        console.log('getDiscList');
        getDiscList().then((res) => {
  
          console.log(res);
        });
      },
      changeXY(pos) {
        if (pos.y >= 0)
          return;
        //console.log(this.$refs.backBlock.offsetHeight);
        let top = -Math.floor(this.$refs.backBlock.offsetHeight * 1.25 / 2);
        // console.log(this.$refs.backBlock);
        //console.log('offset'+top);
        top = top + Math.floor(pos.y);
        this.$refs.backBlock.style.top = top + 'px';
        //console.log('change Y to' + this.$refs.backBlock.offsetTop);
      },
      isAllowSwiper(isAllow) {
        this.$emit('tabIsSwiper', isAllow);
      },
      loadImage() {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh();
          this.checkLoaded = true;
        }
  
      },
      selectDisc(item) {
        this.setDisc(item);
        this.setContentName('disc');
        this.$router.push(`/recommend/${item.id}`);
        this.showSonglist = true;
      },
      ...mapMutations({
        setDisc: 'SET_DISC',
        setContentName: 'SHOW_CONTENT',
      }),
  
    },
    filters: {
      translateNum(value) {
        //console.log(value);
        let translateNum = 0;
        if (value >= 10000) {
          translateNum = Math.round(value / 10000);
          return translateNum + '万';
        } else {
          return value;
        }
      },
    }
  }
</script>


<style lang="stylus" scoped>
  @import '../../commom/stylus/variable.styl';

  .recommend-content {
    position: relative;
   
    color: $color-highlight-background;
     width :100%;
     height :100%;
    
  }
.recommend-scroll{
 height :100%;
}
  .recommend {}
.scroll-content{
 
}


  .recommend-song {
    margin: 10px 3px;
  }

  .recommend-title {
    color: $color-highlight-background;
    margin-bottom: 10px;
    margin-left :2px;
    font-size: 14px;
    font-weight: 600;
  }
.swiper-contianer{
  position :relative;
  padding-top:10px;
}

  .background-block {
    top: -125%;
    position: absolute;
    width: 100%;
    height: 200%;
    background: $color-sub-theme;
   
  }
  .slider {}

  .slider-div {
    padding: 0 10px;
   

  }

  .slider-a {

    width: 100%;

  }

  .slider-img {
    width: 100%;
    border-radius: 10px;

  }

.recommend-flex{
  display :flex;
  flex-wrap:wrap;
  justify-content:space-around;
}
  .recommend-item {
    flex:33% 0 0;
    position: relative;
    padding:2px;
    padding-bottom :10px;
    box-sizing: border-box;
  
  }


  .recommend-a {
    width :100%;
    height :100%;
    display :inline-block;
  }

  .img-div {
    padding-bottom: 100%;
    position: relative;
  }

  .icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    border-radius: 5px;
  }

  .name,
  .play-num,
  .author {
    font-size: 12px;
    line-height: 13px;
    color: $color-highlight-background;
  }

  .name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 15px;
    font-size: 13px;
    margin-top: 5px;
    letter-spacing: 1px;
    padding-left: 3px;
    height: 30px;

  }

  .icon-play-mini {
    margin-right: 3px;
    display: inline-block;
    height: 13px;
    width: 13px;
    line-height: 13px;
    vertical-align: middle;
  }

  .icon-play-mini:before {

    content: "\e903"


  }

  .play-num {
    position: absolute;
    top: 5px;
    right: 10px;
    color: #fff;
    font-size: 12px;
    letter-spacing: 1px;
    text-shadow: 1px 0 0 rgba(0, 0, 0, .15);
  }

.loading-contain{
  width :100%;
  height :100%;
  background :rgba(0,0,0,0.5);
  position :fixed;
  top:0%;
  
  }
  .loading{
    position :relative;
    top:50%;
    }

</style>
