<template>
  <div class="header">
  
      <div class="content" ref="headerContent" :class="{'add-content':searchMode}">
        <transition name="left-max">
          <div class="icon-left" ref="left" v-if="!ismaxSearchBox&&!searchMode"
          @click="showUserCenter">
            <i class="icon-playlist"></i>
          </div>
        </transition>
        <div class='middle' @click="maxSearchBox" ref="middle">
          <p class="player-name" v-if="!search">NIREANMUSIC</p>
          <search-box class='search-box' :color="'white'" v-else ref="searchBox" 
          @searchText='searchTextChangeBox'
          @searchboxClear='clearSearchBox'
          @clearResult="clearResult"></search-box>
        </div>
        <div class="icon" ref="right">
          <transition name='cancle' mode="out-in">
            <i v-if="!ismaxSearchBox&&!searchMode" class="icon-search"></i>
            <p class='cancle-max' v-else @click="cancleMaxSearch">取消</p>
          </transition>
        </div>
      </div>
    
    <transition :name='transitionName'>
      <search class='search-result' :class="{'search-result-addsong':searchMode}" 
      :searchMode='searchMode'
      v-if='showSearch'
      :search-result="searchResult"
      :searchText="searchText"
      :show-search-commond="showSearchCommond"
      @setSearchText = 'searchTextChange'
      @startSearch="startSearch"></search>
    </transition>

    <transition name="user-center">
      <user-center v-if="userCenter" class="user-center-component" @closeUserCenter='closeUserCenter'></user-center>
    </transition>
  </div>
</template>


<script>
  import SearchBox from '../base/search-box/search-box.vue'
  import UserCenter from '../components/user-center/user-center.vue'
  import {
    search
  } from '../api/search.js'
  import Singer from '../commom/js/singer.js'
  import {
    createSong
  } from '../commom/js/song.js'
  import Search from './search/search.vue'
  import {
    prefixStyle
  } from '../commom/js/dom.js'
  import {
    mapMutations,
    mapGetters,
    mapActions
  } from 'vuex'

  import Bus from '../commom/js/bus.js'

  const transition = prefixStyle('transition')
  const transform = prefixStyle('transform')
  export default {
    components: {
      SearchBox,
      Search,
      UserCenter,

    },
    props: {
      searchMode: {
        type: Boolean,
        default: false,
      },
      showSinger:{
        type:Boolean,
        default:true,
      }
    },
    data() {
      return {
        ismaxSearchBox: false,
      //  showSinger: true,
        perpage: 20,
        hasMore: true,
        showSearch: false,
        searchResult:[],
        searchText:'',
        userCenter:false,
        showSearchCommond:true,
      }
    },
    created() {
      Bus.$on('unfocus', () => {
        if (this.$refs.searchBox)
          this.$refs.searchBox.unfocus();

      });

    },
    mounted() {
      if(this.searchMode) {
        this.width = window.innerWidth - 46 - 10;
        this.$refs.middle.style.width = this.width + 'px';
      }else{
        this.width = window.innerWidth - 46 * 2;
        this.$refs.middle.style.width = this.width + 'px';
      }
      


    },

    computed: {
      ...mapGetters([
        //'searchText',
        'searchP',
        'listScroll',

      ]),
      transitionName() {
        return this.searchMode ? 'header' : 'searchbox';
      }
    },
    methods: {
      maxSearchBox() {
        if(this.searchMode) {
        
        }
        else{
           console.log('max');
        //this.$refs.left.style.display = 'none';
        //this.$refs.right.style.padding= '0 15px 0 5px';
        //this.width = this.$refs.middle.clientWidth;
        let maxWidth = this.width + 46 - 10;
        this.$refs.middle.style.width = maxWidth + 'px';
        this.$refs.middle.style.transition = 'width 0.4s';
       
        // this.$refs.left.style.left='-46px';
        // this.$refs.left.style.transition = 'all 0.4s';
      
        }  
        this.showSearch = true;
        this.ismaxSearchBox = true;
        this.$refs.searchBox.focus();
      },
    
      cancleMaxSearch() {
        // this.$refs.left.style.display = 'block';
        //this.$refs.right.style.padding= 10+'px' ;
        this.$refs.middle.style.width = this.width + 'px';
        this.ismaxSearchBox = false;
        this.showSearch = false;
        this.$refs.searchBox.clearText();
        this.searchText = '';
        this.$emit('closeSearchBox');
         if (this.searchMode) {
          console.log(this.$refs.headerContent);
          
          this.$refs.headerContent.style[transform] = 'translateY(0)';
        }
        //  this.$refs.left.style.left='-46px';
        // this.$refs.left.style.transition = 'all 5s';
      },
      clearSearchBox(){
        this.searchText = '';
        this.searchResult = [];
      },
      startSearch(){  //开始搜索
       
        if (this.searchText) {
          console.log("watch searchtext"); 
          this.saveSearch(this.searchText);
          this.setP(1); //初始化当前页 
          this.search();
         

        }
       // if (!text) this.setSearchResult([]);

        //this.$refs.searchBox.setSearchText(text);
      },
     
    
      ...mapMutations({

       // setSearchText: 'SET_SEARCHTEXT',
      //  setSearchResult: 'SET_SEARCHRESULT',
        setPerpage: 'SET_PERPAGE',
        setP: 'SET_P',
        setHasMore: 'SET_HASMORE',
        setListScroll: 'SET_LISTSCROLL',
      }),
      ...mapActions([
        'saveSearchHistory'
      ]),
      searchTextChangeBox(text){
      if (text === this.searchText) return;
        console.log('change');
        this.searchText = text;
        this.showSearchCommond = true;
       // this.searchText = "";
       // this.$refs.searchBox.setSearchBox(text);
      },
      searchTextChange(text) {
        if (text === this.searchText) return;
        this.showSearchCommond = false;
        console.log('change');
        this.searchText = text;
        this.startSearch();
       // this.searchText = "";
        this.$refs.searchBox.setSearchBox(text);

      },
      clearResult(){
        this.searchResult = [];
        this.showSearchCommond = true;
      },
      search() {
        console.log("start search");
        this.setPerpage(this.perpage);
        search(this.searchText, this.searchP, this.showSinger, this.perpage).then((res) => {
          console.log(res);
          if (res.code === 0) {
            this.hasMore = true;
            this.checkMore(res.data.song);
            this.setHasMore(this.hasMore);
            this.searchResult = this.resultFilter(res.data)
            console.log(this.searchResult);
          //  this.setSearchResult(this.searchResult);
          }
        });
      },
      resultFilter(data) {
        let result = [];
        if (data.zhida && data.zhida.singerid ) {
          console.log('show singer');
          // let singer = data.zhida;
          let rightSinger = new Singer(data.zhida.singermid, data.zhida.singername);
          /* data.zhida.type = 'singer';
           console.log(data.zhida.type);
           
           console.log(result[0].type);*/
          rightSinger.type = 'singer';
          rightSinger.songnum = data.zhida.songnum;
          rightSinger.albumnum = data.zhida.albumnum;
          result.push(rightSinger);
        }
        if (data.song) {
          data.song.list.forEach(element => {
            let song = createSong(element);
            result.push(song);
          });
          // result = result.concat(data.song.list);
        }
        console.log(result);
        return result;
      },
      checkMore(data) { //下拉是否可以再请求数据
        if (data.list.length === 0 || (data.curpage * this.perpage) > data.totalnum || data.totalnum < this.perpage) {
          this.hasMore = false;
        }
      },
      saveSearch(text) { //保存搜索历史
      console.log(text);
        this.saveSearchHistory(text);
      },
      searchTransition() {
        if (this.searchMode) {
          this.$nextTick(()=>{
          console.log(this.$refs.headerContent);
          this.$refs.headerContent.style[transition] = 'all 0.4s';
          this.$refs.headerContent.style[transform] = 'translateY(51px)';
          })
         
        }
      },
      showUserCenter(){
        this.userCenter = true;
      },
      closeUserCenter(){
        this.userCenter = false;
      }

    },
    watch: {
      searchText(){
        this.setP(1);
      },
      searchP(newP, oldP) {
        if (newP === 1) return;
        this.search();
      },

    }
  }

