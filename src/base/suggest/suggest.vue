<template>
    <div class='suggest' >
        <scroll :data="searchResult" class='scroll' :pullup="true" :before-scroll="true"
        @scrollToEnd='searchMore' 
        @beforeScroll='listScroll' ref="scroll" >
        <ul>
            <li v-for="(result,index) in searchResult">
                <div class='singer' v-if="result.type === 'singer'" @click="clickSinger(result)">
                    <img class='singer-icon' :src='result.avatar'/>
                    <div class='singer-text'>
                    <p class='singer-name' v-html="result.name"></p>
                    <p class='singer-detail' >单曲{{result.songnum}} 专辑{{result.albumnum}}</p>
                    </div>
                </div>
                <div class='song' v-else @click="clickSong(result,index)">
                    <p class='song-name' v-html="result.songname"></p>
                    <p class='song-detail' v-html="result.singer[0].name + ' - ' +result.album"></p>
                </div>
            </li>
            <loading class='loading' v-show="hasMore"></loading>
        </ul>
        <div v-show="!hasMore && searchResult.length === 0" class='no-result'>
            <p class='no-result-text'>无结果</p>
        </div>
        </scroll> 
        <transition name="alert">
    <alert  class="alert-component"  :title="'1首已添加到播放列表'" v-if="showAlert"></alert>
    </transition>
    </div>
   
</template>


<script>
import {mapGetters, mapMutations,mapActions} from 'vuex'
import Scroll from '../../base/scroll/scroll.vue'
import Loading from '../../base/loading/loading.vue'
import Alert from '../../base/alert/alert.vue'
import Bus from '../../commom/js/bus.js'
const TYPE_SINGER = 'singer';
const TYPE_SONG = 'song'
export default {
    components:{
        Scroll,
        Loading,
        Alert
       
    },
    props:{
        showSinger:{
            type:Boolean,
            default:true,
        },
        searchResult:{
            type:Array,
            default:[],
        },
      searchMode: {
        type: Boolean,
        default: false,
      },
        
    },
    data(){
        return {
        showAlert:false,
        }
    },
    computed:{
        ...mapGetters([
            'searchP',
            'hasMore'
        ])
    },
    methods:{
        ...mapMutations({
            setP:'SET_P',
            setShowContent:'SHOW_CONTENT',
            setSinger:'SET_SINGER',
            setListScroll:'SET_LISTSCROLL',
        }),
        ...mapActions([
        'insertSong',
        
      ]),
        searchMore(){
            if(!this.hasMore) return ;
            let p = this.searchP;
            p++;
            this.setP(p);
        },
        scrollToTop(){
            this.$refs.scroll.scrollTo(0,0);
        },
        clickSinger(result){
            this.setShowContent('singer-detial');
            this.setSinger(result);
        },
        clickSong(song,index){
            this.insertSong(song);
            if(this.searchMode){
                this.showAlert = true;
                setTimeout(()=>{
                this.showAlert = false;
            },1000);
            }
           
            
        },
        listScroll(){
            Bus.$emit('unfocus');
            
           //this.setListScroll(false);
        }
    },
    watch:{
        
    }
    
}
</script>

<style lang="stylus" scoped>

.suggest{
    width :100%;
    height:100%;
    color:black;
}
.scroll{
    width:100%;
    height :100%;
    overflow :hidden;
}

.singer{
    font-size :14px;
    padding:5px 0;
    margin :0 10px;
    border-bottom :1px solid rgba(240,240,240,1); 
    position :relative;
    height :46px;
}
.singer-icon{
   width :45px;
   height :45px;
   position :absolute;
   left :0px;
   border-radius :50%;
}
.singer-text{
    margin-left :45px;
    padding-left :10px;
   position :relative;
   top:50%;
   transform :translateY(-50%);
    
}
.singer-name{
    font-size :16px;
    margin-bottom :5px;
}
.singer-detail{
     color :gray;
}
.song{
    font-size :14px;
    padding :10px 0;
    margin :0 10px;
    border-bottom :1px solid rgba(240,240,240,1); 
}

.song-name{
    font-size :16px;
    margin-bottom :5px;
}
.song-detail{
    color :gray;
}

.loading{
    margin-top:10px;
}

.no-result{
    width :100%;
    text-align :center;
    color:gray;
  
    margin-top:50px;
}

 .alert-enter , .alert-leave-to{
     opacity :0;
     }    
 .alert-enter-active, .alert-leave-active{
     transition :all 0.5s;
     }  
</style>
