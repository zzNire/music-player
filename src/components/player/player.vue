<template>
  <div class="player" @touchstart.once = 'touchPlayMusic'>
  
    <transition name='maxplayer'><!-- @enter='enter' @after-enter='afterEnter' @leave='leave' @after-leave='afterLeave'>-->
    
      <div class='max-player' v-show="fullScreen" v-if="currentSong">
        <div class="bk-image" :style="{
          backgroundImage:`url(${currentSong.image})`,
          }">
          <div class='black'></div>
        </div>
        <div class="header">

          <i class="icon-down" @click="minimizePlayer"></i>
          <p class='header-song-name'>{{currentSong.songname}}</p>
          <p class="header-singer-name" v-html="currentSong.name"></p>
        </div>
        <div class="content" 
        @touchstart = 'contentTouchStart'
        @touchmove = 'contentTouchMove'
        @touchend = 'contentTouchEnd'>
        <div class="album" ref="albumContain">
          <div  class="image-contain" ref="maxIcon">
            <img class='header-album-icon' :src="currentSong.image" :class="playing?'icon-rotate' : 'icon-rotate icon-rotate-pause'" />
            
          </div>
          <div class='mini-lyric' >
              <p class='mini-lyric-txt' v-html="defaultLyric"  v-if="currentLyric" ></p>  
               <p class='mini-default-lyrics' v-else>歌词加载中...</p>
           
            </div>
        </div>
          <div class='lyric-component'   ref="lyric" >
            <lyric-component v-if="currentLyric" :lyrics="currentLyric.lines" 
            :current-lyric-line="currentLyricLineNum" ref="lyricCom"
            ></lyric-component>
             <div v-else class='default-wrapper' >
               <p class='default-lyrics'>歌词加载中...</p>
            </div>
          </div>
          <div class='change-dot'>
            <span class='album-dot' :class="{'current-dot': !showLyric }" ></span>
            <span class='lyric-dot' :class="{'current-dot': showLyric }"></span>
          </div>
        </div>
        <div class="control">
          <div class="progress-bar">
            <div class="bar-left">
              <p class='current-time'>
                {{currentTime|timeFilter}}
              </p>
            </div>
            <div class='bar'>
              <progress-bar :progress="currentTime/songLength"
              @changeProgress='changerSongProgress'></progress-bar>
            <div class='btn'>
                
              </div>
            </div>
            <div class='bar-right'>
              <p class='all-time'>
                {{songLength|timeFilter}}
              </p>
            </div>
          </div>
          <div class="contral-btn">
            <div class="btn-icon" @click="changeMode">
              <i :class='iconMode'></i>
            </div>
            <div class="btn-icon" @click="preSong" :class="disableClass">
              <i class='icon-FORWARD-2 icon-pre'></i>
            </div>
            <div class="btn-icon icon-center" @click="musicPlaying" :class="disableClass">
              <i :class="playing ? 'icon-pause':'icon-play'"></i>
            </div>
            <div class="btn-icon" @click="nextSong" :class="disableClass">
              <i class='icon-FORWARD-2'></i>
            </div>
            <div class="btn-icon">
              <i  :class="getFavoriteIcon(currentSong)"
              @click="toggltFavoriteSong(currentSong)"></i>
            </div>


          </div>
        </div>

      </div>
    
    </transition> 
    <div class='footer'>
    <transition name="footer" mode="out-in">
    <div class="mini-player" v-if="!ifShowPlayList" key='mini-player'>
      <div class='player' v-if='currentSong' @click="maxmizePlayer">
        <div class='song-icon'>
          <img class='icon' :class="playing?'icon-rotate' : 'icon-rotate icon-rotate-pause'" v-show="currentSong" :src="currentSong.image"
            ref="miniIcon" />
        </div>
        <div class='song-item'>
          <p class="song-name" v-html="currentSong.songname"></p>
          <p class="singer-name" v-html="currentSong.name"></p>
        </div>
        <div class='player-contral'>
          <progress-circle class='progress-circle' :radius="30" :color="'#D44439'" :process="currentTime/songLength">
           <i :class= "{'icon-play':!playing,'icon-pause':playing,'has-song':currentSong }" @click.stop="musicPlaying"></i>
          </progress-circle>
          <div class='list-div'>
          <i class='icon-list' :class="{'has-song':currentSong}"
          @click.stop='showPlaylist'></i>
          </div>
        </div>
      </div>
      <div class='default' v-else>
        <div class='default-item'>
          <p class='default-title'>让生活充满音乐</p>
        </div>
         <div class='player-contral' >
          <div class='defult-progress-circle' style='position:relative'>
            <i :class= "{'icon-play':!playing,'icon-pause':playing,'has-song':currentSong }"></i>
          </div>
          <div class='list-div'>
          <i class='icon-list'></i>
          </div>
        </div>
      </div>
    </div>
      <play-list class='playlist' v-else key='playlist'
      :seq-list="sequenceList" :mode="mode" :right-index="rightIndex"
      @changeMode = 'changeMode'

      @closePlayList='closePlaylist'
      @showAddSong='showAddSong'></play-list>
  </transition>


    <transition name="addsong">
      <add-song class="add-song" v-if="ifShowAddSong"
      @closeAddSong='closeAddSong'
    ></add-song>
    </transition>

  <transition name='background'>
    <div class="playlist-back" v-show='ifShowBK' ref="playlistBack"
    @click.stop='closePlaylist'></div>
  </transition>

   </div>
    <audio ref="audio"  :src="(currentSong && currentSong.url) || require('../../assets/blank.mp3')"
    @canplay="ready" 
    @error="error" 
    @timeupdate='setCurrentTIme'
    @ended='songEnded'></audio>
  </div>
