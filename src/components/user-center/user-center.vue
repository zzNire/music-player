<template>
    <div class="user-center">
        <div class="header">
            <switch-tab :data="switchtabData" @tabChange='tabChange'></switch-tab>
            <i class="icon-down" @click="closeUserCenter"></i>
        </div>
       
        <div class="tab-content">
           <div class="favorite-list" v-if="tab === 0">
                <div class="play-all-buttom" ref="playBtm" @click="playAll">
                    <i class='icon-play'></i><span class='play-btm-title'>播放全部<span class="songs-count">（共{{favoriteList.length}}首）</span></span>
                </div>
               <scroll :data="favoriteList" class="scroll">
                   <song-list :songs="favoriteList" :showNum='false'></song-list>
               </scroll>
           </div>
           <div class="play-history" v-else>
               <div class="play-all-buttom" ref="playBtm" @click="playAll">
                    <i class='icon-play'></i><span class='play-btm-title'>播放全部<span class="songs-count">（共{{playHistorys.length}}首）</span></span>
                </div>
                <scroll :data="playHistory" class="srcoll">
                   <song-list :songs="playHistory" :showNum='false'></song-list>
               </scroll>
           </div>
        </div>
    </div>
</template>


<script>
import SwitchTab from '../../base/switch-tab/switch-tab.vue'
import SongList from '../../base/song-list/song-list.vue'
import Scroll from '../../base/scroll/scroll.vue'
import {mapGetters} from 'vuex'
export default {
    components:{
        SwitchTab,
        SongList,
        Scroll
    },
    data(){
        return {
            switchtabData:[
                "我喜欢的",
                "最近播放",
            ],
            tab:0,

        }
    },
    computed:{
        ...mapGetters([
            'favoriteList',
            'playHistory'
        ])
    },
    methods:{
        tabChange(num){
            this.tab = num;
        },
        closeUserCenter(){
            this.$emit("closeUserCenter");
        }
    }
}
</script>


<style lang="stylus" scoped>
@import '../../commom/stylus/style.css';
@import '../../commom/stylus/variable.styl';

.user-center{
    color:black;
    width:100%;
    position :fixed;
    top:0;
    bottom :45px;
    background-color : rgb(245, 245, 245);
    }

.header{
    position :relative;

}
 .icon-down {
    position: absolute;
    left: 10px;
    top:0px;
    font-size: 30px;
    transform :rotate(90deg);
    color:$color-sub-theme;
  }

  .icon-down:before {
    content: "\e901";
  }

  .play-all-buttom{
     transform :translateX(-15px);
      background :white;
      
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

  .tab-content{
    width:100%;
    padding:0 20px;
    position :fixed;
    bottom:45px;
    top:47px;
    overflow :hidden;
    box-sizing :border-box;
    background:white;
  }

  .play-history, .favorite-list{
      height:100%;
      width :100%;
  }

  .srcoll{
    height:100%;
    width :100%;
  }
</style>
