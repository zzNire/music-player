<template>
    <div class="user-center">
        <div class="header">
            <switch-tab :data="switchtabData" @tabChange='tabChange'></switch-tab>
            <i class="icon-down" @click="closeUserCenter"></i>
        </div>
       <div class="play-all-buttom" ref="playBtm" @click="playAll">
            <i class='icon-play'></i><span class='play-btm-title'>播放全部<span class="songs-count">（共{{tabData.length}}首）</span></span>
        </div>
        <div class="tab-content" ref="tabContent">
            <div class="no-result" v-if="noResult">
            <P class="no-result-text">{{noResultText}}</P>
            </div>
           <div class="favorite-list" v-else>
                
               <scroll :data="tabData" class="scroll">
                   <song-list :songs="tabData" :showNum='false'
                   @songSelect="selectSong"></song-list>
               </scroll>
                
           </div>
          <!-- <div class="play-history" v-else>
               <div class="play-all-buttom" ref="playBtm" @click="playAll">
                    <i class='icon-play'></i><span class='play-btm-title'>播放全部<span class="songs-count">（共{{playHistorys.length}}首）</span></span>
                </div>
                <scroll :data="playHistory" class="srcoll">
                   <song-list :songs="playHistory" :showNum='false'></song-list>
               </scroll>
           </div> -->
        </div>
        
    </div>
</template>


<script>
import SwitchTab from '../../base/switch-tab/switch-tab.vue'
import SongList from '../../base/song-list/song-list.vue'
import Scroll from '../../base/scroll/scroll.vue'
import {mapGetters,mapMutations,mapActions} from 'vuex'
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
            tabData:[],
        }
    },
    mounted(){
        this.tabData = this.favoriteList;
         let height = window.innerHeight - 86 - 45
        this.$refs.tabContent.style.height = height +"px";
       
    },
    computed:{
        ...mapGetters([
            'favoriteList',
            'playHistory'
        ]),
        noResult(){
            if(this.tab === 0){
                return !this.favoriteList.length;
            }
            else{
                return !this.playHistory.length;
            }
        },
        noResultText(){
             if(this.tab === 0){
                return "没有喜欢的歌曲";
            }
            else{
                return "最近没有收听的歌曲";
            }
        }
    
    },
    methods:{
        ...mapActions([
            'selectPlay',
        ]),
        tabChange(num){
            this.tab = num;
            if(this.tab === 0)
            {this.tabData = this.favoriteList;}
            else
            {
                this.tabData = this.playHistory;
            }
            
        },
        closeUserCenter(){
            this.$emit("closeUserCenter");
        },
        playAll(){
             //console.log(song+ ' '+index);
             this.selectPlay({
                list:this.tabData,
                index:0});
      
        },
        selectSong(song,index){
            console.log(song,index);
            this.selectPlay({
             list:this.tabData,
            index:index});
      
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
     padding-left :5px;
      background :white;
      
      border-radius :10px 10px 0 0; 
      border-bottom  :solid 1px rgba(240,240,240,1);
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
    height :100%;
    overflow :hidden;
    box-sizing :border-box;
    background:white;
  }

.favorite-list{
      height:100%;
      width :100%;
  }

.scroll{
    height :100%;
}

.no-result{
   display :flex;
  
    font-size :15px;
    height :100%;
    width :100%;
  align-items :center;
    
}

.no-result-text{
    width :100%;
  text-align :center;
 
}
</style>