</template>


<script>
  import {
    mapGetters,
    mapMutations,
    mapActions,
  } from 'vuex'
  import animations from 'create-keyframe-animation'
  import {
    prefixStyle
  } from '../../commom/js/dom.js'
  import Lyric from 'lyric-parser'
  import {playMode} from '../../commom/js/config.js'
  import {shuffle} from '../../commom/js/utils.js'
  import ProgressBar from '../../base/progress-bar/progress-bar.vue'
  import ProgressCircle from '../../base/progress-circle/progress-circle.vue'
  import LyricComponent from '../../base/lyric/lyric.vue'
  import PlayList from '../../base/play-list/play-list.vue'
    import AddSong from '../../base/play-list/add-song.vue'
  import {getLyric} from '../../api/song.js'
  import {playListMixin} from '../../commom/js/mixin.js'
import { setTimeout, setInterval, clearInterval, clearTimeout } from 'timers';
  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')
  export default {
    mixins:[
      playListMixin
    ],
    components:{
      ProgressBar,
      ProgressCircle,
      LyricComponent,
      PlayList,
      AddSong,
    },
    data() {
      return {
        songReady: false,
        currentTime: 0,
        songLength:0,
        currentLyric:null,
        showLyric:false,
        currentLyricLineNum:0,
        rightLyricTxt:'',
        ifShowPlayList:false,
        ifShowBK:false,
        ifShowAddSong:false,
      }
    },
    created(){
      this.touch = {};
      debugger;
      
    },
    mounted(){
      let height = window.innerHeight ;
      console.log(this.$refs.playlistBack);
      this.$refs.playlistBack.style.height = height + 'px';
     // window.addEventListener("touchstart",this.touchPlayMusic,false);
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'currentIndex',
        'mode',
        'sequenceList'
      ]),
      rightIndex(){
        return this.sequenceList.findIndex((song)=>{
          return song.id === this.currentSong.id;
        })
      },
     defaultLyric(){
       if(!this.rightLyricTxt) return '歌词加载中...';
       else return this.rightLyricTxt;
     },
      disableClass() {
        return this.songReady ? '' : 'disable'
      },
      iconMode(){
        return this.mode === playMode.swquence?'icon-loop':
        this.mode === playMode.random?'icon-random':'icon-refresh'
      }
    },

    methods: {
      touchPlayMusic(){
        if(this.currentTime) { return }
       this.$refs.audio.load();
       console.log("touchstart");
        this.$refs.audio.play();
     // window.removeEventListener("touchstart",this.touchPlayMusic,false);

      },
      ...mapActions([
        'storePlayHistory',
      ]),
      minimizePlayer() {
        this.setPlayer(false);
        // console.log(this.$refs.miniIcon);

      },
      maxmizePlayer() {
        this.setPlayer(true);

      },
      ...mapMutations({
        setPlayer: 'SET_FULL_SCREEN',
        setPlaying: 'SET_PLAYING',
        setIndex: 'SET_CURRENT_INDEX',
        setMode:'SET_MODE',
        setPlayList:'SET_PLAY_LIST',
        setSearchMode :'SET_SEARCHMODE',
      }),
     /* playBlank(){
        this.$refs.audio.src = '../../assets/blank.mp3';
        this.$nextTick(()=>{
          var play_promise = this.$refs.audio.play();
        })
        
        

      },*/
      enter(el, done) {
        const {
          x,
          y,
          scale,
          startSize
        } = this._getLocationandScale();
        //console.log(x, y, scale);
        let animation = {
          0: {
            transform: `translate3D(${-x}px,${y}px,0) scale(${1/scale})`
          },
          60: {
            transform: `translate3D(0px,${-startSize/2}px,0) scale(1.1)`
          },
          100: {
            transform: `translate3D(0px,${-startSize/2}px,0) scale(1)`
          }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 600,
            easing: 'linear',
          }
        });
        animations.runAnimation(this.$refs.maxIcon, 'move', done);

      },
      afterEnter(el) {
        animations.unregisterAnimation('move');
        this.$refs.maxIcon.style.animation = '';
      },
      leave(el, done) {
        this.$refs.maxIcon.style.transition = 'all 0.5s ease-out ';
        const {
          x,
          y,
          scale,
          startSize
        } = this._getLocationandScale();
        this.$refs.maxIcon.style[transform] = `translate3D(${-x}px,${y}px,0) scale(${1/scale})`;
        this.$refs.maxIcon.addEventListener('transitionend', done);
      },
      afterLeave(el) {
        if (this.$refs.maxIcon) {
          this.$refs.maxIcon.style.transition = '';
          this.$refs.maxIcon.style.transform = '';
        }

      },
      _getLocationandScale() {
        const targetBottom = 5;
        const targetSize = 35;
        const targetLeft = 13;
        const startTop = (window.innerHeight - 120 - 50) * 0.5;
        const startSize = window.innerWidth * 0.7;
        const x = window.innerWidth * 0.5 - (targetLeft + targetSize / 2);
        const y = startTop  + 120 - (targetBottom + targetSize / 2);
        const scale = startSize / targetSize;
        return {
          x,
          y,
          scale,
          startSize
        };
      },
      musicPlaying() {
        debugger;
        this.setPlaying(!this.playing);
        
      },
      preSong() {
         if (!this.songReady)
          return;
         if(this.playList.length === 1){
          this.loop();    
          return;
        }

        let index = this.currentIndex;
        if (index === 0) {
          index = this.playList.length - 1;
        }
       
        else index--;
        
        this.setIndex(index);
        if (!this.playing) {
          this.musicPlaying();
        }
        this.songReady = false;
      },
      nextSong() {
         if (!this.songReady)
          return;
        if(this.playList.length === 1){
          this.loop();
          return;
        }
        let index = this.currentIndex;
        if (index === this.playList.length - 1) {
          index = 0;
         
        }else{
          index++;
        }
        
        this.setIndex(index);
        if (!this.playing) {
          this.musicPlaying();
        }
        this.songReady = false;
      },
      ready(e) {
        if(currentSong){
          this.storePlayHistory(this.currentSong);
          this.songReady = true;
          console.log(this.$refs.audio.duration);
          this.songLength = e.target.duration;
        }
      },
      error() {
        this.songReady = true;
      },
      setCurrentTIme:(function(){
        var timer;
        return function (e) {
          if(timer){
            return ;
          }
          timer = setTimeout(()=>{
            this.currentTime = e.target.currentTime;
            clearTimeout(timer);
            timer = null;
          },1000)
        }
      })() ,
      changerSongProgress(rightProgress){
        this.currentTime = rightProgress * this.songLength;
        this.$refs.audio.currentTime = this.currentTime;
      //  this.playing = true;
        this.setPlaying(true);
       // this.$refs.audio.play();
        if(this.currentLyric){
          //this.currentLyric.togglePlay();
          this.currentLyric.seek(this.currentTime*1000);
          
        }
      },
       songEnded(){
        //this.setPlaying(false);
        if(this.mode === playMode.loop){
          this.loop();
        }else{
          this.nextSong();
        }
      },
      loop(){
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
        if(this.currentLyric)
        {
         this.currentLyric.seek(0);
        }
      },
      changeMode(){
        let rightMode = (this.mode+1)%3;
        console.log(rightMode);
        this.setMode(rightMode);
        let list = null;
      
        if(rightMode === playMode.random){
          list = shuffle(this.sequenceList);
         
        }else{
          list = this.sequenceList;
        }
        this.resetCunnrentIndex(list);
        this.setPlayList(list);

      },
      resetCunnrentIndex(list){
        let index = list.findIndex((item)=>{
          return item.id === this.currentSong.id;
        })
        this.setIndex(index);
      },
      getLyric(){
        console.log(this.currentSong);
        console.log(this.currentSong.getMyLyric);
       
        this.currentSong.getMyLyric().then((res)=>{
          //console.log(res);
           if(this.currentSong.lyric !== res) return ;
          this.currentLyricLineNum = 0;
          
          this.currentLyric = new Lyric(res,this.handleLyric);
          //console.log(this.currentLyric);
          if(this.playing){
            this.currentLyric.play();
          }
        }).catch(()=>{
          this.currentLyric = null;
          this.rightLyricTxt = '';
          this.currentLyricLineNum = 0;
        })
      },
      handleLyric({lineNum,txt}){
        console.log(lineNum);
        this.currentLyricLineNum = lineNum;
        this.rightLyricTxt = txt;
      },
      contentTouchStart(e){
        //this.$refs.lyricComponent.lyricScroll.
        this.touch.initialed = true;
        let touch = e.touches[0];
        this.touch.startX = touch.pageX;
        this.touch.startY = touch.pageY;
       // console.log(this.$refs.lyricCom);
       
        //this.touch.Xdirection = true; //true代表水平滑动
        this.touch.Ydirection = false;
        this.touch.count = 0;
      },
      contentTouchMove(e){
       
        if(!this.touch.initialed) return ;
        let touch = e.touches[0];
        let deltaX = touch.pageX - this.touch.startX;
        let deltaY = touch.pageY - this.touch.startY;
        if(Math.abs(deltaY) >Math.abs(deltaX)&&this.touch.count === 0){
            //垂直滑动
         this.touch.Ydirection = true;
        }else{
           this.$refs.lyricCom.disable();
           this.Ydirection = false;
        }

        if(this.touch.Ydirection) return;
        
        const left = this.showLyric===false?0:-window.innerWidth;
        const width =Math.min(0, Math.max(-window.innerWidth,left+deltaX));
        //console.log( this.$refs.lyric);
        this.touch.percent = Math.abs(width/window.innerWidth);
        this.$refs.lyric.style[transform] = `translate3D(${width}px,0px,0)`;
        this.$refs.lyric.style[transitionDuration] = '0s';
        this.$refs.albumContain.style.opacity = 1-this.touch.percent;
        this.$refs.albumContain.style[transitionDuration] = '0s';

      },
      contentTouchEnd(e){ 
        this.touch.Ydirection = false;
        this.$refs.lyricCom.enable();
        //console.log('enable');
        let width;
        if(!this.touch.percent) return ;
        if(this.showLyric === false){
          if(this.touch.percent > 0.1){
            width = -window.innerWidth;
            this.showLyric = true;
          }else{
            width = 0;
          }
        }else{
          if(this.touch.percent < 0.9){
            width = 0;
            this.showLyric = false;
          }else{
            width = -window.innerWidth;
          }
        }
        if(width === 0) {
           this.$refs.albumContain.style.opacity = 1;
        }
        else{
           this.$refs.albumContain.style.opacity = 0;
        }
        this.$refs.lyric.style[transform] = `translate3D(${width}px,0px,0)`;
        this.$refs.lyric.style[transitionDuration] = '0.3s';
        this.$refs.albumContain.style[transitionDuration] = '0.3s';
        this.touch.percent = null;
       
      },
      showPlaylist(){
       this.ifShowPlayList = true;
       setTimeout(()=>{
         this.ifShowBK = true;
       },300);
      },
      closePlaylist(){
        this.ifShowPlayList = false;
        this.ifShowBK = false;
      },

      closeAddSong(){
        this.ifShowAddSong = false;
        this.setSearchMode(false);
        // this.showContent('');
      },

      showAddSong(){
        this.ifShowAddSong = true;
        this.setSearchMode(true);
        // this.setShowContent('add-song');
      },
      
    
    },
    filters:{
      timeFilter(rightTime){
        rightTime = Math.floor(rightTime);
        let minute = Math.floor(rightTime/60)+'';
        let second = Math.floor(rightTime%60)+'';
        minute = minute.length === 2 ? minute : '0' + minute;
        second = second.length === 2 ? second : "0" + second;
        return minute + ':'+ second;
      },
     
    },
    watch: {
      currentSong(newSong,oldSong) {            
        debugger;
        if(!newSong){
          this.ifShowPlayList = false;
          this.ifShowBK = false;
          this.currentLyric.stop();
          this.currentLyric = null;
          return ;
        }
        if(oldSong)
        {
         
          if(newSong.id === oldSong.id) return;
        }
       if(this.currentLyric) {
            this.currentLyric.stop();
            this.currentLyric = null;
        }
        //if(this.timer) clearTimeout(this.timer);
        //this.timer = setTimeout(() => {
          this.$nextTick(()=>{

           // this.$refs.audio.src = newSong.url;
            //this.$refs.audio.load();
            this.$refs.audio.play();
            this.getLyric();
          })
        
       // },1000);

      },
      playing(newplaying) {
        debugger;
        this.$nextTick(() => {
          const audio = this.$refs.audio;
          if(!audio) return ;
          if (newplaying) { 
            if(this.t) clearInterval(this.t);
            audio.play();
            if(this.currentLyric)
            {
              this.currentLyric.togglePlay();
            }
            let v = 0;
            this.t = setInterval(()=>{
              v+=0.1;
              if(v<=1) audio.volume = v;
              else{
                clearInterval(this.t);
              }
            },100)
            
          } else {
            if(this.t) clearInterval(this.t);
            let v= audio.volume;
            console.log('volume'+v);
            this.t = setInterval(()=>{
              v-=0.1;
              if(v>=0){
                audio.volume = v;
              }else{
                audio.pause();
                if(this.currentLyric)
                {
                   this.currentLyric.togglePlay();
                }
                clearInterval(this.t);
              }
            },100)
            
          }
        })

      },
      
    }
  }

