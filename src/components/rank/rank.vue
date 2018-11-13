<template>
  <div class='rank' v-if="topList">
    <scroll :data="topList" class='top-wrapper'>

      <div class='scroll-content'>
        <div class='rank-flex' v-for="top in topList" @click="selectTopList(top)">
          <div class='rank-img'>
            <img class='rank-icon' v-lazy="top.picUrl">
          </div>
          <div class='rank-info'>
            <div class='rank-songs' v-for="(song,index) in top.songList">
              <p class='rank-txt'>
                <span class='txt-gray'> {{index+1}} </span>
                {{song.songname}}
                <span class='txt-gray'> - {{song.singername}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>


<script>
  import {
    getTopList
  } from '../../api/toplist.js'
  import Scroll from '../../base/scroll/scroll.vue'

  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        topList: [],
      }
    },
    components: {
      Scroll,
      
    },
    created() {
      this._getTopList();
    },
    methods: {
      _getTopList() {
        getTopList().then((res) => {
          //console.log(res);
          if (res.code === 0) {
            this.topList = res.data.topList;
            console.log(this.topList);
          }
        })
      },
      ...mapMutations({
        setContent:'SHOW_CONTENT',
        setTopList:'SET_TOPLIST',
    }),
    selectTopList(top){
        this.setContent('top-list');
        this.setTopList(top);
        this.$router.push(`/rank/${top.id}`)
    }
    },
    
  }

</script>


<style lang="stylus" scoped>
  @import '../../commom/stylus/variable.styl';

  .rank {
    width: 100%;
    height: 100%;
    background-color :rgb(245, 245, 245);
  }

  .top-wrapper {
    height: 100%;
   
  }

  .scroll-content {
     
    padding: 10px;
    box-sizing: border-box;
      }

  .rank-flex {

    margin-bottom: 10px;
    display: flex;
    background-color: white;
    height: 100px;

  }

  .rank-flex:last-child {
    margin-bottom: 0px;
  }

  .rank-img {
    flex: 100px 0 0;
    background-color: $color-sub-theme;
  }

  .rank-icon {
    width: 100px;
    height: 100px;
  }

  .rank-info {
    width :100%;
    flex: 1;
    color: black;
    padding: 11px 0;
    overflow :hidden;  
    
  }

  .rank-songs {
    box-sizing :border-box;
    width :100%;
    padding-left :15px;
    font-size: 14px;
    line-height: 26px;
   
  }

  .rank-txt {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }

  .txt-gray {
    color: gray;
    margin: 0 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis

  }

</style>
