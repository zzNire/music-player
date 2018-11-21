<template>
  <div class='search'>
    <scroll class='search-scroll' :data="searchData" v-if="!searchText">
      <div class='default'>
        <div class='hotkey-list'>
          <p class="hotkey-title"> 热门搜索</p>
          <ul class="hotkey-ul">
            <li class='hotkey-li' v-for="key in hotKey" @click="selectKey(key.k)">
              {{key.k}}
            </li>
          </ul>
        </div>
        <search-list class="search-list"
        @clearAllSearchHisory='clearAll' @clearItemSearchHisory='deleteItem' @selectItem="selectItem"
          :search-history="searchHistory"></search-list>
      </div>
    </scroll>
    <div class='suggest-result' v-else>
      <div class="search-recommend" @click="startSearch" v-if="showSearchCommond && !searchResult.length" >
        <p >搜索 “{{searchText}}”</p>
      </div>
      <suggest :search-result="result" ref="suggest" :searchMode='searchMode'  v-if="searchResult.length"></suggest>
    </div>

  </div>
</template>


<script>
  import {
    getHotkey
  } from '../../api/search.js'
  import {
    mapMutations,
    mapGetters,
    mapActions,
  } from 'vuex'
  import Suggest from '../../base/suggest/suggest.vue'
  import SearchList from '../../base/search-list/search-list.vue'
  import Confirm from '../../base/confirm/confirm.vue'
  import Bus from '../../commom/js/bus.js'
  import Scroll from '../../base/scroll/scroll.vue'


  export default {
    
    components: {
      Suggest,
      SearchList,
      Confirm,
      Scroll,
    },
    props:{
      searchMode: {
        type: Boolean,
        default: false,
      },
      searchResult:{
        type:Array,
        default:[],
      },
      searchText:{
        typr:String,
        default:'',
      },
      showSearchCommond:{
        type:Boolean,
        default:true,
      }
    },
    data() {
      return {
        hotKey: [],
        result: [],
        showConfirm: false,
        name: 'Search',
      }
    },
    created() {
      this._getHotkey();
      Bus.$on('ConfirmPositive', (name) => {
        console.log(name);
        if(this.name !== name) return;
        this.setShowConfirm(false);
        this.deleteAllSearchHistory();

      });
      Bus.$on('ConfirmNegative', (name) => {
         if(this.name !== name) return;
        this.setShowConfirm(false);
      })
    },
    computed: {
      ...mapGetters([
        //'searchText',
       // 'searchResult',
        'searchP',
        'searchHistory'
      ]),
      searchData() {
        return this.hotKey.concat(this.searchHistory);
      }
    },
    methods: {
      _getHotkey() {
        getHotkey().then((res) => {
          if (res.code === 0) {
            this.hotKey = res.data.hotkey.slice(0, 10);
            console.log(this.hotKey);
          }
        })
      },
      selectKey(key) {
         this.$emit('setSearchText',key.substr(0, key.length - 1));
        //this.setSearchText(key.substr(0, key.length - 1));
      },
      ...mapMutations({
      //  setSearchText: 'SET_SEARCHTEXT',
        setP: 'SET_P',
        setShowConfirm: 'SET_SHOWCONFIRM',
        setConfirmParam: 'SET_SHOWPARAM',
      }),
      ...mapActions([
        'deleteAllSearchHistory',
        'deleteItemSearchHistory',

      ]),
      filterSinger(list) {
        console.log('singer icon');
        list.forEach(element => {
          if (element.type === 'singer') {

            element.icon =
              `http://y.gtimg.cn/music/photo_new/T001R300x300M000${element.singermid}.jpg?max_age=2592000`;
          }
        });
      },
      startSearch(){
        this.$emit('startSearch');
      },
      selectItem(index) {
        this.$emit('setSearchText',this.searchHistory[index]);
        //this.setSearchText(this.searchHistory[index]);
      },
      clearAll() {
        let confirmParam = {
          title: '确认清空全部历史记录',
          positive: '确认',
          negative: '取消',
          componentName: this.name,
        };
        this.setConfirmParam(confirmParam);
        this.setShowConfirm(true);



      },
      deleteItem(index) {
        this.deleteItemSearchHistory(this.searchHistory[index]);

      },



    },
    watch: {
      searchResult(list) {
        if (list.length === 0) {
          console.log('searchresult null');
          this.result = [];
          return;
        }
        if (this.searchP !== 1) {
          console.log('concat');
          let shiftList = list.slice();
          shiftList.shift();
          this.result = this.result.concat(shiftList);
        } else {
          this.result = list;
          if (this.$refs.suggest) {
            this.$refs.suggest.scrollToTop();
          }
        }

        // console.log('watch result');
        //console.log(this.result);

        console.log(this.result);

      }
    }
  }

</script>


<style lang="stylus" scoped>
@import '../../commom/stylus/variable.styl';
  .search {
    color: black;
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;

  }

  .search-scroll {
    height: 100%;
    overflow :hidden;
  }

  .suggest-result {
   width:100%;
   height :100%;
  }

  .hotkey-list {
    
  }

  .hotkey-title {
    font-size: 15px;
    font-weight: bold;
    padding: 10px 5px;
  }


  .hotkey-li {
    display: inline-block;
    font-size: 14px;
    line-height: 30px;
    padding: 0 10px;
    height: 30px;
    border-radius: 30px;
    background-color: rgb(230, 230, 230);
    margin: 5px;
  }

.search-list{
    margin-top:20px;
}

.search-recommend{
  color:$color-sub-theme;
  padding:10px 0;
  border-bottom  :solid 1px rgba(240,240,240,1);
}
</style>
