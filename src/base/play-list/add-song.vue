<template>
  <div class="addsong-content">
    <div class="header-content">
      <p class='title'>添加歌曲到列表</p>
      <p class="close" @click="closeAddSong">关闭</p>
    </div>
    <div class='search-box-content' @click="maxSearch" ref="searchContent">
      <search-box></search-box>
    </div>
    <div class="content">
      <div class="tab">
        <p class="recent-play" :class="{'right-tab':rightTab===0}" 
        @click="chooseRencentPlay">最近播放</p>
       
      </div>
      <div class="result-content">
          <song-list v-if="rightTab===0" :songs="playHistory" :showNum='false'
          @songSelect='songSelect'></song-list>
          
      </div>
    </div>
    <transition name="maxsearch">
    <div class="max-search" v-show="ifMaxSearchBox">
        <my-header ref="myheader" :search-mode="true"
        @closeSearchBox='closeSearchBox' :show-singer="false"
        ></my-header>
    </div>
    </transition>
    <transition name="alert">
    <alert  class="alert-component"  :title="'1首已添加到播放列表'" v-if="showAlert"></alert>
    </transition>
  </div>
</template>


<script>
  import SearchBox from '../search-box/search-box.vue'
  import SearchList from '../search-list/search-list.vue'
  import Search from '../../components/search/search.vue'
  import MyHeader from '../../components/header.vue'
  import SongList from '../../base/song-list/song-list.vue'
  import Alert from '../../base/alert/alert.vue'
  import {prefixStyle} from '../../commom/js/dom.js'
    import Song from '../../commom/js/song.js'
  import {mapGetters, mapActions} from 'vuex'
import { setTimeout } from 'timers';
  const transform = prefixStyle('transform');
  export default {
    components: {
      SearchBox,
      SearchList,
      Search,
      MyHeader,
      SongList,
      Alert
    },
    data() {
      return {
        rightTab: 0,
        ifMaxSearchBox:false,
        showAlert:false,
      }
    },
    created(){

    },
    computed: {
    ...mapGetters([
        'searchHistory',
        'playHistory',
    ]),
    },
    methods: {
        ...mapActions([
            'insertSong'
        ]),
      closeAddSong() {
        this.$emit('closeAddSong');
      },
      maxSearch(){
          this.ifMaxSearchBox = true;
          this.$refs.myheader.maxSearchBox();
          this.$refs.myheader.searchTransition();
          //this.$refs.searchContent.style[transform] = 'translateY(-100%)';
      },
      closeSearchBox(){
          setTimeout(()=>{
              this.ifMaxSearchBox = false;
          },200);
            
      },
      chooseRencentPlay(){
          this.rightTab = 0;
      },
      chooseSearchHistory(){
          this.rightTab = 1;
      },
      songSelect(song,index){
          if(index !== -1){
              this.insertSong(new Song(song));
            this.showAlert = true;
            setTimeout(()=>{
                this.showAlert = false;
            },1000);
          }
      }
    }
  }

</script>


<style lang="stylus" scoped>
  @import '../../commom/stylus/variable.styl';

  .addsong-content {

    background-color: rgb(245, 245, 245);
   
  }

  .header-content {
    background-color: white;
    padding: 20px 0 15px 0;
    position: relative;
    text-align: center;

  }

  .title {
    font-size: 16px;
  }

  .close {
    position: absolute;
    right: 0;
    bottom: 15px;
    font-size: 14px;
    padding: 0 10px;
  }

  .search-box-content {
    background-color: white;
    margin:10px;
  }

  .content {
    background-color: white;
    padding: 10px 0;
    height :100%;
  }

  .tab {

    width: 50%;
    margin: 0 auto;
    display: flex;
    text-align: center;
    font-size: 14px;
    border: 1px solid $color-sub-theme;
    margin-top :5px;
  }

  .recent-play {
    padding: 5px 10px;
    flex: 1;
  }

  .search-history {
    padding: 5px 10px;
    flex: 1;
  }

  .right-tab {
    color: white;
    background-color: $color-sub-theme;
  }
.result-content{
    width:90%;
    margin :0 auto;   
    margin-top:10px;
    }

.max-search{
    width :100%;
    height :100%;
    position :absolute;
    top:0px;
    background :$color-background ;
    }

    .maxsearch-enter, .maxsearch-leave-to{
        opacity :0;
        }

    .maxsearch-enter-active, .maxsearch-leave-active{
        transition :all 0.3;
        }   

.alert-component{
    position :relative;
    z-index :20;
    }
 .alert-enter , .alert-leave-to{
     opacity :0;
     }    
 .alert-enter-active, .alert-leave-active{
     transition :all 0.5s;
     }        
</style>
