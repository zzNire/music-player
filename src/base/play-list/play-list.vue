<template>

  <div class='play-list'>
    <div class='playlist-content'>
      <div class="header">
        <div class='header-text' @click="changeMode">
          <i :class="iconMode" class="header-icon"> </i>
          <span class="play-type">{{modeText}}</span>
          <span class="song-num" v-show="mode !== 1">({{seqList.length}})</span>
        </div>

        <div class='header-icon' @click="clearPlayList">
          <i class='icon-trash-2'></i>
        </div>

      </div>
      <scroll class="content" :data="seqList" :scroll-to-right-position="true" ref="scroll" @scrollToRight='scrollToRight'>
        <div>
          <transition-group name="listul" tag='ul'>
            <li v-for="(song,index) in seqList" class="list-li" ref="listLi" :key="song.id">
              <div class='list-text' :class="{'playing' : index === rightIndex}" @click="changeSong(song,index)">
                <i class='icon-readingplan' v-show="index === rightIndex"></i>
                <span class="song-detail">{{song.songname}}
                  <span class="singer-name" v-html="' - '+song.singer[0].name" :class="{'playing' : index === rightIndex}">
                  </span></span>
              </div>

              <div class='list-icon' >
                <i  :class="getFavoriteIcon(song)"
                @click="toggltFavoriteSong(song)"> </i>
                <i class="icon-x" @click="removeSong(song)"></i>
                
              </div>
            </li>
          </transition-group>
          <p class='add-button' @click="showAddSong">+ 添加歌曲到队列</p>
        </div>
      </scroll>
    </div>
    <div class="change-dot">
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <div class="footer" @click='closePlayList'>
      <p class="close-button">关闭</p>
    </div>
    
    
  </div>

</template>


<script>
  import {
    playMode
  } from '../../commom/js/config.js'
  import Scroll from '../../base/scroll/scroll.vue'
  import AddSong from './add-song.vue'
   import Bus from '../../commom/js/bus.js'
   import {playListMixin} from '../../commom/js/mixin.js'
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
  export default {
   mixins:[
     playListMixin,
   ],
    components: {
      Scroll,
      AddSong,
    },
    props: {
      seqList: {
        type: Array,
        default: [],
      },
      mode: {
        type: Number,
        default: 0,
      },
      rightIndex: {
        type: Number,
        default: 0,
      }
    },
    data(){
      return {
         name:'playList',
         ifShowAddSong:false,


      }
    },
    created(){
      Bus.$on('ConfirmPositive', (name) => {
         if(this.name !== name) return;
        this.setShowConfirm(false);
        this.deleteAllPlayList();

      });
      Bus.$on('ConfirmNegative', (name) => {
         if(this.name !== name) return;
        this.setShowConfirm(false);
      })
    },
    computed: {
      iconMode() {
        return this.mode === playMode.swquence ? 'icon-loop' :
          this.mode === playMode.random ? 'icon-random' : 'icon-refresh'
      },
      modeText() {
        return this.mode === playMode.swquence ? '列表循环' :
          this.mode === playMode.random ? '随机播放' : '单曲循环'
      },
      ...mapGetters([
        'playList',
        
      ])
    },
    methods: {
      ...mapMutations({
        setIndex: 'SET_CURRENT_INDEX',
        setPlaying: 'SET_PLAYING',
        setShowConfirm: 'SET_SHOWCONFIRM',
        setConfirmParam: 'SET_SHOWPARAM',
        setSearchMode :'SET_SEARCHMODE',
        setShowContent:'SHOW_CONTENT'
      }),
      ...mapActions([
        'deleteSong',
        'deleteAllPlayList'
      ]),
      closePlayList() {
        this.$emit('closePlayList')
      },
      changeMode() {
        this.$emit('changeMode');
      },
      changeSong(song, index) {
        if (this.mode === playMode.random) {
          index = this.playList.findIndex((song) => {
            return song.id === this.seqList[index].id;
          })
        }
        console.log('index' + index);
        this.setIndex(index);
        this.setPlaying(true);
      },
      removeSong(song) {
        this.deleteSong(song);
      },
      scrollToSong(newIndex) {
        console.log('scroll');
        if (newIndex <= 4) {
          this.$refs.scroll.scrollTo(0, 0, 300);
        } else {
          console.log(this.$refs.listLi);
          this.$refs.scroll.scrollToElement(this.$refs.listLi[newIndex - 4], 300);
        }

      },
      scrollToRight() {
        this.scrollToSong(this.rightIndex);
      },
      clearPlayList() {
        let confirmParam = {
          title: '确认清空全部历史记录',
          positive: '确认',
          negative: '取消',
          componentName: this.name,
        };
        this.setConfirmParam(confirmParam);
        this.setShowConfirm(true);

        
      },
      showAddSong(){
       // this.ifShowAddSong = true;
      //  this.setSearchMode(true);
        // this.setShowContent('add-song');
        this.$emit('showAddSong');
      },
     
    },
    watch: {
      rightIndex(newIndex,oldIndex) {
        console.log(newIndex,oldIndex);
        if(this.seqList[newIndex].id === this.seqList[oldIndex].id) return ;
        this.scrollToSong(newIndex);

      }
    }
  }

