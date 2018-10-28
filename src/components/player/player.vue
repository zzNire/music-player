<template>
  <div class="player">
    <transition name='maxplayer' @enter='enter' @after-enter='afterEnter' @leave='leave' @after-leave='afterLeave'>
      <div class='max-player' v-if="fullScreen">
        <div class="bk-image" :style="{
          backgroundImage:`url(${currentSong.image})`,
          }">
          <div class='black'></div>
        </div>
        <div class="header">

          <i class="icon-down" @click="minimizePlayer"></i>
          <p class='header-song-name'>{{currentSong.songname}}</p>
          <p class="header-singer-name">{{currentSong.name}}</p>
        </div>
        <div class="content">
          <div class="image-contain" ref="maxIcon">
            <img class='header-album-icon' :src="currentSong.image" :class="playing?'icon-rotate' : 'icon-rotate icon-rotate-pause'" />
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
            <div class="btn-icon">
              <i class='icon-loop'></i>
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
              <i class='icon-like'></i>
            </div>


          </div>
        </div>

      </div>
    </transition>
    <div class="mini-player">
      <div class='player' v-if='currentSong' @click="maxmizePlayer">
        <div class='song-icon'>
          <img class='icon' :class="playing?'icon-rotate' : 'icon-rotate icon-rotate-pause'" v-show="currentSong" :src="currentSong.image"
            ref="miniIcon" />
        </div>
        <div class='song-item'>
          <p class="song-name">{{currentSong.songname}}</p>
          <p class="singer-name">{{currentSong.name}}</p>
        </div>
        <div class='player-contral'>
          <i :class="playing ? 'icon-pause':'icon-play'" @click.stop="musicPlaying"></i>
          <i class='icon-list'></i>
        </div>
      </div>
      <div class='default' v-else>
        <div class='default-item'>
          <p class='default-title'>让生活充满音乐</p>
        </div>
        <div class='player-contral'>
          <i class="icon-play"></i>
          <i class='icon-list'></i>
        </div>
      </div>
    </div>
    <audio ref="audio" v-if="currentSong" :src="currentSong.url" @canplay="ready" 
    @error="error" 
    @timeupdate='setCurrentTIme'></audio>
  </div>
</template>


<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import animations from 'create-keyframe-animation'
  import {
    prefixStyle
  } from '../../commom/js/dom.js'
  import ProgressBar from '../../base/progress-bar/progress-bar.vue'
  const transform = prefixStyle('transform')
  export default {
    components:{
      ProgressBar,
    },
    data() {
      return {
        songReady: false,
        currentTime: 0,
        songLength:0,
      }
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'currentIndex'
      ]),
      defaultCurrentSong() {

      },
      disableClass() {
        return this.songReady ? '' : 'disable'
      }
    },
    methods: {
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
      }),
      enter(el, done) {
        const {
          x,
          y,
          scale,
          startSize
        } = this._getLocationandScale();
        console.log(x, y, scale);
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
        const y = startTop + 120 - (targetBottom + targetSize / 2);
        const scale = startSize / targetSize;
        return {
          x,
          y,
          scale,
          startSize
        };
      },
      musicPlaying() {
        this.setPlaying(!this.playing);
      },
      preSong() {
        if (!this.songReady)
          return;
        let index = this.currentIndex
        if (index === 0) {
          index = this.playList.length - 1;
          return;
        }
        index--;
        this.setIndex(index);
        if (!this.playing) {
          this.musicPlaying();
        }
        this.songReady = false;
      },
      nextSong() {
        if (!this.songReady)
          return;
        let index = this.currentIndex
        if (index === this.playList.length - 1) {
          index = 0;
          return;
        }
        index++;
        this.setIndex(index);
        if (!this.playing) {
          this.musicPlaying();
        }
        this.songReady = false;
      },
      ready(e) {
        this.songReady = true;
        console.log(this.$refs.audio.duration);
        this.songLength = e.target.duration;
      },
      error() {
        this.songReady = true;
      },
      setCurrentTIme(e) {
        this.currentTime = e.target.currentTime;
        
      },
      changerSongProgress(rightProgress){
        this.currentTime = rightProgress * this.songLength;
        this.$refs.audio.currentTime = this.currentTime;
      }
      
    },
    filters:{
      timeFilter(rightTime){
        rightTime = Math.floor(rightTime);
        let minute = Math.floor(rightTime/60)+'';
        let second = Math.floor(rightTime%60)+'';
        minute = minute.length === 2 ? minute : '0' + minute;
        second = second.length === 2 ? second : "0" + second;
        return minute + ':'+ second;
      }
    },
    watch: {
      currentSong() {
        this.$nextTick(() => {
          this.$refs.audio.play();
        })

      },
      playing(newplaying) {
        this.$nextTick(() => {
          const audio = this.$refs.audio;

          if (newplaying) {
            audio.play();
          } else {
            audio.pause();
          }
        })

      }
    }
  }

</script>


<style lang="stylus" scoped>
  @import '../../commom/stylus/style.css';

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
  }

  .player-contral .icon-play {
    display: inline-block;
    padding: 7px 0;
    padding-right: 7px;
    font-size: 30px;
    color: gray;
  }

  .player-contral .icon-pause {
    display: inline-block;
    padding: 7px 0;
    padding-right: 7px;
    font-size: 30px;
    color: gray;
  }


  .player-contral .icon-list {
    display: inline-block;
    padding-right: 7px;
    padding: 7px 0;
    font-size: 30px;
    color: gray;
    padding-right: 7px;
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
    margin-bottom: 7px;
  }

  .header-singer-name {
    font-size: 12px
  }

  .content {
    position: absolute;
    width: 100%;
    bottom: 120px;
    top: 50px;
  }

  .image-contain {
    position: relative;
    width: 100%;
    height: 0;
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

  .disableClass {
    color: gray;
  }

  .btn-icon .icon-playlist {}

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }

</style>