</script>


<style lang="stylus" scoped>
  @import '../../commom/stylus/style.css';
@import '../../commom/stylus/variable.styl';
  .player {
    width: 100%;
    height: 100%;
    color: black;
  }

  .max-player {
    position: fixed;
    width: 100%;
    top: 0px;
    bottom: 0px;
    height: 100%;
    background: white;
    color: white;
    overflow: hidden;
    z-index: 20;
  }

  .maxplayer-enter,
  .maxplayer-leave-to {

    top: 100%;
  }

  .maxplayer-enter-active,
  .maxplayer-leave-active {
    transition: all 0.5s;

  }

  .mini-player {
    width: 100%;
    position: fixed;
    bottom: 0px;
    height: 45px;
    background: white;
    color: black;
    z-index: 10;
    
  }

  .player {
    display: flex;
  }

  .song-icon {
    flex: 53px 0 0;

  }


  .icon {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 5px 5px 5px 13px;
  }

  .icon-rotate {
    animation: rotate 20s linear infinite;
  }

  .icon-rotate-pause {
    animation-play-state: paused;
  }

  .song-item {
    padding: 8px;
    font-size: 13px;
    flex: 1;
    vertical-align: middle;
    overflow: hidden;

  }

  .song-name {
    margin-bottom: 3px;
    overflow: hidden;
    white-space: nowrap;


  }

  .singer-name {
    color: gray;
    overflow: hidden;
    white-space: nowrap;

  }

  .player-contral {
    flex: 90px 0 0;
    text-align: right;
    height:45px;
  }
