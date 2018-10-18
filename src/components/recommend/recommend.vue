<template>
  <div class="recommend">
    <div v-if="recommends.slider.length" class="swiper-contianer">
        <slider>
          <div class="slider-div" v-for="recommend in recommends.slider">
            <a class="slider-a" :href="recommend.linkUrl">
              <img class="slider-img" :src="recommend.picUrl">
            </a>
          </div>
        </slider>
    </div>
    <div class="recommend-song">
      <p class="recommend-title">推荐歌单 ></p>
    </div>
  </div>

</template>


<script>
const ERR_OK = 0;
import {getRecommend} from '../../api/recommend.js'
import Slider from '../../base/slider/slider.vue'

  export default {
    components:{
      Slider,
    },
    data(){
      return{
        recommends:{
          slider:[],
        },
      }
    },
      created(){
        this._getRecommend();
      },
      methods:{
          _getRecommend(){
              getRecommend().then((res)=>{
                  if(res.code === ERR_OK)
                  {
                    console.log(res.data);
                    this.recommends = res.data;
                    console.log(this.recommends.slider.length);
                  }
              });
          }
      }
  }

</script>


<style lang="stylus" scoped>
  @import '../../commom/stylus/variable.styl';
  

  .recommend {}

  .recommend-title {
    color: $color-highlight-background;
    margin :10px;
    font-size :14px;
    font-weight :600;
  }

.slider-div{
  
 
}
.slider-a{
  width :100%;
}
.slider-img{
  width :100%;
 
}

</style>