</script>


<style lang="stylus" scoped>
  @import '../commom/stylus/variable.styl';

  .header {
    height: 51px;
  }

  .content {

    background: $color-sub-theme;
    position: relative;
    height: 100%;
  }

  .middle {
    display: inline-block;
    padding: 13px 0;
    width: 100%;
    position: absolute;
    right: 46px;
    background-color: $color-sub-theme;
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
    width: 26px;
    height: 26px;
    margin: 0 10px;
  }

  .cancle-max {
    font-size: 13px;
    line-height: 26px;
    color: white;
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
    
     text-align:center;
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
   vertical-align :middle;
    position :relative;
    
    display: inline-block;
    font-size: 20px;
  }

  .icon-play-mini:before {
    content: "\e903"
  }

  .search-result {

    text-align: left;
    width: 100%;
    position: fixed;
    top: 51px;
    bottom: 45px;
    z-index: 20;
    background-color: $color-background;
  }

  .header-enter,
  .header-leave-to {
    opacity :0;
  }

  .header-enter-active,
  .header-leave-active {
    transition: all 0.3s;
  }

  .searchbox-enter,
  .searchbox-leave-to {
    transform: translateY(100%);
  }

  .searchbox-enter-active,
  .searchbox-leave-active {
    transition: all 0.4s;
  }

  .add-content {
    top: -100%;
  }

.search-result-addsong{
  bottom:0px;
}

.user-center-component{
   z-index: 20;
  }

 .user-center-enter,
  .user-center-leave-to {
    transform: translateX(-100%);
  }

  .user-center-enter-active,
  .user-center-leave-active {
    transition: all 0.4s;
  }
</style>
