<template>
  <div class='toplist'>
    <music-list :bg-image="image" :songs="topListDetail" :title="toplist.topTitle"
    :rank="true"></music-list>
  </div>
</template>


<script>
  import MusicList from '../music-list/music-list.vue'
  import {
    mapGetters
  } from 'vuex'
  import {
    getTopListDetail
  } from '../../api/toplist.js'
  import {
    createSong
  } from '../../commom/js/song.js'
  import {
    create
  } from 'domain';
  export default {
    components: {
      MusicList,
    },
    data() {
      return {
        topListDetail: [],
      }
    },
    created() {
     
      this._getToplistDetail();
    },
    computed: {
      ...mapGetters([
        'toplist'
      ]),
      songlist() {

      },
      image(){
          if(this.topListDetail.length !== 0 )
          {
              return this.topListDetail[0].image;
          }
          else{
              return '';
          }
      }
    },
    methods: {
      _getToplistDetail() {
        getTopListDetail(this.toplist.id).then((res) => {
          if (res.code === 0) {
            this.topListDetail = this._normalizeSong(res.songlist);
            this.topListDetail.forEach((item) => {
              item.album = item.singer[0].name + ' - ' + item.album;
              
            })
          }

        });
      },
      _normalizeSong(list) {
        let newList = [];
        list.forEach((item) => {
          if (item.data.albumid && item.data.songid) {
            newList.push(createSong(item.data,item.in_count))
          }
        });
        return newList;
      }
    }
  }

</script>


<style lang="stylus" scoped>
  .toplist {}

</style>