</script>


<style lang="stylus" scoped>
  @import '../../commom/stylus/style.css';

  @import '../../commom/stylus/variable.styl';

  .background {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .back {
    width: 100%;
    height: 100%;
  }

  .play-list {
    
    
    width: 100%;
    overflow: hidden;

  }

  .header {
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    align-content: middle;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid rgba(180, 180, 180, 0.3);
  }

  .header-text {
    flex: 1;
  }

  .header-icon {
    flex: 0 0 20px;
    font-size: 20px;
    vertical-align: middle;
  }

  .icon-loop:before {
    content: "\e906";
  }

  .icon-random:before {
    content: "\e90a";

  }

  .icon-refresh:before {
    content: "\e90b";

  }

  .play-type {
    font-size: 15px;
    vertical-align: middle;
  }

  .song-num {
    font-size: 15px;
    vertical-align: middle;
  }

  .icon-trash-2 {
    font-size: 16px;
    color: gray;
  }

  .icon-trash-2:before {
   content: "\e90f";
  }

  .content {
    position: absolute;
    background: rgba(255, 255, 255, 0.95);
    font-size: 15px;
    top: 41px;
    bottom: 46px;
    overflow: hidden;
  }

  .list-li {
    display: flex;
    line-height: 40px;
    align-content: center;
    margin-left: 10px;
    margin-right: 10px;
    border-bottom: 1px solid rgba(180, 180, 180, 0.3);
    height: 42px;
    overflow: hidden;
  }

  .list-text {
    flex: 1;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .singer-name {
    font-size: 12px;
    color: gray;
  }

  .playing {
    color: $color-sub-theme;
  }

  .list-icon {
    text-align: center;
    flex: 0 0 45px;
  }

  .song-detail {
    width: 100%;

  }

  .icon-readingplan:before {
    content: "\e90b";
    font-size: 20px;
    vertical-align: middle;
  }

  .icon-like{
     display :inline-block;
  }
.icon-like:before {
  content: "\e903";
   color: gray;
    font-size: 20px;
    vertical-align: middle;
}

.icon-like-fill{
   display :inline-block;
   
}

.icon-like-fill:before {
  content: "\e904";
    font-size: 20px;
    vertical-align: middle;
    color:$color-sub-theme;
}
.icon-x{
  display :inline-block;
}
  .icon-x:before {
    color: gray;
    content: "\e910";
    font-size: 18px;
    vertical-align: middle;
  }

  .add-button {
    width: 100%;
    text-align: center;
    padding: 15px 0;
    font-size: 13px;
  }

  .footer {
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    position: absolute;
    bottom: 0;
    text-align: center;
    padding: 15px 0;
    border-top: 1px solid rgba(180, 180, 180, 0.3);
    font-size: 15px;
  }

  .listul-enter,
  .listul-leave-to {
    height: 0;
  }

  .listul-enter-active,
  .listul-leave-active {
    transition: all 0.1s linear;
  }


  

  .addsong-enter, .addsong-leave-to{
    transform :translateY(100%);
    }
  .addsong-enter-active , .addsong-leave-active{
    transition :all 0.3s;
    }
</style>
