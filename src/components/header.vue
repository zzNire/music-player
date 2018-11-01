<template>
  <div class="header">
    <div class="content">
      <transition name="left-max">
        <div class="icon-left" ref="left" v-if="!ismaxSearchBox">
          <i class="icon-playlist"></i>
        </div>
      </transition>
      <div class='middle' @click="maxSearchBox" ref="middle">
        <p class="player-name" v-if="!search">NIREANMUSIC</p>
        <search-box class='search-box' v-else ref="searchBox"></search-box>
      </div>
      <div class="icon" ref="right">
        <transition name='cancle' mode="out-in">
          <i v-if="!ismaxSearchBox" class="icon-search"></i>
          <p class='cancle-max' v-else @click="cancleMaxSearch">取消</p>
        </transition>
      </div>
    </div>
  </div>
</template>


<script>
  import SearchBox from '../base/search-box/search-box.vue'
  import {
    prefixStyle
  } from '../commom/js/dom.js'
  import {
    mapMutations,mapGetters
  } from 'vuex'
  const transition = prefixStyle('transition')
  export default {
    components: {
      SearchBox,
    },
    props: {
      search: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        ismaxSearchBox: false,
      }
    },
    mounted() {
      this.width = window.innerWidth - 46 * 2;
      this.$refs.middle.style.width = this.width + 'px';
    },
    computed:{
        ...mapGetters([
            'searchText'
        ])
    },
    methods: {
      maxSearchBox() {
        console.log('max');
        //this.$refs.left.style.display = 'none';
        //this.$refs.right.style.padding= '0 15px 0 5px';
        //this.width = this.$refs.middle.clientWidth;
        let maxWidth = this.width + 46 - 10;
        this.$refs.middle.style.width = maxWidth + 'px';
        this.$refs.middle.style.transition = 'width 0.4s';
        this.ismaxSearchBox = true;
        // this.$refs.left.style.left='-46px';
        // this.$refs.left.style.transition = 'all 0.4s';
        this.$refs.searchBox.focus();
        this.showSearch(true);
      },
      cancleMaxSearch() {
        // this.$refs.left.style.display = 'block';
        //this.$refs.right.style.padding= 10+'px' ;
        this.$refs.middle.style.width = this.width + 'px';
        this.ismaxSearchBox = false;
        this.showSearch(false);
        //  this.$refs.left.style.left='-46px';
        // this.$refs.left.style.transition = 'all 5s';
      },
      ...mapMutations({
          showSearch:'SET_SHOWSEARCH',
      })
    },
    watch:{
        searchText(text){
            this.$refs.searchBox.setSearchText(text);
        }
    }
  }

</script>


<style lang="stylus" scoped>
  @import '../commom/stylus/variable.styl';

  .header {
    background: $color-sub-theme;
    text-align: center;
    height: 46px;
    padding-top: 5px;
  }

  .content {
    position: relative;
    height: 100%;
  }

  .middle {
    display: inline-block;
    padding: 10px 0;
    width: 100%;
    position: absolute;
    right: 46px;

  }

  .player-name {
    display: inline-block;
    color: $color-text-ll;
    text-align: center;
    padding: 15px;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 2px;
    vertical-align: middle;

  }

  .search-box {

    width: 100%;
    height: 100%;
    border-radius: 30px;


  }

  .icon {
    display: inline-block;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 26px ;
    height: 26px;
    margin: 0 10px;
  }

  .cancle-max {
    font-size: 13px;
    line-height: 26px;
  }

  .cancle-enter,
  .cancle-leave-to {
    transform: translateX(46px);
  }

  .cancle-enter-active,
  .cancle-leave-active {
    transition: all 0.2s;
  }

  .cancle-enter-to,
  .cancle-leave {}



  .icon-search {
    display: inline-block;
    font-size: 26px;

  }

  .icon-search:before {

    content: "\e906"
  }


  .icon-playlist:before {
    content: "\e904"
  }

  .icon-left {
    margin: 0 10px;
    display: inline-block;
    height: 26px;
    width: 26px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

  }

  .left-max-enter,
  .left-max-leave-to {
    left: -46px;
  }

  .left-max-enter-active,
  .left-max-leave-active {
    transition: all 0.4s;
  }

  .left-max-enter-to,
  .left-max-leave {
    left: 0;
  }

  .icon-playlist {
    display: inline-block;
    font-size: 20px;
  }

  .icon-play-mini:before {
    content: "\e903"
  }

</style>
