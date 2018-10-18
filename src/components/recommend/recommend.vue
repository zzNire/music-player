<template>
  <div class="recommend">
    <div class="swiper-contianer">

    </div>
    <div class="recommend-song">
      <p class="recommend-title">推荐歌曲></p>
    </div>
  </div>

</template>


<script>
const ERR_OK = 0;
import {getRecommend} from '../../api/recommend.js'
  export default {
      created(){
        this._getRecommend();
      },
      methods:{
          _getRecommend(){
              getRecommend().then((res)=>{
                  if(res.code === ERR_OK)
                  {
                    console.log(res.data);
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



</style>