.defult-progress-circle{

  padding:7px 0;
    padding-right: 7px;
    height:30px;
    display:inline-block;
    width:30px;
    margin-right :38px;
  }
.progress-circle{

    padding:7px 0;
    padding-right: 7px;
    height:30px;
    display:inline-block;
    margin-right :38px;
}
  .player-contral .icon-play {
    width:30px;
    height:30px;
    display: inline-block;
   
    font-size: 30px;
    color: gray;
    position: absolute;
    top: 7px;
    left: 0;
  }

  .player-contral .icon-pause {

    width:30px;
    height:30px;
    display: inline-block;
    font-size: 30px;
    color: gray;
    position: absolute;
    top: 7px;
    left: 0;
  }


.list-div{
  position :absolute;
  top:0;
  right:0;
    display:inline-block;
   padding:7px 0;
    padding-right: 7px;
    height:30px;
}
  .player-contral .icon-list {
    display: inline-block;
   
    font-size: 30px;
    color: gray;
    
  }

  .icon-list:before {
    content: "\e905";
  }

  .default {
    display: flex;

  }

  .default-item {

    flex: 1;
  }

  .default-title {
    margin-left: 15px;
    font-size: 13px;
    line-height: 45px;
    color: gray;
  }

  .bk-image {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
    background-position-y: center;
    filter: blur(10px);
    transform: scale(1.1);
    overflow: hidden;
  }

  .black {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .header {
    position: relative;
    text-align: center;
    padding: 10px 0 5px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .icon-down {
    position: absolute;
    left: 10px;
    font-size: 30px;

  }

  .icon-down:before {
    content: "\e901";
  }


  .header-song-name {
    font-size: 15px;
    line-height:20px;
    margin:0 40px;
    margin-bottom: 7px;
   white-space :nowrap;
   overflow:hidden;
   text-overflow:ellipsis

    
  }

  .header-singer-name {
    font-size: 12px
  }

  .content {
    position: absolute;
    width: 100%;
    bottom: 120px;
    top: 50px;
    white-space :nowrap;
    
  }

  .album{
    width:100%;
    height:100%;
    display :inline-block;
    vertical-align :top;
    position :relative;
   
  }
  .lyric-component{
    height:100%;
    width:100%;
    text-align :center;
    box-sizing :border-box;
    padding:20px 30px;
    font-size:14px;
    line-height :30px;
    font-weight:lighter;
    color:rgba(200,200,200,0.7);
    display :inline-block;
   
    }
   .change-dot{
     width:100%;
     text-align:center;
     position:absolute;
     bottom:0px;

   }
   .album-dot{
     display:inline-block;
     width:7px;
     height:7px;
     background-color :rgba(200,200,200,0.7);
     border-radius :50%;
     margin-right :5px;

   }
   .lyric-dot{
     display:inline-block;
     width:7px;
     height:7px;
     background-color :rgba(200,200,200,0.7);
     border-radius :50%;
   }
   .current-dot{
      background-color:white;
   }
  .image-contain {
   
    position: relative;
    width: 100%;
    height: 0;
    vertical-align: top;
    padding-top: 70%;
    top: 50%;
    transform: translateY(-50%);
  }

  .header-album-icon {
    position: absolute;
    top: 0;
    left: 15%;
    width: 70%;
    height: 100%;
    border-radius: 50%;
    border: 6px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
  }

.default-wrapper{
      position :relative;
      top:50%;
      transform :translateY(-50%);
  }
  .default-lyrics{
      width:100%;
      text-align :center;
     
  }
.mini-lyric{
  position :absolute;
  width:100%;
  bottom:5%;
 
}
  .mini-lyric-txt{
  
    margin:0 20px;
    text-align :center;
    font-size :15px;
   overflow :hidden;
   line-height :16px;
  }
  .mini-default-lyrics{
    margin:0 20px;
    text-align :center;
    font-size :15px;
   overflow :hidden;
   line-height :16px;
     
  }
  .control {
    width: 100%;
    position: absolute;
    bottom: 0;
    margin: 10px 0;

  }

  .progress-bar {
    display: flex;
    width: 100%;
    text-align :center;
   
    box-sizing :border-box;
    font-size:12px;
    color: rgba(170, 170, 170, 0.9);
  }

  .bar-left {
    flex: 45px 0 0;
    padding :10px 5px;
    color: rgba(221, 221, 221, 0.9);
  }

  .bar {
    flex: 1;
    width:100%;
    height:2px;
    padding:0;
  }

  .bar-right {
    flex: 45px 0 0;
    padding :10px 5px;
    color: rgba(221, 221, 221, 0.5);
  }

  .contral-btn {
    display: flex;
    color: rgba(221, 221, 221, 0.9);
    text-align: center;
    font-size: 30px;
    margin-bottom:15px;
    margin-top:3px;
  }

  .btn-icon {
    flex: 1;
    vertical-align: middle;
    height: 40px;
  }

  .icon-loop:before {
    width: 30px;
    length: 30px;
    padding: 10px 0;
    display: inline-block;
    content: "\e906";
    color: rgba(221, 221, 221, 0.5);
  }

.icon-random:before {
  content: "\e90a";
  width: 30px;
    length: 30px;
    padding: 10px 0;
    display: inline-block;
   
    color: rgba(221, 221, 221, 0.5);
}
.icon-refresh:before {
  content: "\e90b";
  width: 30px;
    length: 30px;
    padding: 10px 0;
    display: inline-block;
    color: rgba(221, 221, 221, 0.5);
}

.icon-center{
  flex:1.4;
}
  .icon-play {
    font-size: 50px;
  }

  .icon-pause {
    font-size: 50px;
  }

  .icon-pause:before {
    content: "\e907";
  }

  .icon-play:before {

    content: "\e908";


  }

  .icon-FORWARD-2:before {
    width: 30px;
    length: 30px;
    padding: 10px 0;
    display: inline-block;
    content: "\e902";


  }

  .icon-pre {
    display: inline-block;
    transform: rotate(180deg);

  }

  .icon-like:before {
    width: 30px;
    length: 30px;
    padding: 10px 0;
    display: inline-block;
    content: "\e903";
     color: rgba(221, 221, 221, 0.5);
  }

  .icon-like-fill:before{
     width: 30px;
    length: 30px;
    padding: 10px 0;
    display: inline-block;
    content: "\e904";
    color:$color-sub-theme;
    }

  .disableClass {
    color: gray;
  }
    .player-contral .has-song{
  color:$color-sub-theme;
}

.playlist{
  position:fixed;
  top:30%;
  bottom:0;

}

  .footer-enter,
  .footer-leave-to {
    transform: translateY(100%);
  }

  .footer-enter-active,
  .footer-leave-active {
    transition: all 0.3s;
  }

.footer{
  height:100%;
  width:100%
  }

.playlist-back{
  width:100%;
  background-color: rgba(0, 0, 0, 0.3);
}

  .background-enter,
  .background-leave-to {
    
    opacity:0;
  }

  .background-enter-active,
  .background-leave-active {
   
  }
  
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .add-song{
    width :100%;
    position :fixed;
    top:0;
    bottom :0;
  }

      .addsong-enter, .addsong-leave-to{
    transform :translateY(100%);
    }
  .addsong-enter-active , .addsong-leave-active{
    transition :all 0.3s;
    }

</style>
