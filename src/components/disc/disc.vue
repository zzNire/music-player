<template>
    <div class="singer-detial" >
      <music-list 
      :bg-image="bgImage" :songs="discList"
      :title="title"></music-list>
  </div>
</template>


<script>
import MusicList from '../music-list/music-list.vue'
import {mapGetters} from 'vuex'
import {getDisc} from '../../api/disc.js'
import {createSong} from '../../commom/js/song.js'
export default {
    data(){
        return {
            discList:[],
        }
    },
    components:{
        MusicList,
    },
    created(){
        //console.log('disc created');
        this._getDiscList();
    },
    computed:{
        title(){
            return this.disc.songListDesc;
        },
        bgImage(){
            return this.disc.picUrl;
        },
        ...mapGetters([
            'disc',
        ]),
        
    },
    methods:{
        _getDiscList(){
            getDisc(this.disc.id).then((res) => {
          if (res.code === 200) {
            console.log(res.data);
            this.discList = this.normailizeSongs(res.data.tracks);
            this.discList.forEach((item)=>{
                item.album = item.singer +' - '+ item.album;
            })
            console.log( this.discList);
          }
        });
        },
        normailizeSongs(list){
            let newList = [];
            let songItem = {};
            list.forEach((song) => {
                //if(song.songid && song.albumid){
                    newList.push(createSong(song))
                //}
            });
            console.log('歌单详情');
            console.log(newList);
            return newList;
        }
    }
}
</script>


<style lang="stylus" scoped>

</style>
