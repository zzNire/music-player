<template>
  <div class="singer-detial" >
      <music-list :songs='songs'
      :bg-image="singer.avatar"
      :title="singer.name"></music-list>
  </div>
</template>


<script>
import MusicList from '../music-list/music-list.vue'
  import {
    mapGetters
  } from 'vuex'
  import {
    getSingerDetial
  } from "../../api/singer.js";
  import {
    createSong
  } from '../../commom/js/song.js'
  export default {
    name:'singer-detial',
    data() {
      return {
        singerDetial: [],
        songs: [],
      }
    },
    components:{
        MusicList,
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      console.log('vuex');
      console.log(this.singer);
      this._getSingerDetial();
      
    },
    methods: {
      _getSingerDetial() {
        if (!this.singer.id) {
          this.$router.push('/singer');
        }
        getSingerDetial(this.singer.id).then((res) => {
          if (res.code === 0) {
            this.singerDetial = res.data.list;
            console.log('detial');
            console.log(this.singerDetial);
            this.songs = this._normailizeSong();
            console.log('normarlized');
            console.log(this.songs);
          }
        });
      },
      _normailizeSong() {
        let ret = [];
        this.singerDetial.forEach((item) => {
            let musicData = item.musicData;
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(item.musicData));
          }
        });
       return ret;
      }
    }
  }

</script>


<style lang="stylus" scoped>
  .singer-detial {
    width :100%;
    height :100%;}

</style>
